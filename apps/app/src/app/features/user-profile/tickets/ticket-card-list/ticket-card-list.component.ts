import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '@app/models';

@Component({
  selector: 'app-ticket-card-list',
  templateUrl: './ticket-card-list.component.html',
  styleUrls: ['./ticket-card-list.component.scss']
})
export class TicketCardListComponent implements OnInit {

  @Input() tickets: Ticket[];
  @Input() isArchive = false;
  constructor() { }

  ngOnInit(): void {
  }

}
