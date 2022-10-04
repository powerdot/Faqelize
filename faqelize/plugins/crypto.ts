import CryptoJS from "crypto-js";

import type Dictionary from "../types/dictionary";

/**
 * Decrypts a database
 * @param {string[]} value - The encrypted database
 * @param {string} password - The password to decrypt the database
 * @example
 * decryptDatabase("['encrypted', 'qazwsx....']", "my_password")
 */
function decryptDatabase(
  value: string[],
  password: string
): Dictionary | false {
  try {
    const passwordHash = hashPassword(password);
    const decrypted = CryptoJS.AES.decrypt(value[1], passwordHash).toString(
      CryptoJS.enc.Utf8
    );
    const dictionary: Dictionary = JSON.parse(decrypted);
    return dictionary;
  } catch (error) {
    return false;
  }
}

/**
 * Hash a password
 * @param {string} password - The password to hash
 * @example
 * hashPassword("my_password")
 * // => "qazwsx..."
 * @returns {string} The hashed password
 */
function hashPassword(password: string): string {
  if (password.length === 64) return password;
  return CryptoJS.SHA256(password).toString();
}

export default { decryptDatabase, hashPassword };
