import { Component, OnInit } from '@angular/core';
import { ApiNewsService } from 'src/app/services/api/api-news.service';
import { AlertsService } from '../../services/alerts/alerts.service'
import { Router, RouterLink } from '@angular/router';
import { CategoryI } from 'src/app/modules/category.interface';
@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {

  categories:CategoryI[] = [];

  constructor(private api:ApiNewsService, private router:Router, private alerts:AlertsService) { }

  ngOnInit(): void {
    this.checkUser();
    this.api.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  /**
   * Función que realiza lo necesario para chequear si hay un usuario logeado
   */
  checkUser(){
    if(localStorage.getItem('userLog')){
      let userId:any = localStorage.getItem('userLog') || '{}';
      this.api.getUser(userId).subscribe(data => {
        if(data.role === "admin"){
          this.router.navigate(['category-table'])
        } else if (data.role === "client"){
          this.router.navigate(['resource-table'])
        }
      })
    }
  }

  /**
   * Función que redirecciona al componente de nueva categoria
   */
  newCategory(){
    this.router.navigate(['newCategory']);
  }

  /**
   * Función que redirecciona al componente de editar categoria
   * @param id any - string
   */
  editCategory(id:any){
    this.router.navigate(['editCategory', id]);
  }

  /**
   * Función que realiza lo necesario para eliminar una categoria
   * @param id any - string
   */
  deleteCategory(id:any){
    this.api.deleteCategory(id).subscribe(data => {
      if(data.type_msg === "success"){
        this.alerts.showSuccess('The category has been removed', 'Successful deleted');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else if (data.type_msg === "failed"){
        this.alerts.showError('Try again', 'Deleted failed');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    })
  }
}
