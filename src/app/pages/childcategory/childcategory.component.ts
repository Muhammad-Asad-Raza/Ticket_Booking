import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponseModel, childCategoryObj, GetCategory, getChildCategory } from '../../models/ticket';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-childcategory',
  imports: [FormsModule],
  templateUrl: './childcategory.component.html',
  styleUrl: './childcategory.component.css'
})
export class ChildcategoryComponent implements OnInit {

childCategoryList = signal<getChildCategory[]>([]);
//variables
childCateObj : childCategoryObj =  new childCategoryObj()

parentCatetList = signal<GetCategory[]>([]);

//inject MasterService
masterService = inject(MasterService)


//ngOnInit lifecycle hook
ngOnInit(): void {
   this.getChildCategory()
   this.getParentCategory()
}
// Get Department List
getParentCategory(){
  this.masterService.getAllpCategory().subscribe((res : APIResponseModel)=>{
  this.parentCatetList.set(res.data)
  })
}
// Get Parent Category List
getChildCategory(){
  this.masterService.getAllcCategory().subscribe((res : APIResponseModel)=>{
  this.childCategoryList.set(res.data)
  })
}

// Create Parent Category
createChildCategory(){
  this.masterService.createcCategory(this.childCateObj).subscribe((res : APIResponseModel)=>{
    if(res.result){
      alert("Created Category Successfully")
      this.getChildCategory()
      this.childCateObj = new childCategoryObj()
    }else{
      alert(res.message)
    }
  })
}

// Reset Data
resetData(){
  this.childCateObj = new childCategoryObj()
}

// Edit Parent Category Data
onEdit(obj : any){
  this.childCateObj = obj 

}

// Update Parent Category
updateChildCategory(){
  this.masterService.updatecCategory(this.childCateObj).subscribe((res : APIResponseModel)=>{
    if(res.result){
      alert("Updated Category Successfully")
      this.getChildCategory()
      this.childCateObj = new childCategoryObj()
    }else{
      alert(res.message)
    }
  })
}

// Delete Parent Category
onDelete(id : number){
  if(confirm("Are you sure you want to delete this Category?")){
    this.masterService.deletecCategory(id).subscribe((res : APIResponseModel)=>{
      if(res.result){
        alert("Deleted Category Successfully")
        this.getChildCategory()
      }else{
        alert(res.message)
      }
    })
  }

}



}
