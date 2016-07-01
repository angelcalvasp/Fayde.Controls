module Fayde.Controls {

    export interface IDataField {
       
        PropertyName: string;
        PropertyBinding: Fayde.Data.Binding;
        PreferredWidth: number;
        PreferredHeight: number;
        Content: FrameworkElement;
        GetEditControl(propertyName: string,binding: Fayde.Data.Binding): FrameworkElement;
        GetReadOnlyControl(propertyName: string,binding: Fayde.Data.Binding): FrameworkElement;
    }
}