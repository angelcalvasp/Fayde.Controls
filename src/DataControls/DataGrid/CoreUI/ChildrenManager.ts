module Fayde.Controls {
    import IEnumerable = nullstone.IEnumerable;
    import IEnumerable_ = nullstone.IEnumerable_;
    export class ChildrenManager<T> {

        constructor(addAction: (p: T) => void,removeAction: (p: T) => void)
        {
            if( addAction == null )
                throw new Error("addAction");

            if( removeAction == null )
                throw new Error( "removeAction" );

            this.m_addAction = addAction;
            this.m_removeAction = removeAction;

        }

        private GetKey(element: T): any
        {
            return ( <IRecyclable>element ).RecycleKey;
        }

        private SetRecycled(element: T,recycled: boolean): void
        {
            (<IRecyclable>element ).IsRecycled = recycled;
        }

        private GetIsRecycled(element: T): boolean
        {
            return (<IRecyclable>element ).IsRecycled;
        }

        public get RenderedElements(): LinkedList<T>{
            return this.m_renderedItems;
        }

        public get AllElements(): IEnumerable<T> {
            return IEnumerable_.fromArray(this.m_keyItemDic.values());
        }

        public ReuseElement(newKey: any,element: T): void
        {
            if( !this.m_keyItemDic.remove( this.GetKey(element) ) )
                throw new InvalidOperationException();

            if( this.GetIsRecycled( element ) )
            {
                this.m_recycledItems.removeElementAtIndex(this.m_recycledItems.indexOf(element));
                this.m_renderedItems.add(element);
            }
            this.SetRecycled( element, false );

            this.m_keyItemDic.setValue( newKey, element );

            this.CheckListsIntegrity( element );
        }

        public Add(element: T): void
        {
            this.SetRecycled( element, false );
            this.m_recycledItems.remove( element );

            this.AddToSourceList( element );

            if( !this.m_renderedItems.contains( element ) )
            {
                this.m_renderedItems.add( element );
            }

            this.CheckListsIntegrity();
        }

        public Remove(element: T): void
        {
            this.m_keyItemDic.remove( this.GetKey( element ) );
            if( !this.GetIsRecycled( element ) )
            {
                this.m_renderedItems.remove( element );
            }
            else
            {
                this.m_recycledItems.remove( element );
            }

            this.m_removeAction( element );

            this.CheckListsIntegrity();
        }

        public Recycle(element: T): void
        {
            this.m_renderedItems.remove( element );
            this.m_recycledItems.add( element );
            this.SetRecycled( element, true );

            this.CheckListsIntegrity();
        }

        private AddToSourceList(element: T): void
        {
            var key: any = this.GetKey( element );
            if( !this.m_keyItemDic.containsKey( key ) )
            {
                this.m_keyItemDic.setValue( key, element );
                this.m_addAction( element );
            }
        }



        private KeyCompatible(key1: any,key2: any): boolean
        {
            if( !(key1.constructor.name == key2.constructor.name))
                return false;

            var keyPath: DataPath= <DataPath>key1;
            if( keyPath != null )
            {
                return keyPath.Depth == (<DataPath>key2 ).Depth;
            }

            return true;
        }

        private CheckListsIntegrity(): void
        {
            this.CheckListsIntegrity( null );
        }
        private CheckListsIntegrity(elementKeyException: T): void
        {

        }

        //The notification callbacks for "real" add and remove
        private m_addAction: (n: T) => void;
        private m_removeAction: (n: T) => void;

        //For performance. Avoid searching the list for used children (ie. visible)
        private m_renderedItems: LinkedList<T> = new LinkedList<T>();

        //For performance. Avoid searching the list for a non used children (ie. collapsed)
        private m_recycledItems: LinkedList<T> = new LinkedList<T>();

        //For performance. m_dataPathDic contain the list of items displayed
        //in the container.
        private m_keyItemDic: Dictionary<any, T> = new Dictionary<any, T>();
    }
}
