import { IsNotEmpty } from 'class-validator';

export class ReportUserDto {
  @IsNotEmpty()
  reportedUserId: string;

  @IsNotEmpty()
  reportingUserId: string;
}
