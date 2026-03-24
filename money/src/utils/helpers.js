// Sample SMS inbox to simulate a phone's messages
export const sampleSmsMessages = [
    { id: 'sms1', body: 'Debit of ₹1,200.00 from a/c XX1234 on 15-06-2023. Avl Bal: ₹24,567.89 - HDFC Bank', address: 'HDFCBANK', date: '2023-06-15' },
    { id: 'sms2', body: 'Credited ₹25,000.00 to your a/c XX1234 on 10-06-2023. Avl Bal: ₹25,567.89 - HDFC Bank', address: 'HDFCBANK', date: '2023-06-10' },
    { id: 'sms3', body: 'You have spent ₹350.00 at UBER*RIDE on 08-06-2023.', address: 'HDFCBANK', date: '2023-06-08' },
    { id: 'sms4', body: 'Payment of ₹5,000.00 received from Client ABC for Project XYZ. Thank you!', address: 'PAYMENTS', date: '2023-06-01' }
];

// The engine that checks an SMS against built-in and custom rules
export function parseSmsToTransaction(sms, customRules = []) {
    let amount = 0;
    let type = '';
    let description = '';
    let category = '';

    // 1. Check against custom user-defined rules first
    for (const rule of customRules) {
        try {
            const regex = new RegExp(rule.pattern, 'i');
            const match = sms.body.match(regex);

            if (match && match[1]) { // Assuming group 1 (.*) captures the amount
                type = rule.type;
                amount = parseFloat(match[1].replace(/,/g, ''));
                description = rule.name;
                category = rule.category;
                break; // Stop checking once a custom rule matches
            }
        } catch (e) {
            console.error("Invalid regex in custom rule:", rule.name);
        }
    }

    // 2. Fallback to default built-in regex patterns if no custom rule matched
    if (!type) {
        const debitRegex = /(?:Debit of|spent) ₹([0-9,.]+)/i;
        const creditRegex = /(?:Credited|Payment of) ₹([0-9,.]+)/i;

        const debitMatch = sms.body.match(debitRegex);
        const creditMatch = sms.body.match(creditRegex);

        if (debitMatch) {
            type = 'expense';
            amount = parseFloat(debitMatch[1].replace(/,/g, ''));
            description = sms.address.includes('HDFC') ? 'Bank Debit' : sms.address;
            category = 'Other Expense';
        } else if (creditMatch) {
            type = 'income';
            amount = parseFloat(creditMatch[1].replace(/,/g, ''));
            description = sms.address.includes('HDFC') ? 'Bank Credit' : 'Payment Received';
            category = 'Other Income';
        }
    }

    if (!type || isNaN(amount)) return null;

    // Determine an icon based on words in the description
    let icon = type === 'income' ? 'money-bill-wave' : 'shopping-cart';
    const descLower = description.toLowerCase();
    if (descLower.includes('uber') || descLower.includes('ride')) icon = 'car';
    if (descLower.includes('swiggy') || descLower.includes('zomato') || descLower.includes('food')) icon = 'utensils';

    return {
        id: 't_' + sms.id,
        type,
        amount,
        category,
        description,
        date: sms.date,
        icon,
        fromSms: true
    };
}