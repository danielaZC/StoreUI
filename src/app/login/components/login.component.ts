import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    public loginInvalid: boolean;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            username: ['', Validators.email],
            password: ['', Validators.required]
        });
    }

    async onSubmit() {
        this.loginInvalid = false;
        try {
            const username = this.form.get('username').value;
            const password = this.form.get('password').value;
            await this.authService.login(username, password);
        } catch (err) {
            this.loginInvalid = true;
        }
    }
}