export interface ValueObject {
  get value(): string;
  equals(other: ValueObject): boolean;
}