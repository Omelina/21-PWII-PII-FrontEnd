import { Component, OnInit } from '@angular/core';
import { ApiNewsService } from 'src/app/services/api/api-news.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { Router, RouterLink } from '@angular/router';
import { ResourceI } from 'src/app/modules/resource.interface';
import { CategoryI } from '../../modules/category.interface'
@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})
export class ResourceTableComponent implements OnInit {

  resources:ResourceI[] = [];

  constructor(private api:ApiNewsService, private router:Router, private alerts:AlertsService) { }

  ngOnInit(): void {
    this.checkUser();
    this.api.getResources(localStorage.getItem('userLog') || '{}').subscribe(dataRe => {
      dataRe.forEach(resource => {
        this.api.getCategory(resource.category_id).subscribe(dataCa => {
          if(resource.category_id === dataCa._id){
            resource.category_id = dataCa;
          }
        })
      });
      this.resources = dataRe;
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
   * Función que redirecciona al componente de nuevo recurso
   */
  newResource(){
    this.router.navigate(['newResource']);
  }

  /**
   * Función que redirecciona al componente de editar recurso
   * @param id any - string
   */
  editResource(id:any){
    this.router.navigate(['editResource', id]);
  }

  /**
   * Función que realiza lo necesario para eliminar un recurso
   * @param id any - string
   */
  deleteResource(id:any){
    this.api.deleteResource(id).subscribe(data => {
      if(data.type_msg === "success"){
        this.alerts.showSuccess('The resource has been removed', 'Successful deleted');
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
