import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsDate, Min } from 'class-validator';

export class CreateMatchDto {
  @ApiProperty({ description: 'Tournament ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  tournamentId: number;

  @ApiProperty({ description: 'Player 1 ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  player1Id: number;

  @ApiProperty({ description: 'Player 2 ID', example: 2 })
  @IsInt()
  @IsNotEmpty()
  player2Id: number;

  @ApiProperty({ description: 'Match result', example: 'player1' })
  @IsString()
  @IsNotEmpty()
  result: string;

  @ApiProperty({
    description: 'Match date',
    example: '2024-07-20T13:39:13.205Z',
    type: String, // Swagger uchun formatni string sifatida ko'rsatadi
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) // class-transformer yordamida date formatiga o'tkazish
  readonly date: Date;

  @ApiProperty({ description: 'Match score', example: 10 })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  score: number;
}
