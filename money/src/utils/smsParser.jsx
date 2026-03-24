export const parseSMS = (text) => {
  const debit = text.match(/₹([0-9,]+)/);

  if (debit) {
    return {
      type: "expense",
      amount: parseFloat(debit[1].replace(",", "")),
      description: "SMS Transaction"
    };
  }

  return null;
};