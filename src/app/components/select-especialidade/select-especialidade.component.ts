import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseInput, SelectOption, SubscriptionsManagerUtil} from "../../../tokens";
import {FormControl, FormGroupDirective, NG_VALUE_ACCESSOR} from "@angular/forms";
import {
  DashboardEspecialidadeService
} from "../../autenticado/dashboard-adm/dashboard-especialidades/dashboard-especialidade.service";
import {FilteredInput} from "../../../tokens/models/paged-filtered-input";
import {first} from "rxjs";

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectEspecialidadeComponent),
      multi: true,
    },
  ],
  selector: 'app-select-especialidade',
  templateUrl: './select-especialidade.component.html',
  styleUrl: './select-especialidade.component.scss'
})
export class SelectEspecialidadeComponent extends BaseInput<string[]> implements OnInit, OnDestroy {
  @Input() public placeholder: string;

  public carregado = false;
  public options: SelectOption<string>[];
  public internControl = new FormControl<SelectOption<string>[]>([]);

  private subs = new SubscriptionsManagerUtil();

  constructor(
    private formGroupDirective: FormGroupDirective,
    private service: DashboardEspecialidadeService
    ) {
    super(formGroupDirective);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.setOptions();
    this.initSub();
    this.setInitialValue();
  }

  public ngOnDestroy(): void {
    this.subs.clear();
  }

  private initSub(): void {
    const sub = this.internControl.valueChanges
      .subscribe({
        next: (value) => this.setValueInterno(value)
      });
    this.subs.add(sub);
  }

  private setValueInterno(value: Array<SelectOption<string>> | null): void {
    let values = [] as string[];
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

  private setOptions(): void {
    const intput = new FilteredInput();
    intput.maxResultCount = 100;
    this.service.getList(intput)
      .pipe(first())
      .subscribe({
        next: (pagedResult) => {
          this.options = pagedResult.items.map(item => {
            return {
              key: item.nome,
              value: item.id,
            } as SelectOption<string>;
          });
          this.carregado = true;
        }
      })
  }
}
