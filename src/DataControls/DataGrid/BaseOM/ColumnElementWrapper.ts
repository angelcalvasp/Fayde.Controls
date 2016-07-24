/// <reference path="WrapperBase"/>
module Fayde.Controls {
    import WrapperBase = Fayde.Controls.WrapperBase;
    import Size = minerva.Size;
    export class ColumnElementWrapper extends WrapperBase {

        constructor(child: UIElement){
            super(child);

        }

        public get ColumnOffset():number {return this.m_offset;}
        public set ColumnOffset(value: number){
            if( this.m_offset != value )
            {
                this.m_offset = value;
            }
        }

        public get ColumnWidth():number {return this.m_width;}
        public set ColumnWidth(value: number){
            if( this.m_width != value )
            {
                this.m_width = value;
            }
        }



        public get ColumnElement(): IColumnElement{
            return <IColumnElement>(<any>this.Child);
        }

        public get Column(): Column{
            return this.ColumnElement.ParentColumnContainer.Column; 
        }

        protected MeasureOverride( availableSize: Size ): Size
        {
            var measureSize = super.MeasureOverride( availableSize );
            measureSize.width = 0;
            return measureSize;
        }

        private m_offset: number;
        private m_width: number;
    }
}