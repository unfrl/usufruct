import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRequest } from 'src/identity';
import { LibraryMember } from '../entities';
import { LibraryMemberService } from '../services';

/**
 * ID of the custom header used for the library ID. Used to verify a user's membership
 * and filter records based on the library they belong to.
 */
const HEADER_LIBRARY_ID = 'x-usufruct-library-id';

/**
 * Name of the property that the `library_member` record is set to on the request object.
 */
const LIBRARY_MEMBER_PROPERTY_NAME = 'libraryMember';

/**
 * Extends the `UserRequest` definition with a `libraryMember` field for the user and library.
 */
export interface LibraryMemberRequest extends UserRequest {
  libraryMember: LibraryMember;
}

/**
 * Pulls the library ID from header and verifies that the user in the request
 * object is a member of the library. Note: this requires that `AuthGuard('jwt')`
 * be called first as it depends on the `user` property that it sets.
 */
@Injectable()
export class LibraryMemberGuard implements CanActivate {
  public constructor(
    private readonly _libraryMemberService: LibraryMemberService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as UserRequest;
    if (!request?.user || !request.header(HEADER_LIBRARY_ID)) {
      return false;
    }

    const libraryMember = await this._libraryMemberService.findOne(
      request.header(HEADER_LIBRARY_ID),
      request.user.id,
    );
    if (!libraryMember) {
      return false;
    }

    request[LIBRARY_MEMBER_PROPERTY_NAME] = libraryMember;

    return true;
  }
}
