import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Hall, HallService } from '@app/hall';
import { Session, Ticket } from '@app/models';
import { CurrentUserService } from '@app/sign-in';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { TicketsOrderRequest } from '../../../../core/models/tickets-order-request';
import { TicketService } from '../../../../core/services/ticket.service';
import { SelectedSeat } from './../../../../core/models/selected-seat';

@Component({
  selector: 'app-order-tickets',
  templateUrl: './order-tickets.component.html',
  styleUrls: ['./order-tickets.component.scss']
})
export class OrderTicketsComponent implements OnChanges {

  public selectedSeats: SelectedSeat[] = [];

  private _session: Session;
  public tickets: Ticket[];
  @Input() set session(value: Session) {
    this._session = value;
    this.hallService.getHall(this._session.id).subscribe((hall: Hall) => {
      this.hall = hall;
    });
  }

  get session(): Session {
    return this._session;
  }

  public hall: Hall;

  constructor(
    private hallService: HallService,
    private ticketService: TicketService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private router: Router,
    private currentUserService: CurrentUserService
  ) { }
  ngOnChanges({ session }: SimpleChanges): void {
    if (session) {
      this.ticketService.getTickets({ sessionId: this.session.id }).subscribe((tickets) => {
        this.tickets = tickets;
      });
    }
  }

  public trackBySeat(index, item: SelectedSeat): string {
    return item.id;
  }

  public onSubmit(): void {
    const data: TicketsOrderRequest = {
      sessionId: this.session.id,
      seatIds: this.selectedSeats.map(value => value.id)
    };
    this.ticketService.orderTickets(data).pipe(
      switchMap(() => {
        this.toastrService.success('', this.translateService.instant('NOTIFICATIONS.TICKETS_SUCCESS'));
        this.router.navigate(['/profile/tickets']);
        return this.currentUserService.getUser();
      })).subscribe();
  }
}
