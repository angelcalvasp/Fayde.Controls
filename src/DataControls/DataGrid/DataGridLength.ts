module Fayde.Controls {
    export class DataGridLength {

        public EqualsTo(gl1: DataGridLength,gl2: DataGridLength): boolean{
            return gl1.UnitType == gl2.UnitType 
                   && gl1.Value == gl2.Value 
                   && gl1.DesiredValue == gl2.DesiredValue 
                   && gl1.DisplayValue == gl2.DisplayValue;
        }

        public Equals(obj:any): boolean{
            if (<DataGridLength>obj)
            {
                var l = <DataGridLength>obj;
                return this == l;
            }
            else
            {
                return false;
            }
        }

        public get IsAbsolute(): DataGridLength { return this._unitType == DataGridLengthUnitType.Pixel; }

        public get IsAuto(): DataGridLength { return this._unitType == DataGridLengthUnitType.Auto; }

        public get IsStar(): DataGridLength { return this._unitType == DataGridLengthUnitType.Star; }

        public get IsSizeToCells(): DataGridLength { return this._unitType == DataGridLengthUnitType.SizeToCells; }

        public get IsSizeToHeader(): DataGridLength { return this._unitType == DataGridLengthUnitType.SizeToHeader; }

        public get Value(): DataGridLength { return (this._unitType == DataGridLengthUnitType.Auto) ? AutoValue : this._unitValue; }

        public get UnitType(): DataGridLength { return this._unitType; }


        public get Auto(): DataGridLength { return this._auto; }

        public get SizeToCells(): DataGridLength { return this._sizeToCells; }

        public getSizeToHeaderAuto(): DataGridLength { return this._sizeToHeader; }

        //FIELDS
        private _unitValue: number;
        private _unitType: DataGridLengthUnitType;
        private _desiredValue: number;
        private _displayValue: number;

        public get AutoValue(): number { return 1.0; }

        private _auto: DataGridLength = new DataGridLength();
        private _sizeToCells: DataGridLength = new DataGridLength();
        private _sizeToHeader: DataGridLength = new DataGridLength();

        constructor(value: number,type: DataGridLengthUnitType,desiredValue: number,displayValue: number){

        }


    }

}