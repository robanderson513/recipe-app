import { Controller, Get } from '@nestjs/common';

@Controller('recipe-groups')
export class RecipeGroupsController {
  @Get()
  getRecipeGroups() {
    return { status: 'ok' };
  }
}
