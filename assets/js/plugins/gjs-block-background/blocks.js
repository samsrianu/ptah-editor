import { cBlockBgRef, blockBgRef } from './consts';

export default (editor, opt = {}) => {
    const c = opt;
    const bm = editor.BlockManager;
    const blockBgPfx = c['blockBgClsPfx'] || 'b-block-background';
    const style = c.defaultStyle ? `
      <style>
        .${blockBgPfx} {
            display: block;
            width: 100%;
            height: 100%;
            background: transparent none center center no-repeat ;
            background-size: auto 100%;
            display: flex;
        }
      </style>
    ` : '';

    if (c.blocks.indexOf(cBlockBgRef) >= 0) {
        bm.add(cBlockBgRef, {
            label: c['labelBlockBg'],
            category: c['labelBlockBgCategory'],
            attributes: {class:'fa fa-picture-o'},
            content: `
                <div class=\"${blockBgPfx}\" data-gjs-type=\"${blockBgRef}\" data-gjs-droppable=\"true\" data-gjs-custom-name=\"${c.labelBlockBg}\" data-gjs=\"${blockBgRef}\">
                </div>
                ${style}
            `,
        });
    }
}