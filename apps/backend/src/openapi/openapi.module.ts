import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TableModule } from '../core/table/table.module.js'
import { RealtimeModule } from '../realtime/realtime.module.js'
import { convertors } from './convertor/index.js'
import { OpenAPIDocController } from './openapi-doc.controller.js'
import { OpenAPIDocService } from './openapi-doc.service.js'
import { OpenAPIRecordController } from './openapi-record.controller.js'
import { OpenAPIRecordService } from './openapi-record.service.js'
import { OpenAPIWebhookController } from './openapi-webhook.controller.js'
import { OpenAPIWebhookService } from './openapi-webhook.service.js'

@Module({
  imports: [TableModule, RealtimeModule, CqrsModule],
  controllers: [OpenAPIDocController, OpenAPIRecordController, OpenAPIWebhookController],
  providers: [OpenAPIDocService, OpenAPIRecordService, OpenAPIWebhookService, ...convertors],
})
export class OpenAPIModule {}
