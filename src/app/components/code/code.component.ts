import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '@app/services';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent {
  code$ = this.service.getGridData().code$;
  constructor(private service: GeneratorService) {}
}
