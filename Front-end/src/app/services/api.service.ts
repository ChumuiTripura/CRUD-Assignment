import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs';

const url = "http://localhost:3000/";
@Injectable({
  providedIn: 'root'
  
})

export class ApiService {
  constructor(private http:HttpClient) { }

  postProduct(data: any){
    return this.http.post<any>(url, data)
  }

  getProduct(filter: String= '',page: number = 1, limit : number = 4){
    return this.http.get<any>(url + `?search=${filter}&page=${page}&limit=${limit}`);
  }
  putProduct(data: any, _id:any){
    return this.http.patch<any>(url+_id, data);
  }

  deleteProduct(_id:any){
    return this.http.delete<any>(url+_id);
  }

  getProductID(_id: any){
      return this.http.get<any>(url+_id)
  }
}
