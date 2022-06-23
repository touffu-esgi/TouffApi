import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AddReportDto {
  @IsNotEmpty()
  reportedUserId: string;

  @IsNotEmpty()
  reporterUserId: string;

  @MinLength(0)
  @MaxLength(512)
  comment: string;
}
