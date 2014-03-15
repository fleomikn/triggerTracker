﻿/*
 * Trigger Tracker (v.0.0.4-min)
 * by Michael G Collins (www.intervalia.com)
 * intervalia@gmail.com
 *
 * Copyright (c) 2013 Michael G Collins
 * Licensed under the GPL license.
 *
 * NOTE: Requires jQuery framework (www.jquery.com)
 *  Tested with jQuery versions 1.7.0 to 1.11.0
 *
 */
(function (e, t) { var n = false, r = true, i = 0, s = "Event propagation was stopped and default action was prevented.", o = e.triggerTrackerConsole || window.console; if (o !== t) { if (o.groupCollapsed === t) { o.groupCollapsed = o.log; o.groupEnd = function () { }; var u = {}; o.time = function (e) { u[e] = (new Date).valueOf() }; o.timeEnd = function (e) { var n = (new Date).valueOf(); if (u[e]) { var r = n - u[e]; o.info(e + ": " + r + "ms"); u[e] = t } } } if (o.dir === t) { o.dir = function (t) { function s() { var e = ""; for (var t = 0; t < r; t++) { e += "  " } return e } function u(t, n) { var i = "\n" + s() + t + ": "; if (e.isArray(n) || e.isPlainObject(n)) { var o = e.isArray(n); i += o ? "[" : "{"; for (var f in n) { if (f) { r++; i += u(f, n[f]); r-- } } i += "\n" + s() + (o ? "]" : "}") } else if (e.isFunction(n)) { i += a(n) } else { i += n } return i } var n = "\n", r = 1; var i = e.isArray(t); n += i ? "[" : "{"; var f = false; for (var l in t) { f = true; if (l) { n += u(l, t[l]) } } if (!f) { for (var c = 0; c < t.length; c++) { n += u(c, t[c]) } } n += "\n" + (i ? "]" : "}"); o.log(n) } } function a(e) { if (e) { var t = e.__originalMethod || e; var n = ""; if (e) { var r = /(function )+|(\r*\n)+\s*/g; var i = t.toString().replace(r, " ").split("{")[0].trim(); if (i.split("(")[0].length === 0) { n = e.__functionName || "function " } return n + i } } return typeof e } function f(t) { var n = true, r = t; if (typeof r === "object") { r = r.type } var i = e.triggerTrackerIncludeList; if (i && i instanceof Array) { n = i.indexOf(r) > -1 } var s = e.triggerTrackerExcludeList; if (n && s && s instanceof Array) { n = s.indexOf(r) === -1 } return n } function l(e, t) { var n = -1, r = []; for (; ++n < t;) { r.push("arg" + n) } if (e) { var i = /\(([^)]+)/.exec(e); if (i && i[1]) { t = (i = i[1].split(/\s*,\s*/)).length; for (n = 0; n < t; n++) { r[n] = i[n] || "arg" + n } } } return r } function c(e, n) { return function (r) { var u = t; var c = t; var h = f(r.type); var p = ++i + ") Duration of handler"; var d = a(n); var v = l(d, arguments.length); var m; if (h) { o.groupCollapsed("HANDLER: (" + r.type + ") " + d); if (r.currentTarget === r.target) { o.log("Target: ", r.currentTarget) } else { o.log("Current target: ", r.currentTarget); o.log("Original target: ", r.target) } o.log("Handler: ", n.__originalMethod || n); o.log("Params:"); o.log("  event: ", r); if (arguments.length > 1) { for (var g = 1; g < arguments.length; g++) { o.log("  " + v[g] + ": ", arguments[g]) } } o.time(p) } else { o.log("HANDLER: (" + r.type + ") " + d) } try { u = n.apply(e, arguments); if (h) { if (u === false) { o.info("Returned false: " + s) } else { o.log("Returned: ", u); m = r.originalEvent; if (m) { if (m.cancelBubble && m.defaultPrevented) { o.info(s) } else { if (m.cancelBubble) { o.info("Event propagation was stopped.") } if (m.defaultPrevented) { o.info("Default action was prevented.") } } } } } } catch (y) { if (h) { o.error("Exception thrown in event handler: ", y) } c = y } if (h) { o.timeEnd(p); o.groupEnd() } --i; if (c) { throw c } return u } } var h = e.fn.trigger; var p = e.event.handlers; var d = e.fn.on; var v = 0; e.fn.trigger = function (t) { var n = ++v + ") Duration of trigger"; var r, i, s; if (this.length > 0) { r = this[0]._classNameForLogging || this.selector || this[0].mimeType || a(this[0]) } else { r = this.selector || this.toString() } if (typeof r === "object" && r._classNameForLogging) { r = r._classNameForLogging } var u = f(t); var l = typeof t === "object"; if (u) { o.groupCollapsed("TRIGGER: (" + (l ? t.type : t) + ") " + r); o.log("Source: ", this); if (l) { o.log("Event: ", t) } o.log("Caller: ", arguments.callee.caller); if (arguments.length > 1) { o.log("Params:"); o.dir(arguments[1]) } o.time(n) } else { o.log("TRIGGER: (" + r + ") ", l ? t.type : t) } try { i = h.apply(this, arguments) } catch (c) { if (u) { o.error("Exception thrown in trigger call: ", c) } s = c } if (u) { o.timeEnd(n); o.groupEnd() } --v; if (s) { throw s } return i }; if (r || n) { if (p) { e.event.handlers = function (t, n) { var r = p.call(this, t, n); var i = []; for (var s = 0; s < r.length; s++) { var o = e.extend({}, r[s]); var n = o.handlers; o.handlers = []; for (var u = 0; u < n.length; u++) { var a = e.extend({}, n[u]); var f = a.handler; a.handler = c(this, f); a.handler.originalHandler = f; o.handlers.push(a) } i.push(o) } return i } } else { e.fn.on = function (t) { var i, s; var u = f(t); if (u && n) { o.time("On time") } var l; if (this.length > 0) { l = this[0]._classNameForLogging || this.selector || this[0].mimeType || a(this[0]) } else { l = this.selector || this.toString() } if (u && n) { o.groupCollapsed("Setting event handler: (" + l + ").on(", t, ")"); o.log("Source Object: ", this); o.dir(arguments) } if (r && !p) { var h, v, m; v = (m = [].slice.call(arguments)).length; for (var h = 0; h < v; h++) { if (typeof m[h] === "function") { i = m[h]; s = c(this, i); m[h] = s; s.guid = i.guid } } } var g = d.apply(this, m); if (i) { i.guid = s.guid } if (u && n) { o.timeEnd("On time"); o.groupEnd() } return g } } } } })(jQuery)