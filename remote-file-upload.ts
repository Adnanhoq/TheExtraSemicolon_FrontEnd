
import { inject, injectable } from "tsyringe";

import { FileUpload } from "./src/models/file-upload";
import { FileUploader } from "./src/services/FileService";
import {File } from "./src/models/file";
import { UploadedFile } from "./src/models/uploaded-file";


@injectable()
export class RemoteFileUpload implements FileUpload {
    constructor(
     @inject("FileUploader")
      private readonly fileUploader: FileUploader
    ) {}
  
    async upload(files: File[]): Promise<UploadedFile[]> {
      const uploadedFiles = await this.fileUploader.upload(files);
  
      if (!uploadedFiles) {
        throw new FileUploadError();
      }
  
      return uploadedFiles as UploadedFile[];
    }
  }