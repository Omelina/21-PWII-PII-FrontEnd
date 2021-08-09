import { Component, OnInit } from '@angular/core';
import { ApiNewsService } from 'src/app/services/api/api-news.service';
import { AlertsService } from '../../services/alerts/alerts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { CategoryI } from 'src/app/modules/category.interface'
import { ResourceI } from 'src/app/modules/resource.interface'
@Component({
  selector: 'app-new-resource',
  templateUrl: './new-resource.component.html',
  styleUrls: ['./new-resource.component.css']
})
export class NewResourceComponent implements OnInit {

  categories:CategoryI[] = [];
  registerForm = new FormGroup({
    name : new FormControl('', Validators.required),
    url : new FormControl('', Validators.required),
    category_id : new FormControl('', Validators.required)
  })

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
        }
      })
    }
  }

  /**
   * Función que realiza lo necesario para registrar un recurso
   * @param form Objeto tipo ResouceI
   */
  onRegister(form:ResourceI){
    form.user_id = localStorage.getItem('userLog') || '{}';
    this.api.registerResource(form).subscribe(data => {
      if(data.type_msg === "success"){
        this.alerts.showSuccess('New resource saved', 'Successful register');
        this.router.navigate(['resource-table']);
      } else if (data.type_msg === "failed"){
        this.alerts.showError('Try again', 'Register failed');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    })
  }

}
