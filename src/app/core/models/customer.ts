export class CustomerLoginReqModel {
    userName: string;
    password: string;
}


export class MyProfileModel {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    latitude: string;
    longitude: string;
    langPref: string;
}


export class CustomerRegistrationReqModel extends MyProfileModel {
    registeredIp: string;
    password: string;
    registeredFrom: string;
    socialProfileId: string;
    defaultLatitude: string;
    fcmToken: string;
}

export const TimeList = [
    { value: "0", text: "00.00" },
    { value: "1", text: "01.00" },
    { value: "2", text: "02.00" },
    { value: "3", text: "03.00" },
    { value: "4", text: "04.00" },
    { value: "5", text: "05.00" },
    { value: "6", text: "06.00" },
    { value: "7", text: "07.00" },
    { value: "8", text: "08.00" },
    { value: "9", text: "09.00" },
    { value: "10", text: "10.00" },
    { value: "11", text: "11.00" },
    { value: "12", text: "12.00" },
    { value: "13", text: "13.00" },
    { value: "14", text: "14.00" },
    { value: "15", text: "15.00" },
    { value: "16", text: "16.00" },
    { value: "17", text: "17.00" },
    { value: "18", text: "18.00" },
    { value: "19", text: "19.00" },
    { value: "20", text: "20.00" },
    { value: "21", text: "21.00" },
    { value: "22", text: "22.00" },
    { value: "23", text: "23.00" },
]

export class CustomerInfo extends CustomerRegistrationReqModel {
    customertypeId: number;
    emailToken: string;
    id: number;
    isDelete: string;
    isEmailVerified: boolean;
    isMobileVerified: boolean;
    isSynced: string;
    lastOrder: number;
    loyaltyPoint: number;
    qrExpirationTime: string;
    qrtempCode: string;
    status: string;
    walletBalance: number;
    fullName: string;
}

export class ChangePasswordReqModel {
    oldPassword: string;
    newPassword: string;
}


export class ConfigurationModel {
    id: number;
    pointPercentage: number;
    pointWorth: number;
    maxRedeem: number;
    maxRedeemDay: number;
    minRedeem: number;
    minWalletAmount: number;
    maxWalletAmount: number;
    isLoyaltyEnabled: boolean;
    isWalletEnabled: boolean;
    isTableBookingEnabled: boolean;
    googleMapApikey: string;
    qrexpireTime: number;
    isGoogleTracking: boolean;
    minimumOrderPrice: number;
    defaultServiceCharge: number;
    employeeNumber: number;
    title: string;
    arabicName: string;
    displayName: string;
    enterpriseLogo: string;
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    defaultLang: string;
}

export class Brand {
    display_name: string;
    id: number;
    pos_ref: string;
    status: string;
    title_arabic: string;
    title_lang: string;
}

export class Pagination {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
}

export const LangPreferences = [
    { value: "English", text: "English" },
    { value: "Urdu", text: "Urdu" }
]

