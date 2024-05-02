import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseInput, SelectOption, SubscriptionsManagerUtil} from "../../../../tokens";
import {FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectSingleComponent),
      multi: true,
    },
  ],
  selector: 'app-select-single',
  templateUrl: './select-single.component.html',
  styleUrl: './select-single.component.scss'
})
export class SelectSingleComponent<T extends any> extends BaseInput<T> implements OnInit, OnDestroy {
  @Input() public options: SelectOption<T>[];
  @Input() public placeholder: string;

  public internControl = new FormControl<SelectOption<T> | null>(null);

  private subs = new SubscriptionsManagerUtil();


  public override ngOnInit(): void {
    super.ngOnInit();
    this.initSub();
    this.setInitialValue();
  }

  public ngOnDestroy(): void {
    this.subs.clear();
  }

  private initSub(): void {
    const sub = this.internControl.valueChanges
      .subscribe({
        next: (value) => this.setValueInterno(value),
      });
    this.subs.add(sub);
  }

  private setValueInterno(value: SelectOption<T> | null): void {
    let values: T;
    if (value) {
      values = value.value
    }
    setTimeout(() => this.value = values ?? {} as T, 1);
  }

  private setInitialValue(): void {
    if (this.value) {
      const selectedOptions = this.options
        .find(v => this.value = v.value)
      this.internControl.setValue(selectedOptions ?? null)
    }
  }
}
