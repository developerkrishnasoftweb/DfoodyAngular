export interface IHeaderMenuObserver {
    hideMenu?: boolean;
    isActiveContactus?: boolean;
    backArrowMenu?: boolean;
    logoCrossMenu?: boolean;
}
export interface ITabListGroup {
    label: string;
    value: string;
}
export interface ITabConfigGroup {
    tabsList: ITabListGroup[];
    groupName?: string;
    isGroupDisabled: boolean;
    tabWidth?: number;
}

export interface INavigationTab {
    accountNumber?: string;
    tabName?: string;
    navUrl?: string;
}

export interface IDropdownOption {
    label?: string;
    value?: string;
    balance?: string;
    type?: string;
 }
