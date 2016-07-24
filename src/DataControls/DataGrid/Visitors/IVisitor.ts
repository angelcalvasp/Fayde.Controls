module Fayde.Controls {
    export interface IVisitor {
        Visit(dataGridPanel: DataGridPanel):void;
        Visit(wrapper: WrapperBase ): void;
        Visit(wrapper: RowWrapper ): void;
        Visit(row: Row ): void;
        Visit(row: DataRow ): void;
        Visit(row: ColumnManagerRow ): void;
        Visit(container: VirtualContainerBase ): void;
        Visit(rootContainer: VirtualRootContainer ): void;
        Visit(groupContainer: VirtualGroupContainer ): void;
        Visit(rootHost: RootHost ): void;
    }
}