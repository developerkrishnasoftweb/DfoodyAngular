export enum HttpResponseStatusCode {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500,
    ServiceUnavailable = 503
}

export enum ApplicationTypeEnum {
    PersonalLoan = 211,
    Overdraft
}

export enum ValidationMsg {
    //Email
    EmailRequired = "Email address is required",
    EmailInvalid = "Email address is invalid",
    EmailMaxLength = "Email address must be 50 characters or less",
    EmailAlreadyExist = "This email address already exists",

    //Password
    PasswordRequired = "Password is required",
    PasswordMaxLength = "Password must be 20 characters or less",

    //First Name
    FirstNameRequired = "First Name is required",
    FirstNameMaxLength = "First Name must be 50 characters or less",

    //Name
    NameRequired = "Name is required",
    NameMaxLength = "Name must be 50 characters or less",

    //date 
    DateRequired = "Date is required",

    //time 
    TimeRequired = "Time is required",

    //Seat 
    SeatRequired = "Seat is required",


    //Last Name
    LastNameRequired = "Last Name is required",
    LastNameMaxLength = "Last Name must be 50 characters or less",

    //Mobile
    MobileRequired = "Mobile Number is required",
    MobileLength = "Please, Enter 10 digit Mobile Number",
    MobileAlreadyExist = "This mobile number already exists",

    //Message 
    MessageRequired = "Message is required",


}

