import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSectionComponent } from './teacher-section.component';

describe('TeacherSectionComponent', () => {
  let component: TeacherSectionComponent;
  let fixture: ComponentFixture<TeacherSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
