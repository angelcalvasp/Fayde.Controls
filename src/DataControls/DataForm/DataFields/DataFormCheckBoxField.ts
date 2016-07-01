/// <reference path="IDataField"/>
module Fayde.Controls {

    import IDataField = Fayde.Controls.IDataField;

    export class DataFormCheckBoxField implements IDataField {

        constructor();
        constructor(
            propertyName: string,
            binding: Fayde.Data.Binding
        );
        constructor(
            propertyName: string,
            binding: Fayde.Data.Binding,
            preferredWidth: number,
            preferredHeight: number
        );
        constructor(
            propertyName?: string,
            binding?: Fayde.Data.Binding,
            preferredWidth?: number,
            preferredHeight?: number
        ) { 
            if(propertyName)
                this.PropertyName = propertyName;
            if(binding)
                this.PropertyBinding = binding;
            if(preferredWidth)
                this.PreferredWidth = preferredWidth;
            if(preferredHeight)
                this.PreferredHeight = preferredHeight;
        };

        PropertyName: string;
        PropertyBinding: Fayde.Data.Binding;
        PreferredWidth: number;
        PreferredHeight: number;
        Content: FrameworkElement;

        public GetEditControl(propertyName: string,binding: Fayde.Data.Binding): FrameworkElement{
            var checkBox = this.Content = new CheckBox();
            checkBox.VerticalAlignment = VerticalAlignment.Center;
            checkBox.Margin = new Thickness(2, 4, 0, 4);
            if(this.PreferredWidth)
                checkBox.Width = this.PreferredWidth;
            if(this.PreferredHeight)
                checkBox.Height = this.PreferredHeight;
            checkBox.IsEnabled = true;
            checkBox.SetBinding(CheckBox.IsCheckedProperty, binding);
            return checkBox;
        }

        public GetReadOnlyControl(propertyName: string,binding: Fayde.Data.Binding): FrameworkElement{

            var checkBox = this.Content = new CheckBox();
            checkBox.VerticalAlignment = VerticalAlignment.Center;
            checkBox.Margin = new Thickness(2, 4, 0, 4);
            if(this.PreferredWidth)
                checkBox.Width = this.PreferredWidth;
            if(this.PreferredHeight)
                checkBox.Height = this.PreferredHeight;
            checkBox.IsEnabled = false;
            checkBox.SetBinding(CheckBox.IsCheckedProperty, binding);
            return checkBox;
        }

    }
}