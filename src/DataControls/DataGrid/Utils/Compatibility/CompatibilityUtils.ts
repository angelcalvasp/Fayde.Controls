module Fayde.Controls {
    import ImageSource = Fayde.Media.Imaging.ImageSource;
    import FocusManager = Fayde.Engine.FocusManager;
    import IEnumerable = nullstone.IEnumerable;
    export class CompatibilityUtils {

        public static XamlParse(xamlString: string): any
        {
            return null;
            //return System.Windows.Markup.XamlReader.Load( xamlString );
        }

        public static GetEnumerable(collection: XamlObjectCollection<UIElement>): IEnumerable<UIElement>
        {
            return collection;
        }

        public static RemoveElement( collection: XamlObjectCollection<UIElement>,element : UIElement): boolean
        {
            return collection.Remove( element );
        }
    }
}