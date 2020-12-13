import {Component, OnInit, Output , EventEmitter} from '@angular/core';
import {Data, DataClass} from '../../api/data';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../services/api.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FederationaddComponent} from './federationadd/federationadd.component';
import {Router} from "@angular/router";
import {FederationupdateComponent} from "./federationupdate/federationupdate.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers : [DialogService, MessageService, ConfirmationService],
})
export class TableComponent implements OnInit {
  @Output() id: EventEmitter<number> = new EventEmitter<number>();
  constructor(public dialogService: DialogService, public messageService: MessageService, private httpClient: HttpClient, private api: ApiService ,  private router: Router, private confirmationService: ConfirmationService
  ) { }
  donne: Data[];
  cols: any[];
  totalRecords: number;
  selectedProduct1: Data;

  ref: DynamicDialogRef;
  ngOnInit(): void {
    this.api.getFederation().subscribe(
      res => {
        this.donne = res;
        this.api.setTable(res);
        this.cols = [
          { field: 'id', header: 'ID' },
          { field: 'nom', header: 'Nom' },
          { field: 'pays', header: 'Pays' },
          { field: 'annee', header: 'Annee de fondation' }
        ];
      }
    );
    this.totalRecords = this.donne.length;

  }



  show() {
    this.ref = this.dialogService.open(FederationaddComponent, {
      header: 'Ajouter Federation',
      width: '70%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((dataclass: DataClass) => {
      this.messageService.add({severity: 'info', summary: 'Federation Ajouté avec success'});
      this.api.getFederation().subscribe(
        dat => {
          this.donne = dat;
        });
            });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  updateFederation(id: number) {
    this.api.setId(id);
    this.ref = this.dialogService.open(FederationupdateComponent, {
      header: 'Modifier Federation',
      width: '70%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((dataclass: DataClass) => {
      this.messageService.add({severity: 'info', summary: 'Federation Modifié avec success'});
      this.api.getFederation().subscribe(
        dat => {
          this.donne = dat;
        });
    });
  }
  getEquipesByFedId(idd: number) {
    this.id.emit(idd) ;
    console.log(idd);
  }

  confirm2(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.api.deleteFederation(id).subscribe(
          res => {
            this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Federation supprimé avec success'});
            this.api.getFederation().subscribe(
              dat => {
                this.donne = dat;
              });

          }, error => {
            this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'erreur de suppression '});

          }
        );

      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'suppression rejecté'});
      }
    });
  }
}
