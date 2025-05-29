// Base62 alphabet (0-9, a-z, A-Z)
const BASE62_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Converts a UUID to a shorter, human-readable string using Base62 encoding
 * @param uuid The UUID to convert
 * @returns A shorter string representation of the UUID
 */
export function convertUuidToShort(uuid: string): string {
  // Remove hyphens and convert to lowercase
  const cleanUuid = uuid.replace(/-/g, '').toLowerCase();

  // Convert the hex string to a BigInt
  const num = BigInt('0x' + cleanUuid);

  // Convert to Base62
  let result = '';
  let n = num;
  const base = BigInt(BASE62_ALPHABET.length);

  while (n > 0) {
    const remainder = Number(n % base);
    result = BASE62_ALPHABET[remainder] + result;
    n = n / base;
  }

  // Pad with leading zeros if needed to maintain consistent length
  // Most UUIDs will result in a 22-character string
  while (result.length < 22) {
    result = BASE62_ALPHABET[0] + result;
  }

  return result;
}
