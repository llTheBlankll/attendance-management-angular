import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentsDetailsComponent } from './teacher-students-details.component';

describe('TeacherStudentsDetailsComponent', () => {
  let component: TeacherStudentsDetailsComponent;
  let fixture: ComponentFixture<TeacherStudentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherStudentsDetailsComponent]
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
