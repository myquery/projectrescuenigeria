import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegistrantComponent } from './list-registrant.component';

describe('ListRegistrantComponent', () => {
  let component: ListRegistrantComponent;
  let fixture: ComponentFixture<ListRegistrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRegistrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRegistrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
