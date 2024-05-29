import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-add-driver',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './dialog-add-driver.component.html',
  styleUrl: './dialog-add-driver.component.scss',
})
export class DialogAddDriverComponent {
  public dialogRef = inject(MatDialogRef<DialogAddDriverComponent>);
  value: string = '';

  
}
