import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class RefreshTokenDto {
    @IsNotEmpty()
    refreshToken: string;
}