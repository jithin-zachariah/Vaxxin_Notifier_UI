import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


import { RegistrationService } from "../registration.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  public states: Array<any> = [];
  public districts: Array<any> = [];

  loginForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private regSer: RegistrationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      state: [null, Validators.required],
      district: [null, Validators.required],
      age: [null, Validators.required],
    });

    this.fetchStatedata();
    this.loginForm.get("state").valueChanges.subscribe((val) => {
      console.log(val);
      this.fetchDistrictdata(val);
    });
  }

  public async submit() {
    if (!this.loginForm.valid) {
      return;
    }
    await this.regSer.submitRegistration(this.loginForm);
  }

  private async fetchStatedata() {
    const { states } = await this.regSer.fetchStateData();
    console.log(states);
    this.states = states;
  }
  private async fetchDistrictdata(stateID) {
    const { districts } = await this.regSer.fetchDistrictData(stateID);
    console.log(districts);
    this.districts = districts;
  }
}
