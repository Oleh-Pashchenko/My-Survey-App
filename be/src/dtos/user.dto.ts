import { IsString } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    public name: string;
}
