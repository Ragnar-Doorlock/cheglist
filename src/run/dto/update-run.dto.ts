import { IsOptional, IsString, IsEnum } from 'class-validator';
import { runStatus } from '../runStatus';
import type { RunStatus } from '../runStatus';

export class UpdateRunDto {
    @IsOptional()
    @IsString()
    tester?: string;

    @IsOptional()
    @IsString()
    build?: string;

    @IsOptional()
    @IsEnum(runStatus)
    status?: RunStatus;
}
