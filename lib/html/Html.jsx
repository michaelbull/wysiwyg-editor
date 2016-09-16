import { Html } from 'slate';
import { abbreviation } from './rule/Abbreviation.jsx';
import { block } from './rule/Block.jsx';
import { image } from './rule/Image.jsx';
import { mark } from './rule/Mark.jsx';
import { subtitle } from './rule/Subtitle.jsx';

const rules = [
    abbreviation,
    block,
    image,
    mark,
    subtitle
];

export const html = new Html({ rules });
