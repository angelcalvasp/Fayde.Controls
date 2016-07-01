/// <reference path="IDataField"/>
module Fayde.Controls {

    import IDataField = Fayde.Controls.IDataField;

    export class DataFormComboBoxField extends DependencyObject implements IDataField {

        constructor();
        constructor(
            propertyName: string,
            binding: Fayde.Data.Binding
        );
        constructor(
            propertyName: string,
            binding: Fayde.Data.Binding,
            itemssource: nullstone.IEnumerable<any>
        );
        constructor(
            propertyName: string,
            binding: Fayde.Data.Binding,
            itemssource: nullstone.IEnumerable<any>,
            preferredWidth: number,
            preferredHeight: number
        );
        constructor(
            propertyName?: string,
            binding?: Fayde.Data.Binding,
            itemssource?: nullstone.IEnumerable<any>,
            preferredWidth?: number,
            preferredHeight?: number
        ) { 
            super();
            if(propertyName)
                this.PropertyName = propertyName;
            if(binding)
                this.PropertyBinding = binding;
            if(preferredWidth)
                this.PreferredWidth = preferredWidth;
            if(preferredHeight)
                this.PreferredHeight = preferredHeight;
        };

        static ItemsSourceProperty = DependencyProperty.RegisterFull("ItemsSource", () => nullstone.IEnumerable_, DataFormComboBoxField, null, (d, args) => (<DataFormComboBoxField>d).OnItemsSourceChanged(args));
        static SelectedValuePathProperty = DependencyProperty.Register("SelectedValuePath", () => String, DataFormComboBoxField, "", (d, args) => (<DataFormComboBoxField>d).OnSelectedValuePathChanged(args));
        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, DataFormComboBoxField, null, (d, args) => (<DataFormComboBoxField>d).OnDisplayMemberPathChanged(args));

        PropertyName: string;
        PropertyBinding: Fayde.Data.Binding;
        PreferredWidth: number;
        PreferredHeight: number;
        ItemsSource: nullstone.IEnumerable<any>;
        SelectedValuePath: string;
        DisplayMemberPath: string;
        Content: FrameworkElement;

        OnItemsSourceChanged(e: IDependencyPropertyChangedEventArgs) {
            var combo = <ComboBox>this.Content;
            if(combo){
                combo.ItemsSource = e.NewValue;
            }
        }

        OnSelectedValuePathChanged(e: IDependencyPropertyChangedEventArgs) {
            var combo = <ComboBox>this.Content;
            if(combo){
                combo.SelectedValuePath = e.NewValue;
            }
        }

        OnDisplayMemberPathChanged(e: IDependencyPropertyChangedEventArgs) {
            var combo = <ComboBox>this.Content;
            if(combo){
                combo.DisplayMemberPath = e.NewValue;
            }
        }

        public GetEditControl(propertyName: string,binding: Fayde.Data.Binding): FrameworkElement{

            var comboBox = this.Content = new ComboBox();
            comboBox.Margin = new Thickness(0, 2, 18, 2);
            comboBox.ItemsSource = this.ItemsSource;
            comboBox.IsEnabled = true;
            comboBox.DisplayMemberPath = this.DisplayMemberPath;
            comboBox.SelectedValuePath = this.SelectedValuePath;
            if(this.PreferredWidth)
                comboBox.Width = this.PreferredWidth;
            if(this.PreferredHeight)
                comboBox.Height = this.PreferredHeight;
            comboBox.SetBinding(ComboBox.SelectedValueProperty, binding);

            return comboBox;

        }

        public GetReadOnlyControl(propertyName: string,binding: Fayde.Data.Binding): FrameworkElement{

            var comboBox = this.Content = new ComboBox();
            comboBox.Margin = new Thickness(0, 2, 18, 2);
            comboBox.ItemsSource = this.ItemsSource;
            comboBox.IsEnabled = false;
            comboBox.DisplayMemberPath = this.DisplayMemberPath;
            comboBox.SelectedValuePath = this.SelectedValuePath;
            if(this.PreferredWidth)
                comboBox.Width = this.PreferredWidth;
            if(this.PreferredHeight)
                comboBox.Height = this.PreferredHeight;
            comboBox.SetBinding(ComboBox.SelectedValueProperty, binding);

            return comboBox;
        }

    }
}