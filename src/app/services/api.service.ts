import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Data} from "../api/data";
import {BehaviorSubject, Observable} from "rxjs";
import {Equipe} from "../api/equipe";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  table = new BehaviorSubject(undefined);
  data: Data ;
  private baseUrl = 'http://localhost:8181/springboot-crud-rest/api/';
  varSahre: number;

  constructor(private httpClient: HttpClient) { }
  table$ = this.table.asObservable();
  setTable(data) {
    this.data = data;
    this.table.next(data);
  }
  getTable() {
    return Object.assign({}, this.data);
  }
  getFederation(): Observable<any> {
   return  this.httpClient.get<Data>(this.baseUrl + 'federations');
  }
  postFederation(federation: Data): Observable<Data> {
    return this.httpClient.post<Data>(this.baseUrl + 'federations', federation);
  }
  deleteFederation(id: number) {
    return this.httpClient.delete(this.baseUrl + 'federations/' + id);
  }
 updateFederation(federation: Data) {
    console.log(federation);
    console.log(federation.id);
    return this.httpClient.patch<Data>(this.baseUrl + 'federations/' + federation.id, federation);
 }
 //partage ID
  setId(id: number) {
  this.varSahre = id;
  }
  getId() {
return this.varSahre;
  }

  getFederationById(id): Observable<any> {
    return  this.httpClient.get<Data>(this.baseUrl + 'federations/' + id);
  }

  getEquipe(id): Observable<any> {
    return  this.httpClient.get<Equipe>(this.baseUrl + 'federations/' + id + '/equipes');
  }
}
