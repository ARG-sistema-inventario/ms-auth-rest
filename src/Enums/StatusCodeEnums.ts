type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum StatusCodeEnums {
    EMAIL_DUPLICATED = 10001,
    USER_VERIFIED,
    INVALID_VERIFICATION_CODE,
    INVALID_PASSWORD_USERNAME,
    INVALID_FORMAT_PASSWORD,

    USER_ALREADY_APPROVED = 10011,

    USER_NOT_FOUND = 20001,

    CATEGORY_ALREADY_EXISTS = 30001,
    CATEGORY_NOT_FOUND,
    CATEGORY_NOT_EMPTY,

    ASSET_ALREADY_EXISTS = 40001,
    ASSET_NOT_FOUND,
}

const StatusCodeExceptionText: EnumDictionary<StatusCodeEnums, string> = {
    [StatusCodeEnums.EMAIL_DUPLICATED]: 'EMAIL_DUPLICATED',
    [StatusCodeEnums.USER_VERIFIED]: 'USER_VERIFIED',
    [StatusCodeEnums.INVALID_VERIFICATION_CODE]: 'INVALID_VERIFICATION_CODE',
    [StatusCodeEnums.INVALID_PASSWORD_USERNAME]: 'INVALID_PASSWORD_USERNAME',
    [StatusCodeEnums.USER_ALREADY_APPROVED]: 'USER_ALREADY_APPROVED',
    [StatusCodeEnums.INVALID_FORMAT_PASSWORD]: 'INVALID_FORMAT_PASSWORD',
    [StatusCodeEnums.USER_NOT_FOUND]: 'USER_NOT_FOUND',
    [StatusCodeEnums.CATEGORY_ALREADY_EXISTS]: 'CATEGORY_ALREADY_EXISTS',
    [StatusCodeEnums.CATEGORY_NOT_FOUND]: 'CATEGORY_NOT_FOUND',
    [StatusCodeEnums.CATEGORY_NOT_EMPTY]: 'CATEGORY_NOT_EMPTY',
    [StatusCodeEnums.ASSET_ALREADY_EXISTS]: 'ASSET_ALREADY_EXISTS',
    [StatusCodeEnums.ASSET_NOT_FOUND]: 'ASSET_NOT_FOUND',
};

export { StatusCodeEnums, StatusCodeExceptionText };