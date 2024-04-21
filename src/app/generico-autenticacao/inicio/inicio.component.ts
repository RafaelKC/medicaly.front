import {Component} from '@angular/core';
import {AnexosService} from "../../../tokens/services/anexos.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  constructor(private anexosService: AnexosService) { }

  public upload(event: Event): void {
    if (event == null) return;
    const element = event.currentTarget as HTMLInputElement;
    if (element.files == null || element.files.length == 0) return;

    const file = element.files[0];

    if (file) {
      this.anexosService.upload(file).subscribe({
        next: (response: Response) => console.log(response)
      })
    }
  }
}
