import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Global() // module use all location
@Module({
  providers: [PrismaService],
  exports:[PrismaService]
})
export class PrismaModule {}
