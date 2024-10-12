import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import MESSAGES from '../configs/res'

export function validateDto<T extends object>(dtoClass: new () => T, type: 'body' | 'params' | 'query' | 'headers' = 'body') {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToClass(dtoClass, req[type]);
        const errors = await validate(dtoInstance);
        if (errors.length > 0) {
            const errorMessages = errors.flatMap(err => {
                return err.constraints ? Object.values(err.constraints) : [];
            });
            res.validation(MESSAGES.ERRORS.INVALID_DATA, { errors: errorMessages });
            return Promise.resolve();
        }
        next();
    };
}
