/**
 * @remarks
 * This is used as part of the reset
 * archive password API Request Body
*/
export interface ResetArchiveBody {
  archive_name: string;
  user_id: string;
}

/**
 * @remarks
 * This is used to type the passphrase response
 * from API
*/
export interface PassphraseResponse {
  passphrase: string;
  ERROR?: Int16Array;
  body?: string;
}

/**
 * @remarks
 * Delete Error Response
*/
export interface DeleteResponse {
  ERROR?: Int16Array;
}

/**
 * @remarks
 * Type for list archives response
*/
export interface ListArchiveResponse {
  archives: Array<[string]>;
  ERROR?: Int16Array;
}