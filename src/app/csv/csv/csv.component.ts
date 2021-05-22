import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CsvService } from '../csv.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class CsvComponent implements OnInit {
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
    private csvService: CsvService,
    private snackbar: MatSnackBar,
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }
  onUsersUpload(event) {
    this.loader = true;
    this.isResult = false;

    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      console.log('selected file: ');
      console.log(file);
      this.csvService.importCSV(file).then((res: any) => {
        this.loader = false;
        this.isResult = true;
        this.results = res.results;
        this.pieChartData = res.dataSet;
      }).catch(error => {
        this.snackbar.open(error, 'cancel', {
          panelClass: "mat-green-A200-bg",
          duration: 3000,
          verticalPosition: 'top'
        })
      });

    }
  }
  downloadCSV() {

    new AngularCsv(this.results, "Twitter Sentiment", this.csvOptions);
  }
}
