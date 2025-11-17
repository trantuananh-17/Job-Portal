function convertDay(text: string) {
  const num = parseInt(text);
  const unit = text.replace(num.toString(), '');

  const now = Date.now();

  const multipliers: any = {
    d: 24 * 60 * 60 * 1000,
    h: 60 * 60 * 1000,
    m: 60 * 1000
  };

  return new Date(now - num * multipliers[unit]);
}

export default convertDay;
