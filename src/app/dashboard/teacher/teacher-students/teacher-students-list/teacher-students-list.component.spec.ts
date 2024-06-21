import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentsListComponent } from './teacher-students-list.component';

describe('TeacherStudentsListComponent', () => {
  let component: TeacherStudentsListComponent;
  let fixture: ComponentFixture<TeacherStudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherStudentsListComponent]
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
