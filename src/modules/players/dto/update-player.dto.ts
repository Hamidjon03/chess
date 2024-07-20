import { CreatePlayerDto } from './create-player.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @ApiProperty({
    example: 'John Doe',
    description: "Player's name",
    required: false,
  })
  name?: string;

  @ApiProperty({ example: 25, description: "Player's age", required: false })
  age?: number;

  @ApiProperty({
    example: 1500,
    description: "Player's rating",
    required: false,
  })
  rating?: number;

  @ApiProperty({
    example: 'USA',
    description: "Player's country",
    required: false,
  })
  country?: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the associated user',
    required: false,
  })
  user?: number;
}
