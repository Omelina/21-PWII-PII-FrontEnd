import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { ApiNewsService } from 'src/app/services/api/api-news.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  constructor(private api:ApiNewsService, private router:Router, private activerouter:ActivatedRoute, private alerts:AlertsService) { }

  ngOnInit(): void {
    let userId:any = this.activerouter.snapshot.paramMap.get('id');
    this.api.activateUser(userId).subscribe(data => {
      if(data.type_msg === 'success'){
        this.alerts.showSuccess('Account is activated', 'Successful Activated')
        this.router.navigate(['login']);
      }
    })
  }

}
