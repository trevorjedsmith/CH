var CodedHomes;
(function (CodedHomes) {
    var HomesViewModel = (function () {
        function HomesViewModel(homesJson) {
            var _this = this;
            this.OnInit = function () {
            };
            //applyProducts = (data: any) => {
            //    this.productsList.removeAll();
            //    this.productsList.push.apply(this.productsList, data.Products);
            //}
            this.showError = function (error) {
                _this.errorMessage(error);
                $('#error-container').fadeIn();
            };
            this.requestDelConfirm = function (home) {
                _this.currentHome(home);
                $('#del-confirm').modal();
            };
            this.del = function () {
                var dataService = new CodedHomes.CodedHomesDataService($, 'api/homes/');
                var home = ko.toJS(_this.currentHome);
                dataService.del(home, dataService.baseUri).done(function (response) {
                    _this.homesList.remove(function (item) {
                        return item.id == home.id;
                    });
                }).fail(function (error) {
                    _this.showError(error);
                }).always(function () {
                    $('#del-confirm').modal('hide');
                });
            };
            this.showModal = function () {
                $('#busyindicator').fadeIn(500).modal('show');
            };
            this.hideModal = function () {
                $('#busyindicator').fadeOut(1).modal('hide');
            };
            this.logger = new CodedHomes.Logger();
            this.homesList = ko.observableArray(homesJson);
            this.errorMessage = ko.observable('');
            this.currentHome = ko.observable({});
            this.OnInit();
        }
        return HomesViewModel;
    }());
    CodedHomes.HomesViewModel = HomesViewModel;
})(CodedHomes || (CodedHomes = {}));
