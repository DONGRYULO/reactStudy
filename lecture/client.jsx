import {createRoot} from 'react-dom/client';
import React from 'react';
import WordReplay from './WordReplay';
import NumberBaseball from "./NumberBaseball";

const root = createRoot(document.querySelector('#root'));
root.render(<NumberBaseball />);

