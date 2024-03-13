import { CLEAR_LABEL, EVENT_NAME } from './constants';

export function getCookie(cname: string) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

let currentCSS: any = null;

async function addBrandStyles(id: string, files: { [key: string]: any }) {
  const file = files[id];
  if (file) {
    file.use();

    // If we've got a CSS file in use, turn it off
    if (currentCSS) {
      currentCSS.unuse();
    }

    currentCSS = file;
  }
  if (currentCSS && id === CLEAR_LABEL) {
    currentCSS.unuse();
    currentCSS = null;
  }
}

export function handleStyleSwitch({
  id,
  files,
  save,
}: {
  id: string;
  files: { [key: string]: any };
  save: boolean;
}) {
  addBrandStyles(id, files);

  if (save) {
    setCookie('cssVariables', id, 10);
  }

  const customEvent = new CustomEvent(EVENT_NAME, { detail: { theme: id } });
  document?.dispatchEvent(customEvent);
}
