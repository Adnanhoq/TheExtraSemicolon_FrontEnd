import { File } from "../models/file";
import { UploadedFile } from "../models/uploaded-file";

export interface FileUploader {
  upload: (
    files: File | File[]
  ) => Promise<UploadedFile | UploadedFile[] | undefined>;
}