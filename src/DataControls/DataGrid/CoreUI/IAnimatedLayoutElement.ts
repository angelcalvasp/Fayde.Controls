/// <reference path="ILayoutElement"/>
module Fayde.Controls {

    import ILayoutElement = Fayde.Controls.ILayoutElement;

    export interface IAnimatedLayoutElement extends ILayoutElement {

        Width: number;

        Height: number;

        Opacity: number;

        Projection: Media.Projection;

        AnimationX: number;

        AnimationY: number;

        PrepareBitmapCache():void;

        ClearBitmapCache():void;

    }
} 