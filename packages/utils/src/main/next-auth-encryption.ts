import { hkdf } from "@panva/hkdf";
import { jwtDecrypt } from "jose";

const alg = "dir";
const enc = "A256CBC-HS512";
const JWT_SECRET = process.env.AUTH_SECRET;

export async function getDerivedEncryptionKey(
  enc: string,
  keyMaterial: Parameters<typeof hkdf>[1],
  salt: Parameters<typeof hkdf>[2]
) {
  const length = enc === "A256CBC-HS512" ? 64 : 32;
  return hkdf(
    "sha256",
    keyMaterial,
    salt,
    `Auth.js Generated Encryption Key (${salt})`,
    length
  );
}

export async function decryptToken(token: string, isDev: boolean) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

  const salt = isDev ? "authjs.session-token" : `__Secure-authjs.session-token`;
  const encryptionKey = await getDerivedEncryptionKey(enc, JWT_SECRET, salt);
  const { payload } = await jwtDecrypt(token, encryptionKey, {
    clockTolerance: 15,
    keyManagementAlgorithms: [alg],
    contentEncryptionAlgorithms: [enc, "A256GCM"],
  });
  return payload;
}
