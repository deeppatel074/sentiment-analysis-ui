import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TwitterService } from '../twitter.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class TwitterComponent implements OnInit {
  dataSet: any;
  form: FormGroup;
  isResult: boolean = false;
  loader: boolean = false;
  results: [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Positive'], ['Negative'], 'Neutral'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Sentiment Analysis Result :',
    useBom: true,
    noDownload: false,
    headers: ["Text", "Polarity", "Sentiment"]
  };
  constructor(
    private _formBuilder: FormBuilder,
    private twitterService: TwitterService,
    private snackbar: MatSnackBar,

  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      text: ['', Validators.required],
      count: ['', Validators.required]
    });
  }
  analyseTweets() {
    this.isResult = false;
    this.loader = true;
    const text = this.form.get('text').value;
    const count = this.form.get('count').value;
    this.twitterService.analyseTweet(text, count).then((res: any) => {
      this.loader = false;
      this.isResult = true;
      this.results = res.results;
      this.pieChartData = res.dataSet;
    }).catch((error) => {
      this.snackbar.open(error, 'cancel', {
        panelClass: "mat-green-A200-bg",
        duration: 3000,
        verticalPosition: 'top'
      })
    })
  }

  downloadCSV() {

    new AngularCsv(this.results, "Twitter Sentiment", this.csvOptions);
  }


}

