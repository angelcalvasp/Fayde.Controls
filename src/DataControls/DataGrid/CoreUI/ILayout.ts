module Fayde.Controls {
    import IEnumerable = nullstone.IEnumerable;
    export interface ILayout {
        Elements: IEnumerable<ILayoutElement>;
        DesiredSize: Size;
        MeasurePanel(availableSize: Size): Size;
        ArrangePanel(finalSize: Size,parameters: LayoutParameters ): Size;
        SetViewportPosition(position: ViewportPosition): void;
        GetViewportInfo(viewportRect: Rect): ViewportInfo;
    }
}