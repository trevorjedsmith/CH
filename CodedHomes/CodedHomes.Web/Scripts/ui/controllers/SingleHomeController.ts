namespace CodedHomes {
    export class SingleHomeController {

        constructor() {

        }

        PageLoad(homeJson: any, imageUrlPrefix : string) {
            if (homeJson !== undefined)
            {
                let viewModel = new CodedHomes.SingleHomeViewModel(homeJson, imageUrlPrefix);
                ko.applyBindings(viewModel);
            }
            
        }
    }
}