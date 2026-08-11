export class OfflineError extends Error {
  constructor(message = "You're offline") {
    super(message);
    this.name = "OfflineError";
  }
}

// Drop-in replacement for fetch(). Checks navigator.onLine before
// firing the request (avoids a slow, doomed request when we already
// know there's no connection), and also catches network-level
// failures mid-request (dropped connection, DNS failure, etc.) and
// normalizes them into the same OfflineError — so calling code only
// needs one catch branch for "no internet", separate from real
// server/API errors.
export async function safeFetch(url: string, options?: RequestInit): Promise<Response> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new OfflineError();
  }

  try {
    return await fetch(url, options);
  } catch {
    throw new OfflineError("Network request failed");
  }
}

export function isOfflineError(err: unknown): boolean {
  return err instanceof OfflineError;
}