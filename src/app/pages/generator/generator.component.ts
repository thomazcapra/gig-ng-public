import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterPaths } from '@app/routes';
import { GeneratorService, GridData, GeneratorConstants } from '@app/services';
import { interval, Subject, Subscription, timer } from 'rxjs';
import { takeUntil, first, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent implements OnInit, OnDestroy {
  get buttonText(): string {
    return this.isRandomModeEnable ? 'STOP GENERATION' : 'GENERATE 2D GRID';
  }

  get isRandomModeEnable(): boolean {
    return this.service.isRandomModeEnable();
  }

  grid: GridData = this.service.getGridData();
  private subscription$: Subscription;

  form: FormGroup = this.formBuilder.group({
    char: new FormControl(''),
  });

  constructor(
    private router: Router,
    private service: GeneratorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscription$ = this.form.controls.char.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value?: string): void => {
        if (GeneratorConstants.CHARACTER_PATTERN.test(value)) {
          this.form.disable();
          timer(GeneratorConstants.CHARACTER_INPUT_DELAY_MS)
            .toPromise()
            .then(() => {
              this.form.reset({ char: '' });
              this.form.enable();
            });
        } else {
          this.form.reset({ char: '' });
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  goToPayments(): void {
    this.router.navigate([RouterPaths.PAYMENTS]);
  }

  private startRandomGeneration(): void {
    interval(GeneratorConstants.GENERATION_TIME_MS)
      .pipe(takeUntil(this.service.getStopGenerationSubject$()))
      .subscribe((): void => {
        const { char } = this.form.getRawValue();
        this.service.generateRandomGrid(char);
      });
  }

  private stopRandomGeneration(): void {
    this.service.getStopGenerationSubject$().next();
  }

  onClick(): void {
    if (this.isRandomModeEnable) {
      this.stopRandomGeneration();
    } else {
      this.startRandomGeneration();
    }

    this.service.toggleRandomMode();
  }
}
