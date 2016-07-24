/// <reference path="IDataFormObject"/>
module Fayde.Controls {

    import ObservableCollection =  Fayde.Collections.ObservableCollection;
    import IDataFormObject = Fayde.Controls.IDataFormObject;

    export class DataSourceCollection<T> extends ObservableCollection<IDataFormObject> {

        private tCreator: any;

        constructor(TCreator: { new (): T; }) {
            super();
            var temp = <T>this.activator(TCreator);
            this.tCreator = TCreator;
        }

        public GetNew():any {
            var item =  this.activator(this.tCreator);
            var dataformObject = <IDataFormObject>item;
            if(dataformObject)
                return dataformObject.CreateItem();
            return null;
        }

        private activator<T>(type: { new(): T ;} ): T {
            return new type();
        }

    }
}