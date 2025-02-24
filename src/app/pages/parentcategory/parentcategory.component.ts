import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponseModel, categoryObj, GetCategory, GetDept } from '../../models/ticket';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parentcategory',
  imports: [FormsModule],
  templateUrl: './parentcategory.component.html',
  styleUrl: './parentcategory.component.css'
})
export class ParentcategoryComponent implements OnInit  {


// Define Signals for storing data
categoryList = signal<GetCategory[]>([]);
//variables
cateObj : categoryObj =  new categoryObj()

deptList = signal<GetDept[]>([]);

//inject MasterService
masterService = inject(MasterService)


//ngOnInit lifecycle hook
ngOnInit(): void {
   this.getCategory()
   this.getDepartments()
}
// Get Department List
getDepartments(){
  this.masterService.getAllDept().subscribe((res : APIResponseModel)=>{
  this.deptList.set(res.data)
  })
}
// Get Parent Category List
getCategory(){
  this.masterService.getAllpCategory().subscribe((res : APIResponseModel)=>{
  this.categoryList.set(res.data)
  })
}

// Create Parent Category
createCategory(){
  this.masterService.createpCategory(this.cateObj).subscribe((res : APIResponseModel)=>{
    if(res.result){
      alert("Created Category Successfully")
      this.getCategory()
      this.cateObj = new categoryObj()
    }else{
      alert(res.message)
    }
  })
}

// Reset Data
resetData(){
  this.cateObj = new categoryObj()
}

// Edit Parent Category Data
onEdit(obj : categoryObj){
  this.cateObj = obj

}

// Update Parent Category
updateCategory(){
  this.masterService.updatepCategory(this.cateObj).subscribe((res : APIResponseModel)=>{
    if(res.result){
      alert("Updated Category Successfully")
      this.getCategory()
      this.cateObj = new categoryObj()
    }else{
      alert(res.message)
    }
  })
}

// Delete Parent Category
onDelete(id : number){
  if(confirm("Are you sure you want to delete this Category?")){
    this.masterService.deletepCategory(id).subscribe((res : APIResponseModel)=>{
      if(res.result){
        alert("Deleted Category Successfully")
        this.getCategory()
      }else{
        alert(res.message)
      }
    })
  }

}







}
