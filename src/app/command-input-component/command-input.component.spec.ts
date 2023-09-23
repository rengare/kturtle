import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandInputComponentComponent } from './command-input-component.component';

describe('CommandInputComponentComponent', () => {
  let component: CommandInputComponentComponent;
  let fixture: ComponentFixture<CommandInputComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandInputComponentComponent]
    });
    fixture = TestBed.createComponent(CommandInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
