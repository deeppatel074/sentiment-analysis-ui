import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "Constants";
@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http: HttpClient) { }

  importCSV(file: File) {
    let promise = new Promise((resolve, reject) => {
      let formData: FormData = new FormData();
      formData.append("file", file);
      this.http
        .post(Constants.BASE_URL + "users/sentiment/csv", formData)
        .subscribe((res) => {
          let uploadResponse = JSON.parse(JSON.stringify(res));
          if (uploadResponse.code === 200) {
            // console.log("users upload response");
            // console.log(uploadResponse.data);
            resolve(uploadResponse.data);
          } else {
            reject(uploadResponse.data);
          }
        });
    });
    return promise;
  }
}
