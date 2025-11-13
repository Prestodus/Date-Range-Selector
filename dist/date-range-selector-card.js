function t(t,e,n,i){var a,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(r=(o<3?a(r):o>3?a(e,n,r):a(e,n))||r);return o>3&&r&&Object.defineProperty(e,n,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=window,n=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let o=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const n=void 0!==e&&1===e.length;n&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&a.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,n,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[i+1],t[0]);return new o(n,t,i)},s=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;var l;const d=window,c=d.trustedTypes,u=c?c.emptyScript:"",h=d.reactiveElementPolyfillSupport,g={toAttribute(t,e){switch(e){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},p=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:p},v="finalized";let m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,n)=>{const i=this._$Ep(n,e);void 0!==i&&(this._$Ev.set(i,n),t.push(i))}),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const n="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,n,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,n){return{get(){return this[e]},set(i){const a=this[t];this[e]=i,this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty(v))return!1;this[v]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of e)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Ep(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,n;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(n=t.hostConnected)||void 0===n||n.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{n?t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):i.forEach(n=>{const i=document.createElement("style"),a=e.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=n.cssText,t.appendChild(i)})})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$EO(t,e,n=f){var i;const a=this.constructor._$Ep(t,n);if(void 0!==a&&!0===n.reflect){const o=(void 0!==(null===(i=n.converter)||void 0===i?void 0:i.toAttribute)?n.converter:g).toAttribute(e,n.type);this._$El=t,null==o?this.removeAttribute(a):this.setAttribute(a,o),this._$El=null}}_$AK(t,e){var n;const i=this.constructor,a=i._$Ev.get(t);if(void 0!==a&&this._$El!==a){const t=i.getPropertyOptions(a),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(n=t.converter)||void 0===n?void 0:n.fromAttribute)?t.converter:g;this._$El=a,this[a]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,n){let i=!0;void 0!==t&&(((n=n||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===n.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,n))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(n)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(n)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var b;m[v]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:m}),(null!==(l=d.reactiveElementVersions)&&void 0!==l?l:d.reactiveElementVersions=[]).push("1.6.3");const y=window,w=y.trustedTypes,_=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,k="?"+$,C=`<${k}>`,D=document,S=()=>D.createComment(""),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,T="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,A=/-->/g,U=/>/g,N=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,O=/"/g,H=/^(?:script|style|textarea|title)$/i,Y=(t=>(e,...n)=>({_$litType$:t,strings:e,values:n}))(1),F=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),W=new WeakMap,B=D.createTreeWalker(D,129,null,!1);function j(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(e):e}const L=(t,e)=>{const n=t.length-1,i=[];let a,o=2===e?"<svg>":"",r=P;for(let e=0;e<n;e++){const n=t[e];let s,l,d=-1,c=0;for(;c<n.length&&(r.lastIndex=c,l=r.exec(n),null!==l);)c=r.lastIndex,r===P?"!--"===l[1]?r=A:void 0!==l[1]?r=U:void 0!==l[2]?(H.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=N):void 0!==l[3]&&(r=N):r===N?">"===l[0]?(r=null!=a?a:P,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,s=l[1],r=void 0===l[3]?N:'"'===l[3]?O:R):r===O||r===R?r=N:r===A||r===U?r=P:(r=N,a=void 0);const u=r===N&&t[e+1].startsWith("/>")?" ":"";o+=r===P?n+C:d>=0?(i.push(s),n.slice(0,d)+x+n.slice(d)+$+u):n+$+(-2===d?(i.push(void 0),e):u)}return[j(t,o+(t[n]||"<?>")+(2===e?"</svg>":"")),i]};class V{constructor({strings:t,_$litType$:e},n){let i;this.parts=[];let a=0,o=0;const r=t.length-1,s=this.parts,[l,d]=L(t,e);if(this.el=V.createElement(l,n),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=B.nextNode())&&s.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(x)||e.startsWith($)){const n=d[o++];if(t.push(e),void 0!==n){const t=i.getAttribute(n.toLowerCase()+x).split($),e=/([.?@])?(.*)/.exec(n);s.push({type:1,index:a,name:e[2],strings:t,ctor:"."===e[1]?X:"?"===e[1]?Z:"@"===e[1]?K:Q})}else s.push({type:6,index:a})}for(const e of t)i.removeAttribute(e)}if(H.test(i.tagName)){const t=i.textContent.split($),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let n=0;n<e;n++)i.append(t[n],S()),B.nextNode(),s.push({type:2,index:++a});i.append(t[e],S())}}}else if(8===i.nodeType)if(i.data===k)s.push({type:2,index:a});else{let t=-1;for(;-1!==(t=i.data.indexOf($,t+1));)s.push({type:7,index:a}),t+=$.length-1}a++}}static createElement(t,e){const n=D.createElement("template");return n.innerHTML=t,n}}function q(t,e,n=t,i){var a,o,r,s;if(e===F)return e;let l=void 0!==i?null===(a=n._$Co)||void 0===a?void 0:a[i]:n._$Cl;const d=E(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,n,i)),void 0!==i?(null!==(r=(s=n)._$Co)&&void 0!==r?r:s._$Co=[])[i]=l:n._$Cl=l),void 0!==l&&(e=q(t,l._$AS(t,e.values),l,i)),e}class I{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:n},parts:i}=this._$AD,a=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:D).importNode(n,!0);B.currentNode=a;let o=B.nextNode(),r=0,s=0,l=i[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new G(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new tt(o,this,t)),this._$AV.push(e),l=i[++s]}r!==(null==l?void 0:l.index)&&(o=B.nextNode(),r++)}return B.currentNode=D,a}v(t){let e=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class G{constructor(t,e,n,i){var a;this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=i,this._$Cp=null===(a=null==i?void 0:i.isConnected)||void 0===a||a}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),E(t)?t===z||null==t||""===t?(this._$AH!==z&&this._$AR(),this._$AH=z):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>M(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==z&&E(this._$AH)?this._$AA.nextSibling.data=t:this.$(D.createTextNode(t)),this._$AH=t}g(t){var e;const{values:n,_$litType$:i}=t,a="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=V.createElement(j(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===a)this._$AH.v(n);else{const t=new I(a,this),e=t.u(this.options);t.v(n),this.$(e),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new V(t)),e}T(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,i=0;for(const a of t)i===e.length?e.push(n=new G(this.k(S()),this.k(S()),this,this.options)):n=e[i],n._$AI(a),i++;i<e.length&&(this._$AR(n&&n._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var n;for(null===(n=this._$AP)||void 0===n||n.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Q{constructor(t,e,n,i,a){this.type=1,this._$AH=z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,n,i){const a=this.strings;let o=!1;if(void 0===a)t=q(this,t,e,0),o=!E(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const i=t;let r,s;for(t=a[0],r=0;r<a.length-1;r++)s=q(this,i[n+r],e,r),s===F&&(s=this._$AH[r]),o||(o=!E(s)||s!==this._$AH[r]),s===z?t=z:t!==z&&(t+=(null!=s?s:"")+a[r+1]),this._$AH[r]=s}o&&!i&&this.j(t)}j(t){t===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===z?void 0:t}}const J=w?w.emptyScript:"";class Z extends Q{constructor(){super(...arguments),this.type=4}j(t){t&&t!==z?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class K extends Q{constructor(t,e,n,i,a){super(t,e,n,i,a),this.type=5}_$AI(t,e=this){var n;if((t=null!==(n=q(this,t,e,0))&&void 0!==n?n:z)===F)return;const i=this._$AH,a=t===z&&i!==z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==z&&(i===z||a);a&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,n;"function"==typeof this._$AH?this._$AH.call(null!==(n=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==n?n:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const et=y.litHtmlPolyfillSupport;null==et||et(V,G),(null!==(b=y.litHtmlVersions)&&void 0!==b?b:y.litHtmlVersions=[]).push("2.8.0");var nt,it;class at extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const n=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=n.firstChild),n}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,n)=>{var i,a;const o=null!==(i=null==n?void 0:n.renderBefore)&&void 0!==i?i:e;let r=o._$litPart$;if(void 0===r){const t=null!==(a=null==n?void 0:n.renderBefore)&&void 0!==a?a:null;o._$litPart$=r=new G(e.insertBefore(S(),t),t,void 0,null!=n?n:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return F}}at.finalized=!0,at._$litElement$=!0,null===(nt=globalThis.litElementHydrateSupport)||void 0===nt||nt.call(globalThis,{LitElement:at});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:at}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");const rt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:n,elements:i}=e;return{kind:n,elements:i,finisher(e){customElements.define(t,e)}}})(t,e),st=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}};function lt(t){return(e,n)=>void 0!==n?((t,e,n)=>{e.constructor.createProperty(n,t)})(t,e,n):st(t,e)}function dt(t){return lt({...t,state:!0})}var ct;function ut(t){return ut="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ut(t)}function ht(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function gt(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function pt(t){gt(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"===ut(t)&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function ft(t,e){gt(2,arguments);var n=pt(t),i=ht(e);return isNaN(i)?new Date(NaN):i?(n.setDate(n.getDate()+i),n):n}function vt(t,e){gt(2,arguments);var n=pt(t),i=ht(e);if(isNaN(i))return new Date(NaN);if(!i)return n;var a=n.getDate(),o=new Date(n.getTime());return o.setMonth(n.getMonth()+i+1,0),a>=o.getDate()?o:(n.setFullYear(o.getFullYear(),o.getMonth(),a),n)}null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements;var mt={};function bt(){return mt}function yt(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}function wt(t){gt(1,arguments);var e=pt(t);return e.setHours(0,0,0,0),e}function _t(t,e){return gt(2,arguments),ft(t,7*ht(e))}function xt(t,e){return gt(2,arguments),vt(t,12*ht(e))}var $t=6e4,kt=36e5;function Ct(t){if(gt(1,arguments),!function(t){return gt(1,arguments),t instanceof Date||"object"===ut(t)&&"[object Date]"===Object.prototype.toString.call(t)}(t)&&"number"!=typeof t)return!1;var e=pt(t);return!isNaN(Number(e))}function Dt(t,e){var n=t.getFullYear()-e.getFullYear()||t.getMonth()-e.getMonth()||t.getDate()-e.getDate()||t.getHours()-e.getHours()||t.getMinutes()-e.getMinutes()||t.getSeconds()-e.getSeconds()||t.getMilliseconds()-e.getMilliseconds();return n<0?-1:n>0?1:n}function St(t,e){gt(2,arguments);var n=pt(t),i=pt(e),a=Dt(n,i),o=Math.abs(function(t,e){gt(2,arguments);var n=wt(t),i=wt(e),a=n.getTime()-yt(n),o=i.getTime()-yt(i);return Math.round((a-o)/864e5)}(n,i));n.setDate(n.getDate()-a*o);var r=a*(o-Number(Dt(n,i)===-a));return 0===r?0:r}function Et(t){gt(1,arguments);var e=pt(t);return e.setHours(23,59,59,999),e}function Mt(t,e){return gt(2,arguments),function(t,e){gt(2,arguments);var n=pt(t).getTime(),i=ht(e);return new Date(n+i)}(t,-ht(e))}function Tt(t){gt(1,arguments);var e=pt(t),n=e.getUTCDay(),i=(n<1?7:0)+n-1;return e.setUTCDate(e.getUTCDate()-i),e.setUTCHours(0,0,0,0),e}function Pt(t){gt(1,arguments);var e=pt(t),n=e.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(n+1,0,4),i.setUTCHours(0,0,0,0);var a=Tt(i),o=new Date(0);o.setUTCFullYear(n,0,4),o.setUTCHours(0,0,0,0);var r=Tt(o);return e.getTime()>=a.getTime()?n+1:e.getTime()>=r.getTime()?n:n-1}function At(t){gt(1,arguments);var e=pt(t),n=Tt(e).getTime()-function(t){gt(1,arguments);var e=Pt(t),n=new Date(0);return n.setUTCFullYear(e,0,4),n.setUTCHours(0,0,0,0),Tt(n)}(e).getTime();return Math.round(n/6048e5)+1}function Ut(t,e){var n,i,a,o,r,s,l,d;gt(1,arguments);var c=bt(),u=ht(null!==(n=null!==(i=null!==(a=null!==(o=null==e?void 0:e.weekStartsOn)&&void 0!==o?o:null==e||null===(r=e.locale)||void 0===r||null===(s=r.options)||void 0===s?void 0:s.weekStartsOn)&&void 0!==a?a:c.weekStartsOn)&&void 0!==i?i:null===(l=c.locale)||void 0===l||null===(d=l.options)||void 0===d?void 0:d.weekStartsOn)&&void 0!==n?n:0);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var h=pt(t),g=h.getUTCDay(),p=(g<u?7:0)+g-u;return h.setUTCDate(h.getUTCDate()-p),h.setUTCHours(0,0,0,0),h}function Nt(t,e){var n,i,a,o,r,s,l,d;gt(1,arguments);var c=pt(t),u=c.getUTCFullYear(),h=bt(),g=ht(null!==(n=null!==(i=null!==(a=null!==(o=null==e?void 0:e.firstWeekContainsDate)&&void 0!==o?o:null==e||null===(r=e.locale)||void 0===r||null===(s=r.options)||void 0===s?void 0:s.firstWeekContainsDate)&&void 0!==a?a:h.firstWeekContainsDate)&&void 0!==i?i:null===(l=h.locale)||void 0===l||null===(d=l.options)||void 0===d?void 0:d.firstWeekContainsDate)&&void 0!==n?n:1);if(!(g>=1&&g<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var p=new Date(0);p.setUTCFullYear(u+1,0,g),p.setUTCHours(0,0,0,0);var f=Ut(p,e),v=new Date(0);v.setUTCFullYear(u,0,g),v.setUTCHours(0,0,0,0);var m=Ut(v,e);return c.getTime()>=f.getTime()?u+1:c.getTime()>=m.getTime()?u:u-1}function Rt(t,e){gt(1,arguments);var n=pt(t),i=Ut(n,e).getTime()-function(t,e){var n,i,a,o,r,s,l,d;gt(1,arguments);var c=bt(),u=ht(null!==(n=null!==(i=null!==(a=null!==(o=null==e?void 0:e.firstWeekContainsDate)&&void 0!==o?o:null==e||null===(r=e.locale)||void 0===r||null===(s=r.options)||void 0===s?void 0:s.firstWeekContainsDate)&&void 0!==a?a:c.firstWeekContainsDate)&&void 0!==i?i:null===(l=c.locale)||void 0===l||null===(d=l.options)||void 0===d?void 0:d.firstWeekContainsDate)&&void 0!==n?n:1),h=Nt(t,e),g=new Date(0);return g.setUTCFullYear(h,0,u),g.setUTCHours(0,0,0,0),Ut(g,e)}(n,e).getTime();return Math.round(i/6048e5)+1}function Ot(t,e){for(var n=t<0?"-":"",i=Math.abs(t).toString();i.length<e;)i="0"+i;return n+i}var Ht=function(t,e){var n=t.getUTCFullYear(),i=n>0?n:1-n;return Ot("yy"===e?i%100:i,e.length)},Yt=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):Ot(n+1,2)},Ft=function(t,e){return Ot(t.getUTCDate(),e.length)},zt=function(t,e){return Ot(t.getUTCHours()%12||12,e.length)},Wt=function(t,e){return Ot(t.getUTCHours(),e.length)},Bt=function(t,e){return Ot(t.getUTCMinutes(),e.length)},jt=function(t,e){return Ot(t.getUTCSeconds(),e.length)},Lt=function(t,e){var n=e.length,i=t.getUTCMilliseconds();return Ot(Math.floor(i*Math.pow(10,n-3)),e.length)},Vt="midnight",qt="noon",It="morning",Gt="afternoon",Qt="evening",Xt="night",Jt={G:function(t,e,n){var i=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(i,{width:"abbreviated"});case"GGGGG":return n.era(i,{width:"narrow"});default:return n.era(i,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var i=t.getUTCFullYear(),a=i>0?i:1-i;return n.ordinalNumber(a,{unit:"year"})}return Ht(t,e)},Y:function(t,e,n,i){var a=Nt(t,i),o=a>0?a:1-a;return"YY"===e?Ot(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):Ot(o,e.length)},R:function(t,e){return Ot(Pt(t),e.length)},u:function(t,e){return Ot(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var i=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(i);case"QQ":return Ot(i,2);case"Qo":return n.ordinalNumber(i,{unit:"quarter"});case"QQQ":return n.quarter(i,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(i,{width:"narrow",context:"formatting"});default:return n.quarter(i,{width:"wide",context:"formatting"})}},q:function(t,e,n){var i=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(i);case"qq":return Ot(i,2);case"qo":return n.ordinalNumber(i,{unit:"quarter"});case"qqq":return n.quarter(i,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(i,{width:"narrow",context:"standalone"});default:return n.quarter(i,{width:"wide",context:"standalone"})}},M:function(t,e,n){var i=t.getUTCMonth();switch(e){case"M":case"MM":return Yt(t,e);case"Mo":return n.ordinalNumber(i+1,{unit:"month"});case"MMM":return n.month(i,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(i,{width:"narrow",context:"formatting"});default:return n.month(i,{width:"wide",context:"formatting"})}},L:function(t,e,n){var i=t.getUTCMonth();switch(e){case"L":return String(i+1);case"LL":return Ot(i+1,2);case"Lo":return n.ordinalNumber(i+1,{unit:"month"});case"LLL":return n.month(i,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(i,{width:"narrow",context:"standalone"});default:return n.month(i,{width:"wide",context:"standalone"})}},w:function(t,e,n,i){var a=Rt(t,i);return"wo"===e?n.ordinalNumber(a,{unit:"week"}):Ot(a,e.length)},I:function(t,e,n){var i=At(t);return"Io"===e?n.ordinalNumber(i,{unit:"week"}):Ot(i,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):Ft(t,e)},D:function(t,e,n){var i=function(t){gt(1,arguments);var e=pt(t),n=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var i=n-e.getTime();return Math.floor(i/864e5)+1}(t);return"Do"===e?n.ordinalNumber(i,{unit:"dayOfYear"}):Ot(i,e.length)},E:function(t,e,n){var i=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(i,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(i,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(i,{width:"short",context:"formatting"});default:return n.day(i,{width:"wide",context:"formatting"})}},e:function(t,e,n,i){var a=t.getUTCDay(),o=(a-i.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return Ot(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,i){var a=t.getUTCDay(),o=(a-i.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return Ot(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var i=t.getUTCDay(),a=0===i?7:i;switch(e){case"i":return String(a);case"ii":return Ot(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(i,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(i,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(i,{width:"short",context:"formatting"});default:return n.day(i,{width:"wide",context:"formatting"})}},a:function(t,e,n){var i=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(i,{width:"narrow",context:"formatting"});default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},b:function(t,e,n){var i,a=t.getUTCHours();switch(i=12===a?qt:0===a?Vt:a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(i,{width:"narrow",context:"formatting"});default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},B:function(t,e,n){var i,a=t.getUTCHours();switch(i=a>=17?Qt:a>=12?Gt:a>=4?It:Xt,e){case"B":case"BB":case"BBB":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(i,{width:"narrow",context:"formatting"});default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var i=t.getUTCHours()%12;return 0===i&&(i=12),n.ordinalNumber(i,{unit:"hour"})}return zt(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):Wt(t,e)},K:function(t,e,n){var i=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(i,{unit:"hour"}):Ot(i,e.length)},k:function(t,e,n){var i=t.getUTCHours();return 0===i&&(i=24),"ko"===e?n.ordinalNumber(i,{unit:"hour"}):Ot(i,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):Bt(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):jt(t,e)},S:function(t,e){return Lt(t,e)},X:function(t,e,n,i){var a=(i._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return Kt(a);case"XXXX":case"XX":return te(a);default:return te(a,":")}},x:function(t,e,n,i){var a=(i._originalDate||t).getTimezoneOffset();switch(e){case"x":return Kt(a);case"xxxx":case"xx":return te(a);default:return te(a,":")}},O:function(t,e,n,i){var a=(i._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+Zt(a,":");default:return"GMT"+te(a,":")}},z:function(t,e,n,i){var a=(i._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+Zt(a,":");default:return"GMT"+te(a,":")}},t:function(t,e,n,i){var a=i._originalDate||t;return Ot(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,i){return Ot((i._originalDate||t).getTime(),e.length)}};function Zt(t,e){var n=t>0?"-":"+",i=Math.abs(t),a=Math.floor(i/60),o=i%60;if(0===o)return n+String(a);var r=e;return n+String(a)+r+Ot(o,2)}function Kt(t,e){return t%60==0?(t>0?"-":"+")+Ot(Math.abs(t)/60,2):te(t,e)}function te(t,e){var n=e||"",i=t>0?"-":"+",a=Math.abs(t);return i+Ot(Math.floor(a/60),2)+n+Ot(a%60,2)}var ee=function(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},ne=function(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},ie={p:ne,P:function(t,e){var n,i=t.match(/(P+)(p+)?/)||[],a=i[1],o=i[2];if(!o)return ee(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",ee(a,e)).replace("{{time}}",ne(o,e))}},ae=["D","DD"],oe=["YY","YYYY"];function re(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var se={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function le(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}var de={date:le({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:le({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:le({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},ce={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function ue(t){return function(e,n){var i;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&t.formattingValues){var a=t.defaultFormattingWidth||t.defaultWidth,o=null!=n&&n.width?String(n.width):a;i=t.formattingValues[o]||t.formattingValues[a]}else{var r=t.defaultWidth,s=null!=n&&n.width?String(n.width):t.defaultWidth;i=t.values[s]||t.values[r]}return i[t.argumentCallback?t.argumentCallback(e):e]}}function he(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.width,a=i&&t.matchPatterns[i]||t.matchPatterns[t.defaultMatchWidth],o=e.match(a);if(!o)return null;var r,s=o[0],l=i&&t.parsePatterns[i]||t.parsePatterns[t.defaultParseWidth],d=Array.isArray(l)?function(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n;return}(l,function(t){return t.test(s)}):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&e(t[n]))return n;return}(l,function(t){return t.test(s)});return r=t.valueCallback?t.valueCallback(d):d,{value:r=n.valueCallback?n.valueCallback(r):r,rest:e.slice(s.length)}}}var ge,pe={code:"en-US",formatDistance:function(t,e,n){var i,a=se[t];return i="string"==typeof a?a:1===e?a.one:a.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+i:i+" ago":i},formatLong:de,formatRelative:function(t,e,n,i){return ce[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),i=n%100;if(i>20||i<10)switch(i%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:ue({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:ue({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:ue({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:ue({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:ue({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(ge={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(ge.matchPattern);if(!n)return null;var i=n[0],a=t.match(ge.parsePattern);if(!a)return null;var o=ge.valueCallback?ge.valueCallback(a[0]):a[0];return{value:o=e.valueCallback?e.valueCallback(o):o,rest:t.slice(i.length)}}),era:he({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:he({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:he({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:he({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:he({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}},fe=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,ve=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,me=/^'([^]*?)'?$/,be=/''/g,ye=/[a-zA-Z]/;function we(t,e,n){var i,a,o,r,s,l,d,c,u,h,g;gt(2,arguments);var p=String(e),f=bt(),v=null!==(i=f.locale)&&void 0!==i?i:pe,m=ht(null!==(a=null!==(o=null!==(r=void 0)&&void 0!==r?r:f.firstWeekContainsDate)&&void 0!==o?o:null===(s=f.locale)||void 0===s||null===(l=s.options)||void 0===l?void 0:l.firstWeekContainsDate)&&void 0!==a?a:1);if(!(m>=1&&m<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var b=ht(null!==(d=null!==(c=null!==(u=void 0)&&void 0!==u?u:f.weekStartsOn)&&void 0!==c?c:null===(h=f.locale)||void 0===h||null===(g=h.options)||void 0===g?void 0:g.weekStartsOn)&&void 0!==d?d:0);if(!(b>=0&&b<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!v.localize)throw new RangeError("locale must contain localize property");if(!v.formatLong)throw new RangeError("locale must contain formatLong property");var y=pt(t);if(!Ct(y))throw new RangeError("Invalid time value");var w=Mt(y,yt(y)),_={firstWeekContainsDate:m,weekStartsOn:b,locale:v,_originalDate:y};return p.match(ve).map(function(t){var e=t[0];return"p"===e||"P"===e?(0,ie[e])(t,v.formatLong):t}).join("").match(fe).map(function(n){if("''"===n)return"'";var i=n[0];if("'"===i)return function(t){var e=t.match(me);if(!e)return t;return e[1].replace(be,"'")}(n);var a,o=Jt[i];if(o)return a=n,-1!==oe.indexOf(a)&&re(n,e,String(t)),function(t){return-1!==ae.indexOf(t)}(n)&&re(n,e,String(t)),o(w,n,v.localize,_);if(i.match(ye))throw new RangeError("Format string contains an unescaped latin alphabet character `"+i+"`");return n}).join("")}function _e(t,e){gt(2,arguments);var n=pt(t),i=pt(e);return n.getTime()>i.getTime()}function xe(t,e){gt(2,arguments);var n=pt(t),i=pt(e);return n.getTime()<i.getTime()}function $e(t,e){gt(1,arguments);var n=ht(2);if(2!==n&&1!==n&&0!==n)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof t&&"[object String]"!==Object.prototype.toString.call(t))return new Date(NaN);var i,a=function(t){var e,n={},i=t.split(ke.dateTimeDelimiter);if(i.length>2)return n;/:/.test(i[0])?e=i[0]:(n.date=i[0],e=i[1],ke.timeZoneDelimiter.test(n.date)&&(n.date=t.split(ke.timeZoneDelimiter)[0],e=t.substr(n.date.length,t.length)));if(e){var a=ke.timezone.exec(e);a?(n.time=e.replace(a[1],""),n.timezone=a[1]):n.time=e}return n}(t);if(a.date){var o=function(t,e){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),i=t.match(n);if(!i)return{year:NaN,restDateString:""};var a=i[1]?parseInt(i[1]):null,o=i[2]?parseInt(i[2]):null;return{year:null===o?a:100*o,restDateString:t.slice((i[1]||i[2]).length)}}(a.date,n);i=function(t,e){if(null===e)return new Date(NaN);var n=t.match(Ce);if(!n)return new Date(NaN);var i=!!n[4],a=Ee(n[1]),o=Ee(n[2])-1,r=Ee(n[3]),s=Ee(n[4]),l=Ee(n[5])-1;if(i)return function(t,e,n){return e>=1&&e<=53&&n>=0&&n<=6}(0,s,l)?function(t,e,n){var i=new Date(0);i.setUTCFullYear(t,0,4);var a=i.getUTCDay()||7,o=7*(e-1)+n+1-a;return i.setUTCDate(i.getUTCDate()+o),i}(e,s,l):new Date(NaN);var d=new Date(0);return function(t,e,n){return e>=0&&e<=11&&n>=1&&n<=(Te[e]||(Pe(t)?29:28))}(e,o,r)&&function(t,e){return e>=1&&e<=(Pe(t)?366:365)}(e,a)?(d.setUTCFullYear(e,o,Math.max(a,r)),d):new Date(NaN)}(o.restDateString,o.year)}if(!i||isNaN(i.getTime()))return new Date(NaN);var r,s=i.getTime(),l=0;if(a.time&&(l=function(t){var e=t.match(De);if(!e)return NaN;var n=Me(e[1]),i=Me(e[2]),a=Me(e[3]);if(!function(t,e,n){if(24===t)return 0===e&&0===n;return n>=0&&n<60&&e>=0&&e<60&&t>=0&&t<25}(n,i,a))return NaN;return n*kt+i*$t+1e3*a}(a.time),isNaN(l)))return new Date(NaN);if(!a.timezone){var d=new Date(s+l),c=new Date(0);return c.setFullYear(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()),c.setHours(d.getUTCHours(),d.getUTCMinutes(),d.getUTCSeconds(),d.getUTCMilliseconds()),c}return r=function(t){if("Z"===t)return 0;var e=t.match(Se);if(!e)return 0;var n="+"===e[1]?-1:1,i=parseInt(e[2]),a=e[3]&&parseInt(e[3])||0;if(!function(t,e){return e>=0&&e<=59}(0,a))return NaN;return n*(i*kt+a*$t)}(a.timezone),isNaN(r)?new Date(NaN):new Date(s+l+r)}var ke={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},Ce=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,De=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,Se=/^([+-])(\d{2})(?::?(\d{2}))?$/;function Ee(t){return t?parseInt(t):1}function Me(t){return t&&parseFloat(t.replace(",","."))||0}var Te=[31,null,31,30,31,30,31,31,30,31,30,31];function Pe(t){return t%400==0||t%4==0&&t%100!=0}let Ae=class extends at{setConfig(t){this.config=t}connectedCallback(){super.connectedCallback(),(async()=>{if(customElements.get("ha-selector"))return;const t=await(window.loadCardHelpers?.());if(!t)return;const e=await t.createCardElement({type:"entity"});e&&await e.getConfigElement()})()}static getStubConfig(){return{type:"custom:date-range-selector-card",start_entity:"",end_entity:"",show_arrows:!0,today_button_type:"icon"}}_valueChanged(t){if(!this.config||!this.hass)return;const e=t.target,n=e.configValue;if(!n)return;let i;""===e.value||void 0===e.value?(i={...this.config},delete i[n]):i={...this.config,[n]:void 0!==e.checked?e.checked:e.value};const a=new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0});this.dispatchEvent(a)}_rangeModeChanged(t){if(!this.config||!this.hass)return;const e=t.target,n=e.dataset.mode;if(!n)return;const i={...this.config,visible_range_modes:{...this.config.visible_range_modes,[n]:e.checked}},a=new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0});this.dispatchEvent(a)}_entityChanged(t,e){if(!this.config||!this.hass)return;const n=t.detail.value,i={...this.config};n&&""!==n?i[e]=n:delete i[e];const a=new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){return this.hass&&this.config?Y`
      <div class="card-config">
        <h3>Required Entities</h3>
        
        <!-- Start Entity -->
        <div class="config-row">
          <label for="start_entity">Start Entity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{domain:["input_datetime"]}}}
            .value=${this.config.start_entity||""}
            @value-changed=${t=>this._entityChanged(t,"start_entity")}
          ></ha-selector>
          <div class="helper-text">
            Entity for the start date (must be an input_datetime helper)
          </div>
        </div>

        <!-- End Entity -->
        <div class="config-row">
          <label for="end_entity">End Entity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{domain:["input_datetime"]}}}
            .value=${this.config.end_entity||""}
            @value-changed=${t=>this._entityChanged(t,"end_entity")}
          ></ha-selector>
          <div class="helper-text">
            Entity for the end date (must be an input_datetime helper)
          </div>
        </div>

        <hr />

        <h3>Range Mode Configuration</h3>

        <!-- Visible Range Modes -->
        <div class="config-row">
          <label>Visible Range Modes</label>
          <div class="helper-text">
            Choose which range mode buttons to display (at least one must be active)
          </div>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                data-mode="day"
                .checked=${!1!==this.config.visible_range_modes?.day}
                @change=${this._rangeModeChanged}
              />
              <span>Day</span>
            </label>
            <label class="checkbox-label">
              <input
                type="checkbox"
                data-mode="week"
                .checked=${!1!==this.config.visible_range_modes?.week}
                @change=${this._rangeModeChanged}
              />
              <span>Week</span>
            </label>
            <label class="checkbox-label">
              <input
                type="checkbox"
                data-mode="month"
                .checked=${!1!==this.config.visible_range_modes?.month}
                @change=${this._rangeModeChanged}
              />
              <span>Month</span>
            </label>
            <label class="checkbox-label">
              <input
                type="checkbox"
                data-mode="year"
                .checked=${!1!==this.config.visible_range_modes?.year}
                @change=${this._rangeModeChanged}
              />
              <span>Year</span>
            </label>
          </div>
        </div>

        <!-- Default Range Mode -->
        <div class="config-row">
          <label for="default_range_mode">Default Range Mode</label>
          <select
            id="default_range_mode"
            .configValue=${"default_range_mode"}
            .value=${this.config.default_range_mode||""}
            @change=${this._valueChanged}
          >
            <option value="">Auto (Smallest Visible)</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <div class="helper-text">
            Default range mode to select on load (defaults to smallest visible if not set)
          </div>
        </div>

        <!-- Show Custom Range -->
        <div class="config-row checkbox-config">
          <label for="show_custom_range">Show Custom Range Option</label>
          <div class="helper-text">
            Display a "Custom" button that reveals date pickers for manual selection
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="show_custom_range"
              .configValue=${"show_custom_range"}
              .checked=${!0===this.config.show_custom_range}
              @change=${this._valueChanged}
            />
            <span>Enable custom date range picker</span>
          </label>
        </div>

        <hr />

        <h3>Display Options</h3>

        <!-- Display Mode -->
        <div class="config-row">
          <label for="display_mode">Display Mode</label>
          <select
            id="display_mode"
            .configValue=${"display_mode"}
            .value=${this.config.display_mode||"default"}
            @change=${this._valueChanged}
          >
            <option value="default">Default</option>
            <option value="compact">Compact</option>
            <option value="in-header">In-Header (Ultra Compact)</option>
          </select>
          <div class="helper-text">
            Choose between default, compact, and in-header display modes
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
            Show the current period button as an icon or text label
          </div>
        </div>

        <!-- Show Navigation Arrows -->
        <div class="config-row checkbox-config">
          <label for="show_arrows">Show Navigation Arrows</label>
          <div class="helper-text">
            Display previous/next arrows to navigate through date ranges
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="show_arrows"
              .configValue=${"show_arrows"}
              .checked=${!1!==this.config.show_arrows}
              @change=${this._valueChanged}
            />
            <span>Enable navigation arrows</span>
          </label>
        </div>

        <!-- Hide Background -->
        <div class="config-row checkbox-config">
          <label for="hide_background">Hide Card Background</label>
          <div class="helper-text">
            Remove the card background and shadow to blend with the dashboard
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="hide_background"
              .configValue=${"hide_background"}
              .checked=${!0===this.config.hide_background}
              @change=${this._valueChanged}
            />
            <span>Hide card background</span>
          </label>
        </div>

        <!-- Hide Date Display -->
        <div class="config-row checkbox-config">
          <label for="hide_date_display">Hide Date Display</label>
          <div class="helper-text">
            Hide the date range display to show dates elsewhere in your dashboard
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="hide_date_display"
              .configValue=${"hide_date_display"}
              .checked=${!0===this.config.hide_date_display}
              @change=${this._valueChanged}
            />
            <span>Hide date range display</span>
          </label>
        </div>

        <!-- Date Display Position -->
        <div class="config-row">
          <label for="date_display_position">Date Display Position</label>
          <select
            id="date_display_position"
            .configValue=${"date_display_position"}
            .value=${this.config.date_display_position||"above"}
            @change=${this._valueChanged}
          >
            <option value="above">Above Buttons</option>
            <option value="below">Below Buttons</option>
          </select>
          <div class="helper-text">
            Position of the date range display relative to the selector buttons
          </div>
        </div>

        <hr />

        <h3>Date Constraints</h3>

        <!-- Disable Future -->
        <div class="config-row checkbox-config">
          <label for="disable_future">Disable Future Dates</label>
          <div class="helper-text">
            Prevent selection of dates in the future (caps ranges at today)
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="disable_future"
              .configValue=${"disable_future"}
              .checked=${!0===this.config.disable_future}
              @change=${this._valueChanged}
            />
            <span>Disable future dates</span>
          </label>
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

        <hr />

        <h3>Optional Helper Entities</h3>

        <!-- Range Entity -->
        <div class="config-row">
          <label for="range_entity">Range Helper Entity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{domain:["input_number"]}}}
            .value=${this.config.range_entity||""}
            @value-changed=${t=>this._entityChanged(t,"range_entity")}
          ></ha-selector>
          <div class="helper-text">
            Entity for storing the range in days (must be an input_number helper). Useful for ApexCharts integration.
          </div>
        </div>

        <!-- Offset Entity -->
        <div class="config-row">
          <label for="offset_entity">Offset Helper Entity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{domain:["input_number"]}}}
            .value=${this.config.offset_entity||""}
            @value-changed=${t=>this._entityChanged(t,"offset_entity")}
          ></ha-selector>
          <div class="helper-text">
            Entity for storing offset in days from today to start date (must be an input_number helper). 0 = today, -7 = 7 days ago. Useful for ApexCharts integration.
          </div>
        </div>

        <hr />

        <h3>Button Style</h3>

        <!-- Use Button Group -->
        <div class="config-row checkbox-config">
          <label for="use_button_group">Use Connected Button Group</label>
          <div class="helper-text">
            Display buttons as a modern, connected button group with no gaps between buttons
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="use_button_group"
              .configValue=${"use_button_group"}
              .checked=${!0===this.config.use_button_group}
              @change=${this._valueChanged}
            />
            <span>Enable connected button group style</span>
          </label>
        </div>

        <hr />

        <h3>Floating Mode</h3>

        <!-- Floating Mode -->
        <div class="config-row checkbox-config">
          <label for="floating_mode">Enable Floating Button Mode</label>
          <div class="helper-text">
            Show a floating action button that opens a popup with the date selector controls
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="floating_mode"
              .configValue=${"floating_mode"}
              .checked=${!0===this.config.floating_mode}
              @change=${this._valueChanged}
            />
            <span>Enable floating button mode</span>
          </label>
        </div>

        ${!0===this.config.floating_mode?Y`
              <!-- Floating Button Position -->
              <div class="config-row">
                <label for="floating_button_position">Floating Button Position</label>
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
                <label for="floating_button_icon">Floating Button Icon</label>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{icon:{}}}
                  .value=${this.config.floating_button_icon||"mdi:calendar-range"}
                  @value-changed=${t=>this._entityChanged(t,"floating_button_icon")}
                ></ha-selector>
                <div class="helper-text">
                  Icon to display on the floating button (only shown if text is empty)
                </div>
              </div>

              <!-- Floating Button Text -->
              <div class="config-row">
                <label for="floating_button_text">Floating Button Text</label>
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
      </div>
    `:Y``}static get styles(){return r`
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
      input[type='date'],
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
      input[type='date']:focus,
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

      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 4px;
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
    `}};t([lt({attribute:!1})],Ae.prototype,"hass",void 0),t([dt()],Ae.prototype,"config",void 0),Ae=t([rt("date-range-selector-editor")],Ae);console.info("%c DATE-RANGE-SELECTOR-CARD %c v0.0.2 ","color: white; background: #0084ff; font-weight: 700;","color: #0084ff; background: white; font-weight: 700;");let Ue=class extends at{constructor(){super(...arguments),this.selectedPreset="day",this.currentStartDate=wt(new Date),this.currentEndDate=Et(new Date),this.showCustomPickers=!1,this.isUpdating=!1,this.showFloatingPopup=!1}static getConfigElement(){return document.createElement("date-range-selector-editor")}static getStubConfig(){return{type:"custom:date-range-selector-card",start_entity:"",end_entity:"",show_arrows:!0,today_button_type:"icon"}}setConfig(t){if(!t.start_entity)throw new Error("You must define start_entity");if(!t.end_entity)throw new Error("You must define end_entity");this.config={show_arrows:!0,today_button_type:"icon",hide_background:!1,hide_date_display:!1,date_display_position:"above",show_custom_range:!1,disable_future:!1,display_mode:"default",visible_range_modes:{day:!0,week:!0,month:!0,year:!0},use_button_group:!1,floating_mode:!1,floating_button_position:"bottom-right",floating_button_icon:"mdi:calendar-range",floating_button_text:"",...t};const e=this.config.visible_range_modes;e.day||e.week||e.month||e.year||(e.day=!0),this.config.default_range_mode&&this._isRangeModeVisible(this.config.default_range_mode)?this.selectedPreset=this.config.default_range_mode:e.day?this.selectedPreset="day":e.week?this.selectedPreset="week":e.month?this.selectedPreset="month":e.year&&(this.selectedPreset="year")}getCardSize(){return 3}updated(t){super.updated(t),t.has("hass")&&this.hass&&this._updateDatesFromEntities()}_updateDatesFromEntities(){if(!this.hass||!this.config)return;const t=this.hass.states[this.config.start_entity],e=this.hass.states[this.config.end_entity];if(t&&"unavailable"!==t.state&&"unknown"!==t.state)try{this.currentStartDate=$e(t.state)}catch(t){console.error("Error parsing start date:",t)}if(e&&"unavailable"!==e.state&&"unknown"!==e.state)try{this.currentEndDate=$e(e.state)}catch(t){console.error("Error parsing end date:",t)}}_handleToday(){const t=new Date;"custom"===this.selectedPreset&&(this.selectedPreset="day",this.showCustomPickers=!1);const{start:e,end:n}=this._calculatePresetRange(this.selectedPreset,t);this._setDateRange(e,n)}_handlePreset(t){if("custom"===t)return this.showCustomPickers=!this.showCustomPickers,void(this.selectedPreset=t);this.selectedPreset=t,this.showCustomPickers=!1;const e=new Date,{start:n,end:i}=this._calculatePresetRange(t,e);this._setDateRange(n,i)}_handleNavigation(t){if("custom"===this.selectedPreset)return;const e="prev"===t?-1:1;let n;switch(this.selectedPreset){case"day":n=ft(this.currentStartDate,e);break;case"week":n=_t(this.currentStartDate,e);break;case"month":n=vt(this.currentStartDate,e);break;case"year":n=xt(this.currentStartDate,e);break;default:return}const{start:i,end:a}=this._calculatePresetRange(this.selectedPreset,n);this._setDateRange(i,a)}_calculatePresetRange(t,e){let n,i;switch(t){case"day":default:n=wt(e),i=Et(e);break;case"week":n=function(t,e){var n,i,a,o,r,s,l,d;gt(1,arguments);var c=bt(),u=ht(null!==(n=null!==(i=null!==(a=null!==(o=null==e?void 0:e.weekStartsOn)&&void 0!==o?o:null==e||null===(r=e.locale)||void 0===r||null===(s=r.options)||void 0===s?void 0:s.weekStartsOn)&&void 0!==a?a:c.weekStartsOn)&&void 0!==i?i:null===(l=c.locale)||void 0===l||null===(d=l.options)||void 0===d?void 0:d.weekStartsOn)&&void 0!==n?n:0);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var h=pt(t),g=h.getDay(),p=(g<u?7:0)+g-u;return h.setDate(h.getDate()-p),h.setHours(0,0,0,0),h}(e,{weekStartsOn:1}),i=function(t,e){var n,i,a,o,r,s,l,d;gt(1,arguments);var c=bt(),u=ht(null!==(n=null!==(i=null!==(a=null!==(o=null==e?void 0:e.weekStartsOn)&&void 0!==o?o:null==e||null===(r=e.locale)||void 0===r||null===(s=r.options)||void 0===s?void 0:s.weekStartsOn)&&void 0!==a?a:c.weekStartsOn)&&void 0!==i?i:null===(l=c.locale)||void 0===l||null===(d=l.options)||void 0===d?void 0:d.weekStartsOn)&&void 0!==n?n:0);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var h=pt(t),g=h.getDay(),p=6+(g<u?-7:0)-(g-u);return h.setDate(h.getDate()+p),h.setHours(23,59,59,999),h}(e,{weekStartsOn:1});break;case"month":n=function(t){gt(1,arguments);var e=pt(t);return e.setDate(1),e.setHours(0,0,0,0),e}(e),i=function(t){gt(1,arguments);var e=pt(t),n=e.getMonth();return e.setFullYear(e.getFullYear(),n+1,0),e.setHours(23,59,59,999),e}(e);break;case"year":n=function(t){gt(1,arguments);var e=pt(t),n=new Date(0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}(e),i=function(t){gt(1,arguments);var e=pt(t),n=e.getFullYear();return e.setFullYear(n+1,0,0),e.setHours(23,59,59,999),e}(e)}return this._applyConstraints(n,i)}_applyConstraints(t,e){const n=Et(new Date);let i=t,a=e;if(this.config.min_date){const t=$e(this.config.min_date);xe(i,t)&&(i=t),xe(a,t)&&(a=t)}return this.config.disable_future&&(_e(a,n)&&(a=n),_e(i,n)&&(i=n)),{start:i,end:a}}_canNavigatePrev(){if("custom"===this.selectedPreset)return!1;if(!this.config.min_date)return!0;const t=$e(this.config.min_date);let e;switch(this.selectedPreset){case"day":e=ft(this.currentStartDate,-1);break;case"week":e=_t(this.currentStartDate,-1);break;case"month":e=vt(this.currentStartDate,-1);break;case"year":e=xt(this.currentStartDate,-1);break;default:return!0}return!xe(e,t)}_canNavigateNext(){if("custom"===this.selectedPreset)return!1;if(!this.config.disable_future)return!0;const t=new Date;let e;switch(this.selectedPreset){case"day":e=ft(this.currentEndDate,1);break;case"week":e=_t(this.currentEndDate,1);break;case"month":e=vt(this.currentEndDate,1);break;case"year":e=xt(this.currentEndDate,1);break;default:return!0}return!_e(e,t)}_isRangeModeVisible(t){return"custom"===t?!0===this.config.show_custom_range:!1!==this.config.visible_range_modes?.[t]}_getVisibleRangeModes(){const t=[];return this._isRangeModeVisible("day")&&t.push("day"),this._isRangeModeVisible("week")&&t.push("week"),this._isRangeModeVisible("month")&&t.push("month"),this._isRangeModeVisible("year")&&t.push("year"),t}_shouldShowRangeButton(t){if(!this._isRangeModeVisible(t))return!1;if(!this.config.show_custom_range){if(1===this._getVisibleRangeModes().length)return!1}return!0}async _setDateRange(t,e){if(this.isUpdating)return;this.isUpdating=!0,this.currentStartDate=t,this.currentEndDate=e;const n=we(t,"yyyy-MM-dd"),i=we(e,"yyyy-MM-dd");try{if(await this.hass.callService("input_datetime","set_datetime",{entity_id:this.config.start_entity,date:n}),await this.hass.callService("input_datetime","set_datetime",{entity_id:this.config.end_entity,date:i}),this.config.range_entity){const n=St(e,t)+1;await this.hass.callService("input_number","set_value",{entity_id:this.config.range_entity,value:n})}if(this.config.offset_entity){const e=St(t,wt(new Date));await this.hass.callService("input_number","set_value",{entity_id:this.config.offset_entity,value:e})}}catch(t){console.error("Error setting date range:",t)}finally{setTimeout(()=>{this.isUpdating=!1},100)}}_handleCustomStartChange(t){const e=t.detail.value;if(e){const t=$e(e);let n=this.currentEndDate;_e(t,this.currentEndDate)&&(n=t),this._setDateRange(t,n)}}_handleCustomEndChange(t){const e=t.detail.value;if(e){const t=$e(e);this._setDateRange(this.currentStartDate,t)}}_getTodayButtonLabel(){switch(this.selectedPreset){case"day":case"custom":default:return"Today";case"week":return"This Week";case"month":return"This Month";case"year":return"This Year"}}_toggleFloatingPopup(){this.showFloatingPopup=!this.showFloatingPopup}_closeFloatingPopup(){this.showFloatingPopup=!1}_isTodayRangeActive(){if("custom"===this.selectedPreset)return!1;const t=new Date,{start:e,end:n}=this._calculatePresetRange(this.selectedPreset,t),i=we(this.currentStartDate,"yyyy-MM-dd"),a=we(this.currentEndDate,"yyyy-MM-dd"),o=we(e,"yyyy-MM-dd"),r=we(n,"yyyy-MM-dd");return i===o&&a===r}_isEditMode(){if("undefined"!=typeof window){if(window.location.href.includes("edit=1"))return!0;let t=this.parentElement;for(;t;){if(t.classList?.contains("edit-mode"))return!0;t=t.parentElement}}return!1}_formatDateRange(){try{const t=we(this.currentStartDate,"MMMM d, yyyy"),e=we(this.currentEndDate,"MMMM d, yyyy");return t===e?t:`${t} - ${e}`}catch(t){return"Invalid date range"}}render(){if(!this.config||!this.hass)return Y``;const t=this.config.hide_background?"no-background":"",e="compact"===this.config.display_mode,n="in-header"===this.config.display_mode,i=!this.config.hide_date_display,a=this.config.date_display_position||"above",o=!0===this.config.use_button_group,r=!0===this.config.floating_mode&&!this._isEditMode(),s=()=>i?e?Y`
          <div class="date-range-display compact">
            ${this._formatDateRange()}
          </div>
        `:Y`
        <div class="date-range-display">
          ${this._formatDateRange()}
        </div>
      `:Y``,l=()=>Y`
      <div class="button-row ${o?"button-group":""}">
        ${this.config.show_arrows?Y`
              <button
                class="nav-button"
                @click=${()=>this._handleNavigation("prev")}
                ?disabled=${!this._canNavigatePrev()||this.isUpdating}
                title="Previous"
              >
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </button>
            `:""}

        <button
          class="preset-button ${this._isTodayRangeActive()?"active":""}"
          @click=${this._handleToday}
          ?disabled=${this.isUpdating}
          title="${this._getTodayButtonLabel()}"
        >
          ${"icon"===this.config.today_button_type?Y`<ha-icon icon="mdi:calendar-today"></ha-icon>`:Y`${this._getTodayButtonLabel()}`}
        </button>

        ${this._shouldShowRangeButton("day")?Y`
              <button
                class="preset-button ${"day"===this.selectedPreset?"active":""}"
                @click=${()=>this._handlePreset("day")}
                ?disabled=${this.isUpdating}
              >
                Day
              </button>
            `:""}

        ${this._shouldShowRangeButton("week")?Y`
              <button
                class="preset-button ${"week"===this.selectedPreset?"active":""}"
                @click=${()=>this._handlePreset("week")}
                ?disabled=${this.isUpdating}
              >
                Week
              </button>
            `:""}

        ${this._shouldShowRangeButton("month")?Y`
              <button
                class="preset-button ${"month"===this.selectedPreset?"active":""}"
                @click=${()=>this._handlePreset("month")}
                ?disabled=${this.isUpdating}
              >
                Month
              </button>
            `:""}

        ${this._shouldShowRangeButton("year")?Y`
              <button
                class="preset-button ${"year"===this.selectedPreset?"active":""}"
                @click=${()=>this._handlePreset("year")}
                ?disabled=${this.isUpdating}
              >
                Year
              </button>
            `:""}

        ${this.config.show_custom_range?Y`
              <button
                class="preset-button ${"custom"===this.selectedPreset?"active":""}"
                @click=${()=>this._handlePreset("custom")}
                ?disabled=${this.isUpdating}
              >
                Custom
              </button>
            `:""}

        ${this.config.show_arrows?Y`
              <button
                class="nav-button"
                @click=${()=>this._handleNavigation("next")}
                ?disabled=${!this._canNavigateNext()||this.isUpdating}
                title="Next"
              >
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </button>
            `:""}
      </div>
    `,d=()=>this.showCustomPickers?Y`
        <div class="custom-range-pickers">
          <div class="picker-group">
            <ha-date-input
              .locale=${this.hass.locale}
              .value=${we(this.currentStartDate,"yyyy-MM-dd")}
              .label=${"Start Date"}
              @value-changed=${this._handleCustomStartChange}
              .min=${this.config.min_date||""}
              .max=${this.config.disable_future?we(new Date,"yyyy-MM-dd"):""}
              .disabled=${this.isUpdating}
            ></ha-date-input>
          </div>
          <div class="picker-group">
            <ha-date-input
              .locale=${this.hass.locale}
              .value=${we(this.currentEndDate,"yyyy-MM-dd")}
              .label=${"End Date"}
              @value-changed=${this._handleCustomEndChange}
              .min=${we(this.currentStartDate,"yyyy-MM-dd")}
              .max=${this.config.disable_future?we(new Date,"yyyy-MM-dd"):""}
              .disabled=${this.isUpdating}
            ></ha-date-input>
          </div>
        </div>
      `:Y``,c=()=>Y`
      <!-- Date Range Display (Above) -->
      ${"above"===a?s():""}

      <!-- Preset Buttons Row -->
      ${l()}

      <!-- Date Range Display (Below) -->
      ${"below"===a?s():""}

      <!-- Custom Date Pickers -->
      ${d()}
    `;if(r){const t=this.config.floating_button_position||"bottom-right",e=this.config.floating_button_icon||"mdi:calendar-range",n=this.config.floating_button_text||"";return Y`
        <div class="floating-container">
          <button
            class="floating-button ${t} ${n?"with-text":""}"
            @click=${this._toggleFloatingPopup}
            title="Date Range Selector"
          >
            <ha-icon icon="${e}"></ha-icon>
            ${n?Y`<span class="button-text">${n}</span>`:""}
          </button>

          ${this.showFloatingPopup?Y`
                <div class="floating-popup-overlay" @click=${this._closeFloatingPopup}>
                  <div class="floating-popup" @click=${t=>t.stopPropagation()}>
                    <div class="popup-header">
                      <h3>Date Range Selector</h3>
                      <button class="close-button" @click=${this._closeFloatingPopup}>
                        <ha-icon icon="mdi:close"></ha-icon>
                      </button>
                    </div>
                    <div class="popup-content">
                      ${c()}
                    </div>
                  </div>
                </div>
              `:""}
        </div>
      `}return Y`
      <ha-card class="${t} ${e?"compact-mode":""} ${n?"in-header-mode":""}">
        <div class="card-content">
          ${c()}
        </div>
      </ha-card>
    `}static get styles(){return r`
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
        border: none;
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

      .date-range-display.compact {
        font-size: 0.9em;
        padding: 4px 8px;
      }

      ha-card.compact-mode {
        padding: 8px;
      }

      ha-card.compact-mode .card-content {
        gap: 8px;
      }

      ha-card.compact-mode .button-row {
        gap: 4px;
      }

      ha-card.compact-mode .button-row.button-group {
        gap: 0;
      }

      ha-card.compact-mode .preset-button,
      ha-card.compact-mode .nav-button {
        padding: 6px 10px;
        font-size: 12px;
        min-width: 36px;
        height: 36px;
      }

      ha-card.in-header-mode {
        padding: 0;
      }

      ha-card.in-header-mode .card-content {
        gap: 0;
      }

      ha-card.in-header-mode .button-row {
        gap: 2px;
      }

      ha-card.in-header-mode .button-row.button-group {
        gap: 0;
      }

      ha-card.in-header-mode .preset-button,
      ha-card.in-header-mode .nav-button {
        padding: 4px 8px;
        font-size: 11px;
        min-width: 32px;
        height: 32px;
      }

      .button-row {
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }

      /* Button Group Styles */
      .button-row.button-group {
        gap: 0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .button-row.button-group .preset-button,
      .button-row.button-group .nav-button {
        border-radius: 0;
        border-right-width: 0;
        margin: 0;
      }

      .button-row.button-group .preset-button:first-child,
      .button-row.button-group .nav-button:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      .button-row.button-group .preset-button:last-child,
      .button-row.button-group .nav-button:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-right-width: 1px;
      }

      .button-row.button-group .preset-button.active {
        position: relative;
        z-index: 1;
        border-right-width: 1px;
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
        height: 44px;
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

      .picker-group input[type='date'],
      .picker-group ha-date-input {
        padding: 10px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background: var(--card-background-color, white);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
      }

      .picker-group ha-date-input {
        padding: 0;
        border: none;
      }

      ha-card.compact-mode .custom-range-pickers {
        gap: 8px;
        padding: 8px;
      }

      ha-card.no-background .custom-range-pickers {
        background: transparent;
      }

      ha-card.in-header-mode .custom-range-pickers {
        gap: 4px;
        padding: 4px;
      }

      /* Floating Mode Styles */
      .floating-container {
        position: relative;
      }

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

      .floating-button.with-text {
        width: auto;
        border-radius: 28px;
        padding: 0 20px 0 16px;
        gap: 8px;
      }

      .floating-button .button-text {
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

      .floating-popup-overlay {
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

      .floating-popup {
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        max-width: 600px;
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

      .popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
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

      .popup-content {
        padding: 20px;
      }

      .popup-content .card-content {
        padding: 0;
      }

      @media (max-width: 600px) {
        .button-row {
          gap: 4px;
        }

        .button-row.button-group {
          flex-wrap: nowrap;
          overflow-x: auto;
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

        .floating-popup {
          max-height: 95vh;
          border-radius: 16px 16px 0 0;
        }

        .floating-popup-overlay {
          align-items: flex-end;
          padding: 0;
        }
      }

      ha-icon {
        --mdc-icon-size: 20px;
      }
    `}};t([lt({attribute:!1})],Ue.prototype,"hass",void 0),t([dt()],Ue.prototype,"config",void 0),t([dt()],Ue.prototype,"selectedPreset",void 0),t([dt()],Ue.prototype,"currentStartDate",void 0),t([dt()],Ue.prototype,"currentEndDate",void 0),t([dt()],Ue.prototype,"showCustomPickers",void 0),t([dt()],Ue.prototype,"isUpdating",void 0),t([dt()],Ue.prototype,"showFloatingPopup",void 0),Ue=t([rt("date-range-selector-card")],Ue),window.customCards=window.customCards||[],window.customCards.push({type:"custom:date-range-selector-card",name:"Date Range Selector",description:"A card for selecting date ranges with preset buttons"});export{Ue as DateRangeSelectorCard};
//# sourceMappingURL=date-range-selector-card.js.map
