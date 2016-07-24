module Fayde.Controls {
    export class DataGridRoutedEventArgs extends RoutedEventArgs {
        constructor(originalSource: any){
            super();
            this.OriginalSource = originalSource;
        }
    }
}