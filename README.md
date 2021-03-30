# React Hooks

functional component에서도 state를 사용할 수 있다!

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

## useTabs

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
  const tabs = useTaps(0, content);
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
