import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  public pdfUrl = 'https://ci.wecap.mx/media/temas/docs/DIPLOMAS EJEMPLOS.pdf';

  constructor(private http: HttpClient) {}

  getPDF() : Promise<Blob>{
    console.log(this.pdfUrl);
    return this.http.get(this.pdfUrl, {responseType: 'blob'}).pipe().toPromise();
  }
}
