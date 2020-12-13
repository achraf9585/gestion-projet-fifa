import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Customer} from "./achat/customer";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser : any;
  user : Observable<any[]>
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthErrors$ = this.eventAuthError.asObservable();

  customerRef: AngularFireList<Customer> = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private dbFireBase: AngularFireDatabase,
    private router: Router
  ) {
    this.customerRef =  dbFireBase.list('/customer')
  }
  createCustomer(custome: Customer): void {
    this.customerRef.push(custome);

  }
  createUser(user) {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCedential => {
        this.newUser = user;

        userCedential.user.updateProfile({
          displayName: user.username
        });

        this.insertUserData(userCedential)
          .then(() => {
            this.router.navigate(['/header'])
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      })
  }
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      name: this.newUser.username,
      password: this.newUser.password,
      role: 'network user'
    })
  }
  logout() {
    return this.afAuth.signOut();
  }
  login(email: string, password:string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
         if ( userCredential) {
           this.router.navigate(['/header']);
         }
      })
  }
  getUserState(){
    return this.afAuth.authState;
  }


}
