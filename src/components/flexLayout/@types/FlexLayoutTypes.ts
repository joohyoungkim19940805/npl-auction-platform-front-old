import { ReactNode } from 'react';

export type ResizePanelMode =
    | 'default'
    | 'bottom-cylinder'
    | 'top-cylinder'
    | 'left-cylinder'
    | 'right-cylinder';

export interface FlexLayoutChildrenType {
    ['data-is_resize']: boolean;
    ['data-grow']?: number;
    ['data-prev_grow']?: number;
    panelMode?: ResizePanelMode;
    isFitContent?: boolean;
    isFitResize?: boolean;
    containerName: string;
}

export interface FlexContainerProps extends FlexLayoutChildrenType {
    fitContent: 'width' | 'height';
    children?: ReactNode;
    containerCount: number;
    layoutName: string;
}

export type FlexLayoutProps = {
    direction: 'row' | 'column';
    childrenTemplate: FlexLayoutChildrenType[];
    children?: ReactNode[];
    layoutName: string;
};
