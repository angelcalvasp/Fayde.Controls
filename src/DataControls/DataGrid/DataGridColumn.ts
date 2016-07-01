module Fayde.Controls {

    export class DataGridColumn extends DependencyObject {

        /* START HEADER */

        static HeaderProperty = DependencyProperty.Register("Header", () => ContentControl, DataGridColumn);
        static HeaderStyleProperty = DependencyProperty.Register("HeaderStyle", () => Style, DataGridColumn);
        static HeaderStringFormatProperty = DependencyProperty.Register("HeaderStringFormat", () => String, DataGridColumn);
        static HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", () => DataTemplate, DataGridColumn);
        static HeaderTemplateSelectorProperty = DependencyProperty.Register("HeaderTemplateSelector", () => DataTemplate, DataGridColumn);

        Header: ContentControl;
        HeaderStyle: Style;
        HeaderStringFormat: string;
        HeaderTemplate: DataTemplate;

        /* END HEADER */


        /* START CELL CONTAINER */

        static CellStyleProperty = DependencyProperty.Register("CellStyle", () => Style, DataGridColumn);
        static IsReadOnlyProperty = DependencyProperty.Register("IsReadOnly", () => Boolean, DataGridColumn);

        CellStyle: Style;
        IsReadOnly: boolean;


        /* END CELL CONTAINER */

        /* START WIDTH */

        static WidthProperty = DependencyProperty.Register("Width", () => Object, DataForm, null, (d, args) => (<DataForm>d).CurrentItemValueChanged(args));

        /* END WIDTH */


    }

}