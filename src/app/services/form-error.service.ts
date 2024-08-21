import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  errorMap: { [key: string]: (c: AbstractControl, name: string) => string } = {
    'required': (c: AbstractControl, name: string) => `${name} es requerido`,
    'minlength': (c: AbstractControl, name: string) => `${name} debe ser de ${c.errors!['minlength'].requiredLength} carácteres o más`,
    'maxlength': (c: AbstractControl, name: string) => `${name} debe ser de ${c.errors!['maxlength'].requiredLength} carácteres o menos`
  }

  public mapErrors(control: AbstractControl, name: string): string[] {
    try {
      return Object.keys(control.errors || {})
        .map(key => this.errorMap[key](control, name));
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
