import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '@app/components';
import { PaymentsComponent } from './payments.component';

const MATERIAL_MODULES = [MatTableModule, MatButtonModule, MatInputModule];

const routes: Routes = [
  {
    path: '',
    component: PaymentsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ...MATERIAL_MODULES,
  ],
  declarations: [PaymentsComponent],
})
export class PaymentsModule {}
