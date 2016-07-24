module Fayde.Controls {
    export class OffsetLength {
        public static get Zero():OffsetLength{
            return new OffsetLength( 0, true );
        }

        constructor(length: number,isPixels: boolean )
        {
            if( !isPixels )
            {
                if( length < -1 || length > 1 )
                throw new Error();
            }

            this.Length = length;
            this.IsPixels = isPixels;
        }

        public ConvertToPixels(elementLength: number ): number
        {
            if( elementLength < 0 )
                throw new Error("elementLength must be greater than zero." );

            return ( this.IsPixels )
                ? this.Length
                : ( this.Length * elementLength );
        }

        public Length: number;
        public IsPixels: boolean;
    }
}