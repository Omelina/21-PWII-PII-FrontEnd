import { Component, OnInit } from '@angular/core';
import { ApiNewsService } from 'src/app/services/api/api-news.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NewsI } from 'src/app/modules/news.interface';
import { CategoryI } from 'src/app/modules/category.interface';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  news:NewsI[] = [];
  categories:CategoryI[] = [];

  constructor(private api:ApiNewsService, private router:Router, private activerouter:ActivatedRoute) { }

  ngOnInit(): void {
    let user_id:any = localStorage.getItem('userLog') || '{}';
    this.api.getNews(user_id).subscribe(data => {
      this.news = data;
    })
    this.api.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  /**
   * Función que realiza lo necesario para cargar noticias por categoria en la portada
   * @param category_id string
   */
  onLoadByCategory(category_id:string){
    this.news = [];
    let user_id:any = localStorage.getItem('userLog') || '{}';
    this.api.getNews(user_id).subscribe(data => {
      data.forEach(element => {
        if(element.category_id === category_id){
          this.news.push(element);
        }
      });
    })
  }

}
