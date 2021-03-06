import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    }, {
        path: 'signup',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
    }, {
        path: 'text',
        loadChildren: () => import('./text/text.module').then(m => m.TextModule)
    }, {
        path: 'twitter',
        loadChildren: () => import('./twitter/twitter.module').then(m => m.TwitterModule)
    }, {
        path: 'csv',
        loadChildren: () => import('./csv/csv.module').then(m => m.CsvModule)
    },
];

@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { useHash: false }),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
