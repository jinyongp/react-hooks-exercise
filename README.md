# React Hooks

functional component에서도 state를 사용할 수 있다!

## useState(initialState)

```jsx
import { useState } from "react";

const [value, setValue] = useState(0);
```

`value`는 state이고, 이를 변경하기 위해선 반드시 `setValue` 함수를 통해야 한다.

## useEffect(callbackFunc, deps)

```jsx
import { useEffect } from "react";

function foo() {
  console.log("Component did mount!");
}

useEffect(foo);
```

`componentDidMount`와 같은 역할을 한다. `deps`를 추가하여 해당 state가 변할 때만 `componentDidUpdate`가 실행될 수 있도록 한다.

```jsx
import { useState, useEffect } from "react";

const [value, setValue] = useState(0);

function foo() {
  console.log("Component did mount!");
  console.log("Component did update!");
}

useEffect(foo, [value]);

setValue(1); // state update!
```

`deps`를 비워두면 `componentDidMount`만 실행된다.

```jsx
useEffect(() => {
  console.log("Component did mount!");
}, []);
```

함수를 `return`하면 그 함수는 `componentWillUnmount`와 동일한 역할을 한다.

```jsx
useEffect(() => {
  return () => {
    console.log("Component will unmount!");
  }
});
```

## useRef()

```jsx
import { useRef } from "react";

const inputRef = useRef();
setTimeout(() => inputRef.current.focus(), 5000);

<input ref={inputRef} />
```

`inputRef.current`가 `input` 태그를 참조하고 있다. 위 코드는 5초 후 `input` 태그를 포커싱한다.

## useInput(initial, validator?)

[source](./src/nooks/useInput.js)

```jsx
function App() {
  const name = useInput("");
  return (
    <div className="App">
      <input placeholder="Name" {...name} />
    </div>
  );
}
```

`{...name}`은 `value={name.value} onChange={name.onChange}`와 같다.

2번째 인자는 validator를 추가하여 유효한 값만 입력되도록 설정할 수 있다.

## useTabs(initial, tabs)

[source](./src/nooks/useTabs.js)

```jsx
const content = [
  {
    tab: "Section 1",
    content: "Content of the section 1",
  },
  {
    tab: "Section 2",
    content: "Content of the section 2",
  },
];

function App() {
  const tabs = useTabs(0, content);
  return (
    <div className="App">
      {content.map((section, index) => (
        <button key={index} onClick={() => tabs.changeContent(index)}>
          {section.tab}
        </button>
      ))}
      <div>{tabs.content.content}</div>
    </div>
  );
}
```

hook을 이용해 간편하게 tab을 구현하였다.

## useTitle(initial)

[source](./src/nooks/useTitle.js)

```jsx
function App() {
  const updateTitle = useTitle("Loading...");
  useEffect(() => {
    async function foo() {
      const { title } = await bar();
      updateTitle(title);
    }
    foo();
  }, [...]);
}
```

비동기 작업에 따라 title이 변경될 필요가 있을 때 사용할 수 있다.

## useClick(onClick)

[source](./src/nooks/useClick.js)

```jsx
function App() {
  const title = useClick(() => {
    console.log("Title clicked!");
  });
  return (
    <div className="App">
      <h1 ref={title}>Hello</h1>
    </div>
  );
}
```

`h1` 태그가 선택되면 `useClick`의 콜백함수가 실행된다.

## useHover(onHover)

[source](./src/nooks/useHover.js)

```jsx
function App() {
  const title = useHover(() => {
    console.log("Mouse hovered!");
  });
  return (
    <div className="App">
      <h1 ref={title}>Hello</h1>
    </div>
  );
}
```

`h1` 태그에 마우스가 올라가면 `useHover`의 콜백함수가 실행된다.

## useConfirm(message, onConfirm, onCancel?)

[source](./src/nooks/useConfirm.js)

```jsx
function App() {
  const confirmAction = useConfirm("Are you sure?", () => {
    console.log("Deleting the world...");
  });
  return (
    <div className="App">
      <button onClick={confirmAction}>Delete the world?</button>
    </div>
  );
}
```

