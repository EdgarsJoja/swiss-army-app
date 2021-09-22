/**
 * Decode base64url string.
 *
 * @param value Value to decode.
 */
const decode = (value: string): string => {
    return atob(prepareDecodeValue(value));
};

/**
 * Transforms given value into base64 decode-able string.
 *
 * @param value Value to prepare for base64url decoding.
 */
const prepareDecodeValue = (value: string): string => {
    let preparedValue = value.replace(/-/g, '+').replace(/_/g, '/');
    const padCount = preparedValue.length % 4;

    if (padCount) {
        if (padCount === 1) {
            throw new Error(`InvalidLengthError: base64url string (${preparedValue}) has invalid length.`);
        }

        preparedValue += new Array(5 - padCount).join('=');
    }

    return preparedValue;
};

export {
    decode
};
