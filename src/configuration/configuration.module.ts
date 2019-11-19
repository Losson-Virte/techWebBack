import { Logger, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationDao } from './dao/configuration.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationSchema } from './shemas/configuration.schema';

@Module({
  providers: [ConfigurationService, Logger, ConfigurationDao],
  controllers: [ConfigurationController],
  imports: [ MongooseModule.forFeature([ { name: 'Configuration', schema: ConfigurationSchema } ]) ],
})
export class ConfigurationModule {}
