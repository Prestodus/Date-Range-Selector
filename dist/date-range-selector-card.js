function t(t,e,n,r){var i,a=arguments.length,o=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(o=(a<3?i(o):a>3?i(e,n,o):i(e,n))||o);return a>3&&o&&Object.defineProperty(e,n,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=window,n=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap;let a=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const n=void 0!==e&&1===e.length;n&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&i.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,n,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[r+1],t[0]);return new a(n,t,r)},s=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,r))(e)})(t):t;var u;const l=window,d=l.trustedTypes,c=d?d.emptyScript:"",h=l.reactiveElementPolyfillSupport,f={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},g=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:g},p="finalized";let m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,n)=>{const r=this._$Ep(n,e);void 0!==r&&(this._$Ev.set(r,n),t.push(r))}),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const n="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,n,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,n){return{get(){return this[e]},set(r){const i=this[t];this[e]=r,this.requestUpdate(t,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty(p))return!1;this[p]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of e)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Ep(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,n;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(n=t.hostConnected)||void 0===n||n.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const r=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{n?t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):r.forEach(n=>{const r=document.createElement("style"),i=e.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=n.cssText,t.appendChild(r)})})(r,this.constructor.elementStyles),r}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$EO(t,e,n=v){var r;const i=this.constructor._$Ep(t,n);if(void 0!==i&&!0===n.reflect){const a=(void 0!==(null===(r=n.converter)||void 0===r?void 0:r.toAttribute)?n.converter:f).toAttribute(e,n.type);this._$El=t,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$El=null}}_$AK(t,e){var n;const r=this.constructor,i=r._$Ev.get(t);if(void 0!==i&&this._$El!==i){const t=r.getPropertyOptions(i),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(n=t.converter)||void 0===n?void 0:n.fromAttribute)?t.converter:f;this._$El=i,this[i]=a.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,n){let r=!0;void 0!==t&&(((n=n||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===n.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,n))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(n)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(n)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var y;m[p]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:m}),(null!==(u=l.reactiveElementVersions)&&void 0!==u?u:l.reactiveElementVersions=[]).push("1.6.3");const w=window,b=w.trustedTypes,_=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,$="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,C="?"+x,k=`<${C}>`,D=document,S=()=>D.createComment(""),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,A="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,N=/>/g,U=RegExp(`>|${A}(?:([^\\s"'>=/]+)(${A}*=${A}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,H=/"/g,R=/^(?:script|style|textarea|title)$/i,Y=(t=>(e,...n)=>({_$litType$:t,strings:e,values:n}))(1),W=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),j=new WeakMap,F=D.createTreeWalker(D,129,null,!1);function L(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(e):e}const q=(t,e)=>{const n=t.length-1,r=[];let i,a=2===e?"<svg>":"",o=M;for(let e=0;e<n;e++){const n=t[e];let s,u,l=-1,d=0;for(;d<n.length&&(o.lastIndex=d,u=o.exec(n),null!==u);)d=o.lastIndex,o===M?"!--"===u[1]?o=P:void 0!==u[1]?o=N:void 0!==u[2]?(R.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=U):void 0!==u[3]&&(o=U):o===U?">"===u[0]?(o=null!=i?i:M,l=-1):void 0===u[1]?l=-2:(l=o.lastIndex-u[2].length,s=u[1],o=void 0===u[3]?U:'"'===u[3]?H:O):o===H||o===O?o=U:o===P||o===N?o=M:(o=U,i=void 0);const c=o===U&&t[e+1].startsWith("/>")?" ":"";a+=o===M?n+k:l>=0?(r.push(s),n.slice(0,l)+$+n.slice(l)+x+c):n+x+(-2===l?(r.push(void 0),e):c)}return[L(t,a+(t[n]||"<?>")+(2===e?"</svg>":"")),r]};class B{constructor({strings:t,_$litType$:e},n){let r;this.parts=[];let i=0,a=0;const o=t.length-1,s=this.parts,[u,l]=q(t,e);if(this.el=B.createElement(u,n),F.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=F.nextNode())&&s.length<o;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith($)||e.startsWith(x)){const n=l[a++];if(t.push(e),void 0!==n){const t=r.getAttribute(n.toLowerCase()+$).split(x),e=/([.?@])?(.*)/.exec(n);s.push({type:1,index:i,name:e[2],strings:t,ctor:"."===e[1]?X:"?"===e[1]?Z:"@"===e[1]?K:Q})}else s.push({type:6,index:i})}for(const e of t)r.removeAttribute(e)}if(R.test(r.tagName)){const t=r.textContent.split(x),e=t.length-1;if(e>0){r.textContent=b?b.emptyScript:"";for(let n=0;n<e;n++)r.append(t[n],S()),F.nextNode(),s.push({type:2,index:++i});r.append(t[e],S())}}}else if(8===r.nodeType)if(r.data===C)s.push({type:2,index:i});else{let t=-1;for(;-1!==(t=r.data.indexOf(x,t+1));)s.push({type:7,index:i}),t+=x.length-1}i++}}static createElement(t,e){const n=D.createElement("template");return n.innerHTML=t,n}}function I(t,e,n=t,r){var i,a,o,s;if(e===W)return e;let u=void 0!==r?null===(i=n._$Co)||void 0===i?void 0:i[r]:n._$Cl;const l=E(e)?void 0:e._$litDirective$;return(null==u?void 0:u.constructor)!==l&&(null===(a=null==u?void 0:u._$AO)||void 0===a||a.call(u,!1),void 0===l?u=void 0:(u=new l(t),u._$AT(t,n,r)),void 0!==r?(null!==(o=(s=n)._$Co)&&void 0!==o?o:s._$Co=[])[r]=u:n._$Cl=u),void 0!==u&&(e=I(t,u._$AS(t,e.values),u,r)),e}class V{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:n},parts:r}=this._$AD,i=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:D).importNode(n,!0);F.currentNode=i;let a=F.nextNode(),o=0,s=0,u=r[0];for(;void 0!==u;){if(o===u.index){let e;2===u.type?e=new G(a,a.nextSibling,this,t):1===u.type?e=new u.ctor(a,u.name,u.strings,this,t):6===u.type&&(e=new tt(a,this,t)),this._$AV.push(e),u=r[++s]}o!==(null==u?void 0:u.index)&&(a=F.nextNode(),o++)}return F.currentNode=D,i}v(t){let e=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class G{constructor(t,e,n,r){var i;this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=r,this._$Cp=null===(i=null==r?void 0:r.isConnected)||void 0===i||i}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),E(t)?t===z||null==t||""===t?(this._$AH!==z&&this._$AR(),this._$AH=z):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==z&&E(this._$AH)?this._$AA.nextSibling.data=t:this.$(D.createTextNode(t)),this._$AH=t}g(t){var e;const{values:n,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=B.createElement(L(r.h,r.h[0]),this.options)),r);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===i)this._$AH.v(n);else{const t=new V(i,this),e=t.u(this.options);t.v(n),this.$(e),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new B(t)),e}T(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,r=0;for(const i of t)r===e.length?e.push(n=new G(this.k(S()),this.k(S()),this,this.options)):n=e[r],n._$AI(i),r++;r<e.length&&(this._$AR(n&&n._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var n;for(null===(n=this._$AP)||void 0===n||n.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Q{constructor(t,e,n,r,i){this.type=1,this._$AH=z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,n,r){const i=this.strings;let a=!1;if(void 0===i)t=I(this,t,e,0),a=!E(t)||t!==this._$AH&&t!==W,a&&(this._$AH=t);else{const r=t;let o,s;for(t=i[0],o=0;o<i.length-1;o++)s=I(this,r[n+o],e,o),s===W&&(s=this._$AH[o]),a||(a=!E(s)||s!==this._$AH[o]),s===z?t=z:t!==z&&(t+=(null!=s?s:"")+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(t)}j(t){t===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===z?void 0:t}}const J=b?b.emptyScript:"";class Z extends Q{constructor(){super(...arguments),this.type=4}j(t){t&&t!==z?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class K extends Q{constructor(t,e,n,r,i){super(t,e,n,r,i),this.type=5}_$AI(t,e=this){var n;if((t=null!==(n=I(this,t,e,0))&&void 0!==n?n:z)===W)return;const r=this._$AH,i=t===z&&r!==z||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==z&&(r===z||i);i&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,n;"function"==typeof this._$AH?this._$AH.call(null!==(n=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==n?n:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}const et=w.litHtmlPolyfillSupport;null==et||et(B,G),(null!==(y=w.litHtmlVersions)&&void 0!==y?y:w.litHtmlVersions=[]).push("2.8.0");var nt,rt;class it extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const n=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=n.firstChild),n}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,n)=>{var r,i;const a=null!==(r=null==n?void 0:n.renderBefore)&&void 0!==r?r:e;let o=a._$litPart$;if(void 0===o){const t=null!==(i=null==n?void 0:n.renderBefore)&&void 0!==i?i:null;a._$litPart$=o=new G(e.insertBefore(S(),t),t,void 0,null!=n?n:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return W}}it.finalized=!0,it._$litElement$=!0,null===(nt=globalThis.litElementHydrateSupport)||void 0===nt||nt.call(globalThis,{LitElement:it});const at=globalThis.litElementPolyfillSupport;null==at||at({LitElement:it}),(null!==(rt=globalThis.litElementVersions)&&void 0!==rt?rt:globalThis.litElementVersions=[]).push("3.3.3");const ot=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:n,elements:r}=e;return{kind:n,elements:r,finisher(e){customElements.define(t,e)}}})(t,e),st=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}};function ut(t){return(e,n)=>void 0!==n?((t,e,n)=>{e.constructor.createProperty(n,t)})(t,e,n):st(t,e)}function lt(t){return ut({...t,state:!0})}var dt;function ct(t){return ct="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ct(t)}function ht(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function ft(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function gt(t){ft(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"===ct(t)&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function vt(t,e){ft(2,arguments);var n=gt(t),r=ht(e);return isNaN(r)?new Date(NaN):r?(n.setDate(n.getDate()+r),n):n}function pt(t,e){ft(2,arguments);var n=gt(t),r=ht(e);if(isNaN(r))return new Date(NaN);if(!r)return n;var i=n.getDate(),a=new Date(n.getTime());return a.setMonth(n.getMonth()+r+1,0),i>=a.getDate()?a:(n.setFullYear(a.getFullYear(),a.getMonth(),i),n)}null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements;var mt={};function yt(){return mt}function wt(t){ft(1,arguments);var e=gt(t);return e.setHours(0,0,0,0),e}function bt(t,e){return ft(2,arguments),vt(t,7*ht(e))}function _t(t,e){return ft(2,arguments),pt(t,12*ht(e))}var $t=6e4,xt=36e5;function Ct(t){if(ft(1,arguments),!function(t){return ft(1,arguments),t instanceof Date||"object"===ct(t)&&"[object Date]"===Object.prototype.toString.call(t)}(t)&&"number"!=typeof t)return!1;var e=gt(t);return!isNaN(Number(e))}function kt(t){ft(1,arguments);var e=gt(t);return e.setHours(23,59,59,999),e}function Dt(t,e){return ft(2,arguments),function(t,e){ft(2,arguments);var n=gt(t).getTime(),r=ht(e);return new Date(n+r)}(t,-ht(e))}function St(t){ft(1,arguments);var e=gt(t),n=e.getUTCDay(),r=(n<1?7:0)+n-1;return e.setUTCDate(e.getUTCDate()-r),e.setUTCHours(0,0,0,0),e}function Et(t){ft(1,arguments);var e=gt(t),n=e.getUTCFullYear(),r=new Date(0);r.setUTCFullYear(n+1,0,4),r.setUTCHours(0,0,0,0);var i=St(r),a=new Date(0);a.setUTCFullYear(n,0,4),a.setUTCHours(0,0,0,0);var o=St(a);return e.getTime()>=i.getTime()?n+1:e.getTime()>=o.getTime()?n:n-1}function Tt(t){ft(1,arguments);var e=gt(t),n=St(e).getTime()-function(t){ft(1,arguments);var e=Et(t),n=new Date(0);return n.setUTCFullYear(e,0,4),n.setUTCHours(0,0,0,0),St(n)}(e).getTime();return Math.round(n/6048e5)+1}function At(t,e){var n,r,i,a,o,s,u,l;ft(1,arguments);var d=yt(),c=ht(null!==(n=null!==(r=null!==(i=null!==(a=null==e?void 0:e.weekStartsOn)&&void 0!==a?a:null==e||null===(o=e.locale)||void 0===o||null===(s=o.options)||void 0===s?void 0:s.weekStartsOn)&&void 0!==i?i:d.weekStartsOn)&&void 0!==r?r:null===(u=d.locale)||void 0===u||null===(l=u.options)||void 0===l?void 0:l.weekStartsOn)&&void 0!==n?n:0);if(!(c>=0&&c<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var h=gt(t),f=h.getUTCDay(),g=(f<c?7:0)+f-c;return h.setUTCDate(h.getUTCDate()-g),h.setUTCHours(0,0,0,0),h}function Mt(t,e){var n,r,i,a,o,s,u,l;ft(1,arguments);var d=gt(t),c=d.getUTCFullYear(),h=yt(),f=ht(null!==(n=null!==(r=null!==(i=null!==(a=null==e?void 0:e.firstWeekContainsDate)&&void 0!==a?a:null==e||null===(o=e.locale)||void 0===o||null===(s=o.options)||void 0===s?void 0:s.firstWeekContainsDate)&&void 0!==i?i:h.firstWeekContainsDate)&&void 0!==r?r:null===(u=h.locale)||void 0===u||null===(l=u.options)||void 0===l?void 0:l.firstWeekContainsDate)&&void 0!==n?n:1);if(!(f>=1&&f<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var g=new Date(0);g.setUTCFullYear(c+1,0,f),g.setUTCHours(0,0,0,0);var v=At(g,e),p=new Date(0);p.setUTCFullYear(c,0,f),p.setUTCHours(0,0,0,0);var m=At(p,e);return d.getTime()>=v.getTime()?c+1:d.getTime()>=m.getTime()?c:c-1}function Pt(t,e){ft(1,arguments);var n=gt(t),r=At(n,e).getTime()-function(t,e){var n,r,i,a,o,s,u,l;ft(1,arguments);var d=yt(),c=ht(null!==(n=null!==(r=null!==(i=null!==(a=null==e?void 0:e.firstWeekContainsDate)&&void 0!==a?a:null==e||null===(o=e.locale)||void 0===o||null===(s=o.options)||void 0===s?void 0:s.firstWeekContainsDate)&&void 0!==i?i:d.firstWeekContainsDate)&&void 0!==r?r:null===(u=d.locale)||void 0===u||null===(l=u.options)||void 0===l?void 0:l.firstWeekContainsDate)&&void 0!==n?n:1),h=Mt(t,e),f=new Date(0);return f.setUTCFullYear(h,0,c),f.setUTCHours(0,0,0,0),At(f,e)}(n,e).getTime();return Math.round(r/6048e5)+1}function Nt(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}var Ut=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return Nt("yy"===e?r%100:r,e.length)},Ot=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):Nt(n+1,2)},Ht=function(t,e){return Nt(t.getUTCDate(),e.length)},Rt=function(t,e){return Nt(t.getUTCHours()%12||12,e.length)},Yt=function(t,e){return Nt(t.getUTCHours(),e.length)},Wt=function(t,e){return Nt(t.getUTCMinutes(),e.length)},zt=function(t,e){return Nt(t.getUTCSeconds(),e.length)},jt=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return Nt(Math.floor(r*Math.pow(10,n-3)),e.length)},Ft="midnight",Lt="noon",qt="morning",Bt="afternoon",It="evening",Vt="night",Gt={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),i=r>0?r:1-r;return n.ordinalNumber(i,{unit:"year"})}return Ut(t,e)},Y:function(t,e,n,r){var i=Mt(t,r),a=i>0?i:1-i;return"YY"===e?Nt(a%100,2):"Yo"===e?n.ordinalNumber(a,{unit:"year"}):Nt(a,e.length)},R:function(t,e){return Nt(Et(t),e.length)},u:function(t,e){return Nt(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return Nt(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return Nt(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return Ot(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return Nt(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){var i=Pt(t,r);return"wo"===e?n.ordinalNumber(i,{unit:"week"}):Nt(i,e.length)},I:function(t,e,n){var r=Tt(t);return"Io"===e?n.ordinalNumber(r,{unit:"week"}):Nt(r,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):Ht(t,e)},D:function(t,e,n){var r=function(t){ft(1,arguments);var e=gt(t),n=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var r=n-e.getTime();return Math.floor(r/864e5)+1}(t);return"Do"===e?n.ordinalNumber(r,{unit:"dayOfYear"}):Nt(r,e.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var i=t.getUTCDay(),a=(i-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(a);case"ee":return Nt(a,2);case"eo":return n.ordinalNumber(a,{unit:"day"});case"eee":return n.day(i,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(i,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(i,{width:"short",context:"formatting"});default:return n.day(i,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var i=t.getUTCDay(),a=(i-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(a);case"cc":return Nt(a,e.length);case"co":return n.ordinalNumber(a,{unit:"day"});case"ccc":return n.day(i,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(i,{width:"narrow",context:"standalone"});case"cccccc":return n.day(i,{width:"short",context:"standalone"});default:return n.day(i,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),i=0===r?7:r;switch(e){case"i":return String(i);case"ii":return Nt(i,e.length);case"io":return n.ordinalNumber(i,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,i=t.getUTCHours();switch(r=12===i?Lt:0===i?Ft:i/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,i=t.getUTCHours();switch(r=i>=17?It:i>=12?Bt:i>=4?qt:Vt,e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return Rt(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):Yt(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):Nt(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):Nt(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):Wt(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):zt(t,e)},S:function(t,e){return jt(t,e)},X:function(t,e,n,r){var i=(r._originalDate||t).getTimezoneOffset();if(0===i)return"Z";switch(e){case"X":return Xt(i);case"XXXX":case"XX":return Jt(i);default:return Jt(i,":")}},x:function(t,e,n,r){var i=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return Xt(i);case"xxxx":case"xx":return Jt(i);default:return Jt(i,":")}},O:function(t,e,n,r){var i=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+Qt(i,":");default:return"GMT"+Jt(i,":")}},z:function(t,e,n,r){var i=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+Qt(i,":");default:return"GMT"+Jt(i,":")}},t:function(t,e,n,r){var i=r._originalDate||t;return Nt(Math.floor(i.getTime()/1e3),e.length)},T:function(t,e,n,r){return Nt((r._originalDate||t).getTime(),e.length)}};function Qt(t,e){var n=t>0?"-":"+",r=Math.abs(t),i=Math.floor(r/60),a=r%60;if(0===a)return n+String(i);var o=e;return n+String(i)+o+Nt(a,2)}function Xt(t,e){return t%60==0?(t>0?"-":"+")+Nt(Math.abs(t)/60,2):Jt(t,e)}function Jt(t,e){var n=e||"",r=t>0?"-":"+",i=Math.abs(t);return r+Nt(Math.floor(i/60),2)+n+Nt(i%60,2)}var Zt=function(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},Kt=function(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},te={p:Kt,P:function(t,e){var n,r=t.match(/(P+)(p+)?/)||[],i=r[1],a=r[2];if(!a)return Zt(t,e);switch(i){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",Zt(i,e)).replace("{{time}}",Kt(a,e))}},ee=["D","DD"],ne=["YY","YYYY"];function re(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var ie={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function ae(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}var oe={date:ae({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:ae({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:ae({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},se={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function ue(t){return function(e,n){var r;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&t.formattingValues){var i=t.defaultFormattingWidth||t.defaultWidth,a=null!=n&&n.width?String(n.width):i;r=t.formattingValues[a]||t.formattingValues[i]}else{var o=t.defaultWidth,s=null!=n&&n.width?String(n.width):t.defaultWidth;r=t.values[s]||t.values[o]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function le(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,i=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],a=e.match(i);if(!a)return null;var o,s=a[0],u=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],l=Array.isArray(u)?function(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n;return}(u,function(t){return t.test(s)}):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&e(t[n]))return n;return}(u,function(t){return t.test(s)});return o=t.valueCallback?t.valueCallback(l):l,{value:o=n.valueCallback?n.valueCallback(o):o,rest:e.slice(s.length)}}}var de,ce={code:"en-US",formatDistance:function(t,e,n){var r,i=ie[t];return r="string"==typeof i?i:1===e?i.one:i.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:oe,formatRelative:function(t,e,n,r){return se[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:ue({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:ue({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:ue({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:ue({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:ue({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(de={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(de.matchPattern);if(!n)return null;var r=n[0],i=t.match(de.parsePattern);if(!i)return null;var a=de.valueCallback?de.valueCallback(i[0]):i[0];return{value:a=e.valueCallback?e.valueCallback(a):a,rest:t.slice(r.length)}}),era:le({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:le({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:le({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:le({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:le({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}},he=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,fe=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ge=/^'([^]*?)'?$/,ve=/''/g,pe=/[a-zA-Z]/;function me(t,e,n){var r,i,a,o,s,u,l,d,c,h,f;ft(2,arguments);var g=String(e),v=yt(),p=null!==(r=v.locale)&&void 0!==r?r:ce,m=ht(null!==(i=null!==(a=null!==(o=void 0)&&void 0!==o?o:v.firstWeekContainsDate)&&void 0!==a?a:null===(s=v.locale)||void 0===s||null===(u=s.options)||void 0===u?void 0:u.firstWeekContainsDate)&&void 0!==i?i:1);if(!(m>=1&&m<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var y=ht(null!==(l=null!==(d=null!==(c=void 0)&&void 0!==c?c:v.weekStartsOn)&&void 0!==d?d:null===(h=v.locale)||void 0===h||null===(f=h.options)||void 0===f?void 0:f.weekStartsOn)&&void 0!==l?l:0);if(!(y>=0&&y<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!p.localize)throw new RangeError("locale must contain localize property");if(!p.formatLong)throw new RangeError("locale must contain formatLong property");var w=gt(t);if(!Ct(w))throw new RangeError("Invalid time value");var b=function(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}(w),_=Dt(w,b),$={firstWeekContainsDate:m,weekStartsOn:y,locale:p,_originalDate:w};return g.match(fe).map(function(t){var e=t[0];return"p"===e||"P"===e?(0,te[e])(t,p.formatLong):t}).join("").match(he).map(function(n){if("''"===n)return"'";var r=n[0];if("'"===r)return function(t){var e=t.match(ge);if(!e)return t;return e[1].replace(ve,"'")}(n);var i,a=Gt[r];if(a)return i=n,-1!==ne.indexOf(i)&&re(n,e,String(t)),function(t){return-1!==ee.indexOf(t)}(n)&&re(n,e,String(t)),a(_,n,p.localize,$);if(r.match(pe))throw new RangeError("Format string contains an unescaped latin alphabet character `"+r+"`");return n}).join("")}function ye(t,e){ft(2,arguments);var n=gt(t),r=gt(e);return n.getTime()>r.getTime()}function we(t,e){ft(2,arguments);var n=gt(t),r=gt(e);return n.getTime()<r.getTime()}function be(t){return ft(1,arguments),function(t,e){ft(2,arguments);var n=wt(t),r=wt(e);return n.getTime()===r.getTime()}(t,Date.now())}function _e(t,e){ft(1,arguments);var n=ht(2);if(2!==n&&1!==n&&0!==n)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof t&&"[object String]"!==Object.prototype.toString.call(t))return new Date(NaN);var r,i=function(t){var e,n={},r=t.split($e.dateTimeDelimiter);if(r.length>2)return n;/:/.test(r[0])?e=r[0]:(n.date=r[0],e=r[1],$e.timeZoneDelimiter.test(n.date)&&(n.date=t.split($e.timeZoneDelimiter)[0],e=t.substr(n.date.length,t.length)));if(e){var i=$e.timezone.exec(e);i?(n.time=e.replace(i[1],""),n.timezone=i[1]):n.time=e}return n}(t);if(i.date){var a=function(t,e){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),r=t.match(n);if(!r)return{year:NaN,restDateString:""};var i=r[1]?parseInt(r[1]):null,a=r[2]?parseInt(r[2]):null;return{year:null===a?i:100*a,restDateString:t.slice((r[1]||r[2]).length)}}(i.date,n);r=function(t,e){if(null===e)return new Date(NaN);var n=t.match(xe);if(!n)return new Date(NaN);var r=!!n[4],i=De(n[1]),a=De(n[2])-1,o=De(n[3]),s=De(n[4]),u=De(n[5])-1;if(r)return function(t,e,n){return e>=1&&e<=53&&n>=0&&n<=6}(0,s,u)?function(t,e,n){var r=new Date(0);r.setUTCFullYear(t,0,4);var i=r.getUTCDay()||7,a=7*(e-1)+n+1-i;return r.setUTCDate(r.getUTCDate()+a),r}(e,s,u):new Date(NaN);var l=new Date(0);return function(t,e,n){return e>=0&&e<=11&&n>=1&&n<=(Ee[e]||(Te(t)?29:28))}(e,a,o)&&function(t,e){return e>=1&&e<=(Te(t)?366:365)}(e,i)?(l.setUTCFullYear(e,a,Math.max(i,o)),l):new Date(NaN)}(a.restDateString,a.year)}if(!r||isNaN(r.getTime()))return new Date(NaN);var o,s=r.getTime(),u=0;if(i.time&&(u=function(t){var e=t.match(Ce);if(!e)return NaN;var n=Se(e[1]),r=Se(e[2]),i=Se(e[3]);if(!function(t,e,n){if(24===t)return 0===e&&0===n;return n>=0&&n<60&&e>=0&&e<60&&t>=0&&t<25}(n,r,i))return NaN;return n*xt+r*$t+1e3*i}(i.time),isNaN(u)))return new Date(NaN);if(!i.timezone){var l=new Date(s+u),d=new Date(0);return d.setFullYear(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()),d.setHours(l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds()),d}return o=function(t){if("Z"===t)return 0;var e=t.match(ke);if(!e)return 0;var n="+"===e[1]?-1:1,r=parseInt(e[2]),i=e[3]&&parseInt(e[3])||0;if(!function(t,e){return e>=0&&e<=59}(0,i))return NaN;return n*(r*xt+i*$t)}(i.timezone),isNaN(o)?new Date(NaN):new Date(s+u+o)}var $e={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},xe=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,Ce=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,ke=/^([+-])(\d{2})(?::?(\d{2}))?$/;function De(t){return t?parseInt(t):1}function Se(t){return t&&parseFloat(t.replace(",","."))||0}var Ee=[31,null,31,30,31,30,31,31,30,31,30,31];function Te(t){return t%400==0||t%4==0&&t%100!=0}let Ae=class extends it{setConfig(t){this.config=t}static getStubConfig(){return{type:"custom:date-range-selector-card",start_entity:"input_datetime.date_range_start",end_entity:"input_datetime.date_range_end",show_arrows:!0,today_button_type:"icon"}}_valueChanged(t){if(!this.config||!this.hass)return;const e=t.target,n=e.configValue;if(!n)return;let r;""===e.value||void 0===e.value?(r={...this.config},delete r[n]):r={...this.config,[n]:void 0!==e.checked?e.checked:e.value};const i=new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){return this.hass&&this.config?Y`
      <div class="card-config">
        <!-- Start Entity -->
        <div class="config-row">
          <label for="start_entity">Start Entity (Required)</label>
          <input
            type="text"
            id="start_entity"
            .configValue=${"start_entity"}
            .value=${this.config.start_entity||""}
            @input=${this._valueChanged}
            placeholder="input_datetime.date_range_start"
          />
          <div class="helper-text">
            Entity ID for the start date (must be an input_datetime helper)
          </div>
        </div>

        <!-- End Entity -->
        <div class="config-row">
          <label for="end_entity">End Entity (Required)</label>
          <input
            type="text"
            id="end_entity"
            .configValue=${"end_entity"}
            .value=${this.config.end_entity||""}
            @input=${this._valueChanged}
            placeholder="input_datetime.date_range_end"
          />
          <div class="helper-text">
            Entity ID for the end date (must be an input_datetime helper)
          </div>
        </div>

        <hr />

        <!-- Show Arrows -->
        <div class="config-row toggle-row">
          <label for="show_arrows">Show Navigation Arrows</label>
          <input
            type="checkbox"
            id="show_arrows"
            .configValue=${"show_arrows"}
            .checked=${!1!==this.config.show_arrows}
            @change=${this._valueChanged}
          />
          <div class="helper-text">
            Display previous/next arrows to navigate through date ranges
          </div>
        </div>

        <!-- Today Button Type -->
        <div class="config-row">
          <label for="today_button_type">Today Button Type</label>
          <select
            id="today_button_type"
            .configValue=${"today_button_type"}
            .value=${this.config.today_button_type||"icon"}
            @change=${this._valueChanged}
          >
            <option value="icon">Icon</option>
            <option value="text">Text</option>
          </select>
          <div class="helper-text">
            Show the "Today" button as an icon or text label
          </div>
        </div>

        <!-- Show Custom Range -->
        <div class="config-row toggle-row">
          <label for="show_custom_range">Show Custom Range Option</label>
          <input
            type="checkbox"
            id="show_custom_range"
            .configValue=${"show_custom_range"}
            .checked=${!0===this.config.show_custom_range}
            @change=${this._valueChanged}
          />
          <div class="helper-text">
            Display a "Custom" button that reveals date pickers for manual selection
          </div>
        </div>

        <!-- Hide Background -->
        <div class="config-row toggle-row">
          <label for="hide_background">Hide Card Background</label>
          <input
            type="checkbox"
            id="hide_background"
            .configValue=${"hide_background"}
            .checked=${!0===this.config.hide_background}
            @change=${this._valueChanged}
          />
          <div class="helper-text">
            Remove the card background and shadow to blend with the dashboard
          </div>
        </div>

        <hr />

        <!-- Disable Future -->
        <div class="config-row toggle-row">
          <label for="disable_future">Disable Future Dates</label>
          <input
            type="checkbox"
            id="disable_future"
            .configValue=${"disable_future"}
            .checked=${!0===this.config.disable_future}
            @change=${this._valueChanged}
          />
          <div class="helper-text">
            Prevent selection of dates in the future (caps ranges at today)
          </div>
        </div>

        <!-- Minimum Date -->
        <div class="config-row">
          <label for="min_date">Minimum Date</label>
          <input
            type="date"
            id="min_date"
            .configValue=${"min_date"}
            .value=${this.config.min_date||""}
            @input=${this._valueChanged}
          />
          <div class="helper-text">
            Earliest selectable date (YYYY-MM-DD format). Leave empty for no limit.
          </div>
        </div>
      </div>
    `:Y``}static get styles(){return o`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      .config-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .toggle-row {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .toggle-row label {
        flex: 1;
      }

      label {
        font-weight: 500;
        font-size: 14px;
        color: var(--primary-text-color);
      }

      input[type='text'],
      input[type='date'],
      select {
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

      input[type='text']:focus,
      input[type='date']:focus,
      select:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      input[type='checkbox'] {
        width: 40px;
        height: 24px;
        cursor: pointer;
      }

      .helper-text {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
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
    `}};t([ut({attribute:!1})],Ae.prototype,"hass",void 0),t([lt()],Ae.prototype,"config",void 0),Ae=t([ot("date-range-selector-editor")],Ae);console.info("%c DATE-RANGE-SELECTOR-CARD %c v1.0.0 ","color: white; background: #0084ff; font-weight: 700;","color: #0084ff; background: white; font-weight: 700;");let Me=class extends it{constructor(){super(...arguments),this.selectedPreset="day",this.currentStartDate=wt(new Date),this.currentEndDate=kt(new Date),this.showCustomPickers=!1}static getConfigElement(){return document.createElement("date-range-selector-editor")}static getStubConfig(){return{type:"custom:date-range-selector-card",start_entity:"input_datetime.date_range_start",end_entity:"input_datetime.date_range_end",show_arrows:!0,today_button_type:"icon"}}setConfig(t){if(!t.start_entity)throw new Error("You must define start_entity");if(!t.end_entity)throw new Error("You must define end_entity");this.config={show_arrows:!0,today_button_type:"icon",hide_background:!1,show_custom_range:!1,disable_future:!1,...t}}getCardSize(){return 3}updated(t){super.updated(t),t.has("hass")&&this.hass&&this._updateDatesFromEntities()}_updateDatesFromEntities(){if(!this.hass||!this.config)return;const t=this.hass.states[this.config.start_entity],e=this.hass.states[this.config.end_entity];if(t&&"unavailable"!==t.state&&"unknown"!==t.state)try{this.currentStartDate=_e(t.state)}catch(t){console.error("Error parsing start date:",t)}if(e&&"unavailable"!==e.state&&"unknown"!==e.state)try{this.currentEndDate=_e(e.state)}catch(t){console.error("Error parsing end date:",t)}}_handleToday(){const t=new Date;this.selectedPreset="day",this._setDateRange(wt(t),kt(t))}_handlePreset(t){if("custom"===t)return this.showCustomPickers=!this.showCustomPickers,void(this.selectedPreset=t);this.selectedPreset=t,this.showCustomPickers=!1;const e=new Date,{start:n,end:r}=this._calculatePresetRange(t,e);this._setDateRange(n,r)}_handleNavigation(t){if("custom"===this.selectedPreset)return;const e="prev"===t?-1:1;let n,r;switch(this.selectedPreset){case"day":n=vt(this.currentStartDate,e),r=vt(this.currentEndDate,e);break;case"week":n=bt(this.currentStartDate,e),r=bt(this.currentEndDate,e);break;case"month":n=pt(this.currentStartDate,e),r=pt(this.currentEndDate,e);break;case"year":n=_t(this.currentStartDate,e),r=_t(this.currentEndDate,e);break;default:return}const{start:i,end:a}=this._applyConstraints(n,r);this._setDateRange(i,a)}_calculatePresetRange(t,e){let n,r;switch(t){case"day":default:n=wt(e),r=kt(e);break;case"week":n=function(t,e){var n,r,i,a,o,s,u,l;ft(1,arguments);var d=yt(),c=ht(null!==(n=null!==(r=null!==(i=null!==(a=null==e?void 0:e.weekStartsOn)&&void 0!==a?a:null==e||null===(o=e.locale)||void 0===o||null===(s=o.options)||void 0===s?void 0:s.weekStartsOn)&&void 0!==i?i:d.weekStartsOn)&&void 0!==r?r:null===(u=d.locale)||void 0===u||null===(l=u.options)||void 0===l?void 0:l.weekStartsOn)&&void 0!==n?n:0);if(!(c>=0&&c<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var h=gt(t),f=h.getDay(),g=(f<c?7:0)+f-c;return h.setDate(h.getDate()-g),h.setHours(0,0,0,0),h}(e,{weekStartsOn:1}),r=function(t,e){var n,r,i,a,o,s,u,l;ft(1,arguments);var d=yt(),c=ht(null!==(n=null!==(r=null!==(i=null!==(a=null==e?void 0:e.weekStartsOn)&&void 0!==a?a:null==e||null===(o=e.locale)||void 0===o||null===(s=o.options)||void 0===s?void 0:s.weekStartsOn)&&void 0!==i?i:d.weekStartsOn)&&void 0!==r?r:null===(u=d.locale)||void 0===u||null===(l=u.options)||void 0===l?void 0:l.weekStartsOn)&&void 0!==n?n:0);if(!(c>=0&&c<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var h=gt(t),f=h.getDay(),g=6+(f<c?-7:0)-(f-c);return h.setDate(h.getDate()+g),h.setHours(23,59,59,999),h}(e,{weekStartsOn:1});break;case"month":n=function(t){ft(1,arguments);var e=gt(t);return e.setDate(1),e.setHours(0,0,0,0),e}(e),r=function(t){ft(1,arguments);var e=gt(t),n=e.getMonth();return e.setFullYear(e.getFullYear(),n+1,0),e.setHours(23,59,59,999),e}(e);break;case"year":n=function(t){ft(1,arguments);var e=gt(t),n=new Date(0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}(e),r=function(t){ft(1,arguments);var e=gt(t),n=e.getFullYear();return e.setFullYear(n+1,0,0),e.setHours(23,59,59,999),e}(e)}return this._applyConstraints(n,r)}_applyConstraints(t,e){const n=kt(new Date);let r=t,i=e;if(this.config.min_date){const t=_e(this.config.min_date);we(r,t)&&(r=t),we(i,t)&&(i=t)}return this.config.disable_future&&(ye(i,n)&&(i=n),ye(r,n)&&(r=n)),{start:r,end:i}}_canNavigatePrev(){if("custom"===this.selectedPreset)return!1;if(!this.config.min_date)return!0;const t=_e(this.config.min_date);let e;switch(this.selectedPreset){case"day":e=vt(this.currentStartDate,-1);break;case"week":e=bt(this.currentStartDate,-1);break;case"month":e=pt(this.currentStartDate,-1);break;case"year":e=_t(this.currentStartDate,-1);break;default:return!0}return!we(e,t)}_canNavigateNext(){if("custom"===this.selectedPreset)return!1;if(!this.config.disable_future)return!0;const t=new Date;let e;switch(this.selectedPreset){case"day":e=vt(this.currentEndDate,1);break;case"week":e=bt(this.currentEndDate,1);break;case"month":e=pt(this.currentEndDate,1);break;case"year":e=_t(this.currentEndDate,1);break;default:return!0}return!ye(e,t)}async _setDateRange(t,e){this.currentStartDate=t,this.currentEndDate=e;const n=me(t,"yyyy-MM-dd"),r=me(e,"yyyy-MM-dd");try{await this.hass.callService("input_datetime","set_datetime",{entity_id:this.config.start_entity,date:n}),await this.hass.callService("input_datetime","set_datetime",{entity_id:this.config.end_entity,date:r})}catch(t){console.error("Error setting date range:",t)}}_handleCustomStartChange(t){const e=t.target.value;if(e){const t=_e(e);this._setDateRange(t,this.currentEndDate)}}_handleCustomEndChange(t){const e=t.target.value;if(e){const t=_e(e);this._setDateRange(this.currentStartDate,t)}}_formatDateRange(){try{const t=me(this.currentStartDate,"MMMM d, yyyy"),e=me(this.currentEndDate,"MMMM d, yyyy");return t===e?t:`${t} - ${e}`}catch(t){return"Invalid date range"}}render(){if(!this.config||!this.hass)return Y``;const t=this.config.hide_background?"no-background":"";return Y`
      <ha-card class="${t}">
        <div class="card-content">
          <!-- Date Range Display -->
          <div class="date-range-display">
            ${this._formatDateRange()}
          </div>

          <!-- Preset Buttons Row -->
          <div class="button-row">
            ${this.config.show_arrows?Y`
                  <button
                    class="nav-button"
                    @click=${()=>this._handleNavigation("prev")}
                    ?disabled=${!this._canNavigatePrev()}
                    title="Previous"
                  >
                    <ha-icon icon="mdi:chevron-left"></ha-icon>
                  </button>
                `:""}

            <button
              class="preset-button ${be(this.currentStartDate)&&"day"===this.selectedPreset?"active":""}"
              @click=${this._handleToday}
              title="Today"
            >
              ${"icon"===this.config.today_button_type?Y`<ha-icon icon="mdi:calendar-today"></ha-icon>`:Y`Today`}
            </button>

            <button
              class="preset-button ${"day"===this.selectedPreset?"active":""}"
              @click=${()=>this._handlePreset("day")}
            >
              Day
            </button>

            <button
              class="preset-button ${"week"===this.selectedPreset?"active":""}"
              @click=${()=>this._handlePreset("week")}
            >
              Week
            </button>

            <button
              class="preset-button ${"month"===this.selectedPreset?"active":""}"
              @click=${()=>this._handlePreset("month")}
            >
              Month
            </button>

            <button
              class="preset-button ${"year"===this.selectedPreset?"active":""}"
              @click=${()=>this._handlePreset("year")}
            >
              Year
            </button>

            ${this.config.show_custom_range?Y`
                  <button
                    class="preset-button ${"custom"===this.selectedPreset?"active":""}"
                    @click=${()=>this._handlePreset("custom")}
                  >
                    Custom
                  </button>
                `:""}

            ${this.config.show_arrows?Y`
                  <button
                    class="nav-button"
                    @click=${()=>this._handleNavigation("next")}
                    ?disabled=${!this._canNavigateNext()}
                    title="Next"
                  >
                    <ha-icon icon="mdi:chevron-right"></ha-icon>
                  </button>
                `:""}
          </div>

          <!-- Custom Date Pickers -->
          ${this.showCustomPickers?Y`
                <div class="custom-range-pickers">
                  <div class="picker-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      .value=${me(this.currentStartDate,"yyyy-MM-dd")}
                      @change=${this._handleCustomStartChange}
                      .min=${this.config.min_date||""}
                      .max=${this.config.disable_future?me(new Date,"yyyy-MM-dd"):""}
                    />
                  </div>
                  <div class="picker-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      .value=${me(this.currentEndDate,"yyyy-MM-dd")}
                      @change=${this._handleCustomEndChange}
                      .min=${this.config.min_date||""}
                      .max=${this.config.disable_future?me(new Date,"yyyy-MM-dd"):""}
                    />
                  </div>
                </div>
              `:""}
        </div>
      </ha-card>
    `}static get styles(){return o`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(
          --ha-card-box-shadow,
          0px 2px 1px -1px rgba(0, 0, 0, 0.2),
          0px 1px 1px 0px rgba(0, 0, 0, 0.14),
          0px 1px 3px 0px rgba(0, 0, 0, 0.12)
        );
      }

      ha-card.no-background {
        background: transparent;
        box-shadow: none;
        padding: 8px;
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .date-range-display {
        text-align: center;
        font-size: 1.1em;
        font-weight: 500;
        color: var(--primary-text-color);
        padding: 8px;
      }

      .button-row {
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }

      .preset-button,
      .nav-button {
        padding: 10px 16px;
        border: 1px solid var(--divider-color, #e0e0e0);
        background: var(--card-background-color, white);
        color: var(--primary-text-color);
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 44px;
      }

      .preset-button:hover,
      .nav-button:hover {
        background: var(--secondary-background-color, #f5f5f5);
        border-color: var(--primary-color);
      }

      .preset-button.active {
        background: var(--primary-color);
        color: var(--text-primary-color, white);
        border-color: var(--primary-color);
      }

      .nav-button {
        padding: 10px;
      }

      .nav-button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .nav-button:disabled:hover {
        background: var(--card-background-color, white);
        border-color: var(--divider-color, #e0e0e0);
      }

      .custom-range-pickers {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        padding: 16px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .picker-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .picker-group label {
        font-size: 14px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }

      .picker-group input[type='date'] {
        padding: 10px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background: var(--card-background-color, white);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
      }

      @media (max-width: 600px) {
        .button-row {
          gap: 4px;
        }

        .preset-button,
        .nav-button {
          padding: 8px 12px;
          font-size: 12px;
          min-width: 40px;
        }

        .custom-range-pickers {
          grid-template-columns: 1fr;
        }
      }

      ha-icon {
        --mdc-icon-size: 20px;
      }
    `}};t([ut({attribute:!1})],Me.prototype,"hass",void 0),t([lt()],Me.prototype,"config",void 0),t([lt()],Me.prototype,"selectedPreset",void 0),t([lt()],Me.prototype,"currentStartDate",void 0),t([lt()],Me.prototype,"currentEndDate",void 0),t([lt()],Me.prototype,"showCustomPickers",void 0),Me=t([ot("date-range-selector-card")],Me),window.customCards=window.customCards||[],window.customCards.push({type:"date-range-selector-card",name:"Date Range Selector",description:"A card for selecting date ranges with preset buttons"});export{Me as DateRangeSelectorCard};
//# sourceMappingURL=date-range-selector-card.js.map
