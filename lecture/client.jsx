import {createRoot} from 'react-dom/client';
import React from 'react';
// import WordReplay from './WordReplay';
// import NumberBaseball from "./NumberBaseball";
// import ResponseCheck from "./ResponseCheck_hooks";
import RSP from "./RSP_hooks"

const root = createRoot(document.querySelector('#root'));
root.render(<RSP />);

