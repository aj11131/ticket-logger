import { Component, OnInit, Input } from "@angular/core";
import { Ticket } from "src/app/shared/ticket.model";
import { TicketService } from "src/app/shared/ticket.service";
import { Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TechService } from "src/app/shared/tech.service";
import { Tech } from "src/app/shared/tech.model";

@Component({
  selector: "app-view-ticket",
  templateUrl: "./view-ticket.component.html",
  styleUrls: ["./view-ticket.component.css"]
})
export class ViewTicketComponent implements OnInit {
  @Input() currentTicket: Ticket;
  isNewTicket: boolean;
  ticketSubscription: Subscription;
  techs: Tech;

  ticket = new FormGroup({
    title: new FormControl("", Validators.required),
    message: new FormControl("", Validators.required),
    priority: new FormControl("", Validators.required),
    tech: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required)
  });

  constructor(
    private ticketService: TicketService,
    private techService: TechService
  ) {}

  ngOnInit() {
    this.setInitialTicketValue();
    this.getTechs();
    this.isNewTicket = this.ticketService.isNewTicket;
  }

  setInitialTicketValue() {
    this.ticket.setValue({
      title: this.currentTicket.title,
      message: this.currentTicket.message,
      priority: this.currentTicket.priority,
      tech: this.currentTicket.tech,
      date: this.currentTicket.date
    });
  }

  async getTechs() {
    this.techs = await this.techService.getTechs();
  }

  async onSave() {
    if (this.ticket.valid) {
      if (this.isNewTicket === true) {
        await this.ticketService.createTicket(this.ticket.value);
      }
      this.ticketService.closeTicketModal();
    }
  }

  onDelete() {
    if (confirm("Are you sure you want to delete this ticket?")) {
      this.ticketService
        .deleteTicket(this.currentTicket._id)
        .catch(console.log);
    }
    this.ticketService.closeTicketModal();
  }

  closeTicketModal() {
    this.ticketService.closeTicketModal();
  }
}
