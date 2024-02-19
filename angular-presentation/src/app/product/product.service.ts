import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProductModel, IProductResponse} from "./interfaces/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  products(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>('/product');
  }

  product(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`/product/${id}`)
  }

  add(model: IProductModel): Observable<any> {
    return this.http.post('/product', model);
  }

  update(model: any) {
    return this.http.put('/product', model);
  }

  delete(id: number) {
    return this.http.delete(`/product/${id}`);
  }
}
