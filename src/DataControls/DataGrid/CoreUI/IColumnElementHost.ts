/// <reference path="../BaseOM/ColumnElementWrapper"/>
/// <reference path="../Enum/ColumnPosition"/>
module Fayde.Controls {
    import ColumnElementWrapper = Fayde.Controls.ColumnElementWrapper;
    import ColumnPosition = Fayde.Controls.ColumnPosition;

    export interface IColumnElementHost{
         Elements: nullstone.IEnumerable<ColumnElementWrapper>;

        AddColumnElement(element: ColumnElementWrapper ):void;
        RemoveColumnElement(element: ColumnElementWrapper ):void;
        SetElementPosition( element: ColumnElementWrapper, position: ColumnPosition ):void;
        InvalidateColumnArrange():void;
        InvalidateColumnMeasure():void;
    }
}