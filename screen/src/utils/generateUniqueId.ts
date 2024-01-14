/**
 * Generate a unique id. Improve by using a better algorithm. e.g. incrementing a counter starting from a random number.
 * Or issuing a uuid
 *
 * @returns a unique id
 */
export const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export function generateUniquePassword() {
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
  const numbers = '0123456789';
  const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  let password: string = '';
  while (!passwordRegex.test(password)) {
    password = '';
    // Generate at least 1 upper case character
    password += upperChars[Math.floor(Math.random() * upperChars.length)];

    // Generate at least 1 lower case character
    password += lowerChars[Math.floor(Math.random() * lowerChars.length)];

    // Generate at least 1 special character
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Generate at least 1 number
    password += numbers[Math.floor(Math.random() * numbers.length)];

    // Generate the remaining characters to meet the minimum length
    const minLength = 8;
    const remainingLength = minLength - password.length;

    for (let i = 0; i < remainingLength; i++) {
      const allChars = upperChars + lowerChars + specialChars + numbers;
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password characters to make it more random
    // @ts-ignore
    password = password.split('');
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // @ts-ignore
      [password[i], password[j]] = [password[j], password[i]];
    }
  }
  // @ts-ignore
  return password.join('');
}

export const showPages = (size: number, slice: number) => {
  if (size === slice || ((size - slice) < 0)) {
    return 1;
  }
  if (slice % 2 === 0) {
    return size / slice;
  } else {
    return Math.floor(size / slice) + 1
  }
}


export const DEBOUNCE_INTERVAL = 250;