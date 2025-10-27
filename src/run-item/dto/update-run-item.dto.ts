import { IsEnum, IsOptional, IsString } from 'class-validator';
import { runItemStatus, type RunItemStatus } from '../runItemStatus';

export class UpdateRunItemDto {
  @IsEnum(runItemStatus)
  status: RunItemStatus;

  @IsOptional()
  @IsString()
  comment?: string;
}
