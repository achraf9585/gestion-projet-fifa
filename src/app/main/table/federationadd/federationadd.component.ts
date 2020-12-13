import {Component, Input, OnInit} from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../services/api.service';
import {Data, Router} from '@angular/router';
import {DataClass} from '../../../api/data';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CountryserviceService} from '../../../countryservice.service';
@Component({
  selector: 'app-federationadd',
  templateUrl: './federationadd.component.html',
  styleUrls: ['./federationadd.component.css'] ,
})
export class FederationaddComponent implements OnInit {
  constructor(private httpClient: HttpClient, private api: ApiService  , private router: Router ,
              private countryService: CountryserviceService, public ref: DynamicDialogRef
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
        annee: new FormControl('', [Validators.required,])

      }

    );


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
  save(nom , annee , pays) {
    this.fed = new DataClass();
    this.fed.pays = Object.values(pays.value)[0].toString();
    this.fed.nom = nom.value;
    this.fed.annee = annee.value;
    this.api
      .postFederation(this.fed).subscribe(data => {
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
