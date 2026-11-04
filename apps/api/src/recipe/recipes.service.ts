import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipesRepository: Repository<Recipe>
  ) {}

  create(recipe: CreateRecipeDto) {
    const recipeEntity = this.mapCreateRecipeDtoToEntity(recipe);
    const recipeSave = this.recipesRepository.create(recipeEntity);

    return this.recipesRepository.save(recipeSave);
  }

  private mapCreateRecipeDtoToEntity(createRecipeDto: CreateRecipeDto): Recipe {
    const recipe = new Recipe();
    recipe.name = createRecipeDto.name;
    recipe.description = createRecipeDto.description;
    recipe.ingredients = createRecipeDto.ingredients;
    recipe.steps = createRecipeDto.steps;
    return recipe;
  }
}
