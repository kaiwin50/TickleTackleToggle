"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[756],{8137:function(e,t,n){var r,i,s=n(4211);Object.defineProperty(t,"__esModule",{value:!0});var a=n(2893),o=n(4264),l=n(430),u=n(9989),c=n(5348);let h="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}d.UNAUTHENTICATED=new d(null),d.GOOGLE_CREDENTIALS=new d("google-credentials-uid"),d.FIRST_PARTY=new d("first-party-uid"),d.MOCK_USER=new d("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let f="9.18.0",m=new l.Logger("@firebase/firestore");function g(){return m.logLevel}function p(e,...t){if(m.logLevel<=l.LogLevel.DEBUG){let n=t.map(v);m.debug(`Firestore (${f}): ${e}`,...n)}}function y(e,...t){if(m.logLevel<=l.LogLevel.ERROR){let n=t.map(v);m.error(`Firestore (${f}): ${e}`,...n)}}function w(e,...t){if(m.logLevel<=l.LogLevel.WARN){let n=t.map(v);m.warn(`Firestore (${f}): ${e}`,...n)}}function v(e){if("string"==typeof e)return e;try{return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I(e="Unexpected state"){let t=`FIRESTORE (${f}) INTERNAL ASSERTION FAILED: `+e;throw y(t),Error(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let T={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class E extends u.FirebaseError{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class x{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(d.UNAUTHENTICATED))}shutdown(){}}class _{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class D{constructor(e){this.t=e,this.currentUser=d.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let n=this.i,r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve(),i=new b;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new b,e.enqueueRetryable(()=>r(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},a=e=>{p("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),s()};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(p("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new b)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(p("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?("string"==typeof t.accessToken||I(),new S(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return null===e||"string"==typeof e||I(),new d(e)}}class A{constructor(e,t,n,r){this.h=e,this.l=t,this.m=n,this.g=r,this.type="FirstParty",this.user=d.FIRST_PARTY,this.p=new Map}I(){return this.g?this.g():("object"==typeof this.h&&null!==this.h&&this.h.auth&&this.h.auth.getAuthHeaderValueForFirstParty||I(),this.h.auth.getAuthHeaderValueForFirstParty([]))}get headers(){this.p.set("X-Goog-AuthUser",this.l);let e=this.I();return e&&this.p.set("Authorization",e),this.m&&this.p.set("X-Goog-Iam-Authorization-Token",this.m),this.p}}class N{constructor(e,t,n,r){this.h=e,this.l=t,this.m=n,this.g=r}getToken(){return Promise.resolve(new A(this.h,this.l,this.m,this.g))}start(e,t){e.enqueueRetryable(()=>t(d.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class C{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class k{constructor(e){this.T=e,this.forceRefresh=!1,this.appCheck=null,this.A=null}start(e,t){let n=e=>{null!=e.error&&p("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let n=e.token!==this.A;return this.A=e.token,p("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};let r=e=>{p("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.T.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){let e=this.T.getImmediate({optional:!0});e?r(e):p("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?("string"==typeof e.token||I(),this.A=e.token,new C(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{static R(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,n="";for(;n.length<20;){let r=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%e.length))}return n}}function M(e,t){return e<t?-1:e>t?1:0}function R(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new E(T.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new E(T.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return L.fromMillis(Date.now())}static fromDate(e){return L.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new L(t,Math.floor(1e6*(e-1e3*t)))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?M(this.nanoseconds,e.nanoseconds):M(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.timestamp=e}static fromTimestamp(e){return new V(e)}static min(){return new V(new L(0,0))}static max(){return new V(new L(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e,t,n){void 0===t?t=0:t>e.length&&I(),void 0===n?n=e.length-t:n>e.length-t&&I(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===O.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof O?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let n=Math.min(e.length,t.length);for(let r=0;r<n;r++){let n=e.get(r),i=t.get(r);if(n<i)return -1;if(n>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class P extends O{construct(e,t,n){return new P(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){let t=[];for(let n of e){if(n.indexOf("//")>=0)throw new E(T.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new P(t)}static emptyPath(){return new P([])}}let q=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class U extends O{construct(e,t,n){return new U(e,t,n)}static isValidIdentifier(e){return q.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),U.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new U(["__name__"])}static fromServerFormat(e){let t=[],n="",r=0,i=()=>{if(0===n.length)throw new E(T.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""},s=!1;for(;r<e.length;){let t=e[r];if("\\"===t){if(r+1===e.length)throw new E(T.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new E(T.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(s=!s,r++):"."!==t||s?(n+=t,r++):(i(),r++)}if(i(),s)throw new E(T.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new U(t)}static emptyPath(){return new U([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e){this.path=e}static fromPath(e){return new B(P.fromString(e))}static fromName(e){return new B(P.fromString(e).popFirst(5))}static empty(){return new B(P.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===P.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return P.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new B(new P(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function G(e){return e.fields.find(e=>2===e.kind)}function $(e){return e.fields.filter(e=>2!==e.kind)}function Q(e,t){let n=M(e.collectionGroup,t.collectionGroup);if(0!==n)return n;for(let r=0;r<Math.min(e.fields.length,t.fields.length);++r)if(0!==(n=function(e,t){let n=U.comparator(e.fieldPath,t.fieldPath);return 0!==n?n:M(e.kind,t.kind)}(e.fields[r],t.fields[r])))return n;return M(e.fields.length,t.fields.length)}K.UNKNOWN_ID=-1;class z{constructor(e,t){this.fieldPath=e,this.kind=t}}class j{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new j(0,X.min())}}function W(e,t){let n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=V.fromTimestamp(1e9===r?new L(n+1,0):new L(n,r));return new X(i,B.empty(),t)}function H(e){return new X(e.readTime,e.key,-1)}class X{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new X(V.min(),B.empty(),-1)}static max(){return new X(V.max(),B.empty(),-1)}}function Y(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:0!==(n=B.comparator(e.documentKey,t.documentKey))?n:M(e.largestBatchId,t.largestBatchId)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let J="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Z{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ee(e){if(e.code!==T.FAILED_PRECONDITION||e.message!==J)throw e;p("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&I(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new et((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof et?t:et.resolve(t)}catch(e){return et.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):et.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):et.reject(t)}static resolve(e){return new et((t,n)=>{t(e)})}static reject(e){return new et((t,n)=>{n(e)})}static waitFor(e){return new et((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=et.resolve(!1);for(let n of e)t=t.next(e=>e?et.resolve(e):n());return t}static forEach(e,t){let n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new et((n,r)=>{let i=e.length,s=Array(i),a=0;for(let o=0;o<i;o++){let l=o;t(e[l]).next(e=>{s[l]=e,++a===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new et((n,r)=>{let i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.P=new b,this.transaction.oncomplete=()=>{this.P.resolve()},this.transaction.onabort=()=>{t.error?this.P.reject(new es(e,t.error)):this.P.resolve()},this.transaction.onerror=t=>{let n=ec(t.target.error);this.P.reject(new es(e,n))}}static open(e,t,n,r){try{return new en(t,e.transaction(r,n))}catch(e){throw new es(t,e)}}get v(){return this.P.promise}abort(e){e&&this.P.reject(e),this.aborted||(p("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}V(){let e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){let t=this.transaction.objectStore(e);return new eo(t)}}class er{constructor(e,t,n){this.name=e,this.version=t,this.S=n,12.2===er.D(u.getUA())&&y("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return p("SimpleDb","Removing database:",e),el(window.indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!u.isIndexedDBAvailable())return!1;if(er.N())return!0;let e=u.getUA(),t=er.D(e),n=er.k(e);return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||0<t&&t<10||0<n&&n<4.5)}static N(){var e;return void 0!==s&&"YES"===(null===(e=s.env)||void 0===e?void 0:e.$)}static M(e,t){return e.store(t)}static D(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}static k(e){let t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}async O(e){return this.db||(p("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,n)=>{let r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{let n=e.target.result;t(n)},r.onblocked=()=>{n(new es(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{let r=t.target.error;"VersionError"===r.name?n(new E(T.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new E(T.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new es(e,r))},r.onupgradeneeded=e=>{p("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);let t=e.target.result;this.S.F(t,r.transaction,e.oldVersion,this.version).next(()=>{p("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.B&&(this.db.onversionchange=e=>this.B(e)),this.db}L(e){this.B=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){let i="readonly"===t,s=0;for(;;){++s;try{this.db=await this.O(e);let t=en.open(this.db,e,i?"readonly":"readwrite",n),s=r(t).next(e=>(t.V(),e)).catch(e=>(t.abort(e),et.reject(e))).toPromise();return s.catch(()=>{}),await t.v,s}catch(t){let e="FirebaseError"!==t.name&&s<3;if(p("SimpleDb","Transaction failed with error:",t.message,"Retrying:",e),this.close(),!e)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}class ei{constructor(e){this.q=e,this.U=!1,this.K=null}get isDone(){return this.U}get G(){return this.K}set cursor(e){this.q=e}done(){this.U=!0}j(e){this.K=e}delete(){return el(this.q.delete())}}class es extends E{constructor(e,t){super(T.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function ea(e){return"IndexedDbTransactionError"===e.name}class eo{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(p("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(p("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),el(n)}add(e){return p("SimpleDb","ADD",this.store.name,e,e),el(this.store.add(e))}get(e){return el(this.store.get(e)).next(t=>(void 0===t&&(t=null),p("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return p("SimpleDb","DELETE",this.store.name,e),el(this.store.delete(e))}count(){return p("SimpleDb","COUNT",this.store.name),el(this.store.count())}W(e,t){let n=this.options(e,t);if(n.index||"function"!=typeof this.store.getAll){let e=this.cursor(n),t=[];return this.H(e,(e,n)=>{t.push(n)}).next(()=>t)}{let e=this.store.getAll(n.range);return new et((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}}J(e,t){let n=this.store.getAll(e,null===t?void 0:t);return new et((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}Y(e,t){p("SimpleDb","DELETE ALL",this.store.name);let n=this.options(e,t);n.Z=!1;let r=this.cursor(n);return this.H(r,(e,t,n)=>n.delete())}X(e,t){let n;t?n=e:(n={},t=e);let r=this.cursor(n);return this.H(r,t)}tt(e){let t=this.cursor({});return new et((n,r)=>{t.onerror=e=>{let t=ec(e.target.error);r(t)},t.onsuccess=t=>{let r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}H(e,t){let n=[];return new et((r,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{let i=e.target.result;if(!i)return void r();let s=new ei(i),a=t(i.primaryKey,i.value,s);if(a instanceof et){let e=a.catch(e=>(s.done(),et.reject(e)));n.push(e)}s.isDone?r():null===s.G?i.continue():i.continue(s.G)}}).next(()=>et.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let n=this.store.index(e.index);return e.Z?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function el(e){return new et((t,n)=>{e.onsuccess=e=>{let n=e.target.result;t(n)},e.onerror=e=>{let t=ec(e.target.error);n(t)}})}let eu=!1;function ec(e){let t=er.D(u.getUA());if(t>=12.2&&t<13){let t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){let e=new E("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return eu||(eu=!0,setTimeout(()=>{throw e},0)),e}}return e}class eh{constructor(e,t){this.asyncQueue=e,this.et=t,this.task=null}start(){this.nt(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}nt(e){p("IndexBackiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{p("IndexBackiller",`Documents written: ${await this.et.st()}`)}catch(e){ea(e)?p("IndexBackiller","Ignoring IndexedDB error during index backfill: ",e):await ee(e)}await this.nt(6e4)})}}class ed{constructor(e,t){this.localStore=e,this.persistence=t}async st(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.it(t,e))}it(e,t){let n=new Set,r=t,i=!0;return et.doWhile(()=>!0===i&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return p("IndexBackiller",`Processing collection: ${t}`),this.rt(e,t,r).next(e=>{r-=e,n.add(t)});i=!1})).next(()=>t-r)}rt(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{let i=n.changes;return this.localStore.indexManager.updateIndexEntries(e,i).next(()=>this.ot(r,n)).next(n=>(p("IndexBackiller",`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>i.size)}))}ot(e,t){let n=e;return t.changes.forEach((e,t)=>{let r=H(t);Y(r,n)>0&&(n=r)}),new X(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ut(e),this.ct=e=>t.writeSequenceNumber(e))}ut(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ct&&this.ct(e),e}}ef.at=-1;/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let em=/^[_a-zA-Z][_a-zA-Z0-9]*(?:\.[_a-zA-Z][_a-zA-Z0-9]*)*$/;class eg{constructor(e){this.alias=e}static ht(e){return em.test(e)}canonicalString(){let e=this.alias.replace(/\\/g,"\\\\").replace(/`/g,"\\`");return eg.ht(e)||(e="`"+e+"`"),e}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,t,n){this.alias=e,this.lt=t,this.fieldPath=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e,t,n,r,i,s,a,o){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.useFetchStreams=o}}class ew{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ew("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof ew&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ev(e){let t=0;for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function eI(e,t){for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function eT(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eE(e){return null==e}function eb(e){return 0===e&&1/e==-1/0}function eS(e){return"number"==typeof e&&Number.isInteger(e)&&!eb(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ex extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(e){try{return atob(e)}catch(e){throw e instanceof DOMException?new ex("Invalid base64 string: "+e):e}}(e);return new e_(t)}static fromUint8Array(e){let t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new e_(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return M(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}e_.EMPTY_BYTE_STRING=new e_("");let eD=RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function eA(e){if(e||I(),"string"==typeof e){let t=0,n=eD.exec(e);if(n||I(),n[1]){let e=n[1];t=Number(e=(e+"000000000").substr(0,9))}let r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:eN(e.seconds),nanos:eN(e.nanos)}}function eN(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function eC(e){return"string"==typeof e?e_.fromBase64String(e):e_.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ek(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function eF(e){let t=eA(e.mapValue.fields.__local_write_time__.timestampValue);return new L(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eM={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},eR={nullValue:"NULL_VALUE"};function eL(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?ek(e)?4:eW(e)?9007199254740991:10:I()}function eV(e,t){if(e===t)return!0;let n=eL(e);if(n!==eL(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return eF(e).isEqual(eF(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let n=eA(e.timestampValue),r=eA(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return eC(e.bytesValue).isEqual(eC(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return eN(e.geoPointValue.latitude)===eN(t.geoPointValue.latitude)&&eN(e.geoPointValue.longitude)===eN(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return eN(e.integerValue)===eN(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let n=eN(e.doubleValue),r=eN(t.doubleValue);return n===r?eb(n)===eb(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return R(e.arrayValue.values||[],t.arrayValue.values||[],eV);case 10:return function(e,t){let n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(ev(n)!==ev(r))return!1;for(let e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!eV(n[e],r[e])))return!1;return!0}(e,t);default:return I()}}function eO(e,t){return void 0!==(e.values||[]).find(e=>eV(e,t))}function eP(e,t){if(e===t)return 0;let n=eL(e),r=eL(t);if(n!==r)return M(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return M(e.booleanValue,t.booleanValue);case 2:return function(e,t){let n=eN(e.integerValue||e.doubleValue),r=eN(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return eq(e.timestampValue,t.timestampValue);case 4:return eq(eF(e),eF(t));case 5:return M(e.stringValue,t.stringValue);case 6:return function(e,t){let n=eC(e),r=eC(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){let t=M(n[e],r[e]);if(0!==t)return t}return M(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let n=M(eN(e.latitude),eN(t.latitude));return 0!==n?n:M(eN(e.longitude),eN(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){let n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){let t=eP(n[e],r[e]);if(t)return t}return M(n.length,r.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===eM.mapValue&&t===eM.mapValue)return 0;if(e===eM.mapValue)return 1;if(t===eM.mapValue)return -1;let n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let e=0;e<r.length&&e<s.length;++e){let t=M(r[e],s[e]);if(0!==t)return t;let a=eP(n[r[e]],i[s[e]]);if(0!==a)return a}return M(r.length,s.length)}(e.mapValue,t.mapValue);default:throw I()}}function eq(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return M(e,t);let n=eA(e),r=eA(t),i=M(n.seconds,r.seconds);return 0!==i?i:M(n.nanos,r.nanos)}function eU(e){var t,n;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=eA(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?eC(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,B.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",n=!0;for(let r of e.values||[])n?n=!1:t+=",",t+=eU(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),n="{",r=!0;for(let i of t)r?r=!1:n+=",",n+=`${i}:${eU(e.fields[i])}`;return n+"}"}(e.mapValue):I()}function eB(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function eK(e){return!!e&&"integerValue"in e}function eG(e){return!!e&&"arrayValue"in e}function e$(e){return!!e&&"nullValue"in e}function eQ(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function ez(e){return!!e&&"mapValue"in e}function ej(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return eI(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=ej(n)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=ej(e.arrayValue.values[n]);return t}return Object.assign({},e)}function eW(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}function eH(e,t){let n=eP(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function eX(e,t){let n=eP(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eY{constructor(e,t){this.position=e,this.inclusive=t}}function eJ(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){let s=t[i],a=e.position[i];if(r=s.field.isKeyField()?B.comparator(B.fromName(a.referenceValue),n.key):eP(a,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function eZ(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!eV(e.position[n],t.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e0{}class e1 extends e0{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new e9(e,t,n):"array-contains"===t?new tn(e,n):"in"===t?new tr(e,n):"not-in"===t?new ti(e,n):"array-contains-any"===t?new ts(e,n):new e1(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new e7(e,n):new te(e,n)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(eP(t,this.value)):null!==t&&eL(this.value)===eL(t)&&this.matchesComparison(eP(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return I()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class e2 extends e0{constructor(e,t){super(),this.filters=e,this.op=t,this.ft=null}static create(e,t){return new e2(e,t)}matches(e){return e5(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.ft||(this.ft=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ft}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){let e=this.dt(e=>e.isInequality());return null!==e?e.field:null}dt(e){for(let t of this.getFlattenedFilters())if(e(t))return t;return null}}function e5(e){return"and"===e.op}function e4(e){return"or"===e.op}function e3(e){return e8(e)&&e5(e)}function e8(e){for(let t of e.filters)if(t instanceof e2)return!1;return!0}function e6(e,t){let n=e.filters.concat(t);return e2.create(n,e.op)}class e9 extends e1{constructor(e,t,n){super(e,t,n),this.key=B.fromName(n.referenceValue)}matches(e){let t=B.comparator(e.key,this.key);return this.matchesComparison(t)}}class e7 extends e1{constructor(e,t){super(e,"in",t),this.keys=tt("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class te extends e1{constructor(e,t){super(e,"not-in",t),this.keys=tt("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function tt(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map(e=>B.fromName(e.referenceValue))}class tn extends e1{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return eG(t)&&eO(t.arrayValue,this.value)}}class tr extends e1{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&eO(this.value.arrayValue,t)}}class ti extends e1{constructor(e,t){super(e,"not-in",t)}matches(e){if(eO(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&!eO(this.value.arrayValue,t)}}class ts extends e1{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!eG(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>eO(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,t){this.comparator=e,this.root=t||tu.EMPTY}insert(e,t){return new to(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,tu.BLACK,null,null))}remove(e){return new to(this.comparator,this.root.remove(e,this.comparator).copy(null,null,tu.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){let e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new tl(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new tl(this.root,e,this.comparator,!1)}getReverseIterator(){return new tl(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new tl(this.root,e,this.comparator,!0)}}class tl{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class tu{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:tu.RED,this.left=null!=r?r:tu.EMPTY,this.right=null!=i?i:tu.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new tu(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this,i=n(e,r.key);return(r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n))).fixUp()}removeMin(){if(this.left.isEmpty())return tu.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let n,r=this;if(0>t(e,r.key))r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return tu.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,tu.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,tu.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw I();let e=this.left.check();if(e!==this.right.check())throw I();return e+(this.isRed()?0:1)}}tu.EMPTY=null,tu.RED=!0,tu.BLACK=!1,tu.EMPTY=new class{constructor(){this.size=0}get key(){throw I()}get value(){throw I()}get color(){throw I()}get left(){throw I()}get right(){throw I()}copy(e,t,n,r,i){return this}insert(e,t,n){return new tu(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e){this.comparator=e,this.data=new to(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new th(this.data.getIterator())}getIteratorFrom(e){return new th(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof tc)||this.size!==e.size)return!1;let t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new tc(this.comparator);return t.data=e,t}}class th{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function td(e){return e.hasNext()?e.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(e){this.fields=e,e.sort(U.comparator)}static empty(){return new tf([])}unionWith(e){let t=new tc(U.comparator);for(let e of this.fields)t=t.add(e);for(let n of e)t=t.add(n);return new tf(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return R(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e){this.value=e}static empty(){return new tm({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(!ez(t=(t.mapValue.fields||{})[e.get(n)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ej(t)}setAll(e){let t=U.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=ej(e):r.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){let t=this.field(e.popLast());ez(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return eV(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];ez(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){for(let r of(eI(t,(t,n)=>e[t]=n),n))delete e[r]}clone(){return new tm(ej(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(e,t,n,r,i,s,a){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=a}static newInvalidDocument(e){return new tg(e,0,V.min(),V.min(),V.min(),tm.empty(),0)}static newFoundDocument(e,t,n,r){return new tg(e,1,t,V.min(),n,r,0)}static newNoDocument(e,t){return new tg(e,2,t,V.min(),V.min(),tm.empty(),0)}static newUnknownDocument(e,t){return new tg(e,3,t,V.min(),V.min(),tm.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(V.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tm.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tm.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=V.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof tg&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new tg(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(e,t=null,n=[],r=[],i=null,s=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=a,this._t=null}}function ty(e,t=null,n=[],r=[],i=null,s=null,a=null){return new tp(e,t,n,r,i,s,a)}function tw(e){let t=e;if(null===t._t){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:"+t.filters.map(e=>(function e(t){if(t instanceof e1)return t.field.canonicalString()+t.op.toString()+eU(t.value);if(e3(t))return t.filters.map(t=>e(t)).join(",");{let n=t.filters.map(t=>e(t)).join(",");return`${t.op}(${n})`}})(e)).join(",")+"|ob:"+t.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),eE(t.limit)||(e+="|l:"+t.limit),t.startAt&&(e+="|lb:"+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>eU(e)).join(",")),t.endAt&&(e+="|ub:"+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>eU(e)).join(",")),t._t=e}return t._t}function tv(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var n,r;if(n=e.orderBy[i],r=t.orderBy[i],!(n.dir===r.dir&&n.field.isEqual(r.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!function e(t,n){return t instanceof e1?n instanceof e1&&t.op===n.op&&t.field.isEqual(n.field)&&eV(t.value,n.value):t instanceof e2?n instanceof e2&&t.op===n.op&&t.filters.length===n.filters.length&&t.filters.reduce((t,r,i)=>t&&e(r,n.filters[i]),!0):void I()}(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!eZ(e.startAt,t.startAt)&&eZ(e.endAt,t.endAt)}function tI(e){return B.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function tT(e,t){return e.filters.filter(e=>e instanceof e1&&e.field.isEqual(t))}function tE(e,t,n){let r=eR,i=!0;for(let n of tT(e,t)){let e=eR,t=!0;switch(n.op){case"<":case"<=":var s;e="nullValue"in(s=n.value)?eR:"booleanValue"in s?{booleanValue:!1}:"integerValue"in s||"doubleValue"in s?{doubleValue:NaN}:"timestampValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in s?{stringValue:""}:"bytesValue"in s?{bytesValue:""}:"referenceValue"in s?eB(ew.empty(),B.empty()):"geoPointValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in s?{arrayValue:{}}:"mapValue"in s?{mapValue:{}}:I();break;case"==":case"in":case">=":e=n.value;break;case">":e=n.value,t=!1;break;case"!=":case"not-in":e=eR}0>eH({value:r,inclusive:i},{value:e,inclusive:t})&&(r=e,i=t)}if(null!==n){for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){let e=n.position[s];0>eH({value:r,inclusive:i},{value:e,inclusive:n.inclusive})&&(r=e,i=n.inclusive);break}}return{value:r,inclusive:i}}function tb(e,t,n){let r=eM,i=!0;for(let n of tT(e,t)){let e=eM,t=!0;switch(n.op){case">=":case">":var s;e="nullValue"in(s=n.value)?{booleanValue:!1}:"booleanValue"in s?{doubleValue:NaN}:"integerValue"in s||"doubleValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in s?{stringValue:""}:"stringValue"in s?{bytesValue:""}:"bytesValue"in s?eB(ew.empty(),B.empty()):"referenceValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in s?{arrayValue:{}}:"arrayValue"in s?{mapValue:{}}:"mapValue"in s?eM:I(),t=!1;break;case"==":case"in":case"<=":e=n.value;break;case"<":e=n.value,t=!1;break;case"!=":case"not-in":e=eM}eX({value:r,inclusive:i},{value:e,inclusive:t})>0&&(r=e,i=t)}if(null!==n){for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){let e=n.position[s];eX({value:r,inclusive:i},{value:e,inclusive:n.inclusive})>0&&(r=e,i=n.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e,t=null,n=[],r=[],i=null,s="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.wt=null,this.gt=null,this.startAt,this.endAt}}function tx(e){return new tS(e)}function t_(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function tD(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function tA(e){for(let t of e.filters){let e=t.getFirstInequalityField();if(null!==e)return e}return null}function tN(e){return null!==e.collectionGroup}function tC(e){let t=e;if(null===t.wt){t.wt=[];let e=tA(t),n=tD(t);if(null!==e&&null===n)e.isKeyField()||t.wt.push(new ta(e)),t.wt.push(new ta(U.keyField(),"asc"));else{let e=!1;for(let n of t.explicitOrderBy)t.wt.push(n),n.field.isKeyField()&&(e=!0);if(!e){let e=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t.wt.push(new ta(U.keyField(),e))}}}return t.wt}function tk(e){let t=e;if(!t.gt){if("F"===t.limitType)t.gt=ty(t.path,t.collectionGroup,tC(t),t.filters,t.limit,t.startAt,t.endAt);else{let e=[];for(let n of tC(t)){let t="desc"===n.dir?"asc":"desc";e.push(new ta(n.field,t))}let n=t.endAt?new eY(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new eY(t.startAt.position,t.startAt.inclusive):null;t.gt=ty(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}return t.gt}function tF(e,t){t.getFirstInequalityField(),tA(e);let n=e.filters.concat([t]);return new tS(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function tM(e,t,n){return new tS(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function tR(e,t){return tv(tk(e),tk(t))&&e.limitType===t.limitType}function tL(e){return`${tw(tk(e))}|lt:${e.limitType}`}function tV(e){var t;let n;return`Query(target=${n=(t=tk(e)).path.canonicalString(),null!==t.collectionGroup&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof e1?`${t.field.canonicalString()} ${t.op} ${eU(t.value)}`:t instanceof e2?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),eE(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(n+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>eU(e)).join(",")),t.endAt&&(n+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>eU(e)).join(",")),`Target(${n})`}; limitType=${e.limitType})`}function tO(e,t){return t.isFoundDocument()&&function(e,t){let n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):B.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(let n of tC(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(let n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,n){let r=eJ(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,tC(e),t))&&(!e.endAt||!!function(e,t,n){let r=eJ(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,tC(e),t))}function tP(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function tq(e){return(t,n)=>{let r=!1;for(let i of tC(e)){let e=function(e,t,n){let r=e.field.isKeyField()?B.comparator(t.key,n.key):function(e,t,n){let r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?eP(r,i):I()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return -1*r;default:return I()}}(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tU(e,t){if(e.yt){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:eb(t)?"-0":t}}function tB(e){return{integerValue:""+e}}function tK(e,t){return eS(t)?tB(t):tU(e,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tG{constructor(){this._=void 0}}function t$(e,t){return e instanceof tX?eK(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class tQ extends tG{}class tz extends tG{constructor(e){super(),this.elements=e}}function tj(e,t){let n=tJ(t);for(let t of e.elements)n.some(e=>eV(e,t))||n.push(t);return{arrayValue:{values:n}}}class tW extends tG{constructor(e){super(),this.elements=e}}function tH(e,t){let n=tJ(t);for(let t of e.elements)n=n.filter(e=>!eV(e,t));return{arrayValue:{values:n}}}class tX extends tG{constructor(e,t){super(),this.Tt=e,this.It=t}}function tY(e){return eN(e.integerValue||e.doubleValue)}function tJ(e){return eG(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tZ{constructor(e,t){this.field=e,this.transform=t}}class t0{constructor(e,t){this.version=e,this.transformResults=t}}class t1{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new t1}static exists(e){return new t1(void 0,e)}static updateTime(e){return new t1(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function t2(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class t5{}function t4(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new nn(e.key,t1.none()):new t6(e.key,e.data,t1.none());{let n=e.data,r=tm.empty(),i=new tc(U.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new t9(e.key,r,new tf(i.toArray()),t1.none())}}function t3(e,t,n,r){return e instanceof t6?function(e,t,n,r){if(!t2(e.precondition,t))return n;let i=e.value.clone(),s=nt(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof t9?function(e,t,n,r){if(!t2(e.precondition,t))return n;let i=nt(e.fieldTransforms,r,t),s=t.data;return(s.setAll(t7(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n)?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):t2(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}function t8(e,t){var n,r;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||!(!n||!r)&&R(n,r,(e,t)=>{var n,r;return e.field.isEqual(t.field)&&(n=e.transform,r=t.transform,n instanceof tz&&r instanceof tz||n instanceof tW&&r instanceof tW?R(n.elements,r.elements,eV):n instanceof tX&&r instanceof tX?eV(n.It,r.It):n instanceof tQ&&r instanceof tQ)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class t6 extends t5{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class t9 extends t5{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function t7(e){let t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){let r=e.data.field(n);t.set(n,r)}}),t}function ne(e,t,n){var r;let i=new Map;e.length===n.length||I();for(let s=0;s<n.length;s++){let a=e[s],o=a.transform,l=t.data.field(a.field);i.set(a.field,(r=n[s],o instanceof tz?tj(o,l):o instanceof tW?tH(o,l):r))}return i}function nt(e,t,n){let r=new Map;for(let i of e){let e=i.transform,s=n.data.field(i.field);r.set(i.field,e instanceof tQ?function(e,t){let n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&(n.fields.__previous_value__=t),{mapValue:n}}(t,s):e instanceof tz?tj(e,s):e instanceof tW?tH(e,s):function(e,t){let n=t$(e,t),r=tY(n)+tY(e.It);return eK(n)&&eK(e.It)?tB(r):tU(e.Tt,r)}(e,s))}return r}class nn extends t5{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class nr extends t5{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e){this.count=e}}function ns(e){switch(e){default:return I();case T.CANCELLED:case T.UNKNOWN:case T.DEADLINE_EXCEEDED:case T.RESOURCE_EXHAUSTED:case T.INTERNAL:case T.UNAVAILABLE:case T.UNAUTHENTICATED:return!1;case T.INVALID_ARGUMENT:case T.NOT_FOUND:case T.ALREADY_EXISTS:case T.PERMISSION_DENIED:case T.FAILED_PRECONDITION:case T.ABORTED:case T.OUT_OF_RANGE:case T.UNIMPLEMENTED:case T.DATA_LOSS:return!0}}function na(e){if(void 0===e)return y("GRPC error has no .code"),T.UNKNOWN;switch(e){case r.OK:return T.OK;case r.CANCELLED:return T.CANCELLED;case r.UNKNOWN:return T.UNKNOWN;case r.DEADLINE_EXCEEDED:return T.DEADLINE_EXCEEDED;case r.RESOURCE_EXHAUSTED:return T.RESOURCE_EXHAUSTED;case r.INTERNAL:return T.INTERNAL;case r.UNAVAILABLE:return T.UNAVAILABLE;case r.UNAUTHENTICATED:return T.UNAUTHENTICATED;case r.INVALID_ARGUMENT:return T.INVALID_ARGUMENT;case r.NOT_FOUND:return T.NOT_FOUND;case r.ALREADY_EXISTS:return T.ALREADY_EXISTS;case r.PERMISSION_DENIED:return T.PERMISSION_DENIED;case r.FAILED_PRECONDITION:return T.FAILED_PRECONDITION;case r.ABORTED:return T.ABORTED;case r.OUT_OF_RANGE:return T.OUT_OF_RANGE;case r.UNIMPLEMENTED:return T.UNIMPLEMENTED;case r.DATA_LOSS:return T.DATA_LOSS;default:return I()}}(i=r||(r={}))[i.OK=0]="OK",i[i.CANCELLED=1]="CANCELLED",i[i.UNKNOWN=2]="UNKNOWN",i[i.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",i[i.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",i[i.NOT_FOUND=5]="NOT_FOUND",i[i.ALREADY_EXISTS=6]="ALREADY_EXISTS",i[i.PERMISSION_DENIED=7]="PERMISSION_DENIED",i[i.UNAUTHENTICATED=16]="UNAUTHENTICATED",i[i.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",i[i.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",i[i.ABORTED=10]="ABORTED",i[i.OUT_OF_RANGE=11]="OUT_OF_RANGE",i[i.UNIMPLEMENTED=12]="UNIMPLEMENTED",i[i.INTERNAL=13]="INTERNAL",i[i.UNAVAILABLE=14]="UNAVAILABLE",i[i.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n){for(let[t,r]of n)if(this.equalsFn(t,e))return r}}has(e){return void 0!==this.get(e)}set(e,t){let n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){eI(this.inner,(t,n)=>{for(let[t,r]of n)e(t,r)})}isEmpty(){return eT(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nl=new to(B.comparator),nu=new to(B.comparator);function nc(...e){let t=nu;for(let n of e)t=t.insert(n.key,n);return t}function nh(e){let t=nu;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function nd(){return new no(e=>e.toString(),(e,t)=>e.isEqual(t))}let nf=new to(B.comparator),nm=new tc(B.comparator);function ng(...e){let t=nm;for(let n of e)t=t.add(n);return t}let np=new tc(M);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){let r=new Map;return r.set(e,nw.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new ny(V.min(),r,np,nl,ng())}}class nw{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new nw(n,t,ng(),ng(),ng())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{constructor(e,t,n,r){this.Et=e,this.removedTargetIds=t,this.key=n,this.At=r}}class nI{constructor(e,t){this.targetId=e,this.Rt=t}}class nT{constructor(e,t,n=e_.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class nE{constructor(){this.Pt=0,this.vt=nx(),this.bt=e_.EMPTY_BYTE_STRING,this.Vt=!1,this.St=!0}get current(){return this.Vt}get resumeToken(){return this.bt}get Dt(){return 0!==this.Pt}get Ct(){return this.St}xt(e){e.approximateByteSize()>0&&(this.St=!0,this.bt=e)}Nt(){let e=ng(),t=ng(),n=ng();return this.vt.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:I()}}),new nw(this.bt,this.Vt,e,t,n)}kt(){this.St=!1,this.vt=nx()}$t(e,t){this.St=!0,this.vt=this.vt.insert(e,t)}Mt(e){this.St=!0,this.vt=this.vt.remove(e)}Ot(){this.Pt+=1}Ft(){this.Pt-=1}Bt(){this.St=!0,this.Vt=!0}}class nb{constructor(e){this.Lt=e,this.qt=new Map,this.Ut=nl,this.Kt=nS(),this.Gt=new tc(M)}Qt(e){for(let t of e.Et)e.At&&e.At.isFoundDocument()?this.jt(t,e.At):this.zt(t,e.key,e.At);for(let t of e.removedTargetIds)this.zt(t,e.key,e.At)}Wt(e){this.forEachTarget(e,t=>{let n=this.Ht(t);switch(e.state){case 0:this.Jt(t)&&n.xt(e.resumeToken);break;case 1:n.Ft(),n.Dt||n.kt(),n.xt(e.resumeToken);break;case 2:n.Ft(),n.Dt||this.removeTarget(t);break;case 3:this.Jt(t)&&(n.Bt(),n.xt(e.resumeToken));break;case 4:this.Jt(t)&&(this.Yt(t),n.xt(e.resumeToken));break;default:I()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qt.forEach((e,n)=>{this.Jt(n)&&t(n)})}Zt(e){let t=e.targetId,n=e.Rt.count,r=this.Xt(t);if(r){let e=r.target;if(tI(e)){if(0===n){let n=new B(e.path);this.zt(t,n,tg.newNoDocument(n,V.min()))}else 1===n||I()}else this.te(t)!==n&&(this.Yt(t),this.Gt=this.Gt.add(t))}}ee(e){let t=new Map;this.qt.forEach((n,r)=>{let i=this.Xt(r);if(i){if(n.current&&tI(i.target)){let t=new B(i.target.path);null!==this.Ut.get(t)||this.ne(r,t)||this.zt(r,t,tg.newNoDocument(t,e))}n.Ct&&(t.set(r,n.Nt()),n.kt())}});let n=ng();this.Kt.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{let t=this.Xt(e);return!t||2===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.Ut.forEach((t,n)=>n.setReadTime(e));let r=new ny(e,t,this.Gt,this.Ut,n);return this.Ut=nl,this.Kt=nS(),this.Gt=new tc(M),r}jt(e,t){if(!this.Jt(e))return;let n=this.ne(e,t.key)?2:0;this.Ht(e).$t(t.key,n),this.Ut=this.Ut.insert(t.key,t),this.Kt=this.Kt.insert(t.key,this.se(t.key).add(e))}zt(e,t,n){if(!this.Jt(e))return;let r=this.Ht(e);this.ne(e,t)?r.$t(t,1):r.Mt(t),this.Kt=this.Kt.insert(t,this.se(t).delete(e)),n&&(this.Ut=this.Ut.insert(t,n))}removeTarget(e){this.qt.delete(e)}te(e){let t=this.Ht(e).Nt();return this.Lt.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ot(e){this.Ht(e).Ot()}Ht(e){let t=this.qt.get(e);return t||(t=new nE,this.qt.set(e,t)),t}se(e){let t=this.Kt.get(e);return t||(t=new tc(M),this.Kt=this.Kt.insert(e,t)),t}Jt(e){let t=null!==this.Xt(e);return t||p("WatchChangeAggregator","Detected inactive target",e),t}Xt(e){let t=this.qt.get(e);return t&&t.Dt?null:this.Lt.ie(e)}Yt(e){this.qt.set(e,new nE),this.Lt.getRemoteKeysForTarget(e).forEach(t=>{this.zt(e,t,null)})}ne(e,t){return this.Lt.getRemoteKeysForTarget(e).has(t)}}function nS(){return new to(B.comparator)}function nx(){return new to(B.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let n_={asc:"ASCENDING",desc:"DESCENDING"},nD={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},nA={and:"AND",or:"OR"};class nN{constructor(e,t){this.databaseId=e,this.yt=t}}function nC(e,t){return e.yt?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function nk(e,t){return e.yt?t.toBase64():t.toUint8Array()}function nF(e){return e||I(),V.fromTimestamp(function(e){let t=eA(e);return new L(t.seconds,t.nanos)}(e))}function nM(e,t){return new P(["projects",e.projectId,"databases",e.database]).child("documents").child(t).canonicalString()}function nR(e){let t=P.fromString(e);return nX(t)||I(),t}function nL(e,t){return nM(e.databaseId,t.path)}function nV(e,t){let n=nR(t);if(n.get(1)!==e.databaseId.projectId)throw new E(T.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new E(T.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new B(nU(n))}function nO(e,t){return nM(e.databaseId,t)}function nP(e){let t=nR(e);return 4===t.length?P.emptyPath():nU(t)}function nq(e){return new P(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function nU(e){return e.length>4&&"documents"===e.get(4)||I(),e.popFirst(5)}function nB(e,t,n){return{name:nL(e,t),fields:n.value.mapValue.fields}}function nK(e,t,n){let r=nV(e,t.name),i=nF(t.updateTime),s=t.createTime?nF(t.createTime):V.min(),a=new tm({mapValue:{fields:t.fields}}),o=tg.newFoundDocument(r,i,s,a);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}function nG(e,t){var n;let r;if(t instanceof t6)r={update:nB(e,t.key,t.value)};else if(t instanceof nn)r={delete:nL(e,t.key)};else if(t instanceof t9)r={update:nB(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof nr))return I();r={verify:nL(e,t.key)}}return t.fieldTransforms.length>0&&(r.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let n=t.transform;if(n instanceof tQ)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof tz)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof tW)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof tX)return{fieldPath:t.field.canonicalString(),increment:n.It};throw I()})(0,e))),t.precondition.isNone||(r.currentDocument=void 0!==(n=t.precondition).updateTime?{updateTime:nC(e,n.updateTime.toTimestamp())}:void 0!==n.exists?{exists:n.exists}:I()),r}function n$(e,t){var n;let r=t.currentDocument?void 0!==(n=t.currentDocument).updateTime?t1.updateTime(nF(n.updateTime)):void 0!==n.exists?t1.exists(n.exists):t1.none():t1.none(),i=t.updateTransforms?t.updateTransforms.map(t=>(function(e,t){let n=null;if("setToServerValue"in t)"REQUEST_TIME"===t.setToServerValue||I(),n=new tQ;else if("appendMissingElements"in t){let e=t.appendMissingElements.values||[];n=new tz(e)}else if("removeAllFromArray"in t){let e=t.removeAllFromArray.values||[];n=new tW(e)}else"increment"in t?n=new tX(e,t.increment):I();let r=U.fromServerFormat(t.fieldPath);return new tZ(r,n)})(e,t)):[];if(t.update){t.update.name;let n=nV(e,t.update.name),s=new tm({mapValue:{fields:t.update.fields}});if(t.updateMask){let e=function(e){let t=e.fieldPaths||[];return new tf(t.map(e=>U.fromServerFormat(e)))}(t.updateMask);return new t9(n,s,e,r,i)}return new t6(n,s,r,i)}if(t.delete){let n=nV(e,t.delete);return new nn(n,r)}if(t.verify){let n=nV(e,t.verify);return new nr(n,r)}return I()}function nQ(e,t){return{documents:[nO(e,t.path)]}}function nz(e,t){var n,r,i;let s={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(s.parent=nO(e,a),s.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s.parent=nO(e,a.popLast()),s.structuredQuery.from=[{collectionId:a.lastSegment()}]);let o=function(e){if(0!==e.length)return function e(t){return t instanceof e1?function(e){if("=="===e.op){if(eQ(e.value))return{unaryFilter:{field:nW(e.field),op:"IS_NAN"}};if(e$(e.value))return{unaryFilter:{field:nW(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(eQ(e.value))return{unaryFilter:{field:nW(e.field),op:"IS_NOT_NAN"}};if(e$(e.value))return{unaryFilter:{field:nW(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:nW(e.field),op:nD[e.op],value:e.value}}}(t):t instanceof e2?function(t){let n=t.getFilters().map(t=>e(t));return 1===n.length?n[0]:{compositeFilter:{op:nA[t.op],filters:n}}}(t):I()}(e2.create(e,"and"))}(t.filters);o&&(s.structuredQuery.where=o);let l=function(e){if(0!==e.length)return e.map(e=>({field:nW(e.field),direction:n_[e.dir]}))}(t.orderBy);l&&(s.structuredQuery.orderBy=l);let u=(r=t.limit,e.yt||eE(r)?r:{value:r});return null!==u&&(s.structuredQuery.limit=u),t.startAt&&(s.structuredQuery.startAt={before:(n=t.startAt).inclusive,values:n.position}),t.endAt&&(s.structuredQuery.endAt={before:!(i=t.endAt).inclusive,values:i.position}),s}function nj(e){var t,n,r,i,s,a,o,l;let u,c=nP(e.parent),h=e.structuredQuery,d=h.from?h.from.length:0,f=null;if(d>0){1===d||I();let e=h.from[0];e.allDescendants?f=e.collectionId:c=c.child(e.collectionId)}let m=[];h.where&&(m=function(e){let t=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=nH(e.unaryFilter.field);return e1.create(t,"==",{doubleValue:NaN});case"IS_NULL":let n=nH(e.unaryFilter.field);return e1.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let r=nH(e.unaryFilter.field);return e1.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=nH(e.unaryFilter.field);return e1.create(i,"!=",{nullValue:"NULL_VALUE"});default:return I()}}(t):void 0!==t.fieldFilter?e1.create(nH(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return I()}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?e2.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return I()}}(t.compositeFilter.op)):I()}(e);return t instanceof e2&&e3(t)?t.getFilters():[t]}(h.where));let g=[];h.orderBy&&(g=h.orderBy.map(e=>new ta(nH(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let p=null;h.limit&&(p=eE(u="object"==typeof(t=h.limit)?t.value:t)?null:u);let y=null;h.startAt&&(y=function(e){let t=!!e.before,n=e.values||[];return new eY(n,t)}(h.startAt));let w=null;return h.endAt&&(w=function(e){let t=!e.before,n=e.values||[];return new eY(n,t)}(h.endAt)),n=c,r=f,i=g,s=m,a=p,o=y,l=w,new tS(n,r,i,s,a,"F",o,l)}function nW(e){return{fieldPath:e.canonicalString()}}function nH(e){return U.fromServerFormat(e.fieldPath)}function nX(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nY(e){var t,n;let r="";for(let t=0;t<e.length;t++)r.length>0&&(r+="\x01\x01"),r=function(e,t){let n=t,r=e.length;for(let t=0;t<r;t++){let r=e.charAt(t);switch(r){case"\x00":n+="\x01\x10";break;case"\x01":n+="\x01\x11";break;default:n+=r}}return n}(e.get(t),r);return r+"\x01\x01"}function nJ(e){let t=e.length;if(t>=2||I(),2===t)return"\x01"===e.charAt(0)&&"\x01"===e.charAt(1)||I(),P.emptyPath();let n=t-2,r=[],i="";for(let s=0;s<t;){let t=e.indexOf("\x01",s);switch((t<0||t>n)&&I(),e.charAt(t+1)){case"\x01":let a;let o=e.substring(s,t);0===i.length?a=o:(i+=o,a=i,i=""),r.push(a);break;case"\x10":i+=e.substring(s,t)+"\x00";break;case"\x11":i+=e.substring(s,t+1);break;default:I()}s=t+2}return new P(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nZ=["userId","batchId"],n0={},n1=["prefixPath","collectionGroup","readTime","documentId"],n2=["prefixPath","collectionGroup","documentId"],n5=["collectionGroup","readTime","prefixPath","documentId"],n4=["canonicalId","targetId"],n3=["targetId","path"],n8=["path","targetId"],n6=["collectionId","parent"],n9=["indexId","uid"],n7=["uid","sequenceNumber"],re=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],rt=["indexId","uid","orderedDocumentKey"],rn=["userId","collectionPath","documentId"],rr=["userId","collectionPath","largestBatchId"],ri=["userId","collectionGroup","largestBatchId"],rs=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],ra=[...rs,"documentOverlays"],ro=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],rl=[...ro,"indexConfiguration","indexState","indexEntries"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru extends Z{constructor(e,t){super(),this.re=e,this.currentSequenceNumber=t}}function rc(e,t){return er.M(e.re,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var r;r=n[t],i instanceof t6?function(e,t,n){let r=e.value.clone(),i=ne(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(i,e,r):i instanceof t9?function(e,t,n){if(!t2(e.precondition,t))return void t.convertToUnknownDocument(n.version);let r=ne(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(t7(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(i,e,r):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,r)}}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=t3(n,e,t,this.localWriteTime));for(let n of this.mutations)n.key.isEqual(e.key)&&(t=t3(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=nd();return this.mutations.forEach(r=>{let i=e.get(r.key),s=i.overlayedDocument,a=this.applyToLocalView(s,i.mutatedFields);a=t.has(r.key)?null:a;let o=t4(s,a);null!==o&&n.set(r.key,o),s.isValidDocument()||s.convertToNoDocument(V.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ng())}isEqual(e){return this.batchId===e.batchId&&R(this.mutations,e.mutations,(e,t)=>t8(e,t))&&R(this.baseMutations,e.baseMutations,(e,t)=>t8(e,t))}}class rd{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){e.mutations.length===n.length||I();let r=nf,i=e.mutations;for(let e=0;e<i.length;e++)r=r.insert(i[e].key,n[e].version);return new rd(e,t,n,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(e,t,n,r,i=V.min(),s=V.min(),a=e_.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=a}withSequenceNumber(e){return new rm(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new rm(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new rm(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg{constructor(e){this.oe=e}}function rp(e,t){let n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:ry(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument()){var i;r.document={name:nL(i=e.oe,t.key),fields:t.data.value.mapValue.fields,updateTime:nC(i,t.version.toTimestamp()),createTime:nC(i,t.createTime.toTimestamp())}}else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:rw(t.version)};else{if(!t.isUnknownDocument())return I();r.unknownDocument={path:n.path.toArray(),version:rw(t.version)}}return r}function ry(e){let t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function rw(e){let t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function rv(e){let t=new L(e.seconds,e.nanoseconds);return V.fromTimestamp(t)}function rI(e,t){let n=(t.baseMutations||[]).map(t=>n$(e.oe,t));for(let e=0;e<t.mutations.length-1;++e){let n=t.mutations[e];if(e+1<t.mutations.length&&void 0!==t.mutations[e+1].transform){let r=t.mutations[e+1];n.updateTransforms=r.transform.fieldTransforms,t.mutations.splice(e+1,1),++e}}let r=t.mutations.map(t=>n$(e.oe,t)),i=L.fromMillis(t.localWriteTimeMs);return new rh(t.batchId,i,n,r)}function rT(e){var t;let n;let r=rv(e.readTime),i=void 0!==e.lastLimboFreeSnapshotVersion?rv(e.lastLimboFreeSnapshotVersion):V.min();return void 0!==e.query.documents?(1===(t=e.query).documents.length||I(),n=tk(tx(nP(t.documents[0])))):n=tk(nj(e.query)),new rm(n,e.targetId,0,e.lastListenSequenceNumber,r,i,e_.fromBase64String(e.resumeToken))}function rE(e,t){let n;let r=rw(t.snapshotVersion),i=rw(t.lastLimboFreeSnapshotVersion);n=tI(t.target)?nQ(e.oe,t.target):nz(e.oe,t.target);let s=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:tw(t.target),readTime:r,resumeToken:s,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:i,query:n}}function rb(e){let t=nj({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?tM(t,t.limit,"L"):t}function rS(e,t){return new rf(t.largestBatchId,n$(e.oe,t.overlayMutation))}function rx(e,t){let n=t.path.lastSegment();return[e,nY(t.path.popLast()),n]}function r_(e,t,n,r){return{indexId:e,uid:t.uid||"",sequenceNumber:n,readTime:rw(r.readTime),documentKey:nY(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rD{getBundleMetadata(e,t){return rA(e).get(t).next(e=>{if(e)return{id:e.bundleId,createTime:rv(e.createTime),version:e.version}})}saveBundleMetadata(e,t){return rA(e).put({bundleId:t.id,createTime:rw(nF(t.createTime)),version:t.version})}getNamedQuery(e,t){return rN(e).get(t).next(e=>{if(e)return{name:e.name,query:rb(e.bundledQuery),readTime:rv(e.readTime)}})}saveNamedQuery(e,t){return rN(e).put({name:t.name,readTime:rw(nF(t.readTime)),bundledQuery:t.bundledQuery})}}function rA(e){return rc(e,"bundles")}function rN(e){return rc(e,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rC{constructor(e,t){this.Tt=e,this.userId=t}static ue(e,t){let n=t.uid||"";return new rC(e,n)}getOverlay(e,t){return rk(e).get(rx(this.userId,t)).next(e=>e?rS(this.Tt,e):null)}getOverlays(e,t){let n=nd();return et.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){let r=[];return n.forEach((n,i)=>{let s=new rf(t,i);r.push(this.ce(e,s))}),et.waitFor(r)}removeOverlaysForBatchId(e,t,n){let r=new Set;t.forEach(e=>r.add(nY(e.getCollectionPath())));let i=[];return r.forEach(t=>{let r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);i.push(rk(e).Y("collectionPathOverlayIndex",r))}),et.waitFor(i)}getOverlaysForCollection(e,t,n){let r=nd(),i=nY(t),s=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return rk(e).W("collectionPathOverlayIndex",s).next(e=>{for(let t of e){let e=rS(this.Tt,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){let i;let s=nd(),a=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return rk(e).X({index:"collectionGroupOverlayIndex",range:a},(e,t,n)=>{let a=rS(this.Tt,t);s.size()<r||a.largestBatchId===i?(s.set(a.getKey(),a),i=a.largestBatchId):n.done()}).next(()=>s)}ce(e,t){return rk(e).put(function(e,t,n){let[r,i,s]=rx(t,n.mutation.key);return{userId:t,collectionPath:i,documentId:s,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:nG(e.oe,n.mutation)}}(this.Tt,this.userId,t))}}function rk(e){return rc(e,"documentOverlays")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rF{constructor(){}ae(e,t){this.he(e,t),t.le()}he(e,t){if("nullValue"in e)this.fe(t,5);else if("booleanValue"in e)this.fe(t,10),t.de(e.booleanValue?1:0);else if("integerValue"in e)this.fe(t,15),t.de(eN(e.integerValue));else if("doubleValue"in e){let n=eN(e.doubleValue);isNaN(n)?this.fe(t,13):(this.fe(t,15),eb(n)?t.de(0):t.de(n))}else if("timestampValue"in e){let n=e.timestampValue;this.fe(t,20),"string"==typeof n?t._e(n):(t._e(`${n.seconds||""}`),t.de(n.nanos||0))}else if("stringValue"in e)this.we(e.stringValue,t),this.me(t);else if("bytesValue"in e)this.fe(t,30),t.ge(eC(e.bytesValue)),this.me(t);else if("referenceValue"in e)this.ye(e.referenceValue,t);else if("geoPointValue"in e){let n=e.geoPointValue;this.fe(t,45),t.de(n.latitude||0),t.de(n.longitude||0)}else"mapValue"in e?eW(e)?this.fe(t,Number.MAX_SAFE_INTEGER):(this.pe(e.mapValue,t),this.me(t)):"arrayValue"in e?(this.Ie(e.arrayValue,t),this.me(t)):I()}we(e,t){this.fe(t,25),this.Te(e,t)}Te(e,t){t._e(e)}pe(e,t){let n=e.fields||{};for(let e of(this.fe(t,55),Object.keys(n)))this.we(e,t),this.he(n[e],t)}Ie(e,t){let n=e.values||[];for(let e of(this.fe(t,50),n))this.he(e,t)}ye(e,t){this.fe(t,37),B.fromName(e).path.forEach(e=>{this.fe(t,60),this.Te(e,t)})}fe(e,t){e.de(t)}me(e){e.de(2)}}function rM(e){let t=64-function(e){let t=0;for(let n=0;n<8;++n){let r=function(e){if(0===e)return 8;let t=0;return e>>4==0&&(t+=4,e<<=4),e>>6==0&&(t+=2,e<<=2),e>>7==0&&(t+=1),t}(255&e[n]);if(t+=r,8!==r)break}return t}(e);return Math.ceil(t/8)}rF.Ee=new rF;class rR{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ae(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.Re(n.value),n=t.next();this.Pe()}ve(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.be(n.value),n=t.next();this.Ve()}Se(e){for(let t of e){let e=t.charCodeAt(0);if(e<128)this.Re(e);else if(e<2048)this.Re(960|e>>>6),this.Re(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Re(480|e>>>12),this.Re(128|63&e>>>6),this.Re(128|63&e);else{let e=t.codePointAt(0);this.Re(240|e>>>18),this.Re(128|63&e>>>12),this.Re(128|63&e>>>6),this.Re(128|63&e)}}this.Pe()}De(e){for(let t of e){let e=t.charCodeAt(0);if(e<128)this.be(e);else if(e<2048)this.be(960|e>>>6),this.be(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.be(480|e>>>12),this.be(128|63&e>>>6),this.be(128|63&e);else{let e=t.codePointAt(0);this.be(240|e>>>18),this.be(128|63&e>>>12),this.be(128|63&e>>>6),this.be(128|63&e)}}this.Ve()}Ce(e){let t=this.xe(e),n=rM(t);this.Ne(1+n),this.buffer[this.position++]=255&n;for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=255&t[e]}ke(e){let t=this.xe(e),n=rM(t);this.Ne(1+n),this.buffer[this.position++]=~(255&n);for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=~(255&t[e])}$e(){this.Me(255),this.Me(255)}Oe(){this.Fe(255),this.Fe(255)}reset(){this.position=0}seed(e){this.Ne(e.length),this.buffer.set(e,this.position),this.position+=e.length}Be(){return this.buffer.slice(0,this.position)}xe(e){let t=function(e){let t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=0!=(128&t[0]);t[0]^=n?255:128;for(let e=1;e<t.length;++e)t[e]^=n?255:0;return t}Re(e){let t=255&e;0===t?(this.Me(0),this.Me(255)):255===t?(this.Me(255),this.Me(0)):this.Me(t)}be(e){let t=255&e;0===t?(this.Fe(0),this.Fe(255)):255===t?(this.Fe(255),this.Fe(0)):this.Fe(e)}Pe(){this.Me(0),this.Me(1)}Ve(){this.Fe(0),this.Fe(1)}Me(e){this.Ne(1),this.buffer[this.position++]=e}Fe(e){this.Ne(1),this.buffer[this.position++]=~e}Ne(e){let t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);let r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class rL{constructor(e){this.Le=e}ge(e){this.Le.Ae(e)}_e(e){this.Le.Se(e)}de(e){this.Le.Ce(e)}le(){this.Le.$e()}}class rV{constructor(e){this.Le=e}ge(e){this.Le.ve(e)}_e(e){this.Le.De(e)}de(e){this.Le.ke(e)}le(){this.Le.Oe()}}class rO{constructor(){this.Le=new rR,this.qe=new rL(this.Le),this.Ue=new rV(this.Le)}seed(e){this.Le.seed(e)}Ke(e){return 0===e?this.qe:this.Ue}Be(){return this.Le.Be()}reset(){this.Le.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rP{constructor(e,t,n,r){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=r}Ge(){let e=this.directionalValue.length,t=0===e||255===this.directionalValue[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new rP(this.indexId,this.documentKey,this.arrayValue,n)}}function rq(e,t){let n=e.indexId-t.indexId;return 0!==n?n:0!==(n=rU(e.arrayValue,t.arrayValue))?n:0!==(n=rU(e.directionalValue,t.directionalValue))?n:B.comparator(e.documentKey,t.documentKey)}function rU(e,t){for(let n=0;n<e.length&&n<t.length;++n){let r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rB{constructor(e){for(let t of(this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.Qe=e.orderBy,this.je=[],e.filters)){let e=t;e.isInequality()?this.ze=e:this.je.push(e)}}We(e){e.collectionGroup===this.collectionId||I();let t=G(e);if(void 0!==t&&!this.He(t))return!1;let n=$(e),r=0,i=0;for(;r<n.length&&this.He(n[r]);++r);if(r===n.length)return!0;if(void 0!==this.ze){let e=n[r];if(!this.Je(this.ze,e)||!this.Ye(this.Qe[i++],e))return!1;++r}for(;r<n.length;++r){let e=n[r];if(i>=this.Qe.length||!this.Ye(this.Qe[i++],e))return!1}return!0}He(e){for(let t of this.je)if(this.Je(t,e))return!0;return!1}Je(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;let n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}Ye(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}function rK(e){return e instanceof e1}function rG(e){return e instanceof e2&&e3(e)}function r$(e){return rK(e)||rG(e)||function(e){if(e instanceof e2&&e4(e)){for(let t of e.getFilters())if(!rK(t)&&!rG(t))return!1;return!0}return!1}(e)}function rQ(e,t){return e instanceof e1||e instanceof e2||I(),t instanceof e1||t instanceof e2||I(),rj(e instanceof e1?t instanceof e1?e2.create([e,t],"and"):rz(e,t):t instanceof e1?rz(t,e):function(e,t){if(e.filters.length>0&&t.filters.length>0||I(),e5(e)&&e5(t))return e6(e,t.getFilters());let n=e4(e)?e:t,r=e4(e)?t:e,i=n.filters.map(e=>rQ(e,r));return e2.create(i,"or")}(e,t))}function rz(e,t){if(e5(t))return e6(t,e.getFilters());{let n=t.filters.map(t=>rQ(e,t));return e2.create(n,"or")}}function rj(e){if(e instanceof e1||e instanceof e2||I(),e instanceof e1)return e;let t=e.getFilters();if(1===t.length)return rj(t[0]);if(e8(e))return e;let n=t.map(e=>rj(e)),r=[];return n.forEach(t=>{t instanceof e1?r.push(t):t instanceof e2&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:e2.create(r,e.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rW{constructor(){this.Ze=new rH}addToCollectionParentIndex(e,t){return this.Ze.add(t),et.resolve()}getCollectionParents(e,t){return et.resolve(this.Ze.getEntries(t))}addFieldIndex(e,t){return et.resolve()}deleteFieldIndex(e,t){return et.resolve()}getDocumentsMatchingTarget(e,t){return et.resolve(null)}getIndexType(e,t){return et.resolve(0)}getFieldIndexes(e,t){return et.resolve([])}getNextCollectionGroupToUpdate(e){return et.resolve(null)}getMinOffset(e,t){return et.resolve(X.min())}getMinOffsetFromCollectionGroup(e,t){return et.resolve(X.min())}updateCollectionGroup(e,t,n){return et.resolve()}updateIndexEntries(e,t){return et.resolve()}}class rH{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new tc(P.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new tc(P.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rX=new Uint8Array(0);class rY{constructor(e,t){this.user=e,this.databaseId=t,this.Xe=new rH,this.tn=new no(e=>tw(e),(e,t)=>tv(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Xe.has(t)){let n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.Xe.add(t)});let i={collectionId:n,parent:nY(r)};return rJ(e).put(i)}return et.resolve()}getCollectionParents(e,t){let n=[],r=IDBKeyRange.bound([t,""],[t+"\x00",""],!1,!0);return rJ(e).W(r).next(e=>{for(let r of e){if(r.collectionId!==t)break;n.push(nJ(r.parent))}return n})}addFieldIndex(e,t){let n=r0(e),r={indexId:t.indexId,collectionGroup:t.collectionGroup,fields:t.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])};delete r.indexId;let i=n.add(r);if(t.indexState){let n=r1(e);return i.next(e=>{n.put(r_(e,this.user,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){let n=r0(e),r=r1(e),i=rZ(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}getDocumentsMatchingTarget(e,t){let n=rZ(e),r=!0,i=new Map;return et.forEach(this.en(t),t=>this.nn(e,t).next(e=>{r&&(r=!!e),i.set(t,e)})).next(()=>{if(r){let e=ng(),r=[];return et.forEach(i,(i,s)=>{p("IndexedDbIndexManager",`Using index id=${i.indexId}|cg=${i.collectionGroup}|f=${i.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")} to execute ${tw(t)}`);let a=function(e,t){let n=G(t);if(void 0===n)return null;for(let t of tT(e,n.fieldPath))switch(t.op){case"array-contains-any":return t.value.arrayValue.values||[];case"array-contains":return[t.value]}return null}(s,i),o=function(e,t){let n=new Map;for(let r of $(t))for(let t of tT(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(s,i),l=function(e,t){let n=[],r=!0;for(let i of $(t)){let t=0===i.kind?tE(e,i.fieldPath,e.startAt):tb(e,i.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new eY(n,r)}(s,i),u=function(e,t){let n=[],r=!0;for(let i of $(t)){let t=0===i.kind?tb(e,i.fieldPath,e.endAt):tE(e,i.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new eY(n,r)}(s,i),c=this.sn(i,s,l),h=this.sn(i,s,u),d=this.rn(i,s,o),f=this.on(i.indexId,a,c,l.inclusive,h,u.inclusive,d);return et.forEach(f,i=>n.J(i,t.limit).next(t=>{t.forEach(t=>{let n=B.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return et.resolve(null)})}en(e){let t=this.tn.get(e);return t||(t=0===e.filters.length?[e]:(function(e){if(0===e.getFilters().length)return[];let t=function e(t){if(t instanceof e1||t instanceof e2||I(),t instanceof e1)return t;if(1===t.filters.length)return e(t.filters[0]);let n=t.filters.map(t=>e(t)),r=e2.create(n,t.op);return r$(r=rj(r))?r:(r instanceof e2||I(),e5(r)||I(),r.filters.length>1||I(),r.filters.reduce((e,t)=>rQ(e,t)))}(/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e(t){var n,r;if(t instanceof e1||t instanceof e2||I(),t instanceof e1){if(t instanceof tr){let e=(null===(r=null===(n=t.value.arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.map(e=>e1.create(t.field,"==",e)))||[];return e2.create(e,"or")}return t}let i=t.filters.map(t=>e(t));return e2.create(i,t.op)}(e));return r$(t)||I(),rK(t)||rG(t)?[t]:t.getFilters()})(e2.create(e.filters,"and")).map(t=>ty(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.tn.set(e,t)),t}on(e,t,n,r,i,s,a){let o=(null!=t?t.length:1)*Math.max(n.length,i.length),l=o/(null!=t?t.length:1),u=[];for(let c=0;c<o;++c){let o=t?this.un(t[c/l]):rX,h=this.cn(e,o,n[c%l],r),d=this.an(e,o,i[c%l],s),f=a.map(t=>this.cn(e,o,t,!0));u.push(...this.createRange(h,d,f))}return u}cn(e,t,n,r){let i=new rP(e,B.empty(),t,n);return r?i:i.Ge()}an(e,t,n,r){let i=new rP(e,B.empty(),t,n);return r?i.Ge():i}nn(e,t){let n=new rB(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(let r of e)n.We(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2,r=this.en(t);return et.forEach(r,t=>this.nn(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new tc(U.comparator),n=!1;for(let r of e.filters)for(let e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(let n of e.orderBy)n.field.isKeyField()||(t=t.add(n.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>null!==t.limit&&r.length>1&&2===n?1:n)}hn(e,t){let n=new rO;for(let r of $(e)){let e=t.data.field(r.fieldPath);if(null==e)return null;let i=n.Ke(r.kind);rF.Ee.ae(e,i)}return n.Be()}un(e){let t=new rO;return rF.Ee.ae(e,t.Ke(0)),t.Be()}ln(e,t){let n=new rO;return rF.Ee.ae(eB(this.databaseId,t),n.Ke(function(e){let t=$(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.Be()}rn(e,t,n){if(null===n)return[];let r=[];r.push(new rO);let i=0;for(let s of $(e)){let e=n[i++];for(let n of r)if(this.fn(t,s.fieldPath)&&eG(e))r=this.dn(r,s,e);else{let t=n.Ke(s.kind);rF.Ee.ae(e,t)}}return this._n(r)}sn(e,t,n){return this.rn(e,t,n.position)}_n(e){let t=[];for(let n=0;n<e.length;++n)t[n]=e[n].Be();return t}dn(e,t,n){let r=[...e],i=[];for(let e of n.arrayValue.values||[])for(let n of r){let r=new rO;r.seed(n.Be()),rF.Ee.ae(e,r.Ke(t.kind)),i.push(r)}return i}fn(e,t){return!!e.filters.find(e=>e instanceof e1&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){let n=r0(e),r=r1(e);return(t?n.W("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.W()).next(e=>{let t=[];return et.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){let n=t?new j(t.sequenceNumber,new X(rv(t.readTime),new B(nJ(t.documentKey)),t.largestBatchId)):j.empty(),r=e.fields.map(([e,t])=>new z(U.fromServerFormat(e),t));return new K(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{let n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:M(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){let r=r0(e),i=r1(e);return this.wn(e).next(e=>r.W("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(t=>et.forEach(t,t=>i.put(r_(t.indexId,this.user,e,n)))))}updateIndexEntries(e,t){let n=new Map;return et.forEach(t,(t,r)=>{let i=n.get(t.collectionGroup);return(i?et.resolve(i):this.getFieldIndexes(e,t.collectionGroup)).next(i=>(n.set(t.collectionGroup,i),et.forEach(i,n=>this.mn(e,t,n).next(t=>{let i=this.gn(r,n);return t.isEqual(i)?et.resolve():this.yn(e,r,n,t,i)}))))})}pn(e,t,n,r){return rZ(e).put({indexId:r.indexId,uid:this.uid,arrayValue:r.arrayValue,directionalValue:r.directionalValue,orderedDocumentKey:this.ln(n,t.key),documentKey:t.key.path.toArray()})}In(e,t,n,r){return rZ(e).delete([r.indexId,this.uid,r.arrayValue,r.directionalValue,this.ln(n,t.key),t.key.path.toArray()])}mn(e,t,n){let r=rZ(e),i=new tc(rq);return r.X({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.ln(n,t)])},(e,r)=>{i=i.add(new rP(n.indexId,t,r.arrayValue,r.directionalValue))}).next(()=>i)}gn(e,t){let n=new tc(rq),r=this.hn(t,e);if(null==r)return n;let i=G(t);if(null!=i){let s=e.data.field(i.fieldPath);if(eG(s))for(let i of s.arrayValue.values||[])n=n.add(new rP(t.indexId,e.key,this.un(i),r))}else n=n.add(new rP(t.indexId,e.key,rX,r));return n}yn(e,t,n,r,i){p("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);let s=[];return function(e,t,n,r,i){let s=e.getIterator(),a=t.getIterator(),o=td(s),l=td(a);for(;o||l;){let e=!1,t=!1;if(o&&l){let r=n(o,l);r<0?t=!0:r>0&&(e=!0)}else null!=o?t=!0:e=!0;e?(r(l),l=td(a)):t?(i(o),o=td(s)):(o=td(s),l=td(a))}}(r,i,rq,r=>{s.push(this.pn(e,t,n,r))},r=>{s.push(this.In(e,t,n,r))}),et.waitFor(s)}wn(e){let t=1;return r1(e).X({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>rq(e,t)).filter((e,t,n)=>!t||0!==rq(e,n[t-1]));let r=[];for(let i of(r.push(e),n)){let n=rq(i,e),s=rq(i,t);if(0===n)r[0]=e.Ge();else if(n>0&&s<0)r.push(i),r.push(i.Ge());else if(s>0)break}r.push(t);let i=[];for(let e=0;e<r.length;e+=2){if(this.Tn(r[e],r[e+1]))return[];let t=[r[e].indexId,this.uid,r[e].arrayValue,r[e].directionalValue,rX,[]],n=[r[e+1].indexId,this.uid,r[e+1].arrayValue,r[e+1].directionalValue,rX,[]];i.push(IDBKeyRange.bound(t,n))}return i}Tn(e,t){return rq(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(r2)}getMinOffset(e,t){return et.mapArray(this.en(t),t=>this.nn(e,t).next(e=>e||I())).next(r2)}}function rJ(e){return rc(e,"collectionParents")}function rZ(e){return rc(e,"indexEntries")}function r0(e){return rc(e,"indexConfiguration")}function r1(e){return rc(e,"indexState")}function r2(e){0!==e.length||I();let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){let i=e[r].indexState.offset;0>Y(i,t)&&(t=i),n<i.largestBatchId&&(n=i.largestBatchId)}return new X(t.readTime,t.documentKey,n)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r5={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class r4{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new r4(e,r4.DEFAULT_COLLECTION_PERCENTILE,r4.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r3(e,t,n){let r=e.store("mutations"),i=e.store("documentMutations"),s=[],a=IDBKeyRange.only(n.batchId),o=0,l=r.X({range:a},(e,t,n)=>(o++,n.delete()));s.push(l.next(()=>{1===o||I()}));let u=[];for(let e of n.mutations){var c,h;let r=(c=e.key.path,h=n.batchId,[t,nY(c),h]);s.push(i.delete(r)),u.push(e.key)}return et.waitFor(s).next(()=>u)}function r8(e){let t;if(!e)return 0;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw I();t=e.noDocument}return JSON.stringify(t).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */r4.DEFAULT_COLLECTION_PERCENTILE=10,r4.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,r4.DEFAULT=new r4(41943040,r4.DEFAULT_COLLECTION_PERCENTILE,r4.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),r4.DISABLED=new r4(-1,0,0);class r6{constructor(e,t,n,r){this.userId=e,this.Tt=t,this.indexManager=n,this.referenceDelegate=r,this.En={}}static ue(e,t,n,r){""!==e.uid||I();let i=e.isAuthenticated()?e.uid:"";return new r6(i,t,n,r)}checkEmpty(e){let t=!0,n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return r7(e).X({index:"userMutationsIndex",range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){let i=ie(e),s=r7(e);return s.add({}).next(a=>{"number"==typeof a||I();let o=new rh(a,t,n,r),l=function(e,t,n){let r=n.baseMutations.map(t=>nG(e.oe,t)),i=n.mutations.map(t=>nG(e.oe,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:i}}(this.Tt,this.userId,o),u=[],c=new tc((e,t)=>M(e.canonicalString(),t.canonicalString()));for(let e of r){let t=[this.userId,nY(e.key.path),a];c=c.add(e.key.path.popLast()),u.push(s.put(l)),u.push(i.put(t,n0))}return c.forEach(t=>{u.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.En[a]=o.keys()}),et.waitFor(u).next(()=>o)})}lookupMutationBatch(e,t){return r7(e).get(t).next(e=>e?(e.userId===this.userId||I(),rI(this.Tt,e)):null)}An(e,t){return this.En[t]?et.resolve(this.En[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){let n=e.keys();return this.En[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){let n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]),i=null;return r7(e).X({index:"userMutationsIndex",range:r},(e,t,r)=>{t.userId===this.userId&&(t.batchId>=n||I(),i=rI(this.Tt,t)),r.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){let t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]),n=-1;return r7(e).X({index:"userMutationsIndex",range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){let t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return r7(e).W("userMutationsIndex",t).next(e=>e.map(e=>rI(this.Tt,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){let n=[this.userId,nY(t.path)],r=IDBKeyRange.lowerBound(n),i=[];return ie(e).X({range:r},(n,r,s)=>{let[a,o,l]=n,u=nJ(o);if(a===this.userId&&t.path.isEqual(u))return r7(e).get(l).next(e=>{if(!e)throw I();e.userId===this.userId||I(),i.push(rI(this.Tt,e))});s.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new tc(M),r=[];return t.forEach(t=>{let i=[this.userId,nY(t.path)],s=IDBKeyRange.lowerBound(i),a=ie(e).X({range:s},(e,r,i)=>{let[s,a,o]=e,l=nJ(a);s===this.userId&&t.path.isEqual(l)?n=n.add(o):i.done()});r.push(a)}),et.waitFor(r).next(()=>this.Rn(e,n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=[this.userId,nY(n)],s=IDBKeyRange.lowerBound(i),a=new tc(M);return ie(e).X({range:s},(e,t,i)=>{let[s,o,l]=e,u=nJ(o);s===this.userId&&n.isPrefixOf(u)?u.length===r&&(a=a.add(l)):i.done()}).next(()=>this.Rn(e,a))}Rn(e,t){let n=[],r=[];return t.forEach(t=>{r.push(r7(e).get(t).next(e=>{if(null===e)throw I();e.userId===this.userId||I(),n.push(rI(this.Tt,e))}))}),et.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return r3(e.re,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.Pn(t.batchId)}),et.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}Pn(e){delete this.En[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return et.resolve();let n=IDBKeyRange.lowerBound([this.userId]),r=[];return ie(e).X({range:n},(e,t,n)=>{if(e[0]===this.userId){let t=nJ(e[1]);r.push(t)}else n.done()}).next(()=>{0===r.length||I()})})}containsKey(e,t){return r9(e,this.userId,t)}vn(e){return it(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function r9(e,t,n){let r=[t,nY(n.path)],i=r[1],s=IDBKeyRange.lowerBound(r),a=!1;return ie(e).X({range:s,Z:!0},(e,n,r)=>{let[s,o,l]=e;s===t&&o===i&&(a=!0),r.done()}).next(()=>a)}function r7(e){return rc(e,"mutations")}function ie(e){return rc(e,"documentMutations")}function it(e){return rc(e,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e){this.bn=e}next(){return this.bn+=2,this.bn}static Vn(){return new ir(0)}static Sn(){return new ir(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t){this.referenceDelegate=e,this.Tt=t}allocateTargetId(e){return this.Dn(e).next(t=>{let n=new ir(t.highestTargetId);return t.highestTargetId=n.next(),this.Cn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Dn(e).next(e=>V.fromTimestamp(new L(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Dn(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.Dn(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.Cn(e,r)))}addTargetData(e,t){return this.xn(e,t).next(()=>this.Dn(e).next(n=>(n.targetCount+=1,this.Nn(t,n),this.Cn(e,n))))}updateTargetData(e,t){return this.xn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>is(e).delete(t.targetId)).next(()=>this.Dn(e)).next(t=>(t.targetCount>0||I(),t.targetCount-=1,this.Cn(e,t)))}removeTargets(e,t,n){let r=0,i=[];return is(e).X((s,a)=>{let o=rT(a);o.sequenceNumber<=t&&null===n.get(o.targetId)&&(r++,i.push(this.removeTargetData(e,o)))}).next(()=>et.waitFor(i)).next(()=>r)}forEachTarget(e,t){return is(e).X((e,n)=>{let r=rT(n);t(r)})}Dn(e){return ia(e).get("targetGlobalKey").next(e=>(null!==e||I(),e))}Cn(e,t){return ia(e).put("targetGlobalKey",t)}xn(e,t){return is(e).put(rE(this.Tt,t))}Nn(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.Dn(e).next(e=>e.targetCount)}getTargetData(e,t){let n=tw(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]),i=null;return is(e).X({range:r,index:"queryTargetsIndex"},(e,n,r)=>{let s=rT(n);tv(t,s.target)&&(i=s,r.done())}).next(()=>i)}addMatchingKeys(e,t,n){let r=[],i=io(e);return t.forEach(t=>{let s=nY(t.path);r.push(i.put({targetId:n,path:s})),r.push(this.referenceDelegate.addReference(e,n,t))}),et.waitFor(r)}removeMatchingKeys(e,t,n){let r=io(e);return et.forEach(t,t=>{let i=nY(t.path);return et.waitFor([r.delete([n,i]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){let n=io(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){let n=IDBKeyRange.bound([t],[t+1],!1,!0),r=io(e),i=ng();return r.X({range:n,Z:!0},(e,t,n)=>{let r=nJ(e[1]),s=new B(r);i=i.add(s)}).next(()=>i)}containsKey(e,t){let n=nY(t.path),r=IDBKeyRange.bound([n],[n+"\x00"],!1,!0),i=0;return io(e).X({index:"documentTargetsIndex",Z:!0,range:r},([e,t],n,r)=>{0!==e&&(i++,r.done())}).next(()=>i>0)}ie(e,t){return is(e).get(t).next(e=>e?rT(e):null)}}function is(e){return rc(e,"targets")}function ia(e){return rc(e,"targetGlobal")}function io(e){return rc(e,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function il([e,t],[n,r]){let i=M(e,n);return 0===i?M(t,r):i}class iu{constructor(e){this.kn=e,this.buffer=new tc(il),this.$n=0}Mn(){return++this.$n}On(e){let t=[e,this.Mn()];if(this.buffer.size<this.kn)this.buffer=this.buffer.add(t);else{let e=this.buffer.last();0>il(t,e)&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class ic{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Fn=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Bn(6e4)}stop(){this.Fn&&(this.Fn.cancel(),this.Fn=null)}get started(){return null!==this.Fn}Bn(e){p("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Fn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Fn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){ea(e)?p("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await ee(e)}await this.Bn(3e5)})}}class ih{constructor(e,t){this.Ln=e,this.params=t}calculateTargetCount(e,t){return this.Ln.qn(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return et.resolve(ef.at);let n=new iu(t);return this.Ln.forEachTarget(e,e=>n.On(e.sequenceNumber)).next(()=>this.Ln.Un(e,e=>n.On(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Ln.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Ln.removeOrphanedDocuments(e,t)}collect(e,t){return -1===this.params.cacheSizeCollectionThreshold?(p("LruGarbageCollector","Garbage collection skipped; disabled"),et.resolve(r5)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(p("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),r5):this.Kn(e,t))}getCacheSize(e){return this.Ln.getCacheSize(e)}Kn(e,t){let n,r,i,s,a,o,u;let c=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(p("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,s=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,a=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,o=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(u=Date.now(),g()<=l.LogLevel.DEBUG&&p("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${s-c}ms
	Determined least recently used ${r} in `+(a-s)+"ms\n"+`	Removed ${i} targets in `+(o-a)+"ms\n"+`	Removed ${e} documents in `+(u-o)+"ms\n"+`Total Duration: ${u-c}ms`),et.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(e,t){this.db=e,this.garbageCollector=new ih(this,t)}qn(e){let t=this.Gn(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}Gn(e){let t=0;return this.Un(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Un(e,t){return this.Qn(e,(e,n)=>t(n))}addReference(e,t,n){return im(e,n)}removeReference(e,t,n){return im(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return im(e,t)}jn(e,t){let n;return n=!1,it(e).tt(r=>r9(e,r,t).next(e=>(e&&(n=!0),et.resolve(!e)))).next(()=>n)}removeOrphanedDocuments(e,t){let n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[],i=0;return this.Qn(e,(s,a)=>{if(a<=t){let t=this.jn(e,s).next(t=>{if(!t)return i++,n.getEntry(e,s).next(()=>(n.removeEntry(s,V.min()),io(e).delete([0,nY(s.path)])))});r.push(t)}}).next(()=>et.waitFor(r)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){let n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return im(e,t)}Qn(e,t){let n=io(e),r,i=ef.at;return n.X({index:"documentTargetsIndex"},([e,n],{path:s,sequenceNumber:a})=>{0===e?(i!==ef.at&&t(new B(nJ(r)),i),i=a,r=s):i=ef.at}).next(()=>{i!==ef.at&&t(new B(nJ(r)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function im(e,t){var n;return io(e).put((n=e.currentSequenceNumber,{targetId:0,path:nY(t.path),sequenceNumber:n}))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(){this.changes=new no(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,tg.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return void 0!==n?et.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(e){this.Tt=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return iv(e).put(n)}removeEntry(e,t,n){return iv(e).delete(function(e,t){let n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],ry(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.zn(e,n)))}getEntry(e,t){let n=tg.newInvalidDocument(t);return iv(e).X({index:"documentKeyIndex",range:IDBKeyRange.only(iI(t))},(e,r)=>{n=this.Wn(t,r)}).next(()=>n)}Hn(e,t){let n={size:0,document:tg.newInvalidDocument(t)};return iv(e).X({index:"documentKeyIndex",range:IDBKeyRange.only(iI(t))},(e,r)=>{n={document:this.Wn(t,r),size:r8(r)}}).next(()=>n)}getEntries(e,t){let n=nl;return this.Jn(e,t,(e,t)=>{let r=this.Wn(e,t);n=n.insert(e,r)}).next(()=>n)}Yn(e,t){let n=nl,r=new to(B.comparator);return this.Jn(e,t,(e,t)=>{let i=this.Wn(e,t);n=n.insert(e,i),r=r.insert(e,r8(t))}).next(()=>({documents:n,Zn:r}))}Jn(e,t,n){if(t.isEmpty())return et.resolve();let r=new tc(iE);t.forEach(e=>r=r.add(e));let i=IDBKeyRange.bound(iI(r.first()),iI(r.last())),s=r.getIterator(),a=s.getNext();return iv(e).X({index:"documentKeyIndex",range:i},(e,t,r)=>{let i=B.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;a&&0>iE(a,i);)n(a,null),a=s.getNext();a&&a.isEqual(i)&&(n(a,t),a=s.hasNext()?s.getNext():null),a?r.j(iI(a)):r.done()}).next(()=>{for(;a;)n(a,null),a=s.hasNext()?s.getNext():null})}getDocumentsMatchingQuery(e,t,n,r){let i=t.path,s=[i.popLast().toArray(),i.lastSegment(),ry(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],a=[i.popLast().toArray(),i.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return iv(e).W(IDBKeyRange.bound(s,a,!0)).next(e=>{let n=nl;for(let i of e){let e=this.Wn(B.fromSegments(i.prefixPath.concat(i.collectionGroup,i.documentId)),i);e.isFoundDocument()&&(tO(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let i=nl,s=iT(t,n),a=iT(t,X.max());return iv(e).X({index:"collectionGroupIndex",range:IDBKeyRange.bound(s,a,!0)},(e,t,n)=>{let s=this.Wn(B.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);(i=i.insert(s.key,s)).size===r&&n.done()}).next(()=>i)}newChangeBuffer(e){return new iy(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return iw(e).get("remoteDocumentGlobalKey").next(e=>(e||I(),e))}zn(e,t){return iw(e).put("remoteDocumentGlobalKey",t)}Wn(e,t){if(t){let e=function(e,t){let n;if(t.document)n=nK(e.oe,t.document,!!t.hasCommittedMutations);else if(t.noDocument){let e=B.fromSegments(t.noDocument.path),r=rv(t.noDocument.readTime);n=tg.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return I();{let e=B.fromSegments(t.unknownDocument.path),r=rv(t.unknownDocument.version);n=tg.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){let t=new L(e[0],e[1]);return V.fromTimestamp(t)}(t.readTime)),n}(this.Tt,t);if(!(e.isNoDocument()&&e.version.isEqual(V.min())))return e}return tg.newInvalidDocument(e)}}class iy extends ig{constructor(e,t){super(),this.Xn=e,this.trackRemovals=t,this.ts=new no(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){let t=[],n=0,r=new tc((e,t)=>M(e.canonicalString(),t.canonicalString()));return this.changes.forEach((i,s)=>{let a=this.ts.get(i);if(t.push(this.Xn.removeEntry(e,i,a.readTime)),s.isValidDocument()){let o=rp(this.Xn.Tt,s);r=r.add(i.path.popLast());let l=r8(o);n+=l-a.size,t.push(this.Xn.addEntry(e,i,o))}else if(n-=a.size,this.trackRemovals){let n=rp(this.Xn.Tt,s.convertToNoDocument(V.min()));t.push(this.Xn.addEntry(e,i,n))}}),r.forEach(n=>{t.push(this.Xn.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.Xn.updateMetadata(e,n)),et.waitFor(t)}getFromCache(e,t){return this.Xn.Hn(e,t).next(e=>(this.ts.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.Xn.Yn(e,t).next(({documents:e,Zn:t})=>(t.forEach((t,n)=>{this.ts.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function iw(e){return rc(e,"remoteDocumentGlobal")}function iv(e){return rc(e,"remoteDocumentsV14")}function iI(e){let t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function iT(e,t){let n=t.documentKey.path.toArray();return[e,ry(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function iE(e,t){let n=e.path.toArray(),r=t.path.toArray(),i=0;for(let e=0;e<n.length-2&&e<r.length-2;++e)if(i=M(n[e],r[e]))return i;return(i=M(n.length,r.length))||(i=M(n[n.length-2],r[r.length-2]))||M(n[n.length-1],r[r.length-1])}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ib{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iS{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&t3(n.mutation,e,tf.empty(),L.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,ng()).next(()=>t))}getLocalViewOfDocuments(e,t,n=ng()){let r=nd();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=nc();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let n=nd();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,ng()))}populateOverlays(e,t,n){let r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=nl,s=nd(),a=nd();return t.forEach((e,t)=>{let a=n.get(t.key);r.has(t.key)&&(void 0===a||a.mutation instanceof t9)?i=i.insert(t.key,t):void 0!==a?(s.set(t.key,a.mutation.getFieldMask()),t3(a.mutation,t,a.mutation.getFieldMask(),L.now())):s.set(t.key,tf.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var n;return a.set(e,new ib(t,null!==(n=s.get(e))&&void 0!==n?n:null))}),a))}recalculateAndSaveOverlays(e,t){let n=nd(),r=new to((e,t)=>e-t),i=ng();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let a=n.get(e)||tf.empty();a=i.applyToLocalView(s,a),n.set(e,a);let o=(r.get(i.batchId)||ng()).add(e);r=r.insert(i.batchId,o)})}).next(()=>{let s=[],a=r.getReverseIterator();for(;a.hasNext();){let r=a.getNext(),o=r.key,l=r.value,u=nd();l.forEach(e=>{if(!i.has(e)){let r=t4(t.get(e),n.get(e));null!==r&&u.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,o,u))}return et.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n){return B.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):tN(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n):this.getDocumentsMatchingCollectionQuery(e,t,n)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{let s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):et.resolve(nd()),a=-1,o=i;return s.next(t=>et.forEach(t,(t,n)=>(a<n.largestBatchId&&(a=n.largestBatchId),i.get(t)?et.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,o,t,ng())).next(e=>({batchId:a,changes:nh(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new B(t)).next(e=>{let t=nc();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n){let r=t.collectionGroup,i=nc();return this.indexManager.getCollectionParents(e,r).next(s=>et.forEach(s,s=>{var a;let o=(a=s.child(r),new tS(a,null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt));return this.getDocumentsMatchingCollectionQuery(e,o,n).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,r))).next(e=>{r.forEach((t,n)=>{let r=n.getKey();null===e.get(r)&&(e=e.insert(r,tg.newInvalidDocument(r)))});let n=nc();return e.forEach((e,i)=>{let s=r.get(e);void 0!==s&&t3(s.mutation,i,tf.empty(),L.now()),tO(t,i)&&(n=n.insert(e,i))}),n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ix{constructor(e){this.Tt=e,this.es=new Map,this.ns=new Map}getBundleMetadata(e,t){return et.resolve(this.es.get(t))}saveBundleMetadata(e,t){return this.es.set(t.id,{id:t.id,version:t.version,createTime:nF(t.createTime)}),et.resolve()}getNamedQuery(e,t){return et.resolve(this.ns.get(t))}saveNamedQuery(e,t){return this.ns.set(t.name,{name:t.name,query:rb(t.bundledQuery),readTime:nF(t.readTime)}),et.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(){this.overlays=new to(B.comparator),this.ss=new Map}getOverlay(e,t){return et.resolve(this.overlays.get(t))}getOverlays(e,t){let n=nd();return et.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.ce(e,t,r)}),et.resolve()}removeOverlaysForBatchId(e,t,n){let r=this.ss.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.ss.delete(n)),et.resolve()}getOverlaysForCollection(e,t,n){let r=nd(),i=t.length+1,s=new B(t.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){let e=a.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return et.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new to((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=nd(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=nd(),o=i.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=r)););return et.resolve(a)}ce(e,t,n){let r=this.overlays.get(n.key);if(null!==r){let e=this.ss.get(r.largestBatchId).delete(n.key);this.ss.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new rf(t,n));let i=this.ss.get(t);void 0===i&&(i=ng(),this.ss.set(t,i)),this.ss.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iD{constructor(){this.rs=new tc(iA.os),this.us=new tc(iA.cs)}isEmpty(){return this.rs.isEmpty()}addReference(e,t){let n=new iA(e,t);this.rs=this.rs.add(n),this.us=this.us.add(n)}hs(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.ls(new iA(e,t))}fs(e,t){e.forEach(e=>this.removeReference(e,t))}ds(e){let t=new B(new P([])),n=new iA(t,e),r=new iA(t,e+1),i=[];return this.us.forEachInRange([n,r],e=>{this.ls(e),i.push(e.key)}),i}_s(){this.rs.forEach(e=>this.ls(e))}ls(e){this.rs=this.rs.delete(e),this.us=this.us.delete(e)}ws(e){let t=new B(new P([])),n=new iA(t,e),r=new iA(t,e+1),i=ng();return this.us.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new iA(e,0),n=this.rs.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class iA{constructor(e,t){this.key=e,this.gs=t}static os(e,t){return B.comparator(e.key,t.key)||M(e.gs,t.gs)}static cs(e,t){return M(e.gs,t.gs)||B.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iN{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.ys=1,this.ps=new tc(iA.os)}checkEmpty(e){return et.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){let i=this.ys;this.ys++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new rh(i,t,n,r);for(let t of(this.mutationQueue.push(s),r))this.ps=this.ps.add(new iA(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return et.resolve(s)}lookupMutationBatch(e,t){return et.resolve(this.Is(t))}getNextMutationBatchAfterBatchId(e,t){let n=this.Ts(t+1),r=n<0?0:n;return et.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return et.resolve(0===this.mutationQueue.length?-1:this.ys-1)}getAllMutationBatches(e){return et.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new iA(t,0),r=new iA(t,Number.POSITIVE_INFINITY),i=[];return this.ps.forEachInRange([n,r],e=>{let t=this.Is(e.gs);i.push(t)}),et.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new tc(M);return t.forEach(e=>{let t=new iA(e,0),r=new iA(e,Number.POSITIVE_INFINITY);this.ps.forEachInRange([t,r],e=>{n=n.add(e.gs)})}),et.resolve(this.Es(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=n;B.isDocumentKey(i)||(i=i.child(""));let s=new iA(new B(i),0),a=new tc(M);return this.ps.forEachWhile(e=>{let t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(a=a.add(e.gs)),!0)},s),et.resolve(this.Es(a))}Es(e){let t=[];return e.forEach(e=>{let n=this.Is(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){0===this.As(t.batchId,"removed")||I(),this.mutationQueue.shift();let n=this.ps;return et.forEach(t.mutations,r=>{let i=new iA(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.ps=n})}Pn(e){}containsKey(e,t){let n=new iA(t,0),r=this.ps.firstAfterOrEqual(n);return et.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,et.resolve()}As(e,t){return this.Ts(e)}Ts(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Is(e){let t=this.Ts(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iC{constructor(e){this.Rs=e,this.docs=new to(B.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.Rs(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return et.resolve(n?n.document.mutableCopy():tg.newInvalidDocument(t))}getEntries(e,t){let n=nl;return t.forEach(e=>{let t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():tg.newInvalidDocument(e))}),et.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=nl,s=t.path,a=new B(s.child("")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){let{key:e,value:{document:a}}=o.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=Y(H(a),n)||(r.has(a.key)||tO(t,a))&&(i=i.insert(a.key,a.mutableCopy()))}return et.resolve(i)}getAllFromCollectionGroup(e,t,n,r){I()}Ps(e,t){return et.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new ik(this)}getSize(e){return et.resolve(this.size)}}class ik extends ig{constructor(e){super(),this.Xn=e}applyChanges(e){let t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Xn.addEntry(e,r)):this.Xn.removeEntry(n)}),et.waitFor(t)}getFromCache(e,t){return this.Xn.getEntry(e,t)}getAllFromCache(e,t){return this.Xn.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iF{constructor(e){this.persistence=e,this.vs=new no(e=>tw(e),tv),this.lastRemoteSnapshotVersion=V.min(),this.highestTargetId=0,this.bs=0,this.Vs=new iD,this.targetCount=0,this.Ss=ir.Vn()}forEachTarget(e,t){return this.vs.forEach((e,n)=>t(n)),et.resolve()}getLastRemoteSnapshotVersion(e){return et.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return et.resolve(this.bs)}allocateTargetId(e){return this.highestTargetId=this.Ss.next(),et.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.bs&&(this.bs=t),et.resolve()}xn(e){this.vs.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Ss=new ir(t),this.highestTargetId=t),e.sequenceNumber>this.bs&&(this.bs=e.sequenceNumber)}addTargetData(e,t){return this.xn(t),this.targetCount+=1,et.resolve()}updateTargetData(e,t){return this.xn(t),et.resolve()}removeTargetData(e,t){return this.vs.delete(t.target),this.Vs.ds(t.targetId),this.targetCount-=1,et.resolve()}removeTargets(e,t,n){let r=0,i=[];return this.vs.forEach((s,a)=>{a.sequenceNumber<=t&&null===n.get(a.targetId)&&(this.vs.delete(s),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),et.waitFor(i).next(()=>r)}getTargetCount(e){return et.resolve(this.targetCount)}getTargetData(e,t){let n=this.vs.get(t)||null;return et.resolve(n)}addMatchingKeys(e,t,n){return this.Vs.hs(t,n),et.resolve()}removeMatchingKeys(e,t,n){this.Vs.fs(t,n);let r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),et.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Vs.ds(t),et.resolve()}getMatchingKeysForTargetId(e,t){let n=this.Vs.ws(t);return et.resolve(n)}containsKey(e,t){return et.resolve(this.Vs.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iM{constructor(e,t){var n;this.Ds={},this.overlays={},this.Cs=new ef(0),this.xs=!1,this.xs=!0,this.referenceDelegate=e(this),this.Ns=new iF(this),this.indexManager=new rW,this.remoteDocumentCache=(n=e=>this.referenceDelegate.ks(e),new iC(n)),this.Tt=new rg(t),this.$s=new ix(this.Tt)}start(){return Promise.resolve()}shutdown(){return this.xs=!1,Promise.resolve()}get started(){return this.xs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new i_,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Ds[e.toKey()];return n||(n=new iN(t,this.referenceDelegate),this.Ds[e.toKey()]=n),n}getTargetCache(){return this.Ns}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.$s}runTransaction(e,t,n){p("MemoryPersistence","Starting transaction:",e);let r=new iR(this.Cs.next());return this.referenceDelegate.Ms(),n(r).next(e=>this.referenceDelegate.Os(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Fs(e,t){return et.or(Object.values(this.Ds).map(n=>()=>n.containsKey(e,t)))}}class iR extends Z{constructor(e){super(),this.currentSequenceNumber=e}}class iL{constructor(e){this.persistence=e,this.Bs=new iD,this.Ls=null}static qs(e){return new iL(e)}get Us(){if(this.Ls)return this.Ls;throw I()}addReference(e,t,n){return this.Bs.addReference(n,t),this.Us.delete(n.toString()),et.resolve()}removeReference(e,t,n){return this.Bs.removeReference(n,t),this.Us.add(n.toString()),et.resolve()}markPotentiallyOrphaned(e,t){return this.Us.add(t.toString()),et.resolve()}removeTarget(e,t){this.Bs.ds(t.targetId).forEach(e=>this.Us.add(e.toString()));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Us.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ms(){this.Ls=new Set}Os(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return et.forEach(this.Us,n=>{let r=B.fromPath(n);return this.Ks(e,r).next(e=>{e||t.removeEntry(r,V.min())})}).next(()=>(this.Ls=null,t.apply(e)))}updateLimboDocument(e,t){return this.Ks(e,t).next(e=>{e?this.Us.delete(t.toString()):this.Us.add(t.toString())})}ks(e){return 0}Ks(e,t){return et.or([()=>et.resolve(this.Bs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Fs(e,t)])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iV{constructor(e){this.Tt=e}F(e,t,n,r){let i=new en("createOrUpgrade",t);n<1&&r>=1&&(function(e){e.createObjectStore("owner")}(e),e.createObjectStore("mutationQueues",{keyPath:"userId"}),e.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",nZ,{unique:!0}),e.createObjectStore("documentMutations"),iO(e),function(e){e.createObjectStore("remoteDocuments")}(e));let s=et.resolve();return n<3&&r>=3&&(0!==n&&(e.deleteObjectStore("targetDocuments"),e.deleteObjectStore("targets"),e.deleteObjectStore("targetGlobal"),iO(e)),s=s.next(()=>(function(e){let t=e.store("targetGlobal"),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:V.min().toTimestamp(),targetCount:0};return t.put("targetGlobalKey",n)})(i))),n<4&&r>=4&&(0!==n&&(s=s.next(()=>i.store("mutations").W().next(t=>{e.deleteObjectStore("mutations"),e.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",nZ,{unique:!0});let n=i.store("mutations"),r=t.map(e=>n.put(e));return et.waitFor(r)}))),s=s.next(()=>{!function(e){e.createObjectStore("clientMetadata",{keyPath:"clientId"})}(e)})),n<5&&r>=5&&(s=s.next(()=>this.Gs(i))),n<6&&r>=6&&(s=s.next(()=>((function(e){e.createObjectStore("remoteDocumentGlobal")})(e),this.Qs(i)))),n<7&&r>=7&&(s=s.next(()=>this.js(i))),n<8&&r>=8&&(s=s.next(()=>this.zs(e,i))),n<9&&r>=9&&(s=s.next(()=>{e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")})),n<10&&r>=10&&(s=s.next(()=>this.Ws(i))),n<11&&r>=11&&(s=s.next(()=>{(function(e){e.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(e){e.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&r>=12&&(s=s.next(()=>{!function(e){let t=e.createObjectStore("documentOverlays",{keyPath:rn});t.createIndex("collectionPathOverlayIndex",rr,{unique:!1}),t.createIndex("collectionGroupOverlayIndex",ri,{unique:!1})}(e)})),n<13&&r>=13&&(s=s.next(()=>(function(e){let t=e.createObjectStore("remoteDocumentsV14",{keyPath:n1});t.createIndex("documentKeyIndex",n2),t.createIndex("collectionGroupIndex",n5)})(e)).next(()=>this.Hs(e,i)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&r>=14&&(s=s.next(()=>this.Js(e,i))),n<15&&r>=15&&(s=s.next(()=>{e.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),e.createObjectStore("indexState",{keyPath:n9}).createIndex("sequenceNumberIndex",n7,{unique:!1}),e.createObjectStore("indexEntries",{keyPath:re}).createIndex("documentKeyIndex",rt,{unique:!1})})),s}Qs(e){let t=0;return e.store("remoteDocuments").X((e,n)=>{t+=r8(n)}).next(()=>{let n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}Gs(e){let t=e.store("mutationQueues"),n=e.store("mutations");return t.W().next(t=>et.forEach(t,t=>{let r=IDBKeyRange.bound([t.userId,-1],[t.userId,t.lastAcknowledgedBatchId]);return n.W("userMutationsIndex",r).next(n=>et.forEach(n,n=>{n.userId===t.userId||I();let r=rI(this.Tt,n);return r3(e,t.userId,r).next(()=>{})}))}))}js(e){let t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(e=>{let r=[];return n.X((n,i)=>{let s=new P(n),a=[0,nY(s)];r.push(t.get(a).next(n=>n?et.resolve():t.put({targetId:0,path:nY(s),sequenceNumber:e.highestListenSequenceNumber})))}).next(()=>et.waitFor(r))})}zs(e,t){e.createObjectStore("collectionParents",{keyPath:n6});let n=t.store("collectionParents"),r=new rH,i=e=>{if(r.add(e)){let t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:nY(r)})}};return t.store("remoteDocuments").X({Z:!0},(e,t)=>{let n=new P(e);return i(n.popLast())}).next(()=>t.store("documentMutations").X({Z:!0},([e,t,n],r)=>{let s=nJ(t);return i(s.popLast())}))}Ws(e){let t=e.store("targets");return t.X((e,n)=>{let r=rT(n),i=rE(this.Tt,r);return t.put(i)})}Hs(e,t){let n=t.store("remoteDocuments"),r=[];return n.X((e,n)=>{let i=t.store("remoteDocumentsV14"),s=(n.document?new B(P.fromString(n.document.name).popFirst(5)):n.noDocument?B.fromSegments(n.noDocument.path):n.unknownDocument?B.fromSegments(n.unknownDocument.path):I()).path.toArray(),a={prefixPath:s.slice(0,s.length-2),collectionGroup:s[s.length-2],documentId:s[s.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(i.put(a))}).next(()=>et.waitFor(r))}Js(e,t){var n;let r=t.store("mutations"),i=(n=this.Tt,new ip(n)),s=new iM(iL.qs,this.Tt.oe);return r.W().next(e=>{let n=new Map;return e.forEach(e=>{var t;let r=null!==(t=n.get(e.userId))&&void 0!==t?t:ng();rI(this.Tt,e).keys().forEach(e=>r=r.add(e)),n.set(e.userId,r)}),et.forEach(n,(e,n)=>{let r=new d(n),a=rC.ue(this.Tt,r),o=s.getIndexManager(r),l=r6.ue(r,this.Tt,o,s.referenceDelegate);return new iS(i,l,a,o).recalculateAndSaveOverlaysForDocumentKeys(new ru(t,ef.at),e).next()})})}}function iO(e){e.createObjectStore("targetDocuments",{keyPath:n3}).createIndex("documentTargetsIndex",n8,{unique:!0}),e.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",n4,{unique:!0}),e.createObjectStore("targetGlobal")}let iP="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class iq{constructor(e,t,n,r,i,s,a,o,l,u,c=15){var h;if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ys=i,this.window=s,this.document=a,this.Zs=l,this.Xs=u,this.ti=c,this.Cs=null,this.xs=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ei=null,this.inForeground=!1,this.ni=null,this.si=null,this.ii=Number.NEGATIVE_INFINITY,this.ri=e=>Promise.resolve(),!iq.C())throw new E(T.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new id(this,r),this.oi=t+"main",this.Tt=new rg(o),this.ui=new er(this.oi,this.ti,new iV(this.Tt)),this.Ns=new ii(this.referenceDelegate,this.Tt),this.remoteDocumentCache=(h=this.Tt,new ip(h)),this.$s=new rD,this.window&&this.window.localStorage?this.ci=this.window.localStorage:(this.ci=null,!1===u&&y("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.ai().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new E(T.FAILED_PRECONDITION,iP);return this.hi(),this.li(),this.fi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ns.getHighestSequenceNumber(e))}).then(e=>{this.Cs=new ef(e,this.Zs)}).then(()=>{this.xs=!0}).catch(e=>(this.ui&&this.ui.close(),Promise.reject(e)))}di(e){return this.ri=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.ui.L(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ys.enqueueAndForget(async()=>{this.started&&await this.ai()}))}ai(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>iB(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this._i(e).next(e=>{e||(this.isPrimary=!1,this.Ys.enqueueRetryable(()=>this.ri(!1)))})}).next(()=>this.wi(e)).next(t=>this.isPrimary&&!t?this.mi(e).next(()=>!1):!!t&&this.gi(e).next(()=>!0))).catch(e=>{if(ea(e))return p("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return p("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ys.enqueueRetryable(()=>this.ri(e)),this.isPrimary=e})}_i(e){return iU(e).get("owner").next(e=>et.resolve(this.yi(e)))}pi(e){return iB(e).delete(this.clientId)}async Ii(){if(this.isPrimary&&!this.Ti(this.ii,18e5)){this.ii=Date.now();let e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{let t=rc(e,"clientMetadata");return t.W().next(e=>{let n=this.Ei(e,18e5),r=e.filter(e=>-1===n.indexOf(e));return et.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.ci)for(let t of e)this.ci.removeItem(this.Ai(t.clientId))}}fi(){this.si=this.Ys.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.ai().then(()=>this.Ii()).then(()=>this.fi()))}yi(e){return!!e&&e.ownerId===this.clientId}wi(e){return this.Xs?et.resolve(!0):iU(e).get("owner").next(t=>{if(null!==t&&this.Ti(t.leaseTimestampMs,5e3)&&!this.Ri(t.ownerId)){if(this.yi(t)&&this.networkEnabled)return!0;if(!this.yi(t)){if(!t.allowTabSynchronization)throw new E(T.FAILED_PRECONDITION,iP);return!1}}return!(!this.networkEnabled||!this.inForeground)||iB(e).W().next(e=>void 0===this.Ei(e,5e3).find(e=>{if(this.clientId!==e.clientId){let t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&p("IndexedDbPersistence",`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.xs=!1,this.Pi(),this.si&&(this.si.cancel(),this.si=null),this.vi(),this.bi(),await this.ui.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{let t=new ru(e,ef.at);return this.mi(t).next(()=>this.pi(t))}),this.ui.close(),this.Vi()}Ei(e,t){return e.filter(e=>this.Ti(e.updateTimeMs,t)&&!this.Ri(e.clientId))}Si(){return this.runTransaction("getActiveClients","readonly",e=>iB(e).W().next(e=>this.Ei(e,18e5).map(e=>e.clientId)))}get started(){return this.xs}getMutationQueue(e,t){return r6.ue(e,this.Tt,t,this.referenceDelegate)}getTargetCache(){return this.Ns}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new rY(e,this.Tt.oe.databaseId)}getDocumentOverlayCache(e){return rC.ue(this.Tt,e)}getBundleCache(){return this.$s}runTransaction(e,t,n){var r;let i;p("IndexedDbPersistence","Starting transaction:",e);let s=15===(r=this.ti)?rl:14===r?ro:13===r?ro:12===r?ra:11===r?rs:void I();return this.ui.runTransaction(e,"readonly"===t?"readonly":"readwrite",s,r=>(i=new ru(r,this.Cs?this.Cs.next():ef.at),"readwrite-primary"===t?this._i(i).next(e=>!!e||this.wi(i)).next(t=>{if(!t)throw y(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ys.enqueueRetryable(()=>this.ri(!1)),new E(T.FAILED_PRECONDITION,J);return n(i)}).next(e=>this.gi(i).next(()=>e)):this.Di(i).next(()=>n(i)))).then(e=>(i.raiseOnCommittedEvent(),e))}Di(e){return iU(e).get("owner").next(e=>{if(null!==e&&this.Ti(e.leaseTimestampMs,5e3)&&!this.Ri(e.ownerId)&&!this.yi(e)&&!(this.Xs||this.allowTabSynchronization&&e.allowTabSynchronization))throw new E(T.FAILED_PRECONDITION,iP)})}gi(e){let t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return iU(e).put("owner",t)}static C(){return er.C()}mi(e){let t=iU(e);return t.get("owner").next(e=>this.yi(e)?(p("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):et.resolve())}Ti(e,t){let n=Date.now();return!(e<n-t)&&(!(e>n)||(y(`Detected an update time that is in the future: ${e} > ${n}`),!1))}hi(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.ni=()=>{this.Ys.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.ai()))},this.document.addEventListener("visibilitychange",this.ni),this.inForeground="visible"===this.document.visibilityState)}vi(){this.ni&&(this.document.removeEventListener("visibilitychange",this.ni),this.ni=null)}li(){var e;"function"==typeof(null===(e=this.window)||void 0===e?void 0:e.addEventListener)&&(this.ei=()=>{this.Pi();let e=/(?:Version|Mobile)\/1[456]/;u.isSafari()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ys.enterRestrictedMode(!0),this.Ys.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.ei))}bi(){this.ei&&(this.window.removeEventListener("pagehide",this.ei),this.ei=null)}Ri(e){var t;try{let n=null!==(null===(t=this.ci)||void 0===t?void 0:t.getItem(this.Ai(e)));return p("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(e){return y("IndexedDbPersistence","Failed to get zombied client id.",e),!1}}Pi(){if(this.ci)try{this.ci.setItem(this.Ai(this.clientId),String(Date.now()))}catch(e){y("Failed to set zombie client id.",e)}}Vi(){if(this.ci)try{this.ci.removeItem(this.Ai(this.clientId))}catch(e){}}Ai(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function iU(e){return rc(e,"owner")}function iB(e){return rc(e,"clientMetadata")}function iK(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iG{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Ci=n,this.xi=r}static Ni(e,t){let n=ng(),r=ng();for(let e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new iG(e,t.fromCache,n,r)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i${constructor(){this.ki=!1}initialize(e,t){this.$i=e,this.indexManager=t,this.ki=!0}getDocumentsMatchingQuery(e,t,n,r){return this.Mi(e,t).next(i=>i||this.Oi(e,t,r,n)).next(n=>n||this.Fi(e,t))}Mi(e,t){if(t_(t))return et.resolve(null);let n=tk(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(n=tk(t=tM(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{let i=ng(...r);return this.$i.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{let s=this.Bi(t,r);return this.Li(t,s,i,n.readTime)?this.Mi(e,tM(t,null,"F")):this.qi(e,s,t,n)}))})))}Oi(e,t,n,r){return t_(t)||r.isEqual(V.min())?this.Fi(e,t):this.$i.getDocuments(e,n).next(i=>{let s=this.Bi(t,i);return this.Li(t,s,n,r)?this.Fi(e,t):(g()<=l.LogLevel.DEBUG&&p("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),tV(t)),this.qi(e,s,t,W(r,-1)))})}Bi(e,t){let n=new tc(tq(e));return t.forEach((t,r)=>{tO(e,r)&&(n=n.add(r))}),n}Li(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Fi(e,t){return g()<=l.LogLevel.DEBUG&&p("QueryEngine","Using full collection scan to execute query:",tV(t)),this.$i.getDocumentsMatchingQuery(e,t,X.min())}qi(e,t,n,r){return this.$i.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iQ{constructor(e,t,n,r){this.persistence=e,this.Ui=t,this.Tt=r,this.Ki=new to(M),this.Gi=new no(e=>tw(e),tv),this.Qi=new Map,this.ji=e.getRemoteDocumentCache(),this.Ns=e.getTargetCache(),this.$s=e.getBundleCache(),this.zi(n)}zi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new iS(this.ji,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ji.setIndexManager(this.indexManager),this.Ui.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ki))}}async function iz(e,t){return await e.persistence.runTransaction("Handle user change","readonly",n=>{let r;return e.mutationQueue.getAllMutationBatches(n).next(i=>(r=i,e.zi(t),e.mutationQueue.getAllMutationBatches(n))).next(t=>{let i=[],s=[],a=ng();for(let e of r)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(n,a).next(e=>({Wi:e,removedBatchIds:i,addedBatchIds:s}))})})}function ij(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ns.getLastRemoteSnapshotVersion(t))}function iW(e,t,n){let r=ng(),i=ng();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=nl;return n.forEach((n,s)=>{let a=e.get(n);s.isFoundDocument()!==a.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(V.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!a.isValidDocument()||s.version.compareTo(a.version)>0||0===s.version.compareTo(a.version)&&a.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):p("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",s.version)}),{Hi:r,Ji:i}})}function iH(e,t){let n=e;return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.Ns.getTargetData(e,t).next(i=>i?(r=i,et.resolve(r)):n.Ns.allocateTargetId(e).next(i=>(r=new rm(t,i,0,e.currentSequenceNumber),n.Ns.addTargetData(e,r).next(()=>r))))}).then(e=>{let r=n.Ki.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ki=n.Ki.insert(e.targetId,e),n.Gi.set(t,e.targetId)),e})}async function iX(e,t,n){let r=e,i=r.Ki.get(t);try{n||await r.persistence.runTransaction("Release target",n?"readwrite":"readwrite-primary",e=>r.persistence.referenceDelegate.removeTarget(e,i))}catch(e){if(!ea(e))throw e;p("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}r.Ki=r.Ki.remove(t),r.Gi.delete(i.target)}function iY(e,t,n){let r=V.min(),i=ng();return e.persistence.runTransaction("Execute query","readonly",s=>(function(e,t,n){let r=e.Gi.get(n);return void 0!==r?et.resolve(e.Ki.get(r)):e.Ns.getTargetData(t,n)})(e,s,tk(t)).next(t=>{if(t)return r=t.lastLimboFreeSnapshotVersion,e.Ns.getMatchingKeysForTargetId(s,t.targetId).next(e=>{i=e})}).next(()=>e.Ui.getDocumentsMatchingQuery(s,t,n?r:V.min(),n?i:ng())).next(n=>(i0(e,tP(t),n),{documents:n,Yi:i})))}function iJ(e,t){let n=e.Ns,r=e.Ki.get(t);return r?Promise.resolve(r.target):e.persistence.runTransaction("Get target data","readonly",e=>n.ie(e,t).next(e=>e?e.target:null))}function iZ(e,t){let n=e.Qi.get(t)||V.min();return e.persistence.runTransaction("Get new document changes","readonly",r=>e.ji.getAllFromCollectionGroup(r,t,W(n,-1),Number.MAX_SAFE_INTEGER)).then(n=>(i0(e,t,n),n))}function i0(e,t,n){let r=e.Qi.get(t)||V.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Qi.set(t,r)}async function i1(e,t,n,r){let i=ng(),s=nl;for(let e of n){let n=t.Zi(e.metadata.name);e.document&&(i=i.add(n));let r=t.Xi(e);r.setReadTime(t.tr(e.metadata.readTime)),s=s.insert(n,r)}let a=e.ji.newChangeBuffer({trackRemovals:!0}),o=await iH(e,tk(tx(P.fromString(`__bundle__/docs/${r}`))));return e.persistence.runTransaction("Apply bundle documents","readwrite",t=>iW(t,a,s).next(e=>(a.apply(t),e)).next(n=>e.Ns.removeMatchingKeysForTargetId(t,o.targetId).next(()=>e.Ns.addMatchingKeys(t,i,o.targetId)).next(()=>e.localDocuments.getLocalViewOfDocuments(t,n.Hi,n.Ji)).next(()=>n.Hi)))}async function i2(e,t,n=ng()){let r=await iH(e,tk(rb(t.bundledQuery))),i=e;return i.persistence.runTransaction("Save named query","readwrite",e=>{let s=nF(t.readTime);if(r.snapshotVersion.compareTo(s)>=0)return i.$s.saveNamedQuery(e,t);let a=r.withResumeToken(e_.EMPTY_BYTE_STRING,s);return i.Ki=i.Ki.insert(a.targetId,a),i.Ns.updateTargetData(e,a).next(()=>i.Ns.removeMatchingKeysForTargetId(e,r.targetId)).next(()=>i.Ns.addMatchingKeys(e,n,r.targetId)).next(()=>i.$s.saveNamedQuery(e,t))})}function i5(e,t){return`firestore_clients_${e}_${t}`}function i4(e,t,n){let r=`firestore_mutations_${e}_${n}`;return t.isAuthenticated()&&(r+=`_${t.uid}`),r}function i3(e,t){return`firestore_targets_${e}_${t}`}class i8{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static er(e,t,n){let r=JSON.parse(n),i,s="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return s&&r.error&&(s="string"==typeof r.error.message&&"string"==typeof r.error.code)&&(i=new E(r.error.code,r.error.message)),s?new i8(e,t,r.state,i):(y("SharedClientState",`Failed to parse mutation state for ID '${t}': ${n}`),null)}nr(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class i6{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static er(e,t){let n=JSON.parse(t),r,i="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return i&&n.error&&(i="string"==typeof n.error.message&&"string"==typeof n.error.code)&&(r=new E(n.error.code,n.error.message)),i?new i6(e,n.state,r):(y("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}nr(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class i9{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static er(e,t){let n=JSON.parse(t),r="object"==typeof n&&n.activeTargetIds instanceof Array,i=np;for(let e=0;r&&e<n.activeTargetIds.length;++e)r=eS(n.activeTargetIds[e]),i=i.add(n.activeTargetIds[e]);return r?new i9(e,i):(y("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class i7{constructor(e,t){this.clientId=e,this.onlineState=t}static er(e){let t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new i7(t.clientId,t.onlineState):(y("SharedClientState",`Failed to parse online state: ${e}`),null)}}class se{constructor(){this.activeTargetIds=np}sr(e){this.activeTargetIds=this.activeTargetIds.add(e)}ir(e){this.activeTargetIds=this.activeTargetIds.delete(e)}nr(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class st{constructor(e,t,n,r,i){this.window=e,this.Ys=t,this.persistenceKey=n,this.rr=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ur=this.cr.bind(this),this.ar=new to(M),this.started=!1,this.hr=[];let s=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.lr=i5(this.persistenceKey,this.rr),this.dr=`firestore_sequence_number_${this.persistenceKey}`,this.ar=this.ar.insert(this.rr,new se),this._r=RegExp(`^firestore_clients_${s}_([^_]*)$`),this.wr=RegExp(`^firestore_mutations_${s}_(\\d+)(?:_(.*))?$`),this.mr=RegExp(`^firestore_targets_${s}_(\\d+)$`),this.gr=`firestore_online_state_${this.persistenceKey}`,this.yr=`firestore_bundle_loaded_v2_${this.persistenceKey}`,this.window.addEventListener("storage",this.ur)}static C(e){return!(!e||!e.localStorage)}async start(){let e=await this.syncEngine.Si();for(let t of e){if(t===this.rr)continue;let e=this.getItem(i5(this.persistenceKey,t));if(e){let n=i9.er(t,e);n&&(this.ar=this.ar.insert(n.clientId,n))}}this.pr();let t=this.storage.getItem(this.gr);if(t){let e=this.Ir(t);e&&this.Tr(e)}for(let e of this.hr)this.cr(e);this.hr=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.dr,JSON.stringify(e))}getAllActiveQueryTargets(){return this.Er(this.ar)}isActiveQueryTarget(e){let t=!1;return this.ar.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.Ar(e,"pending")}updateMutationState(e,t,n){this.Ar(e,t,n),this.Rr(e)}addLocalQueryTarget(e){let t="not-current";if(this.isActiveQueryTarget(e)){let n=this.storage.getItem(i3(this.persistenceKey,e));if(n){let r=i6.er(e,n);r&&(t=r.state)}}return this.Pr.sr(e),this.pr(),t}removeLocalQueryTarget(e){this.Pr.ir(e),this.pr()}isLocalQueryTarget(e){return this.Pr.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(i3(this.persistenceKey,e))}updateQueryState(e,t,n){this.vr(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.Rr(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.br(e)}notifyBundleLoaded(e){this.Vr(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ur),this.removeItem(this.lr),this.started=!1)}getItem(e){let t=this.storage.getItem(e);return p("SharedClientState","READ",e,t),t}setItem(e,t){p("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){p("SharedClientState","REMOVE",e),this.storage.removeItem(e)}cr(e){if(e.storageArea===this.storage){if(p("SharedClientState","EVENT",e.key,e.newValue),e.key===this.lr)return void y("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ys.enqueueRetryable(async()=>{if(this.started){if(null!==e.key){if(this._r.test(e.key)){if(null==e.newValue){let t=this.Sr(e.key);return this.Dr(t,null)}{let t=this.Cr(e.key,e.newValue);if(t)return this.Dr(t.clientId,t)}}else if(this.wr.test(e.key)){if(null!==e.newValue){let t=this.Nr(e.key,e.newValue);if(t)return this.kr(t)}}else if(this.mr.test(e.key)){if(null!==e.newValue){let t=this.$r(e.key,e.newValue);if(t)return this.Mr(t)}}else if(e.key===this.gr){if(null!==e.newValue){let t=this.Ir(e.newValue);if(t)return this.Tr(t)}}else if(e.key===this.dr){let t=function(e){let t=ef.at;if(null!=e)try{let n=JSON.parse(e);"number"==typeof n||I(),t=n}catch(e){y("SharedClientState","Failed to read sequence number from WebStorage",e)}return t}(e.newValue);t!==ef.at&&this.sequenceNumberHandler(t)}else if(e.key===this.yr){let t=this.Or(e.newValue);await Promise.all(t.map(e=>this.syncEngine.Fr(e)))}}}else this.hr.push(e)})}}get Pr(){return this.ar.get(this.rr)}pr(){this.setItem(this.lr,this.Pr.nr())}Ar(e,t,n){let r=new i8(this.currentUser,e,t,n),i=i4(this.persistenceKey,this.currentUser,e);this.setItem(i,r.nr())}Rr(e){let t=i4(this.persistenceKey,this.currentUser,e);this.removeItem(t)}br(e){let t={clientId:this.rr,onlineState:e};this.storage.setItem(this.gr,JSON.stringify(t))}vr(e,t,n){let r=i3(this.persistenceKey,e),i=new i6(e,t,n);this.setItem(r,i.nr())}Vr(e){let t=JSON.stringify(Array.from(e));this.setItem(this.yr,t)}Sr(e){let t=this._r.exec(e);return t?t[1]:null}Cr(e,t){let n=this.Sr(e);return i9.er(n,t)}Nr(e,t){let n=this.wr.exec(e),r=Number(n[1]),i=void 0!==n[2]?n[2]:null;return i8.er(new d(i),r,t)}$r(e,t){let n=this.mr.exec(e),r=Number(n[1]);return i6.er(r,t)}Ir(e){return i7.er(e)}Or(e){return JSON.parse(e)}async kr(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Br(e.batchId,e.state,e.error);p("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Mr(e){return this.syncEngine.Lr(e.targetId,e.state,e.error)}Dr(e,t){let n=t?this.ar.insert(e,t):this.ar.remove(e),r=this.Er(this.ar),i=this.Er(n),s=[],a=[];return i.forEach(e=>{r.has(e)||s.push(e)}),r.forEach(e=>{i.has(e)||a.push(e)}),this.syncEngine.qr(s,a).then(()=>{this.ar=n})}Tr(e){this.ar.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}Er(e){let t=np;return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class sn{constructor(){this.Ur=new se,this.Kr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e){return this.Ur.sr(e),this.Kr[e]||"not-current"}updateQueryState(e,t,n){this.Kr[e]=t}removeLocalQueryTarget(e){this.Ur.ir(e)}isLocalQueryTarget(e){return this.Ur.activeTargetIds.has(e)}clearQueryState(e){delete this.Kr[e]}getAllActiveQueryTargets(){return this.Ur.activeTargetIds}isActiveQueryTarget(e){return this.Ur.activeTargetIds.has(e)}start(){return this.Ur=new se,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{Gr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(){this.Qr=()=>this.jr(),this.zr=()=>this.Wr(),this.Hr=[],this.Jr()}Gr(e){this.Hr.push(e)}shutdown(){window.removeEventListener("online",this.Qr),window.removeEventListener("offline",this.zr)}Jr(){window.addEventListener("online",this.Qr),window.addEventListener("offline",this.zr)}jr(){for(let e of(p("ConnectivityMonitor","Network connectivity changed: AVAILABLE"),this.Hr))e(0)}Wr(){for(let e of(p("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE"),this.Hr))e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ss=null;function sa(){return null===ss?ss=268435456+Math.round(2147483648*Math.random()):ss++,"0x"+ss.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let so={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(e){this.Yr=e.Yr,this.Zr=e.Zr}Xr(e){this.eo=e}no(e){this.so=e}onMessage(e){this.io=e}close(){this.Zr()}send(e){this.Yr(e)}ro(){this.eo()}oo(e){this.so(e)}uo(e){this.io(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let su="WebChannelConnection";class sc extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http";this.co=t+"://"+e.host,this.ao="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get ho(){return!1}lo(e,t,n,r,i){let s=sa(),a=this.fo(e,t);p("RestConnection",`Sending RPC '${e}' ${s}:`,a,n);let o={};return this._o(o,r,i),this.wo(e,a,o,n).then(t=>(p("RestConnection",`Received RPC '${e}' ${s}: `,t),t),t=>{throw w("RestConnection",`RPC '${e}' ${s} failed with error: `,t,"url: ",a,"request:",n),t})}mo(e,t,n,r,i,s){return this.lo(e,t,n,r,i)}_o(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+f,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}fo(e,t){let n=so[e];return`${this.co}/v1/${t}:${n}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}wo(e,t,n,r){let i=sa();return new Promise((s,a)=>{let o=new c.XhrIo;o.setWithCredentials(!0),o.listenOnce(c.EventType.COMPLETE,()=>{try{switch(o.getLastErrorCode()){case c.ErrorCode.NO_ERROR:let t=o.getResponseJson();p(su,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case c.ErrorCode.TIMEOUT:p(su,`RPC '${e}' ${i} timed out`),a(new E(T.DEADLINE_EXCEEDED,"Request time out"));break;case c.ErrorCode.HTTP_ERROR:let n=o.getStatus();if(p(su,`RPC '${e}' ${i} failed with status:`,n,"response text:",o.getResponseText()),n>0){let e=o.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=null==e?void 0:e.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(T).indexOf(t)>=0?t:T.UNKNOWN}(t.status);a(new E(e,t.message))}else a(new E(T.UNKNOWN,"Server responded with status "+o.getStatus()))}else a(new E(T.UNAVAILABLE,"Connection failed."));break;default:I()}}finally{p(su,`RPC '${e}' ${i} completed.`)}});let l=JSON.stringify(r);p(su,`RPC '${e}' ${i} sending request:`,r),o.send(t,"POST",l,n,15)})}yo(e,t,n){let i=sa(),s=[this.co,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=c.createWebChannelTransport(),o=c.getStatEventTarget(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(l.xmlHttpFactory=new c.FetchXmlHttpFactory({})),this._o(l.initMessageHeaders,t,n),l.encodeInitMessageHeaders=!0;let u=s.join("");p(su,`Creating RPC '${e}' stream ${i}: ${u}`,l);let h=a.createWebChannel(u,l),d=!1,f=!1,m=new sl({Yr:t=>{f?p(su,`Not sending because RPC '${e}' stream ${i} is closed:`,t):(d||(p(su,`Opening RPC '${e}' stream ${i} transport.`),h.open(),d=!0),p(su,`RPC '${e}' stream ${i} sending:`,t),h.send(t))},Zr:()=>h.close()}),g=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return g(h,c.WebChannel.EventType.OPEN,()=>{f||p(su,`RPC '${e}' stream ${i} transport opened.`)}),g(h,c.WebChannel.EventType.CLOSE,()=>{f||(f=!0,p(su,`RPC '${e}' stream ${i} transport closed`),m.oo())}),g(h,c.WebChannel.EventType.ERROR,t=>{f||(f=!0,w(su,`RPC '${e}' stream ${i} transport errored:`,t),m.oo(new E(T.UNAVAILABLE,"The operation could not be completed")))}),g(h,c.WebChannel.EventType.MESSAGE,t=>{var n;if(!f){let s=t.data[0];s||I();let a=s.error||(null===(n=s[0])||void 0===n?void 0:n.error);if(a){p(su,`RPC '${e}' stream ${i} received error:`,a);let t=a.status,n=function(e){let t=r[e];if(void 0!==t)return na(t)}(t),s=a.message;void 0===n&&(n=T.INTERNAL,s="Unknown error status: "+t+" with message "+a.message),f=!0,m.oo(new E(n,s)),h.close()}else p(su,`RPC '${e}' stream ${i} received:`,s),m.uo(s)}}),g(o,c.Event.STAT_EVENT,t=>{t.stat===c.Stat.PROXY?p(su,`RPC '${e}' stream ${i} detected buffering proxy`):t.stat===c.Stat.NOPROXY&&p(su,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{m.ro()},0),m}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh(){return"undefined"!=typeof window?window:null}function sd(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sf(e){return new nN(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sm{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Ys=e,this.timerId=t,this.po=n,this.Io=r,this.To=i,this.Eo=0,this.Ao=null,this.Ro=Date.now(),this.reset()}reset(){this.Eo=0}Po(){this.Eo=this.To}vo(e){this.cancel();let t=Math.floor(this.Eo+this.bo()),n=Math.max(0,Date.now()-this.Ro),r=Math.max(0,t-n);r>0&&p("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Eo} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.Ao=this.Ys.enqueueAfterDelay(this.timerId,r,()=>(this.Ro=Date.now(),e())),this.Eo*=this.Io,this.Eo<this.po&&(this.Eo=this.po),this.Eo>this.To&&(this.Eo=this.To)}Vo(){null!==this.Ao&&(this.Ao.skipDelay(),this.Ao=null)}cancel(){null!==this.Ao&&(this.Ao.cancel(),this.Ao=null)}bo(){return(Math.random()-.5)*this.Eo}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(e,t,n,r,i,s,a,o){this.Ys=e,this.So=n,this.Do=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.Co=0,this.xo=null,this.No=null,this.stream=null,this.ko=new sm(e,t)}$o(){return 1===this.state||5===this.state||this.Mo()}Mo(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Oo()}async stop(){this.$o()&&await this.close(0)}Fo(){this.state=0,this.ko.reset()}Bo(){this.Mo()&&null===this.xo&&(this.xo=this.Ys.enqueueAfterDelay(this.So,6e4,()=>this.Lo()))}qo(e){this.Uo(),this.stream.send(e)}async Lo(){if(this.Mo())return this.close(0)}Uo(){this.xo&&(this.xo.cancel(),this.xo=null)}Ko(){this.No&&(this.No.cancel(),this.No=null)}async close(e,t){this.Uo(),this.Ko(),this.ko.cancel(),this.Co++,4!==e?this.ko.reset():t&&t.code===T.RESOURCE_EXHAUSTED?(y(t.toString()),y("Using maximum backoff delay to prevent overloading the backend."),this.ko.Po()):t&&t.code===T.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.Go(),this.stream.close(),this.stream=null),this.state=e,await this.listener.no(t)}Go(){}auth(){this.state=1;let e=this.Qo(this.Co),t=this.Co;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.Co===t&&this.jo(e,n)},t=>{e(()=>{let e=new E(T.UNKNOWN,"Fetching auth token failed: "+t.message);return this.zo(e)})})}jo(e,t){let n=this.Qo(this.Co);this.stream=this.Wo(e,t),this.stream.Xr(()=>{n(()=>(this.state=2,this.No=this.Ys.enqueueAfterDelay(this.Do,1e4,()=>(this.Mo()&&(this.state=3),Promise.resolve())),this.listener.Xr()))}),this.stream.no(e=>{n(()=>this.zo(e))}),this.stream.onMessage(e=>{n(()=>this.onMessage(e))})}Oo(){this.state=5,this.ko.vo(async()=>{this.state=0,this.start()})}zo(e){return p("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Qo(e){return t=>{this.Ys.enqueueAndForget(()=>this.Co===e?t():(p("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class sp extends sg{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.Tt=i}Wo(e,t){return this.connection.yo("Listen",e,t)}onMessage(e){this.ko.reset();let t=function(e,t){let n;if("targetChange"in t){var r,i;t.targetChange;let s="NO_CHANGE"===(r=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:I(),a=t.targetChange.targetIds||[],o=(i=t.targetChange.resumeToken,e.yt?(void 0===i||"string"==typeof i||I(),e_.fromBase64String(i||"")):(void 0===i||i instanceof Uint8Array||I(),e_.fromUint8Array(i||new Uint8Array))),l=t.targetChange.cause,u=l&&function(e){let t=void 0===e.code?T.UNKNOWN:na(e.code);return new E(t,e.message||"")}(l);n=new nT(s,a,o,u||null)}else if("documentChange"in t){t.documentChange;let r=t.documentChange;r.document,r.document.name,r.document.updateTime;let i=nV(e,r.document.name),s=nF(r.document.updateTime),a=r.document.createTime?nF(r.document.createTime):V.min(),o=new tm({mapValue:{fields:r.document.fields}}),l=tg.newFoundDocument(i,s,a,o),u=r.targetIds||[],c=r.removedTargetIds||[];n=new nv(u,c,l.key,l)}else if("documentDelete"in t){t.documentDelete;let r=t.documentDelete;r.document;let i=nV(e,r.document),s=r.readTime?nF(r.readTime):V.min(),a=tg.newNoDocument(i,s),o=r.removedTargetIds||[];n=new nv([],o,a.key,a)}else if("documentRemove"in t){t.documentRemove;let r=t.documentRemove;r.document;let i=nV(e,r.document),s=r.removedTargetIds||[];n=new nv([],s,i,null)}else{if(!("filter"in t))return I();{t.filter;let e=t.filter;e.targetId;let r=e.count||0,i=new ni(r),s=e.targetId;n=new nI(s,i)}}return n}(this.Tt,e),n=function(e){if(!("targetChange"in e))return V.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?V.min():t.readTime?nF(t.readTime):V.min()}(e);return this.listener.Ho(t,n)}Jo(e){let t={};t.database=nq(this.Tt),t.addTarget=function(e,t){let n;let r=t.target;return(n=tI(r)?{documents:nQ(e,r)}:{query:nz(e,r)}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0?n.resumeToken=nk(e,t.resumeToken):t.snapshotVersion.compareTo(V.min())>0&&(n.readTime=nC(e,t.snapshotVersion.toTimestamp())),n}(this.Tt,e);let n=function(e,t){let n=function(e,t){switch(t){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return I()}}(0,t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.Tt,e);n&&(t.labels=n),this.qo(t)}Yo(e){let t={};t.database=nq(this.Tt),t.removeTarget=e,this.qo(t)}}class sy extends sg{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.Tt=i,this.Zo=!1}get Xo(){return this.Zo}start(){this.Zo=!1,this.lastStreamToken=void 0,super.start()}Go(){this.Zo&&this.tu([])}Wo(e,t){return this.connection.yo("Write",e,t)}onMessage(e){var t,n;if(e.streamToken||I(),this.lastStreamToken=e.streamToken,this.Zo){this.ko.reset();let r=(t=e.writeResults,n=e.commitTime,t&&t.length>0?(void 0!==n||I(),t.map(e=>{let t;return(t=e.updateTime?nF(e.updateTime):nF(n)).isEqual(V.min())&&(t=nF(n)),new t0(t,e.transformResults||[])})):[]),i=nF(e.commitTime);return this.listener.eu(i,r)}return e.writeResults&&0!==e.writeResults.length&&I(),this.Zo=!0,this.listener.nu()}su(){let e={};e.database=nq(this.Tt),this.qo(e)}tu(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>nG(this.Tt,e))};this.qo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sw extends class{}{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.Tt=r,this.iu=!1}ru(){if(this.iu)throw new E(T.FAILED_PRECONDITION,"The client has already been terminated.")}lo(e,t,n){return this.ru(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection.lo(e,t,n,r,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===T.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new E(T.UNKNOWN,e.toString())})}mo(e,t,n,r){return this.ru(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.mo(e,t,n,i,s,r)).catch(e=>{throw"FirebaseError"===e.name?(e.code===T.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new E(T.UNKNOWN,e.toString())})}terminate(){this.iu=!0}}async function sv(e,t,n){var r,i;let s=function(e,t,n){let r=nz(e,t),i=[];return n.forEach(e=>{"count"===e.lt?i.push({alias:e.alias.canonicalString(),count:{}}):"avg"===e.lt?i.push({alias:e.alias.canonicalString(),avg:{field:nW(e.fieldPath)}}):"sum"===e.lt&&i.push({alias:e.alias.canonicalString(),sum:{field:nW(e.fieldPath)}})}),{structuredAggregationQuery:{aggregations:i,structuredQuery:r.structuredQuery},parent:r.parent}}(e.Tt,tk(t),n),a=s.parent;e.connection.ho||delete s.parent;let o=(await e.mo("RunAggregationQuery",a,s,1)).filter(e=>!!e.result);return 1===o.length||I(),(r=o[0]).result,r.result.aggregateFields,new tm({mapValue:{fields:null===(i=r.result)||void 0===i?void 0:i.aggregateFields}})}class sI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.ou=0,this.uu=null,this.cu=!0}au(){0===this.ou&&(this.hu("Unknown"),this.uu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.uu=null,this.lu("Backend didn't respond within 10 seconds."),this.hu("Offline"),Promise.resolve())))}fu(e){"Online"===this.state?this.hu("Unknown"):(this.ou++,this.ou>=1&&(this.du(),this.lu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.hu("Offline")))}set(e){this.du(),this.ou=0,"Online"===e&&(this.cu=!1),this.hu(e)}hu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}lu(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.cu?(y(t),this.cu=!1):p("OnlineStateTracker",t)}du(){null!==this.uu&&(this.uu.cancel(),this.uu=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this._u=[],this.wu=new Map,this.mu=new Set,this.gu=[],this.yu=i,this.yu.Gr(e=>{n.enqueueAndForget(async()=>{sC(this)&&(p("RemoteStore","Restarting streams for network reachability change."),await async function(e){e.mu.add(4),await sb(e),e.pu.set("Unknown"),e.mu.delete(4),await sE(e)}(this))})}),this.pu=new sI(n,r)}}async function sE(e){if(sC(e))for(let t of e.gu)await t(!0)}async function sb(e){for(let t of e.gu)await t(!1)}function sS(e,t){e.wu.has(t.targetId)||(e.wu.set(t.targetId,t),sN(e)?sA(e):sQ(e).Mo()&&s_(e,t))}function sx(e,t){let n=sQ(e);e.wu.delete(t),n.Mo()&&sD(e,t),0===e.wu.size&&(n.Mo()?n.Bo():sC(e)&&e.pu.set("Unknown"))}function s_(e,t){e.Iu.Ot(t.targetId),sQ(e).Jo(t)}function sD(e,t){e.Iu.Ot(t),sQ(e).Yo(t)}function sA(e){e.Iu=new nb({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ie:t=>e.wu.get(t)||null}),sQ(e).start(),e.pu.au()}function sN(e){return sC(e)&&!sQ(e).$o()&&e.wu.size>0}function sC(e){return 0===e.mu.size}async function sk(e){e.wu.forEach((t,n)=>{s_(e,t)})}async function sF(e,t){e.Iu=void 0,sN(e)?(e.pu.fu(t),sA(e)):e.pu.set("Unknown")}async function sM(e,t,n){if(e.pu.set("Online"),t instanceof nT&&2===t.state&&t.cause)try{await async function(e,t){let n=t.cause;for(let r of t.targetIds)e.wu.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.wu.delete(r),e.Iu.removeTarget(r))}(e,t)}catch(n){p("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await sR(e,n)}else if(t instanceof nv?e.Iu.Qt(t):t instanceof nI?e.Iu.Zt(t):e.Iu.Wt(t),!n.isEqual(V.min()))try{let t=await ij(e.localStore);n.compareTo(t)>=0&&await function(e,t){let n=e.Iu.ee(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){let i=e.wu.get(r);i&&e.wu.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach(t=>{let n=e.wu.get(t);if(!n)return;e.wu.set(t,n.withResumeToken(e_.EMPTY_BYTE_STRING,n.snapshotVersion)),sD(e,t);let r=new rm(n.target,t,1,n.sequenceNumber);s_(e,r)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){p("RemoteStore","Failed to raise snapshot:",t),await sR(e,t)}}async function sR(e,t,n){if(!ea(t))throw t;e.mu.add(1),await sb(e),e.pu.set("Offline"),n||(n=()=>ij(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{p("RemoteStore","Retrying IndexedDB access"),await n(),e.mu.delete(1),await sE(e)})}function sL(e,t){return t().catch(n=>sR(e,n,t))}async function sV(e){let t=sz(e),n=e._u.length>0?e._u[e._u.length-1].batchId:-1;for(;sC(e)&&e._u.length<10;)try{let r=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}(e.localStore,n);if(null===r){0===e._u.length&&t.Bo();break}n=r.batchId,function(e,t){e._u.push(t);let n=sz(e);n.Mo()&&n.Xo&&n.tu(t.mutations)}(e,r)}catch(t){await sR(e,t)}sO(e)&&sP(e)}function sO(e){return sC(e)&&!sz(e).$o()&&e._u.length>0}function sP(e){sz(e).start()}async function sq(e){sz(e).su()}async function sU(e){let t=sz(e);for(let n of e._u)t.tu(n.mutations)}async function sB(e,t,n){let r=e._u.shift(),i=rd.from(r,t,n);await sL(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await sV(e)}async function sK(e,t){t&&sz(e).Xo&&await async function(e,t){var n;if(ns(n=t.code)&&n!==T.ABORTED){let n=e._u.shift();sz(e).Fo(),await sL(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await sV(e)}}(e,t),sO(e)&&sP(e)}async function sG(e,t){e.asyncQueue.verifyOperationInProgress(),p("RemoteStore","RemoteStore received new credentials");let n=sC(e);e.mu.add(3),await sb(e),n&&e.pu.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.mu.delete(3),await sE(e)}async function s$(e,t){t?(e.mu.delete(2),await sE(e)):t||(e.mu.add(2),await sb(e),e.pu.set("Unknown"))}function sQ(e){var t,n,r;return e.Tu||(e.Tu=(t=e.datastore,n=e.asyncQueue,r={Xr:sk.bind(null,e),no:sF.bind(null,e),Ho:sM.bind(null,e)},t.ru(),new sp(n,t.connection,t.authCredentials,t.appCheckCredentials,t.Tt,r)),e.gu.push(async t=>{t?(e.Tu.Fo(),sN(e)?sA(e):e.pu.set("Unknown")):(await e.Tu.stop(),e.Iu=void 0)})),e.Tu}function sz(e){var t,n,r;return e.Eu||(e.Eu=(t=e.datastore,n=e.asyncQueue,r={Xr:sq.bind(null,e),no:sK.bind(null,e),nu:sU.bind(null,e),eu:sB.bind(null,e)},t.ru(),new sy(n,t.connection,t.authCredentials,t.appCheckCredentials,t.Tt,r)),e.gu.push(async t=>{t?(e.Eu.Fo(),await sV(e)):(await e.Eu.stop(),e._u.length>0&&(p("RemoteStore",`Stopping write stream with ${e._u.length} pending writes`),e._u=[]))})),e.Eu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sj{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new b,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}static createAndSchedule(e,t,n,r,i){let s=Date.now()+n,a=new sj(e,t,s,r,i);return a.start(n),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new E(T.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function sW(e,t){if(y("AsyncQueue",`${t}: ${e}`),ea(e))return new E(T.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sH{constructor(e){this.comparator=e?(t,n)=>e(t,n)||B.comparator(t.key,n.key):(e,t)=>B.comparator(e.key,t.key),this.keyedMap=nc(),this.sortedSet=new to(this.comparator)}static emptySet(e){return new sH(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof sH)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let n=new sH;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sX{constructor(){this.Au=new to(B.comparator)}track(e){let t=e.doc.key,n=this.Au.get(t);n?0!==e.type&&3===n.type?this.Au=this.Au.insert(t,e):3===e.type&&1!==n.type?this.Au=this.Au.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.Au=this.Au.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.Au=this.Au.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.Au=this.Au.remove(t):1===e.type&&2===n.type?this.Au=this.Au.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.Au=this.Au.insert(t,{type:2,doc:e.doc}):I():this.Au=this.Au.insert(t,e)}Ru(){let e=[];return this.Au.inorderTraversal((t,n)=>{e.push(n)}),e}}class sY{constructor(e,t,n,r,i,s,a,o,l){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=l}static fromInitialDocuments(e,t,n,r,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new sY(e,t,sH.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&tR(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sJ{constructor(){this.Pu=void 0,this.listeners=[]}}class sZ{constructor(){this.queries=new no(e=>tL(e),tR),this.onlineState="Unknown",this.vu=new Set}}async function s0(e,t){let n=t.query,r=!1,i=e.queries.get(n);if(i||(r=!0,i=new sJ),r)try{i.Pu=await e.onListen(n)}catch(n){let e=sW(n,`Initialization of query '${tV(t.query)}' failed`);return void t.onError(e)}e.queries.set(n,i),i.listeners.push(t),t.bu(e.onlineState),i.Pu&&t.Vu(i.Pu)&&s4(e)}async function s1(e,t){let n=t.query,r=!1,i=e.queries.get(n);if(i){let e=i.listeners.indexOf(t);e>=0&&(i.listeners.splice(e,1),r=0===i.listeners.length)}if(r)return e.queries.delete(n),e.onUnlisten(n)}function s2(e,t){let n=!1;for(let r of t){let t=r.query,i=e.queries.get(t);if(i){for(let e of i.listeners)e.Vu(r)&&(n=!0);i.Pu=r}}n&&s4(e)}function s5(e,t,n){let r=e.queries.get(t);if(r)for(let e of r.listeners)e.onError(n);e.queries.delete(t)}function s4(e){e.vu.forEach(e=>{e.next()})}class s3{constructor(e,t,n){this.query=e,this.Su=t,this.Du=!1,this.Cu=null,this.onlineState="Unknown",this.options=n||{}}Vu(e){if(!this.options.includeMetadataChanges){let t=[];for(let n of e.docChanges)3!==n.type&&t.push(n);e=new sY(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Du?this.xu(e)&&(this.Su.next(e),t=!0):this.Nu(e,this.onlineState)&&(this.ku(e),t=!0),this.Cu=e,t}onError(e){this.Su.error(e)}bu(e){this.onlineState=e;let t=!1;return this.Cu&&!this.Du&&this.Nu(this.Cu,e)&&(this.ku(this.Cu),t=!0),t}Nu(e,t){return!e.fromCache||(!this.options.$u||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}xu(e){if(e.docChanges.length>0)return!0;let t=this.Cu&&this.Cu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ku(e){e=sY.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Du=!0,this.Su.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s8{constructor(e,t){this.Mu=e,this.byteLength=t}Ou(){return"metadata"in this.Mu}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s6{constructor(e){this.Tt=e}Zi(e){return nV(this.Tt,e)}Xi(e){return e.metadata.exists?nK(this.Tt,e.document,!1):tg.newNoDocument(this.Zi(e.metadata.name),this.tr(e.metadata.readTime))}tr(e){return nF(e)}}class s9{constructor(e,t,n){this.Fu=e,this.localStore=t,this.Tt=n,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=s7(e)}Bu(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Mu.namedQuery)this.queries.push(e.Mu.namedQuery);else if(e.Mu.documentMetadata){this.documents.push({metadata:e.Mu.documentMetadata}),e.Mu.documentMetadata.exists||++t;let n=P.fromString(e.Mu.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.Mu.document&&(this.documents[this.documents.length-1].document=e.Mu.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}Lu(e){let t=new Map,n=new s6(this.Tt);for(let r of e)if(r.metadata.queries){let e=n.Zi(r.metadata.name);for(let n of r.metadata.queries){let r=(t.get(n)||ng()).add(e);t.set(n,r)}}return t}async complete(){let e=await i1(this.localStore,new s6(this.Tt),this.documents,this.Fu.id),t=this.Lu(this.documents);for(let e of this.queries)await i2(this.localStore,e,t.get(e.name));return this.progress.taskState="Success",{progress:this.progress,qu:this.collectionGroups,Uu:e}}}function s7(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.key=e}}class at{constructor(e){this.key=e}}class an{constructor(e,t){this.query=e,this.Ku=t,this.Gu=null,this.hasCachedResults=!1,this.current=!1,this.Qu=ng(),this.mutatedKeys=ng(),this.ju=tq(e),this.zu=new sH(this.ju)}get Wu(){return this.Ku}Hu(e,t){let n=t?t.Ju:new sX,r=t?t.zu:this.zu,i=t?t.mutatedKeys:this.mutatedKeys,s=r,a=!1,o="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,l="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{let u=r.get(e),c=tO(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),d=!!c&&(c.hasLocalMutations||this.mutatedKeys.has(c.key)&&c.hasCommittedMutations),f=!1;u&&c?u.data.isEqual(c.data)?h!==d&&(n.track({type:3,doc:c}),f=!0):this.Yu(u,c)||(n.track({type:2,doc:c}),f=!0,(o&&this.ju(c,o)>0||l&&0>this.ju(c,l))&&(a=!0)):!u&&c?(n.track({type:0,doc:c}),f=!0):u&&!c&&(n.track({type:1,doc:u}),f=!0,(o||l)&&(a=!0)),f&&(c?(s=s.add(c),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{zu:s,Ju:n,Li:a,mutatedKeys:i}}Yu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n){let r=this.zu;this.zu=e.zu,this.mutatedKeys=e.mutatedKeys;let i=e.Ju.Ru();i.sort((e,t)=>(function(e,t){let n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return I()}};return n(e)-n(t)})(e.type,t.type)||this.ju(e.doc,t.doc)),this.Zu(n);let s=t?this.Xu():[],a=0===this.Qu.size&&this.current?1:0,o=a!==this.Gu;return(this.Gu=a,0!==i.length||o)?{snapshot:new sY(this.query,e.zu,r,i,e.mutatedKeys,0===a,o,!1,!!n&&n.resumeToken.approximateByteSize()>0),tc:s}:{tc:s}}bu(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({zu:this.zu,Ju:new sX,mutatedKeys:this.mutatedKeys,Li:!1},!1)):{tc:[]}}ec(e){return!this.Ku.has(e)&&!!this.zu.has(e)&&!this.zu.get(e).hasLocalMutations}Zu(e){e&&(e.addedDocuments.forEach(e=>this.Ku=this.Ku.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ku=this.Ku.delete(e)),this.current=e.current)}Xu(){if(!this.current)return[];let e=this.Qu;this.Qu=ng(),this.zu.forEach(e=>{this.ec(e.key)&&(this.Qu=this.Qu.add(e.key))});let t=[];return e.forEach(e=>{this.Qu.has(e)||t.push(new at(e))}),this.Qu.forEach(n=>{e.has(n)||t.push(new ae(n))}),t}nc(e){this.Ku=e.Yi,this.Qu=ng();let t=this.Hu(e.documents);return this.applyChanges(t,!0)}sc(){return sY.fromInitialDocuments(this.query,this.zu,this.mutatedKeys,0===this.Gu,this.hasCachedResults)}}class ar{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class ai{constructor(e){this.key=e,this.ic=!1}}class as{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.rc={},this.oc=new no(e=>tL(e),tR),this.uc=new Map,this.cc=new Set,this.ac=new to(B.comparator),this.hc=new Map,this.lc=new iD,this.fc={},this.dc=new Map,this._c=ir.Sn(),this.onlineState="Unknown",this.wc=void 0}get isPrimaryClient(){return!0===this.wc}}async function aa(e,t){let n,r;let i=aR(e),s=i.oc.get(t);if(s)n=s.targetId,i.sharedClientState.addLocalQueryTarget(n),r=s.view.sc();else{let e=await iH(i.localStore,tk(t));i.isPrimaryClient&&sS(i.remoteStore,e);let s=i.sharedClientState.addLocalQueryTarget(e.targetId);n=e.targetId,r=await ao(i,t,n,"current"===s,e.resumeToken)}return r}async function ao(e,t,n,r,i){e.mc=(t,n,r)=>(async function(e,t,n,r){let i=t.view.Hu(n);i.Li&&(i=await iY(e.localStore,t.query,!1).then(({documents:e})=>t.view.Hu(e,i)));let s=r&&r.targetChanges.get(t.targetId),a=t.view.applyChanges(i,e.isPrimaryClient,s);return aI(e,t.targetId,a.tc),a.snapshot})(e,t,n,r);let s=await iY(e.localStore,t,!0),a=new an(t,s.Yi),o=a.Hu(s.documents),l=nw.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),u=a.applyChanges(o,e.isPrimaryClient,l);aI(e,n,u.tc);let c=new ar(t,n,a);return e.oc.set(t,c),e.uc.has(n)?e.uc.get(n).push(t):e.uc.set(n,[t]),u.snapshot}async function al(e,t){let n=e.oc.get(t),r=e.uc.get(n.targetId);if(r.length>1)return e.uc.set(n.targetId,r.filter(e=>!tR(e,t))),void e.oc.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(n.targetId),e.sharedClientState.isActiveQueryTarget(n.targetId)||await iX(e.localStore,n.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(n.targetId),sx(e.remoteStore,n.targetId),aw(e,n.targetId)}).catch(ee)):(aw(e,n.targetId),await iX(e.localStore,n.targetId,!0))}async function au(e,t,n){let r=aL(e);try{var i,s;let e;let a=await function(e,t){let n,r;let i=L.now(),s=t.reduce((e,t)=>e.add(t.key),ng());return e.persistence.runTransaction("Locally write mutations","readwrite",a=>{let o=nl,l=ng();return e.ji.getEntries(a,s).next(e=>{(o=e).forEach((e,t)=>{t.isValidDocument()||(l=l.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(a,o)).next(r=>{n=r;let s=[];for(let e of t){let t=function(e,t){let n=null;for(let r of e.fieldTransforms){let e=t.data.field(r.field),i=t$(r.transform,e||null);null!=i&&(null===n&&(n=tm.empty()),n.set(r.field,i))}return n||null}(e,n.get(e.key).overlayedDocument);null!=t&&s.push(new t9(e.key,t,function e(t){let n=[];return eI(t.fields,(t,r)=>{let i=new U([t]);if(ez(r)){let t=e(r.mapValue).fields;if(0===t.length)n.push(i);else for(let e of t)n.push(i.child(e))}else n.push(i)}),new tf(n)}(t.value.mapValue),t1.exists(!0)))}return e.mutationQueue.addMutationBatch(a,i,s,t)}).next(t=>{r=t;let i=t.applyToLocalDocumentSet(n,l);return e.documentOverlayCache.saveOverlays(a,t.batchId,i)})}).then(()=>({batchId:r.batchId,changes:nh(n)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(a.batchId),i=r,s=a.batchId,(e=i.fc[i.currentUser.toKey()])||(e=new to(M)),e=e.insert(s,n),i.fc[i.currentUser.toKey()]=e,await aE(r,a.changes),await sV(r.remoteStore)}catch(t){let e=sW(t,"Failed to persist write");n.reject(e)}}async function ac(e,t){try{let n=await function(e,t){let n=e,r=t.snapshotVersion,i=n.Ki;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{let s=n.ji.newChangeBuffer({trackRemovals:!0});i=n.Ki;let a=[];t.targetChanges.forEach((s,o)=>{var l;let u=i.get(o);if(!u)return;a.push(n.Ns.removeMatchingKeys(e,s.removedDocuments,o).next(()=>n.Ns.addMatchingKeys(e,s.addedDocuments,o)));let c=u.withSequenceNumber(e.currentSequenceNumber);t.targetMismatches.has(o)?c=c.withResumeToken(e_.EMPTY_BYTE_STRING,V.min()).withLastLimboFreeSnapshotVersion(V.min()):s.resumeToken.approximateByteSize()>0&&(c=c.withResumeToken(s.resumeToken,r)),i=i.insert(o,c),l=c,(0===u.resumeToken.approximateByteSize()||l.snapshotVersion.toMicroseconds()-u.snapshotVersion.toMicroseconds()>=3e8||s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size>0)&&a.push(n.Ns.updateTargetData(e,c))});let o=nl,l=ng();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),a.push(iW(e,s,t.documentUpdates).next(e=>{o=e.Hi,l=e.Ji})),!r.isEqual(V.min())){let t=n.Ns.getLastRemoteSnapshotVersion(e).next(t=>n.Ns.setTargetsMetadata(e,e.currentSequenceNumber,r));a.push(t)}return et.waitFor(a).next(()=>s.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,o,l)).next(()=>o)}).then(e=>(n.Ki=i,e))}(e.localStore,t);t.targetChanges.forEach((t,n)=>{let r=e.hc.get(n);r&&(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1||I(),t.addedDocuments.size>0?r.ic=!0:t.modifiedDocuments.size>0?r.ic||I():t.removedDocuments.size>0&&(r.ic||I(),r.ic=!1))}),await aE(e,n,t)}catch(e){await ee(e)}}function ah(e,t,n){let r=e;if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){let e=[];r.oc.forEach((n,r)=>{let i=r.view.bu(t);i.snapshot&&e.push(i.snapshot)}),function(e,t){let n=e;n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(let e of n.listeners)e.bu(t)&&(r=!0)}),r&&s4(n)}(r.eventManager,t),e.length&&r.rc.Ho(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function ad(e,t,n){let r=e;r.sharedClientState.updateQueryState(t,"rejected",n);let i=r.hc.get(t),s=i&&i.key;if(s){let e=new to(B.comparator);e=e.insert(s,tg.newNoDocument(s,V.min()));let n=ng().add(s),i=new ny(V.min(),new Map,new tc(M),e,n);await ac(r,i),r.ac=r.ac.remove(s),r.hc.delete(t),aT(r)}else await iX(r.localStore,t,!1).then(()=>aw(r,t,n)).catch(ee)}async function af(e,t){var n;let r=t.batch.batchId;try{let i=await (n=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let r=t.batch.keys(),i=n.ji.newChangeBuffer({trackRemovals:!0});return(function(e,t,n,r){let i=n.batch,s=i.keys(),a=et.resolve();return s.forEach(e=>{a=a.next(()=>r.getEntry(t,e)).next(t=>{let s=n.docVersions.get(e);null!==s||I(),0>t.version.compareTo(s)&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,i))})(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=ng();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))});ay(e,r,null),ap(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await aE(e,i)}catch(e){await ee(e)}}async function am(e,t,n){var r;try{let i=await (r=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let n;return r.mutationQueue.lookupMutationBatch(e,t).next(t=>(null!==t||I(),n=t.keys(),r.mutationQueue.removeMutationBatch(e,t))).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,n)).next(()=>r.localDocuments.getDocuments(e,n))});ay(e,t,n),ap(e,t),e.sharedClientState.updateMutationState(t,"rejected",n),await aE(e,i)}catch(e){await ee(e)}}async function ag(e,t){var n;sC(e.remoteStore)||p("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{let r=await (n=e.localStore).persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>n.mutationQueue.getHighestUnacknowledgedBatchId(e));if(-1===r)return void t.resolve();let i=e.dc.get(r)||[];i.push(t),e.dc.set(r,i)}catch(n){let e=sW(n,"Initialization of waitForPendingWrites() operation failed");t.reject(e)}}function ap(e,t){(e.dc.get(t)||[]).forEach(e=>{e.resolve()}),e.dc.delete(t)}function ay(e,t,n){let r=e,i=r.fc[r.currentUser.toKey()];if(i){let e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.fc[r.currentUser.toKey()]=i}}function aw(e,t,n=null){for(let r of(e.sharedClientState.removeLocalQueryTarget(t),e.uc.get(t)))e.oc.delete(r),n&&e.rc.gc(r,n);e.uc.delete(t),e.isPrimaryClient&&e.lc.ds(t).forEach(t=>{e.lc.containsKey(t)||av(e,t)})}function av(e,t){e.cc.delete(t.path.canonicalString());let n=e.ac.get(t);null!==n&&(sx(e.remoteStore,n),e.ac=e.ac.remove(t),e.hc.delete(n),aT(e))}function aI(e,t,n){for(let r of n)r instanceof ae?(e.lc.addReference(r.key,t),function(e,t){let n=t.key,r=n.path.canonicalString();e.ac.get(n)||e.cc.has(r)||(p("SyncEngine","New document in limbo: "+n),e.cc.add(r),aT(e))}(e,r)):r instanceof at?(p("SyncEngine","Document no longer in limbo: "+r.key),e.lc.removeReference(r.key,t),e.lc.containsKey(r.key)||av(e,r.key)):I()}function aT(e){for(;e.cc.size>0&&e.ac.size<e.maxConcurrentLimboResolutions;){let t=e.cc.values().next().value;e.cc.delete(t);let n=new B(P.fromString(t)),r=e._c.next();e.hc.set(r,new ai(n)),e.ac=e.ac.insert(n,r),sS(e.remoteStore,new rm(tk(tx(n.path)),r,2,ef.at))}}async function aE(e,t,n){let r=[],i=[],s=[];e.oc.isEmpty()||(e.oc.forEach((a,o)=>{s.push(e.mc(o,t,n).then(t=>{if((t||n)&&e.isPrimaryClient&&e.sharedClientState.updateQueryState(o.targetId,(null==t?void 0:t.fromCache)?"not-current":"current"),t){r.push(t);let e=iG.Ni(o.targetId,t);i.push(e)}}))}),await Promise.all(s),e.rc.Ho(r),await async function(e,t){let n=e;try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>et.forEach(t,t=>et.forEach(t.Ci,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>et.forEach(t.xi,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!ea(e))throw e;p("LocalStore","Failed to update sequence numbers: "+e)}for(let e of t){let t=e.targetId;if(!e.fromCache){let e=n.Ki.get(t),r=e.snapshotVersion,i=e.withLastLimboFreeSnapshotVersion(r);n.Ki=n.Ki.insert(t,i)}}}(e.localStore,i))}async function ab(e,t){let n=e;if(!n.currentUser.isEqual(t)){p("SyncEngine","User change. New user:",t.toKey());let e=await iz(n.localStore,t);n.currentUser=t,n.dc.forEach(e=>{e.forEach(e=>{e.reject(new E(T.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),n.dc.clear(),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await aE(n,e.Wi)}}function aS(e,t){let n=e.hc.get(t);if(n&&n.ic)return ng().add(n.key);{let n=ng(),r=e.uc.get(t);if(!r)return n;for(let t of r){let r=e.oc.get(t);n=n.unionWith(r.view.Wu)}return n}}async function ax(e,t){let n=await iY(e.localStore,t.query,!0),r=t.view.nc(n);return e.isPrimaryClient&&aI(e,t.targetId,r.tc),r}async function a_(e,t){return iZ(e.localStore,t).then(t=>aE(e,t))}async function aD(e,t,n,r){let i=await function(e,t){let n=e.mutationQueue;return e.persistence.runTransaction("Lookup mutation documents","readonly",r=>n.An(r,t).next(t=>t?e.localDocuments.getDocuments(r,t):et.resolve(null)))}(e.localStore,t);null!==i?("pending"===n?await sV(e.remoteStore):"acknowledged"===n||"rejected"===n?(ay(e,t,r||null),ap(e,t),function(e,t){e.mutationQueue.Pn(t)}(e.localStore,t)):I(),await aE(e,i)):p("SyncEngine","Cannot apply mutation batch with id: "+t)}async function aA(e,t){let n=e;if(aR(n),aL(n),!0===t&&!0!==n.wc){let e=n.sharedClientState.getAllActiveQueryTargets(),t=await aN(n,e.toArray());for(let e of(n.wc=!0,await s$(n.remoteStore,!0),t))sS(n.remoteStore,e)}else if(!1===t&&!1!==n.wc){let e=[],t=Promise.resolve();n.uc.forEach((r,i)=>{n.sharedClientState.isLocalQueryTarget(i)?e.push(i):t=t.then(()=>(aw(n,i),iX(n.localStore,i,!0))),sx(n.remoteStore,i)}),await t,await aN(n,e),function(e){let t=e;t.hc.forEach((e,n)=>{sx(t.remoteStore,n)}),t.lc._s(),t.hc=new Map,t.ac=new to(B.comparator)}(n),n.wc=!1,await s$(n.remoteStore,!1)}}async function aN(e,t,n){let r=[],i=[];for(let n of t){let t;let s=e.uc.get(n);if(s&&0!==s.length)for(let n of(t=await iH(e.localStore,tk(s[0])),s)){let t=e.oc.get(n),r=await ax(e,t);r.snapshot&&i.push(r.snapshot)}else{let r=await iJ(e.localStore,n);t=await iH(e.localStore,r),await ao(e,aC(r),n,!1,t.resumeToken)}r.push(t)}return e.rc.Ho(i),r}function aC(e){var t,n,r,i,s,a,o;return t=e.path,n=e.collectionGroup,r=e.orderBy,i=e.filters,s=e.limit,a=e.startAt,o=e.endAt,new tS(t,n,r,i,s,"F",a,o)}function ak(e){return e.localStore.persistence.Si()}async function aF(e,t,n,r){if(e.wc)return void p("SyncEngine","Ignoring unexpected query state notification.");let i=e.uc.get(t);if(i&&i.length>0)switch(n){case"current":case"not-current":{let r=await iZ(e.localStore,tP(i[0])),s=ny.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,e_.EMPTY_BYTE_STRING);await aE(e,r,s);break}case"rejected":await iX(e.localStore,t,!0),aw(e,t,r);break;default:I()}}async function aM(e,t,n){let r=aR(e);if(r.wc){for(let e of t){if(r.uc.has(e)){p("SyncEngine","Adding an already active target "+e);continue}let t=await iJ(r.localStore,e),n=await iH(r.localStore,t);await ao(r,aC(t),n.targetId,!1,n.resumeToken),sS(r.remoteStore,n)}for(let e of n)r.uc.has(e)&&await iX(r.localStore,e,!1).then(()=>{sx(r.remoteStore,e),aw(r,e)}).catch(ee)}}function aR(e){let t=e;return t.remoteStore.remoteSyncer.applyRemoteEvent=ac.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=aS.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=ad.bind(null,t),t.rc.Ho=s2.bind(null,t.eventManager),t.rc.gc=s5.bind(null,t.eventManager),t}function aL(e){let t=e;return t.remoteStore.remoteSyncer.applySuccessfulWrite=af.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=am.bind(null,t),t}class aV{constructor(){this.synchronizeTabs=!1}async initialize(e){this.Tt=sf(e.databaseInfo.databaseId),this.sharedClientState=this.Ic(e),this.persistence=this.Tc(e),await this.persistence.start(),this.localStore=this.Ec(e),this.gcScheduler=this.Ac(e,this.localStore),this.indexBackfillerScheduler=this.Rc(e,this.localStore)}Ac(e,t){return null}Rc(e,t){return null}Ec(e){var t,n,r,i;return t=this.persistence,n=new i$,r=e.initialUser,i=this.Tt,new iQ(t,n,r,i)}Tc(e){return new iM(iL.qs,this.Tt)}Ic(e){return new sn}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class aO extends aV{constructor(e,t,n){super(),this.Pc=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Pc.initialize(this,e),await aL(this.Pc.syncEngine),await sV(this.Pc.remoteStore),await this.persistence.di(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}Ec(e){var t,n,r,i;return t=this.persistence,n=new i$,r=e.initialUser,i=this.Tt,new iQ(t,n,r,i)}Ac(e,t){let n=this.persistence.referenceDelegate.garbageCollector;return new ic(n,e.asyncQueue,t)}Rc(e,t){let n=new ed(t,this.persistence);return new eh(e.asyncQueue,n)}Tc(e){let t=iK(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?r4.withCacheSize(this.cacheSizeBytes):r4.DEFAULT;return new iq(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,sh(),sd(),this.Tt,this.sharedClientState,!!this.forceOwnership)}Ic(e){return new sn}}class aP extends aO{constructor(e,t){super(e,t,!1),this.Pc=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);let t=this.Pc.syncEngine;this.sharedClientState instanceof st&&(this.sharedClientState.syncEngine={Br:aD.bind(null,t),Lr:aF.bind(null,t),qr:aM.bind(null,t),Si:ak.bind(null,t),Fr:a_.bind(null,t)},await this.sharedClientState.start()),await this.persistence.di(async e=>{await aA(this.Pc.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}Ic(e){let t=sh();if(!st.C(t))throw new E(T.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");let n=iK(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new st(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class aq{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>ah(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=ab.bind(null,this.syncEngine),await s$(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new sZ}createDatastore(e){var t,n,r;let i=sf(e.databaseInfo.databaseId),s=(t=e.databaseInfo,new sc(t));return n=e.authCredentials,r=e.appCheckCredentials,new sw(n,r,s,i)}createRemoteStore(e){var t,n,r,i,s;return t=this.localStore,n=this.datastore,r=e.asyncQueue,i=e=>ah(this.syncEngine,e,0),s=si.C()?new si:new sr,new sT(t,n,r,i,s)}createSyncEngine(e,t){return function(e,t,n,r,i,s,a){let o=new as(e,t,n,r,i,s);return a&&(o.wc=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){p("RemoteStore","RemoteStore shutting down."),e.mu.add(5),await sb(e),e.yu.shutdown(),e.pu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aU(e,t=10240){let n=0;return{async read(){if(n<e.byteLength){let r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aB{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.vc(this.observer.next,e)}error(e){this.observer.error?this.vc(this.observer.error,e):y("Uncaught Error in snapshot listener:",e.toString())}bc(){this.muted=!0}vc(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aK{constructor(e,t){this.Vc=e,this.Tt=t,this.metadata=new b,this.buffer=new Uint8Array,this.Sc=new TextDecoder("utf-8"),this.Dc().then(e=>{e&&e.Ou()?this.metadata.resolve(e.Mu.metadata):this.metadata.reject(Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(null==e?void 0:e.Mu)}`))},e=>this.metadata.reject(e))}close(){return this.Vc.cancel()}async getMetadata(){return this.metadata.promise}async yc(){return await this.getMetadata(),this.Dc()}async Dc(){let e=await this.Cc();if(null===e)return null;let t=this.Sc.decode(e),n=Number(t);isNaN(n)&&this.xc(`length string (${t}) is not valid number`);let r=await this.Nc(n);return new s8(JSON.parse(r),e.length+n)}kc(){return this.buffer.findIndex(e=>123===e)}async Cc(){for(;0>this.kc()&&!await this.$c(););if(0===this.buffer.length)return null;let e=this.kc();e<0&&this.xc("Reached the end of bundle when a length string is expected.");let t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Nc(e){for(;this.buffer.length<e;)await this.$c()&&this.xc("Reached the end of bundle when more is expected.");let t=this.Sc.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}xc(e){throw this.Vc.cancel(),Error(`Invalid bundle format: ${e}`)}async $c(){let e=await this.Vc.read();if(!e.done){let t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aG{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new E(T.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");let t=await async function(e,t){let n=nq(e.Tt)+"/documents",r={documents:t.map(t=>nL(e.Tt,t))},i=await e.mo("BatchGetDocuments",n,r,t.length),s=new Map;i.forEach(t=>{var n;let r=(n=e.Tt,"found"in t?function(e,t){t.found||I(),t.found.name,t.found.updateTime;let n=nV(e,t.found.name),r=nF(t.found.updateTime),i=t.found.createTime?nF(t.found.createTime):V.min(),s=new tm({mapValue:{fields:t.found.fields}});return tg.newFoundDocument(n,r,i,s)}(n,t):"missing"in t?function(e,t){t.missing||I(),t.readTime||I();let n=nV(e,t.missing),r=nF(t.readTime);return tg.newNoDocument(n,r)}(n,t):I());s.set(r.key.toString(),r)});let a=[];return t.forEach(e=>{let t=s.get(e.toString());t||I(),a.push(t)}),a}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastWriteError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new nn(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;let e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{let n=B.fromPath(t);this.mutations.push(new nr(n,this.precondition(n)))}),await async function(e,t){let n=nq(e.Tt)+"/documents",r={writes:t.map(t=>nG(e.Tt,t))};await e.lo("Commit",n,r)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw I();t=V.min()}let n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new E(T.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(V.min())?t1.exists(!1):t1.updateTime(t):t1.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(V.min()))throw new E(T.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return t1.updateTime(t)}return t1.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a${constructor(e,t,n,r,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=i,this.Mc=n.maxAttempts,this.ko=new sm(this.asyncQueue,"transaction_retry")}run(){this.Mc-=1,this.Oc()}Oc(){this.ko.vo(async()=>{let e=new aG(this.datastore),t=this.Fc(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.Bc(e)}))}).catch(e=>{this.Bc(e)})})}Fc(e){try{let t=this.updateFunction(e);return!eE(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Bc(e){this.Mc>0&&this.Lc(e)?(this.Mc-=1,this.asyncQueue.enqueueAndForget(()=>(this.Oc(),Promise.resolve()))):this.deferred.reject(e)}Lc(e){if("FirebaseError"===e.name){let t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!ns(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aQ{constructor(e,t,n,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=d.UNAUTHENTICATED,this.clientId=F.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,async e=>{p("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(p("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new E(T.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new b;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){let t=sW(n,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function az(e,t){e.asyncQueue.verifyOperationInProgress(),p("FirestoreClient","Initializing OfflineComponentProvider");let n=await e.getConfiguration();await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await iz(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e.offlineComponents=t}async function aj(e,t){e.asyncQueue.verifyOperationInProgress();let n=await aW(e);p("FirestoreClient","Initializing OnlineComponentProvider");let r=await e.getConfiguration();await t.initialize(n,r),e.setCredentialChangeListener(e=>sG(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>sG(t.remoteStore,n)),e.onlineComponents=t}async function aW(e){return e.offlineComponents||(p("FirestoreClient","Using default OfflineComponentProvider"),await az(e,new aV)),e.offlineComponents}async function aH(e){return e.onlineComponents||(p("FirestoreClient","Using default OnlineComponentProvider"),await aj(e,new aq)),e.onlineComponents}function aX(e){return aW(e).then(e=>e.persistence)}function aY(e){return aW(e).then(e=>e.localStore)}function aJ(e){return aH(e).then(e=>e.remoteStore)}function aZ(e){return aH(e).then(e=>e.syncEngine)}function a0(e){return aH(e).then(e=>e.datastore)}async function a1(e){let t=await aH(e),n=t.eventManager;return n.onListen=aa.bind(null,t.syncEngine),n.onUnlisten=al.bind(null,t.syncEngine),n}function a2(e,t,n={}){let r=new b;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new aB({next:s=>{t.enqueueAndForget(()=>s1(e,a));let o=s.docs.has(n);!o&&s.fromCache?i.reject(new E(T.UNAVAILABLE,"Failed to get document because the client is offline.")):o&&s.fromCache&&r&&"server"===r.source?i.reject(new E(T.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(s)},error:e=>i.reject(e)}),a=new s3(tx(n.path),s,{includeMetadataChanges:!0,$u:!0});return s0(e,a)})(await a1(e),e.asyncQueue,t,n,r)),r.promise}function a5(e,t,n={}){let r=new b;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new aB({next:n=>{t.enqueueAndForget(()=>s1(e,a)),n.fromCache&&"server"===r.source?i.reject(new E(T.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),a=new s3(n,s,{includeMetadataChanges:!0,$u:!0});return s0(e,a)})(await a1(e),e.asyncQueue,t,n,r)),r.promise}let a4=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a3(e,t,n){if(!n)throw new E(T.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function a8(e,t,n,r){if(!0===t&&!0===r)throw new E(T.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function a6(e){if(!B.isDocumentKey(e))throw new E(T.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function a9(e){if(B.isDocumentKey(e))throw new E(T.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function a7(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}return"function"==typeof e?"a function":I()}function oe(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new E(T.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=a7(e);throw new E(T.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function ot(e,t){if(t<=0)throw new E(T.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e){var t;if(void 0===e.host){if(void 0!==e.ssl)throw new E(T.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new E(T.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,a8("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new on({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new E(T.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new E(T.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new on(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new x;switch(e.type){case"gapi":let t=e.client;return new N(t,e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new E(T.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=a4.get(e);t&&(p("ComponentProvider","Removing Datastore"),a4.delete(e),t.terminate())}(this),Promise.resolve()}}function oi(e,t,n,r={}){var i;let s=(e=oe(e,or))._getSettings();if("firestore.googleapis.com"!==s.host&&s.host!==t&&w("Host has been set in both settings() and useEmulator(), emulator host will be used"),e._setSettings(Object.assign(Object.assign({},s),{host:`${t}:${n}`,ssl:!1})),r.mockUserToken){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=d.MOCK_USER;else{t=u.createMockUserToken(r.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);let s=r.mockUserToken.sub||r.mockUserToken.user_id;if(!s)throw new E(T.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new d(s)}e._authCredentials=new _(new S(t,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new oo(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new os(this.firestore,e,this._key)}}class oa{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new oa(this.firestore,e,this._query)}}class oo extends oa{constructor(e,t,n){super(e,t,tx(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new os(this.firestore,null,new B(e))}withConverter(e){return new oo(this.firestore,e,this._path)}}function ol(e,t,...n){if(e=u.getModularInstance(e),1==arguments.length&&(t=F.R()),a3("doc","path",t),e instanceof or){let r=P.fromString(t,...n);return a6(r),new os(e,null,new B(r))}{if(!(e instanceof os||e instanceof oo))throw new E(T.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=e._path.child(P.fromString(t,...n));return a6(r),new os(e.firestore,e instanceof oo?e.converter:null,new B(r))}}function ou(e,t){return e=u.getModularInstance(e),t=u.getModularInstance(t),e instanceof oa&&t instanceof oa&&e.firestore===t.firestore&&tR(e._query,t._query)&&e.converter===t.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc{constructor(){this.qc=Promise.resolve(),this.Uc=[],this.Kc=!1,this.Gc=[],this.Qc=null,this.jc=!1,this.zc=!1,this.Wc=[],this.ko=new sm(this,"async_queue_retry"),this.Hc=()=>{let e=sd();e&&p("AsyncQueue","Visibility state changed to "+e.visibilityState),this.ko.Vo()};let e=sd();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Hc)}get isShuttingDown(){return this.Kc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.Kc){this.Kc=!0,this.zc=e||!1;let t=sd();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Hc)}}enqueue(e){if(this.Jc(),this.Kc)return new Promise(()=>{});let t=new b;return this.Yc(()=>this.Kc&&this.zc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Uc.push(e),this.Zc()))}async Zc(){if(0!==this.Uc.length){try{await this.Uc[0](),this.Uc.shift(),this.ko.reset()}catch(e){if(!ea(e))throw e;p("AsyncQueue","Operation failed with retryable error: "+e)}this.Uc.length>0&&this.ko.vo(()=>this.Zc())}}Yc(e){let t=this.qc.then(()=>(this.jc=!0,e().catch(e=>{let t;this.Qc=e,this.jc=!1;let n=(t=e.message||"",e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t);throw y("INTERNAL UNHANDLED ERROR: ",n),e}).then(e=>(this.jc=!1,e))));return this.qc=t,t}enqueueAfterDelay(e,t,n){this.Jc(),this.Wc.indexOf(e)>-1&&(t=0);let r=sj.createAndSchedule(this,e,t,n,e=>this.Xc(e));return this.Gc.push(r),r}Jc(){this.Qc&&I()}verifyOperationInProgress(){}async ta(){let e;do e=this.qc,await e;while(e!==this.qc)}ea(e){for(let t of this.Gc)if(t.timerId===e)return!0;return!1}na(e){return this.ta().then(()=>{for(let t of(this.Gc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.Gc))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.ta()})}sa(e){this.Wc.push(e)}Xc(e){let t=this.Gc.indexOf(e);this.Gc.splice(t,1)}}function oh(e){return function(e,t){if("object"!=typeof e||null===e)return!1;for(let n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])}class od{constructor(){this._progressObserver={},this._taskCompletionResolver=new b,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}class of extends or{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new oc,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||og(this),this._firestoreClient.terminate()}}function om(e){return e._firestoreClient||og(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function og(e){var t,n,r,i;let s=e._freezeSettings(),a=(n=e._databaseId,r=(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",i=e._persistenceKey,new ey(n,r,i,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,s.useFetchStreams));e._firestoreClient=new aQ(e._authCredentials,e._appCheckCredentials,e._queue,a)}function op(e,t,n){let r=new b;return e.asyncQueue.enqueue(async()=>{try{await az(e,n),await aj(e,t),r.resolve()}catch(e){if(!("FirebaseError"===e.name?e.code===T.FAILED_PRECONDITION||e.code===T.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code))throw e;w("Error enabling offline persistence. Falling back to persistence disabled: "+e),r.reject(e)}}).then(()=>r.promise)}function oy(e){if(e._initialized||e._terminated)throw new E(T.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ow{constructor(e="count",t){this._aggregateType=e,this._internalFieldPath=t,this.type="AggregateField"}}class ov{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertValue(this._data.value)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(e){this._byteString=e}static fromBase64String(e){try{return new oI(e_.fromBase64String(e))}catch(e){throw new E(T.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new oI(e_.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new E(T.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new U(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ob{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new E(T.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new E(T.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return M(this._lat,e._lat)||M(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oS=/^__.*__$/;class ox{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new t9(e,this.data,this.fieldMask,t,this.fieldTransforms):new t6(e,this.data,t,this.fieldTransforms)}}class o_{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new t9(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function oD(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw I()}}class oA{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.Tt=n,this.ignoreUndefinedProperties=r,void 0===i&&this.ia(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get ra(){return this.settings.ra}oa(e){return new oA(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.Tt,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ua(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.oa({path:n,ca:!1});return r.aa(e),r}ha(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.oa({path:n,ca:!1});return r.ia(),r}la(e){return this.oa({path:void 0,ca:!0})}fa(e){return oW(e,this.settings.methodName,this.settings.da||!1,this.path,this.settings._a)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}ia(){if(this.path)for(let e=0;e<this.path.length;e++)this.aa(this.path.get(e))}aa(e){if(0===e.length)throw this.fa("Document fields must not be empty");if(oD(this.ra)&&oS.test(e))throw this.fa('Document fields cannot begin and end with "__"')}}class oN{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.Tt=n||sf(e)}wa(e,t,n,r=!1){return new oA({ra:e,methodName:t,_a:n,path:U.emptyPath(),ca:!1,da:r},this.databaseId,this.Tt,this.ignoreUndefinedProperties)}}function oC(e){let t=e._freezeSettings(),n=sf(e._databaseId);return new oN(e._databaseId,!!t.ignoreUndefinedProperties,n)}function ok(e,t,n,r,i,s={}){let a,o;let l=e.wa(s.merge||s.mergeFields?2:0,t,n,i);o$("Data must be an object, but it was:",l,r);let u=oK(r,l);if(s.merge)a=new tf(l.fieldMask),o=l.fieldTransforms;else if(s.mergeFields){let e=[];for(let r of s.mergeFields){let i=oQ(t,r,n);if(!l.contains(i))throw new E(T.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);oH(e,i)||e.push(i)}a=new tf(e),o=l.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=l.fieldTransforms;return new ox(new tm(u),a,o)}class oF extends oE{_toFieldTransform(e){if(2!==e.ra)throw 1===e.ra?e.fa(`${this._methodName}() can only appear at the top level of your update data`):e.fa(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof oF}}function oM(e,t,n){return new oA({ra:3,_a:t.settings._a,methodName:e._methodName,ca:n},t.databaseId,t.Tt,t.ignoreUndefinedProperties)}class oR extends oE{_toFieldTransform(e){return new tZ(e.path,new tQ)}isEqual(e){return e instanceof oR}}class oL extends oE{constructor(e,t){super(e),this.ma=t}_toFieldTransform(e){let t=oM(this,e,!0),n=this.ma.map(e=>oB(e,t)),r=new tz(n);return new tZ(e.path,r)}isEqual(e){return this===e}}class oV extends oE{constructor(e,t){super(e),this.ma=t}_toFieldTransform(e){let t=oM(this,e,!0),n=this.ma.map(e=>oB(e,t)),r=new tW(n);return new tZ(e.path,r)}isEqual(e){return this===e}}class oO extends oE{constructor(e,t){super(e),this.ga=t}_toFieldTransform(e){let t=new tX(e.Tt,tK(e.Tt,this.ga));return new tZ(e.path,t)}isEqual(e){return this===e}}function oP(e,t,n,r){let i=e.wa(1,t,n);o$("Data must be an object, but it was:",i,r);let s=[],a=tm.empty();eI(r,(e,r)=>{let o=oj(t,e,n);r=u.getModularInstance(r);let l=i.ha(o);if(r instanceof oF)s.push(o);else{let e=oB(r,l);null!=e&&(s.push(o),a.set(o,e))}});let o=new tf(s);return new o_(a,o,i.fieldTransforms)}function oq(e,t,n,r,i,s){let a=e.wa(1,t,n),o=[oQ(t,r,n)],l=[i];if(s.length%2!=0)throw new E(T.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<s.length;e+=2)o.push(oQ(t,s[e])),l.push(s[e+1]);let c=[],h=tm.empty();for(let e=o.length-1;e>=0;--e)if(!oH(c,o[e])){let t=o[e],n=l[e];n=u.getModularInstance(n);let r=a.ha(t);if(n instanceof oF)c.push(t);else{let e=oB(n,r);null!=e&&(c.push(t),h.set(t,e))}}let d=new tf(c);return new o_(h,d,a.fieldTransforms)}function oU(e,t,n,r=!1){return oB(n,e.wa(r?4:3,t))}function oB(e,t){if(oG(e=u.getModularInstance(e)))return o$("Unsupported field value:",t,e),oK(e,t);if(e instanceof oE)return function(e,t){if(!oD(t.ra))throw t.fa(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.fa(`${e._methodName}() is not currently supported inside arrays`);let n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.ca&&4!==t.ra)throw t.fa("Nested arrays are not supported");return function(e,t){let n=[],r=0;for(let i of e){let e=oB(i,t.la(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=u.getModularInstance(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return tK(t.Tt,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let n=L.fromDate(e);return{timestampValue:nC(t.Tt,n)}}if(e instanceof L){let n=new L(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:nC(t.Tt,n)}}if(e instanceof ob)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof oI)return{bytesValue:nk(t.Tt,e._byteString)};if(e instanceof os){let n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.fa(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:nM(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.fa(`Unsupported field value: ${a7(e)}`)}(e,t)}function oK(e,t){let n={};return eT(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):eI(e,(e,r)=>{let i=oB(r,t.ua(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function oG(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof L||e instanceof ob||e instanceof oI||e instanceof os||e instanceof oE)}function o$(e,t,n){if(!oG(n)||!("object"==typeof n&&null!==n&&(Object.getPrototypeOf(n)===Object.prototype||null===Object.getPrototypeOf(n)))){let r=a7(n);throw"an object"===r?t.fa(e+" a custom object"):t.fa(e+" "+r)}}function oQ(e,t,n){if((t=u.getModularInstance(t))instanceof oT)return t._internalPath;if("string"==typeof t)return oj(e,t);throw oW("Field path arguments must be of type string or ",e,!1,void 0,n)}let oz=RegExp("[~\\*/\\[\\]]");function oj(e,t,n){if(t.search(oz)>=0)throw oW(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new oT(...t.split("."))._internalPath}catch(r){throw oW(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function oW(e,t,n,r,i){let s=r&&!r.isEmpty(),a=void 0!==i,o=`Function ${t}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new E(T.INVALID_ARGUMENT,o+e+l)}function oH(e,t){return e.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oX{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new os(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new oY(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(oJ("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class oY extends oX{data(){return super.data()}}function oJ(e,t){return"string"==typeof t?oj(e,t):t instanceof oT?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oZ(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new E(T.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class o0{}class o1 extends o0{}class o2 extends o1{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new o2(e,t,n)}_apply(e){let t=this._parse(e);return lt(e._query,t),new oa(e.firestore,e.converter,tF(e._query,t))}_parse(e){let t=oC(e.firestore),n=function(e,t,n,r,i,s,a){let o;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new E(T.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){le(a,s);let t=[];for(let n of a)t.push(o7(r,e,n));o={arrayValue:{values:t}}}else o=o7(r,e,a)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||le(a,s),o=oU(n,t,a,"in"===s||"not-in"===s);return e1.create(i,s,o)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}class o5 extends o0{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new o5(e,t)}_parse(e){let t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:e2.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e,r=t.getFlattenedFilters();for(let e of r)lt(n,e),n=tF(n,e)}(e._query,t),new oa(e.firestore,e.converter,tF(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class o4 extends o1{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new o4(e,t)}_apply(e){let t=function(e,t,n){if(null!==e.startAt)throw new E(T.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new E(T.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");let r=new ta(t,n);return function(e,t){if(null===tD(e)){let n=tA(e);null!==n&&ln(e,n,t.field)}}(e,r),r}(e._query,this._field,this._direction);return new oa(e.firestore,e.converter,function(e,t){let n=e.explicitOrderBy.concat([t]);return new tS(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}class o3 extends o1{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new o3(e,t,n)}_apply(e){return new oa(e.firestore,e.converter,tM(e._query,this._limit,this._limitType))}}class o8 extends o1{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new o8(e,t,n)}_apply(e){var t;let n=o9(e,this.type,this._docOrFields,this._inclusive);return new oa(e.firestore,e.converter,(t=e._query,new tS(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,n,t.endAt)))}}class o6 extends o1{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new o6(e,t,n)}_apply(e){var t;let n=o9(e,this.type,this._docOrFields,this._inclusive);return new oa(e.firestore,e.converter,(t=e._query,new tS(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,n)))}}function o9(e,t,n,r){if(n[0]=u.getModularInstance(n[0]),n[0]instanceof oX)return function(e,t,n,r,i){if(!r)throw new E(T.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);let s=[];for(let n of tC(e))if(n.field.isKeyField())s.push(eB(t,r.key));else{let e=r.data.field(n.field);if(ek(e))throw new E(T.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+n.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===e){let e=n.field.canonicalString();throw new E(T.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)}s.push(e)}return new eY(s,i)}(e._query,e.firestore._databaseId,t,n[0]._document,r);{let i=oC(e.firestore);return function(e,t,n,r,i,s){let a=e.explicitOrderBy;if(i.length>a.length)throw new E(T.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);let o=[];for(let s=0;s<i.length;s++){let l=i[s];if(a[s].field.isKeyField()){if("string"!=typeof l)throw new E(T.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof l}`);if(!tN(e)&&-1!==l.indexOf("/"))throw new E(T.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${l}' contains a slash.`);let n=e.path.child(P.fromString(l));if(!B.isDocumentKey(n))throw new E(T.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);let i=new B(n);o.push(eB(t,i))}else{let e=oU(n,r,l);o.push(e)}}return new eY(o,s)}(e._query,e.firestore._databaseId,i,t,n,r)}}function o7(e,t,n){if("string"==typeof(n=u.getModularInstance(n))){if(""===n)throw new E(T.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!tN(t)&&-1!==n.indexOf("/"))throw new E(T.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);let r=t.path.child(P.fromString(n));if(!B.isDocumentKey(r))throw new E(T.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return eB(e,new B(r))}if(n instanceof os)return eB(e,n._key);throw new E(T.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${a7(n)}.`)}function le(e,t){if(!Array.isArray(e)||0===e.length)throw new E(T.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function lt(e,t){if(t.isInequality()){let n=tA(e),r=t.field;if(null!==n&&!n.isEqual(r))throw new E(T.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${r.toString()}'`);let i=tD(e);null!==i&&ln(e,r,i)}let n=function(e,t){for(let n of e)for(let e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new E(T.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new E(T.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}function ln(e,t,n){if(!n.isEqual(t))throw new E(T.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}function lr(e,t){if(!(t instanceof o2||t instanceof o5))throw new E(T.INVALID_ARGUMENT,`Function ${e}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class li{convertValue(e,t="none"){switch(eL(e)){case 0:return null;case 1:return e.booleanValue;case 2:return eN(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(eC(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw I()}}convertObject(e,t){let n={};return eI(e.fields,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertGeoPoint(e){return new ob(eN(e.latitude),eN(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let n=function e(t){let n=t.mapValue.fields.__previous_value__;return ek(n)?e(n):n}(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(eF(e));default:return null}}convertTimestamp(e){let t=eA(e);return new L(t.seconds,t.nanos)}convertDocumentKey(e,t){let n=P.fromString(e);nX(n)||I();let r=new ew(n.get(1),n.get(3)),i=new B(n.popFirst(5));return r.isEqual(t)||y(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ls(e,t,n){return e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t}class la extends li{constructor(e){super(),this.firestore=e}convertBytes(e){return new oI(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new os(this.firestore,null,t)}}function lo(){return new ow("count")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class lu extends oX{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new lc(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let n=this._document.data.field(oJ("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class lc extends lu{data(e={}){return super.data(e)}}class lh{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new ll(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new lc(this._firestore,this._userDataWriter,n.key,n,new ll(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new E(T.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{let r=new lc(e._firestore,e._userDataWriter,n.doc.key,n.doc,new ll(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let r=new lc(e._firestore,e._userDataWriter,t.doc.key,t.doc,new ll(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(s=(n=n.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return I()}}(t.type),doc:r,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}class ld extends li{constructor(e){super(),this.firestore=e}convertBytes(e){return new oI(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new os(this.firestore,null,t)}}function lf(e,t){return function(e,t){let n=new b;return e.asyncQueue.enqueueAndForget(async()=>au(await aZ(e),t,n)),n.promise}(om(e),t)}function lm(e,t,n){let r=n.docs.get(t._key),i=new ld(e);return new lu(e,i,t._key,r,new ll(n.hasPendingWrites,n.fromCache),t.converter)}function lg(e,t){let n=oe(e.firestore,of),r=om(n),i=function(e,t){let n=[];for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.push(t(e[r],r,e));return n}(t,(e,t)=>new ep(new eg(t),e._aggregateType,e._internalFieldPath));return(function(e,t,n){let r=new b;return e.asyncQueue.enqueueAndForget(async()=>{try{if(sC(await aJ(e))){let i=await a0(e);r.resolve(sv(i,t,n))}else r.reject(new E(T.UNAVAILABLE,"Failed to get aggregate result because the client is offline."))}catch(e){r.reject(e)}}),r.promise})(r,e._query,i).then(t=>(function(e,t,n){let r=new ld(e);return new ov(t,r,n)})(n,e,t))}let lp={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=oC(e)}set(e,t,n){this._verifyNotCommitted();let r=lw(e,this._firestore),i=ls(r.converter,t,n),s=ok(this._dataReader,"WriteBatch.set",r._key,i,null!==r.converter,n);return this._mutations.push(s.toMutation(r._key,t1.none())),this}update(e,t,n,...r){let i;this._verifyNotCommitted();let s=lw(e,this._firestore);return i="string"==typeof(t=u.getModularInstance(t))||t instanceof oT?oq(this._dataReader,"WriteBatch.update",s._key,t,n,r):oP(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(i.toMutation(s._key,t1.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=lw(e,this._firestore);return this._mutations=this._mutations.concat(new nn(t._key,t1.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new E(T.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function lw(e,t){if((e=u.getModularInstance(e)).firestore!==t)throw new E(T.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lv extends class{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=oC(e)}get(e){let t=lw(e,this._firestore),n=new la(this._firestore);return this._transaction.lookup([t._key]).then(e=>{if(!e||1!==e.length)return I();let r=e[0];if(r.isFoundDocument())return new oX(this._firestore,n,r.key,r,t.converter);if(r.isNoDocument())return new oX(this._firestore,n,t._key,null,t.converter);throw I()})}set(e,t,n){let r=lw(e,this._firestore),i=ls(r.converter,t,n),s=ok(this._dataReader,"Transaction.set",r._key,i,null!==r.converter,n);return this._transaction.set(r._key,s),this}update(e,t,n,...r){let i;let s=lw(e,this._firestore);return i="string"==typeof(t=u.getModularInstance(t))||t instanceof oT?oq(this._dataReader,"Transaction.update",s._key,t,n,r):oP(this._dataReader,"Transaction.update",s._key,t),this._transaction.update(s._key,i),this}delete(e){let t=lw(e,this._firestore);return this._transaction.delete(t._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=lw(e,this._firestore),n=new ld(this._firestore);return super.get(e).then(e=>new lu(this._firestore,n,t._key,e._document,new ll(!1,!1),t.converter))}}function lI(e,t){if("string"!=typeof e[t])throw new E(T.INVALID_ARGUMENT,"Missing string value for: "+t);return e[t]}!function(e=!0){f=a.SDK_VERSION,a._registerComponent(new o.Component("firestore",(t,{instanceIdentifier:n,options:r})=>{let i=t.getProvider("app").getImmediate(),s=new of(new D(t.getProvider("auth-internal")),new k(t.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new E(T.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ew(e.options.projectId,t)}(i,n),i);return r=Object.assign({useFetchStreams:e},r),s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),a.registerVersion(h,"3.9.0",void 0),a.registerVersion(h,"3.9.0","cjs2017")}(),t.AbstractUserDataWriter=li,t.AggregateField=ow,t.AggregateQuerySnapshot=ov,t.Bytes=oI,t.CACHE_SIZE_UNLIMITED=-1,t.CollectionReference=oo,t.DocumentReference=os,t.DocumentSnapshot=lu,t.FieldPath=oT,t.FieldValue=oE,t.Firestore=of,t.FirestoreError=E,t.GeoPoint=ob,t.LoadBundleTask=od,t.Query=oa,t.QueryCompositeFilterConstraint=o5,t.QueryConstraint=o1,t.QueryDocumentSnapshot=lc,t.QueryEndAtConstraint=o6,t.QueryFieldFilterConstraint=o2,t.QueryLimitConstraint=o3,t.QueryOrderByConstraint=o4,t.QuerySnapshot=lh,t.QueryStartAtConstraint=o8,t.SnapshotMetadata=ll,t.Timestamp=L,t.Transaction=lv,t.WriteBatch=ly,t._DatabaseId=ew,t._DocumentKey=B,t._EmptyAppCheckTokenProvider=class{getToken(){return Promise.resolve(new C(""))}invalidateToken(){}start(e,t){}shutdown(){}},t._EmptyAuthCredentialsProvider=x,t._FieldPath=U,t._cast=oe,t._debugAssert=function(e,t){e||I()},t._isBase64Available=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(){return"undefined"!=typeof atob},t._logWarn=w,t._validateIsNotUsedTogether=a8,t.addDoc=function(e,t){let n=oe(e.firestore,of),r=ol(e),i=ls(e.converter,t);return lf(n,[ok(oC(e.firestore),"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,t1.exists(!1))]).then(()=>r)},t.aggregateFieldEqual=function(e,t){var n,r;return e instanceof ow&&t instanceof ow&&e._aggregateType===t._aggregateType&&(null===(n=e._internalFieldPath)||void 0===n?void 0:n.canonicalString())===(null===(r=t._internalFieldPath)||void 0===r?void 0:r.canonicalString())},t.aggregateQuerySnapshotEqual=function(e,t){return ou(e.query,t.query)&&u.deepEqual(e.data(),t.data())},t.and=function(...e){return e.forEach(e=>lr("and",e)),o5._create("and",e)},t.arrayRemove=function(...e){return new oV("arrayRemove",e)},t.arrayUnion=function(...e){return new oL("arrayUnion",e)},t.average=function(e){return new ow("avg",oQ("average",e))},t.clearIndexedDbPersistence=function(e){if(e._initialized&&!e._terminated)throw new E(T.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");let t=new b;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!er.C())return Promise.resolve();await er.delete(e+"main")}(iK(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise},t.collection=function(e,t,...n){if(e=u.getModularInstance(e),a3("collection","path",t),e instanceof or){let r=P.fromString(t,...n);return a9(r),new oo(e,null,r)}{if(!(e instanceof os||e instanceof oo))throw new E(T.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=e._path.child(P.fromString(t,...n));return a9(r),new oo(e.firestore,null,r)}},t.collectionGroup=function(e,t){if(e=oe(e,or),a3("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new E(T.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new oa(e,null,new tS(P.emptyPath(),t))},t.connectFirestoreEmulator=oi,t.count=lo,t.deleteDoc=function(e){return lf(oe(e.firestore,of),[new nn(e._key,t1.none())])},t.deleteField=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(){return new oF("deleteField")},t.disableNetwork=function(e){var t;return(t=om(e=oe(e,of))).asyncQueue.enqueue(async()=>{let e=await aX(t),n=await aJ(t);return e.setNetworkEnabled(!1),async function(e){e.mu.add(0),await sb(e),e.pu.set("Offline")}(n)})},t.doc=ol,t.documentId=function(){return new oT("__name__")},t.enableIndexedDbPersistence=function(e,t){oy(e=oe(e,of));let n=om(e),r=e._freezeSettings(),i=new aq;return op(n,i,new aO(i,r.cacheSizeBytes,null==t?void 0:t.forceOwnership))},t.enableMultiTabIndexedDbPersistence=function(e){oy(e=oe(e,of));let t=om(e),n=e._freezeSettings(),r=new aq;return op(t,r,new aP(r,n.cacheSizeBytes))},t.enableNetwork=function(e){var t;return(t=om(e=oe(e,of))).asyncQueue.enqueue(async()=>{let e=await aX(t),n=await aJ(t);return e.setNetworkEnabled(!0),n.mu.delete(0),sE(n)})},t.endAt=function(...e){return o6._create("endAt",e,!0)},t.endBefore=function(...e){return o6._create("endBefore",e,!1)},t.ensureFirestoreConfigured=om,t.executeWrite=lf,t.getAggregateFromServer=lg,t.getCountFromServer=/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){return lg(e,{count:lo()})},t.getDoc=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){e=oe(e,os);let t=oe(e.firestore,of);return a2(om(t),e._key).then(n=>lm(t,e,n))},t.getDocFromCache=function(e){e=oe(e,os);let t=oe(e.firestore,of),n=om(t),r=new ld(t);return(function(e,t){let n=new b;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,n){try{let r=await e.persistence.runTransaction("read document","readonly",n=>e.localDocuments.getDocument(n,t));r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new E(T.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(r){let e=sW(r,`Failed to get document '${t} from cache`);n.reject(e)}})(await aY(e),t,n)),n.promise})(n,e._key).then(n=>new lu(t,r,e._key,n,new ll(null!==n&&n.hasLocalMutations,!0),e.converter))},t.getDocFromServer=function(e){e=oe(e,os);let t=oe(e.firestore,of);return a2(om(t),e._key,{source:"server"}).then(n=>lm(t,e,n))},t.getDocs=function(e){e=oe(e,oa);let t=oe(e.firestore,of),n=om(t),r=new ld(t);return oZ(e._query),a5(n,e._query).then(n=>new lh(t,r,e,n))},t.getDocsFromCache=function(e){e=oe(e,oa);let t=oe(e.firestore,of),n=om(t),r=new ld(t);return(function(e,t){let n=new b;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,n){try{let r=await iY(e,t,!0),i=new an(t,r.Yi),s=i.Hu(r.documents),a=i.applyChanges(s,!1);n.resolve(a.snapshot)}catch(r){let e=sW(r,`Failed to execute query '${t} against cache`);n.reject(e)}})(await aY(e),t,n)),n.promise})(n,e._query).then(n=>new lh(t,r,e,n))},t.getDocsFromServer=function(e){e=oe(e,oa);let t=oe(e.firestore,of),n=om(t),r=new ld(t);return a5(n,e._query,{source:"server"}).then(n=>new lh(t,r,e,n))},t.getFirestore=function(e,t){let n="object"==typeof e?e:a.getApp(),r=a._getProvider(n,"firestore").getImmediate({identifier:"string"==typeof e?e:t||"(default)"});if(!r._initialized){let e=u.getDefaultEmulatorHostnameAndPort("firestore");e&&oi(r,...e)}return r},t.increment=function(e){return new oO("increment",e)},t.initializeFirestore=function(e,t,n){n||(n="(default)");let r=a._getProvider(e,"firestore");if(r.isInitialized(n)){let e=r.getImmediate({identifier:n}),i=r.getOptions(n);if(u.deepEqual(i,t))return e;throw new E(T.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new E(T.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:t,instanceIdentifier:n})},t.limit=function(e){return ot("limit",e),o3._create("limit",e,"F")},t.limitToLast=function(e){return ot("limitToLast",e),o3._create("limitToLast",e,"L")},t.loadBundle=function(e,t){let n=om(e=oe(e,of)),r=new od;return function(e,t,n,r){var i,s;let a=(i=sf(t),s=function(e,t){if(e instanceof Uint8Array)return aU(e,t);if(e instanceof ArrayBuffer)return aU(new Uint8Array(e),t);if(e instanceof ReadableStream)return e.getReader();throw Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}("string"==typeof n?(new TextEncoder).encode(n):n),new aK(s,i));e.asyncQueue.enqueueAndForget(async()=>{!function(e,t,n){(async function(e,t,n){try{var r;let i=await t.getMetadata();if(await function(e,t){let n=nF(t.createTime);return e.persistence.runTransaction("hasNewerBundle","readonly",n=>e.$s.getBundleMetadata(n,t.id)).then(e=>!!e&&e.createTime.compareTo(n)>=0)}(e.localStore,i))return await t.close(),n._completeWith({taskState:"Success",documentsLoaded:i.totalDocuments,bytesLoaded:i.totalBytes,totalDocuments:i.totalDocuments,totalBytes:i.totalBytes}),Promise.resolve(new Set);n._updateProgress(s7(i));let s=new s9(i,e.localStore,t.Tt),a=await t.yc();for(;a;){let e=await s.Bu(a);e&&n._updateProgress(e),a=await t.yc()}let o=await s.complete();return await aE(e,o.Uu,void 0),await (r=e.localStore).persistence.runTransaction("Save bundle","readwrite",e=>r.$s.saveBundleMetadata(e,i)),n._completeWith(o.progress),Promise.resolve(o.qu)}catch(e){return w("SyncEngine",`Loading bundle failed with ${e}`),n._failWith(e),Promise.resolve(new Set)}})(e,t,n).then(t=>{e.sharedClientState.notifyBundleLoaded(t)})}(await aZ(e),a,r)})}(n,e._databaseId,t,r),r},t.namedQuery=function(e,t){var n;return(n=om(e=oe(e,of))).asyncQueue.enqueue(async()=>{var e;return(e=await aY(n)).persistence.runTransaction("Get named query","readonly",n=>e.$s.getNamedQuery(n,t))}).then(t=>t?new oa(e,null,t.query):null)},t.onSnapshot=function(e,...t){var n,r,i;let s,a,o;e=u.getModularInstance(e);let l={includeMetadataChanges:!1},c=0;"object"!=typeof t[0]||oh(t[c])||(l=t[c],c++);let h={includeMetadataChanges:l.includeMetadataChanges};if(oh(t[c])){let e=t[c];t[c]=null===(n=e.next)||void 0===n?void 0:n.bind(e),t[c+1]=null===(r=e.error)||void 0===r?void 0:r.bind(e),t[c+2]=null===(i=e.complete)||void 0===i?void 0:i.bind(e)}if(e instanceof os)a=oe(e.firestore,of),o=tx(e._key.path),s={next:n=>{t[c]&&t[c](lm(a,e,n))},error:t[c+1],complete:t[c+2]};else{let n=oe(e,oa);a=oe(n.firestore,of),o=n._query;let r=new ld(a);s={next:e=>{t[c]&&t[c](new lh(a,r,n,e))},error:t[c+1],complete:t[c+2]},oZ(e._query)}return function(e,t,n,r){let i=new aB(r),s=new s3(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>s0(await a1(e),s)),()=>{i.bc(),e.asyncQueue.enqueueAndForget(async()=>s1(await a1(e),s))}}(om(a),o,h,s)},t.onSnapshotsInSync=function(e,t){return function(e,t){let n=new aB(t);return e.asyncQueue.enqueueAndForget(async()=>{(await a1(e)).vu.add(n),n.next()}),()=>{n.bc(),e.asyncQueue.enqueueAndForget(async()=>(function(e,t){e.vu.delete(t)})(await a1(e),n))}}(om(e=oe(e,of)),oh(t)?t:{next:t})},t.or=function(...e){return e.forEach(e=>lr("or",e)),o5._create("or",e)},t.orderBy=function(e,t="asc"){let n=oJ("orderBy",e);return o4._create(n,t)},t.query=function(e,t,...n){let r=[];for(let i of(t instanceof o0&&r.push(t),function(e){let t=e.filter(e=>e instanceof o5).length,n=e.filter(e=>e instanceof o2).length;if(t>1||t>0&&n>0)throw new E(T.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r=r.concat(n)),r))e=i._apply(e);return e},t.queryEqual=ou,t.refEqual=function(e,t){return e=u.getModularInstance(e),t=u.getModularInstance(t),(e instanceof os||e instanceof oo)&&(t instanceof os||t instanceof oo)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter},t.runTransaction=function(e,t,n){e=oe(e,of);let r=Object.assign(Object.assign({},lp),n);return function(e){if(e.maxAttempts<1)throw new E(T.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(e,t,n){let r=new b;return e.asyncQueue.enqueueAndForget(async()=>{let i=await a0(e);new a$(e.asyncQueue,i,n,t,r).run()}),r.promise}(om(e),n=>t(new lv(e,n)),r)},t.serverTimestamp=function(){return new oR("serverTimestamp")},t.setDoc=function(e,t,n){e=oe(e,os);let r=oe(e.firestore,of),i=ls(e.converter,t,n);return lf(r,[ok(oC(r),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,t1.none())])},t.setIndexConfiguration=/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){var n;let r=om(e=oe(e,of));if(!(null===(n=r.offlineComponents)||void 0===n?void 0:n.indexBackfillerScheduler))return w("Cannot enable indexes when persistence is disabled"),Promise.resolve();let i=function(e){let t="string"==typeof e?function(e){try{return JSON.parse(e)}catch(e){throw new E(T.INVALID_ARGUMENT,"Failed to parse JSON: "+(null==e?void 0:e.message))}}(e):e,n=[];if(Array.isArray(t.indexes))for(let e of t.indexes){let t=lI(e,"collectionGroup"),r=[];if(Array.isArray(e.fields))for(let t of e.fields){let e=oj("setIndexConfiguration",lI(t,"fieldPath"));"CONTAINS"===t.arrayConfig?r.push(new z(e,2)):"ASCENDING"===t.order?r.push(new z(e,0)):"DESCENDING"===t.order&&r.push(new z(e,1))}n.push(new K(K.UNKNOWN_ID,t,r,j.empty()))}return n}(t);return aY(r).then(e=>(async function(e,t){let n=e.indexManager,r=[];return e.persistence.runTransaction("Configure indexes","readwrite",e=>n.getFieldIndexes(e).next(i=>(function(e,t,n,r,i){t=[...t],(e=[...e]).sort(n),t.sort(n);let s=e.length,a=t.length,o=0,l=0;for(;o<a&&l<s;){let s=n(e[l],t[o]);s<0?i(e[l++]):s>0?r(t[o++]):(o++,l++)}for(;o<a;)r(t[o++]);for(;l<s;)i(e[l++])})(i,t,Q,t=>{r.push(n.addFieldIndex(e,t))},t=>{r.push(n.deleteFieldIndex(e,t))})).next(()=>et.waitFor(r)))})(e,i))},t.setLogLevel=function(e){m.setLogLevel(e)},t.snapshotEqual=function(e,t){return e instanceof lu&&t instanceof lu?e._firestore===t._firestore&&e._key.isEqual(t._key)&&(null===e._document?null===t._document:e._document.isEqual(t._document))&&e._converter===t._converter:e instanceof lh&&t instanceof lh&&e._firestore===t._firestore&&ou(e.query,t.query)&&e.metadata.isEqual(t.metadata)&&e._snapshot.isEqual(t._snapshot)},t.startAfter=function(...e){return o8._create("startAfter",e,!1)},t.startAt=function(...e){return o8._create("startAt",e,!0)},t.sum=/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){return new ow("sum",oQ("sum",e))},t.terminate=function(e){return a._removeServiceInstance(e.app,"firestore",e._databaseId.database),e._delete()},t.updateDoc=function(e,t,n,...r){let i;e=oe(e,os);let s=oe(e.firestore,of),a=oC(s);return i="string"==typeof(t=u.getModularInstance(t))||t instanceof oT?oq(a,"updateDoc",e._key,t,n,r):oP(a,"updateDoc",e._key,t),lf(s,[i.toMutation(e._key,t1.exists(!0))])},t.waitForPendingWrites=function(e){return function(e){let t=new b;return e.asyncQueue.enqueueAndForget(async()=>ag(await aZ(e),t)),t.promise}(om(e=oe(e,of)))},t.where=function(e,t,n){let r=oJ("where",e);return o2._create(r,t,n)},t.writeBatch=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){return om(e=oe(e,of)),new ly(e,t=>lf(e,t))}}}]);