import { Module } from '@nestjs/common';
import { RecipeGroupsController } from './recipe-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeGroup } from './entities/recipe-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeGroup])],
  controllers: [RecipeGroupsController]
})
export class RecipeGroupsModule {}
