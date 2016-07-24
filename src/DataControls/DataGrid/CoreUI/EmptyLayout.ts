module Fayde.Controls {
    import IEnumerable = nullstone.IEnumerable;
    import ILayoutElement = Fayde.Controls.ILayoutElement;
    export class EmptyLayout implements ILayout {

        public static get Instance(){
            return new EmptyLayout();
        } 

        private EmptyLayout() { }

        public get Elements(): IEnumerable<ILayoutElement>{
            return new ILayoutElement[ 0 ];
        }

        public get DesiredSize(): Size{
            return new Size( 0, 0 );
        }

        public MeasurePanel(availableSize: Size ): Size
        {
            return new Size( 0, 0 );
        }

        public ArrangePanel(finalSize: Size,parameters: LayoutParameters ): Size
        {
            return new Size( 0, 0 );
        }

        public SetViewportPosition(position: ViewportPosition): void
        {
        }

        public GetViewportInfo(viewportRect: Rect ): ViewportInfo
        {
            return new ViewportInfo();
        }
    }
}