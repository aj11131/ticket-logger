import { Component, OnInit } from "@angular/core";
import { TicketService } from "../shared/ticket.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private ticketService: TicketService) {}

  ngOnInit() {}

  showNewTicketModal() {
    this.ticketService.openTicketModal(null);
  }
}
