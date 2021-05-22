import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "Constants";
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(body) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .post(Constants.BASE_URL + "users/register", body)
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
