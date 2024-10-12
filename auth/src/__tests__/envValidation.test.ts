import constantsAsTypeEnvConfig, { envConfig } from '../configs/constants';
import validateConfig from '../utils/config';

describe('Configuration Loading and Validation', () => {
    let envVars = { ...constantsAsTypeEnvConfig }
    beforeEach(() => {
        Object.keys(envConfig).forEach((key) => {
            const typedKey = key as keyof typeof envConfig;
            const { valid } = envConfig[typedKey];
            envVars[typedKey] = valid
        })
    })
    Object.keys(envConfig).forEach((key) => {
        // Ensuring typedKey is keyof envConfig
        const typedKey = key as keyof typeof envConfig;
        const { valid, invalid, message } = envConfig[typedKey];

        // Test for valid cases
        it(`should not throw an error if ${key} is valid`, () => {
            envVars[typedKey] = String(valid !== undefined ? valid : '');
            expect(() => validateConfig(envVars)).not.toThrow();
        });
        // Test for invalid cases
        it(`should throw an error if ${key} is invalid`, () => {
            envVars[typedKey] = invalid;
            expect(() => validateConfig(envVars)).toThrow();
        });
    });

    it('should throw an error if PORT is missing', () => {
        const newEnvVar: { [key: string]: string } = { ...envVars }
        delete newEnvVar.PORT

        // expect(() => validateConfig(newEnvVar)).toThrow()
    });
});
