/// <reference path="../../typings/globals/toastr/index.d.ts" />
var CodedHomes;
(function (CodedHomes) {
    var Logger = (function () {
        function Logger() {
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
            };
        }
        Logger.prototype.log = function (message, data, source, showToast) {
            this.logIt(message, data, source, showToast, 'success');
        };
        Logger.prototype.logError = function (message, data, source, showToast) {
            this.logIt(message, data, source, showToast, 'error');
        };
        Logger.prototype.logIt = function (message, data, source, showToast, toastType) {
            source = source ? '[' + source + '] ' : '';
            if (data) {
                console.log('Message: ' + message + ', data: ' + data);
            }
            else {
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
        };
        return Logger;
    }());
    CodedHomes.Logger = Logger;
})(CodedHomes || (CodedHomes = {}));
