import { Content } from '../Content.model';

export interface IPost {
  id: string;
  content: Content[];
  description?: string;
}
