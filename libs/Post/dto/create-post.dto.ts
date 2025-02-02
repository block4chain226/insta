import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  description?: string;
  @IsOptional()
  @IsArray()
  @IsString()
  tags?: string[];
}
