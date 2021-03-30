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
