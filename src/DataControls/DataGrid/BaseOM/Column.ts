/// <reference path="../Enum/CellEditorDisplayConditions"/>
/// <reference path="../Enum/EditTriggers"/>
/// <reference path="../Enum/SortDirection"/>
/// <reference path="DataGridBindingInfo"/>
module Fayde.Controls {

    import CellEditorDisplayConditions = Fayde.Controls.CellEditorDisplayConditions;
    import EditTriggers = Fayde.Controls.EditTriggers;
    import DataGridBindingInfo = Fayde.Controls.DataGridBindingInfo;
    import SortDirection = Fayde.Controls.SortDirection;

    export class Column extends DependencyObject implements INotifyPropertyChanged {

        static AllowFilterProperty = DependencyProperty.Register("AllowFilter", () => Boolean, Column, null, (d, args) => (<Column>d).OnAllowFilterChanged(args));
        static AllowGroupProperty = DependencyProperty.Register("AllowGroup", () => Boolean, Column, null, (d, args) => (<Column>d).OnAllowGroupChanged(args));
        static AllowResizeProperty = DependencyProperty.Register("AllowResize", () => Boolean, Column, null, (d, args) => (<Column>d).OnAllowColumnResizeChanged(args));
        static AllowSortProperty = DependencyProperty.Register("AllowSort", () => Boolean, Column, null);
        static CellContentTemplateProperty = DependencyProperty.Register("CellContentTemplate", () => DataTemplate, Column, null, (d, args) => (<Column>d).OnCellContentTemplateChanged(args));
        static CellContentStyleProperty = DependencyProperty.Register("CellContentStyle", () => Style, Column, null, (d, args) => (<Column>d).OnCellContentStyleChanged(args));
        static CellEditorDisplayConditionsProperty = DependencyProperty.Register("CellEditorDisplayConditions", () => CellEditorDisplayConditions, Column, null, (d, args) => (<Column>d).OnCellEditorDisplayConditionsChanged(args));
        static EditTriggersProperty = DependencyProperty.Register("EditTriggers", () => EditTriggers, Column, null, (d, args) => (<Column>d).OnEditTriggersChanged(args));
        static CellHorizontalContentAlignmentProperty = DependencyProperty.Register("CellHorizontalContentAlignment", () => HorizontalAlignment, Column, null, (d, args) => (<Column>d).OnCellHorizontalContentAlignmentChanged(args));
        static CellVerticalContentAlignmentProperty = DependencyProperty.Register("CellVerticalContentAlignment", () => VerticalAlignment, Column, null, (d, args) => (<Column>d).OnCellVerticalContentAlignmentChanged(args));
        static CellStyleProperty = DependencyProperty.Register("CellStyle", () => Style, Column, null, (d, args) => (<Column>d).OnCellStyleChanged(args));
        static ColumnManagerCellStyleProperty = DependencyProperty.Register("CellEditorDisplayConditions", () => Style, Column, null, (d, args) => (<Column>d).OnColumnManagerCellStyleChanged(args));
        static FilterCellStyleProperty = DependencyProperty.Register("FilterCellStyle", () => Style, Column, null, (d, args) => (<Column>d).OnFilterCellStyleChanged(args));
        static InsertionCellStyleProperty = DependencyProperty.Register("InsertionCellStyle", () => Style, Column, null, (d, args) => (<Column>d).OnInsertionCellStyleChanged(args));
        
        private m_actualWidth: number;
        public get ActualWidth():number{ return this.m_actualWidth;}
        public set ActualWidth(value: number){
            if( this.m_actualWidth == value )
                return;

            this.m_actualWidth = value;
            this.OnPropertyChanged("ActualWidth");
        };

        AllowFilter: boolean;

        private OnAllowFilterChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("AllowFilter");
        }

