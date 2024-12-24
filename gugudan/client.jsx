// 외부에서 컴포넌트를 가져와서 조립하는 페이지

import {createRoot} from 'react-dom/client';

const React = require('react');
const Gugudan = require('./gugudan');

const root = createRoot(document.querySelector('#root'));
root.render(<Gugudan />);