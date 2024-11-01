import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private tokenSubject = new BehaviorSubject<any>(null);
    token$ = this.tokenSubject.asObservable();

    setToken(token: any) {
        console.log(token);
        
        this.tokenSubject.next(token);
    }
}
