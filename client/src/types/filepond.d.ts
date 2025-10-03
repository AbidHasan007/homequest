import 'filepond';

declare module 'filepond' {
  interface FilePondOptions {
    maxFileSize?: string | number;
  }
}
