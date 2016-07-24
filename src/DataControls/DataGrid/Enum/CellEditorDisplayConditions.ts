module Fayde.Controls {
    export enum CellEditorDisplayConditions {
        None = 0x00,
        RowIsBeingEdited = 0x01,
        MouseOverCell = 0x02,
        MouseOverRow = 0x04,
        RowIsCurrent = 0x08,
        CellIsCurrent = 0x10,
        Always = 0x20
    }
}