export function isOverMove(elementSize: number, elementMinSize: number) {
    return (
        Math.floor(elementSize) <= 0 ||
        (isNaN(elementMinSize)
            ? false
            : elementMinSize >= Math.floor(elementSize))
    );
}
export function findNotCloseFlexContent(target: any, direction: string) {
    const isCloseCheck = () => {
        let grow =
            parseFloat(window.getComputedStyle(target).flex.split(' ')[0]) || 0;
        if (grow == 0) {
            return true;
        } else {
            return false;
        }
    };
    while (isCloseCheck()) {
        let nextTarget = target[direction]?.[direction];
        if (!nextTarget) {
            break;
        }
        target = nextTarget;
    }
    return target as HTMLElement | HTMLDivElement | null;
}
export function remain(flexContainerList: Array<HTMLElement>) {
    return new Promise(resolve => {
        let notGrowList: Array<HTMLElement> = [];
        let totalGrow = flexContainerList.reduce((t, e, i) => {
            if (e.hasAttribute('data-grow') == false) {
                notGrowList.push(e);
                return t;
            }
            let grow = parseFloat(e.dataset.grow || '');
            e.style.flex = `${grow} 1 0%`;
            t -= grow;
            return t;
        }, flexContainerList.length);

        if (notGrowList.length != 0) {
            resize(notGrowList, totalGrow);
        }

        resolve(flexContainerList);
    });
}

export function resize(list: Array<HTMLElement>, totalGrow: number) {
    return new Promise(resolve => {
        //list = list.filter(e=>e.dataset.grow != '0');
        let resizeWeight = mathWeight(list.length, totalGrow);
        list.forEach(e => {
            if (e.hasAttribute('data-grow')) {
                e.dataset.grow = resizeWeight.toString();
                e.style.flex = `${resizeWeight} 1 0%`;
            } else {
                e.style.flex = `${resizeWeight} 1 0%`;
            }
        });
        resolve(resizeWeight);
    });
}

export function mathWeight(totalCount: number, totalGrow: number) {
    return 1 + (totalGrow - totalCount) / totalCount;
}
export function mathGrow(
    childSize: number,
    parentSize: number,
    containerCount: number
) {
    return containerCount * (childSize / parentSize);
}
export function getGrow(growTarget: HTMLElement | Element) {
    const target =
        growTarget instanceof Element
            ? (growTarget as HTMLElement)
            : growTarget;
    return (
        parseFloat(target.style.flex.split(' ')[0]) ||
        parseFloat(target.dataset.grow || '')
    );
}
export function closeFlex(
    resizeTarget: HTMLElement,
    containers: HTMLElement[],
    { isResize = false, isDsiabledResizePanel = false } = {}
) {
    return new Promise(resolve => {
        if (!resizeTarget.hasAttribute('data-is_resize')) {
            resolve(resizeTarget);
            return;
        } else if (isDsiabledResizePanel) {
            resizeTarget.dataset.is_resize = 'false';
        }

        resizeTarget.dataset.prev_grow = getGrow(resizeTarget).toString();

        let notCloseList = containers.filter(
            e => e.style.flex != '0 1 0%' && e != resizeTarget
        );
        let notCloseAndOpenTargetList = [...notCloseList, resizeTarget];
        //let resizeWeight = this.mathWeight(notCloseList, this.#forResizeList.length);
        notCloseAndOpenTargetList.forEach(e => {
            e.style.transition = 'flex 0.5s';
            e.ontransitionend = event => {
                if (event.propertyName != 'flex-grow') {
                    return;
                }
                e.style.transition = '';
                e.ontransitionend = () => {};
            };

            if (e == resizeTarget) {
                e.dataset.grow = '0';
                e.style.flex = `0 1 0%`;
                return;
            }

            if (isResize) {
                return;
            }

            let percent = getGrow(e) / containers.length;
            //let percentWeight = this.#forResizeList.length * percent;
            //let remainWeight = resizeWeight * percent;
            if (notCloseList.length == 1) {
                e.dataset.grow = containers.length.toString();
                e.style.flex = `${containers.length} 1 0%`;
                return;
            }
            e.dataset.grow = (containers.length * percent).toString();
            e.style.flex = `${containers.length * percent} 1 0%`;
        });

        if (isResize) {
            resize(notCloseList, containers.length);
        }

        resolve(resizeTarget);
    });
}

export function openFlex(
    resizeTarget: HTMLElement,
    containers: HTMLElement[],
    { isPrevSizeOpen = false, isResize = false, openGrowImportant = 0 } = {}
) {
    return new Promise(resolve => {
        if (!resizeTarget.hasAttribute('data-is_resize')) {
            resolve(resizeTarget);
            return;
        } else if (resizeTarget.dataset.is_resize == 'false') {
            resizeTarget.dataset.is_resize = 'true';
        }

        let notCloseList = containers.filter(
            e => e.style.flex != '0 1 0%' && e != resizeTarget
        );
        let notCloseAndOpenTargetList = [...notCloseList, resizeTarget];
        //let resizeWeight = this.mathWeight(notCloseAndOpenTargetList, this.#forResizeList.length);
        let openTargetGrow = 1;
        if (isPrevSizeOpen && resizeTarget.hasAttribute('data-prev_grow')) {
            openTargetGrow =
                parseFloat(resizeTarget.dataset.prev_grow || '1') || 1;
            //resizeTarget.removeAttribute('data-prev_grow');
        }
        if (openGrowImportant) {
            openTargetGrow = openGrowImportant;
        }
        //notCloseList.forEach(e=>{
        notCloseAndOpenTargetList.forEach(e => {
            e.style.transition = 'flex 0.5s';
            e.ontransitionend = event => {
                if (event.propertyName != 'flex-grow') {
                    return;
                }
                e.style.transition = '';
                e.ontransitionend = () => {};
            };

            if (isResize) {
                return;
            }

            if (e == resizeTarget) {
                resizeTarget.dataset.grow = openTargetGrow.toString();
                resizeTarget.style.flex = `${openTargetGrow} 1 0%`;
                return;
            }

            let percent =
                getGrow(e) / containers.length -
                openTargetGrow / containers.length;
            e.dataset.grow = (containers.length * percent).toString();
            e.style.flex = `${containers.length * percent} 1 0%`;
        });

        if (isResize) {
            resize(notCloseAndOpenTargetList, containers.length);
        }

        resolve(resizeTarget);
    });
}
