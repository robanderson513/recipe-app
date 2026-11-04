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
    const recipeGroup = this.recipesRepository.create({
      name: recipe.name,
      description: recipe.description
    });

    return this.recipesRepository.save(recipeGroup);
  }
}
