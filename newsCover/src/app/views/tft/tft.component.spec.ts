import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TftComponent } from './tft.component';

describe('TftComponent', () => {
  let component: TftComponent;
  let fixture: ComponentFixture<TftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
