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

    OldPasswordRequired = "Old Password is required",
    OldPasswordMaxLength = "Old Password must be between 6 to 20 characters or less",

    ConfirmPasswordRequired = "Confirm Password is required",
    ConfirmPasswordMaxLength = "Confirm Password must be between 6 to 20 characters or less",

    PasswordNotMatched = "Password and Confirm Password must be match",

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

    Address1MaxLength = "Address 1 must be 100 characters or less",
    Address1Required = "Address 1 is required",

    Address2MaxLength = "Address 2 must be 100 characters or less",
    Address2Required = "Address 2 is required",

    AddressTypeMaxLength = "Address Type must be 50 characters or less",
    AddressTypeRequired = "Address Type is required",

    AreaMaxLength = "Area must be 100 characters or less",
    AreaRequired = "Area is required",

    CityMaxLength = "City must be 20 characters or less",
    CityRequired = "City is required",

    StateMaxLength = "State must be 20 characters or less",
    StateRequired = "State is required",

    CountryMaxLength = "Country must be 20 characters or less",
    CountryRequired = "Country is required",

    ContactPersonMaxLength = "Contact Person Detail must be 100 characters or less",
    ContactPersonRequired = "Contact Person Detail is required",

    LandmarkMaxLength = "Landmark must be 200 characters or less",
    LandmarkRequired = "Landmark is required",

    
    ContactNumberMaxLength = "Please, Enter 10 digit Contact Number",
    ContactNumberRequired = "Contact Number is required",

    
    RemarkMaxLength = "Remark must be 500 characters or less",
    RemarkRequired = "Remark is required",

    ContactAddressMaxLength = "Contact Address must be 500 characters or less",
    ContactAddressRequired = "Contact Address is required",
}

export enum ConstantMessage {
    oldPasswordNotMatched = "Old Password is not currect",
    PasswordUpdated = "Password is updated successfully.",
    ItemSaved = "Item Added to cart successfully.",
    AddressSaved = "Address saved successfully.",
    AddressUpdated = "Address updated successfully.",
    AddressDeleted = "Address deleted successfully.",
    DeleteConfirm = "Are you sure to delete?",
}

//snack bar class 
export enum SnackBarCssClass {
    success = "success",
    danger = "danger"
}


export enum PaginationValue {
    pageNumber = 1,
    pageSize = 10
}
