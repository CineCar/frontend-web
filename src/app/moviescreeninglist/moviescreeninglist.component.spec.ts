import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviescreeninglistComponent } from './moviescreeninglist.component';

describe('MoviescreeninglistComponent', () => {
  let component: MoviescreeninglistComponent;
  let fixture: ComponentFixture<MoviescreeninglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviescreeninglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviescreeninglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
