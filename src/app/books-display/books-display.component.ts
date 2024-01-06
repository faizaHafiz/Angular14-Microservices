import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'

@Component({
  selector: 'app-books-display',
  templateUrl: './books-display.component.html',
  styleUrls: ['./books-display.component.css']
})
export class BooksDisplayComponent implements OnInit {
  books:any[]=[];
  rating=""
  title=""
  category=""
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.getbooks().subscribe(data=>this.books=data.books)
  }

  FilterByCategory(){
    if(this.category=="" && this.title){
      console.log("in title")
      this.httpService.filterByTitle(this.title).subscribe(data=>this.books=data.books)
    }
    else if(this.category && this.title=="" && this.rating==""){
      console.log("in category")
      this.httpService.filterByCategory(this.category).subscribe(data=>this.books=data.books)
    }
    else if(this.category && this.rating && this.title==""){
      // /category/:categoryName/rating/:ratingName
      this.httpService.filterByCategoryRating(this.category,this.rating).subscribe(data=>this.books=data.books)
    }
  }
  

}
