import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "Constants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(email, password) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .post(Constants.BASE_URL + "users/login", { email, password })
        .subscribe((res) => {
          let uploadResponse = JSON.parse(JSON.stringify(res));
          if (uploadResponse.code === 200) {
            resolve(uploadResponse.data);
          } else {
            reject(uploadResponse.data);
          }
        });
    });
    return promise;

  }
}
