import { Component, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponseModel, loginCustomer } from '../../models/ticket';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
// variables
loginObj : loginCustomer = new loginCustomer();

// inject the MasterService here
masterServices = inject(MasterService);
router = inject(Router);


// Methods 
onLogin(){
  this.masterServices.login(this.loginObj).subscribe((res : APIResponseModel)=> {
    if (res.result){
      localStorage.setItem('tokenUser', JSON.stringify(res.data));
      this.masterServices.loggedUserData = res.data;
      this.router.navigateByUrl('dashboard');
    }else{
      alert(res.message);
    }
  })
 
}













}
