module Fayde.Controls {
    import ICollection = nullstone.ICollection;
    import ObservableCollection = Fayde.Collections.ObservableCollection;
    export class ViewportInfo {
        constructor()
        {
            this.Elements = new ObservableCollection<ILayoutElement>();
        }

        public FirstElementOffscreenLength: number;

        public FirstElementLength: number;

        public LastElementOffscreenLength: number

        public LastElementLength: number;

        public Elements: ICollection<ILayoutElement>;

        public get FirstElement(): ILayoutElement{
            return ( this.Elements.Count > 0 ) ? this.Elements[ 0 ] : null;
        }

        public get LastElement(): ILayoutElement
        {
            return ( this.Elements.Count > 0 ) ? this.Elements[ this.Elements.Count - 1 ] : null;
        }

        public get FirstElementOffscreenPercentLength(): number
        {
            var ratio: number = this.FirstElementOffscreenLength / this.FirstElementLength;
            if(Number.NaN == ratio)
            return 0;

            return Math.min( 1, ratio );
        }

        public get LastElementOffscreenPercentLength():number
        {
            var ratio = this.LastElementOffscreenLength / this.LastElementLength;
            if(Number.NaN == ratio)
            return 0;

            return Math.min(1, ratio);
        }

        public get NbVisibleElements(): number
        {
            var count = 0;
            for( var i = 0; i < this.Elements.Count; i++ )
            {
                count += 1;
                var element: ILayoutElement = this.Elements[ i ];
                if( i == 0 )
                {
                    count -= this.FirstElementOffscreenPercentLength;
                }

                if( i == this.Elements.Count - 1 )
                {
                    count -= this.LastElementOffscreenPercentLength;
                }
            }
            return count;
        }

        public GetCurrentElementReference(first: boolean): any
        {
            var itemCount = this.Elements.Count;

            if( itemCount == 0 )
                return null;

            if( itemCount <= 2 )
                return (first) ? this.FirstElement.ReferenceItem : this.LastElement.ReferenceItem;

            return this.GetUnitNavigationReference(first).ReferenceItem;
        }

        public GetPageNavigationReference( first: boolean ): ILayoutElement
        {
            return (first)
                    ? this.FirstElement
                    : this.LastElement;
        }


        public  GetUnitNavigationReference(first: boolean ): ILayoutElement
        {
            var referenceElement: ILayoutElement = null;
            var itemCount = this.Elements.Count;

            if( itemCount > 0 )
            {
                var limitIndex: number;
                var secLimitIndex: number;
                var offscreenLength: number;

                    if( first )
                    {
                        limitIndex = 0;
                        secLimitIndex = 1;
                        offscreenLength = this.FirstElementOffscreenLength;
                    }
                    else
                    {
                        limitIndex = ( itemCount - 1 );
                        secLimitIndex = ( itemCount - 2 );
                        offscreenLength = this.LastElementOffscreenLength;
                    }

                    if( offscreenLength == 0 || itemCount == 1)
                    {
                        referenceElement = this.Elements[ limitIndex ];
                    }
                    else
                    {
                        referenceElement = this.Elements[ secLimitIndex ];
                    }
                }

                return referenceElement;
            }
    }
}