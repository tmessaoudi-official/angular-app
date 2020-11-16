import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DumberComponent} from './dumber.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DumberComponent', () => {
  let component: DumberComponent;
  let fixture: ComponentFixture<DumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumberComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
