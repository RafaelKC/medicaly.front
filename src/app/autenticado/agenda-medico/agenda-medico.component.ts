import {ChangeDetectorRef, Component, OnInit, signal, ViewChild} from '@angular/core';
import {ProcedimentoOutput} from "../../../tokens/models/procedimento-output";
import {AgendaMedicoService} from "./agenda-medico.service";
import {GetListProcedimentoInput} from "../../../tokens/models/get-list-procedimento-input";
import {AuthenticationService} from "../../../tokens";
import {FullCalendarComponent} from '@fullcalendar/angular';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {MatDialog} from "@angular/material/dialog";
import {EventImpl} from "@fullcalendar/core/internal";
import {GetResultadoInput} from "../../../tokens/models/get-resultado-input";
import {ResultadoOutput} from "../../../tokens/models/resultado-output";
import {StatusProcedimento} from "../../../tokens/enums/status-procedimento";
import {ProcedimentoDialogComponent} from "./procedimento-dialog/procedimento-dialog.component";

@Component({
  selector: 'app-agenda-medico',
  templateUrl: './agenda-medico.component.html',
  styleUrl: './agenda-medico.component.scss',
})
export class AgendaMedicoComponent implements OnInit{
  procedimentos: ProcedimentoOutput[];
  resultado: ResultadoOutput[];

  carregado: boolean;

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private procedimentoService: AgendaMedicoService,
              private auth: AuthenticationService,
              private changeDetector: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  getProcedimento() {
    const filter = new GetListProcedimentoInput();
    filter.profissionalId = this.auth.user?.id;
    this.procedimentoService.getProcedimento(filter).subscribe(res => {
      this.procedimentos = res.items;
      this.writeProcedimentosOnCalendar();
    });
  }

  getResultado(procedimento: ProcedimentoOutput){
    let calendarApi = this.calendarComponent.getApi();

    const filter = new GetResultadoInput();
    filter.resultadoId = procedimento.id;
    return this.procedimentoService.getResultado(filter).subscribe(res => {
      const resultado = {observacoes: res.observacoes, procedimentoId: res.procedimentoId, anexo: res.anexo} as ResultadoOutput
      if (procedimento.idProfissional == this.auth.user?.id) {
        const title = procedimento.paciente.nome + ' ' + procedimento.paciente.sobrenome;
        const id = procedimento.id;
        const start = procedimento.data; // Directly use the date string

        calendarApi.addEvent({
          id: id,
          title: title,
          nomePasciente: procedimento.paciente.nome + ' ' + procedimento.paciente.sobrenome,
          start: start,
          procedimento: procedimento,
          resultado: resultado
          // allDay: true

        });
      }
    })
  }


  writeProcedimentosOnCalendar() {
    let calendarApi = this.calendarComponent.getApi();

    if (!this.procedimentos || !Array.isArray(this.procedimentos)) {
      console.error('Procedimentos vazios');
      return;
    }

    calendarApi.removeAllEvents()


    this.procedimentos.forEach(procedimento => {
      if(procedimento.status==StatusProcedimento.Finalizado){
        this.getResultado(procedimento)

      }
      else
      {
        if (procedimento.idProfissional == this.auth.user?.id) {
          const title = procedimento.paciente.nome;
          const id = procedimento.id;
          const start = procedimento.data; // Directly use the date string

          calendarApi.addEvent({
            id: id,
            title: title,
            start: start,
            procedimento: procedimento,
            resultado: null
            // allDay: true

          });
        }
      }
    });
  }

  ngOnInit() {
    this.getProcedimento();

  }

  openDialog(procedimento: ProcedimentoOutput, evento: EventImpl, resultado: ResultadoOutput| null) {
    this.dialog.open(ProcedimentoDialogComponent, {
      data: { procedimento: procedimento,
              evento: evento,
              resultado: resultado},
    }).afterClosed().subscribe(result => this.getProcedimento());
  }

  handleEventClick(clickInfo: EventClickArg) {
    const procedimento = clickInfo.event.extendedProps["procedimento"];
    const resultado = clickInfo.event.extendedProps["resultado"];
    this.openDialog(procedimento, clickInfo.event, resultado);

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
