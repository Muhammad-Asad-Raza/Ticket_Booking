import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponseModel, DeptObj, GetDept } from '../../models/ticket';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [DatePipe,FormsModule,CommonModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit{

//variables

// signal variable to hold list of departments
deptList = signal<GetDept[]>([]);
deptObj : DeptObj =  new DeptObj()

// Injecting MasterService to get data from API
masterService = inject(MasterService)

// ngOnInit lifecycle hook to get data from API
ngOnInit(): void {
  this.getDepartments()
}
getDepartments(){
  this.masterService.getAllDept().subscribe((res : APIResponseModel)=>{
  this.deptList.set(res.data)
  })
}
createDepartment(){
  this.masterService.createNewDept(this.deptObj).subscribe((res : APIResponseModel)=>{
    if(res.result){
      alert("Created Department Successfully")
      this.getDepartments()
      this.deptObj = new DeptObj()
    }else{
      alert(res.message)
    }
  })
}
resetData(){
  this.deptObj = new DeptObj()
}
onEdit(obj : DeptObj){
  this.deptObj = obj

}
updateDepartment(){
  this.masterService.updateDept(this.deptObj).subscribe((res : APIResponseModel)=>{
    if(res.result){
      alert("Updated Department Successfully")
      this.getDepartments()
      this.deptObj = new DeptObj()
    }else{
      alert(res.message)
    }
  })
}

onDelete(id : number){
  if(confirm("Are you sure you want to delete this department?")){
    this.masterService.deleteDept(id).subscribe((res : APIResponseModel)=>{
      if(res.result){
        alert("Deleted Department Successfully")
        this.getDepartments()
      }else{
        alert(res.message)
      }
    })
  }

}


}
