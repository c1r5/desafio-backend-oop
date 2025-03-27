import {ValueTransformer} from "typeorm";


export class CurrencyTransformer implements ValueTransformer {
    to(value: bigint): string {
        return BigInt(value * 100n).toString(); // para centavos
    }

    from(value: string): bigint {
        return BigInt(value) / BigInt(100); // de centavos
    }
}
