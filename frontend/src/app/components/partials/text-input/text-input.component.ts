import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen :Boolean = true;
  @Input()
  label!:string;
  @Input()
  types:"text" | "password" | "email"="text";
  get formControl(){
    return this.control as FormControl;
  }
}
