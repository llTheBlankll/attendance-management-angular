import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationComponent } from './side-navigation.component';
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "../../app.routes";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('SideNavigationComponent', () => {
  let component: SideNavigationComponent;
  let fixture: ComponentFixture<SideNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavigationComponent, BrowserAnimationsModule],
      providers: [
        provideRouter(
          routes
        ),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
