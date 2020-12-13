import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationaddComponent } from './federationadd.component';

describe('FederationaddComponent', () => {
  let component: FederationaddComponent;
  let fixture: ComponentFixture<FederationaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederationaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederationaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
