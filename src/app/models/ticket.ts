export interface APIResponseModel {
    message : string,
    result: boolean,    
    data: any

}

export class loginCustomer {
    employeeId : number;
    contactNo : number
    deptId : number;
    emailId: string;
    password: string;
    employeeName: string;
    role : string;
  
  constructor() {
  this.emailId ='';
  this.password ='';
  this.employeeName ='';
  this.contactNo =0;
  this.employeeId =0;
  this.deptId = 0;
  this.role ='';
    
  }
}
export interface GetDept {
  deptId : number,
  deptName : string,
  createdDate : Date
}
export class DeptObj {
  deptId : number;
  deptName : string;
  createdDate : Date;

  constructor() {
    this.deptId =0;
    this.deptName ='';
    this.createdDate = new Date();
      
    }
}
export interface GetCategory {
  categoryId : number
  categoryName : string,
  deptId : number,
}
export class categoryObj {
  categoryId : number;
  categoryName : string;
  deptId : number;

  constructor() {
    this.categoryId =0;
    this.categoryName ='';
    this.deptId = 0;
      
    }
}
export interface getChildCategory {
  categoryName : string,
  parentCategoryName : string,
  childCategoryId : number,
}

export class childCategoryObj {
  childCategoryId : number;
  categoryName : string;
  parentCategoryId : number;

  constructor() {
    this.childCategoryId =0;
    this.categoryName ='';
    this.parentCategoryId = 0;
      
    }
}
export interface IGetEmp {
  employeeId : number,
  employeeName : string,
  deptId : number,
  deptName : string,
  contactNo : number,
  emailId : number,
  role : string,
}

export class empObj {
  employeeId : number;
  employeeName : string;
  contactNo : number;
  emailId : number;
  deptId : number;
  password : number;
  gender : string;
  role : string;

  constructor() {
    this.employeeId =0;
    this.employeeName ='';
    this.contactNo =0;
    this.emailId =0;
    this.deptId = 0;
    this.password =0;
    this.gender ='';
    this.role = '';
      
    }
}

// export interface IRole {
//   categoryName : string,
//   parentCategoryName : string,
//   childCategoryId : number,
// }

export class newTicket {
  employeeId : number;
  severity : string;
  childCategoryId : number;
  deptId : number;
  requestDetails : string;

  constructor() {
    this.employeeId =0;
    this.severity ='';
    this.childCategoryId =0;
    this.deptId = 0;
    this.requestDetails ='';

      
    }
}

export interface IGetTicket {
  ticketId : number,
  ticketNo : number,
  deptName : string,
  createdByEmployee : string,
  contactNo : number,
  createdDate : string,
  state : string,
  assignedToEmployee : string,
  parentCategory : string,
  childCategory : string,
  severity : string,
}
export interface IGetAssignTicket {
  ticketId : number,
  ticketNo : number,
  employeeId : number,
  employeeName : string,
  createdDate : string,
  state : string,
  parentCategoryName : string,
  childCategoryName : string,
  severity : string,
  expectedEndDate : string,
  requestDetails : string,
}

