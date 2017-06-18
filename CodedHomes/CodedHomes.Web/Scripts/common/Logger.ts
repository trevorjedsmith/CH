/// <reference path="../../typings/globals/toastr/index.d.ts" />



namespace CodedHomes {
    export class Logger {

        constructor() {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": 300,
                "hideDuration": 1000,
                "timeOut": 5000,
                "extendedTimeOut": 1000,
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }

        }

        log(message: string, data: any, source: any, showToast: boolean) {
            this.logIt(message, data, source, showToast, 'success');
        }

        logError(message: string, data: any, source: any, showToast: boolean) {
            this.logIt(message, data, source, showToast, 'error');
        }

        logIt(message: string, data: any, source: any, showToast: boolean, toastType: string) {
            source = source ? '[' + source + '] ' : '';
            if (data) {
                console.log('Message: ' + message + ', data: ' + data);
            } else {
                console.log('Message: ' + message);
            }

            if (showToast) {
                if (toastType === 'error') {
                    toastr.error(message);
                }
                else {
                    toastr.success(message);
                }
            }
        }

    }
}




