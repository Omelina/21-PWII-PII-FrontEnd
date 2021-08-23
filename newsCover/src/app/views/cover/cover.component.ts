import { Component, OnInit } from '@angular/core';
import { ApiNewsService } from 'src/app/services/api/api-news.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NewsI } from 'src/app/modules/news.interface';
import { InputI } from 'src/app/modules/input.interface';
import { CategoryI } from 'src/app/modules/category.interface';
import { GraphqlService } from 'src/app/services/api-graphql/graphql.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  news:NewsI[] = [];
  categories:CategoryI[] = [];
  tags:any[] = [];
  inputForm = new FormGroup({
    input : new FormControl('', Validators.required)
  })

  constructor(private apiGraph:GraphqlService, private api:ApiNewsService, private router:Router, private activerouter:ActivatedRoute) { }

  ngOnInit(): void {
    let user_id:any = localStorage.getItem('userLog') || '{}';
    this.apiGraph.getNewsbyUser(user_id).subscribe((data) => {
      this.news = data.data.byUser;
    })
    this.api.getCategories().subscribe(data => {
      this.categories = data;
    })
    this.apiGraph.getTags(user_id).subscribe((data) => {
      this.tags = data.data.byUser;
    })
  }

  /**
   * Función que realiza lo necesario para cargar noticias por categoria en la portada
   * @param category_id string
   */
  onLoadByCategory(category_id:any){
    let user_id:any = localStorage.getItem('userLog') || '{}';
    this.apiGraph.getNewsbyCategory(category_id, user_id).subscribe((data) => {
      this.news = data.data.byCategory;
    })
  }

  onLoadByTag(tag:any){
    let user_id:any = localStorage.getItem('userLog') || '{}';
    this.apiGraph.getNewsbyTag(tag, user_id).subscribe((data) => {
      this.news = data.data.byTag;
    })
  }

  onLoadByInput(form:InputI){
    let user_id:any = localStorage.getItem('userLog') || '{}';
    this.apiGraph.getNewsbyInput(form.input, user_id).subscribe((data) => {
      this.news = data.data.byInput;
    })
  }

}
