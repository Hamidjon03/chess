import {
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ example: 'John Doe', description: "Player's name" })
  name: string;

  @IsInt()
  @Min(6)
  @Max(100)
  @ApiProperty({ example: 25, description: "Player's age" })
  age: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({ example: 1500, description: "Player's rating" })
  rating: number;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ example: 'USA', description: "Player's country" })
  country: string;

  @IsInt()
  @ApiProperty({ example: 1, description: 'ID of the associated user' })
  user: number;
}