browser에서 `confirm` 여부를 확인하고 `onConfirm` 혹은 `onCancel` 함수를 실행한다.

## usePreventLeave()

[source](./src/nooks/usePreventLeave.js)

[reference](https://developer.mozilla.org/ko/docs/Web/API/Window/beforeunload_event)(beforeunload)

```jsx
function App() {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div className="App">
      <button onClick={enablePrevent}>Protected</button>
      <button onClick={disablePrevent}>Unprotected</button>
    </div>
  );
}
```

`Protected` 버튼을 클릭하면 페이지를 나가거나 새로고침할 때 여부를 재차 확인한다. `Unprotected` 버튼을 클릭하면 여부 확인을 취소한다.

## useBeforeLeave(onLeave)

[source](./src/nooks/useBeforeLeave.js)

```jsx
function App() {
  useBeforeLeave(() => console.log("mouse leave..."));
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}
```

마우스가 브라우저를 벗어날 때 발생하는 이벤트를 추가할 수 있다.

## useFadeIn({ duration?, timingFunction?, delay? })

[source](./src/nooks/useFadeIn.js)

```jsx
function App() {
  const h1FadeIn = useFadeIn({ duration: 1.5, timingFunction: "ease-in-out" });
  const pFadeIn = useFadeIn({ delay: 1, duration: 2 });
  return (
    <div className="App">
      <h1 {...h1FadeIn}>Hello</h1>
      <p {...pFadeIn}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam de isto
        magna dissensio est. Sed quae tandem ista ratio est? Si verbum sequimur,
      </p>
    </div>
  );
}
```

`useFadeIn`은 `{ duration = 1, timingFunction = "ease", delay = 0 }`을 기본 매개변수로 가진다.
변경하고자 하는 속성을 인자에서 설정하면 된다.

## useNetwork(omChange)

[source](./src/nooks/useNetwork.js)

```jsx
function App() {
  const status = useNetwork((online) => {
    if (online) {
      // ...stuff to do while online.
    } else {
      // ...stuff to do while offline.
    }
  });
  return (
    <div className="App">
      <h1>{status ? "Online" : "Offline"}</h1>
    </div>
  );
}
```

인터넷 연결 여부를 확인하여, 연결되었을 경우 `true`, 연결되지 않았을 경우 `false`로 설정된다. 인터넷 연결이 끊기거나 연결될 때 콜백함수를 실행하거나 `status`를 얻을 수 있다.

## useScroll()

[source](./src/nooks/useScroll.js)

```jsx
function App() {
  const { scrollY } = useScroll();
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1 style={{ position: "fixed", color: scrollY > 500 && "red" }}>
        Hello
      </h1>
    </div>
  );
}
```

`scrollY`가 500 이상일 때 스타일이 변경된다.

## useFullscreen()

[source](./src/nooks/useFullscreen.js)

```jsx
function App() {
  const { ref, enterFullscreen } = useFullscreen((fullscreenElement) => {
    console.log(fullscreenElement ? "Entered fullscreen mode!" : "Exited fullscreen mode!");
  });
  return (
    <div className="App">
      <img
        src="https://picsum.photos/800/600"
        alt="picsum"
        ref={ref}
        onClick={enterFullscreen}
      />
    </div>
  );
}
```

이미지를 클릭하면 전체화면으로 전환된다. 전체화면을 나가기 위해 `esc`를 누르거나 `exitFullscreen` 함수를 `useFullscreen()`으로부터 얻어 호출해야 한다. 인자에 `callback` 함수를 추가하여 전체화면에 진입하고 나올 때 동작을 정의할 수 있다.

## useNotification

[source](./src/nooks/useNotification.js)

[Notification API](https://developer.mozilla.org/ko/docs/Web/API/notification)

```jsx
function App() {
  const notify = useNotification("Alert", { body: "This is alert." });
  return (
    <div className="App">
      <button onClick={notify}>Notification</button>
    </div>
  );
}
```

`button`을 클릭하면 알림이 전송된다. 브라우저의 `Notification`이 `Allow`여야만 한다.
