import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuytokensComponent } from './buytokens.component';

describe('BuytokensComponent', () => {
  let component: BuytokensComponent;
  let fixture: ComponentFixture<BuytokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuytokensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuytokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
