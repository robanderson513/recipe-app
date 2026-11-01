import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeGroup } from './entities/recipe-group.entity';

@Injectable()
export class RecipeGroupsService {
  constructor(
    @InjectRepository(RecipeGroup)
    private readonly recipeGroupsRepository: Repository<RecipeGroup>
  ) {}

  create(name: string) {
    const recipeGroup = this.recipeGroupsRepository.create({
      name,
      description: null
    });

    return this.recipeGroupsRepository.save(recipeGroup);
  }
}
