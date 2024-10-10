export type FlexDirectionModelType = {
    xy: 'x' | 'y';
    targetDirection: 'left' | 'top';
    sizeName: 'width' | 'height' | keyof DOMRect;
    resizeCursor: 'ew-resize' | 'ns-resize';
};
export default {
    row: {
        xy: 'x',
        targetDirection: 'left',
        nextDirection: 'right',
        sizeName: 'width',
        resizeCursor: 'ew-resize',
    } as FlexDirectionModelType,
    column: {
        xy: 'y',
        targetDirection: 'top',
        nextDirection: 'bottom',
        sizeName: 'height',
        resizeCursor: 'ns-resize',
    } as FlexDirectionModelType,
} as Record<string, FlexDirectionModelType>;
