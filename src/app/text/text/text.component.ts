import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextService } from '../text.service';
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class TextComponent implements OnInit {
  form: FormGroup;
  text: any;
  polarity: any;
  sentiment: any;
  isResult: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private textService: TextService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      text: ['', Validators.required],
    });
  }
  onAnalyse() {
    const text = this.form.get('text').value;
    this.textService.analyseText(text).then((res: any) => {
      this.isResult = true
      this.text = text;
      this.polarity = res.polarity;
      this.sentiment = res.sentiment;
    }).catch((error: any) => {
      this.snackbar.open(error, 'cancel', {
        panelClass: "mat-green-A200-bg",
        duration: 3000,
        verticalPosition: 'top'
      })
    })
  }
}
