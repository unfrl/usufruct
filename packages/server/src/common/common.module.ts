import { Global, Module } from '@nestjs/common';
import { DbTransactionService } from './services';

@Global()
@Module({
  providers: [DbTransactionService],
  exports: [DbTransactionService],
})
export class CommonModule {}
