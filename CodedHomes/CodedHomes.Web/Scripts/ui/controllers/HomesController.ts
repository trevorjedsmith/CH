namespace CodedHomes {
    export class HomesController {

        constructor() {

        }

        PageLoad(homesJson: any) {
            let viewModel = new CodedHomes.HomesViewModel(homesJson);
            ko.applyBindings(viewModel);
        }
    }
}