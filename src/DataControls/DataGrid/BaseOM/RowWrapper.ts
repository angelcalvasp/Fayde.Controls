module Fayde.Controls {
    export class RowWrapper extends Fayde.Controls.WrapperBase{

        constructor(child: Row){
            super(child);

        }


        public get ReferenceItem():any {
            return this.Row.Path;
        }

        public get Row(): Row{
            return <Row>this.Child;
        }

        public get RecycleKey(): any{
            return this.Row.Path;
        }



        public PrepareBitmapCache(): void
        {
            (<UIElement>this).CacheMode = new BitmapCache();
        }

        public ClearBitmapCache(): void
        {
            (<UIElement>this).CacheMode = null;
        }

        internal override void Accept(IVisitor visitor)
        {
            visitor.Visit(this);
        }
    }
}