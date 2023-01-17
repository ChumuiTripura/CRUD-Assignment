import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  toppings = new FormControl('');

  toppingList: string[] = ['Python', 'C++', 'JavaScript', 'Machine Learning', 'Computer Vision', 
  'Web Development', 'Cloud Computing'];
  productForm !: FormGroup;
  actionBtn : string = "save";
  constructor(private formBuilder : FormBuilder, private api: ApiService,
    private http: HttpClient,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
     private dialogRef: MatDialogRef<DialogComponent>){}

  today = new Date(); 
  url = "./assets/images.png"

  ngOnInit (): void{
    this.productForm = this.formBuilder.group({
      empName : ['',Validators.required],
      dobemp : ['', Validators.required],
      salaryemp : ['', Validators.required],
      skillemp : ['', Validators.required],
      imageUpload : ['', Validators.required]
    })
    // console.log(this.editData);
    
    // set the datas in the add details form 
    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['empName'].setValue(this.editData.empName);
      this.productForm.controls['dobemp'].setValue(this.editData.dobemp);
      this.productForm.controls['salaryemp'].setValue(this.editData.salaryemp);
      this.productForm.controls['skillemp'].setValue(this.editData.skillemp);
      this.productForm.controls['imageUpload'].setValue(this.editData.imageUpload);
    }
  }
 
  // inside the dailog when we add the details
  addEmp(){
      if(!this.editData){
        if(this.productForm.valid){
          console.log(this.productForm.value)
          this.api.postProduct(this.productForm.value)
          .subscribe({
            next:(res=>{
              // alert(res.message)
              this.toast.success({detail: "Employee details added successfully", summary:res.message,duration:2000});
              this.productForm.reset();
              this.dialogRef.close('save');
            }),
            error:()=>{
                // alert("Error while adding the employee details")
                this.toast.error({detail: "Error message", summary:"Error while adding the employee details",duration:2000});
            }
          })
        }
      }else{
        this.updateEmp();
      }
  }


  // update button when users wants change in the details
    updateEmp(){
        this.api.putProduct(this.productForm.value, this.editData._id)
        .subscribe({
          next: (res)=>{
            // alert("Employee details is updated successfully");
            this.toast.success({detail: "Employee details is updated successfully", summary:res.message,duration:2000});
            this.productForm.reset();
            this.dialogRef.close('update');
          },
          error:()=>{
            this.toast.error({detail: "Error Message", summary:"Error Finding!!!",duration:2000});
          }
        })
    }


    // upload image part
    imageUpload(event: any){
        // console.log(event)
        if(event.target.files){
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload= (event:any)=>{
              this.url = event.target.result;
              this.productForm.controls['imageUpload'].setValue(this.url);
          }
        }
    }
}
