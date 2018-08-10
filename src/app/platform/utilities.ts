// Useful utilities for all code

export function extractRemoteErrorCode(err: any): number {
  if (err['error'] && err['error']['errorCode']) {
    return err['error']['errorCode'];
  }
  return -1;
}

export function extractRemoteErrorMsg(err: any): string {
  if (err['error'] && err['error']['errorMessage']) {
    return err['error']['errorMessage'];
  }
  return '';
}

