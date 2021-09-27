const generateTimestampHash = (): string => (+new Date).toString(36);

export {
    generateTimestampHash
};
