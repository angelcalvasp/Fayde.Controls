/// <reference path="../CoreUI/LayoutTransitionHelper" />
/// <reference path="IAnimatedLayoutElement" />
///// <reference path="TransitionContext" />


module Fayde.Controls {
    import IAnimatedLayoutElement = Fayde.Controls.IAnimatedLayoutElement;
    import TransitionContext = Fayde.Controls.TransitionContext;
    import DoubleAnimation = Fayde.Media.Animation.DoubleAnimation;
    import FillBehavior = Fayde.Media.Animation.FillBehavior;
    import PropertyPath = Fayde.Data.PropertyPath;
    import Timeline = Fayde.Media.Animation.Timeline;
    import Storyboard = Fayde.Media.Animation.Storyboard;
    export class LayoutTransitionHelper {
        private static get CachedTranslationDistance():number{
            return 70;
        }

        private static IsAlmostEqual(a: number, b: number ): boolean
        {
            return ( Math.abs( <number>( a - b ) ) < 1E-07 );
        }

        public static InitializeTransition(element: IAnimatedLayoutElement,arrangeContext: TransitionContext ): void
        {
            
        }

        public static EndTransition(element: IAnimatedLayoutElement): void
        {
            element.AnimationX = 0;
            element.AnimationY = 0;
            element.Projection = null;
            element.Height = Number.NaN;
            element.Width = Number.NaN;
            element.Opacity = 1.0;
            element.ClearBitmapCache();
        }

        public static ArrangeAnimation(element: IAnimatedLayoutElement,transitionContext: TransitionContext,currentRect: Rect): void
        {
            this.ArrangeAnimationBase( element, transitionContext, currentRect, Orientation.Vertical );
            this.ArrangeAnimationBase( element, transitionContext, currentRect, Orientation.Horizontal );
        }

        private static ArrangeAnimationBase(element: IAnimatedLayoutElement,transitionContext: TransitionContext,currentRect: Rect,orientation: Orientation): void
        {
            if( element.LastArrangeRect != null && transitionContext != null && transitionContext.Storyboard != null )
            {
                var storyboard: Storyboard = transitionContext.Storyboard;
                var previousLayout: Rect = element.LastArrangeRect;

                var axis: String;
                var dimension: String;
                var previousRange: LayoutRange = previousLayout.GetOrientedRange( orientation );
                var currentRange: LayoutRange = currentRect.GetOrientedRange( orientation );

                if( orientation == Orientation.Vertical )
                {
                    axis = "Y";
                    dimension = "Height";
                }
                else
                {
                    axis = "X";
                    dimension = "Width";
                }

                var needTranslate = !LayoutTransitionHelper.IsAlmostEqual( previousRange.Offset, currentRange.Offset );
                var needResize = !LayoutTransitionHelper.IsAlmostEqual( previousRange.Length, currentRange.Length );
                if( needTranslate )
                {
                    var TranslateAnim: DoubleAnimation = this.CreatePositionAnimation( transitionContext, element, previousRange.Offset, currentRange.Offset, axis );
                    element.SetOrientedAnimationPosition( TranslateAnim.From, orientation );
                    storyboard.Children.Add( TranslateAnim );

                    if(!needResize && Math.abs( currentRange.Offset - previousRange.Offset ) > LayoutTransitionHelper.CachedTranslationDistance )
                    {
                        element.PrepareBitmapCache();
                    }
                }

                if(needResize)
                {
                    var lengthAnimation: DoubleAnimation = this.CreateSizeAnimation( transitionContext, element, previousRange.Length, currentRange.Length, dimension );
                    element.SetOrientedLength( lengthAnimation.From, orientation );
                    storyboard.Children.Add( lengthAnimation );
                }
            }
        }

        private static CreatePositionAnimation(context: TransitionContext,element: ILayoutElement,previousPosition: number,currentPosition: number,axis: string ): DoubleAnimation
        {
            var positionAnimation: DoubleAnimation = null;
            var positionDelta: number = previousPosition - currentPosition;
            positionAnimation = new DoubleAnimation();
            positionAnimation.Duration = context.Duration;
            positionAnimation.EasingFunction = context.EasingFunction;
            positionAnimation.From = positionDelta;
            positionAnimation.To = 0.0;
            positionAnimation.FillBehavior = FillBehavior.HoldEnd;
            //Debug.WriteLine( "Position for={0} axis={1}, from={2}, to={3}", element, axis, positionDelta, 0 );


            Storyboard.SetTarget( positionAnimation, <DependencyObject>element );
            Storyboard.SetTargetProperty( positionAnimation, new PropertyPath( "Animation"+ axis, new Object[ 0 ] ) );

            return positionAnimation;
        }

        private static CreateSizeAnimation(context: TransitionContext,element: ILayoutElement,previousSize: number,currentSize: number, propertyName: string ): DoubleAnimation
        {
            var sizeAnimation: DoubleAnimation = null;

            sizeAnimation = new DoubleAnimation();
            sizeAnimation.Duration = context.Duration;
            sizeAnimation.EasingFunction = context.EasingFunction;
            sizeAnimation.From = previousSize;
            sizeAnimation.To = currentSize;
            sizeAnimation.FillBehavior = FillBehavior.HoldEnd;
            Storyboard.SetTarget( sizeAnimation, <DependencyObject>element );
            Storyboard.SetTargetProperty( sizeAnimation, new PropertyPath( propertyName, new Object[ 0 ] ) );

            return sizeAnimation;
        }

        private static CreateOpacityAnimation(context: TransitionContext,element: DependencyObject ): DoubleAnimation
        {
            var opacityAnimation: DoubleAnimation = new DoubleAnimation();
            opacityAnimation.Duration = context.Duration;
            opacityAnimation.EasingFunction = context.EasingFunction;
            Storyboard.SetTargetProperty( opacityAnimation, new PropertyPath( "Opacity", new Object[ 0 ] ) );
            Storyboard.SetTarget( opacityAnimation, element );
            return opacityAnimation;
        }


        public static SetAddAnimationForItem(context: TransitionContext,element: IAnimatedLayoutElement): void
        {
            var addAnimation: Timeline = this.CreateAddAnimationsForItem( context, element, Orientation.Vertical );
            context.Storyboard.Children.Add( addAnimation );
        }

        public static SetRemoveAnimationForItem(context: TransitionContext, element: IAnimatedLayoutElement): void
        {
            var addAnimation: Timeline = this.CreateRemoveAnimationsForItem( context, element, Orientation.Vertical );
            context.Storyboard.Children.Add( addAnimation );
        }

        public static CreateAddAnimationsForItem(context: TransitionContext, element: IAnimatedLayoutElement, orientation: Orientation): Timeline
        {
            var addAnimation: DoubleAnimation = this.CreateOpacityAnimation( context, <DependencyObject>element );
            addAnimation.From = 0;
            addAnimation.To = 1;
            return addAnimation;
        }

        public static CreateRemoveAnimationsForItem(context: TransitionContext,element: IAnimatedLayoutElement,orientation: Orientation): Timeline
        {
            var removeAnimation: DoubleAnimation = this.CreateOpacityAnimation( context, <DependencyObject>element );
            removeAnimation.From = 1;
            removeAnimation.To = 0;
            return removeAnimation;
        }
    }
}