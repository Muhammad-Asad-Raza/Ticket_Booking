import { Component, inject, signal } from '@angular/core';
import { APIResponseModel, empObj, GetDept, IGetEmp } from '../../models/ticket';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

employeeList = signal<IGetEmp[]>([]);
deptList = signal<GetDept[]>([]);
RoleList = signal<any[]>([]);
isNewView : boolean = false;
//variables
employeeObj : empObj =  new empObj()


//inject MasterService
masterService = inject(MasterService)

router = inject(Router)
//ngOnInit lifecycle hook
ngOnInit(): void {
  this.getAllEmployee();
  this.getAllDept();
  this.getAllRole();
}


// Employee Add Form Visible
onAdd(){
  this.isNewView = !this.isNewView;
} 
// Get Department List
getAllDept(){
  this.masterService.getAllDept().subscribe((res : APIResponseModel)=>{
  this.deptList.set(res.data)
  })
}
getAllRole(){
  this.masterService.getAllRoles().subscribe((res : APIResponseModel)=>{
  this.RoleList.set(res.data)
  })
}

// Get Parent Category List
getAllEmployee(){
  this.masterService.getAllEmp().subscribe((res : APIResponseModel)=>{
  this.employeeList.set(res.data)
  })
}

// Create Parent Category
createEmployee(){
  this.masterService.createEmp(this.employeeObj).subscribe((res : APIResponseModel)=>{
    if(res.result){
      alert("Created Employee Successfully")
      this.getAllEmployee()
      this.employeeObj = new empObj()
      this.isNewView = !this.isNewView
    }else{
      alert(res.message)
    }
  })
}

// Reset Data
resetData(){
  this.employeeObj = new empObj()
}

// Edit Parent Category Data
onEdit(obj : any){
  this.employeeObj = obj
  this.isNewView = !this.isNewView


}

// Update Parent Category
updateEmployee(){
  this.masterService.updateEmp(this.employeeObj).subscribe((res : APIResponseModel)=>{
    if(res.result){
      alert("Updated Employee Successfully")
      this.getAllEmployee()
      this.employeeObj = new empObj()
      this.isNewView = !this.isNewView

    }else{
      alert(res.message)
    }
  })
}

// Delete Parent Category
onDelete(id : number){
  if(confirm("Are you sure you want to delete this Category?")){
    this.masterService.deleteEmpById(id).subscribe((res : APIResponseModel)=>{
      if(res.result){
        alert("Deleted Employee Successfully")
        this.getAllEmployee()
      }else{
        alert(res.message)
      }
    })
  }

}

}
