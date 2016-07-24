module Fayde.Controls {
    export class LayoutRange {
        constructor(offset: number,length: number)
        {
            if( length < 0 )
                throw new Error();

            this.Offset = offset;
            this.Length = length;
        }


        public Offset: number;

        public Length: number;

        public Equals(obj: any ): boolean
        {
            var range: LayoutRange = obj as LayoutRange;
            if( range == null )
                return false;

            return ( this.Offset == range.Offset && this.Length == range.Length );
        }
    }
}