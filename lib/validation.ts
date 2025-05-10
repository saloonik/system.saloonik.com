export const validateNIP = (nip: string): boolean => {
  const cleanedNIP = nip.replace(/[^0-9]/g, "");
  if (cleanedNIP.length !== 10) return false;

  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const checksum = cleanedNIP
    .split("")
    .slice(0, 9)
    .reduce(
      (sum: number, digit: string, index: number) =>
        sum + parseInt(digit, 10) * weights[index],
      0,
    );

  const controlDigit = checksum % 11;
  return controlDigit !== 10 && controlDigit === parseInt(cleanedNIP[9], 10);
};

export const validateREGON = (regon: string): boolean => {
  const cleanedREGON = regon.replace(/[^0-9]/g, "");
  if (cleanedREGON.length !== 9) return false;

  const weights = [8, 9, 2, 3, 4, 5, 6, 7];
  const checksum = cleanedREGON
    .split("")
    .slice(0, 8)
    .reduce(
      (sum: number, digit: string, index: number) =>
        sum + parseInt(digit, 10) * weights[index],
      0,
    );

  const controlDigit = checksum % 11;
  return controlDigit !== 10 && controlDigit === parseInt(cleanedREGON[8], 10);
};
