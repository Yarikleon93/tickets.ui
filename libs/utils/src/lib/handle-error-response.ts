import { HttpErrorResponse } from '@angular/common/http';

export function handleErrorResponse(errorData: HttpErrorResponse): void {
  console.error(errorData.error.message);
}
