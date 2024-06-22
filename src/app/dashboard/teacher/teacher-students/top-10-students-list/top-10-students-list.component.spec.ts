import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10StudentsListComponent } from './top-10-students-list.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";

describe('Top10StudentsListComponent', () => {
  let component: Top10StudentsListComponent;
  let fixture: ComponentFixture<Top10StudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top10StudentsListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top10StudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
