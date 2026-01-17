import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Match } from "../decorators/match-password.decorator";

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Match('password')
    passwordConfirm: string;
}
