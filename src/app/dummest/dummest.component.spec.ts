import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DummestComponent} from './dummest.component';

describe('DummestComponent', () => {
  let component: DummestComponent;
  let fixture: ComponentFixture<DummestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
