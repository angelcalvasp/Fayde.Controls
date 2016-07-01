/// <reference path="DataField"/>
/// <reference path="DataFields/IDataField"/>
/// <reference path="DataFormMode"/>
module Fayde.Controls {
    import GridUnitType = minerva.controls.grid.GridUnitType;
    import IDataField = Fayde.Controls.IDataField;
    import DataFormDataField = Fayde.Controls.DataFormDataField;
    import ObservableCollection =  Fayde.Collections.ObservableCollection;
    import DataFormMode = Fayde.Controls.DataControls.DataFormMode;
    import DataSourceCollection = Fayde.Controls.DataSourceCollection;

    export class DataForm extends ItemsControl  {

        private partGrid: Grid;
        private firstItemButton: Button;
        private previousItemButton: Button;
        private nextItemButton: Button;
        private lastItemButton: Button;
        private newButton: Button;
        private editButton: Button;
        private deleteButton: Button;
        private commitButton: Button;
        private cancelButton: Button;

        static HeaderProperty = DependencyProperty.Register("Header", () => ContentControl, DataForm, NaN);
        static ErrorTemplateProperty = DependencyProperty.Register("ErrorTemplate", () => Object, DataForm, NaN);
        static CurrentItemProperty = DependencyProperty.Register("CurrentItem", () => Object, DataForm, null, (d, args) => (<DataForm>d).CurrentItemValueChanged(args));
        static DataFieldsProperty = DependencyProperty.Register("DataFields", () => DataFieldsCollection, DataForm);
        static HeaderVisibilityProperty = DependencyProperty.Register("HeaderVisibility", () => new Enum(Visibility), UIElement, Visibility.Visible);
        static HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", () => DataTemplate, DataForm, undefined, (d, args) => (<DataForm>d).OnHeaderTemplateChanged(args));
        static SelectedIndexProperty = DependencyProperty.Register("SelectedIndex", () => Number, DataForm, -1, (d: DataForm, args) => d._OnSelectedIndexChanged(args));
        static AutoCommitProperty = DependencyProperty.Register("AutoCommit", () => Boolean, DataForm);
        static AutoGenerateFieldsProperty = DependencyProperty.Register("AutoGenerateFields", () => Boolean, DataForm);

        private properties: any[];
        private bindings: any[];
        private controls: any[];
        private backupItem: any;
        private manualCurrentItem: boolean;

        CurrentItem: any;
        ErrorTemplate: any;
        DataFields: DataFieldsCollection;
        HeaderVisibility: Visibility;
        Header: ContentControl;
        HeaderTemplate: DataTemplate;
        SelectedIndex: number;
        AutoCommit: boolean;
        AutoGenerateFields: boolean;

        private CurrentItemValueChanged(args: IDependencyPropertyChangedEventArgs) {
            this.CurrentItemChanged();
        }

        private OnDataFieldsChanged(e: IDependencyPropertyChangedEventArgs) {
            this.InvalidateForm();
        }

        private OnHeaderTemplateChanged (e: IDependencyPropertyChangedEventArgs) {
            
        }

        OnItemsSourceChanged(e: IDependencyPropertyChangedEventArgs) {
            super.OnItemsSourceChanged(e);
            this.DefaultCurrentItem();         
            
        }

        private m_labelSeparator: string = ":";
        public get LabelSeparator() : string { return this.m_labelSeparator; }
        public set LabelSeparator(value: string) { this.m_labelSeparator = value;}

        private _mode: DataFormMode = DataFormMode.ReadOnly;
        public get Mode() : DataFormMode { return this._mode; }

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
            this.firstItemButton = <Button>this.GetTemplateChild("FirstItemButton",Button);
            this.previousItemButton = <Button>this.GetTemplateChild("PreviousItemButton",Button);
            this.nextItemButton = <Button>this.GetTemplateChild("NextItemButton",Button);
            this.lastItemButton = <Button>this.GetTemplateChild("LastItemButton",Button);
            this.newButton = <Button>this.GetTemplateChild("NewItemButton",Button);
            this.editButton = <Button>this.GetTemplateChild("EditButton",Button);
            this.deleteButton = <Button>this.GetTemplateChild("DeleteItemButton",Button);
            this.commitButton = <Button>this.GetTemplateChild("CommitButton",Button);
            this.cancelButton = <Button>this.GetTemplateChild("CancelButton",Button);

