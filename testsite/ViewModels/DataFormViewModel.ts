class DataFormViewModel extends Fayde.MVVM.ViewModelBase {
    CurrentItem: any;

    constructor(){
        super();
        this.CurrentItem = new Person("Angel",25,"John Doe");
    }

}


class Person {

    Name: string;
    Age: number;
    Description: string;

    constructor(name:string,age:number,description:string) {
        this.Name = name;
        this.Age = age;
        this.Description = description;
    }
}

Fayde.MVVM.NotifyProperties(DataFormViewModel, ["CurrentItem"]);
export = DataFormViewModel;