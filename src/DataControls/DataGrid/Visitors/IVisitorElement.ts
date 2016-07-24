/// <reference path="IVisitor"/>
module Fayde.Controls {
    import IVisitor = Fayde.Controls.IVisitor;
    export interface IVisitorElement extends IVisitor {
        Accept(visitor: IVisitor ):void;
    }
}