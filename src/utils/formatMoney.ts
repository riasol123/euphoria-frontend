const formatMoney = (value: string | number): string => {
  return Number(value).toLocaleString('ru-RU');
};

export default formatMoney;
