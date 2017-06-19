var CodedHomes;
(function (CodedHomes) {
    var HomesController = (function () {
        function HomesController() {
        }
        HomesController.prototype.PageLoad = function (homesJson) {
            var viewModel = new CodedHomes.HomesViewModel(homesJson);
            ko.applyBindings(viewModel);
        };
        return HomesController;
    }());
    CodedHomes.HomesController = HomesController;
})(CodedHomes || (CodedHomes = {}));
