import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-discrete-input',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field [class]="size">
      <mat-label>{{ param }}</mat-label>
      <input matInput [type]="type" />
    </mat-form-field>
  `,
  styles: [`
    mat-form-field.large {
      width: 100%;
      font-size: 1.2em;
    }
    mat-form-field.default {
      width: 100%;
    }
  `]
})
export class DiscreteInputComponent {
  @Input() param: string = '';
  @Input() size: 'default' | 'large' = 'default';
  @Input() type: 'text' | 'date' = 'text';
}
