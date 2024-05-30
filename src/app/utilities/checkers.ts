export function checkEmail(email: string): false | string {
  const emailChars: RegExp =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (email.slice(0, 1) === ' ' || email.slice(-1) === ' ') {
    return 'Email address must not contain leading or trailing whitespace.';
  }
  if (emailChars.test(String(email).toLowerCase()) && !email.includes(' ')) {
    return false;
  }
  return 'A properly formatted email address (e.g., examp@mail.com)!';
}

export function checkPassword(password: string): false | string {

  const expression: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;


  if (password.slice(0, 1) === ' ' || password.slice(-1) === ' ') {
    return 'Password must not contain trailing or leading whitespace.';
  }

  if (password.match(expression) && !password.includes(' ')) {

    return false;
  }
  return 'Password: Minimum 8 characters, 1 number 1 lowercase letter, and at least 1 uppercase letter!';
}

export function checkName(text: string): false | string {
  const symbol: RegExp = /[!"№;%:?*()~`"'@#$%^&*-=+]/g;
  const numbers: RegExp = /[0-9]/g;
  const minWordLength: number = 1;

  if (text.slice(0, 1) === ' ' || text.slice(-1) === ' ') {
    return `Must not contain trailing or leading whitespace.`;
  }
  if (!text.match(symbol) && !text.match(numbers) && text.length >= minWordLength) {
    return false;
  }
  return `Must contain at least one character and no special numbers or characters!`;
}

export function checkCity(text: string): false | string {
  const symbol: RegExp = /[!"№;%:?*()~`"'@#$%^&*-=+]/g;
  const numbers: RegExp = /[0-9]/g;
  const minWordLength: number = 1;

  if (text.slice(0, 1) === ' ' || text.slice(-1) === ' ') {
    return `City must not contain trailing or leading whitespace.`;
  }
  if (!text.match(symbol) && !text.match(numbers) && text.length >= minWordLength) {
    return false;
  }
  return `City must contain at least one character and no special numbers or characters!`;
}

export function checkStreet(text: string): false | string {
  const minWordLength: number = 1;

  if (text.slice(0, 1) === ' ' || text.slice(-1) === ' ') {
    return 'Street must not contain leading or trailing whitespace.';
  }
  if (text.length >= minWordLength) {
    return false;
  }
  return 'Street: Must contain at least one character!';
}

export function checkPostCode(text: string): false | string {
  const postCodeLength: number = 5;
  const numbers: RegExp = /^\d+$/;

  if (text.slice(0, 1) === ' ' || text.slice(-1) === ' ') {
    return 'Post code must not contain leading or trailing whitespace.';
  }

  if (text.length === postCodeLength && text.match(numbers) && !text.includes(' ')) {
    return false;
  }

  return 'Post code: Must follow the format for the country (e.g. 90210)!';
}

export function checkDate(date: string): false | string {
  const current = new Date();
  const inputDate = new Date(date);
  const minimumAge: number = 13;
  current.setFullYear(current.getFullYear() - minimumAge);

  if (current > inputDate) {
    return false;
  }
  return 'Sorry, your age is under thirteen';
}

export function isError(obj: Record<string, boolean>): boolean {
  return !Object.values(obj).every((value) => !value);
}
