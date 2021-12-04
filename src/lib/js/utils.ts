
export function getCountryFlagFromAlpha2(alpha2: string): string {
    if (!alpha2 || alpha2.length != 2) {
        console.warn('getCountryFlagFromAlpha2 did not get a proper alpha2: ' + alpha2);
        return '';
    }

    const codePoints = alpha2
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
}
