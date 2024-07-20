import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTournamentDto } from './create-tournament.dto';

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Spring Chess Championship', required: false })
  name?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ example: '2023-07-19T00:00:00.000Z', required: false })
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ example: '2023-07-25T00:00:00.000Z', required: false })
  endDate?: Date;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @ApiProperty({ type: [Number], example: [1, 2, 3], required: false })
  participants?: number[];
}
