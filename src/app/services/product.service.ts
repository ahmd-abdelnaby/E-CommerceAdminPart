import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../shared classes and types/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  getAllProducts(): Observable<IProduct[]>{
    const httpOptions = {headers: new HttpHeaders({
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpClient.get<IProduct[]>(`${environment.Api_url}/Products`,httpOptions);
  }

  getProductById(id): Observable<IProduct>{
    const httpOptions = {headers: new HttpHeaders({
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    
    return this.httpClient.get<IProduct>(`${environment.Api_url}/Products/`+id);
  }

  getProductsByName(name): Observable<IProduct[]>{
    const httpOptions = {headers: new HttpHeaders({
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpClient.get<IProduct[]>(`${environment.Api_url}/Products?name=`+name,httpOptions);
  }
  updateProduct(prd: IProduct,id){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};

    return this.httpClient.put(`${environment.Api_url}/Products/`+id, prd, httpOptions);
  }
  deleteProduct(id)
  {
    const httpOptions = {headers: new HttpHeaders({
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpClient.delete(`${environment.Api_url}/Products/`+id, httpOptions);

  }
  addProduct(prd: IProduct){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};

    return this.httpClient.post(`${environment.Api_url}/Products`, prd, httpOptions);
  }

}
