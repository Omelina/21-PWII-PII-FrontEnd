import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiNewsService } from '../../services/api/api-news.service';
import { LoginI } from '../../modules/login.interface';

import { Router, ActivatedRoute } from '@angular/router';
import { MessageI } from '../../modules/message.interface';
import { UserI } from 'src/app/modules/user.interface';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor(private api:ApiNewsService, private router:Router, private alerts:AlertsService, private activerouter:ActivatedRoute) { }

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
        let userLog:UserI = data;
        if(userLog.role === "admin"){
          this.router.navigate(['category-table'])
        } else if (userLog.role === "client"){
          this.router.navigate(['resource-table'])
        }
      })
    }
  }

  /**
   * Función que realiza lo necesario para logear al usuario en el sistema
   * @param form Objeto tipo LoginI
   */
  onLogin(form:LoginI){
    this.api.login(form).subscribe(data => {
      if(data.type_msg === 'success'){
        this.router.navigate(['tft'])
      } else if(data.type_msg === 'failed'){
        this.alerts.showError('Try again', 'Sign In failed');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    })
  }

}
