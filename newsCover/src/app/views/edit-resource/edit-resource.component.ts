import { Component, OnInit } from '@angular/core';
import { ApiNewsService } from 'src/app/services/api/api-news.service';
import { AlertsService } from '../../services/alerts/alerts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryI } from 'src/app/modules/category.interface'
import { ResourceI } from 'src/app/modules/resource.interface'

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {

  dataResource:ResourceI | undefined
  categories:CategoryI[] = [];
  editForm = new FormGroup({
    _id: new FormControl(''),
    name : new FormControl(''),
    url : new FormControl(''),
    category_id : new FormControl('')
  })

  constructor(private activerouter:ActivatedRoute, private api:ApiNewsService, private router:Router, private alerts:AlertsService) { }

  ngOnInit(): void {
    this.checkUser();
    let resourceid:any = this.activerouter.snapshot.paramMap.get('id');
    this.api.getResource(resourceid).subscribe(data => {
      this.dataResource = data;
      this.editForm.setValue({
        '_id': this.dataResource._id,
        'name': this.dataResource.name,
        'url': this.dataResource.url,
        'category_id': this.dataResource.category_id
      })
    })
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
   * Función que realiza lo necesario para actulizar un recurso
   * @param form Objeto tipo ResourceI
   */
  onUpdate(form:ResourceI){
    this.api.putCategory(form).subscribe(data => {
      if(data.type_msg === "success"){
        this.alerts.showSuccess('The resource has been edited', 'Successful updated');
        this.router.navigate(['resource-table'])
      } else if (data.type_msg === "failed"){
        this.alerts.showError('Try again', 'Updated failed');
        this.router.navigate(['resource-table'])
      }
    })
  }

}
