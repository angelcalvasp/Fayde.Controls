/// <reference path="../BaseOM/ColumnContainer" />

module Fayde.Controls {
    import ColumnContainer = Fayde.Controls.ColumnContainer;
    export interface IColumnPanelOwner {
        OnColumnAdded(added: ColumnContainer ):void;
        OnColumnRemoved(removed: ColumnContainer ):void;
        InvalidatePanelMeasure():void;
        InvalidatePanelArrange():void;
    }
}