import DataGridEventHelper = Fayde.Controls.DataGridEventHelper;
module Fayde.Controls {
    import IEnumerable = nullstone.IEnumerable;
    import LayoutParameters = Fayde.Controls.LayoutParameters;
    import IRecyclable = Fayde.Controls.IRecyclable;
    import IEnumerable_ = nullstone.IEnumerable_;
    import KeyEventArgs = Fayde.Input.KeyEventArgs;
    export class RootHost extends ColumnElementsHost implements IVisitorElement, IColumnElementHost, IDataGridRoutedEventElement {

        public static get RootHostInitialOffset(): number{
            return 20;
        }

        private static m_RootKeyDownEvent: DataGridRoutedEvent = new DataGridRoutedEvent();
        public static get RootKeyDownEvent(): DataGridRoutedEvent{
            return RootHost.m_RootKeyDownEvent;
        }

        constructor()
        {
            this.m_eventHelper = new DataGridEventHelper( this );
            this.m_rootContainer = new VirtualRootContainer();
            this.m_childrenManager = new ChildrenManager<ILayoutElement>( this.AddChildren, this.RemoveChildren );
            //this.KeyDown += new KeyEventHandler( this.OnKeyDown );
        }

        get EventManager(): DataGridEventHelper{
            return this.m_eventHelper;
        }

        private get MeasureManager(){
            return <IManageRootMeasure>this.GetElementOrParentBase<IManageRootMeasure>();
        }

        get ChildrenManager(): ChildrenManager<ILayoutElement>{
            return this.m_childrenManager;
        }

        get RootContainer(): VirtualRootContainer {
            return this.m_rootContainer;
        }

        PendingTransitionContext: TransitionContext;

        public get ColumnElements(): IEnumerable<ColumnElementWrapper>{
            return CompatibilityUtils.GetEnumerable( this.Children )
                .Where( ( e ) => e is ColumnBackgroundControlWrapper )
                .Cast<ColumnElementWrapper>();
        }
        protected MeasureOverride(availableSize: Size): Size
        {
            super.MeasureOverride( availableSize );
            var measuredSize: Size = this.MeasureManager.OnMeasureOverride( availableSize );
            measuredSize.height = Math.min( measuredSize.height, availableSize.height );
            return measuredSize;
        }

        protected ArrangeOverride(finalSize: Size ): Size
        {
            super.ArrangeOverride( finalSize );
            var arrangeRect: Rect = new Rect( new Point( 0, 0 ), finalSize );
            var arrangeSize: Size = this.m_rootContainer.Arrange( new ArrangeParameters( arrangeRect, arrangeRect, new LayoutParameters( this.PendingTransitionContext ) ) );
            this.PendingTransitionContext = null;
            return arrangeSize;
        }

        DoMeasure(availableSize: Size): Size
        {
            this.m_rootContainer.Measure( availableSize );
            return this.m_rootContainer.DesiredSize;
        }

        private AddChildren(element: ILayoutElement): void
        {
            if( element instanceof(UIElement) )
            {
                this.Children.Add( <UIElement>element );
            }
        }

        private RemoveChildren(element: ILayoutElement ): void
        {
            if( element instanceof(UIElement))
            {
                this.Children.Remove( < UIElement>element );
            }
        }

        TryGetElement(key: any,element: ILayoutElement): Array<any>
        {
            var result = new Array<any>();
            var tryGetResult = this.ChildrenManager.TryGetElement(key,element);
            var resultSuccess: boolean = <boolean>tryGetResult[0];
            result.push(resultSuccess);
            if(resultSuccess){
                result.push(tryGetResult[1]);
            }
            return result;
        }

        TryGetRecycledElement(key: any, exceptionKey: any,element: ILayoutElement): Array<any>
        {
            var result = new Array<any>();
            var tryGetResult = this.ChildrenManager.TryGetRecycledElement( key, exceptionKey,element);
            var found: boolean = <boolean>tryGetResult[0];
            result.push(found);
            if(found){
                result.push(tryGetResult[1])
            }
            return result;
        }

        AddElement(element: ILayoutElement): void
        {
            this.ApplyToHeadersFooters( element,
                ( e ) =>
                {
                    var uiElement = <UIElement>e;
                    if(!this.Children.Contains(uiElement))
                    {
                        this.Children.Add( uiElement );
                    }
                }
            );
            this.ChildrenManager.Add( element );
        }

        ReuseElement(newPath: any,wrapper: ILayoutElement): void
        {
            this.ChildrenManager.ReuseElement( newPath, wrapper );
        }

        RemoveElement(element: ILayoutElement): void
        {
            this.ApplyToHeadersFooters( element, ( e ) => this.Children.Remove( <UIElement>e ) );
            this.ChildrenManager.Remove( element );

        }

        RecycleElement( element: ILayoutElement): void
        {
            this.ApplyToHeadersFooters( element, ( e ) => e.LastArrangeRect = null );
            element.LastArrangeRect = null;
            this.ChildrenManager.Recycle( element );
        }

        ApplyToHeadersFooters(element: ILayoutElement, action: (p:ILayoutElement)=>void ): void
        {
            if( element instanceof(VirtualContainerBase))
            {
                var container = <VirtualContainerBase>element;

                IEnumerable_.toArray(container.Headers).forEach((header)=>{
                    action(header);
                });

                IEnumerable_.toArray(container.Footers).forEach((footer)=>{
                    action( footer );
                });
            }
        }

        private OnKeyDown(sender: any,e: KeyEventArgs ): void
        {
            DataGridEventUtils.RaiseKeyEvent( this, e, RootHost.RootKeyDownEvent );
        }

        Accept(visitor: IVisitor ): void
        {
            visitor.Visit( this );
        }

        private m_eventHelper: DataGridEventHelper;
        private m_rootContainer: VirtualRootContainer;
        private m_childrenManager: ChildrenManager<ILayoutElement>;

        Accept(visitor: IVisitor): void
        {
            throw new Error();
        }

        get Elements(): IEnumerable<ColumnElementWrapper>{
            return this.ColumnElements;
        }

        AddColumnElement(element: ColumnElementWrapper): void
        {
            this.AddColumnElement( element );
        }

        RemoveColumnElement(element: ColumnElementWrapper): void
        {
            this.RemoveColumnElement( element );
        }

        SetElementPosition(element: ColumnElementWrapper,position : ColumnPosition): void
        {
            this.SetElementPosition( element, position );
        }

        InvalidateColumnArrange(): void
        {
            this.InvalidateColumnArrange();
        }

        InvalidateColumnMeasure(): void
        {
            this.InvalidateColumnMeasure();
        }

        get EventManager(): DataGridEventHelper
        {
            return this.EventManager;
        }

    }
}