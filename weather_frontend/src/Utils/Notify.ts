import { VariantType, SnackbarKey } from 'notistack';

export class Notify {
    private enqueueSnackbar: (message: string, options?: {
        variant: VariantType; 
        autoHideDuration?: number, 
        style: {
            backgroundColor: string,
            fontWeight: string,
            fontSize: number
        },
        anchorOrigin: {
            vertical: string, 
            horizontal: string
        }
    }
    ) => SnackbarKey;
    private closeSnackbar: (key: SnackbarKey) => void;
    constructor(
        enqueueSnackbar: (message: string, options?: { variant: VariantType; autoHideDuration?: number }) => SnackbarKey,
        closeSnackbar: (key: SnackbarKey) => void
    ) {
        this.enqueueSnackbar = enqueueSnackbar;
        this.closeSnackbar = closeSnackbar;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private extractErrorMessage(err: any): string {
        if (typeof err === "string" && err !== "") return err;
        if (typeof err?.response?.data === "string" && err?.response?.data !== "") return err.response.data;
        if (typeof err?.response?.data?.Error === "string" && err?.response?.data?.Error !== "") return err.response.data.Error;
        if (typeof err?.message === "string" && err?.message !== "") return err.message;
        return "General error! Please try again.";
    };

    public success(message: string, duration: number) {
        this.enqueueSnackbar(message, {variant: 'success', autoHideDuration: duration, 
            style: {backgroundColor: '#004a4d', fontWeight: 'bold', fontSize: 20},
            anchorOrigin: {vertical: 'top', horizontal: 'center'}
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public error(message: any, duration: number) {
        message = this.extractErrorMessage(message)
        this.enqueueSnackbar(message, { variant: 'error', autoHideDuration: duration,
            style: {backgroundColor: '#b71c1c', fontWeight: 'bold', fontSize: 20},
            anchorOrigin: {vertical: 'top', horizontal: 'center'}
         });
    };
    public close(key: SnackbarKey) {
        this.closeSnackbar(key);
    };
}