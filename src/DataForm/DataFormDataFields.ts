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

    export class DataFormDataField implements Fayde.Controls.IDataField {

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

    export class DataFormCheckBoxField implements Fayde.Controls.IDataField {

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

    export class DataFormNumericField implements Fayde.Controls.IDataField {

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
            var integerUpDown = this.Content = new Border();
            integerUpDown.Opacity = 1.0;
            integerUpDown.Margin = new Thickness(0, 3, 18, 3);
            if(this.PreferredWidth)
                integerUpDown.Width = this.PreferredWidth;
            if(this.PreferredHeight)
                integerUpDown.Height = this.PreferredHeight;
            var n = new NumericUpDown();
            integerUpDown.Child = n;
            n.IsEnabled = true;
            n.Maximum = Number.MAX_VALUE;
            n.Minimum = Number.MIN_VALUE;

            // Binding
            n.SetBinding(NumericUpDown.ValueProperty, binding);
            return integerUpDown;
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

    export class DataFormComboBoxField extends DependencyObject implements Fayde.Controls.IDataField {

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