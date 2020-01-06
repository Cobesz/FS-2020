import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BeerLockerService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex = 1, pageSize = 5): Observable<any> {
    return this.http.get(`${environment.apiUrl}/beers?start=${pageIndex}&limit=${pageSize}`).pipe(map(beers => {
      return (beers as any).items;
    }));
  }
}


