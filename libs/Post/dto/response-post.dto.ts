import { Content } from 'apps/post-app/src/domain/models/Content.model';

export class ResponsePostDto {
  id: string;
  description?: string;
  content: Content[];
}
