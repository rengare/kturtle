import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AVAILABLE_COMMANDS } from 'src/app/constant';
import { CommandWithExample } from 'src/app/models';

@Component({
  selector: 'app-command-input',
  templateUrl: './command-input.component.html',
  styleUrls: ['./command-input.component.scss'],
})
export class CommandInputComponent {
  @Output() onCommandAdded = new EventEmitter<string>();
  @Output() onReset = new EventEmitter<void>();

  inputValue = '';
  suggestions: CommandWithExample[] = AVAILABLE_COMMANDS;

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
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    const setValue = () => {
      if (this.selectedIndex >= 0) {
        this.form
          .get('command')
          ?.setValue(this.suggestions[this.selectedIndex].command);
      }
    };

    switch (event.key) {
      case 'ArrowUp':
        this.selectedIndex = Math.max(0, this.selectedIndex - 1);
        setValue();
        break;
      case 'ArrowDown':
        this.selectedIndex = Math.min(
          this.suggestions.length - 1,
          this.selectedIndex + 1,
        );
        setValue();
        break;
      case 'Enter':
        this.onSubmit();
        this.selectedIndex = -1;
        break;
    }
  }

  onSubmit(): void {
    this.onCommandAdded.emit(this.inputValue);
    this.form.get('command')?.setValue('');
  }
}
