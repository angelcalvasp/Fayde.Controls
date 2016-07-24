module Fayde.Controls {

    export class DataGrid extends ContentControlBase {
        
        get DefaultTopLevelGroupZIndex(){return 100;}
        get DefaultHeaderGroupByControlPosition(){return 0;}
        get DefaultHeaderFilterRowPosition(){return 1;}
        get DefaultHeaderColumnManagerRowPosition(){return 2;}
        get DefaultHeaderInsertionRowPosition(){return 3;}
        get DefaultFooterNotificationControlPosition(){return 0;}
        get DefaultGroupSublevelIndent(){return 7;}
        get AllowGroupNavigationPropertyName(){return "AllowGroupNavigation";}
        get GroupNavigationModesPropertyName(){return "GroupNavigationModes";}
        get AllowGroupCollapsingPropertyName(){return "AllowGroupCollapsing";}

        constructor() {
            super();
            this.DefaultStyleKey = DataGrid;

        }

    }


}