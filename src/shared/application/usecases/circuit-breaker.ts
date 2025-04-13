export class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  constructor(
    private failureThreshold: number,
    private recoveryTimeMs: number
  ) {}

  private isRecoveryTimePassed(): boolean {
    return Date.now() - this.lastFailureTime > this.recoveryTimeMs;
  }

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN' && !this.isRecoveryTimePassed()) {
      console.error('[+] Circuit is open, not calling the function');
      throw new Error('Circuit is open');
    }

    if (this.state === 'OPEN' && this.isRecoveryTimePassed()) {
      console.log('[+] Circuit is half-open, trying to call the function');
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await fn();
      this.reset();
      return result;
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = Date.now();

      if (this.failureCount >= this.failureThreshold) {
        this.state = 'OPEN';
      }
      throw error;
    }
  }

  private reset() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
}
