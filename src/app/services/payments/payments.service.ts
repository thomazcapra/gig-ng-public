import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * The interface that represents the payment information.
 */
export interface PaymentInfo {
  code: string;
  data: Array<string>;
  amount: number;
  name: string;
}

/**
 * The response of the API should contain a data prop, as an array of payment info.
 */
interface PaymentInfoReponse {
  data: PaymentInfo[];
}

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private payments$ = new BehaviorSubject<PaymentInfo[]>([]);
  private endpoint = 'payments';

  /**
   * Get the payment info list when the app bootstraps this services.
   */
  constructor(private http: HttpClient) {
    this.http
      .get<PaymentInfoReponse>(`${environment.server_base_url}${this.endpoint}`)
      .toPromise()
      .then(({ data }) => {
        this.payments$.next(data);
      });
  }

  /**
   * Return the payment observable to be used with async pipe.
   */
  getPaymentList$(): Observable<PaymentInfo[]> {
    return this.payments$;
  }

  /**
   * Send a new payload to be storaged in the backend and update the list after get the response.
   * @param paymentInfo the paylod to be storaged.
   */
  addPayment(paymentInfo: PaymentInfo): void {
    this.http
      .post<PaymentInfoReponse>(
        `${environment.server_base_url}${this.endpoint}`,
        paymentInfo
      )
      .toPromise()
      .then(({ data }) => {
        this.payments$.next(data);
      });
  }
}
