module Fayde.Controls {
    import ILayoutElement = Fayde.Controls.ILayoutElement;
    import IEnumerable = nullstone.IEnumerable;
    export class LayoutUpdateResult
    {
        static get Empty():LayoutUpdateResult{
            return new LayoutUpdateResult( new ILayoutElement[ 0 ], new ILayoutElement[ 0 ] );
        } 

        constructor(addedElements: IEnumerable<ILayoutElement>,removedElements: IEnumerable<ILayoutElement> )
        {
            this.RemovedElements = removedElements;
            this.AddedElements = addedElements;
        }

        public RemovedElements: IEnumerable<ILayoutElement>;

        public  AddedElements: IEnumerable<ILayoutElement>;
    }
}