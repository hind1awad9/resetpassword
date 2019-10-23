import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { TokenService } from '../token.service';
import { newpassword } from './passworddata.model';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  formreset:FormGroup;
  data:newpassword[]=[];
  token: string;
  message:string;
  checked:boolean
  constructor(private _dataService:DataService,private _tokenService:TokenService,private _formBuilder:FormBuilder,private route:ActivatedRoute) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log('param', this.token)
    this.formreset = this._formBuilder.group({
      password:['',[Validators.required]]
    
    });
    this.route.paramMap.subscribe(params => {
      console.log(params.get('token')) ;
      this.token = params.get('token');
      console.log(this.token);
    })
  }
 
  async reset()
  {
    this._dataService.post(`auth/reset/${this.token}`,this.formreset.value
   )
     
    .subscribe((response:any)=>{
      // this._tokenService.setToken(response['token']);

      if(response.success)
      {
       // this._tokenService.setToken(response['token']);
        console.log('response',response.message);
        this.message = response.message;
        this.checked = true;
      }
      else
      {
        this.message = response.message;
        this.checked = false;
      }
     
      
     
  });
  }

}
