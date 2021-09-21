export interface IApiResponse {
  data?: any;
  metadata?: IMetaData;
  resultsets?: IResultSet[];
}

export interface IResultSet {
  resultCode: string;
  status: string;
  resultDescription?: string;
}

export interface IResultDetail {
  operationReference: string;
  result: string;
  status: string;
  reason?: string;
}

export interface IResultData {
  resultDetail: IResultDetail[];
}

export interface IMetaData {
  resultData: IResultData[];
}

export interface IResultStatus {
  isValid: boolean;
  reason: string;
  status?: string;
  result?: string;
}

