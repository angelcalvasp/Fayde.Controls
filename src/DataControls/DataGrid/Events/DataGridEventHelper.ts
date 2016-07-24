/// <reference path="IDataGridRoutedEventElement"/>
/// <reference path="DataGridRoutedEvent"/>
/// <reference path="DataGridRoutedEventArgs"/>

module Fayde.Controls {

    import IDataGridRoutedEventElement = Fayde.Controls.IDataGridRoutedEventElement;
    //import DataGridRoutedEvent = Fayde.Controls.DataGridRoutedEvent;
    //import DataGridRoutedEventArgs = Fayde.Controls.DataGridRoutedEventArgs;
    //import VisualTreeHelper = Fayde.VisualTreeHelper;
    import LinkedList = Fayde.Controls.LinkedList;
    import Dictionary = Fayde.Controls.Dictionary;

    

    export class DataGridEventHelper
    {

        private m_handlers: Dictionary<DataGridRoutedEvent, LinkedList<DataGridRoutedEventHandler>> = new Dictionary<DataGridRoutedEvent,LinkedList<DataGridRoutedEventHandler>>();
        private m_element: IDataGridRoutedEventElement;

        constructor(element: IDataGridRoutedEventElement )
        {
            if(element){
                this.m_element = element;
            }
        }

        RaiseEvent(routedEvent: DataGridRoutedEvent,args: DataGridRoutedEventArgs ):void
        {

            var currentHandledObject: IDataGridRoutedEventElement = this.m_element;
            var handlers: LinkedList<DataGridRoutedEventHandler>;
            while( currentHandledObject != null )
            {

                if(currentHandledObject.EventManager.m_handlers.containsKey(routedEvent)){
                    handlers = currentHandledObject.EventManager.m_handlers.getValue(routedEvent);
                    for (var index = 0; index < handlers.size(); index++) {
                        var currentHandler = handlers.elementAtIndex(index);
                        currentHandler( currentHandledObject, args );
                    }
                    /*
                    handlers.forEach((event,currentHandler)=>{
                        currentHandler( currentHandledObject, args );
                    });*/
                }
                currentHandledObject = DataGridEventHelper.GetParent( currentHandledObject );
            }
        }

        AddHandler(routedEvent: DataGridRoutedEvent,handler: DataGridRoutedEventHandler): void
        {
            var handlers: LinkedList<DataGridRoutedEventHandler>;

            if(this.m_handlers.containsKey(routedEvent)){

            }

            handlers = this.m_handlers.getValue(routedEvent);

            if(!handlers)
            {
                handlers = new LinkedList<DataGridRoutedEventHandler>();
                this.m_handlers.setValue( routedEvent, handlers );
            }

            handlers.add( handler );
        }

        RemoveHandler(routedEvent: DataGridRoutedEvent, handler: DataGridRoutedEventHandler ): void
        {
            var handlers: LinkedList<DataGridRoutedEventHandler>;

            if(this.m_handlers.containsKey(routedEvent)){
                handlers = this.m_handlers.getValue(routedEvent);
                handlers.remove( handler );
            }
        }

        static GetParent(element: any ): any
        {
            var parent = VisualTreeHelper.GetParent( <DependencyObject>element );

            while( ( parent != null ) && !(parent ) )
                parent = VisualTreeHelper.GetParent( <DependencyObject>parent );

            return parent;
        }
    
    }

}