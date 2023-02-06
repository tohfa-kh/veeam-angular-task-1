import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadJsonService } from '../../services/upload-json.service';
import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { JsonFormControls } from '../../models/json-form-controls';


@Component({
  selector: 'app-create-dynamic-form',
  templateUrl: './create-dynamic-form.component.html',
  styleUrls: ['./create-dynamic-form.component.css']
})
export class CreateDynamicFormComponent implements OnInit {
  inputForm!: FormGroup;
  inputFileUploader: any;
  isSubmitDisabled = true;
  @Output() onSubmitEvent = new EventEmitter<boolean>()

  @ViewChild('fileName') fileName: any

  constructor(
    private uploadJsonService: UploadJsonService,
    private fb: FormBuilder
    ) {
      this.inputForm = this.fb.group({
        input: [''],
        fileName: ['']
      })
  }

  ngOnInit() {
    this.inputForm.valueChanges.subscribe(() => {
      this.checkDisableState()
    })
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.inputFileUploader = JSON.parse(reader.result as string);
      this.inputForm.setValue({
        fileName: this.inputFileUploader,
        input: ''
      });
      this.inputForm.controls['input'].disable();
    } 
    reader.readAsText(file)
  }

  checkDisableState() {
    if(this.inputForm.get('input')?.value || this.inputForm.get('fileName')?.value) this.isSubmitDisabled = false;
    else this.isSubmitDisabled = true;
  }

  onReset() {
    this.inputForm.controls['input'].enable();
    this.fileName.nativeElement.value = ''
    this.inputForm.reset();
    this.isSubmitDisabled = true;
    this.uploadJsonService.setJsonData(new JsonFormControls())
  }

  onSubmit() {
    this.onSubmitEvent.emit(true);
    if(this.inputForm.get('input')?.value !== '') {
      this.uploadJsonService.setJsonData(JSON.parse(this.inputForm.get('input')?.value));
    } else if(this.inputForm.get('fileName')?.value !== '') {
      this.uploadJsonService.setJsonData(this.inputForm.get('fileName')?.value);
    } else {
      return 
    }
  }
}
