import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { availableCommands } from '../command';

@Component({
  selector: 'app-command-input',
  templateUrl: './command-input.component.html',
  styleUrls: ['./command-input.component.scss'],
})
export class CommandInputComponent {
  @Output() onCommandAdded = new EventEmitter<string>();
  @Output() onReset = new EventEmitter<void>();

  inputValue = '';
  suggestions: string[] = [];

  selectedIndex = -1;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      command: [''],
    });
  }

  ngOnInit(): void {
    this.form.get('command')?.valueChanges.subscribe((value: string) => {
      this.inputValue = value;
      this.onInputChange();
    });
  }

  onInputChange(): void {
    this.suggestions = availableCommands.filter((command) =>
      command.startsWith(this.inputValue),
    );
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.selectedIndex = Math.max(0, this.selectedIndex - 1);
        break;
      case 'ArrowDown':
        this.selectedIndex = Math.min(
          this.suggestions.length - 1,
          this.selectedIndex + 1,
        );
        break;
      case 'Enter':
        if (this.selectedIndex >= 0) {
          this.form
            .get('command')
            ?.setValue(this.suggestions[this.selectedIndex]);
          this.suggestions = [];
        } else if (this.inputValue) {
          this.onSubmit();
        }
        this.selectedIndex = -1;
        break;
    }
  }

  onSubmit(): void {
    this.onCommandAdded.emit(this.inputValue);
    this.form.get('command')?.setValue('');
  }
}
