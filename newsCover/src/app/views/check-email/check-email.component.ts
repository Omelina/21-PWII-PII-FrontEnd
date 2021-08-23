import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiNewsService } from 'src/app/services/api/api-news.service';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.css']
})
export class CheckEmailComponent implements OnInit {

  constructor(private api:ApiNewsService, private router:Router, private activerouter:ActivatedRoute) { }

  ngOnInit(): void {
    let userId:any = this.activerouter.snapshot.paramMap.get('id');
    if(userId != null){
      this.api.email(userId).subscribe(data => {
        if(data.auth){
          localStorage.setItem('token', data.token);
          localStorage.setItem('userLog', data.user._id);
          if(data.user.role === 'admin'){
            console.log(data.user.role);
            this.router.navigate(['category-table']);
          } else if(data.user.role === 'client'){
            console.log(data.user.role);
            this.router.navigate(['resource-table']);
          }
        }
      })
    } else {
      this.router.navigate(['login']);
    }
  }

}