            if(this.firstItemButton){
                this.firstItemButton.Click.on(this.handleFirstItemClick,this);
            }

            if(this.nextItemButton){
                this.nextItemButton.Click.on(this.handleNextItemClick,this);
            }

            if(this.previousItemButton){
                this.previousItemButton.Click.on(this.handlePreviousItemClick,this);
            }

            if(this.lastItemButton){
                this.lastItemButton.Click.on(this.handleLastItemClick,this);
            }

            if(this.newButton){
                this.newButton.Click.on(this.handleNewItemClick,this);
            }

            if(this.editButton){
                this.editButton.Click.on(this.handleEditItemClick,this);
            }

            if(this.deleteButton){
                this.deleteButton.Click.on(this.handleDeleteItemClick,this);
            }

            if(this.commitButton){
                this.commitButton.Click.on(this.handleCommitClick,this);
            }

            if(this.cancelButton){
                this.cancelButton.Click.on(this.handleCancelClick,this);
            }

            if(!this.DefaultCurrentItem())
                this.InvalidateForm();
        }

        GoToStates (gotoFunc: (state: string) => boolean) { 
             super.GoToStates(gotoFunc); 
             this.GoToStateMode(gotoFunc); 
        }

        GoToStateMode (gotoFunc: (state: string) => boolean): boolean { 

            if(this.Items.Count ==0){
                return gotoFunc("Empty"); 
            }

            if(this.Mode == DataFormMode.ReadOnly)
             {
                 return gotoFunc("ReadOnly"); 
             }
             
             if(this.Mode == DataFormMode.Edit || this.Mode == DataFormMode.AddNew)
             {
                 return gotoFunc("Edit"); 
             }

             
             
         }  

        private ProcessNavigationButtons(){
            var count = this.Items.Count;
            if(count == 0){
                if(this.deleteButton)
                    this.deleteButton.IsEnabled = false;
                if(this.editButton)
                    this.editButton.IsEnabled = false;
                if(this.previousItemButton)
                    this.previousItemButton.IsEnabled = false;
                if(this.nextItemButton)
                    this.nextItemButton.IsEnabled = false;
                if(this.firstItemButton)
                    this.firstItemButton.IsEnabled = false;
                if(this.lastItemButton)
                    this.lastItemButton.IsEnabled = false;
            }else if(count == 1){
                if(this.deleteButton)
                    this.deleteButton.IsEnabled = true;
                if(this.editButton)
                    this.editButton.IsEnabled = true;
                if(this.previousItemButton)
                    this.previousItemButton.IsEnabled = false;
                if(this.nextItemButton)
                    this.nextItemButton.IsEnabled = false;
                if(this.firstItemButton)
                    this.firstItemButton.IsEnabled = false;
                if(this.lastItemButton)
                    this.lastItemButton.IsEnabled = false;
            }else{
                if(this.CurrentItem == this.Items.GetValueAt(0)){

                    if(this.firstItemButton)
                        this.firstItemButton.IsEnabled = false;
                    if(this.previousItemButton)
                        this.previousItemButton.IsEnabled = false;
                    if(this.lastItemButton) 
                        this.lastItemButton.IsEnabled = true;
                    if(this.nextItemButton)
                        this.nextItemButton.IsEnabled = true;

                }else if(this.CurrentItem == this.Items.GetValueAt(count-1)){

                    if(this.firstItemButton)
                        this.firstItemButton.IsEnabled = true;
                    if(this.previousItemButton)
                        this.previousItemButton.IsEnabled = true;
                    if(this.lastItemButton) 
                        this.lastItemButton.IsEnabled = false;
                    if(this.nextItemButton)
                        this.nextItemButton.IsEnabled = false;

                }else{

                    if(this.firstItemButton)
                        this.firstItemButton.IsEnabled = true;
                    if(this.previousItemButton)
                        this.previousItemButton.IsEnabled = true;
                    if(this.lastItemButton) 
                        this.lastItemButton.IsEnabled = true;
                    if(this.nextItemButton)
                        this.nextItemButton.IsEnabled = true;

                }


            }

        }

