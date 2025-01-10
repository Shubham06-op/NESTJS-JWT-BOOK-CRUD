import { IsString, IsInt, MinLength, MaxLength, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  author: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  genre: string;

  @IsInt()
  @Min(1500)
  yearPublished: number;
}
