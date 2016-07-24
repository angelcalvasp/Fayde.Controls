/// <reference path="ColumnContainer" />
/// <reference path="../CoreUI/ILayoutElement" />
/// <reference path="../CoreUI/IColumnPanelOwner" />


module Fayde.Controls {

    import ColumnContainer = Fayde.Controls.ColumnContainer;
    import IEnumerable = nullstone.IEnumerable;
    import ILayoutElement = Fayde.Controls.ILayoutElement;
    import IColumnPanelOwner = Fayde.Controls.IColumnPanelOwner;
    import ICollection = nullstone.ICollection;
    import ObservableCollection = Fayde.Collections.ObservableCollection;
    import IEnumerable_ = nullstone.IEnumerable_;
    import forEach = Fayde.Controls.arrays.forEach;

    export class ColumnPanel {

    constructor( columnPanelOwner: IColumnPanelOwner)
    {
        this.m_leftFixedSection = new ColumnInnerPanel();
        this.m_rightFixedSection = new ColumnInnerPanel();
        this.m_scrollingSection = new ColumnInnerPanel();
        this.m_children = new ObservableCollection<ColumnContainer>();
        this.m_childrenManager = new ChildrenManager<ColumnContainer>( this.m_children.Add, (c) => this.m_children.Remove(c) );
        this.m_columnPanelOwner = columnPanelOwner;
    }

    get RenderedColumns(): IEnumerable<ColumnContainer>
    {
        var array = Array<ColumnContainer>();

        var scrollableElements = IEnumerable_.toArray(this.ScrollableLayout.Elements);
        var leftFixedElements = IEnumerable_.toArray(this.m_leftFixedSection.Layout.Elements);
        var rightFixedElements = IEnumerable_.toArray(this.m_rightFixedSection.Layout.Elements);

        scrollableElements.forEach(element => {
          array.push(<ColumnContainer>element);
        });

        leftFixedElements.forEach(element => {
          array.push(<ColumnContainer>element);
        });

        rightFixedElements.forEach(element => {
          array.push(<ColumnContainer>element);
        });


        return IEnumerable_.fromArray(array);
    }

    get AllColumns(): IEnumerable<ColumnContainer>
    {
        return this.ChildrenManager.AllElements;
    }

    get ChildrenManager(): ChildrenManager<ColumnContainer>
    {
        return this.m_childrenManager;
    }

    get LeftFixedSection(): ILayoutContainer
    {
        return this.m_leftFixedSection;
    }

    get RightFixedSection(): ILayoutContainer
    {
        return this.m_rightFixedSection;
    }

    get ScrollableSection(): ILayoutContainer
    {
        return this.m_scrollingSection;
    }

    get ScrollableLayout(): ILayout
    {
        return this.m_scrollingSection.Layout;
    }

    ColumnElementsIndent: number;

    public CommitColumns(): void
    {
      this.m_leftFixedSection.CommitLayout();
      this.m_rightFixedSection.CommitLayout();
      this.m_scrollingSection.CommitLayout();
    }

    public RollBackColumns(): void
    {
      this.ApplyLayoutUpdateResult(
        this.m_leftFixedSection.RollbackLayout(),
        this.m_scrollingSection.RollbackLayout(),
        this.m_rightFixedSection.RollbackLayout() );
    }

    public SetColumns( leftFixedLayout: ILayout, scrollableColumns: ILayout, rightFixedColumns: ILayout ): void
    {
      this.ApplyLayoutUpdateResult(
        this.m_leftFixedSection.SetLayout( leftFixedLayout ),
        this.m_scrollingSection.SetLayout( scrollableColumns ),
        this.m_rightFixedSection.SetLayout( rightFixedColumns ) );
    }

    private except<T>(arr1: T[], arr2: T[]): T[] {
        var r = [];
        var c: any;
        for (var i = 0, len = arr1.length; i < len; i++) {
            c = arr1[i];
            if (arr2.indexOf(c) < 0)
                r.push(c);
        }
        return r;
    }

    private ApplyLayoutUpdateResult( 
      left: LayoutUpdateResult, 
      scrollable: LayoutUpdateResult, 
      right: LayoutUpdateResult ): void
    {
        var added: IEnumerable<ILayoutElement>;
        added = scrollable.AddedElements;
        added = this.Union(added,right.AddedElements);
        added = this.Union(added,left.AddedElements);

        var removed: IEnumerable<ILayoutElement> = scrollable.RemovedElements;
        removed = this.Union(removed,right.RemovedElements );
        removed = this.Union(removed,left.RemovedElements );

        IEnumerable_.toArray(removed).forEach(element => {
            this.ReleaseElement( element );
        });

        this.except(nullstone.IEnumerable_.toArray(added),nullstone.IEnumerable_.toArray(removed)).forEach(element => {
            this.ReleaseElement( element );
        });

    }

