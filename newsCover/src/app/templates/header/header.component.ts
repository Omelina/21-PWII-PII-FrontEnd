import { Component, OnInit } from '@angular/core';
import { ApiNewsService } from '../../services/api/api-news.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role:string = '';

  constructor(private router:Router, private api:ApiNewsService, private alerts:AlertsService) { }

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

  /**
   * Función que realiza lo necesario para desloguear al usuario
   */
  logout(){
    localStorage.clear();
    this.api.logout().subscribe(data => {
      if(data.type_msg === "success"){
        this.alerts.showSuccess('Closed session', 'Log out');
        this.router.navigate(['login']);
      }
    })
  }

}
