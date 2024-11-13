import { Fragment, ReactNode, ReactElement } from 'react';
import styles from './FlexLayout.module.css';
import FlexResizePanel from '@/components/flexLayout/FlexResizePanel';
import { FlexLayoutProps } from '@/components/flexLayout/@types/FlexLayoutTypes';
import { FlexLayoutContainer } from '@/components/flexLayout/FlexLayoutContainer';

const FlexLayout = (props: FlexLayoutProps) => {
    const { direction, childrenTemplate, children } = props;
    //if (!childrenTemplate) return null;
    return (
        <div className={`${styles['flex-layout']}`} data-direction={direction}>
            {(children as ReactElement[]).map((child, index) => {
                //let fitContent: 'width' | 'height' | undefined = undefined;
                //if (childrenTemplate[index].isFitContent) {
                const fitContent = direction === 'row' ? 'width' : 'height';
                //}
                const { panelMode, ...containerProps } =
                    childrenTemplate[index];
                return (
                    <Fragment key={index}>
                        <FlexLayoutContainer
                            {...containerProps}
                            fitContent={fitContent}
                            containerCount={(children && children.length) || 0}
                            layoutName={props.layoutName}
                        >
                            {child}
                        </FlexLayoutContainer>
                        {/* 클라이언트 사이드에서만 리사이즈 패널 처리 */}
                        {childrenTemplate[index]['data-is_resize'] && (
                            <FlexResizePanel
                                containerName={containerProps.containerName}
                                layoutName={props.layoutName}
                                direction={direction}
                                containerCount={
                                    (children && children.length) || 0
                                }
                                panelMode={panelMode}
                            />
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
};
export default FlexLayout;
