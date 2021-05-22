import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService,
        private _snackBar: MatSnackBar
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    onLogin() {
        let email = this.loginForm.get('email').value;
        let password = this.loginForm.get('password').value;
        this.loginService.login(email, password).then((res: any) => {
            this.openSnackBar('Login Success', 'cancel', 'error');
            localStorage.setItem("isLogin", 'true');
            localStorage.setItem("userName", res.name);
            localStorage.setItem("email", res.email);
            this.router.navigateByUrl('text');
        }).catch(error => {
            this.openSnackBar(error, 'cancel', 'error');
        })
    }
    openSnackBar(message: string, action: string, type: string) {
        let color;
        if (type == 'success') {
            color = "mat-green-800-bg"
        } else if (type == 'error') {
            color = "mat-red-A200-bg"
        }
        this._snackBar.open(message, action, {
            duration: 2000,
            panelClass: color,
            verticalPosition: 'top'
        });
    }
}
