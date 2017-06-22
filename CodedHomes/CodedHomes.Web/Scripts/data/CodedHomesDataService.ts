/// <reference path="../../typings/globals/jquery/index.d.ts" />


namespace CodedHomes {
    export class CodedHomesDataService<T>{

        ajaxService: JQueryStatic;

        baseUri: string;

        constructor(ajaxService: JQueryStatic, controllerName: string) {

            this.ajaxService = ajaxService;
            this.ajaxService.ajaxSettings.crossDomain = true;
            this.baseUri = `${Constants.BaseServiceBusUrl}${controllerName}`;

        }

        commit(type: any, url:string,data:any): JQueryPromise<T> {

            if (type === Constants.BasePOSTMethod) {
                delete data['id'];
            }

            return $.ajax({
                type: type,
                url: url,
                data: data,
                dataType: Constants.BaseContent
            });

        };

        saveImage(data: any) {
            return $.ajax({
                type: Constants.BasePOSTMethod,
                url: '/homes/uploadImage',
                processData: false,
                contentType: false,
                data: data
            });
        }

        del(data: any, apiUrl: string) {
            return this.commit(Constants.BaseDeleteMethod, apiUrl + data.id, null);
        };

        save(data: any, apiUrl:string) {
            let type = Constants.BasePOSTMethod;
            let url = apiUrl;

            if (data.Id > 0) {
                type = Constants.BasePUTMethod;
                url += '/' + data.Id;
            }

            return this.commit(type, url, data);
        }
    }
}