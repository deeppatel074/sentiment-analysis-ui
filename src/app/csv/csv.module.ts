import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvComponent } from './csv/csv.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChartsModule } from 'ng2-charts';


const routes = [
  {
    path: '',
    component: CsvComponent
  },

];
@NgModule({
  declarations: [CsvComponent],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ChartsModule,
    MatProgressBarModule,
  ]
})
export class CsvModule { }
