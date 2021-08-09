import { Component, OnInit } from '@angular/core';
import { ApiNewsService } from '../../services/api/api-news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  role:string = '';

  constructor(private router:Router, private api:ApiNewsService) { }

  ngOnInit(): void {
    let user:any = localStorage.getItem('userLog');
    this.api.getUser(user).subscribe(data => {
      if(data.role === 'admin'){
        this.role = 'admin';
      } else if(data.role = 'client'){
        this.role = 'client';
      }
    })
  }

}
