import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Session } from '@app/models';
import * as moment from 'moment';
import { ScheduleDay } from '../../../../core/models/schedule-day';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnChanges {
  @Input() sessions: Session[];
  @Input() amountDays: number;
  @Input() startDay: number;
  @Output() daySelect: EventEmitter<ScheduleDay> = new EventEmitter();
  public offset = 0;
  public data: ScheduleDay[] = [];
  public selectedDate: ScheduleDay;

  constructor() { }

  ngOnChanges(): void {
    if (this.sessions) {
      this.fillData();
    }
  }

  fillData(): void {
    this.data = [];
    if (!this.sessions.length) {
      return;
    }
    let sessionIsFound = false;
    for (
      const current = moment().startOf('date');
      current <= moment(this.sessions[this.sessions.length - 1].date);
      current.add(1, 'days')
    ) {
      const isActive = this.sessions.some(session => moment(session.date).isSame(current, 'day'));
      if (isActive) { sessionIsFound = true; }
      if (sessionIsFound) {
        this.data.push({ date: current.toDate(), isSession: isActive });
      }
    }
    this.selectDate(this.data[0]);
  }

  public selectDate(day: ScheduleDay): void {
    this.selectedDate = day;
    this.daySelect.emit(this.selectedDate);
  }

  public changeOffset(delta: number): void {
    this.offset += delta;
  }
}
