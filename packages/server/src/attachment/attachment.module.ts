import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentController } from './controllers';
import { Attachment } from './entities';
import { AttachmentService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
