import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../services/api.service";
import {Data, Router} from "@angular/router";
import {CountryserviceService} from "../../../countryservice.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {DataClass} from "../../../api/data";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-federationupdate',
  templateUrl: './federationupdate.component.html',
  styleUrls: ['./federationupdate.component.css']
})
export class FederationupdateComponent implements OnInit {
  placeholdernom: string;
  placehlderannee: string;
  placeholdercountry: string;
  test: string;
ch: string;
  constructor(private httpClient: HttpClient, private api: ApiService  , private router: Router , private countryService: CountryserviceService, public ref: DynamicDialogRef
  ) { }
  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
  country: any;
  countries: any[];
  federation: DataClass = new DataClass();
  submitted = false;
  federationAdd: FormGroup;
  fed: DataClass;
  donne: Data[];
  @Input() verifMode: boolean;


  filteredCountriesSingle: any[];

  ngOnInit(): void {
    this.federationAdd = new FormGroup({
        nom: new FormControl('', [Validators.required]),
        pays: new FormControl('', [Validators.required]),
        annee: new FormControl('', [Validators.required, Validators.pattern('[0-9]+$'), Validators.maxLength(4)])

      }

    );
    this.api.getFederationById(this.api.getId()).subscribe(
  res => {
   this.placeholdernom = res.nom;
   this.placehlderannee = res.annee;
   this.placeholdercountry = res.pays;
   this.test =  res.pays;
   this.federation = res;
  }
);
    this.federation.pays = this.test;

  }
  newFederation(): void {
    this.submitted = false;
    this.federation = new DataClass();
  }




  check(event: KeyboardEvent) {
    // 31 and below are control keys, don't block them.
    if (event.keyCode > 31 && !this.allowedChars.has(event.keyCode)) {
      event.preventDefault();
    }
  }
  /*
  save(nom , annee , pays) {
    this.fed = new DataClass();
    this.fed.pays = Object.values(pays.value)[0].toString();
    this.fed.nom = nom.value;
    this.fed.annee = annee.value;
    this.api
      .updateFederation(this.fed).subscribe(data => {
        this.api.getFederation().subscribe(
          dat => {
            this.donne = dat;
          });
        this.api.table$.subscribe(
          x => {
            this.donne = x;
          }
        );
        this.ref.close();
      },
      error => console.log(error));
  }



  gotoList() {
    this.router.navigate(['/federations']);
  }
  */
  public updateFederation(nom , annee , pays) {

    this.fed = new DataClass();
    if ( Object.values(pays.value) == undefined) {
      this.fed.pays = this.test;
      console.log('TEKHDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEM');
    }
    else     {this.fed.pays = Object.values(pays.value)[0].toString();
      console.log('CHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB');
      console.log(Object.values(pays.value));


    }

    this.fed.nom = nom.value;
    this.fed.annee = annee.value;
    this.fed.id = this.api.getId();
    this.api
      .updateFederation(this.fed).subscribe(data => {
        this.api.getFederation().subscribe(
          dat => {
            this.donne = dat;
          });
        this.api.table$.subscribe(
          x => {
            this.donne = x;
          }
        );
        this.ref.close();
      },
      error => console.log(error));
  }
  filterCountry(query, countries: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }

    }

    return filtered;
  }


  filterCountrySingle(event) {
    const query = event.query;
    this.countryService.getCountries().then(countries => {
      this.filteredCountriesSingle = this.filterCountry(query, countries);
    });
  }

}
