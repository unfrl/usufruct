import { UpsertAttachmentDto } from '../dtos';
import { Attachment } from '../entities';

export class AttachmentService {
  public async createAttachment(dto: UpsertAttachmentDto): Promise<Attachment> {
    console.log(dto);
    throw new Error('impl me');
  }
}
