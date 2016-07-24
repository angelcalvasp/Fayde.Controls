module Fayde.Controls {
    import EasingFunctionBase = Fayde.Media.Animation.EasingFunctionBase;
    import Storyboard = Fayde.Media.Animation.Storyboard;
    import IEasingFunction = Fayde.Media.Animation.IEasingFunction;
    export class TransitionContext {
        constructor(storyboard: Storyboard,ease: EasingFunctionBase)
        {
            this.Storyboard = storyboard;
            this.EasingFunction = ease;
            this.StoryboardStarted = false;
        }

        StoryboardStarted: boolean;

        get CurrentTime(): number {
            if( !this.StoryboardStarted )
                return 0;

            return this.Storyboard.GetCurrentTime().TotalMilliseconds;
        }

        get TotalTime(): number {
            return this.Storyboard.Duration.TimeSpan.TotalMilliseconds;
        }

        get Duration(): Duration {
            return this.Storyboard.Duration;
        }

        set Duration(value: Duration){
            this.Storyboard.Duration = value;
        }

        EasingFunction: IEasingFunction;

        Storyboard: Storyboard;



        public StartStoryboard(): void
        {
            if(!this.StoryboardStarted )
            {
                this.StoryboardStarted = true;
                this.Storyboard.Begin();
            }
            
        }
    }
}