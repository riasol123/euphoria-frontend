import plural from 'plural-ru';

const getDaysAmountLiteral = (days: number): string => plural(days, 'день', 'дня', 'дней');

export default getDaysAmountLiteral;
