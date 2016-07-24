/// <reference path="ArrangeParameters"/>
module Fayde.Controls {

    import ArrangeParameters =  Fayde.Controls.ArrangeParameters;

    export interface ILayoutElement {
        ReferenceItem: any;
        DesiredSize: Size;
        LastArrangeRect: Rect;
        Measure(availableSize: Size ):void;
        Arrange(arrangeParameters: ArrangeParameters): void;
    }
}