import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseInput, SelectOption, SubscriptionsManagerUtil} from "../../../tokens";
import {FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss'
})
export class MultiSelectComponent<T extends any> extends BaseInput<T[]> implements OnInit, OnDestroy {
  @Input() public options: SelectOption<T>[];
  @Input() public placeholder: string;

  public internControl = new FormControl<Array<SelectOption<T>>>([]);

  private subs = new SubscriptionsManagerUtil();


  public override ngOnInit(): void {
    super.ngOnInit();
    this.initSub();
    this.setInitialValue();
  }

  public ngOnDestroy(): void {
    this.subs.clear();
  }


  private removeFirstInternal<T>(array: SelectOption<T>[], toRemove: T): SelectOption<T>[] {
    const copy = JSON.parse(JSON.stringify(array))as SelectOption<T>[];
    const index = copy.findIndex(t => t.value = toRemove);
    if (index !== -1) {
      copy.splice(index, 1);
    }
    return copy;
  }

  private initSub(): void {
    const sub = this.internControl.valueChanges
      .subscribe({
        next: (value) => this.setValueInterno(value),
      });
    this.subs.add(sub);
  }

  private setValueInterno(value: Array<SelectOption<T>> | null): void {
    let values = [] as T[];
    if (value) {
      values = value
        .filter(v => v != null)
        .map(v => v.value);
    }
    setTimeout(() => this.value = values, 1);
  }

  private setInitialValue(): void {
    if (this.value && this.value.length > 0) {
      const selectedOptions = this.options
        .filter(v => this.value.includes(v.value))
      if (selectedOptions.length > 0) {
        this.internControl.setValue([...selectedOptions]);
      }
    }
  }
}
