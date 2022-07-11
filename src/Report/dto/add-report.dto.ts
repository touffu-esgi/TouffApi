import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AddReportDto {
  @IsNotEmpty()
  reportedUserId: string;

  @IsNotEmpty()
  reportingUserId: string;

  @MinLength(0)
  @MaxLength(512)
  comment: string;
}
