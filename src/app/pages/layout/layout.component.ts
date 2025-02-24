import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { loginCustomer } from '../../models/ticket';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit  {

  
loggedUserData : loginCustomer = new loginCustomer();
router = inject(Router)
masterServices = inject(MasterService);

ngOnInit(): void {
  const isUser = localStorage.getItem('tokenUser');
  if(isUser != null) {
  const parseObj = JSON.parse(isUser);
  this.loggedUserData = parseObj;
}
}


onLogOut(){
  localStorage.removeItem('tokenUser');
  this.masterServices.loggedUserData = new loginCustomer();
  this.router.navigateByUrl("login");
 
}






}
