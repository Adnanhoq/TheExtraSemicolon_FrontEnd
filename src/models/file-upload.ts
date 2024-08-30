import { File } from "./file";
import { UploadedFile } from "./uploaded-file";

export interface FileUpload {
  upload: (files: File[]) => Promise<UploadedFile[]>;
}

