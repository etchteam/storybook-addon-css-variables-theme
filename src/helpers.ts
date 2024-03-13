import { global } from '@storybook/global';

import { CLEAR_LABEL, EVENT_NAME } from './constants';
import { Files } from './types';

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
  files: Files;
  save: boolean;
}) {
  addBrandStyles(id, files);

  if (save) {
    setCookie('cssVariables', id, 10);
  }

  const customEvent = new CustomEvent(EVENT_NAME, { detail: { theme: id } });
  document?.dispatchEvent(customEvent);
}

export function transformFiles(files: Files) {
  const filesKeys = Object.keys(files);

  if (
    filesKeys.every(function (key) {
      return typeof files[key] !== 'string';
    })
  ) {
    return files;
  }

  return filesKeys.reduce<Files>(function (acc, curr) {
    const id = curr;
    const css = files[id];
    acc[curr] = {
      use: () => addOutlineStyles(id, css),
      unuse: () => clearStyles(id),
    };
    return acc;
  }, {});
}

export const clearStyles = (selector: string | string[]) => {
  const selectors = Array.isArray(selector) ? selector : [selector];
  selectors.forEach(clearStyle);
};

const clearStyle = (input: string | string[]) => {
  const selector = typeof input === 'string' ? input : input.join('');
  const element = global.document.getElementById(selector);
  if (element && element.parentElement) {
    element.parentElement.removeChild(element);
  }
};

export const addOutlineStyles = (selector: string, css: string) => {
  const existingStyle = global.document.getElementById(selector);
  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }
  } else {
    const style = global.document.createElement('style');
    style.setAttribute('id', selector);
    style.innerHTML = css;
    global.document.head.appendChild(style);
  }
};
