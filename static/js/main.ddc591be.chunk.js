(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{47:function(e,t,a){e.exports=a(67)},66:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(10),o=a(25),s=a(23),c=a(17),l=a(18),d=a(5),p=a(6),m=a(9),u=a(7),b=a(8),h=a(74),g=a(79),v=a(78),f=a(41),y=a(20),E=function(e){function t(){return Object(d.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(v.a,{align:"left",className:"wi-full",options:T,onSelect:function(t){e.props.addComponent(e.props.region,t.value,0,e.props.id,e.props.panelIndex)}},r.a.createElement(f.a,null,r.a.createElement(y.a,{label:this.props.label})))}}]),t}(n.Component),C=a(2),x=a.n(C);function N(e){return Object.assign({},e)}function R(e,t,a,n,r){return"\n    ".concat(e," ").concat(r,", \n    in ").concat(t,". \n    Current position ").concat(a+1," of ").concat(n,".\n  ")}function O(e,t,a){var n=t;return"add"===a?++n>e.length-1&&(n=e.length-1):"sub"===a&&--n<0&&(n=0),n}function k(e,t,a){return e.find(function(e){return e[t]===a})}function w(e,t,a,n,i){if("string"===typeof e.component)return r.a.createElement("div",{className:x()("component pos-rel",{grabbed:e.isGrabbed}),id:e.id,key:e.id,tabIndex:"0",onKeyDown:a,"data-type":e.value},r.a.createElement("div",{className:"pas pos-abs right-0 z-above"},r.a.createElement(y.a,{assistiveText:{icon:"Grab ".concat(e.label)},className:"cmp-action-btn bg-white mrs",iconCategory:"utility",iconName:"rows",iconVariant:"border",onClick:n,variant:"icon"}),r.a.createElement(y.a,{assistiveText:{icon:"Delete ".concat(e.label)},className:"cmp-action-btn bg-white mrs",iconCategory:"utility",iconName:"delete",iconVariant:"border",variant:"icon"})),r.a.createElement("div",{className:"bam border-blue"},r.a.createElement("img",{src:"./images/".concat(e.imageSrc),alt:"fake image stencil for ".concat(e.label)})));var o=e.component;return r.a.createElement("div",{className:x()("component pos-rel",{grabbed:e.isGrabbed}),"data-type":e.value,id:e.id,key:"component-".concat(e.id),onKeyDown:a,tabIndex:"0"},r.a.createElement("div",{className:"pas pos-abs right-0 z-above"},r.a.createElement(y.a,{assistiveText:{icon:"Grab ".concat(e.label)},className:"cmp-action-btn bg-white mrs",iconCategory:"utility",iconName:"rows",iconVariant:"border",onClick:n,variant:"icon"}),r.a.createElement(y.a,{assistiveText:{icon:"Delete ".concat(e.label)},className:"cmp-action-btn bg-white mrs",iconCategory:"utility",iconName:"delete",iconVariant:"border",variant:"icon"})),r.a.createElement(o,{addComponent:i,children:e.children,className:"mbs",handleKeyDown:a,handleStartDrag:n,id:"".concat(e.id),region:t}))}var D=function(e){function t(){return Object(d.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"renderPanel",value:function(e,t){var a=this,i=this.props.children.filter(function(e){return e.panelIndex===t});return r.a.createElement(h.a,{id:"".concat(this.props.id,"-").concat(t),key:"".concat(this.props.id,"-").concat(t),label:e},0===i.length?r.a.createElement(E,{addComponent:this.props.addComponent,id:this.props.id,label:"Add a Component: Tabs Panel ".concat(t+1),panelIndex:t,region:this.props.region}):r.a.createElement(n.Fragment,null,i.map(function(e,t){return w(e,a.props.region,a.props.handleKeyDown,a.props.handleStartDrag)})))}},{key:"render",value:function(){var e=this;return r.a.createElement(g.a,{className:this.props.className},P.map(function(t,a){return e.renderPanel(t,a)}))}}]),t}(n.Component),j=a(11),I=a(75),S=a(76),A=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).state={expandedPanels:{}},a.togglePanel=a.togglePanel.bind(Object(j.a)(Object(j.a)(a))),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"togglePanel",value:function(e,t){this.setState(function(e){return Object(l.a)({},e,{expandedPanels:Object(l.a)({},e.expandedPanels,Object(c.a)({},t,!e.expandedPanels[t]))})})}},{key:"renderPanel",value:function(e,t){var a=this,i=this.props.children.filter(function(e){return e.panelIndex===t});return r.a.createElement(I.a,{expanded:!!this.state.expandedPanels["".concat(this.props.id,"-").concat(t)],id:"".concat(this.props.id,"-").concat(t),key:"".concat(this.props.id,"-").concat(t),label:e,onTogglePanel:function(e){return a.togglePanel(e,"".concat(a.props.id,"-").concat(t))},summary:e},0===i.length?r.a.createElement(E,{addComponent:this.props.addComponent,id:this.props.id,label:"Add a Component: Accordion Panel ".concat(t+1),panelIndex:t,region:this.props.region}):r.a.createElement(n.Fragment,null,i.map(function(e,t){return w(e,a.props.region,a.props.handleKeyDown,a.props.handleStartDrag)})))}},{key:"render",value:function(){var e=this;return r.a.createElement(S.a,{id:this.props.id,className:"white-bkgd ".concat(this.props.className)},P.map(function(t,a){return e.renderPanel(t,a)}))}}]),t}(n.Component),P=["Label 1","Label 2","Label 3"],T=[{id:"chatter",imageSrc:"stencil_chatter.png",component:"chatter",label:"Chatter",value:"chatter",rightIcon:{category:"utility",name:"chat"}},{id:"tabs",component:D,children:[],label:"Tabs",value:"tabs",rightIcon:{category:"utility",name:"tabset"}},{id:"accordion",component:A,children:[],label:"Accordion",value:"accordion",rightIcon:{category:"utility",name:"layers"}}],F={test:"test",regions:["HEADER","COMPONENT_PANEL","CANVAS","PROPERTY_PANEL"],currFocusedRegion:null,canvasRegions:["builder-header","builder-main","builder-sidebar"],canvas:{header:{components:[{component:A,id:"001",value:"accordion",children:[{panelIndex:0,component:"chatter",label:"Chatter",id:"003",imageSrc:"stencil_chatter.png",value:"chatter"}]}]},main:{components:[{component:D,id:"002",value:"tabs",children:[{panelIndex:0,component:"chatter",label:"Chatter",imageSrc:"stencil_chatter.png",value:"chatter"}]}]},sidebar:{components:[]}}},_=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_REGION":return Object(l.a)({},e,{canvas:Object(l.a)({},e.canvas,Object(c.a)({},t.region,t.newRegionData))});default:return e}},K=Object(s.b)(_),L=a(44),z=a.n(L),V=function(e){function t(){return Object(d.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"renderComponents",value:function(e,t){var a=this;return 0===t.length?r.a.createElement(v.a,{align:"left",className:"wi-full",options:T,onSelect:function(t){a.props.addComponent(e,t.value)}},r.a.createElement(f.a,null,r.a.createElement(y.a,{label:"Add a Component: ".concat(e," Region")}))):t.map(function(t){return void 0!==t||null!==t?w(t,e,a.props.handleKeyDown,a.props.handleStartDrag,a.props.addComponent):null})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"main-builder",className:"maxs mbn pam pbn bg-blue dg builder-grid dg-stretch",ref:this.props.canvasRef,tabIndex:"-1"},Object.keys(this.props.data).map(function(t,a){return r.a.createElement("section",{id:e.props.canvasRegions[a],className:"builder-region slds-text-align_center","aria-labelledby":"builder-".concat(t,"-header"),key:a},r.a.createElement("h2",{className:"slds-assistive-text"},t," region"),r.a.createElement("div",{className:"mal",id:"builder-".concat(t,"-components")},e.renderComponents(t,e.props.data[t].components)))}))}}]),t}(n.Component),H=a(77),M=a(21),U=function(e){function t(){return Object(d.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"renderHeaderActions",value:function(){return r.a.createElement(H.a,null,r.a.createElement(y.a,{assistiveText:{icon:"Undo"},iconCategory:"utility",iconName:"undo",iconSize:"medium",iconVariant:"border",onClick:function(){console.log("Undo Clicked")},variant:"icon"}),r.a.createElement(y.a,{assistiveText:{icon:"Redo"},iconCategory:"utility",iconName:"redo",iconSize:"medium",iconVariant:"border",onClick:function(){console.log("redo Clicked")},variant:"icon"}),r.a.createElement(y.a,{assistiveText:{icon:"Cut"},iconCategory:"utility",iconName:"cut",iconSize:"medium",iconVariant:"border",onClick:function(){console.log("cut Clicked")},variant:"icon"}),r.a.createElement(y.a,{assistiveText:{icon:"Copy"},iconCategory:"utility",iconName:"copy",iconSize:"medium",iconVariant:"border",onClick:function(){console.log("copy Clicked")},variant:"icon"}))}},{key:"renderHeaderViews",value:function(){return r.a.createElement("div",{className:"mlx dib"},r.a.createElement(v.a,{align:"right",options:[{label:"Desktop",value:"A0"},{label:"Mobile",value:"B0"}]},r.a.createElement(f.a,null,r.a.createElement(y.a,{className:"mrs",iconCategory:"utility",iconName:"down",iconPosition:"right",label:"Desktop"}))),r.a.createElement(v.a,{align:"right",options:[{label:"Scale to Fit",value:"A0"},{label:"Full size",value:"B0"}]},r.a.createElement(f.a,null,r.a.createElement(y.a,{className:"mhs",iconCategory:"utility",iconName:"down",iconPosition:"right",label:"Scale to Fit"}))),r.a.createElement(y.a,{className:"mhs",iconCategory:"utility",iconName:"refresh",iconPosition:"left",label:"Refresh"}))}},{key:"renderHeaderSave",value:function(){return r.a.createElement("div",null,r.a.createElement(y.a,{label:"Save",variant:"brand"}),r.a.createElement(y.a,{label:"Activate",variant:"brand"}))}},{key:"render",value:function(){return r.a.createElement("header",{id:"header-section",className:"region-focus",ref:this.props.headerRef,tabIndex:"-1"},r.a.createElement("section",{className:"df df-justify bg-navy"},r.a.createElement("div",null,r.a.createElement("span",{className:"pam dib brs border-white text-white"},r.a.createElement(M.a,{category:"utility",name:"builder",size:"small",inverse:!0}),r.a.createElement("span",{className:"phm"},"Lightning App Builder")),r.a.createElement("button",{className:"pam dib brs border-white text-white"},r.a.createElement("span",{className:"phm"},"Pages"),r.a.createElement(M.a,{category:"utility",name:"chevrondown",size:"x-small",inverse:!0}))),r.a.createElement("span",{className:"pam text-white"},"App Name"),r.a.createElement("div",null,r.a.createElement("button",{className:"pam dib brs border-white text-white"},r.a.createElement(M.a,{category:"utility",name:"back",size:"x-small",inverse:!0}),r.a.createElement("span",{className:"phm"},"Back")),r.a.createElement("button",{className:"pam dib brs border-white text-white"},r.a.createElement(M.a,{category:"utility",name:"help",size:"x-small",inverse:!0}),r.a.createElement("span",{className:"phm"},"Help")))),r.a.createElement("section",{className:"df df-justify bg-white"},r.a.createElement("div",{className:"pam"},this.renderHeaderActions(),this.renderHeaderViews()),r.a.createElement("div",{className:"pam"},this.renderHeaderSave())))}}]),t}(n.Component),G=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).state={currIndex:0},a.handleKeyDown=a.handleKeyDown.bind(Object(j.a)(Object(j.a)(a))),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentDidUpdate",value:function(e,t){var a=T[this.state.currIndex];t.currIndex!==this.state.currIndex&&document.getElementById(a.id).focus()}},{key:"handleKeyDown",value:function(e){var t=this.state.currIndex;"ArrowDown"===e.key?t=O(T,this.state.currIndex,"add"):"ArrowUp"===e.key&&(t=O(T,this.state.currIndex,"sub")),this.setState({currIndex:t})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"components-sidebar",className:"pam bg-white bas border-gray",ref:this.props.sidebarRef,tabIndex:"-1"},r.a.createElement("h2",{className:"mbm slds-text-heading_large"},"Lightning Components"),r.a.createElement("ul",null,T.map(function(t,a){return r.a.createElement("li",{className:"mbs df df-justify",key:t.id},r.a.createElement(y.a,{iconCategory:t.rightIcon.category,iconName:t.rightIcon.name,iconPosition:"left",label:t.label,onKeyDown:e.handleKeyDown,onClick:function(){e.props.handleStartDrag(t.id)},variant:"base",id:t.id,tabIndex:a===e.state.currIndex?"0":"-1"}),r.a.createElement("div",null,r.a.createElement(M.a,{assistiveText:{label:"Desktop Compatible"},category:"utility",name:"desktop",size:"x-small"}),r.a.createElement(M.a,{assistiveText:{label:"Mobile Compatible"},category:"utility",name:"phone_portrait",size:"x-small"})))})))}}]),t}(n.Component),B=function(e){function t(e){return Object(d.a)(this,t),Object(m.a)(this,Object(u.a)(t).call(this,e))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",{className:"mbm slds-text-heading_large"},"Properties"),r.a.createElement("img",{src:"./images/stencil_inputs.png",alt:"stencil for fake property fields"}),r.a.createElement("img",{src:"./images/stencil_formFields.png",alt:"stencil for fake property fields"}),r.a.createElement("img",{src:"./images/stencil_formFields.png",alt:"stencil for fake property fields"}))}}]),t}(n.Component),Y=(a(66),function(e){function t(e){var a;Object(d.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleF6=function(e){if("F6"===e.key)switch(a.state.currFocusedRegion){case null:a.headerRef.current.focus(),a.setState({currFocusedRegion:"HEADER"});break;case"HEADER":a.sidebarRef.current.focus(),a.setState({currFocusedRegion:"COMPONENT_PANEL"});break;case"COMPONENT_PANEL":a.canvasRef.current.focus(),a.setState({currFocusedRegion:"CANVAS"});break;case"CANVAS":a.propertiesRef.current.focus(),a.setState({currFocusedRegion:"PROPERTY_PANEL"});break;case"PROPERTY_PANEL":a.headerRef.current.focus(),a.setState({currFocusedRegion:"HEADER"});break;default:console.log("error")}};var n=N(a.props.canvas);return a.state={allComponents:n,assistiveText:"",currFocusedElement:null,currFocusedRegion:null,grabbedComponent:null,grabbedComponentCurrRegion:"header",grabbedComponentIndex:0,grabbedComponentType:null,isDragDropMode:!1},a.addComponent=a.addComponent.bind(Object(j.a)(Object(j.a)(a))),a.handleStartDrag=a.handleStartDrag.bind(Object(j.a)(Object(j.a)(a))),a.handleKeyDown=a.handleKeyDown.bind(Object(j.a)(Object(j.a)(a))),a.headerRef=r.a.createRef(),a.sidebarRef=r.a.createRef(),a.canvasRef=r.a.createRef(),a.propertiesRef=r.a.createRef(),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentDidUpdate",value:function(){null!==this.state.currFocusedElement&&document.getElementById(this.state.currFocusedElement).focus()}},{key:"addComponent",value:function(e,t){var a,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:-1;null===this.state.grabbedComponent?a=N(k(T,"id",t)):a=N(this.state.grabbedComponent);a.id=z()(),a.isGrabbed=!1;var o=N(this.props.canvas[e]);if(i>-1){var s=k(o.components,"id",r);a.panelIndex=i,s.children.splice(i,0,a)}else o.components.splice(n,0,a);return this.props.updateRegion(e,o),this.setState({currFocusedElement:a.id}),a.id}},{key:"handleDrop",value:function(e){var t=N(this.props.canvas),a=this.addComponent(this.state.grabbedComponentCurrRegion,this.state.grabbedComponentType,this.state.grabbedComponentIndex),n=t[this.state.grabbedComponentCurrRegion].components,r=n.findIndex(function(e){return!0===e.isGrabbed});n.splice(r,1);var i=R(this.state.grabbedComponentType,this.state.grabbedComponentCurrRegion,this.state.grabbedComponentIndex,n.length,"dropped");this.setState(function(n){return{allComponents:t,assistiveText:i,currFocusedElement:e?a:n.currFocusedElement,grabbedComponent:null,grabbedComponentIndex:0,grabbedComponentCurrRegion:"header",isDragDropMode:!1}})}},{key:"handleStartDrag",value:function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=N(this.props.canvas),r="header",i=0;if(null!==this.state.grabbedComponent&&this.handleDrop(),null!==a){var o=a.target.closest("section"),s=a.target.closest("div.component");t=N(k(n[r=o.id.substring(8)].components,"id",s.id)),i=n[r].components.findIndex(function(e){return e.id===s.id}),n[r].components.splice(i,1),this.props.updateRegion(r,n[r])}else{t=N(k(T,"id",e))}t.id="floating-".concat(e),t.isGrabbed=!0,n[r].components.splice(i,0,t);var c=R(e,r,i,n[r].components.length,"grabbed");this.setState({allComponents:n,assistiveText:c,currFocusedElement:t.id,isDragDropMode:!0,grabbedComponent:t,grabbedComponentIndex:i,grabbedComponentType:e,grabbedComponentCurrRegion:r})}},{key:"handleKeyDown",value:function(e){" "===e.key?(e.preventDefault(),null!==this.state.grabbedComponent?this.handleDrop(!0):this.handleStartDrag(e.target.getAttribute("data-type"),e)):"ArrowRight"===e.key||"ArrowLeft"===e.key?this.handleRightLeft(e):"ArrowUp"!==e.key&&"ArrowDown"!==e.key||this.handleUpDown(e)}},{key:"handleUpDown",value:function(e){e.preventDefault();var t=N(this.props.canvas),a=t[this.state.grabbedComponentCurrRegion].components,n=this.state.grabbedComponentIndex,r=O(a,n,"ArrowDown"===e.key?"add":"sub");a.splice(r,0,a.splice(n,1)[0]),t[this.state.grabbedComponentCurrRegion].component=a;var i=R(this.state.grabbedComponentType,this.state.grabbedComponentCurrRegion,r,a.length,"grabbed");this.setState({allComponents:t,assistiveText:i,grabbedComponentIndex:r})}},{key:"handleRightLeft",value:function(e){e.preventDefault();var t=N(this.props.canvas),a="builder-".concat(this.state.grabbedComponentCurrRegion),n=O(this.props.canvasRegions,this.props.canvasRegions.findIndex(function(e){return e===a}),"ArrowRight"===e.key?"add":"sub"),r=this.props.canvasRegions[n].substring(8),i=t[this.state.grabbedComponentCurrRegion].components,o=t[r].components;i.splice(this.state.grabbedComponentIndex,1),o.splice(0,0,this.state.grabbedComponent);var s=R(this.state.grabbedComponentType,r,0,o.length,"grabbed");this.setState({allComponents:t,assistiveText:s,grabbedComponentIndex:0,grabbedComponentCurrRegion:r})}},{key:"render",value:function(){return r.a.createElement("div",{className:"App ht-full dg app-grid bg-gray",onKeyDown:this.handleF6},this.state.assistiveText?r.a.createElement("div",{"aria-live":"assertive",className:"pam slds-text-heading_large bg-navy text-white"},this.state.assistiveText):null,r.a.createElement(U,{headerRef:this.headerRef}),r.a.createElement("main",{className:"dg main-grid dg-stretch"},r.a.createElement(G,{handleStartDrag:this.handleStartDrag,sidebarRef:this.sidebarRef}),r.a.createElement(V,{data:this.state.allComponents,addComponent:this.addComponent,isDragDropMode:this.state.isDragDropMode,handleKeyDown:this.handleKeyDown,canvasRegions:this.props.canvasRegions,handleStartDrag:this.handleStartDrag,canvasRef:this.canvasRef}),r.a.createElement("div",{id:"properties-sidebar",className:"pam bg-white bas border-gray",ref:this.propertiesRef,tabIndex:"-1"},r.a.createElement(B,null))))}}]),t}(n.Component)),J=Object(o.b)(function(e){return{canvas:e.canvas,canvasRegions:e.canvasRegions,regions:e.regions}},function(e){return{updateRegion:function(t,a){return e(function(e,t){return{type:"UPDATE_REGION",region:e,newRegionData:t}}(t,a))}}})(Y),q=a(39);Object(i.render)(r.a.createElement(o.a,{store:K},r.a.createElement(q.a,{iconPath:"icons"},r.a.createElement(J,null))),document.getElementById("root"))}},[[47,1,2]]]);
//# sourceMappingURL=main.ddc591be.chunk.js.map