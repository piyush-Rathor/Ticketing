import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserSignupDTO {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string = '';

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @Length(6, undefined, { message: 'Password must be at least 6 characters' })
    password: string = '';
}