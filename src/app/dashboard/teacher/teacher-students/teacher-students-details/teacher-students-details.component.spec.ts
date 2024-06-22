import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentsDetailsComponent } from './teacher-students-details.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('TeacherStudentsDetailsComponent', () => {
  let component: TeacherStudentsDetailsComponent;
  let fixture: ComponentFixture<TeacherStudentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherStudentsDetailsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherStudentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
