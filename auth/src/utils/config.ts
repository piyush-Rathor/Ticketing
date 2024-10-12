import { IsString, IsNotEmpty, IsUrl, Min, Max, IsEnum, Length, validateSync, MAX, IsNumberString, IsInt } from 'class-validator';
import { plainToClass, Transform, Type } from 'class-transformer';
import { ENV } from '../types/env';
import constants from '../configs/constants';

export class EnvVariablesValidationDto {
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true }) // Transform to integer
    @IsInt()
    @Min(0)
    @Max(65535)
    PORT: string = '';

    @IsNotEmpty()
    @IsString()
    @IsEnum(ENV)
    ENV: string = '';

    @IsNotEmpty()
    @IsString()
    @Length(10)
    MONGO_URI: string = '';

    @IsString()
    @IsNotEmpty()
    @Length(10, 35)
    JWT_KEY: string = '';
}

const validateConfig = (config: object = constants): EnvVariablesValidationDto => {
    const validatedConfig: object = plainToClass(EnvVariablesValidationDto, config);
    const errors = validateSync(validatedConfig);

    if (errors.length > 0) {
        throw new Error(`
            
            *ENV Validation failed*: ${errors}
            
            `);
    }

    return validatedConfig as EnvVariablesValidationDto;
};

export default validateConfig