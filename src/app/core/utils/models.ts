
export interface MetaData {
    ResultCode: string;
    Message: string;
    InvalidFieldList?: any;
}

export interface IAuthorizeResponse {
    MetaData: MetaData;
    Data?: { TokenValue: string };
}

export interface IApiResponse {
    data?: any;
    Data?: any;
    metadata?: any;
    MetaData?: any;
    result?: any;
    responseCode?: any;
    responseMessage?: string;
}

export interface IAppealResponse {
    data?: any;
    Data?: any;
    metadata?: any;
    MetaData?: any;
    result?: any;
    responseCode: any;
    responseMessage: any;
}

export interface IUser {
    username?: string;
    password?: string;
    appliesTo?: string;
    secretType?: string;
    token?: string;
}
export interface IDatePickerProperties {
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: any;
    selectedDate?: Date;
    disableWeekends?: boolean;
}

export interface ICustomError {
    status: number;
    statusText: string;
    message: string;
}

