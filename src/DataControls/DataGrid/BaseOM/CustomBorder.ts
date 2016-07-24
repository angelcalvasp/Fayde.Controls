module Fayde.Controls {
    import Size = minerva.Size;
    export class CustomBorder extends Panel {

        static ChildProperty = DependencyProperty.Register("Child", () => FrameworkElement, CustomBorder);

        constructor(){
            super();

        }

        

        private m_child: UIElement;
        public get Child():UIElement{return this.m_child;}
        public set Child(value:UIElement){
            if( value == this.m_child )
                return;

                this.m_child = value;

                this.SetChildren();
        }


        private SetChildren(): void
        {
            if( this.m_child != null )
            {
                var count = this.Children.Count;

                if( count != 0 )
                {
                    this.Children[ 0 ] = this.m_child;
                }
                else
                {
                    this.Children.Add( this.m_child );
                }
            }
            else
            {
                this.Children.Clear();
            }
        }


        protected MeasureOverride(availableSize: Size ):Size
        {
            var child = this.Child;
            var desiredSize: Size;

            if( child != null )
            {
                child.Measure( availableSize );
                desiredSize = child.DesiredSize;
            }
            else
            {
                desiredSize = new Size(0,0);
            }

            return desiredSize;
        }

        protected ArrangeOverride(finalSize: Size): Size
        {
            var child = this.Child;

            if( child != null )
            {
                var point = new Point( 0, 0 );

                child.Arrange( new Rect(point.x,point.y, finalSize.width,finalSize.height ) );
            }

            return finalSize;
        }
    }

    Markup.Content(CustomBorder, CustomBorder.ChildProperty);

}