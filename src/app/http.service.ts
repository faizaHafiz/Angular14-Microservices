import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = "http://localhost:3000";
  constructor(private httpClient:HttpClient) { }

  getbooks():Observable<any>{
    console.log(this.baseUrl+"/catalog")
    return this.httpClient.get(this.baseUrl+"/catalog")
  }

  getCartItems():Observable<any>{
    return this.httpClient.get(this.baseUrl+"/cart/view")
  }

  filterByCategory(category:string):Observable<any>{
    console.log(this.baseUrl+"/catalog/category/"+ category)
    return this.httpClient.get(this.baseUrl+"/catalog/category/"+ category )
  }
  filterByTitle(title:string):Observable<any>{
    console.log(this.baseUrl+"/catalog/title/"+ title)
    return this.httpClient.get(this.baseUrl+"/catalog/title/"+ title )
  }
  filterByCategoryRating(category:string,rating:string):Observable<any>{
    console.log(this.baseUrl+"/catalog/category/"+ category+"/rating/"+rating)
    // /category/:categoryName/rating/:ratingName
    return this.httpClient.get(this.baseUrl+"/catalog/category/"+ category+"/rating/"+rating)
  }
}
