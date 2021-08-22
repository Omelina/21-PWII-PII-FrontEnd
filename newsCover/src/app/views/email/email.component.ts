import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiNewsService } from '../../services/api/api-news.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service'
import { EmailI } from 'src/app/modules/email.inteface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  emailForm = new FormGroup({
    email : new FormControl('', Validators.required)
  })

  constructor(private api:ApiNewsService, private router:Router, private alerts:AlertsService) { }

  ngOnInit(): void {
  }

  onEmail(form:EmailI){
    this.api.loginByEmail(form).subscribe(data => {
      if(data.type_msg === 'success'){
        this.alerts.showSuccess('Check your email', 'Email Send');
        setTimeout(() => {
          window.close();
        }, 2000);
      }
    })
  }

}
