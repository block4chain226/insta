import { AggregateRoot } from '@nestjs/cqrs';
import { IPost } from './interfaces/Post.interface';
import { Content } from './Content.model';

export class Post extends AggregateRoot implements IPost {
  constructor(
    private _id: string,
    private _content: Content[],
    private _description?: string,
  ) {
    super();
  }

  get id() {
    return this._id;
  }

  get description() {
    return this._description;
  }

  get content() {
    return this._content;
  }

  static create(id: string, description: string, content: Content[]): Post {
    return new Post(id, content, description);
  }
}
