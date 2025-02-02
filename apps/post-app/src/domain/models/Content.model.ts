import { FileTypes } from 'libs/Post/constant/post.constant';
import { IContent } from './interfaces/Content.interface';

export class Content implements IContent {
  constructor(
    private _mime: FileTypes,
    private _url: string,
    private _filename: string,
  ) {}

  get url() {
    return this._url;
  }

  get filename() {
    return this._filename;
  }

  get mime() {
    return this._mime;
  }

  static create(mime: FileTypes, url: string, filename: string): Content {
    return new Content(mime, url, filename);
  }
}
