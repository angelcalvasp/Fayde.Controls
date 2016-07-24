/// <reference path="ArrangeLimit"/>
/// <reference path="OffsetLimits"/>
/// <reference path="LayoutParameters"/>

module Fayde.Controls {

    import ArrangeLimit = Fayde.Controls.ArrangeLimit;
    import OffsetLimits = Fayde.Controls.OffsetLimits;
    import LayoutParameters = Fayde.Controls.LayoutParameters;

    export class ArrangeParameters {

        constructor(arrangePosition: Rect,layoutParams: LayoutParameters);
        constructor(arrangePosition: Rect,visibleBounds: Rect,layoutParams: LayoutParameters);
        constructor(arrangePosition: Rect,visibleBounds: Rect,visualArrangeLimits: ArrangeLimit,offsetLimits: OffsetLimits,layoutParams: LayoutParameters )
        constructor(arrangePosition?: Rect,visibleBounds?: Rect,visualArrangeLimits?: ArrangeLimit,offsetLimits?: OffsetLimits,layoutParams?: LayoutParameters )
        {
            this.VisibleBounds = visibleBounds;
            this.ArrangePosition = arrangePosition;
            this.VisualArrangeLimits = visualArrangeLimits;
            this.OffsetLimits = offsetLimits;
            this.LayoutParameters = layoutParams;
        }

        public ArrangePosition: Rect;
        public VisualArrangeLimits: ArrangeLimit;
        public VisibleBounds: Rect;
        public OffsetLimits: OffsetLimits;
        public LayoutParameters: LayoutParameters;
    }
}