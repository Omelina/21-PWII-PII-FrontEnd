import { Injectable } from '@angular/core';
import { MessageI } from '../../modules/message.interface';
import { UserI } from '../../modules/user.interface';
import { LoginI } from '../../modules/login.interface';
import { RegisterI } from '../../modules/register.interface';
import { CategoryI } from 'src/app/modules/category.interface';
import { ResourceI } from '../../modules/resource.interface';
import { NewsI } from '../../modules/news.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiNewsService {

  url:string = "http://localhost:3000/";

  constructor(private http:HttpClient) { }

  // USER
  /**
   * Valida que la información del usuario sea correcta para logearlo
   * @param form Objeto tipo LoginI
   * @returns Objeto tipo MessageI
   */
  loginByEmail(form:LoginI):Observable<MessageI>{
    let direction = this.url + "users/singin";
    return this.http.post<MessageI>(direction, form);
  }

  /**
   * Deslogea al usuario de la aplicación
   * @returns Obejto tipo MessageI
   */
  logout():Observable<MessageI>{
    let direction = this.url + "users/logout";
    return this.http.get<MessageI>(direction);
  }

  /**
   * Registra un usuario
   * @param form Objeto tipo RegisterI
   * @returns Objeto tipo MessageI
   */
  registerUser(form:RegisterI):Observable<MessageI>{
    let direction = this.url + "users/singup";
    return this.http.post<MessageI>(direction, form);
  }

  /**
   * Obtiene un usuario por su id
   * @param id string
   * @returns Objeto tipo UserI
   */
  getUser(id:string):Observable<UserI>{
    let direction = this.url + "users/" + id;
    return this.http.get<UserI>(direction);
  }

  // CATEGORY
  /**
   * Registra una categoria
   * @param form Objeto tipo CategoryI
   * @returns Objeto tipo MessageI
   */
  registerCategory(form:CategoryI):Observable<MessageI>{
    let direction = this.url + "categories/";
    return this.http.post<MessageI>(direction, form);
  }

  /**
   * Obtiene una lista de categorias
   * @returns Lista de objetos tipo CategoryI
   */
  getCategories():Observable<CategoryI[]>{
    let direction = this.url + "categories/";
    return this.http.get<CategoryI[]>(direction);
  }

  /**
   * Obtiene una categoria por su id
   * @param id string
   * @returns Objeto tipo CategoryI
   */
  getCategory(id:string):Observable<CategoryI>{
    let direction = this.url + "categories/" + id;
    return this.http.get<CategoryI>(direction);
  }

  /**
   * Actualiza una categoria
   * @param form Objeto tipo CategoryI
   * @returns Objeto tipo MessageI
   */
  putCategory(form:CategoryI):Observable<MessageI>{
    let direction = this.url + "categories/" + form._id;
    return this.http.put<MessageI>(direction, form)
  }

  /**
   * Elimina una categoria
   * @param id string
   * @returns Objeto tipo MessageI
   */
  deleteCategory(id:string):Observable<MessageI>{
    let direction = this.url + "categories/" + id;
    return this.http.delete<MessageI>(direction);
  }

  // RESOURCE
  /**
   * Regsitra un recurso
   * @param form Objeto tipo ResourceI
   * @returns Objeto tipo MessageI
   */
  registerResource(form:ResourceI):Observable<MessageI>{
    let direction = this.url + "resources/";
    return this.http.post<MessageI>(direction, form);
  }

  /**
   * Obtiene una lista de recursos
   * @param id string
   * @returns Lista de objetos tipo ResourceI
   */
  getResources(id:string):Observable<ResourceI[]>{
    let direction = this.url + "resources/" + id;
    return this.http.get<ResourceI[]>(direction);
  }

  /**
   * Obtiene un recurso por su id
   * @param id string
   * @returns Objeto tipo ResourceI
   */
  getResource(id:string):Observable<ResourceI>{
    let direction = this.url + "resource/" + id;
    return this.http.get<ResourceI>(direction);
  }

  /**
   * Actualiza un recurso
   * @param form Objeto tipo ResourceI
   * @returns Objeto tipo MessageI
   */
  putResource(form:ResourceI):Observable<MessageI>{
    let direction = this.url + "resources/" + form._id;
    return this.http.put<MessageI>(direction, form)
  }

  /**
   * Elimina un recurso
   * @param id string
   * @returns Objeto tipo MessageI
   */
  deleteResource(id:string):Observable<MessageI>{
    let direction = this.url + "resources/" + id;
    return this.http.delete<MessageI>(direction);
  }

  // NEWS
  /**
   * Obtiene una lista de noticias
   * @param id string
   * @returns Lista de objetos tipo NewsI
   */
  getNews(id:string):Observable<NewsI[]>{
    let direction = this.url + "news/" + id;
    return this.http.get<NewsI[]>(direction);
  }
}
