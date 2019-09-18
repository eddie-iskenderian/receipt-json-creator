
export const sanitiseFloat = (value: string) : string | null => {
    const pattern: RegExp = /^-?(\d+(\.(\d+)?)?)?$/;
    const matches: boolean = !!pattern.test(value);
    return matches ? value : null;
}