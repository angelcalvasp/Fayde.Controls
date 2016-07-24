module Fayde.Controls {
    export interface IColumnElement {
        ParentColumnContainer: ColumnContainer;
        ParentHost: IColumnElementHost;

        SetParentColumnContainer(column: ColumnContainer):void;

        SetParentHost(column: IColumnElementHost):void;
        
    }
}