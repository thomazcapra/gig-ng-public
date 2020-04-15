import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterPaths } from '@app/routes';
import { GeneratorConstants, GeneratorService, GridData } from '@app/services';
import { interval, Subscription, timer } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent implements OnInit, OnDestroy {
  /**
   * The button text based on the random mode stat.e
   */
  get buttonText(): string {
    return this.isRandomModeEnable ? 'STOP GENERATION' : 'GENERATE 2D GRID';
  }

  /**
   * Random mode state: true if available or false otherwise.
   */
  get isRandomModeEnable(): boolean {
    return this.service.isRandomModeEnable();
  }

  /**
   * The form value changes subscription to control the user's input.
   */
  private subscription$: Subscription;

  grid: GridData = this.service.getGridData();

  /**
   * Form to storage the inputed chat event.
   */
  form: FormGroup = this.formBuilder.group({
    char: new FormControl(''),
  });

  constructor(
    private router: Router,
    private service: GeneratorService,
    private formBuilder: FormBuilder
  ) {}

  /**
   * @inheritdoc
   */
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

  /**
   * @inheritdoc
   */
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  /**
   * Navigate to the payments page.
   */
  goToPayments(): void {
    this.router.navigate([RouterPaths.PAYMENTS]);
  }

  /**
   * Start an observable to refresh the grid every GeneratorConstants.GENERATION_TIME_MS ms.
   */
  private startRandomGeneration(): void {
    interval(GeneratorConstants.GENERATION_TIME_MS)
      .pipe(takeUntil(this.service.getStopGenerationSubject$()))
      .subscribe((): void => {
        const { char } = this.form.getRawValue();
        this.service.generateRandomGrid(char);
      });
  }

  /**
   * Stop the initialized observable in the `startRandomGeneration` method.
   */
  private stopRandomGeneration(): void {
    this.service.getStopGenerationSubject$().next();
  }

  /**
   * Start/Stop random generation.
   */
  onClick(): void {
    if (this.isRandomModeEnable) {
      this.stopRandomGeneration();
    } else {
      this.startRandomGeneration();
    }

    this.service.toggleRandomMode();
  }
}
