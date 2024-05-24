import {Component, Inject} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ProfissionalOutput} from "../../../../../tokens/models/profissional-output";

@Component({
  selector: 'app-conflito-message',
  standalone: true,
  imports: [
    DatePipe,
    MatButton
  ],
  templateUrl: './conflito-message.component.html',
  styleUrl: './conflito-message.component.scss'
})
export class ConflitoMessageComponent {

  constructor(
    private dialogRef: DialogRef<ConflitoMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: Date },
  ) {
  }

  public fechar(): void {
    this.dialogRef.close();
  }
}
