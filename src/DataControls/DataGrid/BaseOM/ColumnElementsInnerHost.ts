/// <reference path="ColumnElementsInnerHost"/>
/// <reference path="../CoreUI/ILayoutElement"/>
module Fayde.Controls {

    import ColumnElementWrapper = Fayde.Controls.ColumnElementWrapper;
    import ILayoutElement = Fayde.Controls.ILayoutElement;

    export class ColumnElementsInnerHost extends Panel {

    private m_cellsIndent: number;

    public constructor()
    {
        super();
        //DataGridBehaviors.SetClipElement( this, true );
    }

    public get CellsIndent():number {
        return this.m_cellsIndent;
    }
    public set CellsIndent(value: number){
        if( this.m_cellsIndent != value )
        {
          this.m_cellsIndent = value;
          this.InvalidateMeasure();
        }
    }


    protected MeasureOverride(availableSize: Size): Size
    {
        var desiredHeight = 0;
        var desiredWidth = this.CellsIndent;

        for (var index = 0; index < this.Children.Count; index++) {
                var child = this.Children.GetValueAt(index);
                var colElement = <ColumnElementWrapper>(<any>child);
                if( !colElement.IsRecycled )
                {
                    availableSize.width = colElement.ColumnWidth;
                    desiredWidth += colElement.ColumnWidth;
                    //Must call measure for all UI elements anyway.
                    child.Measure( availableSize );

                    if(desiredHeight > child.DesiredSize.height){
                        desiredHeight = desiredHeight;
                    }else{
                        desiredHeight = child.DesiredSize.height;
                    }
                }
            
        }


        return new Size( desiredWidth, desiredHeight );      
    }



    protected ArrangeOverride(finalSize: Size): Size
    {
        var indent = this.CellsIndent;

        for (var index = 0; index < this.Children.Count; index++) {
            var element = this.Children.GetValueAt(index);
            var colElement = <ColumnElementWrapper>(<any>element);
            if( !colElement.IsRecycled )
            {
                var r = new Rect( colElement.ColumnOffset + indent, 0, colElement.ColumnWidth, finalSize.height );

                (<ILayoutElement> (<any>colElement)).Arrange(new ArrangeParameters(r, null));
            }    
        }

        return finalSize;
    }

    
  }
}