import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Publications } from './entities/publications.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly postsService: PostsService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.prisma.user.create({ data: createUserDto });
    return newUser;
  }

  findAll() {
    const users = this.prisma.user.findMany({
      include: { posts: true },
    });
    return users;
  }

  findOne(id: string) {
    const user = this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return updatedUser;
  }

  remove(id: string) {
    const deletedUser = this.prisma.user.delete({ where: { id } });
    return `user ${deletedUser} has been deleted successfully`;
  }

  async findPostsByUser(id: string) {
    const user = await this.findOne(id);
    const posts = await this.postsService.findUserPosts(id);

    const userfound: Publications = {
      user,
      posts,
    };

    console.log(userfound);

    return userfound;
  }
}
