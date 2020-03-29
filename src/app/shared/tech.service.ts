import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Tech } from "./tech.model";

@Injectable({
  providedIn: "root"
})
export class TechService {
  backendURL = environment.backendURL;

  constructor(private http: HttpClient) {}

  getTechs() {
    return this.http.get<Tech>(`${this.backendURL}/techs`).toPromise();
  }
}
