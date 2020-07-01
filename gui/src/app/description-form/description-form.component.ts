import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-description-form',
  templateUrl: './description-form.component.html',
  styleUrls: ['./description-form.component.scss']
})
export class DescriptionFormComponent implements OnInit {

  descriptionFormGroup: FormGroup;
  
  constructor(
    private fb: FormBuilder
  ) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() {
    this.descriptionFormGroup = this.fb.group({
      description: ''});}

    getGroup() { return this.descriptionFormGroup.controls.description }


}
