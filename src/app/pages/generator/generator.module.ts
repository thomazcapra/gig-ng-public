import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './generator.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from '@app/components';

const routes: Routes = [
  {
    path: '',
    component: GeneratorComponent,
  },
];

const MATERIAL_MODULES = [MatGridListModule, MatButtonModule, MatInputModule];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    RouterModule.forChild(routes),
  ],
  declarations: [GeneratorComponent],
})
export class GeneratorModule {}
