import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './main/home/home.component';
import { HeaderComponent } from './header/header.component';
import {ClipboardModule} from '@angular/cdk/clipboard';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {A11yModule} from '@angular/cdk/a11y';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CountryserviceService} from './countryservice.service';
import {HttpClientModule} from '@angular/common/http';
import {AccordionModule} from 'primeng/accordion';     // accordion and accordion tab
import {MenuItem} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { TableComponent } from './main/table/table.component';
import {ToastModule} from 'primeng/toast';
import { DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import { FederationaddComponent } from './main/table/federationadd/federationadd.component';
import {MatSelectCountryModule} from "@angular-material-extensions/select-country";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FederationupdateComponent } from './main/table/federationupdate/federationupdate.component';
import { DirectiveviewchildDirective } from './directive/directiveviewchild.directive';


const config = {
  apiKey: 'AIzaSyAW80ja8_IGZ9njfATN5KsxuF3Co0PcmDo',
  authDomain: 'gestion-fifa.firebaseapp.com',
  databaseURL: 'https://gestion-fifa-default-rtdb.firebaseio.com/',
  projectId: 'gestion-fifa',
  storageBucket: 'gestion-fifa.appspot.com',
  messagingSenderId: '367010621897',
  appId: '1:367010621897:web:8d01e7ea01d1a0dba66018',
  measurementId: 'G-PQSGQZGDYW'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    TableComponent,
    FederationaddComponent,
    FederationupdateComponent,
    DirectiveviewchildDirective
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        AngularFireStorageModule,
        MatCardModule,
        MatTabsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSelectCountryModule.forRoot('fr'),
        A11yModule,
        ClipboardModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        PortalModule,
        ScrollingModule,
        MatToolbarModule,
        MatSidenavModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        HttpClientModule,
        ButtonModule,
        TableModule,
        ToastModule,
        DynamicDialogModule,
        ConfirmDialogModule

    ],
  providers: [CountryserviceService , ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
