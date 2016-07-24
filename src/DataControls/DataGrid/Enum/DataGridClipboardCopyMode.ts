module Fayde.Controls {
    export enum DataGridClipboardCopyMode {
        // Summary:
        //     Indicates that content cannot be copied to the clipboard from the System.Windows.Controls.DataGrid
        //     control.
        None = 0,
        //
        // Summary:
        //     Indicates that content can be copied from a System.Windows.Controls.DataGrid
        //     to the clipboard, but does not copy column headers.
        ExcludeHeader = 1,
        //
        // Summary:
        //     Indicates that content can be copied from a System.Windows.Controls.DataGrid
        //     to the clipboard and copies column headers as the first line of text.
        IncludeHeader = 2,
    }
}