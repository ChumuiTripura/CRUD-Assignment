import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePartComponent } from './table-part.component';

describe('TablePartComponent', () => {
  let component: TablePartComponent;
  let fixture: ComponentFixture<TablePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
