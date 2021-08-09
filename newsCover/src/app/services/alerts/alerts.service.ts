import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toast:ToastrService) { }

  /**
   * Muestra una alerta cuando algo resulto bien
   * @param text string
   * @param title string
   */
  showSuccess(text:string, title:string){
    this.toast.success(text,title);
  }

  /**
   * Muestra una alerta cuando algo resulto mal
   * @param text string
   * @param title string
   */
  showError(text:string, title:string){
    this.toast.error(text,title);
  }

}
