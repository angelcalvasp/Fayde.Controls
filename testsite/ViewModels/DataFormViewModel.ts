
class DataFormViewModel extends Fayde.MVVM.ViewModelBase {
    CurrentItem: any;

    constructor(){
        super();

        //this.Types = new Fayde.Collections.ObservableCollection<BaseItem>();
        //this.Types.Add(new BaseItem(StudenType.Loco,"Loco"));
        //this.Types.Add(new BaseItem(StudenType.Sane,"Sane"));
        //this.Types.Add(new BaseItem(StudenType.Unknown,"Unknown"));

        this.Students = new Fayde.Controls.DataFormDataSource<Student>(Student);
        this.Students.Add(new Student("Angel",25,"John Doe",true));
        this.Students.Add(new Student("Adrian",24,"Something",false));
        this.Students.Add(new Student("Louis",26,"Holy snap",true));
        this.Students.Add(new Student("Andrea",27,"Tester maybe?",false));

        

    }

    Types: Fayde.Collections.ObservableCollection<BaseItem>;
    Students: Fayde.Controls.DataFormDataSource<Student>;

}

class BaseItem {

    constructor(id:number,value:any){
        this.Id = id;
        this.Value = value;
    }

    Id: number;
    Value: any;
}

class Student extends Fayde.MVVM.ObservableObject {


    private _name: string;
    get Name (): string {
        return this._name;
    }
    set Name (value: string) {
        this._name = value;
        this.OnPropertyChanged("Name");
    }

    private _age: number;
    get Age (): number {
        return this._age;
    }
    set Age (value: number) {
        this._age = value;
        this.OnPropertyChanged("Age");
    }

    private _description: string;
    get Description (): string {
        return this._description;
    }
    set Description (value: string) {
        this._description = value;
        this.OnPropertyChanged("Description");
    }

    private _active: boolean;
    get Active (): boolean {
        return this._active;
    }
    set Active (value: boolean) {
        this._active = value;
        this.OnPropertyChanged("Active");
    }
/*
    private _type: StudenType;
    get Type (): StudenType {
        return this._type;
    }
    set Type (value: StudenType) {
        this._type = value;
        this.OnPropertyChanged("Type");
    }

    */
    constructor();
    constructor(name:string,age:number,description:string,active: boolean)
    constructor(name?:string,age?:number,description?:string,active?: boolean) {
        super();
        if(name)
        this.Name = name;
        if(age)
        this.Age = age;
        if(description)
        this.Description = description;
        if(active)
        this.Active = active;
        //this.Type = StudenType.Unknown;
    }
}

enum StudenType {
    Loco,
    Sane,
    Unknown
}

Fayde.MVVM.NotifyProperties(DataFormViewModel, ["CurrentItem"]);
export = DataFormViewModel;