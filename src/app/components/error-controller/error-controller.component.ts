import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-controller',
  templateUrl: './error-controller.component.html',
  styleUrls: ['./error-controller.component.css']
})
export class ErrorControllerComponent {

  @Input() control: any = new FormControl();
  @Input('showError') showError = false;

  ERROR_MESSAGE: any = {
    required: () => 'You must enter a value',
    min: (param: any) => `Value should be above ${param.min}`,
    max: (param: any) => `Value should be below ${param.max}`,
    minlength: (param: any) => `Min ${param.requiredLength} chars are required`, 
    maxlength: (param: any) => `Max ${param.requiredLength} chars are required`,
    pattern: (param: any) => `Format does not match ${this.control.name} format`,
    email: (param: any) => 'Email address is invalid'
  };

  listOfErrors(): string[] {
    if (this.control?.errors) {
      return Object.keys(this.control?.errors).map((err: any) =>
          this.ERROR_MESSAGE[err]
              ? this.ERROR_MESSAGE[err](this.control.getError(err))
              : ''
      );
    } else {
      return [];
    }
  }
}
