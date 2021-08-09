import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { CategoryTableComponent } from './views/category-table/category-table.component';
import { NewCategoryComponent } from './views/new-category/new-category.component';
import { EditCategoryComponent } from './views/edit-category/edit-category.component';
import { ResourceTableComponent } from './views/resource-table/resource-table.component';
import { NewResourceComponent } from './views/new-resource/new-resource.component';
import { EditResourceComponent } from './views/edit-resource/edit-resource.component';
import { CoverComponent } from './views/cover/cover.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'category-table', component:CategoryTableComponent},
  { path:'newCategory', component:NewCategoryComponent},
  { path:'editCategory/:id', component:EditCategoryComponent},
  { path:'resource-table', component:ResourceTableComponent},
  { path:'newResource', component:NewResourceComponent},
  { path:'editResource/:id', component:EditResourceComponent},
  { path:'cover', component:CoverComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  CategoryTableComponent,
  NewCategoryComponent,
  EditCategoryComponent,
  ResourceTableComponent,
  NewResourceComponent,
  EditResourceComponent,
  CoverComponent
]
