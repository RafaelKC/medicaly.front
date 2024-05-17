import { Component, signal, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ProcedimentoOutput } from "../../../tokens/models/procedimento-output";
import { AgendaMedicoService } from "./agenda-medico.service";
import { GetListProcedimentoInput } from "../../../tokens/models/get-list-procedimento-input";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../tokens";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { ProcedimentoInput } from "../../../tokens/models/procedimento";
import { en } from "@fullcalendar/core/internal-common";
import { Console } from "node:inspector";

@Component({
  selector: 'app-agenda-medico',
  templateUrl: './agenda-medico.component.html',
  styleUrl: './agenda-medico.component.scss',
})
export class AgendaMedicoComponent {
  procedimentos: ProcedimentoOutput[];

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
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
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
              private changeDetector: ChangeDetectorRef) {
  }

  getProcedimento() {
    const filter = new GetListProcedimentoInput();
    filter.profissionalId = this.auth.user?.id;
    this.procedimentoService.getProcedimento(filter).subscribe(res => {
      this.procedimentos = res.items;
      this.writeProcedimentosOnCalendar(); // Move this here
    });
  }

  writeProcedimentosOnCalendar() {
    let calendarApi = this.calendarComponent.getApi();

    if (!this.procedimentos || !Array.isArray(this.procedimentos)) {
      console.error('Procedimentos vazios');
      return;
    }

    this.procedimentos.forEach(procedimento => {
      console.log(procedimento);
      const title = procedimento.idPaciente;
      const id = procedimento.id;
      const start = procedimento.data; // Directly use the date string

      calendarApi.addEvent({
        id: id,
        title: title,
        start: start,
        // allDay: true
      });
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

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
