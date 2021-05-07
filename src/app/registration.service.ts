import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  constructor() {}

  public async fetchStateData() {
    const { data }: any = await axios({
      method: "get",
      url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
    });

    return data;
  }

  public async fetchDistrictData(stateID: number) {
    const { data }: any = await axios({
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateID}`,
    });

    return data;
  }

  public async submitRegistration(regData) {
    const payload = {
      userData: regData,
    };
    const res = await axios({
      method: "post",
      url: `${environment.apiBaseUrl}/register`,
      data: regData,
    });
    return res;
  }
}
