export function isValidISBN(isbn: string): boolean {
  const cleanISBN = isbn.replace(/[-\s]/g, "");

  if (cleanISBN.length === 10) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const digit = Number.parseInt(cleanISBN[i], 10);
      if (Number.isNaN(digit)) return false;
      sum += digit * (10 - i);
    }
    const lastChar = cleanISBN[9].toUpperCase();
    const checkDigit = lastChar === "X" ? 10 : Number.parseInt(lastChar, 10);
    if (Number.isNaN(checkDigit)) return false;
    return (sum + checkDigit) % 11 === 0;
  }

  if (cleanISBN.length === 13) {
    let sum = 0;
    for (let i = 0; i < 13; i++) {
      const digit = Number.parseInt(cleanISBN[i], 10);
      if (Number.isNaN(digit)) return false;
      sum += digit * (i % 2 === 0 ? 1 : 3);
    }
    return sum % 10 === 0;
  }

  return false;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}
