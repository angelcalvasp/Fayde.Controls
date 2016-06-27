module Fayde.Controls {
    
    interface IDictionary {
        Add(key: string, value: any): void;
        Remove(key: string): void;
        containsKey(key: string): boolean;
        Keys(): string[];
        Values(): any[];
    }

export class Dictionary {

        _keys: string[] = new Array<string>();
        _values: any[] = new Array<any>();

        constructor(init: { key: string; value: any; }[]) {

            for (var x = 0; x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }

        Add(key: string, value: any) {
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        }

        Remove(key: string) {
            var index = this._keys.indexOf(key, 0);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);

            delete this[key];
        }

        Keys(): string[] {
            return this._keys;
        }

        Values(): any[] {
            return this._values;
        }

        Clear(): void {
            this._keys = new Array<string>();
            this._values = new Array<any>();
        }

        Count(): number {
            return this._keys.length;
        }

        ContainsKey(key: string) {
            if (typeof this[key] === "undefined") {
                return false;
            }

            return true;
        }

        ElementAt(index: number){
            
        }


    }
}