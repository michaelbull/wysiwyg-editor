import { Html } from 'slate';
import { block } from './rule/Block.jsx';
import { image } from './rule/Image.jsx';
import { mark } from './rule/Mark.jsx';
import { subtitle } from './rule/Subtitle.jsx';

const rules = [
    block,
    image,
    mark,
    subtitle
];

export const html = new Html({ rules });
