import { validatedEnv } from 'config/env.config';
import crypto, { CipherKey } from 'node:crypto';

function generateUserKey(userId: string, masterKey: string) {
  // Combine masterKey and userId using HKDF
  const masterKeyBuffer = Buffer.from(masterKey, 'base64');
  const salt = Buffer.from(userId);
  return crypto.hkdfSync('sha256', masterKeyBuffer, salt, 'AES-256-Key', 32);
}

function encryptSecret({
  userId,
  secretValue,
}: {
  userId: string;
  secretValue: string;
}): string {
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

function decryptSecret({
  userId,
  encryptedValue,
}: {
  userId: string;
  encryptedValue: string;
}): string {
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

export { encryptSecret, decryptSecret };
