/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("gesture-simulate",function(e,t){function T(n){n||e.error(t+": invalid target node"),this.node=n,this.target=e.Node.getDOMNode(n);var r=this.node.getXY(),i=this._getDims();a=r[0]+i[0]/2,f=r[1]+i[1]/2}var t="gesture-simulate",n=e.config.win&&"ontouchstart"in e.config.win&&!e.UA.phantomjs&&!(e.UA.chrome&&e.UA.chrome<6),r={tap:1,doubletap:1,press:1,move:1,flick:1,pinch:1,rotate:1},i={touchstart:1,touchmove:1,touchend:1,touchcancel:1},s=e.config.doc,o,u=20,a,f,l={HOLD_TAP:10,DELAY_TAP:10,HOLD_PRESS:3e3,MIN_HOLD_PRESS:1e3,MAX_HOLD_PRESS:6e4,DISTANCE_MOVE:200,DURATION_MOVE:1e3,MAX_DURATION_MOVE:5e3,MIN_VELOCITY_FLICK:1.3,DISTANCE_FLICK:200,DURATION_FLICK:1e3,MAX_DURATION_FLICK:5e3,DURATION_PINCH:1e3},c="touchstart",h="touchmove",p="touchend",d="gesturestart",v="gesturechange",m="gestureend",g="mouseup",y="mousemove",b="mousedown",w="click",E="dblclick",S="x",x="y";T.prototype={_toRadian:function(e){return e*(Math.PI/180)},_getDims:function(){var e,t,n;return this.target.getBoundingClientRect?(e=this.target.getBoundingClientRect(),"height"in e?n=e.height:n=Math.abs(e.bottom-e.top),"width"in e?t=e.width:t=Math.abs(e.right-e.left)):(e=this.node.get("region"),t=e.width,n=e.height),[t,n]},_calculateDefaultPoint:function(t){var n;return!e.Lang.isArray(t)||t.length===0?t=[a,f]:(t.length==1&&(n=this._getDims[1],t[1]=n/2),t[0]=this.node.getX()+t[0],t[1]=this.node.getY()+t[1]),t},rotate:function(n,r,i,s,o,u,a){var f,l=i,c=s;if(!e.Lang.isNumber(l)||!e.Lang.isNumber(c)||l<0||c<0)f=this.target.offsetWidth<this.target.offsetHeight?this.target.offsetWidth/4:this.target.offsetHeight/4,l=f,c=f;e.Lang.isNumber(a)||e.error(t+"Invalid rotation detected."),this.pinch(n,r,l,c,o,u,a)},pinch:function(n,r,i,s,o,a,f){var g,y,b=u,w,E=0,S=i,x=s,T,N,C,k,L,A,O,M,_,D={start:[],end:[]},P={start:[],end:[]},H,B;r=this._calculateDefaultPoint(r),(!e.Lang.isNumber(S)||!e.Lang.isNumber(x)||S<0||x<0)&&e.error(t+"Invalid startRadius and endRadius detected.");if(!e.Lang.isNumber(o)||o<=0)o=l.DURATION_PINCH;if(!e.Lang.isNumber(a))a=0;else{a%=360;while(a<0)a+=360}e.Lang.isNumber(f)||(f=0),e.AsyncQueue.defaults.timeout=b,g=new e.AsyncQueue,N=r[0],C=r[1],O=a,M=a+f,D.start=[N+S*Math.sin(this._toRadian(O)),C-S*Math.cos(this._toRadian(O))],D.end=[N+x*Math.sin(this._toRadian(M)),C-x*Math.cos(this._toRadian(M))],P.start=[N-S*Math.sin(this._toRadian(O)),C+S*Math.cos(this._toRadian(O))],P.end=[N-x*Math.sin(this._toRadian(M)),C+x*Math.cos(this._toRadian(M))],k=1,L=s/i,g.add({fn:function(){var t,n,r,i;t={pageX:D.start[0],pageY:D.start[1],clientX:D.start[0],clientY:D.start[1]},n={pageX:P.start[0],pageY:P.start[1],clientX:P.start[0],clientY:P.start[1]},i=this._createTouchList([e.merge({identifier:E++},t),e.merge({identifier:E++},n)]),r={pageX:(D.start[0]+P.start[0])/2,pageY:(D.start[0]+P.start[1])/2,clientX:(D.start[0]+P.start[0])/2,clientY:(D.start[0]+P.start[1])/2},this._simulateEvent(this.target,c,e.merge({touches:i,targetTouches:i,changedTouches:i,scale:k,rotation:O},r)),e.UA.ios>=2&&this._simulateEvent(this.target,d,e.merge({scale:k,rotation:O},r))},timeout:0,context:this}),H=Math.floor(o/b),T=(x-S)/H,A=(L-k)/H,_=(M-O)/H,B=function(t){var n=S+T*t,r=N+n*Math.sin(this._toRadian(O+_*t)),i=C-n*Math.cos(this._toRadian(O+_*t)),s=N-n*Math.sin(this._toRadian(O+_*t)),o=C+n*Math.cos(this._toRadian(O+_*t)),u=(r+s)/2,a=(i+o)/2,f,l,c,p;f={pageX:r,pageY:i,clientX:r,clientY:i},l={pageX:s,pageY:o,clientX:s,clientY:o},p=this._createTouchList([e.merge({identifier:E++},f),e.merge({identifier:E++},l)]),c={pageX:u,pageY:a,clientX:u,clientY:a},this._simulateEvent(this.target,h,e.merge({touches:p,targetTouches:p,changedTouches:p,scale:k+A*t,rotation:O+_*t},c)),e.UA.ios>=2&&this._simulateEvent(this.target,v,e.merge({scale:k+A*t,rotation:O+_*t},c))};for(y=0;y<H;y++)g.add({fn:B,args:[y],context:this});g.add({fn:function(){var t=this._getEmptyTouchList(),n,r,i,s;n={pageX:D.end[0],pageY:D.end[1],clientX:D.end[0],clientY:D.end[1]},r={pageX:P.end[0],pageY:P.end[1],clientX:P.end[0],clientY:P.end[1]},s=this._createTouchList([e.merge({identifier:E++},n),e.merge({identifier:E++},r)]),i={pageX:(D.end[0]+P.end[0])/2,pageY:(D.end[0]+P.end[1])/2,clientX:(D.end[0]+P.end[0])/2,clientY:(D.end[0]+P.end[1])/2},e.UA.ios>=2&&this._simulateEvent(this.target,m,e.merge({scale:L,rotation:M},i)),this._simulateEvent(this.target,p,e.merge({touches:t,targetTouches:t,changedTouches:s,scale:L,rotation:M},i))},context:this}),n&&e.Lang.isFunction(n)&&g.add({fn:n,context:this.node}),g.run()},tap:function(t,r,i,s,o){var u=new e.AsyncQueue,a=this._getEmptyTouchList(),f,h,d,v,m;r=this._calculateDefaultPoint(r);if(!e.Lang.isNumber(i)||i<1)i=1;e.Lang.isNumber(s)||(s=l.HOLD_TAP),e.Lang.isNumber(o)||(o=l.DELAY_TAP),h={pageX:r[0],pageY:r[1],clientX:r[0],clientY:r[1]},f=this._createTouchList([e.merge({identifier:0},h)]),v=function(){this._simulateEvent(this.target,c,e.merge({touches:f,targetTouches:f,changedTouches:f},h))},m=function(){this._simulateEvent(this.target,p,e.merge({touches:a,targetTouches:a,changedTouches:f},h))};for(d=0;d<i;d++)u.add({fn:v,context:this,timeout:d===0?0:o}),u.add({fn:m,context:this,timeout:s});i>1&&!n&&u.add({fn:function(){this._simulateEvent(this.target,E,h)},context:this}),t&&e.Lang.isFunction(t)&&u.add({fn:t,context:this.node}),u.run()},flick:function(n,r,i,s,o){var u;r=this._calculateDefaultPoint(r),e.Lang.isString(i)?(i=i.toLowerCase(),i!==S&&i!==x&&e.error(t+"(flick): Only x or y axis allowed")):i=S,e.Lang.isNumber(s)||(s=l.DISTANCE_FLICK),e.Lang.isNumber(o)?o>l.MAX_DURATION_FLICK&&(o=l.MAX_DURATION_FLICK):o=l.DURATION_FLICK,Math.abs(s)/o<l.MIN_VELOCITY_FLICK&&(o=Math.abs(s)/l.MIN_VELOCITY_FLICK),u={start:e.clone(r),end:[i===S?r[0]+s:r[0],i===x?r[1]+s:r[1]]},this._move(n,u,o)},move:function(t,n,r){var i;e.Lang.isObject(n)?(e.Lang.isArray(n.point)?n.point=this._calculateDefaultPoint(n.point):n.point=this._calculateDefaultPoint([]),e.Lang.isNumber(n.xdist)||(n.xdist=l.DISTANCE_MOVE),e.Lang.isNumber(n.ydist)||(n.ydist=0)):n={point:this._calculateDefaultPoint([]),xdist:l.
DISTANCE_MOVE,ydist:0},e.Lang.isNumber(r)?r>l.MAX_DURATION_MOVE&&(r=l.MAX_DURATION_MOVE):r=l.DURATION_MOVE,i={start:e.clone(n.point),end:[n.point[0]+n.xdist,n.point[1]+n.ydist]},this._move(t,i,r)},_move:function(t,n,r){var i,s,o=u,d,v,m,g=0,y;e.Lang.isNumber(r)?r>l.MAX_DURATION_MOVE&&(r=l.MAX_DURATION_MOVE):r=l.DURATION_MOVE,e.Lang.isObject(n)?(e.Lang.isArray(n.start)||(n.start=[a,f]),e.Lang.isArray(n.end)||(n.end=[a+l.DISTANCE_MOVE,f])):n={start:[a,f],end:[a+l.DISTANCE_MOVE,f]},e.AsyncQueue.defaults.timeout=o,i=new e.AsyncQueue,i.add({fn:function(){var t={pageX:n.start[0],pageY:n.start[1],clientX:n.start[0],clientY:n.start[1]},r=this._createTouchList([e.merge({identifier:g++},t)]);this._simulateEvent(this.target,c,e.merge({touches:r,targetTouches:r,changedTouches:r},t))},timeout:0,context:this}),d=Math.floor(r/o),v=(n.end[0]-n.start[0])/d,m=(n.end[1]-n.start[1])/d,y=function(t){var r=n.start[0]+v*t,i=n.start[1]+m*t,s={pageX:r,pageY:i,clientX:r,clientY:i},o=this._createTouchList([e.merge({identifier:g++},s)]);this._simulateEvent(this.target,h,e.merge({touches:o,targetTouches:o,changedTouches:o},s))};for(s=0;s<d;s++)i.add({fn:y,args:[s],context:this});i.add({fn:function(){var t={pageX:n.end[0],pageY:n.end[1],clientX:n.end[0],clientY:n.end[1]},r=this._createTouchList([e.merge({identifier:g},t)]);this._simulateEvent(this.target,h,e.merge({touches:r,targetTouches:r,changedTouches:r},t))},timeout:0,context:this}),i.add({fn:function(){var t={pageX:n.end[0],pageY:n.end[1],clientX:n.end[0],clientY:n.end[1]},r=this._getEmptyTouchList(),i=this._createTouchList([e.merge({identifier:g},t)]);this._simulateEvent(this.target,p,e.merge({touches:r,targetTouches:r,changedTouches:i},t))},context:this}),t&&e.Lang.isFunction(t)&&i.add({fn:t,context:this.node}),i.run()},_getEmptyTouchList:function(){return o||(o=this._createTouchList([])),o},_createTouchList:function(n){var r=[],i,o=this;return!!n&&e.Lang.isArray(n)?e.UA.android&&e.UA.android>=4||e.UA.ios&&e.UA.ios>=2?(e.each(n,function(t){t.identifier||(t.identifier=0),t.pageX||(t.pageX=0),t.pageY||(t.pageY=0),t.screenX||(t.screenX=0),t.screenY||(t.screenY=0),r.push(s.createTouch(e.config.win,o.target,t.identifier,t.pageX,t.pageY,t.screenX,t.screenY))}),i=s.createTouchList.apply(s,r)):e.UA.ios&&e.UA.ios<2?e.error(t+": No touch event simulation framework present."):(i=[],e.each(n,function(e){e.identifier||(e.identifier=0),e.clientX||(e.clientX=0),e.clientY||(e.clientY=0),e.pageX||(e.pageX=0),e.pageY||(e.pageY=0),e.screenX||(e.screenX=0),e.screenY||(e.screenY=0),i.push({target:o.target,identifier:e.identifier,clientX:e.clientX,clientY:e.clientY,pageX:e.pageX,pageY:e.pageY,screenX:e.screenX,screenY:e.screenY})}),i.item=function(e){return i[e]}):e.error(t+": Invalid touchPoints passed"),i},_simulateEvent:function(t,r,s){var o;i[r]?n?e.Event.simulate(t,r,s):this._isSingleTouch(s.touches,s.targetTouches,s.changedTouches)?(r={touchstart:b,touchmove:y,touchend:g}[r],s.button=0,s.relatedTarget=null,o=r===g?s.changedTouches:s.touches,s=e.mix(s,{screenX:o.item(0).screenX,screenY:o.item(0).screenY,clientX:o.item(0).clientX,clientY:o.item(0).clientY},!0),e.Event.simulate(t,r,s),r==g&&e.Event.simulate(t,w,s)):e.error("_simulateEvent(): Event '"+r+"' has multi touch objects that can't be simulated in your platform."):e.Event.simulate(t,r,s)},_isSingleTouch:function(e,t,n){return e&&e.length<=1&&t&&t.length<=1&&n&&n.length<=1}},e.GestureSimulation=T,e.GestureSimulation.defaults=l,e.GestureSimulation.GESTURES=r,e.Event.simulateGesture=function(n,i,s,o){n=e.one(n);var u=new e.GestureSimulation(n);i=i.toLowerCase(),!o&&e.Lang.isFunction(s)&&(o=s,s={}),s=s||{};if(r[i])switch(i){case"tap":u.tap(o,s.point,s.times,s.hold,s.delay);break;case"doubletap":u.tap(o,s.point,2);break;case"press":e.Lang.isNumber(s.hold)?s.hold<l.MIN_HOLD_PRESS?s.hold=l.MIN_HOLD_PRESS:s.hold>l.MAX_HOLD_PRESS&&(s.hold=l.MAX_HOLD_PRESS):s.hold=l.HOLD_PRESS,u.tap(o,s.point,1,s.hold);break;case"move":u.move(o,s.path,s.duration);break;case"flick":u.flick(o,s.point,s.axis,s.distance,s.duration);break;case"pinch":u.pinch(o,s.center,s.r1,s.r2,s.duration,s.start,s.rotation);break;case"rotate":u.rotate(o,s.center,s.r1,s.r2,s.duration,s.start,s.rotation)}else e.error(t+": Not a supported gesture simulation: "+i)}},"3.15.0",{requires:["async-queue","event-simulate","node-screen"]});