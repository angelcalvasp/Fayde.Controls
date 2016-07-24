/// <reference path="../Visitors/IVisitorElement"/>
module Fayde.Controls {
    import IVisitorElement = Fayde.Controls.IVisitorElement;
    export interface IDataGridElement extends IVisitorElement {

        Visual: UIElement;
        Path: DataPath;

        SetDataPath(path: DataPath):void;
    }
}