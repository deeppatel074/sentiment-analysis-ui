import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations

})
export class SignupComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(private _fuseConfigService: FuseConfigService,
        private _snackBar: MatSnackBar,
        private registerService: RegisterService,
        private router: Router,
        private _formBuilder: FormBuilder) {   // Configure the layout
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required]],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    onRegister() {
        let body = {
            email: this.registerForm.get('email').value,
            name: this.registerForm.get('name').value,
            contact: this.registerForm.get('phoneNumber').value,
            password: this.registerForm.get('password').value,
        }
        this.registerService.register(body).then((res: any) => {
            this.openSnackBar('Login Success', 'cancel', 'success');
            localStorage.setItem("isLogin", 'true');
            localStorage.setItem("userName", res.name);
            localStorage.setItem("email", res.email);
            this.router.navigateByUrl('messages');
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

/**
* Confirm password validator
*
* @param {AbstractControl} control
* @returns {ValidationErrors | null}
*/
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
