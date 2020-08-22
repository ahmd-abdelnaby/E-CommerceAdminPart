import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, filter, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  

  constructor(private httpClient:HttpClient) { }


postFile(fileToUpload: File): Observable<boolean> {
  const endpoint = 'http://localhost:62584/api/dashboard/UploadImage';
  const formData: FormData = new FormData();
  formData.append('fileKey', fileToUpload, fileToUpload.name);
  return this.httpClient
    .post(endpoint, formData).pipe(
    map(() => { return true; }));
}
  handleError(e: any) {
    throw new Error("Method not implemented.");
  }
}
