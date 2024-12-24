import React, {memo, useState} from 'react';

// 함수형 컴포넌트에 PureComponent를 사용하기 위해서 "memo"라는 기능을 사용

// 자식 컴포넌트가 리렌더링 되는 조건 
// 1.props 값 변경 
// 2.state 값 변경 
// 3.부모 컴포넌트 리렌더링시 -> memo는 부모 컴포넌트 리렌더링시 자식 컴포넌트가 리랜더링 되는 것을 막음
const Try = memo((props) => {
    const tryInfo = props.tryInfo;

    // tryInfo.try = '자식에서 props 변경';
    // props는 자식에서 값을 바꾸면 안된다.. 왜냐하면 props는 부모에서 자식한테 물러주었기 때문에 자식에서 props를 변경한다면 부모가 뜻하지 않게 바뀜
    // 만약 그 부모의 값을 다른 자식에서 사용한다면 문제가 발생하므로 자식에서 State를 만들어서 props값을 넣어주고 state를 변경하는 식으로 사용한다.
    const [result, setResult] = useState(tryInfo.result);

    const onClick = () => {
        setResult('update!!');
    };
    
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick}>{result}</div>
        </li>
    );
});
Try.displayName = 'Try';

export default Try;