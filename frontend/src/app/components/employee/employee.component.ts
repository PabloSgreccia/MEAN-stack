import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// Interfaces
import { Employee } from 'src/app/interfaces/employee';
// Services
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  selectedEmployee: Employee = {
    name: '',
    office: '',
    position: '',
    salary: 0,
  };

  constructor(private emplyeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.emplyeeService.getEmployees()
    .subscribe(employees => this.employees = employees )  
  }

  addOdrEditEmployee(form: NgForm): void{
    form.value.name = form.value.name.trim();
    form.value.position = form.value.position.trim();
    form.value.office = form.value.office.trim();

    if(!form.value.name 
      || !form.value.position 
      || !form.value.office 
      || !form.value.salary){
        console.log('pone todo pa');
        return;
      };

      if(form.value._id){
        //Edit employee
        this.emplyeeService.editEmployee(form.value as Employee)
          .subscribe(_ => {
            this.getEmployees();
            form.reset();
          })
      } else {
        // Add employee
        this.emplyeeService.createEmployee(form.value as Employee)
          .subscribe(_ => {
            this.getEmployees(); 
            form.reset()
          })
      }

  }

  deleteEmployee(employee: Employee){
    if(employee._id){
      this.employees = this.employees.filter(e => e !== employee)
      this.emplyeeService.deleteEmployee(employee._id).subscribe()
    }
  }

  editEmployee(employee: Employee){
    this.selectedEmployee = employee;
  }

  resetForm(form: NgForm){
    form.reset();
  }

}
