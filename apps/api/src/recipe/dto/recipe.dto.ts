import { Transform, Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CreateIngredientDto } from './create-ingredient.dto';

export class CreateRecipeDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @MaxLength(500)
  description!: string;

  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((step) => (typeof step === 'string' ? step.trim() : step)) : value
  )
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  steps!: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  ingredients!: CreateIngredientDto[];
}
