"use client"
import styles from '@styles/flexLayout.module.css'
import { ReactNode, ReactElement, Fragment, useEffect, useRef, useState } from 'react'
import flexDirectionModel from '@components/FlexLayout/FlexDirectionModel'

type Props = {
    direction: string;
	grow: number[];
    children?: ReactNode[] | ReactElement[];
};
function isOverMove(elementSize:number, elementMinSize:number) {
	return Math.floor(elementSize) <= 0 || (isNaN(elementMinSize) ? false : elementMinSize >= Math.floor(elementSize));
}
function findNotCloseFlexContent(target : any, direction : string){
	const isCloseCheck = ()=>{
		let grow = parseFloat(window.getComputedStyle(target).flex.split(' ')[0]) || 0;
		if(grow == 0){
			return true;
		}else{
			return false;
		}
	};
	while(isCloseCheck()){
		let nextTarget = target[direction]?.[direction];
		if(! nextTarget){
			break;
		}
		target = nextTarget;
	}
	return target as HTMLElement | HTMLDivElement | null;
}

const FlexLayoutWrapper = (prop : Props) => {
	const {direction, grow, children} = prop;
	const childCount = children?.length || 0;

	const flexLayoutWrapperRef = useRef<HTMLDivElement>(null);
	const childPanelRef = useRef<Map<Number, HTMLDivElement> | null>(null);
	const childContainerRef = useRef<Map<Number, HTMLDivElement> | null>(null);

	const getPanelRefMap = () => {
		if(!childPanelRef.current) childPanelRef.current = new Map<Number, HTMLDivElement>();
		return childPanelRef.current;
	}

	const getContainerRefMap = () => {
		if(!childContainerRef.current) childContainerRef.current = new Map<Number, HTMLDivElement>();
		
		return childContainerRef.current;
	}
	let isResizePanelClick = false;
	let prevTouchEvent : TouchEvent | null;
	let parentSize : number;
	let totalMovement : number;
	let activeIndex : number | null;

	const panelMouseDownEvent = (event : any, index : number) => {
		isResizePanelClick = true;
		parentSize = (flexLayoutWrapperRef.current?.getBoundingClientRect() as any)[flexDirectionModel[direction].sizeName];
		prevTouchEvent = null;
		totalMovement = 0;
		activeIndex = index;

		if(!parentSize) return;
		document.body.style.cursor = flexDirectionModel[direction].resizeCursor;
	}

	const panelMouseUpEvent = (event : any) => {
		isResizePanelClick = false;
		parentSize = 0;
		prevTouchEvent = null;
		totalMovement = 0;
		document.body.style.cursor = '';
	}
	
	function moveMouseFlex(originTarget : HTMLDivElement, resizePanel : HTMLDivElement, moveEvent : any){
		return new Promise<void>(resolve=>{
			let movement = moveEvent['movement' + flexDirectionModel[direction].xy.toUpperCase()];
			totalMovement += moveEvent['movement' + flexDirectionModel[direction].xy.toUpperCase()];
			let minSizeName = 'min' + flexDirectionModel[direction].sizeName.charAt(0).toUpperCase() + flexDirectionModel[direction].sizeName.substring(1);
	
			let targetElement = findNotCloseFlexContent(originTarget, 'previousElementSibling');
			if( ! targetElement || 30 < movement){
				targetElement = originTarget;
			}
			let targetMinSize = parseFloat((window.getComputedStyle(targetElement) as any)[minSizeName]) || 0;
			let targetRect : any = targetElement.getBoundingClientRect();
			let targetSize = targetRect[flexDirectionModel[direction].sizeName] + movement;
	
			let nextElement = findNotCloseFlexContent(resizePanel.nextElementSibling, 'nextElementSibling');
	
			if( ! nextElement || 30 < (movement * -1)){
				nextElement = resizePanel.nextElementSibling as HTMLDivElement
			}
			let nextElementMinSize = parseFloat((window.getComputedStyle(nextElement) as any)[minSizeName]) || 0;
			let nextElementRect : any = nextElement.getBoundingClientRect();
			let nextElementSize = nextElementRect[flexDirectionModel[direction].sizeName] + (movement * -1);
	
			if(isOverMove(targetSize, targetMinSize)){
				nextElementSize = nextElementRect[flexDirectionModel[direction].sizeName]
				targetSize = 0;
			}else if(isOverMove(nextElementSize, nextElementMinSize)){
				targetSize = targetRect[flexDirectionModel[direction].sizeName];
				nextElementSize = 0;
			}
			
			let targetFlexGrow = (targetSize / (parentSize - 1)) * childCount;
			targetElement.style.flex = `${targetFlexGrow} 1 0%`;
			let nextElementFlexGrow = (nextElementSize / (parentSize - 1)) * childCount
			nextElement.style.flex = `${nextElementFlexGrow} 1 0%`;
			resolve();
		});
	}

	useEffect( () => {
		const addGlobalMoveEvent = function(event : Event){
			if( ! isResizePanelClick || activeIndex == null){
				return;
			}
			
			let targetElement = getContainerRefMap().get(activeIndex);
			let targetPanel = getPanelRefMap().get(activeIndex);
			if( ! targetElement || ! targetPanel){
				return ;
			}
			let move = {movementX: 0, movementY: 0};

			if(event instanceof TouchEvent){
				if(! prevTouchEvent){
					prevTouchEvent = (event as TouchEvent);
					//setPrevTouchEvent(event as TouchEvent);
					return;
				}
				move.movementX = (prevTouchEvent.touches[0].pageX - (event as TouchEvent).touches[0].pageX) * -1
				move.movementY = (prevTouchEvent.touches[0].pageY - (event as TouchEvent).touches[0].pageY) * -1
			}else{
				move.movementX = (event as MouseEvent).movementX
				move.movementY = (event as MouseEvent).movementY;
			}
			moveMouseFlex(targetElement, targetPanel, move);
		}
		new Array('mousemove', 'touchmove').forEach(eventName => {
			window.addEventListener(eventName, addGlobalMoveEvent);
		});
		new Array('mouseup', 'touchend').forEach(eventName => {
			window.addEventListener(eventName, panelMouseUpEvent);
		})
		return () => {
			new Array('mousemove', 'touchmove').forEach(eventName => {
				window.removeEventListener(eventName, addGlobalMoveEvent);
			})
			new Array('mouseup', 'touchend').forEach(eventName => {
				window.removeEventListener(eventName, panelMouseUpEvent);
			})
		};
	});
	/*useEffect(() => {
		childPanelRef.current = childPanelRef.current.slice(0, childCount);
		childContainerRef.current = childContainerRef.current.slice(0, childCount);
	}, [childCount])*/

	return (
	  <div className={`${styles.flex_layout} ${styles[direction]}`} ref={flexLayoutWrapperRef}>
		{
			(children as ReactElement[]).map( (child, index)=>{
				return <Fragment key={index}>
				<div className={`${styles.flex_layout_container}`} style={{flex : `${grow[index]} 1 0%`}} ref = {(node) => {
					const map = getContainerRefMap();
					if(node){
						map.set(index, node);
					}else {
						map.delete(index);
					}
				}}>
					{child}
				</div>
				<div className={`${styles.resize_panel} ${styles[direction]}`} ref = {(node) => {
					const map = getPanelRefMap();
					if(node){
						map.set(index, node);
					}else {
						map.delete(index);
					}
				}} onMouseDown={(event) => panelMouseDownEvent(event, index)} onTouchStart={(event) => panelMouseDownEvent(event, index)} onMouseUp={panelMouseUpEvent} onTouchEnd={panelMouseUpEvent}>
					<div className={styles.hover}>
					</div>
					<div className={styles.panel}>
			
					</div>
				</div>
				</Fragment>
			})
		}
	  </div>
	)
  }
  export default FlexLayoutWrapper;
  