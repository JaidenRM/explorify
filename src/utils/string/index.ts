export const capitaliseFirstLetter = function (str: string): string {
    const lowercaseSuffix = str.length > 1 ? str.slice(1).toLowerCase() : '';

    return str[0].toUpperCase() + lowercaseSuffix;
};