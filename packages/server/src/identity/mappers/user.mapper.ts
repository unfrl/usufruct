import { UserDto } from '../dtos';
import { User } from '../entities';

export const mapUserToDto = (user: User): UserDto => {
  const { id, displayName, email } = user;

  return {
    id,
    displayName,
    email,
  };
};
