import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiNewsService } from '../../services/api/api-news.service';
import { AlertsService } from '../../services/alerts/alerts.service'
import { CategoryI } from '../../modules/category.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiNewsService, private alerts:AlertsService) { }

  dataCategory:CategoryI | undefined;
  editForm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('')
  })

  ngOnInit(): void {
    this.checkUser();
    let categoryid:any = this.activerouter.snapshot.paramMap.get('id');
    this.api.getCategory(categoryid).subscribe(data => {
      this.dataCategory = data;
      this.editForm.setValue({
        '_id': this.dataCategory._id,
        'name': this.dataCategory.name
      })
    })
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
   * Función que realiza lo necesario para actualizar una categoria
   * @param form Objeto de tipo CategoryI
   */
  onUpdate(form:CategoryI){
    this.api.putCategory(form).subscribe(data => {
      if(data.type_msg === "success"){
        this.alerts.showSuccess('The category has been edited', 'Successful updated');
        this.router.navigate(['category-table'])
      } else if (data.type_msg === "failed"){
        this.alerts.showError('Try again', 'Updated failed');
        this.router.navigate(['category-table'])
      }
    })
  }

}
