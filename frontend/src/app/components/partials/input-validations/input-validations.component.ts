import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
const VALIDATION_MESSAGE:any={
  required:'should not be empty',
  email:'Email is not valid',
  minlength:'Field is too short',
  notMatch:'password and Confirm password does not match'
}

@Component({
  selector: 'input-validations',
  templateUrl: './input-validations.component.html',
  styleUrls: ['./input-validations.component.css']
})
export class InputValidationsComponent implements OnInit,OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }
  ngOnInit(): void {
    this.controls.statusChanges.subscribe(()=>{
      this.checkValidation();
    })
    this.controls.valueChanges.subscribe(()=>{
      this.checkValidation();
    })
  }
  @Input()
  controls!:AbstractControl;
  @Input()
  showErrorsWhen:Boolean=true;
  errorMessages: string[]=[];

  checkValidation(){
    const errors = this.controls.errors;
    if(!errors){
      this.errorMessages=[];
      return
    }else{
      const errorKeys = Object.keys(errors);
      this.errorMessages= errorKeys.map(key =>VALIDATION_MESSAGE[key])
    }
  }

}
