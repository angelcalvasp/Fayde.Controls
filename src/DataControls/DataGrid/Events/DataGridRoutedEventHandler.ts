/// <reference path="DataGridRoutedEventArgs"/>

module Fayde.Controls {
    export interface DataGridRoutedEventHandler
    {
        (sender: any,args: DataGridRoutedEventArgs): void;
    }
}