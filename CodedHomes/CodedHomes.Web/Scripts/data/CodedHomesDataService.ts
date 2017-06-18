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

        del(data: any, apiUrl: string) {
            return this.commit(Constants.BaseDeleteMethod, apiUrl + data.id, null);
        };

        save(data: any, apiUrl:string) {
            let type = Constants.BasePOSTMethod;
            let url = apiUrl;

            if (data.id > 0) {
                type = Constants.BasePUTMethod;
                url += '/' + data.id;
            }

            return this.commit(type, url, data);
        }
    }
}