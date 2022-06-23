import { IsNotEmpty, MaxLength } from 'class-validator';

export class AddReportDto {
  @IsNotEmpty()
  reportedUserId: string;

  @IsNotEmpty()
  reportingUserId: string;

  @MaxLength(512)
  comment: string;
}
