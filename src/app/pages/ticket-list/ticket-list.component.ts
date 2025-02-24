import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { APIResponseModel, IGetAssignTicket, IGetTicket, loginCustomer, newTicket } from '../../models/ticket';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  imports: [FormsModule,DatePipe],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit  {

// variable to hold logged in user details
loggedUserEmpId : loginCustomer = new loginCustomer();

// injecting MasterService
masterServices = inject(MasterService);

// variable to hold selected mode (Assigned Tickets or My Tickets)
mode : string = 'My Tickets';

// variable to hold list of tickets
ticketsList : IGetTicket[]=[];
ticketAssginList : IGetAssignTicket[]=[];
newTicketObj : newTicket = new newTicket();

// ngOnInit lifecycle hook to get data from API
ngOnInit(): void {
  const isUser = localStorage.getItem('tokenUser');
  if(isUser != null) {
  const parseObj = JSON.parse(isUser);
  this.loggedUserEmpId.employeeId = parseObj.employeeId;
}
this.changeBtn(this.mode);
}
changeBtn(tab : string) {
  this.mode = tab;

  if(this.mode == 'My Tickets') {
  this.masterServices.getTicketsCreatedByLoggedEmp(this.loggedUserEmpId.employeeId).subscribe((res : APIResponseModel)=>{
    this.ticketsList = res.data;
  })
  } else{
    this.masterServices.getTicketsAssignedToEmp(this.loggedUserEmpId.employeeId).subscribe((res : APIResponseModel)=>{
    this.ticketAssginList = res.data;
  })

}
}
// state change 
changeState(state : string , ticketId : number){
if(state == 'Start'){
  this.masterServices.startTicket(ticketId).subscribe((res : APIResponseModel)=>{
    if(res.result){
      alert("Ticket status changed");
      this.changeBtn(this.mode);
    }else{
      alert(res.message);
    }
})
}else{
  this.masterServices.closeTicket(ticketId).subscribe((res : APIResponseModel)=>{
    if(res.result){
      alert("Ticket Closed");
      this.changeBtn(this.mode);
    } else{
      alert(res.message);
    }
})
}

}

onEdit(obj : any){
this.newTicketObj = obj;
}

onDelete(id : number){
  if(confirm("Are you sure you want to delete this ticket?")) {
  this.masterServices.deleteTicketById(id).subscribe((res : APIResponseModel)=>{
    if(res.result){
      alert("Ticket deleted successfully");
      this.ngOnInit();
    }
  })
}
}















}
