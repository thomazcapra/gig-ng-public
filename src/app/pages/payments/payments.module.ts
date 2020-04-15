import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments.component';
import { ComponentsModule } from '@app/components';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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
    RouterModule.forChild(routes),
    ComponentsModule,
    ...MATERIAL_MODULES,
  ],
  declarations: [PaymentsComponent],
})
export class PaymentsModule {}
