/// <reference path="Row"/>
/// <reference path="Column"/>
/// <reference path="ColumnContainer"/>
/// <reference path="../CoreUI/IColumnElementHost"/>
/// <reference path="../BaseOM/ContentControlBase"/>
module Fayde.Controls {

    import Row = Fayde.Controls.Row;
    import Column = Fayde.Controls.Column;
    import ColumnContainer = Fayde.Controls.ColumnContainer;
    import IColumnElementHost = Fayde.Controls.IColumnElementHost;
    import ContentControlBase = Fayde.Controls.ContentControlBase;

    export class Cell extends ContentControlBase implements IColumnElement, INotifyPropertyChanged {

        OnMouseEnterCellEvent: DataGridRoutedEvent  = new DataGridRoutedEvent();
        OnMouseLeaveCellEvent: DataGridRoutedEvent  = new DataGridRoutedEvent();
        CellMouseLeftButtonDownEvent: DataGridRoutedEvent  = new DataGridRoutedEvent();
        CellMouseLeftButtonUpEvent: DataGridRoutedEvent  = new DataGridRoutedEvent();

        static get CommonStateNormal():string { return "Normal"; }
        static get CommonStatePressed():string { return "Pressed"; }
        static get CommonStateDragged():string { return "Dragged"; }
        static get CommonStateMouseOver():string { return "MouseOver"; }
        static get CurrentStateCurrent():string { return "Current"; }
        static get CurrentStateNotCurrent():string { return "NotCurrent"; }

        constructor(){
            super();
            this.DefaultStyleKey = Cell;
        }

        public get ParentRow(): Row {
            var row = <Row>this.ParentHost;
            return row;
        }

        public get ParentColumn(): Column {
            return ( this.ParentColumnContainer != null )
            ? this.ParentColumnContainer.Column
            : null;
        }

        ParentColumnContainer: ColumnContainer;

        ParentHost: IColumnElementHost;

        OnMouseEnter(e: Input.MouseEventArgs) {
            super.OnMouseEnter(e);
            this.UpdateVisualState();
        }
        OnMouseLeave(e: Input.MouseEventArgs) {
            super.OnMouseLeave(e);
            this.UpdateVisualState();
        }
        OnMouseMove(e: Input.MouseEventArgs) {
            super.OnMouseMove(e);

        }
        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonDown(e);
        }
        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonDown(e);
        }

        SetContentAlignment<TAlignment>(dp: DependencyProperty,newValue: any )
        {
            var oldValue = this.ReadLocalValue( dp );
            var hasOldValue = ( oldValue != DependencyProperty.UnsetValue );

            if( newValue.HasValue )
            {
                var value = newValue.Value;

                if( !hasOldValue || ( !nullstone.equals( oldValue, value ) ) )
                {
                    this.SetValue( dp, value );
                }
            }
            else if( hasOldValue )
            {
                this.ClearValue( dp );
            }
        }

        public SetParentColumnContainer(columnContainer: ColumnContainer)
        {
            this.ParentColumnContainer = columnContainer;
        }

        public SetParentHost(parentHost: IColumnElementHost)
        {
            this.ParentHost = parentHost;
        }

        public SetCommonState(state: string, useTransitions: boolean ):void
        {
            //this.VisualStateHelper.GoToCommonState( state, useTransitions );
        }

        public SetCurrentState(isCurrent: boolean, useTransitions: boolean )
        {
            var state = ( isCurrent ) ? Cell.CurrentStateCurrent : Cell.CurrentStateNotCurrent;
            //this.VisualStateHelper.GoToCurrentState( state, useTransitions );
        }

        OnColumnIsDragPausedChanged(): void
        {
            /*
            if( this.m_dragContentPresenter != null )
            {
                if( this.ParentColumnContainer.IsDragPaused )
                {
                m_dragContextPresenterFadeOut.Begin();
                m_dragContextPresenterFadeIn.Stop();
                }
                else
                {
                m_dragContextPresenterFadeIn.Begin();
                m_dragContextPresenterFadeOut.Stop();
                }
            }
            */
        }


        PropertyChanged = new nullstone.Event<PropertyChangedEventArgs>();
        OnPropertyChanged(propertyName: string) {
            this.PropertyChanged.raise(this, new PropertyChangedEventArgs(propertyName));
        }

    }
}