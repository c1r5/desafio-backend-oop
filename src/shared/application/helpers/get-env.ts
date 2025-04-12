export type EnvValue = string | number | null;

export function get_env(
    env_key: string,
    default_value: EnvValue = null,
    required: boolean = false
): EnvValue {
    const env_value = process.env[env_key] || default_value;

    if (required && !env_value) {
        throw new Error(`Environment variable ${env_key} is required`);
    }

    return env_value;
}