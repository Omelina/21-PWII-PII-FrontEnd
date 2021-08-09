import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiNewsService } from '../../services/api/api-news.service';
import { AlertsService } from '../../services/alerts/alerts.service';
import { CategoryI } from '../../modules/category.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  registerForm = new FormGroup({
    name : new FormControl('', Validators.required)
  })

  constructor(private api:ApiNewsService, private router:Router, private alerts:AlertsService) { }

  ngOnInit(): void {
    this.checkUser();
  }

  /**
   * Función que realiza lo necesario para chequear si hay un usuario logeado
   */
  checkUser(){
    if(localStorage.getItem('userLog')){
      let userId:any = localStorage.getItem('userLog') || '{}';
      this.api.getUser(userId).subscribe(data => {
        if(data.role === "client"){
          this.router.navigate(['resource-table'])
        }
      })
    }
  }

  /**
   * Función que realiza lo necesario para registrar una categoria
   * @param form Objeto tipo CategoryI
   */
  onRegister(form:CategoryI){
    this.api.registerCategory(form).subscribe(data => {
      if(data.type_msg === "success"){
        this.alerts.showSuccess('New category saved', 'Successful register');
        this.router.navigate(['category-table']);
      } else if (data.type_msg === "failed"){
        this.alerts.showError('Try again', 'Register failed');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    })
  }

}
