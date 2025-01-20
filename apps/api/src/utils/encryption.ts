import { validatedEnv } from 'config/env.config';
import crypto, { CipherKey } from 'node:crypto';

/**
 * Generates a unique encryption key for a user by combining userId with master key
 * @param {string} userId - The unique identifier of the user
 * @param {string} masterKey - Base64 encoded master key from environment variables
 * @returns {Buffer} - A 32-byte (256-bit) encryption key
 */
function generateUserKey(userId: string, masterKey: string) {
  // Combine masterKey and userId using HKDF
  const masterKeyBuffer = Buffer.from(masterKey, 'base64');
  const salt = Buffer.from(userId);
  return crypto.hkdfSync('sha256', masterKeyBuffer, salt, 'AES-256-Key', 32);
}

/**
 * Encrypts a secret value using AES-256-CBC with a user-specific key
 * @param {string} userId - The unique identifier of the user
 * @param {string} masterKey - Base64 encoded master key from environment variables
 * @param {string} secretValue - The secret value to encrypt
 * @returns {string} - Base64URL encoded encrypted value
 */
function encrypt(userId: string, secretValue: string): string {
  if (!userId || !secretValue) {
    throw new Error('Missing required parameters');
  }

  const masterKey = validatedEnv.ENCRYPTION_MASTER_KEY;

  const userKey = generateUserKey(userId, masterKey);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv('aes-256-cbc', userKey as CipherKey, iv);

  const encrypted = Buffer.concat([
    iv,
    cipher.update(Buffer.from(secretValue, 'utf8')),
    cipher.final(),
  ]);

  return encrypted.toString('base64url');
}

/**
 * Decrypts a secret value using AES-256-CBC with a user-specific key
 * @param {string} userId - The unique identifier of the user
 * @param {string} masterKey - Base64 encoded master key from environment variables
 * @param {string} encryptedValue - Base64URL encoded encrypted value
 * @returns {string} - Decrypted secret value
 */
function decrypt(userId: string, encryptedValue: string): string {
  if (!userId || !encryptedValue) {
    throw new Error('Missing required parameters');
  }

  const masterKey = validatedEnv.ENCRYPTION_MASTER_KEY;
  const userKey = generateUserKey(userId, masterKey);

  const encrypted = Buffer.from(encryptedValue, 'base64url');
  const iv = encrypted.subarray(0, 16);
  const ciphertext = encrypted.subarray(16);

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    userKey as CipherKey,
    iv,
  );

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}

export { encrypt, decrypt };
