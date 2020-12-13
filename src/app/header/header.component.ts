import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  verif = false;
  federationId: number;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  user: firebase.User;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private auth: AuthService,
              private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      })
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  header(){
    this.router.navigate(['/header']);
  }
  goToTab() {
   // this.router.navigate(['/table']);
    this.verif = false;
  }
  goToHome() {
    //this.router.navigate(['/home'])
    this.verif = true;
  }

  eventfun($event){
    this.federationId = $event;
  }

}
