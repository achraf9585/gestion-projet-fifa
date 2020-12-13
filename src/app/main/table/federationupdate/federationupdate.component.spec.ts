import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationupdateComponent } from './federationupdate.component';

describe('FederationupdateComponent', () => {
  let component: FederationupdateComponent;
  let fixture: ComponentFixture<FederationupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederationupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederationupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
