import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`http://localhost:3000/api/upload`, formData, {responseType:'text'}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading file:', error);
        return throwError(error);
      })
    );
  }

  getUploadedFiles(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/uploads`);
  }
  deleteAllFiles(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteAll`,{responseType:'text'}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting files:', error);
        return throwError(error);
      })
    );
  }
}
