import { Post } from 'src/posts/entities/post.entity';
import { User } from './user.entity';

export class Publications {
  user: User;
  posts: Post[];
}
