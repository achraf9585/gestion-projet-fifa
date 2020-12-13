import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatCalendarCellCssClasses} from "@angular/material/datepicker";
import {CountryserviceService} from "../../countryservice.service";
import {MenuItem, MessageService} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";
import {Customer} from "../../achat/customer";
import {Data} from "../../api/data";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../services/api.service";
import {Equipe} from "../../api/equipe";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  @Input() id: number;
user: firebase.User;
titre: string;
donne: Equipe[];
  userAchat : Observable<any[]>
  country: any;
  countries: any[];
  customer: Customer = new Customer();
  cols: any[];
  constructor(
    private  api: ApiService,
    private auth: AuthService,
    private router: Router,
    private countryService: CountryserviceService,
    private dbFireBase: AngularFireDatabase,
    private authService: AuthService,
    private httpClient: HttpClient,
    private messageService: MessageService


  ) { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  }
  ngOnInit(): void {
    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      });
    this.titre = '' ;
    //http://localhost:3000/data
    this.api.getEquipe(this.id).subscribe(
      res => {
        this.donne = res;
        console.log(this.donne)
        this.api.setTable(res);
        this.cols = [
          { field: 'id', header: 'ID' },
          { field: 'nom', header: 'Nom' },
          { field: 'president', header: 'President' },
          { field: 'annee', header: 'Annee de fondation' },
          { field: 'stade', header: 'Stade' },
          { field: 'entraineur', header: 'Entraineur' },
        ];
      }
    );
    console.log(this.id);

  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  header(){
    this.router.navigate(['/header']);
  }
  ////////////////
  cardName(num){

    switch (num) {
      case 1: this.titre = 'Virage';
      break;
      case 2: this.titre = 'Pelouse';
        break;
      case 3: this.titre = 'Enceinte Supérieur'; break;
      case 4: this.titre = 'Enceinte Inferieur'; break;
      case 5: this.titre = 'Tribune'; break;
      case 6: this.titre = 'Loge'; break;
      default:
    }
  }
  filteredCountriesSingle: any[];
  filterCountry(query, countries: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }

  filterCountrySingle(event) {
    let query = event.query;
    this.countryService.getCountries().then(countries => {
      this.filteredCountriesSingle = this.filterCountry(query, countries);
    });
  }
  achat(userAchat) {
    // this.dbFireBase.list('userAchat').push({ nom: userAchat.nom , prénom: userAchat.prenom , email: userAchat.email, country: userAchat.country})
    this.authService.getUserState().subscribe(
      res => {
        this.customer.refranceUserId = res.uid;
        this.authService.createCustomer(this.customer);
        this.customer = new Customer();
        this.messageService.add({severity:'success', summary: 'Abonnement', detail: this.titre});
      }
    );
  }

}