    private Union<T>(ie1: IEnumerable<T>,ie2: IEnumerable<T>): IEnumerable<T>{
        var resultArray = new Array<T>();
        var array1 = IEnumerable_.toArray(ie1);
        var array2 = IEnumerable_.toArray(ie2);

        return IEnumerable_.fromArray(resultArray);
    }

    public GetViewportInfo(availableSize: Size): ViewportInfo
    {
      var leftMeasure: Size = this.m_leftFixedSection.Layout.DesiredSize;
      var rightMeasure: Size = this.m_rightFixedSection.Layout.DesiredSize;

      var availableWidth: number = availableSize.width;
      availableWidth -= this.ColumnElementsIndent;
      availableWidth -= ( leftMeasure.width + rightMeasure.width );
      availableSize.width = Math.max( 0, availableWidth );
      return this.m_scrollingSection.Layout.GetViewportInfo( new Rect( 0, 0, availableSize.width, availableSize.height ) );
    }

    public Measure(availableSize: Size ): Size
    {
      availableSize.width = Math.max(0, availableSize.width - this.ColumnElementsIndent);
      var leftMeasure: Size = this.m_leftFixedSection.Layout.MeasurePanel( availableSize );
      var rightMeasure: Size = this.m_rightFixedSection.Layout.MeasurePanel( availableSize );

      availableSize.width -= (leftMeasure.width + rightMeasure.width);
      availableSize.width = Math.max(0, availableSize.width);
      var scrollableMeasure: Size =  this.m_scrollingSection.Layout.MeasurePanel( availableSize );

      scrollableMeasure.width += ( leftMeasure.width + rightMeasure.width );
      scrollableMeasure.width += this.ColumnElementsIndent;

      return scrollableMeasure;
    }


    public Arrange(finalSize: Size, parameters: LayoutParameters ): void
    {

      var leftDesiredSize: Size = this.m_leftFixedSection.Layout.DesiredSize;
      var rightDesiredSize: Size = this.m_rightFixedSection.Layout.DesiredSize;

      this.m_leftFixedSection.Layout.ArrangePanel( leftDesiredSize, parameters );
      this.m_rightFixedSection.Layout.ArrangePanel( rightDesiredSize, parameters );

      var finalWidth: number = finalSize.width;
      finalWidth -= this.ColumnElementsIndent;
      finalWidth -= leftDesiredSize.width;
      finalWidth -= rightDesiredSize.width;
      finalSize.width = Math.max( 0, finalWidth );
      finalSize.height = 0;

      this.m_scrollingSection.Layout.ArrangePanel( finalSize, parameters );
    }

    public EndTransition(): void
    {
      this.m_leftFixedSection.EndTransition();
      this.m_rightFixedSection.EndTransition();
      this.m_scrollingSection.EndTransition();
    }
    /*
    TryGetElement(column: Column, columnContainer: ColumnContainer ):boolean
    {
      return this.ChildrenManager.TryGetElement( column,columnContainer );
    }
    
    internal bool TryGetRecycledElement( Column column, Column exceptionColumn, out ColumnContainer columnContainer )
    {
      return this.ChildrenManager.TryGetRecycledElement( column, exceptionColumn, out columnContainer );
    }
    */
    RemoveElement(element: ColumnContainer ): void
    {
      element.LastArrangeRect = null;
      this.ChildrenManager.Remove( element );
    }

    RecycleElement(element: ColumnContainer): void
    {
      element.LastArrangeRect = null;
      this.ChildrenManager.Recycle( element );
    }

    validatePanelMeasure(): void
    {
      this.m_columnPanelOwner.InvalidatePanelMeasure();
    }

    InvalidatePanelArrange(): void
    {
      this.m_columnPanelOwner.InvalidatePanelArrange();
    }

    AddElement(element: ILayoutElement ): void
    {
      var column: ColumnContainer = <ColumnContainer>element;
      this.ChildrenManager.Add( column );
      this.m_columnPanelOwner.OnColumnAdded( column );
    }

    ReleaseElement(element: ILayoutElement): void
    {
      var column = <ColumnContainer>element;
      // We do not remove the column yet. We let the DataGrid handle the
      // recycling logic.
      this.m_columnPanelOwner.OnColumnRemoved( column );
    }

    private m_childrenManager: ChildrenManager<ColumnContainer>;//null
    private m_columnPanelOwner: IColumnPanelOwner;
    private m_children: ICollection<ColumnContainer>;

    private m_leftFixedSection: ColumnInnerPanel;
    private m_rightFixedSection: ColumnInnerPanel;
    private m_scrollingSection: ColumnInnerPanel;
    }
}