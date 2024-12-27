import React, {memo, useState} from 'react';

const result = memo((props) => {
    console.log('출력');
    console.log(props);

    /// const [result, setResult] = useState(props.result);

    return (
        <div>안녕하세요</div>
        // <div>"incorrect"</div> -> <div>"correct"</div>
    );
});

// const result = (props) => {
//     console.log('출력');
//     console.log(props.result);
//
//     return(
//         <div>{props.result}</div>
//     );
// };


export default result;