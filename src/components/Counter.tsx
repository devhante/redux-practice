import React from 'react';

interface IProps {
  number: number;
  diff: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onSetDiff: (diff: number) => void;
}

function Counter(props: IProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onSetDiff(parseInt(event.target.value, 10));
  };
  return (
    <div>
      <h1>{props.number}</h1>
      <div>
        <input type="number" value={props.diff} min="1" onChange={onChange} />
        <button onClick={props.onIncrease}>+</button>
        <button onClick={props.onDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;
