import { Component, OnInit, OnDestroy } from "@angular/core";
import { TicketService } from "../shared/ticket.service";
import { Ticket } from "../shared/ticket.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-ticket-list",
  templateUrl: "./ticket-list.component.html",
  styleUrls: ["./ticket-list.component.css"]
})
export class TicketListComponent implements OnInit, OnDestroy {
  tickets: any;
  showTicket;
  currentTicket: Ticket;
  showSubscription: Subscription;
  ticketSubscription: Subscription;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.getTickets();
    this.subscribeToShowTicketToggle();
    this.showTicket = this.ticketService.showTicketModal;
  }

  ngOnDestroy() {
    this.showSubscription.unsubscribe();
    this.ticketSubscription.unsubscribe();
  }

  subscribeToShowTicketToggle() {
    this.showSubscription = this.ticketService.toggleShowTicketModalSubject$.subscribe(
      view => (this.showTicket = view)
    );
  }

  subscribeToCurrentTicket() {
    this.ticketSubscription = this.ticketService.ticketSubject$.subscribe(
      ticket => (this.currentTicket = ticket)
    );
  }

  async getTickets() {
    this.tickets = await this.ticketService.getTickets();
  }

  openTicketModal(ticket?: Ticket) {
    this.currentTicket = this.ticketService.openTicketModal(ticket);
  }
}
