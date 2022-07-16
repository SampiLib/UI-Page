import "./scaledPage.scss"
import { svg } from "../common/svg.js";
import { Content, ContentBaseOptions } from "../ui/content.js";
import { InstrumentBase } from "../instruments/common";
import { initWebComponentWithOptions } from "../common/webComponent";

/** Defines base options for components with values
 * @typedef {Object} ScaledPageInternalOptions
 * @property {[InstrumentBase]} instruments
 * @property {number} width
 * @property {number} height
 * 
 * @typedef {ContentBaseOptions & ScaledPageInternalOptions} ScaledPageOptions */


export let ScaledPage = class extends Content {
    constructor() {
        super();
        this.__width = 0;
        this.__height = 0;
        this.__page = this.appendChild(svg(undefined, undefined, "0 0 0 0"));
    }

    /**Options toggeler
     * @param {ScaledPageOptions} options*/
    options(options) {
        if (options.instruments) {
            for (let i = 0, n = options.instruments.length; i < n; i++) {
                this.appendInstrument(options.instruments[i]);
            }
        }
        if (options.width) {
            this.width = options.width;
        }
        if (options.height) {
            this.height = options.height;
        }
    }

    /**Generates an instance of the readout instrument
     * @param {ScaledPageOptions} options
     * @returns {ScaledPage} */
    static create(options) {}

    /**Name for creation of element
     * @returns {string}*/
    static get elementName() { return 'ui-scaledpage'; }

    /**This sets the width of the grid
     * @param {number} w*/
    set width(w) {
        this.__width = w;
        this.__page.setAttribute("viewBox", '0 0 ' + this.__width + ' ' + (this.__height || 0));
    }

    /**Returns the width of the grid
     * @returns {number} */
    get width() {
        return this.__width;
    }

    /**This sets the height of the grid
     * @param {number} */
    set height(h) {
        this.__height = h;
        this.__page.setAttribute("viewBox", '0 0 ' + (this.__width || 0) + ' ' + this.__height);
    }

    /**Returns the height of the grid
     * @returns {number} */
    get height() {
        return this.__height;
    }

    /** Appends instrument to page
     * @param {InstrumentBase} instr instrument to append
     * @param {InstrumentBase} below instrument to render instrument below*/
    appendInstrument(instr, below) {
        if (instr instanceof InstrumentBase) {
            if (below && below instanceof InstrumentBase) {
                this.__page.insertBefore(instr.__container, below.__container);
            } else {
                this.__page.append(instr.__container);
            }
        }
    }
}
initWebComponentWithOptions(ScaledPage);
export let scaledPage = ScaledPage.create;