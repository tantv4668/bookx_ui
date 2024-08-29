(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[9253],{33467:e=>{e.exports={menuWrap:"menuWrap-g78rwseC",isMeasuring:"isMeasuring-g78rwseC",scrollWrap:"scrollWrap-g78rwseC",momentumBased:"momentumBased-g78rwseC",menuBox:"menuBox-g78rwseC",isHidden:"isHidden-g78rwseC"}},83340:(e,t,n)=>{"use strict";n.d(t,{MenuContext:()=>r});const r=n(67294).createContext(null)},11026:(e,t,n)=>{"use strict";n.d(t,{DEFAULT_MENU_THEME:()=>g,Menu:()=>_});var r=n(67294),s=n(94184),o=n.n(s),i=n(16282),l=n(64185),a=n(83122),u=n(66189),c=n(32011),h=n(28595),d=n(40181),p=n(35189),m=n(83340),f=n(33467);const g=f;class _ extends r.PureComponent{constructor(e){super(e),this._containerRef=null,this._scrollWrapRef=null,this._raf=null,this._manager=new h.OverlapManager,this._hotkeys=null,this._scroll=0,this._handleContainerRef=e=>{this._containerRef=e,this.props.reference&&("function"==typeof this.props.reference&&this.props.reference(e),"object"==typeof this.props.reference&&(this.props.reference.current=e))},this._handleScrollWrapRef=e=>{this._scrollWrapRef=e,"function"==typeof this.props.scrollWrapReference&&this.props.scrollWrapReference(e),"object"==typeof this.props.scrollWrapReference&&(this.props.scrollWrapReference.current=e)},this._handleMeasure=e=>{var t,n,r;if(this.state.isMeasureValid)return;const{position:s}=this.props,o=(0,i.ensureNotNull)(this._containerRef);let a=o.getBoundingClientRect();const u=document.documentElement.clientHeight,c=document.documentElement.clientWidth;let h=u-0;const d=a.height>h;if(d){(0,i.ensureNotNull)(this._scrollWrapRef).style.overflowY="scroll",a=o.getBoundingClientRect()}const{width:p,height:m}=a,f="function"==typeof s?s(p,m,u):s,g=c-(null!==(t=f.overrideWidth)&&void 0!==t?t:p)-0,_=(0,l.clamp)(f.x,0,Math.max(0,g)),v=u-(null!==(n=f.overrideHeight)&&void 0!==n?n:m)-0;let C=(0,l.clamp)(f.y,0,Math.max(0,v));f.forbidCorrectYCoord&&C<f.y&&(h-=f.y-C,C=f.y),this.setState({appearingMenuHeight:null!==(r=f.overrideHeight)&&void 0!==r?r:d?h:void 0,appearingMenuWidth:f.overrideWidth,appearingPosition:{x:_,y:C},isMeasureValid:!0},()=>{this._restoreScrollPosition(),e&&e()})},this._restoreScrollPosition=()=>{const e=document.activeElement,t=(0,i.ensureNotNull)(this._containerRef);if(null!==e&&t.contains(e))try{e.scrollIntoView()}catch(e){}else(0,i.ensureNotNull)(this._scrollWrapRef).scrollTop=this._scroll},this._resizeForced=()=>{this.setState({appearingMenuHeight:void 0,appearingMenuWidth:void 0,appearingPosition:void 0,isMeasureValid:void 0})},this._resize=()=>{null===this._raf&&(this._raf=requestAnimationFrame(()=>{this.setState({appearingMenuHeight:void 0,appearingMenuWidth:void 0,appearingPosition:void 0,isMeasureValid:void 0}),this._raf=null}))},this._handleGlobalClose=()=>{this.props.onClose()},this._handleSlot=e=>{this._manager.setContainer(e)},this._handleScroll=()=>{this._scroll=(0,i.ensureNotNull)(this._scrollWrapRef).scrollTop},this.state={}}componentDidMount(){this._handleMeasure(this.props.onOpen);const{customCloseDelegate:e=c.globalCloseDelegate}=this.props
;e.subscribe(this,this._handleGlobalClose),window.addEventListener("resize",this._resize);const t=null!==this.context;this._hotkeys||t||(this._hotkeys=d.createGroup({desc:"Popup menu"}),this._hotkeys.add({desc:"Close",hotkey:27,handler:()=>this._handleGlobalClose()}))}componentDidUpdate(){this._handleMeasure()}componentWillUnmount(){const{customCloseDelegate:e=c.globalCloseDelegate}=this.props;e.unsubscribe(this,this._handleGlobalClose),window.removeEventListener("resize",this._resize),this._hotkeys&&(this._hotkeys.destroy(),this._hotkeys=null),null!==this._raf&&(cancelAnimationFrame(this._raf),this._raf=null)}render(){const{id:e,role:t,"aria-labelledby":n,"aria-activedescendant":s,children:i,minWidth:l,theme:c=f,className:h,maxHeight:d,onMouseOver:g,onMouseOut:_,onKeyDown:C,onFocus:M,onBlur:b}=this.props,{appearingMenuHeight:x,appearingMenuWidth:y,appearingPosition:W,isMeasureValid:S}=this.state;return r.createElement(m.MenuContext.Provider,{value:this},r.createElement(p.SubmenuHandler,null,r.createElement(u.SlotContext.Provider,{value:this._manager},r.createElement("div",{id:e,role:t,"aria-labelledby":n,"aria-activedescendant":s,className:o()(h,c.menuWrap,!S&&c.isMeasuring),style:{height:x,left:W&&W.x,minWidth:l,position:"fixed",top:W&&W.y,width:y},"data-name":this.props["data-name"],ref:this._handleContainerRef,onScrollCapture:this.props.onScroll,onContextMenu:a.preventDefaultForContextMenu,tabIndex:this.props.tabIndex,onMouseOver:g,onMouseOut:_,onKeyDown:C,onFocus:M,onBlur:b},r.createElement("div",{className:o()(c.scrollWrap,!this.props.noMomentumBasedScroll&&c.momentumBased),style:{overflowY:void 0!==x?"scroll":"auto",maxHeight:d},onScrollCapture:this._handleScroll,ref:this._handleScrollWrapRef},r.createElement(v,{className:c.menuBox},i)))),r.createElement(u.Slot,{reference:this._handleSlot})))}update(e){e?this._resizeForced():this._resize()}}function v(e){const t=(0,i.ensureNotNull)((0,r.useContext)(p.SubmenuContext)),n=r.useRef(null);return r.createElement("div",{ref:n,className:e.className,onMouseOver:function(e){if(!(null!==t.current&&e.target instanceof Node&&(r=e.target,null===(s=n.current)||void 0===s?void 0:s.contains(r))))return;var r,s;t.isSubmenuNode(e.target)||t.setCurrent(null)},"data-name":"menu-inner"},e.children)}_.contextType=p.SubmenuContext},84206:(e,t,n)=>{"use strict";n.d(t,{CloseDelegateContext:()=>o});var r=n(67294),s=n(32011);const o=r.createContext(s.globalCloseDelegate)},35189:(e,t,n)=>{"use strict";n.d(t,{SubmenuContext:()=>s,SubmenuHandler:()=>o});var r=n(67294);const s=r.createContext(null);function o(e){const[t,n]=(0,r.useState)(null),o=(0,r.useRef)(null),i=(0,r.useRef)(new Map);return(0,r.useEffect)(()=>()=>{null!==o.current&&clearTimeout(o.current)},[]),r.createElement(s.Provider,{value:{current:t,setCurrent:function(e){null!==o.current&&(clearTimeout(o.current),o.current=null);null===t?n(e):o.current=setTimeout(()=>{o.current=null,n(e)},100)},registerSubmenu:function(e,t){return i.current.set(e,t),()=>{i.current.delete(e)}},isSubmenuNode:function(e){
return Array.from(i.current.values()).some(t=>t(e))}}},e.children)}}}]);