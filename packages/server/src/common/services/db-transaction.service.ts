import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';

@Injectable()
export class DbTransactionService {
  private readonly _logger = new Logger(DbTransactionService.name);

  public constructor(private readonly _connection: Connection) {}

  public async executeInTransaction<T>(
    cb: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    const queryRunner = this._connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await cb(queryRunner.manager);

      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this._logger.error(
        'Failed to execute successfully, transaction rolled back',
        { error },
      );

      throw new InternalServerErrorException('Unknown error occurred.');
    } finally {
      await queryRunner.release();
    }
  }
}
