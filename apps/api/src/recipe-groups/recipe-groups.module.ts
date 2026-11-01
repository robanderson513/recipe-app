import { Module } from '@nestjs/common';
import { RecipeGroupsController } from './recipe-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeGroup } from './entities/recipe-group.entity';
import { RecipeGroupsService } from './recipe-groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeGroup])],
  controllers: [RecipeGroupsController],
  providers: [RecipeGroupsService]
})
export class RecipeGroupsModule {}
