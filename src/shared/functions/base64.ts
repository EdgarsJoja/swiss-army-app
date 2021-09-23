/**
 * Base64 decode given value.
 *
 * @param value
 */
const decode = (value: string): string => {
    return atob(value);
};

/**
 * Base64 encode given value.
 *
 * @param value
 */
const encode = (value: string): string => {
    return btoa(value);
};

export {
    encode,
    decode
};
