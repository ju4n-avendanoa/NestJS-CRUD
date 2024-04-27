import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [PostsModule],
})
export class UsersModule {}
