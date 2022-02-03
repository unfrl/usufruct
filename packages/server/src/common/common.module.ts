import { Global, Module } from '@nestjs/common';
import { DbTransactionService, S3Service } from './services';

@Global()
@Module({
  providers: [DbTransactionService, S3Service],
  exports: [DbTransactionService, S3Service],
})
export class CommonModule {}
