import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { take, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private fb: FormBuilder
  ) { }

  getActiveElementValue() {
    const actElem: any = document.activeElement;
    return (actElem.tagName === 'INPUT')
    ? actElem.value.toLowerCase()
    : '';
  }

  manageTagFieldsNumber(value: string, formArray: FormArray) {
    /** MS-Access-like-behaviour: 
     * add new empty field if the last empty field is filled
     * remove last empty field if the second last is also empty
    */
    const formFieldsLength = formArray.length;
    const lastField = formArray.at(formFieldsLength - 1).value

    if (value !== '' && lastField !== '') 
      { formArray.push(this.fb.control('')); }

    else if 
    (formFieldsLength > 1
    && lastField === ''
    && formArray.at(formFieldsLength - 2).value === '') 
      { formArray.removeAt(formFieldsLength - 1) };
  }

  clearFormArray = (formArray: FormArray) => { 
    while (formArray.length !== 1) {
      formArray.removeAt(formArray.length - 1)
    }
  }

  filterOptions(value: string, fullList: string[], fallbackList?: string[]): Observable<string[]> {
    if (value) { 
      const result = fullList.filter(option => option.toLowerCase().indexOf(value) === 0)
      
      if (result.length > 0) {
        return of(result)
      } else if (fallbackList) {
        return of(fallbackList.filter(option => option.toLowerCase().indexOf(value) === 0))
      }

    } else {
      return of(fullList)
    }
  }

  minLengthArray(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
      return (c.value.filter(v => v).length >= min)
        ? null
        : { 'minLengthArray': {valid: false }}
    }
  }

  validateControl(control: AbstractControl, messages: object) {        
    if (control && control.invalid) {
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
            return messages[key]
  }}}}

  setDefaultValue(obs: Observable<string>, control: AbstractControl) {
      return obs
      .pipe(take(1))
      .pipe(map(value => control.setValue(value)))
  }

  observeOptions(control: AbstractControl) {
    return control.valueChanges
      .pipe(debounceTime(200))
      .pipe(distinctUntilChanged())
  }

}
