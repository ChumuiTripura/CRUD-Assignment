import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { height } from '@mui/system';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-table-part',
  templateUrl: './table-part.component.html',
  styleUrls: ['./table-part.component.css'],
  
})

export class TablePartComponent{
  currentPage : number = 1
  disabledValue : boolean = false;

  public set api(value: ApiService) {
    this.api = value;
  } 
  displayedColumns: string[] = ['id','empName', 'dobemp', 'salaryemp', 'skillemp','action'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // initialization 
  constructor(public dialog: MatDialog, private toast: NgToastService,private _api: ApiService) {} 

  ngOnInit(): void {
    this.getAllEmp('');
  }
  
  // add all the employee details
  getAllEmp(filter: string = '',page:number = 1, limit:number=4){
      this._api.getProduct(filter,page,limit)
      .subscribe({
        next:(res: any | undefined)=>{
          console.log(res.emp1);
          this.dataSource = new MatTableDataSource(res.emp1);
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
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
    this._api.deleteProduct(id)
    .subscribe({
      next: (_res): void=>{
          // alert("you what to delete the details");
          this.toast.success({detail: "Employee details deleted successfully",duration:2000});
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
  previous(){
      this.currentPage-=1;
      this.getAllEmp('',this.currentPage);
  }
  next(){
     this.currentPage += 1;
     this.getAllEmp('',this.currentPage);
     console.log(this.currentPage);
  }
}
