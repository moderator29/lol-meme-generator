import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

/**
 * Storage abstraction. The app writes/reads through this interface so the
 * backing store can be switched from local disk (dev) to AWS S3 (prod) via
 * the STORAGE_DRIVER env var, with no changes to call sites.
 */
export interface StorageDriver {
  /** Persist bytes and return an opaque storage key. */
  put(input: {
    body: Buffer;
    contentType: string;
    keyPrefix?: string;
    filename?: string;
  }): Promise<string>;
  /** Read the bytes back for a storage key. */
  get(key: string): Promise<{ body: Buffer; contentType: string }>;
  /** Remove an object; missing objects resolve without error. */
  remove(key: string): Promise<void>;
}

function safeExtension(filename?: string): string {
  if (!filename) return "";
  const ext = path.extname(filename).toLowerCase();
  return /^\.[a-z0-9]{1,8}$/.test(ext) ? ext : "";
}

function guessContentType(key: string): string {
  const ext = path.extname(key).toLowerCase();
  const map: Record<string, string> = {
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  return map[ext] ?? "application/octet-stream";
}

const LOCAL_ROOT = path.join(process.cwd(), "storage");

class LocalStorageDriver implements StorageDriver {
  async put({
    body,
    keyPrefix = "uploads",
    filename,
  }: {
    body: Buffer;
    contentType: string;
    keyPrefix?: string;
    filename?: string;
  }): Promise<string> {
    const key = `${keyPrefix}/${randomUUID()}${safeExtension(filename)}`;
    const dest = this.resolve(key);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, body);
    return key;
  }

  async get(key: string): Promise<{ body: Buffer; contentType: string }> {
    const body = await fs.readFile(this.resolve(key));
    return { body, contentType: guessContentType(key) };
  }

  async remove(key: string): Promise<void> {
    await fs.rm(this.resolve(key), { force: true });
  }

  /** Guard against path traversal escaping the storage root. */
  private resolve(key: string): string {
    const dest = path.resolve(LOCAL_ROOT, key);
    if (dest !== LOCAL_ROOT && !dest.startsWith(LOCAL_ROOT + path.sep)) {
      throw new Error("Invalid storage key");
    }
    return dest;
  }
}

/**
 * S3 driver stub. Wire up @aws-sdk/client-s3 here when moving to production;
 * the interface is identical so no call sites change. Kept as a stub so the
 * MVP has no hard AWS dependency during development.
 */
class S3StorageDriver implements StorageDriver {
  async put(): Promise<string> {
    throw new Error(
      "S3 storage is not wired up in the MVP. Install @aws-sdk/client-s3 and implement S3StorageDriver, or set STORAGE_DRIVER=local.",
    );
  }
  async get(): Promise<{ body: Buffer; contentType: string }> {
    throw new Error("S3 storage is not wired up in the MVP.");
  }
  async remove(): Promise<void> {
    throw new Error("S3 storage is not wired up in the MVP.");
  }
}

let driver: StorageDriver | null = null;

export function storage(): StorageDriver {
  if (driver) return driver;
  driver =
    process.env.STORAGE_DRIVER === "s3"
      ? new S3StorageDriver()
      : new LocalStorageDriver();
  return driver;
}
