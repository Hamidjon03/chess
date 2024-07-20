import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateLeaderboardDto {
  @ApiProperty({
    description: 'ID of the player',
    example: 1,
    required: false,
  })
  @IsInt()
  @IsOptional()
  playerId?: number;

  @ApiProperty({
    description: 'ID of the tournament',
    example: 1,
    required: false,
  })
  @IsInt()
  @IsOptional()
  tournamentId?: number;

  @ApiProperty({
    description: 'Score of the player',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  score?: number;

  @ApiProperty({
    description: 'Rank of the player',
    example: '1st',
    required: false,
  })
  @IsString()
  @IsOptional()
  rank?: string;
}
