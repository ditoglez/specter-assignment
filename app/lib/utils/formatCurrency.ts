export const formatCurrency = (value: string | null | undefined) => {
  if (!value) {
    return 0;
  }

  return Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    Number(value)
  );
};