        private DefaultCurrentItem():boolean {
            if(this.ItemsSource){
                var array = toArray(this.ItemsSource);
                if(!this.CurrentItem && array.length >0){
                    this.CurrentItem = array[0];
                    return true;
                }
            }

            return false;
        }

        private CurrentItemChanged():void{

            if(this.manualCurrentItem){
                return;
            }

            if(this.CurrentItem){
                this.SelectedIndex = this.Items.IndexOf(this.CurrentItem);
            }
                

            this.InvalidateForm();
            this.ProcessNavigationButtons();
        }

        private InvalidateForm(): void {
            if(this.partGrid){

                if(!this.AutoGenerateFields)
                    return;

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
            //this.DataFields.Clear();

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

            var queryDataField = this.QueryDataField(propertyName);

            if(!queryDataField){
                if(typeof propertyValue == 'boolean'){
                    queryDataField = new DataFormCheckBoxField(propertyName,binding);
                }else if(typeof propertyValue == 'string'){
                    queryDataField = new DataFormDataField(propertyName,binding);
                }else if(typeof propertyValue == 'number'){
                    queryDataField = new DataFormNumericField(propertyName,binding);
                }
                else
                {
                    queryDataField = new DataFormDataField(propertyName,binding);
                }
            }

            if(this._mode == DataFormMode.ReadOnly){
                return queryDataField.GetReadOnlyControl(propertyName,binding);
            }else{
                return queryDataField.GetEditControl(propertyName,binding);
            }

            
        }

        private QueryDataField(propertyName: string): IDataField{

            if(!this.DataFields)
            return null; 

            var length = this.DataFields.Count;
            for (var index = 0; index < length; index++) {
                var element = <IDataField>this.DataFields.GetValueAt(index);
                if(element.PropertyName === propertyName){
                    return element;
                }
            }
        }

        private handleFirstItemClick(sender: Primitives.ButtonBase, args){

            this.TryCommit();

            if(this.Items.Count > 0){
                this.CurrentItem = this.Items.GetValueAt(0);
            }
        }

        private handleNextItemClick(sender: Primitives.ButtonBase, args){
            this.TryCommit();
            
            var nextIndex = this.SelectedIndex +1;

            if(nextIndex < this.Items.Count){
                this.CurrentItem = this.Items.GetValueAt(nextIndex);
            }
        }

        private handlePreviousItemClick(sender: Primitives.ButtonBase, args){
            this.TryCommit();
            
            var nextIndex = this.SelectedIndex -1;
            if(nextIndex > -1){
                this.CurrentItem = this.Items.GetValueAt(nextIndex);
            }
        }

        private handleLastItemClick(sender: Primitives.ButtonBase, args){
            this.TryCommit();

            if(this.Items.Count > 0){
                this.CurrentItem = this.Items.GetValueAt(this.Items.Count-1);
            }
        }

        private handleNewItemClick(sender: Primitives.ButtonBase, args){
            this._mode = DataFormMode.AddNew;

            var collection = <DataSourceCollection<any>>this.ItemsSource;
            if(collection){
                var newItem = collection.GetNew();
                if(newItem){
                    collection.Add(newItem);
                    this.CurrentItem = newItem;
                    this.ProcessNavigationButtons();   
                }
                
            }
            this.InvalidateForm();
            this.UpdateVisualState();
        }

        private handleEditItemClick(sender: Primitives.ButtonBase, args){

            var copy = this.CloneObj(this.CurrentItem);
            this.backupItem = copy;
            this.EditMode();
            
        }

        private handleDeleteItemClick(sender: Primitives.ButtonBase, args){
            this.Mode = DataFormMode.ReadOnly;
            if(this.CurrentItem){
                var collection = <DataSourceCollection<any>>this.ItemsSource;
                if(collection){
                    collection.Remove(this.CurrentItem);
                    if(this.Items.Count > 0){
                        var nextIndex = 0;
                        if(this.SelectedIndex != 0){
                            nextIndex = this.SelectedIndex + 1;
                            if(nextIndex > this.Items.Count){
                                nextIndex = this.Items.Count;
                            }
                        }
                        
                        this.CurrentItem = this.Items.GetValueAt(nextIndex);

                    }else{
                        this.UpdateVisualState();
                        this.CurrentItem = null;
                    }
                }
                
                
            }
        }


        private handleCommitClick(sender: Primitives.ButtonBase, args){
            this.TryCommit();
            this.ReadOnlyMode();
        }

        private handleCancelClick(sender: Primitives.ButtonBase, args){
            this.CancelCommit();
            this.ReadOnlyMode();

        }

        private _OnSelectedIndexChanged(args: IDependencyPropertyChangedEventArgs) {
            
        }

        private ReadOnlyMode(){
            this._mode = DataFormMode.ReadOnly;
            this.InvalidateForm();
            this.UpdateVisualState();   
        }

        private EditMode(){
            this._mode = DataFormMode.Edit;
            this.InvalidateForm();
            this.UpdateVisualState();
        }

        private TryCommit(): void{
            if(this.CurrentItem && this.AutoCommit){
                this.Commit();
            }else{
                this.CancelCommit();
            }

            this.ReadOnlyMode();

        }

        public Commit():void {
            this.ProcessNavigationButtons();
        }

        public CancelCommit(): void {

            if(this.Mode == DataFormMode.AddNew){
                var collection = <DataSourceCollection<any>>this.ItemsSource;
                if(collection){
                    collection.Remove(this.CurrentItem);
                    if(collection.Count>0 && collection.GetValueAt(0) != null){
                        this.CurrentItem = collection.GetValueAt(0);
                    }else{
                        this.UpdateVisualState();
                    }
                    this.ProcessNavigationButtons();                    
                }
                
            }else{
                if(this.backupItem)
                this.CopyObj(this.backupItem,this.CurrentItem);
            }
            
        }

        private GetProperties(obj: any): any[] {

            var properties = [];
            for (var prop in obj) {

                if(prop !== "PropertyChanged" && prop[0] !== "_"){
                    if (typeof obj[prop] != 'function') {
                    properties.push(prop)
                    }
                }
                
            }
            return properties;
        }

        private CloneObj(obj: any): any {
            return Fayde.Clone(obj);
        }

        private CopyObj(src:any,dest: any): void {
            for (var prop in src) {
                dest[prop] = src[prop];
            }
        }

        private GenerateNewItem():any{
            var thing = this.ItemsSource;

            return null;
        }
        

    }

    

    function toArray(value: any): any[] {
        if (value instanceof Array)
            return <any[]>value;
        var enu = nullstone.IEnumerable_.as(value);
        if (enu) {
            var arr = [];
            for (var en = enu.getEnumerator(); en.moveNext();) {
                arr.push(en.current);
            }
            return arr;
        }
        return null;
    }
    Fayde.Controls.TemplateVisualStates(DataForm,
    { GroupName: "ModeStates", Name: "ReadOnly" },
    { GroupName: "ModeStates", Name: "Empty" },
    { GroupName: "ModeStates", Name: "Edit" });

    export class DataFieldsCollection extends ObservableCollection<IDataField> {

    }

    
}