        AllowGroup: boolean;
        private OnAllowGroupChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("AllowGroup");
        }

        AllowResize: boolean;
        private OnAllowColumnResizeChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("AllowResize");
        }

        AllowSort: boolean;

        CellContentTemplate: DataTemplate;
        private OnCellContentTemplateChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("CellContentTemplate");
        }

        CellContentStyle: Style;
        private OnCellContentStyleChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("CellContentStyle");
        }

        CellEditorDisplayConditions: CellEditorDisplayConditions;
        private OnCellEditorDisplayConditionsChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("CellEditorDisplayConditions");
        }

        EditTriggers: EditTriggers;
        private OnEditTriggersChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("EditTriggers");
        }

        
        CellHorizontalContentAlignment: HorizontalAlignment;
        private OnCellHorizontalContentAlignmentChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("CellHorizontalContentAlignment");
        }

        CellVerticalContentAlignmentProperty: VerticalAlignment;
        private OnCellVerticalContentAlignmentChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("CellHorizontalContentAlignment");
        }

        CellStyle: Style;
        private OnCellStyleChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("CellStyle");
        }

        ColumnManagerCellStyle: Style;
        private OnColumnManagerCellStyleChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("ColumnManagerCellStyle");
        }

        FilterCellStyle: Style;
        private OnFilterCellStyleChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("FilterCellStyle");
        }

        InsertionCellStyle: Style;
        private OnInsertionCellStyleChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("InsertionCellStyle");
        }



        private m_displayMemberBindingInfo: DataGridBindingInfo;
        public get DisplayMemberBindingInfo():DataGridBindingInfo{return this.m_displayMemberBindingInfo;}
        public set DisplayMemberBindingInfo(value: DataGridBindingInfo){
            if( value == this.m_displayMemberBindingInfo )
                return;

            var oldValue = this.m_displayMemberBindingInfo;
            this.m_displayMemberBindingInfo = value;
            this.m_displayMemberBinding = this.m_displayMemberBindingInfo.GetBinding();

            //this.DisplayDataType = null;

            if( this.SortBindingInfo == null )
            {
                this.OnPropertyChanged("SortFieldName");
                /*
                this.RaiseValuesPropertyChanged(
                () => this.SortFieldName,
                this.ResolveSortFieldName( oldValue, null ),
                this.ResolveSortFieldName( m_displayMemberBindingInfo, null ) );*/
            }

            this.OnPropertyChanged("DisplayMemberBindingInfo");

        }

        private m_displayMemberBinding: Data.Binding;
        public get DisplayMemberBinding():Data.Binding{return this.m_displayMemberBinding;}

        public get DisplayTitle() {return ( this.Title != null ) ? this.Title : this.FieldName;}


        
        private m_fieldName: string;
        public get FieldName():string{return this.m_fieldName;}
        public set FieldName(value: string){
            if( value != this.m_fieldName )
            {
                var oldFieldName = this.m_fieldName;
                this.m_fieldName = value;

                if( ( ( this.DisplayMemberBindingInfo == null ) || ( this.DisplayMemberBindingInfo.IsAutoGenerated ) )
                && ( !(!this.m_fieldName)) )
                {
                    this.DisplayMemberBindingInfo = new DataGridBindingInfo( this.m_fieldName, true, true );
                }

                this.RaiseDisplayTitleChanged();
            }

        }

        /*
        static GroupDescriptionProperty = DependencyProperty.Register("GroupDescription", () => GroupDescription, Column, null);

        GroupDescription:GroupDescription
        */

        private m_minWidth: number;
        public get MinWidth():number{return this.m_minWidth;}
        public set MinWidth(value: number){
            this.m_minWidth = value;
            this.OnPropertyChanged("MinWidth");

        }
        
        private m_maxWidth: number;
        public get MaxWidth():number{return this.m_maxWidth;}
        public set MaxWidth(value: number){
            this.m_maxWidth = value;
            this.OnPropertyChanged("MaxWidth");
        }

        static ReadOnlyProperty = DependencyProperty.Register("ReadOnly", () => Boolean, Column, null, (d, args) => (<Column>d).OnReadOnlyChanged(args));
        ReadOnly: boolean;
        private OnReadOnlyChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("ReadOnly");
        }

        static SortBindingInfoProperty = DependencyProperty.Register("SortBindingInfo", () => String, Column, null, (d, args) => (<Column>d).OnSortBindingInfoChanged(args));
        SortBindingInfo: string;
        private OnSortBindingInfoChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("SortBindingInfo");
        }

        static SortDirectionProperty = DependencyProperty.Register("SortDirection", () => SortDirection, Column, null, (d, args) => (<Column>d).OnSortDirectionChanged(args));
        SortDirection: SortDirection;
        private OnSortDirectionChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("SortDirection");
        }

        public get SortFieldName(){
            return this.ResolveSortFieldName(this.DisplayMemberBindingInfo, this.SortBindingInfo);
        }

        static TitleProperty = DependencyProperty.Register("Title", () => Object, Column, null, (d, args) => (<Column>d).OnTitleChanged(args));
        Title: any;
        private OnTitleChanged(args: IDependencyPropertyChangedEventArgs) {
            this.RaiseDisplayTitleChanged();
        }

        static TitleTemplateProperty = DependencyProperty.Register("TitleTemplate", () => DataTemplate, Column, null, (d, args) => (<Column>d).OnTitleTemplateChanged(args));
        TitleTemplate: DataTemplate;
        private OnTitleTemplateChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("TitleTemplate");
        }

        static CellEditorTemplateProperty = DependencyProperty.Register("CellEditorTemplate", () => DataTemplate, Column, null, (d, args) => (<Column>d).OnCellEditorTemplateChanged(args));
        CellEditorTemplate: DataTemplate;
        private OnCellEditorTemplateChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("CellEditorTemplate");
        }

        static CellEditorStyleProperty = DependencyProperty.Register("CellEditorStyle", () => Style, Column, null, (d, args) => (<Column>d).OnCellEditorStyleChanged(args));
        CellEditorStyle: Style;
        private OnCellEditorStyleChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("CellEditorStyle");
        }

        IsAutoGenerated: boolean;

        static VisibleProperty = DependencyProperty.Register("Visible", () => Boolean, Column, null, (d, args) => (<Column>d).OnVisibleChanged(args));
        Visible: boolean;
        private OnVisibleChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("Visible");
        }

        static VisiblePositionProperty = DependencyProperty.Register("VisiblePosition", () => Number, Column, null, (d, args) => (<Column>d).OnVisiblePositionChanged(args));
        VisiblePosition: number;
        private OnVisiblePositionChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("VisiblePosition");
        }

        static WidthProperty = DependencyProperty.Register("Width", () => Number, Column, null, (d, args) => (<Column>d).OnWidthChanged(args));
        Width: number;
        private OnWidthChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("Width");
        }

        static TextTrimmingProperty = DependencyProperty.Register("Width", () => TextTrimming, Column, TextTrimming.WordEllipsis, (d, args) => (<Column>d).OnTextTrimmingPropertyChanged(args));
        TextTrimming: TextTrimming;
        private OnTextTrimmingPropertyChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("TextTrimming");
        }

        private RaiseDisplayTitleChanged():void{
            this.OnPropertyChanged("DisplayTitle");
        }

        private ResolveSortFieldName(bindingInfo: DataGridBindingInfo, sortBindingInfo:string ):string
        {
            if( sortBindingInfo != null )
                return sortBindingInfo;

            if( bindingInfo == null )
                return null;

            return bindingInfo.Path.Path;
        }
        
        PropertyChanged = new nullstone.Event<PropertyChangedEventArgs>();
        OnPropertyChanged(propertyName: string) {
            this.PropertyChanged.raise(this, new PropertyChangedEventArgs(propertyName));
        }

    }



    Fayde.MVVM.NotifyProperties(Column, ["CurrentItem"]);

}