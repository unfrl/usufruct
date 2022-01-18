import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ApiHeaderOptions } from '@nestjs/swagger';
import { Request } from 'express';
import { Library } from '../entities';
import { LibraryService } from '../services';

const LIBRARY_PROPERTY = 'library';

export const LIBRARY_ID_HEADER = 'library-id';

export const LIBRARY_HEADER_OPTIONS: ApiHeaderOptions = {
  name: LIBRARY_ID_HEADER,
  description: 'ID of the library requesting resources for.',
  required: true,
};

/**
 * Extends the express `Request` definition with the resolve `library` field looked up from the header.
 */
export interface LibraryRequest extends Request {
  library: Library;
}

/**
 * Pulls the library ID from the header, validates that it exists, and then attaches it to the request.
 */
@Injectable()
export class LibraryGuard implements CanActivate {
  private readonly _logger = new Logger(LibraryGuard.name);

  public constructor(private readonly _libraryService: LibraryService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const libraryId = request.header(LIBRARY_ID_HEADER);
    if (!libraryId) {
      this._logger.warn('No library ID in header');
      return false;
    }

    const library = await this._libraryService.findOneById(libraryId);
    if (!library) {
      this._logger.warn('No library found for ID', { libraryId });
      return false;
    }

    request[LIBRARY_PROPERTY] = library;

    return true;
  }
}
