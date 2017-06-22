var CodedHomes;
(function (CodedHomes) {
    var SingleHomeViewModel = (function () {
        function SingleHomeViewModel(homeJson, imageData) {
            var _this = this;
            this.showError = function (error) {
                var resetUI = function () {
                    $('#command-buttons').fadeIn();
                    $('#fail-msg-container').fadeIn();
                };
                _this.hideModal();
                resetUI();
                if (error.statusText) {
                    _this.errorMessage(error.statusText);
                }
            };
            this.showImageUpload = function () {
                $('#upload-button').hide();
                $('#upload-form-container').removeClass('none');
            };
            this.hideImageUpload = function () {
                $('#upload-button').show();
                $('#upload-form-container').addClass('none');
            };
            this.showImageError = function (error) {
                $('#img-fail-msg-container').fadeIn();
                _this.errorMessage(error.statusText);
            };
            this.showDelete = function () {
                $('#fail-msg-container').fadeOut();
                $('#delete-msg-container').fadeIn();
                $('.cmd').each(function (i, element) {
                    $(element).prop('disabled', true).addClass('muted');
                });
            };
            this.uploadImage = function () {
                console.log('UploadImage');
                var dataService = new CodedHomes.CodedHomesDataService($, '');
                if (FormData !== undefined) {
                    var data = new FormData();
                    var file = $('#image-upload')[0];
                    data.append('image', file.file[0]);
                    data.append('id', _this.id);
                    return dataService.saveImage(data);
                }
            };
            this.hasImageToUpload = function () {
                var fileUpload = $('#image-upload')[0];
                return fileUpload.files.length > 0;
            };
            this.save = function () {
                var dataService = new CodedHomes.CodedHomesDataService($, 'api/homes');
                _this.hideImageUpload();
                $('#command-buttons').hide();
                $('#progress-bar').fadeIn();
                var home = {
                    Id: _this.id(),
                    StreetAddress: _this.streetAddress(),
                    StreetAddress2: _this.streetAddress2(),
                    City: _this.city(),
                    ZipCode: _this.zipCode(),
                    Bedrooms: _this.bedrooms(),
                    Bathrooms: _this.bathrooms(),
                    SquareFeet: _this.squarefeet(),
                    Price: _this.price(),
                    Description: _this.description(),
                    ImageName: _this.imageName(),
                    ImageUrl: _this.imageUrl()
                };
                dataService.save(home, dataService.baseUri).done(function (response) {
                    if (response.id) {
                        _this.id(response.id);
                    }
                    if (_this.hasImageToUpload()) {
                        _this.uploadImage().done(function (result) {
                            if (result.status === 'error') {
                                _this.showImageError(result);
                            }
                            else {
                                _this.imageUrl(result.imageUrl);
                                _this.showSuccess();
                            }
                        }).fail(function (error) {
                            _this.showImageError(error);
                        });
                    }
                    else {
                        _this.showSuccess();
                    }
                }).fail(function (error) {
                    _this.showError(error);
                });
            };
            this.showSuccess = function () {
                var resetUI = function () {
                    $('#command-buttons').fadeIn();
                    $('#fail-msg-container').fadeOut();
                    $('#delete-msg-container').fadeOut();
                    $('#success-msg-container').fadeIn();
                };
                var uploadForm = $('#upload-form')[0];
                uploadForm.reset();
                _this.hideModal();
                resetUI();
                var fadeOut = function () {
                    $('#success-msg-container').fadeOut();
                };
                fadeOut();
            };
            this.requestDelConfirm = function (home) {
                _this.currentHome(home);
                $('#del-confirm').modal();
            };
            this.del = function () {
                var dataService = new CodedHomes.CodedHomesDataService($, 'api/homes/');
                var home = ko.toJS(_this.currentHome);
                dataService.del(home, dataService.baseUri).done(function (response) {
                    _this.showDelete();
                }).fail(function (error) {
                    _this.showError(error);
                }).always(function () {
                    $('#del-confirm').modal('hide');
                });
            };
            this.showModal = function () {
                $('#progress-bar').fadeIn(1000).modal('show');
            };
            this.hideModal = function () {
                $('#progress-bar').fadeOut(1000).modal('hide');
            };
            this.logger = new CodedHomes.Logger();
            this.errorMessage = ko.observable('');
            this.currentHome = ko.observable({});
            //home properties
            this.id = ko.observable(homeJson.id);
            this.streetAddress = ko.observable(homeJson.streetAddress);
            this.streetAddress2 = ko.observable(homeJson.streetAddress2);
            this.city = ko.observable(homeJson.city);
            this.zipCode = ko.observable(homeJson.zipCode);
            this.bedrooms = ko.observable(homeJson.bedrooms);
            this.bathrooms = ko.observable(homeJson.bathrooms);
            this.squarefeet = ko.observable(homeJson.squareFeet);
            this.price = ko.observable(homeJson.price);
            this.description = ko.observable(homeJson.description);
            this.imageName = ko.observable(homeJson.imageName);
            this.imageUrl = ko.computed({
                read: function () {
                    var filename = (this.imageName() === '') ? 'no-image-large.png' : this.imageName();
                    var url = imageData.image + filename;
                    return url;
                },
                write: function (value) {
                    var parts = value.split('/');
                    this.imageName(parts[parts.length - 1]);
                },
                owner: this
            });
            //this.imageUrl = ko.observable(homeJson.Home.ImageUrl);
        }
        return SingleHomeViewModel;
    }());
    CodedHomes.SingleHomeViewModel = SingleHomeViewModel;
})(CodedHomes || (CodedHomes = {}));
