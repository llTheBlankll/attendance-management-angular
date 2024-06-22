import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentsListComponent } from './teacher-students-list.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('TeacherStudentsListComponent', () => {
  let component: TeacherStudentsListComponent;
  let fixture: ComponentFixture<TeacherStudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherStudentsListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
