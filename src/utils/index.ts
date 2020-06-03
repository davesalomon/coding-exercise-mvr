import en from "./lang/en";

// @ts-ignore
type Dictionary = Record<string, string | Dictionary>;

const SELECTED_LANGUAGE = "en";

const langs = {
  en,
};

export const tr = (key: string): string => {
  const keyParts = key.split(".");
  return keyParts.reduce((acc, keyPart) => {
    const next = acc[keyPart];
    return next || key;
  }, langs[SELECTED_LANGUAGE] as Dictionary);
};
