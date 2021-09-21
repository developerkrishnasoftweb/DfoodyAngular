import { ICurrency } from '@core/models/account';
import { HttpResponseStatusCode } from './enum';
import { ICustomError } from './models';

export class Constants {
    public static headerHeight = 81;
    public static disablePoUpMin = {
        height: 700,
        width: 700
    };
    public static variableValues =
        {
            cancelButtonText: 'Cancel'
        };

    public static tabConstants = {
        displayArrowCount: 3,
        arrowCountFullScreen: 5,
        tabMargin: 115
    };

    public static borrowProductApplicationStepTitles = {
        yourProduct: 'Your product',
        creditInfo: 'Credit info',
        aboutYou: 'About you',
        customisation: 'Customisation',
        finalistion: 'Finalisation'
    };

    public static borrowProductApplicationSteps = [
        Constants.borrowProductApplicationStepTitles.yourProduct,
        Constants.borrowProductApplicationStepTitles.creditInfo,
        Constants.borrowProductApplicationStepTitles.aboutYou,
        Constants.borrowProductApplicationStepTitles.customisation,
        Constants.borrowProductApplicationStepTitles.finalistion
    ];

    public static CurrencyHeading: ICurrency[] = [
        {
            countryId: 'NAM',
            currencyCode: 'NAD',
            symbol: 'N$'
        },
        {
            countryId: 'LES',
            currencyCode: 'LSL',
            symbol: 'L'
        },
        {
            countryId: 'SZL',
            currencyCode: 'ESW',
            symbol: 'E'
        },
        {
            countryId: 'ZIM',
            currencyCode: 'ZWD',
            symbol: '$'
        },

    ];

    public static ReferenceDataMasterCodes = {
        APST: 'APST', // Application Status
        APTY: 'APTY', // Application Types
        ASTP: 'ASTP', // Asset Types
        INTP: 'INTP', // Income Types
        DEO: 'DEO', // DEBT Types
        // EXTP: 'EXTP', // Expense Types
        HHE: 'HHE', // Household expense, master code HHE
    };

    public static ErrorMessages: Array<ICustomError> = [
        {
            status: HttpResponseStatusCode.BadRequest,
            statusText: 'Bad Request',
            message: 'It seems client-side input fails validation, Please try again.'
        },
        {
            status: HttpResponseStatusCode.NotFound,
            statusText: 'Not Found',
            message: 'Service that you are trying to access is not available.'
        },
        {
            status: HttpResponseStatusCode.ServiceUnavailable,
            statusText: 'Server Unavailable',
            message: 'Unexpected system behaviour, Please try again.'
        },
        {
            status: HttpResponseStatusCode.InternalServerError,
            statusText: 'Internal Server Error',
            message: 'Something went wrong, Please try again.'
        }
    ];

}
