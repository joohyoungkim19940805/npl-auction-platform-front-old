export type FlexDirectionModelType = {
	xy: string,
	targetDirection: string,
	nextDirection: string,
	sizeName: string,
	resizeCursor: string
}
export default {
	row: {
		xy : 'x',
		targetDirection : 'left',
		nextDirection : 'right',
		sizeName : 'width',
		resizeCursor : 'ew-resize'
	} as FlexDirectionModelType,
	column: {
		xy : 'y',
		targetDirection : 'top',
		nextDirection : 'bottom',
		sizeName : 'height',
		resizeCursor : 'ns-resize'
	} as FlexDirectionModelType
} as Record<string, FlexDirectionModelType>