/// <reference path="IDataField"/>
module Fayde.Controls {

    import IDataField = Fayde.Controls.IDataField;

    export class DataFormDataField implements IDataField {

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
            var txtBox = this.Content = new TextBox();
            txtBox.Margin = new Thickness(0, 3, 18, 3);
            txtBox.IsReadOnly = false;
            txtBox.TextAlignment = TextAlignment.Right;
            if(this.PreferredWidth)
                txtBox.Width = this.PreferredWidth;
            if(this.PreferredHeight)
                txtBox.Height = this.PreferredHeight;
            // Binding
            txtBox.SetBinding(TextBox.TextProperty, binding);
            return txtBox;
        }

        public GetReadOnlyControl(propertyName: string,binding: Fayde.Data.Binding): FrameworkElement{

            var txtBox = this.Content = new TextBox();
            txtBox.Margin = new Thickness(0, 3, 18, 3);
            txtBox.IsReadOnly = true;
            txtBox.TextAlignment = TextAlignment.Right;
            if(this.PreferredWidth)
                txtBox.Width = this.PreferredWidth;
            if(this.PreferredHeight)
                txtBox.Height = this.PreferredHeight;
            // Binding
            txtBox.SetBinding(TextBox.TextProperty, binding);
            return txtBox;
        }

    }

}