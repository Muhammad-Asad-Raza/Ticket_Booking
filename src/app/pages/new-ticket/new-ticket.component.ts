import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponseModel, GetCategory, getChildCategory, GetDept, loginCustomer, newTicket } from '../../models/ticket';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  imports: [FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit {
// get all list from API 
deptList = signal<GetDept[]>([]);
parentCatetList = signal<GetCategory[]>([]);
childCategoryList : getChildCategory[] = [];

// logged in user data
// loggedUserData : loginCustomer = new loginCustomer();
 // variables to hold new ticket object 
newTicketObj : newTicket = new newTicket();
// Empty because ngModels values are assigned
selectPCategory : string = '';

// Filtered list to show only child categories of selected parent category
filterCategoryList : getChildCategory[] = [];

// Injecting MasterService to get data from API
masterServices = inject(MasterService)

// ngOnInit lifecycle hook to get data from API
ngOnInit(): void {

  const isUser = localStorage.getItem('tokenUser');
  if(isUser != null) {
  const parseObj = JSON.parse(isUser);
  this.newTicketObj.employeeId = parseObj.employeeId;
  }
  // Call API to fetch data 
  this.getAllDept();
  this.getParentCategory();
  this.getChildCategory();
 
}
// filtering because child category list is dependent on parent category
onCategoryChange(){
  this.filterCategoryList = this.childCategoryList.filter( x => x.parentCategoryName == this.selectPCategory);
}

// Function get 
getAllDept() {
  this.masterServices.getAllDept().subscribe((res:APIResponseModel) => {
    this.deptList.set(res.data);
  });
}
getParentCategory(){
  this.masterServices.getAllpCategory().subscribe((res : APIResponseModel)=>{
  this.parentCatetList.set(res.data)
  })
}
getChildCategory(){
  this.masterServices.getAllcCategory().subscribe((res : APIResponseModel)=>{
  this.childCategoryList = res.data
  })
}

// Function to create new ticket
creteTicket(){
    this.masterServices.createTicket(this.newTicketObj).subscribe((res : APIResponseModel)=>{
      if(res.result){
        alert("Ticket Created Successfully")
        this.newTicketObj = new newTicket();
        this.selectPCategory = '';
      }else{
        alert(res.message)
      }
    })
  }



















}
