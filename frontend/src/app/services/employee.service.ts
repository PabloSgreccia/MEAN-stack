import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../interfaces/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  URL_API = 'http://localhost:3000/api/employees';
  employees!: Employee[];

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.URL_API);
  }

  createEmployee(employee: Employee){
    return this.http.post(this.URL_API, employee);
  }

  deleteEmployee(id: string){
    let employeeUrl = `${this.URL_API}/${id}`;
    return this.http.delete(employeeUrl);
  }

  editEmployee(employee: Employee){
    let employeeUrl = `${this.URL_API}/${employee._id}`;
    return this.http.put(employeeUrl, employee);
  }

}
