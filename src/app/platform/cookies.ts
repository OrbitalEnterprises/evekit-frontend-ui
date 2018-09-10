// Cut/paste from https://stackoverflow.com/questions/34298133/angular-cookies

// Cookie name registry
export const QS_MAIN_COOKIE_NAME = 'ek_qs';
export const QS_ACCOUNT_SELECTED = 'ek_qs_aid';
export const QS_REQUEST_ID = 'ek_qs_rid';

export function getCookie(name: string): string {
  const ca: Array<string> = document.cookie.split(';');
  const caLen: number = ca.length;
  const cookieName = `${name}=`;
  let c: string;

  for (let i = 0; i < caLen; i += 1) {
    c = ca[i].replace(/^\s+/g, '');
    if (c.indexOf(cookieName) === 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
  return '';
}

export function deleteCookie(name): void {
  setCookie(name, '', -1);
}

export function setCookie(name: string, value: string, expireDays: number, path: string = ''): void {
  const d = new Date();
  d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  const cpath = path ? `; path=${path}` : '';
  document.cookie = `${name}=${value}; ${expires}${cpath}`;
}

export function setCookieNoExpire(name: string, value: string, path: string = ''): void {
  const cpath = path ? `; path=${path}` : '';
  document.cookie = `${name}=${value}${cpath}`;
}
