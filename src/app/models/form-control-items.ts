import { FormControlOptions } from './form-control-options';
import { FormValidators } from "./form-validators";

export interface FormControlItems {
    name: string,
    label: string,
    value: string,
    type: string,
    placeholder?: string,
    options?: FormControlOptions[],
    validators: FormValidators,
}