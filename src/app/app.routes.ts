import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DepartmentComponent } from './pages/department/department.component';
import { ParentcategoryComponent } from './pages/parentcategory/parentcategory.component';
import { ChildcategoryComponent } from './pages/childcategory/childcategory.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        component: LayoutComponent,
        children : [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'department',
                component: DepartmentComponent,
            },
            {
                path: 'parentCategory',
                component: ParentcategoryComponent,
            },
            {
                path: 'childCategory',
                component: ChildcategoryComponent,
            },
            {
                path: 'employee',
                component: EmployeeComponent,
            },
            {
                path: 'newTicket',
                component: NewTicketComponent,
            },
            {
                path: 'ticketList',
                component: TicketListComponent,
            },
        ]
    },

];
