/// <reference path="../CoreUI/IAnimatedLayoutElement"/>
/// <reference path="../CoreUI/IRecyclable"/>
/// <reference path="ColumnElementWrapper"/>
/// <reference path="../Enum/ColumnPosition"/>
/// <reference path="Cell"/>
module Fayde.Controls {
    import IAnimatedLayoutElement = Fayde.Controls.IAnimatedLayoutElement;
    import IRecyclable = Fayde.Controls.IRecyclable;
    import ColumnElementWrapper = Fayde.Controls.ColumnElementWrapper;
    import ColumnPosition = Fayde.Controls.ColumnPosition;
    import Cell = Fayde.Controls.Cell;
    import ObservableCollection = Fayde.Collections.ObservableCollection;

    export class ColumnContainer extends DependencyObject implements IAnimatedLayoutElement,IRecyclable {
        static AnimationXProperty = DependencyProperty.Register("AnimationX", () => Number, ColumnContainer, 0, (d, args) => (<ColumnContainer>d).OnAnimationXChanged(d,args));
        static AnimationYProperty = DependencyProperty.Register("AnimationY", () => Number, ColumnContainer, 0, (d, args) => (<ColumnContainer>d).OnAnimationYChanged(d,args));
        static WidthProperty = DependencyProperty.Register("Width", () => Number, ColumnContainer, Number.NaN, (d, args) => (<ColumnContainer>d).OnWidthChanged(d,args));
        static OpacityProperty = DependencyProperty.Register("Opacity", () => Number, ColumnContainer, 1.0, (d, args) => (<ColumnContainer>d).OnOpacityChanged(d,args));
        static ProjectionProperty = DependencyProperty.Register("Projection", () => Media.Projection, ColumnContainer, null, (d, args) => (<ColumnContainer>d).OnProjectionChanged(d,args));

        private m_columnWidth: number = 100;
        private m_columnOffset: number = 0;
        private m_lastArrangeRect: Rect;
        private m_isRecycled: boolean;
        private m_elements: ObservableCollection<ColumnElementWrapper>  = new ObservableCollection<ColumnElementWrapper>();
        private m_position: ColumnPosition = ColumnPosition.Scrollable;

        Column: Column;

        public get ReferenceItem():any{
            return this.Column;
        }

        public get IsRecycled(): boolean{
            return this.m_isRecycled;
        }
        public set IsRecycled(value: boolean){
            if( this.m_isRecycled != value )
            {
                this.m_isRecycled = value;
                this.ApplyToAllChildren( this.UpdateIsRecycled );
            }
        }

        public get RecycleKey(): any {
            return this.Column;
        }

        public get ColumnPosition(): any {
            return this.m_position;
        }
        public set ColumnPosition(value:any) {
            if( this.m_position != value )
            {
                this.m_position = value;
                for (var index = 0; index < this.Wrappers.Count; index++) {
                    var wrapper = <ColumnElementWrapper>this.Wrappers.GetValueAt(index);
                    wrapper.ColumnElement.ParentHost.SetElementPosition( wrapper, value );
                }

            }
        }

        public get Wrappers(): nullstone.ICollection<ColumnElementWrapper> {
            return this.m_elements;
        }

        public get Elements(): nullstone.ICollection<IColumnElement> {

            var result = new ObservableCollection<IColumnElement>();

            for (var index = 0; index < this.m_elements.Count; index++) {
                var element = this.m_elements.GetValueAt(index);
                var result = new ObservableCollection<IColumnElement>();
                result.Add(element.ColumnElement);
            }   

            return result;
        }

        public get Cells(): nullstone.IEnumerable<Cell>
        {
            var array = this.m_elements.ToArray();

            var result = [];
            for (var index = 0; index < array.length; index++) {
                var element =  array[index];
                var cell = <Cell>element.ColumnElement;
                if(cell){
                    result.push(cell);
                }
            }  

            return nullstone.IEnumerable_.fromArray(result);
        }

        Opacity: number;
        Projection: Media.Projection;
        Width: number;
        LastArrangeRect: Rect;

        public get ColumnOffset(): number{
            return this.m_columnOffset;
        }
        public set ColumnOffset(value: number){
            if( this.m_columnOffset != value )
            {
                this.m_columnOffset = value;
                this.ApplyToAllChildren( this.UpdateColumnOffset );
            }
        }

        public get ColumnWidth(): number{
            return this.m_columnOffset;
        }
        public set ColumnWidth(value: number){
            if( this.m_columnOffset != value )
            {
                this.m_columnOffset = value;
                this.ApplyToAllChildren( this.UpdateColumnWidth );
            }
        }

