export interface RetryOptions {
  retries: number;
  delay: number;
}

/**
 * 
 * @param fn function to retry
 * @param options defaults to 3 retries and 1000ms delay
 * @description Retry a function with exponential backoff
 * @returns 
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { retries: 3, delay: 1000 }
): Promise<T> {
  const { retries, delay } = options;
  let attempts = 0;
  
  while (attempts < retries) {
    try {
      return await fn();
    } catch (error) {
      console.error(`[+] Attempt ${attempts + 1} failed:`, error);
      attempts++;
      if (attempts >= retries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Max retries reached");
}