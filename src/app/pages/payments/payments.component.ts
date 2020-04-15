import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterPaths } from '@app/routes';
import { GeneratorService, PaymentsService } from '@app/services';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent {
  /**
   * The columns of the table.
   */
  displayedColumns: string[] = ['name', 'amount', 'code', 'data'];

  /**
   * The source of the payments data.
   */
  dataSource$ = this.paymentService.getPaymentList$();

  /**
   * Form to control the input data.
   */
  form = this.formBuilder.group({
    name: new FormControl(''),
    amount: new FormControl(0),
  });

  constructor(
    private router: Router,
    private generatorService: GeneratorService,
    private paymentService: PaymentsService,
    private formBuilder: FormBuilder
  ) {}

  /**
   * Navigate to the generator page.
   */
  goToGenerator(): void {
    this.router.navigate([RouterPaths.GENERATOR]);
  }

  /**
   * Add new payment using the service, a POST http method will be called.
   */
  onAddClick(): void {
    const { code$, data$ } = this.generatorService.getGridData();

    const { name, amount } = this.form.getRawValue();

    this.paymentService.addPayment({
      amount,
      code: code$.value,
      data: data$.value,
      name,
    });

    this.form.reset({ name: '', amount: 0 });
  }

  /**
   * Control if is we have all data to create a new payment.
   */
  isAddDisabled(): boolean {
    const { code$, data$ } = this.generatorService.getGridData();
    const { name, amount } = this.form.getRawValue();

    return !name || !amount || !code$.value || !data$.value?.length;
  }
}
