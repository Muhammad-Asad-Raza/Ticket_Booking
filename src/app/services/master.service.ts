import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponseModel, loginCustomer, newTicket } from '../models/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

//variables
apiUrl = "https://freeapi.miniprojectideas.com/api/TicketsNew/";
loggedUserData : loginCustomer = new loginCustomer();

// dependencies injection constructor
constructor(private http: HttpClient) {
  const isUser = localStorage.getItem('tokenUser');
  if(isUser != null) {
  const parseObj = JSON.parse(isUser);
  this.loggedUserData = parseObj;
}
}

login(obj: loginCustomer): Observable<APIResponseModel> {
return this.http.post<APIResponseModel>(this.apiUrl + 'Login',obj)
}
getAllRoles(): Observable<APIResponseModel> {
  return this.http.get<APIResponseModel>(`${this.apiUrl}GetAllRoles`)
  }

// Department services
getAllDept(): Observable<APIResponseModel> {
return this.http.get<APIResponseModel>(`${this.apiUrl}GetDepartments`)
}
createNewDept(obj : any): Observable<APIResponseModel> {
  return this.http.post<APIResponseModel>(`${this.apiUrl}CreateDepartment`,obj)
}
updateDept(obj: any): Observable<APIResponseModel> {
  return this.http.put<APIResponseModel>(`${this.apiUrl}UpdateDepartment`,obj)
}
deleteDept(id : number): Observable<APIResponseModel> {
  return this.http.delete<APIResponseModel>(`${this.apiUrl}DeleteDepartment?id=${id}`)
}

// Parent Category services --- p
getAllpCategory(): Observable<APIResponseModel> {
  return this.http.get<APIResponseModel>(`${this.apiUrl}GetParentCategory`)
  }
  createpCategory(obj : any): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiUrl}CreateParentCategory`,obj)
  }
  updatepCategory(obj: any): Observable<APIResponseModel> {
    return this.http.put<APIResponseModel>(`${this.apiUrl}UpdateParentCategory`,obj)
  }
  deletepCategory(id : number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(`${this.apiUrl}DeleteParentCategory?id=${id}`)
  }

// Child Category services --- c
getAllcCategory(): Observable<APIResponseModel> {
  return this.http.get<APIResponseModel>(`${this.apiUrl}GetChildCategory`)
  }
  createcCategory(obj : any): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiUrl}CreateChildCategory`,obj)
  }
  updatecCategory(obj: any): Observable<APIResponseModel> {
    return this.http.put<APIResponseModel>(`${this.apiUrl}UpdateChildCategory`,obj)
  }
  deletecCategory(id : number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(`${this.apiUrl}DeleteChildCategory?id=${id}`)
  }

  // Employee services
  getAllEmp(): Observable<APIResponseModel> {
  return this.http.get<APIResponseModel>(`${this.apiUrl}GetEmployees`)
  }
  createEmp(obj : any): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiUrl}CreateEmployee`,obj)
  }
  updateEmp(obj: any): Observable<APIResponseModel> {
    return this.http.put<APIResponseModel>(`${this.apiUrl}UpdateEmployee`,obj)
  }
  deleteEmpById(id : number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(`${this.apiUrl}DeleteEmployee?id=${id}`)
  }
  // Ticket services
  // getAllTickets(): Observable<APIResponseModel> {
  //   return this.http.get<APIResponseModel>(`${this.apiUrl}GetAllTickets`)
  // }
  getTicketsCreatedByLoggedEmp(empid : number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}GetTicketsCreatedByEmpId?empid=${empid}`)
  }
  getTicketsAssignedToEmp(empid : number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}GetAssignedTicketsByEmpId?empid=${empid}`)
  }
  createTicket(obj : newTicket): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiUrl}CreateNewTicket`,obj)
  }
  updateTicket(obj: any): Observable<APIResponseModel> {
    return this.http.put<APIResponseModel>(`${this.apiUrl}UpdateTicket`,obj)
  }
  deleteTicketById(id : number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(`${this.apiUrl}DeleteTicket?id=${id}`)
  }
  startTicket(id : number): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiUrl}startTicket?id=${id}`,{})
  }
  closeTicket(id : number): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiUrl}closeTicket?id=${id}`,{})
  }




















}
