import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { height } from '@mui/system';
import {DialogComponent }from './dialog/dialog.component'
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Assignment-CRUD1';

  // display in the table rows
  displayedColumns: string[] = ['id','empName', 'dobemp', 'salaryemp', 'skillemp', 'action'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService,  private toast: NgToastService,) {

  } 
  ngOnInit(): void {
    this.getAllEmp();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
        width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val == 'save'){
        this.getAllEmp();
      }
    })
  }

  // add all the employee details
  getAllEmp(){
      this.api.getProduct()
      .subscribe({
        next:(res)=>{
          // console.log(res)
          for(let i=0; i<res.length; i++){
            res[i].employeeIndexId = i + 1;
          }
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:() =>{
          this.toast.error({detail: "Something is wrong!", summary:"Something is wrong!",duration:2000});
        }
      })
  }
  
  // update button 
  updatemp(row: any){
      this.dialog.open(DialogComponent,{
        width : '30%',
        data : row
      }).afterClosed().subscribe(val=>{
        if(val == 'update'){
          this.getAllEmp();
        }
      })
  }

  // delete the employee by using there id 
  deletemp(id:Number){
    this.api.deleteProduct(id)
    .subscribe({
      next: (res)=>{
        // alert("Employee details deleted successfully");
        this.toast.success({detail: "Employee details deleted successfully", summary:res.message,duration:2000});
        
        this.getAllEmp();
      },
      error: ()=>{
        this.toast.error({detail: "Error Finding", summary:"Error Finding!!",duration:2000});
      }
    })
  }

  // searching or filtering 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
