namespace CodedHomes {

    import logger = CodedHomes.Logger;

    export class SingleHomeViewModel {

        private logger: logger;

        private currentHome: KnockoutObservable<any>;
        private errorMessage: KnockoutObservable<string>;

        //home properties
        private id: KnockoutObservable<number>;
        private streetAddress: KnockoutObservable<string>;
        private streetAddress2: KnockoutObservable<string>;
        private city: KnockoutObservable<string>;
        private zipCode: KnockoutObservable<string>;
        private bedrooms: KnockoutObservable<string>;
        private bathrooms: KnockoutObservable<string>;
        private squarefeet: KnockoutObservable<string>;
        private price: KnockoutObservable<string>;
        private description: KnockoutObservable<string>;
        private imageName: KnockoutObservable<string>;
        private imageUrl: KnockoutComputed<any>;

        constructor(homeJson: any, imageData: any) {
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
                write: function (value: any) {
                    var parts = value.split('/');
                    this.imageName(parts[parts.length - 1]);
                },
                owner: this
            });
            //this.imageUrl = ko.observable(homeJson.Home.ImageUrl);

        }

        showError = (error: any) => {
            let resetUI = function () {
                $('#command-buttons').fadeIn();
                $('#fail-msg-container').fadeIn();
            };

            this.hideModal();
            resetUI();

            if (error.statusText) {
                this.errorMessage(error.statusText);
            }
        };

        showImageUpload = () => {
            $('#upload-button').hide();
            $('#upload-form-container').removeClass('none');
        }

        hideImageUpload = () => {
            $('#upload-button').show();
            $('#upload-form-container').addClass('none');
        };

        showImageError = (error) => {
            $('#img-fail-msg-container').fadeIn();
            this.errorMessage(error.statusText);
        }

        showDelete = () => {
            $('#fail-msg-container').fadeOut();
            $('#delete-msg-container').fadeIn();

            $('.cmd').each(function (i, element) {
                $(element).prop('disabled', true).addClass('muted');
            });
        }

        uploadImage = () => {

            console.log('UploadImage');

            let dataService = new CodedHomes.CodedHomesDataService($, '');

            if (FormData !== undefined) {
                let data = new FormData();
                let file: any = $('#image-upload')[0];

                data.append('image', file.file[0]);
                data.append('id', this.id);

                return dataService.saveImage(data);
            }
        }

        hasImageToUpload = () => {
            let fileUpload: any = $('#image-upload')[0];
            return fileUpload.files.length > 0;
        }

        save = () => {



            let dataService = new CodedHomes.CodedHomesDataService($, 'api/homes');

            this.hideImageUpload();


            $('#command-buttons').hide();
            $('#progress-bar').fadeIn();

            let home = {
                Id: this.id(),
                StreetAddress: this.streetAddress(),
                StreetAddress2 : this.streetAddress2(),
                City:this.city(),
                ZipCode:this.zipCode(),
                Bedrooms:this.bedrooms(),
                Bathrooms:this.bathrooms(),
                SquareFeet: this.squarefeet(),
                Price:this.price(),
                Description: this.description(),
                ImageName: this.imageName(),
                ImageUrl: this.imageUrl()
            }

            dataService.save(home, dataService.baseUri).done((response:any) => {
                if (response.id) {
                    this.id(response.id);
                }

                if (this.hasImageToUpload()) {
                    this.uploadImage().done((result) => {
                        if (result.status === 'error') {
                            this.showImageError(result);
                        } else {
                            this.imageUrl(result.imageUrl);
                            this.showSuccess();
                        }
                    }).fail((error) => {
                        this.showImageError(error);
                        });

                } else {
                    this.showSuccess();
                }
            }).fail((error) => {
                this.showError(error);
            })
        }

        showSuccess = () => {
        let resetUI = function () {
            $('#command-buttons').fadeIn();
            $('#fail-msg-container').fadeOut();
            $('#delete-msg-container').fadeOut();
            $('#success-msg-container').fadeIn();
            };

        let uploadForm: any = $('#upload-form')[0];
        uploadForm.reset();

        this.hideModal();
        resetUI();

        let fadeOut = function () {
            $('#success-msg-container').fadeOut()
        };

        fadeOut();

        };

        requestDelConfirm = (home: any) => {
            this.currentHome(home);
            $('#del-confirm').modal();
        }

        del = () => {

            let dataService = new CodedHomes.CodedHomesDataService($, 'api/homes/');
            let home = ko.toJS(this.currentHome);

            dataService.del(home, dataService.baseUri).done((response) => {
                this.showDelete();              
            }).fail((error) => {
                this.showError(error);
            }).always(() => {
                $('#del-confirm').modal('hide');
            });
        }

        showModal = () => {
            $('#progress-bar').fadeIn(1000).modal('show');
        }

        hideModal = () => {
            $('#progress-bar').fadeOut(1000).modal('hide');
        }
    }
}