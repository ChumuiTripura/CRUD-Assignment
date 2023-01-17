import { Component,OnInit, ViewChild} from '@angular/core';
import {DialogComponent }from './dialog/dialog.component'
import { ApiService } from './services/api.service';
import { NgToastService } from 'ng-angular-popup';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  [x: string]: any;
  title = 'Assignment-CRUD1';

  public set api(value: ApiService) {
    this.api = value;
  }
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private toast: NgToastService,public dialog: MatDialog) {} 
  
  openDialog() {
    this.dialog.open(DialogComponent, {
        width: '30%'
    }).afterClosed().subscribe((val: string)=>{
      if(val == 'save'){
        this.getAllEmp();
      }
    })
  }

  // add all the employee details
  getAllEmp(){
    this.api.getProduct()
    .subscribe({
      next:(res: any[] | undefined)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:() =>{
        this.toast.error({detail: "Something is wrong!", summary:"Something is wrong!",duration:2000});
      }
    })
  }
}