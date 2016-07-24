module Fayde.Controls {
    export enum RowEditingState {
        Unchanged = 0,
        Editing,
        Edited,
        Ending,
        Committing,
        Canceling
    }
}