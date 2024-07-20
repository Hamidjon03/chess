import {
  IsString,
  IsDate,
  ArrayNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
  @ApiProperty({ description: 'The name of the tournament', type: String })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The start date of the tournament',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the tournament',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  participants?: number[];
}
