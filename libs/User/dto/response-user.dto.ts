import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseUserDto {
  @Expose()
  name: string;
  @Expose()
  email: string;
}
