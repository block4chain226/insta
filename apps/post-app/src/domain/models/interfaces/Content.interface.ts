import { FileTypes } from 'libs/Post/constant/post.constant';

export interface IContent {
  mime: FileTypes;
  url: string;
  filename: string;
}
