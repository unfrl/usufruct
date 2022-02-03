import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UpsertAttachmentDto } from '../dtos';
import { Attachment } from '../entities';

@Injectable()
export class AttachmentService {
  public constructor(
    @InjectRepository(Attachment)
    private readonly _attachmentRepository: Repository<Attachment>,
  ) {}

  public async createAttachment(
    dto: UpsertAttachmentDto,
    userId: string,
    libraryId?: string,
  ): Promise<Attachment> {
    const { name, contentType, size } = dto;

    const guid = uuidv4();
    const bucket = 'public';
    const key = `${bucket}/${userId}/${guid}/${name}`;
    const url = 'todo';

    const attachment = await this._attachmentRepository.save(
      new Attachment({
        key,
        url,
        contentType,
        size,
        libraryId,
        userId,
      }),
    );

    // TODO: return type will be different from an attachment
    // new dto w/ all the props needed to make an upload req to s3 provider

    return attachment;
  }
}
