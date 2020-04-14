import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './generator.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: GeneratorComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [GeneratorComponent],
})
export class GeneratorModule {}
