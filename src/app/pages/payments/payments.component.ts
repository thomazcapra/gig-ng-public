import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterPaths } from '@app/routes';
import { GeneratorService } from '@app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  constructor(private router: Router, private service: GeneratorService) {}

  ngOnInit() {}

  goToGenerator(): void {
    this.router.navigate([RouterPaths.GENERATOR]);
  }
}
