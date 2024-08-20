import { AbstractControl } from "@angular/forms";

// Custom validator to check if the date is today or later
export const dateValidator = (control: AbstractControl) => {
    const selectedDate = new Date(control.value);
    const today = new Date();
    selectedDate.setDate(selectedDate.getDate() + 1)
    return selectedDate >= today ? null : { invalidDate: true };
}