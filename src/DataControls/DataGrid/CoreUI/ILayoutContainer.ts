/// <reference path="ILayoutElement" />
/// <reference path="ILayout" />
/// <reference path="LayoutParameters" />



module Fayde.Controls{
    import ILayoutElement = Fayde.Controls.ILayoutElement;
    import ILayout = Fayde.Controls.ILayout;
    import LayoutParameters = Fayde.Controls.LayoutParameters;

    export interface ILayoutContainer {
        Layout: ILayout;

        MeasureElement(element: ILayoutElement, availableSize: Size ): void;

        ArrangeElement(element: ILayoutElement,finalPosition: Rect,parameters: LayoutParameters ): void;
    }
}