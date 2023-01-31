import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '@app/common';
import { Ticket } from '@app/models';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent implements OnInit {
  @Input() ticket: Ticket;
  constructor(
    public imageService: ImageService
  ) { }

  ngOnInit(): void {
  }

}
