import { Component, OnInit, Input } from "@angular/core";
import { Ticket } from "src/app/shared/ticket.model";
import { TicketService } from "src/app/shared/ticket.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-view-ticket",
  templateUrl: "./view-ticket.component.html",
  styleUrls: ["./view-ticket.component.css"]
})
export class ViewTicketComponent implements OnInit {
  @Input() currentTicket: Ticket;
  ticketSubscription: Subscription;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {}

  closeTicketModal() {
    this.ticketService.closeTicketModal();
  }
}
