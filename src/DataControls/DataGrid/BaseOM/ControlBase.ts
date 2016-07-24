module Fayde.Controls {
    export class ControlBase extends Control {
        private  m_eventHelper: DataGridEventHelper;

        get EventManager(): DataGridEventHelper{
            return this.m_eventHelper;
        };
    }
}