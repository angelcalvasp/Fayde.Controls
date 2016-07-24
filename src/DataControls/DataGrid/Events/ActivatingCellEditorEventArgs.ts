module Fayde.Controls {
    export class ActivatingCellEditorEventArgs extends RoutedEventArgs {
        constructor(targetCell: Cell, cellEditor: FrameworkElement ){
            super();
            this.OriginalSource = originalSource;
        }

        private m_targetCell: Cell;
        public get Cell():Cell{return this.m_targetCell;}

    }
}