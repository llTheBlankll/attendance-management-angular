import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStrandsComponent } from './admin-strands.component';

describe('AdminStrandsComponent', () => {
  let component: AdminStrandsComponent;
  let fixture: ComponentFixture<AdminStrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
