import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserRequest } from 'src/identity';
import { LibraryMember } from '../entities';
import { LibraryMemberService } from '../services';
import { LIBRARY_ID_HEADER } from './library.guard';

/**
 * Name of the property that the `library_member` record is set to on the request object.
 */
const LIBRARY_MEMBER_PROPERTY = 'libraryMember';

/**
 * Extends the `UserRequest` definition with a `libraryMember` field for the user and library.
 */
export interface LibraryMemberRequest extends UserRequest {
  libraryMember: LibraryMember;
}

/**
 * Verifies that the user in the request is a member of the library.
 * Note: this requires that `AuthGuard('jwt')` be called first to access the user's ID.
 */
@Injectable()
export class LibraryMemberGuard implements CanActivate {
  private readonly _logger = new Logger(LibraryMemberGuard.name);

  public constructor(
    private readonly _libraryMemberService: LibraryMemberService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as UserRequest;
    if (!request?.user) {
      this._logger.warn('No user attached to request object');
      return false;
    }

    const libraryId = request.header(LIBRARY_ID_HEADER);
    if (!libraryId) {
      this._logger.warn('No library ID in header');
      return false;
    }

    const libraryMember = await this._libraryMemberService.findOne(
      libraryId,
      request.user.id,
    );
    if (!libraryMember) {
      this._logger.warn('No library member found', {
        libraryId,
        userId: request.user.id,
      });
      return false;
    }

    request[LIBRARY_MEMBER_PROPERTY] = libraryMember;

    return true;
  }
}
