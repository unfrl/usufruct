import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRequest } from 'src/identity';
import { LibraryService } from '../services';

const HEADER_LIBRARY_ID = 'x-usufruct-library-id';

/**
 * Pulls the library ID from header and verifies that the user in the request
 * object is a member of the library. Note: this requires that `AuthGuard('jwt')`
 * be called first as it depends on the `user` property that it sets.
 */
@Injectable()
export class LibraryMemberGuard implements CanActivate {
  public constructor(private readonly _libraryService: LibraryService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as UserRequest;
    if (!request?.user) {
      return false;
    }

    return !!(await this._libraryService.getLibraryMember(
      request.header(HEADER_LIBRARY_ID),
      request.user.id,
    ));
  }
}
