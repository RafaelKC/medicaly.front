import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseInput, SubscriptionsManagerUtil} from "../../../tokens";
import {
  AbstractControl,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimerSelectComponent),
      multi: true,
    },
  ],
  selector: 'app-timer-select',
  templateUrl: './timer-select.component.html',
  styleUrl: './timer-select.component.scss'
})
export class TimerSelectComponent extends BaseInput<number> implements OnInit, OnDestroy {
  @Input() public placeholder: string;

  private subs = new SubscriptionsManagerUtil();

  public internControl = new FormControl<string>('');

  public override ngOnInit(): void {
    super.ngOnInit();
    this.setInitialValue();
    this.initSubs();
  }

  public ngOnDestroy(): void {
    this.subs.clear();
  }

  private setInitialValue(): void {
    if (this.value !== undefined && this.value > 0)  {
      const result = this.converterMilissegundosParaHorasMinutos(this.value);
      this.internControl.setValue(result, {emitEvent: false});
    }

    if (this.required) {
      this.internControl.setValidators(Validators.required);
    }

    this.internControl.addValidators(this.hostValidator);
  }

  public converterMilissegundosParaHorasMinutos(milissegundos: number): string {
    const segundosTotal = Math.floor(milissegundos / 1000);
    const horas = Math.floor(segundosTotal / 3600);
    const minutos = Math.floor((segundosTotal % 3600) / 60);

    const horasStr = horas < 10 ? '0' + horas : String(horas);
    const minutosStr = minutos < 10 ? '0' + minutos : String(minutos);

    return `${horasStr}:${minutosStr}`;
  }

  public converterHorasMinutosParaMilissegundos(horaMinuto: string): number {
    const [horasStr, minutosStr] = horaMinuto.split(':');
    const horas = parseInt(horasStr, 10);
    const minutos = parseInt(minutosStr, 10);

    const segundosTotal = horas * 3600 + minutos * 60;
    const milissegundos = segundosTotal * 1000;

    return milissegundos;
  }

  private initSubs(): void {
    const sub = this.internControl.valueChanges
      .subscribe({next: (value) => {{
        let result = 0;
        if (value) {
          result = this.converterHorasMinutosParaMilissegundos(value);
        }
        this.value = result;
        }}});

    this.subs.add(sub);

    this.control.valueChanges.subscribe({
      next: (value) => {
        this.internControl.updateValueAndValidity({ emitEvent: false });
      }
    });
  }

  private hostValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return this.control.errors;
  }

}
