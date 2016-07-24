module Fayde.Controls {
    export class DataItem {

        //private m_hashCode:boolean;

        constructor()
        constructor(data:any,isLoaded: boolean)
        constructor(data?:any,isLoaded?: boolean) {

            if(isLoaded == null){
                isLoaded = false;
            }

            this.m_isLoaded = isLoaded;
            this.m_data = data;

            if( isLoaded )
            {
                //this.m_hashCode = ( data != null ) ? data.GetHashCode() : 0;
            }
            else
            {
                //this.m_hashCode = this.getHashCode();
            }
        }

        Equals(obj: any )
        {
            // Two different DataItem instance are consider equals if they are
            // both loaded and contain an equal data object.  A DataItem that is
            // empty or not loaded must not be equal to any other DataItem except
            // itself in order to represent different virtualized items.
            if( obj == this )
                return true;

            if( ( obj == null ) || ( !this.m_isLoaded ) || ( this.m_data == null ) )
                return false;

            var dataItem = <DataItem>obj;
            if( ( dataItem == null ) || ( !dataItem.m_isLoaded ) || ( dataItem.m_data == null ) )
                return false;

            return this.m_data.Equals(dataItem.m_data);
        }

        public get IsLoaded():boolean { return  this.m_isLoaded; }
        private m_isLoaded: boolean; //false

        public get Data():any { return this.m_data; }
        private m_data: any; //null
    }

}