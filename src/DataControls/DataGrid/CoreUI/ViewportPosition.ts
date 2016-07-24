module Fayde.Controls {
    export class ViewportPosition {
        public ViewportPosition( item: any,alignWithFirstEdge: boolean,offscreenLength: OffsetLength )
        {
            this.Item = item;
            this.AlignToFirstEdge = alignWithFirstEdge;
            this.OffscreenPositionLength = offscreenLength;
        }

        public Item: any;
        public AlignToFirstEdge: boolean;
        public AlignToLastEdge: boolean;
        public OffscreenPositionLength: OffsetLength;
    }
}