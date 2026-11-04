import { Body, Controller, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/recipe.dto';

@Controller('recipe')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  createRecipe(@Body() recipe: CreateRecipeDto) {
    return this.recipesService.create(recipe);
  }
}
