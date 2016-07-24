module Fayde.Controls {
    export class ContentControlBase extends ContentControl {
        private  m_eventHelper: DataGridEventHelper;

        get EventManager(): DataGridEventHelper{
            return this.m_eventHelper;
        };

    }
}