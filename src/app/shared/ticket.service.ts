import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Ticket } from "./ticket.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TicketService {
  backendURL = environment.backendURL;
  showTicketModal = false;
  ticket: Ticket;
  emptyTicket = {
    title: "",
    message: "",
    priority: "",
    tech: "",
    date: ""
  };

  ticketSubject = new Subject<any>();
  ticketSubject$ = this.ticketSubject.asObservable();

  toggleShowTicketModalSubject = new Subject<boolean>();
  toggleShowTicketModalSubject$ = this.toggleShowTicketModalSubject.asObservable();

  constructor(private http: HttpClient) {}

  // get rid of the return or subscription.
  openTicketModal(ticket?: Ticket) {
    if (!ticket) {
      this.ticket = this.emptyTicket;
    } else {
      this.ticket = ticket;
    }
    console.log(this.ticket);
    this.ticketSubject.next(this.ticket);
    this.showTicketModal = true;
    this.toggleShowTicketModalSubject.next(this.showTicketModal);
    return this.ticket;
  }

  closeTicketModal() {
    this.ticketSubject.next(null);
    this.showTicketModal = false;
    this.toggleShowTicketModalSubject.next(this.showTicketModal);
    return this.ticket;
  }

  getTickets() {
    return this.http.get(`${this.backendURL}/tickets`).toPromise();
  }
}
