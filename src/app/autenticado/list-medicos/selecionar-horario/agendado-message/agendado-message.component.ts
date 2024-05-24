import {Component, Inject} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProfissionalOutput} from "../../../../../tokens/models/profissional-output";
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-agendado-message',
  standalone: true,
  imports: [
    DatePipe,
    MatButton
  ],
  templateUrl: './agendado-message.component.html',
  styleUrl: './agendado-message.component.scss'
})
export class AgendadoMessageComponent {
  constructor(
    private dialogRef: DialogRef<AgendadoMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: Date, profissional: ProfissionalOutput },
  ) {
  }

  public fechar(): void {
    this.dialogRef.close();
  }
}
