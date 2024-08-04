BO TEAMPLATE 프로젝트

# Setting Development environment for Window (for pm2 test)

## step 1 : 
- Open Window power shell

## step 2 :
-  Enter Command 
``` bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

wsl --install
```
- and Reboot your computer

## step 3 :
- open ubuntu
``` bash
sudo apt-get install curl

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

nvm ls  

nvm install --lts
```
(찾을 수 없는 명렁(not found nvm command)이 나올시 close and open terminal )

## step 4 :
- Open VSCODE
- install WSL and install Remote Explorer <br/>
  ![wsl](https://github.com/joohyoungkim19940805/imgRepository/blob/main/wsl.PNG?raw=true)
- Connect to... WSL <br/>
  ![4545](https://github.com/joohyoungkim19940805/imgRepository/blob/main/4545.PNG?raw=true)
- git clone this repository

# Getting Started Command

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# next js app router 방식은 풀더 경로가 url 구조가 됨 

###  src/app/ === http://localhost:3000/ <br/>

###  src/app/menu1page === http://localhost:3000/menu1page <br/>
![url](https://github.com/joohyoungkim19940805/imgRepository/blob/main/url.PNG?raw=true)


# 동적 경로 사용법 
###  src/app/[id] == http://localhost:3000/{id} <br/>
###  src/app/[...id] (id == [1,2,3]) == http://localhost:3000/1/2/3 <br/>

# React
## useRef() == dom 객체 핸들링시 
``` typescript
const flexLayoutWrapperRef = useRef<HTMLDivElement>(null);
const parentSize = (flexLayoutWrapperRef.current?.getBoundingClientRect() as any)[flexDirectionModel[direction].sizeName];

//JSX ===
<div className={`${styles.flex_layout} ${styles[direction]}`} ref={flexLayoutWrapperRef}>
  {children}
</div>
```

## useState() == jsx 내부 변수 상태 관리 

### isLogin 변수의 상태값이 변경될 때마다 html을 동적으로 변경 
``` typescript
const [isLogin, setIsLogin] = useState(false);
const [isLoginClick, setIsLoginClick] = useState(false);

//JSX ===
<div>
  {! isLogin ? 
  <button onClick={(e) => setIsLoginClick(!isLoginClick)}>
    Login~
  </button>
  : 
  <button type='button' onClick={() => {callLogoutLogic();}}>
  logout!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  </button>
  }
</div>
```

### 잘못된 사용법 
``` typescript
let isLogin = false;

//JSX ===
<div>
  {! isLogin ? 
  <button onClick={(e) =>{
    isLogin = true;
  }}>
    Login~
  </button>
  : 
  <button type='button' onClick={() => {callLogoutLogic();}}>
  logout!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  </button>
  }
</div>
```
jsx 내부에서 클로저된 변수를 참조 할 수 없기에 useState의 set...을 이용하는 것

## useEffect == 렌더링 될 때 마다 실행 
#### @see https://react.dev/reference/react/useEffect  <br/>

### window 객체에 이벤트 핸들러 사용할 시
``` typescript
useEffect( () => {
  new Array('mousemove', 'touchmove').forEach(eventName => {
    window.addEventListener(eventName, addGlobalMoveEvent);
  });
  // addEventListener 등록시 다시 이벤트 핸들러를 제거해야함 (렌더링 될 때 마다 실행되면서 동일한 이벤트 핸들러가 중복되어 등록됨)
  return () => {
    new Array('mousemove', 'touchmove').forEach(eventName => {
      window.removeEventListener(eventName, addGlobalMoveEvent);
    })
  }
});
```

## css module (퍼블리셔와 함께 작업하기 위해 css module을 사용합니다.)
### 여러개의 클래스 네임 사용시
``` css
.flex_layout{
    display: inline-flex;
    height: 100%;
    width: 100%;
    overflow: auto;
    overflow-wrap: revert-layer;
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.flex_layout.row{
    flex-direction: row;
}
```
``` typescript
import styles from '@styles/flexLayout.module.css'

//JSX ===
<div className={`${styles.flex_layout} ${styles[direction]}`} ref={flexLayoutWrapperRef}></div>
```

### 자식요소 사용시
```css
.resize_panel.row{
    width: 4px;
    height: 100%;
    cursor: ew-resize;
}
.resize_panel:hover > .hover {
    width: inherit;
    height: inherit;
}
.resize_panel > .panel{
    width: 100%;
    height: 100%;
}
```
```typescript
//JSX ===
<div className={`${styles.resize_panel} ${styles[direction]}`}>
  <div className={styles.hover}>
  </div>
	<div className={styles.panel}>
  </div>
</div>
```

## 전역적인 상태 전달 (로그인 관련)
### /src/components/globalContextWrapper/GlobalAccountContextWrapper.tsx 참조

### GlobalAccountContextWrapper.tsx를 이용하여 동적으로 로그인 상태에 따른 화면 핸들링
```typescript
const {isLogin, checkIsLoginForToken, callLogoutLogic, callLoginLogic} = useContext(AccountContext);
const [isLoginClick, setIsLoginClick] = useState(false);

//JSX ===
<div>
  {! isLogin ? 
  <button onClick={(e) => setIsLoginClick(!isLoginClick)}>
    Login~
  </button>
  : 
  <button type='button' onClick={() => {
    callLogoutLogic();
  }}>
  logout!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  </button>
  }
</div>
```

# 외부 api 호출 (api route)

- api는 src/app/api/... 경로를 이용한다.
- 파일 명칭은 route.ts로 한다. (next js 규칙, 미준수시 동작 안함)
- route.ts에서 export 할 때 함수 명칭은 GET, POST, PUT, DELETE 등 http method 규칙을 따른다 (next js 규칙, 미준수시 동작 안함) (export default 사용하지 말 것)

## example
![url2](https://github.com/joohyoungkim19940805/imgRepository/blob/main/url2.PNG?raw=true)

## 풀더 경로가 src/app/api/user/list 인 경우 
- (page.tsx) window.fetch(`/api/user/list`, {method: 'GET'}) <br/>
#### route.ts
![ro2](https://github.com/joohyoungkim19940805/imgRepository/blob/main/ro2.PNG?raw=true)
#### page.ts
![t2](https://github.com/joohyoungkim19940805/imgRepository/blob/main/t2.PNG?raw=true)

## 풀더 경로가 src/app/api/login/loginProcessing 인 경우
- (page.tsx) window.fetch(`/api/login/loginProcessing`, {method: 'POST'})
#### route.ts
![routetsx1](https://github.com/joohyoungkim19940805/imgRepository/blob/main/routetsx1.PNG?raw=true)
