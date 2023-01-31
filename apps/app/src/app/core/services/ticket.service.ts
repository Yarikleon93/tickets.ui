import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '@app/models';
import { convertToHttpParams } from '@app/utils';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TicketsOrderRequest } from '../models/tickets-order-request';

const ticketsApiRequest = environment.API.ticket;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient
  ) { }

  public orderTickets(data: TicketsOrderRequest): Observable<any> {
    return this.http.put(`${ticketsApiRequest}`, data);
  }

  public getTickets(config = {}): Observable<Ticket[]> {
    const params = convertToHttpParams(config);
    return this.http.get<Ticket[]>(`${ticketsApiRequest}`, { params });
  }
}
