module Fayde.Controls {
    import IEnumerable_ = nullstone.IEnumerable_;
    import IEnumerable = nullstone.IEnumerable;
    import forEach = Fayde.Controls.arrays.forEach;
    import ILayoutElement = Fayde.Controls.ILayoutElement;
    export class VisitorBase implements IVisitor {

        private m_childrenPolicy: ChildrenPolicy;
        private m_fixedHeadersFooters: boolean;
        private m_stopVisit: boolean; //false

        constructor(childrenPolicy: ChildrenPolicy,fixedHeadersFooters: boolean) {
            this.m_childrenPolicy = childrenPolicy;
            this.m_fixedHeadersFooters = fixedHeadersFooters;
        }

        public get IsStopped(): boolean{
            return this.m_stopVisit;
        }


        public  Visit(dataGridPanel: DataGridPanel): void
        {
            if( this.m_fixedHeadersFooters )
            {
                var visitHeaderFooter: ((n:UIElement)=>void )= ( element ) =>
                {
                    var visitorChild: IVisitorElement = element as IVisitorElement;
                    if( visitorChild != null )
                    {
                        visitorChild.Accept( this );
                    }
                };

                IEnumerable_.toArray(dataGridPanel.FixedHeaders).forEach((element)=>{
                    if( !this.m_stopVisit ){
                        visitHeaderFooter( element );
                    }
                });

            }

            dataGridPanel.RootHost.Accept( this );
        }

        public Visit(wrapper: WrapperBase): void
        {
            if(this.m_stopVisit )
                return;

            var child: IVisitorElement = wrapper.Child as IVisitorElement;
            if( child != null )
            {
                child.Accept( this );
            }
        }

        public Visit(wrapper: RowWrapper): void
        {
            this.Visit( <WrapperBase >wrapper );
        }

        public Visit(row: Row): void
        {
        }

        public Visit(dataRow: DataRow): void
        {
            this.Visit(<Row>dataRow );
        }

        public Visit(row: ColumnManagerRow): void
        {
            this.Visit(<Row>row);
        }






        public Visit(container: VirtualRootContainer): void
        {
            this.Visit(<VirtualContainerBase>container );
        }

        public Visit( container: VirtualGroupContainer): void
        {
            this.Visit(<VirtualContainerBase >container );
        }

        public Visit(containerBase: VirtualContainerBase): void
        {
            var elements: IEnumerable = IEnumerable_.toArray((this.m_childrenPolicy != ChildrenPolicy.AllChildren)
            ? containerBase.RenderedElements
            : containerBase.HeadersFooters.Cast<ILayoutElement>());

            if( elements != null )
            {
                forEach((elem)=>{
                    if( this.m_stopVisit )
                        break;

                    (<IVisitorElement>elem).Accept( this );
                });
            }
        }

        public Visit(rootHost: RootHost): void
        {
            if( this.m_childrenPolicy == ChildrenPolicy.RenderedChildrenOnly
                || this.m_childrenPolicy == ChildrenPolicy.LocalyHandled )
            {
                rootHost.RootContainer.Accept( this );
            }
            else
            {
                rootHost.RootContainer.Accept( this );

                IEnumerable_.toArray(rootHost.ChildrenManager.AllElements).forEach((elem)=>{
                    if( !this.m_stopVisit ){
                        (<IVisitorElement>elem ).Accept( this );
                    }

                });
            }
        }

        StopVisit(): void
        {
            this.m_stopVisit = true;
        }




    }
}