/// <reference path="DataGridBindingInfo"/>
/// <reference path="ColumnElementsInnerHost"/>
module Fayde.Controls {

    import ColumnElementWrapper = Fayde.Controls.ColumnElementWrapper;
    import ColumnElementsInnerHost = Fayde.Controls.ColumnElementsInnerHost;

    export class ColumnElementsHost extends Panel {

    m_leftFixedPanel: ColumnElementsInnerHost  = new ColumnElementsInnerHost();
    m_rightFixedPanel: ColumnElementsInnerHost  = new ColumnElementsInnerHost();
    m_scrollablePanel: ColumnElementsInnerHost  = new ColumnElementsInnerHost();

    constructor()
    {
        super();
        //DataGridBehaviors.SetClipElement( this, true );
        this.Children.Add( this.m_leftFixedPanel );
        this.Children.Add( this.m_rightFixedPanel );
        this.Children.Add( this.m_scrollablePanel );
    }

    get Elements(): nullstone.IEnumerable<ColumnElementWrapper> {
        var elements = [];

        var array = nullstone.IEnumerable_.toArray(this.UIElements);

        array.forEach(element => {
            elements.push(<ColumnElementWrapper>element);
        });

        return <nullstone.IEnumerable<ColumnElementWrapper>>nullstone.IEnumerable_.fromArray(elements);
    }

    get CellsIndent():number {
        return this.m_leftFixedPanel.CellsIndent;
    }
    set CellsIndent(value:number) {
        this.m_leftFixedPanel.CellsIndent = value;
    }

    get UIElements(): nullstone.IEnumerable<UIElement> {
        var scrollable = nullstone.IEnumerable_.toArray(this.m_scrollablePanel.Children);
        var left = nullstone.IEnumerable_.toArray(this.m_leftFixedPanel.Children);
        var right = nullstone.IEnumerable_.toArray(this.m_rightFixedPanel.Children);

        var concat = scrollable.concat(left);
        concat = concat.concat(right);

        return nullstone.IEnumerable_.fromArray(concat);
    }

    TransfertCells(cellsHost: ColumnElementsHost):void
    {
      cellsHost.CellsIndent = this.CellsIndent;
      this.TransferCells( this.m_leftFixedPanel, cellsHost.m_leftFixedPanel );
      this.TransferCells( this.m_rightFixedPanel, cellsHost.m_rightFixedPanel );
      this.TransferCells( this.m_scrollablePanel, cellsHost.m_scrollablePanel );
    }

    TransferCells(fromPanel: ColumnElementsInnerHost,toPanel: ColumnElementsInnerHost )
    {
        var cells = fromPanel.Children;

        fromPanel.Children.Clear();
        for (var index = 0; index < cells.Count; index++) {
            var cell = cells.GetValueAt(index);
            toPanel.Children.Add( cell );
        }

    }

    AddColumnElement(element: ColumnElementWrapper ): void
    {
      var position = element.ColumnElement.ParentColumnContainer.ColumnPosition;

      var castedElement = <UIElement>(<any>element);

      if( position == ColumnPosition.Scrollable )
      {
        this.m_scrollablePanel.Children.Add( castedElement );
      }
      else if( position == ColumnPosition.LeftFixed )
      {
        this.m_leftFixedPanel.Children.Add( castedElement );
      }
      else
      {
        this.m_rightFixedPanel.Children.Add( castedElement );
      }
    }

    RemoveColumnElement(element: ColumnElementWrapper ): void
    {

        var castedElement = <UIElement>(<any>element)

        if( ! (this.m_scrollablePanel.Children.Remove(castedElement)))
        {
            if( !(this.m_leftFixedPanel.Children.Remove(castedElement)))
            {
                this.m_rightFixedPanel.Children.Remove(castedElement);
            }
        }
    }

    SetElementPosition(element: ColumnElementWrapper,position: ColumnPosition): void
    {
        if( position == ColumnPosition.Scrollable )
        {
            this.SetElementPanel( element, this.m_scrollablePanel, this.m_leftFixedPanel, this.m_rightFixedPanel );

        }
        else if( position == ColumnPosition.LeftFixed )
        {
            this.SetElementPanel( element, this.m_leftFixedPanel, this.m_scrollablePanel, this.m_rightFixedPanel );
        }
        else 
        {
            this.SetElementPanel( element, this.m_rightFixedPanel, this.m_scrollablePanel, this.m_leftFixedPanel );
        }
    }

    private SetElementPanel(element: ColumnElementWrapper,targetPanel: ColumnElementsInnerHost,otherPanel1: ColumnElementsInnerHost,otherPanel2: ColumnElementsInnerHost ): void
    {
        var sourcePanel: ColumnElementsInnerHost = null;

        var castedElement = <UIElement>(<any>element)

        if( otherPanel1.Children.Remove(castedElement))
        {
            sourcePanel = otherPanel1;
        }
        else if(otherPanel2.Children.Remove(castedElement))
        {
            sourcePanel = otherPanel2;
        }

        if( sourcePanel != null )
        {
            targetPanel.Children.Add( castedElement );
        }
    }

    protected MeasureOverride(availableSize: Size): Size
    {
        this.m_leftFixedPanel.Measure( availableSize );
        this.m_rightFixedPanel.Measure( availableSize );
        this.m_scrollablePanel.Measure( availableSize );


        var leftSize = this.m_leftFixedPanel.DesiredSize;
        var rightSize = this.m_rightFixedPanel.DesiredSize;
        var scrollSize = this.m_scrollablePanel.DesiredSize;

        var height = 0;
        if(leftSize.height > rightSize.height){
            height = leftSize.height;
        }else{
            height = rightSize.height;
        }

        return new Size( 0, height );
    }


    protected ArrangeOverride(finalSize: Size): Size
    {
        var leftSize = this.m_leftFixedPanel.DesiredSize;
        var rightSize = this.m_rightFixedPanel.DesiredSize;
        var scrollSize = this.m_scrollablePanel.DesiredSize;
        var remainingWidth = finalSize.width;

        var leftWidth = 0;

        if(remainingWidth < leftSize.width){
            leftWidth = remainingWidth;
        }else{
            leftWidth = leftSize.width;
        }

        if(0 > (remainingWidth - leftWidth)){
            remainingWidth = 0;
        }else{
            remainingWidth = (remainingWidth - leftWidth);
        }

        var rightWidth = Math.min( remainingWidth, rightSize.width );
        remainingWidth = Math.max( 0, remainingWidth - rightWidth );

        var scrollWidth = Math.min( remainingWidth, scrollSize.width );

        this.m_leftFixedPanel.Arrange( new Rect( 0, 0, leftWidth, finalSize.height ) );
        this.m_rightFixedPanel.Arrange( new Rect( finalSize.width - rightWidth, 0, rightWidth, finalSize.height ) );
        this.m_scrollablePanel.Arrange( new Rect( leftWidth, 0, scrollWidth, finalSize.height ) );

      return finalSize;
    }

    InvalidateColumnArrange(): void
    {
      this.InvalidateArrange();
      this.m_leftFixedPanel.InvalidateArrange();
      this.m_rightFixedPanel.InvalidateArrange();
      this.m_scrollablePanel.InvalidateArrange();
    }

    InvalidateColumnMeasure(): void
    {
      this.InvalidateMeasure();
      this.m_leftFixedPanel.InvalidateMeasure();
      this.m_rightFixedPanel.InvalidateMeasure();
      this.m_scrollablePanel.InvalidateMeasure();
    }

    
  }
}