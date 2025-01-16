import { hkdf } from '@panva/hkdf';
import { EncryptJWT, base64url, calculateJwkThumbprint } from 'jose';

export interface DefaultJWT extends Record<string, unknown> {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  sub?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

export interface JWT extends Record<string, unknown>, DefaultJWT {}

export interface JWTEncodeParams<Payload = JWT> {
  /**
   * The maximum age of the Auth.js issued JWT in seconds.
   *
   * @default 30 * 24 * 60 * 60 // 30 days
   */
  maxAge?: number;
  /** Used in combination with `secret`, to derive the encryption secret for JWTs. */
  salt: string;
  /** Used in combination with `salt`, to derive the encryption secret for JWTs. */
  secret: string | string[];
  /** The JWT payload. */
  token?: Payload;
}

const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

const now = () => (Date.now() / 1000) | 0;

const alg = 'dir';
const enc = 'A256CBC-HS512';
type Digest = Parameters<typeof calculateJwkThumbprint>[1];

export async function encode<Payload = JWT>(params: JWTEncodeParams<Payload>) {
  const { token = {}, secret, maxAge = DEFAULT_MAX_AGE, salt } = params;
  const secrets = Array.isArray(secret) ? secret : [secret];
  const encryptionSecret = await getDerivedEncryptionKey(enc, secrets[0], salt);

  const thumbprint = await calculateJwkThumbprint(
    { kty: 'oct', k: base64url.encode(encryptionSecret) },
    `sha${encryptionSecret.byteLength << 3}` as Digest,
  );
  return await new EncryptJWT(token)
    .setProtectedHeader({ alg, enc, kid: thumbprint })
    .setIssuedAt()
    .setExpirationTime(now() + maxAge)
    .setJti(crypto.randomUUID())
    .encrypt(encryptionSecret);
}

async function getDerivedEncryptionKey(
  enc: string,
  keyMaterial: Parameters<typeof hkdf>[1],
  salt: Parameters<typeof hkdf>[2],
) {
  let length: number;
  switch (enc) {
    case 'A256CBC-HS512':
      length = 64;
      break;
    case 'A256GCM':
      length = 32;
      break;
    default:
      throw new Error('Unsupported JWT Content Encryption Algorithm');
  }
  return await hkdf(
    'sha256',
    keyMaterial,
    salt,
    `Auth.js Generated Encryption Key (${salt})`,
    length,
  );
}
