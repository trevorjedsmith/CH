/// <reference path="../../typings/globals/jquery/index.d.ts" />
var CodedHomes;
(function (CodedHomes) {
    var CodedHomesDataService = (function () {
        function CodedHomesDataService(ajaxService, controllerName) {
            this.ajaxService = ajaxService;
            this.ajaxService.ajaxSettings.crossDomain = true;
            this.baseUri = "" + CodedHomes.Constants.BaseServiceBusUrl + controllerName;
        }
        CodedHomesDataService.prototype.commit = function (type, url, data) {
            if (type === CodedHomes.Constants.BasePOSTMethod) {
                delete data['id'];
            }
            return $.ajax({
                type: type,
                url: url,
                data: data,
                dataType: CodedHomes.Constants.BaseContent
            });
        };
        ;
        CodedHomesDataService.prototype.saveImage = function (data) {
            return $.ajax({
                type: CodedHomes.Constants.BasePOSTMethod,
                url: '/homes/uploadImage',
                processData: false,
                contentType: false,
                data: data
            });
        };
        CodedHomesDataService.prototype.del = function (data, apiUrl) {
            return this.commit(CodedHomes.Constants.BaseDeleteMethod, apiUrl + data.id, null);
        };
        ;
        CodedHomesDataService.prototype.save = function (data, apiUrl) {
            var type = CodedHomes.Constants.BasePOSTMethod;
            var url = apiUrl;
            if (data.Id > 0) {
                type = CodedHomes.Constants.BasePUTMethod;
                url += '/' + data.Id;
            }
            return this.commit(type, url, data);
        };
        return CodedHomesDataService;
    }());
    CodedHomes.CodedHomesDataService = CodedHomesDataService;
})(CodedHomes || (CodedHomes = {}));
