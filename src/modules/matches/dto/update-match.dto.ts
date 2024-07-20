import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMatchDto } from './create-match.dto';
import { IsInt, IsOptional, IsString, IsDate, Min } from 'class-validator';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @ApiProperty({ description: 'Tournament ID', example: 1, required: false })
  @IsInt()
  @IsOptional()
  tournamentId?: number;

  @ApiProperty({ description: 'Player 1 ID', example: 1, required: false })
  @IsInt()
  @IsOptional()
  player1Id?: number;

  @ApiProperty({ description: 'Player 2 ID', example: 2, required: false })
  @IsInt()
  @IsOptional()
  player2Id?: number;

  @ApiProperty({
    description: 'Match result',
    example: 'player1',
    required: false,
  })
  @IsString()
  @IsOptional()
  result?: string;

  @ApiProperty({
    description: 'Match date',
    example: '2024-07-20T13:39:13.205Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  date?: Date;

  @ApiProperty({ description: 'Match score', example: 10, required: false })
  @IsInt()
  @IsOptional()
  @Min(0)
  score?: number;
}
