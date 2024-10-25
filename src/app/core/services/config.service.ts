import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  URL = environment.externalService.configServiceUrl;

  constructor(private http: HttpClient) { }
  getConfig() : Observable<any> {
    return this.http.get<any>(`${this.URL}`)
  }
}
