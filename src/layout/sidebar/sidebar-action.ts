export interface SidebarAction {
    text: string;
    action: () => void,
    orientation: SidebarActionOrientation,
    textCollapsed?: string;
}

export enum SidebarActionOrientation {
    Left,
    Right,
}
