
class DataFormViewModel extends Fayde.MVVM.ViewModelBase {
    CurrentItem: any;

    constructor(){
        super();

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

class Student extends Fayde.MVVM.ObservableObject implements Fayde.Controls.IDataFormObject {


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

        this.Active = active;
    }

    public CreateItem():Student{
        var item = new Student();
        item.Name = "";
        item.Age = 0;
        item.Description = "";
        item.Active = false;
        return item;
    }
}

enum StudenType {
    Loco,
    Sane,
    Unknown
}

Fayde.MVVM.NotifyProperties(DataFormViewModel, ["CurrentItem"]);
export = DataFormViewModel;