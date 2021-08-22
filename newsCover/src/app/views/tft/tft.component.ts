import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { ApiNewsService } from 'src/app/services/api/api-news.service';

@Component({
  selector: 'app-tft',
  templateUrl: './tft.component.html',
  styleUrls: ['./tft.component.css']
})
export class TftComponent implements OnInit {

  tftForm = new FormGroup({
    tft : new FormControl('', Validators.required)
  })

  constructor(private api:ApiNewsService, private router:Router, private alerts:AlertsService, private activerouter:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onTft(tft:any){
    this.api.tft(tft).subscribe(data => {
      if(data.auth){
        localStorage.setItem('token', data.token);
        localStorage.setItem('userLog', data.user._id);
        if(data.user.role === 'admin'){
          this.router.navigate(['category-table']);
        } else if(data.user.role === 'client'){
          this.router.navigate(['category-resource']);
        }
      } else if (data.type_msg === 'failed'){
        this.alerts.showError('Code is incorrect', '2FT');
      }
    })
  }

}
