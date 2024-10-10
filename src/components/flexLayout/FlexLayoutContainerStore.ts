import { RefObject } from 'react';
import { BehaviorSubject } from 'rxjs';
import { filter, map, scan } from 'rxjs/operators';

// 중첩된 객체 구조로 ref를 관리하는 타입
type RefStore = {
    [layoutName: string]: {
        [containerName: string]: RefObject<HTMLElement>;
    };
};

// 초기값으로 빈 객체를 설정한 BehaviorSubject 생성
export const flexContainerStore = new BehaviorSubject<RefStore>({});

// 구독 시 이전 상태들을 축적하여 관리
// const stateWithHistory$ = flexContainerStore.pipe(
//     scan((acc, newState) => [...acc, newState], [] as RefStore[])
// );

// ref를 업데이트하는 함수
export const setContainerRef = (
    layoutName: string,
    containerName: string,
    ref: React.RefObject<HTMLElement>
) => {
    const currentRefs = flexContainerStore.getValue();
    // layoutName 또는 containerName 중복 검사
    if (currentRefs[layoutName]?.[containerName]) {
        return;
        // throw new Error(
        //     `Ref already exists for layout: ${layoutName}, container: ${containerName}`
        // );
    }

    // // 다른 layout에서도 동일한 containerName이 있는지 검사
    // if (Object.keys(currentRefs).find(key => currentRefs[key][containerName])) {
    //     throw new Error(
    //         `Ref already exists for container: ${containerName} in another layout`
    //     );
    // }
    //console.log(layoutName, containerName, ref.current);
    // 해당 layoutName과 containerName의 ref 저장
    flexContainerStore.next({
        ...currentRefs,
        [layoutName]: {
            ...currentRefs[layoutName],
            [containerName]: ref,
        },
    });
};

// 특정 layoutName을 구독하는 함수
export const getLayoutRef = (layoutName: string) => {
    return flexContainerStore.asObservable().pipe(
        map((refs: RefStore) => refs[layoutName] || null),
        filter(ref => ref !== null)
    );
};

// 특정 containerName의 ref를 구독하는 함수
// layoutName이 지정되지 않으면 전체 layout에서 해당하는 containerName의 ref를 찾음
export const getContainerRef = ({
    containerName,
    layoutName,
}: {
    containerName: string;
    layoutName?: string;
}) => {
    return flexContainerStore.pipe(
        map((refs: RefStore) => {
            if (layoutName) {
                // 지정된 layoutName에서 해당 containerName의 ref 반환
                return refs[layoutName]?.[containerName] || null;
            } else {
                // 모든 layout에서 해당 containerName의 ref 찾기
                return Object.entries(refs).find(
                    ([key, value]) => refs[key][containerName]
                )?.[1];
            }
            // else {
            //     // 모든 layout에서 해당 containerName의 ref 찾기
            //     for (const layout in refs) {
            //         if (refs[layout][containerName]) {
            //             return refs[layout][containerName];
            //         }
            //     }
            //     return null;
            // }
        }),
        filter(ref => ref !== null)
    );
};
