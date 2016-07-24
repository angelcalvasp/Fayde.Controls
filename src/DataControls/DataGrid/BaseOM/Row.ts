/// <reference path="ColumnElementsHost"/>
/// <reference path="ControlBase"/>
/// <reference path="../CoreUI/IDataGridElement"/>
/// <reference path="../CoreUI/IColumnElementHost"/>
/// <reference path="../../Data/DataPath"/>
module Fayde.Controls {

    import ColumnElementsHost = Fayde.Controls.ColumnElementsHost;
    import ControlBase = Fayde.Controls.ControlBase;
    import IDataGridElement = Fayde.Controls.IDataGridElement;
    import IColumnElementHost = Fayde.Controls.IColumnElementHost;
    import DataPath = Fayde.Controls.DataPath;

    export class Row extends ControlBase implements IDataGridElement, IColumnElementHost, INotifyPropertyChanged {

        OnMouseEnterRowEvent: DataGridRoutedEvent  = new DataGridRoutedEvent();
        OnMouseLeaveRowEvent: DataGridRoutedEvent  = new DataGridRoutedEvent();
        RowMouseLeftButtonDownEvent: DataGridRoutedEvent  = new DataGridRoutedEvent();
        RowMouseLeftButtonUpEvent: DataGridRoutedEvent  = new DataGridRoutedEvent();
        OnRowCellStyleChangedEvent: DataGridRoutedEvent  = new DataGridRoutedEvent();

        public get CurrentStateCurrent(): string {return "Current";}
        public get CurrentStateNotCurrent(): string {return "NotCurrent";}

        constructor(){
            super();
            this.DefaultStyleKey = Row;
            this.DataContext = null;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            var cellsHost = <ColumnElementsHost>this.GetTemplateChild("CellsHost", ColumnElementsHost);

            if( cellsHost == null )
            {
                cellsHost = new ColumnElementsHost();
            }

            this.m_cellsHost.TransfertCells( cellsHost );
            this.m_cellsHost = cellsHost;
            this.UpdateVisualState();
        }
            
        
        static CellStyleProperty = DependencyProperty.Register("CellStyle", () => Style, Row, null, (d, args) => (<Row>d).OnCellStyleChanged(args));
        CellStyle: Style;
        private OnCellStyleChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnPropertyChanged("CellStyle");
        }

        get Visual(): UIElement { return this; }

        get CellsHost(): ColumnElementsHost { return this.m_cellsHost; }

        get Elements(): nullstone.IEnumerable<ColumnElementWrapper> { return this.m_cellsHost.Elements; }

        get RenderedElements(): nullstone.IEnumerable<ColumnElementWrapper> { 
            var filtered = [];

            var array = nullstone.IEnumerable_.toArray(this.m_cellsHost.Elements);

            array.forEach(element => {
                if(!element.ColumnElement.ParentColumnContainer.IsRecycled){
                    filtered.push(element);
                }
            });

            return nullstone.IEnumerable_.fromArray(filtered);
        }

        get RenderedCells(): nullstone.IEnumerable<Cell> { 
            var filtered = [];

            var array = nullstone.IEnumerable_.toArray(this.m_cellsHost.Elements);

            array.forEach(element => {
                filtered.push(element.ColumnElement);
            });

            return nullstone.IEnumerable_.fromArray(filtered);
        }

        public get CellsOffset():number{ return this.m_cellsHost.CellsIndent;}
        public set CellsOffset(value: number){
            if( this.m_cellsHost.CellsIndent != value ){
                this.m_cellsHost.CellsIndent = value;
            }
        };

        InvalidateColumnArrange(): void
        {
            this.m_cellsHost.InvalidateColumnArrange();
        }

        InvalidateColumnMeasure(): void
        {
            this.m_cellsHost.InvalidateColumnMeasure();
        }

        AddColumnElement(element:ColumnElementWrapper ): void
        {
            this.m_cellsHost.AddColumnElement( element );
        }

        RemoveColumnElement(element: ColumnElementWrapper ): void
        {
            this.m_cellsHost.RemoveColumnElement( element );
        }

        SetElementPosition(element: ColumnElementWrapper,position: ColumnPosition ): void
        {
            this.m_cellsHost.SetElementPosition( element, position );
        }

        get Path(): DataPath { return this.m_path; }

        SetDataPath(path: DataPath):void
        {
            this.m_path = path;
        }

        Accept(visitor:IVisitor ):void
        {
            visitor.Visit( this );
        }

        private m_path: DataPath;
        private m_cellsHost: ColumnElementsHost = new ColumnElementsHost();

        PropertyChanged = new nullstone.Event<PropertyChangedEventArgs>();
        OnPropertyChanged(propertyName: string) {
            this.PropertyChanged.raise(this, new PropertyChangedEventArgs(propertyName));
        }


    }
}