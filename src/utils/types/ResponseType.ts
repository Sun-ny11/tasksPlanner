export type BaseResponseType<D = {}> = {
   resultCode: number;
   messages: string[];
   data: D;
   fieldsErrors: fieldsErrorsType[];
};
type fieldsErrorsType = {
   field: string;
   error: string;
};
