// Resolves the Vercel Blob read/write token. Defaults to the standard
// BLOB_READ_WRITE_TOKEN, but also matches custom-prefixed names (Vercel lets you
// prefix a store's env vars), e.g. MYSTORE_READ_WRITE_TOKEN.
export function getBlobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const key = Object.keys(process.env).find(
    (k) => /READ_WRITE_TOKEN$/.test(k) && /BLOB/i.test(k),
  );
  return key ? process.env[key] : undefined;
}
