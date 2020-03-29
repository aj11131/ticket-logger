import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Ticket } from "./ticket.model";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TicketService {
  backendURL = environment.backendURL;
  showTicketModal = false;
  ticket: Ticket;
  isNewTicket: boolean;
  emptyTicket = {
    _id: "",
    title: "",
    message: "",
    priority: "",
    tech: "",
    date: ""
  };

  ticketSubject = new BehaviorSubject<Ticket>(this.emptyTicket);
  ticketSubject$ = this.ticketSubject.asObservable();

  toggleShowTicketModalSubject = new Subject<boolean>();
  toggleShowTicketModalSubject$ = this.toggleShowTicketModalSubject.asObservable();

  constructor(private http: HttpClient) {}

  openTicketModal(ticket?: Ticket) {
    if (!ticket) {
      this.ticket = this.emptyTicket;
      this.isNewTicket = true;
    } else {
      this.ticket = ticket;
      this.isNewTicket = false;
    }
    this.ticketSubject.next(this.ticket);
    this.showTicketModal = true;
    this.toggleShowTicketModalSubject.next(this.showTicketModal);
  }

  closeTicketModal() {
    this.ticketSubject.next(null);
    this.showTicketModal = false;
    this.toggleShowTicketModalSubject.next(this.showTicketModal);
  }

  getTickets() {
    return this.http.get<Ticket>(`${this.backendURL}/tickets`).toPromise();
  }

  createTicket(ticket: Ticket) {
    return this.http
      .post<Ticket>(`${this.backendURL}/tickets`, ticket)
      .toPromise();
  }

  deleteTicket(ticketId: string) {
    return this.http
      .delete(`${this.backendURL}/tickets/${ticketId}`, {
        responseType: "text"
      })
      .toPromise();
  }

  addTicketToUI(ticket: Ticket, ticketArr: Ticket[]) {
    ticketArr.push(ticket);
  }
}
