export default class ModelMessagesConstants {
    public static IS_EMPTY = 'The $property attribute is required';
    public static IS_STRING = 'The $property attribute must be String';
    public static IS_BOOLEAN = 'The $property attribute must be Boolean';
    public static IS_NUMBER = 'The $property attribute must be int';
    public static INT_MAX = 'The $property attribute must have a maximum of 2147483647';
    public static STRING_MAX = 'The $property attribute must be lower than $constraint1';
    public static IS_VALID_RANGE = '$property must be between $constraint1 and $constraint2.';
    public static IS_LATITUDE = 'The $property attribute must be a valid latitude coordinate';
    public static IS_LONGITUDE = 'The $property attribute must be a valid longitude coordinate';
    public static IS_UNIT_MEASURE_1 = "The unit of the $property must be equals to 'kg' or 'g'";
    public static IS_UNIT_MEASURE_2 = "The unit of the $property must be equals to 'm' or 'cm'";
    public static IS_DATE_NOT_TIME = 'The $property must be a date string with format: YYYY-MM-DD';
    public static IS_EMAIL = 'The $property must be an email';
}
