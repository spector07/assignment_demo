import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { ModuleWithProviders } from '@angular/core';
export const router: Routes = [
    {path:'users',component:UserlistComponent},
    { path: '**', component: UserlistComponent },
    { path: '', component: UserlistComponent }
];


export const routes: ModuleWithProviders = RouterModule.forRoot(router);

