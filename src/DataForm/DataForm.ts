module Fayde.Controls {
    export class DataForm extends Control  {

        private partGrid: Grid;

        constructor() {
            super();
            this.DefaultStyleKey = DataForm;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();

            this.partGrid = <Grid>this.GetTemplateChild("PART_Grid", Grid);

        }

    }

    

    function InvalidateForm(): void{

    }
}