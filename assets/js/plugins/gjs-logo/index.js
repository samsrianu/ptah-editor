import grapesjs from 'grapesjs';
import loadBlocks from './blocks';
import loadComponents from './components';
import { cLogoRef } from './consts';

export default grapesjs.plugins.add('gjs-logo', (editor, opts = {}) => {
    let c = opts;

    let defaults = {
        blocks: [cLogoRef],
        defaultStyle: 1,
        buttonClsPfx: 'b-lp-logo',
        labelLogoBlock: 'Logo',
        labelLogoCategory: 'Landing Constructor',
        defaultLogoUrl: 'https://gn266.cdn.gamenet.ru/TY0Xv2riHu/6hxyU/o_1DNqc3.png'
    };

    for (let name in defaults) {
        if (!(name in c))
            c[name] = defaults[name];
    }

    loadBlocks(editor, c);
    loadComponents(editor, c);
});