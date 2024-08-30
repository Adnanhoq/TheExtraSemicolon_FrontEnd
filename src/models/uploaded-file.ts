export interface UploadedFile {
    path: string;
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
  }