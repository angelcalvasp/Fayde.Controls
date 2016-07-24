/// <reference path="TransitionContext" />

module Fayde.Controls {
    import TransitionContext = Fayde.Controls.TransitionContext;
    export class LayoutParameters {
        LayoutParameters(transitionContext: TransitionContext)
        {
            this.TransitionContext = transitionContext;
        }

        TransitionContext: TransitionContext;
    }
}