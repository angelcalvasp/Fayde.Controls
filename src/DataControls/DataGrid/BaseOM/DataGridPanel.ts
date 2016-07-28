/// <reference path="../CoreUI/IColumnPanelOwner" />
/// <reference path="../Events/IDataGridRoutedEventElement" />
/// <reference path="../Visitors/IVisitorElement" />

import IDataGridRoutedEventElement = Fayde.Controls.IDataGridRoutedEventElement;
import IColumnPanelOwner = Fayde.Controls.IColumnPanelOwner;
module Fayde.Controls {
    import IColumnPanelOwner = Fayde.Controls.IColumnPanelOwner;
    import IDataGridRoutedEventElement = Fayde.Controls.IDataGridRoutedEventElement;
    import IVisitorElement = Fayde.Controls.IVisitorElement;
    import IEnumerable = nullstone.IEnumerable;
    import IColumnElementHost = Fayde.Controls.IColumnElementHost;
    import IEnumerable_ = nullstone.IEnumerable_;
    import LayoutParameters = Fayde.Controls.LayoutParameters;
    import ICollection = nullstone.ICollection;
    
    export class DataGridPanel extends Panel 
    implements IColumnPanelOwner, 
    IDataGridRoutedEventElement,
    IVisitorElement 
    {

      public static ColumnAdded: DataGridRoutedEvent;
      public static ColumnRemoved: DataGridRoutedEvent;

      constructor()
      {
          super();
          this.m_eventHelper = new DataGridEventHelper(this);
          this.m_columnPanel = new ColumnPanel(this);
          this.Children.Add( new RootHost() );
      }

      get RenderedColumns(): IEnumerable<ColumnContainer>{
          return this.ColumnPanel.RenderedColumns;
      }




      get AllColumns(): IEnumerable<ColumnContainer>{
          return this.ColumnPanel.AllColumns;
      }

      public get ColumnPanel(): ColumnPanel{
          return this.m_columnPanel;
      }

      public get EventManager(): DataGridEventHelper{
          return this.m_eventHelper;
      }


      private m_eventHelper: DataGridEventHelper;

      public get RootHost(): RootHost {
          return <RootHost>this.Children[ this.RootContainerIndex ];
      }

      public get FixedHeaders(): IEnumerable<UIElement>{


          return this.Take(CompatibilityUtils.GetEnumerable(this.Children),this.RootContainerIndex);
          //return .Take( this.RootContainerIndex );
      }

      public get FixedFooters(): IEnumerable<UIElement>{
            return this.Skip(CompatibilityUtils.GetEnumerable(this.Children),this.RootContainerIndex + 1 );
          /*
          return CompatibilityUtils.GetEnumerable(this.Children)
              .Skip( this.RootContainerIndex + 1 );*/
      }

      public get RootContainerIndex(): number {
          for(var i=0;i<this.Children.Count;i++)
          {
              if( this.Children[i] instanceof RootHost )
              return i;
          }

          throw new Error();
      }

      private Take(items: IEnumerable<UIElement>,take: number): IEnumerable<UIElement>{
          var array = IEnumerable_.toArray(items);
          var result = new Array<UIElement>();
            for (var i = 0;i<take;i++){
                if(i >= array.length){
                    break;
                }else{
                    result.push(array[i])
                }

            }

            return IEnumerable_.fromArray(result);
      }

        private Skip(items: IEnumerable<UIElement>,skip: number): IEnumerable<UIElement>{
            var array = IEnumerable_.toArray(items);
            var result = new Array<UIElement>();
            for (var i = 0;i<array.length;i++){
                if(i>= skip){
                    result.push(array[i])
                }

            }

            return IEnumerable_.fromArray(result);
        }


      PendingTransitionContext: TransitionContext;


        public get CoumnElementHosts(): IEnumerable<IColumnElementHost>{
            var visitor: ColumnElementHostExtractorVisitor = new ColumnElementHostExtractorVisitor();
            this.Accept( visitor );
            // Do not return the visitor.Host collection. We want the returned IEnumerable
            // to be dynamic and recalculated on each enumration.
            var result = new Array<IColumnElementHost>();

            IEnumerable_.toArray(visitor.Hosts).forEach(host => {
                result.push(host);
            });

            return IEnumerable_.toArray(host);
        }


        private get ColumnPanelMeasureManager(){
            return <IManageColumnsMeasure>this.GetElementOrParentBase<IManageColumnsMeasure>();
        }

        UnconstrainedStateChanged: EventHandler ;

        private OnUnconstrainedStateChanged(): void
        {
          if( this.UnconstrainedStateChanged != null )
          {
            this.UnconstrainedStateChanged( this, null);
          }
        }


        protected MeasureOverride(availableSize: Size): Size
        {

          if(Number.POSITIVE_INFINITY == availableSize.width  || Number.NaN == availableSize.width)
          {
              this.OnUnconstrainedStateChanged();

              //Temporary value for design time purpose.
              availableSize.width = 640;
          }

          if(Number.POSITIVE_INFINITY == availableSize.height || Number.NaN == availableSize.height)
          {
              this.OnUnconstrainedStateChanged();

                //Temporary value for design time purpose.
                availableSize.height = 480;
          }

          var columnPanelWidth: number = this.ColumnPanelMeasureManager.OnMeasureOverride( availableSize ).Width;

          //Invalidate the measure of all the column element hosts in order
          //to have the cells not clipped when the ColumnWidth changes.
          this.InvalidateColumnHostsMeasure();

          var measuredSize: Size = new Size( Math.min( columnPanelWidth, availableSize.width) , 0 );
          var rootContainerIndex: number = this.RootContainerIndex;

            var measureChild: ((n:number)=>void) = (i) =>
              {
                var child: UIElement = this.Children[ i ];
                child.Measure( availableSize );
                availableSize.height = Math.max( 0, availableSize.height - child.DesiredSize.height );
                measuredSize.height += child.DesiredSize.height;
              };

              //Measure FixedHeaders
              for(var i = 0; i < rootContainerIndex; i++ )
              {
                measureChild( i );
              }

              //Measure FixedFooters
              for( var i = rootContainerIndex+1; i < this.Children.Count; i++ )
              {
                measureChild( i );
              }

            rootContainer: RootHost = <RootHost>this.Children[ rootContainerIndex ];

          //Measure the RootContainer
          rootContainer.Measure( availableSize );

          var containerSize: Size = rootContainer.DesiredSize;
          measuredSize.height += Math.Min( availableSize.height, containerSize.Height );

          return measuredSize;
        }



        protected ArrangeOverride(finalSize: Size): Size
        {
          var rootContainerIndex: number = this.RootContainerIndex;

          this.m_columnPanel.Arrange( finalSize, new LayoutParameters( this.PendingTransitionContext ) );
          this.PendingTransitionContext = null;

          //Invalidte the arrange of all the column elements hosts in order
          //to have the cells layouted
          this.InvalidateColumnHostsArrange();

          var headersArrangeHeight: number = 0;
          var footersArrangeHeight: number = 0;
          var finalRect = new Rect( new Point( 0, 0 ), finalSize );
          for(var i = 0; i < rootContainerIndex; i++ )
          {
            var child: UIElement = this.Children[ i ];
            finalRect.height = child.DesiredSize.height;
            child.Arrange( finalRect );
            finalRect.Y += finalRect.height;
            headersArrangeHeight += finalRect.height;
          }

          finalRect = new Rect( new Point( 0, finalSize.height ), finalSize );
          for(var i = this.Children.Count - 1; i > rootContainerIndex; i-- )
          {
            var child: UIElement = this.Children[ i ];
            finalRect.height = child.DesiredSize.height;
            finalRect.y -= finalRect.height;
            child.Arrange( finalRect );
            footersArrangeHeight += finalRect.height;
          }


          finalRect = new Rect( 0,
            headersArrangeHeight,
            finalSize.width,
            Math.max( 0, finalSize.height - headersArrangeHeight - footersArrangeHeight ));

          this.Children[rootContainerIndex].Arrange( finalRect );

          return finalSize;
        }

        Accept(visitor: IVisitor): void
        {
          visitor.Visit(this);
        }

        EndTransition(): void
        {
          this.ColumnPanel.EndTransition();

          this.InvalidateColumnHostsArrange();
        }

        SetHeadersFooters(headers: ICollection<UIElement>,footers: ICollection<UIElement>): void
        {
          //Remove all but the RootContainer
          var rootContainerIndex: number = this.RootContainerIndex;
          var headersCount: number = this.RootContainerIndex;
          var footersCount: number = this.Children.Count - this.RootContainerIndex - 1;

          var updateHeaders: boolean = !this.FixedHeaders.SequenceEqual(headers);
          var updateFooters: boolean = !this.FixedFooters.SequenceEqual(footers);

          if(updateHeaders)
          {
            //Remove current headers
            for(var i=0;i<headersCount;i++)
            {
              this.Children.RemoveAt(0);
            }
            headersCount = 0;
          }

          if(updateFooters)
          {
            //Remove current footers
            for( var i = 0; i < footersCount; i++ )
            {
              this.Children.RemoveAt(headersCount + 1);
            }
          }

          if(updateHeaders)
          {
            for(var i=0;i<headers.Count;i++)
            {
              this.Children.Insert(i,headers[i]);
            }
          }

          if(updateFooters)
          {
            for(var i=0;i<footers.Count;i++)
            {
              this.Children.Add(footers[i]);
            }
          }
        }

        private InvalidateColumnHostsMeasure(): void
        {
            IEnumerable_.toArray(this.ColumnElementHosts).forEach((host)=>{
                host.InvalidateColumnMeasure();
            });
        }

        private InvalidateColumnHostsArrange(): void
        {
            IEnumerable_.toArray(this.ColumnElementHosts).forEach((host)=>{
                host.InvalidateColumnArrange();
            });

        }

        private OnColumnAdded(added: ColumnContainer): void
        {
          this.EventManager.RaiseEvent( DataGridPanel.ColumnAdded, new ColumnContainerEventArgs( this, added ) );
        }

        private OnColumnRemoved(removed: ColumnContainer): void
        {
          this.EventManager.RaiseEvent( DataGridPanel.ColumnRemoved, new ColumnContainerEventArgs( this, removed ) );
        }

        private InvalidatePanelMeasure(): void
        {
            this.InvalidateMeasure();
        }

        private InvalidatePanelArrange(): void
        {
            this.InvalidateArrange();
        }

        get EventManager() : DataGridEventHelper
        {
            return this.EventManager;
        }

        private m_columnPanel: ColumnPanel;

  }
}