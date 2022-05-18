const sekFormatting = new Intl.NumberFormat(
    'sv-SE', { style: 'currency',
    currency: 'SEK', 
    maximumSignificantDigits: 2}
  );
  export function sweFormat(number) {
    return sekFormatting.format(number);
  }