export enum HttpResponseStatusCode {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500,
    ServiceUnavailable = 503
}

export enum ApplicationTypeEnum  {
    PersonalLoan = 211,
    Overdraft
}

export enum ValidationMsg {
    //Email
    EmailRequired = "Email address is required",
    EmailInvalid = "Email address is invalid",
    EmailMaxLength = "Email address must be 50 characters or less",

    //Password
    PasswordRequired = "Password is required",
    PasswordMaxLength = "Password must be 20 characters or less",

    //FullName
    FullNameRequired = "Full Name is required",
    FullNameMaxLength = "Full Name must be 50 characters or less",
}

