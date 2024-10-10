import {
    BehaviorSubject,
    Observable,
    ReplaySubject,
    Subject,
    Subscriber,
    auditTime,
    concatMap,
    distinctUntilChanged,
    filter,
    fromEvent,
    isEmpty,
    map,
    mergeMap,
    of,
    scan,
    takeUntil,
    takeWhile,
    throttleTime,
    timeout,
} from 'rxjs';

export let documentFocusout: Observable<FocusEvent>;
export let documentFocusin: Observable<FocusEvent>;
export let windowResize: Observable<UIEvent>;
export let windowHashChange: Observable<HashChangeEvent>;
export let documentKeyDown: Observable<KeyboardEvent>;
export let documentKeyUp: Observable<KeyboardEvent>;
export let windowMouseUp: Observable<MouseEvent>;
export let windowMouseMove: Observable<MouseEvent>;
export let accessNavigation: ReplaySubject<PerformanceEntry>;

let isFocus = false;

// 클라이언트 환경에서만 이벤트 등록
if (typeof window !== 'undefined') {
    // 포커스 in일 때 true out일 때 false 플래그로 구분하여서 리사이즈 이벤트 방출 막기
    // (사용자가 무언가 작성 중일시 키보드  UI 올라오면서 리사이즈되는 것 방지 - 모바일 안드로이드) 2024 05 06
    documentFocusout = fromEvent<FocusEvent>(document, 'focusout');
    documentFocusin = fromEvent<FocusEvent>(document, 'focusin');

    documentFocusin.subscribe({
        next: ev => (isFocus = (ev.target as Element).tagName === 'INPUT'),
    });

    documentFocusout
        .pipe(
            auditTime(1000),
            filter(ev => document.activeElement?.tagName !== 'INPUT')
        )
        .subscribe({
            next: () => {
                if (isFocus) isFocus = false;
            },
        });

    windowResize = fromEvent<UIEvent>(window, 'resize').pipe(
        distinctUntilChanged(),
        filter(() => document.activeElement?.tagName !== 'INPUT' && !isFocus)
    );

    windowHashChange = fromEvent<HashChangeEvent>(window, 'hashchange');

    documentKeyDown = fromEvent<KeyboardEvent>(document, 'keydown');
    documentKeyUp = fromEvent<KeyboardEvent>(document, 'keyup');

    windowMouseUp = fromEvent<MouseEvent>(window, 'mouseup');
    windowMouseMove = fromEvent<MouseEvent>(window, 'mousemove');

    accessNavigation = new ReplaySubject<PerformanceEntry>(3);
    performance.getEntriesByType('navigation').forEach(entry => {
        accessNavigation.next(entry);
    });
}
