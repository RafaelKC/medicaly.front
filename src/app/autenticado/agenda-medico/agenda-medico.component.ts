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
import {DialogComponent} from "./dialog/dialog.component";
import {EventImpl} from "@fullcalendar/core/internal";
import {GetResultadoInput} from "../../../tokens/models/get-resultado-input";
import {ResultadoOutput} from "../../../tokens/models/resultado-output";
import {StatusProcedimento} from "../../../tokens/enums/status-procedimento";

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
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
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
      console.log(res)
      const resultado = {observacoes: res.observacoes, procedimentoId: res.procedimentoId, anexo: res.anexo} as ResultadoOutput
      if (procedimento.idProfissional == this.auth.user?.id) {
        const title = procedimento.paciente.nome;
        const id = procedimento.id;
        const start = procedimento.data; // Directly use the date string

        calendarApi.addEvent({
          id: id,
          title: title,
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
    this.getProcedimento(); // Just call getProcedimento() here

  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // const a  = prompt(selectInfo.endStr);
    // const title = prompt('Please enter a new title for your event');
    //
    // const calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //   });
    // }
  }

  openDialog(procedimento: ProcedimentoOutput, evento: EventImpl, resultado: ResultadoOutput| null) {
    this.dialog.open(DialogComponent, {
      data: { procedimento: procedimento,
              evento: evento,
              resultado: resultado},
    });
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
