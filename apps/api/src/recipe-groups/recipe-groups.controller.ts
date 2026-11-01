import { Body, Controller, Post } from '@nestjs/common';
import { CreateRecipeGroupDto } from './dto/create-recipe-group.dto';
import { RecipeGroupsService } from './recipe-groups.service';

@Controller('recipe-groups')
export class RecipeGroupsController {
  constructor(private readonly recipeGroupsService: RecipeGroupsService) {}

  @Post()
  createRecipeGroup(@Body() dto: CreateRecipeGroupDto) {
    return this.recipeGroupsService.create(dto.name);
  }
}
