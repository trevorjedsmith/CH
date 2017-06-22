var CodedHomes;
(function (CodedHomes) {
    var SingleHomeController = (function () {
        function SingleHomeController() {
        }
        SingleHomeController.prototype.PageLoad = function (homeJson, imageUrlPrefix) {
            if (homeJson !== undefined) {
                var viewModel = new CodedHomes.SingleHomeViewModel(homeJson, imageUrlPrefix);
                ko.applyBindings(viewModel);
            }
        };
        return SingleHomeController;
    }());
    CodedHomes.SingleHomeController = SingleHomeController;
})(CodedHomes || (CodedHomes = {}));
