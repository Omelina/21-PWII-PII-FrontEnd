import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiNewsService } from '../../services/api/api-news.service';
import { AlertsService } from '../../services/alerts/alerts.service';
import { RegisterI } from '../../modules/register.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName : new FormControl('', Validators.required),
    lastName : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor(private api:ApiNewsService, private router:Router, private alerts:AlertsService) { }

  ngOnInit(): void {
  }

  /**
   * Función que realiza lo necesario para registrar un usuario en el sistema
   * @param form Objeto tipo RegisterI
   */
  onRegister(form:RegisterI){
    this.api.registerUser(form).subscribe(data => {
      if(data.type_msg === "success"){
        this.alerts.showSuccess('Check your email for activate your account', 'Successful registration');
        this.router.navigate(['login'])
      } else if (data.type_msg === "failed"){
        this.alerts.showError('Try again', 'Sign up failed');
        this.router.navigate(['register'])
      }
    })
  }

}
