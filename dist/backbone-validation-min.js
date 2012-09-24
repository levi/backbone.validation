// Backbone.Validation v0.6.2
//
// Copyright (c) 2011-2012 Thomas Pedersen
// Distributed under MIT License
//
// Documentation and full license available at:
// http://thedersen.com/projects/backbone-validation
Backbone.Validation=function(a){"use strict";var b={forceUpdate:!1,selector:"name",labelFormatter:"sentenceCase",valid:Function.prototype,invalid:Function.prototype},c=function(){var c=function(b,c){return!b||!b[c]?null:a.isFunction(b[c])?b[c]():b[c]},e=function(b){return a.reduce(a.keys(c(b,"validation")||{}),function(a,b){return a[b]=void 0,a},{})},f=function(b,d){var e=c(b,"validation")?c(b,"validation")[d]||{}:{};if(a.isFunction(e)||a.isString(e))e={fn:e};return a.isArray(e)||(e=[e]),a.reduce(e,function(b,c){return a.each(a.without(a.keys(c),"msg"),function(a){b.push({fn:h[a],val:c[a],msg:c.msg})}),b},[])},g=function(b,c,d,e){return a.reduce(f(b,c),function(a,f){var g=f.fn.call(h,d,c,f.val,b,e);return g===!1||a===!1?!1:g&&!a?f.msg||g:a},"")},i=function(b,c){var d,e,f={},h=!0,i=a.clone(c);for(e in c)d=g(b,e,c[e],i),d&&(f[e]=d,h=!1);return{invalidAttrs:f,isValid:h}},j=function(b,c){return{preValidate:function(b,c){return g(this,b,c,a.extend({},this.attributes))},isValid:function(b){if(a.isString(b))return!g(this,b,this.get(b),a.extend({},this.attributes));if(a.isArray(b)){for(var c=0;c<b.length;c++)if(g(this,b[c],this.get(b[c]),a.extend({},this.attributes)))return!1;return!0}return b===!0&&this.validate(),this.validation?this._isValid:!0},validate:function(d,f){var g=this,h=!d,j=a.extend({},c,f),k=a.extend(e(g),g.attributes,d),l=d||k,m=i(g,k);g._isValid=m.isValid;for(var n in k){var o=m.invalidAttrs.hasOwnProperty(n),p=l.hasOwnProperty(n);o&&(p||h)&&j.invalid(b,n,m.invalidAttrs[n],j.selector),o||j.valid(b,n,j.selector)}a.defer(function(){g.trigger("validated",g._isValid,g,m.invalidAttrs),g.trigger("validated:"+(g._isValid?"valid":"invalid"),g,m.invalidAttrs)});if(!j.forceUpdate&&a.intersection(a.keys(m.invalidAttrs),a.keys(l)).length>0)return m.invalidAttrs}}},k=function(b,c,d){a.extend(c,j(b,d))},l=function(a){delete a.validate,delete a.preValidate,delete a.isValid},m=function(a){k(this.view,a,this.options)},n=function(a){l(a)};return{version:"0.6.2",configure:function(c){a.extend(b,c)},bind:function(c,e){var f=c.model,g=c.collection;e=a.extend({},b,d,e);if(typeof f=="undefined"&&typeof g=="undefined")throw"Before you execute the binding your view must have a model or a collection.\nSee http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.";f&&k(c,f,e),g&&(g.each(function(a){k(c,a,e)}),g.bind("add",m,{view:c,options:e}),g.bind("remove",n))},unbind:function(a){var b=a.model,c=a.collection;b&&l(a.model),c&&(c.each(function(a){l(a)}),c.unbind("add",m),c.unbind("remove",n))},mixin:j(null,b)}}(),d=c.callbacks={valid:function(a,b,c){a.$("["+c+"~="+b+"]").removeClass("invalid").removeAttr("data-error")},invalid:function(a,b,c,d){a.$("["+d+"~="+b+"]").addClass("invalid").attr("data-error",c)}},e=c.patterns={digits:/^\d+$/,number:/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i},f=c.messages={required:"{0} is required",acceptance:"{0} must be accepted",min:"{0} must be greater than or equal to {1}",max:"{0} must be less than or equal to {1}",range:"{0} must be between {1} and {2}",length:"{0} must be {1} characters",minLength:"{0} must be at least {1} characters",maxLength:"{0} must be at most {1} characters",rangeLength:"{0} must be between {1} and {2} characters",oneOf:"{0} must be one of: {1}",equalTo:"{0} must be the same as {1}",pattern:"{0} must be a valid {1}"},g=c.labelFormatters={none:function(a){return a},sentenceCase:function(a){return a.replace(/(?:^\w|[A-Z]|\b\w)/g,function(a,b){return b===0?a.toUpperCase():" "+a.toLowerCase()}).replace("_"," ")},label:function(a,b){return b.labels[a]||g.sentenceCase(a,b)}},h=c.validators=function(){var c=String.prototype.trim?function(a){return a===null?"":String.prototype.trim.call(a)}:function(a){var b=/^\s+/,c=/\s+$/;return a===null?"":a.toString().replace(b,"").replace(c,"")},d=function(a,c){return g[b.labelFormatter](a,c)},h=function(){var a=Array.prototype.slice.call(arguments),b=a.shift();return b.replace(/\{(\d+)\}/g,function(b,c){return typeof a[c]!="undefined"?a[c]:b})},i=function(b){return a.isNumber(b)||a.isString(b)&&b.match(e.number)},j=function(b){return!(a.isNull(b)||a.isUndefined(b)||a.isString(b)&&c(b)==="")};return{fn:function(b,c,d,e,f){return a.isString(d)&&(d=e[d]),d.call(e,b,c,f)},required:function(b,c,e,g,i){var k=a.isFunction(e)?e.call(g,b,c,i):e;if(!k&&!j(b))return!1;if(k&&!j(b))return h(f.required,d(c,g))},acceptance:function(b,c,e,g){if(b!=="true"&&(!a.isBoolean(b)||b===!1))return h(f.acceptance,d(c,g))},min:function(a,b,c,e){if(!i(a)||a<c)return h(f.min,d(b,e),c)},max:function(a,b,c,e){if(!i(a)||a>c)return h(f.max,d(b,e),c)},range:function(a,b,c,e){if(!i(a)||a<c[0]||a>c[1])return h(f.range,d(b,e),c[0],c[1])},length:function(a,b,e,g){if(!j(a)||c(a).length!==e)return h(f.length,d(b,g),e)},minLength:function(a,b,e,g){if(!j(a)||c(a).length<e)return h(f.minLength,d(b,g),e)},maxLength:function(a,b,e,g){if(!j(a)||c(a).length>e)return h(f.maxLength,d(b,g),e)},rangeLength:function(a,b,e,g){if(!j(a)||c(a).length<e[0]||c(a).length>e[1])return h(f.rangeLength,d(b,g),e[0],e[1])},oneOf:function(b,c,e,g){if(!a.include(e,b))return h(f.oneOf,d(c,g),e.join(", "))},equalTo:function(a,b,c,e,g){if(a!==g[c])return h(f.equalTo,d(b,e),d(c,e))},pattern:function(a,b,c,g){if(!j(a)||!a.toString().match(e[c]||c))return h(f.pattern,d(b,g),c)}}}();return c}(_);