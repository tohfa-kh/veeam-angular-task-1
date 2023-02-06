import { FormControlItems } from '../../models/form-control-items';
import { UploadJsonService } from '../../services/upload-json.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JsonFormControls } from '../../models/json-form-controls';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
  newDynamicForm = this.fb.group({})
  jsonDataForControls$!: Observable<JsonFormControls>;
  plainText = '';
  errorMessage = '';

  constructor(
    private uploadJsonService: UploadJsonService,
    private fb: FormBuilder,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getFormControlData();
  }

  getFormControlData(): void {
    this.jsonDataForControls$ = this.uploadJsonService.getJsonData().pipe(tap((data: JsonFormControls) => {
      console.log(data as object)
      if(data && data.controls) {
        data.controls = data.controls.filter((e: FormControlItems) => e.name);
        this.createForm(data)
      }
    }));
  }

  createForm(jsonFormControls: JsonFormControls): void {
    if(jsonFormControls && jsonFormControls.controls && jsonFormControls.controls) {

      jsonFormControls.controls.forEach((control: FormControlItems) => {
          const validators = [];
    
          for(const [key, value] of Object.entries(control.validators || {})) {
            switch(key) {
              case 'min':
                validators.push(Validators.min(value)) 
                break;
              case 'max':
                validators.push(Validators.max(value))
                break;
              case 'required':
                if(value) validators.push(Validators.required)
                break; 
              case 'requiredTrue':
                break; 
              case 'email':
                if (value) validators.push(Validators.email);
                break;   
              case 'minLength':
                validators.push(Validators.minLength(value))
                break;
              case 'maxLength':
                validators.push(Validators.maxLength(value))
                break;  
                case 'pattern':
                  validators.push(Validators.pattern(value));
                  break;
              case 'nullValidator':
                if (value) validators.push(Validators.nullValidator);
                break;
              default:
                break;  
            }
          }
          this.newDynamicForm.addControl(
            control.name,
            this.fb.control(control.value, validators)
          );
        })
    }
  }

  onSubmit() {
    console.log(this.newDynamicForm.controls)
  }
}
