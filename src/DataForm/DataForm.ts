/// <reference path="Dictionary"/>
/// <reference path="DataField"/>
module Fayde.Controls {
    import GridUnitType = minerva.controls.grid.GridUnitType;

    export class DataForm extends Control  {
        static ErrorTemplateProperty = DependencyProperty.Register("ErrorTemplate", () => Object, DataForm, NaN);
        static CurrentItemProperty = DependencyProperty.Register("CurrentItem", () => Object, DataForm, NaN, (d, args) => (<DataForm>d).CurrentItemValueChanged(args));
        //static InputTypesProperty = DependencyProperty.Register("InputTypes", () => Fayde.Collections.ReadOnlyObservableCollection, DataForm, NaN);

        private properties: any[];
        private bindings: any[];
        private controls: any[];
        private partGrid: Grid;

        CurrentItem: any;
        ErrorTemplate: any;
        //InputTypes: Fayde.Collections.ReadOnlyObservableCollection;

        private CurrentItemValueChanged(args: IDependencyPropertyChangedEventArgs) {
            this.CurrentItemChanged();
        }

        private m_labelSeparator: string = ":";
        public get LabelSeparator() : string { return this.m_labelSeparator; }
        public set LabelSeparator(value: string) { this.m_labelSeparator = value;}

        constructor() {
            super();
            this.DefaultStyleKey = DataForm;
            this.properties = [];
            this.bindings = [];
            this.controls = [];
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.partGrid = <Grid>this.GetTemplateChild("PART_Grid", Grid);
            this.InvalidateForm();
        }

        private CurrentItemChanged():void{
            this.InvalidateForm()
        }

        private InvalidateForm(): void {
            if(this.partGrid){

                this.partGrid.Children.Clear();
                this.DiscoverObject();

                var grid1 = new Grid();
                grid1.Margin = new Thickness(5);
                var definition1 = new ColumnDefinition();
                definition1.Width = new Fayde.Controls.GridLength(1, GridUnitType.Auto);
                var definition2 = new ColumnDefinition();
                grid1.ColumnDefinitions.Add(definition1);
                grid1.ColumnDefinitions.Add(definition2);

                var row: number = 0;

                this.properties.forEach(element => {
                var propertyName = element;
                var lbl = this.GetLabelTextBlock(propertyName);

                var binding = new Fayde.Data.Binding(propertyName);
                binding.Source = this.CurrentItem;
                //binding.ConverterCulture = CultureInfo.CurrentCulture;
                binding.Mode = Fayde.Data.BindingMode.TwoWay;
                binding.ValidatesOnDataErrors = true;
                binding.ValidatesOnExceptions = true;
                binding.NotifyOnValidationError = true;

                //var binding1 = new Fayde.Data.Binding("DataContext");
                //binding1.Source = this.Owner || this.$RootVisualTracker.rootVisual;
                //this.SetBinding(DependencyObject.DataContextProperty, binding1);

                // Control creation
                var editorControl = this.GetControlFromProperty(element,binding);

                if (editorControl == null)
                return;

                var df = new DataField();
                df.Content = editorControl; 
                df.Label = lbl;

                // Add to view
                var newRow = new RowDefinition();
                newRow.Height = new GridLength(1, GridUnitType.Auto);
                grid1.RowDefinitions.Add(newRow);
                if (isNaN(df.Content.Height))
                {
                    newRow.Height = new GridLength(df.Content.Height);
                }
                Grid.SetColumn(df.Label, 0);
                Grid.SetRow(df.Label, row);
                Grid.SetColumn(df.Content, 1);
                Grid.SetRow(df.Content, row);

                grid1.Children.Add(df.Label);
                grid1.Children.Add(df.Content);
                this.controls.push(df.Content);

                row++;

            });

                this.partGrid.Children.Add(grid1);
            }
        }

        private DiscoverObject(){
            this.properties = [];
            this.bindings = [];
            this.controls = [];

            if (!this.CurrentItem)
                    return;

            this.properties = this.GetProperties(this.CurrentItem);

            

        }

        private GetLabelTextBlock(name: string): FrameworkElement
        {
            var lbl = new TextBlock();
            lbl.Text = name+" "+this.m_labelSeparator;
            lbl.TextAlignment = TextAlignment.Right;
            lbl.Margin = new Thickness(5, 0, 5, 0);
            lbl.HorizontalAlignment = HorizontalAlignment.Stretch;
            lbl.VerticalAlignment = VerticalAlignment.Center;

            return lbl;
        }

        private GetControlFromProperty(propertyName: string,binding: Fayde.Data.Binding): FrameworkElement{
            var control: FrameworkElement = null;

            var propertyValue = this.CurrentItem[propertyName];

            if(typeof propertyValue == 'boolean'){
                control = this.GenerateCheckBox(propertyName,binding);
            }else if(typeof propertyValue == 'string'){
                control = this.GenerateWaterMarkedTextBox(propertyName,binding);
            }else if(typeof propertyValue == 'number'){
                control = this.GenerateIntegerUpDow(propertyName,binding);
            }

            

            return control;
        }

        private GenerateCheckBox(propertyName: string, binding: Fayde.Data.Binding): Control
        {
            var checkBox = new CheckBox();
            checkBox.VerticalAlignment = VerticalAlignment.Center;
            checkBox.Margin = new Thickness(2, 4, 0, 4);
            //checkBox.IsEnabled = (bindables[property.Name].Direction == BindingDirection.TwoWay);
            checkBox.IsEnabled = true;
            //this.bindings.push(propertyName, checkBox.SetBinding(CheckBox.IsCheckedProperty, binding));
            return checkBox;
        }

        private GenerateWaterMarkedTextBox(propertyName: string,binding: Fayde.Data.Binding): Control
        {
            var txtBox = new TextBox();
            txtBox.Margin = new Thickness(0, 3, 18, 3);
            //txtBox.IsReadOnly = !(bindables[property.Name].Direction == BindingDirection.TwoWay);
            txtBox.IsReadOnly = false;
            txtBox.TextAlignment = TextAlignment.Right;
            // Binding
            //this.bindings.Add(property.Name, txtBox.SetBinding(TextBox.TextProperty, binding));
            return txtBox;
        }

        private GenerateIntegerUpDow(propertyName: string,binding: Fayde.Data.Binding): FrameworkElement
        {
            var integerUpDown = new Border();
            integerUpDown.Opacity = 1.0;
            integerUpDown.Margin = new Thickness(0, 3, 18, 3);
            var n = new NumericUpDown();
            integerUpDown.Child = n;
            //n.IsEnabled = (bindables[property.Name].Direction == BindingDirection.TwoWay);
            n.IsEnabled = true;
            n.Maximum = Number.MAX_VALUE;
            n.Minimum = Number.MIN_VALUE;

            // Binding
            //this.bindings.Add(property.Name, n.SetBinding(NumericUpDown.ValueProperty, binding));
            return integerUpDown;
        }

        private GetProperties(obj: any): any[] {

            var properties = [];
            for (var prop in obj) {
                if (typeof obj[prop] != 'function') {
                    properties.push(prop)
                }
            }
            return properties;
        }

    }

}