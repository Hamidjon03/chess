import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateLeaderboardDto {
  @ApiProperty({
    description: 'ID of the player',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  playerId: number;

  @ApiProperty({
    description: 'ID of the tournament',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  tournamentId: number;

  @ApiProperty({
    description: 'Score of the player',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @ApiProperty({
    description: 'Rank of the player',
    example: '1st',
  })
  @IsString()
  @IsNotEmpty()
  rank: string;
}
