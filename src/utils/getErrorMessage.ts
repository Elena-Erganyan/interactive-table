import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getErrorMessage (error: FetchBaseQueryError | SerializedError | undefined) {
  if (!error) return;

  if (!('status' in error)) { // then it's SerializedError
    return error.message as string;
  }

  // then it's FetchBaseQueryError
  if (typeof error.status !== 'number') {
    return `${error.status}: ${error.error}`;
  }
  
  return `An error occured: ${error.status}`;
}
