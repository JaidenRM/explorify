export const capitaliseFirstLetter = (str: string): string => {
  const lowercaseSuffix = str.length > 1 ? str.slice(1).toLowerCase() : "";

  return str[0].toUpperCase() + lowercaseSuffix;
};

export const sanitise = (str: string): string => {
  // parse HTML and get text content only (doesn't execute any JS code so is safe)
  str =
    new DOMParser().parseFromString(str, "text/html").documentElement
      .textContent || str;

  return str;
};
