namespace CodedHomes {

    import logger = CodedHomes.Logger;

    export class HomesViewModel {

        private logger: logger;

        private homesList: KnockoutObservableArray<any>;

        private currentHome: KnockoutObservable<any>;

        private errorMessage: KnockoutObservable<string>;

        constructor(homesJson: any) {
            this.logger = new CodedHomes.Logger();
            this.homesList = ko.observableArray(homesJson);
            this.errorMessage = ko.observable('');
            this.currentHome = ko.observable({});
            this.OnInit();
        }

        OnInit = () => {
         
        }

        showError = (error: any) => {
            this.errorMessage(error);
            $('#error-container').fadeIn();
        }

        requestDelConfirm = (home: any) => {
            this.currentHome(home);
            $('#del-confirm').modal();
        }

        del = () => {

            let dataService = new CodedHomes.CodedHomesDataService($, 'api/homes/');
            let home = ko.toJS(this.currentHome);

            dataService.del(home, dataService.baseUri).done((response) => {
                this.homesList.remove(function (item) {
                    return item.id == home.id;
                });
            }).fail((error) => {
                this.showError(error);
                }).always(() => {
                    $('#del-confirm').modal('hide');
            });
        }

        showModal = () => {
            $('#busyindicator').fadeIn(500).modal('show');
        }

        hideModal = () => {
            $('#busyindicator').fadeOut(1).modal('hide');
        }

    }
}