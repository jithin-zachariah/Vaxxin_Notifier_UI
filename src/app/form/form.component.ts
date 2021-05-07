import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

import { RegistrationService } from "../registration.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  public states: Array<any> = [];
  public districts: Array<any> = [];

  regForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private regSer: RegistrationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      state: [null, Validators.required],
      stateID: [null, Validators.required],
      district: [null, Validators.required],
      districtID: [null, Validators.required],
      age: [null, Validators.required],
    });

    this.fetchStatedata();
    this.regForm.get("state").valueChanges.subscribe((val) => {
      this.fetchDistrictdata(val);
    });
  }

  public async submit() {
    try {
      if (!this.regForm.valid) {
        return;
      }
      console.log("form");
      console.log(this.regForm.value);

      await this.regSer.submitRegistration(this.regForm.value);
      this.showAlert("Successfully registered for email notifications!", "OK");
    } catch (error) {
      this.showAlert(
        "Failed to complete your registration. Please try again later!",
        "OK"
      );
    }
  }

  private async fetchStatedata() {
    try {
      const { states } = await this.regSer.fetchStateData();
      console.log(states);
      this.states = states;
    } catch (error) {
      this.showAlert(
        "Something went wrong on our side. Please try after some time!",
        "OK"
      );
    }
  }
  private async fetchDistrictdata(stateID) {
    try {
      const { districts } = await this.regSer.fetchDistrictData(stateID);
      console.log(districts);
      this.districts = districts;
    } catch (error) {
      this.showAlert(
        "Something went wrong on our side. Please try after some time!",
        "OK"
      );
    }
  }
  private showAlert(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
