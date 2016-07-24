/// <reference path="CustomBorder"/>
/// <reference path="../CoreUI/IAnimatedLayoutElement"/>
/// <reference path="../CoreUI/IRecyclable"/>
/// <reference path="../Visitors/IVisitorElement"/>
module Fayde.Controls {
    import CustomBorder = Fayde.Controls.CustomBorder;
    import IAnimatedLayoutElement = Fayde.Controls.IAnimatedLayoutElement;
    import IRecyclable = Fayde.Controls.IRecyclable;
    import IVisitorElement = Fayde.Controls.IVisitorElement;
    export class WrapperBase extends CustomBorder implements IAnimatedLayoutElement, IRecyclable, IVisitorElement
    {
        static AnimationXProperty = DependencyProperty.Register("AnimationX", () => Number, WrapperBase, 0, (d, args) => (<WrapperBase>d).OnAnimationXChanged(args));
        static AnimationYProperty = DependencyProperty.Register("AnimationY", () => Number, WrapperBase, 0, (d, args) => (<WrapperBase>d).OnAnimationYChanged(args));

        constructor( child: UIElement )
        {
            super();

            this.Child = child;
            this.RenderTransform = new TranslateTransform();
        }

        public ReferenceItem: any;

        public LastArrangeRect: Rect;

        public AnimationX: number;

        public AnimationY: number;

        Projection: Media.Projection;

        public get IsRecycled():boolean {return this.Visibility == Visibility.Collapsed;}
        public set IsRecycled(value:boolean):void{
            if( this.IsRecycled != value )
            {
            this.Visibility = (value) ? Visibility.Collapsed: Visibility.Visible;
            }
        }

        public get RecycleKey():any {return this.Child;}

        private get TranslateTransform():Media.TranslateTransform{
            return <TranslateTransform>this.RenderTransform;
        }


        CalculatePositionX(): number
        {
            return this.AnimationX;
        }

        CalculatePositionY(): number
        {
        return this.AnimationY;
        }

        UpdatePositionX(): void
        {
            this.TranslateTransform.X = this.CalculatePositionX();
        }

        UpdatePositionY(): void
        {
            this.TranslateTransform.Y = this.CalculatePositionY();
        }

        

        private OnAnimationXChanged(args: IDependencyPropertyChangedEventArgs ):void 
        {
            this.UpdatePositionX();
        }

        private OnAnimationYChanged(args: IDependencyPropertyChangedEventArgs ):void
        {
            this.UpdatePositionY();
        }

        public PrepareBitmapCache(): void
        {
        }

        public ClearBitmapCache(): void
        {
        }

        

        LayoutMeasure(availableSize: Size ): void
        {
            this.Measure(availableSize);
        }

        LayoutArrange(parameters: ArrangeParameters ): void
        {
            var arrangeRect = parameters.ArrangePosition;

            if( parameters.LayoutParameters != null )
            {
                LayoutTransitionHelper.ArrangeAnimation( this, parameters.LayoutParameters.TransitionContext, parameters.ArrangePosition );
            }

            this.LastArrangeRect = arrangeRect;

            if( !(Number.NaN != this.Width) )
            {
                arrangeRect.Width =  this.Width;
            }

            if( !(this.Height == Number.NaN  ) )
            {
                arrangeRect.Height =  this.Height;
            }

            this.Arrange( arrangeRect );
        }

        Accept(visitor: IVisitor ): void
        {
            visitor.Visit( this );
        }

        Measure(availableSize: Size ): void
        {
            this.LayoutMeasure( availableSize );
        }


        Arrange( parameters: Rect ): void
        {
            this.LayoutArrange(parameters);
        }

    }
}