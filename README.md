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
