import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterPaths } from '@app/routes';
import { GeneratorService, GridData, GeneratorConstants } from '@app/services';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent implements OnInit {
  private stopGenerationSubject$ = new Subject<void>();
  private randomMode = false;

  get buttonText(): string {
    return this.randomMode ? 'STOP GENERATION' : 'GENERATE 2D GRID';
  }

  grid: GridData = this.service.getGridData();

  form: FormGroup = this.formBuilder.group({
    char: new FormControl(''),
  });

  constructor(
    private router: Router,
    private service: GeneratorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  goToPayments(): void {
    this.router.navigate([RouterPaths.PAYMENTS]);
  }

  private startRandomGeneration(): void {
    interval(GeneratorConstants.GENERATION_TIME_MS)
      .pipe(takeUntil(this.stopGenerationSubject$))
      .subscribe((): void => {
        this.service.generateRandomGrid();
      });
  }

  private stopRandomGeneration(): void {
    this.stopGenerationSubject$.next();
  }

  onClick(): void {
    if (this.randomMode) {
      this.stopRandomGeneration();
    } else {
      this.startRandomGeneration();
    }

    this.randomMode = !this.randomMode;
  }
}
