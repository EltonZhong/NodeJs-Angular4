import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { ReactComponent } from './react';
import { ProfileComponent } from './profile';
//import { angularProfileCard } from '../../components/main-profile/index';
import { LoginComponent } from './login'
import { RegisteComponent } from './registe'
import { NoContentComponent } from './no-content';
import { GoodsComponent } from './goods/goods.component'

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'posts', loadChildren: './posts#PostsModule' },
  { path: 'profile', component: ProfileComponent },
  { path: 'react', component: ReactComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registe', component: RegisteComponent},
  { path: 'goods', component: GoodsComponent},
  { path: '**',    component: NoContentComponent },
];
