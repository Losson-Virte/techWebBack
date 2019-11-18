import { Logger, Module } from '@nestjs/common';
import { ComposantService } from './composant.service';
import { ComposantController } from './composant.controller';
import { ComposantsDao } from './dao/composants.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { ComposantSchema } from './schema/composant.schema';

@Module({
  imports: [ MongooseModule.forFeature([ { name: 'Composant', schema: ComposantSchema } ]) ],
  providers: [ComposantService, Logger, ComposantsDao],
  controllers: [ComposantController],
  exports: [ ComposantService ],
})
export class ComposantModule {}
