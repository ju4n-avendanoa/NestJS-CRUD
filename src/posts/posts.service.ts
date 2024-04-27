import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    const newPost = this.prisma.post.create({ data: createPostDto });
    return newPost;
  }

  async findUserPosts(id: string) {
    const posts = await this.prisma.post.findMany({ where: { authorId: id } });
    return posts;
  }

  findOne(id: string) {
    const post = this.prisma.post.findUnique({ where: { id } });
    return post;
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    const UpdatedPost = this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
    return UpdatedPost;
  }

  remove(id: string) {
    const deletedPost = this.prisma.post.delete({ where: { id } });
    return `post #${deletedPost} deleted`;
  }
}
