/// <reference path="../CoreUI/ILayoutContainer" />
/// <reference path="../CoreUI/LayoutUpdateResult" />
/// <reference path="../CoreUI/ILayout" />


module Fayde.Controls {
    import ILayoutContainer = Fayde.Controls.ILayoutContainer;
    import IEnumerable = nullstone.IEnumerable;
    import LayoutUpdateResult = Fayde.Controls.LayoutUpdateResult;
    import ILayout = Fayde.Controls.ILayout;
    import IEnumerable_ = nullstone.IEnumerable_;

    export class ColumnInnerPanel implements ILayoutContainer {

        private m_layout: ILayout;
        private m_previousLayout: ILayout;

        constructor()
        {
            this.m_layout = EmptyLayout.Instance;
        }

        get Layout(): ILayout {
            return this.m_layout;
        }

        private SetLayoutCore(oldLayout: ILayout,newLayout: ILayout): LayoutUpdateResult
        {
            if( oldLayout == null )
                throw new Error( "oldLayout" );

            if( newLayout == null )
                throw new Error( "newLayout" );

            var oldlayoutArray = IEnumerable_.toArray(oldLayout.Elements);
            var newlayoutArray = IEnumerable_.toArray(newLayout.Elements);

            var addedElements: IEnumerable<ILayoutElement> = Except(newlayoutArray,oldlayoutArray);
            var removedElements: IEnumerable<ILayoutElement> = Except(oldlayoutArray,newlayoutArray);

            return new LayoutUpdateResult( addedElements, removedElements );
        }

        private Except<T>(arr1: T[], arr2: T[]): T[] {
            var r = [];
            var c: any;
            for (var i = 0, len = arr1.length; i < len; i++) {
                c = arr1[i];
                if (arr2.indexOf(c) < 0)
                    r.push(c);
            }
            return r;
        }

      SetLayout(layout: ILayout ): LayoutUpdateResult
      {
        if( this.m_previousLayout != null )
          throw new Error();

        this.m_previousLayout = this.m_layout;
        this.m_layout = layout;

        return this.SetLayoutCore( this.m_previousLayout, this.m_layout );
      }

      CommitLayout(): void
      {
        this.m_previousLayout = null;
      }

      RollbackLayout(): LayoutUpdateResult
      {
        if( this.m_previousLayout == null )
          return LayoutUpdateResult.Empty;

        var result: LayoutUpdateResult = this.SetLayoutCore( this.m_layout, this.m_previousLayout );

        this.m_layout = this.m_previousLayout;
        this.m_previousLayout = null;

        return result;
      }

      EndTransition(): void
      {
        // Since the layout "EndTransition" call will remove
        // some columns that are rendered out-of-view, it is important
        // to clean up all the rendered elements first.
          var elementsArray = IEnumerable_.toArray(this.Layout.Elements);

          elementsArray.forEach(column => {
            LayoutTransitionHelper.EndTransition( column );
          });

      }

      public MeasureElement(element: ILayoutElement,availableSize: Size): void
      {
        element.Measure( availableSize );
      }

      public ArrangeElement(element: ILayoutElement,finalPosition: Rect,parameters: LayoutParameters): void
      {
        element.Arrange( new ArrangeParameters( finalPosition, parameters ) );
      }



    

    }
}