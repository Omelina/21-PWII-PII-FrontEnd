import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { EmailComponent } from './views/email/email.component';
import { CheckEmailComponent } from './views/check-email/check-email.component';
import { TftComponent } from './views/tft/tft.component';
import { RegisterComponent } from './views/register/register.component';
import { ActivateComponent } from './views/activate/activate.component';
import { CategoryTableComponent } from './views/category-table/category-table.component';
import { NewCategoryComponent } from './views/new-category/new-category.component';
import { EditCategoryComponent } from './views/edit-category/edit-category.component';
import { ResourceTableComponent } from './views/resource-table/resource-table.component';
import { NewResourceComponent } from './views/new-resource/new-resource.component';
import { EditResourceComponent } from './views/edit-resource/edit-resource.component';
import { CoverComponent } from './views/cover/cover.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'login', component:LoginComponent},
  { path:'email', component:EmailComponent},
  { path:'checkEmail/:id', component:CheckEmailComponent},
  { path:'tft', component:TftComponent},
  { path:'register', component:RegisterComponent},
  { path:'activate/:id', component:ActivateComponent },
  { path:'category-table', component:CategoryTableComponent, canActivate: [AuthGuard]},
  { path:'newCategory', component:NewCategoryComponent, canActivate: [AuthGuard]},
  { path:'editCategory/:id', component:EditCategoryComponent, canActivate: [AuthGuard]},
  { path:'resource-table', component:ResourceTableComponent, canActivate: [AuthGuard]},
  { path:'newResource', component:NewResourceComponent, canActivate: [AuthGuard]},
  { path:'editResource/:id', component:EditResourceComponent, canActivate: [AuthGuard]},
  { path:'cover', component:CoverComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  EmailComponent,
  CheckEmailComponent,
  TftComponent,
  RegisterComponent,
  ActivateComponent,
  CategoryTableComponent,
  NewCategoryComponent,
  EditCategoryComponent,
  ResourceTableComponent,
  NewResourceComponent,
  EditResourceComponent,
  CoverComponent
]
