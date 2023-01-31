import { Component, OnInit } from '@angular/core';
import { Ticket } from '@app/models';
import { TokenService } from '@app/sign-in';
import { TicketService } from './../../../core/services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  public activeTickets: Ticket[] = null;
  public archiveTickets: Ticket[] = null;
  public isShowedAll = false;
  constructor(
    private ticketService: TicketService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.getActiveTickets();
    this.getArchivedTickets({ userId: this.tokenService.userId, status: 1, top: 4 });
  }

  showAll(): void {
    this.isShowedAll = true;
    this.getArchivedTickets({ userId: this.tokenService.userId, status: 1 });
  }

  public getActiveTickets(): void {
    this.ticketService.getTickets({ userId: this.tokenService.userId, status: 0 }).subscribe((tickets) => {
      this.activeTickets = tickets;
    });
  }

  public getArchivedTickets(config): void {
    this.ticketService.getTickets(config).subscribe((tickets) => {
      this.archiveTickets = tickets;
    });
  }
}
