import {Directive, HostBinding, Input, OnInit} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective
} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

export interface BaseInputChange<T extends any> {
  newValue: T;
  internalChange: boolean;
}


@Directive()
export class BaseInput<T extends any> implements ControlValueAccessor, OnInit {
  @HostBinding('attr.formControlName') @Input() public formControlName: string;

  protected formGroup: FormGroup;

  protected onValueChange = new BehaviorSubject<BaseInputChange<T> | null>(null);

  protected internalValue: T;

  public disabled = false;

  constructor(private fgDirective: FormGroupDirective) {
  }

  public get control(): AbstractControl<T> {
    return this.formGroup.get(this.formControlName) as AbstractControl<T>;
  }

  public ngOnInit(): void {
    this.formGroup = this.fgDirective.form
    this.internalValue = this.control.value;
  }

  public get value(): T {
    return this.internalValue;
  }

  public set value(newValue: T) {
    this.internalValue = newValue;
    console.log(this.internalValue)
    this.onChange(newValue);
    this.onValueChange.next({ newValue, internalChange: true });
  }
 protected normalize(value: T): T {
    return value;
  }

  protected isNewValueDifferent(value: T): boolean {
    return this.normalize(value) !== this.normalize(this.internalValue);
  }

  protected setValue(value: T): void {
    if (this.isNewValueDifferent(value)) {
      this.internalValue = this.normalize(value);
      this.onValueChange.next({ newValue: this.internalValue, internalChange: false });
    }
  }

  public writeValue(value: T): void {
    this.setValue(value);
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  protected onChange: any = () => { };

  public onTouch: any = () => { };

 public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
