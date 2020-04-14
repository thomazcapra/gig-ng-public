import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneratorConstants } from './generator.constants';

export interface GridData {
  data$: BehaviorSubject<Array<string>>;
  lineSize: number;
  code$: BehaviorSubject<string>;
}

@Injectable({
  providedIn: 'root',
})
export class GeneratorService {
  private gridSubject$ = new BehaviorSubject<Array<string>>(
    new Array(GeneratorConstants.GRID_SIZE).fill(
      '',
      0,
      GeneratorConstants.GRID_SIZE - 1
    )
  );

  private code$ = new BehaviorSubject<string>('');

  constructor() {}

  public getGridData(): GridData {
    return {
      data$: this.gridSubject$,
      lineSize: GeneratorConstants.LINE_SIZE,
      code$: this.code$,
    };
  }

  public generateRandomGrid(char?: string): void {
    const grid = new Array(GeneratorConstants.GRID_SIZE)
      .fill('')
      .map(() =>
        char && Math.floor(Math.random() * 10) <= 2
          ? char
          : this.generateRandomLowercaseLetter()
      );

    // if (char) {
    //   while ()
    // }

    const code = this.calculateCode(grid);

    this.code$.next(code);
    this.gridSubject$.next(grid);
  }

  /**
   * Generate a random lowercase letter: (a-z)
   */
  private generateRandomLowercaseLetter(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  /**
   * Get the number of incidences of a character in the array.
   * @param char the character we are looking for count.
   * @param grid the grid array.
   */
  private getOcorrences(char: string, grid: Array<string>): number {
    const ocorrences = grid.reduce((previous, current) => {
      return current === char ? previous + 1 : previous;
    }, 0);

    if (ocorrences > GeneratorConstants.COUNT_LIMIT) {
      if (ocorrences % GeneratorConstants.COUNT_LIMIT === 0) {
        return ocorrences / (ocorrences / GeneratorConstants.COUNT_LIMIT);
      }
      return ocorrences / (ocorrences / GeneratorConstants.COUNT_LIMIT);
    }

    return ocorrences;
  }

  /**
   *
   * @param grid the grid that will be
   */
  private calculateCode(grid: Array<string>): string {
    const [x, y] = new Date()
      .toISOString()
      .substring(17, 19)
      .split('')
      .map((value) => Number(value));

    const [char1, char2] = [
      grid[x * GeneratorConstants.LINE_SIZE + y],
      grid[y * GeneratorConstants.LINE_SIZE + x],
    ];

    const [incidences1, incidences2] = [
      this.getOcorrences(char1, grid),
      this.getOcorrences(char2, grid),
    ];

    return `${incidences1}${incidences2}`;
  }
}
