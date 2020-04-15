import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterPaths } from '@app/routes';

const routes: Routes = [
  {
    path: RouterPaths.GENERATOR,
    loadChildren: './pages/generator/generator.module#GeneratorModule',
  },
  {
    path: RouterPaths.PAYMENTS,
    loadChildren: './pages/payments/payments.module#PaymentsModule',
  },
  {
    path: '**',
    redirectTo: RouterPaths.GENERATOR,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
