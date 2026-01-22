import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TOAST_TEXT, TOAST_VARIANT } from '../../shared/util/constants';
import { ToastService } from '../toast/toast';
import { IUser } from '../../shared/types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly baseUrl: string = `${environment.baseApi}/users`;
  private readonly http: HttpClient = inject(HttpClient);
  private readonly toastService: ToastService = inject(ToastService);

  private handleSuccess(message: string) {
    this.toastService.addToast({
      variant: TOAST_VARIANT.SUCCESS,
      message: message,
    });
  }

  private handleError<T>(message: string, result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(message, error);
      this.toastService.addToast({
        variant: TOAST_VARIANT.ERROR,
        message: message,
      });
      return of(result as T);
    };
  }

  public getAllUsers(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(this.baseUrl)
      .pipe(catchError(this.handleError<IUser[]>(TOAST_TEXT.ERROR_USER_LOAD, [])));
  }

  public createUser(user: IUser): Observable<IUser | null> {
    return this.http.post<IUser>(this.baseUrl, user).pipe(
      tap(() => this.handleSuccess(TOAST_TEXT.REGISTER_SUCCESS)),
      catchError(this.handleError<IUser | null>(TOAST_TEXT.ERROR_CREATE, null)),
    );
  }

  public getUserById(id: string): Observable<IUser | null> {
    return this.http
      .get<IUser>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError<IUser | null>(TOAST_TEXT.ERROR_USER_LOAD, null)));
  }
}
