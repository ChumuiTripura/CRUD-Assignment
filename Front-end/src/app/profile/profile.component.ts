import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'
import {HttpClientModule} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  employeeId: any;
  employeeDetail : any= [];
  imageView !: SafeUrl;
  public notLoaded: boolean = true;

  dataSource!: MatTableDataSource<any>;
  url = "./assets/images.png"

  constructor(private route: ActivatedRoute, 
    private http : HttpClientModule, 
    public api : ApiService,
    private view: DomSanitizer
    ) { }
      ngOnInit() : void{
        this.employeeId = this.route.snapshot.params['employeeId'];
        this.getProductID();
      }

      getProductID(){
          this.api.getProductID(this.employeeId)
          .subscribe((res : any) => {
            if(res != null){
              this.employeeDetail = res;
              this.imageView = this.view.bypassSecurityTrustUrl(this.employeeDetail.imageUpload);
            }
          })
      }      
}
