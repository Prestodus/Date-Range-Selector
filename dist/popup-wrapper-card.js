function t(t,e,i,o){var n,s=arguments.length,r=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(s<3?n(r):s>3?n(e,i,r):n(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,o))(e)})(t):t;var l;const c=window,p=c.trustedTypes,d=p?p.emptyScript:"",h=c.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:g},v="finalized";let _=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))}),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty(v))return!1;this[v]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const o=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{i?t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):o.forEach(i=>{const o=document.createElement("style"),n=e.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=i.cssText,t.appendChild(o)})})(o,this.constructor.elementStyles),o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=f){var o;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,n=o._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=o.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=n,this[n]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var y;_[v]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:_}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const b=window,$=b.trustedTypes,m=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,A="?"+w,C=`<${A}>`,E=document,S=()=>E.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,T="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,H=/>/g,z=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,N=/"/g,M=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),I=new WeakMap,V=E.createTreeWalker(E,129,null,!1);function D(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==m?m.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":"",r=O;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,p=0;for(;p<i.length&&(r.lastIndex=p,l=r.exec(i),null!==l);)p=r.lastIndex,r===O?"!--"===l[1]?r=U:void 0!==l[1]?r=H:void 0!==l[2]?(M.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=z):void 0!==l[3]&&(r=z):r===z?">"===l[0]?(r=null!=n?n:O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?z:'"'===l[3]?N:R):r===N||r===R?r=z:r===U||r===H?r=O:(r=z,n=void 0);const d=r===z&&t[e+1].startsWith("/>")?" ":"";s+=r===O?i+C:c>=0?(o.push(a),i.slice(0,c)+x+i.slice(c)+w+d):i+w+(-2===c?(o.push(void 0),e):d)}return[D(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),o]};class F{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,s=0;const r=t.length-1,a=this.parts,[l,c]=W(t,e);if(this.el=F.createElement(l,i),V.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=V.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith(x)||e.startsWith(w)){const i=c[s++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+x).split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?Q:"@"===e[1]?X:G})}else a.push({type:6,index:n})}for(const e of t)o.removeAttribute(e)}if(M.test(o.tagName)){const t=o.textContent.split(w),e=t.length-1;if(e>0){o.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],S()),V.nextNode(),a.push({type:2,index:++n});o.append(t[e],S())}}}else if(8===o.nodeType)if(o.data===A)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(w,t+1));)a.push({type:7,index:n}),t+=w.length-1}n++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,o){var n,s,r,a;if(e===j)return e;let l=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const c=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,o)),void 0!==o?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(e=q(t,l._$AS(t,e.values),l,o)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(i,!0);V.currentNode=n;let s=V.nextNode(),r=0,a=0,l=o[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new K(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new tt(s,this,t)),this._$AV.push(e),l=o[++a]}r!==(null==l?void 0:l.index)&&(s=V.nextNode(),r++)}return V.currentNode=E,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,o){var n;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),k(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==L&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=F.createElement(D(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new Y(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new F(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new K(this.k(S()),this.k(S()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class G{constructor(t,e,i,o,n){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=q(this,t,e,0),s=!k(t)||t!==this._$AH&&t!==j,s&&(this._$AH=t);else{const o=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=q(this,o[i+r],e,r),a===j&&(a=this._$AH[r]),s||(s=!k(a)||a!==this._$AH[r]),a===L?t=L:t!==L&&(t+=(null!=a?a:"")+n[r+1]),this._$AH[r]=a}s&&!o&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}const Z=$?$.emptyScript:"";class Q extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==L?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class X extends G{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:L)===j)return;const o=this._$AH,n=t===L&&o!==L||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==L&&(o===L||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const et=b.litHtmlPolyfillSupport;null==et||et(F,K),(null!==(y=b.litHtmlVersions)&&void 0!==y?y:b.litHtmlVersions=[]).push("2.8.0");var it,ot;class nt extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,n;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let r=s._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=r=new K(e.insertBefore(S(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return j}}nt.finalized=!0,nt._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:nt});const st=globalThis.litElementPolyfillSupport;null==st||st({LitElement:nt}),(null!==(ot=globalThis.litElementVersions)&&void 0!==ot?ot:globalThis.litElementVersions=[]).push("3.3.3");const rt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){customElements.define(t,e)}}})(t,e),at=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function lt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):at(t,e)}function ct(t){return lt({...t,state:!0})}var pt;null===(pt=window.HTMLSlotElement)||void 0===pt||pt.prototype.assignedElements;let dt=class extends nt{setConfig(t){this.config=t}connectedCallback(){super.connectedCallback(),(async()=>{if(customElements.get("ha-selector"))return;const t=await(window.loadCardHelpers?.());if(!t)return;const e=await t.createCardElement({type:"entity"});e&&await e.getConfigElement()})()}static getStubConfig(){return{type:"custom:popup-wrapper-card",trigger_type:"floating",floating_button_position:"bottom-right",floating_button_icon:"mdi:card",floating_button_text:"",popup_title:"Card",auto_open:!1,close_on_click_outside:!0,card:{type:"entities",entities:[]}}}_valueChanged(t){if(!this.config||!this.hass)return;const e=t.target,i=e.configValue;if(!i)return;let o;""===e.value||void 0===e.value?(o={...this.config},delete o[i]):o={...this.config,[i]:void 0!==e.checked?e.checked:e.value};const n=new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0});this.dispatchEvent(n)}_entityChanged(t,e){if(!this.config||!this.hass)return;const i=t.detail.value,o={...this.config};i&&""!==i?o[e]=i:delete o[e];const n=new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0});this.dispatchEvent(n)}_handleGUIEditor(){const t=new CustomEvent("ll-custom",{detail:{type:"gui-editor",path:["card"]},bubbles:!0,composed:!0});this.dispatchEvent(t)}render(){if(!this.hass||!this.config)return B``;const t=this.config.trigger_type||"floating";return B`
      <div class="card-config">
        <h3>Wrapped Card Configuration</h3>
        
        <!-- Card Configuration -->
        <div class="config-row">
          <label>Card to Display in Popup</label>
          <div class="helper-text">
            Configure the card that will be shown inside the popup
          </div>
          <button class="gui-editor-button" @click=${this._handleGUIEditor}>
            <ha-icon icon="mdi:pencil"></ha-icon>
            <span>Configure Card</span>
          </button>
        </div>

        <hr />

        <h3>Popup Settings</h3>

        <!-- Popup Title -->
        <div class="config-row">
          <label for="popup_title">Popup Title</label>
          <input
            type="text"
            id="popup_title"
            .configValue=${"popup_title"}
            .value=${this.config.popup_title||"Card"}
            @input=${this._valueChanged}
            placeholder="Card"
          />
          <div class="helper-text">
            Title displayed in the popup header
          </div>
        </div>

        <!-- Close on Click Outside -->
        <div class="config-row checkbox-config">
          <label for="close_on_click_outside">Close on Click Outside</label>
          <div class="helper-text">
            Close the popup when clicking outside of it
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="close_on_click_outside"
              .configValue=${"close_on_click_outside"}
              .checked=${!1!==this.config.close_on_click_outside}
              @change=${this._valueChanged}
            />
            <span>Enable close on outside click</span>
          </label>
        </div>

        <hr />

        <h3>Trigger Configuration</h3>

        <!-- Trigger Type -->
        <div class="config-row">
          <label for="trigger_type">Trigger Type</label>
          <select
            id="trigger_type"
            .configValue=${"trigger_type"}
            .value=${this.config.trigger_type||"floating"}
            @change=${this._valueChanged}
          >
            <option value="floating">Floating Button</option>
            <option value="entity">Entity Card (Click to Open)</option>
            <option value="auto">Auto Open (No Trigger)</option>
          </select>
          <div class="helper-text">
            How the popup will be opened
          </div>
        </div>

        ${"floating"===t?B`
              <hr />
              <h3>Floating Button Settings</h3>

              <!-- Floating Button Position -->
              <div class="config-row">
                <label for="floating_button_position">Button Position</label>
                <select
                  id="floating_button_position"
                  .configValue=${"floating_button_position"}
                  .value=${this.config.floating_button_position||"bottom-right"}
                  @change=${this._valueChanged}
                >
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
                <div class="helper-text">
                  Position of the floating action button on the screen
                </div>
              </div>

              <!-- Floating Button Icon -->
              <div class="config-row">
                <label for="floating_button_icon">Button Icon</label>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{icon:{}}}
                  .value=${this.config.floating_button_icon||"mdi:card"}
                  @value-changed=${t=>this._entityChanged(t,"floating_button_icon")}
                ></ha-selector>
                <div class="helper-text">
                  Icon to display on the floating button (only shown if text is empty)
                </div>
              </div>

              <!-- Floating Button Text -->
              <div class="config-row">
                <label for="floating_button_text">Button Text (Optional)</label>
                <input
                  type="text"
                  id="floating_button_text"
                  .configValue=${"floating_button_text"}
                  .value=${this.config.floating_button_text||""}
                  @input=${this._valueChanged}
                  placeholder="Leave empty to show icon"
                />
                <div class="helper-text">
                  Optional text to display on the floating button (overrides icon if set)
                </div>
              </div>
            `:""}

        ${"entity"===t?B`
              <hr />
              <h3>Entity Trigger Settings</h3>

              <!-- Trigger Entity -->
              <div class="config-row">
                <label for="trigger_entity">Trigger Entity</label>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{entity:{}}}
                  .value=${this.config.trigger_entity||""}
                  @value-changed=${t=>this._entityChanged(t,"trigger_entity")}
                ></ha-selector>
                <div class="helper-text">
                  Entity to display as the trigger. Click on it to open the popup.
                </div>
              </div>
            `:""}

        ${"auto"===t?B`
              <hr />
              <h3>Auto Open Settings</h3>

              <!-- Auto Open -->
              <div class="config-row checkbox-config">
                <label for="auto_open">Auto Open on Load</label>
                <div class="helper-text">
                  Automatically open the popup when the dashboard loads
                </div>
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    id="auto_open"
                    .configValue=${"auto_open"}
                    .checked=${!0===this.config.auto_open}
                    @change=${this._valueChanged}
                  />
                  <span>Enable auto open</span>
                </label>
              </div>
            `:""}
      </div>
    `}static get styles(){return r`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      h3 {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin: 8px 0 0 0;
      }

      .config-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .checkbox-config {
        gap: 4px;
      }

      label {
        font-weight: 500;
        font-size: 14px;
        color: var(--primary-text-color);
      }

      input[type='text'],
      select,
      ha-selector {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background: var(--card-background-color, white);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
        box-sizing: border-box;
      }

      ha-selector {
        padding: 0;
        border: none;
      }

      input[type='text']:focus,
      select:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .helper-text {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
        margin-top: 0;
      }

      hr {
        width: 100%;
        border: none;
        border-top: 1px solid var(--divider-color, #e0e0e0);
        margin: 8px 0;
      }

      select {
        cursor: pointer;
      }

      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: 14px;
      }

      .checkbox-label input[type='checkbox'] {
        width: auto;
        height: auto;
        margin: 0;
        cursor: pointer;
      }

      .checkbox-label span {
        color: var(--primary-text-color);
        font-weight: normal;
      }

      .gui-editor-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: var(--primary-color);
        color: var(--text-primary-color, white);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
      }

      .gui-editor-button:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }

      .gui-editor-button ha-icon {
        --mdc-icon-size: 18px;
      }
    `}};t([lt({attribute:!1})],dt.prototype,"hass",void 0),t([ct()],dt.prototype,"config",void 0),dt=t([rt("popup-wrapper-editor")],dt);let ht=class extends nt{constructor(){super(...arguments),this.showPopup=!1}static getConfigElement(){return document.createElement("popup-wrapper-editor")}static getStubConfig(){return{type:"custom:popup-wrapper-card",trigger_type:"floating",floating_button_position:"bottom-right",floating_button_icon:"mdi:card",floating_button_text:"",popup_title:"Card",auto_open:!1,close_on_click_outside:!0,card:{type:"entities",entities:[]}}}setConfig(t){if(!t.card)throw new Error("You must define a card to wrap");this.config={trigger_type:"floating",floating_button_position:"bottom-right",floating_button_icon:"mdi:card",floating_button_text:"",popup_title:"Card",auto_open:!1,close_on_click_outside:!0,...t},this._createWrappedCard()}getCardSize(){return"floating"===this.config.trigger_type?0:1}updated(t){super.updated(t),t.has("hass")&&this.wrappedCard&&(this.wrappedCard.hass=this.hass),t.has("config")&&this.config.auto_open&&!this.showPopup&&setTimeout(()=>{this.showPopup=!0},100)}async _createWrappedCard(){if(this.config.card)try{const t=await(window.loadCardHelpers?.());if(!t)return void console.error("Could not load card helpers");this.wrappedCard=await t.createCardElement(this.config.card),this.wrappedCard.hass=this.hass,this.requestUpdate()}catch(t){console.error("Error creating wrapped card:",t)}}_togglePopup(){this.showPopup=!this.showPopup}_closePopup(){this.showPopup=!1}_handleOverlayClick(){!1!==this.config.close_on_click_outside&&this._closePopup()}_renderTrigger(){const t=this.config.trigger_type||"floating";if("floating"===t){const t=this.config.floating_button_position||"bottom-right",e=this.config.floating_button_icon||"mdi:card",i=this.config.floating_button_text||"";return B`
        <button
          class="floating-button ${t}"
          @click=${this._togglePopup}
          title="${this.config.popup_title||"Open Card"}"
        >
          ${i?B`<span>${i}</span>`:B`<ha-icon icon="${e}"></ha-icon>`}
        </button>
      `}if("entity"===t&&this.config.trigger_entity){const t=this.hass.states[this.config.trigger_entity];return B`
        <div class="entity-trigger" @click=${this._togglePopup}>
          <ha-card>
            <div class="entity-trigger-content">
              <div class="entity-info">
                ${t?B`
                  <div class="entity-name">${t.attributes.friendly_name||this.config.trigger_entity}</div>
                  <div class="entity-state">${t.state}</div>
                `:B`
                  <div class="entity-name">${this.config.trigger_entity}</div>
                  <div class="entity-state">unavailable</div>
                `}
              </div>
              <ha-icon icon="mdi:arrow-expand"></ha-icon>
            </div>
          </ha-card>
        </div>
      `}return B``}_renderPopup(){return this.showPopup?B`
      <div class="popup-overlay" @click=${this._handleOverlayClick}>
        <div class="popup" @click=${t=>t.stopPropagation()}>
          <div class="popup-header">
            <h3>${this.config.popup_title||"Card"}</h3>
            <button class="close-button" @click=${this._closePopup}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="popup-content">
            ${this.wrappedCard||B`<p>Loading card...</p>`}
          </div>
        </div>
      </div>
    `:B``}render(){return this.config&&this.hass?B`
      <div class="popup-wrapper-container">
        ${this._renderTrigger()}
        ${this._renderPopup()}
      </div>
    `:B``}static get styles(){return r`
      :host {
        display: block;
      }

      .popup-wrapper-container {
        position: relative;
      }

      /* Floating Button Styles */
      .floating-button {
        position: fixed;
        z-index: 1000;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--primary-color);
        color: var(--text-primary-color, white);
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        font-size: 14px;
        font-weight: 500;
        padding: 0;
      }

      .floating-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
      }

      .floating-button ha-icon {
        --mdc-icon-size: 24px;
      }

      .floating-button span {
        padding: 0 8px;
        white-space: nowrap;
      }

      .floating-button.top-left {
        top: 16px;
        left: 16px;
      }

      .floating-button.top-right {
        top: 16px;
        right: 16px;
      }

      .floating-button.bottom-left {
        bottom: 16px;
        left: 16px;
      }

      .floating-button.bottom-right {
        bottom: 16px;
        right: 16px;
      }

      /* Entity Trigger Styles */
      .entity-trigger {
        cursor: pointer;
        transition: transform 0.2s ease;
      }

      .entity-trigger:hover {
        transform: scale(1.02);
      }

      .entity-trigger ha-card {
        padding: 16px;
      }

      .entity-trigger-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .entity-info {
        flex: 1;
      }

      .entity-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .entity-state {
        font-size: 24px;
        font-weight: 700;
        color: var(--primary-color);
        margin-top: 4px;
      }

      .entity-trigger ha-icon {
        --mdc-icon-size: 24px;
        color: var(--secondary-text-color);
      }

      /* Popup Overlay */
      .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1001;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        animation: fadeIn 0.2s ease;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* Popup Container */
      .popup {
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideUp 0.3s ease;
      }

      @keyframes slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      /* Popup Header */
      .popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        position: sticky;
        top: 0;
        background: var(--ha-card-background, var(--card-background-color, white));
        z-index: 1;
      }

      .popup-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .close-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
        color: var(--primary-text-color);
      }

      .close-button:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .close-button ha-icon {
        --mdc-icon-size: 20px;
      }

      /* Popup Content */
      .popup-content {
        padding: 20px;
      }

      /* Mobile Responsive */
      @media (max-width: 600px) {
        .popup {
          max-height: 95vh;
          border-radius: 16px 16px 0 0;
          max-width: 100%;
        }

        .popup-overlay {
          align-items: flex-end;
          padding: 0;
        }

        .popup-content {
          padding: 16px;
        }
      }

      ha-icon {
        --mdc-icon-size: 20px;
      }
    `}};t([lt({attribute:!1})],ht.prototype,"hass",void 0),t([ct()],ht.prototype,"config",void 0),t([ct()],ht.prototype,"showPopup",void 0),t([ct()],ht.prototype,"wrappedCard",void 0),ht=t([rt("popup-wrapper-card")],ht),window.customCards=window.customCards||[],window.customCards.push({type:"custom:popup-wrapper-card",name:"Popup Wrapper",description:"Wraps any card in a popup that can be opened via floating button, entity, or auto-open"});export{ht as PopupWrapperCard};
//# sourceMappingURL=popup-wrapper-card.js.map
