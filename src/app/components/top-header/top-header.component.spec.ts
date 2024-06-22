import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeaderComponent } from './top-header.component';
import {provideRouter} from "@angular/router";
import {routes} from "../../app.routes";
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('TopHeaderComponent', () => {
  let component: TopHeaderComponent;
  let fixture: ComponentFixture<TopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopHeaderComponent],
      providers: [
        provideRouter(
          routes
        ),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
