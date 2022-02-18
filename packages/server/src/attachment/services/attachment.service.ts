import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UpsertAttachmentDto } from '../dtos';
import { AccessControlList, Attachment } from '../entities';

@Injectable()
export class AttachmentService {
  public constructor(
    @InjectRepository(Attachment)
    private readonly _attachmentRepository: Repository<Attachment>,
    private readonly _s3Service: S3Service,
  ) {}

  public async createAttachment(dto: UpsertAttachmentDto, userId: string) {
    const { name, contentType, size, isPublic } = dto;

    const acl = isPublic
      ? AccessControlList.PublicRead
      : AccessControlList.Private;
    const bucket = isPublic ? 'public' : 'private';
    const key = `${bucket}/${userId}/${uuidv4()}/${name}`;
    const form = this._s3Service.makeFormData(contentType, acl.toString(), key);
    const uploadUrl = this._s3Service.publicEndpoint();
    const url = `${uploadUrl}/${key}`;

    const attachment = await this._attachmentRepository.save(
      new Attachment({
        acl,
        key,
        url,
        contentType,
        size,
        userId,
      }),
    );

    return {
      form,
      uploadUrl,
      attachment,
    };
  }
}
