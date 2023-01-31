import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ImageService } from '@app/common';
import { Movie, Session } from '@app/models';

@Component({
  selector: 'app-session-picker',
  templateUrl: './session-picker.component.html',
  styleUrls: ['./session-picker.component.scss']
})
export class SessionPickerComponent implements OnChanges {

  @Input() movie: Movie;
  @Output() sessionSelect = new EventEmitter<Session>();
  public selectedSession: Session;

  constructor(public imageService: ImageService) { }

  ngOnChanges({ movie }: SimpleChanges): void {
    if (movie) {
      this.selectSession(null);
    }
  }

  public selectSession(session: Session): void {
    this.sessionSelect.emit(session);
    this.selectedSession = session;
  }
}
