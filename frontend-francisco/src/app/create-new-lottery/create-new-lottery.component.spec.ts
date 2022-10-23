import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewLotteryComponent } from './create-new-lottery.component';

describe('CreateNewLotteryComponent', () => {
  let component: CreateNewLotteryComponent;
  let fixture: ComponentFixture<CreateNewLotteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewLotteryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewLotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
