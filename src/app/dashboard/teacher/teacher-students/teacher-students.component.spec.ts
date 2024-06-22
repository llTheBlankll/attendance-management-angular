import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentsComponent } from './teacher-students.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('TeacherStudentsComponent', () => {
  let component: TeacherStudentsComponent;
  let fixture: ComponentFixture<TeacherStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherStudentsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