        AnimationX: number;
        AnimationY: number;
        Height: number;

        private m_isDragged: boolean;
        public get IsDragged(): boolean{
            return this.m_isDragged;
        }
        public set IsDragged(value: boolean){
            var array = nullstone.IEnumerable_.toArray(this.Cells);
            if( value != this.m_isDragged )
            {
                this.m_isDragged = value;

                for (var index = 0; index < array.length; index++) {
                    var cell = array[index];
                    cell.SetCommonState( this.IsDragged ? Cell.CommonStateDragged : Cell.CommonStateNormal, true );
                }   
            }
        }

        private m_isDragPaused: boolean;
        public get IsDragPaused(): boolean{
            return this.m_isDragged;
        }
        public set IsDragPaused(value: boolean){

            if( value != this.m_isDragPaused )
            {
                this.m_isDragPaused = value;

                var array = nullstone.IEnumerable_.toArray(this.Cells);

                for (var index = 0; index < array.length; index++) {
                    var cell = array[index];
                    cell.OnColumnIsDragPausedChanged();
                }   

            }

        }

        public get DesiredSize(): Size {
            return new Size( this.ColumnWidth, 0 );
        }

        public Add( element: ColumnElementWrapper ): void
        {
            this.m_elements.Add( element );

            this.UpdateWidth( element );
            this.UpdateOpacity( element );
            this.UpdateColumnWidth( element );
            this.UpdateColumnOffset( element );
            this.UpdateAnimationX( element );
            this.UpdateAnimationY( element );
            this.UpdateIsRecycled( element );
        }

        public Remove(element: ColumnElementWrapper ): void
        {
            this.m_elements.Remove( element );
        }

        public Contains(element: ColumnElementWrapper ): boolean
        {
            return this.m_elements.Contains( element );
        }

        private UpdateColumnOffset(elem: ColumnElementWrapper ): void
        {
            elem.ColumnOffset = this.ColumnOffset;
        }

        private UpdateColumnWidth(elem: ColumnElementWrapper ) : void
        {
            elem.ColumnWidth = this.ColumnWidth;
        }

        private UpdateWidth(elem: ColumnElementWrapper ) : void
        {
            elem.Width = this.Width;
        }

        private UpdateOpacity(elem: ColumnElementWrapper ) : void
        {
            elem.Opacity = this.Opacity;
        }

        private UpdateProjection(elem: ColumnElementWrapper ) : void
        {
            //elem.Projection = this.Projection;
        }

        private UpdateAnimationX(elem: ColumnElementWrapper ) : void
        {
            elem.AnimationX = this.AnimationX;
        }

        private UpdateAnimationY(elem: ColumnElementWrapper ) : void
        {
            elem.AnimationY = this.AnimationY;
        }

        private UpdateIsRecycled(elem: ColumnElementWrapper ) : void
        {
            elem.IsRecycled = this.IsRecycled;
        }

        private OnWidthChanged(obj: DependencyObject,args: DependencyPropertyChangedEventArgs ): void
        {
            ( <ColumnContainer>obj ).ApplyToAllChildren( (<ColumnContainer>obj).UpdateWidth );
        }

        private OnAnimationXChanged(obj:any,args: IDependencyPropertyChangedEventArgs): void
        {
            (<ColumnContainer>obj ).ApplyToAllChildren( (<ColumnContainer >obj).UpdateAnimationX );
        }

        private OnAnimationYChanged(obj: DependencyObject, args: DependencyPropertyChangedEventArgs )
        {
            ( <ColumnContainer>obj ).ApplyToAllChildren( ( <ColumnContainer>obj ).UpdateAnimationY );
        }

        private OnOpacityChanged(obj: DependencyObject,args: DependencyPropertyChangedEventArgs )
        {
            ( <ColumnContainer>obj ).ApplyToAllChildren( ( <ColumnContainer>obj ).UpdateOpacity );
        }

        private OnProjectionChanged(obj: DependencyObject,args: DependencyPropertyChangedEventArgs )
        {
            ( <ColumnContainer>obj ).ApplyToAllChildren( ( <ColumnContainer>obj ).UpdateProjection );
        }


        private ApplyToAllChildren(action: (n: ColumnElementWrapper) => void  ):void
        {

            for (var index = 0; index < this.m_elements.Count; index++) {
                var elem = this.m_elements.GetValueAt(index);
                action(elem);
            }

        }

        PrepareBitmapCache():void{
            
        }

        ClearBitmapCache():void{

        }

        Measure(availableSize: Size ):void {

        }

        Arrange(arrangeParameters: ArrangeParameters): void {

        }


    }

}