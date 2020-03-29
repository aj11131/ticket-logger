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
  tickets: any;
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

  async getTickets() {
    this.tickets = await this.http
      .get<Ticket>(`${this.backendURL}/tickets`)
      .toPromise();
  }

  createTicket(ticket: Ticket) {
    this.tickets.push(ticket);
    return this.http
      .post(`${this.backendURL}/tickets`, ticket, {
        responseType: "text"
      })
      .toPromise();
  }

  deleteTicket(ticketId: string) {
    const index = this.tickets.findIndex(
      (ticket: Ticket) => ticket._id === ticketId
    );
    this.tickets.splice(index, 1);
    console.log(this.tickets);
    return this.http
      .delete(`${this.backendURL}/tickets/${ticketId}`, {
        responseType: "text"
      })
      .toPromise();
  }
}
