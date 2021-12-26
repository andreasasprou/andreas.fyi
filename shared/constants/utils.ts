import StringUtils from './string-utils';

export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export const nodeEnv = process.env.NODE_ENV as NODE_ENV;

const shouldThrowError = [NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION].includes(
  nodeEnv,
);

function getEnvVar(
  variableName: string,
  defaultValue: boolean | number | string | null,
): string {
  const value = process.env[variableName] ?? defaultValue;

  if (value === null && shouldThrowError) {
    throw new Error(`Environment Variable ${variableName} must be set!`);
  } else if (value === null) {
    return '';
  }

  return value.toString();
}

export function getBooleanEnvVar(
  variableName: string,
  defaultValue: boolean | null = null,
): boolean {
  const value = getEnvVar(variableName, defaultValue);

  const errorMessage = `Environment Variable ${variableName} does not contain a valid boolean`;

  return StringUtils.parseBoolean(value, errorMessage);
}

export function getIntegerEnvVar(
  variableName: string,
  defaultValue: number | null = null,
): number {
  const value = getEnvVar(variableName, defaultValue);

  const errorMessage = `Environment Variable ${variableName} does not contain a valid integer`;

  return StringUtils.parseInt(value, errorMessage);
}

export function getStringEnvVar(
  variableName: string,
  defaultValue: string | null = null,
): string {
  return getEnvVar(variableName, defaultValue).toString();
}
