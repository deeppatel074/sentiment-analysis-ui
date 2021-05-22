import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "Constants";
@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(private http: HttpClient) { }
  analyseText(text) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(Constants.BASE_URL + "users/sentiment/text?text=" + text)
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
