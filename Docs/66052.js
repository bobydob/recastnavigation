
var unityFramework = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(unityFramework) {
  unityFramework = unityFramework || {};

var Module=typeof unityFramework!="undefined"?unityFramework:{};var readyPromiseResolve,readyPromiseReject;Module["ready"]=new Promise(function(resolve,reject){readyPromiseResolve=resolve;readyPromiseReject=reject});/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS = CryptoJS || function(h, s) {
    var f = {},
        g = f.lib = {},
        q = function() {},
        m = g.Base = {
            extend: function(a) {
                q.prototype = this;
                var c = new q;
                a && c.mixIn(a);
                c.hasOwnProperty("init") || (c.init = function() {
                    c.$super.init.apply(this, arguments)
                });
                c.init.prototype = c;
                c.$super = this;
                return c
            },
            create: function() {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            },
            init: function() {},
            mixIn: function(a) {
                for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        },
        r = g.WordArray = m.extend({
            init: function(a, c) {
                a = this.words = a || [];
                this.sigBytes = c != s ? c : 4 * a.length
            },
            toString: function(a) {
                return (a || k).stringify(this)
            },
            concat: function(a) {
                var c = this.words,
                    d = a.words,
                    b = this.sigBytes;
                a = a.sigBytes;
                this.clamp();
                if (b % 4)
                    for (var e = 0; e < a; e++) c[b + e >>> 2] |= (d[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((b + e) % 4);
                else if (65535 < d.length)
                    for (e = 0; e < a; e += 4) c[b + e >>> 2] = d[e >>> 2];
                else c.push.apply(c, d);
                this.sigBytes += a;
                return this
            },
            clamp: function() {
                var a = this.words,
                    c = this.sigBytes;
                a[c >>> 2] &= 4294967295 <<
                    32 - 8 * (c % 4);
                a.length = h.ceil(c / 4)
            },
            clone: function() {
                var a = m.clone.call(this);
                a.words = this.words.slice(0);
                return a
            },
            random: function(a) {
                for (var c = [], d = 0; d < a; d += 4) c.push(4294967296 * h.random() | 0);
                return new r.init(c, a)
            }
        }),
        l = f.enc = {},
        k = l.Hex = {
            stringify: function(a) {
                var c = a.words;
                a = a.sigBytes;
                for (var d = [], b = 0; b < a; b++) {
                    var e = c[b >>> 2] >>> 24 - 8 * (b % 4) & 255;
                    d.push((e >>> 4).toString(16));
                    d.push((e & 15).toString(16))
                }
                return d.join("")
            },
            parse: function(a) {
                for (var c = a.length, d = [], b = 0; b < c; b += 2) d[b >>> 3] |= parseInt(a.substr(b,
                    2), 16) << 24 - 4 * (b % 8);
                return new r.init(d, c / 2)
            }
        },
        n = l.Latin1 = {
            stringify: function(a) {
                var c = a.words;
                a = a.sigBytes;
                for (var d = [], b = 0; b < a; b++) d.push(String.fromCharCode(c[b >>> 2] >>> 24 - 8 * (b % 4) & 255));
                return d.join("")
            },
            parse: function(a) {
                for (var c = a.length, d = [], b = 0; b < c; b++) d[b >>> 2] |= (a.charCodeAt(b) & 255) << 24 - 8 * (b % 4);
                return new r.init(d, c)
            }
        },
        j = l.Utf8 = {
            stringify: function(a) {
                try {
                    return decodeURIComponent(escape(n.stringify(a)))
                } catch (c) {
                    throw Error("Malformed UTF-8 data");
                }
            },
            parse: function(a) {
                return n.parse(unescape(encodeURIComponent(a)))
            }
        },
        u = g.BufferedBlockAlgorithm = m.extend({
            reset: function() {
                this._data = new r.init;
                this._nDataBytes = 0
            },
            _append: function(a) {
                "string" == typeof a && (a = j.parse(a));
                this._data.concat(a);
                this._nDataBytes += a.sigBytes
            },
            _process: function(a) {
                var c = this._data,
                    d = c.words,
                    b = c.sigBytes,
                    e = this.blockSize,
                    f = b / (4 * e),
                    f = a ? h.ceil(f) : h.max((f | 0) - this._minBufferSize, 0);
                a = f * e;
                b = h.min(4 * a, b);
                if (a) {
                    for (var g = 0; g < a; g += e) this._doProcessBlock(d, g);
                    g = d.splice(0, a);
                    c.sigBytes -= b
                }
                return new r.init(g, b)
            },
            clone: function() {
                var a = m.clone.call(this);
                a._data = this._data.clone();
                return a
            },
            _minBufferSize: 0
        });
    g.Hasher = u.extend({
        cfg: m.extend(),
        init: function(a) {
            this.cfg = this.cfg.extend(a);
            this.reset()
        },
        reset: function() {
            u.reset.call(this);
            this._doReset()
        },
        update: function(a) {
            this._append(a);
            this._process();
            return this
        },
        finalize: function(a) {
            a && this._append(a);
            return this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(c, d) {
                return (new a.init(d)).finalize(c)
            }
        },
        _createHmacHelper: function(a) {
            return function(c, d) {
                return (new t.HMAC.init(a,
                    d)).finalize(c)
            }
        }
    });
    var t = f.algo = {};
    return f
}(Math);
(function(h) {
    for (var s = CryptoJS, f = s.lib, g = f.WordArray, q = f.Hasher, f = s.algo, m = [], r = [], l = function(a) {
            return 4294967296 * (a - (a | 0)) | 0
        }, k = 2, n = 0; 64 > n;) {
        var j;
        a: {
            j = k;
            for (var u = h.sqrt(j), t = 2; t <= u; t++)
                if (!(j % t)) {
                    j = !1;
                    break a
                }
            j = !0
        }
        j && (8 > n && (m[n] = l(h.pow(k, 0.5))), r[n] = l(h.pow(k, 1 / 3)), n++);
        k++
    }
    var a = [],
        f = f.SHA256 = q.extend({
            _doReset: function() {
                this._hash = new g.init(m.slice(0))
            },
            _doProcessBlock: function(c, d) {
                for (var b = this._hash.words, e = b[0], f = b[1], g = b[2], j = b[3], h = b[4], m = b[5], n = b[6], q = b[7], p = 0; 64 > p; p++) {
                    if (16 > p) a[p] =
                        c[d + p] | 0;
                    else {
                        var k = a[p - 15],
                            l = a[p - 2];
                        a[p] = ((k << 25 | k >>> 7) ^ (k << 14 | k >>> 18) ^ k >>> 3) + a[p - 7] + ((l << 15 | l >>> 17) ^ (l << 13 | l >>> 19) ^ l >>> 10) + a[p - 16]
                    }
                    k = q + ((h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)) + (h & m ^ ~h & n) + r[p] + a[p];
                    l = ((e << 30 | e >>> 2) ^ (e << 19 | e >>> 13) ^ (e << 10 | e >>> 22)) + (e & f ^ e & g ^ f & g);
                    q = n;
                    n = m;
                    m = h;
                    h = j + k | 0;
                    j = g;
                    g = f;
                    f = e;
                    e = k + l | 0
                }
                b[0] = b[0] + e | 0;
                b[1] = b[1] + f | 0;
                b[2] = b[2] + g | 0;
                b[3] = b[3] + j | 0;
                b[4] = b[4] + h | 0;
                b[5] = b[5] + m | 0;
                b[6] = b[6] + n | 0;
                b[7] = b[7] + q | 0
            },
            _doFinalize: function() {
                var a = this._data,
                    d = a.words,
                    b = 8 * this._nDataBytes,
                    e = 8 * a.sigBytes;
                d[e >>> 5] |= 128 << 24 - e % 32;
                d[(e + 64 >>> 9 << 4) + 14] = h.floor(b / 4294967296);
                d[(e + 64 >>> 9 << 4) + 15] = b;
                a.sigBytes = 4 * d.length;
                this._process();
                return this._hash
            },
            clone: function() {
                var a = q.clone.call(this);
                a._hash = this._hash.clone();
                return a
            }
        });
    s.SHA256 = q._createHelper(f);
    s.HmacSHA256 = q._createHmacHelper(f)
})(Math);
(function() {
    var h = CryptoJS,
        s = h.enc.Utf8;
    h.algo.HMAC = h.lib.Base.extend({
        init: function(f, g) {
            f = this._hasher = new f.init;
            "string" == typeof g && (g = s.parse(g));
            var h = f.blockSize,
                m = 4 * h;
            g.sigBytes > m && (g = f.finalize(g));
            g.clamp();
            for (var r = this._oKey = g.clone(), l = this._iKey = g.clone(), k = r.words, n = l.words, j = 0; j < h; j++) k[j] ^= 1549556828, n[j] ^= 909522486;
            r.sigBytes = l.sigBytes = m;
            this.reset()
        },
        reset: function() {
            var f = this._hasher;
            f.reset();
            f.update(this._iKey)
        },
        update: function(f) {
            this._hasher.update(f);
            return this
        },
        finalize: function(f) {
            var g =
                this._hasher;
            f = g.finalize(f);
            g.reset();
            return g.finalize(this._oKey.clone().concat(f))
        }
    })
})();

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function() {
    var h = CryptoJS,
        j = h.lib.WordArray;
    h.enc.Base64 = {
        stringify: function(b) {
            var e = b.words,
                f = b.sigBytes,
                c = this._map;
            b.clamp();
            b = [];
            for (var a = 0; a < f; a += 3)
                for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && a + 0.75 * g < f; g++) b.push(c.charAt(d >>> 6 * (3 - g) & 63));
            if (e = c.charAt(64))
                for (; b.length % 4;) b.push(e);
            return b.join("")
        },
        parse: function(b) {
            var e = b.length,
                f = this._map,
                c = f.charAt(64);
            c && (c = b.indexOf(c), -1 != c && (e = c));
            for (var c = [], a = 0, d = 0; d <
                e; d++)
                if (d % 4) {
                    var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4),
                        h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4);
                    c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4);
                    a++
                }
            return j.create(c, a)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
})();

var gameanalytics;
(function (gameanalytics) {
    var EGAErrorSeverity;
    (function (EGAErrorSeverity) {
        EGAErrorSeverity[EGAErrorSeverity["Undefined"] = 0] = "Undefined";
        EGAErrorSeverity[EGAErrorSeverity["Debug"] = 1] = "Debug";
        EGAErrorSeverity[EGAErrorSeverity["Info"] = 2] = "Info";
        EGAErrorSeverity[EGAErrorSeverity["Warning"] = 3] = "Warning";
        EGAErrorSeverity[EGAErrorSeverity["Error"] = 4] = "Error";
        EGAErrorSeverity[EGAErrorSeverity["Critical"] = 5] = "Critical";
    })(EGAErrorSeverity = gameanalytics.EGAErrorSeverity || (gameanalytics.EGAErrorSeverity = {}));
    var EGAProgressionStatus;
    (function (EGAProgressionStatus) {
        EGAProgressionStatus[EGAProgressionStatus["Undefined"] = 0] = "Undefined";
        EGAProgressionStatus[EGAProgressionStatus["Start"] = 1] = "Start";
        EGAProgressionStatus[EGAProgressionStatus["Complete"] = 2] = "Complete";
        EGAProgressionStatus[EGAProgressionStatus["Fail"] = 3] = "Fail";
    })(EGAProgressionStatus = gameanalytics.EGAProgressionStatus || (gameanalytics.EGAProgressionStatus = {}));
    var EGAResourceFlowType;
    (function (EGAResourceFlowType) {
        EGAResourceFlowType[EGAResourceFlowType["Undefined"] = 0] = "Undefined";
        EGAResourceFlowType[EGAResourceFlowType["Source"] = 1] = "Source";
        EGAResourceFlowType[EGAResourceFlowType["Sink"] = 2] = "Sink";
    })(EGAResourceFlowType = gameanalytics.EGAResourceFlowType || (gameanalytics.EGAResourceFlowType = {}));
    var EGAAdAction;
    (function (EGAAdAction) {
        EGAAdAction[EGAAdAction["Undefined"] = 0] = "Undefined";
        EGAAdAction[EGAAdAction["Clicked"] = 1] = "Clicked";
        EGAAdAction[EGAAdAction["Show"] = 2] = "Show";
        EGAAdAction[EGAAdAction["FailedShow"] = 3] = "FailedShow";
        EGAAdAction[EGAAdAction["RewardReceived"] = 4] = "RewardReceived";
    })(EGAAdAction = gameanalytics.EGAAdAction || (gameanalytics.EGAAdAction = {}));
    var EGAAdError;
    (function (EGAAdError) {
        EGAAdError[EGAAdError["Undefined"] = 0] = "Undefined";
        EGAAdError[EGAAdError["Unknown"] = 1] = "Unknown";
        EGAAdError[EGAAdError["Offline"] = 2] = "Offline";
        EGAAdError[EGAAdError["NoFill"] = 3] = "NoFill";
        EGAAdError[EGAAdError["InternalError"] = 4] = "InternalError";
        EGAAdError[EGAAdError["InvalidRequest"] = 5] = "InvalidRequest";
        EGAAdError[EGAAdError["UnableToPrecache"] = 6] = "UnableToPrecache";
    })(EGAAdError = gameanalytics.EGAAdError || (gameanalytics.EGAAdError = {}));
    var EGAAdType;
    (function (EGAAdType) {
        EGAAdType[EGAAdType["Undefined"] = 0] = "Undefined";
        EGAAdType[EGAAdType["Video"] = 1] = "Video";
        EGAAdType[EGAAdType["RewardedVideo"] = 2] = "RewardedVideo";
        EGAAdType[EGAAdType["Playable"] = 3] = "Playable";
        EGAAdType[EGAAdType["Interstitial"] = 4] = "Interstitial";
        EGAAdType[EGAAdType["OfferWall"] = 5] = "OfferWall";
        EGAAdType[EGAAdType["Banner"] = 6] = "Banner";
    })(EGAAdType = gameanalytics.EGAAdType || (gameanalytics.EGAAdType = {}));
    var http;
    (function (http) {
        var EGAHTTPApiResponse;
        (function (EGAHTTPApiResponse) {
            EGAHTTPApiResponse[EGAHTTPApiResponse["NoResponse"] = 0] = "NoResponse";
            EGAHTTPApiResponse[EGAHTTPApiResponse["BadResponse"] = 1] = "BadResponse";
            EGAHTTPApiResponse[EGAHTTPApiResponse["RequestTimeout"] = 2] = "RequestTimeout";
            EGAHTTPApiResponse[EGAHTTPApiResponse["JsonEncodeFailed"] = 3] = "JsonEncodeFailed";
            EGAHTTPApiResponse[EGAHTTPApiResponse["JsonDecodeFailed"] = 4] = "JsonDecodeFailed";
            EGAHTTPApiResponse[EGAHTTPApiResponse["InternalServerError"] = 5] = "InternalServerError";
            EGAHTTPApiResponse[EGAHTTPApiResponse["BadRequest"] = 6] = "BadRequest";
            EGAHTTPApiResponse[EGAHTTPApiResponse["Unauthorized"] = 7] = "Unauthorized";
            EGAHTTPApiResponse[EGAHTTPApiResponse["UnknownResponseCode"] = 8] = "UnknownResponseCode";
            EGAHTTPApiResponse[EGAHTTPApiResponse["Ok"] = 9] = "Ok";
            EGAHTTPApiResponse[EGAHTTPApiResponse["Created"] = 10] = "Created";
        })(EGAHTTPApiResponse = http.EGAHTTPApiResponse || (http.EGAHTTPApiResponse = {}));
    })(http = gameanalytics.http || (gameanalytics.http = {}));
    var events;
    (function (events) {
        var EGASdkErrorCategory;
        (function (EGASdkErrorCategory) {
            EGASdkErrorCategory[EGASdkErrorCategory["Undefined"] = 0] = "Undefined";
            EGASdkErrorCategory[EGASdkErrorCategory["EventValidation"] = 1] = "EventValidation";
            EGASdkErrorCategory[EGASdkErrorCategory["Database"] = 2] = "Database";
            EGASdkErrorCategory[EGASdkErrorCategory["Init"] = 3] = "Init";
            EGASdkErrorCategory[EGASdkErrorCategory["Http"] = 4] = "Http";
            EGASdkErrorCategory[EGASdkErrorCategory["Json"] = 5] = "Json";
        })(EGASdkErrorCategory = events.EGASdkErrorCategory || (events.EGASdkErrorCategory = {}));
        var EGASdkErrorArea;
        (function (EGASdkErrorArea) {
            EGASdkErrorArea[EGASdkErrorArea["Undefined"] = 0] = "Undefined";
            EGASdkErrorArea[EGASdkErrorArea["BusinessEvent"] = 1] = "BusinessEvent";
            EGASdkErrorArea[EGASdkErrorArea["ResourceEvent"] = 2] = "ResourceEvent";
            EGASdkErrorArea[EGASdkErrorArea["ProgressionEvent"] = 3] = "ProgressionEvent";
            EGASdkErrorArea[EGASdkErrorArea["DesignEvent"] = 4] = "DesignEvent";
            EGASdkErrorArea[EGASdkErrorArea["ErrorEvent"] = 5] = "ErrorEvent";
            EGASdkErrorArea[EGASdkErrorArea["InitHttp"] = 9] = "InitHttp";
            EGASdkErrorArea[EGASdkErrorArea["EventsHttp"] = 10] = "EventsHttp";
            EGASdkErrorArea[EGASdkErrorArea["ProcessEvents"] = 11] = "ProcessEvents";
            EGASdkErrorArea[EGASdkErrorArea["AddEventsToStore"] = 12] = "AddEventsToStore";
            EGASdkErrorArea[EGASdkErrorArea["AdEvent"] = 20] = "AdEvent";
        })(EGASdkErrorArea = events.EGASdkErrorArea || (events.EGASdkErrorArea = {}));
        var EGASdkErrorAction;
        (function (EGASdkErrorAction) {
            EGASdkErrorAction[EGASdkErrorAction["Undefined"] = 0] = "Undefined";
            EGASdkErrorAction[EGASdkErrorAction["InvalidCurrency"] = 1] = "InvalidCurrency";
            EGASdkErrorAction[EGASdkErrorAction["InvalidShortString"] = 2] = "InvalidShortString";
            EGASdkErrorAction[EGASdkErrorAction["InvalidEventPartLength"] = 3] = "InvalidEventPartLength";
            EGASdkErrorAction[EGASdkErrorAction["InvalidEventPartCharacters"] = 4] = "InvalidEventPartCharacters";
            EGASdkErrorAction[EGASdkErrorAction["InvalidStore"] = 5] = "InvalidStore";
            EGASdkErrorAction[EGASdkErrorAction["InvalidFlowType"] = 6] = "InvalidFlowType";
            EGASdkErrorAction[EGASdkErrorAction["StringEmptyOrNull"] = 7] = "StringEmptyOrNull";
            EGASdkErrorAction[EGASdkErrorAction["NotFoundInAvailableCurrencies"] = 8] = "NotFoundInAvailableCurrencies";
            EGASdkErrorAction[EGASdkErrorAction["InvalidAmount"] = 9] = "InvalidAmount";
            EGASdkErrorAction[EGASdkErrorAction["NotFoundInAvailableItemTypes"] = 10] = "NotFoundInAvailableItemTypes";
            EGASdkErrorAction[EGASdkErrorAction["WrongProgressionOrder"] = 11] = "WrongProgressionOrder";
            EGASdkErrorAction[EGASdkErrorAction["InvalidEventIdLength"] = 12] = "InvalidEventIdLength";
            EGASdkErrorAction[EGASdkErrorAction["InvalidEventIdCharacters"] = 13] = "InvalidEventIdCharacters";
            EGASdkErrorAction[EGASdkErrorAction["InvalidProgressionStatus"] = 15] = "InvalidProgressionStatus";
            EGASdkErrorAction[EGASdkErrorAction["InvalidSeverity"] = 16] = "InvalidSeverity";
            EGASdkErrorAction[EGASdkErrorAction["InvalidLongString"] = 17] = "InvalidLongString";
            EGASdkErrorAction[EGASdkErrorAction["DatabaseTooLarge"] = 18] = "DatabaseTooLarge";
            EGASdkErrorAction[EGASdkErrorAction["DatabaseOpenOrCreate"] = 19] = "DatabaseOpenOrCreate";
            EGASdkErrorAction[EGASdkErrorAction["JsonError"] = 25] = "JsonError";
            EGASdkErrorAction[EGASdkErrorAction["FailHttpJsonDecode"] = 29] = "FailHttpJsonDecode";
            EGASdkErrorAction[EGASdkErrorAction["FailHttpJsonEncode"] = 30] = "FailHttpJsonEncode";
            EGASdkErrorAction[EGASdkErrorAction["InvalidAdAction"] = 31] = "InvalidAdAction";
            EGASdkErrorAction[EGASdkErrorAction["InvalidAdType"] = 32] = "InvalidAdType";
            EGASdkErrorAction[EGASdkErrorAction["InvalidString"] = 33] = "InvalidString";
        })(EGASdkErrorAction = events.EGASdkErrorAction || (events.EGASdkErrorAction = {}));
        var EGASdkErrorParameter;
        (function (EGASdkErrorParameter) {
            EGASdkErrorParameter[EGASdkErrorParameter["Undefined"] = 0] = "Undefined";
            EGASdkErrorParameter[EGASdkErrorParameter["Currency"] = 1] = "Currency";
            EGASdkErrorParameter[EGASdkErrorParameter["CartType"] = 2] = "CartType";
            EGASdkErrorParameter[EGASdkErrorParameter["ItemType"] = 3] = "ItemType";
            EGASdkErrorParameter[EGASdkErrorParameter["ItemId"] = 4] = "ItemId";
            EGASdkErrorParameter[EGASdkErrorParameter["Store"] = 5] = "Store";
            EGASdkErrorParameter[EGASdkErrorParameter["FlowType"] = 6] = "FlowType";
            EGASdkErrorParameter[EGASdkErrorParameter["Amount"] = 7] = "Amount";
            EGASdkErrorParameter[EGASdkErrorParameter["Progression01"] = 8] = "Progression01";
            EGASdkErrorParameter[EGASdkErrorParameter["Progression02"] = 9] = "Progression02";
            EGASdkErrorParameter[EGASdkErrorParameter["Progression03"] = 10] = "Progression03";
            EGASdkErrorParameter[EGASdkErrorParameter["EventId"] = 11] = "EventId";
            EGASdkErrorParameter[EGASdkErrorParameter["ProgressionStatus"] = 12] = "ProgressionStatus";
            EGASdkErrorParameter[EGASdkErrorParameter["Severity"] = 13] = "Severity";
            EGASdkErrorParameter[EGASdkErrorParameter["Message"] = 14] = "Message";
            EGASdkErrorParameter[EGASdkErrorParameter["AdAction"] = 15] = "AdAction";
            EGASdkErrorParameter[EGASdkErrorParameter["AdType"] = 16] = "AdType";
            EGASdkErrorParameter[EGASdkErrorParameter["AdSdkName"] = 17] = "AdSdkName";
            EGASdkErrorParameter[EGASdkErrorParameter["AdPlacement"] = 18] = "AdPlacement";
        })(EGASdkErrorParameter = events.EGASdkErrorParameter || (events.EGASdkErrorParameter = {}));
    })(events = gameanalytics.events || (gameanalytics.events = {}));
})(gameanalytics || (gameanalytics = {}));
var EGAErrorSeverity = gameanalytics.EGAErrorSeverity;
var EGAProgressionStatus = gameanalytics.EGAProgressionStatus;
var EGAResourceFlowType = gameanalytics.EGAResourceFlowType;
var gameanalytics;
(function (gameanalytics) {
    var logging;
    (function (logging) {
        var EGALoggerMessageType;
        (function (EGALoggerMessageType) {
            EGALoggerMessageType[EGALoggerMessageType["Error"] = 0] = "Error";
            EGALoggerMessageType[EGALoggerMessageType["Warning"] = 1] = "Warning";
            EGALoggerMessageType[EGALoggerMessageType["Info"] = 2] = "Info";
            EGALoggerMessageType[EGALoggerMessageType["Debug"] = 3] = "Debug";
        })(EGALoggerMessageType || (EGALoggerMessageType = {}));
        var GALogger = (function () {
            function GALogger() {
                GALogger.debugEnabled = false;
            }
            GALogger.setInfoLog = function (value) {
                GALogger.instance.infoLogEnabled = value;
            };
            GALogger.setVerboseLog = function (value) {
                GALogger.instance.infoLogVerboseEnabled = value;
            };
            GALogger.i = function (format) {
                if (!GALogger.instance.infoLogEnabled) {
                    return;
                }
                var message = "Info/" + GALogger.Tag + ": " + format;
                GALogger.instance.sendNotificationMessage(message, EGALoggerMessageType.Info);
            };
            GALogger.w = function (format) {
                var message = "Warning/" + GALogger.Tag + ": " + format;
                GALogger.instance.sendNotificationMessage(message, EGALoggerMessageType.Warning);
            };
            GALogger.e = function (format) {
                var message = "Error/" + GALogger.Tag + ": " + format;
                GALogger.instance.sendNotificationMessage(message, EGALoggerMessageType.Error);
            };
            GALogger.ii = function (format) {
                if (!GALogger.instance.infoLogVerboseEnabled) {
                    return;
                }
                var message = "Verbose/" + GALogger.Tag + ": " + format;
                GALogger.instance.sendNotificationMessage(message, EGALoggerMessageType.Info);
            };
            GALogger.d = function (format) {
                if (!GALogger.debugEnabled) {
                    return;
                }
                var message = "Debug/" + GALogger.Tag + ": " + format;
                GALogger.instance.sendNotificationMessage(message, EGALoggerMessageType.Debug);
            };
            GALogger.prototype.sendNotificationMessage = function (message, type) {
                switch (type) {
                    case EGALoggerMessageType.Error:
                        {
                            console.error(message);
                        }
                        break;
                    case EGALoggerMessageType.Warning:
                        {
                            console.warn(message);
                        }
                        break;
                    case EGALoggerMessageType.Debug:
                        {
                            if (typeof console.debug === "function") {
                                console.debug(message);
                            }
                            else {
                                console.log(message);
                            }
                        }
                        break;
                    case EGALoggerMessageType.Info:
                        {
                            console.log(message);
                        }
                        break;
                }
            };
            GALogger.instance = new GALogger();
            GALogger.Tag = "GameAnalytics";
            return GALogger;
        }());
        logging.GALogger = GALogger;
    })(logging = gameanalytics.logging || (gameanalytics.logging = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var utilities;
    (function (utilities) {
        var GALogger = gameanalytics.logging.GALogger;
        var GAUtilities = (function () {
            function GAUtilities() {
            }
            GAUtilities.getHmac = function (key, data) {
                var encryptedMessage = CryptoJS.HmacSHA256(data, key);
                return CryptoJS.enc.Base64.stringify(encryptedMessage);
            };
            GAUtilities.stringMatch = function (s, pattern) {
                if (!s || !pattern) {
                    return false;
                }
                return pattern.test(s);
            };
            GAUtilities.joinStringArray = function (v, delimiter) {
                var result = "";
                for (var i = 0, il = v.length; i < il; i++) {
                    if (i > 0) {
                        result += delimiter;
                    }
                    result += v[i];
                }
                return result;
            };
            GAUtilities.stringArrayContainsString = function (array, search) {
                if (array.length === 0) {
                    return false;
                }
                for (var s in array) {
                    if (array[s] === search) {
                        return true;
                    }
                }
                return false;
            };
            GAUtilities.encode64 = function (input) {
                input = encodeURI(input);
                var output = "";
                var chr1, chr2, chr3 = 0;
                var enc1, enc2, enc3, enc4 = 0;
                var i = 0;
                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    }
                    else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output +
                        GAUtilities.keyStr.charAt(enc1) +
                        GAUtilities.keyStr.charAt(enc2) +
                        GAUtilities.keyStr.charAt(enc3) +
                        GAUtilities.keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = 0;
                    enc1 = enc2 = enc3 = enc4 = 0;
                } while (i < input.length);
                return output;
            };
            GAUtilities.decode64 = function (input) {
                var output = "";
                var chr1, chr2, chr3 = 0;
                var enc1, enc2, enc3, enc4 = 0;
                var i = 0;
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    GALogger.w("There were invalid base64 characters in the input text. Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='. Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                do {
                    enc1 = GAUtilities.keyStr.indexOf(input.charAt(i++));
                    enc2 = GAUtilities.keyStr.indexOf(input.charAt(i++));
                    enc3 = GAUtilities.keyStr.indexOf(input.charAt(i++));
                    enc4 = GAUtilities.keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                    chr1 = chr2 = chr3 = 0;
                    enc1 = enc2 = enc3 = enc4 = 0;
                } while (i < input.length);
                return decodeURI(output);
            };
            GAUtilities.timeIntervalSince1970 = function () {
                var date = new Date();
                return Math.round(date.getTime() / 1000);
            };
            GAUtilities.createGuid = function () {
                return (GAUtilities.s4() + GAUtilities.s4() + "-" + GAUtilities.s4() + "-4" + GAUtilities.s4().substr(0, 3) + "-" + GAUtilities.s4() + "-" + GAUtilities.s4() + GAUtilities.s4() + GAUtilities.s4()).toLowerCase();
            };
            GAUtilities.s4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            GAUtilities.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            return GAUtilities;
        }());
        utilities.GAUtilities = GAUtilities;
    })(utilities = gameanalytics.utilities || (gameanalytics.utilities = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var validators;
    (function (validators) {
        var GALogger = gameanalytics.logging.GALogger;
        var GAUtilities = gameanalytics.utilities.GAUtilities;
        var EGASdkErrorCategory = gameanalytics.events.EGASdkErrorCategory;
        var EGASdkErrorArea = gameanalytics.events.EGASdkErrorArea;
        var EGASdkErrorAction = gameanalytics.events.EGASdkErrorAction;
        var EGASdkErrorParameter = gameanalytics.events.EGASdkErrorParameter;
        var ValidationResult = (function () {
            function ValidationResult(category, area, action, parameter, reason) {
                this.category = category;
                this.area = area;
                this.action = action;
                this.parameter = parameter;
                this.reason = reason;
            }
            return ValidationResult;
        }());
        validators.ValidationResult = ValidationResult;
        var GAValidator = (function () {
            function GAValidator() {
            }
            GAValidator.validateBusinessEvent = function (currency, amount, cartType, itemType, itemId) {
                if (!GAValidator.validateCurrency(currency)) {
                    GALogger.w("Validation fail - business event - currency: Cannot be (null) and need to be A-Z, 3 characters and in the standard at openexchangerates.org. Failed currency: " + currency);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.BusinessEvent, EGASdkErrorAction.InvalidCurrency, EGASdkErrorParameter.Currency, currency);
                }
                if (amount < 0) {
                    GALogger.w("Validation fail - business event - amount. Cannot be less than 0. Failed amount: " + amount);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.BusinessEvent, EGASdkErrorAction.InvalidAmount, EGASdkErrorParameter.Amount, amount + "");
                }
                if (!GAValidator.validateShortString(cartType, true)) {
                    GALogger.w("Validation fail - business event - cartType. Cannot be above 32 length. String: " + cartType);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.BusinessEvent, EGASdkErrorAction.InvalidShortString, EGASdkErrorParameter.CartType, cartType);
                }
                if (!GAValidator.validateEventPartLength(itemType, false)) {
                    GALogger.w("Validation fail - business event - itemType: Cannot be (null), empty or above 64 characters. String: " + itemType);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.BusinessEvent, EGASdkErrorAction.InvalidEventPartLength, EGASdkErrorParameter.ItemType, itemType);
                }
                if (!GAValidator.validateEventPartCharacters(itemType)) {
                    GALogger.w("Validation fail - business event - itemType: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + itemType);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.BusinessEvent, EGASdkErrorAction.InvalidEventPartCharacters, EGASdkErrorParameter.ItemType, itemType);
                }
                if (!GAValidator.validateEventPartLength(itemId, false)) {
                    GALogger.w("Validation fail - business event - itemId. Cannot be (null), empty or above 64 characters. String: " + itemId);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.BusinessEvent, EGASdkErrorAction.InvalidEventPartLength, EGASdkErrorParameter.ItemId, itemId);
                }
                if (!GAValidator.validateEventPartCharacters(itemId)) {
                    GALogger.w("Validation fail - business event - itemId: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + itemId);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.BusinessEvent, EGASdkErrorAction.InvalidEventPartCharacters, EGASdkErrorParameter.ItemId, itemId);
                }
                return null;
            };
            GAValidator.validateResourceEvent = function (flowType, currency, amount, itemType, itemId, availableCurrencies, availableItemTypes) {
                if (flowType == gameanalytics.EGAResourceFlowType.Undefined) {
                    GALogger.w("Validation fail - resource event - flowType: Invalid flow type.");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ResourceEvent, EGASdkErrorAction.InvalidFlowType, EGASdkErrorParameter.FlowType, "");
                }
                if (!currency) {
                    GALogger.w("Validation fail - resource event - currency: Cannot be (null)");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ResourceEvent, EGASdkErrorAction.StringEmptyOrNull, EGASdkErrorParameter.Currency, "");
                }
                if (!GAUtilities.stringArrayContainsString(availableCurrencies, currency)) {
                    GALogger.w("Validation fail - resource event - currency: Not found in list of pre-defined available resource currencies. String: " + currency);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ResourceEvent, EGASdkErrorAction.NotFoundInAvailableCurrencies, EGASdkErrorParameter.Currency, currency);
                }
                if (!(amount > 0)) {
                    GALogger.w("Validation fail - resource event - amount: Float amount cannot be 0 or negative. Value: " + amount);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ResourceEvent, EGASdkErrorAction.InvalidAmount, EGASdkErrorParameter.Amount, amount + "");
                }
                if (!itemType) {
                    GALogger.w("Validation fail - resource event - itemType: Cannot be (null)");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ResourceEvent, EGASdkErrorAction.StringEmptyOrNull, EGASdkErrorParameter.ItemType, "");
                }
                if (!GAValidator.validateEventPartLength(itemType, false)) {
                    GALogger.w("Validation fail - resource event - itemType: Cannot be (null), empty or above 64 characters. String: " + itemType);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ResourceEvent, EGASdkErrorAction.InvalidEventPartLength, EGASdkErrorParameter.ItemType, itemType);
                }
                if (!GAValidator.validateEventPartCharacters(itemType)) {
                    GALogger.w("Validation fail - resource event - itemType: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + itemType);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ResourceEvent, EGASdkErrorAction.InvalidEventPartCharacters, EGASdkErrorParameter.ItemType, itemType);
                }
                if (!GAUtilities.stringArrayContainsString(availableItemTypes, itemType)) {
                    GALogger.w("Validation fail - resource event - itemType: Not found in list of pre-defined available resource itemTypes. String: " + itemType);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ResourceEvent, EGASdkErrorAction.NotFoundInAvailableItemTypes, EGASdkErrorParameter.ItemType, itemType);
                }
                if (!GAValidator.validateEventPartLength(itemId, false)) {
                    GALogger.w("Validation fail - resource event - itemId: Cannot be (null), empty or above 64 characters. String: " + itemId);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ResourceEvent, EGASdkErrorAction.InvalidEventPartLength, EGASdkErrorParameter.ItemId, itemId);
                }
                if (!GAValidator.validateEventPartCharacters(itemId)) {
                    GALogger.w("Validation fail - resource event - itemId: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + itemId);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ResourceEvent, EGASdkErrorAction.InvalidEventPartCharacters, EGASdkErrorParameter.ItemId, itemId);
                }
                return null;
            };
            GAValidator.validateProgressionEvent = function (progressionStatus, progression01, progression02, progression03) {
                if (progressionStatus == gameanalytics.EGAProgressionStatus.Undefined) {
                    GALogger.w("Validation fail - progression event: Invalid progression status.");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ProgressionEvent, EGASdkErrorAction.InvalidProgressionStatus, EGASdkErrorParameter.ProgressionStatus, "");
                }
                if (progression03 && !(progression02 || !progression01)) {
                    GALogger.w("Validation fail - progression event: 03 found but 01+02 are invalid. Progression must be set as either 01, 01+02 or 01+02+03.");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ProgressionEvent, EGASdkErrorAction.WrongProgressionOrder, EGASdkErrorParameter.Undefined, progression01 + ":" + progression02 + ":" + progression03);
                }
                else if (progression02 && !progression01) {
                    GALogger.w("Validation fail - progression event: 02 found but not 01. Progression must be set as either 01, 01+02 or 01+02+03");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ProgressionEvent, EGASdkErrorAction.WrongProgressionOrder, EGASdkErrorParameter.Undefined, progression01 + ":" + progression02 + ":" + progression03);
                }
                else if (!progression01) {
                    GALogger.w("Validation fail - progression event: progression01 not valid. Progressions must be set as either 01, 01+02 or 01+02+03");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ProgressionEvent, EGASdkErrorAction.WrongProgressionOrder, EGASdkErrorParameter.Undefined, (progression01 ? progression01 : "") + ":" + (progression02 ? progression02 : "") + ":" + (progression03 ? progression03 : ""));
                }
                if (!GAValidator.validateEventPartLength(progression01, false)) {
                    GALogger.w("Validation fail - progression event - progression01: Cannot be (null), empty or above 64 characters. String: " + progression01);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ProgressionEvent, EGASdkErrorAction.InvalidEventPartLength, EGASdkErrorParameter.Progression01, progression01);
                }
                if (!GAValidator.validateEventPartCharacters(progression01)) {
                    GALogger.w("Validation fail - progression event - progression01: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + progression01);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ProgressionEvent, EGASdkErrorAction.InvalidEventPartCharacters, EGASdkErrorParameter.Progression01, progression01);
                }
                if (progression02) {
                    if (!GAValidator.validateEventPartLength(progression02, true)) {
                        GALogger.w("Validation fail - progression event - progression02: Cannot be empty or above 64 characters. String: " + progression02);
                        return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ProgressionEvent, EGASdkErrorAction.InvalidEventPartLength, EGASdkErrorParameter.Progression02, progression02);
                    }
                    if (!GAValidator.validateEventPartCharacters(progression02)) {
                        GALogger.w("Validation fail - progression event - progression02: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + progression02);
                        return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ProgressionEvent, EGASdkErrorAction.InvalidEventPartCharacters, EGASdkErrorParameter.Progression02, progression02);
                    }
                }
                if (progression03) {
                    if (!GAValidator.validateEventPartLength(progression03, true)) {
                        GALogger.w("Validation fail - progression event - progression03: Cannot be empty or above 64 characters. String: " + progression03);
                        return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ProgressionEvent, EGASdkErrorAction.InvalidEventPartLength, EGASdkErrorParameter.Progression03, progression03);
                    }
                    if (!GAValidator.validateEventPartCharacters(progression03)) {
                        GALogger.w("Validation fail - progression event - progression03: Cannot contain other characters than A-z, 0-9, -_., ()!?. String: " + progression03);
                        return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ProgressionEvent, EGASdkErrorAction.InvalidEventPartCharacters, EGASdkErrorParameter.Progression03, progression03);
                    }
                }
                return null;
            };
            GAValidator.validateDesignEvent = function (eventId) {
                if (!GAValidator.validateEventIdLength(eventId)) {
                    GALogger.w("Validation fail - design event - eventId: Cannot be (null) or empty. Only 5 event parts allowed seperated by :. Each part need to be 64 characters or less. String: " + eventId);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.DesignEvent, EGASdkErrorAction.InvalidEventIdLength, EGASdkErrorParameter.EventId, eventId);
                }
                if (!GAValidator.validateEventIdCharacters(eventId)) {
                    GALogger.w("Validation fail - design event - eventId: Non valid characters. Only allowed A-z, 0-9, -_., ()!?. String: " + eventId);
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.DesignEvent, EGASdkErrorAction.InvalidEventIdCharacters, EGASdkErrorParameter.EventId, eventId);
                }
                return null;
            };
            GAValidator.validateErrorEvent = function (severity, message) {
                if (severity == gameanalytics.EGAErrorSeverity.Undefined) {
                    GALogger.w("Validation fail - error event - severity: Severity was unsupported value.");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ErrorEvent, EGASdkErrorAction.InvalidSeverity, EGASdkErrorParameter.Severity, "");
                }
                if (!GAValidator.validateLongString(message, true)) {
                    GALogger.w("Validation fail - error event - message: Message cannot be above 8192 characters.");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.ErrorEvent, EGASdkErrorAction.InvalidLongString, EGASdkErrorParameter.Message, message);
                }
                return null;
            };
            GAValidator.validateAdEvent = function (adAction, adType, adSdkName, adPlacement) {
                if (adAction == gameanalytics.EGAAdAction.Undefined) {
                    GALogger.w("Validation fail - error event - severity: Severity was unsupported value.");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.AdEvent, EGASdkErrorAction.InvalidAdAction, EGASdkErrorParameter.AdAction, "");
                }
                if (adType == gameanalytics.EGAAdType.Undefined) {
                    GALogger.w("Validation fail - ad event - adType: Ad type was unsupported value.");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.AdEvent, EGASdkErrorAction.InvalidAdType, EGASdkErrorParameter.AdType, "");
                }
                if (!GAValidator.validateShortString(adSdkName, false)) {
                    GALogger.w("Validation fail - ad event - message: Ad SDK name cannot be above 32 characters.");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.AdEvent, EGASdkErrorAction.InvalidShortString, EGASdkErrorParameter.AdSdkName, adSdkName);
                }
                if (!GAValidator.validateString(adPlacement, false)) {
                    GALogger.w("Validation fail - ad event - message: Ad placement cannot be above 64 characters.");
                    return new ValidationResult(EGASdkErrorCategory.EventValidation, EGASdkErrorArea.AdEvent, EGASdkErrorAction.InvalidString, EGASdkErrorParameter.AdPlacement, adPlacement);
                }
                return null;
            };
            GAValidator.validateSdkErrorEvent = function (gameKey, gameSecret, category, area, action) {
                if (!GAValidator.validateKeys(gameKey, gameSecret)) {
                    return false;
                }
                if (category === EGASdkErrorCategory.Undefined) {
                    GALogger.w("Validation fail - sdk error event - type: Category was unsupported value.");
                    return false;
                }
                if (area === EGASdkErrorArea.Undefined) {
                    GALogger.w("Validation fail - sdk error event - type: Area was unsupported value.");
                    return false;
                }
                if (action === EGASdkErrorAction.Undefined) {
                    GALogger.w("Validation fail - sdk error event - type: Action was unsupported value.");
                    return false;
                }
                return true;
            };
            GAValidator.validateKeys = function (gameKey, gameSecret) {
                if (GAUtilities.stringMatch(gameKey, /^[A-z0-9]{32}$/)) {
                    if (GAUtilities.stringMatch(gameSecret, /^[A-z0-9]{40}$/)) {
                        return true;
                    }
                }
                return false;
            };
            GAValidator.validateCurrency = function (currency) {
                if (!currency) {
                    return false;
                }
                if (!GAUtilities.stringMatch(currency, /^[A-Z]{3}$/)) {
                    return false;
                }
                return true;
            };
            GAValidator.validateEventPartLength = function (eventPart, allowNull) {
                if (allowNull && !eventPart) {
                    return true;
                }
                if (!eventPart) {
                    return false;
                }
                if (eventPart.length > 64) {
                    return false;
                }
                return true;
            };
            GAValidator.validateEventPartCharacters = function (eventPart) {
                if (!GAUtilities.stringMatch(eventPart, /^[A-Za-z0-9\s\-_\.\(\)\!\?]{1,64}$/)) {
                    return false;
                }
                return true;
            };
            GAValidator.validateEventIdLength = function (eventId) {
                if (!eventId) {
                    return false;
                }
                if (!GAUtilities.stringMatch(eventId, /^[^:]{1,64}(?::[^:]{1,64}){0,4}$/)) {
                    return false;
                }
                return true;
            };
            GAValidator.validateEventIdCharacters = function (eventId) {
                if (!eventId) {
                    return false;
                }
                if (!GAUtilities.stringMatch(eventId, /^[A-Za-z0-9\s\-_\.\(\)\!\?]{1,64}(:[A-Za-z0-9\s\-_\.\(\)\!\?]{1,64}){0,4}$/)) {
                    return false;
                }
                return true;
            };
            GAValidator.validateAndCleanInitRequestResponse = function (initResponse, configsCreated) {
                if (initResponse == null) {
                    GALogger.w("validateInitRequestResponse failed - no response dictionary.");
                    return null;
                }
                var validatedDict = {};
                try {
                    var serverTsNumber = initResponse["server_ts"];
                    if (serverTsNumber > 0) {
                        validatedDict["server_ts"] = serverTsNumber;
                    }
                    else {
                        GALogger.w("validateInitRequestResponse failed - invalid value in 'server_ts' field.");
                        return null;
                    }
                }
                catch (e) {
                    GALogger.w("validateInitRequestResponse failed - invalid type in 'server_ts' field. type=" + typeof initResponse["server_ts"] + ", value=" + initResponse["server_ts"] + ", " + e);
                    return null;
                }
                if (configsCreated) {
                    try {
                        var configurations = initResponse["configs"];
                        validatedDict["configs"] = configurations;
                    }
                    catch (e) {
                        GALogger.w("validateInitRequestResponse failed - invalid type in 'configs' field. type=" + typeof initResponse["configs"] + ", value=" + initResponse["configs"] + ", " + e);
                        return null;
                    }
                    try {
                        var configs_hash = initResponse["configs_hash"];
                        validatedDict["configs_hash"] = configs_hash;
                    }
                    catch (e) {
                        GALogger.w("validateInitRequestResponse failed - invalid type in 'configs_hash' field. type=" + typeof initResponse["configs_hash"] + ", value=" + initResponse["configs_hash"] + ", " + e);
                        return null;
                    }
                    try {
                        var ab_id = initResponse["ab_id"];
                        validatedDict["ab_id"] = ab_id;
                    }
                    catch (e) {
                        GALogger.w("validateInitRequestResponse failed - invalid type in 'ab_id' field. type=" + typeof initResponse["ab_id"] + ", value=" + initResponse["ab_id"] + ", " + e);
                        return null;
                    }
                    try {
                        var ab_variant_id = initResponse["ab_variant_id"];
                        validatedDict["ab_variant_id"] = ab_variant_id;
                    }
                    catch (e) {
                        GALogger.w("validateInitRequestResponse failed - invalid type in 'ab_variant_id' field. type=" + typeof initResponse["ab_variant_id"] + ", value=" + initResponse["ab_variant_id"] + ", " + e);
                        return null;
                    }
                }
                return validatedDict;
            };
            GAValidator.validateBuild = function (build) {
                if (!GAValidator.validateShortString(build, false)) {
                    return false;
                }
                return true;
            };
            GAValidator.validateSdkWrapperVersion = function (wrapperVersion) {
                if (!GAUtilities.stringMatch(wrapperVersion, /^(unity|unreal|gamemaker|cocos2d|construct|defold|godot|flutter) [0-9]{0,5}(\.[0-9]{0,5}){0,2}$/)) {
                    return false;
                }
                return true;
            };
            GAValidator.validateEngineVersion = function (engineVersion) {
                if (!engineVersion || !GAUtilities.stringMatch(engineVersion, /^(unity|unreal|gamemaker|cocos2d|construct|defold|godot) [0-9]{0,5}(\.[0-9]{0,5}){0,2}$/)) {
                    return false;
                }
                return true;
            };
            GAValidator.validateUserId = function (uId) {
                if (!GAValidator.validateString(uId, false)) {
                    GALogger.w("Validation fail - user id: id cannot be (null), empty or above 64 characters.");
                    return false;
                }
                return true;
            };
            GAValidator.validateShortString = function (shortString, canBeEmpty) {
                if (canBeEmpty && !shortString) {
                    return true;
                }
                if (!shortString || shortString.length > 32) {
                    return false;
                }
                return true;
            };
            GAValidator.validateString = function (s, canBeEmpty) {
                if (canBeEmpty && !s) {
                    return true;
                }
                if (!s || s.length > 64) {
                    return false;
                }
                return true;
            };
            GAValidator.validateLongString = function (longString, canBeEmpty) {
                if (canBeEmpty && !longString) {
                    return true;
                }
                if (!longString || longString.length > 8192) {
                    return false;
                }
                return true;
            };
            GAValidator.validateConnectionType = function (connectionType) {
                return GAUtilities.stringMatch(connectionType, /^(wwan|wifi|lan|offline)$/);
            };
            GAValidator.validateCustomDimensions = function (customDimensions) {
                return GAValidator.validateArrayOfStrings(20, 32, false, "custom dimensions", customDimensions);
            };
            GAValidator.validateResourceCurrencies = function (resourceCurrencies) {
                if (!GAValidator.validateArrayOfStrings(20, 64, false, "resource currencies", resourceCurrencies)) {
                    return false;
                }
                for (var i = 0; i < resourceCurrencies.length; ++i) {
                    if (!GAUtilities.stringMatch(resourceCurrencies[i], /^[A-Za-z]+$/)) {
                        GALogger.w("resource currencies validation failed: a resource currency can only be A-Z, a-z. String was: " + resourceCurrencies[i]);
                        return false;
                    }
                }
                return true;
            };
            GAValidator.validateResourceItemTypes = function (resourceItemTypes) {
                if (!GAValidator.validateArrayOfStrings(20, 32, false, "resource item types", resourceItemTypes)) {
                    return false;
                }
                for (var i = 0; i < resourceItemTypes.length; ++i) {
                    if (!GAValidator.validateEventPartCharacters(resourceItemTypes[i])) {
                        GALogger.w("resource item types validation failed: a resource item type cannot contain other characters than A-z, 0-9, -_., ()!?. String was: " + resourceItemTypes[i]);
                        return false;
                    }
                }
                return true;
            };
            GAValidator.validateDimension01 = function (dimension01, availableDimensions) {
                if (!dimension01) {
                    return true;
                }
                if (!GAUtilities.stringArrayContainsString(availableDimensions, dimension01)) {
                    return false;
                }
                return true;
            };
            GAValidator.validateDimension02 = function (dimension02, availableDimensions) {
                if (!dimension02) {
                    return true;
                }
                if (!GAUtilities.stringArrayContainsString(availableDimensions, dimension02)) {
                    return false;
                }
                return true;
            };
            GAValidator.validateDimension03 = function (dimension03, availableDimensions) {
                if (!dimension03) {
                    return true;
                }
                if (!GAUtilities.stringArrayContainsString(availableDimensions, dimension03)) {
                    return false;
                }
                return true;
            };
            GAValidator.validateArrayOfStrings = function (maxCount, maxStringLength, allowNoValues, logTag, arrayOfStrings) {
                var arrayTag = logTag;
                if (!arrayTag) {
                    arrayTag = "Array";
                }
                if (!arrayOfStrings) {
                    GALogger.w(arrayTag + " validation failed: array cannot be null. ");
                    return false;
                }
                if (allowNoValues == false && arrayOfStrings.length == 0) {
                    GALogger.w(arrayTag + " validation failed: array cannot be empty. ");
                    return false;
                }
                if (maxCount > 0 && arrayOfStrings.length > maxCount) {
                    GALogger.w(arrayTag + " validation failed: array cannot exceed " + maxCount + " values. It has " + arrayOfStrings.length + " values.");
                    return false;
                }
                for (var i = 0; i < arrayOfStrings.length; ++i) {
                    var stringLength = !arrayOfStrings[i] ? 0 : arrayOfStrings[i].length;
                    if (stringLength === 0) {
                        GALogger.w(arrayTag + " validation failed: contained an empty string. Array=" + JSON.stringify(arrayOfStrings));
                        return false;
                    }
                    if (maxStringLength > 0 && stringLength > maxStringLength) {
                        GALogger.w(arrayTag + " validation failed: a string exceeded max allowed length (which is: " + maxStringLength + "). String was: " + arrayOfStrings[i]);
                        return false;
                    }
                }
                return true;
            };
            GAValidator.validateClientTs = function (clientTs) {
                if (clientTs < (0) || clientTs > (99999999999)) {
                    return false;
                }
                return true;
            };
            return GAValidator;
        }());
        validators.GAValidator = GAValidator;
    })(validators = gameanalytics.validators || (gameanalytics.validators = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var device;
    (function (device) {
        var NameValueVersion = (function () {
            function NameValueVersion(name, value, version) {
                this.name = name;
                this.value = value;
                this.version = version;
            }
            return NameValueVersion;
        }());
        device.NameValueVersion = NameValueVersion;
        var NameVersion = (function () {
            function NameVersion(name, version) {
                this.name = name;
                this.version = version;
            }
            return NameVersion;
        }());
        device.NameVersion = NameVersion;
        var GADevice = (function () {
            function GADevice() {
            }
            GADevice.touch = function () {
            };
            GADevice.getRelevantSdkVersion = function () {
                if (GADevice.sdkGameEngineVersion) {
                    return GADevice.sdkGameEngineVersion;
                }
                return GADevice.sdkWrapperVersion;
            };
            GADevice.getConnectionType = function () {
                return GADevice.connectionType;
            };
            GADevice.updateConnectionType = function () {
                if (navigator.onLine) {
                    if (GADevice.buildPlatform === "ios" || GADevice.buildPlatform === "android") {
                        GADevice.connectionType = "wwan";
                    }
                    else {
                        GADevice.connectionType = "lan";
                    }
                }
                else {
                    GADevice.connectionType = "offline";
                }
            };
            GADevice.getOSVersionString = function () {
                return GADevice.buildPlatform + " " + GADevice.osVersionPair.version;
            };
            GADevice.runtimePlatformToString = function () {
                return GADevice.osVersionPair.name;
            };
            GADevice.getBrowserVersionString = function () {
                var ua = navigator.userAgent;
                var tem;
                var M = ua.match(/(opera|chrome|safari|firefox|ubrowser|msie|trident|fbav(?=\/))\/?\s*(\d+)/i) || [];
                if (M.length == 0) {
                    if (GADevice.buildPlatform === "ios") {
                        return "webkit_" + GADevice.osVersion;
                    }
                }
                if (/trident/i.test(M[1])) {
                    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return 'IE ' + (tem[1] || '');
                }
                if (M[1] === 'Chrome') {
                    tem = ua.match(/\b(OPR|Edge|UBrowser)\/(\d+)/);
                    if (tem != null) {
                        return tem.slice(1).join(' ').replace('OPR', 'Opera').replace('UBrowser', 'UC').toLowerCase();
                    }
                }
                if (M[1] && M[1].toLowerCase() === 'fbav') {
                    M[1] = "facebook";
                    if (M[2]) {
                        return "facebook " + M[2];
                    }
                }
                var MString = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) {
                    MString.splice(1, 1, tem[1]);
                }
                return MString.join(' ').toLowerCase();
            };
            GADevice.getDeviceModel = function () {
                var result = "unknown";
                return result;
            };
            GADevice.getDeviceManufacturer = function () {
                var result = "unknown";
                return result;
            };
            GADevice.matchItem = function (agent, data) {
                var result = new NameVersion("unknown", "0.0.0");
                var i = 0;
                var j = 0;
                var regex;
                var regexv;
                var match;
                var matches;
                var mathcesResult;
                var version;
                for (i = 0; i < data.length; i += 1) {
                    regex = new RegExp(data[i].value, 'i');
                    match = regex.test(agent);
                    if (match) {
                        regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                        matches = agent.match(regexv);
                        version = '';
                        if (matches) {
                            if (matches[1]) {
                                mathcesResult = matches[1];
                            }
                        }
                        if (mathcesResult) {
                            var matchesArray = mathcesResult.split(/[._]+/);
                            for (j = 0; j < Math.min(matchesArray.length, 3); j += 1) {
                                version += matchesArray[j] + (j < Math.min(matchesArray.length, 3) - 1 ? '.' : '');
                            }
                        }
                        else {
                            version = '0.0.0';
                        }
                        result.name = data[i].name;
                        result.version = version;
                        return result;
                    }
                }
                return result;
            };
            GADevice.sdkWrapperVersion = "javascript 4.4.2";
            GADevice.osVersionPair = GADevice.matchItem([
                navigator.platform,
                navigator.userAgent,
                navigator.appVersion,
                navigator.vendor
            ].join(' '), [
                new NameValueVersion("windows_phone", "Windows Phone", "OS"),
                new NameValueVersion("windows", "Win", "NT"),
                new NameValueVersion("ios", "iPhone", "OS"),
                new NameValueVersion("ios", "iPad", "OS"),
                new NameValueVersion("ios", "iPod", "OS"),
                new NameValueVersion("android", "Android", "Android"),
                new NameValueVersion("blackBerry", "BlackBerry", "/"),
                new NameValueVersion("mac_osx", "Mac", "OS X"),
                new NameValueVersion("tizen", "Tizen", "Tizen"),
                new NameValueVersion("linux", "Linux", "rv"),
                new NameValueVersion("kai_os", "KAIOS", "KAIOS")
            ]);
            GADevice.buildPlatform = GADevice.runtimePlatformToString();
            GADevice.deviceModel = GADevice.getDeviceModel();
            GADevice.deviceManufacturer = GADevice.getDeviceManufacturer();
            GADevice.osVersion = GADevice.getOSVersionString();
            GADevice.browserVersion = GADevice.getBrowserVersionString();
            return GADevice;
        }());
        device.GADevice = GADevice;
    })(device = gameanalytics.device || (gameanalytics.device = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var threading;
    (function (threading) {
        var TimedBlock = (function () {
            function TimedBlock(deadline) {
                this.deadline = deadline;
                this.ignore = false;
                this.async = false;
                this.running = false;
                this.id = ++TimedBlock.idCounter;
            }
            TimedBlock.idCounter = 0;
            return TimedBlock;
        }());
        threading.TimedBlock = TimedBlock;
    })(threading = gameanalytics.threading || (gameanalytics.threading = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var threading;
    (function (threading) {
        var PriorityQueue = (function () {
            function PriorityQueue(priorityComparer) {
                this.comparer = priorityComparer;
                this._subQueues = {};
                this._sortedKeys = [];
            }
            PriorityQueue.prototype.enqueue = function (priority, item) {
                if (this._sortedKeys.indexOf(priority) === -1) {
                    this.addQueueOfPriority(priority);
                }
                this._subQueues[priority].push(item);
            };
            PriorityQueue.prototype.addQueueOfPriority = function (priority) {
                var _this = this;
                this._sortedKeys.push(priority);
                this._sortedKeys.sort(function (x, y) { return _this.comparer.compare(x, y); });
                this._subQueues[priority] = [];
            };
            PriorityQueue.prototype.peek = function () {
                if (this.hasItems()) {
                    return this._subQueues[this._sortedKeys[0]][0];
                }
                else {
                    throw new Error("The queue is empty");
                }
            };
            PriorityQueue.prototype.hasItems = function () {
                return this._sortedKeys.length > 0;
            };
            PriorityQueue.prototype.dequeue = function () {
                if (this.hasItems()) {
                    return this.dequeueFromHighPriorityQueue();
                }
                else {
                    throw new Error("The queue is empty");
                }
            };
            PriorityQueue.prototype.dequeueFromHighPriorityQueue = function () {
                var firstKey = this._sortedKeys[0];
                var nextItem = this._subQueues[firstKey].shift();
                if (this._subQueues[firstKey].length === 0) {
                    this._sortedKeys.shift();
                    delete this._subQueues[firstKey];
                }
                return nextItem;
            };
            return PriorityQueue;
        }());
        threading.PriorityQueue = PriorityQueue;
    })(threading = gameanalytics.threading || (gameanalytics.threading = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var store;
    (function (store_1) {
        var GALogger = gameanalytics.logging.GALogger;
        var EGAStoreArgsOperator;
        (function (EGAStoreArgsOperator) {
            EGAStoreArgsOperator[EGAStoreArgsOperator["Equal"] = 0] = "Equal";
            EGAStoreArgsOperator[EGAStoreArgsOperator["LessOrEqual"] = 1] = "LessOrEqual";
            EGAStoreArgsOperator[EGAStoreArgsOperator["NotEqual"] = 2] = "NotEqual";
        })(EGAStoreArgsOperator = store_1.EGAStoreArgsOperator || (store_1.EGAStoreArgsOperator = {}));
        var EGAStore;
        (function (EGAStore) {
            EGAStore[EGAStore["Events"] = 0] = "Events";
            EGAStore[EGAStore["Sessions"] = 1] = "Sessions";
            EGAStore[EGAStore["Progression"] = 2] = "Progression";
        })(EGAStore = store_1.EGAStore || (store_1.EGAStore = {}));
        var GAStore = (function () {
            function GAStore() {
                this.eventsStore = [];
                this.sessionsStore = [];
                this.progressionStore = [];
                this.storeItems = {};
                try {
                    if (typeof localStorage === 'object') {
                        localStorage.setItem('testingLocalStorage', 'yes');
                        localStorage.removeItem('testingLocalStorage');
                        GAStore.storageAvailable = true;
                    }
                    else {
                        GAStore.storageAvailable = false;
                    }
                }
                catch (e) {
                }
            }
            GAStore.isStorageAvailable = function () {
                return GAStore.storageAvailable;
            };
            GAStore.isStoreTooLargeForEvents = function () {
                return GAStore.instance.eventsStore.length + GAStore.instance.sessionsStore.length > GAStore.MaxNumberOfEntries;
            };
            GAStore.select = function (store, args, sort, maxCount) {
                if (args === void 0) { args = []; }
                if (sort === void 0) { sort = false; }
                if (maxCount === void 0) { maxCount = 0; }
                var currentStore = GAStore.getStore(store);
                if (!currentStore) {
                    return null;
                }
                var result = [];
                for (var i = 0; i < currentStore.length; ++i) {
                    var entry = currentStore[i];
                    var add = true;
                    for (var j = 0; j < args.length; ++j) {
                        var argsEntry = args[j];
                        if (entry[argsEntry[0]]) {
                            switch (argsEntry[1]) {
                                case EGAStoreArgsOperator.Equal:
                                    {
                                        add = entry[argsEntry[0]] == argsEntry[2];
                                    }
                                    break;
                                case EGAStoreArgsOperator.LessOrEqual:
                                    {
                                        add = entry[argsEntry[0]] <= argsEntry[2];
                                    }
                                    break;
                                case EGAStoreArgsOperator.NotEqual:
                                    {
                                        add = entry[argsEntry[0]] != argsEntry[2];
                                    }
                                    break;
                                default:
                                    {
                                        add = false;
                                    }
                                    break;
                            }
                        }
                        else {
                            add = false;
                        }
                        if (!add) {
                            break;
                        }
                    }
                    if (add) {
                        result.push(entry);
                    }
                }
                if (sort) {
                    result.sort(function (a, b) {
                        return a["client_ts"] - b["client_ts"];
                    });
                }
                if (maxCount > 0 && result.length > maxCount) {
                    result = result.slice(0, maxCount + 1);
                }
                return result;
            };
            GAStore.update = function (store, setArgs, whereArgs) {
                if (whereArgs === void 0) { whereArgs = []; }
                var currentStore = GAStore.getStore(store);
                if (!currentStore) {
                    return false;
                }
                for (var i = 0; i < currentStore.length; ++i) {
                    var entry = currentStore[i];
                    var update = true;
                    for (var j = 0; j < whereArgs.length; ++j) {
                        var argsEntry = whereArgs[j];
                        if (entry[argsEntry[0]]) {
                            switch (argsEntry[1]) {
                                case EGAStoreArgsOperator.Equal:
                                    {
                                        update = entry[argsEntry[0]] == argsEntry[2];
                                    }
                                    break;
                                case EGAStoreArgsOperator.LessOrEqual:
                                    {
                                        update = entry[argsEntry[0]] <= argsEntry[2];
                                    }
                                    break;
                                case EGAStoreArgsOperator.NotEqual:
                                    {
                                        update = entry[argsEntry[0]] != argsEntry[2];
                                    }
                                    break;
                                default:
                                    {
                                        update = false;
                                    }
                                    break;
                            }
                        }
                        else {
                            update = false;
                        }
                        if (!update) {
                            break;
                        }
                    }
                    if (update) {
                        for (var j = 0; j < setArgs.length; ++j) {
                            var setArgsEntry = setArgs[j];
                            entry[setArgsEntry[0]] = setArgsEntry[1];
                        }
                    }
                }
                return true;
            };
            GAStore["delete"] = function (store, args) {
                var currentStore = GAStore.getStore(store);
                if (!currentStore) {
                    return;
                }
                for (var i = 0; i < currentStore.length; ++i) {
                    var entry = currentStore[i];
                    var del = true;
                    for (var j = 0; j < args.length; ++j) {
                        var argsEntry = args[j];
                        if (entry[argsEntry[0]]) {
                            switch (argsEntry[1]) {
                                case EGAStoreArgsOperator.Equal:
                                    {
                                        del = entry[argsEntry[0]] == argsEntry[2];
                                    }
                                    break;
                                case EGAStoreArgsOperator.LessOrEqual:
                                    {
                                        del = entry[argsEntry[0]] <= argsEntry[2];
                                    }
                                    break;
                                case EGAStoreArgsOperator.NotEqual:
                                    {
                                        del = entry[argsEntry[0]] != argsEntry[2];
                                    }
                                    break;
                                default:
                                    {
                                        del = false;
                                    }
                                    break;
                            }
                        }
                        else {
                            del = false;
                        }
                        if (!del) {
                            break;
                        }
                    }
                    if (del) {
                        currentStore.splice(i, 1);
                        --i;
                    }
                }
            };
            GAStore.insert = function (store, newEntry, replace, replaceKey) {
                if (replace === void 0) { replace = false; }
                if (replaceKey === void 0) { replaceKey = null; }
                var currentStore = GAStore.getStore(store);
                if (!currentStore) {
                    return;
                }
                if (replace) {
                    if (!replaceKey) {
                        return;
                    }
                    var replaced = false;
                    for (var i = 0; i < currentStore.length; ++i) {
                        var entry = currentStore[i];
                        if (entry[replaceKey] == newEntry[replaceKey]) {
                            for (var s in newEntry) {
                                entry[s] = newEntry[s];
                            }
                            replaced = true;
                            break;
                        }
                    }
                    if (!replaced) {
                        currentStore.push(newEntry);
                    }
                }
                else {
                    currentStore.push(newEntry);
                }
            };
            GAStore.save = function (gameKey) {
                if (!GAStore.isStorageAvailable()) {
                    GALogger.w("Storage is not available, cannot save.");
                    return;
                }
                localStorage.setItem(GAStore.StringFormat(GAStore.KeyFormat, gameKey, GAStore.EventsStoreKey), JSON.stringify(GAStore.instance.eventsStore));
                localStorage.setItem(GAStore.StringFormat(GAStore.KeyFormat, gameKey, GAStore.SessionsStoreKey), JSON.stringify(GAStore.instance.sessionsStore));
                localStorage.setItem(GAStore.StringFormat(GAStore.KeyFormat, gameKey, GAStore.ProgressionStoreKey), JSON.stringify(GAStore.instance.progressionStore));
                localStorage.setItem(GAStore.StringFormat(GAStore.KeyFormat, gameKey, GAStore.ItemsStoreKey), JSON.stringify(GAStore.instance.storeItems));
            };
            GAStore.load = function (gameKey) {
                if (!GAStore.isStorageAvailable()) {
                    GALogger.w("Storage is not available, cannot load.");
                    return;
                }
                try {
                    GAStore.instance.eventsStore = JSON.parse(localStorage.getItem(GAStore.StringFormat(GAStore.KeyFormat, gameKey, GAStore.EventsStoreKey)));
                    if (!GAStore.instance.eventsStore) {
                        GAStore.instance.eventsStore = [];
                    }
                }
                catch (e) {
                    GALogger.w("Load failed for 'events' store. Using empty store.");
                    GAStore.instance.eventsStore = [];
                }
                try {
                    GAStore.instance.sessionsStore = JSON.parse(localStorage.getItem(GAStore.StringFormat(GAStore.KeyFormat, gameKey, GAStore.SessionsStoreKey)));
                    if (!GAStore.instance.sessionsStore) {
                        GAStore.instance.sessionsStore = [];
                    }
                }
                catch (e) {
                    GALogger.w("Load failed for 'sessions' store. Using empty store.");
                    GAStore.instance.sessionsStore = [];
                }
                try {
                    GAStore.instance.progressionStore = JSON.parse(localStorage.getItem(GAStore.StringFormat(GAStore.KeyFormat, gameKey, GAStore.ProgressionStoreKey)));
                    if (!GAStore.instance.progressionStore) {
                        GAStore.instance.progressionStore = [];
                    }
                }
                catch (e) {
                    GALogger.w("Load failed for 'progression' store. Using empty store.");
                    GAStore.instance.progressionStore = [];
                }
                try {
                    GAStore.instance.storeItems = JSON.parse(localStorage.getItem(GAStore.StringFormat(GAStore.KeyFormat, gameKey, GAStore.ItemsStoreKey)));
                    if (!GAStore.instance.storeItems) {
                        GAStore.instance.storeItems = {};
                    }
                }
                catch (e) {
                    GALogger.w("Load failed for 'items' store. Using empty store.");
                    GAStore.instance.progressionStore = [];
                }
            };
            GAStore.setItem = function (gameKey, key, value) {
                var keyWithPrefix = GAStore.StringFormat(GAStore.KeyFormat, gameKey, key);
                if (!value) {
                    if (keyWithPrefix in GAStore.instance.storeItems) {
                        delete GAStore.instance.storeItems[keyWithPrefix];
                    }
                }
                else {
                    GAStore.instance.storeItems[keyWithPrefix] = value;
                }
            };
            GAStore.getItem = function (gameKey, key) {
                var keyWithPrefix = GAStore.StringFormat(GAStore.KeyFormat, gameKey, key);
                if (keyWithPrefix in GAStore.instance.storeItems) {
                    return GAStore.instance.storeItems[keyWithPrefix];
                }
                else {
                    return null;
                }
            };
            GAStore.getStore = function (store) {
                switch (store) {
                    case EGAStore.Events:
                        {
                            return GAStore.instance.eventsStore;
                        }
                    case EGAStore.Sessions:
                        {
                            return GAStore.instance.sessionsStore;
                        }
                    case EGAStore.Progression:
                        {
                            return GAStore.instance.progressionStore;
                        }
                    default:
                        {
                            GALogger.w("GAStore.getStore(): Cannot find store: " + store);
                            return null;
                        }
                }
            };
            GAStore.instance = new GAStore();
            GAStore.MaxNumberOfEntries = 2000;
            GAStore.StringFormat = function (str) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return str.replace(/{(\d+)}/g, function (_, index) { return args[index] || ''; });
            };
            GAStore.KeyFormat = "GA::{0}::{1}";
            GAStore.EventsStoreKey = "ga_event";
            GAStore.SessionsStoreKey = "ga_session";
            GAStore.ProgressionStoreKey = "ga_progression";
            GAStore.ItemsStoreKey = "ga_items";
            return GAStore;
        }());
        store_1.GAStore = GAStore;
    })(store = gameanalytics.store || (gameanalytics.store = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var state;
    (function (state) {
        var GAValidator = gameanalytics.validators.GAValidator;
        var GAUtilities = gameanalytics.utilities.GAUtilities;
        var GALogger = gameanalytics.logging.GALogger;
        var GAStore = gameanalytics.store.GAStore;
        var GADevice = gameanalytics.device.GADevice;
        var EGAStore = gameanalytics.store.EGAStore;
        var EGAStoreArgsOperator = gameanalytics.store.EGAStoreArgsOperator;
        var GAState = (function () {
            function GAState() {
                this.availableCustomDimensions01 = [];
                this.availableCustomDimensions02 = [];
                this.availableCustomDimensions03 = [];
                this.currentGlobalCustomEventFields = {};
                this.availableResourceCurrencies = [];
                this.availableResourceItemTypes = [];
                this.configurations = {};
                this.remoteConfigsListeners = [];
                this.beforeUnloadListeners = [];
                this.sdkConfigDefault = {};
                this.sdkConfig = {};
                this.progressionTries = {};
                this._isEventSubmissionEnabled = true;
                this.isUnloading = false;
            }
            GAState.setUserId = function (userId) {
                GAState.instance.userId = userId;
                GAState.cacheIdentifier();
            };
            GAState.getIdentifier = function () {
                return GAState.instance.identifier;
            };
            GAState.isInitialized = function () {
                return GAState.instance.initialized;
            };
            GAState.setInitialized = function (value) {
                GAState.instance.initialized = value;
            };
            GAState.getSessionStart = function () {
                return GAState.instance.sessionStart;
            };
            GAState.getSessionNum = function () {
                return GAState.instance.sessionNum;
            };
            GAState.getTransactionNum = function () {
                return GAState.instance.transactionNum;
            };
            GAState.getSessionId = function () {
                return GAState.instance.sessionId;
            };
            GAState.getCurrentCustomDimension01 = function () {
                return GAState.instance.currentCustomDimension01;
            };
            GAState.getCurrentCustomDimension02 = function () {
                return GAState.instance.currentCustomDimension02;
            };
            GAState.getCurrentCustomDimension03 = function () {
                return GAState.instance.currentCustomDimension03;
            };
            GAState.getGameKey = function () {
                return GAState.instance.gameKey;
            };
            GAState.getGameSecret = function () {
                return GAState.instance.gameSecret;
            };
            GAState.getAvailableCustomDimensions01 = function () {
                return GAState.instance.availableCustomDimensions01;
            };
            GAState.setAvailableCustomDimensions01 = function (value) {
                if (!GAValidator.validateCustomDimensions(value)) {
                    return;
                }
                GAState.instance.availableCustomDimensions01 = value;
                GAState.validateAndFixCurrentDimensions();
                GALogger.i("Set available custom01 dimension values: (" + GAUtilities.joinStringArray(value, ", ") + ")");
            };
            GAState.getAvailableCustomDimensions02 = function () {
                return GAState.instance.availableCustomDimensions02;
            };
            GAState.setAvailableCustomDimensions02 = function (value) {
                if (!GAValidator.validateCustomDimensions(value)) {
                    return;
                }
                GAState.instance.availableCustomDimensions02 = value;
                GAState.validateAndFixCurrentDimensions();
                GALogger.i("Set available custom02 dimension values: (" + GAUtilities.joinStringArray(value, ", ") + ")");
            };
            GAState.getAvailableCustomDimensions03 = function () {
                return GAState.instance.availableCustomDimensions03;
            };
            GAState.setAvailableCustomDimensions03 = function (value) {
                if (!GAValidator.validateCustomDimensions(value)) {
                    return;
                }
                GAState.instance.availableCustomDimensions03 = value;
                GAState.validateAndFixCurrentDimensions();
                GALogger.i("Set available custom03 dimension values: (" + GAUtilities.joinStringArray(value, ", ") + ")");
            };
            GAState.getAvailableResourceCurrencies = function () {
                return GAState.instance.availableResourceCurrencies;
            };
            GAState.setAvailableResourceCurrencies = function (value) {
                if (!GAValidator.validateResourceCurrencies(value)) {
                    return;
                }
                GAState.instance.availableResourceCurrencies = value;
                GALogger.i("Set available resource currencies: (" + GAUtilities.joinStringArray(value, ", ") + ")");
            };
            GAState.getAvailableResourceItemTypes = function () {
                return GAState.instance.availableResourceItemTypes;
            };
            GAState.setAvailableResourceItemTypes = function (value) {
                if (!GAValidator.validateResourceItemTypes(value)) {
                    return;
                }
                GAState.instance.availableResourceItemTypes = value;
                GALogger.i("Set available resource item types: (" + GAUtilities.joinStringArray(value, ", ") + ")");
            };
            GAState.getBuild = function () {
                return GAState.instance.build;
            };
            GAState.setBuild = function (value) {
                GAState.instance.build = value;
                GALogger.i("Set build version: " + value);
            };
            GAState.getUseManualSessionHandling = function () {
                return GAState.instance.useManualSessionHandling;
            };
            GAState.isEventSubmissionEnabled = function () {
                return GAState.instance._isEventSubmissionEnabled;
            };
            GAState.getABTestingId = function () {
                return GAState.instance.abId;
            };
            GAState.getABTestingVariantId = function () {
                return GAState.instance.abVariantId;
            };
            GAState.prototype.setDefaultId = function (value) {
                this.defaultUserId = !value ? "" : value;
                GAState.cacheIdentifier();
            };
            GAState.getDefaultId = function () {
                return GAState.instance.defaultUserId;
            };
            GAState.getSdkConfig = function () {
                {
                    var first;
                    var count = 0;
                    for (var json in GAState.instance.sdkConfig) {
                        if (count === 0) {
                            first = json;
                        }
                        ++count;
                    }
                    if (first && count > 0) {
                        return GAState.instance.sdkConfig;
                    }
                }
                {
                    var first;
                    var count = 0;
                    for (var json in GAState.instance.sdkConfigCached) {
                        if (count === 0) {
                            first = json;
                        }
                        ++count;
                    }
                    if (first && count > 0) {
                        return GAState.instance.sdkConfigCached;
                    }
                }
                return GAState.instance.sdkConfigDefault;
            };
            GAState.isEnabled = function () {
                if (!GAState.instance.initAuthorized) {
                    return false;
                }
                else {
                    return true;
                }
            };
            GAState.setCustomDimension01 = function (dimension) {
                GAState.instance.currentCustomDimension01 = dimension;
                GAStore.setItem(GAState.getGameKey(), GAState.Dimension01Key, dimension);
                GALogger.i("Set custom01 dimension value: " + dimension);
            };
            GAState.setCustomDimension02 = function (dimension) {
                GAState.instance.currentCustomDimension02 = dimension;
                GAStore.setItem(GAState.getGameKey(), GAState.Dimension02Key, dimension);
                GALogger.i("Set custom02 dimension value: " + dimension);
            };
            GAState.setCustomDimension03 = function (dimension) {
                GAState.instance.currentCustomDimension03 = dimension;
                GAStore.setItem(GAState.getGameKey(), GAState.Dimension03Key, dimension);
                GALogger.i("Set custom03 dimension value: " + dimension);
            };
            GAState.incrementSessionNum = function () {
                var sessionNumInt = GAState.getSessionNum() + 1;
                GAState.instance.sessionNum = sessionNumInt;
            };
            GAState.incrementTransactionNum = function () {
                var transactionNumInt = GAState.getTransactionNum() + 1;
                GAState.instance.transactionNum = transactionNumInt;
            };
            GAState.incrementProgressionTries = function (progression) {
                var tries = GAState.getProgressionTries(progression) + 1;
                GAState.instance.progressionTries[progression] = tries;
                var values = {};
                values["progression"] = progression;
                values["tries"] = tries;
                GAStore.insert(EGAStore.Progression, values, true, "progression");
            };
            GAState.getProgressionTries = function (progression) {
                if (progression in GAState.instance.progressionTries) {
                    return GAState.instance.progressionTries[progression];
                }
                else {
                    return 0;
                }
            };
            GAState.clearProgressionTries = function (progression) {
                if (progression in GAState.instance.progressionTries) {
                    delete GAState.instance.progressionTries[progression];
                }
                var parms = [];
                parms.push(["progression", EGAStoreArgsOperator.Equal, progression]);
                GAStore["delete"](EGAStore.Progression, parms);
            };
            GAState.setKeys = function (gameKey, gameSecret) {
                GAState.instance.gameKey = gameKey;
                GAState.instance.gameSecret = gameSecret;
            };
            GAState.setManualSessionHandling = function (flag) {
                GAState.instance.useManualSessionHandling = flag;
                GALogger.i("Use manual session handling: " + flag);
            };
            GAState.setEnabledEventSubmission = function (flag) {
                GAState.instance._isEventSubmissionEnabled = flag;
            };
            GAState.getEventAnnotations = function () {
                var annotations = {};
                annotations["v"] = 2;
                annotations["user_id"] = GAState.instance.identifier;
                annotations["client_ts"] = GAState.getClientTsAdjusted();
                annotations["sdk_version"] = GADevice.getRelevantSdkVersion();
                annotations["os_version"] = GADevice.osVersion;
                annotations["manufacturer"] = GADevice.deviceManufacturer;
                annotations["device"] = GADevice.deviceModel;
                annotations["browser_version"] = GADevice.browserVersion;
                annotations["platform"] = GADevice.buildPlatform;
                annotations["session_id"] = GAState.instance.sessionId;
                annotations[GAState.SessionNumKey] = GAState.instance.sessionNum;
                var connection_type = GADevice.getConnectionType();
                if (GAValidator.validateConnectionType(connection_type)) {
                    annotations["connection_type"] = connection_type;
                }
                if (GADevice.gameEngineVersion) {
                    annotations["engine_version"] = GADevice.gameEngineVersion;
                }
                if (GAState.instance.configurations) {
                    var count = 0;
                    for (var _ in GAState.instance.configurations) {
                        count++;
                        break;
                    }
                    if (count > 0) {
                        annotations["configurations"] = GAState.instance.configurations;
                    }
                }
                if (GAState.instance.abId) {
                    annotations["ab_id"] = GAState.instance.abId;
                }
                if (GAState.instance.abVariantId) {
                    annotations["ab_variant_id"] = GAState.instance.abVariantId;
                }
                if (GAState.instance.build) {
                    annotations["build"] = GAState.instance.build;
                }
                return annotations;
            };
            GAState.getSdkErrorEventAnnotations = function () {
                var annotations = {};
                annotations["v"] = 2;
                annotations["category"] = GAState.CategorySdkError;
                annotations["sdk_version"] = GADevice.getRelevantSdkVersion();
                annotations["os_version"] = GADevice.osVersion;
                annotations["manufacturer"] = GADevice.deviceManufacturer;
                annotations["device"] = GADevice.deviceModel;
                annotations["platform"] = GADevice.buildPlatform;
                var connection_type = GADevice.getConnectionType();
                if (GAValidator.validateConnectionType(connection_type)) {
                    annotations["connection_type"] = connection_type;
                }
                if (GADevice.gameEngineVersion) {
                    annotations["engine_version"] = GADevice.gameEngineVersion;
                }
                return annotations;
            };
            GAState.getInitAnnotations = function () {
                var initAnnotations = {};
                if (!GAState.getIdentifier()) {
                    GAState.cacheIdentifier();
                }
                GAStore.setItem(GAState.getGameKey(), GAState.LastUsedIdentifierKey, GAState.getIdentifier());
                initAnnotations["user_id"] = GAState.getIdentifier();
                initAnnotations["sdk_version"] = GADevice.getRelevantSdkVersion();
                initAnnotations["os_version"] = GADevice.osVersion;
                initAnnotations["platform"] = GADevice.buildPlatform;
                if (GAState.getBuild()) {
                    initAnnotations["build"] = GAState.getBuild();
                }
                else {
                    initAnnotations["build"] = null;
                }
                initAnnotations["session_num"] = GAState.getSessionNum();
                initAnnotations["random_salt"] = GAState.getSessionNum();
                return initAnnotations;
            };
            GAState.getClientTsAdjusted = function () {
                var clientTs = GAUtilities.timeIntervalSince1970();
                var clientTsAdjustedInteger = clientTs + GAState.instance.clientServerTimeOffset;
                if (GAValidator.validateClientTs(clientTsAdjustedInteger)) {
                    return clientTsAdjustedInteger;
                }
                else {
                    return clientTs;
                }
            };
            GAState.sessionIsStarted = function () {
                return GAState.instance.sessionStart != 0;
            };
            GAState.cacheIdentifier = function () {
                if (GAState.instance.userId) {
                    GAState.instance.identifier = GAState.instance.userId;
                }
                else if (GAState.instance.defaultUserId) {
                    GAState.instance.identifier = GAState.instance.defaultUserId;
                }
            };
            GAState.ensurePersistedStates = function () {
                if (GAStore.isStorageAvailable()) {
                    GAStore.load(GAState.getGameKey());
                }
                var instance = GAState.instance;
                instance.setDefaultId(GAStore.getItem(GAState.getGameKey(), GAState.DefaultUserIdKey) != null ? GAStore.getItem(GAState.getGameKey(), GAState.DefaultUserIdKey) : GAUtilities.createGuid());
                instance.sessionNum = GAStore.getItem(GAState.getGameKey(), GAState.SessionNumKey) != null ? Number(GAStore.getItem(GAState.getGameKey(), GAState.SessionNumKey)) : 0.0;
                instance.transactionNum = GAStore.getItem(GAState.getGameKey(), GAState.TransactionNumKey) != null ? Number(GAStore.getItem(GAState.getGameKey(), GAState.TransactionNumKey)) : 0.0;
                if (instance.currentCustomDimension01) {
                    GAStore.setItem(GAState.getGameKey(), GAState.Dimension01Key, instance.currentCustomDimension01);
                }
                else {
                    instance.currentCustomDimension01 = GAStore.getItem(GAState.getGameKey(), GAState.Dimension01Key) != null ? GAStore.getItem(GAState.getGameKey(), GAState.Dimension01Key) : "";
                    if (instance.currentCustomDimension01) {
                    }
                }
                if (instance.currentCustomDimension02) {
                    GAStore.setItem(GAState.getGameKey(), GAState.Dimension02Key, instance.currentCustomDimension02);
                }
                else {
                    instance.currentCustomDimension02 = GAStore.getItem(GAState.getGameKey(), GAState.Dimension02Key) != null ? GAStore.getItem(GAState.getGameKey(), GAState.Dimension02Key) : "";
                    if (instance.currentCustomDimension02) {
                    }
                }
                if (instance.currentCustomDimension03) {
                    GAStore.setItem(GAState.getGameKey(), GAState.Dimension03Key, instance.currentCustomDimension03);
                }
                else {
                    instance.currentCustomDimension03 = GAStore.getItem(GAState.getGameKey(), GAState.Dimension03Key) != null ? GAStore.getItem(GAState.getGameKey(), GAState.Dimension03Key) : "";
                    if (instance.currentCustomDimension03) {
                    }
                }
                var sdkConfigCachedString = GAStore.getItem(GAState.getGameKey(), GAState.SdkConfigCachedKey) != null ? GAStore.getItem(GAState.getGameKey(), GAState.SdkConfigCachedKey) : "";
                if (sdkConfigCachedString) {
                    var sdkConfigCached = JSON.parse(GAUtilities.decode64(sdkConfigCachedString));
                    if (sdkConfigCached) {
                        var lastUsedIdentifier = GAStore.getItem(GAState.getGameKey(), GAState.LastUsedIdentifierKey);
                        if (lastUsedIdentifier != null && lastUsedIdentifier != GAState.getIdentifier()) {
                            GALogger.w("New identifier spotted compared to last one used, clearing cached configs hash!!");
                            if (sdkConfigCached["configs_hash"]) {
                                delete sdkConfigCached["configs_hash"];
                            }
                        }
                        instance.sdkConfigCached = sdkConfigCached;
                    }
                }
                {
                    var currentSdkConfig = GAState.getSdkConfig();
                    instance.configsHash = currentSdkConfig["configs_hash"] ? currentSdkConfig["configs_hash"] : "";
                    instance.abId = currentSdkConfig["ab_id"] ? currentSdkConfig["ab_id"] : "";
                    instance.abVariantId = currentSdkConfig["ab_variant_id"] ? currentSdkConfig["ab_variant_id"] : "";
                }
                var results_ga_progression = GAStore.select(EGAStore.Progression);
                if (results_ga_progression) {
                    for (var i = 0; i < results_ga_progression.length; ++i) {
                        var result = results_ga_progression[i];
                        if (result) {
                            instance.progressionTries[result["progression"]] = result["tries"];
                        }
                    }
                }
            };
            GAState.calculateServerTimeOffset = function (serverTs) {
                var clientTs = GAUtilities.timeIntervalSince1970();
                return serverTs - clientTs;
            };
            GAState.formatString = function (s, args) {
                var formatted = s;
                for (var i = 0; i < args.length; i++) {
                    var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                    formatted = formatted.replace(regexp, arguments[i]);
                }
                return formatted;
            };
            GAState.validateAndCleanCustomFields = function (fields, errorCallback) {
                if (errorCallback === void 0) { errorCallback = null; }
                var result = {};
                if (fields) {
                    var count = 0;
                    for (var key in fields) {
                        var value = fields[key];
                        if (!key || !value) {
                            var baseMessage = "validateAndCleanCustomFields: entry with key={0}, value={1} has been omitted because its key or value is null";
                            var message = GAState.formatString(baseMessage, [key, value]);
                            GALogger.w(message);
                            if (errorCallback) {
                                errorCallback(baseMessage, message);
                            }
                        }
                        else if (count < GAState.MAX_CUSTOM_FIELDS_COUNT) {
                            var regex = new RegExp("^[a-zA-Z0-9_]{1," + GAState.MAX_CUSTOM_FIELDS_KEY_LENGTH + "}$");
                            if (GAUtilities.stringMatch(key, regex)) {
                                var type = typeof value;
                                if (type === "string" || value instanceof String) {
                                    var valueAsString = value;
                                    if (valueAsString.length <= GAState.MAX_CUSTOM_FIELDS_VALUE_STRING_LENGTH && valueAsString.length > 0) {
                                        result[key] = valueAsString;
                                        ++count;
                                    }
                                    else {
                                        var baseMessage = "validateAndCleanCustomFields: entry with key={0}, value={1} has been omitted because its value is an empty string or exceeds the max number of characters (" + GAState.MAX_CUSTOM_FIELDS_VALUE_STRING_LENGTH + ")";
                                        var message = GAState.formatString(baseMessage, [key, value]);
                                        GALogger.w(message);
                                        if (errorCallback) {
                                            errorCallback(baseMessage, message);
                                        }
                                    }
                                }
                                else if (type === "number" || value instanceof Number) {
                                    var valueAsNumber = value;
                                    result[key] = valueAsNumber;
                                    ++count;
                                }
                                else {
                                    var baseMessage = "validateAndCleanCustomFields: entry with key={0}, value={1} has been omitted because its value is not a string or number";
                                    var message = GAState.formatString(baseMessage, [key, value]);
                                    GALogger.w(message);
                                    if (errorCallback) {
                                        errorCallback(baseMessage, message);
                                    }
                                }
                            }
                            else {
                                var baseMessage = "validateAndCleanCustomFields: entry with key={0}, value={1} has been omitted because its key contains illegal character, is empty or exceeds the max number of characters (" + GAState.MAX_CUSTOM_FIELDS_KEY_LENGTH + ")";
                                var message = GAState.formatString(baseMessage, [key, value]);
                                GALogger.w(message);
                                if (errorCallback) {
                                    errorCallback(baseMessage, message);
                                }
                            }
                        }
                        else {
                            var baseMessage = "validateAndCleanCustomFields: entry with key={0}, value={1} has been omitted because it exceeds the max number of custom fields (" + GAState.MAX_CUSTOM_FIELDS_COUNT + ")";
                            var message = GAState.formatString(baseMessage, [key, value]);
                            GALogger.w(message);
                            if (errorCallback) {
                                errorCallback(baseMessage, message);
                            }
                        }
                    }
                }
                return result;
            };
            GAState.validateAndFixCurrentDimensions = function () {
                if (!GAValidator.validateDimension01(GAState.getCurrentCustomDimension01(), GAState.getAvailableCustomDimensions01())) {
                    GAState.setCustomDimension01("");
                }
                if (!GAValidator.validateDimension02(GAState.getCurrentCustomDimension02(), GAState.getAvailableCustomDimensions02())) {
                    GAState.setCustomDimension02("");
                }
                if (!GAValidator.validateDimension03(GAState.getCurrentCustomDimension03(), GAState.getAvailableCustomDimensions03())) {
                    GAState.setCustomDimension03("");
                }
            };
            GAState.getConfigurationStringValue = function (key, defaultValue) {
                if (GAState.instance.configurations[key]) {
                    return GAState.instance.configurations[key].toString();
                }
                else {
                    return defaultValue;
                }
            };
            GAState.isRemoteConfigsReady = function () {
                return GAState.instance.remoteConfigsIsReady;
            };
            GAState.addRemoteConfigsListener = function (listener) {
                if (GAState.instance.remoteConfigsListeners.indexOf(listener) < 0) {
                    GAState.instance.remoteConfigsListeners.push(listener);
                }
            };
            GAState.removeRemoteConfigsListener = function (listener) {
                var index = GAState.instance.remoteConfigsListeners.indexOf(listener);
                if (index > -1) {
                    GAState.instance.remoteConfigsListeners.splice(index, 1);
                }
            };
            GAState.getRemoteConfigsContentAsString = function () {
                return JSON.stringify(GAState.instance.configurations);
            };
            GAState.populateConfigurations = function (sdkConfig) {
                var configurations = sdkConfig["configs"];
                if (configurations) {
                    GAState.instance.configurations = {};
                    for (var i = 0; i < configurations.length; ++i) {
                        var configuration = configurations[i];
                        if (configuration) {
                            var key = configuration["key"];
                            var value = configuration["value"];
                            var start_ts = configuration["start_ts"] ? configuration["start_ts"] : Number.MIN_VALUE;
                            var end_ts = configuration["end_ts"] ? configuration["end_ts"] : Number.MAX_VALUE;
                            var client_ts_adjusted = GAState.getClientTsAdjusted();
                            if (key && value && client_ts_adjusted > start_ts && client_ts_adjusted < end_ts) {
                                GAState.instance.configurations[key] = value;
                            }
                        }
                    }
                }
                GAState.instance.remoteConfigsIsReady = true;
                var listeners = GAState.instance.remoteConfigsListeners;
                for (var i = 0; i < listeners.length; ++i) {
                    if (listeners[i]) {
                        listeners[i].onRemoteConfigsUpdated();
                    }
                }
            };
            GAState.addOnBeforeUnloadListener = function (listener) {
                if (GAState.instance.beforeUnloadListeners.indexOf(listener) < 0) {
                    GAState.instance.beforeUnloadListeners.push(listener);
                }
            };
            GAState.removeOnBeforeUnloadListener = function (listener) {
                var index = GAState.instance.beforeUnloadListeners.indexOf(listener);
                if (index > -1) {
                    GAState.instance.beforeUnloadListeners.splice(index, 1);
                }
            };
            GAState.notifyBeforeUnloadListeners = function () {
                var listeners = GAState.instance.beforeUnloadListeners;
                for (var i = 0; i < listeners.length; ++i) {
                    if (listeners[i]) {
                        listeners[i].onBeforeUnload();
                    }
                }
            };
            GAState.CategorySdkError = "sdk_error";
            GAState.MAX_CUSTOM_FIELDS_COUNT = 50;
            GAState.MAX_CUSTOM_FIELDS_KEY_LENGTH = 64;
            GAState.MAX_CUSTOM_FIELDS_VALUE_STRING_LENGTH = 256;
            GAState.instance = new GAState();
            GAState.DefaultUserIdKey = "default_user_id";
            GAState.SessionNumKey = "session_num";
            GAState.TransactionNumKey = "transaction_num";
            GAState.Dimension01Key = "dimension01";
            GAState.Dimension02Key = "dimension02";
            GAState.Dimension03Key = "dimension03";
            GAState.SdkConfigCachedKey = "sdk_config_cached";
            GAState.LastUsedIdentifierKey = "last_used_identifier";
            return GAState;
        }());
        state.GAState = GAState;
    })(state = gameanalytics.state || (gameanalytics.state = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var tasks;
    (function (tasks) {
        var GAUtilities = gameanalytics.utilities.GAUtilities;
        var GALogger = gameanalytics.logging.GALogger;
        var SdkErrorTask = (function () {
            function SdkErrorTask() {
            }
            SdkErrorTask.execute = function (url, type, payloadData, secretKey) {
                var now = new Date();
                if (!SdkErrorTask.timestampMap[type]) {
                    SdkErrorTask.timestampMap[type] = now;
                }
                if (!SdkErrorTask.countMap[type]) {
                    SdkErrorTask.countMap[type] = 0;
                }
                var diff = now.getTime() - SdkErrorTask.timestampMap[type].getTime();
                var diffSeconds = diff / 1000;
                if (diffSeconds >= 3600) {
                    SdkErrorTask.timestampMap[type] = now;
                    SdkErrorTask.countMap[type] = 0;
                }
                if (SdkErrorTask.countMap[type] >= SdkErrorTask.MaxCount) {
                    return;
                }
                var hashHmac = GAUtilities.getHmac(secretKey, payloadData);
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        if (!request.responseText) {
                            return;
                        }
                        if (request.status != 200) {
                            GALogger.w("sdk error failed. response code not 200. status code: " + request.status + ", description: " + request.statusText + ", body: " + request.responseText);
                            return;
                        }
                        else {
                            SdkErrorTask.countMap[type] = SdkErrorTask.countMap[type] + 1;
                        }
                    }
                };
                request.open("POST", url, true);
                request.setRequestHeader("Content-Type", "application/json");
                request.setRequestHeader("Authorization", hashHmac);
                try {
                    request.send(payloadData);
                }
                catch (e) {
                    console.error(e);
                }
            };
            SdkErrorTask.MaxCount = 10;
            SdkErrorTask.countMap = {};
            SdkErrorTask.timestampMap = {};
            return SdkErrorTask;
        }());
        tasks.SdkErrorTask = SdkErrorTask;
    })(tasks = gameanalytics.tasks || (gameanalytics.tasks = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var http;
    (function (http) {
        var GAState = gameanalytics.state.GAState;
        var GALogger = gameanalytics.logging.GALogger;
        var GAUtilities = gameanalytics.utilities.GAUtilities;
        var GAValidator = gameanalytics.validators.GAValidator;
        var SdkErrorTask = gameanalytics.tasks.SdkErrorTask;
        var EGASdkErrorCategory = gameanalytics.events.EGASdkErrorCategory;
        var EGASdkErrorArea = gameanalytics.events.EGASdkErrorArea;
        var EGASdkErrorAction = gameanalytics.events.EGASdkErrorAction;
        var EGASdkErrorParameter = gameanalytics.events.EGASdkErrorParameter;
        var GAHTTPApi = (function () {
            function GAHTTPApi() {
                this.protocol = "https";
                this.hostName = "api.gameanalytics.com";
                this.version = "v2";
                this.remoteConfigsVersion = "v1";
                this.baseUrl = this.protocol + "://" + this.hostName + "/" + this.version;
                this.remoteConfigsBaseUrl = this.protocol + "://" + this.hostName + "/remote_configs/" + this.remoteConfigsVersion;
                this.initializeUrlPath = "init";
                this.eventsUrlPath = "events";
                this.useGzip = false;
            }
            GAHTTPApi.prototype.requestInit = function (configsHash, callback) {
                var gameKey = GAState.getGameKey();
                var url = this.remoteConfigsBaseUrl + "/" + this.initializeUrlPath + "?game_key=" + gameKey + "&interval_seconds=0&configs_hash=" + configsHash;
                var initAnnotations = GAState.getInitAnnotations();
                var JSONstring = JSON.stringify(initAnnotations);
                if (!JSONstring) {
                    callback(http.EGAHTTPApiResponse.JsonEncodeFailed, null);
                    return;
                }
                var payloadData = this.createPayloadData(JSONstring, this.useGzip);
                var extraArgs = [];
                extraArgs.push(JSONstring);
                GAHTTPApi.sendRequest(url, payloadData, extraArgs, this.useGzip, GAHTTPApi.initRequestCallback, callback);
            };
            GAHTTPApi.prototype.sendEventsInArray = function (eventArray, requestId, callback) {
                if (eventArray.length == 0) {
                    return;
                }
                var gameKey = GAState.getGameKey();
                var url = this.baseUrl + "/" + gameKey + "/" + this.eventsUrlPath;
                var JSONstring = JSON.stringify(eventArray);
                if (!JSONstring) {
                    callback(http.EGAHTTPApiResponse.JsonEncodeFailed, null, requestId, eventArray.length);
                    return;
                }
                var payloadData = this.createPayloadData(JSONstring, this.useGzip);
                var extraArgs = [];
                extraArgs.push(JSONstring);
                extraArgs.push(requestId);
                extraArgs.push(eventArray.length.toString());
                GAHTTPApi.sendRequest(url, payloadData, extraArgs, this.useGzip, GAHTTPApi.sendEventInArrayRequestCallback, callback);
            };
            GAHTTPApi.prototype.sendSdkErrorEvent = function (category, area, action, parameter, reason, gameKey, secretKey) {
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                if (!GAValidator.validateSdkErrorEvent(gameKey, secretKey, category, area, action)) {
                    return;
                }
                var url = this.baseUrl + "/" + gameKey + "/" + this.eventsUrlPath;
                var payloadJSONString = "";
                var errorType = "";
                var json = GAState.getSdkErrorEventAnnotations();
                var categoryString = GAHTTPApi.sdkErrorCategoryString(category);
                json["error_category"] = categoryString;
                errorType += categoryString;
                var areaString = GAHTTPApi.sdkErrorAreaString(area);
                json["error_area"] = areaString;
                errorType += ":" + areaString;
                var actionString = GAHTTPApi.sdkErrorActionString(action);
                json["error_action"] = actionString;
                var parameterString = GAHTTPApi.sdkErrorParameterString(parameter);
                if (parameterString.length > 0) {
                    json["error_parameter"] = parameterString;
                }
                if (reason.length > 0) {
                    var reasonTrimmed = reason;
                    if (reason.length > GAHTTPApi.MAX_ERROR_MESSAGE_LENGTH) {
                        var reasonTrimmed = reason.substring(0, GAHTTPApi.MAX_ERROR_MESSAGE_LENGTH);
                    }
                    json["reason"] = reasonTrimmed;
                }
                var eventArray = [];
                eventArray.push(json);
                payloadJSONString = JSON.stringify(eventArray);
                if (!payloadJSONString) {
                    GALogger.w("sendSdkErrorEvent: JSON encoding failed.");
                    return;
                }
                SdkErrorTask.execute(url, errorType, payloadJSONString, secretKey);
            };
            GAHTTPApi.sendEventInArrayRequestCallback = function (request, url, callback, extra) {
                if (extra === void 0) { extra = null; }
                var authorization = extra[0];
                var JSONstring = extra[1];
                var requestId = extra[2];
                var eventCount = parseInt(extra[3]);
                var body = "";
                var responseCode = 0;
                body = request.responseText;
                responseCode = request.status;
                var requestResponseEnum = GAHTTPApi.instance.processRequestResponse(responseCode, request.statusText, body, "Events");
                if (requestResponseEnum != http.EGAHTTPApiResponse.Ok && requestResponseEnum != http.EGAHTTPApiResponse.Created && requestResponseEnum != http.EGAHTTPApiResponse.BadRequest) {
                    callback(requestResponseEnum, null, requestId, eventCount);
                    return;
                }
                var requestJsonDict = body ? JSON.parse(body) : {};
                if (requestJsonDict == null) {
                    callback(http.EGAHTTPApiResponse.JsonDecodeFailed, null, requestId, eventCount);
                    GAHTTPApi.instance.sendSdkErrorEvent(EGASdkErrorCategory.Http, EGASdkErrorArea.EventsHttp, EGASdkErrorAction.FailHttpJsonDecode, EGASdkErrorParameter.Undefined, body, GAState.getGameKey(), GAState.getGameSecret());
                    return;
                }
                if (requestResponseEnum == http.EGAHTTPApiResponse.BadRequest) {
                }
                callback(requestResponseEnum, requestJsonDict, requestId, eventCount);
            };
            GAHTTPApi.sendRequest = function (url, payloadData, extraArgs, gzip, callback, callback2) {
                var request = new XMLHttpRequest();
                var key = GAState.getGameSecret();
                var authorization = GAUtilities.getHmac(key, payloadData);
                var args = [];
                args.push(authorization);
                for (var s in extraArgs) {
                    args.push(extraArgs[s]);
                }
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        callback(request, url, callback2, args);
                    }
                };
                request.open("POST", url, true);
                request.setRequestHeader("Content-Type", "application/json");
                request.setRequestHeader("Authorization", authorization);
                if (gzip) {
                    throw new Error("gzip not supported");
                }
                try {
                    request.send(payloadData);
                }
                catch (e) {
                    console.error(e.stack);
                }
            };
            GAHTTPApi.initRequestCallback = function (request, url, callback, extra) {
                if (extra === void 0) { extra = null; }
                var authorization = extra[0];
                var JSONstring = extra[1];
                var body = "";
                var responseCode = 0;
                body = request.responseText;
                responseCode = request.status;
                var requestJsonDict = body ? JSON.parse(body) : {};
                var requestResponseEnum = GAHTTPApi.instance.processRequestResponse(responseCode, request.statusText, body, "Init");
                if (requestResponseEnum != http.EGAHTTPApiResponse.Ok && requestResponseEnum != http.EGAHTTPApiResponse.Created && requestResponseEnum != http.EGAHTTPApiResponse.BadRequest) {
                    callback(requestResponseEnum, null, "", 0);
                    return;
                }
                if (requestJsonDict == null) {
                    callback(http.EGAHTTPApiResponse.JsonDecodeFailed, null, "", 0);
                    GAHTTPApi.instance.sendSdkErrorEvent(EGASdkErrorCategory.Http, EGASdkErrorArea.InitHttp, EGASdkErrorAction.FailHttpJsonDecode, EGASdkErrorParameter.Undefined, body, GAState.getGameKey(), GAState.getGameSecret());
                    return;
                }
                if (requestResponseEnum === http.EGAHTTPApiResponse.BadRequest) {
                    callback(requestResponseEnum, null, "", 0);
                    return;
                }
                var validatedInitValues = GAValidator.validateAndCleanInitRequestResponse(requestJsonDict, requestResponseEnum === http.EGAHTTPApiResponse.Created);
                if (!validatedInitValues) {
                    callback(http.EGAHTTPApiResponse.BadResponse, null, "", 0);
                    return;
                }
                callback(requestResponseEnum, validatedInitValues, "", 0);
            };
            GAHTTPApi.prototype.createPayloadData = function (payload, gzip) {
                var payloadData;
                if (gzip) {
                    throw new Error("gzip not supported");
                }
                else {
                    payloadData = payload;
                }
                return payloadData;
            };
            GAHTTPApi.prototype.processRequestResponse = function (responseCode, responseMessage, body, requestId) {
                if (!body) {
                    return http.EGAHTTPApiResponse.NoResponse;
                }
                if (responseCode === 200) {
                    return http.EGAHTTPApiResponse.Ok;
                }
                if (responseCode === 201) {
                    return http.EGAHTTPApiResponse.Created;
                }
                if (responseCode === 0 || responseCode === 401) {
                    return http.EGAHTTPApiResponse.Unauthorized;
                }
                if (responseCode === 400) {
                    return http.EGAHTTPApiResponse.BadRequest;
                }
                if (responseCode === 500) {
                    return http.EGAHTTPApiResponse.InternalServerError;
                }
                return http.EGAHTTPApiResponse.UnknownResponseCode;
            };
            GAHTTPApi.sdkErrorCategoryString = function (value) {
                switch (value) {
                    case EGASdkErrorCategory.EventValidation:
                        return "event_validation";
                    case EGASdkErrorCategory.Database:
                        return "db";
                    case EGASdkErrorCategory.Init:
                        return "init";
                    case EGASdkErrorCategory.Http:
                        return "http";
                    case EGASdkErrorCategory.Json:
                        return "json";
                    default:
                        break;
                }
                return "";
            };
            GAHTTPApi.sdkErrorAreaString = function (value) {
                switch (value) {
                    case EGASdkErrorArea.BusinessEvent:
                        return "business";
                    case EGASdkErrorArea.ResourceEvent:
                        return "resource";
                    case EGASdkErrorArea.ProgressionEvent:
                        return "progression";
                    case EGASdkErrorArea.DesignEvent:
                        return "design";
                    case EGASdkErrorArea.ErrorEvent:
                        return "error";
                    case EGASdkErrorArea.InitHttp:
                        return "init_http";
                    case EGASdkErrorArea.EventsHttp:
                        return "events_http";
                    case EGASdkErrorArea.ProcessEvents:
                        return "process_events";
                    case EGASdkErrorArea.AddEventsToStore:
                        return "add_events_to_store";
                    default:
                        break;
                }
                return "";
            };
            GAHTTPApi.sdkErrorActionString = function (value) {
                switch (value) {
                    case EGASdkErrorAction.InvalidCurrency:
                        return "invalid_currency";
                    case EGASdkErrorAction.InvalidShortString:
                        return "invalid_short_string";
                    case EGASdkErrorAction.InvalidEventPartLength:
                        return "invalid_event_part_length";
                    case EGASdkErrorAction.InvalidEventPartCharacters:
                        return "invalid_event_part_characters";
                    case EGASdkErrorAction.InvalidStore:
                        return "invalid_store";
                    case EGASdkErrorAction.InvalidFlowType:
                        return "invalid_flow_type";
                    case EGASdkErrorAction.StringEmptyOrNull:
                        return "string_empty_or_null";
                    case EGASdkErrorAction.NotFoundInAvailableCurrencies:
                        return "not_found_in_available_currencies";
                    case EGASdkErrorAction.InvalidAmount:
                        return "invalid_amount";
                    case EGASdkErrorAction.NotFoundInAvailableItemTypes:
                        return "not_found_in_available_item_types";
                    case EGASdkErrorAction.WrongProgressionOrder:
                        return "wrong_progression_order";
                    case EGASdkErrorAction.InvalidEventIdLength:
                        return "invalid_event_id_length";
                    case EGASdkErrorAction.InvalidEventIdCharacters:
                        return "invalid_event_id_characters";
                    case EGASdkErrorAction.InvalidProgressionStatus:
                        return "invalid_progression_status";
                    case EGASdkErrorAction.InvalidSeverity:
                        return "invalid_severity";
                    case EGASdkErrorAction.InvalidLongString:
                        return "invalid_long_string";
                    case EGASdkErrorAction.DatabaseTooLarge:
                        return "db_too_large";
                    case EGASdkErrorAction.DatabaseOpenOrCreate:
                        return "db_open_or_create";
                    case EGASdkErrorAction.JsonError:
                        return "json_error";
                    case EGASdkErrorAction.FailHttpJsonDecode:
                        return "fail_http_json_decode";
                    case EGASdkErrorAction.FailHttpJsonEncode:
                        return "fail_http_json_encode";
                    default:
                        break;
                }
                return "";
            };
            GAHTTPApi.sdkErrorParameterString = function (value) {
                switch (value) {
                    case EGASdkErrorParameter.Currency:
                        return "currency";
                    case EGASdkErrorParameter.CartType:
                        return "cart_type";
                    case EGASdkErrorParameter.ItemType:
                        return "item_type";
                    case EGASdkErrorParameter.ItemId:
                        return "item_id";
                    case EGASdkErrorParameter.Store:
                        return "store";
                    case EGASdkErrorParameter.FlowType:
                        return "flow_type";
                    case EGASdkErrorParameter.Amount:
                        return "amount";
                    case EGASdkErrorParameter.Progression01:
                        return "progression01";
                    case EGASdkErrorParameter.Progression02:
                        return "progression02";
                    case EGASdkErrorParameter.Progression03:
                        return "progression03";
                    case EGASdkErrorParameter.EventId:
                        return "event_id";
                    case EGASdkErrorParameter.ProgressionStatus:
                        return "progression_status";
                    case EGASdkErrorParameter.Severity:
                        return "severity";
                    case EGASdkErrorParameter.Message:
                        return "message";
                    default:
                        break;
                }
                return "";
            };
            GAHTTPApi.instance = new GAHTTPApi();
            GAHTTPApi.MAX_ERROR_MESSAGE_LENGTH = 256;
            return GAHTTPApi;
        }());
        http.GAHTTPApi = GAHTTPApi;
    })(http = gameanalytics.http || (gameanalytics.http = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var events;
    (function (events_1) {
        var GAStore = gameanalytics.store.GAStore;
        var EGAStore = gameanalytics.store.EGAStore;
        var EGAStoreArgsOperator = gameanalytics.store.EGAStoreArgsOperator;
        var GAState = gameanalytics.state.GAState;
        var GALogger = gameanalytics.logging.GALogger;
        var GAUtilities = gameanalytics.utilities.GAUtilities;
        var EGAHTTPApiResponse = gameanalytics.http.EGAHTTPApiResponse;
        var GAHTTPApi = gameanalytics.http.GAHTTPApi;
        var GAValidator = gameanalytics.validators.GAValidator;
        var GAEvents = (function () {
            function GAEvents() {
            }
            GAEvents.customEventFieldsErrorCallback = function (baseMessage, message) {
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                var now = new Date();
                if (!GAEvents.timestampMap[baseMessage]) {
                    GAEvents.timestampMap[baseMessage] = now;
                }
                if (!GAEvents.countMap[baseMessage]) {
                    GAEvents.countMap[baseMessage] = 0;
                }
                var diff = now.getTime() - GAEvents.timestampMap[baseMessage].getTime();
                var diffSeconds = diff / 1000;
                if (diffSeconds >= 3600) {
                    GAEvents.timestampMap[baseMessage] = now;
                    GAEvents.countMap[baseMessage] = 0;
                }
                if (GAEvents.countMap[baseMessage] >= GAEvents.MAX_ERROR_COUNT) {
                    return;
                }
                gameanalytics.threading.GAThreading.performTaskOnGAThread(function () {
                    GAEvents.addErrorEvent(gameanalytics.EGAErrorSeverity.Warning, message, null, true);
                    GAEvents.countMap[baseMessage] = GAEvents.countMap[baseMessage] + 1;
                });
            };
            GAEvents.addSessionStartEvent = function () {
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                var eventDict = {};
                eventDict["category"] = GAEvents.CategorySessionStart;
                GAState.incrementSessionNum();
                GAStore.setItem(GAState.getGameKey(), GAState.SessionNumKey, GAState.getSessionNum().toString());
                GAEvents.addDimensionsToEvent(eventDict);
                var fieldsToUse = GAState.instance.currentGlobalCustomEventFields;
                GAEvents.addCustomFieldsToEvent(eventDict, GAState.validateAndCleanCustomFields(fieldsToUse, GAEvents.customEventFieldsErrorCallback));
                GAEvents.addEventToStore(eventDict);
                GALogger.i("Add SESSION START event");
                GAEvents.processEvents(GAEvents.CategorySessionStart, false);
            };
            GAEvents.addSessionEndEvent = function () {
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                var session_start_ts = GAState.getSessionStart();
                var client_ts_adjusted = GAState.getClientTsAdjusted();
                var sessionLength = client_ts_adjusted - session_start_ts;
                if (sessionLength < 0) {
                    GALogger.w("Session length was calculated to be less then 0. Should not be possible. Resetting to 0.");
                    sessionLength = 0;
                }
                var eventDict = {};
                eventDict["category"] = GAEvents.CategorySessionEnd;
                eventDict["length"] = sessionLength;
                GAEvents.addDimensionsToEvent(eventDict);
                var fieldsToUse = GAState.instance.currentGlobalCustomEventFields;
                GAEvents.addCustomFieldsToEvent(eventDict, GAState.validateAndCleanCustomFields(fieldsToUse, GAEvents.customEventFieldsErrorCallback));
                GAEvents.addEventToStore(eventDict);
                GALogger.i("Add SESSION END event.");
                GAEvents.processEvents("", false);
            };
            GAEvents.addBusinessEvent = function (currency, amount, itemType, itemId, cartType, fields, mergeFields) {
                if (cartType === void 0) { cartType = null; }
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                var validationResult = GAValidator.validateBusinessEvent(currency, amount, cartType, itemType, itemId);
                if (validationResult != null) {
                    GAHTTPApi.instance.sendSdkErrorEvent(validationResult.category, validationResult.area, validationResult.action, validationResult.parameter, validationResult.reason, GAState.getGameKey(), GAState.getGameSecret());
                    return;
                }
                var eventDict = {};
                GAState.incrementTransactionNum();
                GAStore.setItem(GAState.getGameKey(), GAState.TransactionNumKey, GAState.getTransactionNum().toString());
                eventDict["event_id"] = itemType + ":" + itemId;
                eventDict["category"] = GAEvents.CategoryBusiness;
                eventDict["currency"] = currency;
                eventDict["amount"] = amount;
                eventDict[GAState.TransactionNumKey] = GAState.getTransactionNum();
                if (cartType) {
                    eventDict["cart_type"] = cartType;
                }
                GAEvents.addDimensionsToEvent(eventDict);
                var fieldsToUse = {};
                if (fields && Object.keys(fields).length > 0) {
                    for (var key in fields) {
                        fieldsToUse[key] = fields[key];
                    }
                }
                else {
                    for (var key in GAState.instance.currentGlobalCustomEventFields) {
                        fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                    }
                }
                if (mergeFields && fields && Object.keys(fields).length > 0) {
                    for (var key in GAState.instance.currentGlobalCustomEventFields) {
                        if (!fieldsToUse[key]) {
                            fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                        }
                    }
                }
                GAEvents.addCustomFieldsToEvent(eventDict, GAState.validateAndCleanCustomFields(fieldsToUse, GAEvents.customEventFieldsErrorCallback));
                GALogger.i("Add BUSINESS event: {currency:" + currency + ", amount:" + amount + ", itemType:" + itemType + ", itemId:" + itemId + ", cartType:" + cartType + "}");
                GAEvents.addEventToStore(eventDict);
            };
            GAEvents.addResourceEvent = function (flowType, currency, amount, itemType, itemId, fields, mergeFields) {
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                var validationResult = GAValidator.validateResourceEvent(flowType, currency, amount, itemType, itemId, GAState.getAvailableResourceCurrencies(), GAState.getAvailableResourceItemTypes());
                if (validationResult != null) {
                    GAHTTPApi.instance.sendSdkErrorEvent(validationResult.category, validationResult.area, validationResult.action, validationResult.parameter, validationResult.reason, GAState.getGameKey(), GAState.getGameSecret());
                    return;
                }
                if (flowType === gameanalytics.EGAResourceFlowType.Sink) {
                    amount *= -1;
                }
                var eventDict = {};
                var flowTypeString = GAEvents.resourceFlowTypeToString(flowType);
                eventDict["event_id"] = flowTypeString + ":" + currency + ":" + itemType + ":" + itemId;
                eventDict["category"] = GAEvents.CategoryResource;
                eventDict["amount"] = amount;
                GAEvents.addDimensionsToEvent(eventDict);
                var fieldsToUse = {};
                if (fields && Object.keys(fields).length > 0) {
                    for (var key in fields) {
                        fieldsToUse[key] = fields[key];
                    }
                }
                else {
                    for (var key in GAState.instance.currentGlobalCustomEventFields) {
                        fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                    }
                }
                if (mergeFields && fields && Object.keys(fields).length > 0) {
                    for (var key in GAState.instance.currentGlobalCustomEventFields) {
                        if (!fieldsToUse[key]) {
                            fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                        }
                    }
                }
                GAEvents.addCustomFieldsToEvent(eventDict, GAState.validateAndCleanCustomFields(fieldsToUse, GAEvents.customEventFieldsErrorCallback));
                GALogger.i("Add RESOURCE event: {currency:" + currency + ", amount:" + amount + ", itemType:" + itemType + ", itemId:" + itemId + "}");
                GAEvents.addEventToStore(eventDict);
            };
            GAEvents.addProgressionEvent = function (progressionStatus, progression01, progression02, progression03, score, sendScore, fields, mergeFields) {
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                var progressionStatusString = GAEvents.progressionStatusToString(progressionStatus);
                var validationResult = GAValidator.validateProgressionEvent(progressionStatus, progression01, progression02, progression03);
                if (validationResult != null) {
                    GAHTTPApi.instance.sendSdkErrorEvent(validationResult.category, validationResult.area, validationResult.action, validationResult.parameter, validationResult.reason, GAState.getGameKey(), GAState.getGameSecret());
                    return;
                }
                var eventDict = {};
                var progressionIdentifier;
                if (!progression02) {
                    progressionIdentifier = progression01;
                }
                else if (!progression03) {
                    progressionIdentifier = progression01 + ":" + progression02;
                }
                else {
                    progressionIdentifier = progression01 + ":" + progression02 + ":" + progression03;
                }
                eventDict["category"] = GAEvents.CategoryProgression;
                eventDict["event_id"] = progressionStatusString + ":" + progressionIdentifier;
                var attempt_num = 0;
                if (sendScore && progressionStatus != gameanalytics.EGAProgressionStatus.Start) {
                    eventDict["score"] = Math.round(score);
                }
                if (progressionStatus === gameanalytics.EGAProgressionStatus.Fail) {
                    GAState.incrementProgressionTries(progressionIdentifier);
                }
                if (progressionStatus === gameanalytics.EGAProgressionStatus.Complete) {
                    GAState.incrementProgressionTries(progressionIdentifier);
                    attempt_num = GAState.getProgressionTries(progressionIdentifier);
                    eventDict["attempt_num"] = attempt_num;
                    GAState.clearProgressionTries(progressionIdentifier);
                }
                GAEvents.addDimensionsToEvent(eventDict);
                var fieldsToUse = {};
                if (fields && Object.keys(fields).length > 0) {
                    for (var key in fields) {
                        fieldsToUse[key] = fields[key];
                    }
                }
                else {
                    for (var key in GAState.instance.currentGlobalCustomEventFields) {
                        fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                    }
                }
                if (mergeFields && fields && Object.keys(fields).length > 0) {
                    for (var key in GAState.instance.currentGlobalCustomEventFields) {
                        if (!fieldsToUse[key]) {
                            fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                        }
                    }
                }
                GAEvents.addCustomFieldsToEvent(eventDict, GAState.validateAndCleanCustomFields(fieldsToUse, GAEvents.customEventFieldsErrorCallback));
                GALogger.i("Add PROGRESSION event: {status:" + progressionStatusString + ", progression01:" + progression01 + ", progression02:" + progression02 + ", progression03:" + progression03 + ", score:" + score + ", attempt:" + attempt_num + "}");
                GAEvents.addEventToStore(eventDict);
            };
            GAEvents.addDesignEvent = function (eventId, value, sendValue, fields, mergeFields) {
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                var validationResult = GAValidator.validateDesignEvent(eventId);
                if (validationResult != null) {
                    GAHTTPApi.instance.sendSdkErrorEvent(validationResult.category, validationResult.area, validationResult.action, validationResult.parameter, validationResult.reason, GAState.getGameKey(), GAState.getGameSecret());
                    return;
                }
                var eventData = {};
                eventData["category"] = GAEvents.CategoryDesign;
                eventData["event_id"] = eventId;
                if (sendValue) {
                    eventData["value"] = value;
                }
                GAEvents.addDimensionsToEvent(eventData);
                var fieldsToUse = {};
                if (fields && Object.keys(fields).length > 0) {
                    for (var key in fields) {
                        fieldsToUse[key] = fields[key];
                    }
                }
                else {
                    for (var key in GAState.instance.currentGlobalCustomEventFields) {
                        fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                    }
                }
                if (mergeFields && fields && Object.keys(fields).length > 0) {
                    for (var key in GAState.instance.currentGlobalCustomEventFields) {
                        if (!fieldsToUse[key]) {
                            fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                        }
                    }
                }
                GAEvents.addCustomFieldsToEvent(eventData, GAState.validateAndCleanCustomFields(fieldsToUse, GAEvents.customEventFieldsErrorCallback));
                GALogger.i("Add DESIGN event: {eventId:" + eventId + ", value:" + value + "}");
                GAEvents.addEventToStore(eventData);
            };
            GAEvents.addErrorEvent = function (severity, message, fields, mergeFields, skipAddingFields) {
                if (skipAddingFields === void 0) { skipAddingFields = false; }
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                var severityString = GAEvents.errorSeverityToString(severity);
                var validationResult = GAValidator.validateErrorEvent(severity, message);
                if (validationResult != null) {
                    GAHTTPApi.instance.sendSdkErrorEvent(validationResult.category, validationResult.area, validationResult.action, validationResult.parameter, validationResult.reason, GAState.getGameKey(), GAState.getGameSecret());
                    return;
                }
                var eventData = {};
                eventData["category"] = GAEvents.CategoryError;
                eventData["severity"] = severityString;
                eventData["message"] = message;
                GAEvents.addDimensionsToEvent(eventData);
                if (!skipAddingFields) {
                    var fieldsToUse = {};
                    if (fields && Object.keys(fields).length > 0) {
                        for (var key in fields) {
                            fieldsToUse[key] = fields[key];
                        }
                    }
                    else {
                        for (var key in GAState.instance.currentGlobalCustomEventFields) {
                            fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                        }
                    }
                    if (mergeFields && fields && Object.keys(fields).length > 0) {
                        for (var key in GAState.instance.currentGlobalCustomEventFields) {
                            if (!fieldsToUse[key]) {
                                fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                            }
                        }
                    }
                    GAEvents.addCustomFieldsToEvent(eventData, GAState.validateAndCleanCustomFields(fieldsToUse, GAEvents.customEventFieldsErrorCallback));
                }
                GALogger.i("Add ERROR event: {severity:" + severityString + ", message:" + message + "}");
                GAEvents.addEventToStore(eventData);
            };
            GAEvents.addAdEvent = function (adAction, adType, adSdkName, adPlacement, noAdReason, duration, sendDuration, fields, mergeFields) {
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                var adActionString = GAEvents.adActionToString(adAction);
                var adTypeString = GAEvents.adTypeToString(adType);
                var noAdReasonString = GAEvents.adErrorToString(noAdReason);
                var validationResult = GAValidator.validateAdEvent(adAction, adType, adSdkName, adPlacement);
                if (validationResult != null) {
                    GAHTTPApi.instance.sendSdkErrorEvent(validationResult.category, validationResult.area, validationResult.action, validationResult.parameter, validationResult.reason, GAState.getGameKey(), GAState.getGameSecret());
                    return;
                }
                var eventData = {};
                eventData["category"] = GAEvents.CategoryAds;
                eventData["ad_sdk_name"] = adSdkName;
                eventData["ad_placement"] = adPlacement;
                eventData["ad_type"] = adTypeString;
                eventData["ad_action"] = adActionString;
                if (adAction == gameanalytics.EGAAdAction.FailedShow && noAdReasonString.length > 0) {
                    eventData["ad_fail_show_reason"] = noAdReasonString;
                }
                if (sendDuration && (adType == gameanalytics.EGAAdType.RewardedVideo || adType == gameanalytics.EGAAdType.Video)) {
                    eventData["ad_duration"] = duration;
                }
                GAEvents.addDimensionsToEvent(eventData);
                var fieldsToUse = {};
                if (fields && Object.keys(fields).length > 0) {
                    for (var key in fields) {
                        fieldsToUse[key] = fields[key];
                    }
                }
                else {
                    for (var key in GAState.instance.currentGlobalCustomEventFields) {
                        fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                    }
                }
                if (mergeFields && fields && Object.keys(fields).length > 0) {
                    for (var key in GAState.instance.currentGlobalCustomEventFields) {
                        if (!fieldsToUse[key]) {
                            fieldsToUse[key] = GAState.instance.currentGlobalCustomEventFields[key];
                        }
                    }
                }
                GAEvents.addCustomFieldsToEvent(eventData, GAState.validateAndCleanCustomFields(fieldsToUse, GAEvents.customEventFieldsErrorCallback));
                GALogger.i("Add AD event: {ad_sdk_name:" + adSdkName + ", ad_placement:" + adPlacement + ", ad_type:" + adTypeString + ", ad_action:" + adActionString + ((adAction == gameanalytics.EGAAdAction.FailedShow && noAdReasonString.length > 0) ? (", ad_fail_show_reason:" + noAdReasonString) : "") + ((sendDuration && (adType == gameanalytics.EGAAdType.RewardedVideo || adType == gameanalytics.EGAAdType.Video)) ? (", ad_duration:" + duration) : "") + "}");
                GAEvents.addEventToStore(eventData);
            };
            GAEvents.processEvents = function (category, performCleanUp) {
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                try {
                    var requestIdentifier = GAUtilities.createGuid();
                    if (performCleanUp) {
                        GAEvents.cleanupEvents();
                        GAEvents.fixMissingSessionEndEvents();
                    }
                    var selectArgs = [];
                    selectArgs.push(["status", EGAStoreArgsOperator.Equal, "new"]);
                    var updateWhereArgs = [];
                    updateWhereArgs.push(["status", EGAStoreArgsOperator.Equal, "new"]);
                    if (category) {
                        selectArgs.push(["category", EGAStoreArgsOperator.Equal, category]);
                        updateWhereArgs.push(["category", EGAStoreArgsOperator.Equal, category]);
                    }
                    var updateSetArgs = [];
                    updateSetArgs.push(["status", requestIdentifier]);
                    var events = GAStore.select(EGAStore.Events, selectArgs);
                    if (!events || events.length == 0) {
                        GALogger.i("Event queue: No events to send");
                        GAEvents.updateSessionStore();
                        return;
                    }
                    if (events.length > GAEvents.MaxEventCount) {
                        events = GAStore.select(EGAStore.Events, selectArgs, true, GAEvents.MaxEventCount);
                        if (!events) {
                            return;
                        }
                        var lastItem = events[events.length - 1];
                        var lastTimestamp = lastItem["client_ts"];
                        selectArgs.push(["client_ts", EGAStoreArgsOperator.LessOrEqual, lastTimestamp]);
                        events = GAStore.select(EGAStore.Events, selectArgs);
                        if (!events) {
                            return;
                        }
                        updateWhereArgs.push(["client_ts", EGAStoreArgsOperator.LessOrEqual, lastTimestamp]);
                    }
                    GALogger.i("Event queue: Sending " + events.length + " events.");
                    if (!GAStore.update(EGAStore.Events, updateSetArgs, updateWhereArgs)) {
                        return;
                    }
                    var payloadArray = [];
                    for (var i = 0; i < events.length; ++i) {
                        var ev = events[i];
                        var eventDict = JSON.parse(GAUtilities.decode64(ev["event"]));
                        if (eventDict.length != 0) {
                            var clientTs = eventDict["client_ts"];
                            if (clientTs && !GAValidator.validateClientTs(clientTs)) {
                                delete eventDict["client_ts"];
                            }
                            payloadArray.push(eventDict);
                        }
                    }
                    GAHTTPApi.instance.sendEventsInArray(payloadArray, requestIdentifier, GAEvents.processEventsCallback);
                }
                catch (e) {
                    GALogger.e("Error during ProcessEvents(): " + e.stack);
                    GAHTTPApi.instance.sendSdkErrorEvent(events_1.EGASdkErrorCategory.Json, events_1.EGASdkErrorArea.ProcessEvents, events_1.EGASdkErrorAction.JsonError, events_1.EGASdkErrorParameter.Undefined, e.stack, GAState.getGameKey(), GAState.getGameSecret());
                }
            };
            GAEvents.processEventsCallback = function (responseEnum, dataDict, requestId, eventCount) {
                var requestIdWhereArgs = [];
                requestIdWhereArgs.push(["status", EGAStoreArgsOperator.Equal, requestId]);
                if (responseEnum === EGAHTTPApiResponse.Ok) {
                    GAStore["delete"](EGAStore.Events, requestIdWhereArgs);
                    GALogger.i("Event queue: " + eventCount + " events sent.");
                }
                else {
                    if (responseEnum === EGAHTTPApiResponse.NoResponse) {
                        var setArgs = [];
                        setArgs.push(["status", "new"]);
                        GALogger.w("Event queue: Failed to send events to collector - Retrying next time");
                        GAStore.update(EGAStore.Events, setArgs, requestIdWhereArgs);
                    }
                    else {
                        if (dataDict) {
                            var json;
                            var count = 0;
                            for (var j in dataDict) {
                                if (count == 0) {
                                    json = dataDict[j];
                                }
                                ++count;
                            }
                            if (responseEnum === EGAHTTPApiResponse.BadRequest && json.constructor === Array) {
                                GALogger.w("Event queue: " + eventCount + " events sent. " + count + " events failed GA server validation.");
                            }
                            else {
                                GALogger.w("Event queue: Failed to send events.");
                            }
                        }
                        else {
                            GALogger.w("Event queue: Failed to send events.");
                        }
                        GAStore["delete"](EGAStore.Events, requestIdWhereArgs);
                    }
                }
            };
            GAEvents.cleanupEvents = function () {
                GAStore.update(EGAStore.Events, [["status", "new"]]);
            };
            GAEvents.fixMissingSessionEndEvents = function () {
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                var args = [];
                args.push(["session_id", EGAStoreArgsOperator.NotEqual, GAState.getSessionId()]);
                var sessions = GAStore.select(EGAStore.Sessions, args);
                if (!sessions || sessions.length == 0) {
                    return;
                }
                GALogger.i(sessions.length + " session(s) located with missing session_end event.");
                for (var i = 0; i < sessions.length; ++i) {
                    var sessionEndEvent = JSON.parse(GAUtilities.decode64(sessions[i]["event"]));
                    var event_ts = sessionEndEvent["client_ts"];
                    var start_ts = sessions[i]["timestamp"];
                    var length = event_ts - start_ts;
                    length = Math.max(0, length);
                    sessionEndEvent["category"] = GAEvents.CategorySessionEnd;
                    sessionEndEvent["length"] = length;
                    GAEvents.addEventToStore(sessionEndEvent);
                }
            };
            GAEvents.addEventToStore = function (eventData) {
                if (!GAState.isEventSubmissionEnabled()) {
                    return;
                }
                if (!GAState.isInitialized()) {
                    GALogger.w("Could not add event: SDK is not initialized");
                    return;
                }
                try {
                    if (GAStore.isStoreTooLargeForEvents() && !GAUtilities.stringMatch(eventData["category"], /^(user|session_end|business)$/)) {
                        GALogger.w("Database too large. Event has been blocked.");
                        GAHTTPApi.instance.sendSdkErrorEvent(events_1.EGASdkErrorCategory.Database, events_1.EGASdkErrorArea.AddEventsToStore, events_1.EGASdkErrorAction.DatabaseTooLarge, events_1.EGASdkErrorParameter.Undefined, "", GAState.getGameKey(), GAState.getGameSecret());
                        return;
                    }
                    var ev = GAState.getEventAnnotations();
                    for (var e in eventData) {
                        ev[e] = eventData[e];
                    }
                    var json = JSON.stringify(ev);
                    GALogger.ii("Event added to queue: " + json);
                    var values = {};
                    values["status"] = "new";
                    values["category"] = ev["category"];
                    values["session_id"] = ev["session_id"];
                    values["client_ts"] = ev["client_ts"];
                    values["event"] = GAUtilities.encode64(JSON.stringify(ev));
                    GAStore.insert(EGAStore.Events, values);
                    if (eventData["category"] == GAEvents.CategorySessionEnd) {
                        GAStore["delete"](EGAStore.Sessions, [["session_id", EGAStoreArgsOperator.Equal, ev["session_id"]]]);
                    }
                    else {
                        GAEvents.updateSessionStore();
                    }
                    if (GAStore.isStorageAvailable()) {
                        GAStore.save(GAState.getGameKey());
                    }
                }
                catch (e) {
                    GALogger.e("addEventToStore: error");
                    GALogger.e(e.stack);
                    GAHTTPApi.instance.sendSdkErrorEvent(events_1.EGASdkErrorCategory.Database, events_1.EGASdkErrorArea.AddEventsToStore, events_1.EGASdkErrorAction.DatabaseTooLarge, events_1.EGASdkErrorParameter.Undefined, e.stack, GAState.getGameKey(), GAState.getGameSecret());
                }
            };
            GAEvents.updateSessionStore = function () {
                if (GAState.sessionIsStarted()) {
                    var values = {};
                    values["session_id"] = GAState.instance.sessionId;
                    values["timestamp"] = GAState.getSessionStart();
                    var ev = GAState.getEventAnnotations();
                    GAEvents.addDimensionsToEvent(ev);
                    var fieldsToUse = GAState.instance.currentGlobalCustomEventFields;
                    GAEvents.addCustomFieldsToEvent(ev, GAState.validateAndCleanCustomFields(fieldsToUse, GAEvents.customEventFieldsErrorCallback));
                    values["event"] = GAUtilities.encode64(JSON.stringify(ev));
                    GAStore.insert(EGAStore.Sessions, values, true, "session_id");
                    if (GAStore.isStorageAvailable()) {
                        GAStore.save(GAState.getGameKey());
                    }
                }
            };
            GAEvents.addDimensionsToEvent = function (eventData) {
                if (!eventData) {
                    return;
                }
                if (GAState.getCurrentCustomDimension01()) {
                    eventData["custom_01"] = GAState.getCurrentCustomDimension01();
                }
                if (GAState.getCurrentCustomDimension02()) {
                    eventData["custom_02"] = GAState.getCurrentCustomDimension02();
                }
                if (GAState.getCurrentCustomDimension03()) {
                    eventData["custom_03"] = GAState.getCurrentCustomDimension03();
                }
            };
            GAEvents.addCustomFieldsToEvent = function (eventData, fields) {
                if (!eventData) {
                    return;
                }
                if (fields && Object.keys(fields).length > 0) {
                    eventData["custom_fields"] = fields;
                }
            };
            GAEvents.resourceFlowTypeToString = function (value) {
                if (value == gameanalytics.EGAResourceFlowType.Source || value == gameanalytics.EGAResourceFlowType[gameanalytics.EGAResourceFlowType.Source]) {
                    return "Source";
                }
                else if (value == gameanalytics.EGAResourceFlowType.Sink || value == gameanalytics.EGAResourceFlowType[gameanalytics.EGAResourceFlowType.Sink]) {
                    return "Sink";
                }
                else {
                    return "";
                }
            };
            GAEvents.progressionStatusToString = function (value) {
                if (value == gameanalytics.EGAProgressionStatus.Start || value == gameanalytics.EGAProgressionStatus[gameanalytics.EGAProgressionStatus.Start]) {
                    return "Start";
                }
                else if (value == gameanalytics.EGAProgressionStatus.Complete || value == gameanalytics.EGAProgressionStatus[gameanalytics.EGAProgressionStatus.Complete]) {
                    return "Complete";
                }
                else if (value == gameanalytics.EGAProgressionStatus.Fail || value == gameanalytics.EGAProgressionStatus[gameanalytics.EGAProgressionStatus.Fail]) {
                    return "Fail";
                }
                else {
                    return "";
                }
            };
            GAEvents.errorSeverityToString = function (value) {
                if (value == gameanalytics.EGAErrorSeverity.Debug || value == gameanalytics.EGAErrorSeverity[gameanalytics.EGAErrorSeverity.Debug]) {
                    return "debug";
                }
                else if (value == gameanalytics.EGAErrorSeverity.Info || value == gameanalytics.EGAErrorSeverity[gameanalytics.EGAErrorSeverity.Info]) {
                    return "info";
                }
                else if (value == gameanalytics.EGAErrorSeverity.Warning || value == gameanalytics.EGAErrorSeverity[gameanalytics.EGAErrorSeverity.Warning]) {
                    return "warning";
                }
                else if (value == gameanalytics.EGAErrorSeverity.Error || value == gameanalytics.EGAErrorSeverity[gameanalytics.EGAErrorSeverity.Error]) {
                    return "error";
                }
                else if (value == gameanalytics.EGAErrorSeverity.Critical || value == gameanalytics.EGAErrorSeverity[gameanalytics.EGAErrorSeverity.Critical]) {
                    return "critical";
                }
                else {
                    return "";
                }
            };
            GAEvents.adActionToString = function (value) {
                if (value == gameanalytics.EGAAdAction.Clicked || value == gameanalytics.EGAAdAction[gameanalytics.EGAAdAction.Clicked]) {
                    return "clicked";
                }
                else if (value == gameanalytics.EGAAdAction.Show || value == gameanalytics.EGAAdAction[gameanalytics.EGAAdAction.Show]) {
                    return "show";
                }
                else if (value == gameanalytics.EGAAdAction.FailedShow || value == gameanalytics.EGAAdAction[gameanalytics.EGAAdAction.FailedShow]) {
                    return "failed_show";
                }
                else if (value == gameanalytics.EGAAdAction.RewardReceived || value == gameanalytics.EGAAdAction[gameanalytics.EGAAdAction.RewardReceived]) {
                    return "reward_received";
                }
                else {
                    return "";
                }
            };
            GAEvents.adErrorToString = function (value) {
                if (value == gameanalytics.EGAAdError.Unknown || value == gameanalytics.EGAAdError[gameanalytics.EGAAdError.Unknown]) {
                    return "unknown";
                }
                else if (value == gameanalytics.EGAAdError.Offline || value == gameanalytics.EGAAdError[gameanalytics.EGAAdError.Offline]) {
                    return "offline";
                }
                else if (value == gameanalytics.EGAAdError.NoFill || value == gameanalytics.EGAAdError[gameanalytics.EGAAdError.NoFill]) {
                    return "no_fill";
                }
                else if (value == gameanalytics.EGAAdError.InternalError || value == gameanalytics.EGAAdError[gameanalytics.EGAAdError.InternalError]) {
                    return "internal_error";
                }
                else if (value == gameanalytics.EGAAdError.InvalidRequest || value == gameanalytics.EGAAdError[gameanalytics.EGAAdError.InvalidRequest]) {
                    return "invalid_request";
                }
                else if (value == gameanalytics.EGAAdError.UnableToPrecache || value == gameanalytics.EGAAdError[gameanalytics.EGAAdError.UnableToPrecache]) {
                    return "unable_to_precache";
                }
                else {
                    return "";
                }
            };
            GAEvents.adTypeToString = function (value) {
                if (value == gameanalytics.EGAAdType.Video || value == gameanalytics.EGAAdType[gameanalytics.EGAAdType.Video]) {
                    return "video";
                }
                else if (value == gameanalytics.EGAAdType.RewardedVideo || value == gameanalytics.EGAAdError[gameanalytics.EGAAdType.RewardedVideo]) {
                    return "rewarded_video";
                }
                else if (value == gameanalytics.EGAAdType.Playable || value == gameanalytics.EGAAdError[gameanalytics.EGAAdType.Playable]) {
                    return "playable";
                }
                else if (value == gameanalytics.EGAAdType.Interstitial || value == gameanalytics.EGAAdError[gameanalytics.EGAAdType.Interstitial]) {
                    return "interstitial";
                }
                else if (value == gameanalytics.EGAAdType.OfferWall || value == gameanalytics.EGAAdError[gameanalytics.EGAAdType.OfferWall]) {
                    return "offer_wall";
                }
                else if (value == gameanalytics.EGAAdType.Banner || value == gameanalytics.EGAAdError[gameanalytics.EGAAdType.Banner]) {
                    return "banner";
                }
                else {
                    return "";
                }
            };
            GAEvents.CategorySessionStart = "user";
            GAEvents.CategorySessionEnd = "session_end";
            GAEvents.CategoryDesign = "design";
            GAEvents.CategoryBusiness = "business";
            GAEvents.CategoryProgression = "progression";
            GAEvents.CategoryResource = "resource";
            GAEvents.CategoryError = "error";
            GAEvents.CategoryAds = "ads";
            GAEvents.MaxEventCount = 500;
            GAEvents.MAX_ERROR_COUNT = 10;
            GAEvents.countMap = {};
            GAEvents.timestampMap = {};
            return GAEvents;
        }());
        events_1.GAEvents = GAEvents;
    })(events = gameanalytics.events || (gameanalytics.events = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var threading;
    (function (threading) {
        var GALogger = gameanalytics.logging.GALogger;
        var GAState = gameanalytics.state.GAState;
        var GAEvents = gameanalytics.events.GAEvents;
        var GAThreading = (function () {
            function GAThreading() {
                this.blocks = new threading.PriorityQueue({
                    compare: function (x, y) {
                        return x - y;
                    }
                });
                this.id2TimedBlockMap = {};
                GAThreading.startThread();
            }
            GAThreading.createTimedBlock = function (delayInSeconds) {
                if (delayInSeconds === void 0) { delayInSeconds = 0; }
                var time = new Date();
                time.setSeconds(time.getSeconds() + delayInSeconds);
                var timedBlock = new threading.TimedBlock(time);
                return timedBlock;
            };
            GAThreading.performTaskOnGAThread = function (taskBlock, delayInSeconds) {
                if (delayInSeconds === void 0) { delayInSeconds = 0; }
                var time = new Date();
                time.setSeconds(time.getSeconds() + delayInSeconds);
                var timedBlock = new threading.TimedBlock(time);
                timedBlock.block = taskBlock;
                GAThreading.instance.id2TimedBlockMap[timedBlock.id] = timedBlock;
                GAThreading.instance.addTimedBlock(timedBlock);
            };
            GAThreading.performTimedBlockOnGAThread = function (timedBlock) {
                GAThreading.instance.id2TimedBlockMap[timedBlock.id] = timedBlock;
                GAThreading.instance.addTimedBlock(timedBlock);
            };
            GAThreading.scheduleTimer = function (interval, callback) {
                var time = new Date();
                time.setSeconds(time.getSeconds() + interval);
                var timedBlock = new threading.TimedBlock(time);
                timedBlock.block = callback;
                GAThreading.instance.id2TimedBlockMap[timedBlock.id] = timedBlock;
                GAThreading.instance.addTimedBlock(timedBlock);
                return timedBlock.id;
            };
            GAThreading.getTimedBlockById = function (blockIdentifier) {
                if (blockIdentifier in GAThreading.instance.id2TimedBlockMap) {
                    return GAThreading.instance.id2TimedBlockMap[blockIdentifier];
                }
                else {
                    return null;
                }
            };
            GAThreading.ensureEventQueueIsRunning = function () {
                GAThreading.instance.keepRunning = true;
                if (!GAThreading.instance.isRunning) {
                    GAThreading.instance.isRunning = true;
                    GAThreading.scheduleTimer(GAThreading.ProcessEventsIntervalInSeconds, GAThreading.processEventQueue);
                }
            };
            GAThreading.endSessionAndStopQueue = function () {
                if (GAState.isInitialized()) {
                    GALogger.i("Ending session.");
                    GAThreading.stopEventQueue();
                    if (GAState.isEnabled() && GAState.sessionIsStarted()) {
                        GAEvents.addSessionEndEvent();
                        GAState.instance.sessionStart = 0;
                    }
                }
            };
            GAThreading.stopEventQueue = function () {
                GAThreading.instance.keepRunning = false;
            };
            GAThreading.ignoreTimer = function (blockIdentifier) {
                if (blockIdentifier in GAThreading.instance.id2TimedBlockMap) {
                    GAThreading.instance.id2TimedBlockMap[blockIdentifier].ignore = true;
                }
            };
            GAThreading.setEventProcessInterval = function (interval) {
                if (interval > 0) {
                    GAThreading.ProcessEventsIntervalInSeconds = interval;
                }
            };
            GAThreading.prototype.addTimedBlock = function (timedBlock) {
                this.blocks.enqueue(timedBlock.deadline.getTime(), timedBlock);
            };
            GAThreading.run = function () {
                clearTimeout(GAThreading.runTimeoutId);
                try {
                    var timedBlock;
                    while ((timedBlock = GAThreading.getNextBlock())) {
                        if (!timedBlock.ignore) {
                            if (timedBlock.async) {
                                if (!timedBlock.running) {
                                    timedBlock.running = true;
                                    timedBlock.block();
                                    break;
                                }
                            }
                            else {
                                timedBlock.block();
                            }
                        }
                    }
                    GAThreading.runTimeoutId = setTimeout(GAThreading.run, GAThreading.ThreadWaitTimeInMs);
                    return;
                }
                catch (e) {
                    GALogger.e("Error on GA thread");
                    GALogger.e(e.stack);
                }
            };
            GAThreading.startThread = function () {
                GAThreading.runTimeoutId = setTimeout(GAThreading.run, 0);
            };
            GAThreading.getNextBlock = function () {
                var now = new Date();
                if (GAThreading.instance.blocks.hasItems() && GAThreading.instance.blocks.peek().deadline.getTime() <= now.getTime()) {
                    if (GAThreading.instance.blocks.peek().async) {
                        if (GAThreading.instance.blocks.peek().running) {
                            return GAThreading.instance.blocks.peek();
                        }
                        else {
                            return GAThreading.instance.blocks.dequeue();
                        }
                    }
                    else {
                        return GAThreading.instance.blocks.dequeue();
                    }
                }
                return null;
            };
            GAThreading.processEventQueue = function () {
                GAEvents.processEvents("", true);
                if (GAThreading.instance.keepRunning) {
                    GAThreading.scheduleTimer(GAThreading.ProcessEventsIntervalInSeconds, GAThreading.processEventQueue);
                }
                else {
                    GAThreading.instance.isRunning = false;
                }
            };
            GAThreading.instance = new GAThreading();
            GAThreading.ThreadWaitTimeInMs = 1000;
            GAThreading.ProcessEventsIntervalInSeconds = 8.0;
            return GAThreading;
        }());
        threading.GAThreading = GAThreading;
    })(threading = gameanalytics.threading || (gameanalytics.threading = {}));
})(gameanalytics || (gameanalytics = {}));
var gameanalytics;
(function (gameanalytics) {
    var GAThreading = gameanalytics.threading.GAThreading;
    var GALogger = gameanalytics.logging.GALogger;
    var GAStore = gameanalytics.store.GAStore;
    var GAState = gameanalytics.state.GAState;
    var GAHTTPApi = gameanalytics.http.GAHTTPApi;
    var GADevice = gameanalytics.device.GADevice;
    var GAValidator = gameanalytics.validators.GAValidator;
    var EGAHTTPApiResponse = gameanalytics.http.EGAHTTPApiResponse;
    var GAUtilities = gameanalytics.utilities.GAUtilities;
    var GAEvents = gameanalytics.events.GAEvents;
    var GameAnalytics = (function () {
        function GameAnalytics() {
        }
        GameAnalytics.getGlobalObject = function () {
            if (typeof globalThis !== 'undefined') {
                return globalThis;
            }
            if (typeof self !== 'undefined') {
                return self;
            }
            if (typeof window !== 'undefined') {
                return window;
            }
            if (typeof global !== 'undefined') {
                return global;
            }
            return undefined;
        };
        GameAnalytics.init = function () {
            GADevice.touch();
            GameAnalytics.methodMap['configureAvailableCustomDimensions01'] = GameAnalytics.configureAvailableCustomDimensions01;
            GameAnalytics.methodMap['configureAvailableCustomDimensions02'] = GameAnalytics.configureAvailableCustomDimensions02;
            GameAnalytics.methodMap['configureAvailableCustomDimensions03'] = GameAnalytics.configureAvailableCustomDimensions03;
            GameAnalytics.methodMap['configureAvailableResourceCurrencies'] = GameAnalytics.configureAvailableResourceCurrencies;
            GameAnalytics.methodMap['configureAvailableResourceItemTypes'] = GameAnalytics.configureAvailableResourceItemTypes;
            GameAnalytics.methodMap['configureBuild'] = GameAnalytics.configureBuild;
            GameAnalytics.methodMap['configureSdkGameEngineVersion'] = GameAnalytics.configureSdkGameEngineVersion;
            GameAnalytics.methodMap['configureGameEngineVersion'] = GameAnalytics.configureGameEngineVersion;
            GameAnalytics.methodMap['configureUserId'] = GameAnalytics.configureUserId;
            GameAnalytics.methodMap['initialize'] = GameAnalytics.initialize;
            GameAnalytics.methodMap['addBusinessEvent'] = GameAnalytics.addBusinessEvent;
            GameAnalytics.methodMap['addResourceEvent'] = GameAnalytics.addResourceEvent;
            GameAnalytics.methodMap['addProgressionEvent'] = GameAnalytics.addProgressionEvent;
            GameAnalytics.methodMap['addDesignEvent'] = GameAnalytics.addDesignEvent;
            GameAnalytics.methodMap['addErrorEvent'] = GameAnalytics.addErrorEvent;
            GameAnalytics.methodMap['addAdEvent'] = GameAnalytics.addAdEvent;
            GameAnalytics.methodMap['setEnabledInfoLog'] = GameAnalytics.setEnabledInfoLog;
            GameAnalytics.methodMap['setEnabledVerboseLog'] = GameAnalytics.setEnabledVerboseLog;
            GameAnalytics.methodMap['setEnabledManualSessionHandling'] = GameAnalytics.setEnabledManualSessionHandling;
            GameAnalytics.methodMap['setEnabledEventSubmission'] = GameAnalytics.setEnabledEventSubmission;
            GameAnalytics.methodMap['setCustomDimension01'] = GameAnalytics.setCustomDimension01;
            GameAnalytics.methodMap['setCustomDimension02'] = GameAnalytics.setCustomDimension02;
            GameAnalytics.methodMap['setCustomDimension03'] = GameAnalytics.setCustomDimension03;
            GameAnalytics.methodMap['setGlobalCustomEventFields'] = GameAnalytics.setGlobalCustomEventFields;
            GameAnalytics.methodMap['setEventProcessInterval'] = GameAnalytics.setEventProcessInterval;
            GameAnalytics.methodMap['startSession'] = GameAnalytics.startSession;
            GameAnalytics.methodMap['endSession'] = GameAnalytics.endSession;
            GameAnalytics.methodMap['onStop'] = GameAnalytics.onStop;
            GameAnalytics.methodMap['onResume'] = GameAnalytics.onResume;
            GameAnalytics.methodMap['addRemoteConfigsListener'] = GameAnalytics.addRemoteConfigsListener;
            GameAnalytics.methodMap['removeRemoteConfigsListener'] = GameAnalytics.removeRemoteConfigsListener;
            GameAnalytics.methodMap['getRemoteConfigsValueAsString'] = GameAnalytics.getRemoteConfigsValueAsString;
            GameAnalytics.methodMap['isRemoteConfigsReady'] = GameAnalytics.isRemoteConfigsReady;
            GameAnalytics.methodMap['getRemoteConfigsContentAsString'] = GameAnalytics.getRemoteConfigsContentAsString;
            GameAnalytics.methodMap['addOnBeforeUnloadListener'] = GameAnalytics.addOnBeforeUnloadListener;
            GameAnalytics.methodMap['removeOnBeforeUnloadListener'] = GameAnalytics.removeOnBeforeUnloadListener;
            if (typeof GameAnalytics.getGlobalObject() !== 'undefined' && typeof GameAnalytics.getGlobalObject()['GameAnalytics'] !== 'undefined' && typeof GameAnalytics.getGlobalObject()['GameAnalytics']['q'] !== 'undefined') {
                var q = GameAnalytics.getGlobalObject()['GameAnalytics']['q'];
                for (var i in q) {
                    GameAnalytics.gaCommand.apply(null, q[i]);
                }
            }
            window.addEventListener("beforeunload", function (e) {
                console.log('addEventListener unload');
                GAState.instance.isUnloading = true;
                GAState.notifyBeforeUnloadListeners();
                GAThreading.endSessionAndStopQueue();
                GAState.instance.isUnloading = false;
            });
        };
        GameAnalytics.gaCommand = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args.length > 0) {
                if (args[0] in gameanalytics.GameAnalytics.methodMap) {
                    if (args.length > 1) {
                        gameanalytics.GameAnalytics.methodMap[args[0]].apply(null, Array.prototype.slice.call(args, 1));
                    }
                    else {
                        gameanalytics.GameAnalytics.methodMap[args[0]]();
                    }
                }
            }
        };
        GameAnalytics.configureAvailableCustomDimensions01 = function (customDimensions) {
            if (customDimensions === void 0) { customDimensions = []; }
            GAThreading.performTaskOnGAThread(function () {
                if (GameAnalytics.isSdkReady(true, false)) {
                    GALogger.w("Available custom dimensions must be set before SDK is initialized");
                    return;
                }
                GAState.setAvailableCustomDimensions01(customDimensions);
            });
        };
        GameAnalytics.configureAvailableCustomDimensions02 = function (customDimensions) {
            if (customDimensions === void 0) { customDimensions = []; }
            GAThreading.performTaskOnGAThread(function () {
                if (GameAnalytics.isSdkReady(true, false)) {
                    GALogger.w("Available custom dimensions must be set before SDK is initialized");
                    return;
                }
                GAState.setAvailableCustomDimensions02(customDimensions);
            });
        };
        GameAnalytics.configureAvailableCustomDimensions03 = function (customDimensions) {
            if (customDimensions === void 0) { customDimensions = []; }
            GAThreading.performTaskOnGAThread(function () {
                if (GameAnalytics.isSdkReady(true, false)) {
                    GALogger.w("Available custom dimensions must be set before SDK is initialized");
                    return;
                }
                GAState.setAvailableCustomDimensions03(customDimensions);
            });
        };
        GameAnalytics.configureAvailableResourceCurrencies = function (resourceCurrencies) {
            if (resourceCurrencies === void 0) { resourceCurrencies = []; }
            GAThreading.performTaskOnGAThread(function () {
                if (GameAnalytics.isSdkReady(true, false)) {
                    GALogger.w("Available resource currencies must be set before SDK is initialized");
                    return;
                }
                GAState.setAvailableResourceCurrencies(resourceCurrencies);
            });
        };
        GameAnalytics.configureAvailableResourceItemTypes = function (resourceItemTypes) {
            if (resourceItemTypes === void 0) { resourceItemTypes = []; }
            GAThreading.performTaskOnGAThread(function () {
                if (GameAnalytics.isSdkReady(true, false)) {
                    GALogger.w("Available resource item types must be set before SDK is initialized");
                    return;
                }
                GAState.setAvailableResourceItemTypes(resourceItemTypes);
            });
        };
        GameAnalytics.configureBuild = function (build) {
            if (build === void 0) { build = ""; }
            GAThreading.performTaskOnGAThread(function () {
                if (GameAnalytics.isSdkReady(true, false)) {
                    GALogger.w("Build version must be set before SDK is initialized.");
                    return;
                }
                if (!GAValidator.validateBuild(build)) {
                    GALogger.i("Validation fail - configure build: Cannot be null, empty or above 32 length. String: " + build);
                    return;
                }
                GAState.setBuild(build);
            });
        };
        GameAnalytics.configureSdkGameEngineVersion = function (sdkGameEngineVersion) {
            if (sdkGameEngineVersion === void 0) { sdkGameEngineVersion = ""; }
            GAThreading.performTaskOnGAThread(function () {
                if (GameAnalytics.isSdkReady(true, false)) {
                    return;
                }
                if (!GAValidator.validateSdkWrapperVersion(sdkGameEngineVersion)) {
                    GALogger.i("Validation fail - configure sdk version: Sdk version not supported. String: " + sdkGameEngineVersion);
                    return;
                }
                GADevice.sdkGameEngineVersion = sdkGameEngineVersion;
            });
        };
        GameAnalytics.configureGameEngineVersion = function (gameEngineVersion) {
            if (gameEngineVersion === void 0) { gameEngineVersion = ""; }
            GAThreading.performTaskOnGAThread(function () {
                if (GameAnalytics.isSdkReady(true, false)) {
                    return;
                }
                if (!GAValidator.validateEngineVersion(gameEngineVersion)) {
                    GALogger.i("Validation fail - configure game engine version: Game engine version not supported. String: " + gameEngineVersion);
                    return;
                }
                GADevice.gameEngineVersion = gameEngineVersion;
            });
        };
        GameAnalytics.configureUserId = function (uId) {
            if (uId === void 0) { uId = ""; }
            GAThreading.performTaskOnGAThread(function () {
                if (GameAnalytics.isSdkReady(true, false)) {
                    GALogger.w("A custom user id must be set before SDK is initialized.");
                    return;
                }
                if (!GAValidator.validateUserId(uId)) {
                    GALogger.i("Validation fail - configure user_id: Cannot be null, empty or above 64 length. Will use default user_id method. Used string: " + uId);
                    return;
                }
                GAState.setUserId(uId);
            });
        };
        GameAnalytics.initialize = function (gameKey, gameSecret) {
            if (gameKey === void 0) { gameKey = ""; }
            if (gameSecret === void 0) { gameSecret = ""; }
            GADevice.updateConnectionType();
            var timedBlock = GAThreading.createTimedBlock();
            timedBlock.async = true;
            GameAnalytics.initTimedBlockId = timedBlock.id;
            timedBlock.block = function () {
                if (GameAnalytics.isSdkReady(true, false)) {
                    GALogger.w("SDK already initialized. Can only be called once.");
                    return;
                }
                if (!GAValidator.validateKeys(gameKey, gameSecret)) {
                    GALogger.w("SDK failed initialize. Game key or secret key is invalid. Can only contain characters A-z 0-9, gameKey is 32 length, gameSecret is 40 length. Failed keys - gameKey: " + gameKey + ", secretKey: " + gameSecret);
                    return;
                }
                GAState.setKeys(gameKey, gameSecret);
                GameAnalytics.internalInitialize();
            };
            GAThreading.performTimedBlockOnGAThread(timedBlock);
        };
        GameAnalytics.addBusinessEvent = function (currency, amount, itemType, itemId, cartType, customFields, mergeFields) {
            if (currency === void 0) { currency = ""; }
            if (amount === void 0) { amount = 0; }
            if (itemType === void 0) { itemType = ""; }
            if (itemId === void 0) { itemId = ""; }
            if (cartType === void 0) { cartType = ""; }
            if (customFields === void 0) { customFields = {}; }
            if (mergeFields === void 0) { mergeFields = false; }
            GADevice.updateConnectionType();
            if (!GAState.instance.isUnloading) {
                GAThreading.performTaskOnGAThread(function () {
                    if (!GameAnalytics.isSdkReady(true, true, "Could not add business event")) {
                        return;
                    }
                    GAEvents.addBusinessEvent(currency, amount, itemType, itemId, cartType, customFields, mergeFields);
                });
            }
            else {
                if (!GameAnalytics.isSdkReady(true, true, "Could not add business event")) {
                    return;
                }
                GAEvents.addBusinessEvent(currency, amount, itemType, itemId, cartType, customFields, mergeFields);
            }
        };
        GameAnalytics.addResourceEvent = function (flowType, currency, amount, itemType, itemId, customFields, mergeFields) {
            if (flowType === void 0) { flowType = gameanalytics.EGAResourceFlowType.Undefined; }
            if (currency === void 0) { currency = ""; }
            if (amount === void 0) { amount = 0; }
            if (itemType === void 0) { itemType = ""; }
            if (itemId === void 0) { itemId = ""; }
            if (customFields === void 0) { customFields = {}; }
            if (mergeFields === void 0) { mergeFields = false; }
            GADevice.updateConnectionType();
            if (!GAState.instance.isUnloading) {
                GAThreading.performTaskOnGAThread(function () {
                    if (!GameAnalytics.isSdkReady(true, true, "Could not add resource event")) {
                        return;
                    }
                    GAEvents.addResourceEvent(flowType, currency, amount, itemType, itemId, customFields, mergeFields);
                });
            }
            else {
                if (!GameAnalytics.isSdkReady(true, true, "Could not add resource event")) {
                    return;
                }
                GAEvents.addResourceEvent(flowType, currency, amount, itemType, itemId, customFields, mergeFields);
            }
        };
        GameAnalytics.addProgressionEvent = function (progressionStatus, progression01, progression02, progression03, score, customFields, mergeFields) {
            if (progressionStatus === void 0) { progressionStatus = gameanalytics.EGAProgressionStatus.Undefined; }
            if (progression01 === void 0) { progression01 = ""; }
            if (progression02 === void 0) { progression02 = ""; }
            if (progression03 === void 0) { progression03 = ""; }
            if (customFields === void 0) { customFields = {}; }
            if (mergeFields === void 0) { mergeFields = false; }
            GADevice.updateConnectionType();
            if (!GAState.instance.isUnloading) {
                GAThreading.performTaskOnGAThread(function () {
                    if (!GameAnalytics.isSdkReady(true, true, "Could not add progression event")) {
                        return;
                    }
                    var sendScore = typeof score === "number";
                    GAEvents.addProgressionEvent(progressionStatus, progression01, progression02, progression03, sendScore ? score : 0, sendScore, customFields, mergeFields);
                });
            }
            else {
                if (!GameAnalytics.isSdkReady(true, true, "Could not add progression event")) {
                    return;
                }
                var sendScore = typeof score === "number";
                GAEvents.addProgressionEvent(progressionStatus, progression01, progression02, progression03, sendScore ? score : 0, sendScore, customFields, mergeFields);
            }
        };
        GameAnalytics.addDesignEvent = function (eventId, value, customFields, mergeFields) {
            if (customFields === void 0) { customFields = {}; }
            if (mergeFields === void 0) { mergeFields = false; }
            GADevice.updateConnectionType();
            if (!GAState.instance.isUnloading) {
                GAThreading.performTaskOnGAThread(function () {
                    if (!GameAnalytics.isSdkReady(true, true, "Could not add design event")) {
                        return;
                    }
                    var sendValue = typeof value === "number";
                    GAEvents.addDesignEvent(eventId, sendValue ? value : 0, sendValue, customFields, mergeFields);
                });
            }
            else {
                if (!GameAnalytics.isSdkReady(true, true, "Could not add design event")) {
                    return;
                }
                var sendValue = typeof value === "number";
                GAEvents.addDesignEvent(eventId, sendValue ? value : 0, sendValue, customFields, mergeFields);
            }
        };
        GameAnalytics.addErrorEvent = function (severity, message, customFields, mergeFields) {
            if (severity === void 0) { severity = gameanalytics.EGAErrorSeverity.Undefined; }
            if (message === void 0) { message = ""; }
            if (customFields === void 0) { customFields = {}; }
            if (mergeFields === void 0) { mergeFields = false; }
            GADevice.updateConnectionType();
            if (!GAState.instance.isUnloading) {
                GAThreading.performTaskOnGAThread(function () {
                    if (!GameAnalytics.isSdkReady(true, true, "Could not add error event")) {
                        return;
                    }
                    GAEvents.addErrorEvent(severity, message, customFields, mergeFields);
                });
            }
            else {
                if (!GameAnalytics.isSdkReady(true, true, "Could not add error event")) {
                    return;
                }
                GAEvents.addErrorEvent(severity, message, customFields, mergeFields);
            }
        };
        GameAnalytics.addAdEventWithNoAdReason = function (adAction, adType, adSdkName, adPlacement, noAdReason, customFields, mergeFields) {
            if (adAction === void 0) { adAction = gameanalytics.EGAAdAction.Undefined; }
            if (adType === void 0) { adType = gameanalytics.EGAAdType.Undefined; }
            if (adSdkName === void 0) { adSdkName = ""; }
            if (adPlacement === void 0) { adPlacement = ""; }
            if (noAdReason === void 0) { noAdReason = gameanalytics.EGAAdError.Undefined; }
            if (customFields === void 0) { customFields = {}; }
            if (mergeFields === void 0) { mergeFields = false; }
            GADevice.updateConnectionType();
            if (!GAState.instance.isUnloading) {
                GAThreading.performTaskOnGAThread(function () {
                    if (!GameAnalytics.isSdkReady(true, true, "Could not add ad event")) {
                        return;
                    }
                    GAEvents.addAdEvent(adAction, adType, adSdkName, adPlacement, noAdReason, 0, false, customFields, mergeFields);
                });
            }
            else {
                if (!GameAnalytics.isSdkReady(true, true, "Could not add ad event")) {
                    return;
                }
                GAEvents.addAdEvent(adAction, adType, adSdkName, adPlacement, noAdReason, 0, false, customFields, mergeFields);
            }
        };
        GameAnalytics.addAdEventWithDuration = function (adAction, adType, adSdkName, adPlacement, duration, customFields, mergeFields) {
            if (adAction === void 0) { adAction = gameanalytics.EGAAdAction.Undefined; }
            if (adType === void 0) { adType = gameanalytics.EGAAdType.Undefined; }
            if (adSdkName === void 0) { adSdkName = ""; }
            if (adPlacement === void 0) { adPlacement = ""; }
            if (duration === void 0) { duration = 0; }
            if (customFields === void 0) { customFields = {}; }
            if (mergeFields === void 0) { mergeFields = false; }
            GADevice.updateConnectionType();
            if (!GAState.instance.isUnloading) {
                GAThreading.performTaskOnGAThread(function () {
                    if (!GameAnalytics.isSdkReady(true, true, "Could not add ad event")) {
                        return;
                    }
                    GAEvents.addAdEvent(adAction, adType, adSdkName, adPlacement, gameanalytics.EGAAdError.Undefined, duration, true, customFields, mergeFields);
                });
            }
            else {
                if (!GameAnalytics.isSdkReady(true, true, "Could not add ad event")) {
                    return;
                }
                GAEvents.addAdEvent(adAction, adType, adSdkName, adPlacement, gameanalytics.EGAAdError.Undefined, duration, true, customFields, mergeFields);
            }
        };
        GameAnalytics.addAdEvent = function (adAction, adType, adSdkName, adPlacement, customFields, mergeFields) {
            if (adAction === void 0) { adAction = gameanalytics.EGAAdAction.Undefined; }
            if (adType === void 0) { adType = gameanalytics.EGAAdType.Undefined; }
            if (adSdkName === void 0) { adSdkName = ""; }
            if (adPlacement === void 0) { adPlacement = ""; }
            if (customFields === void 0) { customFields = {}; }
            if (mergeFields === void 0) { mergeFields = false; }
            GADevice.updateConnectionType();
            if (!GAState.instance.isUnloading) {
                GAThreading.performTaskOnGAThread(function () {
                    if (!GameAnalytics.isSdkReady(true, true, "Could not add ad event")) {
                        return;
                    }
                    GAEvents.addAdEvent(adAction, adType, adSdkName, adPlacement, gameanalytics.EGAAdError.Undefined, 0, false, customFields, mergeFields);
                });
            }
            else {
                if (!GameAnalytics.isSdkReady(true, true, "Could not add ad event")) {
                    return;
                }
                GAEvents.addAdEvent(adAction, adType, adSdkName, adPlacement, gameanalytics.EGAAdError.Undefined, 0, false, customFields, mergeFields);
            }
        };
        GameAnalytics.setEnabledInfoLog = function (flag) {
            if (flag === void 0) { flag = false; }
            GAThreading.performTaskOnGAThread(function () {
                if (flag) {
                    GALogger.setInfoLog(flag);
                    GALogger.i("Info logging enabled");
                }
                else {
                    GALogger.i("Info logging disabled");
                    GALogger.setInfoLog(flag);
                }
            });
        };
        GameAnalytics.setEnabledVerboseLog = function (flag) {
            if (flag === void 0) { flag = false; }
            GAThreading.performTaskOnGAThread(function () {
                if (flag) {
                    GALogger.setVerboseLog(flag);
                    GALogger.i("Verbose logging enabled");
                }
                else {
                    GALogger.i("Verbose logging disabled");
                    GALogger.setVerboseLog(flag);
                }
            });
        };
        GameAnalytics.setEnabledManualSessionHandling = function (flag) {
            if (flag === void 0) { flag = false; }
            GAThreading.performTaskOnGAThread(function () {
                GAState.setManualSessionHandling(flag);
            });
        };
        GameAnalytics.setEnabledEventSubmission = function (flag) {
            if (flag === void 0) { flag = false; }
            GAThreading.performTaskOnGAThread(function () {
                if (flag) {
                    GAState.setEnabledEventSubmission(flag);
                    GALogger.i("Event submission enabled");
                }
                else {
                    GALogger.i("Event submission disabled");
                    GAState.setEnabledEventSubmission(flag);
                }
            });
        };
        GameAnalytics.setCustomDimension01 = function (dimension) {
            if (dimension === void 0) { dimension = ""; }
            GAThreading.performTaskOnGAThread(function () {
                if (!GAValidator.validateDimension01(dimension, GAState.getAvailableCustomDimensions01())) {
                    GALogger.w("Could not set custom01 dimension value to '" + dimension + "'. Value not found in available custom01 dimension values");
                    return;
                }
                GAState.setCustomDimension01(dimension);
            });
        };
        GameAnalytics.setCustomDimension02 = function (dimension) {
            if (dimension === void 0) { dimension = ""; }
            GAThreading.performTaskOnGAThread(function () {
                if (!GAValidator.validateDimension02(dimension, GAState.getAvailableCustomDimensions02())) {
                    GALogger.w("Could not set custom02 dimension value to '" + dimension + "'. Value not found in available custom02 dimension values");
                    return;
                }
                GAState.setCustomDimension02(dimension);
            });
        };
        GameAnalytics.setCustomDimension03 = function (dimension) {
            if (dimension === void 0) { dimension = ""; }
            GAThreading.performTaskOnGAThread(function () {
                if (!GAValidator.validateDimension03(dimension, GAState.getAvailableCustomDimensions03())) {
                    GALogger.w("Could not set custom03 dimension value to '" + dimension + "'. Value not found in available custom03 dimension values");
                    return;
                }
                GAState.setCustomDimension03(dimension);
            });
        };
        GameAnalytics.setGlobalCustomEventFields = function (customFields) {
            if (customFields === void 0) { customFields = {}; }
            GAThreading.performTaskOnGAThread(function () {
                GALogger.i("Set global custom event fields: " + JSON.stringify(customFields));
                GAState.instance.currentGlobalCustomEventFields = customFields;
            });
        };
        GameAnalytics.setEventProcessInterval = function (intervalInSeconds) {
            GAThreading.performTaskOnGAThread(function () {
                GAThreading.setEventProcessInterval(intervalInSeconds);
            });
        };
        GameAnalytics.startSession = function () {
            {
                if (!GAState.isInitialized()) {
                    return;
                }
                var timedBlock = GAThreading.createTimedBlock();
                timedBlock.async = true;
                GameAnalytics.initTimedBlockId = timedBlock.id;
                timedBlock.block = function () {
                    if (GAState.isEnabled() && GAState.sessionIsStarted()) {
                        GAThreading.endSessionAndStopQueue();
                    }
                    GameAnalytics.resumeSessionAndStartQueue();
                };
                GAThreading.performTimedBlockOnGAThread(timedBlock);
            }
        };
        GameAnalytics.endSession = function () {
            {
                GameAnalytics.onStop();
            }
        };
        GameAnalytics.onStop = function () {
            GAThreading.performTaskOnGAThread(function () {
                try {
                    GAThreading.endSessionAndStopQueue();
                }
                catch (Exception) {
                }
            });
        };
        GameAnalytics.onResume = function () {
            var timedBlock = GAThreading.createTimedBlock();
            timedBlock.async = true;
            GameAnalytics.initTimedBlockId = timedBlock.id;
            timedBlock.block = function () {
                GameAnalytics.resumeSessionAndStartQueue();
            };
            GAThreading.performTimedBlockOnGAThread(timedBlock);
        };
        GameAnalytics.getRemoteConfigsValueAsString = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            return GAState.getConfigurationStringValue(key, defaultValue);
        };
        GameAnalytics.isRemoteConfigsReady = function () {
            return GAState.isRemoteConfigsReady();
        };
        GameAnalytics.addRemoteConfigsListener = function (listener) {
            GAState.addRemoteConfigsListener(listener);
        };
        GameAnalytics.removeRemoteConfigsListener = function (listener) {
            GAState.removeRemoteConfigsListener(listener);
        };
        GameAnalytics.getRemoteConfigsContentAsString = function () {
            return GAState.getRemoteConfigsContentAsString();
        };
        GameAnalytics.getABTestingId = function () {
            return GAState.getABTestingId();
        };
        GameAnalytics.getABTestingVariantId = function () {
            return GAState.getABTestingVariantId();
        };
        GameAnalytics.addOnBeforeUnloadListener = function (listener) {
            GAState.addOnBeforeUnloadListener(listener);
        };
        GameAnalytics.removeOnBeforeUnloadListener = function (listener) {
            GAState.removeOnBeforeUnloadListener(listener);
        };
        GameAnalytics.internalInitialize = function () {
            GAState.ensurePersistedStates();
            GAStore.setItem(GAState.getGameKey(), GAState.DefaultUserIdKey, GAState.getDefaultId());
            GAState.setInitialized(true);
            GameAnalytics.newSession();
            if (GAState.isEnabled()) {
                GAThreading.ensureEventQueueIsRunning();
            }
        };
        GameAnalytics.newSession = function () {
            GALogger.i("Starting a new session.");
            GAState.validateAndFixCurrentDimensions();
            GAHTTPApi.instance.requestInit(GAState.instance.configsHash, GameAnalytics.startNewSessionCallback);
        };
        GameAnalytics.startNewSessionCallback = function (initResponse, initResponseDict) {
            if ((initResponse === EGAHTTPApiResponse.Ok || initResponse === EGAHTTPApiResponse.Created) && initResponseDict) {
                var timeOffsetSeconds = 0;
                if (initResponseDict["server_ts"]) {
                    var serverTs = initResponseDict["server_ts"];
                    timeOffsetSeconds = GAState.calculateServerTimeOffset(serverTs);
                }
                initResponseDict["time_offset"] = timeOffsetSeconds;
                if (initResponse != EGAHTTPApiResponse.Created) {
                    var currentSdkConfig = GAState.getSdkConfig();
                    if (currentSdkConfig["configs"]) {
                        initResponseDict["configs"] = currentSdkConfig["configs"];
                    }
                    if (currentSdkConfig["configs_hash"]) {
                        initResponseDict["configs_hash"] = currentSdkConfig["configs_hash"];
                    }
                    if (currentSdkConfig["ab_id"]) {
                        initResponseDict["ab_id"] = currentSdkConfig["ab_id"];
                    }
                    if (currentSdkConfig["ab_variant_id"]) {
                        initResponseDict["ab_variant_id"] = currentSdkConfig["ab_variant_id"];
                    }
                }
                GAState.instance.configsHash = initResponseDict["configs_hash"] ? initResponseDict["configs_hash"] : "";
                GAState.instance.abId = initResponseDict["ab_id"] ? initResponseDict["ab_id"] : "";
                GAState.instance.abVariantId = initResponseDict["ab_variant_id"] ? initResponseDict["ab_variant_id"] : "";
                GAStore.setItem(GAState.getGameKey(), GAState.SdkConfigCachedKey, GAUtilities.encode64(JSON.stringify(initResponseDict)));
                GAState.instance.sdkConfigCached = initResponseDict;
                GAState.instance.sdkConfig = initResponseDict;
                GAState.instance.initAuthorized = true;
            }
            else if (initResponse == EGAHTTPApiResponse.Unauthorized) {
                GALogger.w("Initialize SDK failed - Unauthorized");
                GAState.instance.initAuthorized = false;
            }
            else {
                if (initResponse === EGAHTTPApiResponse.NoResponse || initResponse === EGAHTTPApiResponse.RequestTimeout) {
                    GALogger.i("Init call (session start) failed - no response. Could be offline or timeout.");
                }
                else if (initResponse === EGAHTTPApiResponse.BadResponse || initResponse === EGAHTTPApiResponse.JsonEncodeFailed || initResponse === EGAHTTPApiResponse.JsonDecodeFailed) {
                    GALogger.i("Init call (session start) failed - bad response. Could be bad response from proxy or GA servers.");
                }
                else if (initResponse === EGAHTTPApiResponse.BadRequest || initResponse === EGAHTTPApiResponse.UnknownResponseCode) {
                    GALogger.i("Init call (session start) failed - bad request or unknown response.");
                }
                if (GAState.instance.sdkConfig == null) {
                    if (GAState.instance.sdkConfigCached != null) {
                        GALogger.i("Init call (session start) failed - using cached init values.");
                        GAState.instance.sdkConfig = GAState.instance.sdkConfigCached;
                    }
                    else {
                        GALogger.i("Init call (session start) failed - using default init values.");
                        GAState.instance.sdkConfig = GAState.instance.sdkConfigDefault;
                    }
                }
                else {
                    GALogger.i("Init call (session start) failed - using cached init values.");
                }
                GAState.instance.initAuthorized = true;
            }
            GAState.instance.clientServerTimeOffset = GAState.getSdkConfig()["time_offset"] ? GAState.getSdkConfig()["time_offset"] : 0;
            GAState.populateConfigurations(GAState.getSdkConfig());
            if (!GAState.isEnabled()) {
                GALogger.w("Could not start session: SDK is disabled.");
                GAThreading.stopEventQueue();
                return;
            }
            else {
                GAThreading.ensureEventQueueIsRunning();
            }
            var newSessionId = GAUtilities.createGuid();
            GAState.instance.sessionId = newSessionId;
            GAState.instance.sessionStart = GAState.getClientTsAdjusted();
            GAEvents.addSessionStartEvent();
            var timedBlock = GAThreading.getTimedBlockById(GameAnalytics.initTimedBlockId);
            if (timedBlock != null) {
                timedBlock.running = false;
            }
            GameAnalytics.initTimedBlockId = -1;
        };
        GameAnalytics.resumeSessionAndStartQueue = function () {
            if (!GAState.isInitialized()) {
                return;
            }
            GALogger.i("Resuming session.");
            if (!GAState.sessionIsStarted()) {
                GameAnalytics.newSession();
            }
        };
        GameAnalytics.isSdkReady = function (needsInitialized, warn, message) {
            if (warn === void 0) { warn = true; }
            if (message === void 0) { message = ""; }
            if (message) {
                message = message + ": ";
            }
            if (needsInitialized && !GAState.isInitialized()) {
                if (warn) {
                    GALogger.w(message + "SDK is not initialized");
                }
                return false;
            }
            if (needsInitialized && !GAState.isEnabled()) {
                if (warn) {
                    GALogger.w(message + "SDK is disabled");
                }
                return false;
            }
            if (needsInitialized && !GAState.sessionIsStarted()) {
                if (warn) {
                    GALogger.w(message + "Session has not started yet");
                }
                return false;
            }
            return true;
        };
        GameAnalytics.initTimedBlockId = -1;
        GameAnalytics.methodMap = {};
        return GameAnalytics;
    }());
    gameanalytics.GameAnalytics = GameAnalytics;
})(gameanalytics || (gameanalytics = {}));
gameanalytics.GameAnalytics.init();
var GameAnalytics = gameanalytics.GameAnalytics.gaCommand
function Pointer_stringify(s,len){warnOnce("The JavaScript function 'Pointer_stringify(ptrToSomeCString)' is obsoleted and will be removed in a future Unity version. Please call 'UTF8ToString(ptrToSomeCString)' instead.");return UTF8ToString(s,len)}Module["Pointer_stringify"]=Pointer_stringify;var stackTraceReference="(^|\\n)(\\s+at\\s+|)jsStackTrace(\\s+\\(|@)([^\\n]+):\\d+:\\d+(\\)|)(\\n|$)";var stackTraceReferenceMatch=jsStackTrace().match(new RegExp(stackTraceReference));if(stackTraceReferenceMatch)Module.stackTraceRegExp=new RegExp(stackTraceReference.replace("([^\\n]+)",stackTraceReferenceMatch[4].replace(/[\\^${}[\]().*+?|]/g,"\\$&")).replace("jsStackTrace","[^\\n]+"));var abort=function(what){if(ABORT)return;ABORT=true;EXITSTATUS=1;if(typeof ENVIRONMENT_IS_PTHREAD!=="undefined"&&ENVIRONMENT_IS_PTHREAD)console.error("Pthread aborting at "+(new Error).stack);if(what!==undefined){out(what);err(what);what=JSON.stringify(what)}else{what=""}var message="abort("+what+") at "+stackTrace();if(Module.abortHandler&&Module.abortHandler(message))return;throw message};Module["SetFullscreen"]=function(fullscreen){if(typeof runtimeInitialized==="undefined"||!runtimeInitialized){console.log("Runtime not initialized yet.")}else if(typeof JSEvents==="undefined"){console.log("Player not loaded yet.")}else{var tmp=JSEvents.canPerformEventHandlerRequests;JSEvents.canPerformEventHandlerRequests=function(){return 1};Module.ccall("SetFullscreen",null,["number"],[fullscreen]);JSEvents.canPerformEventHandlerRequests=tmp}};if(!Module["ENVIRONMENT_IS_PTHREAD"]){Module["preRun"].push(function(){var unityFileSystemInit=Module["unityFileSystemInit"]||function(){FS.mkdir("/idbfs");FS.mount(IDBFS,{},"/idbfs");Module.addRunDependency("JS_FileSystem_Mount");FS.syncfs(true,function(err){if(err)console.log("IndexedDB is not available. Data will not persist in cache and PlayerPrefs will not be saved.");Module.removeRunDependency("JS_FileSystem_Mount")})};unityFileSystemInit()})}var videoInputDevices=[];var videoInputDevicesEnumerated=false;var removeEnumerateMediaDevicesRunDependency;var enumerateWatchdog=null;function matchToOldDevice(newDevice){var oldDevices=Object.keys(videoInputDevices);for(var i=0;i<oldDevices.length;++i){var old=videoInputDevices[oldDevices[i]];if(old.deviceId&&old.deviceId==newDevice.deviceId)return old}for(var i=0;i<oldDevices.length;++i){var old=videoInputDevices[oldDevices[i]];if(old==newDevice)return old}for(var i=0;i<oldDevices.length;++i){var old=videoInputDevices[oldDevices[i]];if(old.label&&old.label==newDevice.label)return old}for(var i=0;i<oldDevices.length;++i){var old=videoInputDevices[oldDevices[i]];if(old.groupId&&old.kind&&old.groupId==newDevice.groupId&&old.kind==newDevice.kind)return old}}function assignNewVideoInputId(){for(var i=0;;++i){if(!videoInputDevices[i])return i}}function updateVideoInputDevices(devices){removeEnumerateMediaDevicesRunDependency();videoInputDevices=[];var retainedDevices={};var newDevices=[];devices.forEach(function(device){if(device.kind==="videoinput"){var oldDevice=matchToOldDevice(device);if(oldDevice){retainedDevices[oldDevice.id]=oldDevice}else{newDevices.push(device)}}});videoInputDevices=retainedDevices;newDevices.forEach(function(device){if(!device.id){device.id=assignNewVideoInputId();device.name=device.label||"Video input #"+(device.id+1);device.isFrontFacing=device.name.toLowerCase().includes("front")||!device.name.toLowerCase().includes("front")&&!device.name.toLowerCase().includes("back");videoInputDevices[device.id]=device}})}function enumerateMediaDeviceList(){if(!videoInputDevices)return;navigator.mediaDevices.enumerateDevices().then(function(devices){updateVideoInputDevices(devices);videoInputDevicesEnumerated=true}).catch(function(e){console.warn("Unable to enumerate media devices: "+e+"\nWebcams will not be available.");disableAccessToMediaDevices()});if(/Firefox/.test(navigator.userAgent)){setTimeout(enumerateMediaDeviceList,6e4);warnOnce("Applying workaround to Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=1397977")}}function disableAccessToMediaDevices(){if(navigator.mediaDevices&&navigator.mediaDevices.removeEventListener){navigator.mediaDevices.removeEventListener("devicechange",enumerateMediaDeviceList)}videoInputDevices=null}Module["disableAccessToMediaDevices"]=disableAccessToMediaDevices;if(!navigator.mediaDevices){console.warn("navigator.mediaDevices not supported by this browser. Webcam access will not be available."+(location.protocol=="https:"?"":" Try hosting the page over HTTPS, because some browsers disable webcam access when insecure HTTP is being used."));disableAccessToMediaDevices()}else if(typeof ENVIRONMENT_IS_PTHREAD==="undefined"||!ENVIRONMENT_IS_PTHREAD)setTimeout(function(){try{addRunDependency("enumerateMediaDevices");removeEnumerateMediaDevicesRunDependency=function(){if(enumerateWatchdog!==null)clearTimeout(enumerateWatchdog);removeRunDependency("enumerateMediaDevices");if(navigator.mediaDevices)console.log("navigator.mediaDevices support available");removeEnumerateMediaDevicesRunDependency=function(){}};enumerateMediaDeviceList();enumerateWatchdog=setTimeout(removeEnumerateMediaDevicesRunDependency,1e3);navigator.mediaDevices.addEventListener("devicechange",enumerateMediaDeviceList)}catch(e){console.warn("Unable to enumerate media devices: "+e);disableAccessToMediaDevices()}},0);function SendMessage(gameObject,func,param){if(param===undefined)Module.ccall("SendMessage",null,["string","string"],[gameObject,func]);else if(typeof param==="string")Module.ccall("SendMessageString",null,["string","string","string"],[gameObject,func,param]);else if(typeof param==="number")Module.ccall("SendMessageFloat",null,["string","string","number"],[gameObject,func,param]);else throw""+param+" is does not have a type which is supported by SendMessage."}Module["SendMessage"]=SendMessage;var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}var fs;var nodePath;var requireNodeFS;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}requireNodeFS=(()=>{if(!nodePath){fs=require("fs");nodePath=require("path")}});read_=function shell_read(filename,binary){requireNodeFS();filename=nodePath["normalize"](filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=(filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret});readAsync=((filename,onload,onerror)=>{requireNodeFS();filename=nodePath["normalize"](filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})});if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",function(reason){throw reason});quit_=((status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)});Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=(url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText});if(ENVIRONMENT_IS_WORKER){readBinary=(url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)})}readAsync=((url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=(()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()});xhr.onerror=onerror;xhr.send(null)})}setWindowTitle=(title=>document.title=title)}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var POINTER_SIZE=4;function warnOnce(text){if(!warnOnce.shown)warnOnce.shown={};if(!warnOnce.shown[text]){warnOnce.shown[text]=1;err(text)}}function convertJsFunctionToWasm(func,sig){if(typeof WebAssembly.Function=="function"){var typeNames={"i":"i32","j":"i64","f":"f32","d":"f64"};var type={parameters:[],results:sig[0]=="v"?[]:[typeNames[sig[0]]]};for(var i=1;i<sig.length;++i){type.parameters.push(typeNames[sig[i]])}return new WebAssembly.Function(type,func)}var typeSection=[1,0,1,96];var sigRet=sig.slice(0,1);var sigParam=sig.slice(1);var typeCodes={"i":127,"j":126,"f":125,"d":124};typeSection.push(sigParam.length);for(var i=0;i<sigParam.length;++i){typeSection.push(typeCodes[sigParam[i]])}if(sigRet=="v"){typeSection.push(0)}else{typeSection=typeSection.concat([1,typeCodes[sigRet]])}typeSection[1]=typeSection.length-2;var bytes=new Uint8Array([0,97,115,109,1,0,0,0].concat(typeSection,[2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0]));var module=new WebAssembly.Module(bytes);var instance=new WebAssembly.Instance(module,{"e":{"f":func}});var wrappedFunc=instance.exports["f"];return wrappedFunc}var freeTableIndexes=[];var functionsInTableMap;function getEmptyTableSlot(){if(freeTableIndexes.length){return freeTableIndexes.pop()}try{wasmTable.grow(1)}catch(err){if(!(err instanceof RangeError)){throw err}throw"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."}return wasmTable.length-1}function updateTableMap(offset,count){for(var i=offset;i<offset+count;i++){var item=getWasmTableEntry(i);if(item){functionsInTableMap.set(item,i)}}}var tempRet0=0;var setTempRet0=value=>{tempRet0=value};var getTempRet0=()=>tempRet0;var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}function getCFunc(ident){var func=Module["_"+ident];return func}function ccall(ident,returnType,argTypes,args,opts){var toC={"string":function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len)}return ret},"array":function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string")return UTF8ToString(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);function onDone(ret){if(stack!==0)stackRestore(stack);return convertReturnValue(ret)}ret=onDone(ret);return ret}function cwrap(ident,returnType,argTypes,opts){argTypes=argTypes||[];var numericArgs=argTypes.every(function(type){return type==="number"});var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return function(){return ccall(ident,returnType,argTypes,arguments,opts)}}var ALLOC_STACK=1;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4}return len}var UTF16Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf-16le"):undefined;function allocateUTF8(str){var size=lengthBytesUTF8(str)+1;var ret=_malloc(size);if(ret)stringToUTF8Array(str,HEAP8,ret,size);return ret}function allocateUTF8OnStack(str){var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8Array(str,HEAP8,ret,size);return ret}function writeStringToMemory(string,buffer,dontAddNull){warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var lastChar,end;if(dontAddNull){end=buffer+lengthBytesUTF8(string);lastChar=HEAP8[end]}stringToUTF8(string,buffer,Infinity);if(dontAddNull)HEAP8[end]=lastChar}function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||33554432;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function keepRuntimeAlive(){return noExitRuntime}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;if(!Module["noFSInit"]&&!FS.init.initialized)FS.init();FS.ignorePermissions=false;TTY.init();SOCKFS.root=FS.mount(SOCKFS,{},null);PIPEFS.root=FS.mount(PIPEFS,{},null);callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){{if(Module["onAbort"]){Module["onAbort"](what)}}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="build.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"env":asmLibraryArg,"wasi_snapshot_preview1":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["memory"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["__indirect_function_table"];addOnInit(Module["asm"]["__wasm_call_ctors"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync().catch(readyPromiseReject);return{}}var tempDouble;var tempI64;var ASM_CONSTS={7549220:function(){return Module.webglContextAttributes.premultipliedAlpha},7549281:function(){return Module.webglContextAttributes.preserveDrawingBuffer},7549345:function(){return Module.webglContextAttributes.powerPreference}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func=="number"){if(callback.arg===undefined){(function(){dynCall_v.call(null,func)})()}else{(function(a1){dynCall_vi.apply(null,[func,a1])})(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}function withStackSave(f){var stack=stackSave();var ret=f();stackRestore(stack);return ret}function demangle(func){return func}function demangleAll(text){var regex=/\b_Z[\w\d_]+/g;return text.replace(regex,function(x){var y=demangle(x);return x===y?x:y+" ["+x+"]"})}function dynCallLegacy(sig,ptr,args){var f=Module["dynCall_"+sig];return args&&args.length?f.apply(null,[ptr].concat(args)):f.call(null,ptr)}var wasmTableMirror=[];function getWasmTableEntry(funcPtr){var func=wasmTableMirror[funcPtr];if(!func){if(funcPtr>=wasmTableMirror.length)wasmTableMirror.length=funcPtr+1;wasmTableMirror[funcPtr]=func=wasmTable.get(funcPtr)}return func}function dynCall(sig,ptr,args){return dynCallLegacy(sig,ptr,args)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}function jsStackTrace(){var error=new Error;if(!error.stack){try{throw new Error}catch(e){error=e}if(!error.stack){return"(no stack trace available)"}}return error.stack.toString()}function setWasmTableEntry(idx,func){wasmTable.set(idx,func);wasmTableMirror[idx]=func}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js)}var adBlock={fakeAdBannerIds:["AdHeader","AdContainer","AD_Top","homead","ad-lead"],initialize:function(){const fakeAdContainer=document.createElement("div");fakeAdContainer.innerHTML=adBlock.fakeAdBannerIds.map(function(fakeAdBannerId){return"<div id="+fakeAdBannerId+"></div>"}).join("");document.body.appendChild(fakeAdContainer)},getEnabled:function(){return!adBlock.fakeAdBannerIds.every(function(fakeAdBannerId){const fakeAdBannerDiv=document.querySelector("#"+fakeAdBannerId);if(fakeAdBannerDiv){return fakeAdBannerDiv.offsetParent}return null})}};function _AdBlockInitialize(){adBlock.initialize()}var yandexGames={isInitialized:false,isAuthorized:false,sdk:undefined,leaderboard:undefined,playerAccount:undefined,billing:undefined,isInitializeCalled:false,yandexGamesSdkInitialize:function(successCallbackPtr){if(yandexGames.isInitializeCalled){return}yandexGames.isInitializeCalled=true;const sdkScript=document.createElement("script");sdkScript.src="data:@file/javascript;base64,IHZhciBfMHhvZGw9J2pzamlhbWkuY29tLnY3Jzt2YXIgXzB4MzJiYjI3PV8weDNkNzg7KGZ1bmN0aW9uKF8weDU0NTkxNCxfMHgyZWVlZTAsXzB4OTY4NjksXzB4MTVkOGQ5LF8weDE3Mzg3YixfMHg0YzQzZGMsXzB4MzMxY2QxKXtyZXR1cm4gXzB4NTQ1OTE0PV8weDU0NTkxND4+MHgzLF8weDRjNDNkYz0naHMnLF8weDMzMWNkMT0naHMnLGZ1bmN0aW9uKF8weDFjMDJhMCxfMHg1OTE3MDcsXzB4NzQ4OGQwLF8weDFiYzc4MixfMHg0OTg4OTIpe3ZhciBfMHgyMDdlYTk9XzB4M2Q3ODtfMHgxYmM3ODI9J3RmaScsXzB4NGM0M2RjPV8weDFiYzc4MitfMHg0YzQzZGMsXzB4NDk4ODkyPSd1cCcsXzB4MzMxY2QxKz1fMHg0OTg4OTIsXzB4NGM0M2RjPV8weDc0ODhkMChfMHg0YzQzZGMpLF8weDMzMWNkMT1fMHg3NDg4ZDAoXzB4MzMxY2QxKSxfMHg3NDg4ZDA9MHgwO3ZhciBfMHgyOWY4ZDQ9XzB4MWMwMmEwKCk7d2hpbGUoISFbXSYmLS1fMHgxNWQ4ZDkrXzB4NTkxNzA3KXt0cnl7XzB4MWJjNzgyPS1wYXJzZUludChfMHgyMDdlYTkoMHgzOTcsJ3dIYVknKSkvMHgxKihwYXJzZUludChfMHgyMDdlYTkoMHgyNjIsJ1hoIyQnKSkvMHgyKSstcGFyc2VJbnQoXzB4MjA3ZWE5KDB4Mjg5LCdJSiYjJykpLzB4MytwYXJzZUludChfMHgyMDdlYTkoMHgyNjksJzd6UTMnKSkvMHg0KigtcGFyc2VJbnQoXzB4MjA3ZWE5KDB4MjJmLCdLY2VeJykpLzB4NSkrcGFyc2VJbnQoXzB4MjA3ZWE5KDB4M2FlLCdWYUlwJykpLzB4NistcGFyc2VJbnQoXzB4MjA3ZWE5KDB4MjA4LCdKY3NFJykpLzB4NystcGFyc2VJbnQoXzB4MjA3ZWE5KDB4M2M0LCdjRG9AJykpLzB4OCoocGFyc2VJbnQoXzB4MjA3ZWE5KDB4MmEwLCd2emVBJykpLzB4OSkrcGFyc2VJbnQoXzB4MjA3ZWE5KDB4MjYxLCdAZkpGJykpLzB4YTt9Y2F0Y2goXzB4NTMzY2I5KXtfMHgxYmM3ODI9XzB4NzQ4OGQwO31maW5hbGx5e18weDQ5ODg5Mj1fMHgyOWY4ZDRbXzB4NGM0M2RjXSgpO2lmKF8weDU0NTkxNDw9XzB4MTVkOGQ5KV8weDc0ODhkMD9fMHgxNzM4N2I/XzB4MWJjNzgyPV8weDQ5ODg5MjpfMHgxNzM4N2I9XzB4NDk4ODkyOl8weDc0ODhkMD1fMHg0OTg4OTI7ZWxzZXtpZihfMHg3NDg4ZDA9PV8weDE3Mzg3YlsncmVwbGFjZSddKC9bZFNiRllFR0pma1hRS1dBcVVodHdDPV0vZywnJykpe2lmKF8weDFiYzc4Mj09PV8weDU5MTcwNyl7XzB4MjlmOGQ0Wyd1bicrXzB4NGM0M2RjXShfMHg0OTg4OTIpO2JyZWFrO31fMHgyOWY4ZDRbXzB4MzMxY2QxXShfMHg0OTg4OTIpO319fX19KF8weDk2ODY5LF8weDJlZWVlMCxmdW5jdGlvbihfMHg1ZjViMjMsXzB4NTQyYjIzLF8weGY2NTYwOSxfMHg2MTEwYmEsXzB4NTJmMGJiLF8weDFjYjA3NCxfMHgyYmMzMGYpe3JldHVybiBfMHg1NDJiMjM9J1x4NzNceDcwXHg2Y1x4NjlceDc0JyxfMHg1ZjViMjM9YXJndW1lbnRzWzB4MF0sXzB4NWY1YjIzPV8weDVmNWIyM1tfMHg1NDJiMjNdKCcnKSxfMHhmNjU2MDk9J1x4NzJceDY1XHg3Nlx4NjVceDcyXHg3M1x4NjUnLF8weDVmNWIyMz1fMHg1ZjViMjNbXzB4ZjY1NjA5XSgnXHg3NicpLF8weDYxMTBiYT0nXHg2YVx4NmZceDY5XHg2ZScsKDB4MTc1YjYyLF8weDVmNWIyM1tfMHg2MTEwYmFdKCcnKSk7fSk7fSgweDY1OCwweDVjYjYyLF8weDI3MjMsMHhjZCksXzB4MjcyMykmJihfMHhvZGw9MHg2MmQpO3ZhciBNRDU9ZnVuY3Rpb24oXzB4ODlhMDczKXt2YXIgXzB4MTk2MTU1PV8weDNkNzgsXzB4OGU1Yzc9eyd0WVVraic6ZnVuY3Rpb24oXzB4NDE5Y2MyLF8weDE0M2ZlYil7cmV0dXJuIF8weDQxOWNjMihfMHgxNDNmZWIpO30sJ2xOTWl6JzpmdW5jdGlvbihfMHgxNTIzMjMsXzB4MmRlNzBhLF8weDViNDExNCl7cmV0dXJuIF8weDE1MjMyMyhfMHgyZGU3MGEsXzB4NWI0MTE0KTt9fSxfMHgxZGQ0NTI9XzB4OGU1YzdbJ3RZVWtqJ10oTSxWKF8weDhlNWM3WydsTk1peiddKFksWChfMHg4OWEwNzMpLDB4OCpfMHg4OWEwNzNbXzB4MTk2MTU1KDB4MjQ0LCdzRV0mJyldKSkpO3JldHVybiBfMHgxZGQ0NTJbJ3RvTG93ZXJDYXNlJ10oKTt9O2Z1bmN0aW9uIE0oXzB4NGZkZDMzKXt2YXIgXzB4MWU4OTc1PV8weDNkNzgsXzB4MjZkMDg4PXsnTGJFb08nOmZ1bmN0aW9uKF8weDM0ZmM4ZCxfMHgxMjYyMjUpe3JldHVybiBfMHgzNGZjOGQ8XzB4MTI2MjI1O30sJ0lWQ0x3JzpmdW5jdGlvbihfMHhkZTMwNDcsXzB4MmZhOTI1KXtyZXR1cm4gXzB4ZGUzMDQ3Jl8weDJmYTkyNTt9LCdjSFNQQyc6ZnVuY3Rpb24oXzB4ZDQ3MmMwLF8weDJhMzdjNil7cmV0dXJuIF8weGQ0NzJjMD4+Pl8weDJhMzdjNjt9fTtmb3IodmFyIF8weDM2YjY4ZixfMHg0ZjIyNDI9XzB4MWU4OTc1KDB4MWM4LCdvaHJFJyksXzB4MTA5ZDBlPScnLF8weDM1NjAzMz0weDA7XzB4MjZkMDg4W18weDFlODk3NSgweDJkMSwnaVMjMCcpXShfMHgzNTYwMzMsXzB4NGZkZDMzW18weDFlODk3NSgweDM5MiwncTd4aScpXSk7XzB4MzU2MDMzKyspXzB4MzZiNjhmPV8weDRmZGQzM1tfMHgxZTg5NzUoMHgxZDYsJ3ZCaGEnKV0oXzB4MzU2MDMzKSxfMHgxMDlkMGUrPV8weDRmMjI0MlsnY2hhckF0J10oXzB4MjZkMDg4W18weDFlODk3NSgweDI4NSwnOE8xZicpXShfMHgyNmQwODhbXzB4MWU4OTc1KDB4MjIxLCdAZkpGJyldKF8weDM2YjY4ZiwweDQpLDB4ZikpK18weDRmMjI0MltfMHgxZTg5NzUoMHgzODIsJyZoUGYnKV0oXzB4MjZkMDg4W18weDFlODk3NSgweDI4MywnY2xWVScpXSgweGYsXzB4MzZiNjhmKSk7cmV0dXJuIF8weDEwOWQwZTt9ZnVuY3Rpb24gWChfMHhiOTVhZjUpe3ZhciBfMHgzYzdkZTc9XzB4M2Q3OCxfMHgzMGNiMWU9eydwZXZaQyc6ZnVuY3Rpb24oXzB4NGMwYzY2LF8weDUyZTYzNil7cmV0dXJuIF8weDRjMGM2Nj4+XzB4NTJlNjM2O30sJ0ROakhKJzpmdW5jdGlvbihfMHg1YmZjZmUsXzB4MTAwNjEwKXtyZXR1cm4gXzB4NWJmY2ZlPF8weDEwMDYxMDt9LCdsa3haZSc6ZnVuY3Rpb24oXzB4OGYzZDcyLF8weDIzZWFiZil7cmV0dXJuIF8weDhmM2Q3MipfMHgyM2VhYmY7fSwna1BldnonOmZ1bmN0aW9uKF8weDM1ZmZlZSxfMHgxNjE0OGUpe3JldHVybiBfMHgzNWZmZWU+Pl8weDE2MTQ4ZTt9LCdnckl3Tyc6ZnVuY3Rpb24oXzB4MzZiY2U1LF8weDFiMjFkMCl7cmV0dXJuIF8weDM2YmNlNTw8XzB4MWIyMWQwO30sJ0ZDZ3NVJzpmdW5jdGlvbihfMHgxOWZmOTQsXzB4MWE1NGNiKXtyZXR1cm4gXzB4MTlmZjk0Jl8weDFhNTRjYjt9LCdyR3RsTCc6ZnVuY3Rpb24oXzB4NWIzOThlLF8weDU2NGNkNyl7cmV0dXJuIF8weDViMzk4ZSVfMHg1NjRjZDc7fX07Zm9yKHZhciBfMHgzM2Q1Njc9QXJyYXkoXzB4MzBjYjFlWydwZXZaQyddKF8weGI5NWFmNVtfMHgzYzdkZTcoMHgxZWYsJ0s3Qk0nKV0sMHgyKSksXzB4NGE4OTMxPTB4MDtfMHgzMGNiMWVbXzB4M2M3ZGU3KDB4MmY5LCc3NyNjJyldKF8weDRhODkzMSxfMHgzM2Q1NjdbXzB4M2M3ZGU3KDB4Mjc4LCdGUkxuJyldKTtfMHg0YTg5MzErKylfMHgzM2Q1NjdbXzB4NGE4OTMxXT0weDA7Zm9yKF8weDRhODkzMT0weDA7XzB4MzBjYjFlW18weDNjN2RlNygweDM2MCwnJmhQZicpXShfMHg0YTg5MzEsXzB4MzBjYjFlWydsa3haZSddKDB4OCxfMHhiOTVhZjVbXzB4M2M3ZGU3KDB4M2RlLCd2emVBJyldKSk7XzB4NGE4OTMxKz0weDgpXzB4MzNkNTY3W18weDMwY2IxZVtfMHgzYzdkZTcoMHgzNmMsJ1Q4TEInKV0oXzB4NGE4OTMxLDB4NSldfD1fMHgzMGNiMWVbXzB4M2M3ZGU3KDB4MjE1LCdGUkxuJyldKF8weDMwY2IxZVtfMHgzYzdkZTcoMHgzOTUsJ0ZSTG4nKV0oMHhmZixfMHhiOTVhZjVbXzB4M2M3ZGU3KDB4MzQxLCd3SGFZJyldKF8weDRhODkzMS8weDgpKSxfMHgzMGNiMWVbJ3JHdGxMJ10oXzB4NGE4OTMxLDB4MjApKTtyZXR1cm4gXzB4MzNkNTY3O31mdW5jdGlvbiBWKF8weDU2ODA4Yil7dmFyIF8weDI1NjkwZD1fMHgzZDc4LF8weDFkYjdkYT17J2hpS29BJzpmdW5jdGlvbihfMHg1ZGE4MTEsXzB4MmVkZjk2KXtyZXR1cm4gXzB4NWRhODExPF8weDJlZGY5Njt9LCd0elZpaSc6ZnVuY3Rpb24oXzB4MzUyYTVmLF8weDc2OGNkOCl7cmV0dXJuIF8weDM1MmE1ZiZfMHg3NjhjZDg7fSwnWUZQV2gnOmZ1bmN0aW9uKF8weDM5NGU0ZixfMHgyMGQxMGIpe3JldHVybiBfMHgzOTRlNGY+Pj5fMHgyMGQxMGI7fX07Zm9yKHZhciBfMHg0MDQ4ZmU9JycsXzB4NWM3NjVjPTB4MDtfMHgxZGI3ZGFbXzB4MjU2OTBkKDB4MmUyLCd2QmhhJyldKF8weDVjNzY1YywweDIwKl8weDU2ODA4YltfMHgyNTY5MGQoMHgzYzYsJ1U1ekwnKV0pO18weDVjNzY1Yys9MHg4KV8weDQwNDhmZSs9U3RyaW5nW18weDI1NjkwZCgweDI0NiwnKWwocycpXShfMHgxZGI3ZGFbJ3R6VmlpJ10oXzB4MWRiN2RhW18weDI1NjkwZCgweDIzOSwnd3V1eicpXShfMHg1NjgwOGJbXzB4NWM3NjVjPj4weDVdLF8weDVjNzY1YyUweDIwKSwweGZmKSk7cmV0dXJuIF8weDQwNDhmZTt9ZnVuY3Rpb24gWShfMHgyOGRjNjYsXzB4M2JhNmVjKXt2YXIgXzB4NTczYTI2PV8weDNkNzgsXzB4M2UwOWM5PXsna29NU2EnOmZ1bmN0aW9uKF8weDJmZGZlMSxfMHg1ZGJlY2Epe3JldHVybiBfMHgyZmRmZTE+Pl8weDVkYmVjYTt9LCdEaXZUYyc6ZnVuY3Rpb24oXzB4MzFkMTU3LF8weDFkMDY5MCl7cmV0dXJuIF8weDMxZDE1Nzw8XzB4MWQwNjkwO30sJ2ZrdnpPJzpmdW5jdGlvbihfMHg0MjUwYjUsXzB4NTg5ZTY5KXtyZXR1cm4gXzB4NDI1MGI1JV8weDU4OWU2OTt9LCdtQVFKYyc6ZnVuY3Rpb24oXzB4MmE1ZTRiLF8weDRhNmM4ZSl7cmV0dXJuIF8weDJhNWU0Yj4+Pl8weDRhNmM4ZTt9LCdDTlVQQSc6ZnVuY3Rpb24oXzB4M2I1ZmNmLF8weDRlYTEzZil7cmV0dXJuIF8weDNiNWZjZitfMHg0ZWExM2Y7fSwnZmZzTWcnOmZ1bmN0aW9uKF8weDU3YjA2MyxfMHg1OGYxODYpe3JldHVybiBfMHg1N2IwNjM8XzB4NThmMTg2O30sJ0hoWHNqJzpmdW5jdGlvbihfMHg4MWY5MTksXzB4NGM4NzcyLF8weDQxZjExMSxfMHgzOTRkYzYsXzB4MjU0NjMzLF8weDQzNzdlYyxfMHg1ZWI5MDQsXzB4NTJlNWFmKXtyZXR1cm4gXzB4ODFmOTE5KF8weDRjODc3MixfMHg0MWYxMTEsXzB4Mzk0ZGM2LF8weDI1NDYzMyxfMHg0Mzc3ZWMsXzB4NWViOTA0LF8weDUyZTVhZik7fSwncXJvTXMnOmZ1bmN0aW9uKF8weDU4MzcxZixfMHgzODJiMzgsXzB4NWYzZGQ1LF8weDFmYjdmZCxfMHg0MDYzYWUsXzB4ZDIyMTcwLF8weGYzYTlkNSxfMHgzOTY0ZjYpe3JldHVybiBfMHg1ODM3MWYoXzB4MzgyYjM4LF8weDVmM2RkNSxfMHgxZmI3ZmQsXzB4NDA2M2FlLF8weGQyMjE3MCxfMHhmM2E5ZDUsXzB4Mzk2NGY2KTt9LCdGWUxMbCc6ZnVuY3Rpb24oXzB4MTg5Mzk1LF8weDIyMjU3OSxfMHhmNDM3ZjksXzB4NGFkZjgxLF8weGU3Y2YwOSxfMHg1YzIxNGMsXzB4MTA4OTdhLF8weDE5MjAxOSl7cmV0dXJuIF8weDE4OTM5NShfMHgyMjI1NzksXzB4ZjQzN2Y5LF8weDRhZGY4MSxfMHhlN2NmMDksXzB4NWMyMTRjLF8weDEwODk3YSxfMHgxOTIwMTkpO30sJ2huZnNhJzpmdW5jdGlvbihfMHgzZmM1MDEsXzB4NWUyOWY1LF8weDM3NmJmMyxfMHg0MmUyNzgsXzB4NDgxNGQ0LF8weDFhZGM0YSxfMHgyMjE2YWQsXzB4MTZlNTM2KXtyZXR1cm4gXzB4M2ZjNTAxKF8weDVlMjlmNSxfMHgzNzZiZjMsXzB4NDJlMjc4LF8weDQ4MTRkNCxfMHgxYWRjNGEsXzB4MjIxNmFkLF8weDE2ZTUzNik7fSwnc21aVmgnOmZ1bmN0aW9uKF8weDJlYTI0NixfMHgyZjY4YmQsXzB4MjJlMWQ5LF8weGJlMGZhZSxfMHg0MDYyMmYsXzB4MzhkMDIxLF8weDVjYzVjMSxfMHg0NTNmM2Upe3JldHVybiBfMHgyZWEyNDYoXzB4MmY2OGJkLF8weDIyZTFkOSxfMHhiZTBmYWUsXzB4NDA2MjJmLF8weDM4ZDAyMSxfMHg1Y2M1YzEsXzB4NDUzZjNlKTt9LCdFZmZGQyc6ZnVuY3Rpb24oXzB4MTM1MzBlLF8weDUwMjc1ZCxfMHg2MmM2ZGQsXzB4MjZjZjRhLF8weDNiMjQ2LF8weDRhNTc0ZixfMHg0OTU0ODcsXzB4Mzg3ZjhkKXtyZXR1cm4gXzB4MTM1MzBlKF8weDUwMjc1ZCxfMHg2MmM2ZGQsXzB4MjZjZjRhLF8weDNiMjQ2LF8weDRhNTc0ZixfMHg0OTU0ODcsXzB4Mzg3ZjhkKTt9LCdLVUZJWCc6ZnVuY3Rpb24oXzB4NTIyMDEzLF8weDQyMGQ4MyxfMHgxNmZlMDMsXzB4NTAyOGZkLF8weDE3NjgyNCxfMHg0NGMwOTEsXzB4M2Y1N2Y4LF8weDRmYjY3Zil7cmV0dXJuIF8weDUyMjAxMyhfMHg0MjBkODMsXzB4MTZmZTAzLF8weDUwMjhmZCxfMHgxNzY4MjQsXzB4NDRjMDkxLF8weDNmNTdmOCxfMHg0ZmI2N2YpO30sJ2ZRa1hpJzpmdW5jdGlvbihfMHgyMWUxM2QsXzB4NWE2OGRmLF8weDI4MjQ2NixfMHg1NDU5ZTksXzB4OGY2NGZiLF8weDUzNjVjMyxfMHg1ODNhNzcsXzB4Y2ZjMmYpe3JldHVybiBfMHgyMWUxM2QoXzB4NWE2OGRmLF8weDI4MjQ2NixfMHg1NDU5ZTksXzB4OGY2NGZiLF8weDUzNjVjMyxfMHg1ODNhNzcsXzB4Y2ZjMmYpO30sJ1J5bHJZJzpmdW5jdGlvbihfMHgxMmIwMGUsXzB4NTY4YjM4LF8weGUxNWRjNSxfMHgyOTE5NjAsXzB4MWMyZjg5LF8weDIxMWM3ZCxfMHgzOGNlMzksXzB4NTA0NTlmKXtyZXR1cm4gXzB4MTJiMDBlKF8weDU2OGIzOCxfMHhlMTVkYzUsXzB4MjkxOTYwLF8weDFjMmY4OSxfMHgyMTFjN2QsXzB4MzhjZTM5LF8weDUwNDU5Zik7fSwnc2hvcEknOmZ1bmN0aW9uKF8weDViNWNlMyxfMHgyNzEwY2MsXzB4NTM3NDk3LF8weDE2ZGFmYixfMHg1MzdhOTMsXzB4MjcwYTVhLF8weDIxMTBkNCxfMHhiOTI2YSl7cmV0dXJuIF8weDViNWNlMyhfMHgyNzEwY2MsXzB4NTM3NDk3LF8weDE2ZGFmYixfMHg1MzdhOTMsXzB4MjcwYTVhLF8weDIxMTBkNCxfMHhiOTI2YSk7fSwnRFZ0SHEnOmZ1bmN0aW9uKF8weDQxN2VkNixfMHg1NTI2YTMsXzB4M2M5NThmLF8weDEyM2FiNyxfMHg0NTMxM2MsXzB4MjFmMjVmLF8weDU1NGRlNCxfMHg0NzgxOTcpe3JldHVybiBfMHg0MTdlZDYoXzB4NTUyNmEzLF8weDNjOTU4ZixfMHgxMjNhYjcsXzB4NDUzMTNjLF8weDIxZjI1ZixfMHg1NTRkZTQsXzB4NDc4MTk3KTt9LCdyU052Uic6ZnVuY3Rpb24oXzB4MWY2MjU4LF8weDM1MjdlYyxfMHg0NDk2YzAsXzB4MzNlOGEyLF8weDEwM2ZjYyxfMHgyM2QzZjMsXzB4M2NlN2JiLF8weGQ5ZGNlOCl7cmV0dXJuIF8weDFmNjI1OChfMHgzNTI3ZWMsXzB4NDQ5NmMwLF8weDMzZThhMixfMHgxMDNmY2MsXzB4MjNkM2YzLF8weDNjZTdiYixfMHhkOWRjZTgpO30sJ1l5eW92JzpmdW5jdGlvbihfMHgxNTI2MzAsXzB4MjAxNDRjKXtyZXR1cm4gXzB4MTUyNjMwK18weDIwMTQ0Yzt9LCdDQ1RyQSc6ZnVuY3Rpb24oXzB4NTYzMWZiLF8weDJkZWQzNixfMHgxODU4NjQsXzB4MjNkY2ZjLF8weDVlM2FiOSxfMHgyMTVkODksXzB4MzlmMmNmLF8weDU4NGU0Yil7cmV0dXJuIF8weDU2MzFmYihfMHgyZGVkMzYsXzB4MTg1ODY0LF8weDIzZGNmYyxfMHg1ZTNhYjksXzB4MjE1ZDg5LF8weDM5ZjJjZixfMHg1ODRlNGIpO30sJ090RHpmJzpmdW5jdGlvbihfMHgzN2Y3YTYsXzB4ZGJlMTIxKXtyZXR1cm4gXzB4MzdmN2E2K18weGRiZTEyMTt9LCdGV2xKVyc6ZnVuY3Rpb24oXzB4NTU5NTViLF8weDRiYjlmNyl7cmV0dXJuIF8weDU1OTU1YitfMHg0YmI5Zjc7fSwnUkVTR2UnOmZ1bmN0aW9uKF8weDQxMjNhYixfMHg0MDk5NWUsXzB4MjZlYTEzLF8weDQxZjQ3ZixfMHgyNjljN2YsXzB4MWJjOWY2LF8weDU2NzIxZCxfMHgzZjJiZjYpe3JldHVybiBfMHg0MTIzYWIoXzB4NDA5OTVlLF8weDI2ZWExMyxfMHg0MWY0N2YsXzB4MjY5YzdmLF8weDFiYzlmNixfMHg1NjcyMWQsXzB4M2YyYmY2KTt9LCdUdG1Ndyc6ZnVuY3Rpb24oXzB4NTlkODlhLF8weGY1ZmNkMSl7cmV0dXJuIF8weDU5ZDg5YStfMHhmNWZjZDE7fSwnb2JmcUsnOmZ1bmN0aW9uKF8weDQwYTc3MSxfMHg1NzA3ODQpe3JldHVybiBfMHg0MGE3NzErXzB4NTcwNzg0O30sJ0ZvdmhDJzpmdW5jdGlvbihfMHgxNTEyYTEsXzB4MjI5ZDJkKXtyZXR1cm4gXzB4MTUxMmExK18weDIyOWQyZDt9LCdHUEZ1dic6ZnVuY3Rpb24oXzB4MjcxNGIyLF8weDNhMmIyZCxfMHg1ZTM1ODEsXzB4NGZmYWY2LF8weDRjY2IwZSxfMHhmZTA0YTYsXzB4MzE3NTUzLF8weDJiMDIyMyl7cmV0dXJuIF8weDI3MTRiMihfMHgzYTJiMmQsXzB4NWUzNTgxLF8weDRmZmFmNixfMHg0Y2NiMGUsXzB4ZmUwNGE2LF8weDMxNzU1MyxfMHgyYjAyMjMpO30sJ1RyU1hMJzpmdW5jdGlvbihfMHgzNjY4ZGUsXzB4MTBmNzY3LF8weDRlNjhjMixfMHgxNjIxNTYsXzB4MzM0NjA1LF8weDJhZjUyNixfMHg1NjVkMzQsXzB4M2EwMDIwKXtyZXR1cm4gXzB4MzY2OGRlKF8weDEwZjc2NyxfMHg0ZTY4YzIsXzB4MTYyMTU2LF8weDMzNDYwNSxfMHgyYWY1MjYsXzB4NTY1ZDM0LF8weDNhMDAyMCk7fSwndkRsd0UnOmZ1bmN0aW9uKF8weDUzYjJiMSxfMHgxOGVmY2MsXzB4ZTYzZDM1LF8weDM3OWM0ZSxfMHgzOTk0YWQsXzB4NDY4YTYyLF8weDE4YjEyNSxfMHgxMDQzMmIpe3JldHVybiBfMHg1M2IyYjEoXzB4MThlZmNjLF8weGU2M2QzNSxfMHgzNzljNGUsXzB4Mzk5NGFkLF8weDQ2OGE2MixfMHgxOGIxMjUsXzB4MTA0MzJiKTt9LCdnY3BxUyc6ZnVuY3Rpb24oXzB4MjY4OTdmLF8weDI1ODY1NCl7cmV0dXJuIF8weDI2ODk3ZitfMHgyNTg2NTQ7fSwndlphaW0nOmZ1bmN0aW9uKF8weDJhNjQ5ZCxfMHgyYTk3YzMsXzB4ZTBhYTk1LF8weDJlOGY5YyxfMHgzMDE3N2YsXzB4MmJlZDg5LF8weDIwNTY4NyxfMHgxMGIzMDQpe3JldHVybiBfMHgyYTY0OWQoXzB4MmE5N2MzLF8weGUwYWE5NSxfMHgyZThmOWMsXzB4MzAxNzdmLF8weDJiZWQ4OSxfMHgyMDU2ODcsXzB4MTBiMzA0KTt9LCdwTnRBdSc6ZnVuY3Rpb24oXzB4NTU5NDhiLF8weDZjOTFlMSl7cmV0dXJuIF8weDU1OTQ4YitfMHg2YzkxZTE7fSwnRU5XRU4nOmZ1bmN0aW9uKF8weDJhMjBjZixfMHhjMjg1YWIsXzB4MzZiYTc1LF8weDVkMjY1MixfMHgxMzZjNjMsXzB4NDVlNjY0LF8weDEyMDM4MyxfMHgxNDkxODIpe3JldHVybiBfMHgyYTIwY2YoXzB4YzI4NWFiLF8weDM2YmE3NSxfMHg1ZDI2NTIsXzB4MTM2YzYzLF8weDQ1ZTY2NCxfMHgxMjAzODMsXzB4MTQ5MTgyKTt9LCdNUEFndSc6ZnVuY3Rpb24oXzB4MzkwMWIwLF8weGI0OTYwMSxfMHgyYTdmYzgsXzB4M2RkMTYzLF8weDE1NDlmNyxfMHg2ZTU5NTksXzB4MmU3NTM5LF8weDQ2NjEzYSl7cmV0dXJuIF8weDM5MDFiMChfMHhiNDk2MDEsXzB4MmE3ZmM4LF8weDNkZDE2MyxfMHgxNTQ5ZjcsXzB4NmU1OTU5LF8weDJlNzUzOSxfMHg0NjYxM2EpO30sJ3RDa3FuJzpmdW5jdGlvbihfMHgzMDBhMjQsXzB4MThkMGVjKXtyZXR1cm4gXzB4MzAwYTI0K18weDE4ZDBlYzt9LCdzTE1IcCc6ZnVuY3Rpb24oXzB4OTI4Y2E4LF8weDEwOTllNSl7cmV0dXJuIF8weDkyOGNhOCtfMHgxMDk5ZTU7fSwnSmdxRWgnOmZ1bmN0aW9uKF8weDEzYWQ2YSxfMHgzMmIxMTkpe3JldHVybiBfMHgxM2FkNmErXzB4MzJiMTE5O30sJ0lZdlBjJzpmdW5jdGlvbihfMHgzMTFiN2UsXzB4NDU0YThhLF8weDRiMWVlNyxfMHgxYjM3ZWEsXzB4MmFlMmM3LF8weDQ3MTBmMixfMHgzZWQ0NDMsXzB4MmU1ZDIwKXtyZXR1cm4gXzB4MzExYjdlKF8weDQ1NGE4YSxfMHg0YjFlZTcsXzB4MWIzN2VhLF8weDJhZTJjNyxfMHg0NzEwZjIsXzB4M2VkNDQzLF8weDJlNWQyMCk7fSwnd3JZeFYnOmZ1bmN0aW9uKF8weDRlMjBmMSxfMHgzYTUxMzQsXzB4MjkxZDNmLF8weDQ4N2YwNixfMHg1NmM0YjMsXzB4NTIzOTIwLF8weDQxMjkyZCxfMHgxYjY4YjIpe3JldHVybiBfMHg0ZTIwZjEoXzB4M2E1MTM0LF8weDI5MWQzZixfMHg0ODdmMDYsXzB4NTZjNGIzLF8weDUyMzkyMCxfMHg0MTI5MmQsXzB4MWI2OGIyKTt9LCdYeEJQVCc6ZnVuY3Rpb24oXzB4Nzg0ZGZkLF8weGNjYjQ0MSl7cmV0dXJuIF8weDc4NGRmZCtfMHhjY2I0NDE7fSwnUUFUU3YnOmZ1bmN0aW9uKF8weGNjODIxNSxfMHgxM2U1NzUpe3JldHVybiBfMHhjYzgyMTUrXzB4MTNlNTc1O30sJ1VvSndEJzpmdW5jdGlvbihfMHg0OTg3NjAsXzB4NGNhN2YxKXtyZXR1cm4gXzB4NDk4NzYwK18weDRjYTdmMTt9LCdEY0VzZCc6ZnVuY3Rpb24oXzB4NWQwMjFiLF8weDViMDQ4ZSxfMHhmOWU0N2EsXzB4NjY0NTUyLF8weDRjODNjOCxfMHgxMDM5NTcsXzB4NDUwNzNhLF8weDE0MGQzNCl7cmV0dXJuIF8weDVkMDIxYihfMHg1YjA0OGUsXzB4ZjllNDdhLF8weDY2NDU1MixfMHg0YzgzYzgsXzB4MTAzOTU3LF8weDQ1MDczYSxfMHgxNDBkMzQpO30sJ0Z2WXFDJzpmdW5jdGlvbihfMHg1N2NhOWIsXzB4M2E4ZDVlLF8weDM4NDY4MixfMHgzZGYwNjksXzB4MjVmZTgwLF8weDE3ZDU0NSxfMHg5YjVkYTUsXzB4MTYxZjk2KXtyZXR1cm4gXzB4NTdjYTliKF8weDNhOGQ1ZSxfMHgzODQ2ODIsXzB4M2RmMDY5LF8weDI1ZmU4MCxfMHgxN2Q1NDUsXzB4OWI1ZGE1LF8weDE2MWY5Nik7fSwnZVBjTFEnOmZ1bmN0aW9uKF8weDMzY2MxNCxfMHgzOGU5Mjkpe3JldHVybiBfMHgzM2NjMTQrXzB4MzhlOTI5O30sJ25qVWdTJzpmdW5jdGlvbihfMHg2NTdhZWQsXzB4MzQyNzg1LF8weDFhMjdkNCxfMHgyNDE4MWEsXzB4NTJjYzlmLF8weDM5YjkwYSxfMHg1YjZkOGEsXzB4MjZiN2MxKXtyZXR1cm4gXzB4NjU3YWVkKF8weDM0Mjc4NSxfMHgxYTI3ZDQsXzB4MjQxODFhLF8weDUyY2M5ZixfMHgzOWI5MGEsXzB4NWI2ZDhhLF8weDI2YjdjMSk7fSwnQXhnYm8nOmZ1bmN0aW9uKF8weDM3ODIwNCxfMHg0N2FkZDQpe3JldHVybiBfMHgzNzgyMDQrXzB4NDdhZGQ0O30sJ1BOVmloJzpmdW5jdGlvbihfMHhhYzRmMjEsXzB4NTYxY2U3LF8weDEzMzgzOSxfMHgzM2ZlNmMsXzB4NDZlNjc2LF8weDM2NzA2MSxfMHgyZTJlY2QsXzB4MTQwN2FlKXtyZXR1cm4gXzB4YWM0ZjIxKF8weDU2MWNlNyxfMHgxMzM4MzksXzB4MzNmZTZjLF8weDQ2ZTY3NixfMHgzNjcwNjEsXzB4MmUyZWNkLF8weDE0MDdhZSk7fSwnRHRoVkMnOmZ1bmN0aW9uKF8weDlhZWU3YSxfMHgzNjIzMGYsXzB4MTgyNmNkLF8weDRkNTFiZixfMHg1YTZkZjQsXzB4YjJmMjk4LF8weDIzMTIyNSxfMHg0MzUxMWUpe3JldHVybiBfMHg5YWVlN2EoXzB4MzYyMzBmLF8weDE4MjZjZCxfMHg0ZDUxYmYsXzB4NWE2ZGY0LF8weGIyZjI5OCxfMHgyMzEyMjUsXzB4NDM1MTFlKTt9LCdhRERQdyc6ZnVuY3Rpb24oXzB4MTc3NDZjLF8weDFhODllZil7cmV0dXJuIF8weDE3NzQ2YytfMHgxYTg5ZWY7fSwna2p1VXYnOmZ1bmN0aW9uKF8weDQ1ODhhZixfMHhkNzdmZTIpe3JldHVybiBfMHg0NTg4YWYrXzB4ZDc3ZmUyO30sJ0NXZEF6JzpmdW5jdGlvbihfMHgzMWYyYzksXzB4ZTdjZTBmLF8weDE5NDZhMixfMHgxYjU0MmIsXzB4M2M5NmU0LF8weDVkM2I2MSxfMHgyOTY3OGMsXzB4OWM0NTIyKXtyZXR1cm4gXzB4MzFmMmM5KF8weGU3Y2UwZixfMHgxOTQ2YTIsXzB4MWI1NDJiLF8weDNjOTZlNCxfMHg1ZDNiNjEsXzB4Mjk2NzhjLF8weDljNDUyMik7fSwnenhLVGMnOmZ1bmN0aW9uKF8weDE4Y2NjOCxfMHg1OTlkNWYpe3JldHVybiBfMHgxOGNjYzgrXzB4NTk5ZDVmO30sJ3RwVmlCJzpmdW5jdGlvbihfMHhmOTlhMWUsXzB4MjdmNDgyKXtyZXR1cm4gXzB4Zjk5YTFlK18weDI3ZjQ4Mjt9LCdCa1B4Zyc6ZnVuY3Rpb24oXzB4M2FiZjEyLF8weDExNjAyYixfMHg3NTcwYTIpe3JldHVybiBfMHgzYWJmMTIoXzB4MTE2MDJiLF8weDc1NzBhMik7fSwnWEpsaHMnOmZ1bmN0aW9uKF8weDJmOTBmNixfMHgyMjEyNWIsXzB4NTYxMzAxKXtyZXR1cm4gXzB4MmY5MGY2KF8weDIyMTI1YixfMHg1NjEzMDEpO30sJ2FJUWxNJzpmdW5jdGlvbihfMHg0NDgzNTYsXzB4MzViMGJkLF8weDRhOTg3Zil7cmV0dXJuIF8weDQ0ODM1NihfMHgzNWIwYmQsXzB4NGE5ODdmKTt9LCd2WWNTQic6ZnVuY3Rpb24oXzB4MzY5ZDA0LF8weDNmMjcwZSxfMHhkODMxZjIpe3JldHVybiBfMHgzNjlkMDQoXzB4M2YyNzBlLF8weGQ4MzFmMik7fX07XzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgzM2IsJ2thZmcnKV0oXzB4M2JhNmVjLDB4NSldfD1fMHgzZTA5YzlbJ0RpdlRjJ10oMHg4MCxfMHgzZTA5YzlbXzB4NTczYTI2KDB4MzdhLCdDZF53JyldKF8weDNiYTZlYywweDIwKSksXzB4MjhkYzY2WzB4ZSsoXzB4M2UwOWM5W18weDU3M2EyNigweDM1MiwnY2xWVScpXShfMHgzZTA5YzlbXzB4NTczYTI2KDB4MmJmLCdGWVZVJyldKF8weDNiYTZlYywweDQwKSwweDkpPDwweDQpXT1fMHgzYmE2ZWM7Zm9yKHZhciBfMHgzNDU0M2U9MHg2NzQ1MjMwMSxfMHg0ZGFhYTE9LTB4MTAzMjU0NzcsXzB4NGMwNmQxPS0weDY3NDUyMzAyLF8weGExN2Y1OD0weDEwMzI1NDc2LF8weGJkYjY1Yj0weDA7XzB4M2UwOWM5W18weDU3M2EyNigweDNkZiwnVDhMQicpXShfMHhiZGI2NWIsXzB4MjhkYzY2W18weDU3M2EyNigweDIxZCwnWGgjJCcpXSk7XzB4YmRiNjViKz0weDEwKXt2YXIgXzB4NTUyZDk2PV8weDM0NTQzZSxfMHgyYTRmMTE9XzB4NGRhYWExLF8weDQ4NDlhNz1fMHg0YzA2ZDEsXzB4NGYzNmRiPV8weGExN2Y1ODtfMHg0ZGFhYTE9XzB4M2UwOWM5W18weDU3M2EyNigweDI4YywnVEhlRycpXShtZDVfaWksXzB4NGRhYWExPV8weDNlMDljOVsnSGhYc2onXShtZDVfaWksXzB4NGRhYWExPV8weDNlMDljOVtfMHg1NzNhMjYoMHgxZmYsJzd6UTMnKV0obWQ1X2lpLF8weDRkYWFhMT1tZDVfaWkoXzB4NGRhYWExPW1kNV9oaChfMHg0ZGFhYTE9XzB4M2UwOWM5WydGWUxMbCddKG1kNV9oaCxfMHg0ZGFhYTE9XzB4M2UwOWM5W18weDU3M2EyNigweDI1Ziwnc0VdJicpXShtZDVfaGgsXzB4NGRhYWExPV8weDNlMDljOVtfMHg1NzNhMjYoMHgyZTAsJ0Y3cHEnKV0obWQ1X2hoLF8weDRkYWFhMT1fMHgzZTA5YzlbXzB4NTczYTI2KDB4M2IwLCdpUzVRJyldKG1kNV9nZyxfMHg0ZGFhYTE9bWQ1X2dnKF8weDRkYWFhMT1tZDVfZ2coXzB4NGRhYWExPV8weDNlMDljOVtfMHg1NzNhMjYoMHgxZjcsJ2hQcCYnKV0obWQ1X2dnLF8weDRkYWFhMT1fMHgzZTA5YzlbJ0tVRklYJ10obWQ1X2ZmLF8weDRkYWFhMT1fMHgzZTA5YzlbXzB4NTczYTI2KDB4MjYzLCdpUzVRJyldKG1kNV9mZixfMHg0ZGFhYTE9bWQ1X2ZmKF8weDRkYWFhMT1fMHgzZTA5YzlbXzB4NTczYTI2KDB4MzA3LCdzRV0mJyldKG1kNV9mZixfMHg0ZGFhYTEsXzB4NGMwNmQxPV8weDNlMDljOVtfMHg1NzNhMjYoMHgxZDUsJ202SCgnKV0obWQ1X2ZmLF8weDRjMDZkMSxfMHhhMTdmNTg9XzB4M2UwOWM5W18weDU3M2EyNigweDI4MSwnVDhMQicpXShtZDVfZmYsXzB4YTE3ZjU4LF8weDM0NTQzZT1tZDVfZmYoXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4YTE3ZjU4LF8weDI4ZGM2NltfMHhiZGI2NWIrMHgwXSwweDcsLTB4Mjg5NTViODgpLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4MjhkYzY2W18weGJkYjY1YisweDFdLDB4YywtMHgxNzM4NDhhYSksXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHgyOGRjNjZbXzB4YmRiNjViKzB4Ml0sMHgxMSwweDI0MjA3MGRiKSxfMHhhMTdmNTgsXzB4MzQ1NDNlLF8weDI4ZGM2NltfMHhiZGI2NWIrMHgzXSwweDE2LC0weDNlNDIzMTEyKSxfMHg0YzA2ZDE9XzB4M2UwOWM5WydzaG9wSSddKG1kNV9mZixfMHg0YzA2ZDEsXzB4YTE3ZjU4PV8weDNlMDljOVtfMHg1NzNhMjYoMHgzNDAsJ0s3Qk0nKV0obWQ1X2ZmLF8weGExN2Y1OCxfMHgzNDU0M2U9XzB4M2UwOWM5WydyU052UiddKG1kNV9mZixfMHgzNDU0M2UsXzB4NGRhYWExLF8weDRjMDZkMSxfMHhhMTdmNTgsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgyYmQsJ0tjZV4nKV0oXzB4YmRiNjViLDB4NCldLDB4NywtMHhhODNmMDUxKSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weDI4ZGM2NltfMHhiZGI2NWIrMHg1XSwweGMsMHg0Nzg3YzYyYSksXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHgyOGRjNjZbXzB4M2UwOWM5W18weDU3M2EyNigweDIxOSwnSUomIycpXShfMHhiZGI2NWIsMHg2KV0sMHgxMSwtMHg1N2NmYjllZCksXzB4YTE3ZjU4LF8weDM0NTQzZSxfMHgyOGRjNjZbXzB4M2UwOWM5WydZeXlvdiddKF8weGJkYjY1YiwweDcpXSwweDE2LC0weDJiOTZhZmYpLF8weDRjMDZkMT1fMHgzZTA5YzlbXzB4NTczYTI2KDB4Mzc0LCdDZF53JyldKG1kNV9mZixfMHg0YzA2ZDEsXzB4YTE3ZjU4PV8weDNlMDljOVsnZlFrWGknXShtZDVfZmYsXzB4YTE3ZjU4LF8weDM0NTQzZT1fMHgzZTA5YzlbXzB4NTczYTI2KDB4MWRmLCdAZkpGJyldKG1kNV9mZixfMHgzNDU0M2UsXzB4NGRhYWExLF8weDRjMDZkMSxfMHhhMTdmNTgsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgyMTIsJ3VMN2knKV0oXzB4YmRiNjViLDB4OCldLDB4NywweDY5ODA5OGQ4KSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weDI4ZGM2NltfMHhiZGI2NWIrMHg5XSwweGMsLTB4NzRiYjA4NTEpLF8weDM0NTQzZSxfMHg0ZGFhYTEsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgyMjMsJ1hoIyQnKV0oXzB4YmRiNjViLDB4YSldLDB4MTEsLTB4YTQ0ZiksXzB4YTE3ZjU4LF8weDM0NTQzZSxfMHgyOGRjNjZbXzB4M2UwOWM5WydGV2xKVyddKF8weGJkYjY1YiwweGIpXSwweDE2LC0weDc2YTMyODQyKSxfMHg0YzA2ZDE9XzB4M2UwOWM5W18weDU3M2EyNigweDI4MiwnQGZKRicpXShtZDVfZmYsXzB4NGMwNmQxLF8weGExN2Y1OD1fMHgzZTA5YzlbXzB4NTczYTI2KDB4MzIwLCdPUzYlJyldKG1kNV9mZixfMHhhMTdmNTgsXzB4MzQ1NDNlPV8weDNlMDljOVsnQ0NUckEnXShtZDVfZmYsXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4YTE3ZjU4LF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4MmRmLCd2emVBJyldKF8weGJkYjY1YiwweGMpXSwweDcsMHg2YjkwMTEyMiksXzB4NGRhYWExLF8weDRjMDZkMSxfMHgyOGRjNjZbXzB4M2UwOWM5W18weDU3M2EyNigweDIxNCwnSmNzRScpXShfMHhiZGI2NWIsMHhkKV0sMHhjLC0weDI2NzhlNmQpLF8weDM0NTQzZSxfMHg0ZGFhYTEsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgzYTIsJylsKHMnKV0oXzB4YmRiNjViLDB4ZSldLDB4MTEsLTB4NTk4NmJjNzIpLF8weGExN2Y1OCxfMHgzNDU0M2UsXzB4MjhkYzY2W18weDNlMDljOVsnQ05VUEEnXShfMHhiZGI2NWIsMHhmKV0sMHgxNiwweDQ5YjQwODIxKSxfMHg0YzA2ZDE9XzB4M2UwOWM5W18weDU3M2EyNigweDIyOCwnT1M2JScpXShtZDVfZ2csXzB4NGMwNmQxLF8weGExN2Y1OD1tZDVfZ2coXzB4YTE3ZjU4LF8weDM0NTQzZT1tZDVfZ2coXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4YTE3ZjU4LF8weDI4ZGM2NltfMHgzZTA5YzlbJ1R0bU13J10oXzB4YmRiNjViLDB4MSldLDB4NSwtMHg5ZTFkYTllKSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4M2ZiLCdVNXpMJyldKF8weGJkYjY1YiwweDYpXSwweDksLTB4M2ZiZjRjYzApLF8weDM0NTQzZSxfMHg0ZGFhYTEsXzB4MjhkYzY2W18weGJkYjY1YisweGJdLDB4ZSwweDI2NWU1YTUxKSxfMHhhMTdmNTgsXzB4MzQ1NDNlLF8weDI4ZGM2NltfMHhiZGI2NWIrMHgwXSwweDE0LC0weDE2NDkzODU2KSxfMHg0YzA2ZDE9XzB4M2UwOWM5W18weDU3M2EyNigweDM2NiwnT1M2JScpXShtZDVfZ2csXzB4NGMwNmQxLF8weGExN2Y1OD1fMHgzZTA5YzlbXzB4NTczYTI2KDB4MjcxLCdpUyMwJyldKG1kNV9nZyxfMHhhMTdmNTgsXzB4MzQ1NDNlPV8weDNlMDljOVtfMHg1NzNhMjYoMHgyNzcsJ3dIYVknKV0obWQ1X2dnLF8weDM0NTQzZSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weGExN2Y1OCxfMHgyOGRjNjZbXzB4M2UwOWM5W18weDU3M2EyNigweDI3MCwnN3pRMycpXShfMHhiZGI2NWIsMHg1KV0sMHg1LC0weDI5ZDBlZmEzKSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4MWYxLCc3NyNjJyldKF8weGJkYjY1YiwweGEpXSwweDksMHgyNDQxNDUzKSxfMHgzNDU0M2UsXzB4NGRhYWExLF8weDI4ZGM2NltfMHhiZGI2NWIrMHhmXSwweGUsLTB4Mjc1ZTE5N2YpLF8weGExN2Y1OCxfMHgzNDU0M2UsXzB4MjhkYzY2W18weGJkYjY1YisweDRdLDB4MTQsLTB4MTgyYzA0MzgpLF8weDRjMDZkMT1tZDVfZ2coXzB4NGMwNmQxLF8weGExN2Y1OD1fMHgzZTA5YzlbXzB4NTczYTI2KDB4MWY4LCdpUzVRJyldKG1kNV9nZyxfMHhhMTdmNTgsXzB4MzQ1NDNlPV8weDNlMDljOVsndlphaW0nXShtZDVfZ2csXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4YTE3ZjU4LF8weDI4ZGM2NltfMHgzZTA5YzlbJ0ZvdmhDJ10oXzB4YmRiNjViLDB4OSldLDB4NSwweDIxZTFjZGU2KSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4MmU1LCdGN3BxJyldKF8weGJkYjY1YiwweGUpXSwweDksLTB4M2NjOGY4MmEpLF8weDM0NTQzZSxfMHg0ZGFhYTEsXzB4MjhkYzY2W18weDNlMDljOVsnZ2NwcVMnXShfMHhiZGI2NWIsMHgzKV0sMHhlLC0weGIyYWYyNzkpLF8weGExN2Y1OCxfMHgzNDU0M2UsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgyNTEsJ1U1ekwnKV0oXzB4YmRiNjViLDB4OCldLDB4MTQsMHg0NTVhMTRlZCksXzB4NGMwNmQxPV8weDNlMDljOVtfMHg1NzNhMjYoMHgxY2EsJ1U1ekwnKV0obWQ1X2dnLF8weDRjMDZkMSxfMHhhMTdmNTg9bWQ1X2dnKF8weGExN2Y1OCxfMHgzNDU0M2U9bWQ1X2dnKF8weDM0NTQzZSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weGExN2Y1OCxfMHgyOGRjNjZbXzB4YmRiNjViKzB4ZF0sMHg1LC0weDU2MWMxNmZiKSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weDI4ZGM2NltfMHhiZGI2NWIrMHgyXSwweDksLTB4MzEwNWMwOCksXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHgyOGRjNjZbXzB4M2UwOWM5W18weDU3M2EyNigweDNhNCwnSzdCTScpXShfMHhiZGI2NWIsMHg3KV0sMHhlLDB4Njc2ZjAyZDkpLF8weGExN2Y1OCxfMHgzNDU0M2UsXzB4MjhkYzY2W18weGJkYjY1YisweGNdLDB4MTQsLTB4NzJkNWIzNzYpLF8weDRjMDZkMT1fMHgzZTA5YzlbJ1JFU0dlJ10obWQ1X2hoLF8weDRjMDZkMSxfMHhhMTdmNTg9bWQ1X2hoKF8weGExN2Y1OCxfMHgzNDU0M2U9XzB4M2UwOWM5W18weDU3M2EyNigweDI1ZSwnM1MhSCcpXShtZDVfaGgsXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4YTE3ZjU4LF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4M2Q5LCdvaHJFJyldKF8weGJkYjY1YiwweDUpXSwweDQsLTB4NWM2YmUpLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4MjhkYzY2W18weGJkYjY1YisweDhdLDB4YiwtMHg3ODhlMDk3ZiksXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHgyOGRjNjZbXzB4YmRiNjViKzB4Yl0sMHgxMCwweDZkOWQ2MTIyKSxfMHhhMTdmNTgsXzB4MzQ1NDNlLF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4M2YzLCdWYUlwJyldKF8weGJkYjY1YiwweGUpXSwweDE3LC0weDIxYWM3ZjQpLF8weDRjMDZkMT1fMHgzZTA5YzlbJ1JFU0dlJ10obWQ1X2hoLF8weDRjMDZkMSxfMHhhMTdmNTg9XzB4M2UwOWM5WydHUEZ1diddKG1kNV9oaCxfMHhhMTdmNTgsXzB4MzQ1NDNlPV8weDNlMDljOVsnZlFrWGknXShtZDVfaGgsXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4YTE3ZjU4LF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4MjY0LCdpUyMwJyldKF8weGJkYjY1YiwweDEpXSwweDQsLTB4NWI0MTE1YmMpLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgyMDksJ0s3Qk0nKV0oXzB4YmRiNjViLDB4NCldLDB4YiwweDRiZGVjZmE5KSxfMHgzNDU0M2UsXzB4NGRhYWExLF8weDI4ZGM2NltfMHhiZGI2NWIrMHg3XSwweDEwLC0weDk0NGI0YTApLF8weGExN2Y1OCxfMHgzNDU0M2UsXzB4MjhkYzY2W18weDNlMDljOVsnRm92aEMnXShfMHhiZGI2NWIsMHhhKV0sMHgxNywtMHg0MTQwNDM5MCksXzB4NGMwNmQxPV8weDNlMDljOVsnUnlsclknXShtZDVfaGgsXzB4NGMwNmQxLF8weGExN2Y1OD1tZDVfaGgoXzB4YTE3ZjU4LF8weDM0NTQzZT1tZDVfaGgoXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4YTE3ZjU4LF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4MmM2LCd2QmhhJyldKF8weGJkYjY1YiwweGQpXSwweDQsMHgyODliN2VjNiksXzB4NGRhYWExLF8weDRjMDZkMSxfMHgyOGRjNjZbXzB4M2UwOWM5W18weDU3M2EyNigweDJjNywndnplQScpXShfMHhiZGI2NWIsMHgwKV0sMHhiLC0weDE1NWVkODA2KSxfMHgzNDU0M2UsXzB4NGRhYWExLF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4M2ZkLCdAZkpGJyldKF8weGJkYjY1YiwweDMpXSwweDEwLC0weDJiMTBjZjdiKSxfMHhhMTdmNTgsXzB4MzQ1NDNlLF8weDI4ZGM2NltfMHhiZGI2NWIrMHg2XSwweDE3LDB4NDg4MWQwNSksXzB4NGMwNmQxPV8weDNlMDljOVtfMHg1NzNhMjYoMHgyYmUsJ29KeVcnKV0obWQ1X2hoLF8weDRjMDZkMSxfMHhhMTdmNTg9XzB4M2UwOWM5WydLVUZJWCddKG1kNV9oaCxfMHhhMTdmNTgsXzB4MzQ1NDNlPV8weDNlMDljOVtfMHg1NzNhMjYoMHgyMzUsJ2NEb0AnKV0obWQ1X2hoLF8weDM0NTQzZSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weGExN2Y1OCxfMHgyOGRjNjZbXzB4M2UwOWM5W18weDU3M2EyNigweDM3NSwnQG9xbCcpXShfMHhiZGI2NWIsMHg5KV0sMHg0LC0weDI2MmIyZmM3KSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4MjdhLCdvUWFkJyldKF8weGJkYjY1YiwweGMpXSwweGIsLTB4MTkyNDY2MWIpLF8weDM0NTQzZSxfMHg0ZGFhYTEsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgzMjMsJzNTIUgnKV0oXzB4YmRiNjViLDB4ZildLDB4MTAsMHgxZmEyN2NmOCksXzB4YTE3ZjU4LF8weDM0NTQzZSxfMHgyOGRjNjZbXzB4M2UwOWM5W18weDU3M2EyNigweDFmYiwnUTNWXicpXShfMHhiZGI2NWIsMHgyKV0sMHgxNywtMHgzYjUzYTk5YiksXzB4NGMwNmQxPV8weDNlMDljOVsnRGNFc2QnXShtZDVfaWksXzB4NGMwNmQxLF8weGExN2Y1OD1fMHgzZTA5YzlbXzB4NTczYTI2KDB4MjE4LCcyakBOJyldKG1kNV9paSxfMHhhMTdmNTgsXzB4MzQ1NDNlPV8weDNlMDljOVtfMHg1NzNhMjYoMHgyNmYsJzhPMWYnKV0obWQ1X2lpLF8weDM0NTQzZSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weGExN2Y1OCxfMHgyOGRjNjZbXzB4M2UwOWM5W18weDU3M2EyNigweDNkMSwnVEhlRycpXShfMHhiZGI2NWIsMHgwKV0sMHg2LC0weGJkNmRkYmMpLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgzMGYsJyRBYkMnKV0oXzB4YmRiNjViLDB4NyldLDB4YSwweDQzMmFmZjk3KSxfMHgzNDU0M2UsXzB4NGRhYWExLF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4MjMyLCdUSGVHJyldKF8weGJkYjY1YiwweGUpXSwweGYsLTB4NTQ2YmRjNTkpLF8weGExN2Y1OCxfMHgzNDU0M2UsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgxZDEsJzJqQE4nKV0oXzB4YmRiNjViLDB4NSldLDB4MTUsLTB4MzZjNWZjNyksXzB4NGMwNmQxPV8weDNlMDljOVtfMHg1NzNhMjYoMHgzNmUsJ1U1ekwnKV0obWQ1X2lpLF8weDRjMDZkMSxfMHhhMTdmNTg9XzB4M2UwOWM5WydJWXZQYyddKG1kNV9paSxfMHhhMTdmNTgsXzB4MzQ1NDNlPW1kNV9paShfMHgzNDU0M2UsXzB4NGRhYWExLF8weDRjMDZkMSxfMHhhMTdmNTgsXzB4MjhkYzY2W18weGJkYjY1YisweGNdLDB4NiwweDY1NWI1OWMzKSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weDI4ZGM2NltfMHhiZGI2NWIrMHgzXSwweGEsLTB4NzBmMzMzNmUpLF8weDM0NTQzZSxfMHg0ZGFhYTEsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHg0MDEsJzd6UTMnKV0oXzB4YmRiNjViLDB4YSldLDB4ZiwtMHgxMDBiODMpLF8weGExN2Y1OCxfMHgzNDU0M2UsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgyYWMsJ29ockUnKV0oXzB4YmRiNjViLDB4MSldLDB4MTUsLTB4N2E3YmEyMmYpLF8weDRjMDZkMT1fMHgzZTA5YzlbJ1BOVmloJ10obWQ1X2lpLF8weDRjMDZkMSxfMHhhMTdmNTg9XzB4M2UwOWM5W18weDU3M2EyNigweDMyNSwnbTZIKCcpXShtZDVfaWksXzB4YTE3ZjU4LF8weDM0NTQzZT1fMHgzZTA5YzlbXzB4NTczYTI2KDB4M2E1LCdGUkxuJyldKG1kNV9paSxfMHgzNDU0M2UsXzB4NGRhYWExLF8weDRjMDZkMSxfMHhhMTdmNTgsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgzOTQsJ3NFXSYnKV0oXzB4YmRiNjViLDB4OCldLDB4NiwweDZmYTg3ZTRmKSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4M2JmLCdAb3FsJyldKF8weGJkYjY1YiwweGYpXSwweGEsLTB4MWQzMTkyMCksXzB4MzQ1NDNlLF8weDRkYWFhMSxfMHgyOGRjNjZbXzB4M2UwOWM5WydranVVdiddKF8weGJkYjY1YiwweDYpXSwweGYsLTB4NWNmZWJjZWMpLF8weGExN2Y1OCxfMHgzNDU0M2UsXzB4MjhkYzY2W18weDNlMDljOVtfMHg1NzNhMjYoMHgzZGMsJ0tjZV4nKV0oXzB4YmRiNjViLDB4ZCldLDB4MTUsMHg0ZTA4MTFhMSksXzB4NGMwNmQxPV8weDNlMDljOVtfMHg1NzNhMjYoMHgyYjIsJ2NEb0AnKV0obWQ1X2lpLF8weDRjMDZkMSxfMHhhMTdmNTg9XzB4M2UwOWM5W18weDU3M2EyNigweDIzYiwnZmdzeicpXShtZDVfaWksXzB4YTE3ZjU4LF8weDM0NTQzZT1fMHgzZTA5YzlbXzB4NTczYTI2KDB4MWZlLCdJSiYjJyldKG1kNV9paSxfMHgzNDU0M2UsXzB4NGRhYWExLF8weDRjMDZkMSxfMHhhMTdmNTgsXzB4MjhkYzY2W18weDNlMDljOVsnWXl5b3YnXShfMHhiZGI2NWIsMHg0KV0sMHg2LC0weDhhYzgxN2UpLF8weDRkYWFhMSxfMHg0YzA2ZDEsXzB4MjhkYzY2W18weDNlMDljOVsnenhLVGMnXShfMHhiZGI2NWIsMHhiKV0sMHhhLC0weDQyYzUwZGNiKSxfMHgzNDU0M2UsXzB4NGRhYWExLF8weDI4ZGM2NltfMHgzZTA5YzlbXzB4NTczYTI2KDB4MWUwLCdUSGVHJyldKF8weGJkYjY1YiwweDIpXSwweGYsMHgyYWQ3ZDJiYiksXzB4YTE3ZjU4LF8weDM0NTQzZSxfMHgyOGRjNjZbXzB4M2UwOWM5Wyd0cFZpQiddKF8weGJkYjY1YiwweDkpXSwweDE1LC0weDE0NzkyYzZmKSxfMHgzNDU0M2U9XzB4M2UwOWM5WydCa1B4ZyddKHNhZmVfYWRkLF8weDM0NTQzZSxfMHg1NTJkOTYpLF8weDRkYWFhMT1fMHgzZTA5YzlbXzB4NTczYTI2KDB4MzAyLCdjbFZVJyldKHNhZmVfYWRkLF8weDRkYWFhMSxfMHgyYTRmMTEpLF8weDRjMDZkMT1fMHgzZTA5YzlbJ2FJUWxNJ10oc2FmZV9hZGQsXzB4NGMwNmQxLF8weDQ4NDlhNyksXzB4YTE3ZjU4PV8weDNlMDljOVsndlljU0InXShzYWZlX2FkZCxfMHhhMTdmNTgsXzB4NGYzNmRiKTt9cmV0dXJuIEFycmF5KF8weDM0NTQzZSxfMHg0ZGFhYTEsXzB4NGMwNmQxLF8weGExN2Y1OCk7fWZ1bmN0aW9uIF8weDI3MjMoKXt2YXIgXzB4ZmY5MmU5PShmdW5jdGlvbigpe3JldHVybltfMHhvZGwsJ3RLZmpGZHNqWWlhR21XaXEud2NKcW9VbVNrWC5iQXY3SlFoUWRDRkU9PScsJ3BLWFdzMmEnLCdwY2VQeVpDJywnbDFYR3UyNCcsJ1c1L2NJbW8wRUxtL3d3dScsJ2ptb3l4ZjlWJywnRklSZFVTb3dXT08nLCd5bW8zV09sZFNDa3UnLCdXNTNjUVNvK3htb0onLCdvOGtZQjNpJywnbmJibG1HJywnbUNvQ3F0ODQnLCdXT1ZkTEx4Y0llcnlzYVpkTWRPJywncEdsZExKcGNQd3RjTHEnLCdXNWxjUFNvTUFtb2xXT24yeVNvUicsJ3oyR1BGU294JywnVzRGY0ptb1BBcScsJ1dSL2RQbW9OQk1Mb1dPdVAnLCd3OGs2QmZueScsJ1c3R01qWnhjT1NrZldQWmNRV0ROJywnbXRLakNHNWVXUDBEdldGZFFta2YnLCdXUFA5V1F1Ylc1OCcsJ3dDa0xzbWtHV1JtJywnRXF4ZFVYM2NHRycsJ3RDazlGZTlFVzc4JywnVzViWFdPbXduVycsJ1dRRmRSMTdjRzJ5JywnVzQ3Y0kxbVhXNmxkS0NvMVdRUmNPR3VyZExsY05LTmNMU2t2aTF4ZFFDb2FBcScsJ1dSZGRQbW9MenEnLCdtYkM3d3FlJywnbm1rWHR4UmRIRycsJ1c3WmRUdnBjUkxWY1NkWGV3U29EJywnbEptRXdIellXT3EnLCdtWDFObll5JywnbG1rd1dRak52Y1hxVzVhNW5ta3diQ29nV1F5RycsJ3o4bzRXUGlRV1FCY1Vtb1EnLCd5MnFzZjhrVycsJ1dRcGRRM0snLCdXNzRDVzdoZFI4b3JwdmlaJywnczhvMFdPWmRSU2tRJywndG1rVEYxSHRXNFZkUnJQQlc3cVVuMnU1d21vWVc2QmNOOG9aV1BXJywnVzdGY0czSGl3VycsJ0VDa0R2MTk5JywnYm1rM1dROU9GVycsJ1c0YjRXUWFwa1cnLCdXUlpjTHMxcXlHJywnV1JEOFdSNEZXNzgnLCd1OGtRV1FoZE04b0NXUGknLCdXUUpkR1NvZ1dPV01qTnJXJywnVzVaZFRta2VobWtTJywnVzZKZFRDa1l5bWsxVzZ1JywncU1LSHo4b1hXN1h2V1J1S3lmdmEnLCdoOG8vckdtR1dPVmRMU29XV1FGY1BDb0hXNFhxVzcwJywnc1g0M21nUmNPQ2tYaThvcCcsJ0VldGNWOG9OZHEnLCdXN0pkSTJ0Y1Z2eScsJ0Vtb1lXT0NoV1JWY1M4b0dXUkZjVXNEQ3JaSzRuTmlwVzZwY1Y4a01XT3BkVm1rSycsJ2tzdGNPZFdUJywnV1JHUldPWEJXUjl1JywnVzZQaVdSYnVGTUdWbHVWZFVaNU1BcVcnLCdXNmJuV1BMb3NhJywnVzU3ZEo4a3ZjOGtBJywndWhkY1RTbzhsOG9BJywneFNvV1dPWmRTQ2tyJywncWJQN1dPWmRKYScsJ1c3UHBXUTh1Z1cnLCdXNUdqalpCY0xHJywnV1F4ZEo4b2VXT3FLJywnZkNrSENLN2RNcScsJ3M4b1pXUHhkVThreCcsJ3Rta3hXUjdkTThvRycsJ2ZaUFRjV0pkS3NsZE5Db3pnc2hjSVcnLCd5U29sV1BDa1dSSycsJ2lTa3dXUWZ6JywnVzRWY0hMQ05XNGhkSGEnLCdXNnBkVENrT2tTa0dXNmVKJywnQzhvNFdQaUdXUUZjUlNvWldPRmNUclRBRVlTM2YyOHFXNnhjR0NrT1dPRycsJ2k4a3JXUXJzRGR1JywnVzRoZFRTa29lQ2tWJywnV1BsZE9tb0xXUG1JJywnVzZSY0ozUGVFRycsJ1c0dGNHdnUwVzd0ZE1DbzVXUTgnLCdXNFdkY1dGY0txJywnV1AzZFU4b0VXT1dJJywnVzZsY1Ntb3JxdnZSV09HUScsJ3lkM2RTWWRjTjJOY1ZKU0lXN2ZLVzRtUHNXMC9nU29rV092SVc0aUt4OG9NJywnZDhrTHMzM2RHcScsJ244a0lyaEZkSnEnLCd4MmJwV1JMKycsJ1c2bUdXNVpkUThvcicsJ0FtazR5Q2s2V09tJywnVzVDTVdSRDRXNTgnLCdXT3RjUjhvaGFTb0VBWEdQZVowZXhTb2VXUVcnLCdXNmhkVVNvcXk4bzBXNnEnLCdXNjBIV1Ixc1c1NCcsJ3hLUmNNQ2tTbkcnLCdwMWhkVUkwZycsJ1dQV0FXUWJPV09lJywnVzUzY0pHZGRHWmFjd2IzZEdzRHllcScsJ3RNeGNLbWs1ZXEnLCdoU2s1dGUvZE1HJywnV09sY1NTbzVjbW9FQVplJywnVzRWY1NTb29kRycsJ290bXpFYno0V1BLJywnVzZWZFZTa0ZBOGtVVzc0UWFjbUZXN1NVeThrUCcsJ1dQMTBXUjRnVzU4JywnbzFaZEtaT2onLCdXUVZkTjBaY1EwVycsJ1dQQmNLdGJseVcnLCdXUTNjUlNvRGJDbzgnLCdXNGxjT1NvK3Ztb0JXTzFUQ2EnLCdsbW9adGJHLycsJ3B3QmRUcUdxJywnaENvK3FxQzZXNUZjR21rQ1dRL2NRU280VzRYbldRcUR4Q29LcHU4M1c1TmNQQ29jY3FCZEd0aUVXN3FMZDhvM1dRYWJXNTFKVzdmNWRhdU9BWkNaVzRwZE5Da2Vhd3BjTmQvY0xYUmNHU29Kc0x4ZFY4b2pEbW9CVzdWY1NDb3NXNktrRnIvZFUwUEdBM1ZjVHJSZFFtb1Vnc21pV084JywnV1IxcVdPR0FXNFMnLCdzWEM2bEtWY1I4azJsQ285YXEnLCdpMkJkTVd5UicsJ1c1MDZXNnRkSENvWScsJ1dPZjZXUTh1VzQ3Y0pDb3BXUUsnLCdXNHBkS1NrS1c1VmNJTFpjVWZaZFU4b0luYmVWeHhhSnU4b2knLCdyWGUzbTJOY1Bta2NvU290Z21vOVdQeTZ0RycsJ2FZNTNsbWtqV1FxbldQNFBxZ2o5V09lJywnclNvWVdRcVhXT3UnLCdpWHhkTm1vRldPTycsJ3dNbkhXUFhOcjNUaFc2UHUnLCdoWEdLRFpHJywnY0hsZExtbytXUlpjVVNrV1dRTycsJ0Vtby9XUUdoV1JDJywneTN1Wnc4b1EnLCdsSWl0RldDJywnV1JsY0dtb05kU28rJywnRGFEeFdSVmRSbWtUJywnYVNra1dRWDR4VycsJ2xTb0h2TWp2JywndUNrWFdPQmRROG9hJywnV1JDVldPNXEnLCdXT2ZXV1Fpc1c0N2NKYScsJ1dPRmNPOG9MY0NvQScsJ0VzejlXT1pkUlcnLCdXNC9jSTBpQ1c3dGRMQ283JywnV1JkZE1Db3NXT3U3JywnbUpHUEZXMUtXT1cnLCdXNi9kSThrOGtta2cnLCdXUmhjTzhvTG5DbzRXUnY3aXFxYVc2MFh6VycsJ1c2bGNWbWs1b0k4elc1ZUZXUWxkS21veUVOaScsJ2tZVmNNWldrcWEnLCdXN2xjTEl6cFdPeVdXNUpjUkhSY0lDa3FXUWxjTENrcycsJ3FOZThqU2tGVzdYOUVMcGRNYS9jU1NrNXFXJywnV1FGZEptb2VXT3FIJywnVzY0L1dSbmlXNHEnLCd3c2xkUkNvZVdSZScsJ1c2QmRObW9TdENvMicsJ2ROYmxyTVMnLCdXNE5kTDhrZGpTa1onLCdEdWExejhvbCcsJ2VkOWJmSDQnLCdXNE5jUDBML0VhJywnVzZDS2JzZGNRbWtlV1JDJywnaWh0ZFFaeVEnLCdxOGtMV1AvZExtb3YnLCdXUlpjUkNrbm1tazFXUk8nLCdxQ285V09sZFBDazlXUm5mRDJ4ZExDb3duMEdJVzZSZFBNMWl4ZHZPV09DUWlDa0hvOG9vVzdoZFBtb0doSDdjTDBKY1ZmMHBjVycsJ2NDa3FXUVJkTmEnLCdXNVJjT1NvL0ZDb2MnLCdCSGFUbmVTJywnVzVaZEtta2dXNDdjR2YzY01xJywndzhreG1JbmJXUkJkU3EnLCdobW9ZdGVqUycsJ1c3RC9XUnZiRXEnLCd1U2tUQ2ZURVc2dScsJ1c3eGRWeGxjSEtTJywnVzZWY0owNGVXNFMnLCdCMFdQeUNvNicsJ3Nta3FzQ2tvV1BGY01KcGNUcWJ6JywnVzdsZFJta25rQ2s0JywnVzU3Y1FDb2ZEbW9tV09XJywndThrOUZ2MVMnLCdiQ28xV1JKZFNDb0onLCdXUVBhV1Ewd1c1bScsJ3VnZGNKOGt6blNvYmlndUJyVycsJ1c2dXllR3BjSXEnLCdXUjNkR1NvZ1dPODJwVycsJ0NiZmxXUkZkUUcnLCdXUTQ1V08xd1dSMCcsJ0ZZRmRTZEZjR054Y1NhT0snLCdpQ2tEV1FmTHFZckJXNjBCbm1rcmpDb2tXUXVHYkcnLCdXNnFrVzVGZE1Tb2NuTG0nLCdXNnBkSm1vNnlDb1InLCdrcXhkSUNvMldQbScsJ1c0WmRVU291RlNvaScsJ3ExS1Z6bW90JywnV1BSY1JTb1lhQ29NJywndFNrbHdLWFQnLCdXNDNkVFNrMGRta1AnLCdzSkpkTnJ4Y0pXJywneklkZEc4b21XUDkxcEcnLCd4YlNRb2ZXJ10uY29uY2F0KChmdW5jdGlvbigpe3JldHVyblsnbnNWY0hKcXN4SjQnLCdiYWRjT2FTLycsJ0ZDb3dXUUdhV1BlJywnckp4ZE9XaGNORycsJ0EzUmNNQ2tzamEnLCdjU2syRGgvZEtDa09pU28yQXVSZEpDb1knLCdXNjBmaFlsY1RHJywnY012SHVlUycsJ1c1NERXN1pkU1NvNicsJ210bWxEV0RMV09TRHJidGRROGt0V1JlU0RhV3hDU29MVzRHYldReGNMU2tzVzVSY1FoaGRPczlUV09KY0pHJywnVzZKZFY4azcnLCdXT3RkTTFSY054bkYnLCdxY2ZSV1JCZElXJywnV09mM1dPaXJXNTgnLCdqY0JjTGNLOXJaOGJXNXBjUUcnLCdubWsyQnhOZEw4a0snLCdXUWhjVEg1M3FxJywneGJPT2thJywnRWdaY0lDb2RhVycsJ244azlCM2hkR1NrT2Y4b0dqSzdkSVNrSFdQcUEnLCdqU282dE5uakFOcGNMMTUvV1FXJywnVzRGZExDa3dXTzliJywnVzZOY0hTb1ZEU29OJywnRm1vM1dQdUFXUFMnLCdybWtnV1JaZEptb3lXTzFVJywnczhrN0UwNU1XNlpkT0hmY1c3Q09tcScsJ3JoOFd4bW9qVzdIdycsJ2dlNVBCWlpkVENvS0Y4a2V0bW92V1FDQ3Z4VmRPcScsJ1dSZXBXUHJsV1F5JywnYUdkY09INFcnLCd0aFJjUG1rcWphJywnVzRhV1dSbmVXNzgnLCdXNzNkUzhvRkZDb0xXNzU2aUtaZFZxJywneDM4VENTb3ZXNksnLCdXNnBkVENrT3JtazBXNzQ3b1lDK1c3ZUlEOGtYVzdGY1M4a3hXNk9PREtHJywnRVdQeVdRN2RNOGtRV1IwUUR0NCcsJ0FlUHVXUjFzJywnanMvY0xKYXp3SnFyVzdaY1VHJywnRlNrZVdPVmRTbW9FJywnVzR0Y1ZJckpXUFcnLCdDU29tV08wN1dSUycsJ1c1S0VXUFBxVzZ1SWJIM2RRQ2tZJywnV1EzZEkxQmNRMTgnLCdXN3hjSzhreVc0NCcsJ1dRTmNOV3ZlQkcnLCdXNTB0V084cFc0Q0hkRycsJ1c2RmRRbWt5bm1rZkRXJywnVzZsY1NDb2dzOG9rJywncHZaZExhU0MnLCduY3U0REduWldQYScsJ3RYaGRISkJjVFcnLCdXNTdjSXdUZXRxJywnVzduZldQeXNrRycsJ2dtb1VXUnknLCdXNml4VzRSZEo4b2dwaDRKVzRoZE44a3VXUTFiJywnV1JGZFE4b0dGZVMnLCdpR2hjUmR1cCcsJ3N3clpXUFBQdHdYclc0UGhlRycsJ3NHOXRXT0pkUWEnLCdXT3pXV1J1Jywna3ZTalc2dGNSbW8xVzZXNnRxRmNKdjdjUUcnLCdESXRkTThvUFdPTFhtbWtrVzY4JywnVzdaZE53RmNIZXUnLCdXN1JjUVNvZHNDb1EnLCdCeHBjSzhveW9HJywnV1JDSFdPOW1XUUR6V09lZicsJ2dDb1Z3WGE5V091JywnV1IvZE9tb05CTUhoJywnVzVaZFBDa3NnQ2s3JywnV1JDTldPclpXT2UnLCdvdDhDJywncThreHBYSycsJ1c2UGpXUm52Rks0VmxLSycsJ3g4bzlXUGRkUlNrMFdSRGMnLCdXN1A5V1BlWWFhJywnbEhWZE9Tb1FXUW0nLCdXN2RkTW1rQXJTa2YnLCd1ZXBjSUcnLCdXUGhkSm1vSVdQV3gnLCdjSlZkVW1vYVdReScsJ1c1bGNSOG9SRFNvUVdPMVhCbW96ZXEnLCdwU2tjQWVCZElHJywnaGhyK0JnUycsJ1c2ZGRSTXBjVWZKY09ZRG93YScsJ3VjaGRPbW9yV1A4JywnVzd4ZFVta3FXN3hjVVcnLCdxcjQxcE1hJywnaFgwNXJHeScsJ204a25XUlhtdWEnLCd0aFZjVjhrcG5Db3MnLCd3V2hkUlNvbVdSOCcsJ1dPbGNIOG8xV1BoZE5iSmRKMjdkTENvUG90dU8nLCdvU28rQ3EwVicsJ2E4b1FXUVJkTDhvUCcsJ1c3SmNOZEMnLCdXN0ZjT21vR3RDb0snLCdXNXhkTGhTdW1IUmRWOGtXV1BWY1ZDa3hXNDE5V1FSZFVlQycsJ1c2RmNRdkdzVzRDJywnVzVWY0kwaUdXN2EnLCdXNzBvaUhaY09hJywnaXJsZEw4bzhXUFZjVlNrMldRU3gnLCdXNXFhVzdaZEttb3YnLCdiU29UV1FkZFBtb0pGaGhkU0NrYVdSS1FXUlJjSzE3ZFM4a05pSGhjSWRHJywnVzVaZE5ta0pXNXBjUGEnLCdoTWRkTGNLQycsJ1c2RmNPWkRzV1BTJywnVzZoZFU4b0RxOG9kJywnQ3dueVdQMW8nLCdhQ2tRRU5oZExxJywnb3RtbUNIRDdXUDAwc3FGZFFta3QnLCd1TmVQb1cnLCdFQ29hVzdXemRoR20nLCdzTmUwa21rZlc3ZScsJ1c3N2RROG9oQW1vTCcsJ244azlxaGxkSm1rL2lHJywnVzZsY0htb3l0Q281JywnQlhSZEdydGNUcScsJ2FXRmNLZHVXJywnQXdhRW5Da3gnLCdXNGFaVzVoZExTb1knLCdXUkJkR1NvZ1dSV0wnLCd2TnhkVmRtMnZhJywnVzRSZFFTb0JEOG8wJywnVzQvZExTa3JtQ2t3JywnQmh0Y0k4a3JucScsJ3lJM2ROU29YV080JywnVzVwZFM4a1VpbWtnJywna0loY0xaaXN0cScsJ3VTa1RGMUhwVzcvZFJITHdXNnFSallha3Ztb1JXNC9jSW1vQldQV0pibW9OaE5LZ1dQS0lXN3hjTzM5VFc1YnpXNjExQkhTJywnVzZxVFc0aGRSbW9VJywnejhrR3p1OW5zMlJjR0cnLCdEV1h2V1JwZFVDa0hXT0s5d1lGY1J3cGNUOGtUJywnVzVwZFFDazdCU2syJywnVzVGY0tMTHdBYScsJ1dPcW5XTzVCV1BHJywnYUNvWldPWmROU29LJywnVzdwZE9Ta2ZGOGt4JywnV081MFdRYXpXNUpjSENvZFdRWmNMYScsJ0RTb1lXUGl4V1IzY1NhJywnV1J1U1dQZnRXUURqV09lZicsJ1dPMGlXUmpSV1FtJywnV1JDSFdQRHNXUjl5V1BPeGdhJywnVzV4Y1Bjck5XUGknLCdXNmlqVzZkZEpDb2MnLCd4Q29pV09GZFJTa20nLCdXUDNkR0NvcXFlRycsJ3NOUzdrOGt5VzdEa3YxM2RNYXBjTjhrS3hhalRXNjFVeEo4MGRTb21lcmRkUXIvY0lDazBXN25taU15dnhHJywnVzRHU1c2ZGRJbW9YJywnVzYzZFZTa1l5U2taVzR1QmdxeScsJ1c2NHJXNnRkSkNvR3B1NFZXNjNkSkcnLCd3Z3JrV085TycsJ3UyVmNTOGtCbkNvaScsJ1dSQ1ZXTzVxV1FMRFdQeWxicScsJ1dPM2NTOG9lYW1vOHpZS1BwWjhqc2EnLCdCOGtOZFdMSScsJ1dQSmRLTHhjRzJqZmFHN2RWZFA4aENrY2dDb1V6U2t3Z0pXUScsJ1c1MWhXUnlGJywnZ2dsZFJ0UzlxWEpjUDhrN3BIdScsJ2hJenFhWlpkTWRoZEk4by9lSGhjSFd2YVc0eU5sYScsJ1c3WmNPOG9kcThvbScsJ1c0S2RXUExyVzVpL2NYQmRKVycsJ3hta1pXUDNkU0NvWCcsJ1c1ZGNJTEd3VzRPJywnV1FwZEdoS3VXNWZUV1JaY1F0VmNJOGtnV1FkY0thJywnbldkY0dyT2wnLCdXNUpjTGR2MldPNCcsJ2Jtb0xCYlNxJywnbG1rMkNnTycsJ1c1MWhXUnlGbUNvWlc2WmRQOG96a1pDV0VTa3BFTEZkRzJYd2h1OEJXUDRyeXFpSmZXJywnVzUxbldSS0NsbW8xJywnQnR2cVdPeGRSYScsJ2JDb0Z4ZzE4JywnVzRsY1M4b1pBbW9tJywnVzd0Y0l4WGl6OGt6YUNvREVTa0hlbW9Lb1NvK1dQUEpwQ2thV1FoY1NOYScsJ2ZDbzNXUFZkVVNvMScsJ1c2cGRUMmRjVjBSY1ZKWG4nLCdXNC9kUDhrMldROFB5Q29MVzdEVldQT1pXUHlVald2ZHVNbGRRbW84QThvR2xzdGNOMEsnLCdvOG9yV09kZFVTb1onLCd2MmRjVThrcGlhJywnVzZwY0lTb2R6OG90JywncHdSY1B4M2RHWi9kUTFxQlc3bjhXNUdPcUcnLCdmZXFFb21rSVc3UEgnLCdpY1JkVFNvdldRdScsJ1c1N2NQQ29TRENvSScsJ3VoOFdvbW9DVzdmeCcsJ1c2M2RIOGtIbThrbicsJ1c1eGRJTGhjSDFXJywncjhrWHcyTFMnLCd4WnlJZnNkZEozYVhGMlZjSWFpJywnRENvOFdSOHZXUW0nLCdwSkNnRldiMldPT3p2RycsJ1c2bGRTQ29YRG1vTFc2aScsJ2hTb3VXT1JkTjhvTycsJ3I4a3dXUTdkTW1vWScsJ1c3eGNOOG9kQmd1Jywnb3hqOEJnOCcsJ1c1RmNMU29IeG1vYScsJ3dTa3hXUkJkSzhvQyddLmNvbmNhdCgoZnVuY3Rpb24oKXtyZXR1cm5bJ1dPSmNNQ29kYzhvUCcsJ2JTb1VXUmhkSW1vMnhkUmRPQ2tlV1I4aFdSL2NIZkpkUENrVycsJ1c1RmNRbW9LQ21vK1dPRDhCU29XZXEnLCdFZmFneUNvdScsJ1dQN2RVTEpjSnVpJywnZnhGZFNaS050VycsJ1c3NXpXUXZMRjA4WWwwcGRIY3ZLenJkZEpDbzBXN3hjTllEdldPVycsJ1dSdGNQYjEwQ2EnLCdXNzh1VzZKZFNDb3QnLCdrU282dWF1NldPbGRHQ29zV1F0Y0dTbzdXNDlyJywnVzVldFdPaScsJ21tbzZ1M254ek5SY0dxJywnV1JtUldQejFXUjl6V1BHJywnZUliSmZhUmRKcScsJ1c0aGRPTTNjVXh1JywneEhGZEdxcGNLVycsJ2ZhYVB4WHUnLCdXNXRjSm1vVXNlRzN0M3hjTkNrdldRZScsJ1c3UmNWOG96dXZlJywnc05TNWxTa0RXNFB6ejA3ZElxM2NQcScsJ1c0TmNWOG9CQ1NvbScsJ1c0eGRPbWtSV1FIUycsJ0FDb1FtWUJjTDhvOENTb05tZzdkUVNrQ1dPSycsJ3pzUmRIOG9xV1BUY25Ta3dXNzNjS2Y5VVc1M2RSbWtyV1B1JywnbzNWZFJiOHUnLCdXNWRjSkt2RnphJywnZGdoZFVjV3NxZDdjT0NrTScsJ25kVmNMWUdrd0ppa1c3dScsJ2FTb0tXUmxkUXEnLCdXN2xkR0NrcHpTa0cnLCdXUHhjSUpMWUROM2NSbW9XVzRsZFRTa1lXNDVBV1JKZEpNcScsJ2dTb0tXUS9kVVNvWXpHJywndm1rRXhhJywndXZMVVdSSDknLCd6U2tYdnZQbScsJ1c2VmNLTlhFRVNrTGE4b0pGOGtPcDhvQWlTb01XUGZEbG1rb1dQdGNWMnRjT0NvOXpta1EnLCdXUE5jUG1va2NDb2cnLCd4SzNjUkNvZ2JhJywnV1JGZFJtby8nLCdXNGxjVHJ2Y1dRYScsJ2Y4bzR0YlNyJywnQjJ6emoxT05XT0dmQklsZFBTa1YnLCdkcldkc1hlJywneWVmeldPakwnLCduOG9hQjJQbCcsJ2I4a1VFMnJWVzRWZEdhJywnQTNKY0hDa1JmcScsJ3hhdXZrd2UnLCdXNWpFV08wQ2tXJywnV090Y1Bta0lXUlcnLCdzOGtmcVNraFdQVycsJ2ZiQmRMOG8yV1IvY1ZHJywnVzczY0dTb2xxbW9TV1JieHJTb3puOG9PV1BYeldQL2RPMmF5VzZOY1JTa29FS1pjUDhvTVdRaGNJOGsrdENrR1dPTycsJ3ZodU9FU29wJywnaHdQV3doM2NKdnVOcWVSY09KOW91OGtuenFOZE9HJywncnVtRXJTb20nLCdDMHZrV1J6UycsJ0FxQzhwTUMnLCdjM24vcU1aY0xONE8nLCdXNG5uV1J5RmlDb0JXNlJkTG1vdW90OG1EU2s2RkwvZFV3WDZnYScsJ2E4b1lXUXRkUjhvaEF0UmRVbWtyJywnVzZ0Y0d0cnVXT1MnLCdXNDdjU0xieXhxJywnVzdGZFZDa2d1Q2tQJywnVzZoZFNtb3pxOG9IVzZmcmNLL2RTQ29MRVlkZFRzVycsJ0Nta1J5OGtFV09TJywnV09QV1dSRzhXNDdjR0NvbicsJ3pta2lqczFYJywnYnNEWScsJ2Z4M2RWZE82c3RaY0tta1ppSEpkS3IvZE9Da0VXNkpjTGVSZFR3dWcnLCdXNy9kSjhraGJTa00nLCdXNHRjTkNvVURtb00nLCd1MDFxV092aScsJ1c0TzZkSC9jUlcnLCdkOG9TcmdIWScsJ1c0ZXRtYlpjUGEnLCdtR3p4bkdPJywnVzdsZFM4azN6U2toJywnclNrbldRcGRLbW95V081Qlc2cTZlOG9MZUo1TScsJ1c1S3pXUHZyVzVpL2ZYVmRObWtQeHEnLCdzU2tjV1FwZEs4b0JXT1RPVzcwTScsJ1c0Q0psSkpjSHEnLCdtQ2tHdXhWZEdTa09wRycsJ1c0TzRXTzlKVzVtJywndENrZXUzckEnLCdEOG9ZV09PbVdRYScsJ1dQM2RHU29nV084MnAxcjBXNG5tcHVGZExDb1UnLCdXNkx0V1FqcEZMdVBsRycsJ1dRU21XUWZFJywnV1BCY0dkMU1DTFZjVThvVVc0aGRTQ2tJVzZPJywnYm1vNHYxbjAnLCdyM2ErY1NraFc3WGRGaGRkR3JOY1Rta092YnYrJywnazhrTkVObGRIRycsJ25DbzV3Z3oyJywnVzczY1BDb3BBOG9NJywndUcwOWxMNCcsJ1c0SEJXUm1xaFNvWFc2UmROOG9saFo4QkZhJywnV1FKZEptb2xXT08vQU1iSFc0ZkJsM3BkVGEnLCdXT0JjS1NvZGdtb1onLCdxbW9vV1FKZFM4a3AnLCdXNkg1V1JQYXRHJywnVzdCY1FDb2h1U29rJywndGdsY1Rta0ZqYScsJ1c3QmNQU29OeUNvN1dPRDBCQ29IaThvZFdSZlFXUnknLCdXT2o3V09tZlc1L2NJU28wV1E3Y0lTb2VXUVZkU0d5JywnaThreFdRMU9yRycsJ1c0eGNNMXUwVzR5JywnVzRWY05mbTBXN3RkTENvdFdRM2RRck9yZXZtJywnQVNrOEMzZkQnLCdXUWRkUW1vdHgzcScsJ1c3QmRHOGs0cVNrdicsJ1c1aUZXUmJuVzZDJywnV1Fyd1dRMDZXNG0nLCdXNzNjTEpLJywnV1JaZFA4b1ZFZkMnLCdXNU5jUEt1d1c1dScsJ0UyalhXUTlKJywndVdEeVdPQmRHRycsJ2U4bzlCYlNTJywnVzZteFdQdmdXNG0xanJOZEhDa0p4bW9DVzZqbicsJ1c1SEpXUldtZkcnLCdXN2RjTEl2Y1dPTzBXNlZjVDFWY0k4a3FXUWhjTG1rb25JZlFuOGtRQUxDOCcsJ2VXdGRSbW95V1BTJywnVzdhb1dQNTJXNWEnLCd0U2tjdzExZCcsJ1c3ZGNMOGtCVzVqTkZJdnpXNXpPaEtaZFZHJywnVzZCY084b1p6U29mJywnVzVOY0k4b29yQ284JywnczhrdGtHenhXUmxkVjhvS1c1MCcsJ2xabWxEWFRlV1AwdHVxbScsJ3JDa2dXUWhkTW1vbldPaScsJ2htb3RXN1ZjSFNrb1c1OS9XNmluZjhvSGtxJywnREkzZExTbzNXUUgvbjhrZVc1M2NMRycsJ3ZTa0V0YScsJ1c3L2RJbWtpaW1rSScsJ1dPeldXUnVnJywnV1BCY1NYWGd6VycsJ1dROUxXT3FNVzVpJywnV1A1V1dSRzhXNDdjR0NvbicsJ3ZOTmNUOG8wZ1cnLCdXUFAzV1I4ZFc2TycsJ2Z4QmRWSEtxJywnVzRHMlc1eGRMbW83JywnYnJXZ0VYZScsJ1c2cGRUQ2tPdFNrMVc2R0knLCdXTzUwV1FheicsJ1dRZGRRQ29HQU5LJywncjNTV0ZDb3RXN1h3V1JDJywnRU1KY1U4azZhRycsJ1dPdnlXT08zVzZtJywndUtLb0Q4b28nLCd2dE5kSFgzY0xxJywneDhraGhkWHonLCdpSGJHY2IwJywnYzIxRURLaScsJ3d4bGNObW8wJywnVzQzY1ZMdXpXNWUnLCdXNlJjRzNiZEVta3NsOG8yRlNrOCcsJ3JiTzFvM1pjUWEnLCdmWlZkR1NvK1dSMCcsJ2JyVmRNOG9SV09SY1Rta1pXUU9WV1FxJywnbWRqU2NxTycsJ1c1UmRRQ2t2ZlNrMycsJ3lDazF6S0JkUFNra2NXJywnVzdWY1BMaVlXN08nLCdlcnRjUFg0QScsJ1dRZGRQZ1pjSjN1JywnVzZKZFE4b3B5bW96JywnRGd4Y1M4azBkcScsJ3FDa0NqcXphV1JGZFVDbzgnLCdXNFJkU3ZsY05lOCcsJ1dSZGRQbW9Meng1b1dPZU5XT1MnLCdXUUpkSm1vcFdRV1lrTnpDVzRiYW9LZGRVbW9pV1BLJywnVzdOZFRtazRjQ2t0JywnVzVSY0x4cjB6YScsJ0Vtb1lXT3VjV1I3ZFNtbzBXUFpjVFl2dUZZOCcsJ2VDb0lXUmhkUm1vdicsJ1c1OHVXNi9kUThvdCcsJ3JTb0tXT09yV09TJywnaG1vbndYNFInLCdXUjNkUVNvKycsJ2QzRmRTWk84dnEnLCdyWmRkUFdCY1JHJywnQ0dCZE5Db25XUjgnLCd6ZTRScENraCcsJ2xZaGNISThxc3R5YicsJ3RTbzVXTy9kUnEnLCdXUFZkTTBkY1MzbnNxcScsJ2FZTFNtdDAnLCduQ2syQ2czZEdTa1JpRycsJ1c2ZGRSMmRjVXZKY0dZVGJ3OG9hVzYxMXhLWmRWM25BazhvaVc0WmNKSTNkSGdKY1RxJywndTNoY01tb09pOG9BQ3VmQldPaGNHbWtzVzdwY1NLQmRTOG9hbm1rTG9YdGRQVycsJ0RYakNXUTdkVXEnLCd2d2U0cG1rZlc2UycsJ1dPRmNSU29pZG1vdGlKU1ZlWWltc1NvZSddO30oKSkpO30oKSkpO30oKSk7XzB4MjcyMz1mdW5jdGlvbigpe3JldHVybiBfMHhmZjkyZTk7fTtyZXR1cm4gXzB4MjcyMygpO307ZnVuY3Rpb24gbWQ1X2NtbihfMHgyMzczNGIsXzB4M2FhNGI0LF8weDQ3NDlhYixfMHgzNjkxZDMsXzB4NWYxM2RhLF8weDExYjJjMSl7dmFyIF8weDM5MzZmZD1fMHgzZDc4LF8weDI0MDgxYT17J3VXaVl0JzpmdW5jdGlvbihfMHg1NTM3YzksXzB4MmU5MDE5LF8weDNkMWNmMil7cmV0dXJuIF8weDU1MzdjOShfMHgyZTkwMTksXzB4M2QxY2YyKTt9fTtyZXR1cm4gc2FmZV9hZGQoXzB4MjQwODFhW18weDM5MzZmZCgweDM0YywnQGZKRicpXShiaXRfcm9sLF8weDI0MDgxYVtfMHgzOTM2ZmQoMHgyNTcsJ0BvcWwnKV0oc2FmZV9hZGQsXzB4MjQwODFhWyd1V2lZdCddKHNhZmVfYWRkLF8weDNhYTRiNCxfMHgyMzczNGIpLHNhZmVfYWRkKF8weDM2OTFkMyxfMHgxMWIyYzEpKSxfMHg1ZjEzZGEpLF8weDQ3NDlhYik7fWZ1bmN0aW9uIF8weDNkNzgoXzB4NDI1ZjhmLF8weDEyMmFkNSl7dmFyIF8weDI3MjNjND1fMHgyNzIzKCk7cmV0dXJuIF8weDNkNzg9ZnVuY3Rpb24oXzB4M2Q3ODQ3LF8weDc3YTE4ZSl7XzB4M2Q3ODQ3PV8weDNkNzg0Ny0weDFiZTt2YXIgXzB4MmE5NmE2PV8weDI3MjNjNFtfMHgzZDc4NDddO2lmKF8weDNkNzhbJ0lVdUJVdCddPT09dW5kZWZpbmVkKXt2YXIgXzB4MzAyYjUwPWZ1bmN0aW9uKF8weDc0ZjQ4OCl7dmFyIF8weDQ4YTZmOT0nYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODkrLz0nO3ZhciBfMHgxNWVhMzY9JycsXzB4NGZmMmJkPScnO2Zvcih2YXIgXzB4MjcxNWVjPTB4MCxfMHg1NmExYWIsXzB4MmUxZjcwLF8weDM0ODg4Mj0weDA7XzB4MmUxZjcwPV8weDc0ZjQ4OFsnY2hhckF0J10oXzB4MzQ4ODgyKyspO35fMHgyZTFmNzAmJihfMHg1NmExYWI9XzB4MjcxNWVjJTB4ND9fMHg1NmExYWIqMHg0MCtfMHgyZTFmNzA6XzB4MmUxZjcwLF8weDI3MTVlYysrJTB4NCk/XzB4MTVlYTM2Kz1TdHJpbmdbJ2Zyb21DaGFyQ29kZSddKDB4ZmYmXzB4NTZhMWFiPj4oLTB4MipfMHgyNzE1ZWMmMHg2KSk6MHgwKXtfMHgyZTFmNzA9XzB4NDhhNmY5WydpbmRleE9mJ10oXzB4MmUxZjcwKTt9Zm9yKHZhciBfMHgyMjM5ZDU9MHgwLF8weDQ3YTg2OT1fMHgxNWVhMzZbJ2xlbmd0aCddO18weDIyMzlkNTxfMHg0N2E4Njk7XzB4MjIzOWQ1Kyspe18weDRmZjJiZCs9JyUnKygnMDAnK18weDE1ZWEzNlsnY2hhckNvZGVBdCddKF8weDIyMzlkNSlbJ3RvU3RyaW5nJ10oMHgxMCkpWydzbGljZSddKC0weDIpO31yZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KF8weDRmZjJiZCk7fTt2YXIgXzB4MmQyZjIwPWZ1bmN0aW9uKF8weDJmYmVkMSxfMHgyZTU1Mzcpe3ZhciBfMHg0YjI5YjU9W10sXzB4OTZkN2EwPTB4MCxfMHgxMTNkYzEsXzB4NGU5NDcyPScnO18weDJmYmVkMT1fMHgzMDJiNTAoXzB4MmZiZWQxKTt2YXIgXzB4MmIzODhjO2ZvcihfMHgyYjM4OGM9MHgwO18weDJiMzg4YzwweDEwMDtfMHgyYjM4OGMrKyl7XzB4NGIyOWI1W18weDJiMzg4Y109XzB4MmIzODhjO31mb3IoXzB4MmIzODhjPTB4MDtfMHgyYjM4OGM8MHgxMDA7XzB4MmIzODhjKyspe18weDk2ZDdhMD0oXzB4OTZkN2EwK18weDRiMjliNVtfMHgyYjM4OGNdK18weDJlNTUzN1snY2hhckNvZGVBdCddKF8weDJiMzg4YyVfMHgyZTU1MzdbJ2xlbmd0aCddKSklMHgxMDAsXzB4MTEzZGMxPV8weDRiMjliNVtfMHgyYjM4OGNdLF8weDRiMjliNVtfMHgyYjM4OGNdPV8weDRiMjliNVtfMHg5NmQ3YTBdLF8weDRiMjliNVtfMHg5NmQ3YTBdPV8weDExM2RjMTt9XzB4MmIzODhjPTB4MCxfMHg5NmQ3YTA9MHgwO2Zvcih2YXIgXzB4MjNkYWVlPTB4MDtfMHgyM2RhZWU8XzB4MmZiZWQxWydsZW5ndGgnXTtfMHgyM2RhZWUrKyl7XzB4MmIzODhjPShfMHgyYjM4OGMrMHgxKSUweDEwMCxfMHg5NmQ3YTA9KF8weDk2ZDdhMCtfMHg0YjI5YjVbXzB4MmIzODhjXSklMHgxMDAsXzB4MTEzZGMxPV8weDRiMjliNVtfMHgyYjM4OGNdLF8weDRiMjliNVtfMHgyYjM4OGNdPV8weDRiMjliNVtfMHg5NmQ3YTBdLF8weDRiMjliNVtfMHg5NmQ3YTBdPV8weDExM2RjMSxfMHg0ZTk0NzIrPVN0cmluZ1snZnJvbUNoYXJDb2RlJ10oXzB4MmZiZWQxWydjaGFyQ29kZUF0J10oXzB4MjNkYWVlKV5fMHg0YjI5YjVbKF8weDRiMjliNVtfMHgyYjM4OGNdK18weDRiMjliNVtfMHg5NmQ3YTBdKSUweDEwMF0pO31yZXR1cm4gXzB4NGU5NDcyO307XzB4M2Q3OFsnVG92d293J109XzB4MmQyZjIwLF8weDQyNWY4Zj1hcmd1bWVudHMsXzB4M2Q3OFsnSVV1QlV0J109ISFbXTt9dmFyIF8weDMxNmI3OD1fMHgyNzIzYzRbMHgwXSxfMHgzMGNhMjA9XzB4M2Q3ODQ3K18weDMxNmI3OCxfMHgzNGNkZWU9XzB4NDI1ZjhmW18weDMwY2EyMF07cmV0dXJuIV8weDM0Y2RlZT8oXzB4M2Q3OFsnY2FXYmxjJ109PT11bmRlZmluZWQmJihfMHgzZDc4WydjYVdibGMnXT0hIVtdKSxfMHgyYTk2YTY9XzB4M2Q3OFsnVG92d293J10oXzB4MmE5NmE2LF8weDc3YTE4ZSksXzB4NDI1ZjhmW18weDMwY2EyMF09XzB4MmE5NmE2KTpfMHgyYTk2YTY9XzB4MzRjZGVlLF8weDJhOTZhNjt9LF8weDNkNzgoXzB4NDI1ZjhmLF8weDEyMmFkNSk7fWZ1bmN0aW9uIG1kNV9mZihfMHg1ODg5YTcsXzB4MTlmNjExLF8weDU1ZTYxYixfMHgyOTlmYjIsXzB4MTliZTNlLF8weDMxOTg2NixfMHg0MzdiMjMpe3ZhciBfMHgyZDM3NDU9XzB4M2Q3OCxfMHgyZDRiZWE9eydRcGJyYyc6ZnVuY3Rpb24oXzB4MTUzMjBjLF8weDQ0MzJmYixfMHg5MDVkMzksXzB4MTk5YWZlLF8weDQyMTQxNCxfMHgyNmVmZTYsXzB4NTA1MzI1KXtyZXR1cm4gXzB4MTUzMjBjKF8weDQ0MzJmYixfMHg5MDVkMzksXzB4MTk5YWZlLF8weDQyMTQxNCxfMHgyNmVmZTYsXzB4NTA1MzI1KTt9LCdEU1dQRyc6ZnVuY3Rpb24oXzB4NTQxZjdiLF8weDRkY2VkOSl7cmV0dXJuIF8weDU0MWY3YiZfMHg0ZGNlZDk7fX07cmV0dXJuIF8weDJkNGJlYVsnUXBicmMnXShtZDVfY21uLF8weDJkNGJlYVsnRFNXUEcnXShfMHgxOWY2MTEsXzB4NTVlNjFiKXxfMHgyZDRiZWFbXzB4MmQzNzQ1KDB4NDBhLCdvUWFkJyldKH5fMHgxOWY2MTEsXzB4Mjk5ZmIyKSxfMHg1ODg5YTcsXzB4MTlmNjExLF8weDE5YmUzZSxfMHgzMTk4NjYsXzB4NDM3YjIzKTt9ZnVuY3Rpb24gbWQ1X2dnKF8weDM1ZThkMSxfMHg0Njk5YzcsXzB4MzRmZjBmLF8weDViYjBlYixfMHgyYzNiOTEsXzB4NGQxYzQ2LF8weDJhNjk3Yil7dmFyIF8weDVkYjI0Nj1fMHgzZDc4LF8weDVjZDQyNz17J21TaHVMJzpmdW5jdGlvbihfMHgxZjlhNjgsXzB4NjcxMzFmLF8weGIxMzYzMyxfMHg1Y2MxNmIsXzB4NDAwZWQyLF8weDU5YWZmNixfMHgzMDEwYTUpe3JldHVybiBfMHgxZjlhNjgoXzB4NjcxMzFmLF8weGIxMzYzMyxfMHg1Y2MxNmIsXzB4NDAwZWQyLF8weDU5YWZmNixfMHgzMDEwYTUpO30sJ2RuaXVXJzpmdW5jdGlvbihfMHgyNGRjOTAsXzB4NWQwMWIwKXtyZXR1cm4gXzB4MjRkYzkwfF8weDVkMDFiMDt9LCdORFlJVCc6ZnVuY3Rpb24oXzB4MmQwNDI3LF8weDQ0NjAwYil7cmV0dXJuIF8weDJkMDQyNyZfMHg0NDYwMGI7fX07cmV0dXJuIF8weDVjZDQyN1tfMHg1ZGIyNDYoMHgyZDUsJylsKHMnKV0obWQ1X2NtbixfMHg1Y2Q0MjdbXzB4NWRiMjQ2KDB4MWU0LCdGN3BxJyldKF8weDVjZDQyN1tfMHg1ZGIyNDYoMHgyMDcsJ2thZmcnKV0oXzB4NDY5OWM3LF8weDViYjBlYiksXzB4NWNkNDI3W18weDVkYjI0NigweDIzZSwnRjdwcScpXShfMHgzNGZmMGYsfl8weDViYjBlYikpLF8weDM1ZThkMSxfMHg0Njk5YzcsXzB4MmMzYjkxLF8weDRkMWM0NixfMHgyYTY5N2IpO31mdW5jdGlvbiBtZDVfaGgoXzB4NTA1MGU1LF8weDNkN2Y1ZSxfMHgzNjRhY2UsXzB4MmE3MDRiLF8weDE3Y2FkMixfMHg0ZWE2NWIsXzB4MTVkOTk5KXt2YXIgXzB4NGE5NzdiPV8weDNkNzgsXzB4MzczNzE3PXsneXlFVUYnOmZ1bmN0aW9uKF8weDVjMjJmZCxfMHgxMDE5MzksXzB4Mjg1ZTM2LF8weDE2NGUxZCxfMHgxNTZiOWQsXzB4MTVhZTRiLF8weDZhMTFlMyl7cmV0dXJuIF8weDVjMjJmZChfMHgxMDE5MzksXzB4Mjg1ZTM2LF8weDE2NGUxZCxfMHgxNTZiOWQsXzB4MTVhZTRiLF8weDZhMTFlMyk7fSwnV3lnaXcnOmZ1bmN0aW9uKF8weDE5NzZiMixfMHgyMDlkMzEpe3JldHVybiBfMHgxOTc2YjJeXzB4MjA5ZDMxO30sJ1ZUTXRTJzpmdW5jdGlvbihfMHg1YWI1MjIsXzB4MTUxYzYwKXtyZXR1cm4gXzB4NWFiNTIyXl8weDE1MWM2MDt9fTtyZXR1cm4gXzB4MzczNzE3W18weDRhOTc3YigweDI2OCwndnplQScpXShtZDVfY21uLF8weDM3MzcxN1tfMHg0YTk3N2IoMHgyMzEsJ2NEb0AnKV0oXzB4MzczNzE3W18weDRhOTc3YigweDJiMSwnVEhlRycpXShfMHgzZDdmNWUsXzB4MzY0YWNlKSxfMHgyYTcwNGIpLF8weDUwNTBlNSxfMHgzZDdmNWUsXzB4MTdjYWQyLF8weDRlYTY1YixfMHgxNWQ5OTkpO31mdW5jdGlvbiBtZDVfaWkoXzB4NTliYjg3LF8weDNlM2NjMyxfMHgzYTVhMzMsXzB4NDM2M2RjLF8weDIyNzQwMCxfMHgyNTgzNGMsXzB4Mjk4YTk5KXt2YXIgXzB4NWY0ZTY5PV8weDNkNzgsXzB4MjljYmVmPXsnYWFZdnEnOmZ1bmN0aW9uKF8weDNkNTlmMCxfMHg1ZDU0OTUsXzB4NTg4ODgzLF8weDFiNjQwMyxfMHgxZjMyMWEsXzB4MWQ2YjI2LF8weDEwMDBjNyl7cmV0dXJuIF8weDNkNTlmMChfMHg1ZDU0OTUsXzB4NTg4ODgzLF8weDFiNjQwMyxfMHgxZjMyMWEsXzB4MWQ2YjI2LF8weDEwMDBjNyk7fSwnT2lodEInOmZ1bmN0aW9uKF8weDViYzAxMCxfMHgxYzI2NzYpe3JldHVybiBfMHg1YmMwMTB8XzB4MWMyNjc2O319O3JldHVybiBfMHgyOWNiZWZbXzB4NWY0ZTY5KDB4MjZhLCdtNkgoJyldKG1kNV9jbW4sXzB4M2E1YTMzXl8weDI5Y2JlZltfMHg1ZjRlNjkoMHgyYzQsJ29KeVcnKV0oXzB4M2UzY2MzLH5fMHg0MzYzZGMpLF8weDU5YmI4NyxfMHgzZTNjYzMsXzB4MjI3NDAwLF8weDI1ODM0YyxfMHgyOThhOTkpO31mdW5jdGlvbiBzYWZlX2FkZChfMHgzMTE0OGYsXzB4NDdiNDlhKXt2YXIgXzB4M2YwYTczPV8weDNkNzgsXzB4NTdlN2RjPXsnakZQa2wnOmZ1bmN0aW9uKF8weDQzM2RhOCxfMHg1NTJjMzApe3JldHVybiBfMHg0MzNkYTgrXzB4NTUyYzMwO30sJ0FEYVdmJzpmdW5jdGlvbihfMHgxODdiZjUsXzB4NGM3NTNmKXtyZXR1cm4gXzB4MTg3YmY1Jl8weDRjNzUzZjt9LCdoanN5SSc6ZnVuY3Rpb24oXzB4ZjZjMTg1LF8weDhhYzVlZCl7cmV0dXJuIF8weGY2YzE4NXxfMHg4YWM1ZWQ7fSwnUEVEb3EnOmZ1bmN0aW9uKF8weDljMzE5ZSxfMHgzOTA4YzYpe3JldHVybiBfMHg5YzMxOWU8PF8weDM5MDhjNjt9LCdaaXJqRSc6ZnVuY3Rpb24oXzB4NTQzZjNiLF8weDIxYTYyZCl7cmV0dXJuIF8weDU0M2YzYj4+XzB4MjFhNjJkO30sJ0daRmtHJzpmdW5jdGlvbihfMHgzZDdiNTIsXzB4NWE3ODM4KXtyZXR1cm4gXzB4M2Q3YjUyJl8weDVhNzgzODt9fSxfMHg0YWM4OGU9XzB4NTdlN2RjW18weDNmMGE3MygweDJiYiwnMmpATicpXShfMHg1N2U3ZGNbJ0FEYVdmJ10oMHhmZmZmLF8weDMxMTQ4ZiksMHhmZmZmJl8weDQ3YjQ5YSk7cmV0dXJuIF8weDU3ZTdkY1tfMHgzZjBhNzMoMHgxYzQsJ202SCgnKV0oXzB4NTdlN2RjW18weDNmMGE3MygweDNhNywnQCk1TScpXShfMHg1N2U3ZGNbXzB4M2YwYTczKDB4M2Q0LCdHYkIoJyldKF8weDU3ZTdkY1snWmlyakUnXShfMHgzMTE0OGYsMHgxMCkrKF8weDQ3YjQ5YT4+MHgxMCksXzB4NTdlN2RjW18weDNmMGE3MygweDM2MywnQCk1TScpXShfMHg0YWM4OGUsMHgxMCkpLDB4MTApLF8weDU3ZTdkY1tfMHgzZjBhNzMoMHgzNmIsJ3ptenQnKV0oMHhmZmZmLF8weDRhYzg4ZSkpO31mdW5jdGlvbiBiaXRfcm9sKF8weDQwYTVmYixfMHg1MGRlNDcpe3ZhciBfMHhiNzVlNDI9XzB4M2Q3OCxfMHg1MmFjODM9eydZcGR3ZCc6ZnVuY3Rpb24oXzB4MWNjMmRlLF8weDQwMDViNil7cmV0dXJuIF8weDFjYzJkZXxfMHg0MDA1YjY7fSwnUElaUXonOmZ1bmN0aW9uKF8weGIyNzYyMSxfMHgxNzBjN2Upe3JldHVybiBfMHhiMjc2MjE8PF8weDE3MGM3ZTt9LCdoc3Jrcic6ZnVuY3Rpb24oXzB4MjFkMGFjLF8weDEzM2M0ZSl7cmV0dXJuIF8weDIxZDBhYz4+Pl8weDEzM2M0ZTt9fTtyZXR1cm4gXzB4NTJhYzgzW18weGI3NWU0MigweDM2Miwnb1FhZCcpXShfMHg1MmFjODNbXzB4Yjc1ZTQyKDB4MzhmLCdWYkpSJyldKF8weDQwYTVmYixfMHg1MGRlNDcpLF8weDUyYWM4M1tfMHhiNzVlNDIoMHgzZWIsJ0BvcWwnKV0oXzB4NDBhNWZiLDB4MjAtXzB4NTBkZTQ3KSk7fXZhciBzaG93UG9wVXBBZHY9ZnVuY3Rpb24oXzB4M2Y0NGM3KXt2YXIgXzB4MjVlZjU2PV8weDNkNzgsXzB4MzY2N2ViPXsnSFpYdXInOmZ1bmN0aW9uKF8weDNlNTQ5MCxfMHg0MGIzMGMpe3JldHVybiBfMHgzZTU0OTAoXzB4NDBiMzBjKTt9LCd6d29qdic6ZnVuY3Rpb24oXzB4NDQzNDY2LF8weDIwYTFkMil7cmV0dXJuIF8weDQ0MzQ2Nj09PV8weDIwYTFkMjt9LCdQSmlYcyc6J1JsR1h2JywnZXRxZFknOmZ1bmN0aW9uKF8weDQ4YmNlOCxfMHgyZGExMDMpe3JldHVybiBfMHg0OGJjZTgrXzB4MmRhMTAzO30sJ0JwSFNoJzpmdW5jdGlvbihfMHg0YTJmYmMsXzB4MzQ5NzQ1KXtyZXR1cm4gXzB4NGEyZmJjK18weDM0OTc0NTt9LCdVSENPdyc6XzB4MjVlZjU2KDB4M2ZmLCdJSiYjJyksJ3ZjTlNWJzpfMHgyNWVmNTYoMHgzOWIsJylsKHMnKSwnWFZtdEcnOmZ1bmN0aW9uKF8weDI4NjE2YyxfMHgzZmNjZTApe3JldHVybiBfMHgyODYxNmM8PV8weDNmY2NlMDt9LCdBbFR6ayc6ZnVuY3Rpb24oXzB4MjczMDcwLF8weDNlZWExZil7cmV0dXJuIF8weDI3MzA3MCE9PV8weDNlZWExZjt9LCduWVlUcic6XzB4MjVlZjU2KDB4MjQwLCd1TDdpJyksJ3ZRU2FhJzpmdW5jdGlvbihfMHgxNGFlZjksXzB4YWYyYzhjKXtyZXR1cm4gXzB4MTRhZWY5KF8weGFmMmM4Yyk7fSwnQ2F4UUsnOl8weDI1ZWY1NigweDIzOCwnd3V1eicpLCdESWVuTic6XzB4MjVlZjU2KDB4MmNiLCdedHJCJyksJ0x6Y0dEJzpfMHgyNWVmNTYoMHgzNGEsJ0ApNU0nKSwnU3pWbXQnOmZ1bmN0aW9uKF8weDE5MTJmZCxfMHgzNDY3NWMpe3JldHVybiBfMHgxOTEyZmQvXzB4MzQ2NzVjO30sJ3dic3ZQJzpfMHgyNWVmNTYoMHgxZjMsJ2NsVlUnKSwnWEFlck4nOl8weDI1ZWY1NigweDFkOCwnUTNWXicpLCdxSHNDVSc6XzB4MjVlZjU2KDB4MzVhLCdUOExCJyksJ2tDUkl2JzoncmdiKDBceDIwMFx4MjAwXHgyMC9ceDIwOTclKScsJ1NIZGd6JzonMjVweCcsJ1NkeU1ZJzpfMHgyNWVmNTYoMHgxZmEsJ2lTNVEnKSwnZUF2d20nOidjZW50ZXInLCd2U3pPRSc6XzB4MjVlZjU2KDB4MjFjLCcmaFBmJyksJ3BDRHBHJzpmdW5jdGlvbihfMHhlZGJmMDApe3JldHVybiBfMHhlZGJmMDAoKTt9fSxfMHg0NjBmMDA9ZG9jdW1lbnRbJ2NyZWF0ZUVsZW1lbnQnXShfMHgzNjY3ZWJbXzB4MjVlZjU2KDB4MmZmLCdAKTVNJyldKTtfMHg0NjBmMDBbJ3NldEF0dHJpYnV0ZSddKCdpZCcsXzB4MjVlZjU2KDB4Mjc0LCczUyFIJykpLF8weDQ2MGYwMFtfMHgyNWVmNTYoMHgyNTksJ2lTIzAnKV1bJ3dpZHRoJ109XzB4MzY2N2ViW18weDI1ZWY1NigweDFjMywnaVMjMCcpXSxfMHg0NjBmMDBbJ3N0eWxlJ11bXzB4MjVlZjU2KDB4MWNlLCdWYUlwJyldPV8weDM2NjdlYlsnWEFlck4nXSxfMHg0NjBmMDBbXzB4MjVlZjU2KDB4MWNiLCdzRV0mJyldW18weDI1ZWY1NigweDJjYSwnXnRyQicpXT1fMHgzNjY3ZWJbXzB4MjVlZjU2KDB4M2UwLCckQWJDJyldLF8weDQ2MGYwMFtfMHgyNWVmNTYoMHgzYTEsJ29RYWQnKV1bXzB4MjVlZjU2KDB4MmI3LCdGWVZVJyldPV8weDM2NjdlYltfMHgyNWVmNTYoMHgyZTYsJyRBYkMnKV0sXzB4NDYwZjAwW18weDI1ZWY1NigweDI4OCwnWl13bScpXVtfMHgyNWVmNTYoMHgxZDIsJ1U1ekwnKV09XzB4MzY2N2ViW18weDI1ZWY1NigweDNjYywncTd4aScpXSxfMHg0NjBmMDBbXzB4MjVlZjU2KDB4M2U2LCczUyFIJyldW18weDI1ZWY1NigweDJhOCwnVmFJcCcpXT1fMHgzNjY3ZWJbJ0x6Y0dEJ10sXzB4NDYwZjAwWydzdHlsZSddWydmb250U2l6ZSddPV8weDM2NjdlYltfMHgyNWVmNTYoMHgzMTcsJyRBYkMnKV0sXzB4NDYwZjAwW18weDI1ZWY1NigweDNiNiwnY2xWVScpXVtfMHgyNWVmNTYoMHgyNzUsJ2lTIzAnKV09XzB4MzY2N2ViW18weDI1ZWY1NigweDQwMiwndUw3aScpXSxfMHg0NjBmMDBbJ3N0eWxlJ11bJ2Rpc3BsYXknXT1fMHgyNWVmNTYoMHgzMGUsJ3ptenQnKSxfMHg0NjBmMDBbJ3N0eWxlJ11bXzB4MjVlZjU2KDB4MzY5LCdLN0JNJyldPV8weDM2NjdlYltfMHgyNWVmNTYoMHgyNjYsJ09TNiUnKV0sXzB4NDYwZjAwW18weDI1ZWY1NigweDIxZSwncTd4aScpXVsnYWxpZ25JdGVtcyddPV8weDM2NjdlYltfMHgyNWVmNTYoMHgxYzksJ3d1dXonKV0sXzB4NDYwZjAwW18weDI1ZWY1NigweDJjZiwnSUomIycpXVtfMHgyNWVmNTYoMHgzYzksJ1EzVl4nKV09XzB4MjVlZjU2KDB4MjJhLCdrYWZnJyksXzB4NDYwZjAwW18weDI1ZWY1NigweDNlNiwnM1MhSCcpXVtfMHgyNWVmNTYoMHgzNjQsJ0diQignKV09XzB4MzY2N2ViWyd2U3pPRSddLGRvY3VtZW50W18weDI1ZWY1NigweDM3ZSwnJmhQZicpXVtfMHgyNWVmNTYoMHgyNGEsJ0ZSTG4nKV0oXzB4NDYwZjAwKTt2YXIgXzB4MjM1Y2EwPWZ1bmN0aW9uKCl7dmFyIF8weDQwMDliZD1fMHgyNWVmNTYsXzB4M2MyYWY2PWRvY3VtZW50W18weDQwMDliZCgweDJkZSwnJEFiQycpXShfMHg0MDA5YmQoMHgyOTksJ0Y3cHEnKSk7XzB4M2MyYWY2W18weDQwMDliZCgweDJjYywnb1FhZCcpXSgnaWQnLF8weDQwMDliZCgweDIzYSwnd3V1eicpKSxfMHgzYzJhZjZbJ3N0eWxlJ11bJ3Bvc2l0aW9uJ109XzB4MzY2N2ViW18weDQwMDliZCgweDNhMCwnd0hhWScpXSxfMHgzYzJhZjZbXzB4NDAwOWJkKDB4MmE1LCdWYkpSJyldW18weDQwMDliZCgweDIzNywnbTZIKCcpXT1fMHgzNjY3ZWJbXzB4NDAwOWJkKDB4MjIyLCdVNXpMJyldLF8weDNjMmFmNltfMHg0MDA5YmQoMHgyNzIsJ0diQignKV1bXzB4NDAwOWJkKDB4Mzg1LCdUSGVHJyldPV8weDM2NjdlYltfMHg0MDA5YmQoMHgyYjksJzc3I2MnKV0sXzB4M2MyYWY2W18weDQwMDliZCgweDNiNiwnY2xWVScpXVtfMHg0MDA5YmQoMHgyYzgsJ202SCgnKV09XzB4MzY2N2ViW18weDQwMDliZCgweDJiNiwndFNFJicpXSxfMHgzYzJhZjZbXzB4NDAwOWJkKDB4MjA1LCcmaFBmJyldW18weDQwMDliZCgweDI3ZSwnS2NlXicpXT1fMHg0MDA5YmQoMHgyYTQsJ1pdd20nKSxfMHg0NjBmMDBbJ2FwcGVuZENoaWxkJ10oXzB4M2MyYWY2KTt2YXIgXzB4MWMxYWNjPU1hdGhbXzB4NDAwOWJkKDB4MzVjLCdDZF53JyldKF8weDM2NjdlYltfMHg0MDA5YmQoMHgyMjksJ3NFXSYnKV0oXzB4M2Y0NGM3LDB4M2U4KSk7XzB4M2MyYWY2W18weDQwMDliZCgweDI0MSwnY0RvQCcpXT1fMHgzNjY3ZWJbXzB4NDAwOWJkKDB4MzFhLCdxN3hpJyldKF8weDM2NjdlYltfMHg0MDA5YmQoMHgyYmMsJ29KeVcnKV0oXzB4MzY2N2ViWydVSENPdyddLF8weDFjMWFjYyksXzB4NDAwOWJkKDB4M2Q3LCdHYkIoJykpO3ZhciBfMHgzYzE4YmQ9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXt2YXIgXzB4ZDk0OTU0PV8weDQwMDliZCxfMHg1N2VlMGY9eydQQ2F6USc6ZnVuY3Rpb24oXzB4NDk4NzMyLF8weDM0YTZkOSl7dmFyIF8weDIwMmM1Yj1fMHgzZDc4O3JldHVybiBfMHgzNjY3ZWJbXzB4MjAyYzViKDB4MzE5LCd3SGFZJyldKF8weDQ5ODczMixfMHgzNGE2ZDkpO30sJ1d2SGNiJzpmdW5jdGlvbihfMHg5ZDMzZGQsXzB4NTNhYWNiKXt2YXIgXzB4MjhlYjU0PV8weDNkNzg7cmV0dXJuIF8weDM2NjdlYltfMHgyOGViNTQoMHgyYjQsJ1ZiSlInKV0oXzB4OWQzM2RkLF8weDUzYWFjYik7fX07aWYoXzB4MzY2N2ViW18weGQ5NDk1NCgweDNlYywnd3V1eicpXShfMHgzNjY3ZWJbXzB4ZDk0OTU0KDB4MjlkLCdjbFZVJyldLF8weDM2NjdlYlsnUEppWHMnXSkpe18weDFjMWFjYy0tLF8weDNjMmFmNlsnaW5uZXJIVE1MJ109XzB4MzY2N2ViW18weGQ5NDk1NCgweDM3YiwnR2JCKCcpXShfMHgzNjY3ZWJbXzB4ZDk0OTU0KDB4MmZjLCdAKTVNJyldKF8weDM2NjdlYlsnVUhDT3cnXSxfMHgxYzFhY2MpLF8weDM2NjdlYlsndmNOU1YnXSk7aWYoXzB4MzY2N2ViW18weGQ5NDk1NCgweDNlMSwnVmFJcCcpXShfMHgxYzFhY2MsMHgwKSl7aWYoXzB4MzY2N2ViWydBbFR6ayddKF8weDM2NjdlYltfMHhkOTQ5NTQoMHgzOGUsJ3VMN2knKV0sXzB4ZDk0OTU0KDB4MWRjLCdpUyMwJykpKV8weDM2NjdlYltfMHhkOTQ5NTQoMHgyOTAsJ2NEb0AnKV0oY2xlYXJJbnRlcnZhbCxfMHgzYzE4YmQpLF8weDNjMmFmNltfMHhkOTQ5NTQoMHgzZTIsJ1ZiSlInKV1bJ3JlbW92ZUNoaWxkJ10oXzB4M2MyYWY2KTtlbHNle3ZhciBfMHgyZGE1ODg9eyd1WUhxQyc6ZnVuY3Rpb24oXzB4MjU1NjNhLF8weDVmMDUwZCl7dmFyIF8weDRiMGI2Mj1fMHhkOTQ5NTQ7cmV0dXJuIF8weDU3ZWUwZltfMHg0YjBiNjIoMHgzYWEsJ3VMN2knKV0oXzB4MjU1NjNhLF8weDVmMDUwZCk7fX07cmV0dXJuIG5ldyBfMHg1NGY3MTQoKF8weDI3MDA2YyxfMHgzY2Q3NzIpPT57XzB4MmRhNTg4Wyd1WUhxQyddKF8weDI3MDA2YyxbXSk7fSk7fX19ZWxzZSBfMHg1N2VlMGZbXzB4ZDk0OTU0KDB4Mzc3LCdvSnlXJyldKF8weDJjMzMzNCxfMHg0NjI3NDcpLF8weDU3ZWUwZltfMHhkOTQ5NTQoMHgzOGIsJ0lKJiMnKV0oXzB4MTIwNjA0LF8weDVkZTJmYSk7fSwweDNlOCk7fTtfMHgzNjY3ZWJbXzB4MjVlZjU2KDB4M2Y1LCd2emVBJyldKF8weDIzNWNhMCk7fSxoaWRlUG9wVXBBZHY9ZnVuY3Rpb24oKXt2YXIgXzB4NDliNDg5PV8weDNkNzgsXzB4M2ZiMzA2PXsnU1hiblYnOl8weDQ5YjQ4OSgweDI4YSwna2FmZycpfSxfMHg1MmIzYzY9ZG9jdW1lbnRbJ2dldEVsZW1lbnRCeUlkJ10oXzB4M2ZiMzA2W18weDQ5YjQ4OSgweDMwYywnRllWVScpXSk7XzB4NTJiM2M2W18weDQ5YjQ4OSgweDJhNiwnaVM1UScpXSgpO30sbW9iaWxlQ2hlY2s9ZnVuY3Rpb24oKXt2YXIgXzB4MmU1YTE0PV8weDNkNzgsXzB4MTMyMTYyPXsnclNkRVQnOl8weDJlNWExNCgweDIwZCwnb1FhZCcpLCdSTWRFdCc6ZnVuY3Rpb24oXzB4NTM1NjY5LF8weGZjYjhiNCl7cmV0dXJuIF8weDUzNTY2OSZfMHhmY2I4YjQ7fSwndEhGQUQnOmZ1bmN0aW9uKF8weDQ0ZjFmNCxfMHgxM2E1MTcpe3JldHVybiBfMHg0NGYxZjQmXzB4MTNhNTE3O30sJ1JTZ3Z4JzpfMHgyZTVhMTQoMHgzZTcsJ0ApNU0nKX07bGV0IF8weDMzNjQxOD0hW107cmV0dXJuIGZ1bmN0aW9uKF8weDIxODZhNil7dmFyIF8weDIyMmU1Zj1fMHgyZTVhMTQ7aWYoXzB4MTMyMTYyWydSU2d2eCddIT09J2pwYVp1Jyl7aWYoLyhhbmRyb2lkfGJiXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2lbXzB4MjIyZTVmKDB4MjhmLCczUyFIJyldKF8weDIxODZhNil8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcLShufHUpfGM1NVwvfGNhcGl8Y2N3YXxjZG1cLXxjZWxsfGNodG18Y2xkY3xjbWRcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1wtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlwtNXxnXC1tb3xnbyhcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcLShtfHB8dCl8aGVpXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1wtY3xodChjKFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFwtfFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFwvKXxrbG9ufGtwdCB8a3djXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFwvKGt8bHx1KXw1MHw1NHxcLVthLXddKXxsaWJ3fGx5bnh8bTFcLXd8bTNnYXxtNTBcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFwtZ3xxYVwtYXxxYygwN3wxMnwyMXwzMnw2MHxcLVsyLTddfGlcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFwtfG9vfHBcLSl8c2RrXC98c2UoYyhcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcLXxzaGFyfHNpZShcLXxtKXxza1wtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXC18dlwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXC18dGRnXC18dGVsKGl8bSl8dGltXC18dFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cLXxtM3xtNSl8dHhcLTl8dXAoXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXC18eW91cnx6ZXRvfHp0ZVwtL2lbXzB4MjIyZTVmKDB4MjFiLCdYaCMkJyldKF8weDIxODZhNltfMHgyMjJlNWYoMHgzNGQsJ3Z6ZUEnKV0oMHgwLDB4NCkpKV8weDMzNjQxOD0hIVtdO31lbHNle2Zvcih2YXIgXzB4NDE0YzFkLF8weDIyZGE2ND1fMHgxMzIxNjJbXzB4MjIyZTVmKDB4MmUxLCdjRG9AJyldLF8weDM3MjFlMD0nJyxfMHgyZWM3NzY9MHgwO18weDJlYzc3NjxfMHgxMTNkYzFbXzB4MjIyZTVmKDB4MWYwLCdGN3BxJyldO18weDJlYzc3NisrKV8weDQxNGMxZD1fMHg0ZTk0NzJbXzB4MjIyZTVmKDB4MWQwLCdAb3FsJyldKF8weDJlYzc3NiksXzB4MzcyMWUwKz1fMHgyMmRhNjRbXzB4MjIyZTVmKDB4MjgwLCdGWVZVJyldKF8weDEzMjE2MltfMHgyMjJlNWYoMHgxZDQsJ2Znc3onKV0oXzB4NDE0YzFkPj4+MHg0LDB4ZikpK18weDIyZGE2NFtfMHgyMjJlNWYoMHgzN2YsJyRBYkMnKV0oXzB4MTMyMTYyW18weDIyMmU1ZigweDFmOSwnY0RvQCcpXSgweGYsXzB4NDE0YzFkKSk7cmV0dXJuIF8weDM3MjFlMDt9fShuYXZpZ2F0b3JbXzB4MmU1YTE0KDB4MjhkLCdGUkxuJyldfHxuYXZpZ2F0b3JbJ3ZlbmRvciddfHx3aW5kb3dbXzB4MmU1YTE0KDB4MjNjLCd1TDdpJyldKSxfMHgzMzY0MTg7fSx0YWJsZXRDaGVjaz1mdW5jdGlvbigpe3ZhciBfMHgyNmY2Njc9XzB4M2Q3ODtsZXQgXzB4MWJlMGYwPSFbXTtyZXR1cm4gZnVuY3Rpb24oXzB4NDQ0NzFhKXt2YXIgXzB4MWFiOTY0PV8weDNkNzg7aWYoLyhpcGFkfHRhYmxldHwoYW5kcm9pZCg/IS4qbW9iaWxlKSl8KHdpbmRvd3MoPyEuKnBob25lKSguKnRvdWNoKSl8a2luZGxlfHBsYXlib29rfHNpbGt8KHB1ZmZpbig/IS4qKElQfEFQfFdQKSkpKS9bXzB4MWFiOTY0KDB4MjU0LCdJSiYjJyldKF8weDQ0NDcxYVtfMHgxYWI5NjQoMHgyMDYsJ3NFXSYnKV0oMHgwLDB4NCkpKV8weDFiZTBmMD0hIVtdO30obmF2aWdhdG9yW18weDI2ZjY2NygweDJhZiwnM1MhSCcpXXx8bmF2aWdhdG9yW18weDI2ZjY2NygweDMyOCwnRlJMbicpXXx8d2luZG93W18weDI2ZjY2NygweDMzMywnQG9xbCcpXSksXzB4MWJlMGYwO30sZGVza3RvcENoZWNrPWZ1bmN0aW9uKCl7dmFyIF8weDJiNmVlMj17J3NYc21mJzpmdW5jdGlvbihfMHhkMzM4YTgpe3JldHVybiBfMHhkMzM4YTgoKTt9fTtyZXR1cm4hdGFibGV0Q2hlY2soKSYmIV8weDJiNmVlMlsnc1hzbWYnXShtb2JpbGVDaGVjayk7fSxkZXZpY2VUeXBlQ2hlY2s9ZnVuY3Rpb24oKXt2YXIgXzB4MWU2NDI2PV8weDNkNzgsXzB4NGYyMjYyPXsnSXBmV2QnOmZ1bmN0aW9uKF8weDU4Mjg4OCl7cmV0dXJuIF8weDU4Mjg4OCgpO30sJ3VLYkpoJzpfMHgxZTY0MjYoMHgyMmMsJ1U1ekwnKX07cmV0dXJuIF8weDRmMjI2MlsnSXBmV2QnXShkZXNrdG9wQ2hlY2spP18weDFlNjQyNigweDM5YywnY2xWVScpOl8weDRmMjI2MlsndUtiSmgnXTt9O2xldCBrMTt0cnl7azE9d2luZG93W18weDMyYmIyNygweDI4NiwnWGgjJCcpXTt9Y2F0Y2goXzB4NDNkOTVlKXt9Y29uc3QgUnI9azF8fChmdW5jdGlvbigpe3ZhciBfMHg0MDkxODk9XzB4MzJiYjI3LF8weDQzZTQ2ND17J3h0a2VRJzpfMHg0MDkxODkoMHgxZGEsJ3ZCaGEnKSwnU0phangnOmZ1bmN0aW9uKF8weDZhYTM5MixfMHhmYzMxYWUpe3JldHVybiBfMHg2YWEzOTIoXzB4ZmMzMWFlKTt9LCdLU1Jmayc6ZnVuY3Rpb24oXzB4MjY4MTZjLF8weDU0MjVlMCl7cmV0dXJuIF8weDI2ODE2YyhfMHg1NDI1ZTApO30sJ2lhbmJoJzpmdW5jdGlvbihfMHg5YTRjZGQsXzB4OWZkYzU1KXtyZXR1cm4gXzB4OWE0Y2RkPT09XzB4OWZkYzU1O30sJ3pGSGZZJzpmdW5jdGlvbihfMHg2NmYyNGQsXzB4MmZlZGZkKXtyZXR1cm4gXzB4NjZmMjRkPl8weDJmZWRmZDt9LCdJQ2FPeSc6ZnVuY3Rpb24oXzB4NThhYTA2LF8weDQzYmIzMCl7cmV0dXJuIF8weDU4YWEwNj09PV8weDQzYmIzMDt9LCd6cGx5Ryc6ZnVuY3Rpb24oXzB4MTkyNmMxLF8weDFmYzNhYyl7cmV0dXJuIF8weDE5MjZjMT49XzB4MWZjM2FjO30sJ1ZDTXhxJzpmdW5jdGlvbihfMHgzZDM1MjcsXzB4M2M3MGRlLF8weDQ1NTEzNyxfMHgyMmJlNzEpe3JldHVybiBfMHgzZDM1MjcoXzB4M2M3MGRlLF8weDQ1NTEzNyxfMHgyMmJlNzEpO30sJ29lZWRVJzpmdW5jdGlvbihfMHgzZTYyYmEsXzB4MTY3YTY1KXtyZXR1cm4gXzB4M2U2MmJhLV8weDE2N2E2NTt9fTtsZXQgXzB4MjYwNTFiPXt9O3JldHVybnsnY2xlYXInKCl7XzB4MjYwNTFiPXt9O30sJ2dldEl0ZW0nOl8weDUwMGQ4MT0+XzB4MjYwNTFiW18weDUwMGQ4MV0sJ2tleSc6XzB4MmE4OGQ2PT5PYmplY3RbXzB4NDA5MTg5KDB4MmZhLCdAKTVNJyldKF8weDI2MDUxYilbXzB4MmE4OGQ2XSwncmVtb3ZlSXRlbScoXzB4NWJhOWIwKXtkZWxldGUgXzB4MjYwNTFiW18weDViYTliMF07fSwnc2V0SXRlbScoXzB4M2IxMjdlLF8weDFiMjNjOSl7dmFyIF8weDRkMmEzND1fMHg0MDkxODk7aWYoXzB4NDNlNDY0W18weDRkMmEzNCgweDIwMywnb2hyRScpXShfMHg0ZDJhMzQoMHgzNzEsJ150ckInKSxfMHg0ZDJhMzQoMHgzMjYsJ0s3Qk0nKSkpe2lmKF8weDRkMmEzNCgweDMyMiwnbTZIKCcpPT09XzB4NGJiNDk4JiZfMHg0M2U0NjRbXzB4NGQyYTM0KDB4M2JhLCdLY2VeJyldPT09XzB4MjBmMDdiKXtmb3IobGV0IF8weDFmMTgyNyBpbiBfMHhkYzVmZTMpXzB4MWEzOTI2W18weDRkMmEzNCgweDFjNywnVmFJcCcpXShfMHgxZjE4MjcsXzB4NDNlNDY0W18weDRkMmEzNCgweDI1OCwnS2NlXicpXShfMHgzNTBkNzksXzB4NWY0NjlmW18weDFmMTgyN10pKTtfMHg0M2U0NjRbJ0tTUmZrJ10oXzB4MjAzODIzLF8weDUyNzc0Yyk7fX1lbHNlIF8weDI2MDUxYltfMHgzYjEyN2VdPV8weDQzZTQ2NFtfMHg0ZDJhMzQoMHgzMzYsJzd6UTMnKV0oU3RyaW5nLF8weDFiMjNjOSk7fSxnZXQgJ2xlbmd0aCcoKXt2YXIgXzB4MzYwMjBlPV8weDQwOTE4OTtpZihfMHgzNjAyMGUoMHgyMjQsJ3VMN2knKSE9PSdLR3ZSbScpcmV0dXJuIE9iamVjdFtfMHgzNjAyMGUoMHgxZjQsJ3RTRSYnKV0oXzB4MjYwNTFiKVtfMHgzNjAyMGUoMHgyOTIsJzNTIUgnKV07ZWxzZXt2YXIgXzB4NTEzMWIwLF8weDNkOWRkYjtyZXR1cm4gXzB4NDNlNDY0W18weDM2MDIwZSgweDFjYywndkJoYScpXShfMHhlMTI5NzMsMHgwKT8oXzB4NTEzMWIwPV8weDdjYTc0W18weDM2MDIwZSgweDFmNSwnXnRyQicpXShfMHg0NDUwZWIsXzB4MmE3NGY3KSxfMHgzZDlkZGI9XzB4NTEzMWIwW18weDM2MDIwZSgweDJmNSwnR2JCKCcpXSxfMHgxNmU4MDcoXzB4NTEzMWIwLF8weDNkOWRkYixfMHgzNzRlMzQpKTpfMHg0M2U0NjRbXzB4MzYwMjBlKDB4MmUzLCdAKTVNJyldKG51bGwsXzB4MTU3MGJlKXx8XzB4NDNlNDY0W18weDM2MDIwZSgweDM4MywnNzcjYycpXSgweDAsXzB4NDk2MjE3KT8oXzB4NTEzMWIwPV8weDFjNDYxNFsnc3Vic3RyaW5nJ10oMHgwLF8weDU3ODAwNFtfMHgzNjAyMGUoMHgyOTIsJzNTIUgnKV0pLF8weDNkOWRkYj1fMHg1MTMxYjBbJ2xlbmd0aCddLF8weDQzZTQ2NFtfMHgzNjAyMGUoMHgzODQsJ1EzVl4nKV0oXzB4M2YwNjUyLF8weDUxMzFiMCxfMHgzZDlkZGIsXzB4OWQxYTMpKTooXzB4NTEzMWIwPV8weDFlOWE4OVtfMHgzNjAyMGUoMHgzZWQsJ0BmSkYnKV0oXzB4NDNlNDY0W18weDM2MDIwZSgweDM1ZSwnVEhlRycpXShfMHgxMjNhOWVbJ2xlbmd0aCddLF8weDVmMzc5ZSksXzB4NTZjZTA1W18weDM2MDIwZSgweDNiOCwnQG9xbCcpXSksXzB4M2Q5ZGRiPV8weDUxMzFiMFsnbGVuZ3RoJ10sXzB4NDdjNGE3KF8weDUxMzFiMCxfMHgzZDlkZGIsXzB4MmZjMDQ0KSk7fX19O30oKSksQ2MxPS9pUGFkfGlQaG9uZXxpUG9kL1tfMHgzMmJiMjcoMHgzNDUsJzhPMWYnKV0obmF2aWdhdG9yW18weDMyYmIyNygweDI1YywnVDhMQicpXSksajE9L14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2lbJ3Rlc3QnXShuYXZpZ2F0b3JbJ3VzZXJBZ2VudCddKSxMbD1DYzF8fGoxLERkMT0vXC5pZ3J1XC5uZXQkL1tfMHgzMmJiMjcoMHgxYmUsJ29ockUnKV0od2luZG93W18weDMyYmIyNygweDM4NiwnJEFiQycpXVtfMHgzMmJiMjcoMHgzMmMsJ1U1ekwnKV0pLFV1MT0hRGQxJiZMbDtjbGFzcyBCQntzdGF0aWNbXzB4MzJiYjI3KDB4MjBmLCckQWJDJyldKCl7dmFyIF8weDEzZjcxMz1fMHgzMmJiMjcsXzB4NTg3ZmZiPXsnUGdKdXInOmZ1bmN0aW9uKF8weDMwNzJkYyxfMHg3MTNmYyxfMHgxZWRlNDgpe3JldHVybiBfMHgzMDcyZGMoXzB4NzEzZmMsXzB4MWVkZTQ4KTt9LCdRTlNORyc6ZnVuY3Rpb24oXzB4M2IwMWE1LF8weDVkZGNiMyl7cmV0dXJuIF8weDNiMDFhNShfMHg1ZGRjYjMpO30sJ2tldXlrJzpfMHgxM2Y3MTMoMHgyNzMsJylsKHMnKSwnSk5KWEgnOl8weDEzZjcxMygweDI1MiwnZmdzeicpLCdRUFdYcic6J2xvY2FsU3RvcmFnZVx4MjBpc1x4MjBicm9rZW5ceDIwb25ceDIwaU9TL01hY09TXHgyMC1ceDIwaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2ZvcnVtcy90aHJlYWQvMTA5OTA5XHgwYVBsZWFzZVx4MjB1c2VceDIwWWFHYW1lcy5pbml0KCkudGhlbih5c2RrXHgyMD0+XHgyMHlzZGsuZ2V0U3RvcmFnZSgpKS50aGVuKHN0b3JhZ2VceDIwPT5ceDIwc3RvcmFnZS5zZXRJdGVtKFx4MjdrZXlceDI3LFx4MjBceDI3dmFsdWVceDI3KSknLCdxRWtmRCc6XzB4MTNmNzEzKDB4Mjg2LCdYaCMkJyksJ0tneG9DJzpmdW5jdGlvbihfMHg0MjNmZTYsXzB4M2RiMjQ5KXtyZXR1cm4gXzB4NDIzZmU2JiZfMHgzZGIyNDk7fX07VXUxJiZPYmplY3RbXzB4MTNmNzEzKDB4M2M4LCdYaCMkJyldKHdpbmRvdyxfMHg1ODdmZmJbXzB4MTNmNzEzKDB4MmQ3LCdedHJCJyldLHsnZ2V0JzpmdW5jdGlvbigpe3ZhciBfMHgzMzU3ODY9XzB4MTNmNzEzO2lmKF8weDU4N2ZmYltfMHgzMzU3ODYoMHgzZDgsJ2lTIzAnKV09PT1fMHg1ODdmZmJbXzB4MzM1Nzg2KDB4MmFiLCcyakBOJyldKV8weDFhNTdlNSYmKF8weGE2YmQ0MltfMHgzMzU3ODYoMHgzNmEsJ29ockUnKV1bXzB4MzM1Nzg2KDB4MzczLCd6bXp0JyldJiZfMHg5OGE1YzcoKCk9Pnt2YXIgXzB4MjExM2ZjPV8weDMzNTc4NjtfMHhhZjJiYmRbJ2NhbGxiYWNrcyddW18weDIxMTNmYygweDFkYiwnT1M2JScpXSgpO30sXzB4NGQ2ZDU5W18weDMzNTc4NigweDJkYiwnQCk1TScpXXx8MHg2NCksXzB4NTBlODM4WydjYWxsYmFja3MnXVtfMHgzMzU3ODYoMHgzYzIsJ2NsVlUnKV0mJl8weDU4N2ZmYlsnUGdKdXInXShfMHgxMzcyYmMsKCk9Pnt2YXIgXzB4MmM4ZTRhPV8weDMzNTc4NjtfMHgzZDQ1MThbXzB4MmM4ZTRhKDB4MmYzLCd0U0UmJyldW18weDJjOGU0YSgweDNkYSwnSmNzRScpXSghMHgwKTt9LF8weDIyZjU4N1snb25DbG9zZVRpbWVvdXRGdWxsQWR2J118fDB4YzgpKSxfMHg1ODdmZmJbJ1FOU05HJ10oXzB4MWM1NTI2LCdvaycpO2Vsc2UgcmV0dXJuIGNvbnNvbGVbXzB4MzM1Nzg2KDB4MzQ3LCd2emVBJyldKF8weDU4N2ZmYlsnUVBXWHInXSksUnI7fX0pLF8weDU4N2ZmYltfMHgxM2Y3MTMoMHgzNzYsJ2hQcCYnKV0oTGwsRCkmJkJCW18weDEzZjcxMygweDM1YiwndUw3aScpXSgpJiZCQlsnYmFja3VwJ10oKTt9c3RhdGljW18weDMyYmIyNygweDI0OSwnaFBwJicpXSgpe3ZhciBfMHhhNmUwNjU9XzB4MzJiYjI3LF8weDg2NjUxZD17J3JNYVhrJzpmdW5jdGlvbihfMHg1Mzk2M2YsXzB4MTJiMjQxKXtyZXR1cm4gXzB4NTM5NjNmIT09XzB4MTJiMjQxO30sJ0p4ZVR2JzpfMHhhNmUwNjUoMHgyMGEsJzNTIUgnKSwnTXRLV2EnOmZ1bmN0aW9uKF8weDM3YTE2MSxfMHgyNjQyMGIpe3JldHVybiBfMHgzN2ExNjE9PT1fMHgyNjQyMGI7fSwnR1VJY1cnOl8weGE2ZTA2NSgweDJkNCwnUTNWXicpLCd2aGlDSSc6ZnVuY3Rpb24oXzB4NTA2MDI2LF8weDNlODUyYil7cmV0dXJuIF8weDUwNjAyNj09PV8weDNlODUyYjt9LCdBWkNLSSc6XzB4YTZlMDY1KDB4MzgwLCdjRG9AJyksJ2xkY0dDJzpmdW5jdGlvbihfMHg1Njk5OTcsXzB4MWQ3N2I5KXtyZXR1cm4gXzB4NTY5OTk3KF8weDFkNzdiOSk7fSwnZmFrSUsnOl8weGE2ZTA2NSgweDIwMSwna2FmZycpLCdodUxIbic6XzB4YTZlMDY1KDB4Mjg3LCdpUyMwJyksJ3pHcHF3JzpfMHhhNmUwNjUoMHgxYzUsJ0diQignKSwnaE1GQlknOl8weGE2ZTA2NSgweDJlYSwndkJoYScpfTtpZihCQltfMHhhNmUwNjUoMHgzOTEsJylsKHMnKV0pcmV0dXJuIEJCW18weGE2ZTA2NSgweDJjMSwnR2JCKCcpXTtjb25zdCBfMHgxZWNkNzg9QkJbXzB4YTZlMDY1KDB4MzgxLCdtNkgoJyldKCk7cmV0dXJuIF8weDFlY2Q3OD8oQkJbJ29ubG9hZFByb21pc2VfJ109bmV3IFByb21pc2UoXzB4NGFjM2UyPT57dmFyIF8weDJjNTIwMj1fMHhhNmUwNjUsXzB4MTM1YjlkPXsncFBkb1QnOmZ1bmN0aW9uKF8weDRjNmE2MyxfMHgxZTk2MWMpe3JldHVybiBfMHg0YzZhNjMoXzB4MWU5NjFjKTt9fTtfMHg4NjY1MWRbJ2Zha0lLJ10hPT1fMHg4NjY1MWRbXzB4MmM1MjAyKDB4MjJiLCc3NyNjJyldPyh3aW5kb3dbXzB4MmM1MjAyKDB4MmNlLCdYaCMkJyldKF8weDg2NjUxZFsnekdwcXcnXSwoe2RhdGE6e3R5cGU6XzB4NDU0ZDhiLGFjdGlvbjpfMHhlZGVmMDQsZGF0YTpfMHg1ZGJhN2Z9fSk9Pnt2YXIgXzB4ZGMyYzBiPV8weDJjNTIwMjtpZihfMHg4NjY1MWRbXzB4ZGMyYzBiKDB4MzNhLCdLY2VeJyldKF8weDg2NjUxZFsnSnhlVHYnXSxfMHg4NjY1MWRbXzB4ZGMyYzBiKDB4MmVlLCd2QmhhJyldKSl7dmFyIF8weDM4Njg4ZT17J1lmdmh5JzpmdW5jdGlvbihfMHgxY2I3N2UsXzB4OWM2M2Y4KXt2YXIgXzB4M2M5OTQ5PV8weGRjMmMwYjtyZXR1cm4gXzB4MTM1YjlkW18weDNjOTk0OSgweDIzZCwnQ2RedycpXShfMHgxY2I3N2UsXzB4OWM2M2Y4KTt9fTtyZXR1cm4gbmV3IF8weDM0NWQwZCgoXzB4NWRmMWEyLF8weDU2MTI3Yyk9Pnt2YXIgXzB4MTY1MzM5PV8weGRjMmMwYjtfMHgzODY4OGVbXzB4MTY1MzM5KDB4M2QzLCdGUkxuJyldKF8weDVkZjFhMixfMHhkZjk1NGYpO30pO31lbHNle2lmKF8weDg2NjUxZFsnTXRLV2EnXShfMHg4NjY1MWRbXzB4ZGMyYzBiKDB4MjQ3LCd0U0UmJyldLF8weDQ1NGQ4YikmJl8weDg2NjUxZFsndmhpQ0knXShfMHg4NjY1MWRbJ0FaQ0tJJ10sXzB4ZWRlZjA0KSl7Zm9yKGxldCBfMHgyYjQ3NzUgaW4gXzB4NWRiYTdmKV8weDFlY2Q3OFtfMHhkYzJjMGIoMHgzNTUsJ2NsVlUnKV0oXzB4MmI0Nzc1LF8weDg2NjUxZFtfMHhkYzJjMGIoMHgyMTcsJ3E3eGknKV0oU3RyaW5nLF8weDVkYmE3ZltfMHgyYjQ3NzVdKSk7XzB4ODY2NTFkW18weGRjMmMwYigweDMwMCwnRlJMbicpXShfMHg0YWMzZTIsXzB4MWVjZDc4KTt9fX0pLHdpbmRvd1sncGFyZW50J11bJ3Bvc3RNZXNzYWdlJ10oeyd0eXBlJzpfMHg4NjY1MWRbXzB4MmM1MjAyKDB4MzVmLCd2emVBJyldLCdhY3Rpb24nOl8weDg2NjUxZFsnQVpDS0knXSwnc291cmNlJzpfMHg4NjY1MWRbXzB4MmM1MjAyKDB4MzA4LCdAKTVNJyldfSwnKicpKTpfMHgxNzI0MThbXzB4MmM1MjAyKDB4MWVhLCdrYWZnJyldW18weDJjNTIwMigweDIxZiwnSUomIycpXSghMHgwKTt9KSxCQltfMHhhNmUwNjUoMHgyMzAsJ0BvcWwnKV0pOlByb21pc2VbXzB4YTZlMDY1KDB4MWY2LCdDZF53JyldKFJyKTt9c3RhdGljWydnZXRDdXN0b21Mb2NhbFN0b3JhZ2UnXSgpe3ZhciBfMHgzMTY1YzI9XzB4MzJiYjI3LF8weDExNDllZD17J3R6TnVpJzpmdW5jdGlvbihfMHgxMDcwMzQsXzB4MWJlNzFlKXtyZXR1cm4gXzB4MTA3MDM0PT09XzB4MWJlNzFlO30sJ3JUZkdlJzpmdW5jdGlvbihfMHg0NTUxMjcsXzB4MzZhNGIwKXtyZXR1cm4gXzB4NDU1MTI3KF8weDM2YTRiMCk7fSwnVEZVZEgnOidtZXNzYWdlJywnWnRGWHgnOl8weDMxNjVjMigweDMzNSwnKWwocycpLCd4UklUeSc6J1lhbmRleEdhbWVzU0RLJywnVlpSRWQnOmZ1bmN0aW9uKF8weDU1NTg1NixfMHg1NDYyMGUpe3JldHVybiBfMHg1NTU4NTY9PT1fMHg1NDYyMGU7fSwnQVFUYlMnOidIUW5xTCcsJ2FvSmFMJzpfMHgzMTY1YzIoMHgyMzMsJ3d1dXonKSwnTVJlUlknOmZ1bmN0aW9uKF8weDIwYjk4ZixfMHgyZjg1ODgpe3JldHVybiBfMHgyMGI5OGYoXzB4MmY4NTg4KTt9LCdhd0NwVSc6ZnVuY3Rpb24oXzB4Mjg1M2MxLF8weDJlODIxNyl7cmV0dXJuIF8weDI4NTNjMShfMHgyZTgyMTcpO30sJ0FlanpIJzpfMHgzMTY1YzIoMHgyYWQsJzd6UTMnKX07aWYoXzB4MTE0OWVkW18weDMxNjVjMigweDNmMiwncTd4aScpXSE9dHlwZW9mIFByb3h5KXJldHVybiBudWxsO3JldHVybiBuZXcgUHJveHkoeydjbGVhcicoKXt2YXIgXzB4MjcwNjc1PV8weDMxNjVjMjtScltfMHgyNzA2NzUoMHgyZDAsJ0tjZV4nKV1bXzB4MjcwNjc1KDB4MzNlLCdJSiYjJyldKFJyKTt9LCdnZXRJdGVtJzpfMHgzNDNlZWI9PlJyW18weDMxNjVjMigweDJiNSwnQCk1TScpXVtfMHgzMTY1YzIoMHgzMmQsJ0NkXncnKV0oUnIsXzB4MzQzZWViKSwna2V5JzpfMHgzNDYyYTg9PlJyW18weDMxNjVjMigweDFlOCwnQCk1TScpXVtfMHgzMTY1YzIoMHgzMDQsJ0ApNU0nKV0oUnIsXzB4MzQ2MmE4KSxnZXQgJ2xlbmd0aCcoKXt2YXIgXzB4MjYwNmVmPV8weDMxNjVjMjtpZihfMHgxMTQ5ZWRbXzB4MjYwNmVmKDB4MzE4LCdVNXpMJyldKF8weDExNDllZFtfMHgyNjA2ZWYoMHgzY2UsJ09TNiUnKV0sXzB4MTE0OWVkW18weDI2MDZlZigweDI0MywnMmpATicpXSkpe3ZhciBfMHgyMWNhYzI9eydGZ2pJTSc6ZnVuY3Rpb24oXzB4YTI0NGFhLF8weGQyZjdmZSl7dmFyIF8weDE3YjRkNT1fMHgyNjA2ZWY7cmV0dXJuIF8weDExNDllZFtfMHgxN2I0ZDUoMHgyYTIsJ29ockUnKV0oXzB4YTI0NGFhLF8weGQyZjdmZSk7fSwnSGJjSUYnOidsb2NhbC1zdG9yYWdlJywnUmxzZEknOmZ1bmN0aW9uKF8weDNjNDIwOCxfMHg1ZDE5NjQpe3JldHVybiBfMHgxMTQ5ZWRbJ3JUZkdlJ10oXzB4M2M0MjA4LF8weDVkMTk2NCk7fX07XzB4Yzc3ZWExW18weDI2MDZlZigweDNlZSwnJmhQZicpXShfMHgxMTQ5ZWRbXzB4MjYwNmVmKDB4MjlhLCdmZ3N6JyldLCh7ZGF0YTp7dHlwZTpfMHgyYTc1NjAsYWN0aW9uOl8weDE5YzI4YSxkYXRhOl8weDE1NzZlNn19KT0+e3ZhciBfMHgzOTFjOGQ9XzB4MjYwNmVmO2lmKF8weDIxY2FjMlsnRmdqSU0nXShfMHgyMWNhYzJbJ0hiY0lGJ10sXzB4MmE3NTYwKSYmXzB4MjFjYWMyW18weDM5MWM4ZCgweDIwYywnaVMjMCcpXSgnZ2V0LWFsbCcsXzB4MTljMjhhKSl7Zm9yKGxldCBfMHgyMTM4YmYgaW4gXzB4MTU3NmU2KV8weDNiMGM4YVtfMHgzOTFjOGQoMHgzMmUsJ3dIYVknKV0oXzB4MjEzOGJmLF8weDIxY2FjMlsnUmxzZEknXShfMHg4NWIzOWMsXzB4MTU3NmU2W18weDIxMzhiZl0pKTtfMHgyMWNhYzJbJ1Jsc2RJJ10oXzB4MjkxODgzLF8weDE3MjZjNik7fX0pLF8weDMxMjc4ZlsncGFyZW50J11bXzB4MjYwNmVmKDB4MWU2LCcyakBOJyldKHsndHlwZSc6XzB4MTE0OWVkW18weDI2MDZlZigweDNhOSwnRlJMbicpXSwnYWN0aW9uJzpfMHgyNjA2ZWYoMHgyNjUsJ1ZhSXAnKSwnc291cmNlJzpfMHgxMTQ5ZWRbXzB4MjYwNmVmKDB4M2JiLCdHYkIoJyldfSwnKicpO31lbHNlIHJldHVybiBSclsnbGVuZ3RoJ107fSwncmVtb3ZlSXRlbScoXzB4YjA2NzdiKXt2YXIgXzB4MTE2MWUyPV8weDMxNjVjMjtScltfMHgxMTYxZTIoMHgzMTAsJ1RIZUcnKV1bXzB4MTE2MWUyKDB4MzUxLCdGN3BxJyldKFJyLF8weGIwNjc3Yik7fSwnc2V0SXRlbScoXzB4NWYxMGJlLF8weDExMTI2NCl7dmFyIF8weDFkNjYxOT1fMHgzMTY1YzI7UnJbJ3NldEl0ZW0nXVtfMHgxZDY2MTkoMHgzYmMsJ3d1dXonKV0oUnIsXzB4NWYxMGJlLF8weDExNDllZFsnTVJlUlknXShTdHJpbmcsXzB4MTExMjY0KSk7fX0seydnZXQnOmZ1bmN0aW9uKF8weDQ4MmYxMCxfMHg3ZDZkZTkpe3ZhciBfMHg1OTY1Zjk9XzB4MzE2NWMyO3JldHVybiBfMHg3ZDZkZTkgaW4gXzB4NDgyZjEwP18weDQ4MmYxMFtfMHg3ZDZkZTldOl8weDQ4MmYxMFsnZ2V0SXRlbSddKF8weDExNDllZFtfMHg1OTY1ZjkoMHgzZDAsJ0ZZVlUnKV0oU3RyaW5nLF8weDdkNmRlOSkpO30sJ3NldCc6ZnVuY3Rpb24oXzB4MmU4ZDM0LF8weDRlNzg0MixfMHgzM2RlNzMpe3ZhciBfMHg0Njk4Nzk9XzB4MzE2NWMyO3JldHVybiBfMHgyZThkMzRbXzB4NDY5ODc5KDB4MzU4LCdtNkgoJyldKF8weDExNDllZFtfMHg0Njk4NzkoMHgzMzcsJ2NsVlUnKV0oU3RyaW5nLF8weDRlNzg0MiksXzB4MzNkZTczKSwhMHgwO319KTt9c3RhdGljW18weDMyYmIyNygweDNhMywnaVMjMCcpXSgpe3ZhciBfMHg1MjQ5ODE9XzB4MzJiYjI3LF8weDQwZWU0ND17J3Zja2FGJzpfMHg1MjQ5ODEoMHgzNDksJ2NsVlUnKX07Y29uc3QgXzB4MmYyNGMxPUJCW18weDUyNDk4MSgweDI3OSwnXnRyQicpXSgpO3JldHVybiEhXzB4MmYyNGMxJiYoT2JqZWN0W18weDUyNDk4MSgweDNjNywnZmdzeicpXSh3aW5kb3csXzB4NDBlZTQ0W18weDUyNDk4MSgweDJjMCwnY0RvQCcpXSx7J2dldCc6ZnVuY3Rpb24oKXtyZXR1cm4gXzB4MmYyNGMxO319KSwhMHgwKTt9c3RhdGljWydiYWNrdXAnXSgpe3ZhciBfMHgyMGM0Yjc9XzB4MzJiYjI3LF8weDM5Y2Y2MD17J2hSblZZJzpmdW5jdGlvbihfMHgxMjdjMDAsXzB4NWU1Y2Q3KXtyZXR1cm4gXzB4MTI3YzAwKF8weDVlNWNkNyk7fSwnYWFxc1knOmZ1bmN0aW9uKF8weDRmZTVjNSxfMHgzNTM3ZjIpe3JldHVybiBfMHg0ZmU1YzU+Pl8weDM1MzdmMjt9LCdnTWtsZic6ZnVuY3Rpb24oXzB4NTllZTI3LF8weDE2NzE5Yyl7cmV0dXJuIF8weDU5ZWUyNzxfMHgxNjcxOWM7fSwnY1hZRm0nOmZ1bmN0aW9uKF8weDU4YTc1MSxfMHgyMzRlMTkpe3JldHVybiBfMHg1OGE3NTE8XzB4MjM0ZTE5O30sJ3ZWcWlrJzpmdW5jdGlvbihfMHgyZWMyOTIsXzB4NGI0NTgwKXtyZXR1cm4gXzB4MmVjMjkyPDxfMHg0YjQ1ODA7fSwncWtNRVAnOmZ1bmN0aW9uKF8weDNjMGVjNCxfMHgyOTNjZmIpe3JldHVybiBfMHgzYzBlYzQmXzB4MjkzY2ZiO30sJ1lqU1djJzpmdW5jdGlvbihfMHgzYWIxZjEsXzB4NWRhMjJmKXtyZXR1cm4gXzB4M2FiMWYxL18weDVkYTIyZjt9LCdtUExaeSc6ZnVuY3Rpb24oXzB4NTM0ODBjLF8weDRhOGRiNil7cmV0dXJuIF8weDUzNDgwYyVfMHg0YThkYjY7fSwnWkl0SWMnOmZ1bmN0aW9uKF8weDVlYWUxMSxfMHg0Yjk4Zjcpe3JldHVybiBfMHg1ZWFlMTE8XzB4NGI5OGY3O30sJ0ZRUExwJzpfMHgyMGM0YjcoMHgzZjAsJ3E3eGknKX07Y29uc3QgXzB4MWYzYWViPU9iamVjdFsnY3JlYXRlJ10obnVsbCk7Zm9yKGxldCBfMHgzM2MzMDk9MHgwO18weDM5Y2Y2MFsnWkl0SWMnXShfMHgzM2MzMDksUnJbXzB4MjBjNGI3KDB4MzZmLCd3dXV6JyldKTtfMHgzM2MzMDkrKyl7aWYoXzB4MzljZjYwW18weDIwYzRiNygweDI2NywnVDhMQicpXT09PV8weDM5Y2Y2MFsnRlFQTHAnXSl7Y29uc3QgXzB4MTAwYTlmPVJyW18weDIwYzRiNygweDI3ZCwndkJoYScpXShfMHgzM2MzMDkpO18weDEwMGE5ZiYmKF8weDFmM2FlYltfMHgxMDBhOWZdPVJyWydnZXRJdGVtJ10oXzB4MTAwYTlmKSk7fWVsc2V7Zm9yKHZhciBfMHg1YzAwMjQ9XzB4MzljZjYwW18weDIwYzRiNygweDI5NCwnMmpATicpXShfMHgyOTgyNjIsXzB4MzljZjYwWydhYXFzWSddKF8weGJhMTZlN1tfMHgyMGM0YjcoMHgzYmQsJ0ApNU0nKV0sMHgyKSksXzB4NDUzMjc0PTB4MDtfMHgzOWNmNjBbXzB4MjBjNGI3KDB4M2MzLCdPUzYlJyldKF8weDQ1MzI3NCxfMHg1YzAwMjRbXzB4MjBjNGI3KDB4M2JkLCdAKTVNJyldKTtfMHg0NTMyNzQrKylfMHg1YzAwMjRbXzB4NDUzMjc0XT0weDA7Zm9yKF8weDQ1MzI3ND0weDA7XzB4MzljZjYwWydjWFlGbSddKF8weDQ1MzI3NCwweDgqXzB4MjRjMTFhW18weDIwYzRiNygweDQwNSwnd0hhWScpXSk7XzB4NDUzMjc0Kz0weDgpXzB4NWMwMDI0W18weDQ1MzI3ND4+MHg1XXw9XzB4MzljZjYwW18weDIwYzRiNygweDM3ZCwnbTZIKCcpXShfMHgzOWNmNjBbXzB4MjBjNGI3KDB4Mzk4LCdzRV0mJyldKDB4ZmYsXzB4M2NlODAyW18weDIwYzRiNygweDQwOCwnVTV6TCcpXShfMHgzOWNmNjBbXzB4MjBjNGI3KDB4MzFkLCdUOExCJyldKF8weDQ1MzI3NCwweDgpKSksXzB4MzljZjYwW18weDIwYzRiNygweDM5MCwndkJoYScpXShfMHg0NTMyNzQsMHgyMCkpO3JldHVybiBfMHg1YzAwMjQ7fX19fWZ1bmN0aW9uIE4oKXt2YXIgXzB4NWQyNzZjPV8weDMyYmIyNyxfMHgyYjFiOGY9eyd1WmRwTyc6ZnVuY3Rpb24oXzB4MWZmZDA4LF8weDRkYmE3NSl7cmV0dXJuIF8weDFmZmQwOCYmXzB4NGRiYTc1O319O3JldHVybiBfMHgyYjFiOGZbXzB4NWQyNzZjKDB4MmJhLCdpUyMwJyldKCFMbCxrMSk/UHJvbWlzZVsncmVzb2x2ZSddKGsxKTpCQlsnbG9hZCddKCk7fXZhciBuZGY9eydCJzpmdW5jdGlvbihfMHg1OTVkOWUpe3ZhciBfMHgzNTQ2N2I9XzB4MzJiYjI3LF8weDFhYmJjNT17J2ZrT1daJzpmdW5jdGlvbihfMHgyNTcwYzIsXzB4NDYyMTlmKXtyZXR1cm4gXzB4MjU3MGMyLV8weDQ2MjE5Zjt9LCdxb1lsWSc6ZnVuY3Rpb24oXzB4M2Y2YWJjLF8weDVkZDRlNyl7cmV0dXJuIF8weDNmNmFiY3xfMHg1ZGQ0ZTc7fSwndHp6bmgnOmZ1bmN0aW9uKF8weDQ1N2M1ZixfMHg0Zjc1ZmMpe3JldHVybiBfMHg0NTdjNWYqXzB4NGY3NWZjO30sJ1JtalRwJzpmdW5jdGlvbihfMHgzMDc2ZDQsXzB4NDA1NzY0KXtyZXR1cm4gXzB4MzA3NmQ0Jl8weDQwNTc2NDt9LCdxSHhndCc6ZnVuY3Rpb24oXzB4MzRiMmVmLF8weDE1MWViYyl7cmV0dXJuIF8weDM0YjJlZnxfMHgxNTFlYmM7fSwnbGJOZGUnOmZ1bmN0aW9uKF8weDNmMjc2YSxfMHg0ZTBkOTApe3JldHVybiBfMHgzZjI3NmE8PF8weDRlMGQ5MDt9LCdSb0JSVyc6ZnVuY3Rpb24oXzB4N2VjYmQ3LF8weDUzNzE4OCl7cmV0dXJuIF8weDdlY2JkNyZfMHg1MzcxODg7fSwnY3ZaZ3MnOmZ1bmN0aW9uKF8weDVhMjc5OCxfMHgyZWNlMTUpe3JldHVybiBfMHg1YTI3OTgrXzB4MmVjZTE1O30sJ21SVE9OJzpmdW5jdGlvbihfMHgzZjc2Y2IsXzB4NDI4MmVhKXtyZXR1cm4gXzB4M2Y3NmNifF8weDQyODJlYTt9LCdlTXRsZCc6ZnVuY3Rpb24oXzB4YTMyNzJlLF8weDFlNjBhYSl7cmV0dXJuIF8weGEzMjcyZTw8XzB4MWU2MGFhO30sJ2VPWW5xJzpmdW5jdGlvbihfMHg0OTU2MGIsXzB4NGE0MTdkLF8weGM2Njg4Zil7cmV0dXJuIF8weDQ5NTYwYihfMHg0YTQxN2QsXzB4YzY2ODhmKTt9LCdHbk1WYyc6ZnVuY3Rpb24oXzB4MzFmOTI5LF8weDI2ZWYwZil7cmV0dXJuIF8weDMxZjkyOXxfMHgyNmVmMGY7fSwnbXVjYUYnOmZ1bmN0aW9uKF8weDRkZGJmZCxfMHg1NTM2NTApe3JldHVybiBfMHg0ZGRiZmQ+Pj5fMHg1NTM2NTA7fSwnUHBWS0InOmZ1bmN0aW9uKF8weDUyOTM5YSxfMHg3ZWU4M2Upe3JldHVybiBfMHg1MjkzOWF8XzB4N2VlODNlO30sJ0tlYVpaJzpmdW5jdGlvbihfMHg1MjgwZDEsXzB4NTQ4OTkyKXtyZXR1cm4gXzB4NTI4MGQxJV8weDU0ODk5Mjt9LCdVYldCVic6ZnVuY3Rpb24oXzB4OWM4NzE1LF8weGMzZGNhKXtyZXR1cm4gXzB4OWM4NzE1Jl8weGMzZGNhO30sJ1dkeWJsJzpmdW5jdGlvbihfMHgyNzM3ZjUsXzB4MWEyMjM1KXtyZXR1cm4gXzB4MjczN2Y1Jl8weDFhMjIzNTt9LCdCS1NVZCc6ZnVuY3Rpb24oXzB4M2MwOTY3LF8weDQ0Mzc3NCxfMHg1YTBhMGUpe3JldHVybiBfMHgzYzA5NjcoXzB4NDQzNzc0LF8weDVhMGEwZSk7fSwnaGdFUnUnOmZ1bmN0aW9uKF8weDM5OWVkNixfMHgxNmQ2MzYpe3JldHVybiBfMHgzOTllZDY+Pj5fMHgxNmQ2MzY7fSwnbG10WEonOmZ1bmN0aW9uKF8weDU2MTlhZCxfMHg2MWNlYzYpe3JldHVybiBfMHg1NjE5YWQhPT1fMHg2MWNlYzY7fSwnUmlEZkcnOl8weDM1NDY3YigweDM5OSwnSUomIycpLCd0WVdGWSc6ZnVuY3Rpb24oXzB4NTFlMzZmLF8weDM3OWI4Mil7cmV0dXJuIF8weDUxZTM2Zj09PV8weDM3OWI4Mjt9LCdvRmZPaSc6ZnVuY3Rpb24oXzB4MTljZTg3LF8weDY0NmRlZil7cmV0dXJuIF8weDE5Y2U4Nz49XzB4NjQ2ZGVmO30sJ2VJd2NyJzpmdW5jdGlvbihfMHg1MGU4NTUsXzB4MWU2OTRjLF8weDI0NjJmYyxfMHgyYWIxNmMpe3JldHVybiBfMHg1MGU4NTUoXzB4MWU2OTRjLF8weDI0NjJmYyxfMHgyYWIxNmMpO30sJ2xIQllvJzond2p5endzJWl0aHpyanN5M2l0cmZuc0AnfSxfMHgxY2IyOTI9e30sXzB4MWY0M2JkPWZ1bmN0aW9uKF8weDViZjMyNSxfMHgxNDJkMDEpe3ZhciBfMHg1ZWNjNGM9XzB4MzU0NjdiLF8weDRlYjJlYz0weGZmZmYmXzB4MTQyZDAxLF8weDMwYWQ2OD1fMHgxYWJiYzVbXzB4NWVjYzRjKDB4MzhkLCcyakBOJyldKF8weDE0MmQwMSxfMHg0ZWIyZWMpO3JldHVybiBfMHgxYWJiYzVbXzB4NWVjYzRjKDB4M2Y0LCcpbChzJyldKChfMHgzMGFkNjgqXzB4NWJmMzI1fDB4MCkrXzB4MWFiYmM1W18weDVlY2M0YygweDI1MywnSzdCTScpXShfMHgxYWJiYzVbXzB4NWVjYzRjKDB4M2MxLCdRM1ZeJyldKF8weDRlYjJlYyxfMHg1YmYzMjUpLDB4MCksMHgwKTt9LF8weDUyYTNmMD1mdW5jdGlvbigpe31bXzB4MzU0NjdiKDB4MmMyLCd2QmhhJyldKG5ldyBfMHg1OTVkOWUoXzB4MWFiYmM1W18weDM1NDY3YigweDFmYywnaVM1UScpXSlbJ0YnXSgweDUpKSgpLF8weDNlZGZkYT1mdW5jdGlvbihfMHhiNWJhZTMsXzB4MmQ1NTI1LF8weDUzNWZlMil7dmFyIF8weGUyMTE5Mj1fMHgzNTQ2N2I7aWYodm9pZCAweDAhPT1fMHgxY2IyOTJbXzB4NTM1ZmUyXSlyZXR1cm4gXzB4MWNiMjkyW18weDUzNWZlMl07Zm9yKHZhciBfMHg1ODY0OTI9MHhjYzllMmQ1MSxfMHg0Nzg1OGE9MHgxYjg3MzU5MyxfMHgyMDg1YWQ9XzB4NTM1ZmUyLF8weDJkY2I3MD1fMHgxYWJiYzVbXzB4ZTIxMTkyKDB4MWVkLCd6bXp0JyldKC0weDQsXzB4MmQ1NTI1KSxfMHgxMTQwNjc9MHgwO18weDJkY2I3MD5fMHgxMTQwNjc7XzB4MTE0MDY3Kz0weDQpe3ZhciBfMHg0ODIwMmI9XzB4MWFiYmM1W18weGUyMTE5MigweDMxMiwnaVM1UScpXShfMHgxYWJiYzVbXzB4ZTIxMTkyKDB4MmNkLCdLY2VeJyldKDB4ZmYsXzB4YjViYWUzW18weGUyMTE5MigweDI0MiwndUw3aScpXShfMHgxMTQwNjcpKSxfMHgxYWJiYzVbXzB4ZTIxMTkyKDB4MzUzLCdJSiYjJyldKF8weDFhYmJjNVtfMHhlMjExOTIoMHgzMTUsJ09TNiUnKV0oMHhmZixfMHhiNWJhZTNbJ2NoYXJDb2RlQXQnXShfMHgxMTQwNjcrMHgxKSksMHg4KSl8XzB4MWFiYmM1W18weGUyMTE5MigweDNiNCwnbTZIKCcpXShfMHgxYWJiYzVbJ1JvQlJXJ10oMHhmZixfMHhiNWJhZTNbXzB4ZTIxMTkyKDB4MzEzLCdpUzVRJyldKF8weDFhYmJjNVtfMHhlMjExOTIoMHgyYTMsJ2hQcCYnKV0oXzB4MTE0MDY3LDB4MikpKSwweDEwKXxfMHgxYWJiYzVbXzB4ZTIxMTkyKDB4NDA3LCdAKTVNJyldKDB4ZmYmXzB4YjViYWUzW18weGUyMTE5MigweDNhOCwnb2hyRScpXShfMHgxMTQwNjcrMHgzKSwweDE4KTtfMHg0ODIwMmI9XzB4MWY0M2JkKF8weDQ4MjAyYixfMHg1ODY0OTIpLF8weDQ4MjAyYj1fMHgxYWJiYzVbXzB4ZTIxMTkyKDB4M2U5LCdvSnlXJyldKF8weDFhYmJjNVsnZU10bGQnXShfMHgxYWJiYzVbXzB4ZTIxMTkyKDB4MWU3LCdAb3FsJyldKDB4MWZmZmYsXzB4NDgyMDJiKSwweGYpLF8weDQ4MjAyYj4+PjB4MTEpLF8weDQ4MjAyYj1fMHgxYWJiYzVbJ2VPWW5xJ10oXzB4MWY0M2JkLF8weDQ4MjAyYixfMHg0Nzg1OGEpLF8weDIwODVhZF49XzB4NDgyMDJiLF8weDIwODVhZD1fMHgxYWJiYzVbXzB4ZTIxMTkyKDB4MmQ4LCdpUyMwJyldKF8weDFhYmJjNVtfMHhlMjExOTIoMHgzYWYsJ202SCgnKV0oMHg3ZmZmZixfMHgyMDg1YWQpPDwweGQsXzB4MWFiYmM1W18weGUyMTE5MigweDNlNSwndnplQScpXShfMHgyMDg1YWQsMHgxMykpLF8weDIwODVhZD1fMHgxYWJiYzVbJ1BwVktCJ10oXzB4MWFiYmM1W18weGUyMTE5MigweDI1YiwnM1MhSCcpXShfMHgxYWJiYzVbJ3R6em5oJ10oMHg1LF8weDIwODVhZCksMHhlNjU0NmI2NCksMHgwKTt9c3dpdGNoKF8weDQ4MjAyYj0weDAsXzB4MWFiYmM1W18weGUyMTE5MigweDJlOCwnQG9xbCcpXShfMHgyZDU1MjUsMHg0KSl7Y2FzZSAweDM6XzB4NDgyMDJiPV8weDFhYmJjNVtfMHhlMjExOTIoMHgzYmUsJylsKHMnKV0oXzB4MWFiYmM1WydVYldCViddKDB4ZmYsXzB4YjViYWUzW18weGUyMTE5MigweDJmNywna2FmZycpXShfMHgxYWJiYzVbXzB4ZTIxMTkyKDB4M2NkLCc3elEzJyldKF8weDJkY2I3MCwweDIpKSksMHgxMCk7Y2FzZSAweDI6XzB4NDgyMDJifD1fMHgxYWJiYzVbJ2xiTmRlJ10oXzB4MWFiYmM1W18weGUyMTE5MigweDMyNCwndUw3aScpXSgweGZmLF8weGI1YmFlM1tfMHhlMjExOTIoMHgzYjEsJzJqQE4nKV0oXzB4MmRjYjcwKzB4MSkpLDB4OCk7Y2FzZSAweDE6XzB4NDgyMDJifD1fMHgxYWJiYzVbXzB4ZTIxMTkyKDB4MmYxLCdpUyMwJyldKDB4ZmYsXzB4YjViYWUzWydjaGFyQ29kZUF0J10oXzB4MmRjYjcwKSksXzB4NDgyMDJiPV8weDFhYmJjNVtfMHhlMjExOTIoMHgyMDQsJ2NsVlUnKV0oXzB4MWY0M2JkLF8weDQ4MjAyYixfMHg1ODY0OTIpLF8weDQ4MjAyYj0oMHgxZmZmZiZfMHg0ODIwMmIpPDwweGZ8XzB4MWFiYmM1W18weGUyMTE5MigweDJkZCwnJEFiQycpXShfMHg0ODIwMmIsMHgxMSksXzB4NDgyMDJiPV8weDFhYmJjNVtfMHhlMjExOTIoMHg0MDAsJ29KeVcnKV0oXzB4MWY0M2JkLF8weDQ4MjAyYixfMHg0Nzg1OGEpLF8weDIwODVhZF49XzB4NDgyMDJiO31yZXR1cm4gXzB4MjA4NWFkXj1fMHgyZDU1MjUsXzB4MjA4NWFkXj1fMHgyMDg1YWQ+Pj4weDEwLF8weDIwODVhZD1fMHgxYWJiYzVbXzB4ZTIxMTkyKDB4MWU1LCdVNXpMJyldKF8weDFmNDNiZCxfMHgyMDg1YWQsMHg4NWViY2E2YiksXzB4MjA4NWFkXj1fMHgxYWJiYzVbJ2hnRVJ1J10oXzB4MjA4NWFkLDB4ZCksXzB4MjA4NWFkPV8weDFmNDNiZChfMHgyMDg1YWQsMHhjMmIyYWUzNSksXzB4MjA4NWFkXj1fMHgxYWJiYzVbJ2hnRVJ1J10oXzB4MjA4NWFkLDB4MTApLF8weDFjYjI5MltfMHg1MzVmZTJdPV8weDIwODVhZCxfMHgyMDg1YWQ7fSxfMHgyNWRkMzA9ZnVuY3Rpb24oXzB4ZDgzZTI3LF8weDQ5OGM2MCxfMHgzNmFhMjcpe3ZhciBfMHgyNGI5YmE9XzB4MzU0NjdiO2lmKF8weDFhYmJjNVtfMHgyNGI5YmEoMHgzM2QsJ2lTIzAnKV0oXzB4MjRiOWJhKDB4M2Y3LCdAZkpGJyksXzB4MWFiYmM1WydSaURmRyddKSlfMHgzYWUwMDQoeyd2YWx1ZSc6ITB4MSwncmVhc29uJzpfMHgzNGQxYmN9KTtlbHNle3ZhciBfMHg5YjMwNjQsXzB4OTRlMjEwO3JldHVybiBfMHgzNmFhMjc+MHgwPyhfMHg5YjMwNjQ9XzB4NTJhM2YwW18weDI0YjliYSgweDIwMCwnVDhMQicpXShfMHhkODNlMjcsXzB4MzZhYTI3KSxfMHg5NGUyMTA9XzB4OWIzMDY0WydsZW5ndGgnXSxfMHgzZWRmZGEoXzB4OWIzMDY0LF8weDk0ZTIxMCxfMHg0OThjNjApKTpfMHgxYWJiYzVbJ3RZV0ZZJ10obnVsbCxfMHhkODNlMjcpfHxfMHgxYWJiYzVbXzB4MjRiOWJhKDB4MWViLCdUOExCJyldKDB4MCxfMHhkODNlMjcpPyhfMHg5YjMwNjQ9XzB4NTJhM2YwW18weDI0YjliYSgweDI4ZSwnVTV6TCcpXSgweDAsXzB4NTJhM2YwWydsZW5ndGgnXSksXzB4OTRlMjEwPV8weDliMzA2NFsnbGVuZ3RoJ10sXzB4MWFiYmM1W18weDI0YjliYSgweDM3MiwnNzcjYycpXShfMHgzZWRmZGEsXzB4OWIzMDY0LF8weDk0ZTIxMCxfMHg0OThjNjApKTooXzB4OWIzMDY0PV8weDUyYTNmMFtfMHgyNGI5YmEoMHgyNGQsJ3ZCaGEnKV0oXzB4MWFiYmM1W18weDI0YjliYSgweDMwZCwnN3pRMycpXShfMHg1MmEzZjBbJ2xlbmd0aCddLF8weGQ4M2UyNyksXzB4NTJhM2YwW18weDI0YjliYSgweDQwOSwnSUomIycpXSksXzB4OTRlMjEwPV8weDliMzA2NFtfMHgyNGI5YmEoMHgzNjcsJ2NEb0AnKV0sXzB4M2VkZmRhKF8weDliMzA2NCxfMHg5NGUyMTAsXzB4NDk4YzYwKSk7fX07cmV0dXJueydLJzpfMHgxZjQzYmQsJ0cnOl8weDNlZGZkYSwncSc6XzB4MjVkZDMwfTt9KGZ1bmN0aW9uKF8weDYyZWE4Nil7dGhpc1snViddPV8weDYyZWE4Nix0aGlzWydGJ109ZnVuY3Rpb24oXzB4MzdhZGY2KXt2YXIgXzB4NTM1OGUxPV8weDNkNzg7Zm9yKHZhciBfMHgzYjU3Zjk9bmV3IFN0cmluZygpLF8weDk2YjEyMj0weDA7XzB4OTZiMTIyPF8weDYyZWE4NltfMHg1MzU4ZTEoMHgzMTEsJ29ockUnKV07XzB4OTZiMTIyKyspXzB4M2I1N2Y5Kz1TdHJpbmdbXzB4NTM1OGUxKDB4MzdjLCdGWVZVJyldKF8weDYyZWE4NltfMHg1MzU4ZTEoMHgxZmQsJ2lTIzAnKV0oXzB4OTZiMTIyKS1fMHgzN2FkZjYpO3JldHVybiBfMHgzYjU3Zjk7fTt9KX07d2luZG93WydZYUdhbWVzJ109e307dmFyIF9wbGF5ZXI9eydnZXREYXRhJzphc3luYyBfMHgxYjQ3MDE9Pnt2YXIgXzB4MmY5NjQ0PV8weDMyYmIyNzthd2FpdCBudWxsO2xldCBfMHg0MmEwM2Y9TUQ1KHdpbmRvd1snbG9jYXRpb24nXVtfMHgyZjk2NDQoMHgzMDYsJ1ZhSXAnKV0pLF8weDVlNmVmYj1KU09OWydwYXJzZSddKGxvY2FsU3RvcmFnZVsnZ2V0SXRlbSddKF8weDQyYTAzZikpfHx7fTtyZXR1cm4gXzB4NWU2ZWZiO30sJ3NldERhdGEnOmFzeW5jKF8weDIwOTVjMCxfMHgxYjZlNDIpPT57dmFyIF8weDU4ZjA1Yz1fMHgzMmJiMjc7YXdhaXQgbnVsbDtsZXQgXzB4MmJmMjBmPU1ENSh3aW5kb3dbXzB4NThmMDVjKDB4M2FiLCdAKTVNJyldW18weDU4ZjA1YygweDMwNiwnVmFJcCcpXSksXzB4NGUyOWVhPUpTT05bXzB4NThmMDVjKDB4MzllLCdAKTVNJyldKGxvY2FsU3RvcmFnZVtfMHg1OGYwNWMoMHgzMDMsJ2NEb0AnKV0oXzB4MmJmMjBmKSl8fHt9O2ZvcihsZXQgXzB4MTMyNGQ0IGluIF8weDIwOTVjMCl7XzB4NGUyOWVhW18weDEzMjRkNF09XzB4MjA5NWMwW18weDEzMjRkNF07fXJldHVybiBsb2NhbFN0b3JhZ2VbXzB4NThmMDVjKDB4M2Y4LCdrYWZnJyldKF8weDJiZjIwZixKU09OWydzdHJpbmdpZnknXShfMHg0ZTI5ZWEpKSwhMHgwO30sJ2dldE5hbWUnOigpPT57dmFyIF8weDRiYTNhZT1fMHgzMmJiMjcsXzB4MzNhY2E3PXsndVBSTkgnOmZ1bmN0aW9uKF8weDEyNjg0OSxfMHg0YjBlMTgpe3JldHVybiBfMHgxMjY4NDk9PV8weDRiMGUxODt9LCdCc2lYaic6J3BsYXllck5hbWUnLCdKd3pFQyc6ZnVuY3Rpb24oXzB4NDY4OWVkLF8weDU0YzAyYyl7cmV0dXJuIF8weDQ2ODllZD09PV8weDU0YzAyYzt9LCdCaXFBRyc6XzB4NGJhM2FlKDB4Mzc5LCdJSiYjJyksJ09KQnRpJzpfMHg0YmEzYWUoMHgyMjcsJ3E3eGknKSwndE1oTUknOl8weDRiYTNhZSgweDNhYywnSmNzRScpfTtpZihfMHgzM2FjYTdbXzB4NGJhM2FlKDB4MjRlLCdHYkIoJyldKGxvY2FsU3RvcmFnZVtfMHg0YmEzYWUoMHgzYzAsJyRBYkMnKV0oXzB4MzNhY2E3W18weDRiYTNhZSgweDMyMSwnVEhlRycpXSksbnVsbCkpe2lmKF8weDMzYWNhN1snSnd6RUMnXShfMHgzM2FjYTdbXzB4NGJhM2FlKDB4MjhiLCdGUkxuJyldLF8weDMzYWNhN1tfMHg0YmEzYWUoMHgyZTcsJzJqQE4nKV0pKXt2YXIgXzB4MjNhMjE4PV8weDMzYWNhN1tfMHg0YmEzYWUoMHgyNzYsJ1ZhSXAnKV0rRGF0ZVtfMHg0YmEzYWUoMHgzMjcsJ0Y3cHEnKV0oKTtsb2NhbFN0b3JhZ2VbXzB4NGJhM2FlKDB4M2RiLCd0U0UmJyldKF8weDMzYWNhN1tfMHg0YmEzYWUoMHgzYjksJyZoUGYnKV0sXzB4MjNhMjE4KSxsb2NhbFN0b3JhZ2VbXzB4NGJhM2FlKDB4MmZkLCdAKTVNJyldKF8weDMzYWNhN1sndE1oTUknXSxEYXRlW18weDRiYTNhZSgweDFlMiwnM1MhSCcpXSgpKTt9ZWxzZSByZXR1cm4gbmV3IF8weDQ1OGRmNigoXzB4NTY1MTY3LF8weGExNGUxZik9PntfMHg1NjUxNjcoeydjYW5TaG93JzohMHgxfSk7fSk7fWVsc2UgXzB4MjNhMjE4PWxvY2FsU3RvcmFnZVsnZ2V0SXRlbSddKF8weDMzYWNhN1snQnNpWGonXSk7cmV0dXJuIF8weDIzYTIxODt9LCdnZXRQaG90byc6XzB4NDI2YTM4PT57dmFyIF8weGU3MDk0Mj1fMHgzMmJiMjc7cmV0dXJuIF8weGU3MDk0MigweDNhNiwnSzdCTScpO30sJ2dldFVuaXF1ZUlEJzooKT0+e3ZhciBfMHgzMzA3Mzk9XzB4MzJiYjI3LF8weDRmMTliZj17J3RkcWRUJzpfMHgzMzA3MzkoMHgyYTksJzd6UTMnKX07bGV0IF8weGMxNDM2Zj1NRDUobG9jYWxTdG9yYWdlWydnZXRJdGVtJ10oXzB4MzMwNzM5KDB4MzQ4LCdvSnlXJykpK2xvY2FsU3RvcmFnZVtfMHgzMzA3MzkoMHgyN2YsJ3d1dXonKV0oXzB4NGYxOWJmW18weDMzMDczOSgweDNmOSwnb2hyRScpXSkpO3JldHVybiBfMHhjMTQzNmY7fSwnZ2V0TW9kZSc6KCk9Pnt2YXIgXzB4NDg0ZmIzPV8weDMyYmIyNyxfMHg1MjYzOTc9eydRVXRIayc6ZnVuY3Rpb24oXzB4MzQwODdiLF8weDM2ZDliMSl7cmV0dXJuIF8weDM0MDg3Yj09PV8weDM2ZDliMTt9LCdnQ2pIVCc6J2xpdGUnfTtyZXR1cm4gXzB4NTI2Mzk3WydRVXRIayddKHR5cGVvZiBuZWVkVG9CZUxvZ2dlZCwndW5kZWZpbmVkJyk/XzB4NTI2Mzk3W18weDQ4NGZiMygweDMyYSwna2FmZycpXTonZnVsbCc7fSwnZ2V0U3RhdHMnOigpPT57dmFyIF8weDJjMzc4MT1fMHgzMmJiMjcsXzB4MzI2YmQ3PXsnRE5JVU8nOl8weDJjMzc4MSgweDI5YiwnSzdCTScpLCdTQ1JJUCc6XzB4MmMzNzgxKDB4MjdiLCd1TDdpJyksJ0JVZVFtJzpmdW5jdGlvbihfMHg0NGQzY2MsXzB4MzZjNWUwKXtyZXR1cm4gXzB4NDRkM2NjKF8weDM2YzVlMCk7fX07cmV0dXJuIG5ldyBQcm9taXNlKChfMHgxYTM0NDEsXzB4NDQ0ZTU1KT0+e3ZhciBfMHg1Y2UxYTE9XzB4MmMzNzgxO2lmKF8weDMyNmJkN1tfMHg1Y2UxYTEoMHgxZGQsJ0ZSTG4nKV0hPT1fMHgzMjZiZDdbXzB4NWNlMWExKDB4MjIwLCdpUyMwJyldKV8weDMyNmJkN1tfMHg1Y2UxYTEoMHgzNTYsJ0ZZVlUnKV0oXzB4MWEzNDQxLFtdKTtlbHNlIHJldHVybiBuZXcgXzB4M2I0YzRhKChfMHgxMGZjMjAsXzB4MmIyMzY4KT0+e18weDEwZmMyMChbXSk7fSk7fSk7fSwnc2V0U3RhdHMnOigpPT57cmV0dXJuIG5ldyBQcm9taXNlKChfMHgzN2VmYjQsXzB4Mzg1YmY5KT0+e18weDM3ZWZiNChbXSk7fSk7fSwnaW5jcmVtZW50U3RhdHMnOl8weDQxNjU5Mz0+e3ZhciBfMHgyMWYwMjg9XzB4MzJiYjI3O3JldHVybiBjb25zb2xlW18weDIxZjAyOCgweDQwNCwnY0RvQCcpXShfMHg0MTY1OTMpLG5ldyBQcm9taXNlKChfMHgyODdmZDQsXzB4MjBmNTViKT0+e18weDI4N2ZkNChbXSk7fSk7fX07X3BsYXllcltfMHgzMmJiMjcoMHgyN2MsJ0s3Qk0nKV09eydpZCc6X3BsYXllclsnZ2V0VW5pcXVlSUQnXSgpLCd1bmlxdWVJRCc6X3BsYXllcltfMHgzMmJiMjcoMHgyODQsJzhPMWYnKV0oKSwnbGFuZyc6KG5hdmlnYXRvcltfMHgzMmJiMjcoMHgzYjMsJ2lTNVEnKV18fG5hdmlnYXRvcltfMHgzMmJiMjcoMHgzNjgsJ1ZhSXAnKV0pW18weDMyYmIyNygweDJkOSwnc0VdJicpXSgweDAsMHgyKSwncHVibGljTmFtZSc6X3BsYXllclsnZ2V0TmFtZSddKCksJ2F2YXRhcklkSGFzaCc6JzAnLCdzY29wZVBlcm1pc3Npb25zJzp7J2F2YXRhcic6XzB4MzJiYjI3KDB4Mzc4LCdRM1ZeJyksJ3B1YmxpY19uYW1lJzonYWxsb3cnfSwnaGFzUHJlbWl1bSc6ISFbXX07Y2xhc3MgTG9hZGluZ0FQSXtjb25zdHJ1Y3RvcihfMHgxMTJlNWIpe3ZhciBfMHgzM2E0MTc9XzB4MzJiYjI3O3RoaXNbXzB4MzNhNDE3KDB4MWRlLCdjbFZVJyldPSEweDEsdGhpc1snc3RhcnRUaW1lc3RhbXAnXT1EYXRlW18weDMzYTQxNygweDJmOCwnVmJKUicpXSgpLHRoaXNbXzB4MzNhNDE3KDB4Mjk2LCdUSGVHJyldKCksdGhpc1sncHInXT1fMHgxMTJlNWIsdGhpc1snaHInXT0weDc1MzA7fVtfMHgzMmJiMjcoMHgyOTcsJylsKHMnKV0oKXt2YXIgXzB4MTJjYTlhPV8weDMyYmIyNyxfMHg0MmNmZTA9eyd1d1ZBUic6ZnVuY3Rpb24oXzB4MTNjYjAzLF8weDQ4MjVlYyl7cmV0dXJuIF8weDEzY2IwMy1fMHg0ODI1ZWM7fX07dGhpc1tfMHgxMmNhOWEoMHgyYzUsJ0lKJiMnKV09ITB4MDtjb25zdCBfMHgyYTVlNTQ9XzB4NDJjZmUwW18weDEyY2E5YSgweDJlZCwnaVM1UScpXShEYXRlW18weDEyY2E5YSgweDIwYiwnZmdzeicpXSgpLHRoaXNbXzB4MTJjYTlhKDB4MzcwLCdedHJCJyldKTt0aGlzW18weDEyY2E5YSgweDJiMywncTd4aScpXShfMHgyYTVlNTQsdGhpc1sncHInXVtfMHgxMmNhOWEoMHgyMTEsJ2lTNVEnKV0pLGNsZWFyVGltZW91dCh0aGlzWydyZWFkeUZhbGxiYWNrVGltZXJJZCddKTt9W18weDMyYmIyNygweDMxZiwnUTNWXicpXShfMHhkZWExMmUsXzB4NTQzMjA3KXt9W18weDMyYmIyNygweDMzMSwnVDhMQicpXSgpe3ZhciBfMHgxNDViYTk9XzB4MzJiYjI3LF8weDU2MjM5ZD17J1BybWtqJzpmdW5jdGlvbihfMHg1YTQ4OTcsXzB4ZjA2MjEsXzB4M2E0OTc1KXtyZXR1cm4gXzB4NWE0ODk3KF8weGYwNjIxLF8weDNhNDk3NSk7fX07dGhpc1tfMHgxNDViYTkoMHgzNWQsJ3Z6ZUEnKV09XzB4NTYyMzlkW18weDE0NWJhOSgweDM0NCwnVmFJcCcpXShzZXRUaW1lb3V0LCgpPT57dmFyIF8weDU5NDYxZD1fMHgxNDViYTk7dGhpc1tfMHg1OTQ2MWQoMHgzOWEsJylsKHMnKV09ITB4MCx0aGlzW18weDU5NDYxZCgweDM1NywnJmhQZicpXSh0aGlzWydociddLHRoaXNbJ3ByJ11bXzB4NTk0NjFkKDB4MmRhLCdpUyMwJyldKTt9LHRoaXNbJ2hyJ10pO319dmFyIF9sZWFkZXJib2FyZD17J2dldExlYWRlcmJvYXJkUGxheWVyRW50cnknOl8weDExNjdlND0+e3ZhciBfMHgyN2VhNmY9eydCTk5kWic6J0xsVmthJywnR3JwT0knOmZ1bmN0aW9uKF8weDNkOWMwYixfMHgzODc4YTApe3JldHVybiBfMHgzZDljMGIoXzB4Mzg3OGEwKTt9fTtyZXR1cm4gbmV3IFByb21pc2UoKF8weGZjOGNlNyxfMHg1MjAwNTEpPT57dmFyIF8weDE2MjE2ZD1fMHgzZDc4O2lmKF8weDI3ZWE2ZltfMHgxNjIxNmQoMHgzYjIsJ2NsVlUnKV09PT1fMHgyN2VhNmZbXzB4MTYyMTZkKDB4MzlmLCdGUkxuJyldKV8weDI3ZWE2ZltfMHgxNjIxNmQoMHgxYmYsJ3ptenQnKV0oXzB4NTIwMDUxLHsnY29kZSc6XzB4MTYyMTZkKDB4MmE3LCdpUyMwJyl9KTtlbHNle3ZhciBfMHgxYjQxZTQ9XzB4ZWFiN2RlWydnZXRFbGVtZW50QnlJZCddKF8weDE2MjE2ZCgweDI5MSwnb1FhZCcpKTtfMHgxYjQxZTRbJ3JlbW92ZSddKCk7fX0pO30sJ2dldExlYWRlcmJvYXJkRW50cmllcyc6KCk9PntyZXR1cm4gbmV3IFByb21pc2UoKF8weDU2ZWJjOSxfMHgxYjdlYTYpPT57XzB4NTZlYmM5KFtdKTt9KTt9LCdzZXRMZWFkZXJib2FyZFNjb3JlJzooXzB4MTg0MmEwLF8weDJlMzU5Nik9Pnt9LCdnZXRMZWFkZXJib2FyZERlc2NyaXB0aW9uJzpfMHg1ZjIyM2U9Pnt2YXIgXzB4NTM0YThmPXsnenJmclYnOmZ1bmN0aW9uKF8weDNhNTBlMCxfMHhmOTY1OGYpe3JldHVybiBfMHgzYTUwZTAoXzB4Zjk2NThmKTt9fTtyZXR1cm4gbmV3IFByb21pc2UoKF8weDQxY2I5MSxfMHgxMWMxMDIpPT57dmFyIF8weDMwNWMzZj1fMHgzZDc4O18weDUzNGE4ZltfMHgzMDVjM2YoMHgyZDIsJ29ockUnKV0oXzB4NDFjYjkxLFtdKTt9KTt9fSxfcGF5bWVudHM9eydwdXJjaGFzZSc6XzB4NTE3MmM2PT57dmFyIF8weDE0NzZkMz17J0trbkhMJzpmdW5jdGlvbihfMHhiMzc2OWEsXzB4M2MwNzIxLF8weDRmYmE1LF8weDRmNDYzNCxfMHg1NDBmMGYsXzB4NDYyZmEwLF8weDU4OTUwNCl7cmV0dXJuIF8weGIzNzY5YShfMHgzYzA3MjEsXzB4NGZiYTUsXzB4NGY0NjM0LF8weDU0MGYwZixfMHg0NjJmYTAsXzB4NTg5NTA0KTt9LCdpS05jQyc6ZnVuY3Rpb24oXzB4YjA2ZDJiLF8weDJhNmI1Mil7cmV0dXJuIF8weGIwNmQyYnxfMHgyYTZiNTI7fSwnTGdaQVonOmZ1bmN0aW9uKF8weDViNzUxNSxfMHg1NzE1MTEpe3JldHVybiBfMHg1Yjc1MTUhPT1fMHg1NzE1MTE7fSwnUk1JY3onOmZ1bmN0aW9uKF8weDViYjQxNCxfMHhjMjk2MjIpe3JldHVybiBfMHg1YmI0MTQoXzB4YzI5NjIyKTt9fTtyZXR1cm4gbmV3IFByb21pc2UoKF8weDU4ZTdmZSxfMHgyMDg1NGQpPT57dmFyIF8weDJhZDNjZD1fMHgzZDc4O2lmKF8weDE0NzZkM1tfMHgyYWQzY2QoMHgzY2IsJ2thZmcnKV0oJ2pVcFFGJywnWHFJYXknKSlfMHgxNDc2ZDNbXzB4MmFkM2NkKDB4MjYwLCdpUyMwJyldKF8weDU4ZTdmZSxfMHg1MTcyYzYpO2Vsc2UgcmV0dXJuIF8weDE0NzZkM1tfMHgyYWQzY2QoMHgzMWIsJ3NFXSYnKV0oXzB4MTdiYTU0LF8weDE0NzZkM1tfMHgyYWQzY2QoMHgzZmMsJ202SCgnKV0oXzB4MTY5NmExJl8weDM5ZmQxOCxfMHgzNmJiYjUmfl8weDQxNjBlNyksXzB4MWM3YWI0LF8weDQxZmY4NCxfMHg5Zjk4NTgsXzB4MjcwMDhhLF8weDQ2YWQwZCk7fSk7fSwnZ2V0UHVyY2hhc2VzJzooKT0+e3ZhciBfMHgyYjI3Mjc9eydndWRGVCc6ZnVuY3Rpb24oXzB4NGU2MzM1LF8weDM0ZmEyNil7cmV0dXJuIF8weDRlNjMzNShfMHgzNGZhMjYpO319O3JldHVybiBuZXcgUHJvbWlzZSgoXzB4MmJkMzg3LF8weDEyZDQ5ZCk9PntfMHgyYjI3MjdbJ2d1ZEZUJ10oXzB4MmJkMzg3LFtdKTt9KTt9LCdnZXRDYXRhbG9nJzooKT0+e3ZhciBfMHgxZDIwOTQ9eydESU1LVic6ZnVuY3Rpb24oXzB4NWVkMDQxLF8weDk1NDM1OCl7cmV0dXJuIF8weDVlZDA0MShfMHg5NTQzNTgpO319O3JldHVybiBuZXcgUHJvbWlzZSgoXzB4OWE4NzgyLF8weDdlYTkxOCk9Pnt2YXIgXzB4NWUzZTY1PV8weDNkNzg7XzB4MWQyMDk0W18weDVlM2U2NSgweDM4Nywnb0p5VycpXShfMHg5YTg3ODIsW10pO30pO30sJ2NvbnN1bWVQdXJjaGFzZSc6XzB4ZDhhN2ZlPT57cmV0dXJuIG5ldyBQcm9taXNlKChfMHgyZDA0ZGQsXzB4MTAwN2Q2KT0+e18weDJkMDRkZChbXSk7fSk7fX0saXNGblRpbWVvdXQ9ITB4MSxpc1BvcFVwQWR2U2hvd249ITB4MSxfeXNkaz17J0VWRU5UUyc6eydFWElUJzpfMHgzMmJiMjcoMHgzM2YsJ0ZZVlUnKSwnSElTVE9SWV9CQUNLJzonSElTVE9SWV9CQUNLJ30sJ2Fkdic6eydzaG93UmV3YXJkZWRWaWRlbyc6XzB4NGJhOGE1PT57dmFyIF8weDQyOTBjMz1fMHgzMmJiMjcsXzB4MjUzZGNjPXsnVElIamInOmZ1bmN0aW9uKF8weDk3NjJmNSl7cmV0dXJuIF8weDk3NjJmNSgpO30sJ2lURFNNJzpmdW5jdGlvbihfMHg1OTY5MzQsXzB4MTM0N2IyLF8weDE2MDYxYyxfMHgxMjc2NzcsXzB4MjRkMzQyLF8weGQ3ZjhlNyxfMHgyMmFmM2Mpe3JldHVybiBfMHg1OTY5MzQoXzB4MTM0N2IyLF8weDE2MDYxYyxfMHgxMjc2NzcsXzB4MjRkMzQyLF8weGQ3ZjhlNyxfMHgyMmFmM2MpO30sJ1lYdmdxJzpmdW5jdGlvbihfMHgzNjgxNzUsXzB4MzViMDY3KXtyZXR1cm4gXzB4MzY4MTc1Xl8weDM1YjA2Nzt9LCduYlFQTCc6ZnVuY3Rpb24oXzB4MmEwYmMyLF8weDI0NDkxZCl7cmV0dXJuIF8weDJhMGJjMnxfMHgyNDQ5MWQ7fSwnaExEQVUnOmZ1bmN0aW9uKF8weGExZjAxMixfMHgyYTNiZGMpe3JldHVybiBfMHhhMWYwMTI8PF8weDJhM2JkYzt9LCdrQXlnRic6ZnVuY3Rpb24oXzB4NWUzNTg3LF8weDFlODViYSl7cmV0dXJuIF8weDVlMzU4Nz4+Pl8weDFlODViYTt9LCdlU0picyc6J2RRSGliJywnYkNVYWsnOl8weDQyOTBjMygweDNlMywnT1M2JScpLCdBeXJXZyc6ZnVuY3Rpb24oXzB4NDI4NzU4LF8weGI0MjY0Myl7cmV0dXJuIF8weDQyODc1OCYmXzB4YjQyNjQzO30sJ2Z3WWxlJzpmdW5jdGlvbihfMHhlZWI5NjMsXzB4M2M5MWYwKXtyZXR1cm4gXzB4ZWViOTYzPj1fMHgzYzkxZjA7fSwnR0ZQWnEnOmZ1bmN0aW9uKF8weDQ3ZWRjMyxfMHgxMDExNjIpe3JldHVybiBfMHg0N2VkYzMoXzB4MTAxMTYyKTt9LCdCWnFydic6ZnVuY3Rpb24oXzB4MTRlZjQwLF8weDEyNTM4NixfMHgzMmI0ODUpe3JldHVybiBfMHgxNGVmNDAoXzB4MTI1Mzg2LF8weDMyYjQ4NSk7fSwnYVNUSk4nOmZ1bmN0aW9uKF8weDM1MmMxZCxfMHgxZDNhOGUpe3JldHVybiBfMHgzNTJjMWQoXzB4MWQzYThlKTt9fTtyZXR1cm4gbmV3IFByb21pc2UoKF8weGRjNTA3ZCxfMHhlYzVjZjQpPT57dmFyIF8weGU5MDhiMj1fMHg0MjkwYzMsXzB4MzM1YjA0PXsnd2RqSFUnOmZ1bmN0aW9uKF8weDQ1ZGQ4YyxfMHg0Zjc3ZDUpe3ZhciBfMHgzZjhhOTA9XzB4M2Q3ODtyZXR1cm4gXzB4MjUzZGNjW18weDNmOGE5MCgweDJmMiwnaVMjMCcpXShfMHg0NWRkOGMsXzB4NGY3N2Q1KTt9LCdaTHhtUyc6ZnVuY3Rpb24oXzB4MzViZTQzLF8weDU5NDk4Nyl7cmV0dXJuIF8weDI1M2RjY1sna0F5Z0YnXShfMHgzNWJlNDMsXzB4NTk0OTg3KTt9LCdIWGVZbyc6ZnVuY3Rpb24oXzB4NGM4MjJhLF8weDEzZmM2MSl7cmV0dXJuIF8weDRjODIyYS1fMHgxM2ZjNjE7fSwnbkNkZ3MnOmZ1bmN0aW9uKF8weDI3MzNiYixfMHg0NjVmNWMpe3JldHVybiBfMHgyNzMzYmIhPT1fMHg0NjVmNWM7fSwnYmJEU1knOl8weDI1M2RjY1tfMHhlOTA4YjIoMHgzMDksJ1ZhSXAnKV19O2lmKF8weDI1M2RjY1snYkNVYWsnXSE9PV8weGU5MDhiMigweDJlYiwnaFBwJicpKV8weDI1M2RjY1snQXlyV2cnXShfMHg0YmE4YTUsIWlzRm5UaW1lb3V0KSYmKF8weDI1M2RjY1tfMHhlOTA4YjIoMHgyZTksJ0s3Qk0nKV0od2luZG93WydvbkNsb3NlVGltZW91dCddLDB4N2QwKSYmKF8weDI1M2RjY1snR0ZQWnEnXShzaG93UG9wVXBBZHYsd2luZG93WydvbkNsb3NlVGltZW91dCddKSxpc1BvcFVwQWR2U2hvd249ITB4MCksaXNGblRpbWVvdXQ9ITB4MCxfMHg0YmE4YTVbXzB4ZTkwOGIyKDB4MjM2LCdAKTVNJyldW18weGU5MDhiMigweDFkYiwnT1M2JScpXSYmXzB4MjUzZGNjW18weGU5MDhiMigweDMzOCwnN3pRMycpXShzZXRUaW1lb3V0LCgpPT57dmFyIF8weDQ4Yzc3MT1fMHhlOTA4YjI7XzB4NGJhOGE1W18weDQ4Yzc3MSgweDI2YiwnY2xWVScpXVsnb25PcGVuJ10oKTt9LHdpbmRvd1snb25PcGVuVGltZW91dCddfHwweDY0KSxfMHg0YmE4YTVbXzB4ZTkwOGIyKDB4MjQ1LCd3dXV6JyldW18weGU5MDhiMigweDNlOCwnc0VdJicpXSYmXzB4MjUzZGNjW18weGU5MDhiMigweDNjZiwnVmFJcCcpXShzZXRUaW1lb3V0LCgpPT57dmFyIF8weDQ4ZTgzZj1fMHhlOTA4YjI7aWYoXzB4MzM1YjA0W18weDQ4ZTgzZigweDNkZCwnXnRyQicpXShfMHg0OGU4M2YoMHgzMDEsJ3VMN2knKSxfMHgzMzViMDRbJ2JiRFNZJ10pKV8weDRiYThhNVtfMHg0OGU4M2YoMHgyMzYsJ0ApNU0nKV1bXzB4NDhlODNmKDB4MzU0LCdUOExCJyldKCk7ZWxzZSByZXR1cm4gXzB4MzM1YjA0Wyd3ZGpIVSddKF8weDU4NjMwNixfMHgxYjhjNzgpfF8weDMzNWIwNFsnWkx4bVMnXShfMHg0OGRlYjAsXzB4MzM1YjA0WydIWGVZbyddKDB4MjAsXzB4MTc1YzBmKSk7fSx3aW5kb3dbXzB4ZTkwOGIyKDB4MjRiLCdGWVZVJyldfHwweGM4KSxfMHg0YmE4YTVbXzB4ZTkwOGIyKDB4MmMzLCdHYkIoJyldW18weGU5MDhiMigweDNkMiwnb0p5VycpXSYmXzB4MjUzZGNjW18weGU5MDhiMigweDMyYiwnWGgjJCcpXShzZXRUaW1lb3V0LCgpPT57dmFyIF8weDJkZmNhND1fMHhlOTA4YjI7XzB4NGJhOGE1WydjYWxsYmFja3MnXVsnb25DbG9zZSddKCksaXNGblRpbWVvdXQ9ITB4MSxpc1BvcFVwQWR2U2hvd24mJihpc1BvcFVwQWR2U2hvd249ITB4MSxfMHgyNTNkY2NbXzB4MmRmY2E0KDB4M2NhLCd2QmhhJyldKGhpZGVQb3BVcEFkdikpO30sd2luZG93W18weGU5MDhiMigweDM5ZCwnY0RvQCcpXXx8MHgxZjQpKSxfMHgyNTNkY2NbXzB4ZTkwOGIyKDB4Mjk4LCd6bXp0JyldKF8weGRjNTA3ZCwnb2snKTtlbHNlIHJldHVybiBfMHgyNTNkY2NbXzB4ZTkwOGIyKDB4MjJlLCd1TDdpJyldKF8weDIzYjM1ZCxfMHgyNTNkY2NbXzB4ZTkwOGIyKDB4Mzg4LCdRM1ZeJyldKF8weDNhZmM0MSxfMHgyNTNkY2NbJ25iUVBMJ10oXzB4MjNiNWJiLH5fMHgzOTY0YjcpKSxfMHg5NzVkNzQsXzB4MTY3MmJhLF8weDQ2MDM4ZSxfMHg0MTllZWEsXzB4NGRmZTc5KTt9KTt9LCdzaG93RnVsbHNjcmVlbkFkdic6XzB4MWNiZTEyPT57dmFyIF8weDQ5Zjg5Yj1fMHgzMmJiMjcsXzB4MWFhY2IyPXsnYVlUbW8nOl8weDQ5Zjg5YigweDMwYiwndFNFJicpLCdxUHd0cyc6ZnVuY3Rpb24oXzB4NTQ0ZTczLF8weDI2ZjlhOSxfMHg0Y2U4OWQpe3JldHVybiBfMHg1NDRlNzMoXzB4MjZmOWE5LF8weDRjZTg5ZCk7fSwnTmpITHcnOmZ1bmN0aW9uKF8weDQyMzEzNyxfMHg1ZGNmNzgpe3JldHVybiBfMHg0MjMxMzcoXzB4NWRjZjc4KTt9fTtyZXR1cm4gbmV3IFByb21pc2UoKF8weDNiYTRmOCxfMHgyMWUxM2IpPT57dmFyIF8weDFlMmI0OT1fMHg0OWY4OWI7XzB4MWNiZTEyJiYoXzB4MWNiZTEyWydjYWxsYmFja3MnXVtfMHgxZTJiNDkoMHgzZTQsJ2lTIzAnKV0mJl8weDFhYWNiMltfMHgxZTJiNDkoMHgzNjEsJ2hQcCYnKV0oc2V0VGltZW91dCwoKT0+e3ZhciBfMHhmODEwOTA9XzB4MWUyYjQ5O2lmKF8weDFhYWNiMltfMHhmODEwOTAoMHgzNGUsJ2hQcCYnKV09PT1fMHgxYWFjYjJbJ2FZVG1vJ10pXzB4MWNiZTEyW18weGY4MTA5MCgweDJjMywnR2JCKCcpXVtfMHhmODEwOTAoMHgyNmMsJ3E3eGknKV0oKTtlbHNle2lmKC8oaXBhZHx0YWJsZXR8KGFuZHJvaWQoPyEuKm1vYmlsZSkpfCh3aW5kb3dzKD8hLipwaG9uZSkoLip0b3VjaCkpfGtpbmRsZXxwbGF5Ym9va3xzaWxrfChwdWZmaW4oPyEuKihJUHxBUHxXUCkpKSkvW18weGY4MTA5MCgweDFiZSwnb2hyRScpXShfMHgyMzJiNTNbXzB4ZjgxMDkwKDB4MzM0LCdYaCMkJyldKDB4MCwweDQpKSlfMHgzODY2M2U9ISFbXTt9fSx3aW5kb3dbXzB4MWUyYjQ5KDB4MWUzLCd1TDdpJyldfHwweDY0KSxfMHgxY2JlMTJbXzB4MWUyYjQ5KDB4MzQzLCdpUyMwJyldWydvbkNsb3NlJ10mJl8weDFhYWNiMltfMHgxZTJiNDkoMHgyMTYsJ2Znc3onKV0oc2V0VGltZW91dCwoKT0+e3ZhciBfMHgxZDVlNzg9XzB4MWUyYjQ5O18weDFjYmUxMltfMHgxZDVlNzgoMHgzMWUsJ0Y3cHEnKV1bJ29uQ2xvc2UnXSghMHgwKTt9LHdpbmRvd1snb25DbG9zZVRpbWVvdXRGdWxsQWR2J118fDB4YzgpKSxfMHgxYWFjYjJbJ05qSEx3J10oXzB4M2JhNGY4LCdvaycpO30pO30sJ3Nob3dCYW5uZXJBZHYnOl8weDFiYWU1Nj0+e3ZhciBfMHg0OWYyZjY9eyd4ZG5DSic6ZnVuY3Rpb24oXzB4NDIyMGJjLF8weDI3OGU3MCl7cmV0dXJuIF8weDQyMjBiYyhfMHgyNzhlNzApO319O3JldHVybiBuZXcgUHJvbWlzZSgoXzB4NDVjZDViLF8weDUzNWEwNCk9Pnt2YXIgXzB4MTI2OTEyPV8weDNkNzg7XzB4NDlmMmY2W18weDEyNjkxMigweDI0ZiwnJEFiQycpXShfMHg0NWNkNWIsW10pO30pO30sJ2hpZGVCYW5uZXJBZHYnOigpPT57dmFyIF8weGJkZTQyZT17J2lmRERyJzpmdW5jdGlvbihfMHgxMDA2NGQsXzB4MTAxYmNmKXtyZXR1cm4gXzB4MTAwNjRkKF8weDEwMWJjZik7fX07cmV0dXJuIG5ldyBQcm9taXNlKChfMHgxNzI4ZmEsXzB4NTBjNDBjKT0+e18weGJkZTQyZVsnaWZERHInXShfMHgxNzI4ZmEsW10pO30pO30sJ2dldEJhbm5lckFkdlN0YXR1cyc6KCk9PntyZXR1cm4gbmV3IFByb21pc2UoKF8weDVkNjFjYSxfMHg4MWVkNCk9PntfMHg1ZDYxY2EoeydzdGlja3lBZHZJc1Nob3dpbmcnOiFbXX0pO30pO319LCdhdXRoJzp7J29wZW5BdXRoRGlhbG9nJzooKT0+e3ZhciBfMHgyZjE4ODk9XzB4MzJiYjI3LF8weDVhZTVhMz17J0VwSFhBJzpfMHgyZjE4ODkoMHgzNTAsJyRBYkMnKSwnVHF1U28nOidsZWFkZXJib2FyZHMuc2V0TGVhZGVyYm9hcmRTY29yZScsJ2hVS0JuJzpfMHgyZjE4ODkoMHgyNDgsJ3dIYVknKSwnc1ZVYWEnOmZ1bmN0aW9uKF8weDQ2ZjBkOSxfMHg1YmUyZTIpe3JldHVybiBfMHg0NmYwZDk9PT1fMHg1YmUyZTI7fSwnbnJXYnInOl8weDJmMTg4OSgweDI5ZSwnMmpATicpfTtyZXR1cm4gbmV3IFByb21pc2UoKF8weDE1MDRiNyxfMHgyNzliZWYpPT57dmFyIF8weDJlNTAwZj1fMHgyZjE4ODksXzB4YTk3YjRhPXsnb2lwTkQnOmZ1bmN0aW9uKF8weDc3NDEyMixfMHg1YTE2ZTgpe3JldHVybiBfMHg3NzQxMjIoXzB4NWExNmU4KTt9LCdoaEJJRyc6XzB4NWFlNWEzW18weDJlNTAwZigweDM1OSwnWGgjJCcpXSwnY2lmT0onOl8weDVhZTVhM1snVHF1U28nXSwncExMdEgnOl8weDVhZTVhM1tfMHgyZTUwMGYoMHgyNmQsJzNTIUgnKV19O18weDVhZTVhM1tfMHgyZTUwMGYoMHgyZmIsJ29RYWQnKV0oJ1lKWWxBJyxfMHg1YWU1YTNbJ25yV2JyJ10pP18weDI3OWJlZihbXSk6XzB4YTk3YjRhWydvaXBORCddKF8weDMxZTNkOSxbXzB4YTk3YjRhWydoaEJJRyddLF8weDJlNTAwZigweDNkNiwnQ2RedycpLF8weGE5N2I0YVtfMHgyZTUwMGYoMHgxZjIsJ3d1dXonKV0sXzB4YTk3YjRhWydwTEx0SCddXVtfMHgyZTUwMGYoMHgzMWMsJ3RTRSYnKV0oXzB4MmY5ZTk5KSk7fSk7fX0sJ2dldFBsYXllcic6KCk9Pnt2YXIgXzB4MmJkNTE1PV8weDMyYmIyNyxfMHgxNzlkMGI9eydQZ3d5cic6XzB4MmJkNTE1KDB4MWNkLCdxN3hpJyksJ0pmcXVhJzpmdW5jdGlvbihfMHgzMDFlNmMsXzB4M2VjYjU5KXtyZXR1cm4gXzB4MzAxZTZjIT09XzB4M2VjYjU5O30sJ1lBTGNBJzpfMHgyYmQ1MTUoMHgzNGYsJ3dIYVknKSwnellMak8nOmZ1bmN0aW9uKF8weDExY2ZjNixfMHgzNjlmMTIpe3JldHVybiBfMHgxMWNmYzYoXzB4MzY5ZjEyKTt9fTtyZXR1cm4gbmV3IFByb21pc2UoKF8weDI4N2E1ZixfMHg0OGNjMGIpPT57dmFyIF8weDNhZjJmMj1fMHgyYmQ1MTU7XzB4MTc5ZDBiWydKZnF1YSddKCdzblhTVScsXzB4MTc5ZDBiW18weDNhZjJmMigweDNiNywnKWwocycpXSk/XzB4MTc5ZDBiWyd6WUxqTyddKF8weDI4N2E1ZixfcGxheWVyKTpfMHgxNzkxYzI9XzB4MWI5YjRmW18weDNhZjJmMigweDJiNSwnQCk1TScpXShfMHgxNzlkMGJbJ1Bnd3lyJ10pO30pO30sJ2dldFBheW1lbnRzJzooKT0+e3ZhciBfMHg4ZWU1NzA9eydXZ0RPZyc6ZnVuY3Rpb24oXzB4ZDIxNGI1LF8weDI1MjkwZSl7cmV0dXJuIF8weGQyMTRiNShfMHgyNTI5MGUpO319O3JldHVybiBuZXcgUHJvbWlzZSgoXzB4MWU4ODViLF8weDUzOTVjZCk9Pnt2YXIgXzB4NTZhMjVjPV8weDNkNzg7XzB4OGVlNTcwW18weDU2YTI1YygweDFkMywnR2JCKCcpXShfMHgxZTg4NWIsX3BheW1lbnRzKTt9KTt9LCdnZXRMZWFkZXJib2FyZHMnOigpPT57dmFyIF8weGNiNWQ1PXsncUFES0gnOmZ1bmN0aW9uKF8weDMxNzhjMCxfMHg1OWExMDUpe3JldHVybiBfMHgzMTc4YzA9PT1fMHg1OWExMDU7fSwncllaU3EnOidGRENQcScsJ21WS3JXJzpmdW5jdGlvbihfMHhlYTE4NzQsXzB4MTg3MWM5KXtyZXR1cm4gXzB4ZWExODc0KF8weDE4NzFjOSk7fX07cmV0dXJuIG5ldyBQcm9taXNlKChfMHgzN2Y4ODcsXzB4MmZlZDA0KT0+e3ZhciBfMHgzMmU2YmI9XzB4M2Q3OCxfMHgzNmVlM2Y9eydPdnNvWic6ZnVuY3Rpb24oXzB4NGExMmM2LF8weDcxZTIwMCl7cmV0dXJuIF8weDRhMTJjNihfMHg3MWUyMDApO30sJ1dXRnB4JzpmdW5jdGlvbihfMHhjODYzMCxfMHgxMmNlYjgsXzB4MzMxMjYwKXtyZXR1cm4gXzB4Yzg2MzAoXzB4MTJjZWI4LF8weDMzMTI2MCk7fSwnVHZYV1QnOmZ1bmN0aW9uKF8weDQ1YzU2NixfMHgzZTZlMWUpe3JldHVybiBfMHg0NWM1NjYqXzB4M2U2ZTFlO319O2lmKF8weGNiNWQ1W18weDMyZTZiYigweDFjMiwnWl13bScpXShfMHhjYjVkNVsncllaU3EnXSxfMHhjYjVkNVtfMHgzMmU2YmIoMHgyYWEsJ1ZhSXAnKV0pKV8weGNiNWQ1W18weDMyZTZiYigweDJkNiwnQ2RedycpXShfMHgzN2Y4ODcsX2xlYWRlcmJvYXJkKTtlbHNle3ZhciBfMHg0Mjg5YmM9XzB4MzZlZTNmW18weDMyZTZiYigweDNmMSwnaVM1UScpXShfMHg1NmExYWIsXzB4MmUxZjcwKF8weDM2ZWUzZltfMHgzMmU2YmIoMHgzOTMsJ3ZCaGEnKV0oXzB4MzQ4ODgyLF8weDM2ZWUzZlsnT3Zzb1onXShfMHgyMjM5ZDUsXzB4NDdhODY5KSxfMHgzNmVlM2ZbXzB4MzJlNmJiKDB4MmExLCdzRV0mJyldKDB4OCxfMHgyZmJlZDFbJ2xlbmd0aCddKSkpKTtyZXR1cm4gXzB4NDI4OWJjWyd0b0xvd2VyQ2FzZSddKCk7fX0pO30sJ2Vudmlyb25tZW50Jzp7J2kxOG4nOnsnbGFuZyc6KG5hdmlnYXRvcltfMHgzMmJiMjcoMHgzMzksJzhPMWYnKV18fG5hdmlnYXRvcltfMHgzMmJiMjcoMHgxYzYsJ3Z6ZUEnKV0pWydzbGljZSddKDB4MCwweDIpLCd0bGQnOihuYXZpZ2F0b3JbXzB4MzJiYjI3KDB4MzQ2LCdGN3BxJyldfHxuYXZpZ2F0b3JbJ3VzZXJMYW5ndWFnZSddKVtfMHgzMmJiMjcoMHgzMDUsJ0Y3cHEnKV0oMHgwLDB4Mil9LCdhcHAnOnsnaWQnOl8weDMyYmIyNygweDNkNSwncTd4aScpfSwnYnJvd3Nlcic6eydsYW5nJzoobmF2aWdhdG9yW18weDMyYmIyNygweDM2NSwnUTNWXicpXXx8bmF2aWdhdG9yWyd1c2VyTGFuZ3VhZ2UnXSlbJ3NsaWNlJ10oMHgwLDB4Mil9LCdkYXRhJzp7J2Jhc2VVcmwnOl8weDMyYmIyNygweDIyNiwnRlJMbicpLCdzZWNvbmREb21haW4nOl8weDMyYmIyNygweDNlYSwnUTNWXicpfX0sJ2ZlYXR1cmVzJzp7J0xvYWRpbmdBUEknOm5ldyBMb2FkaW5nQVBJKHsnR2FtZUluaXQnOl8weDMyYmIyNygweDJiOCwnRlJMbicpLCdHYW1lUmVhZHknOl8weDMyYmIyNygweDMzMiwnem16dCcpLCdHYW1lUmVhZHlGb3JjZSc6XzB4MzJiYjI3KDB4MjU1LCdoUHAmJyksJ0lmcmFtZUFkZGVkJzpfMHgzMmJiMjcoMHgzOGEsJ0BmSkYnKSwnSWZyYW1lTG9hZGVkJzpfMHgzMmJiMjcoMHgyM2YsJ1hoIyQnKSwnU2NyaXB0SW5pdCc6XzB4MzJiYjI3KDB4MzZkLCdtNkgoJyksJ1RUSVJlYWR5JzpfMHgzMmJiMjcoMHgyNWEsJ1RIZUcnKX0pfSwnZGV2aWNlSW5mbyc6eydpc01vYmlsZSc6KCk9Pm1vYmlsZUNoZWNrKCksJ2lzVGFibGV0JzooKT0+dGFibGV0Q2hlY2soKSwnaXNEZXNrdG9wJzooKT0+ZGVza3RvcENoZWNrKCksJ3R5cGUnOmRldmljZVR5cGVDaGVjaygpLCdpc1RWJzooKT0+e3JldHVybiEweDE7fX0sJ2dldFN0b3JhZ2UnOl8weDQyNjRiMT0+e3ZhciBfMHgxOWFmZWM9XzB4MzJiYjI3LF8weDVkYWVjYz17J0x6TGNoJzpmdW5jdGlvbihfMHgyMTY3NzMsXzB4MTBlNDRiLF8weDJiNDdkYil7cmV0dXJuIF8weDIxNjc3MyhfMHgxMGU0NGIsXzB4MmI0N2RiKTt9LCdLbUlNQyc6XzB4MTlhZmVjKDB4MmVmLCd2emVBJyksJ0RZeEVnJzpmdW5jdGlvbihfMHgyYTAwMDIsXzB4NDJiYzNiKXtyZXR1cm4gXzB4MmEwMDAyKF8weDQyYmMzYik7fSwnTWRJR2UnOmZ1bmN0aW9uKF8weDI5YzZhMil7cmV0dXJuIF8weDI5YzZhMigpO319O3JldHVybiBuZXcgUHJvbWlzZSgoXzB4Mzg1YmI2LF8weDM3NGJhMyk9Pnt2YXIgXzB4NzhhZTljPV8weDE5YWZlYztfMHg3OGFlOWMoMHgyOTUsJ3Z6ZUEnKT09PV8weDVkYWVjY1tfMHg3OGFlOWMoMHgxZWMsJ2lTIzAnKV0/dGhpc1tfMHg3OGFlOWMoMHgyYWUsJ2hQcCYnKV09XzB4NWRhZWNjW18weDc4YWU5YygweDFkOSwnb1FhZCcpXShfMHgyZGM5YTAsKCk9Pnt2YXIgXzB4MmZjYWYwPV8weDc4YWU5Yzt0aGlzW18weDJmY2FmMCgweDNlZiwndUw3aScpXT0hMHgwLHRoaXNbXzB4MmZjYWYwKDB4MzU3LCcmaFBmJyldKHRoaXNbJ2hyJ10sdGhpc1sncHInXVsnR2FtZVJlYWR5Rm9yY2UnXSk7fSx0aGlzWydociddKTpfMHg1ZGFlY2NbJ0RZeEVnJ10oXzB4Mzg1YmI2LF8weDVkYWVjY1tfMHg3OGFlOWMoMHgyNGMsJ2lTIzAnKV0oTikpO30pO30sJ2ZlZWRiYWNrJzp7J2NhblJldmlldyc6KCk9Pnt2YXIgXzB4MmRmYTZhPXsnT0duR0cnOmZ1bmN0aW9uKF8weDE0ZjI5OCxfMHgzYzZmZjApe3JldHVybiBfMHgxNGYyOTgoXzB4M2M2ZmYwKTt9fTtyZXR1cm4gbmV3IFByb21pc2UoKF8weDQ5MTVmMyxfMHgxNDU5ZWEpPT57dmFyIF8weDM0M2RhND1fMHgzZDc4O18weDJkZmE2YVtfMHgzNDNkYTQoMHgyMGUsJyRBYkMnKV0oXzB4NDkxNWYzLHsndmFsdWUnOiEweDEsJ3JlYXNvbic6dW5kZWZpbmVkfSk7fSk7fSwncmVxdWVzdFJldmlldyc6KCk9Pnt9fSwnc2hvcnRjdXQnOnsnY2FuU2hvd1Byb21wdCc6KCk9Pnt2YXIgXzB4NWMwMDdjPV8weDMyYmIyNyxfMHgzNTU1ZTA9eydycnRyYyc6ZnVuY3Rpb24oXzB4NWVjNGJiLF8weDI4YjFiNCl7cmV0dXJuIF8weDVlYzRiYj09PV8weDI4YjFiNDt9LCdCbUFpcic6XzB4NWMwMDdjKDB4MjlmLCdLY2VeJyksJ0tidUJYJzpmdW5jdGlvbihfMHg0OTZlYjgsXzB4NTY2NTA0KXtyZXR1cm4gXzB4NDk2ZWI4KF8weDU2NjUwNCk7fX07cmV0dXJuIG5ldyBQcm9taXNlKChfMHgzNDJmZWQsXzB4NGM1ZWU5KT0+e3ZhciBfMHhiNDljNmU9XzB4NWMwMDdjO18weDM1NTVlMFtfMHhiNDljNmUoMHgyYjAsJ2Znc3onKV0oXzB4MzU1NWUwWydCbUFpciddLF8weDM1NTVlMFtfMHhiNDljNmUoMHgxZTEsJ2hQcCYnKV0pP18weDM1NTVlMFtfMHhiNDljNmUoMHgzMjksJ0BmSkYnKV0oXzB4MzQyZmVkLHsnY2FuU2hvdyc6ITB4MX0pOl8weDU3ZDZjZChfMHgxZWNlOTIpO30pO319LCdpc0F2YWlsYWJsZU1ldGhvZCc6XzB4Mjk4MjY0PT57dmFyIF8weDM2YzRhOT1fMHgzMmJiMjcsXzB4Mjc5YTQ4PXsnTk9JZnknOidsb2NhbC1zdG9yYWdlJywnVlhVQVQnOmZ1bmN0aW9uKF8weDNjY2IyYixfMHg1NDAwY2Upe3JldHVybiBfMHgzY2NiMmI9PT1fMHg1NDAwY2U7fSwnSVpRcFAnOl8weDM2YzRhOSgweDMzMCwnSUomIycpLCdJelJ1eic6XzB4MzZjNGE5KDB4MmM5LCdRM1ZeJyksJ2JaZ0pwJzondmRkd2cnLCdhVHNLSic6J1ZDTnVYJywnZ2pmenEnOmZ1bmN0aW9uKF8weDVhNTViMSxfMHgxZDZhNDUpe3JldHVybiBfMHg1YTU1YjEoXzB4MWQ2YTQ1KTt9LCdBem5vQSc6XzB4MzZjNGE5KDB4MmVjLCdmZ3N6JyksJ0V1YlFYJzpfMHgzNmM0YTkoMHg0MDMsJ2NsVlUnKX07cmV0dXJuIG5ldyBQcm9taXNlKChfMHgzZTViNjEsXzB4NTRhN2JkKT0+e3ZhciBfMHgyMjU4ZWQ9XzB4MzZjNGE5O2lmKF8weDI3OWE0OFsnYlpnSnAnXSE9PV8weDI3OWE0OFtfMHgyMjU4ZWQoMHgzNGIsJ1ZiSlInKV0pXzB4Mjc5YTQ4WydnamZ6cSddKF8weDNlNWI2MSxbXzB4Mjc5YTQ4W18weDIyNThlZCgweDMxNCwnRllWVScpXSxfMHgyMjU4ZWQoMHgyMmQsJ3Z6ZUEnKSxfMHgyNzlhNDhbXzB4MjI1OGVkKDB4MWQ3LCd3SGFZJyldLF8weDIyNThlZCgweDIxMywnM1MhSCcpXVsnaW5jbHVkZXMnXShfMHgyOTgyNjQpKTtlbHNle3ZhciBfMHgyOTE4NDE9eydyYW5Xdic6XzB4Mjc5YTQ4WydOT0lmeSddLCdFWXdMWSc6ZnVuY3Rpb24oXzB4NDVmNmQ3LF8weDE1ODE2NSl7cmV0dXJuIF8weDI3OWE0OFsnVlhVQVQnXShfMHg0NWY2ZDcsXzB4MTU4MTY1KTt9LCdpZ054USc6XzB4Mjc5YTQ4WydJWlFwUCddLCdGRlVXVCc6XzB4Mjc5YTQ4WydJelJ1eiddfTtpZihfMHgyZmZkNDVbXzB4MjI1OGVkKDB4MWMwLCdJSiYjJyldKXJldHVybiBfMHgzZTVhMmJbJ29ubG9hZFByb21pc2VfJ107Y29uc3QgXzB4MjY5YmRmPV8weGUzZDdiZVtfMHgyMjU4ZWQoMHgxY2YsJ2NEb0AnKV0oKTtyZXR1cm4gXzB4MjY5YmRmPyhfMHgzMTI5NjlbXzB4MjI1OGVkKDB4M2FkLCdvaHJFJyldPW5ldyBfMHgyMWJjNTYoXzB4ODllYzQ1PT57dmFyIF8weDMxNWE2Mj1fMHgyMjU4ZWQsXzB4NTUzMzdjPXsnd0NFZUgnOl8weDI5MTg0MVtfMHgzMTVhNjIoMHgyMjUsJ1EzVl4nKV0sJ2NuaEhzJzpmdW5jdGlvbihfMHgyMTRmNWYsXzB4MmNiMjRlKXtyZXR1cm4gXzB4MjkxODQxWydFWXdMWSddKF8weDIxNGY1ZixfMHgyY2IyNGUpO30sJ0hUQlRKJzonZ2V0LWFsbCcsJ1lrVVljJzpmdW5jdGlvbihfMHg0NWNiZjUsXzB4MzBkOWFhKXtyZXR1cm4gXzB4NDVjYmY1KF8weDMwZDlhYSk7fSwnb3FHaW4nOmZ1bmN0aW9uKF8weDJlNjYwOSxfMHg1ZjU2MDkpe3JldHVybiBfMHgyZTY2MDkoXzB4NWY1NjA5KTt9fTtfMHg0YzZkM2JbJ2FkZEV2ZW50TGlzdGVuZXInXShfMHgyOTE4NDFbXzB4MzE1YTYyKDB4MmZlLCd6bXp0JyldLCh7ZGF0YTp7dHlwZTpfMHgyMWQ5MzMsYWN0aW9uOl8weDExMDBjZixkYXRhOl8weDIwNTIxNH19KT0+e3ZhciBfMHgxZDJhYTA9XzB4MzE1YTYyO2lmKF8weDU1MzM3Y1snd0NFZUgnXT09PV8weDIxZDkzMyYmXzB4NTUzMzdjW18weDFkMmFhMCgweDJkYywnJmhQZicpXShfMHg1NTMzN2NbXzB4MWQyYWEwKDB4Mzk2LCd3dXV6JyldLF8weDExMDBjZikpe2ZvcihsZXQgXzB4MTA4NTk5IGluIF8weDIwNTIxNClfMHgyNjliZGZbJ3NldEl0ZW0nXShfMHgxMDg1OTksXzB4NTUzMzdjW18weDFkMmFhMCgweDMwYSwnQGZKRicpXShfMHgyNWExMzAsXzB4MjA1MjE0W18weDEwODU5OV0pKTtfMHg1NTMzN2NbXzB4MWQyYWEwKDB4MzhjLCdJSiYjJyldKF8weDg5ZWM0NSxfMHgyNjliZGYpO319KSxfMHgxNTAxY2VbJ3BhcmVudCddW18weDMxNWE2MigweDFjMSwnS2NlXicpXSh7J3R5cGUnOl8weDI5MTg0MVtfMHgzMTVhNjIoMHgzMmYsJ0ZZVlUnKV0sJ2FjdGlvbic6J2dldC1hbGwnLCdzb3VyY2UnOl8weDI5MTg0MVtfMHgzMTVhNjIoMHgyMDIsJ0pjc0UnKV19LCcqJyk7fSksXzB4NDZkOTIwWydvbmxvYWRQcm9taXNlXyddKTpfMHg0YjUzNTFbXzB4MjI1OGVkKDB4M2ZhLCdVNXpMJyldKF8weDRkZWM3Yyk7fX0pO30sJ3lhbmRleEFwcCc6eydlbmFibGVkJzohW119LCdvbkV2ZW50JzooXzB4MTUyNWMyLF8weDFlMmVhNik9Pnt2YXIgXzB4MmI2OGY4PV8weDMyYmIyNyxfMHgxMGNmZTA9eydNb2FwTCc6ZnVuY3Rpb24oXzB4MzE1YjU1KXtyZXR1cm4gXzB4MzE1YjU1KCk7fX07XzB4MWUyZWE2JiZfMHgxMGNmZTBbXzB4MmI2OGY4KDB4MzNjLCdDZF53JyldKF8weDFlMmVhNik7fSwnZ2V0RmxhZ3MnOl8weDQ2NmQ2MT0+e3ZhciBfMHg0OGJmNGI9XzB4MzJiYjI3LF8weDQwMWQ0NT17J1R0RG5lJzpfMHg0OGJmNGIoMHgzZjYsJ09TNiUnKSwndURkUGcnOmZ1bmN0aW9uKF8weGNmNzIxOSxfMHg1MmE1MDkpe3JldHVybiBfMHhjZjcyMTkoXzB4NTJhNTA5KTt9fTtjb25zdCBfMHgxNTgxODg9XzB4NDY2ZDYxP18weDQ2NmQ2MVtfMHg0OGJmNGIoMHgyMWEsJ2NsVlUnKV06d2luZG93W18weDQ4YmY0YigweDJkMywnaFBwJicpXXx8e307cmV0dXJuIG5ldyBQcm9taXNlKChfMHgyZjgyM2MsXzB4ZmQwOGM4KT0+e3ZhciBfMHg1YTNkN2Q9XzB4NDhiZjRiO2lmKF8weDVhM2Q3ZCgweDIzNCwnM1MhSCcpIT09XzB4NDAxZDQ1W18weDVhM2Q3ZCgweDNmZSwnc0VdJicpXSlfMHg0MDFkNDVbXzB4NWEzZDdkKDB4MjEwLCdvSnlXJyldKF8weDJmODIzYyxfMHgxNTgxODgpO2Vsc2V7Y29uc3QgXzB4NThmZjI4PV8weDIwZWVkZVsnY3JlYXRlJ10obnVsbCk7Zm9yKGxldCBfMHgyNWZiNDk9MHgwO18weDI1ZmI0OTxfMHg0MmI5ZDZbXzB4NWEzZDdkKDB4MjU2LCdoUHAmJyldO18weDI1ZmI0OSsrKXtjb25zdCBfMHgyYzRlMWE9XzB4ODhlOThkW18weDVhM2Q3ZCgweDJlNCwnZmdzeicpXShfMHgyNWZiNDkpO18weDJjNGUxYSYmKF8weDU4ZmYyOFtfMHgyYzRlMWFdPV8weDM5ZTIxOVsnZ2V0SXRlbSddKF8weDJjNGUxYSkpO319fSk7fX07WWFHYW1lc1snaW5pdCddPSgpPT57dmFyIF8weDQ2N2RjOT1fMHgzMmJiMjcsXzB4NTI4ODc1PXsndGpmbUMnOmZ1bmN0aW9uKF8weDI1MWE0NSxfMHg0ZGE5MTQpe3JldHVybiBfMHgyNTFhNDU9PT1fMHg0ZGE5MTQ7fSwnWENSalMnOl8weDQ2N2RjOSgweDFlZSwnd3V1eicpLCdudWFnSyc6ZnVuY3Rpb24oXzB4MTU5OTk3LF8weDMxNjVjMSl7cmV0dXJuIF8weDE1OTk5NyhfMHgzMTY1YzEpO30sJ1Rvd05XJzpmdW5jdGlvbihfMHg1YTU0NjYsXzB4MmUzYmVlLF8weDM4OTcyMCl7cmV0dXJuIF8weDVhNTQ2NihfMHgyZTNiZWUsXzB4Mzg5NzIwKTt9fTtyZXR1cm4gbmV3IFByb21pc2UoKF8weDFlODhkYixfMHg1ZDU4ZTEpPT57dmFyIF8weDE2ZmEzZD1fMHg0NjdkYzk7bGV0IF8weDEyYzJmOD1fMHg1Mjg4NzVbXzB4MTZmYTNkKDB4M2I1LCdWYUlwJyldKHNldEludGVydmFsLCgpPT57dmFyIF8weDNjNjBkND1fMHgxNmZhM2Q7XzB4NTI4ODc1Wyd0amZtQyddKF8weDUyODg3NVtfMHgzYzYwZDQoMHg0MDYsJ0BvcWwnKV0sZG9jdW1lbnRbXzB4M2M2MGQ0KDB4MmY0LCdjbFZVJyldKSYmKF8weDUyODg3NVtfMHgzYzYwZDQoMHgyNmUsJ0diQignKV0oXzB4MWU4OGRiLF95c2RrKSxjbGVhckludGVydmFsKF8weDEyYzJmOCkpO30sMHg2NCk7fSk7fSxjb25zb2xlW18weDMyYmIyNygweDI5MywgJ1ZiSlInKV0gPSAoKSA9PiB7fTt2YXIgdmVyc2lvbl8gPSAnanNqaWFtaS5jb20udjcnOw==";document.head.appendChild(sdkScript);sdkScript.onload=function(){window["YaGames"].init().then(function(sdk){yandexGames.sdk=sdk;const playerAccountInitializationPromise=sdk.getPlayer({scopes:false}).then(function(playerAccount){if(playerAccount.getMode()!=="lite"){yandexGames.isAuthorized=true}yandexGames.playerAccount=playerAccount}).catch(function(){throw new Error("PlayerAccount failed to initialize.")});const leaderboardInitializationPromise=sdk.getLeaderboards().then(function(leaderboard){yandexGames.leaderboard=leaderboard}).catch(function(){throw new Error("Leaderboard failed to initialize.")});const billingInitializationPromise=sdk.getPayments({signed:true}).then(function(billing){yandexGames.billing=billing}).catch(function(){throw new Error("Billing failed to initialize.")});Promise.allSettled([leaderboardInitializationPromise,playerAccountInitializationPromise,billingInitializationPromise]).then(function(){yandexGames.isInitialized=true;dynCall("v",successCallbackPtr,[])})})}},throwIfSdkNotInitialized:function(){if(!yandexGames.isInitialized){throw new Error("SDK is not initialized. Invoke YandexGamesSdk.Initialize() coroutine and wait for it to finish.")}},gameReady:function(){},invokeErrorCallback:function(error,errorCallbackPtr){var errorMessage;if(error instanceof Error){errorMessage=error.message;if(errorMessage===null){errorMessage="SDK API thrown an error with null message."}if(errorMessage===undefined){errorMessage="SDK API thrown an error with undefined message."}}else if(typeof error==="string"){errorMessage=error}else if(error){errorMessage="SDK API thrown an unexpected type as error: "+JSON.stringify(error)}else if(error===null){errorMessage="SDK API thrown a null as error."}else{errorMessage="SDK API thrown an undefined as error."}const errorUnmanagedStringPtr=yandexGames.allocateUnmanagedString(errorMessage);dynCall("vi",errorCallbackPtr,[errorUnmanagedStringPtr]);_free(errorUnmanagedStringPtr)},invokeErrorCallbackIfNotAuthorized:function(errorCallbackPtr){if(!yandexGames.isAuthorized){yandexGames.invokeErrorCallback(new Error("Needs authorization."),errorCallbackPtr);return true}return false},getYandexGamesSdkEnvironment:function(){const environmentJson=JSON.stringify(yandexGames.sdk.environment);const environmentJsonUnmanagedStringPtr=yandexGames.allocateUnmanagedString(environmentJson);return environmentJsonUnmanagedStringPtr},getDeviceType:function(){const deviceType=yandexGames.sdk.deviceInfo.type;switch(deviceType){case"desktop":return 0;case"mobile":return 1;case"tablet":return 2;case"tv":return 3;default:console.error("Unexpected ysdk.deviceInfo response from Yandex. Assuming that it is desktop. deviceType = "+JSON.stringify(deviceType));return 0}},playerAccountStartAuthorizationPolling:function(delay,successCallbackPtr,errorCallbackPtr){if(yandexGames.isAuthorized){console.error("Already authorized.");dynCall("v",errorCallbackPtr,[]);return}function authorizationPollingLoop(){if(yandexGames.isAuthorized){dynCall("v",successCallbackPtr,[]);return}yandexGames.sdk.getPlayer({scopes:false}).then(function(playerAccount){if(playerAccount.getMode()!=="lite"){yandexGames.isAuthorized=true;yandexGames.playerAccount=playerAccount;dynCall("v",successCallbackPtr,[])}else{setTimeout(authorizationPollingLoop,delay)}})}authorizationPollingLoop()},playerAccountAuthorize:function(successCallbackPtr,errorCallbackPtr){if(yandexGames.isAuthorized){console.error("Already authorized.");dynCall("v",successCallbackPtr,[]);return}yandexGames.sdk.auth.openAuthDialog().then(function(){yandexGames.sdk.getPlayer({scopes:false}).then(function(playerAccount){yandexGames.isAuthorized=true;yandexGames.playerAccount=playerAccount;dynCall("v",successCallbackPtr,[])}).catch(function(error){console.error("authorize failed to update playerAccount. Assuming authorization failed. Error was: "+error.message);yandexGames.invokeErrorCallback(error,errorCallbackPtr)})}).catch(function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)})},getPlayerAccountHasPersonalProfileDataPermission:function(){var publicNamePermission=undefined;if("_personalInfo"in yandexGames.playerAccount&&"scopePermissions"in yandexGames.playerAccount._personalInfo){publicNamePermission=yandexGames.playerAccount._personalInfo.scopePermissions.public_name}switch(publicNamePermission){case"forbid":return false;case"not_set":return false;case"allow":return true;default:console.error("Unexpected response from Yandex. Assuming profile data permissions were not granted. playerAccount = "+JSON.stringify(yandexGames.playerAccount));return false}},playerAccountRequestPersonalProfileDataPermission:function(successCallbackPtr,errorCallbackPtr){yandexGames.sdk.getPlayer({scopes:true}).then(function(playerAccount){yandexGames.playerAccount=playerAccount;if(yandexGames.getPlayerAccountHasPersonalProfileDataPermission()){dynCall("v",successCallbackPtr,[])}else{yandexGames.invokeErrorCallback(new Error("User has refused the permission request."),errorCallbackPtr)}}).catch(function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)})},playerAccountGetProfileData:function(successCallbackPtr,errorCallbackPtr,pictureSize){yandexGames.sdk.getPlayer({scopes:false}).then(function(playerAccount){yandexGames.playerAccount=playerAccount;playerAccount._personalInfo.profilePicture=playerAccount.getPhoto(pictureSize);const profileDataJson=JSON.stringify(playerAccount._personalInfo);const profileDataUnmanagedStringPtr=yandexGames.allocateUnmanagedString(profileDataJson);dynCall("vi",successCallbackPtr,[profileDataUnmanagedStringPtr]);_free(profileDataUnmanagedStringPtr)}).catch(function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)})},playerAccountGetCloudSaveData:function(successCallbackPtr,errorCallbackPtr){yandexGames.playerAccount.getData().then(function(сloudSaveData){const сloudSaveDataUnmanagedStringPtr=yandexGames.allocateUnmanagedString(JSON.stringify(сloudSaveData));dynCall("vi",successCallbackPtr,[сloudSaveDataUnmanagedStringPtr]);_free(сloudSaveDataUnmanagedStringPtr)}).catch(function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)})},playerAccountSetCloudSaveData:function(сloudSaveDataJson,successCallbackPtr,errorCallbackPtr){var сloudSaveData=JSON.parse(сloudSaveDataJson);yandexGames.playerAccount.setData(сloudSaveData,true).then(function(){dynCall("v",successCallbackPtr,[])}).catch(function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)})},interstitialAdShow:function(openCallbackPtr,closeCallbackPtr,errorCallbackPtr,offlineCallbackPtr){yandexGames.sdk.adv.showFullscreenAdv({callbacks:{onOpen:function(){dynCall("v",openCallbackPtr,[])},onClose:function(wasShown){dynCall("vi",closeCallbackPtr,[wasShown])},onError:function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)},onOffline:function(){dynCall("v",offlineCallbackPtr,[])}}})},videoAdShow:function(openCallbackPtr,rewardedCallbackPtr,closeCallbackPtr,errorCallbackPtr){yandexGames.sdk.adv.showRewardedVideo({callbacks:{onOpen:function(){dynCall("v",openCallbackPtr,[])},onRewarded:function(){dynCall("v",rewardedCallbackPtr,[])},onClose:function(){dynCall("v",closeCallbackPtr,[])},onError:function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)}}})},stickyAdShow:function(){yandexGames.sdk.adv.showBannerAdv()},stickyAdHide:function(){yandexGames.sdk.adv.hideBannerAdv()},leaderboardSetScore:function(leaderboardName,score,successCallbackPtr,errorCallbackPtr,extraData){if(yandexGames.invokeErrorCallbackIfNotAuthorized(errorCallbackPtr)){console.error("leaderboardSetScore requires authorization.");return}yandexGames.leaderboard.setLeaderboardScore(leaderboardName,score,extraData).then(function(){dynCall("v",successCallbackPtr,[])}).catch(function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)})},leaderboardGetEntries:function(leaderboardName,successCallbackPtr,errorCallbackPtr,topPlayersCount,competingPlayersCount,includeSelf,pictureSize){if(yandexGames.invokeErrorCallbackIfNotAuthorized(errorCallbackPtr)){console.error("leaderboardGetEntries requires authorization.");return}yandexGames.leaderboard.getLeaderboardEntries(leaderboardName,{includeUser:includeSelf,quantityAround:competingPlayersCount,quantityTop:topPlayersCount}).then(function(response){response.entries.forEach(function(entry){entry.player.profilePicture=entry.player.getAvatarSrc({size:pictureSize})});const entriesJson=JSON.stringify(response);const entriesUnmanagedStringPtr=yandexGames.allocateUnmanagedString(entriesJson);dynCall("vi",successCallbackPtr,[entriesUnmanagedStringPtr]);_free(entriesUnmanagedStringPtr)}).catch(function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)})},leaderboardGetPlayerEntry:function(leaderboardName,successCallbackPtr,errorCallbackPtr,pictureSize){if(yandexGames.invokeErrorCallbackIfNotAuthorized(errorCallbackPtr)){console.error("leaderboardGetPlayerEntry requires authorization.");return}yandexGames.leaderboard.getLeaderboardPlayerEntry(leaderboardName).then(function(response){response.player.profilePicture=response.player.getAvatarSrc({size:pictureSize});const entryJson=JSON.stringify(response);const entryJsonUnmanagedStringPtr=yandexGames.allocateUnmanagedString(entryJson);dynCall("vi",successCallbackPtr,[entryJsonUnmanagedStringPtr]);_free(entryJsonUnmanagedStringPtr)}).catch(function(error){if(error.code==="LEADERBOARD_PLAYER_NOT_PRESENT"){const nullUnmanagedStringPtr=yandexGames.allocateUnmanagedString("null");dynCall("vi",successCallbackPtr,[nullUnmanagedStringPtr]);_free(nullUnmanagedStringPtr)}else{yandexGames.invokeErrorCallback(error,errorCallbackPtr)}})},billingPurchaseProduct:function(productId,successCallbackPtr,errorCallbackPtr,developerPayload){yandexGames.billing.purchase({id:productId,developerPayload:developerPayload}).then(function(purchaseResponse){purchaseResponse={purchaseData:purchaseResponse.purchaseData,signature:purchaseResponse.signature};const purchasedProductJson=JSON.stringify(purchaseResponse);const purchasedProductJsonUnmanagedStringPtr=yandexGames.allocateUnmanagedString(purchasedProductJson);dynCall("vi",successCallbackPtr,[purchasedProductJsonUnmanagedStringPtr]);_free(purchasedProductJsonUnmanagedStringPtr)}).catch(function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)})},billingConsumeProduct:function(purchasedProductToken,successCallbackPtr,errorCallbackPtr){yandexGames.billing.consumePurchase(purchasedProductToken).then(function(consumedProduct){dynCall("v",successCallbackPtr,[])}).catch(function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)})},billingGetProductCatalog:function(successCallbackPtr,errorCallbackPtr){yandexGames.billing.getCatalog().then(function(productCatalogResponse){productCatalogResponse={products:productCatalogResponse,signature:productCatalogResponse.signature};const productCatalogJson=JSON.stringify(productCatalogResponse);const productCatalogJsonUnmanagedStringPtr=yandexGames.allocateUnmanagedString(productCatalogJson);dynCall("vi",successCallbackPtr,[productCatalogJsonUnmanagedStringPtr]);_free(productCatalogJsonUnmanagedStringPtr)}).catch(function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)})},billingGetPurchasedProducts:function(successCallbackPtr,errorCallbackPtr){yandexGames.billing.getPurchases().then(function(purchasesResponse){purchasesResponse={purchasedProducts:purchasesResponse,signature:purchasesResponse.signature};const purchasedProductsJson=JSON.stringify(purchasesResponse);const purchasedProductsJsonUnmanagedStringPtr=yandexGames.allocateUnmanagedString(purchasedProductsJson);dynCall("vi",successCallbackPtr,[purchasedProductsJsonUnmanagedStringPtr]);_free(purchasedProductsJsonUnmanagedStringPtr)}).catch(function(error){yandexGames.invokeErrorCallback(error,errorCallbackPtr)})},shortcutCanSuggest:function(resultCallbackPtr){yandexGames.sdk.shortcut.canShowPrompt().then(function(prompt){dynCall("vi",resultCallbackPtr,[prompt.canShow])})},shortcutSuggest:function(resultCallbackPtr){yandexGames.sdk.shortcut.showPrompt().then(function(result){dynCall("vi",resultCallbackPtr,[result.outcome==="accepted"])})},reviewPopupCanOpen:function(resultCallbackPtr){yandexGames.sdk.feedback.canReview().then(function(result,reason){if(!reason){reason="No reason"}const reasonUnmanagedStringPtr=yandexGames.allocateUnmanagedString(reason);dynCall("vii",resultCallbackPtr,[result,reasonUnmanagedStringPtr]);_free(reasonUnmanagedStringPtr)})},reviewPopupOpen:function(resultCallbackPtr){yandexGames.sdk.feedback.requestReview().then(function(result){dynCall("vi",resultCallbackPtr,[result])})},allocateUnmanagedString:function(string){const stringBufferSize=lengthBytesUTF8(string)+1;const stringBufferPtr=_malloc(stringBufferSize);stringToUTF8(string,stringBufferPtr,stringBufferSize);return stringBufferPtr}};function _BillingConsumeProduct(purchasedProductTokenPtr,successCallbackPtr,errorCallbackPtr){yandexGames.throwIfSdkNotInitialized();const purchasedProductToken=UTF8ToString(purchasedProductTokenPtr);yandexGames.billingConsumeProduct(purchasedProductToken,successCallbackPtr,errorCallbackPtr)}function _BillingGetProductCatalog(successCallbackPtr,errorCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.billingGetProductCatalog(successCallbackPtr,errorCallbackPtr)}function _BillingGetPurchasedProducts(successCallbackPtr,errorCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.billingGetPurchasedProducts(successCallbackPtr,errorCallbackPtr)}function _BillingPurchaseProduct(productIdPtr,successCallbackPtr,errorCallbackPtr,developerPayloadPtr){yandexGames.throwIfSdkNotInitialized();const productId=UTF8ToString(productIdPtr);var developerPayload=UTF8ToString(developerPayloadPtr);if(developerPayload.length===0){developerPayload=undefined}yandexGames.billingPurchaseProduct(productId,successCallbackPtr,errorCallbackPtr,developerPayload)}function _GetAdBlockEnabled(){return adBlock.getEnabled()}var device={getIsMobile:function(){const isMobileDevice=/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);return isMobileDevice}};function _GetDeviceIsMobile(){return device.getIsMobile()}function _GetJSMemoryInfo(totalJSptr,usedJSptr){if(performance.memory){HEAPF64[totalJSptr>>3]=performance.memory.totalJSHeapSize;HEAPF64[usedJSptr>>3]=performance.memory.usedJSHeapSize}else{HEAPF64[totalJSptr>>3]=NaN;HEAPF64[usedJSptr>>3]=NaN}}function _GetPlayerAccountHasPersonalProfileDataPermission(){yandexGames.throwIfSdkNotInitialized();return yandexGames.getPlayerAccountHasPersonalProfileDataPermission()}function _GetPlayerAccountIsAuthorized(){yandexGames.throwIfSdkNotInitialized();return yandexGames.isAuthorized}function _GetYandexGamesSdkEnvironment(){return yandexGames.getYandexGamesSdkEnvironment()}function _GetYandexGamesSdkIsInitialized(){return yandexGames.isInitialized}function _InterstitialAdShow(openCallbackPtr,closeCallbackPtr,errorCallbackPtr,offlineCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.interstitialAdShow(openCallbackPtr,closeCallbackPtr,errorCallbackPtr,offlineCallbackPtr)}var JS_Accelerometer=null;var JS_Accelerometer_callback=0;function _JS_Accelerometer_IsRunning(){return JS_Accelerometer&&JS_Accelerometer.activated||JS_Accelerometer_callback!=0}var JS_Accelerometer_multiplier=1;var JS_Accelerometer_lastValue={x:0,y:0,z:0};function JS_Accelerometer_eventHandler(){JS_Accelerometer_lastValue={x:JS_Accelerometer.x*JS_Accelerometer_multiplier,y:JS_Accelerometer.y*JS_Accelerometer_multiplier,z:JS_Accelerometer.z*JS_Accelerometer_multiplier};if(JS_Accelerometer_callback!=0)dynCall_vfff(JS_Accelerometer_callback,JS_Accelerometer_lastValue.x,JS_Accelerometer_lastValue.y,JS_Accelerometer_lastValue.z)}var JS_Accelerometer_frequencyRequest=0;var JS_Accelerometer_frequency=0;var JS_LinearAccelerationSensor_callback=0;var JS_GravitySensor_callback=0;var JS_Gyroscope_callback=0;function JS_ComputeGravity(accelerometerValue,linearAccelerationValue){var difference={x:accelerometerValue.x-linearAccelerationValue.x,y:accelerometerValue.y-linearAccelerationValue.y,z:accelerometerValue.z-linearAccelerationValue.z};var differenceMagnitudeSq=difference.x*difference.x+difference.y*difference.y+difference.z*difference.z;var sum={x:accelerometerValue.x+linearAccelerationValue.x,y:accelerometerValue.y+linearAccelerationValue.y,z:accelerometerValue.z+linearAccelerationValue.z};var sumMagnitudeSq=sum.x*sum.x+sum.y*sum.y+sum.z*sum.z;return differenceMagnitudeSq<=sumMagnitudeSq?difference:sum}function JS_DeviceMotion_eventHandler(event){var accelerometerValue={x:event.accelerationIncludingGravity.x*JS_Accelerometer_multiplier,y:event.accelerationIncludingGravity.y*JS_Accelerometer_multiplier,z:event.accelerationIncludingGravity.z*JS_Accelerometer_multiplier};if(JS_Accelerometer_callback!=0)dynCall_vfff(JS_Accelerometer_callback,accelerometerValue.x,accelerometerValue.y,accelerometerValue.z);var linearAccelerationValue={x:event.acceleration.x*JS_Accelerometer_multiplier,y:event.acceleration.y*JS_Accelerometer_multiplier,z:event.acceleration.z*JS_Accelerometer_multiplier};if(JS_LinearAccelerationSensor_callback!=0)dynCall_vfff(JS_LinearAccelerationSensor_callback,linearAccelerationValue.x,linearAccelerationValue.y,linearAccelerationValue.z);if(JS_GravitySensor_callback!=0){var gravityValue=JS_ComputeGravity(accelerometerValue,linearAccelerationValue);dynCall_vfff(JS_GravitySensor_callback,gravityValue.x,gravityValue.y,gravityValue.z)}if(JS_Gyroscope_callback!=0){var degToRad=Math.PI/180;dynCall_vfff(JS_Gyroscope_callback,event.rotationRate.alpha*degToRad,event.rotationRate.beta*degToRad,event.rotationRate.gamma*degToRad)}}var JS_DeviceSensorPermissions=0;function JS_RequestDeviceSensorPermissions(permissions){if(permissions&1){if(typeof DeviceOrientationEvent.requestPermission==="function"){DeviceOrientationEvent.requestPermission().then(function(permissionState){if(permissionState==="granted"){JS_DeviceSensorPermissions&=~1}else{warnOnce("DeviceOrientationEvent permission not granted")}}).catch(function(err){warnOnce(err);JS_DeviceSensorPermissions|=1})}}if(permissions&2){if(typeof DeviceMotionEvent.requestPermission==="function"){DeviceMotionEvent.requestPermission().then(function(permissionState){if(permissionState==="granted"){JS_DeviceSensorPermissions&=~2}else{warnOnce("DeviceMotionEvent permission not granted")}}).catch(function(err){warnOnce(err);JS_DeviceSensorPermissions|=2})}}}function JS_DeviceMotion_add(){if(JS_Accelerometer_callback==0&&JS_LinearAccelerationSensor_callback==0&&JS_GravitySensor_callback==0&&JS_Gyroscope_callback==0){JS_RequestDeviceSensorPermissions(2);window.addEventListener("devicemotion",JS_DeviceMotion_eventHandler)}}function JS_DefineAccelerometerMultiplier(){var g=9.80665;JS_Accelerometer_multiplier=/(iPhone|iPad|Macintosh)/i.test(navigator.userAgent)?1/g:-1/g}function _JS_Accelerometer_Start(callback,frequency){JS_DefineAccelerometerMultiplier();if(typeof Accelerometer==="undefined"){JS_DeviceMotion_add();if(callback!=0)JS_Accelerometer_callback=callback;return}if(callback!=0)JS_Accelerometer_callback=callback;function InitializeAccelerometer(frequency){JS_Accelerometer=new Accelerometer({frequency:frequency,referenceFrame:"device"});JS_Accelerometer.addEventListener("reading",JS_Accelerometer_eventHandler);JS_Accelerometer.addEventListener("error",function(e){warnOnce(e.error?e.error:e)});JS_Accelerometer.start();JS_Accelerometer_frequency=frequency}if(JS_Accelerometer){if(JS_Accelerometer_frequency!=frequency){JS_Accelerometer.stop();JS_Accelerometer.removeEventListener("reading",JS_Accelerometer_eventHandler);InitializeAccelerometer(frequency)}}else if(JS_Accelerometer_frequencyRequest!=0){JS_Accelerometer_frequencyRequest=frequency}else{JS_Accelerometer_frequencyRequest=frequency;navigator.permissions.query({name:"accelerometer"}).then(function(result){if(result.state==="granted"){InitializeAccelerometer(JS_Accelerometer_frequencyRequest)}else{warnOnce("No permission to use Accelerometer.")}JS_Accelerometer_frequencyRequest=0})}}function JS_DeviceMotion_remove(){if(JS_Accelerometer_callback==0&&JS_LinearAccelerationSensor_callback==0&&JS_GravitySensor_callback==0&&JS_Gyroscope_callback==0){window.removeEventListener("devicemotion",JS_DeviceOrientation_eventHandler)}}function _JS_Accelerometer_Stop(){if(JS_Accelerometer){if(typeof GravitySensor!=="undefined"||JS_GravitySensor_callback==0){JS_Accelerometer.stop();JS_Accelerometer.removeEventListener("reading",JS_Accelerometer_eventHandler);JS_Accelerometer=null}JS_Accelerometer_callback=0;JS_Accelerometer_frequency=0}else if(JS_Accelerometer_callback!=0){JS_Accelerometer_callback=0;JS_DeviceMotion_remove()}}function _JS_Cursor_SetImage(ptr,length){var binary="";for(var i=0;i<length;i++)binary+=String.fromCharCode(HEAPU8[ptr+i]);Module.canvas.style.cursor="url(data:image/cur;base64,"+btoa(binary)+"),default"}function _JS_Cursor_SetShow(show){Module.canvas.style.cursor=show?"default":"none"}function jsDomCssEscapeId(id){if(typeof window.CSS!=="undefined"&&typeof window.CSS.escape!=="undefined"){return window.CSS.escape(id)}return id.replace(/(#|\.|\+|\[|\]|\(|\)|\{|\})/g,"\\$1")}function jsCanvasSelector(){var canvasId=Module["canvas"]?Module["canvas"].id:"unity-canvas";return"#"+jsDomCssEscapeId(canvasId)}function _JS_DOM_MapViewportCoordinateToElementLocalCoordinate(viewportX,viewportY,targetX,targetY){var canvas=document.querySelector(jsCanvasSelector());var rect=canvas&&canvas.getBoundingClientRect();HEAPU32[targetX>>2]=viewportX-(rect?rect.left:0);HEAPU32[targetY>>2]=viewportY-(rect?rect.top:0)}function stringToNewUTF8(jsString){var length=lengthBytesUTF8(jsString)+1;var cString=_malloc(length);stringToUTF8(jsString,cString,length);return cString}function _JS_DOM_UnityCanvasSelector(){var canvasSelector=jsCanvasSelector();if(_JS_DOM_UnityCanvasSelector.selector!=canvasSelector){_free(_JS_DOM_UnityCanvasSelector.ptr);_JS_DOM_UnityCanvasSelector.ptr=stringToNewUTF8(canvasSelector);_JS_DOM_UnityCanvasSelector.selector=canvasSelector}return _JS_DOM_UnityCanvasSelector.ptr}function _JS_Eval_OpenURL(ptr){var str=UTF8ToString(ptr);window.open(str,"_blank","")}var fs={numPendingSync:0,syncInternal:1e3,syncInProgress:false,sync:function(onlyPendingSync){if(onlyPendingSync){if(fs.numPendingSync==0)return}else if(fs.syncInProgress){fs.numPendingSync++;return}fs.syncInProgress=true;FS.syncfs(false,function(err){fs.syncInProgress=false});fs.numPendingSync=0}};function _JS_FileSystem_Initialize(){Module.setInterval(function(){fs.sync(true)},fs.syncInternal)}function _JS_FileSystem_Sync(){fs.sync(false)}var JS_GravitySensor=null;function _JS_GravitySensor_IsRunning(){return typeof GravitySensor!=="undefined"?JS_GravitySensor&&JS_GravitySensor.activated:JS_GravitySensor_callback!=0}function JS_GravitySensor_eventHandler(){if(JS_GravitySensor_callback!=0)dynCall_vfff(JS_GravitySensor_callback,JS_GravitySensor.x*JS_Accelerometer_multiplier,JS_GravitySensor.y*JS_Accelerometer_multiplier,JS_GravitySensor.z*JS_Accelerometer_multiplier)}var JS_GravitySensor_frequencyRequest=0;var JS_LinearAccelerationSensor=null;function JS_LinearAccelerationSensor_eventHandler(){var linearAccelerationValue={x:JS_LinearAccelerationSensor.x*JS_Accelerometer_multiplier,y:JS_LinearAccelerationSensor.y*JS_Accelerometer_multiplier,z:JS_LinearAccelerationSensor.z*JS_Accelerometer_multiplier};if(JS_LinearAccelerationSensor_callback!=0)dynCall_vfff(JS_LinearAccelerationSensor_callback,linearAccelerationValue.x,linearAccelerationValue.y,linearAccelerationValue.z);if(JS_GravitySensor_callback!=0&&typeof GravitySensor==="undefined"){var gravityValue=JS_ComputeGravity(JS_Accelerometer_lastValue,linearAccelerationValue);dynCall_vfff(JS_GravitySensor_callback,gravityValue.x,gravityValue.y,gravityValue.z)}}var JS_LinearAccelerationSensor_frequencyRequest=0;var JS_LinearAccelerationSensor_frequency=0;function _JS_LinearAccelerationSensor_Start(callback,frequency){JS_DefineAccelerometerMultiplier();if(typeof LinearAccelerationSensor==="undefined"){JS_DeviceMotion_add();if(callback!=0)JS_LinearAccelerationSensor_callback=callback;return}if(callback!=0)JS_LinearAccelerationSensor_callback=callback;function InitializeLinearAccelerationSensor(frequency){JS_LinearAccelerationSensor=new LinearAccelerationSensor({frequency:frequency,referenceFrame:"device"});JS_LinearAccelerationSensor.addEventListener("reading",JS_LinearAccelerationSensor_eventHandler);JS_LinearAccelerationSensor.addEventListener("error",function(e){warnOnce(e.error?e.error:e)});JS_LinearAccelerationSensor.start();JS_LinearAccelerationSensor_frequency=frequency}if(JS_LinearAccelerationSensor){if(JS_LinearAccelerationSensor_frequency!=frequency){JS_LinearAccelerationSensor.stop();JS_LinearAccelerationSensor.removeEventListener("reading",JS_LinearAccelerationSensor_eventHandler);InitializeLinearAccelerationSensor(frequency)}}else if(JS_LinearAccelerationSensor_frequencyRequest!=0){JS_LinearAccelerationSensor_frequencyRequest=frequency}else{JS_LinearAccelerationSensor_frequencyRequest=frequency;navigator.permissions.query({name:"accelerometer"}).then(function(result){if(result.state==="granted"){InitializeLinearAccelerationSensor(JS_LinearAccelerationSensor_frequencyRequest)}else{warnOnce("No permission to use LinearAccelerationSensor.")}JS_LinearAccelerationSensor_frequencyRequest=0})}}function _JS_GravitySensor_Start(callback,frequency){if(typeof GravitySensor==="undefined"){_JS_Accelerometer_Start(0,Math.max(frequency,JS_Accelerometer_frequency));_JS_LinearAccelerationSensor_Start(0,Math.max(frequency,JS_LinearAccelerationSensor_frequency));JS_GravitySensor_callback=callback;return}JS_DefineAccelerometerMultiplier();JS_GravitySensor_callback=callback;function InitializeGravitySensor(frequency){JS_GravitySensor=new GravitySensor({frequency:frequency,referenceFrame:"device"});JS_GravitySensor.addEventListener("reading",JS_GravitySensor_eventHandler);JS_GravitySensor.addEventListener("error",function(e){warnOnce(e.error?e.error:e)});JS_GravitySensor.start()}if(JS_GravitySensor){JS_GravitySensor.stop();JS_GravitySensor.removeEventListener("reading",JS_GravitySensor_eventHandler);InitializeGravitySensor(frequency)}else if(JS_GravitySensor_frequencyRequest!=0){JS_GravitySensor_frequencyRequest=frequency}else{JS_GravitySensor_frequencyRequest=frequency;navigator.permissions.query({name:"accelerometer"}).then(function(result){if(result.state==="granted"){InitializeGravitySensor(JS_GravitySensor_frequencyRequest)}else{warnOnce("No permission to use GravitySensor.")}JS_GravitySensor_frequencyRequest=0})}}function _JS_LinearAccelerationSensor_Stop(){if(JS_LinearAccelerationSensor){if(typeof GravitySensor!=="undefined"||JS_GravitySensor_callback==0){JS_LinearAccelerationSensor.stop();JS_LinearAccelerationSensor.removeEventListener("reading",JS_LinearAccelerationSensor_eventHandler);JS_LinearAccelerationSensor=null}JS_LinearAccelerationSensor_callback=0;JS_LinearAccelerationSensor_frequency=0}else if(JS_LinearAccelerationSensor_callback!=0){JS_LinearAccelerationSensor_callback=0;JS_DeviceMotion_remove()}}function _JS_GravitySensor_Stop(){JS_GravitySensor_callback=0;if(typeof GravitySensor==="undefined"){if(JS_Accelerometer_callback==0)_JS_Accelerometer_Stop();if(JS_LinearAccelerationSensor_callback==0)_JS_LinearAccelerationSensor_Stop();return}if(JS_GravitySensor){JS_GravitySensor.stop();JS_GravitySensor.removeEventListener("reading",JS_GravitySensor_eventHandler);JS_GravitySensor=null}}function _JS_GuardAgainstJsExceptions(cb){try{(function(){dynCall_v.call(null,cb)})()}catch(e){console.warn(e)}}var JS_Gyroscope=null;function _JS_Gyroscope_IsRunning(){return JS_Gyroscope&&JS_Gyroscope.activated||JS_Gyroscope_callback!=0}function JS_Gyroscope_eventHandler(){if(JS_Gyroscope_callback!=0)dynCall_vfff(JS_Gyroscope_callback,JS_Gyroscope.x,JS_Gyroscope.y,JS_Gyroscope.z)}var JS_Gyroscope_frequencyRequest=0;function _JS_Gyroscope_Start(callback,frequency){if(typeof Gyroscope==="undefined"){JS_DeviceMotion_add();JS_Gyroscope_callback=callback;return}JS_Gyroscope_callback=callback;function InitializeGyroscope(frequency){JS_Gyroscope=new Gyroscope({frequency:frequency,referenceFrame:"device"});JS_Gyroscope.addEventListener("reading",JS_Gyroscope_eventHandler);JS_Gyroscope.addEventListener("error",function(e){warnOnce(e.error?e.error:e)});JS_Gyroscope.start()}if(JS_Gyroscope){JS_Gyroscope.stop();JS_Gyroscope.removeEventListener("reading",JS_Gyroscope_eventHandler);InitializeGyroscope(frequency)}else if(JS_Gyroscope_frequencyRequest!=0){JS_Gyroscope_frequencyRequest=frequency}else{JS_Gyroscope_frequencyRequest=frequency;navigator.permissions.query({name:"gyroscope"}).then(function(result){if(result.state==="granted"){InitializeGyroscope(JS_Gyroscope_frequencyRequest)}else{warnOnce("No permission to use Gyroscope.")}JS_Gyroscope_frequencyRequest=0})}}function _JS_Gyroscope_Stop(){if(JS_Gyroscope){JS_Gyroscope.stop();JS_Gyroscope.removeEventListener("reading",JS_Gyroscope_eventHandler);JS_Gyroscope=null;JS_Gyroscope_callback=0}else if(JS_Gyroscope_callback!=0){JS_Gyroscope_callback=0;JS_DeviceMotion_remove()}}function _JS_LinearAccelerationSensor_IsRunning(){return JS_LinearAccelerationSensor&&JS_LinearAccelerationSensor.activated||JS_LinearAccelerationSensor_callback!=0}function _JS_Log_Dump(ptr,type){var str=UTF8ToString(ptr);if(typeof dump=="function")dump(str);switch(type){case 0:case 1:case 4:console.error(str);return;case 2:console.warn(str);return;case 3:case 5:console.log(str);return;default:console.error("Unknown console message type!");console.error(str)}}function _JS_Log_StackTrace(buffer,bufferSize){var trace=stackTrace();if(buffer)stringToUTF8(trace,buffer,bufferSize);return lengthBytesUTF8(trace)}var mobile_input_hide_delay=null;var mobile_input_text=null;var mobile_input=null;var mobile_input_ignore_blur_event=false;function _JS_MobileKeybard_GetIgnoreBlurEvent(){return mobile_input_ignore_blur_event}function _JS_MobileKeyboard_GetKeyboardStatus(){var kKeyboardStatusVisible=0;var kKeyboardStatusDone=1;if(!mobile_input)return kKeyboardStatusDone;return kKeyboardStatusVisible}function _JS_MobileKeyboard_GetText(buffer,bufferSize){var text=mobile_input&&mobile_input.input?mobile_input.input.value:mobile_input_text?mobile_input_text:"";if(buffer)stringToUTF8(text,buffer,bufferSize);return lengthBytesUTF8(text)}function _JS_MobileKeyboard_GetTextSelection(outStart,outLength){if(!mobile_input){HEAP32[outStart>>2]=0;HEAP32[outLength>>2]=0;return}HEAP32[outStart>>2]=mobile_input.input.selectionStart;HEAP32[outLength>>2]=mobile_input.input.selectionEnd-mobile_input.input.selectionStart}function _JS_MobileKeyboard_Hide(delay){if(mobile_input_hide_delay)return;mobile_input_ignore_blur_event=true;function hideMobileKeyboard(){if(mobile_input&&mobile_input.input){mobile_input_text=mobile_input.input.value;mobile_input.input=null;if(mobile_input.parentNode&&mobile_input.parentNode){mobile_input.parentNode.removeChild(mobile_input)}}mobile_input=null;mobile_input_hide_delay=null;setTimeout(function(){mobile_input_ignore_blur_event=false},100)}if(delay){var hideDelay=200;mobile_input_hide_delay=setTimeout(hideMobileKeyboard,hideDelay)}else{hideMobileKeyboard()}}function _JS_MobileKeyboard_SetCharacterLimit(limit){if(!mobile_input)return;mobile_input.input.maxLength=limit}function _JS_MobileKeyboard_SetText(text){if(!mobile_input)return;text=UTF8ToString(text);mobile_input.input.value=text}function _JS_MobileKeyboard_SetTextSelection(start,length){if(!mobile_input)return;mobile_input.input.setSelectionRange(start,start+length)}function _JS_MobileKeyboard_Show(text,keyboardType,autocorrection,multiline,secure,alert,placeholder,characterLimit){if(mobile_input_hide_delay){clearTimeout(mobile_input_hide_delay);mobile_input_hide_delay=null}text=UTF8ToString(text);mobile_input_text=text;placeholder=UTF8ToString(placeholder);var container=document.body;var hasExistingMobileInput=!!mobile_input;var input_type;var KEYBOARD_TYPE_NUMBERS_AND_PUNCTUATION=2;var KEYBOARD_TYPE_URL=3;var KEYBOARD_TYPE_NUMBER_PAD=4;var KEYBOARD_TYPE_PHONE_PAD=5;var KEYBOARD_TYPE_EMAIL_ADDRESS=7;if(!secure){switch(keyboardType){case KEYBOARD_TYPE_EMAIL_ADDRESS:input_type="email";break;case KEYBOARD_TYPE_URL:input_type="url";break;case KEYBOARD_TYPE_NUMBERS_AND_PUNCTUATION:case KEYBOARD_TYPE_NUMBER_PAD:case KEYBOARD_TYPE_PHONE_PAD:input_type="number";break;default:input_type="text";break}}else{input_type="password"}if(hasExistingMobileInput){if(mobile_input.multiline!=multiline){_JS_MobileKeyboard_Hide(false);return}}var inputContainer=mobile_input||document.createElement("div");if(!hasExistingMobileInput){inputContainer.style="width:100%; position:fixed; bottom:0px; margin:0px; padding:0px; left:0px; border: 1px solid #000; border-radius: 5px; background-color:#fff; font-size:14pt;";container.appendChild(inputContainer);mobile_input=inputContainer}var input=hasExistingMobileInput?mobile_input.input:document.createElement(multiline?"textarea":"input");mobile_input.multiline=multiline;mobile_input.secure=secure;mobile_input.keyboardType=keyboardType;mobile_input.inputType=input_type;input.type=input_type;input.style="width:calc(100% - 85px); "+(multiline?"height:100px;":"")+"vertical-align:top; border-radius: 5px; outline:none; cursor:default; resize:none; border:0px; padding:10px 0px 10px 10px;";input.spellcheck=autocorrection?true:false;input.maxLength=characterLimit>0?characterLimit:524288;input.value=text;input.placeholder=placeholder;if(!hasExistingMobileInput){inputContainer.appendChild(input);inputContainer.input=input}if(!hasExistingMobileInput){var okButton=document.createElement("button");okButton.innerText="OK";okButton.style="border:0; position:absolute; left:calc(100% - 75px); top:0px; width:75px; height:100%; margin:0; padding:0; border-radius: 5px; background-color:#fff";okButton.addEventListener("touchend",function(){_JS_MobileKeyboard_Hide(true)});inputContainer.appendChild(okButton);inputContainer.okButton=okButton;input.addEventListener("keyup",function(e){if(input.parentNode.multiline)return;if(e.code=="Enter"||e.which==13||e.keyCode==13){_JS_MobileKeyboard_Hide(true)}});input.addEventListener("blur",function(e){_JS_MobileKeyboard_Hide(true);e.stopPropagation();e.preventDefault()});input.select();input.focus()}else{input.select()}}var JS_OrientationSensor=null;var JS_OrientationSensor_callback=0;function _JS_OrientationSensor_IsRunning(){return JS_OrientationSensor&&JS_OrientationSensor.activated||JS_OrientationSensor_callback!=0}function JS_OrientationSensor_eventHandler(){if(JS_OrientationSensor_callback!=0)dynCall_vffff(JS_OrientationSensor_callback,JS_OrientationSensor.quaternion[0],JS_OrientationSensor.quaternion[1],JS_OrientationSensor.quaternion[2],JS_OrientationSensor.quaternion[3])}var JS_OrientationSensor_frequencyRequest=0;function JS_DeviceOrientation_eventHandler(event){if(JS_OrientationSensor_callback){var degToRad=Math.PI/180;var x=event.beta*degToRad;var y=event.gamma*degToRad;var z=event.alpha*degToRad;var cx=Math.cos(x/2);var sx=Math.sin(x/2);var cy=Math.cos(y/2);var sy=Math.sin(y/2);var cz=Math.cos(z/2);var sz=Math.sin(z/2);var qx=sx*cy*cz-cx*sy*sz;var qy=cx*sy*cz+sx*cy*sz;var qz=cx*cy*sz+sx*sy*cz;var qw=cx*cy*cz-sx*sy*sz;dynCall_vffff(JS_OrientationSensor_callback,qx,qy,qz,qw)}}function _JS_OrientationSensor_Start(callback,frequency){if(typeof RelativeOrientationSensor==="undefined"){if(JS_OrientationSensor_callback==0){JS_OrientationSensor_callback=callback;JS_RequestDeviceSensorPermissions(1);window.addEventListener("deviceorientation",JS_DeviceOrientation_eventHandler)}return}JS_OrientationSensor_callback=callback;function InitializeOrientationSensor(frequency){JS_OrientationSensor=new RelativeOrientationSensor({frequency:frequency,referenceFrame:"device"});JS_OrientationSensor.addEventListener("reading",JS_OrientationSensor_eventHandler);JS_OrientationSensor.addEventListener("error",function(e){warnOnce(e.error?e.error:e)});JS_OrientationSensor.start()}if(JS_OrientationSensor){JS_OrientationSensor.stop();JS_OrientationSensor.removeEventListener("reading",JS_OrientationSensor_eventHandler);InitializeOrientationSensor(frequency)}else if(JS_OrientationSensor_frequencyRequest!=0){JS_OrientationSensor_frequencyRequest=frequency}else{JS_OrientationSensor_frequencyRequest=frequency;Promise.all([navigator.permissions.query({name:"accelerometer"}),navigator.permissions.query({name:"gyroscope"})]).then(function(results){if(results.every(function(result){return result.state==="granted"})){InitializeOrientationSensor(JS_OrientationSensor_frequencyRequest)}else{warnOnce("No permissions to use RelativeOrientationSensor.")}JS_OrientationSensor_frequencyRequest=0})}}function _JS_OrientationSensor_Stop(){if(JS_OrientationSensor){JS_OrientationSensor.stop();JS_OrientationSensor.removeEventListener("reading",JS_OrientationSensor_eventHandler);JS_OrientationSensor=null}else if(JS_OrientationSensor_callback!=0){window.removeEventListener("deviceorientation",JS_DeviceOrientation_eventHandler)}JS_OrientationSensor_callback=0}function _JS_RequestDeviceSensorPermissionsOnTouch(){if(JS_DeviceSensorPermissions==0)return;JS_RequestDeviceSensorPermissions(JS_DeviceSensorPermissions)}function _JS_RunQuitCallbacks(){Module.QuitCleanup()}var JS_ScreenOrientation_callback=0;function JS_ScreenOrientation_eventHandler(){if(JS_ScreenOrientation_callback)dynCall_viii(JS_ScreenOrientation_callback,window.innerWidth,window.innerHeight,screen.orientation?screen.orientation.angle:window.orientation)}function _JS_ScreenOrientation_DeInit(){JS_ScreenOrientation_callback=0;window.removeEventListener("resize",JS_ScreenOrientation_eventHandler);if(screen.orientation){screen.orientation.removeEventListener("change",JS_ScreenOrientation_eventHandler)}}function _JS_ScreenOrientation_Init(callback){if(!JS_ScreenOrientation_callback){if(screen.orientation){screen.orientation.addEventListener("change",JS_ScreenOrientation_eventHandler)}window.addEventListener("resize",JS_ScreenOrientation_eventHandler);JS_ScreenOrientation_callback=callback;setTimeout(JS_ScreenOrientation_eventHandler,0)}}var JS_ScreenOrientation_requestedLockType=-1;var JS_ScreenOrientation_appliedLockType=-1;var JS_ScreenOrientation_timeoutID=-1;function _JS_ScreenOrientation_Lock(orientationLockType){if(!screen.orientation){return}function applyLock(){JS_ScreenOrientation_appliedLockType=JS_ScreenOrientation_requestedLockType;var screenOrientations=["any",0,"landscape","portrait","portrait-primary","portrait-secondary","landscape-primary","landscape-secondary"];var type=screenOrientations[JS_ScreenOrientation_appliedLockType];screen.orientation.lock(type).then(function(){if(JS_ScreenOrientation_requestedLockType!=JS_ScreenOrientation_appliedLockType){JS_ScreenOrientation_timeoutID=setTimeout(applyLock,0)}else{JS_ScreenOrientation_timeoutID=-1}}).catch(function(err){warnOnce(err);JS_ScreenOrientation_timeoutID=-1})}JS_ScreenOrientation_requestedLockType=orientationLockType;if(JS_ScreenOrientation_timeoutID==-1&&orientationLockType!=JS_ScreenOrientation_appliedLockType){JS_ScreenOrientation_timeoutID=setTimeout(applyLock,0)}}var WEBAudio={audioInstanceIdCounter:0,audioInstances:{},audioContext:null,audioWebEnabled:0,audioCache:[],pendingAudioSources:{}};function jsAudioMixinSetPitch(source){source.estimatePlaybackPosition=function(){var t=(WEBAudio.audioContext.currentTime-source.playbackStartTime)*source.playbackRate.value;if(source.loop&&t>=source.loopStart){t=(t-source.loopStart)%(source.loopEnd-source.loopStart)+source.loopStart}return t};source.setPitch=function(newPitch){var curPosition=source.estimatePlaybackPosition();if(curPosition>=0){source.playbackStartTime=WEBAudio.audioContext.currentTime-curPosition/newPitch}if(source.playbackRate.value!==newPitch)source.playbackRate.value=newPitch}}function jsAudioCreateUncompressedSoundClip(buffer,error){var soundClip={buffer:buffer,error:error};soundClip.release=function(){};soundClip.getLength=function(){if(!this.buffer){console.log("Trying to get length of sound which is not loaded.");return 0}var sampleRateRatio=44100/this.buffer.sampleRate;return this.buffer.length*sampleRateRatio};soundClip.getData=function(ptr,length){if(!this.buffer){console.log("Trying to get data of sound which is not loaded.");return 0}var startOutputBuffer=ptr>>2;var output=HEAPF32.subarray(startOutputBuffer,startOutputBuffer+(length>>2));var numMaxSamples=Math.floor((length>>2)/this.buffer.numberOfChannels);var numReadSamples=Math.min(this.buffer.length,numMaxSamples);for(var i=0;i<this.buffer.numberOfChannels;i++){var channelData=this.buffer.getChannelData(i).subarray(0,numReadSamples);output.set(channelData,i*numReadSamples)}return numReadSamples*this.buffer.numberOfChannels*4};soundClip.getNumberOfChannels=function(){if(!this.buffer){console.log("Trying to get metadata of sound which is not loaded.");return 0}return this.buffer.numberOfChannels};soundClip.getFrequency=function(){if(!this.buffer){console.log("Trying to get metadata of sound which is not loaded.");return 0}return this.buffer.sampleRate};soundClip.createSourceNode=function(){if(!this.buffer){console.log("Trying to play sound which is not loaded.")}var source=WEBAudio.audioContext.createBufferSource();source.buffer=this.buffer;jsAudioMixinSetPitch(source);return source};return soundClip}function jsAudioCreateChannel(callback,userData){var channel={callback:callback,userData:userData,source:null,gain:WEBAudio.audioContext.createGain(),panner:WEBAudio.audioContext.createPanner(),threeD:false,loop:false,loopStart:0,loopEnd:0,pitch:1};channel.panner.rolloffFactor=0;channel.release=function(){this.disconnectSource();this.gain.disconnect();this.panner.disconnect()};channel.playSoundClip=function(soundClip,startTime,startOffset){try{var self=this;this.source=soundClip.createSourceNode();this.setupPanning();this.source.onended=function(){self.source.isStopped=true;self.disconnectSource();if(self.callback){dynCall("vi",self.callback,[self.userData])}};this.source.loop=this.loop;this.source.loopStart=this.loopStart;this.source.loopEnd=this.loopEnd;this.source.start(startTime,startOffset);this.source.scheduledStartTime=startTime;this.source.playbackStartTime=startTime-startOffset/this.source.playbackRate.value;this.source.setPitch(this.pitch)}catch(e){console.error("Channel.playSoundClip error. Exception: "+e)}};channel.stop=function(delay){if(!this.source){return}try{channel.source.stop(WEBAudio.audioContext.currentTime+delay)}catch(e){}if(delay==0){this.disconnectSource()}};channel.isPaused=function(){if(!this.source){return true}if(this.source.isPausedMockNode){return true}if(this.source.mediaElement){return this.source.mediaElement.paused||this.source.pauseRequested}return false};channel.pause=function(){if(!this.source||this.source.isPausedMockNode){return}if(this.source.mediaElement){this.source._pauseMediaElement();return}var pausedSource={isPausedMockNode:true,buffer:this.source.buffer,loop:this.source.loop,loopStart:this.source.loopStart,loopEnd:this.source.loopEnd,playbackRate:this.source.playbackRate.value,scheduledStartTime:this.source.scheduledStartTime,scheduledStopTime:undefined,playbackPausedAtPosition:this.source.estimatePlaybackPosition(),setPitch:function(v){this.playbackRate=v},stop:function(when){this.scheduledStopTime=when}};this.stop(0);this.disconnectSource();this.source=pausedSource};channel.resume=function(){if(this.source&&this.source.mediaElement){this.source.start(undefined,this.source.currentTime);return}if(!this.source||!this.source.isPausedMockNode){return}var pausedSource=this.source;var soundClip=jsAudioCreateUncompressedSoundClip(pausedSource.buffer,false);this.playSoundClip(soundClip,pausedSource.scheduledStartTime,Math.max(0,pausedSource.playbackPausedAtPosition));this.source.loop=pausedSource.loop;this.source.loopStart=pausedSource.loopStart;this.source.loopEnd=pausedSource.loopEnd;this.source.setPitch(pausedSource.playbackRate);if(typeof pausedSource.scheduledStopTime!=="undefined"){var delay=Math.max(pausedSource.scheduledStopTime-WEBAudio.audioContext.currentTime,0);this.stop(delay)}};channel.setLoop=function(loop){this.loop=loop;if(!this.source||this.source.loop==loop){return}this.source.loop=loop};channel.setLoopPoints=function(loopStart,loopEnd){this.loopStart=loopStart;this.loopEnd=loopEnd;if(!this.source){return}if(this.source.loopStart!==loopStart){this.source.loopStart=loopStart}if(this.source.loopEnd!==loopEnd){this.source.loopEnd=loopEnd}};channel.set3D=function(threeD){if(this.threeD==threeD){return}this.threeD=threeD;if(!this.source){return}this.setupPanning()};channel.setPitch=function(pitch){this.pitch=pitch;if(!this.source){return}this.source.setPitch(pitch)};channel.setVolume=function(volume){if(this.gain.gain.value==volume){return}this.gain.gain.value=volume};channel.setPosition=function(x,y,z){var p=this.panner;if(p.positionX){if(p.positionX.value!==x)p.positionX.value=x;if(p.positionY.value!==y)p.positionY.value=y;if(p.positionZ.value!==z)p.positionZ.value=z}else if(p._x!==x||p._y!==y||p._z!==z){p.setPosition(x,y,z);p._x=x;p._y=y;p._z=z}};channel.disconnectSource=function(){if(!this.source||this.source.isPausedMockNode){return}if(this.source.mediaElement){this.source._pauseMediaElement()}this.source.onended=null;this.source.disconnect();delete this.source};channel.setupPanning=function(){if(this.source.isPausedMockNode)return;this.source.disconnect();this.panner.disconnect();this.gain.disconnect();if(this.threeD){this.source.connect(this.panner);this.panner.connect(this.gain)}else{this.source.connect(this.gain)}this.gain.connect(WEBAudio.audioContext.destination)};channel.isStopped=function(){if(!this.source){return true}if(this.source.mediaElement){return this.source.isStopped}return false};return channel}function _JS_Sound_Create_Channel(callback,userData){if(WEBAudio.audioWebEnabled==0)return;WEBAudio.audioInstances[++WEBAudio.audioInstanceIdCounter]=jsAudioCreateChannel(callback,userData);return WEBAudio.audioInstanceIdCounter}function _JS_Sound_GetLength(bufferInstance){if(WEBAudio.audioWebEnabled==0)return 0;var soundClip=WEBAudio.audioInstances[bufferInstance];if(!soundClip)return 0;return soundClip.getLength()}function _JS_Sound_GetLoadState(bufferInstance){if(WEBAudio.audioWebEnabled==0)return 2;var sound=WEBAudio.audioInstances[bufferInstance];if(sound.error)return 2;if(sound.buffer||sound.url)return 0;return 1}function jsAudioPlayPendingBlockedAudio(soundId){var pendingAudio=WEBAudio.pendingAudioSources[soundId];pendingAudio.sourceNode._startPlayback(pendingAudio.offset);delete WEBAudio.pendingAudioSources[soundId]}function jsAudioPlayBlockedAudios(){Object.keys(WEBAudio.pendingAudioSources).forEach(function(audioId){jsAudioPlayPendingBlockedAudio(audioId)})}function _JS_Sound_Init(){try{window.AudioContext=window.AudioContext||window.webkitAudioContext;WEBAudio.audioContext=new AudioContext;var tryToResumeAudioContext=function(){if(WEBAudio.audioContext.state==="suspended")WEBAudio.audioContext.resume().catch(function(error){console.warn("Could not resume audio context. Exception: "+error)});else Module.clearInterval(resumeInterval)};var resumeInterval=Module.setInterval(tryToResumeAudioContext,400);WEBAudio.audioWebEnabled=1;var _userEventCallback=function(){try{if(WEBAudio.audioContext.state!=="running"&&WEBAudio.audioContext.state!=="closed"){WEBAudio.audioContext.resume().catch(function(error){console.warn("Could not resume audio context. Exception: "+error)})}jsAudioPlayBlockedAudios();var audioCacheSize=20;while(WEBAudio.audioCache.length<audioCacheSize){var audio=new Audio;audio.autoplay=false;WEBAudio.audioCache.push(audio)}}catch(e){}};window.addEventListener("mousedown",_userEventCallback);window.addEventListener("touchstart",_userEventCallback);Module.deinitializers.push(function(){window.removeEventListener("mousedown",_userEventCallback);window.removeEventListener("touchstart",_userEventCallback)})}catch(e){alert("Web Audio API is not supported in this browser")}}function jsAudioCreateUncompressedSoundClipFromCompressedAudio(audioData){var soundClip=jsAudioCreateUncompressedSoundClip(null,false);WEBAudio.audioContext.decodeAudioData(audioData,function(_buffer){soundClip.buffer=_buffer},function(_error){soundClip.error=true;console.log("Decode error: "+_error)});return soundClip}function jsAudioAddPendingBlockedAudio(sourceNode,offset){WEBAudio.pendingAudioSources[sourceNode.mediaElement.src]={sourceNode:sourceNode,offset:offset}}function jsAudioGetMimeTypeFromType(fmodSoundType){switch(fmodSoundType){case 13:return"audio/mpeg";case 20:return"audio/wav";default:return"audio/mp4"}}function jsAudioCreateCompressedSoundClip(audioData,fmodSoundType){var mimeType=jsAudioGetMimeTypeFromType(fmodSoundType);var blob=new Blob([audioData],{type:mimeType});var soundClip={url:URL.createObjectURL(blob),error:false,mediaElement:new Audio};soundClip.mediaElement.preload="metadata";soundClip.mediaElement.src=soundClip.url;soundClip.release=function(){if(!this.mediaElement){return}this.mediaElement.src="";URL.revokeObjectURL(this.url);delete this.mediaElement;delete this.url};soundClip.getLength=function(){return this.mediaElement.duration*44100};soundClip.getData=function(ptr,length){console.warn("getData() is not supported for compressed sound.");return 0};soundClip.getNumberOfChannels=function(){console.warn("getNumberOfChannels() is not supported for compressed sound.");return 0};soundClip.getFrequency=function(){console.warn("getFrequency() is not supported for compressed sound.");return 0};soundClip.createSourceNode=function(){var self=this;var mediaElement=WEBAudio.audioCache.length?WEBAudio.audioCache.pop():new Audio;mediaElement.preload="metadata";mediaElement.src=this.url;var source=WEBAudio.audioContext.createMediaElementSource(mediaElement);Object.defineProperty(source,"loop",{get:function(){return source.mediaElement.loop},set:function(v){if(source.mediaElement.loop!==v)source.mediaElement.loop=v}});source.playbackRate={};Object.defineProperty(source.playbackRate,"value",{get:function(){return source.mediaElement.playbackRate},set:function(v){if(source.mediaElement.playbackRate!==v)source.mediaElement.playbackRate=v}});Object.defineProperty(source,"currentTime",{get:function(){return source.mediaElement.currentTime},set:function(v){if(source.mediaElement.currentTime!==v)source.mediaElement.currentTime=v}});Object.defineProperty(source,"mute",{get:function(){return source.mediaElement.mute},set:function(v){if(source.mediaElement.mute!==v)source.mediaElement.mute=v}});Object.defineProperty(source,"onended",{get:function(){return source.mediaElement.onended},set:function(onended){source.mediaElement.onended=onended}});source.playPromise=null;source.playTimeout=null;source.pauseRequested=false;source.isStopped=false;source._pauseMediaElement=function(){if(source.playPromise||source.playTimeout){source.pauseRequested=true}else{source.mediaElement.pause()}};source._startPlayback=function(offset){if(source.playPromise||source.playTimeout){source.mediaElement.currentTime=offset;source.pauseRequested=false;return}source.mediaElement.currentTime=offset;source.playPromise=source.mediaElement.play();if(source.playPromise){source.playPromise.then(function(){if(source.pauseRequested){source.mediaElement.pause();source.pauseRequested=false}source.playPromise=null}).catch(function(error){source.playPromise=null;if(error.name!=="NotAllowedError")throw error;jsAudioAddPendingBlockedAudio(source,offset)})}};source.start=function(startTime,offset){if(typeof startTime==="undefined"){startTime=WEBAudio.audioContext.currentTime}if(typeof offset==="undefined"){offset=0}var startDelayThresholdMS=4;var startDelayMS=(startTime-WEBAudio.audioContext.currentTime)*1e3;if(startDelayMS>startDelayThresholdMS){source.playTimeout=setTimeout(function(){source.playTimeout=null;source._startPlayback(offset)},startDelayMS)}else{source._startPlayback(offset)}};source.stop=function(stopTime){if(typeof stopTime==="undefined"){stopTime=WEBAudio.audioContext.currentTime}var stopDelayThresholdMS=4;var stopDelayMS=(stopTime-WEBAudio.audioContext.currentTime)*1e3;if(stopDelayMS>stopDelayThresholdMS){setTimeout(function(){source._pauseMediaElement();source.isStopped=true},stopDelayMS)}else{source._pauseMediaElement();source.isStopped=true}};jsAudioMixinSetPitch(source);return source};return soundClip}function _JS_Sound_Load(ptr,length,decompress,fmodSoundType){if(WEBAudio.audioWebEnabled==0)return 0;var audioData=HEAPU8.buffer.slice(ptr,ptr+length);if(length<131072)decompress=1;var sound;if(decompress){sound=jsAudioCreateUncompressedSoundClipFromCompressedAudio(audioData)}else{sound=jsAudioCreateCompressedSoundClip(audioData,fmodSoundType)}WEBAudio.audioInstances[++WEBAudio.audioInstanceIdCounter]=sound;return WEBAudio.audioInstanceIdCounter}function jsAudioCreateUncompressedSoundClipFromPCM(channels,length,sampleRate,ptr){var buffer=WEBAudio.audioContext.createBuffer(channels,length,sampleRate);for(var i=0;i<channels;i++){var offs=(ptr>>2)+length*i;var copyToChannel=buffer["copyToChannel"]||function(source,channelNumber,startInChannel){var clipped=source.subarray(0,Math.min(source.length,this.length-(startInChannel|0)));this.getChannelData(channelNumber|0).set(clipped,startInChannel|0)};copyToChannel.apply(buffer,[HEAPF32.subarray(offs,offs+length),i,0])}return jsAudioCreateUncompressedSoundClip(buffer,false)}function _JS_Sound_Load_PCM(channels,length,sampleRate,ptr){if(WEBAudio.audioWebEnabled==0)return 0;var sound=jsAudioCreateUncompressedSoundClipFromPCM(channels,length,sampleRate,ptr);WEBAudio.audioInstances[++WEBAudio.audioInstanceIdCounter]=sound;return WEBAudio.audioInstanceIdCounter}function _JS_Sound_Play(bufferInstance,channelInstance,offset,delay){if(WEBAudio.audioWebEnabled==0)return;_JS_Sound_Stop(channelInstance,0);var soundClip=WEBAudio.audioInstances[bufferInstance];var channel=WEBAudio.audioInstances[channelInstance];if(!soundClip){console.log("Trying to play sound which is not loaded.");return}try{channel.playSoundClip(soundClip,WEBAudio.audioContext.currentTime+delay,offset)}catch(error){console.error("playSoundClip error. Exception: "+e)}}function _JS_Sound_ReleaseInstance(instance){var object=WEBAudio.audioInstances[instance];if(object){object.release()}delete WEBAudio.audioInstances[instance]}function _JS_Sound_ResumeIfNeeded(){if(WEBAudio.audioWebEnabled==0)return;if(WEBAudio.audioContext.state==="suspended")WEBAudio.audioContext.resume().catch(function(error){console.warn("Could not resume audio context. Exception: "+error)})}function _JS_Sound_Set3D(channelInstance,threeD){var channel=WEBAudio.audioInstances[channelInstance];channel.set3D(threeD)}function _JS_Sound_SetListenerOrientation(x,y,z,xUp,yUp,zUp){if(WEBAudio.audioWebEnabled==0)return;x=-x;y=-y;z=-z;var l=WEBAudio.audioContext.listener;if(l.forwardX){if(l.forwardX.value!==x)l.forwardX.value=x;if(l.forwardY.value!==y)l.forwardY.value=y;if(l.forwardZ.value!==z)l.forwardZ.value=z;if(l.upX.value!==xUp)l.upX.value=xUp;if(l.upY.value!==yUp)l.upY.value=yUp;if(l.upZ.value!==zUp)l.upZ.value=zUp}else if(l._forwardX!==x||l._forwardY!==y||l._forwardZ!==z||l._upX!==xUp||l._upY!==yUp||l._upZ!==zUp){l.setOrientation(x,y,z,xUp,yUp,zUp);l._forwardX=x;l._forwardY=y;l._forwardZ=z;l._upX=xUp;l._upY=yUp;l._upZ=zUp}}function _JS_Sound_SetListenerPosition(x,y,z){if(WEBAudio.audioWebEnabled==0)return;var l=WEBAudio.audioContext.listener;if(l.positionX){if(l.positionX.value!==x)l.positionX.value=x;if(l.positionY.value!==y)l.positionY.value=y;if(l.positionZ.value!==z)l.positionZ.value=z}else if(l._positionX!==x||l._positionY!==y||l._positionZ!==z){l.setPosition(x,y,z);l._positionX=x;l._positionY=y;l._positionZ=z}}function _JS_Sound_SetLoop(channelInstance,loop){if(WEBAudio.audioWebEnabled==0)return;var channel=WEBAudio.audioInstances[channelInstance];channel.setLoop(loop)}function _JS_Sound_SetLoopPoints(channelInstance,loopStart,loopEnd){if(WEBAudio.audioWebEnabled==0)return;var channel=WEBAudio.audioInstances[channelInstance];channel.setLoopPoints(loopStart,loopEnd)}function _JS_Sound_SetPaused(channelInstance,paused){if(WEBAudio.audioWebEnabled==0)return;var channel=WEBAudio.audioInstances[channelInstance];if(paused!=channel.isPaused()){if(paused)channel.pause();else channel.resume()}}function _JS_Sound_SetPitch(channelInstance,v){if(WEBAudio.audioWebEnabled==0)return;try{var channel=WEBAudio.audioInstances[channelInstance];channel.setPitch(v)}catch(e){console.error("JS_Sound_SetPitch(channel="+channelInstance+", pitch="+v+") threw an exception: "+e)}}function _JS_Sound_SetPosition(channelInstance,x,y,z){if(WEBAudio.audioWebEnabled==0)return;var channel=WEBAudio.audioInstances[channelInstance];channel.setPosition(x,y,z)}function _JS_Sound_SetVolume(channelInstance,v){if(WEBAudio.audioWebEnabled==0)return;try{var channel=WEBAudio.audioInstances[channelInstance];channel.setVolume(v)}catch(e){console.error("JS_Sound_SetVolume(channel="+channelInstance+", volume="+v+") threw an exception: "+e)}}function _JS_Sound_Stop(channelInstance,delay){if(WEBAudio.audioWebEnabled==0)return;var channel=WEBAudio.audioInstances[channelInstance];channel.stop(delay)}function _JS_SystemInfo_GetBrowserName(buffer,bufferSize){var browser=Module.SystemInfo.browser;if(buffer)stringToUTF8(browser,buffer,bufferSize);return lengthBytesUTF8(browser)}function _JS_SystemInfo_GetBrowserVersionString(buffer,bufferSize){var browserVer=Module.SystemInfo.browserVersion;if(buffer)stringToUTF8(browserVer,buffer,bufferSize);return lengthBytesUTF8(browserVer)}function _JS_SystemInfo_GetCanvasClientSize(domElementSelector,outWidth,outHeight){var selector=UTF8ToString(domElementSelector);var canvas=selector=="#canvas"?Module["canvas"]:document.querySelector(selector);var w=0,h=0;if(canvas){var size=canvas.getBoundingClientRect();w=size.width;h=size.height}HEAPF64[outWidth>>3]=w;HEAPF64[outHeight>>3]=h}function _JS_SystemInfo_GetDocumentURL(buffer,bufferSize){if(buffer)stringToUTF8(document.URL,buffer,bufferSize);return lengthBytesUTF8(document.URL)}function _JS_SystemInfo_GetGPUInfo(buffer,bufferSize){var gpuinfo=Module.SystemInfo.gpu;if(buffer)stringToUTF8(gpuinfo,buffer,bufferSize);return lengthBytesUTF8(gpuinfo)}function _JS_SystemInfo_GetLanguage(buffer,bufferSize){var language=Module.SystemInfo.language;if(buffer)stringToUTF8(language,buffer,bufferSize);return lengthBytesUTF8(language)}function _JS_SystemInfo_GetMatchWebGLToCanvasSize(){return Module.matchWebGLToCanvasSize||Module.matchWebGLToCanvasSize===undefined}function _JS_SystemInfo_GetMemory(){return HEAPU8.length/(1024*1024)}function _JS_SystemInfo_GetOS(buffer,bufferSize){var browser=Module.SystemInfo.os+" "+Module.SystemInfo.osVersion;if(buffer)stringToUTF8(browser,buffer,bufferSize);return lengthBytesUTF8(browser)}function _JS_SystemInfo_GetPreferredDevicePixelRatio(){return Module.matchWebGLToCanvasSize==false?1:Module.devicePixelRatio||window.devicePixelRatio||1}function _JS_SystemInfo_GetScreenSize(outWidth,outHeight){HEAPF64[outWidth>>3]=Module.SystemInfo.width;HEAPF64[outHeight>>3]=Module.SystemInfo.height}function _JS_SystemInfo_HasAstcHdr(){var ext=GLctx.getExtension("WEBGL_compressed_texture_astc");if(ext&&ext.getSupportedProfiles){return ext.getSupportedProfiles().includes("hdr")}return false}function _JS_SystemInfo_HasCursorLock(){return Module.SystemInfo.hasCursorLock}function _JS_SystemInfo_HasFullscreen(){return Module.SystemInfo.hasFullscreen}function _JS_SystemInfo_HasWebGL(){return Module.SystemInfo.hasWebGL}function _JS_SystemInfo_IsMobile(){return Module.SystemInfo.mobile}function _JS_UnityEngineShouldQuit(){return!!Module.shouldQuit}var wr={requests:{},responses:{},abortControllers:{},timer:{},nextRequestId:1};function _JS_WebRequest_Abort(requestId){var abortController=wr.abortControllers[requestId];if(!abortController||abortController.signal.aborted){return}abortController.abort()}function _JS_WebRequest_Create(url,method){var _url=UTF8ToString(url);var _method=UTF8ToString(method);var abortController=new AbortController;var requestOptions={url:_url,init:{method:_method,signal:abortController.signal,headers:{},enableStreamingDownload:true},tempBuffer:null,tempBufferSize:0};wr.abortControllers[wr.nextRequestId]=abortController;wr.requests[wr.nextRequestId]=requestOptions;return wr.nextRequestId++}function jsWebRequestGetResponseHeaderString(requestId){var response=wr.responses[requestId];if(!response){return""}if(response.headerString){return response.headerString}var headers="";var entries=response.headers.entries();for(var result=entries.next();!result.done;result=entries.next()){headers+=result.value[0]+": "+result.value[1]+"\r\n"}response.headerString=headers;return headers}function _JS_WebRequest_GetResponseMetaData(requestId,headerBuffer,headerSize,responseUrlBuffer,responseUrlSize){var response=wr.responses[requestId];if(!response){stringToUTF8("",headerBuffer,headerSize);stringToUTF8("",responseUrlBuffer,responseUrlSize);return}if(headerBuffer){var headers=jsWebRequestGetResponseHeaderString(requestId);stringToUTF8(headers,headerBuffer,headerSize)}if(responseUrlBuffer){stringToUTF8(response.url,responseUrlBuffer,responseUrlSize)}}function _JS_WebRequest_GetResponseMetaDataLengths(requestId,buffer){var response=wr.responses[requestId];if(!response){HEAPU32[buffer>>2]=0;HEAPU32[(buffer>>2)+1]=0;return}var headers=jsWebRequestGetResponseHeaderString(requestId);HEAPU32[buffer>>2]=lengthBytesUTF8(headers);HEAPU32[(buffer>>2)+1]=lengthBytesUTF8(response.url)}function _JS_WebRequest_Release(requestId){if(wr.timer[requestId]){clearTimeout(wr.timer[requestId])}delete wr.requests[requestId];delete wr.responses[requestId];delete wr.abortControllers[requestId];delete wr.timer[requestId]}function _JS_WebRequest_Send(requestId,ptr,length,arg,onresponse,onprogress){var requestOptions=wr.requests[requestId];var abortController=wr.abortControllers[requestId];function getTempBuffer(size){if(!requestOptions.tempBuffer){const initialSize=Math.max(size,1024);requestOptions.tempBuffer=_malloc(initialSize);requestOptions.tempBufferSize=initialSize}if(requestOptions.tempBufferSize<size){_free(requestOptions.tempBuffer);requestOptions.tempBuffer=_malloc(size);requestOptions.tempBufferSize=size}return requestOptions.tempBuffer}function ClearTimeout(){if(wr.timer[requestId]){clearTimeout(wr.timer[requestId]);delete wr.timer[requestId]}}function HandleSuccess(response,body){ClearTimeout();if(!onresponse){return}var kWebRequestOK=0;if(requestOptions.init.enableStreamingDownload){dynCall("viiiiii",onresponse,[arg,response.status,0,body.length,0,kWebRequestOK])}else if(body.length!=0){var buffer=_malloc(body.length);HEAPU8.set(body,buffer);dynCall("viiiiii",onresponse,[arg,response.status,buffer,body.length,0,kWebRequestOK])}else{dynCall("viiiiii",onresponse,[arg,response.status,0,0,0,kWebRequestOK])}if(requestOptions.tempBuffer){_free(requestOptions.tempBuffer)}}function HandleError(err,code){ClearTimeout();if(!onresponse){return}var len=lengthBytesUTF8(err)+1;var buffer=_malloc(len);stringToUTF8(err,buffer,len);dynCall("viiiiii",onresponse,[arg,500,0,0,buffer,code]);_free(buffer);if(requestOptions.tempBuffer){_free(requestOptions.tempBuffer)}}function HandleProgress(e){if(!onprogress||!e.lengthComputable){return}var response=e.response;wr.responses[requestId]=response;if(e.chunk){var buffer=getTempBuffer(e.chunk.length);HEAPU8.set(e.chunk,buffer);dynCall("viiiiii",onprogress,[arg,response.status,e.loaded,e.total,buffer,e.chunk.length])}else{dynCall("viiiiii",onprogress,[arg,response.status,e.loaded,e.total,0,0])}}try{if(length>0){var postData=HEAPU8.subarray(ptr,ptr+length);requestOptions.init.body=new Blob([postData])}if(requestOptions.timeout){wr.timer[requestId]=setTimeout(function(){requestOptions.isTimedOut=true;abortController.abort()},requestOptions.timeout)}var fetchImpl=Module.fetchWithProgress;requestOptions.init.onProgress=HandleProgress;if(Module.companyName&&Module.productName&&Module.cachedFetch){fetchImpl=Module.cachedFetch;requestOptions.init.companyName=Module.companyName;requestOptions.init.productName=Module.productName;requestOptions.init.productVersion=Module.productVersion;requestOptions.init.control=Module.cacheControl(requestOptions.url)}fetchImpl(requestOptions.url,requestOptions.init).then(function(response){wr.responses[requestId]=response;HandleSuccess(response,response.parsedBody)}).catch(function(error){var kWebErrorUnknown=2;var kWebErrorAborted=17;var kWebErrorTimeout=14;if(requestOptions.isTimedOut){HandleError("Connection timed out.",kWebErrorTimeout)}else if(abortController.signal.aborted){HandleError("Aborted.",kWebErrorAborted)}else{HandleError(error.message,kWebErrorUnknown)}})}catch(error){var kWebErrorUnknown=2;HandleError(error.message,kWebErrorUnknown)}}function _JS_WebRequest_SetRedirectLimit(request,redirectLimit){var requestOptions=wr.requests[request];if(!requestOptions){return}requestOptions.init.redirect=redirectLimit===0?"error":"follow"}function _JS_WebRequest_SetRequestHeader(requestId,header,value){var requestOptions=wr.requests[requestId];if(!requestOptions){return}var _header=UTF8ToString(header);var _value=UTF8ToString(value);requestOptions.init.headers[_header]=_value}function _JS_WebRequest_SetTimeout(requestId,timeout){var requestOptions=wr.requests[requestId];if(!requestOptions){return}requestOptions.timeout=timeout}function _LeaderboardGetEntries(leaderboardNamePtr,successCallbackPtr,errorCallbackPtr,topPlayersCount,competingPlayersCount,includeSelf,pictureSizePtr){yandexGames.throwIfSdkNotInitialized();const leaderboardName=UTF8ToString(leaderboardNamePtr);includeSelf=!!includeSelf;const pictureSize=UTF8ToString(pictureSizePtr);yandexGames.leaderboardGetEntries(leaderboardName,successCallbackPtr,errorCallbackPtr,topPlayersCount,competingPlayersCount,includeSelf,pictureSize)}function _LeaderboardGetPlayerEntry(leaderboardNamePtr,successCallbackPtr,errorCallbackPtr,pictureSizePtr){yandexGames.throwIfSdkNotInitialized();const leaderboardName=UTF8ToString(leaderboardNamePtr);const pictureSize=UTF8ToString(pictureSizePtr);yandexGames.leaderboardGetPlayerEntry(leaderboardName,successCallbackPtr,errorCallbackPtr,pictureSize)}function _LeaderboardSetScore(leaderboardNamePtr,score,successCallbackPtr,errorCallbackPtr,extraDataPtr){yandexGames.throwIfSdkNotInitialized();const leaderboardName=UTF8ToString(leaderboardNamePtr);var extraData=UTF8ToString(extraDataPtr);if(extraData.length===0){extraData=undefined}yandexGames.leaderboardSetScore(leaderboardName,score,successCallbackPtr,errorCallbackPtr,extraData)}function _PlayerAccountAuthorize(successCallbackPtr,errorCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.playerAccountAuthorize(successCallbackPtr,errorCallbackPtr)}function _PlayerAccountGetCloudSaveData(successCallbackPtr,errorCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.playerAccountGetCloudSaveData(successCallbackPtr,errorCallbackPtr)}function _PlayerAccountGetProfileData(successCallbackPtr,errorCallbackPtr,pictureSizePtr){yandexGames.throwIfSdkNotInitialized();const pictureSize=UTF8ToString(pictureSizePtr);yandexGames.playerAccountGetProfileData(successCallbackPtr,errorCallbackPtr,pictureSize)}function _PlayerAccountRequestPersonalProfileDataPermission(successCallbackPtr,errorCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.playerAccountRequestPersonalProfileDataPermission(successCallbackPtr,errorCallbackPtr)}function _PlayerAccountSetCloudSaveData(сloudSaveDataJsonPtr,successCallbackPtr,errorCallbackPtr){yandexGames.throwIfSdkNotInitialized();const сloudSaveDataJson=UTF8ToString(сloudSaveDataJsonPtr);yandexGames.playerAccountSetCloudSaveData(сloudSaveDataJson,successCallbackPtr,errorCallbackPtr)}function _PlayerAccountStartAuthorizationPolling(delay,successCallbackPtr,errorCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.playerAccountStartAuthorizationPolling(delay,successCallbackPtr,errorCallbackPtr)}function _ReviewPopupCanOpen(resultCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.reviewPopupCanOpen(resultCallbackPtr)}function _ReviewPopupOpen(resultCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.reviewPopupOpen(resultCallbackPtr)}function _ShortcutCanSuggest(resultCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.shortcutCanSuggest(resultCallbackPtr)}function _ShortcutSuggest(resultCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.shortcutSuggest(resultCallbackPtr)}function _StickyAdHide(){yandexGames.throwIfSdkNotInitialized();yandexGames.stickyAdHide()}function _StickyAdShow(){yandexGames.throwIfSdkNotInitialized();yandexGames.stickyAdShow()}function _VideoAdShow(openCallbackPtr,rewardedCallbackPtr,closeCallbackPtr,errorCallbackPtr){yandexGames.throwIfSdkNotInitialized();yandexGames.videoAdShow(openCallbackPtr,rewardedCallbackPtr,closeCallbackPtr,errorCallbackPtr)}var webApplication={initialize:function(onInBackgroundChangeCallbackPtr){document.addEventListener("pointerdown",function(){window.focus()});document.addEventListener("visibilitychange",function(){dynCall("vi",onInBackgroundChangeCallbackPtr,[document.hidden])})},getInBackground:function(){return document.hidden}};function _WebApplicationInitialize(onInBackgroundChangeCallbackPtr){webApplication.initialize(onInBackgroundChangeCallbackPtr)}function _YandexGamesSdkGameReady(){yandexGames.throwIfSdkNotInitialized();yandexGames.gameReady()}function _YandexGamesSdkInitialize(successCallbackPtr){yandexGames.yandexGamesSdkInitialize(successCallbackPtr)}function _YandexGamesSdkIsRunningOnYandex(){return window.location.hostname.includes("yandex")}var yandexMetrica={yandexMetricaSend:function(eventName,eventData){const eventDataJson=eventData===""?undefined:JSON.parse(eventData);ym(window.yandexMetricaCounterId,"reachGoal",eventName,eventDataJson)}};function _YandexMetricaSend(eventNamePtr,eventDataPtr){const eventName=UTF8ToString(eventNamePtr);const eventData=UTF8ToString(eventDataPtr);yandexMetrica.yandexMetricaSend(eventName,eventData)}function ___cxa_allocate_exception(size){return _malloc(size+16)+16}function ExceptionInfo(excPtr){this.excPtr=excPtr;this.ptr=excPtr-16;this.set_type=function(type){HEAP32[this.ptr+4>>2]=type};this.get_type=function(){return HEAP32[this.ptr+4>>2]};this.set_destructor=function(destructor){HEAP32[this.ptr+8>>2]=destructor};this.get_destructor=function(){return HEAP32[this.ptr+8>>2]};this.set_refcount=function(refcount){HEAP32[this.ptr>>2]=refcount};this.set_caught=function(caught){caught=caught?1:0;HEAP8[this.ptr+12>>0]=caught};this.get_caught=function(){return HEAP8[this.ptr+12>>0]!=0};this.set_rethrown=function(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+13>>0]=rethrown};this.get_rethrown=function(){return HEAP8[this.ptr+13>>0]!=0};this.init=function(type,destructor){this.set_type(type);this.set_destructor(destructor);this.set_refcount(0);this.set_caught(false);this.set_rethrown(false)};this.add_ref=function(){var value=HEAP32[this.ptr>>2];HEAP32[this.ptr>>2]=value+1};this.release_ref=function(){var prev=HEAP32[this.ptr>>2];HEAP32[this.ptr>>2]=prev-1;return prev===1}}function CatchInfo(ptr){this.free=function(){_free(this.ptr);this.ptr=0};this.set_base_ptr=function(basePtr){HEAP32[this.ptr>>2]=basePtr};this.get_base_ptr=function(){return HEAP32[this.ptr>>2]};this.set_adjusted_ptr=function(adjustedPtr){HEAP32[this.ptr+4>>2]=adjustedPtr};this.get_adjusted_ptr_addr=function(){return this.ptr+4};this.get_adjusted_ptr=function(){return HEAP32[this.ptr+4>>2]};this.get_exception_ptr=function(){var isPointer=___cxa_is_pointer_type(this.get_exception_info().get_type());if(isPointer){return HEAP32[this.get_base_ptr()>>2]}var adjusted=this.get_adjusted_ptr();if(adjusted!==0)return adjusted;return this.get_base_ptr()};this.get_exception_info=function(){return new ExceptionInfo(this.get_base_ptr())};if(ptr===undefined){this.ptr=_malloc(8);this.set_adjusted_ptr(0)}else{this.ptr=ptr}}var exceptionCaught=[];function exception_addRef(info){info.add_ref()}var uncaughtExceptionCount=0;function ___cxa_begin_catch(ptr){var catchInfo=new CatchInfo(ptr);var info=catchInfo.get_exception_info();if(!info.get_caught()){info.set_caught(true);uncaughtExceptionCount--}info.set_rethrown(false);exceptionCaught.push(catchInfo);exception_addRef(info);return catchInfo.get_exception_ptr()}var exceptionLast=0;function ___cxa_free_exception(ptr){return _free(new ExceptionInfo(ptr).ptr)}function exception_decRef(info){if(info.release_ref()&&!info.get_rethrown()){var destructor=info.get_destructor();if(destructor){(function(a1){return dynCall_ii.apply(null,[destructor,a1])})(info.excPtr)}___cxa_free_exception(info.excPtr)}}function ___cxa_end_catch(){_setThrew(0);var catchInfo=exceptionCaught.pop();exception_decRef(catchInfo.get_exception_info());catchInfo.free();exceptionLast=0}function ___resumeException(catchInfoPtr){var catchInfo=new CatchInfo(catchInfoPtr);var ptr=catchInfo.get_base_ptr();if(!exceptionLast){exceptionLast=ptr}catchInfo.free();throw ptr}function ___cxa_find_matching_catch_2(){var thrown=exceptionLast;if(!thrown){setTempRet0(0);return 0|0}var info=new ExceptionInfo(thrown);var thrownType=info.get_type();var catchInfo=new CatchInfo;catchInfo.set_base_ptr(thrown);catchInfo.set_adjusted_ptr(thrown);if(!thrownType){setTempRet0(0);return catchInfo.ptr|0}var typeArray=Array.prototype.slice.call(arguments);for(var i=0;i<typeArray.length;i++){var caughtType=typeArray[i];if(caughtType===0||caughtType===thrownType){break}if(___cxa_can_catch(caughtType,thrownType,catchInfo.get_adjusted_ptr_addr())){setTempRet0(caughtType);return catchInfo.ptr|0}}setTempRet0(thrownType);return catchInfo.ptr|0}function ___cxa_find_matching_catch_3(){var thrown=exceptionLast;if(!thrown){setTempRet0(0);return 0|0}var info=new ExceptionInfo(thrown);var thrownType=info.get_type();var catchInfo=new CatchInfo;catchInfo.set_base_ptr(thrown);catchInfo.set_adjusted_ptr(thrown);if(!thrownType){setTempRet0(0);return catchInfo.ptr|0}var typeArray=Array.prototype.slice.call(arguments);for(var i=0;i<typeArray.length;i++){var caughtType=typeArray[i];if(caughtType===0||caughtType===thrownType){break}if(___cxa_can_catch(caughtType,thrownType,catchInfo.get_adjusted_ptr_addr())){setTempRet0(caughtType);return catchInfo.ptr|0}}setTempRet0(thrownType);return catchInfo.ptr|0}function ___cxa_find_matching_catch_4(){var thrown=exceptionLast;if(!thrown){setTempRet0(0);return 0|0}var info=new ExceptionInfo(thrown);var thrownType=info.get_type();var catchInfo=new CatchInfo;catchInfo.set_base_ptr(thrown);catchInfo.set_adjusted_ptr(thrown);if(!thrownType){setTempRet0(0);return catchInfo.ptr|0}var typeArray=Array.prototype.slice.call(arguments);for(var i=0;i<typeArray.length;i++){var caughtType=typeArray[i];if(caughtType===0||caughtType===thrownType){break}if(___cxa_can_catch(caughtType,thrownType,catchInfo.get_adjusted_ptr_addr())){setTempRet0(caughtType);return catchInfo.ptr|0}}setTempRet0(thrownType);return catchInfo.ptr|0}function ___cxa_rethrow(){var catchInfo=exceptionCaught.pop();if(!catchInfo){abort("no exception to throw")}var info=catchInfo.get_exception_info();var ptr=catchInfo.get_base_ptr();if(!info.get_rethrown()){exceptionCaught.push(catchInfo);info.set_rethrown(true);info.set_caught(false);uncaughtExceptionCount++}else{catchInfo.free()}exceptionLast=ptr;throw ptr}function ___cxa_throw(ptr,type,destructor){var info=new ExceptionInfo(ptr);info.init(type,destructor);exceptionLast=ptr;uncaughtExceptionCount++;throw ptr}var PATH={splitPath:function(filename){var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return splitPathRe.exec(filename).slice(1)},normalizeArray:function(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up;up--){parts.unshift("..")}}return parts},normalize:function(path){var isAbsolute=path.charAt(0)==="/",trailingSlash=path.substr(-1)==="/";path=PATH.normalizeArray(path.split("/").filter(function(p){return!!p}),!isAbsolute).join("/");if(!path&&!isAbsolute){path="."}if(path&&trailingSlash){path+="/"}return(isAbsolute?"/":"")+path},dirname:function(path){var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return"."}if(dir){dir=dir.substr(0,dir.length-1)}return root+dir},basename:function(path){if(path==="/")return"/";path=PATH.normalize(path);path=path.replace(/\/$/,"");var lastSlash=path.lastIndexOf("/");if(lastSlash===-1)return path;return path.substr(lastSlash+1)},extname:function(path){return PATH.splitPath(path)[3]},join:function(){var paths=Array.prototype.slice.call(arguments,0);return PATH.normalize(paths.join("/"))},join2:function(l,r){return PATH.normalize(l+"/"+r)}};function getRandomDevice(){if(typeof crypto=="object"&&typeof crypto["getRandomValues"]=="function"){var randomBuffer=new Uint8Array(1);return function(){crypto.getRandomValues(randomBuffer);return randomBuffer[0]}}else if(ENVIRONMENT_IS_NODE){try{var crypto_module=require("crypto");return function(){return crypto_module["randomBytes"](1)[0]}}catch(e){}}return function(){abort("randomDevice")}}var PATH_FS={resolve:function(){var resolvedPath="",resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:FS.cwd();if(typeof path!="string"){throw new TypeError("Arguments to path.resolve must be strings")}else if(!path){return""}resolvedPath=path+"/"+resolvedPath;resolvedAbsolute=path.charAt(0)==="/"}resolvedPath=PATH.normalizeArray(resolvedPath.split("/").filter(function(p){return!!p}),!resolvedAbsolute).join("/");return(resolvedAbsolute?"/":"")+resolvedPath||"."},relative:function(from,to){from=PATH_FS.resolve(from).substr(1);to=PATH_FS.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=="")break}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=="")break}if(start>end)return[];return arr.slice(start,end-start+1)}var fromParts=trim(from.split("/"));var toParts=trim(to.split("/"));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push("..")}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join("/")}};var TTY={ttys:[],init:function(){},shutdown:function(){},register:function(dev,ops){TTY.ttys[dev]={input:[],output:[],ops:ops};FS.registerDevice(dev,TTY.stream_ops)},stream_ops:{open:function(stream){var tty=TTY.ttys[stream.node.rdev];if(!tty){throw new FS.ErrnoError(43)}stream.tty=tty;stream.seekable=false},close:function(stream){stream.tty.ops.flush(stream.tty)},flush:function(stream){stream.tty.ops.flush(stream.tty)},read:function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.get_char){throw new FS.ErrnoError(60)}var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=stream.tty.ops.get_char(stream.tty)}catch(e){throw new FS.ErrnoError(29)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(6)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.timestamp=Date.now()}return bytesRead},write:function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.put_char){throw new FS.ErrnoError(60)}try{for(var i=0;i<length;i++){stream.tty.ops.put_char(stream.tty,buffer[offset+i])}}catch(e){throw new FS.ErrnoError(29)}if(length){stream.node.timestamp=Date.now()}return i}},default_tty_ops:{get_char:function(tty){if(!tty.input.length){var result=null;if(ENVIRONMENT_IS_NODE){var BUFSIZE=256;var buf=Buffer.alloc(BUFSIZE);var bytesRead=0;try{bytesRead=fs.readSync(process.stdin.fd,buf,0,BUFSIZE,-1)}catch(e){if(e.toString().includes("EOF"))bytesRead=0;else throw e}if(bytesRead>0){result=buf.slice(0,bytesRead).toString("utf-8")}else{result=null}}else if(typeof window!="undefined"&&typeof window.prompt=="function"){result=window.prompt("Input: ");if(result!==null){result+="\n"}}else if(typeof readline=="function"){result=readline();if(result!==null){result+="\n"}}if(!result){return null}tty.input=intArrayFromString(result,true)}return tty.input.shift()},put_char:function(tty,val){if(val===null||val===10){out(UTF8ArrayToString(tty.output,0));tty.output=[]}else{if(val!=0)tty.output.push(val)}},flush:function(tty){if(tty.output&&tty.output.length>0){out(UTF8ArrayToString(tty.output,0));tty.output=[]}}},default_tty1_ops:{put_char:function(tty,val){if(val===null||val===10){err(UTF8ArrayToString(tty.output,0));tty.output=[]}else{if(val!=0)tty.output.push(val)}},flush:function(tty){if(tty.output&&tty.output.length>0){err(UTF8ArrayToString(tty.output,0));tty.output=[]}}}};function zeroMemory(address,size){HEAPU8.fill(0,address,address+size)}function alignMemory(size,alignment){return Math.ceil(size/alignment)*alignment}function mmapAlloc(size){size=alignMemory(size,65536);var ptr=_emscripten_builtin_memalign(65536,size);if(!ptr)return 0;zeroMemory(ptr,size);return ptr}var MEMFS={ops_table:null,mount:function(mount){return MEMFS.createNode(null,"/",16384|511,0)},createNode:function(parent,name,mode,dev){if(FS.isBlkdev(mode)||FS.isFIFO(mode)){throw new FS.ErrnoError(63)}if(!MEMFS.ops_table){MEMFS.ops_table={dir:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,lookup:MEMFS.node_ops.lookup,mknod:MEMFS.node_ops.mknod,rename:MEMFS.node_ops.rename,unlink:MEMFS.node_ops.unlink,rmdir:MEMFS.node_ops.rmdir,readdir:MEMFS.node_ops.readdir,symlink:MEMFS.node_ops.symlink},stream:{llseek:MEMFS.stream_ops.llseek}},file:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:{llseek:MEMFS.stream_ops.llseek,read:MEMFS.stream_ops.read,write:MEMFS.stream_ops.write,allocate:MEMFS.stream_ops.allocate,mmap:MEMFS.stream_ops.mmap,msync:MEMFS.stream_ops.msync}},link:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,readlink:MEMFS.node_ops.readlink},stream:{}},chrdev:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:FS.chrdev_stream_ops}}}var node=FS.createNode(parent,name,mode,dev);if(FS.isDir(node.mode)){node.node_ops=MEMFS.ops_table.dir.node;node.stream_ops=MEMFS.ops_table.dir.stream;node.contents={}}else if(FS.isFile(node.mode)){node.node_ops=MEMFS.ops_table.file.node;node.stream_ops=MEMFS.ops_table.file.stream;node.usedBytes=0;node.contents=null}else if(FS.isLink(node.mode)){node.node_ops=MEMFS.ops_table.link.node;node.stream_ops=MEMFS.ops_table.link.stream}else if(FS.isChrdev(node.mode)){node.node_ops=MEMFS.ops_table.chrdev.node;node.stream_ops=MEMFS.ops_table.chrdev.stream}node.timestamp=Date.now();if(parent){parent.contents[name]=node;parent.timestamp=node.timestamp}return node},getFileDataAsTypedArray:function(node){if(!node.contents)return new Uint8Array(0);if(node.contents.subarray)return node.contents.subarray(0,node.usedBytes);return new Uint8Array(node.contents)},expandFileStorage:function(node,newCapacity){var prevCapacity=node.contents?node.contents.length:0;if(prevCapacity>=newCapacity)return;var CAPACITY_DOUBLING_MAX=1024*1024;newCapacity=Math.max(newCapacity,prevCapacity*(prevCapacity<CAPACITY_DOUBLING_MAX?2:1.125)>>>0);if(prevCapacity!=0)newCapacity=Math.max(newCapacity,256);var oldContents=node.contents;node.contents=new Uint8Array(newCapacity);if(node.usedBytes>0)node.contents.set(oldContents.subarray(0,node.usedBytes),0)},resizeFileStorage:function(node,newSize){if(node.usedBytes==newSize)return;if(newSize==0){node.contents=null;node.usedBytes=0}else{var oldContents=node.contents;node.contents=new Uint8Array(newSize);if(oldContents){node.contents.set(oldContents.subarray(0,Math.min(newSize,node.usedBytes)))}node.usedBytes=newSize}},node_ops:{getattr:function(node){var attr={};attr.dev=FS.isChrdev(node.mode)?node.id:1;attr.ino=node.id;attr.mode=node.mode;attr.nlink=1;attr.uid=0;attr.gid=0;attr.rdev=node.rdev;if(FS.isDir(node.mode)){attr.size=4096}else if(FS.isFile(node.mode)){attr.size=node.usedBytes}else if(FS.isLink(node.mode)){attr.size=node.link.length}else{attr.size=0}attr.atime=new Date(node.timestamp);attr.mtime=new Date(node.timestamp);attr.ctime=new Date(node.timestamp);attr.blksize=4096;attr.blocks=Math.ceil(attr.size/attr.blksize);return attr},setattr:function(node,attr){if(attr.mode!==undefined){node.mode=attr.mode}if(attr.timestamp!==undefined){node.timestamp=attr.timestamp}if(attr.size!==undefined){MEMFS.resizeFileStorage(node,attr.size)}},lookup:function(parent,name){throw FS.genericErrors[44]},mknod:function(parent,name,mode,dev){return MEMFS.createNode(parent,name,mode,dev)},rename:function(old_node,new_dir,new_name){if(FS.isDir(old_node.mode)){var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(new_node){for(var i in new_node.contents){throw new FS.ErrnoError(55)}}}delete old_node.parent.contents[old_node.name];old_node.parent.timestamp=Date.now();old_node.name=new_name;new_dir.contents[new_name]=old_node;new_dir.timestamp=old_node.parent.timestamp;old_node.parent=new_dir},unlink:function(parent,name){delete parent.contents[name];parent.timestamp=Date.now()},rmdir:function(parent,name){var node=FS.lookupNode(parent,name);for(var i in node.contents){throw new FS.ErrnoError(55)}delete parent.contents[name];parent.timestamp=Date.now()},readdir:function(node){var entries=[".",".."];for(var key in node.contents){if(!node.contents.hasOwnProperty(key)){continue}entries.push(key)}return entries},symlink:function(parent,newname,oldpath){var node=MEMFS.createNode(parent,newname,511|40960,0);node.link=oldpath;return node},readlink:function(node){if(!FS.isLink(node.mode)){throw new FS.ErrnoError(28)}return node.link}},stream_ops:{read:function(stream,buffer,offset,length,position){var contents=stream.node.contents;if(position>=stream.node.usedBytes)return 0;var size=Math.min(stream.node.usedBytes-position,length);if(size>8&&contents.subarray){buffer.set(contents.subarray(position,position+size),offset)}else{for(var i=0;i<size;i++)buffer[offset+i]=contents[position+i]}return size},write:function(stream,buffer,offset,length,position,canOwn){if(buffer.buffer===HEAP8.buffer){canOwn=false}if(!length)return 0;var node=stream.node;node.timestamp=Date.now();if(buffer.subarray&&(!node.contents||node.contents.subarray)){if(canOwn){node.contents=buffer.subarray(offset,offset+length);node.usedBytes=length;return length}else if(node.usedBytes===0&&position===0){node.contents=buffer.slice(offset,offset+length);node.usedBytes=length;return length}else if(position+length<=node.usedBytes){node.contents.set(buffer.subarray(offset,offset+length),position);return length}}MEMFS.expandFileStorage(node,position+length);if(node.contents.subarray&&buffer.subarray){node.contents.set(buffer.subarray(offset,offset+length),position)}else{for(var i=0;i<length;i++){node.contents[position+i]=buffer[offset+i]}}node.usedBytes=Math.max(node.usedBytes,position+length);return length},llseek:function(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position}else if(whence===2){if(FS.isFile(stream.node.mode)){position+=stream.node.usedBytes}}if(position<0){throw new FS.ErrnoError(28)}return position},allocate:function(stream,offset,length){MEMFS.expandFileStorage(stream.node,offset+length);stream.node.usedBytes=Math.max(stream.node.usedBytes,offset+length)},mmap:function(stream,address,length,position,prot,flags){if(address!==0){throw new FS.ErrnoError(28)}if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(43)}var ptr;var allocated;var contents=stream.node.contents;if(!(flags&2)&&contents.buffer===buffer){allocated=false;ptr=contents.byteOffset}else{if(position>0||position+length<contents.length){if(contents.subarray){contents=contents.subarray(position,position+length)}else{contents=Array.prototype.slice.call(contents,position,position+length)}}allocated=true;ptr=mmapAlloc(length);if(!ptr){throw new FS.ErrnoError(48)}HEAP8.set(contents,ptr)}return{ptr:ptr,allocated:allocated}},msync:function(stream,buffer,offset,length,mmapFlags){if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(43)}if(mmapFlags&2){return 0}var bytesWritten=MEMFS.stream_ops.write(stream,buffer,0,length,offset,false);return 0}}};function asyncLoad(url,onload,onerror,noRunDep){var dep=!noRunDep?getUniqueRunDependency("al "+url):"";readAsync(url,function(arrayBuffer){assert(arrayBuffer,'Loading data file "'+url+'" failed (no arrayBuffer).');onload(new Uint8Array(arrayBuffer));if(dep)removeRunDependency(dep)},function(event){if(onerror){onerror()}else{throw'Loading data file "'+url+'" failed.'}});if(dep)addRunDependency(dep)}var IDBFS={dbs:{},indexedDB:()=>{if(typeof indexedDB!="undefined")return indexedDB;var ret=null;if(typeof window=="object")ret=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;assert(ret,"IDBFS used, but indexedDB not supported");return ret},DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function(mount){return MEMFS.mount.apply(null,arguments)},syncfs:(mount,populate,callback)=>{IDBFS.getLocalSet(mount,(err,local)=>{if(err)return callback(err);IDBFS.getRemoteSet(mount,(err,remote)=>{if(err)return callback(err);var src=populate?remote:local;var dst=populate?local:remote;IDBFS.reconcile(src,dst,callback)})})},getDB:(name,callback)=>{var db=IDBFS.dbs[name];if(db){return callback(null,db)}var req;try{req=IDBFS.indexedDB().open(name,IDBFS.DB_VERSION)}catch(e){return callback(e)}if(!req){return callback("Unable to connect to IndexedDB")}req.onupgradeneeded=(e=>{var db=e.target.result;var transaction=e.target.transaction;var fileStore;if(db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)){fileStore=transaction.objectStore(IDBFS.DB_STORE_NAME)}else{fileStore=db.createObjectStore(IDBFS.DB_STORE_NAME)}if(!fileStore.indexNames.contains("timestamp")){fileStore.createIndex("timestamp","timestamp",{unique:false})}});req.onsuccess=(()=>{db=req.result;IDBFS.dbs[name]=db;callback(null,db)});req.onerror=(e=>{callback(this.error);e.preventDefault()})},getLocalSet:(mount,callback)=>{var entries={};function isRealDir(p){return p!=="."&&p!==".."}function toAbsolute(root){return p=>{return PATH.join2(root,p)}}var check=FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));while(check.length){var path=check.pop();var stat;try{stat=FS.stat(path)}catch(e){return callback(e)}if(FS.isDir(stat.mode)){check.push.apply(check,FS.readdir(path).filter(isRealDir).map(toAbsolute(path)))}entries[path]={"timestamp":stat.mtime}}return callback(null,{type:"local",entries:entries})},getRemoteSet:(mount,callback)=>{var entries={};IDBFS.getDB(mount.mountpoint,(err,db)=>{if(err)return callback(err);try{var transaction=db.transaction([IDBFS.DB_STORE_NAME],"readonly");transaction.onerror=(e=>{callback(this.error);e.preventDefault()});var store=transaction.objectStore(IDBFS.DB_STORE_NAME);var index=store.index("timestamp");index.openKeyCursor().onsuccess=(event=>{var cursor=event.target.result;if(!cursor){return callback(null,{type:"remote",db:db,entries:entries})}entries[cursor.primaryKey]={"timestamp":cursor.key};cursor.continue()})}catch(e){return callback(e)}})},loadLocalEntry:(path,callback)=>{var stat,node;try{var lookup=FS.lookupPath(path);node=lookup.node;stat=FS.stat(path)}catch(e){return callback(e)}if(FS.isDir(stat.mode)){return callback(null,{"timestamp":stat.mtime,"mode":stat.mode})}else if(FS.isFile(stat.mode)){node.contents=MEMFS.getFileDataAsTypedArray(node);return callback(null,{"timestamp":stat.mtime,"mode":stat.mode,"contents":node.contents})}else{return callback(new Error("node type not supported"))}},storeLocalEntry:(path,entry,callback)=>{try{if(FS.isDir(entry["mode"])){FS.mkdirTree(path,entry["mode"])}else if(FS.isFile(entry["mode"])){FS.writeFile(path,entry["contents"],{canOwn:true})}else{return callback(new Error("node type not supported"))}FS.chmod(path,entry["mode"]);FS.utime(path,entry["timestamp"],entry["timestamp"])}catch(e){return callback(e)}callback(null)},removeLocalEntry:(path,callback)=>{try{var lookup=FS.lookupPath(path);var stat=FS.stat(path);if(FS.isDir(stat.mode)){FS.rmdir(path)}else if(FS.isFile(stat.mode)){FS.unlink(path)}}catch(e){return callback(e)}callback(null)},loadRemoteEntry:(store,path,callback)=>{var req=store.get(path);req.onsuccess=(event=>{callback(null,event.target.result)});req.onerror=(e=>{callback(this.error);e.preventDefault()})},storeRemoteEntry:(store,path,entry,callback)=>{try{var req=store.put(entry,path)}catch(e){callback(e);return}req.onsuccess=(()=>{callback(null)});req.onerror=(e=>{callback(this.error);e.preventDefault()})},removeRemoteEntry:(store,path,callback)=>{var req=store.delete(path);req.onsuccess=(()=>{callback(null)});req.onerror=(e=>{callback(this.error);e.preventDefault()})},reconcile:(src,dst,callback)=>{var total=0;var create=[];Object.keys(src.entries).forEach(function(key){var e=src.entries[key];var e2=dst.entries[key];if(!e2||e["timestamp"].getTime()!=e2["timestamp"].getTime()){create.push(key);total++}});var remove=[];Object.keys(dst.entries).forEach(function(key){if(!src.entries[key]){remove.push(key);total++}});if(!total){return callback(null)}var errored=false;var db=src.type==="remote"?src.db:dst.db;var transaction=db.transaction([IDBFS.DB_STORE_NAME],"readwrite");var store=transaction.objectStore(IDBFS.DB_STORE_NAME);function done(err){if(err&&!errored){errored=true;return callback(err)}}transaction.onerror=(e=>{done(this.error);e.preventDefault()});transaction.oncomplete=(e=>{if(!errored){callback(null)}});create.sort().forEach(path=>{if(dst.type==="local"){IDBFS.loadRemoteEntry(store,path,(err,entry)=>{if(err)return done(err);IDBFS.storeLocalEntry(path,entry,done)})}else{IDBFS.loadLocalEntry(path,(err,entry)=>{if(err)return done(err);IDBFS.storeRemoteEntry(store,path,entry,done)})}});remove.sort().reverse().forEach(path=>{if(dst.type==="local"){IDBFS.removeLocalEntry(path,done)}else{IDBFS.removeRemoteEntry(store,path,done)}})}};var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,lookupPath:(path,opts={})=>{path=PATH_FS.resolve(FS.cwd(),path);if(!path)return{path:"",node:null};var defaults={follow_mount:true,recurse_count:0};opts=Object.assign(defaults,opts);if(opts.recurse_count>8){throw new FS.ErrnoError(32)}var parts=PATH.normalizeArray(path.split("/").filter(p=>!!p),false);var current=FS.root;var current_path="/";for(var i=0;i<parts.length;i++){var islast=i===parts.length-1;if(islast&&opts.parent){break}current=FS.lookupNode(current,parts[i]);current_path=PATH.join2(current_path,parts[i]);if(FS.isMountpoint(current)){if(!islast||islast&&opts.follow_mount){current=current.mounted.root}}if(!islast||opts.follow){var count=0;while(FS.isLink(current.mode)){var link=FS.readlink(current_path);current_path=PATH_FS.resolve(PATH.dirname(current_path),link);var lookup=FS.lookupPath(current_path,{recurse_count:opts.recurse_count+1});current=lookup.node;if(count++>40){throw new FS.ErrnoError(32)}}}}return{path:current_path,node:current}},getPath:node=>{var path;while(true){if(FS.isRoot(node)){var mount=node.mount.mountpoint;if(!path)return mount;return mount[mount.length-1]!=="/"?mount+"/"+path:mount+path}path=path?node.name+"/"+path:node.name;node=node.parent}},hashName:(parentid,name)=>{var hash=0;for(var i=0;i<name.length;i++){hash=(hash<<5)-hash+name.charCodeAt(i)|0}return(parentid+hash>>>0)%FS.nameTable.length},hashAddNode:node=>{var hash=FS.hashName(node.parent.id,node.name);node.name_next=FS.nameTable[hash];FS.nameTable[hash]=node},hashRemoveNode:node=>{var hash=FS.hashName(node.parent.id,node.name);if(FS.nameTable[hash]===node){FS.nameTable[hash]=node.name_next}else{var current=FS.nameTable[hash];while(current){if(current.name_next===node){current.name_next=node.name_next;break}current=current.name_next}}},lookupNode:(parent,name)=>{var errCode=FS.mayLookup(parent);if(errCode){throw new FS.ErrnoError(errCode,parent)}var hash=FS.hashName(parent.id,name);for(var node=FS.nameTable[hash];node;node=node.name_next){var nodeName=node.name;if(node.parent.id===parent.id&&nodeName===name){return node}}return FS.lookup(parent,name)},createNode:(parent,name,mode,rdev)=>{var node=new FS.FSNode(parent,name,mode,rdev);FS.hashAddNode(node);return node},destroyNode:node=>{FS.hashRemoveNode(node)},isRoot:node=>{return node===node.parent},isMountpoint:node=>{return!!node.mounted},isFile:mode=>{return(mode&61440)===32768},isDir:mode=>{return(mode&61440)===16384},isLink:mode=>{return(mode&61440)===40960},isChrdev:mode=>{return(mode&61440)===8192},isBlkdev:mode=>{return(mode&61440)===24576},isFIFO:mode=>{return(mode&61440)===4096},isSocket:mode=>{return(mode&49152)===49152},flagModes:{"r":0,"r+":2,"w":577,"w+":578,"a":1089,"a+":1090},modeStringToFlags:str=>{var flags=FS.flagModes[str];if(typeof flags=="undefined"){throw new Error("Unknown file open mode: "+str)}return flags},flagsToPermissionString:flag=>{var perms=["r","w","rw"][flag&3];if(flag&512){perms+="w"}return perms},nodePermissions:(node,perms)=>{if(FS.ignorePermissions){return 0}if(perms.includes("r")&&!(node.mode&292)){return 2}else if(perms.includes("w")&&!(node.mode&146)){return 2}else if(perms.includes("x")&&!(node.mode&73)){return 2}return 0},mayLookup:dir=>{var errCode=FS.nodePermissions(dir,"x");if(errCode)return errCode;if(!dir.node_ops.lookup)return 2;return 0},mayCreate:(dir,name)=>{try{var node=FS.lookupNode(dir,name);return 20}catch(e){}return FS.nodePermissions(dir,"wx")},mayDelete:(dir,name,isdir)=>{var node;try{node=FS.lookupNode(dir,name)}catch(e){return e.errno}var errCode=FS.nodePermissions(dir,"wx");if(errCode){return errCode}if(isdir){if(!FS.isDir(node.mode)){return 54}if(FS.isRoot(node)||FS.getPath(node)===FS.cwd()){return 10}}else{if(FS.isDir(node.mode)){return 31}}return 0},mayOpen:(node,flags)=>{if(!node){return 44}if(FS.isLink(node.mode)){return 32}else if(FS.isDir(node.mode)){if(FS.flagsToPermissionString(flags)!=="r"||flags&512){return 31}}return FS.nodePermissions(node,FS.flagsToPermissionString(flags))},MAX_OPEN_FDS:4096,nextfd:(fd_start=0,fd_end=FS.MAX_OPEN_FDS)=>{for(var fd=fd_start;fd<=fd_end;fd++){if(!FS.streams[fd]){return fd}}throw new FS.ErrnoError(33)},getStream:fd=>FS.streams[fd],createStream:(stream,fd_start,fd_end)=>{if(!FS.FSStream){FS.FSStream=function(){};FS.FSStream.prototype={object:{get:function(){return this.node},set:function(val){this.node=val}},isRead:{get:function(){return(this.flags&2097155)!==1}},isWrite:{get:function(){return(this.flags&2097155)!==0}},isAppend:{get:function(){return this.flags&1024}}}}stream=Object.assign(new FS.FSStream,stream);var fd=FS.nextfd(fd_start,fd_end);stream.fd=fd;FS.streams[fd]=stream;return stream},closeStream:fd=>{FS.streams[fd]=null},chrdev_stream_ops:{open:stream=>{var device=FS.getDevice(stream.node.rdev);stream.stream_ops=device.stream_ops;if(stream.stream_ops.open){stream.stream_ops.open(stream)}},llseek:()=>{throw new FS.ErrnoError(70)}},major:dev=>dev>>8,minor:dev=>dev&255,makedev:(ma,mi)=>ma<<8|mi,registerDevice:(dev,ops)=>{FS.devices[dev]={stream_ops:ops}},getDevice:dev=>FS.devices[dev],getMounts:mount=>{var mounts=[];var check=[mount];while(check.length){var m=check.pop();mounts.push(m);check.push.apply(check,m.mounts)}return mounts},syncfs:(populate,callback)=>{if(typeof populate=="function"){callback=populate;populate=false}FS.syncFSRequests++;if(FS.syncFSRequests>1){err("warning: "+FS.syncFSRequests+" FS.syncfs operations in flight at once, probably just doing extra work")}var mounts=FS.getMounts(FS.root.mount);var completed=0;function doCallback(errCode){FS.syncFSRequests--;return callback(errCode)}function done(errCode){if(errCode){if(!done.errored){done.errored=true;return doCallback(errCode)}return}if(++completed>=mounts.length){doCallback(null)}}mounts.forEach(mount=>{if(!mount.type.syncfs){return done(null)}mount.type.syncfs(mount,populate,done)})},mount:(type,opts,mountpoint)=>{var root=mountpoint==="/";var pseudo=!mountpoint;var node;if(root&&FS.root){throw new FS.ErrnoError(10)}else if(!root&&!pseudo){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});mountpoint=lookup.path;node=lookup.node;if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}if(!FS.isDir(node.mode)){throw new FS.ErrnoError(54)}}var mount={type:type,opts:opts,mountpoint:mountpoint,mounts:[]};var mountRoot=type.mount(mount);mountRoot.mount=mount;mount.root=mountRoot;if(root){FS.root=mountRoot}else if(node){node.mounted=mount;if(node.mount){node.mount.mounts.push(mount)}}return mountRoot},unmount:mountpoint=>{var lookup=FS.lookupPath(mountpoint,{follow_mount:false});if(!FS.isMountpoint(lookup.node)){throw new FS.ErrnoError(28)}var node=lookup.node;var mount=node.mounted;var mounts=FS.getMounts(mount);Object.keys(FS.nameTable).forEach(hash=>{var current=FS.nameTable[hash];while(current){var next=current.name_next;if(mounts.includes(current.mount)){FS.destroyNode(current)}current=next}});node.mounted=null;var idx=node.mount.mounts.indexOf(mount);node.mount.mounts.splice(idx,1)},lookup:(parent,name)=>{return parent.node_ops.lookup(parent,name)},mknod:(path,mode,dev)=>{var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);if(!name||name==="."||name===".."){throw new FS.ErrnoError(28)}var errCode=FS.mayCreate(parent,name);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.mknod){throw new FS.ErrnoError(63)}return parent.node_ops.mknod(parent,name,mode,dev)},create:(path,mode)=>{mode=mode!==undefined?mode:438;mode&=4095;mode|=32768;return FS.mknod(path,mode,0)},mkdir:(path,mode)=>{mode=mode!==undefined?mode:511;mode&=511|512;mode|=16384;return FS.mknod(path,mode,0)},mkdirTree:(path,mode)=>{var dirs=path.split("/");var d="";for(var i=0;i<dirs.length;++i){if(!dirs[i])continue;d+="/"+dirs[i];try{FS.mkdir(d,mode)}catch(e){if(e.errno!=20)throw e}}},mkdev:(path,mode,dev)=>{if(typeof dev=="undefined"){dev=mode;mode=438}mode|=8192;return FS.mknod(path,mode,dev)},symlink:(oldpath,newpath)=>{if(!PATH_FS.resolve(oldpath)){throw new FS.ErrnoError(44)}var lookup=FS.lookupPath(newpath,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(44)}var newname=PATH.basename(newpath);var errCode=FS.mayCreate(parent,newname);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.symlink){throw new FS.ErrnoError(63)}return parent.node_ops.symlink(parent,newname,oldpath)},rename:(old_path,new_path)=>{var old_dirname=PATH.dirname(old_path);var new_dirname=PATH.dirname(new_path);var old_name=PATH.basename(old_path);var new_name=PATH.basename(new_path);var lookup,old_dir,new_dir;lookup=FS.lookupPath(old_path,{parent:true});old_dir=lookup.node;lookup=FS.lookupPath(new_path,{parent:true});new_dir=lookup.node;if(!old_dir||!new_dir)throw new FS.ErrnoError(44);if(old_dir.mount!==new_dir.mount){throw new FS.ErrnoError(75)}var old_node=FS.lookupNode(old_dir,old_name);var relative=PATH_FS.relative(old_path,new_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(28)}relative=PATH_FS.relative(new_path,old_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(55)}var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(old_node===new_node){return}var isdir=FS.isDir(old_node.mode);var errCode=FS.mayDelete(old_dir,old_name,isdir);if(errCode){throw new FS.ErrnoError(errCode)}errCode=new_node?FS.mayDelete(new_dir,new_name,isdir):FS.mayCreate(new_dir,new_name);if(errCode){throw new FS.ErrnoError(errCode)}if(!old_dir.node_ops.rename){throw new FS.ErrnoError(63)}if(FS.isMountpoint(old_node)||new_node&&FS.isMountpoint(new_node)){throw new FS.ErrnoError(10)}if(new_dir!==old_dir){errCode=FS.nodePermissions(old_dir,"w");if(errCode){throw new FS.ErrnoError(errCode)}}FS.hashRemoveNode(old_node);try{old_dir.node_ops.rename(old_node,new_dir,new_name)}catch(e){throw e}finally{FS.hashAddNode(old_node)}},rmdir:path=>{var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var errCode=FS.mayDelete(parent,name,true);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.rmdir){throw new FS.ErrnoError(63)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}parent.node_ops.rmdir(parent,name);FS.destroyNode(node)},readdir:path=>{var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;if(!node.node_ops.readdir){throw new FS.ErrnoError(54)}return node.node_ops.readdir(node)},unlink:path=>{var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(44)}var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var errCode=FS.mayDelete(parent,name,false);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.unlink){throw new FS.ErrnoError(63)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}parent.node_ops.unlink(parent,name);FS.destroyNode(node)},readlink:path=>{var lookup=FS.lookupPath(path);var link=lookup.node;if(!link){throw new FS.ErrnoError(44)}if(!link.node_ops.readlink){throw new FS.ErrnoError(28)}return PATH_FS.resolve(FS.getPath(link.parent),link.node_ops.readlink(link))},stat:(path,dontFollow)=>{var lookup=FS.lookupPath(path,{follow:!dontFollow});var node=lookup.node;if(!node){throw new FS.ErrnoError(44)}if(!node.node_ops.getattr){throw new FS.ErrnoError(63)}return node.node_ops.getattr(node)},lstat:path=>{return FS.stat(path,true)},chmod:(path,mode,dontFollow)=>{var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(63)}node.node_ops.setattr(node,{mode:mode&4095|node.mode&~4095,timestamp:Date.now()})},lchmod:(path,mode)=>{FS.chmod(path,mode,true)},fchmod:(fd,mode)=>{var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(8)}FS.chmod(stream.node,mode)},chown:(path,uid,gid,dontFollow)=>{var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(63)}node.node_ops.setattr(node,{timestamp:Date.now()})},lchown:(path,uid,gid)=>{FS.chown(path,uid,gid,true)},fchown:(fd,uid,gid)=>{var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(8)}FS.chown(stream.node,uid,gid)},truncate:(path,len)=>{if(len<0){throw new FS.ErrnoError(28)}var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:true});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(63)}if(FS.isDir(node.mode)){throw new FS.ErrnoError(31)}if(!FS.isFile(node.mode)){throw new FS.ErrnoError(28)}var errCode=FS.nodePermissions(node,"w");if(errCode){throw new FS.ErrnoError(errCode)}node.node_ops.setattr(node,{size:len,timestamp:Date.now()})},ftruncate:(fd,len)=>{var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(28)}FS.truncate(stream.node,len)},utime:(path,atime,mtime)=>{var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;node.node_ops.setattr(node,{timestamp:Math.max(atime,mtime)})},open:(path,flags,mode,fd_start,fd_end)=>{if(path===""){throw new FS.ErrnoError(44)}flags=typeof flags=="string"?FS.modeStringToFlags(flags):flags;mode=typeof mode=="undefined"?438:mode;if(flags&64){mode=mode&4095|32768}else{mode=0}var node;if(typeof path=="object"){node=path}else{path=PATH.normalize(path);try{var lookup=FS.lookupPath(path,{follow:!(flags&131072)});node=lookup.node}catch(e){}}var created=false;if(flags&64){if(node){if(flags&128){throw new FS.ErrnoError(20)}}else{node=FS.mknod(path,mode,0);created=true}}if(!node){throw new FS.ErrnoError(44)}if(FS.isChrdev(node.mode)){flags&=~512}if(flags&65536&&!FS.isDir(node.mode)){throw new FS.ErrnoError(54)}if(!created){var errCode=FS.mayOpen(node,flags);if(errCode){throw new FS.ErrnoError(errCode)}}if(flags&512){FS.truncate(node,0)}flags&=~(128|512|131072);var stream=FS.createStream({node:node,path:FS.getPath(node),flags:flags,seekable:true,position:0,stream_ops:node.stream_ops,ungotten:[],error:false},fd_start,fd_end);if(stream.stream_ops.open){stream.stream_ops.open(stream)}if(Module["logReadFiles"]&&!(flags&1)){if(!FS.readFiles)FS.readFiles={};if(!(path in FS.readFiles)){FS.readFiles[path]=1}}return stream},close:stream=>{if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(stream.getdents)stream.getdents=null;try{if(stream.stream_ops.close){stream.stream_ops.close(stream)}}catch(e){throw e}finally{FS.closeStream(stream.fd)}stream.fd=null},isClosed:stream=>{return stream.fd===null},llseek:(stream,offset,whence)=>{if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(!stream.seekable||!stream.stream_ops.llseek){throw new FS.ErrnoError(70)}if(whence!=0&&whence!=1&&whence!=2){throw new FS.ErrnoError(28)}stream.position=stream.stream_ops.llseek(stream,offset,whence);stream.ungotten=[];return stream.position},read:(stream,buffer,offset,length,position)=>{if(length<0||position<0){throw new FS.ErrnoError(28)}if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(8)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(31)}if(!stream.stream_ops.read){throw new FS.ErrnoError(28)}var seeking=typeof position!="undefined";if(!seeking){position=stream.position}else if(!stream.seekable){throw new FS.ErrnoError(70)}var bytesRead=stream.stream_ops.read(stream,buffer,offset,length,position);if(!seeking)stream.position+=bytesRead;return bytesRead},write:(stream,buffer,offset,length,position,canOwn)=>{if(length<0||position<0){throw new FS.ErrnoError(28)}if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(8)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(31)}if(!stream.stream_ops.write){throw new FS.ErrnoError(28)}if(stream.seekable&&stream.flags&1024){FS.llseek(stream,0,2)}var seeking=typeof position!="undefined";if(!seeking){position=stream.position}else if(!stream.seekable){throw new FS.ErrnoError(70)}var bytesWritten=stream.stream_ops.write(stream,buffer,offset,length,position,canOwn);if(!seeking)stream.position+=bytesWritten;return bytesWritten},allocate:(stream,offset,length)=>{if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(offset<0||length<=0){throw new FS.ErrnoError(28)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(8)}if(!FS.isFile(stream.node.mode)&&!FS.isDir(stream.node.mode)){throw new FS.ErrnoError(43)}if(!stream.stream_ops.allocate){throw new FS.ErrnoError(138)}stream.stream_ops.allocate(stream,offset,length)},mmap:(stream,address,length,position,prot,flags)=>{if((prot&2)!==0&&(flags&2)===0&&(stream.flags&2097155)!==2){throw new FS.ErrnoError(2)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(2)}if(!stream.stream_ops.mmap){throw new FS.ErrnoError(43)}return stream.stream_ops.mmap(stream,address,length,position,prot,flags)},msync:(stream,buffer,offset,length,mmapFlags)=>{if(!stream||!stream.stream_ops.msync){return 0}return stream.stream_ops.msync(stream,buffer,offset,length,mmapFlags)},munmap:stream=>0,ioctl:(stream,cmd,arg)=>{if(!stream.stream_ops.ioctl){throw new FS.ErrnoError(59)}return stream.stream_ops.ioctl(stream,cmd,arg)},readFile:(path,opts={})=>{opts.flags=opts.flags||0;opts.encoding=opts.encoding||"binary";if(opts.encoding!=="utf8"&&opts.encoding!=="binary"){throw new Error('Invalid encoding type "'+opts.encoding+'"')}var ret;var stream=FS.open(path,opts.flags);var stat=FS.stat(path);var length=stat.size;var buf=new Uint8Array(length);FS.read(stream,buf,0,length,0);if(opts.encoding==="utf8"){ret=UTF8ArrayToString(buf,0)}else if(opts.encoding==="binary"){ret=buf}FS.close(stream);return ret},writeFile:(path,data,opts={})=>{opts.flags=opts.flags||577;var stream=FS.open(path,opts.flags,opts.mode);if(typeof data=="string"){var buf=new Uint8Array(lengthBytesUTF8(data)+1);var actualNumBytes=stringToUTF8Array(data,buf,0,buf.length);FS.write(stream,buf,0,actualNumBytes,undefined,opts.canOwn)}else if(ArrayBuffer.isView(data)){FS.write(stream,data,0,data.byteLength,undefined,opts.canOwn)}else{throw new Error("Unsupported data type")}FS.close(stream)},cwd:()=>FS.currentPath,chdir:path=>{var lookup=FS.lookupPath(path,{follow:true});if(lookup.node===null){throw new FS.ErrnoError(44)}if(!FS.isDir(lookup.node.mode)){throw new FS.ErrnoError(54)}var errCode=FS.nodePermissions(lookup.node,"x");if(errCode){throw new FS.ErrnoError(errCode)}FS.currentPath=lookup.path},createDefaultDirectories:()=>{FS.mkdir("/tmp");FS.mkdir("/home");FS.mkdir("/home/web_user")},createDefaultDevices:()=>{FS.mkdir("/dev");FS.registerDevice(FS.makedev(1,3),{read:()=>0,write:(stream,buffer,offset,length,pos)=>length});FS.mkdev("/dev/null",FS.makedev(1,3));TTY.register(FS.makedev(5,0),TTY.default_tty_ops);TTY.register(FS.makedev(6,0),TTY.default_tty1_ops);FS.mkdev("/dev/tty",FS.makedev(5,0));FS.mkdev("/dev/tty1",FS.makedev(6,0));var random_device=getRandomDevice();FS.createDevice("/dev","random",random_device);FS.createDevice("/dev","urandom",random_device);FS.mkdir("/dev/shm");FS.mkdir("/dev/shm/tmp")},createSpecialDirectories:()=>{FS.mkdir("/proc");var proc_self=FS.mkdir("/proc/self");FS.mkdir("/proc/self/fd");FS.mount({mount:()=>{var node=FS.createNode(proc_self,"fd",16384|511,73);node.node_ops={lookup:(parent,name)=>{var fd=+name;var stream=FS.getStream(fd);if(!stream)throw new FS.ErrnoError(8);var ret={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:()=>stream.path}};ret.parent=ret;return ret}};return node}},{},"/proc/self/fd")},createStandardStreams:()=>{if(Module["stdin"]){FS.createDevice("/dev","stdin",Module["stdin"])}else{FS.symlink("/dev/tty","/dev/stdin")}if(Module["stdout"]){FS.createDevice("/dev","stdout",null,Module["stdout"])}else{FS.symlink("/dev/tty","/dev/stdout")}if(Module["stderr"]){FS.createDevice("/dev","stderr",null,Module["stderr"])}else{FS.symlink("/dev/tty1","/dev/stderr")}var stdin=FS.open("/dev/stdin",0);var stdout=FS.open("/dev/stdout",1);var stderr=FS.open("/dev/stderr",1)},ensureErrnoError:()=>{if(FS.ErrnoError)return;FS.ErrnoError=function ErrnoError(errno,node){this.node=node;this.setErrno=function(errno){this.errno=errno};this.setErrno(errno);this.message="FS error"};FS.ErrnoError.prototype=new Error;FS.ErrnoError.prototype.constructor=FS.ErrnoError;[44].forEach(code=>{FS.genericErrors[code]=new FS.ErrnoError(code);FS.genericErrors[code].stack="<generic error, no stack>"})},staticInit:()=>{FS.ensureErrnoError();FS.nameTable=new Array(4096);FS.mount(MEMFS,{},"/");FS.createDefaultDirectories();FS.createDefaultDevices();FS.createSpecialDirectories();FS.filesystems={"MEMFS":MEMFS,"IDBFS":IDBFS}},init:(input,output,error)=>{FS.init.initialized=true;FS.ensureErrnoError();Module["stdin"]=input||Module["stdin"];Module["stdout"]=output||Module["stdout"];Module["stderr"]=error||Module["stderr"];FS.createStandardStreams()},quit:()=>{FS.init.initialized=false;for(var i=0;i<FS.streams.length;i++){var stream=FS.streams[i];if(!stream){continue}FS.close(stream)}},getMode:(canRead,canWrite)=>{var mode=0;if(canRead)mode|=292|73;if(canWrite)mode|=146;return mode},findObject:(path,dontResolveLastLink)=>{var ret=FS.analyzePath(path,dontResolveLastLink);if(ret.exists){return ret.object}else{return null}},analyzePath:(path,dontResolveLastLink)=>{try{var lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});path=lookup.path}catch(e){}var ret={isRoot:false,exists:false,error:0,name:null,path:null,object:null,parentExists:false,parentPath:null,parentObject:null};try{var lookup=FS.lookupPath(path,{parent:true});ret.parentExists=true;ret.parentPath=lookup.path;ret.parentObject=lookup.node;ret.name=PATH.basename(path);lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});ret.exists=true;ret.path=lookup.path;ret.object=lookup.node;ret.name=lookup.node.name;ret.isRoot=lookup.path==="/"}catch(e){ret.error=e.errno}return ret},createPath:(parent,path,canRead,canWrite)=>{parent=typeof parent=="string"?parent:FS.getPath(parent);var parts=path.split("/").reverse();while(parts.length){var part=parts.pop();if(!part)continue;var current=PATH.join2(parent,part);try{FS.mkdir(current)}catch(e){}parent=current}return current},createFile:(parent,name,properties,canRead,canWrite)=>{var path=PATH.join2(typeof parent=="string"?parent:FS.getPath(parent),name);var mode=FS.getMode(canRead,canWrite);return FS.create(path,mode)},createDataFile:(parent,name,data,canRead,canWrite,canOwn)=>{var path=name;if(parent){parent=typeof parent=="string"?parent:FS.getPath(parent);path=name?PATH.join2(parent,name):parent}var mode=FS.getMode(canRead,canWrite);var node=FS.create(path,mode);if(data){if(typeof data=="string"){var arr=new Array(data.length);for(var i=0,len=data.length;i<len;++i)arr[i]=data.charCodeAt(i);data=arr}FS.chmod(node,mode|146);var stream=FS.open(node,577);FS.write(stream,data,0,data.length,0,canOwn);FS.close(stream);FS.chmod(node,mode)}return node},createDevice:(parent,name,input,output)=>{var path=PATH.join2(typeof parent=="string"?parent:FS.getPath(parent),name);var mode=FS.getMode(!!input,!!output);if(!FS.createDevice.major)FS.createDevice.major=64;var dev=FS.makedev(FS.createDevice.major++,0);FS.registerDevice(dev,{open:stream=>{stream.seekable=false},close:stream=>{if(output&&output.buffer&&output.buffer.length){output(10)}},read:(stream,buffer,offset,length,pos)=>{var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=input()}catch(e){throw new FS.ErrnoError(29)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(6)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.timestamp=Date.now()}return bytesRead},write:(stream,buffer,offset,length,pos)=>{for(var i=0;i<length;i++){try{output(buffer[offset+i])}catch(e){throw new FS.ErrnoError(29)}}if(length){stream.node.timestamp=Date.now()}return i}});return FS.mkdev(path,mode,dev)},forceLoadFile:obj=>{if(obj.isDevice||obj.isFolder||obj.link||obj.contents)return true;if(typeof XMLHttpRequest!="undefined"){throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")}else if(read_){try{obj.contents=intArrayFromString(read_(obj.url),true);obj.usedBytes=obj.contents.length}catch(e){throw new FS.ErrnoError(29)}}else{throw new Error("Cannot load without read() or XMLHttpRequest.")}},createLazyFile:(parent,name,url,canRead,canWrite)=>{function LazyUint8Array(){this.lengthKnown=false;this.chunks=[]}LazyUint8Array.prototype.get=function LazyUint8Array_get(idx){if(idx>this.length-1||idx<0){return undefined}var chunkOffset=idx%this.chunkSize;var chunkNum=idx/this.chunkSize|0;return this.getter(chunkNum)[chunkOffset]};LazyUint8Array.prototype.setDataGetter=function LazyUint8Array_setDataGetter(getter){this.getter=getter};LazyUint8Array.prototype.cacheLength=function LazyUint8Array_cacheLength(){var xhr=new XMLHttpRequest;xhr.open("HEAD",url,false);xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);var datalength=Number(xhr.getResponseHeader("Content-length"));var header;var hasByteServing=(header=xhr.getResponseHeader("Accept-Ranges"))&&header==="bytes";var usesGzip=(header=xhr.getResponseHeader("Content-Encoding"))&&header==="gzip";var chunkSize=1024*1024;if(!hasByteServing)chunkSize=datalength;var doXHR=(from,to)=>{if(from>to)throw new Error("invalid range ("+from+", "+to+") or no bytes requested!");if(to>datalength-1)throw new Error("only "+datalength+" bytes available! programmer error!");var xhr=new XMLHttpRequest;xhr.open("GET",url,false);if(datalength!==chunkSize)xhr.setRequestHeader("Range","bytes="+from+"-"+to);xhr.responseType="arraybuffer";if(xhr.overrideMimeType){xhr.overrideMimeType("text/plain; charset=x-user-defined")}xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);if(xhr.response!==undefined){return new Uint8Array(xhr.response||[])}else{return intArrayFromString(xhr.responseText||"",true)}};var lazyArray=this;lazyArray.setDataGetter(chunkNum=>{var start=chunkNum*chunkSize;var end=(chunkNum+1)*chunkSize-1;end=Math.min(end,datalength-1);if(typeof lazyArray.chunks[chunkNum]=="undefined"){lazyArray.chunks[chunkNum]=doXHR(start,end)}if(typeof lazyArray.chunks[chunkNum]=="undefined")throw new Error("doXHR failed!");return lazyArray.chunks[chunkNum]});if(usesGzip||!datalength){chunkSize=datalength=1;datalength=this.getter(0).length;chunkSize=datalength;out("LazyFiles on gzip forces download of the whole file when length is accessed")}this._length=datalength;this._chunkSize=chunkSize;this.lengthKnown=true};if(typeof XMLHttpRequest!="undefined"){if(!ENVIRONMENT_IS_WORKER)throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";var lazyArray=new LazyUint8Array;Object.defineProperties(lazyArray,{length:{get:function(){if(!this.lengthKnown){this.cacheLength()}return this._length}},chunkSize:{get:function(){if(!this.lengthKnown){this.cacheLength()}return this._chunkSize}}});var properties={isDevice:false,contents:lazyArray}}else{var properties={isDevice:false,url:url}}var node=FS.createFile(parent,name,properties,canRead,canWrite);if(properties.contents){node.contents=properties.contents}else if(properties.url){node.contents=null;node.url=properties.url}Object.defineProperties(node,{usedBytes:{get:function(){return this.contents.length}}});var stream_ops={};var keys=Object.keys(node.stream_ops);keys.forEach(key=>{var fn=node.stream_ops[key];stream_ops[key]=function forceLoadLazyFile(){FS.forceLoadFile(node);return fn.apply(null,arguments)}});stream_ops.read=((stream,buffer,offset,length,position)=>{FS.forceLoadFile(node);var contents=stream.node.contents;if(position>=contents.length)return 0;var size=Math.min(contents.length-position,length);if(contents.slice){for(var i=0;i<size;i++){buffer[offset+i]=contents[position+i]}}else{for(var i=0;i<size;i++){buffer[offset+i]=contents.get(position+i)}}return size});node.stream_ops=stream_ops;return node},createPreloadedFile:(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,canOwn,preFinish)=>{var fullname=name?PATH_FS.resolve(PATH.join2(parent,name)):parent;var dep=getUniqueRunDependency("cp "+fullname);function processData(byteArray){function finish(byteArray){if(preFinish)preFinish();if(!dontCreateFile){FS.createDataFile(parent,name,byteArray,canRead,canWrite,canOwn)}if(onload)onload();removeRunDependency(dep)}if(Browser.handledByPreloadPlugin(byteArray,fullname,finish,()=>{if(onerror)onerror();removeRunDependency(dep)})){return}finish(byteArray)}addRunDependency(dep);if(typeof url=="string"){asyncLoad(url,byteArray=>processData(byteArray),onerror)}else{processData(url)}},indexedDB:()=>{return window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB},DB_NAME:()=>{return"EM_FS_"+window.location.pathname},DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:(paths,onload,onerror)=>{onload=onload||(()=>{});onerror=onerror||(()=>{});var indexedDB=FS.indexedDB();try{var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION)}catch(e){return onerror(e)}openRequest.onupgradeneeded=(()=>{out("creating db");var db=openRequest.result;db.createObjectStore(FS.DB_STORE_NAME)});openRequest.onsuccess=(()=>{var db=openRequest.result;var transaction=db.transaction([FS.DB_STORE_NAME],"readwrite");var files=transaction.objectStore(FS.DB_STORE_NAME);var ok=0,fail=0,total=paths.length;function finish(){if(fail==0)onload();else onerror()}paths.forEach(path=>{var putRequest=files.put(FS.analyzePath(path).object.contents,path);putRequest.onsuccess=(()=>{ok++;if(ok+fail==total)finish()});putRequest.onerror=(()=>{fail++;if(ok+fail==total)finish()})});transaction.onerror=onerror});openRequest.onerror=onerror},loadFilesFromDB:(paths,onload,onerror)=>{onload=onload||(()=>{});onerror=onerror||(()=>{});var indexedDB=FS.indexedDB();try{var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION)}catch(e){return onerror(e)}openRequest.onupgradeneeded=onerror;openRequest.onsuccess=(()=>{var db=openRequest.result;try{var transaction=db.transaction([FS.DB_STORE_NAME],"readonly")}catch(e){onerror(e);return}var files=transaction.objectStore(FS.DB_STORE_NAME);var ok=0,fail=0,total=paths.length;function finish(){if(fail==0)onload();else onerror()}paths.forEach(path=>{var getRequest=files.get(path);getRequest.onsuccess=(()=>{if(FS.analyzePath(path).exists){FS.unlink(path)}FS.createDataFile(PATH.dirname(path),PATH.basename(path),getRequest.result,true,true,true);ok++;if(ok+fail==total)finish()});getRequest.onerror=(()=>{fail++;if(ok+fail==total)finish()})});transaction.onerror=onerror});openRequest.onerror=onerror}};var SYSCALLS={DEFAULT_POLLMASK:5,calculateAt:function(dirfd,path,allowEmpty){if(path[0]==="/"){return path}var dir;if(dirfd===-100){dir=FS.cwd()}else{var dirstream=FS.getStream(dirfd);if(!dirstream)throw new FS.ErrnoError(8);dir=dirstream.path}if(path.length==0){if(!allowEmpty){throw new FS.ErrnoError(44)}return dir}return PATH.join2(dir,path)},doStat:function(func,path,buf){try{var stat=func(path)}catch(e){if(e&&e.node&&PATH.normalize(path)!==PATH.normalize(FS.getPath(e.node))){return-54}throw e}HEAP32[buf>>2]=stat.dev;HEAP32[buf+4>>2]=0;HEAP32[buf+8>>2]=stat.ino;HEAP32[buf+12>>2]=stat.mode;HEAP32[buf+16>>2]=stat.nlink;HEAP32[buf+20>>2]=stat.uid;HEAP32[buf+24>>2]=stat.gid;HEAP32[buf+28>>2]=stat.rdev;HEAP32[buf+32>>2]=0;tempI64=[stat.size>>>0,(tempDouble=stat.size,+Math.abs(tempDouble)>=1?tempDouble>0?(Math.min(+Math.floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[buf+40>>2]=tempI64[0],HEAP32[buf+44>>2]=tempI64[1];HEAP32[buf+48>>2]=4096;HEAP32[buf+52>>2]=stat.blocks;HEAP32[buf+56>>2]=stat.atime.getTime()/1e3|0;HEAP32[buf+60>>2]=0;HEAP32[buf+64>>2]=stat.mtime.getTime()/1e3|0;HEAP32[buf+68>>2]=0;HEAP32[buf+72>>2]=stat.ctime.getTime()/1e3|0;HEAP32[buf+76>>2]=0;tempI64=[stat.ino>>>0,(tempDouble=stat.ino,+Math.abs(tempDouble)>=1?tempDouble>0?(Math.min(+Math.floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[buf+80>>2]=tempI64[0],HEAP32[buf+84>>2]=tempI64[1];return 0},doMsync:function(addr,stream,len,flags,offset){var buffer=HEAPU8.slice(addr,addr+len);FS.msync(stream,buffer,offset,len,flags)},doMkdir:function(path,mode){path=PATH.normalize(path);if(path[path.length-1]==="/")path=path.substr(0,path.length-1);FS.mkdir(path,mode,0);return 0},doMknod:function(path,mode,dev){switch(mode&61440){case 32768:case 8192:case 24576:case 4096:case 49152:break;default:return-28}FS.mknod(path,mode,dev);return 0},doReadlink:function(path,buf,bufsize){if(bufsize<=0)return-28;var ret=FS.readlink(path);var len=Math.min(bufsize,lengthBytesUTF8(ret));var endChar=HEAP8[buf+len];stringToUTF8(ret,buf,bufsize+1);HEAP8[buf+len]=endChar;return len},doAccess:function(path,amode){if(amode&~7){return-28}var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;if(!node){return-44}var perms="";if(amode&4)perms+="r";if(amode&2)perms+="w";if(amode&1)perms+="x";if(perms&&FS.nodePermissions(node,perms)){return-2}return 0},doReadv:function(stream,iov,iovcnt,offset){var ret=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];var curr=FS.read(stream,HEAP8,ptr,len,offset);if(curr<0)return-1;ret+=curr;if(curr<len)break}return ret},doWritev:function(stream,iov,iovcnt,offset){var ret=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];var curr=FS.write(stream,HEAP8,ptr,len,offset);if(curr<0)return-1;ret+=curr}return ret},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},getStreamFromFD:function(fd){var stream=FS.getStream(fd);if(!stream)throw new FS.ErrnoError(8);return stream},get64:function(low,high){return low}};function ___syscall__newselect(nfds,readfds,writefds,exceptfds,timeout){try{var total=0;var srcReadLow=readfds?HEAP32[readfds>>2]:0,srcReadHigh=readfds?HEAP32[readfds+4>>2]:0;var srcWriteLow=writefds?HEAP32[writefds>>2]:0,srcWriteHigh=writefds?HEAP32[writefds+4>>2]:0;var srcExceptLow=exceptfds?HEAP32[exceptfds>>2]:0,srcExceptHigh=exceptfds?HEAP32[exceptfds+4>>2]:0;var dstReadLow=0,dstReadHigh=0;var dstWriteLow=0,dstWriteHigh=0;var dstExceptLow=0,dstExceptHigh=0;var allLow=(readfds?HEAP32[readfds>>2]:0)|(writefds?HEAP32[writefds>>2]:0)|(exceptfds?HEAP32[exceptfds>>2]:0);var allHigh=(readfds?HEAP32[readfds+4>>2]:0)|(writefds?HEAP32[writefds+4>>2]:0)|(exceptfds?HEAP32[exceptfds+4>>2]:0);var check=function(fd,low,high,val){return fd<32?low&val:high&val};for(var fd=0;fd<nfds;fd++){var mask=1<<fd%32;if(!check(fd,allLow,allHigh,mask)){continue}var stream=FS.getStream(fd);if(!stream)throw new FS.ErrnoError(8);var flags=SYSCALLS.DEFAULT_POLLMASK;if(stream.stream_ops.poll){flags=stream.stream_ops.poll(stream)}if(flags&1&&check(fd,srcReadLow,srcReadHigh,mask)){fd<32?dstReadLow=dstReadLow|mask:dstReadHigh=dstReadHigh|mask;total++}if(flags&4&&check(fd,srcWriteLow,srcWriteHigh,mask)){fd<32?dstWriteLow=dstWriteLow|mask:dstWriteHigh=dstWriteHigh|mask;total++}if(flags&2&&check(fd,srcExceptLow,srcExceptHigh,mask)){fd<32?dstExceptLow=dstExceptLow|mask:dstExceptHigh=dstExceptHigh|mask;total++}}if(readfds){HEAP32[readfds>>2]=dstReadLow;HEAP32[readfds+4>>2]=dstReadHigh}if(writefds){HEAP32[writefds>>2]=dstWriteLow;HEAP32[writefds+4>>2]=dstWriteHigh}if(exceptfds){HEAP32[exceptfds>>2]=dstExceptLow;HEAP32[exceptfds+4>>2]=dstExceptHigh}return total}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}var SOCKFS={mount:function(mount){Module["websocket"]=Module["websocket"]&&"object"===typeof Module["websocket"]?Module["websocket"]:{};Module["websocket"]._callbacks={};Module["websocket"]["on"]=function(event,callback){if("function"===typeof callback){this._callbacks[event]=callback}return this};Module["websocket"].emit=function(event,param){if("function"===typeof this._callbacks[event]){this._callbacks[event].call(this,param)}};return FS.createNode(null,"/",16384|511,0)},createSocket:function(family,type,protocol){type&=~526336;var streaming=type==1;if(streaming&&protocol&&protocol!=6){throw new FS.ErrnoError(66)}var sock={family:family,type:type,protocol:protocol,server:null,error:null,peers:{},pending:[],recv_queue:[],sock_ops:SOCKFS.websocket_sock_ops};var name=SOCKFS.nextname();var node=FS.createNode(SOCKFS.root,name,49152,0);node.sock=sock;var stream=FS.createStream({path:name,node:node,flags:2,seekable:false,stream_ops:SOCKFS.stream_ops});sock.stream=stream;return sock},getSocket:function(fd){var stream=FS.getStream(fd);if(!stream||!FS.isSocket(stream.node.mode)){return null}return stream.node.sock},stream_ops:{poll:function(stream){var sock=stream.node.sock;return sock.sock_ops.poll(sock)},ioctl:function(stream,request,varargs){var sock=stream.node.sock;return sock.sock_ops.ioctl(sock,request,varargs)},read:function(stream,buffer,offset,length,position){var sock=stream.node.sock;var msg=sock.sock_ops.recvmsg(sock,length);if(!msg){return 0}buffer.set(msg.buffer,offset);return msg.buffer.length},write:function(stream,buffer,offset,length,position){var sock=stream.node.sock;return sock.sock_ops.sendmsg(sock,buffer,offset,length)},close:function(stream){var sock=stream.node.sock;sock.sock_ops.close(sock)}},nextname:function(){if(!SOCKFS.nextname.current){SOCKFS.nextname.current=0}return"socket["+SOCKFS.nextname.current+++"]"},websocket_sock_ops:{createPeer:function(sock,addr,port){var ws;if(typeof addr=="object"){ws=addr;addr=null;port=null}if(ws){if(ws._socket){addr=ws._socket.remoteAddress;port=ws._socket.remotePort}else{var result=/ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);if(!result){throw new Error("WebSocket URL must be in the format ws(s)://address:port")}addr=result[1];port=parseInt(result[2],10)}}else{try{var runtimeConfig=Module["websocket"]&&"object"===typeof Module["websocket"];var url="ws:#".replace("#","//");if(runtimeConfig){if("string"===typeof Module["websocket"]["url"]){url=Module["websocket"]["url"]}}if(url==="ws://"||url==="wss://"){var parts=addr.split("/");url=url+parts[0]+":"+port+"/"+parts.slice(1).join("/")}var subProtocols="binary";if(runtimeConfig){if("string"===typeof Module["websocket"]["subprotocol"]){subProtocols=Module["websocket"]["subprotocol"]}}var opts=undefined;if(subProtocols!=="null"){subProtocols=subProtocols.replace(/^ +| +$/g,"").split(/ *, */);opts=ENVIRONMENT_IS_NODE?{"protocol":subProtocols.toString()}:subProtocols}if(runtimeConfig&&null===Module["websocket"]["subprotocol"]){subProtocols="null";opts=undefined}var WebSocketConstructor;if(ENVIRONMENT_IS_NODE){WebSocketConstructor=require("ws")}else{WebSocketConstructor=WebSocket}ws=new WebSocketConstructor(url,opts);ws.binaryType="arraybuffer"}catch(e){throw new FS.ErrnoError(23)}}var peer={addr:addr,port:port,socket:ws,dgram_send_queue:[]};SOCKFS.websocket_sock_ops.addPeer(sock,peer);SOCKFS.websocket_sock_ops.handlePeerEvents(sock,peer);if(sock.type===2&&typeof sock.sport!="undefined"){peer.dgram_send_queue.push(new Uint8Array([255,255,255,255,"p".charCodeAt(0),"o".charCodeAt(0),"r".charCodeAt(0),"t".charCodeAt(0),(sock.sport&65280)>>8,sock.sport&255]))}return peer},getPeer:function(sock,addr,port){return sock.peers[addr+":"+port]},addPeer:function(sock,peer){sock.peers[peer.addr+":"+peer.port]=peer},removePeer:function(sock,peer){delete sock.peers[peer.addr+":"+peer.port]},handlePeerEvents:function(sock,peer){var first=true;var handleOpen=function(){Module["websocket"].emit("open",sock.stream.fd);try{var queued=peer.dgram_send_queue.shift();while(queued){peer.socket.send(queued);queued=peer.dgram_send_queue.shift()}}catch(e){peer.socket.close()}};function handleMessage(data){if(typeof data=="string"){var encoder=new TextEncoder;data=encoder.encode(data)}else{assert(data.byteLength!==undefined);if(data.byteLength==0){return}else{data=new Uint8Array(data)}}var wasfirst=first;first=false;if(wasfirst&&data.length===10&&data[0]===255&&data[1]===255&&data[2]===255&&data[3]===255&&data[4]==="p".charCodeAt(0)&&data[5]==="o".charCodeAt(0)&&data[6]==="r".charCodeAt(0)&&data[7]==="t".charCodeAt(0)){var newport=data[8]<<8|data[9];SOCKFS.websocket_sock_ops.removePeer(sock,peer);peer.port=newport;SOCKFS.websocket_sock_ops.addPeer(sock,peer);return}sock.recv_queue.push({addr:peer.addr,port:peer.port,data:data});Module["websocket"].emit("message",sock.stream.fd)}if(ENVIRONMENT_IS_NODE){peer.socket.on("open",handleOpen);peer.socket.on("message",function(data,flags){if(!flags.binary){return}handleMessage(new Uint8Array(data).buffer)});peer.socket.on("close",function(){Module["websocket"].emit("close",sock.stream.fd)});peer.socket.on("error",function(error){sock.error=14;Module["websocket"].emit("error",[sock.stream.fd,sock.error,"ECONNREFUSED: Connection refused"])})}else{peer.socket.onopen=handleOpen;peer.socket.onclose=function(){Module["websocket"].emit("close",sock.stream.fd)};peer.socket.onmessage=function peer_socket_onmessage(event){handleMessage(event.data)};peer.socket.onerror=function(error){sock.error=14;Module["websocket"].emit("error",[sock.stream.fd,sock.error,"ECONNREFUSED: Connection refused"])}}},poll:function(sock){if(sock.type===1&&sock.server){return sock.pending.length?64|1:0}var mask=0;var dest=sock.type===1?SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport):null;if(sock.recv_queue.length||!dest||dest&&dest.socket.readyState===dest.socket.CLOSING||dest&&dest.socket.readyState===dest.socket.CLOSED){mask|=64|1}if(!dest||dest&&dest.socket.readyState===dest.socket.OPEN){mask|=4}if(dest&&dest.socket.readyState===dest.socket.CLOSING||dest&&dest.socket.readyState===dest.socket.CLOSED){mask|=16}return mask},ioctl:function(sock,request,arg){switch(request){case 21531:var bytes=0;if(sock.recv_queue.length){bytes=sock.recv_queue[0].data.length}HEAP32[arg>>2]=bytes;return 0;default:return 28}},close:function(sock){if(sock.server){try{sock.server.close()}catch(e){}sock.server=null}var peers=Object.keys(sock.peers);for(var i=0;i<peers.length;i++){var peer=sock.peers[peers[i]];try{peer.socket.close()}catch(e){}SOCKFS.websocket_sock_ops.removePeer(sock,peer)}return 0},bind:function(sock,addr,port){if(typeof sock.saddr!="undefined"||typeof sock.sport!="undefined"){throw new FS.ErrnoError(28)}sock.saddr=addr;sock.sport=port;if(sock.type===2){if(sock.server){sock.server.close();sock.server=null}try{sock.sock_ops.listen(sock,0)}catch(e){if(!(e instanceof FS.ErrnoError))throw e;if(e.errno!==138)throw e}}},connect:function(sock,addr,port){if(sock.server){throw new FS.ErrnoError(138)}if(typeof sock.daddr!="undefined"&&typeof sock.dport!="undefined"){var dest=SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport);if(dest){if(dest.socket.readyState===dest.socket.CONNECTING){throw new FS.ErrnoError(7)}else{throw new FS.ErrnoError(30)}}}var peer=SOCKFS.websocket_sock_ops.createPeer(sock,addr,port);sock.daddr=peer.addr;sock.dport=peer.port;throw new FS.ErrnoError(26)},listen:function(sock,backlog){if(!ENVIRONMENT_IS_NODE){throw new FS.ErrnoError(138)}if(sock.server){throw new FS.ErrnoError(28)}var WebSocketServer=require("ws").Server;var host=sock.saddr;sock.server=new WebSocketServer({host:host,port:sock.sport});Module["websocket"].emit("listen",sock.stream.fd);sock.server.on("connection",function(ws){if(sock.type===1){var newsock=SOCKFS.createSocket(sock.family,sock.type,sock.protocol);var peer=SOCKFS.websocket_sock_ops.createPeer(newsock,ws);newsock.daddr=peer.addr;newsock.dport=peer.port;sock.pending.push(newsock);Module["websocket"].emit("connection",newsock.stream.fd)}else{SOCKFS.websocket_sock_ops.createPeer(sock,ws);Module["websocket"].emit("connection",sock.stream.fd)}});sock.server.on("closed",function(){Module["websocket"].emit("close",sock.stream.fd);sock.server=null});sock.server.on("error",function(error){sock.error=23;Module["websocket"].emit("error",[sock.stream.fd,sock.error,"EHOSTUNREACH: Host is unreachable"])})},accept:function(listensock){if(!listensock.server||!listensock.pending.length){throw new FS.ErrnoError(28)}var newsock=listensock.pending.shift();newsock.stream.flags=listensock.stream.flags;return newsock},getname:function(sock,peer){var addr,port;if(peer){if(sock.daddr===undefined||sock.dport===undefined){throw new FS.ErrnoError(53)}addr=sock.daddr;port=sock.dport}else{addr=sock.saddr||0;port=sock.sport||0}return{addr:addr,port:port}},sendmsg:function(sock,buffer,offset,length,addr,port){if(sock.type===2){if(addr===undefined||port===undefined){addr=sock.daddr;port=sock.dport}if(addr===undefined||port===undefined){throw new FS.ErrnoError(17)}}else{addr=sock.daddr;port=sock.dport}var dest=SOCKFS.websocket_sock_ops.getPeer(sock,addr,port);if(sock.type===1){if(!dest||dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){throw new FS.ErrnoError(53)}else if(dest.socket.readyState===dest.socket.CONNECTING){throw new FS.ErrnoError(6)}}if(ArrayBuffer.isView(buffer)){offset+=buffer.byteOffset;buffer=buffer.buffer}var data;data=buffer.slice(offset,offset+length);if(sock.type===2){if(!dest||dest.socket.readyState!==dest.socket.OPEN){if(!dest||dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){dest=SOCKFS.websocket_sock_ops.createPeer(sock,addr,port)}dest.dgram_send_queue.push(data);return length}}try{dest.socket.send(data);return length}catch(e){throw new FS.ErrnoError(28)}},recvmsg:function(sock,length){if(sock.type===1&&sock.server){throw new FS.ErrnoError(53)}var queued=sock.recv_queue.shift();if(!queued){if(sock.type===1){var dest=SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport);if(!dest){throw new FS.ErrnoError(53)}else if(dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){return null}else{throw new FS.ErrnoError(6)}}else{throw new FS.ErrnoError(6)}}var queuedLength=queued.data.byteLength||queued.data.length;var queuedOffset=queued.data.byteOffset||0;var queuedBuffer=queued.data.buffer||queued.data;var bytesRead=Math.min(length,queuedLength);var res={buffer:new Uint8Array(queuedBuffer,queuedOffset,bytesRead),addr:queued.addr,port:queued.port};if(sock.type===1&&bytesRead<queuedLength){var bytesRemaining=queuedLength-bytesRead;queued.data=new Uint8Array(queuedBuffer,queuedOffset+bytesRead,bytesRemaining);sock.recv_queue.unshift(queued)}return res}}};function getSocketFromFD(fd){var socket=SOCKFS.getSocket(fd);if(!socket)throw new FS.ErrnoError(8);return socket}function setErrNo(value){HEAP32[___errno_location()>>2]=value;return value}function inetPton4(str){var b=str.split(".");for(var i=0;i<4;i++){var tmp=Number(b[i]);if(isNaN(tmp))return null;b[i]=tmp}return(b[0]|b[1]<<8|b[2]<<16|b[3]<<24)>>>0}function jstoi_q(str){return parseInt(str)}function inetPton6(str){var words;var w,offset,z;var valid6regx=/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;var parts=[];if(!valid6regx.test(str)){return null}if(str==="::"){return[0,0,0,0,0,0,0,0]}if(str.startsWith("::")){str=str.replace("::","Z:")}else{str=str.replace("::",":Z:")}if(str.indexOf(".")>0){str=str.replace(new RegExp("[.]","g"),":");words=str.split(":");words[words.length-4]=jstoi_q(words[words.length-4])+jstoi_q(words[words.length-3])*256;words[words.length-3]=jstoi_q(words[words.length-2])+jstoi_q(words[words.length-1])*256;words=words.slice(0,words.length-2)}else{words=str.split(":")}offset=0;z=0;for(w=0;w<words.length;w++){if(typeof words[w]=="string"){if(words[w]==="Z"){for(z=0;z<8-words.length+1;z++){parts[w+z]=0}offset=z-1}else{parts[w+offset]=_htons(parseInt(words[w],16))}}else{parts[w+offset]=words[w]}}return[parts[1]<<16|parts[0],parts[3]<<16|parts[2],parts[5]<<16|parts[4],parts[7]<<16|parts[6]]}function writeSockaddr(sa,family,addr,port,addrlen){switch(family){case 2:addr=inetPton4(addr);zeroMemory(sa,16);if(addrlen){HEAP32[addrlen>>2]=16}HEAP16[sa>>1]=family;HEAP32[sa+4>>2]=addr;HEAP16[sa+2>>1]=_htons(port);break;case 10:addr=inetPton6(addr);zeroMemory(sa,28);if(addrlen){HEAP32[addrlen>>2]=28}HEAP32[sa>>2]=family;HEAP32[sa+8>>2]=addr[0];HEAP32[sa+12>>2]=addr[1];HEAP32[sa+16>>2]=addr[2];HEAP32[sa+20>>2]=addr[3];HEAP16[sa+2>>1]=_htons(port);break;default:return 5}return 0}var DNS={address_map:{id:1,addrs:{},names:{}},lookup_name:function(name){var res=inetPton4(name);if(res!==null){return name}res=inetPton6(name);if(res!==null){return name}var addr;if(DNS.address_map.addrs[name]){addr=DNS.address_map.addrs[name]}else{var id=DNS.address_map.id++;assert(id<65535,"exceeded max address mappings of 65535");addr="172.29."+(id&255)+"."+(id&65280);DNS.address_map.names[addr]=name;DNS.address_map.addrs[name]=addr}return addr},lookup_addr:function(addr){if(DNS.address_map.names[addr]){return DNS.address_map.names[addr]}return null}};function ___syscall_accept4(fd,addr,addrlen,flags){try{var sock=getSocketFromFD(fd);var newsock=sock.sock_ops.accept(sock);if(addr){var errno=writeSockaddr(addr,newsock.family,DNS.lookup_name(newsock.daddr),newsock.dport,addrlen)}return newsock.stream.fd}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function inetNtop4(addr){return(addr&255)+"."+(addr>>8&255)+"."+(addr>>16&255)+"."+(addr>>24&255)}function inetNtop6(ints){var str="";var word=0;var longest=0;var lastzero=0;var zstart=0;var len=0;var i=0;var parts=[ints[0]&65535,ints[0]>>16,ints[1]&65535,ints[1]>>16,ints[2]&65535,ints[2]>>16,ints[3]&65535,ints[3]>>16];var hasipv4=true;var v4part="";for(i=0;i<5;i++){if(parts[i]!==0){hasipv4=false;break}}if(hasipv4){v4part=inetNtop4(parts[6]|parts[7]<<16);if(parts[5]===-1){str="::ffff:";str+=v4part;return str}if(parts[5]===0){str="::";if(v4part==="0.0.0.0")v4part="";if(v4part==="0.0.0.1")v4part="1";str+=v4part;return str}}for(word=0;word<8;word++){if(parts[word]===0){if(word-lastzero>1){len=0}lastzero=word;len++}if(len>longest){longest=len;zstart=word-longest+1}}for(word=0;word<8;word++){if(longest>1){if(parts[word]===0&&word>=zstart&&word<zstart+longest){if(word===zstart){str+=":";if(zstart===0)str+=":"}continue}}str+=Number(_ntohs(parts[word]&65535)).toString(16);str+=word<7?":":""}return str}function readSockaddr(sa,salen){var family=HEAP16[sa>>1];var port=_ntohs(HEAPU16[sa+2>>1]);var addr;switch(family){case 2:if(salen!==16){return{errno:28}}addr=HEAP32[sa+4>>2];addr=inetNtop4(addr);break;case 10:if(salen!==28){return{errno:28}}addr=[HEAP32[sa+8>>2],HEAP32[sa+12>>2],HEAP32[sa+16>>2],HEAP32[sa+20>>2]];addr=inetNtop6(addr);break;default:return{errno:5}}return{family:family,addr:addr,port:port}}function getSocketAddress(addrp,addrlen,allowNull){if(allowNull&&addrp===0)return null;var info=readSockaddr(addrp,addrlen);if(info.errno)throw new FS.ErrnoError(info.errno);info.addr=DNS.lookup_addr(info.addr)||info.addr;return info}function ___syscall_bind(fd,addr,addrlen){try{var sock=getSocketFromFD(fd);var info=getSocketAddress(addr,addrlen);sock.sock_ops.bind(sock,info.addr,info.port);return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_chmod(path,mode){try{path=SYSCALLS.getStr(path);FS.chmod(path,mode);return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_connect(fd,addr,addrlen){try{var sock=getSocketFromFD(fd);var info=getSocketAddress(addr,addrlen);sock.sock_ops.connect(sock,info.addr,info.port);return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_dup3(fd,suggestFD,flags){try{var old=SYSCALLS.getStreamFromFD(fd);if(old.fd===suggestFD)return-28;var suggest=FS.getStream(suggestFD);if(suggest)FS.close(suggest);return FS.open(old.path,old.flags,0,suggestFD,suggestFD).fd}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_faccessat(dirfd,path,amode,flags){try{path=SYSCALLS.getStr(path);path=SYSCALLS.calculateAt(dirfd,path);return SYSCALLS.doAccess(path,amode)}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_fcntl64(fd,cmd,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(fd);switch(cmd){case 0:{var arg=SYSCALLS.get();if(arg<0){return-28}var newStream;newStream=FS.open(stream.path,stream.flags,0,arg);return newStream.fd}case 1:case 2:return 0;case 3:return stream.flags;case 4:{var arg=SYSCALLS.get();stream.flags|=arg;return 0}case 5:{var arg=SYSCALLS.get();var offset=0;HEAP16[arg+offset>>1]=2;return 0}case 6:case 7:return 0;case 16:case 8:return-28;case 9:setErrNo(28);return-1;default:{return-28}}}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_fstat64(fd,buf){try{var stream=SYSCALLS.getStreamFromFD(fd);return SYSCALLS.doStat(FS.stat,stream.path,buf)}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_getcwd(buf,size){try{if(size===0)return-28;var cwd=FS.cwd();var cwdLengthInBytes=lengthBytesUTF8(cwd);if(size<cwdLengthInBytes+1)return-68;stringToUTF8(cwd,buf,size);return buf}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_getdents64(fd,dirp,count){try{var stream=SYSCALLS.getStreamFromFD(fd);if(!stream.getdents){stream.getdents=FS.readdir(stream.path)}var struct_size=280;var pos=0;var off=FS.llseek(stream,0,1);var idx=Math.floor(off/struct_size);while(idx<stream.getdents.length&&pos+struct_size<=count){var id;var type;var name=stream.getdents[idx];if(name==="."){id=stream.node.id;type=4}else if(name===".."){var lookup=FS.lookupPath(stream.path,{parent:true});id=lookup.node.id;type=4}else{var child=FS.lookupNode(stream.node,name);id=child.id;type=FS.isChrdev(child.mode)?2:FS.isDir(child.mode)?4:FS.isLink(child.mode)?10:8}tempI64=[id>>>0,(tempDouble=id,+Math.abs(tempDouble)>=1?tempDouble>0?(Math.min(+Math.floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[dirp+pos>>2]=tempI64[0],HEAP32[dirp+pos+4>>2]=tempI64[1];tempI64=[(idx+1)*struct_size>>>0,(tempDouble=(idx+1)*struct_size,+Math.abs(tempDouble)>=1?tempDouble>0?(Math.min(+Math.floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[dirp+pos+8>>2]=tempI64[0],HEAP32[dirp+pos+12>>2]=tempI64[1];HEAP16[dirp+pos+16>>1]=280;HEAP8[dirp+pos+18>>0]=type;stringToUTF8(name,dirp+pos+19,256);pos+=struct_size;idx+=1}FS.llseek(stream,idx*struct_size,0);return pos}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_getpeername(fd,addr,addrlen){try{var sock=getSocketFromFD(fd);if(!sock.daddr){return-53}var errno=writeSockaddr(addr,sock.family,DNS.lookup_name(sock.daddr),sock.dport,addrlen);return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_getsockname(fd,addr,addrlen){try{err("__syscall_getsockname "+fd);var sock=getSocketFromFD(fd);var errno=writeSockaddr(addr,sock.family,DNS.lookup_name(sock.saddr||"0.0.0.0"),sock.sport,addrlen);return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_getsockopt(fd,level,optname,optval,optlen){try{var sock=getSocketFromFD(fd);if(level===1){if(optname===4){HEAP32[optval>>2]=sock.error;HEAP32[optlen>>2]=4;sock.error=null;return 0}}return-50}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_ioctl(fd,op,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(fd);switch(op){case 21509:case 21505:{if(!stream.tty)return-59;return 0}case 21510:case 21511:case 21512:case 21506:case 21507:case 21508:{if(!stream.tty)return-59;return 0}case 21519:{if(!stream.tty)return-59;var argp=SYSCALLS.get();HEAP32[argp>>2]=0;return 0}case 21520:{if(!stream.tty)return-59;return-28}case 21531:{var argp=SYSCALLS.get();return FS.ioctl(stream,op,argp)}case 21523:{if(!stream.tty)return-59;return 0}case 21524:{if(!stream.tty)return-59;return 0}default:abort("bad ioctl syscall "+op)}}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_listen(fd,backlog){try{var sock=getSocketFromFD(fd);sock.sock_ops.listen(sock,backlog);return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_lstat64(path,buf){try{path=SYSCALLS.getStr(path);return SYSCALLS.doStat(FS.lstat,path,buf)}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_mkdir(path,mode){try{path=SYSCALLS.getStr(path);return SYSCALLS.doMkdir(path,mode)}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_newfstatat(dirfd,path,buf,flags){try{path=SYSCALLS.getStr(path);var nofollow=flags&256;var allowEmpty=flags&4096;flags=flags&~4352;path=SYSCALLS.calculateAt(dirfd,path,allowEmpty);return SYSCALLS.doStat(nofollow?FS.lstat:FS.stat,path,buf)}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_openat(dirfd,path,flags,varargs){SYSCALLS.varargs=varargs;try{path=SYSCALLS.getStr(path);path=SYSCALLS.calculateAt(dirfd,path);var mode=varargs?SYSCALLS.get():0;return FS.open(path,flags,mode).fd}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}var PIPEFS={BUCKET_BUFFER_SIZE:8192,mount:function(mount){return FS.createNode(null,"/",16384|511,0)},createPipe:function(){var pipe={buckets:[],refcnt:2};pipe.buckets.push({buffer:new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),offset:0,roffset:0});var rName=PIPEFS.nextname();var wName=PIPEFS.nextname();var rNode=FS.createNode(PIPEFS.root,rName,4096,0);var wNode=FS.createNode(PIPEFS.root,wName,4096,0);rNode.pipe=pipe;wNode.pipe=pipe;var readableStream=FS.createStream({path:rName,node:rNode,flags:0,seekable:false,stream_ops:PIPEFS.stream_ops});rNode.stream=readableStream;var writableStream=FS.createStream({path:wName,node:wNode,flags:1,seekable:false,stream_ops:PIPEFS.stream_ops});wNode.stream=writableStream;return{readable_fd:readableStream.fd,writable_fd:writableStream.fd}},stream_ops:{poll:function(stream){var pipe=stream.node.pipe;if((stream.flags&2097155)===1){return 256|4}else{if(pipe.buckets.length>0){for(var i=0;i<pipe.buckets.length;i++){var bucket=pipe.buckets[i];if(bucket.offset-bucket.roffset>0){return 64|1}}}}return 0},ioctl:function(stream,request,varargs){return 28},fsync:function(stream){return 28},read:function(stream,buffer,offset,length,position){var pipe=stream.node.pipe;var currentLength=0;for(var i=0;i<pipe.buckets.length;i++){var bucket=pipe.buckets[i];currentLength+=bucket.offset-bucket.roffset}assert(buffer instanceof ArrayBuffer||ArrayBuffer.isView(buffer));var data=buffer.subarray(offset,offset+length);if(length<=0){return 0}if(currentLength==0){throw new FS.ErrnoError(6)}var toRead=Math.min(currentLength,length);var totalRead=toRead;var toRemove=0;for(var i=0;i<pipe.buckets.length;i++){var currBucket=pipe.buckets[i];var bucketSize=currBucket.offset-currBucket.roffset;if(toRead<=bucketSize){var tmpSlice=currBucket.buffer.subarray(currBucket.roffset,currBucket.offset);if(toRead<bucketSize){tmpSlice=tmpSlice.subarray(0,toRead);currBucket.roffset+=toRead}else{toRemove++}data.set(tmpSlice);break}else{var tmpSlice=currBucket.buffer.subarray(currBucket.roffset,currBucket.offset);data.set(tmpSlice);data=data.subarray(tmpSlice.byteLength);toRead-=tmpSlice.byteLength;toRemove++}}if(toRemove&&toRemove==pipe.buckets.length){toRemove--;pipe.buckets[toRemove].offset=0;pipe.buckets[toRemove].roffset=0}pipe.buckets.splice(0,toRemove);return totalRead},write:function(stream,buffer,offset,length,position){var pipe=stream.node.pipe;assert(buffer instanceof ArrayBuffer||ArrayBuffer.isView(buffer));var data=buffer.subarray(offset,offset+length);var dataLen=data.byteLength;if(dataLen<=0){return 0}var currBucket=null;if(pipe.buckets.length==0){currBucket={buffer:new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),offset:0,roffset:0};pipe.buckets.push(currBucket)}else{currBucket=pipe.buckets[pipe.buckets.length-1]}assert(currBucket.offset<=PIPEFS.BUCKET_BUFFER_SIZE);var freeBytesInCurrBuffer=PIPEFS.BUCKET_BUFFER_SIZE-currBucket.offset;if(freeBytesInCurrBuffer>=dataLen){currBucket.buffer.set(data,currBucket.offset);currBucket.offset+=dataLen;return dataLen}else if(freeBytesInCurrBuffer>0){currBucket.buffer.set(data.subarray(0,freeBytesInCurrBuffer),currBucket.offset);currBucket.offset+=freeBytesInCurrBuffer;data=data.subarray(freeBytesInCurrBuffer,data.byteLength)}var numBuckets=data.byteLength/PIPEFS.BUCKET_BUFFER_SIZE|0;var remElements=data.byteLength%PIPEFS.BUCKET_BUFFER_SIZE;for(var i=0;i<numBuckets;i++){var newBucket={buffer:new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),offset:PIPEFS.BUCKET_BUFFER_SIZE,roffset:0};pipe.buckets.push(newBucket);newBucket.buffer.set(data.subarray(0,PIPEFS.BUCKET_BUFFER_SIZE));data=data.subarray(PIPEFS.BUCKET_BUFFER_SIZE,data.byteLength)}if(remElements>0){var newBucket={buffer:new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),offset:data.byteLength,roffset:0};pipe.buckets.push(newBucket);newBucket.buffer.set(data)}return dataLen},close:function(stream){var pipe=stream.node.pipe;pipe.refcnt--;if(pipe.refcnt===0){pipe.buckets=null}}},nextname:function(){if(!PIPEFS.nextname.current){PIPEFS.nextname.current=0}return"pipe["+PIPEFS.nextname.current+++"]"}};function ___syscall_pipe(fdPtr){try{if(fdPtr==0){throw new FS.ErrnoError(21)}var res=PIPEFS.createPipe();HEAP32[fdPtr>>2]=res.readable_fd;HEAP32[fdPtr+4>>2]=res.writable_fd;return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_poll(fds,nfds,timeout){try{var nonzero=0;for(var i=0;i<nfds;i++){var pollfd=fds+8*i;var fd=HEAP32[pollfd>>2];var events=HEAP16[pollfd+4>>1];var mask=32;var stream=FS.getStream(fd);if(stream){mask=SYSCALLS.DEFAULT_POLLMASK;if(stream.stream_ops.poll){mask=stream.stream_ops.poll(stream)}}mask&=events|8|16;if(mask)nonzero++;HEAP16[pollfd+6>>1]=mask}return nonzero}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_readlinkat(dirfd,path,buf,bufsize){try{path=SYSCALLS.getStr(path);path=SYSCALLS.calculateAt(dirfd,path);return SYSCALLS.doReadlink(path,buf,bufsize)}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_recvfrom(fd,buf,len,flags,addr,addrlen){try{var sock=getSocketFromFD(fd);var msg=sock.sock_ops.recvmsg(sock,len);if(!msg)return 0;if(addr){var errno=writeSockaddr(addr,sock.family,DNS.lookup_name(msg.addr),msg.port,addrlen)}HEAPU8.set(msg.buffer,buf);return msg.buffer.byteLength}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_recvmsg(fd,message,flags){try{var sock=getSocketFromFD(fd);var iov=HEAP32[message+8>>2];var num=HEAP32[message+12>>2];var total=0;for(var i=0;i<num;i++){total+=HEAP32[iov+(8*i+4)>>2]}var msg=sock.sock_ops.recvmsg(sock,total);if(!msg)return 0;var name=HEAP32[message>>2];if(name){var errno=writeSockaddr(name,sock.family,DNS.lookup_name(msg.addr),msg.port)}var bytesRead=0;var bytesRemaining=msg.buffer.byteLength;for(var i=0;bytesRemaining>0&&i<num;i++){var iovbase=HEAP32[iov+(8*i+0)>>2];var iovlen=HEAP32[iov+(8*i+4)>>2];if(!iovlen){continue}var length=Math.min(iovlen,bytesRemaining);var buf=msg.buffer.subarray(bytesRead,bytesRead+length);HEAPU8.set(buf,iovbase+bytesRead);bytesRead+=length;bytesRemaining-=length}return bytesRead}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_renameat(olddirfd,oldpath,newdirfd,newpath){try{oldpath=SYSCALLS.getStr(oldpath);newpath=SYSCALLS.getStr(newpath);oldpath=SYSCALLS.calculateAt(olddirfd,oldpath);newpath=SYSCALLS.calculateAt(newdirfd,newpath);FS.rename(oldpath,newpath);return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_rmdir(path){try{path=SYSCALLS.getStr(path);FS.rmdir(path);return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_sendmsg(fd,message,flags){try{var sock=getSocketFromFD(fd);var iov=HEAP32[message+8>>2];var num=HEAP32[message+12>>2];var addr,port;var name=HEAP32[message>>2];var namelen=HEAP32[message+4>>2];if(name){var info=readSockaddr(name,namelen);if(info.errno)return-info.errno;port=info.port;addr=DNS.lookup_addr(info.addr)||info.addr}var total=0;for(var i=0;i<num;i++){total+=HEAP32[iov+(8*i+4)>>2]}var view=new Uint8Array(total);var offset=0;for(var i=0;i<num;i++){var iovbase=HEAP32[iov+(8*i+0)>>2];var iovlen=HEAP32[iov+(8*i+4)>>2];for(var j=0;j<iovlen;j++){view[offset++]=HEAP8[iovbase+j>>0]}}return sock.sock_ops.sendmsg(sock,view,0,total,addr,port)}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_sendto(fd,message,length,flags,addr,addr_len){try{var sock=getSocketFromFD(fd);var dest=getSocketAddress(addr,addr_len,true);if(!dest){return FS.write(sock.stream,HEAP8,message,length)}else{return sock.sock_ops.sendmsg(sock,HEAP8,message,length,dest.addr,dest.port)}}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_socket(domain,type,protocol){try{var sock=SOCKFS.createSocket(domain,type,protocol);return sock.stream.fd}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_stat64(path,buf){try{path=SYSCALLS.getStr(path);return SYSCALLS.doStat(FS.stat,path,buf)}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_statfs64(path,size,buf){try{path=SYSCALLS.getStr(path);HEAP32[buf+4>>2]=4096;HEAP32[buf+40>>2]=4096;HEAP32[buf+8>>2]=1e6;HEAP32[buf+12>>2]=5e5;HEAP32[buf+16>>2]=5e5;HEAP32[buf+20>>2]=FS.nextInode;HEAP32[buf+24>>2]=1e6;HEAP32[buf+28>>2]=42;HEAP32[buf+44>>2]=2;HEAP32[buf+36>>2]=255;return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_truncate64(path,low,high){try{path=SYSCALLS.getStr(path);var length=SYSCALLS.get64(low,high);FS.truncate(path,length);return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_unlinkat(dirfd,path,flags){try{path=SYSCALLS.getStr(path);path=SYSCALLS.calculateAt(dirfd,path);if(flags===0){FS.unlink(path)}else if(flags===512){FS.rmdir(path)}else{abort("Invalid flags passed to unlinkat")}return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_utimensat(dirfd,path,times,flags){try{path=SYSCALLS.getStr(path);path=SYSCALLS.calculateAt(dirfd,path,true);if(!times){var atime=Date.now();var mtime=atime}else{var seconds=HEAP32[times>>2];var nanoseconds=HEAP32[times+4>>2];atime=seconds*1e3+nanoseconds/(1e3*1e3);times+=8;seconds=HEAP32[times>>2];nanoseconds=HEAP32[times+4>>2];mtime=seconds*1e3+nanoseconds/(1e3*1e3)}FS.utime(path,atime,mtime);return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}var dlopen_main_init=0;function __dlopen_js(handle){var ret=!dlopen_main_init;dlopen_main_init=1;return ret}function __dlsym_js(handle,symbol){return 0}function __emscripten_date_now(){return Date.now()}var nowIsMonotonic=true;function __emscripten_get_now_is_monotonic(){return nowIsMonotonic}function __emscripten_throw_longjmp(){throw Infinity}function __gmtime_js(time,tmPtr){var date=new Date(HEAP32[time>>2]*1e3);HEAP32[tmPtr>>2]=date.getUTCSeconds();HEAP32[tmPtr+4>>2]=date.getUTCMinutes();HEAP32[tmPtr+8>>2]=date.getUTCHours();HEAP32[tmPtr+12>>2]=date.getUTCDate();HEAP32[tmPtr+16>>2]=date.getUTCMonth();HEAP32[tmPtr+20>>2]=date.getUTCFullYear()-1900;HEAP32[tmPtr+24>>2]=date.getUTCDay();var start=Date.UTC(date.getUTCFullYear(),0,1,0,0,0,0);var yday=(date.getTime()-start)/(1e3*60*60*24)|0;HEAP32[tmPtr+28>>2]=yday}function __localtime_js(time,tmPtr){var date=new Date(HEAP32[time>>2]*1e3);HEAP32[tmPtr>>2]=date.getSeconds();HEAP32[tmPtr+4>>2]=date.getMinutes();HEAP32[tmPtr+8>>2]=date.getHours();HEAP32[tmPtr+12>>2]=date.getDate();HEAP32[tmPtr+16>>2]=date.getMonth();HEAP32[tmPtr+20>>2]=date.getFullYear()-1900;HEAP32[tmPtr+24>>2]=date.getDay();var start=new Date(date.getFullYear(),0,1);var yday=(date.getTime()-start.getTime())/(1e3*60*60*24)|0;HEAP32[tmPtr+28>>2]=yday;HEAP32[tmPtr+36>>2]=-(date.getTimezoneOffset()*60);var summerOffset=new Date(date.getFullYear(),6,1).getTimezoneOffset();var winterOffset=start.getTimezoneOffset();var dst=(summerOffset!=winterOffset&&date.getTimezoneOffset()==Math.min(winterOffset,summerOffset))|0;HEAP32[tmPtr+32>>2]=dst}function __mktime_js(tmPtr){var date=new Date(HEAP32[tmPtr+20>>2]+1900,HEAP32[tmPtr+16>>2],HEAP32[tmPtr+12>>2],HEAP32[tmPtr+8>>2],HEAP32[tmPtr+4>>2],HEAP32[tmPtr>>2],0);var dst=HEAP32[tmPtr+32>>2];var guessedOffset=date.getTimezoneOffset();var start=new Date(date.getFullYear(),0,1);var summerOffset=new Date(date.getFullYear(),6,1).getTimezoneOffset();var winterOffset=start.getTimezoneOffset();var dstOffset=Math.min(winterOffset,summerOffset);if(dst<0){HEAP32[tmPtr+32>>2]=Number(summerOffset!=winterOffset&&dstOffset==guessedOffset)}else if(dst>0!=(dstOffset==guessedOffset)){var nonDstOffset=Math.max(winterOffset,summerOffset);var trueOffset=dst>0?dstOffset:nonDstOffset;date.setTime(date.getTime()+(trueOffset-guessedOffset)*6e4)}HEAP32[tmPtr+24>>2]=date.getDay();var yday=(date.getTime()-start.getTime())/(1e3*60*60*24)|0;HEAP32[tmPtr+28>>2]=yday;HEAP32[tmPtr>>2]=date.getSeconds();HEAP32[tmPtr+4>>2]=date.getMinutes();HEAP32[tmPtr+8>>2]=date.getHours();HEAP32[tmPtr+12>>2]=date.getDate();HEAP32[tmPtr+16>>2]=date.getMonth();return date.getTime()/1e3|0}function __mmap_js(addr,len,prot,flags,fd,off,allocated,builtin){try{var info=FS.getStream(fd);if(!info)return-8;var res=FS.mmap(info,addr,len,off,prot,flags);var ptr=res.ptr;HEAP32[allocated>>2]=res.allocated;return ptr}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function __munmap_js(addr,len,prot,flags,fd,offset){try{var stream=FS.getStream(fd);if(stream){if(prot&2){SYSCALLS.doMsync(addr,stream,len,flags,offset)}FS.munmap(stream)}}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function _tzset_impl(timezone,daylight,tzname){var currentYear=(new Date).getFullYear();var winter=new Date(currentYear,0,1);var summer=new Date(currentYear,6,1);var winterOffset=winter.getTimezoneOffset();var summerOffset=summer.getTimezoneOffset();var stdTimezoneOffset=Math.max(winterOffset,summerOffset);HEAP32[timezone>>2]=stdTimezoneOffset*60;HEAP32[daylight>>2]=Number(winterOffset!=summerOffset);function extractZone(date){var match=date.toTimeString().match(/\(([A-Za-z ]+)\)$/);return match?match[1]:"GMT"}var winterName=extractZone(winter);var summerName=extractZone(summer);var winterNamePtr=allocateUTF8(winterName);var summerNamePtr=allocateUTF8(summerName);if(summerOffset<winterOffset){HEAP32[tzname>>2]=winterNamePtr;HEAP32[tzname+4>>2]=summerNamePtr}else{HEAP32[tzname>>2]=summerNamePtr;HEAP32[tzname+4>>2]=winterNamePtr}}function __tzset_js(timezone,daylight,tzname){if(__tzset_js.called)return;__tzset_js.called=true;_tzset_impl(timezone,daylight,tzname)}function _abort(){abort("")}var listener={onRemoteConfigsUpdated:function(){SendMessage("GameAnalytics","OnRemoteConfigsUpdated")}};function _addBusinessEvent(currency,amount,itemType,itemId,cartType,fields,mergeFields){var fieldsString=Pointer_stringify(fields);fieldsString=fieldsString?fieldsString:"{}";gameanalytics.GameAnalytics.addBusinessEvent(Pointer_stringify(currency),amount,Pointer_stringify(itemType),Pointer_stringify(itemId),Pointer_stringify(cartType),JSON.parse(fieldsString),mergeFields)}function _addDesignEvent(eventId,fields,mergeFields){var fieldsString=Pointer_stringify(fields);fieldsString=fieldsString?fieldsString:"{}";gameanalytics.GameAnalytics.addDesignEvent(Pointer_stringify(eventId),JSON.parse(fieldsString),mergeFields)}function _addDesignEventWithValue(eventId,value,fields,mergeFields){var fieldsString=Pointer_stringify(fields);fieldsString=fieldsString?fieldsString:"{}";gameanalytics.GameAnalytics.addDesignEvent(Pointer_stringify(eventId),value,JSON.parse(fieldsString),mergeFields)}function _addErrorEvent(severity,message,fields,mergeFields){var fieldsString=Pointer_stringify(fields);fieldsString=fieldsString?fieldsString:"{}";gameanalytics.GameAnalytics.addErrorEvent(severity,Pointer_stringify(message),JSON.parse(fieldsString),mergeFields)}function _addProgressionEvent(progressionStatus,progression01,progression02,progression03,fields,mergeFields){var fieldsString=Pointer_stringify(fields);fieldsString=fieldsString?fieldsString:"{}";gameanalytics.GameAnalytics.addProgressionEvent(progressionStatus,Pointer_stringify(progression01),Pointer_stringify(progression02),Pointer_stringify(progression03),JSON.parse(fieldsString),mergeFields)}function _addProgressionEventWithScore(progressionStatus,progression01,progression02,progression03,score,fields,mergeFields){var fieldsString=Pointer_stringify(fields);fieldsString=fieldsString?fieldsString:"{}";gameanalytics.GameAnalytics.addProgressionEvent(progressionStatus,Pointer_stringify(progression01),Pointer_stringify(progression02),Pointer_stringify(progression03),score,JSON.parse(fieldsString),mergeFields)}function _addResourceEvent(flowType,currency,amount,itemType,itemId,fields,mergeFields){var fieldsString=Pointer_stringify(fields);fieldsString=fieldsString?fieldsString:"{}";gameanalytics.GameAnalytics.addResourceEvent(flowType,Pointer_stringify(currency),amount,Pointer_stringify(itemType),Pointer_stringify(itemId),JSON.parse(fieldsString),mergeFields)}function _configureAvailableCustomDimensions01(list){gameanalytics.GameAnalytics.configureAvailableCustomDimensions01(JSON.parse(Pointer_stringify(list)))}function _configureAvailableCustomDimensions02(list){gameanalytics.GameAnalytics.configureAvailableCustomDimensions02(JSON.parse(Pointer_stringify(list)))}function _configureAvailableCustomDimensions03(list){gameanalytics.GameAnalytics.configureAvailableCustomDimensions03(JSON.parse(Pointer_stringify(list)))}function _configureAvailableResourceCurrencies(list){gameanalytics.GameAnalytics.configureAvailableResourceCurrencies(JSON.parse(Pointer_stringify(list)))}function _configureAvailableResourceItemTypes(list){gameanalytics.GameAnalytics.configureAvailableResourceItemTypes(JSON.parse(Pointer_stringify(list)))}function _configureBuild(build){gameanalytics.GameAnalytics.configureBuild(Pointer_stringify(build))}function _configureGameEngineVersion(unityEngineVersion){gameanalytics.GameAnalytics.configureGameEngineVersion(Pointer_stringify(unityEngineVersion))}function _configureSdkGameEngineVersion(unitySdkVersion){gameanalytics.GameAnalytics.configureSdkGameEngineVersion(Pointer_stringify(unitySdkVersion))}function _configureUserId(userId){gameanalytics.GameAnalytics.configureUserId(Pointer_stringify(userId))}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var readAsmConstArgsDouble=ch<105;if(readAsmConstArgsDouble&&buf&1)buf++;readAsmConstArgsArray.push(readAsmConstArgsDouble?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}function mainThreadEM_ASM(code,sigPtr,argbuf,sync){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int_sync_on_main_thread(code,sigPtr,argbuf){return mainThreadEM_ASM(code,sigPtr,argbuf,1)}function _emscripten_set_main_loop_timing(mode,value){Browser.mainLoop.timingMode=mode;Browser.mainLoop.timingValue=value;if(!Browser.mainLoop.func){return 1}if(!Browser.mainLoop.running){Browser.mainLoop.running=true}if(mode==0){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setTimeout(){var timeUntilNextTick=Math.max(0,Browser.mainLoop.tickStartTime+value-_emscripten_get_now())|0;setTimeout(Browser.mainLoop.runner,timeUntilNextTick)};Browser.mainLoop.method="timeout"}else if(mode==1){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_rAF(){Browser.requestAnimationFrame(Browser.mainLoop.runner)};Browser.mainLoop.method="rAF"}else if(mode==2){if(typeof setImmediate=="undefined"){var setImmediates=[];var emscriptenMainLoopMessageId="setimmediate";var Browser_setImmediate_messageHandler=function(event){if(event.data===emscriptenMainLoopMessageId||event.data.target===emscriptenMainLoopMessageId){event.stopPropagation();setImmediates.shift()()}};addEventListener("message",Browser_setImmediate_messageHandler,true);setImmediate=function Browser_emulated_setImmediate(func){setImmediates.push(func);if(ENVIRONMENT_IS_WORKER){if(Module["setImmediates"]===undefined)Module["setImmediates"]=[];Module["setImmediates"].push(func);postMessage({target:emscriptenMainLoopMessageId})}else postMessage(emscriptenMainLoopMessageId,"*")}}Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setImmediate(){setImmediate(Browser.mainLoop.runner)};Browser.mainLoop.method="immediate"}return 0}var _emscripten_get_now;if(ENVIRONMENT_IS_NODE){_emscripten_get_now=(()=>{var t=process["hrtime"]();return t[0]*1e3+t[1]/1e6})}else _emscripten_get_now=(()=>performance.now());function _exit(status){exit(status)}function maybeExit(){}function setMainLoop(browserIterationFunc,fps,simulateInfiniteLoop,arg,noSetTiming){assert(!Browser.mainLoop.func,"emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");Browser.mainLoop.func=browserIterationFunc;Browser.mainLoop.arg=arg;var thisMainLoopId=Browser.mainLoop.currentlyRunningMainloop;function checkIsRunning(){if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop){maybeExit();return false}return true}Browser.mainLoop.running=false;Browser.mainLoop.runner=function Browser_mainLoop_runner(){if(ABORT)return;if(Browser.mainLoop.queue.length>0){var start=Date.now();var blocker=Browser.mainLoop.queue.shift();blocker.func(blocker.arg);if(Browser.mainLoop.remainingBlockers){var remaining=Browser.mainLoop.remainingBlockers;var next=remaining%1==0?remaining-1:Math.floor(remaining);if(blocker.counted){Browser.mainLoop.remainingBlockers=next}else{next=next+.5;Browser.mainLoop.remainingBlockers=(8*remaining+next)/9}}out('main loop blocker "'+blocker.name+'" took '+(Date.now()-start)+" ms");Browser.mainLoop.updateStatus();if(!checkIsRunning())return;setTimeout(Browser.mainLoop.runner,0);return}if(!checkIsRunning())return;Browser.mainLoop.currentFrameNumber=Browser.mainLoop.currentFrameNumber+1|0;if(Browser.mainLoop.timingMode==1&&Browser.mainLoop.timingValue>1&&Browser.mainLoop.currentFrameNumber%Browser.mainLoop.timingValue!=0){Browser.mainLoop.scheduler();return}else if(Browser.mainLoop.timingMode==0){Browser.mainLoop.tickStartTime=_emscripten_get_now()}GL.newRenderingFrameStarted();Browser.mainLoop.runIter(browserIterationFunc);if(!checkIsRunning())return;if(typeof SDL=="object"&&SDL.audio&&SDL.audio.queueNewAudioData)SDL.audio.queueNewAudioData();Browser.mainLoop.scheduler()};if(!noSetTiming){if(fps&&fps>0)_emscripten_set_main_loop_timing(0,1e3/fps);else _emscripten_set_main_loop_timing(1,1);Browser.mainLoop.scheduler()}if(simulateInfiniteLoop){throw"unwind"}}function callUserCallback(func,synchronous){if(ABORT){return}if(synchronous){func();return}try{func()}catch(e){handleException(e)}}function safeSetTimeout(func,timeout){return setTimeout(function(){callUserCallback(func)},timeout)}var Browser={mainLoop:{running:false,scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:function(){Browser.mainLoop.scheduler=null;Browser.mainLoop.currentlyRunningMainloop++},resume:function(){Browser.mainLoop.currentlyRunningMainloop++;var timingMode=Browser.mainLoop.timingMode;var timingValue=Browser.mainLoop.timingValue;var func=Browser.mainLoop.func;Browser.mainLoop.func=null;setMainLoop(func,0,false,Browser.mainLoop.arg,true);_emscripten_set_main_loop_timing(timingMode,timingValue);Browser.mainLoop.scheduler()},updateStatus:function(){if(Module["setStatus"]){var message=Module["statusMessage"]||"Please wait...";var remaining=Browser.mainLoop.remainingBlockers;var expected=Browser.mainLoop.expectedBlockers;if(remaining){if(remaining<expected){Module["setStatus"](message+" ("+(expected-remaining)+"/"+expected+")")}else{Module["setStatus"](message)}}else{Module["setStatus"]("")}}},runIter:function(func){if(ABORT)return;if(Module["preMainLoop"]){var preRet=Module["preMainLoop"]();if(preRet===false){return}}callUserCallback(func);if(Module["postMainLoop"])Module["postMainLoop"]()}},isFullscreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function(){if(!Module["preloadPlugins"])Module["preloadPlugins"]=[];if(Browser.initted)return;Browser.initted=true;try{new Blob;Browser.hasBlobConstructor=true}catch(e){Browser.hasBlobConstructor=false;out("warning: no blob constructor, cannot create blobs with mimetypes")}Browser.BlobBuilder=typeof MozBlobBuilder!="undefined"?MozBlobBuilder:typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:!Browser.hasBlobConstructor?out("warning: no BlobBuilder"):null;Browser.URLObject=typeof window!="undefined"?window.URL?window.URL:window.webkitURL:undefined;if(!Module.noImageDecoding&&typeof Browser.URLObject=="undefined"){out("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");Module.noImageDecoding=true}var imagePlugin={};imagePlugin["canHandle"]=function imagePlugin_canHandle(name){return!Module.noImageDecoding&&/\.(jpg|jpeg|png|bmp)$/i.test(name)};imagePlugin["handle"]=function imagePlugin_handle(byteArray,name,onload,onerror){var b=null;if(Browser.hasBlobConstructor){try{b=new Blob([byteArray],{type:Browser.getMimetype(name)});if(b.size!==byteArray.length){b=new Blob([new Uint8Array(byteArray).buffer],{type:Browser.getMimetype(name)})}}catch(e){warnOnce("Blob constructor present but fails: "+e+"; falling back to blob builder")}}if(!b){var bb=new Browser.BlobBuilder;bb.append(new Uint8Array(byteArray).buffer);b=bb.getBlob()}var url=Browser.URLObject.createObjectURL(b);var img=new Image;img.onload=(()=>{assert(img.complete,"Image "+name+" could not be decoded");var canvas=document.createElement("canvas");canvas.width=img.width;canvas.height=img.height;var ctx=canvas.getContext("2d");ctx.drawImage(img,0,0);Module["preloadedImages"][name]=canvas;Browser.URLObject.revokeObjectURL(url);if(onload)onload(byteArray)});img.onerror=(event=>{out("Image "+url+" could not be decoded");if(onerror)onerror()});img.src=url};Module["preloadPlugins"].push(imagePlugin);var audioPlugin={};audioPlugin["canHandle"]=function audioPlugin_canHandle(name){return!Module.noAudioDecoding&&name.substr(-4)in{".ogg":1,".wav":1,".mp3":1}};audioPlugin["handle"]=function audioPlugin_handle(byteArray,name,onload,onerror){var done=false;function finish(audio){if(done)return;done=true;Module["preloadedAudios"][name]=audio;if(onload)onload(byteArray)}function fail(){if(done)return;done=true;Module["preloadedAudios"][name]=new Audio;if(onerror)onerror()}if(Browser.hasBlobConstructor){try{var b=new Blob([byteArray],{type:Browser.getMimetype(name)})}catch(e){return fail()}var url=Browser.URLObject.createObjectURL(b);var audio=new Audio;audio.addEventListener("canplaythrough",function(){finish(audio)},false);audio.onerror=function audio_onerror(event){if(done)return;out("warning: browser could not fully decode audio "+name+", trying slower base64 approach");function encode64(data){var BASE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var PAD="=";var ret="";var leftchar=0;var leftbits=0;for(var i=0;i<data.length;i++){leftchar=leftchar<<8|data[i];leftbits+=8;while(leftbits>=6){var curr=leftchar>>leftbits-6&63;leftbits-=6;ret+=BASE[curr]}}if(leftbits==2){ret+=BASE[(leftchar&3)<<4];ret+=PAD+PAD}else if(leftbits==4){ret+=BASE[(leftchar&15)<<2];ret+=PAD}return ret}audio.src="data:audio/x-"+name.substr(-3)+";base64,"+encode64(byteArray);finish(audio)};audio.src=url;safeSetTimeout(function(){finish(audio)},1e4)}else{return fail()}};Module["preloadPlugins"].push(audioPlugin);function pointerLockChange(){Browser.pointerLock=document["pointerLockElement"]===Module["canvas"]||document["mozPointerLockElement"]===Module["canvas"]||document["webkitPointerLockElement"]===Module["canvas"]||document["msPointerLockElement"]===Module["canvas"]}var canvas=Module["canvas"];if(canvas){canvas.requestPointerLock=canvas["requestPointerLock"]||canvas["mozRequestPointerLock"]||canvas["webkitRequestPointerLock"]||canvas["msRequestPointerLock"]||function(){};canvas.exitPointerLock=document["exitPointerLock"]||document["mozExitPointerLock"]||document["webkitExitPointerLock"]||document["msExitPointerLock"]||function(){};canvas.exitPointerLock=canvas.exitPointerLock.bind(document);document.addEventListener("pointerlockchange",pointerLockChange,false);document.addEventListener("mozpointerlockchange",pointerLockChange,false);document.addEventListener("webkitpointerlockchange",pointerLockChange,false);document.addEventListener("mspointerlockchange",pointerLockChange,false);if(Module["elementPointerLock"]){canvas.addEventListener("click",function(ev){if(!Browser.pointerLock&&Module["canvas"].requestPointerLock){Module["canvas"].requestPointerLock();ev.preventDefault()}},false)}}},handledByPreloadPlugin:function(byteArray,fullname,finish,onerror){Browser.init();var handled=false;Module["preloadPlugins"].forEach(function(plugin){if(handled)return;if(plugin["canHandle"](fullname)){plugin["handle"](byteArray,fullname,finish,onerror);handled=true}});return handled},createContext:function(canvas,useWebGL,setInModule,webGLContextAttributes){if(useWebGL&&Module.ctx&&canvas==Module.canvas)return Module.ctx;var ctx;var contextHandle;if(useWebGL){var contextAttributes={antialias:false,alpha:false,majorVersion:typeof WebGL2RenderingContext!="undefined"?2:1};if(webGLContextAttributes){for(var attribute in webGLContextAttributes){contextAttributes[attribute]=webGLContextAttributes[attribute]}}if(typeof GL!="undefined"){contextHandle=GL.createContext(canvas,contextAttributes);if(contextHandle){ctx=GL.getContext(contextHandle).GLctx}}}else{ctx=canvas.getContext("2d")}if(!ctx)return null;if(setInModule){if(!useWebGL)assert(typeof GLctx=="undefined","cannot set in module if GLctx is used, but we are a non-GL context that would replace it");Module.ctx=ctx;if(useWebGL)GL.makeContextCurrent(contextHandle);Module.useWebGL=useWebGL;Browser.moduleContextCreatedCallbacks.forEach(function(callback){callback()});Browser.init()}return ctx},destroyContext:function(canvas,useWebGL,setInModule){},fullscreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullscreen:function(lockPointer,resizeCanvas){Browser.lockPointer=lockPointer;Browser.resizeCanvas=resizeCanvas;if(typeof Browser.lockPointer=="undefined")Browser.lockPointer=true;if(typeof Browser.resizeCanvas=="undefined")Browser.resizeCanvas=false;var canvas=Module["canvas"];function fullscreenChange(){Browser.isFullscreen=false;var canvasContainer=canvas.parentNode;if((document["fullscreenElement"]||document["mozFullScreenElement"]||document["msFullscreenElement"]||document["webkitFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvasContainer){canvas.exitFullscreen=Browser.exitFullscreen;if(Browser.lockPointer)canvas.requestPointerLock();Browser.isFullscreen=true;if(Browser.resizeCanvas){Browser.setFullscreenCanvasSize()}else{Browser.updateCanvasDimensions(canvas)}}else{canvasContainer.parentNode.insertBefore(canvas,canvasContainer);canvasContainer.parentNode.removeChild(canvasContainer);if(Browser.resizeCanvas){Browser.setWindowedCanvasSize()}else{Browser.updateCanvasDimensions(canvas)}}if(Module["onFullScreen"])Module["onFullScreen"](Browser.isFullscreen);if(Module["onFullscreen"])Module["onFullscreen"](Browser.isFullscreen)}if(!Browser.fullscreenHandlersInstalled){Browser.fullscreenHandlersInstalled=true;document.addEventListener("fullscreenchange",fullscreenChange,false);document.addEventListener("mozfullscreenchange",fullscreenChange,false);document.addEventListener("webkitfullscreenchange",fullscreenChange,false);document.addEventListener("MSFullscreenChange",fullscreenChange,false)}var canvasContainer=document.createElement("div");canvas.parentNode.insertBefore(canvasContainer,canvas);canvasContainer.appendChild(canvas);canvasContainer.requestFullscreen=canvasContainer["requestFullscreen"]||canvasContainer["mozRequestFullScreen"]||canvasContainer["msRequestFullscreen"]||(canvasContainer["webkitRequestFullscreen"]?function(){canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"])}:null)||(canvasContainer["webkitRequestFullScreen"]?function(){canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"])}:null);canvasContainer.requestFullscreen()},exitFullscreen:function(){if(!Browser.isFullscreen){return false}var CFS=document["exitFullscreen"]||document["cancelFullScreen"]||document["mozCancelFullScreen"]||document["msExitFullscreen"]||document["webkitCancelFullScreen"]||function(){};CFS.apply(document,[]);return true},nextRAF:0,fakeRequestAnimationFrame:function(func){var now=Date.now();if(Browser.nextRAF===0){Browser.nextRAF=now+1e3/60}else{while(now+2>=Browser.nextRAF){Browser.nextRAF+=1e3/60}}var delay=Math.max(Browser.nextRAF-now,0);setTimeout(func,delay)},requestAnimationFrame:function(func){if(typeof requestAnimationFrame=="function"){requestAnimationFrame(func);return}var RAF=Browser.fakeRequestAnimationFrame;RAF(func)},safeSetTimeout:function(func){return safeSetTimeout(func)},safeRequestAnimationFrame:function(func){return Browser.requestAnimationFrame(function(){callUserCallback(func)})},getMimetype:function(name){return{"jpg":"image/jpeg","jpeg":"image/jpeg","png":"image/png","bmp":"image/bmp","ogg":"audio/ogg","wav":"audio/wav","mp3":"audio/mpeg"}[name.substr(name.lastIndexOf(".")+1)]},getUserMedia:function(func){if(!window.getUserMedia){window.getUserMedia=navigator["getUserMedia"]||navigator["mozGetUserMedia"]}window.getUserMedia(func)},getMovementX:function(event){return event["movementX"]||event["mozMovementX"]||event["webkitMovementX"]||0},getMovementY:function(event){return event["movementY"]||event["mozMovementY"]||event["webkitMovementY"]||0},getMouseWheelDelta:function(event){var delta=0;switch(event.type){case"DOMMouseScroll":delta=event.detail/3;break;case"mousewheel":delta=event.wheelDelta/120;break;case"wheel":delta=event.deltaY;switch(event.deltaMode){case 0:delta/=100;break;case 1:delta/=3;break;case 2:delta*=80;break;default:throw"unrecognized mouse wheel delta mode: "+event.deltaMode}break;default:throw"unrecognized mouse wheel event: "+event.type}return delta},mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:function(event){if(Browser.pointerLock){if(event.type!="mousemove"&&"mozMovementX"in event){Browser.mouseMovementX=Browser.mouseMovementY=0}else{Browser.mouseMovementX=Browser.getMovementX(event);Browser.mouseMovementY=Browser.getMovementY(event)}if(typeof SDL!="undefined"){Browser.mouseX=SDL.mouseX+Browser.mouseMovementX;Browser.mouseY=SDL.mouseY+Browser.mouseMovementY}else{Browser.mouseX+=Browser.mouseMovementX;Browser.mouseY+=Browser.mouseMovementY}}else{var rect=Module["canvas"].getBoundingClientRect();var cw=Module["canvas"].width;var ch=Module["canvas"].height;var scrollX=typeof window.scrollX!="undefined"?window.scrollX:window.pageXOffset;var scrollY=typeof window.scrollY!="undefined"?window.scrollY:window.pageYOffset;if(event.type==="touchstart"||event.type==="touchend"||event.type==="touchmove"){var touch=event.touch;if(touch===undefined){return}var adjustedX=touch.pageX-(scrollX+rect.left);var adjustedY=touch.pageY-(scrollY+rect.top);adjustedX=adjustedX*(cw/rect.width);adjustedY=adjustedY*(ch/rect.height);var coords={x:adjustedX,y:adjustedY};if(event.type==="touchstart"){Browser.lastTouches[touch.identifier]=coords;Browser.touches[touch.identifier]=coords}else if(event.type==="touchend"||event.type==="touchmove"){var last=Browser.touches[touch.identifier];if(!last)last=coords;Browser.lastTouches[touch.identifier]=last;Browser.touches[touch.identifier]=coords}return}var x=event.pageX-(scrollX+rect.left);var y=event.pageY-(scrollY+rect.top);x=x*(cw/rect.width);y=y*(ch/rect.height);Browser.mouseMovementX=x-Browser.mouseX;Browser.mouseMovementY=y-Browser.mouseY;Browser.mouseX=x;Browser.mouseY=y}},resizeListeners:[],updateResizeListeners:function(){var canvas=Module["canvas"];Browser.resizeListeners.forEach(function(listener){listener(canvas.width,canvas.height)})},setCanvasSize:function(width,height,noUpdates){var canvas=Module["canvas"];Browser.updateCanvasDimensions(canvas,width,height);if(!noUpdates)Browser.updateResizeListeners()},windowedWidth:0,windowedHeight:0,setFullscreenCanvasSize:function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen>>2];flags=flags|8388608;HEAP32[SDL.screen>>2]=flags}Browser.updateCanvasDimensions(Module["canvas"]);Browser.updateResizeListeners()},setWindowedCanvasSize:function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen>>2];flags=flags&~8388608;HEAP32[SDL.screen>>2]=flags}Browser.updateCanvasDimensions(Module["canvas"]);Browser.updateResizeListeners()},updateCanvasDimensions:function(canvas,wNative,hNative){if(wNative&&hNative){canvas.widthNative=wNative;canvas.heightNative=hNative}else{wNative=canvas.widthNative;hNative=canvas.heightNative}var w=wNative;var h=hNative;if(Module["forcedAspectRatio"]&&Module["forcedAspectRatio"]>0){if(w/h<Module["forcedAspectRatio"]){w=Math.round(h*Module["forcedAspectRatio"])}else{h=Math.round(w/Module["forcedAspectRatio"])}}if((document["fullscreenElement"]||document["mozFullScreenElement"]||document["msFullscreenElement"]||document["webkitFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvas.parentNode&&typeof screen!="undefined"){var factor=Math.min(screen.width/w,screen.height/h);w=Math.round(w*factor);h=Math.round(h*factor)}if(Browser.resizeCanvas){if(canvas.width!=w)canvas.width=w;if(canvas.height!=h)canvas.height=h;if(typeof canvas.style!="undefined"){canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}else{if(canvas.width!=wNative)canvas.width=wNative;if(canvas.height!=hNative)canvas.height=hNative;if(typeof canvas.style!="undefined"){if(w!=wNative||h!=hNative){canvas.style.setProperty("width",w+"px","important");canvas.style.setProperty("height",h+"px","important")}else{canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}}}};function _emscripten_cancel_main_loop(){Browser.mainLoop.pause();Browser.mainLoop.func=null}function _emscripten_clear_interval(id){clearInterval(id)}var JSEvents={inEventHandler:0,removeAllEventListeners:function(){for(var i=JSEvents.eventHandlers.length-1;i>=0;--i){JSEvents._removeHandler(i)}JSEvents.eventHandlers=[];JSEvents.deferredCalls=[]},registerRemoveEventListeners:function(){if(!JSEvents.removeEventListenersRegistered){__ATEXIT__.push(JSEvents.removeAllEventListeners);JSEvents.removeEventListenersRegistered=true}},deferredCalls:[],deferCall:function(targetFunction,precedence,argsList){function arraysHaveEqualContent(arrA,arrB){if(arrA.length!=arrB.length)return false;for(var i in arrA){if(arrA[i]!=arrB[i])return false}return true}for(var i in JSEvents.deferredCalls){var call=JSEvents.deferredCalls[i];if(call.targetFunction==targetFunction&&arraysHaveEqualContent(call.argsList,argsList)){return}}JSEvents.deferredCalls.push({targetFunction:targetFunction,precedence:precedence,argsList:argsList});JSEvents.deferredCalls.sort(function(x,y){return x.precedence<y.precedence})},removeDeferredCalls:function(targetFunction){for(var i=0;i<JSEvents.deferredCalls.length;++i){if(JSEvents.deferredCalls[i].targetFunction==targetFunction){JSEvents.deferredCalls.splice(i,1);--i}}},canPerformEventHandlerRequests:function(){return JSEvents.inEventHandler&&JSEvents.currentEventHandler.allowsDeferredCalls},runDeferredCalls:function(){if(!JSEvents.canPerformEventHandlerRequests()){return}for(var i=0;i<JSEvents.deferredCalls.length;++i){var call=JSEvents.deferredCalls[i];JSEvents.deferredCalls.splice(i,1);--i;call.targetFunction.apply(null,call.argsList)}},eventHandlers:[],removeAllHandlersOnTarget:function(target,eventTypeString){for(var i=0;i<JSEvents.eventHandlers.length;++i){if(JSEvents.eventHandlers[i].target==target&&(!eventTypeString||eventTypeString==JSEvents.eventHandlers[i].eventTypeString)){JSEvents._removeHandler(i--)}}},_removeHandler:function(i){var h=JSEvents.eventHandlers[i];h.target.removeEventListener(h.eventTypeString,h.eventListenerFunc,h.useCapture);JSEvents.eventHandlers.splice(i,1)},registerOrRemoveHandler:function(eventHandler){var jsEventHandler=function jsEventHandler(event){++JSEvents.inEventHandler;JSEvents.currentEventHandler=eventHandler;JSEvents.runDeferredCalls();eventHandler.handlerFunc(event);JSEvents.runDeferredCalls();--JSEvents.inEventHandler};if(eventHandler.callbackfunc){eventHandler.eventListenerFunc=jsEventHandler;eventHandler.target.addEventListener(eventHandler.eventTypeString,jsEventHandler,eventHandler.useCapture);JSEvents.eventHandlers.push(eventHandler);JSEvents.registerRemoveEventListeners()}else{for(var i=0;i<JSEvents.eventHandlers.length;++i){if(JSEvents.eventHandlers[i].target==eventHandler.target&&JSEvents.eventHandlers[i].eventTypeString==eventHandler.eventTypeString){JSEvents._removeHandler(i--)}}}},getNodeNameForTarget:function(target){if(!target)return"";if(target==window)return"#window";if(target==screen)return"#screen";return target&&target.nodeName?target.nodeName:""},fullscreenEnabled:function(){return document.fullscreenEnabled||document.webkitFullscreenEnabled}};var currentFullscreenStrategy={};function maybeCStringToJsString(cString){return cString>2?UTF8ToString(cString):cString}var specialHTMLTargets=[0,typeof document!="undefined"?document:0,typeof window!="undefined"?window:0];function findEventTarget(target){target=maybeCStringToJsString(target);var domElement=specialHTMLTargets[target]||(typeof document!="undefined"?document.querySelector(target):undefined);return domElement}function findCanvasEventTarget(target){return findEventTarget(target)}function _emscripten_get_canvas_element_size(target,width,height){var canvas=findCanvasEventTarget(target);if(!canvas)return-4;HEAP32[width>>2]=canvas.width;HEAP32[height>>2]=canvas.height}function getCanvasElementSize(target){return withStackSave(function(){var w=stackAlloc(8);var h=w+4;var targetInt=stackAlloc(target.id.length+1);stringToUTF8(target.id,targetInt,target.id.length+1);var ret=_emscripten_get_canvas_element_size(targetInt,w,h);var size=[HEAP32[w>>2],HEAP32[h>>2]];return size})}function _emscripten_set_canvas_element_size(target,width,height){var canvas=findCanvasEventTarget(target);if(!canvas)return-4;canvas.width=width;canvas.height=height;return 0}function setCanvasElementSize(target,width,height){if(!target.controlTransferredOffscreen){target.width=width;target.height=height}else{withStackSave(function(){var targetInt=stackAlloc(target.id.length+1);stringToUTF8(target.id,targetInt,target.id.length+1);_emscripten_set_canvas_element_size(targetInt,width,height)})}}function registerRestoreOldStyle(canvas){var canvasSize=getCanvasElementSize(canvas);var oldWidth=canvasSize[0];var oldHeight=canvasSize[1];var oldCssWidth=canvas.style.width;var oldCssHeight=canvas.style.height;var oldBackgroundColor=canvas.style.backgroundColor;var oldDocumentBackgroundColor=document.body.style.backgroundColor;var oldPaddingLeft=canvas.style.paddingLeft;var oldPaddingRight=canvas.style.paddingRight;var oldPaddingTop=canvas.style.paddingTop;var oldPaddingBottom=canvas.style.paddingBottom;var oldMarginLeft=canvas.style.marginLeft;var oldMarginRight=canvas.style.marginRight;var oldMarginTop=canvas.style.marginTop;var oldMarginBottom=canvas.style.marginBottom;var oldDocumentBodyMargin=document.body.style.margin;var oldDocumentOverflow=document.documentElement.style.overflow;var oldDocumentScroll=document.body.scroll;var oldImageRendering=canvas.style.imageRendering;function restoreOldStyle(){var fullscreenElement=document.fullscreenElement||document.webkitFullscreenElement||document.msFullscreenElement;if(!fullscreenElement){document.removeEventListener("fullscreenchange",restoreOldStyle);document.removeEventListener("webkitfullscreenchange",restoreOldStyle);setCanvasElementSize(canvas,oldWidth,oldHeight);canvas.style.width=oldCssWidth;canvas.style.height=oldCssHeight;canvas.style.backgroundColor=oldBackgroundColor;if(!oldDocumentBackgroundColor)document.body.style.backgroundColor="white";document.body.style.backgroundColor=oldDocumentBackgroundColor;canvas.style.paddingLeft=oldPaddingLeft;canvas.style.paddingRight=oldPaddingRight;canvas.style.paddingTop=oldPaddingTop;canvas.style.paddingBottom=oldPaddingBottom;canvas.style.marginLeft=oldMarginLeft;canvas.style.marginRight=oldMarginRight;canvas.style.marginTop=oldMarginTop;canvas.style.marginBottom=oldMarginBottom;document.body.style.margin=oldDocumentBodyMargin;document.documentElement.style.overflow=oldDocumentOverflow;document.body.scroll=oldDocumentScroll;canvas.style.imageRendering=oldImageRendering;if(canvas.GLctxObject)canvas.GLctxObject.GLctx.viewport(0,0,oldWidth,oldHeight);if(currentFullscreenStrategy.canvasResizedCallback){(function(a1,a2,a3){return dynCall_iiii.apply(null,[currentFullscreenStrategy.canvasResizedCallback,a1,a2,a3])})(37,0,currentFullscreenStrategy.canvasResizedCallbackUserData)}}}document.addEventListener("fullscreenchange",restoreOldStyle);document.addEventListener("webkitfullscreenchange",restoreOldStyle);return restoreOldStyle}function setLetterbox(element,topBottom,leftRight){element.style.paddingLeft=element.style.paddingRight=leftRight+"px";element.style.paddingTop=element.style.paddingBottom=topBottom+"px"}function getBoundingClientRect(e){return specialHTMLTargets.indexOf(e)<0?e.getBoundingClientRect():{"left":0,"top":0}}function _JSEvents_resizeCanvasForFullscreen(target,strategy){var restoreOldStyle=registerRestoreOldStyle(target);var cssWidth=strategy.softFullscreen?innerWidth:screen.width;var cssHeight=strategy.softFullscreen?innerHeight:screen.height;var rect=getBoundingClientRect(target);var windowedCssWidth=rect.width;var windowedCssHeight=rect.height;var canvasSize=getCanvasElementSize(target);var windowedRttWidth=canvasSize[0];var windowedRttHeight=canvasSize[1];if(strategy.scaleMode==3){setLetterbox(target,(cssHeight-windowedCssHeight)/2,(cssWidth-windowedCssWidth)/2);cssWidth=windowedCssWidth;cssHeight=windowedCssHeight}else if(strategy.scaleMode==2){if(cssWidth*windowedRttHeight<windowedRttWidth*cssHeight){var desiredCssHeight=windowedRttHeight*cssWidth/windowedRttWidth;setLetterbox(target,(cssHeight-desiredCssHeight)/2,0);cssHeight=desiredCssHeight}else{var desiredCssWidth=windowedRttWidth*cssHeight/windowedRttHeight;setLetterbox(target,0,(cssWidth-desiredCssWidth)/2);cssWidth=desiredCssWidth}}if(!target.style.backgroundColor)target.style.backgroundColor="black";if(!document.body.style.backgroundColor)document.body.style.backgroundColor="black";target.style.width=cssWidth+"px";target.style.height=cssHeight+"px";if(strategy.filteringMode==1){target.style.imageRendering="optimizeSpeed";target.style.imageRendering="-moz-crisp-edges";target.style.imageRendering="-o-crisp-edges";target.style.imageRendering="-webkit-optimize-contrast";target.style.imageRendering="optimize-contrast";target.style.imageRendering="crisp-edges";target.style.imageRendering="pixelated"}var dpiScale=strategy.canvasResolutionScaleMode==2?devicePixelRatio:1;if(strategy.canvasResolutionScaleMode!=0){var newWidth=cssWidth*dpiScale|0;var newHeight=cssHeight*dpiScale|0;setCanvasElementSize(target,newWidth,newHeight);if(target.GLctxObject)target.GLctxObject.GLctx.viewport(0,0,newWidth,newHeight)}return restoreOldStyle}function _JSEvents_requestFullscreen(target,strategy){if(strategy.scaleMode!=0||strategy.canvasResolutionScaleMode!=0){_JSEvents_resizeCanvasForFullscreen(target,strategy)}if(target.requestFullscreen){target.requestFullscreen()}else if(target.webkitRequestFullscreen){target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)}else{return JSEvents.fullscreenEnabled()?-3:-1}currentFullscreenStrategy=strategy;if(strategy.canvasResizedCallback){(function(a1,a2,a3){return dynCall_iiii.apply(null,[strategy.canvasResizedCallback,a1,a2,a3])})(37,0,strategy.canvasResizedCallbackUserData)}return 0}function _emscripten_exit_fullscreen(){if(!JSEvents.fullscreenEnabled())return-1;JSEvents.removeDeferredCalls(_JSEvents_requestFullscreen);var d=specialHTMLTargets[1];if(d.exitFullscreen){d.fullscreenElement&&d.exitFullscreen()}else if(d.webkitExitFullscreen){d.webkitFullscreenElement&&d.webkitExitFullscreen()}else{return-1}return 0}function requestPointerLock(target){if(target.requestPointerLock){target.requestPointerLock()}else if(target.msRequestPointerLock){target.msRequestPointerLock()}else{if(document.body.requestPointerLock||document.body.msRequestPointerLock){return-3}else{return-1}}return 0}function _emscripten_exit_pointerlock(){JSEvents.removeDeferredCalls(requestPointerLock);if(document.exitPointerLock){document.exitPointerLock()}else if(document.msExitPointerLock){document.msExitPointerLock()}else{return-1}return 0}function fillFullscreenChangeEventData(eventStruct){var fullscreenElement=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;var isFullscreen=!!fullscreenElement;HEAP32[eventStruct>>2]=isFullscreen;HEAP32[eventStruct+4>>2]=JSEvents.fullscreenEnabled();var reportedElement=isFullscreen?fullscreenElement:JSEvents.previousFullscreenElement;var nodeName=JSEvents.getNodeNameForTarget(reportedElement);var id=reportedElement&&reportedElement.id?reportedElement.id:"";stringToUTF8(nodeName,eventStruct+8,128);stringToUTF8(id,eventStruct+136,128);HEAP32[eventStruct+264>>2]=reportedElement?reportedElement.clientWidth:0;HEAP32[eventStruct+268>>2]=reportedElement?reportedElement.clientHeight:0;HEAP32[eventStruct+272>>2]=screen.width;HEAP32[eventStruct+276>>2]=screen.height;if(isFullscreen){JSEvents.previousFullscreenElement=fullscreenElement}}function _emscripten_get_fullscreen_status(fullscreenStatus){if(!JSEvents.fullscreenEnabled())return-1;fillFullscreenChangeEventData(fullscreenStatus);return 0}function fillGamepadEventData(eventStruct,e){HEAPF64[eventStruct>>3]=e.timestamp;for(var i=0;i<e.axes.length;++i){HEAPF64[eventStruct+i*8+16>>3]=e.axes[i]}for(var i=0;i<e.buttons.length;++i){if(typeof e.buttons[i]=="object"){HEAPF64[eventStruct+i*8+528>>3]=e.buttons[i].value}else{HEAPF64[eventStruct+i*8+528>>3]=e.buttons[i]}}for(var i=0;i<e.buttons.length;++i){if(typeof e.buttons[i]=="object"){HEAP32[eventStruct+i*4+1040>>2]=e.buttons[i].pressed}else{HEAP32[eventStruct+i*4+1040>>2]=e.buttons[i]==1}}HEAP32[eventStruct+1296>>2]=e.connected;HEAP32[eventStruct+1300>>2]=e.index;HEAP32[eventStruct+8>>2]=e.axes.length;HEAP32[eventStruct+12>>2]=e.buttons.length;stringToUTF8(e.id,eventStruct+1304,64);stringToUTF8(e.mapping,eventStruct+1368,64)}function _emscripten_get_gamepad_status(index,gamepadState){if(index<0||index>=JSEvents.lastGamepadState.length)return-5;if(!JSEvents.lastGamepadState[index])return-7;fillGamepadEventData(gamepadState,JSEvents.lastGamepadState[index]);return 0}function _emscripten_get_heap_max(){return 2147483648}function _emscripten_get_now_res(){if(ENVIRONMENT_IS_NODE){return 1}else return 1e3}function _emscripten_get_num_gamepads(){return JSEvents.lastGamepadState.length}function _emscripten_html5_remove_all_event_listeners(){JSEvents.removeAllEventListeners()}function _emscripten_is_webgl_context_lost(contextHandle){return!GL.contexts[contextHandle]||GL.contexts[contextHandle].GLctx.isContextLost()}function reallyNegative(x){return x<0||x===0&&1/x===-Infinity}function convertI32PairToI53(lo,hi){return(lo>>>0)+hi*4294967296}function convertU32PairToI53(lo,hi){return(lo>>>0)+(hi>>>0)*4294967296}function reSign(value,bits){if(value<=0){return value}var half=bits<=32?Math.abs(1<<bits-1):Math.pow(2,bits-1);if(value>=half&&(bits<=32||value>half)){value=-2*half+value}return value}function unSign(value,bits){if(value>=0){return value}return bits<=32?2*Math.abs(1<<bits-1)+value:Math.pow(2,bits)+value}function formatString(format,varargs){var textIndex=format;var argIndex=varargs;function prepVararg(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){ptr+=4}}else{}return ptr}function getNextArg(type){var ret;argIndex=prepVararg(argIndex,type);if(type==="double"){ret=Number(HEAPF64[argIndex>>3]);argIndex+=8}else if(type=="i64"){ret=[HEAP32[argIndex>>2],HEAP32[argIndex+4>>2]];argIndex+=8}else{type="i32";ret=HEAP32[argIndex>>2];argIndex+=4}return ret}var ret=[];var curr,next,currArg;while(1){var startTextIndex=textIndex;curr=HEAP8[textIndex>>0];if(curr===0)break;next=HEAP8[textIndex+1>>0];if(curr==37){var flagAlwaysSigned=false;var flagLeftAlign=false;var flagAlternative=false;var flagZeroPad=false;var flagPadSign=false;flagsLoop:while(1){switch(next){case 43:flagAlwaysSigned=true;break;case 45:flagLeftAlign=true;break;case 35:flagAlternative=true;break;case 48:if(flagZeroPad){break flagsLoop}else{flagZeroPad=true;break}case 32:flagPadSign=true;break;default:break flagsLoop}textIndex++;next=HEAP8[textIndex+1>>0]}var width=0;if(next==42){width=getNextArg("i32");textIndex++;next=HEAP8[textIndex+1>>0]}else{while(next>=48&&next<=57){width=width*10+(next-48);textIndex++;next=HEAP8[textIndex+1>>0]}}var precisionSet=false,precision=-1;if(next==46){precision=0;precisionSet=true;textIndex++;next=HEAP8[textIndex+1>>0];if(next==42){precision=getNextArg("i32");textIndex++}else{while(1){var precisionChr=HEAP8[textIndex+1>>0];if(precisionChr<48||precisionChr>57)break;precision=precision*10+(precisionChr-48);textIndex++}}next=HEAP8[textIndex+1>>0]}if(precision<0){precision=6;precisionSet=false}var argSize;switch(String.fromCharCode(next)){case"h":var nextNext=HEAP8[textIndex+2>>0];if(nextNext==104){textIndex++;argSize=1}else{argSize=2}break;case"l":var nextNext=HEAP8[textIndex+2>>0];if(nextNext==108){textIndex++;argSize=8}else{argSize=4}break;case"L":case"q":case"j":argSize=8;break;case"z":case"t":case"I":argSize=4;break;default:argSize=null}if(argSize)textIndex++;next=HEAP8[textIndex+1>>0];switch(String.fromCharCode(next)){case"d":case"i":case"u":case"o":case"x":case"X":case"p":{var signed=next==100||next==105;argSize=argSize||4;currArg=getNextArg("i"+argSize*8);var argText;if(argSize==8){currArg=next==117?convertU32PairToI53(currArg[0],currArg[1]):convertI32PairToI53(currArg[0],currArg[1])}if(argSize<=4){var limit=Math.pow(256,argSize)-1;currArg=(signed?reSign:unSign)(currArg&limit,argSize*8)}var currAbsArg=Math.abs(currArg);var prefix="";if(next==100||next==105){argText=reSign(currArg,8*argSize).toString(10)}else if(next==117){argText=unSign(currArg,8*argSize).toString(10);currArg=Math.abs(currArg)}else if(next==111){argText=(flagAlternative?"0":"")+currAbsArg.toString(8)}else if(next==120||next==88){prefix=flagAlternative&&currArg!=0?"0x":"";if(currArg<0){currArg=-currArg;argText=(currAbsArg-1).toString(16);var buffer=[];for(var i=0;i<argText.length;i++){buffer.push((15-parseInt(argText[i],16)).toString(16))}argText=buffer.join("");while(argText.length<argSize*2)argText="f"+argText}else{argText=currAbsArg.toString(16)}if(next==88){prefix=prefix.toUpperCase();argText=argText.toUpperCase()}}else if(next==112){if(currAbsArg===0){argText="(nil)"}else{prefix="0x";argText=currAbsArg.toString(16)}}if(precisionSet){while(argText.length<precision){argText="0"+argText}}if(currArg>=0){if(flagAlwaysSigned){prefix="+"+prefix}else if(flagPadSign){prefix=" "+prefix}}if(argText.charAt(0)=="-"){prefix="-"+prefix;argText=argText.substr(1)}while(prefix.length+argText.length<width){if(flagLeftAlign){argText+=" "}else{if(flagZeroPad){argText="0"+argText}else{prefix=" "+prefix}}}argText=prefix+argText;argText.split("").forEach(function(chr){ret.push(chr.charCodeAt(0))});break}case"f":case"F":case"e":case"E":case"g":case"G":{currArg=getNextArg("double");var argText;if(isNaN(currArg)){argText="nan";flagZeroPad=false}else if(!isFinite(currArg)){argText=(currArg<0?"-":"")+"inf";flagZeroPad=false}else{var isGeneral=false;var effectivePrecision=Math.min(precision,20);if(next==103||next==71){isGeneral=true;precision=precision||1;var exponent=parseInt(currArg.toExponential(effectivePrecision).split("e")[1],10);if(precision>exponent&&exponent>=-4){next=(next==103?"f":"F").charCodeAt(0);precision-=exponent+1}else{next=(next==103?"e":"E").charCodeAt(0);precision--}effectivePrecision=Math.min(precision,20)}if(next==101||next==69){argText=currArg.toExponential(effectivePrecision);if(/[eE][-+]\d$/.test(argText)){argText=argText.slice(0,-1)+"0"+argText.slice(-1)}}else if(next==102||next==70){argText=currArg.toFixed(effectivePrecision);if(currArg===0&&reallyNegative(currArg)){argText="-"+argText}}var parts=argText.split("e");if(isGeneral&&!flagAlternative){while(parts[0].length>1&&parts[0].includes(".")&&(parts[0].slice(-1)=="0"||parts[0].slice(-1)==".")){parts[0]=parts[0].slice(0,-1)}}else{if(flagAlternative&&argText.indexOf(".")==-1)parts[0]+=".";while(precision>effectivePrecision++)parts[0]+="0"}argText=parts[0]+(parts.length>1?"e"+parts[1]:"");if(next==69)argText=argText.toUpperCase();if(currArg>=0){if(flagAlwaysSigned){argText="+"+argText}else if(flagPadSign){argText=" "+argText}}}while(argText.length<width){if(flagLeftAlign){argText+=" "}else{if(flagZeroPad&&(argText[0]=="-"||argText[0]=="+")){argText=argText[0]+"0"+argText.slice(1)}else{argText=(flagZeroPad?"0":" ")+argText}}}if(next<97)argText=argText.toUpperCase();argText.split("").forEach(function(chr){ret.push(chr.charCodeAt(0))});break}case"s":{var arg=getNextArg("i8*");var argLength=arg?_strlen(arg):"(null)".length;if(precisionSet)argLength=Math.min(argLength,precision);if(!flagLeftAlign){while(argLength<width--){ret.push(32)}}if(arg){for(var i=0;i<argLength;i++){ret.push(HEAPU8[arg++>>0])}}else{ret=ret.concat(intArrayFromString("(null)".substr(0,argLength),true))}if(flagLeftAlign){while(argLength<width--){ret.push(32)}}break}case"c":{if(flagLeftAlign)ret.push(getNextArg("i8"));while(--width>0){ret.push(32)}if(!flagLeftAlign)ret.push(getNextArg("i8"));break}case"n":{var ptr=getNextArg("i32*");HEAP32[ptr>>2]=ret.length;break}case"%":{ret.push(curr);break}default:{for(var i=startTextIndex;i<textIndex+2;i++){ret.push(HEAP8[i>>0])}}}textIndex+=2}else{ret.push(curr);textIndex+=1}}return ret}function traverseStack(args){if(!args||!args.callee||!args.callee.name){return[null,"",""]}var funstr=args.callee.toString();var funcname=args.callee.name;var str="(";var first=true;for(var i in args){var a=args[i];if(!first){str+=", "}first=false;if(typeof a=="number"||typeof a=="string"){str+=a}else{str+="("+typeof a+")"}}str+=")";var caller=args.callee.caller;args=caller?caller.arguments:[];if(first)str="";return[args,funcname,str]}function _emscripten_get_callstack_js(flags){var callstack=jsStackTrace();var iThisFunc=callstack.lastIndexOf("_emscripten_log");var iThisFunc2=callstack.lastIndexOf("_emscripten_get_callstack");var iNextLine=callstack.indexOf("\n",Math.max(iThisFunc,iThisFunc2))+1;callstack=callstack.slice(iNextLine);if(flags&32){warnOnce("EM_LOG_DEMANGLE is deprecated; ignoring")}if(flags&8&&typeof emscripten_source_map=="undefined"){warnOnce('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.');flags^=8;flags|=16}var stack_args=null;if(flags&128){stack_args=traverseStack(arguments);while(stack_args[1].includes("_emscripten_"))stack_args=traverseStack(stack_args[0])}var lines=callstack.split("\n");callstack="";var newFirefoxRe=new RegExp("\\s*(.*?)@(.*?):([0-9]+):([0-9]+)");var firefoxRe=new RegExp("\\s*(.*?)@(.*):(.*)(:(.*))?");var chromeRe=new RegExp("\\s*at (.*?) \\((.*):(.*):(.*)\\)");for(var l in lines){var line=lines[l];var symbolName="";var file="";var lineno=0;var column=0;var parts=chromeRe.exec(line);if(parts&&parts.length==5){symbolName=parts[1];file=parts[2];lineno=parts[3];column=parts[4]}else{parts=newFirefoxRe.exec(line);if(!parts)parts=firefoxRe.exec(line);if(parts&&parts.length>=4){symbolName=parts[1];file=parts[2];lineno=parts[3];column=parts[4]|0}else{callstack+=line+"\n";continue}}var haveSourceMap=false;if(flags&8){var orig=emscripten_source_map.originalPositionFor({line:lineno,column:column});haveSourceMap=orig&&orig.source;if(haveSourceMap){if(flags&64){orig.source=orig.source.substring(orig.source.replace(/\\/g,"/").lastIndexOf("/")+1)}callstack+="    at "+symbolName+" ("+orig.source+":"+orig.line+":"+orig.column+")\n"}}if(flags&16||!haveSourceMap){if(flags&64){file=file.substring(file.replace(/\\/g,"/").lastIndexOf("/")+1)}callstack+=(haveSourceMap?"     = "+symbolName:"    at "+symbolName)+" ("+file+":"+lineno+":"+column+")\n"}if(flags&128&&stack_args[0]){if(stack_args[1]==symbolName&&stack_args[2].length>0){callstack=callstack.replace(/\s+$/,"");callstack+=" with values: "+stack_args[1]+stack_args[2]+"\n"}stack_args=traverseStack(stack_args[0])}}callstack=callstack.replace(/\s+$/,"");return callstack}function _emscripten_log_js(flags,str){if(flags&24){str=str.replace(/\s+$/,"");str+=(str.length>0?"\n":"")+_emscripten_get_callstack_js(flags)}if(flags&1){if(flags&4){console.error(str)}else if(flags&2){console.warn(str)}else if(flags&512){console.info(str)}else if(flags&256){console.debug(str)}else{console.log(str)}}else if(flags&6){err(str)}else{out(str)}}function _emscripten_log(flags,format,varargs){var result=formatString(format,varargs);var str=UTF8ArrayToString(result,0);_emscripten_log_js(flags,str)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function doRequestFullscreen(target,strategy){if(!JSEvents.fullscreenEnabled())return-1;target=findEventTarget(target);if(!target)return-4;if(!target.requestFullscreen&&!target.webkitRequestFullscreen){return-3}var canPerformRequests=JSEvents.canPerformEventHandlerRequests();if(!canPerformRequests){if(strategy.deferUntilInEventHandler){JSEvents.deferCall(_JSEvents_requestFullscreen,1,[target,strategy]);return 1}else{return-2}}return _JSEvents_requestFullscreen(target,strategy)}function _emscripten_request_fullscreen(target,deferUntilInEventHandler){var strategy={scaleMode:0,canvasResolutionScaleMode:0,filteringMode:0,deferUntilInEventHandler:deferUntilInEventHandler,canvasResizedCallbackTargetThread:2};return doRequestFullscreen(target,strategy)}function _emscripten_request_pointerlock(target,deferUntilInEventHandler){target=findEventTarget(target);if(!target)return-4;if(!target.requestPointerLock&&!target.msRequestPointerLock){return-1}var canPerformRequests=JSEvents.canPerformEventHandlerRequests();if(!canPerformRequests){if(deferUntilInEventHandler){JSEvents.deferCall(requestPointerLock,2,[target]);return 1}else{return-2}}return requestPointerLock(target)}function emscripten_realloc_buffer(size){try{wasmMemory.grow(size-buffer.byteLength+65535>>>16);updateGlobalBufferAndViews(wasmMemory.buffer);return 1}catch(e){}}function _emscripten_resize_heap(requestedSize){var oldSize=HEAPU8.length;requestedSize=requestedSize>>>0;var maxHeapSize=_emscripten_get_heap_max();if(requestedSize>maxHeapSize){return false}let alignUp=(x,multiple)=>x+(multiple-x%multiple)%multiple;for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=emscripten_realloc_buffer(newSize);if(replacement){return true}}return false}function _emscripten_sample_gamepad_data(){return(JSEvents.lastGamepadState=navigator.getGamepads?navigator.getGamepads():navigator.webkitGetGamepads?navigator.webkitGetGamepads():null)?0:-1}function registerFocusEventCallback(target,userData,useCapture,callbackfunc,eventTypeId,eventTypeString,targetThread){if(!JSEvents.focusEvent)JSEvents.focusEvent=_malloc(256);var focusEventHandlerFunc=function(ev){var e=ev||event;var nodeName=JSEvents.getNodeNameForTarget(e.target);var id=e.target.id?e.target.id:"";var focusEvent=JSEvents.focusEvent;stringToUTF8(nodeName,focusEvent+0,128);stringToUTF8(id,focusEvent+128,128);if(function(a1,a2,a3){return dynCall_iiii.apply(null,[callbackfunc,a1,a2,a3])}(eventTypeId,focusEvent,userData))e.preventDefault()};var eventHandler={target:findEventTarget(target),eventTypeString:eventTypeString,callbackfunc:callbackfunc,handlerFunc:focusEventHandlerFunc,useCapture:useCapture};JSEvents.registerOrRemoveHandler(eventHandler)}function _emscripten_set_blur_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerFocusEventCallback(target,userData,useCapture,callbackfunc,12,"blur",targetThread);return 0}function _emscripten_set_focus_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerFocusEventCallback(target,userData,useCapture,callbackfunc,13,"focus",targetThread);return 0}function registerFullscreenChangeEventCallback(target,userData,useCapture,callbackfunc,eventTypeId,eventTypeString,targetThread){if(!JSEvents.fullscreenChangeEvent)JSEvents.fullscreenChangeEvent=_malloc(280);var fullscreenChangeEventhandlerFunc=function(ev){var e=ev||event;var fullscreenChangeEvent=JSEvents.fullscreenChangeEvent;fillFullscreenChangeEventData(fullscreenChangeEvent);if(function(a1,a2,a3){return dynCall_iiii.apply(null,[callbackfunc,a1,a2,a3])}(eventTypeId,fullscreenChangeEvent,userData))e.preventDefault()};var eventHandler={target:target,eventTypeString:eventTypeString,callbackfunc:callbackfunc,handlerFunc:fullscreenChangeEventhandlerFunc,useCapture:useCapture};JSEvents.registerOrRemoveHandler(eventHandler)}function _emscripten_set_fullscreenchange_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){if(!JSEvents.fullscreenEnabled())return-1;target=findEventTarget(target);if(!target)return-4;registerFullscreenChangeEventCallback(target,userData,useCapture,callbackfunc,19,"fullscreenchange",targetThread);registerFullscreenChangeEventCallback(target,userData,useCapture,callbackfunc,19,"webkitfullscreenchange",targetThread);return 0}function registerGamepadEventCallback(target,userData,useCapture,callbackfunc,eventTypeId,eventTypeString,targetThread){if(!JSEvents.gamepadEvent)JSEvents.gamepadEvent=_malloc(1432);var gamepadEventHandlerFunc=function(ev){var e=ev||event;var gamepadEvent=JSEvents.gamepadEvent;fillGamepadEventData(gamepadEvent,e["gamepad"]);if(function(a1,a2,a3){return dynCall_iiii.apply(null,[callbackfunc,a1,a2,a3])}(eventTypeId,gamepadEvent,userData))e.preventDefault()};var eventHandler={target:findEventTarget(target),allowsDeferredCalls:true,eventTypeString:eventTypeString,callbackfunc:callbackfunc,handlerFunc:gamepadEventHandlerFunc,useCapture:useCapture};JSEvents.registerOrRemoveHandler(eventHandler)}function _emscripten_set_gamepadconnected_callback_on_thread(userData,useCapture,callbackfunc,targetThread){if(!navigator.getGamepads&&!navigator.webkitGetGamepads)return-1;registerGamepadEventCallback(2,userData,useCapture,callbackfunc,26,"gamepadconnected",targetThread);return 0}function _emscripten_set_gamepaddisconnected_callback_on_thread(userData,useCapture,callbackfunc,targetThread){if(!navigator.getGamepads&&!navigator.webkitGetGamepads)return-1;registerGamepadEventCallback(2,userData,useCapture,callbackfunc,27,"gamepaddisconnected",targetThread);return 0}function _emscripten_set_interval(cb,msecs,userData){return setInterval(function(){callUserCallback(function(){(function(a1){dynCall_vi.apply(null,[cb,a1])})(userData)})},msecs)}function registerKeyEventCallback(target,userData,useCapture,callbackfunc,eventTypeId,eventTypeString,targetThread){if(!JSEvents.keyEvent)JSEvents.keyEvent=_malloc(176);var keyEventHandlerFunc=function(e){var keyEventData=JSEvents.keyEvent;HEAPF64[keyEventData>>3]=e.timeStamp;var idx=keyEventData>>2;HEAP32[idx+2]=e.location;HEAP32[idx+3]=e.ctrlKey;HEAP32[idx+4]=e.shiftKey;HEAP32[idx+5]=e.altKey;HEAP32[idx+6]=e.metaKey;HEAP32[idx+7]=e.repeat;HEAP32[idx+8]=e.charCode;HEAP32[idx+9]=e.keyCode;HEAP32[idx+10]=e.which;stringToUTF8(e.key||"",keyEventData+44,32);stringToUTF8(e.code||"",keyEventData+76,32);stringToUTF8(e.char||"",keyEventData+108,32);stringToUTF8(e.locale||"",keyEventData+140,32);if(function(a1,a2,a3){return dynCall_iiii.apply(null,[callbackfunc,a1,a2,a3])}(eventTypeId,keyEventData,userData))e.preventDefault()};var eventHandler={target:findEventTarget(target),allowsDeferredCalls:true,eventTypeString:eventTypeString,callbackfunc:callbackfunc,handlerFunc:keyEventHandlerFunc,useCapture:useCapture};JSEvents.registerOrRemoveHandler(eventHandler)}function _emscripten_set_keydown_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerKeyEventCallback(target,userData,useCapture,callbackfunc,2,"keydown",targetThread);return 0}function _emscripten_set_keypress_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerKeyEventCallback(target,userData,useCapture,callbackfunc,1,"keypress",targetThread);return 0}function _emscripten_set_keyup_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerKeyEventCallback(target,userData,useCapture,callbackfunc,3,"keyup",targetThread);return 0}function _emscripten_set_main_loop(func,fps,simulateInfiniteLoop){var browserIterationFunc=function(){dynCall_v.call(null,func)};setMainLoop(browserIterationFunc,fps,simulateInfiniteLoop)}function fillMouseEventData(eventStruct,e,target){HEAPF64[eventStruct>>3]=e.timeStamp;var idx=eventStruct>>2;HEAP32[idx+2]=e.screenX;HEAP32[idx+3]=e.screenY;HEAP32[idx+4]=e.clientX;HEAP32[idx+5]=e.clientY;HEAP32[idx+6]=e.ctrlKey;HEAP32[idx+7]=e.shiftKey;HEAP32[idx+8]=e.altKey;HEAP32[idx+9]=e.metaKey;HEAP16[idx*2+20]=e.button;HEAP16[idx*2+21]=e.buttons;HEAP32[idx+11]=e["movementX"];HEAP32[idx+12]=e["movementY"];var rect=getBoundingClientRect(target);HEAP32[idx+13]=e.clientX-rect.left;HEAP32[idx+14]=e.clientY-rect.top}function registerMouseEventCallback(target,userData,useCapture,callbackfunc,eventTypeId,eventTypeString,targetThread){if(!JSEvents.mouseEvent)JSEvents.mouseEvent=_malloc(72);target=findEventTarget(target);var mouseEventHandlerFunc=function(ev){var e=ev||event;fillMouseEventData(JSEvents.mouseEvent,e,target);if(function(a1,a2,a3){return dynCall_iiii.apply(null,[callbackfunc,a1,a2,a3])}(eventTypeId,JSEvents.mouseEvent,userData))e.preventDefault()};var eventHandler={target:target,allowsDeferredCalls:eventTypeString!="mousemove"&&eventTypeString!="mouseenter"&&eventTypeString!="mouseleave",eventTypeString:eventTypeString,callbackfunc:callbackfunc,handlerFunc:mouseEventHandlerFunc,useCapture:useCapture};JSEvents.registerOrRemoveHandler(eventHandler)}function _emscripten_set_mousedown_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerMouseEventCallback(target,userData,useCapture,callbackfunc,5,"mousedown",targetThread);return 0}function _emscripten_set_mousemove_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerMouseEventCallback(target,userData,useCapture,callbackfunc,8,"mousemove",targetThread);return 0}function _emscripten_set_mouseup_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerMouseEventCallback(target,userData,useCapture,callbackfunc,6,"mouseup",targetThread);return 0}function fillPointerlockChangeEventData(eventStruct){var pointerLockElement=document.pointerLockElement||document.mozPointerLockElement||document.webkitPointerLockElement||document.msPointerLockElement;var isPointerlocked=!!pointerLockElement;HEAP32[eventStruct>>2]=isPointerlocked;var nodeName=JSEvents.getNodeNameForTarget(pointerLockElement);var id=pointerLockElement&&pointerLockElement.id?pointerLockElement.id:"";stringToUTF8(nodeName,eventStruct+4,128);stringToUTF8(id,eventStruct+132,128)}function registerPointerlockChangeEventCallback(target,userData,useCapture,callbackfunc,eventTypeId,eventTypeString,targetThread){if(!JSEvents.pointerlockChangeEvent)JSEvents.pointerlockChangeEvent=_malloc(260);var pointerlockChangeEventHandlerFunc=function(ev){var e=ev||event;var pointerlockChangeEvent=JSEvents.pointerlockChangeEvent;fillPointerlockChangeEventData(pointerlockChangeEvent);if(function(a1,a2,a3){return dynCall_iiii.apply(null,[callbackfunc,a1,a2,a3])}(eventTypeId,pointerlockChangeEvent,userData))e.preventDefault()};var eventHandler={target:target,eventTypeString:eventTypeString,callbackfunc:callbackfunc,handlerFunc:pointerlockChangeEventHandlerFunc,useCapture:useCapture};JSEvents.registerOrRemoveHandler(eventHandler)}function _emscripten_set_pointerlockchange_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){if(!document||!document.body||!document.body.requestPointerLock&&!document.body.mozRequestPointerLock&&!document.body.webkitRequestPointerLock&&!document.body.msRequestPointerLock){return-1}target=findEventTarget(target);if(!target)return-4;registerPointerlockChangeEventCallback(target,userData,useCapture,callbackfunc,20,"pointerlockchange",targetThread);registerPointerlockChangeEventCallback(target,userData,useCapture,callbackfunc,20,"mozpointerlockchange",targetThread);registerPointerlockChangeEventCallback(target,userData,useCapture,callbackfunc,20,"webkitpointerlockchange",targetThread);registerPointerlockChangeEventCallback(target,userData,useCapture,callbackfunc,20,"mspointerlockchange",targetThread);return 0}function registerTouchEventCallback(target,userData,useCapture,callbackfunc,eventTypeId,eventTypeString,targetThread){if(!JSEvents.touchEvent)JSEvents.touchEvent=_malloc(1696);target=findEventTarget(target);var touchEventHandlerFunc=function(e){var t,touches={},et=e.touches;for(var i=0;i<et.length;++i){t=et[i];t.isChanged=t.onTarget=0;touches[t.identifier]=t}for(var i=0;i<e.changedTouches.length;++i){t=e.changedTouches[i];t.isChanged=1;touches[t.identifier]=t}for(var i=0;i<e.targetTouches.length;++i){touches[e.targetTouches[i].identifier].onTarget=1}var touchEvent=JSEvents.touchEvent;var idx=touchEvent>>2;HEAP32[idx+3]=e.ctrlKey;HEAP32[idx+4]=e.shiftKey;HEAP32[idx+5]=e.altKey;HEAP32[idx+6]=e.metaKey;idx+=7;var targetRect=getBoundingClientRect(target);var numTouches=0;for(var i in touches){var t=touches[i];HEAP32[idx+0]=t.identifier;HEAP32[idx+1]=t.screenX;HEAP32[idx+2]=t.screenY;HEAP32[idx+3]=t.clientX;HEAP32[idx+4]=t.clientY;HEAP32[idx+5]=t.pageX;HEAP32[idx+6]=t.pageY;HEAP32[idx+7]=t.isChanged;HEAP32[idx+8]=t.onTarget;HEAP32[idx+9]=t.clientX-targetRect.left;HEAP32[idx+10]=t.clientY-targetRect.top;idx+=13;if(++numTouches>31){break}}HEAP32[touchEvent+8>>2]=numTouches;if(function(a1,a2,a3){return dynCall_iiii.apply(null,[callbackfunc,a1,a2,a3])}(eventTypeId,touchEvent,userData))e.preventDefault()};var eventHandler={target:target,allowsDeferredCalls:eventTypeString=="touchstart"||eventTypeString=="touchend",eventTypeString:eventTypeString,callbackfunc:callbackfunc,handlerFunc:touchEventHandlerFunc,useCapture:useCapture};JSEvents.registerOrRemoveHandler(eventHandler)}function _emscripten_set_touchcancel_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerTouchEventCallback(target,userData,useCapture,callbackfunc,25,"touchcancel",targetThread);return 0}function _emscripten_set_touchend_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerTouchEventCallback(target,userData,useCapture,callbackfunc,23,"touchend",targetThread);return 0}function _emscripten_set_touchmove_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerTouchEventCallback(target,userData,useCapture,callbackfunc,24,"touchmove",targetThread);return 0}function _emscripten_set_touchstart_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){registerTouchEventCallback(target,userData,useCapture,callbackfunc,22,"touchstart",targetThread);return 0}function registerWheelEventCallback(target,userData,useCapture,callbackfunc,eventTypeId,eventTypeString,targetThread){if(!JSEvents.wheelEvent)JSEvents.wheelEvent=_malloc(104);var wheelHandlerFunc=function(ev){var e=ev||event;var wheelEvent=JSEvents.wheelEvent;fillMouseEventData(wheelEvent,e,target);HEAPF64[wheelEvent+72>>3]=e["deltaX"];HEAPF64[wheelEvent+80>>3]=e["deltaY"];HEAPF64[wheelEvent+88>>3]=e["deltaZ"];HEAP32[wheelEvent+96>>2]=e["deltaMode"];if(function(a1,a2,a3){return dynCall_iiii.apply(null,[callbackfunc,a1,a2,a3])}(eventTypeId,wheelEvent,userData))e.preventDefault()};var eventHandler={target:target,allowsDeferredCalls:true,eventTypeString:eventTypeString,callbackfunc:callbackfunc,handlerFunc:wheelHandlerFunc,useCapture:useCapture};JSEvents.registerOrRemoveHandler(eventHandler)}function _emscripten_set_wheel_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){target=findEventTarget(target);if(typeof target.onwheel!="undefined"){registerWheelEventCallback(target,userData,useCapture,callbackfunc,9,"wheel",targetThread);return 0}else{return-1}}function __webgl_enable_ANGLE_instanced_arrays(ctx){var ext=ctx.getExtension("ANGLE_instanced_arrays");if(ext){ctx["vertexAttribDivisor"]=function(index,divisor){ext["vertexAttribDivisorANGLE"](index,divisor)};ctx["drawArraysInstanced"]=function(mode,first,count,primcount){ext["drawArraysInstancedANGLE"](mode,first,count,primcount)};ctx["drawElementsInstanced"]=function(mode,count,type,indices,primcount){ext["drawElementsInstancedANGLE"](mode,count,type,indices,primcount)};return 1}}function __webgl_enable_OES_vertex_array_object(ctx){var ext=ctx.getExtension("OES_vertex_array_object");if(ext){ctx["createVertexArray"]=function(){return ext["createVertexArrayOES"]()};ctx["deleteVertexArray"]=function(vao){ext["deleteVertexArrayOES"](vao)};ctx["bindVertexArray"]=function(vao){ext["bindVertexArrayOES"](vao)};ctx["isVertexArray"]=function(vao){return ext["isVertexArrayOES"](vao)};return 1}}function __webgl_enable_WEBGL_draw_buffers(ctx){var ext=ctx.getExtension("WEBGL_draw_buffers");if(ext){ctx["drawBuffers"]=function(n,bufs){ext["drawBuffersWEBGL"](n,bufs)};return 1}}function __webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(ctx){return!!(ctx.dibvbi=ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"))}function __webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(ctx){return!!(ctx.mdibvbi=ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"))}function __webgl_enable_WEBGL_multi_draw(ctx){return!!(ctx.multiDrawWebgl=ctx.getExtension("WEBGL_multi_draw"))}var GL={counter:1,buffers:[],mappedBuffers:{},programs:[],framebuffers:[],renderbuffers:[],textures:[],shaders:[],vaos:[],contexts:[],offscreenCanvases:{},queries:[],samplers:[],transformFeedbacks:[],syncs:[],byteSizeByTypeRoot:5120,byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],stringCache:{},stringiCache:{},unpackAlignment:4,recordError:function recordError(errorCode){if(!GL.lastError){GL.lastError=errorCode}},getNewId:function(table){var ret=GL.counter++;for(var i=table.length;i<ret;i++){table[i]=null}return ret},MAX_TEMP_BUFFER_SIZE:2097152,numTempVertexBuffersPerSize:64,log2ceilLookup:function(i){return 32-Math.clz32(i===0?0:i-1)},generateTempBuffers:function(quads,context){var largestIndex=GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);context.tempVertexBufferCounters1=[];context.tempVertexBufferCounters2=[];context.tempVertexBufferCounters1.length=context.tempVertexBufferCounters2.length=largestIndex+1;context.tempVertexBuffers1=[];context.tempVertexBuffers2=[];context.tempVertexBuffers1.length=context.tempVertexBuffers2.length=largestIndex+1;context.tempIndexBuffers=[];context.tempIndexBuffers.length=largestIndex+1;for(var i=0;i<=largestIndex;++i){context.tempIndexBuffers[i]=null;context.tempVertexBufferCounters1[i]=context.tempVertexBufferCounters2[i]=0;var ringbufferLength=GL.numTempVertexBuffersPerSize;context.tempVertexBuffers1[i]=[];context.tempVertexBuffers2[i]=[];var ringbuffer1=context.tempVertexBuffers1[i];var ringbuffer2=context.tempVertexBuffers2[i];ringbuffer1.length=ringbuffer2.length=ringbufferLength;for(var j=0;j<ringbufferLength;++j){ringbuffer1[j]=ringbuffer2[j]=null}}if(quads){context.tempQuadIndexBuffer=GLctx.createBuffer();context.GLctx.bindBuffer(34963,context.tempQuadIndexBuffer);var numIndexes=GL.MAX_TEMP_BUFFER_SIZE>>1;var quadIndexes=new Uint16Array(numIndexes);var i=0,v=0;while(1){quadIndexes[i++]=v;if(i>=numIndexes)break;quadIndexes[i++]=v+1;if(i>=numIndexes)break;quadIndexes[i++]=v+2;if(i>=numIndexes)break;quadIndexes[i++]=v;if(i>=numIndexes)break;quadIndexes[i++]=v+2;if(i>=numIndexes)break;quadIndexes[i++]=v+3;if(i>=numIndexes)break;v+=4}context.GLctx.bufferData(34963,quadIndexes,35044);context.GLctx.bindBuffer(34963,null)}},getTempVertexBuffer:function getTempVertexBuffer(sizeBytes){var idx=GL.log2ceilLookup(sizeBytes);var ringbuffer=GL.currentContext.tempVertexBuffers1[idx];var nextFreeBufferIndex=GL.currentContext.tempVertexBufferCounters1[idx];GL.currentContext.tempVertexBufferCounters1[idx]=GL.currentContext.tempVertexBufferCounters1[idx]+1&GL.numTempVertexBuffersPerSize-1;var vbo=ringbuffer[nextFreeBufferIndex];if(vbo){return vbo}var prevVBO=GLctx.getParameter(34964);ringbuffer[nextFreeBufferIndex]=GLctx.createBuffer();GLctx.bindBuffer(34962,ringbuffer[nextFreeBufferIndex]);GLctx.bufferData(34962,1<<idx,35048);GLctx.bindBuffer(34962,prevVBO);return ringbuffer[nextFreeBufferIndex]},getTempIndexBuffer:function getTempIndexBuffer(sizeBytes){var idx=GL.log2ceilLookup(sizeBytes);var ibo=GL.currentContext.tempIndexBuffers[idx];if(ibo){return ibo}var prevIBO=GLctx.getParameter(34965);GL.currentContext.tempIndexBuffers[idx]=GLctx.createBuffer();GLctx.bindBuffer(34963,GL.currentContext.tempIndexBuffers[idx]);GLctx.bufferData(34963,1<<idx,35048);GLctx.bindBuffer(34963,prevIBO);return GL.currentContext.tempIndexBuffers[idx]},newRenderingFrameStarted:function newRenderingFrameStarted(){if(!GL.currentContext){return}var vb=GL.currentContext.tempVertexBuffers1;GL.currentContext.tempVertexBuffers1=GL.currentContext.tempVertexBuffers2;GL.currentContext.tempVertexBuffers2=vb;vb=GL.currentContext.tempVertexBufferCounters1;GL.currentContext.tempVertexBufferCounters1=GL.currentContext.tempVertexBufferCounters2;GL.currentContext.tempVertexBufferCounters2=vb;var largestIndex=GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);for(var i=0;i<=largestIndex;++i){GL.currentContext.tempVertexBufferCounters1[i]=0}},getSource:function(shader,count,string,length){var source="";for(var i=0;i<count;++i){var len=length?HEAP32[length+i*4>>2]:-1;source+=UTF8ToString(HEAP32[string+i*4>>2],len<0?undefined:len)}return source},calcBufLength:function calcBufLength(size,type,stride,count){if(stride>0){return count*stride}var typeSize=GL.byteSizeByType[type-GL.byteSizeByTypeRoot];return size*typeSize*count},usedTempBuffers:[],preDrawHandleClientVertexAttribBindings:function preDrawHandleClientVertexAttribBindings(count){GL.resetBufferBinding=false;for(var i=0;i<GL.currentContext.maxVertexAttribs;++i){var cb=GL.currentContext.clientBuffers[i];if(!cb.clientside||!cb.enabled)continue;GL.resetBufferBinding=true;var size=GL.calcBufLength(cb.size,cb.type,cb.stride,count);var buf=GL.getTempVertexBuffer(size);GLctx.bindBuffer(34962,buf);GLctx.bufferSubData(34962,0,HEAPU8.subarray(cb.ptr,cb.ptr+size));cb.vertexAttribPointerAdaptor.call(GLctx,i,cb.size,cb.type,cb.normalized,cb.stride,0)}},postDrawHandleClientVertexAttribBindings:function postDrawHandleClientVertexAttribBindings(){if(GL.resetBufferBinding){GLctx.bindBuffer(34962,GL.buffers[GLctx.currentArrayBufferBinding])}},createContext:function(canvas,webGLContextAttributes){if(!canvas.getContextSafariWebGL2Fixed){canvas.getContextSafariWebGL2Fixed=canvas.getContext;function fixedGetContext(ver,attrs){var gl=canvas.getContextSafariWebGL2Fixed(ver,attrs);return ver=="webgl"==gl instanceof WebGLRenderingContext?gl:null}canvas.getContext=fixedGetContext}var ctx=webGLContextAttributes.majorVersion>1?canvas.getContext("webgl2",webGLContextAttributes):canvas.getContext("webgl",webGLContextAttributes);if(!ctx)return 0;var handle=GL.registerContext(ctx,webGLContextAttributes);return handle},registerContext:function(ctx,webGLContextAttributes){var handle=GL.getNewId(GL.contexts);var context={handle:handle,attributes:webGLContextAttributes,version:webGLContextAttributes.majorVersion,GLctx:ctx};if(ctx.canvas)ctx.canvas.GLctxObject=context;GL.contexts[handle]=context;if(typeof webGLContextAttributes.enableExtensionsByDefault=="undefined"||webGLContextAttributes.enableExtensionsByDefault){GL.initExtensions(context)}context.maxVertexAttribs=context.GLctx.getParameter(34921);context.clientBuffers=[];for(var i=0;i<context.maxVertexAttribs;i++){context.clientBuffers[i]={enabled:false,clientside:false,size:0,type:0,normalized:0,stride:0,ptr:0,vertexAttribPointerAdaptor:null}}GL.generateTempBuffers(false,context);return handle},makeContextCurrent:function(contextHandle){GL.currentContext=GL.contexts[contextHandle];Module.ctx=GLctx=GL.currentContext&&GL.currentContext.GLctx;return!(contextHandle&&!GLctx)},getContext:function(contextHandle){return GL.contexts[contextHandle]},deleteContext:function(contextHandle){if(GL.currentContext===GL.contexts[contextHandle])GL.currentContext=null;if(typeof JSEvents=="object")JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);if(GL.contexts[contextHandle]&&GL.contexts[contextHandle].GLctx.canvas)GL.contexts[contextHandle].GLctx.canvas.GLctxObject=undefined;GL.contexts[contextHandle]=null},initExtensions:function(context){if(!context)context=GL.currentContext;if(context.initExtensionsDone)return;context.initExtensionsDone=true;var GLctx=context.GLctx;__webgl_enable_ANGLE_instanced_arrays(GLctx);__webgl_enable_OES_vertex_array_object(GLctx);__webgl_enable_WEBGL_draw_buffers(GLctx);__webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);__webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);if(context.version>=2){GLctx.disjointTimerQueryExt=GLctx.getExtension("EXT_disjoint_timer_query_webgl2")}if(context.version<2||!GLctx.disjointTimerQueryExt){GLctx.disjointTimerQueryExt=GLctx.getExtension("EXT_disjoint_timer_query")}__webgl_enable_WEBGL_multi_draw(GLctx);var exts=GLctx.getSupportedExtensions()||[];exts.forEach(function(ext){if(!ext.includes("lose_context")&&!ext.includes("debug")){GLctx.getExtension(ext)}})}};var __emscripten_webgl_power_preferences=["default","low-power","high-performance"];function _emscripten_webgl_do_create_context(target,attributes){var a=attributes>>2;var powerPreference=HEAP32[a+(24>>2)];var contextAttributes={"alpha":!!HEAP32[a+(0>>2)],"depth":!!HEAP32[a+(4>>2)],"stencil":!!HEAP32[a+(8>>2)],"antialias":!!HEAP32[a+(12>>2)],"premultipliedAlpha":!!HEAP32[a+(16>>2)],"preserveDrawingBuffer":!!HEAP32[a+(20>>2)],"powerPreference":__emscripten_webgl_power_preferences[powerPreference],"failIfMajorPerformanceCaveat":!!HEAP32[a+(28>>2)],majorVersion:HEAP32[a+(32>>2)],minorVersion:HEAP32[a+(36>>2)],enableExtensionsByDefault:HEAP32[a+(40>>2)],explicitSwapControl:HEAP32[a+(44>>2)],proxyContextToMainThread:HEAP32[a+(48>>2)],renderViaOffscreenBackBuffer:HEAP32[a+(52>>2)]};var canvas=findCanvasEventTarget(target);if(!canvas){return 0}if(contextAttributes.explicitSwapControl){return 0}var contextHandle=GL.createContext(canvas,contextAttributes);return contextHandle}function _emscripten_webgl_create_context(a0,a1){return _emscripten_webgl_do_create_context(a0,a1)}function _emscripten_webgl_destroy_context(contextHandle){if(GL.currentContext==contextHandle)GL.currentContext=0;GL.deleteContext(contextHandle)}function _emscripten_webgl_enable_extension(contextHandle,extension){var context=GL.getContext(contextHandle);var extString=UTF8ToString(extension);if(extString.startsWith("GL_"))extString=extString.substr(3);if(extString=="ANGLE_instanced_arrays")__webgl_enable_ANGLE_instanced_arrays(GLctx);if(extString=="OES_vertex_array_object")__webgl_enable_OES_vertex_array_object(GLctx);if(extString=="WEBGL_draw_buffers")__webgl_enable_WEBGL_draw_buffers(GLctx);if(extString=="WEBGL_draw_instanced_base_vertex_base_instance")__webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);if(extString=="WEBGL_multi_draw_instanced_base_vertex_base_instance")__webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);if(extString=="WEBGL_multi_draw")__webgl_enable_WEBGL_multi_draw(GLctx);var ext=context.GLctx.getExtension(extString);return!!ext}function _emscripten_webgl_do_get_current_context(){return GL.currentContext?GL.currentContext.handle:0}function _emscripten_webgl_get_current_context(){return _emscripten_webgl_do_get_current_context()}function _emscripten_webgl_init_context_attributes(attributes){var a=attributes>>2;for(var i=0;i<56>>2;++i){HEAP32[a+i]=0}HEAP32[a+(0>>2)]=HEAP32[a+(4>>2)]=HEAP32[a+(12>>2)]=HEAP32[a+(16>>2)]=HEAP32[a+(32>>2)]=HEAP32[a+(40>>2)]=1}function _emscripten_webgl_make_context_current(contextHandle){var success=GL.makeContextCurrent(contextHandle);return success?0:-5}function _endSession(){gameanalytics.GameAnalytics.endSession()}var ENV={};function getExecutableName(){return thisProgram||"./this.program"}function getEnvStrings(){if(!getEnvStrings.strings){var lang=(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8";var env={"USER":"web_user","LOGNAME":"web_user","PATH":"/","PWD":"/","HOME":"/home/web_user","LANG":lang,"_":getExecutableName()};for(var x in ENV){if(ENV[x]===undefined)delete env[x];else env[x]=ENV[x]}var strings=[];for(var x in env){strings.push(x+"="+env[x])}getEnvStrings.strings=strings}return getEnvStrings.strings}function _environ_get(__environ,environ_buf){var bufSize=0;getEnvStrings().forEach(function(string,i){var ptr=environ_buf+bufSize;HEAP32[__environ+i*4>>2]=ptr;writeAsciiToMemory(string,ptr);bufSize+=string.length+1});return 0}function _environ_sizes_get(penviron_count,penviron_buf_size){var strings=getEnvStrings();HEAP32[penviron_count>>2]=strings.length;var bufSize=0;strings.forEach(function(string){bufSize+=string.length+1});HEAP32[penviron_buf_size>>2]=bufSize;return 0}function _fd_close(fd){try{var stream=SYSCALLS.getStreamFromFD(fd);FS.close(stream);return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _fd_fdstat_get(fd,pbuf){try{var stream=SYSCALLS.getStreamFromFD(fd);var type=stream.tty?2:FS.isDir(stream.mode)?3:FS.isLink(stream.mode)?7:4;HEAP8[pbuf>>0]=type;return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _fd_read(fd,iov,iovcnt,pnum){try{var stream=SYSCALLS.getStreamFromFD(fd);var num=SYSCALLS.doReadv(stream,iov,iovcnt);HEAP32[pnum>>2]=num;return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _fd_seek(fd,offset_low,offset_high,whence,newOffset){try{var stream=SYSCALLS.getStreamFromFD(fd);var HIGH_OFFSET=4294967296;var offset=offset_high*HIGH_OFFSET+(offset_low>>>0);var DOUBLE_LIMIT=9007199254740992;if(offset<=-DOUBLE_LIMIT||offset>=DOUBLE_LIMIT){return-61}FS.llseek(stream,offset,whence);tempI64=[stream.position>>>0,(tempDouble=stream.position,+Math.abs(tempDouble)>=1?tempDouble>0?(Math.min(+Math.floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[newOffset>>2]=tempI64[0],HEAP32[newOffset+4>>2]=tempI64[1];if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _fd_write(fd,iov,iovcnt,pnum){try{var stream=SYSCALLS.getStreamFromFD(fd);var num=SYSCALLS.doWritev(stream,iov,iovcnt);HEAP32[pnum>>2]=num;return 0}catch(e){if(typeof FS=="undefined"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _getABTestingId(){var returnStr=gameanalytics.GameAnalytics.getABTestingId();var buffer=_malloc(lengthBytesUTF8(returnStr)+1);writeStringToMemory(returnStr,buffer);return buffer}function _getABTestingVariantId(){var returnStr=gameanalytics.GameAnalytics.getABTestingVariantId();var buffer=_malloc(lengthBytesUTF8(returnStr)+1);writeStringToMemory(returnStr,buffer);return buffer}function _getRemoteConfigsContentAsString(){var returnStr=gameanalytics.GameAnalytics.getRemoteConfigsContentAsString();var buffer=_malloc(lengthBytesUTF8(returnStr)+1);writeStringToMemory(returnStr,buffer);return buffer}function _getRemoteConfigsValueAsString(key,defaultValue){var returnStr=gameanalytics.GameAnalytics.getRemoteConfigsValueAsString(Pointer_stringify(key),Pointer_stringify(defaultValue));var buffer=_malloc(lengthBytesUTF8(returnStr)+1);writeStringToMemory(returnStr,buffer);return buffer}function _getTempRet0(){return getTempRet0()}function _getaddrinfo(node,service,hint,out){var addr=0;var port=0;var flags=0;var family=0;var type=0;var proto=0;var ai;function allocaddrinfo(family,type,proto,canon,addr,port){var sa,salen,ai;var errno;salen=family===10?28:16;addr=family===10?inetNtop6(addr):inetNtop4(addr);sa=_malloc(salen);errno=writeSockaddr(sa,family,addr,port);assert(!errno);ai=_malloc(32);HEAP32[ai+4>>2]=family;HEAP32[ai+8>>2]=type;HEAP32[ai+12>>2]=proto;HEAP32[ai+24>>2]=canon;HEAP32[ai+20>>2]=sa;if(family===10){HEAP32[ai+16>>2]=28}else{HEAP32[ai+16>>2]=16}HEAP32[ai+28>>2]=0;return ai}if(hint){flags=HEAP32[hint>>2];family=HEAP32[hint+4>>2];type=HEAP32[hint+8>>2];proto=HEAP32[hint+12>>2]}if(type&&!proto){proto=type===2?17:6}if(!type&&proto){type=proto===17?2:1}if(proto===0){proto=6}if(type===0){type=1}if(!node&&!service){return-2}if(flags&~(1|2|4|1024|8|16|32)){return-1}if(hint!==0&&HEAP32[hint>>2]&2&&!node){return-1}if(flags&32){return-2}if(type!==0&&type!==1&&type!==2){return-7}if(family!==0&&family!==2&&family!==10){return-6}if(service){service=UTF8ToString(service);port=parseInt(service,10);if(isNaN(port)){if(flags&1024){return-2}return-8}}if(!node){if(family===0){family=2}if((flags&1)===0){if(family===2){addr=_htonl(2130706433)}else{addr=[0,0,0,1]}}ai=allocaddrinfo(family,type,proto,null,addr,port);HEAP32[out>>2]=ai;return 0}node=UTF8ToString(node);addr=inetPton4(node);if(addr!==null){if(family===0||family===2){family=2}else if(family===10&&flags&8){addr=[0,0,_htonl(65535),addr];family=10}else{return-2}}else{addr=inetPton6(node);if(addr!==null){if(family===0||family===10){family=10}else{return-2}}}if(addr!=null){ai=allocaddrinfo(family,type,proto,node,addr,port);HEAP32[out>>2]=ai;return 0}if(flags&4){return-2}node=DNS.lookup_name(node);addr=inetPton4(node);if(family===0){family=2}else if(family===10){addr=[0,0,_htonl(65535),addr]}ai=allocaddrinfo(family,type,proto,null,addr,port);HEAP32[out>>2]=ai;return 0}function getHostByName(name){var ret=_malloc(20);var nameBuf=_malloc(name.length+1);stringToUTF8(name,nameBuf,name.length+1);HEAP32[ret>>2]=nameBuf;var aliasesBuf=_malloc(4);HEAP32[aliasesBuf>>2]=0;HEAP32[ret+4>>2]=aliasesBuf;var afinet=2;HEAP32[ret+8>>2]=afinet;HEAP32[ret+12>>2]=4;var addrListBuf=_malloc(12);HEAP32[addrListBuf>>2]=addrListBuf+8;HEAP32[addrListBuf+4>>2]=0;HEAP32[addrListBuf+8>>2]=inetPton4(DNS.lookup_name(name));HEAP32[ret+16>>2]=addrListBuf;return ret}function _gethostbyaddr(addr,addrlen,type){if(type!==2){setErrNo(5);return null}addr=HEAP32[addr>>2];var host=inetNtop4(addr);var lookup=DNS.lookup_addr(host);if(lookup){host=lookup}return getHostByName(host)}function _gethostbyname(name){return getHostByName(UTF8ToString(name))}function _getnameinfo(sa,salen,node,nodelen,serv,servlen,flags){var info=readSockaddr(sa,salen);if(info.errno){return-6}var port=info.port;var addr=info.addr;var overflowed=false;if(node&&nodelen){var lookup;if(flags&1||!(lookup=DNS.lookup_addr(addr))){if(flags&8){return-2}}else{addr=lookup}var numBytesWrittenExclNull=stringToUTF8(addr,node,nodelen);if(numBytesWrittenExclNull+1>=nodelen){overflowed=true}}if(serv&&servlen){port=""+port;var numBytesWrittenExclNull=stringToUTF8(port,serv,servlen);if(numBytesWrittenExclNull+1>=servlen){overflowed=true}}if(overflowed){return-12}return 0}function _glActiveTexture(x0){GLctx["activeTexture"](x0)}function _glAttachShader(program,shader){program=GL.programs[program];shader=GL.shaders[shader];program[shader.shaderType]=shader;GLctx.attachShader(program,shader)}function _glBeginQuery(target,id){GLctx["beginQuery"](target,GL.queries[id])}function _glBindAttribLocation(program,index,name){GLctx.bindAttribLocation(GL.programs[program],index,UTF8ToString(name))}function _glBindBuffer(target,buffer){if(target==34962){GLctx.currentArrayBufferBinding=buffer}else if(target==34963){GLctx.currentElementArrayBufferBinding=buffer}if(target==35051){GLctx.currentPixelPackBufferBinding=buffer}else if(target==35052){GLctx.currentPixelUnpackBufferBinding=buffer}GLctx.bindBuffer(target,GL.buffers[buffer])}function _glBindBufferBase(target,index,buffer){GLctx["bindBufferBase"](target,index,GL.buffers[buffer])}function _glBindBufferRange(target,index,buffer,offset,ptrsize){GLctx["bindBufferRange"](target,index,GL.buffers[buffer],offset,ptrsize)}function _glBindFramebuffer(target,framebuffer){GLctx.bindFramebuffer(target,GL.framebuffers[framebuffer])}function _glBindRenderbuffer(target,renderbuffer){GLctx.bindRenderbuffer(target,GL.renderbuffers[renderbuffer])}function _glBindSampler(unit,sampler){GLctx["bindSampler"](unit,GL.samplers[sampler])}function _glBindTexture(target,texture){GLctx.bindTexture(target,GL.textures[texture])}function _glBindVertexArray(vao){GLctx["bindVertexArray"](GL.vaos[vao]);var ibo=GLctx.getParameter(34965);GLctx.currentElementArrayBufferBinding=ibo?ibo.name|0:0}function _glBlendEquation(x0){GLctx["blendEquation"](x0)}function _glBlendEquationSeparate(x0,x1){GLctx["blendEquationSeparate"](x0,x1)}function _glBlendFuncSeparate(x0,x1,x2,x3){GLctx["blendFuncSeparate"](x0,x1,x2,x3)}function _glBlitFramebuffer(x0,x1,x2,x3,x4,x5,x6,x7,x8,x9){GLctx["blitFramebuffer"](x0,x1,x2,x3,x4,x5,x6,x7,x8,x9)}function _glBufferData(target,size,data,usage){if(GL.currentContext.version>=2){if(data){GLctx.bufferData(target,HEAPU8,usage,data,size)}else{GLctx.bufferData(target,size,usage)}}else{GLctx.bufferData(target,data?HEAPU8.subarray(data,data+size):size,usage)}}function _glBufferSubData(target,offset,size,data){if(GL.currentContext.version>=2){GLctx.bufferSubData(target,offset,HEAPU8,data,size);return}GLctx.bufferSubData(target,offset,HEAPU8.subarray(data,data+size))}function _glCheckFramebufferStatus(x0){return GLctx["checkFramebufferStatus"](x0)}function _glClear(x0){GLctx["clear"](x0)}function _glClearBufferfi(x0,x1,x2,x3){GLctx["clearBufferfi"](x0,x1,x2,x3)}function _glClearBufferfv(buffer,drawbuffer,value){GLctx["clearBufferfv"](buffer,drawbuffer,HEAPF32,value>>2)}function _glClearBufferuiv(buffer,drawbuffer,value){GLctx["clearBufferuiv"](buffer,drawbuffer,HEAPU32,value>>2)}function _glClearColor(x0,x1,x2,x3){GLctx["clearColor"](x0,x1,x2,x3)}function _glClearDepthf(x0){GLctx["clearDepth"](x0)}function _glClearStencil(x0){GLctx["clearStencil"](x0)}function _glClientWaitSync(sync,flags,timeoutLo,timeoutHi){return GLctx.clientWaitSync(GL.syncs[sync],flags,convertI32PairToI53(timeoutLo,timeoutHi))}function _glColorMask(red,green,blue,alpha){GLctx.colorMask(!!red,!!green,!!blue,!!alpha)}function _glCompileShader(shader){GLctx.compileShader(GL.shaders[shader])}function _glCompressedTexImage2D(target,level,internalFormat,width,height,border,imageSize,data){if(GL.currentContext.version>=2){if(GLctx.currentPixelUnpackBufferBinding){GLctx["compressedTexImage2D"](target,level,internalFormat,width,height,border,imageSize,data)}else{GLctx["compressedTexImage2D"](target,level,internalFormat,width,height,border,HEAPU8,data,imageSize)}return}GLctx["compressedTexImage2D"](target,level,internalFormat,width,height,border,data?HEAPU8.subarray(data,data+imageSize):null)}function _glCompressedTexImage3D(target,level,internalFormat,width,height,depth,border,imageSize,data){if(GLctx.currentPixelUnpackBufferBinding){GLctx["compressedTexImage3D"](target,level,internalFormat,width,height,depth,border,imageSize,data)}else{GLctx["compressedTexImage3D"](target,level,internalFormat,width,height,depth,border,HEAPU8,data,imageSize)}}function _glCompressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,imageSize,data){if(GL.currentContext.version>=2){if(GLctx.currentPixelUnpackBufferBinding){GLctx["compressedTexSubImage2D"](target,level,xoffset,yoffset,width,height,format,imageSize,data)}else{GLctx["compressedTexSubImage2D"](target,level,xoffset,yoffset,width,height,format,HEAPU8,data,imageSize)}return}GLctx["compressedTexSubImage2D"](target,level,xoffset,yoffset,width,height,format,data?HEAPU8.subarray(data,data+imageSize):null)}function _glCompressedTexSubImage3D(target,level,xoffset,yoffset,zoffset,width,height,depth,format,imageSize,data){if(GLctx.currentPixelUnpackBufferBinding){GLctx["compressedTexSubImage3D"](target,level,xoffset,yoffset,zoffset,width,height,depth,format,imageSize,data)}else{GLctx["compressedTexSubImage3D"](target,level,xoffset,yoffset,zoffset,width,height,depth,format,HEAPU8,data,imageSize)}}function _glCopyBufferSubData(x0,x1,x2,x3,x4){GLctx["copyBufferSubData"](x0,x1,x2,x3,x4)}function _glCopyTexImage2D(x0,x1,x2,x3,x4,x5,x6,x7){GLctx["copyTexImage2D"](x0,x1,x2,x3,x4,x5,x6,x7)}function _glCopyTexSubImage2D(x0,x1,x2,x3,x4,x5,x6,x7){GLctx["copyTexSubImage2D"](x0,x1,x2,x3,x4,x5,x6,x7)}function _glCreateProgram(){var id=GL.getNewId(GL.programs);var program=GLctx.createProgram();program.name=id;program.maxUniformLength=program.maxAttributeLength=program.maxUniformBlockNameLength=0;program.uniformIdCounter=1;GL.programs[id]=program;return id}function _glCreateShader(shaderType){var id=GL.getNewId(GL.shaders);GL.shaders[id]=GLctx.createShader(shaderType);GL.shaders[id].shaderType=shaderType&1?"vs":"fs";return id}function _glCullFace(x0){GLctx["cullFace"](x0)}function _glDeleteBuffers(n,buffers){for(var i=0;i<n;i++){var id=HEAP32[buffers+i*4>>2];var buffer=GL.buffers[id];if(!buffer)continue;GLctx.deleteBuffer(buffer);buffer.name=0;GL.buffers[id]=null;if(id==GLctx.currentArrayBufferBinding)GLctx.currentArrayBufferBinding=0;if(id==GLctx.currentElementArrayBufferBinding)GLctx.currentElementArrayBufferBinding=0;if(id==GLctx.currentPixelPackBufferBinding)GLctx.currentPixelPackBufferBinding=0;if(id==GLctx.currentPixelUnpackBufferBinding)GLctx.currentPixelUnpackBufferBinding=0}}function _glDeleteFramebuffers(n,framebuffers){for(var i=0;i<n;++i){var id=HEAP32[framebuffers+i*4>>2];var framebuffer=GL.framebuffers[id];if(!framebuffer)continue;GLctx.deleteFramebuffer(framebuffer);framebuffer.name=0;GL.framebuffers[id]=null}}function _glDeleteProgram(id){if(!id)return;var program=GL.programs[id];if(!program){GL.recordError(1281);return}GLctx.deleteProgram(program);program.name=0;GL.programs[id]=null}function _glDeleteQueries(n,ids){for(var i=0;i<n;i++){var id=HEAP32[ids+i*4>>2];var query=GL.queries[id];if(!query)continue;GLctx["deleteQuery"](query);GL.queries[id]=null}}function _glDeleteRenderbuffers(n,renderbuffers){for(var i=0;i<n;i++){var id=HEAP32[renderbuffers+i*4>>2];var renderbuffer=GL.renderbuffers[id];if(!renderbuffer)continue;GLctx.deleteRenderbuffer(renderbuffer);renderbuffer.name=0;GL.renderbuffers[id]=null}}function _glDeleteSamplers(n,samplers){for(var i=0;i<n;i++){var id=HEAP32[samplers+i*4>>2];var sampler=GL.samplers[id];if(!sampler)continue;GLctx["deleteSampler"](sampler);sampler.name=0;GL.samplers[id]=null}}function _glDeleteShader(id){if(!id)return;var shader=GL.shaders[id];if(!shader){GL.recordError(1281);return}GLctx.deleteShader(shader);GL.shaders[id]=null}function _glDeleteSync(id){if(!id)return;var sync=GL.syncs[id];if(!sync){GL.recordError(1281);return}GLctx.deleteSync(sync);sync.name=0;GL.syncs[id]=null}function _glDeleteTextures(n,textures){for(var i=0;i<n;i++){var id=HEAP32[textures+i*4>>2];var texture=GL.textures[id];if(!texture)continue;GLctx.deleteTexture(texture);texture.name=0;GL.textures[id]=null}}function _glDeleteVertexArrays(n,vaos){for(var i=0;i<n;i++){var id=HEAP32[vaos+i*4>>2];GLctx["deleteVertexArray"](GL.vaos[id]);GL.vaos[id]=null}}function _glDepthFunc(x0){GLctx["depthFunc"](x0)}function _glDepthMask(flag){GLctx.depthMask(!!flag)}function _glDetachShader(program,shader){GLctx.detachShader(GL.programs[program],GL.shaders[shader])}function _glDisable(x0){GLctx["disable"](x0)}function _glDisableVertexAttribArray(index){var cb=GL.currentContext.clientBuffers[index];cb.enabled=false;GLctx.disableVertexAttribArray(index)}function _glDrawArrays(mode,first,count){GL.preDrawHandleClientVertexAttribBindings(first+count);GLctx.drawArrays(mode,first,count);GL.postDrawHandleClientVertexAttribBindings()}function _glDrawArraysInstanced(mode,first,count,primcount){GLctx["drawArraysInstanced"](mode,first,count,primcount)}var tempFixedLengthArray=[];function _glDrawBuffers(n,bufs){var bufArray=tempFixedLengthArray[n];for(var i=0;i<n;i++){bufArray[i]=HEAP32[bufs+i*4>>2]}GLctx["drawBuffers"](bufArray)}function _glDrawElements(mode,count,type,indices){var buf;if(!GLctx.currentElementArrayBufferBinding){var size=GL.calcBufLength(1,type,0,count);buf=GL.getTempIndexBuffer(size);GLctx.bindBuffer(34963,buf);GLctx.bufferSubData(34963,0,HEAPU8.subarray(indices,indices+size));indices=0}GL.preDrawHandleClientVertexAttribBindings(count);GLctx.drawElements(mode,count,type,indices);GL.postDrawHandleClientVertexAttribBindings(count);if(!GLctx.currentElementArrayBufferBinding){GLctx.bindBuffer(34963,null)}}function _glDrawElementsInstanced(mode,count,type,indices,primcount){GLctx["drawElementsInstanced"](mode,count,type,indices,primcount)}function _glEnable(x0){GLctx["enable"](x0)}function _glEnableVertexAttribArray(index){var cb=GL.currentContext.clientBuffers[index];cb.enabled=true;GLctx.enableVertexAttribArray(index)}function _glEndQuery(x0){GLctx["endQuery"](x0)}function _glFenceSync(condition,flags){var sync=GLctx.fenceSync(condition,flags);if(sync){var id=GL.getNewId(GL.syncs);sync.name=id;GL.syncs[id]=sync;return id}else{return 0}}function _glFinish(){GLctx["finish"]()}function _glFlush(){GLctx["flush"]()}function emscriptenWebGLGetBufferBinding(target){switch(target){case 34962:target=34964;break;case 34963:target=34965;break;case 35051:target=35053;break;case 35052:target=35055;break;case 35982:target=35983;break;case 36662:target=36662;break;case 36663:target=36663;break;case 35345:target=35368;break}var buffer=GLctx.getParameter(target);if(buffer)return buffer.name|0;else return 0}function emscriptenWebGLValidateMapBufferTarget(target){switch(target){case 34962:case 34963:case 36662:case 36663:case 35051:case 35052:case 35882:case 35982:case 35345:return true;default:return false}}function _glFlushMappedBufferRange(target,offset,length){if(!emscriptenWebGLValidateMapBufferTarget(target)){GL.recordError(1280);err("GL_INVALID_ENUM in glFlushMappedBufferRange");return}var mapping=GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)];if(!mapping){GL.recordError(1282);err("buffer was never mapped in glFlushMappedBufferRange");return}if(!(mapping.access&16)){GL.recordError(1282);err("buffer was not mapped with GL_MAP_FLUSH_EXPLICIT_BIT in glFlushMappedBufferRange");return}if(offset<0||length<0||offset+length>mapping.length){GL.recordError(1281);err("invalid range in glFlushMappedBufferRange");return}GLctx.bufferSubData(target,mapping.offset,HEAPU8.subarray(mapping.mem+offset,mapping.mem+offset+length))}function _glFramebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer){GLctx.framebufferRenderbuffer(target,attachment,renderbuffertarget,GL.renderbuffers[renderbuffer])}function _glFramebufferTexture2D(target,attachment,textarget,texture,level){GLctx.framebufferTexture2D(target,attachment,textarget,GL.textures[texture],level)}function _glFramebufferTextureLayer(target,attachment,texture,level,layer){GLctx.framebufferTextureLayer(target,attachment,GL.textures[texture],level,layer)}function _glFrontFace(x0){GLctx["frontFace"](x0)}function __glGenObject(n,buffers,createFunction,objectTable){for(var i=0;i<n;i++){var buffer=GLctx[createFunction]();var id=buffer&&GL.getNewId(objectTable);if(buffer){buffer.name=id;objectTable[id]=buffer}else{GL.recordError(1282)}HEAP32[buffers+i*4>>2]=id}}function _glGenBuffers(n,buffers){__glGenObject(n,buffers,"createBuffer",GL.buffers)}function _glGenFramebuffers(n,ids){__glGenObject(n,ids,"createFramebuffer",GL.framebuffers)}function _glGenQueries(n,ids){__glGenObject(n,ids,"createQuery",GL.queries)}function _glGenRenderbuffers(n,renderbuffers){__glGenObject(n,renderbuffers,"createRenderbuffer",GL.renderbuffers)}function _glGenSamplers(n,samplers){__glGenObject(n,samplers,"createSampler",GL.samplers)}function _glGenTextures(n,textures){__glGenObject(n,textures,"createTexture",GL.textures)}function _glGenVertexArrays(n,arrays){__glGenObject(n,arrays,"createVertexArray",GL.vaos)}function _glGenerateMipmap(x0){GLctx["generateMipmap"](x0)}function __glGetActiveAttribOrUniform(funcName,program,index,bufSize,length,size,type,name){program=GL.programs[program];var info=GLctx[funcName](program,index);if(info){var numBytesWrittenExclNull=name&&stringToUTF8(info.name,name,bufSize);if(length)HEAP32[length>>2]=numBytesWrittenExclNull;if(size)HEAP32[size>>2]=info.size;if(type)HEAP32[type>>2]=info.type}}function _glGetActiveAttrib(program,index,bufSize,length,size,type,name){__glGetActiveAttribOrUniform("getActiveAttrib",program,index,bufSize,length,size,type,name)}function _glGetActiveUniform(program,index,bufSize,length,size,type,name){__glGetActiveAttribOrUniform("getActiveUniform",program,index,bufSize,length,size,type,name)}function _glGetActiveUniformBlockName(program,uniformBlockIndex,bufSize,length,uniformBlockName){program=GL.programs[program];var result=GLctx["getActiveUniformBlockName"](program,uniformBlockIndex);if(!result)return;if(uniformBlockName&&bufSize>0){var numBytesWrittenExclNull=stringToUTF8(result,uniformBlockName,bufSize);if(length)HEAP32[length>>2]=numBytesWrittenExclNull}else{if(length)HEAP32[length>>2]=0}}function _glGetActiveUniformBlockiv(program,uniformBlockIndex,pname,params){if(!params){GL.recordError(1281);return}program=GL.programs[program];if(pname==35393){var name=GLctx["getActiveUniformBlockName"](program,uniformBlockIndex);HEAP32[params>>2]=name.length+1;return}var result=GLctx["getActiveUniformBlockParameter"](program,uniformBlockIndex,pname);if(result===null)return;if(pname==35395){for(var i=0;i<result.length;i++){HEAP32[params+i*4>>2]=result[i]}}else{HEAP32[params>>2]=result}}function _glGetActiveUniformsiv(program,uniformCount,uniformIndices,pname,params){if(!params){GL.recordError(1281);return}if(uniformCount>0&&uniformIndices==0){GL.recordError(1281);return}program=GL.programs[program];var ids=[];for(var i=0;i<uniformCount;i++){ids.push(HEAP32[uniformIndices+i*4>>2])}var result=GLctx["getActiveUniforms"](program,ids,pname);if(!result)return;var len=result.length;for(var i=0;i<len;i++){HEAP32[params+i*4>>2]=result[i]}}function _glGetAttribLocation(program,name){return GLctx.getAttribLocation(GL.programs[program],UTF8ToString(name))}function _glGetBufferSubData(target,offset,size,data){if(!data){GL.recordError(1281);return}GLctx["getBufferSubData"](target,offset,HEAPU8,data,size)}function _glGetError(){var error=GLctx.getError()||GL.lastError;GL.lastError=0;return error}function _glGetFramebufferAttachmentParameteriv(target,attachment,pname,params){var result=GLctx.getFramebufferAttachmentParameter(target,attachment,pname);if(result instanceof WebGLRenderbuffer||result instanceof WebGLTexture){result=result.name|0}HEAP32[params>>2]=result}function writeI53ToI64(ptr,num){HEAPU32[ptr>>2]=num;HEAPU32[ptr+4>>2]=(num-HEAPU32[ptr>>2])/4294967296}function emscriptenWebGLGetIndexed(target,index,data,type){if(!data){GL.recordError(1281);return}var result=GLctx["getIndexedParameter"](target,index);var ret;switch(typeof result){case"boolean":ret=result?1:0;break;case"number":ret=result;break;case"object":if(result===null){switch(target){case 35983:case 35368:ret=0;break;default:{GL.recordError(1280);return}}}else if(result instanceof WebGLBuffer){ret=result.name|0}else{GL.recordError(1280);return}break;default:GL.recordError(1280);return}switch(type){case 1:writeI53ToI64(data,ret);break;case 0:HEAP32[data>>2]=ret;break;case 2:HEAPF32[data>>2]=ret;break;case 4:HEAP8[data>>0]=ret?1:0;break;default:throw"internal emscriptenWebGLGetIndexed() error, bad type: "+type}}function _glGetIntegeri_v(target,index,data){emscriptenWebGLGetIndexed(target,index,data,0)}function emscriptenWebGLGet(name_,p,type){if(!p){GL.recordError(1281);return}var ret=undefined;switch(name_){case 36346:ret=1;break;case 36344:if(type!=0&&type!=1){GL.recordError(1280)}return;case 34814:case 36345:ret=0;break;case 34466:var formats=GLctx.getParameter(34467);ret=formats?formats.length:0;break;case 33390:ret=1048576;break;case 33309:if(GL.currentContext.version<2){GL.recordError(1282);return}var exts=GLctx.getSupportedExtensions()||[];ret=2*exts.length;break;case 33307:case 33308:if(GL.currentContext.version<2){GL.recordError(1280);return}ret=name_==33307?3:0;break}if(ret===undefined){var result=GLctx.getParameter(name_);switch(typeof result){case"number":ret=result;break;case"boolean":ret=result?1:0;break;case"string":GL.recordError(1280);return;case"object":if(result===null){switch(name_){case 34964:case 35725:case 34965:case 36006:case 36007:case 32873:case 34229:case 36662:case 36663:case 35053:case 35055:case 36010:case 35097:case 35869:case 32874:case 36389:case 35983:case 35368:case 34068:{ret=0;break}default:{GL.recordError(1280);return}}}else if(result instanceof Float32Array||result instanceof Uint32Array||result instanceof Int32Array||result instanceof Array){for(var i=0;i<result.length;++i){switch(type){case 0:HEAP32[p+i*4>>2]=result[i];break;case 2:HEAPF32[p+i*4>>2]=result[i];break;case 4:HEAP8[p+i>>0]=result[i]?1:0;break}}return}else{try{ret=result.name|0}catch(e){GL.recordError(1280);err("GL_INVALID_ENUM in glGet"+type+"v: Unknown object returned from WebGL getParameter("+name_+")! (error: "+e+")");return}}break;default:GL.recordError(1280);err("GL_INVALID_ENUM in glGet"+type+"v: Native code calling glGet"+type+"v("+name_+") and it returns "+result+" of type "+typeof result+"!");return}}switch(type){case 1:writeI53ToI64(p,ret);break;case 0:HEAP32[p>>2]=ret;break;case 2:HEAPF32[p>>2]=ret;break;case 4:HEAP8[p>>0]=ret?1:0;break}}function _glGetIntegerv(name_,p){emscriptenWebGLGet(name_,p,0)}function _glGetInternalformativ(target,internalformat,pname,bufSize,params){if(bufSize<0){GL.recordError(1281);return}if(!params){GL.recordError(1281);return}var ret=GLctx["getInternalformatParameter"](target,internalformat,pname);if(ret===null)return;for(var i=0;i<ret.length&&i<bufSize;++i){HEAP32[params+i*4>>2]=ret[i]}}function _glGetProgramBinary(program,bufSize,length,binaryFormat,binary){GL.recordError(1282)}function _glGetProgramInfoLog(program,maxLength,length,infoLog){var log=GLctx.getProgramInfoLog(GL.programs[program]);if(log===null)log="(unknown error)";var numBytesWrittenExclNull=maxLength>0&&infoLog?stringToUTF8(log,infoLog,maxLength):0;if(length)HEAP32[length>>2]=numBytesWrittenExclNull}function _glGetProgramiv(program,pname,p){if(!p){GL.recordError(1281);return}if(program>=GL.counter){GL.recordError(1281);return}program=GL.programs[program];if(pname==35716){var log=GLctx.getProgramInfoLog(program);if(log===null)log="(unknown error)";HEAP32[p>>2]=log.length+1}else if(pname==35719){if(!program.maxUniformLength){for(var i=0;i<GLctx.getProgramParameter(program,35718);++i){program.maxUniformLength=Math.max(program.maxUniformLength,GLctx.getActiveUniform(program,i).name.length+1)}}HEAP32[p>>2]=program.maxUniformLength}else if(pname==35722){if(!program.maxAttributeLength){for(var i=0;i<GLctx.getProgramParameter(program,35721);++i){program.maxAttributeLength=Math.max(program.maxAttributeLength,GLctx.getActiveAttrib(program,i).name.length+1)}}HEAP32[p>>2]=program.maxAttributeLength}else if(pname==35381){if(!program.maxUniformBlockNameLength){for(var i=0;i<GLctx.getProgramParameter(program,35382);++i){program.maxUniformBlockNameLength=Math.max(program.maxUniformBlockNameLength,GLctx.getActiveUniformBlockName(program,i).length+1)}}HEAP32[p>>2]=program.maxUniformBlockNameLength}else{HEAP32[p>>2]=GLctx.getProgramParameter(program,pname)}}function _glGetQueryObjectuiv(id,pname,params){if(!params){GL.recordError(1281);return}var query=GL.queries[id];var param=GLctx["getQueryParameter"](query,pname);var ret;if(typeof param=="boolean"){ret=param?1:0}else{ret=param}HEAP32[params>>2]=ret}function _glGetQueryiv(target,pname,params){if(!params){GL.recordError(1281);return}HEAP32[params>>2]=GLctx["getQuery"](target,pname)}function _glGetRenderbufferParameteriv(target,pname,params){if(!params){GL.recordError(1281);return}HEAP32[params>>2]=GLctx.getRenderbufferParameter(target,pname)}function _glGetShaderInfoLog(shader,maxLength,length,infoLog){var log=GLctx.getShaderInfoLog(GL.shaders[shader]);if(log===null)log="(unknown error)";var numBytesWrittenExclNull=maxLength>0&&infoLog?stringToUTF8(log,infoLog,maxLength):0;if(length)HEAP32[length>>2]=numBytesWrittenExclNull}function _glGetShaderPrecisionFormat(shaderType,precisionType,range,precision){var result=GLctx.getShaderPrecisionFormat(shaderType,precisionType);HEAP32[range>>2]=result.rangeMin;HEAP32[range+4>>2]=result.rangeMax;HEAP32[precision>>2]=result.precision}function _glGetShaderSource(shader,bufSize,length,source){var result=GLctx.getShaderSource(GL.shaders[shader]);if(!result)return;var numBytesWrittenExclNull=bufSize>0&&source?stringToUTF8(result,source,bufSize):0;if(length)HEAP32[length>>2]=numBytesWrittenExclNull}function _glGetShaderiv(shader,pname,p){if(!p){GL.recordError(1281);return}if(pname==35716){var log=GLctx.getShaderInfoLog(GL.shaders[shader]);if(log===null)log="(unknown error)";var logLength=log?log.length+1:0;HEAP32[p>>2]=logLength}else if(pname==35720){var source=GLctx.getShaderSource(GL.shaders[shader]);var sourceLength=source?source.length+1:0;HEAP32[p>>2]=sourceLength}else{HEAP32[p>>2]=GLctx.getShaderParameter(GL.shaders[shader],pname)}}function _glGetString(name_){var ret=GL.stringCache[name_];if(!ret){switch(name_){case 7939:var exts=GLctx.getSupportedExtensions()||[];exts=exts.concat(exts.map(function(e){return"GL_"+e}));ret=stringToNewUTF8(exts.join(" "));break;case 7936:case 7937:case 37445:case 37446:var s=GLctx.getParameter(name_);if(!s){GL.recordError(1280)}ret=s&&stringToNewUTF8(s);break;case 7938:var glVersion=GLctx.getParameter(7938);if(GL.currentContext.version>=2)glVersion="OpenGL ES 3.0 ("+glVersion+")";else{glVersion="OpenGL ES 2.0 ("+glVersion+")"}ret=stringToNewUTF8(glVersion);break;case 35724:var glslVersion=GLctx.getParameter(35724);var ver_re=/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;var ver_num=glslVersion.match(ver_re);if(ver_num!==null){if(ver_num[1].length==3)ver_num[1]=ver_num[1]+"0";glslVersion="OpenGL ES GLSL ES "+ver_num[1]+" ("+glslVersion+")"}ret=stringToNewUTF8(glslVersion);break;default:GL.recordError(1280)}GL.stringCache[name_]=ret}return ret}function _glGetStringi(name,index){if(GL.currentContext.version<2){GL.recordError(1282);return 0}var stringiCache=GL.stringiCache[name];if(stringiCache){if(index<0||index>=stringiCache.length){GL.recordError(1281);return 0}return stringiCache[index]}switch(name){case 7939:var exts=GLctx.getSupportedExtensions()||[];exts=exts.concat(exts.map(function(e){return"GL_"+e}));exts=exts.map(function(e){return stringToNewUTF8(e)});stringiCache=GL.stringiCache[name]=exts;if(index<0||index>=stringiCache.length){GL.recordError(1281);return 0}return stringiCache[index];default:GL.recordError(1280);return 0}}function _glGetTexParameteriv(target,pname,params){if(!params){GL.recordError(1281);return}HEAP32[params>>2]=GLctx.getTexParameter(target,pname)}function _glGetUniformBlockIndex(program,uniformBlockName){return GLctx["getUniformBlockIndex"](GL.programs[program],UTF8ToString(uniformBlockName))}function _glGetUniformIndices(program,uniformCount,uniformNames,uniformIndices){if(!uniformIndices){GL.recordError(1281);return}if(uniformCount>0&&(uniformNames==0||uniformIndices==0)){GL.recordError(1281);return}program=GL.programs[program];var names=[];for(var i=0;i<uniformCount;i++)names.push(UTF8ToString(HEAP32[uniformNames+i*4>>2]));var result=GLctx["getUniformIndices"](program,names);if(!result)return;var len=result.length;for(var i=0;i<len;i++){HEAP32[uniformIndices+i*4>>2]=result[i]}}function webglGetLeftBracePos(name){return name.slice(-1)=="]"&&name.lastIndexOf("[")}function webglPrepareUniformLocationsBeforeFirstUse(program){var uniformLocsById=program.uniformLocsById,uniformSizeAndIdsByName=program.uniformSizeAndIdsByName,i,j;if(!uniformLocsById){program.uniformLocsById=uniformLocsById={};program.uniformArrayNamesById={};for(i=0;i<GLctx.getProgramParameter(program,35718);++i){var u=GLctx.getActiveUniform(program,i);var nm=u.name;var sz=u.size;var lb=webglGetLeftBracePos(nm);var arrayName=lb>0?nm.slice(0,lb):nm;var id=uniformSizeAndIdsByName[arrayName]?uniformSizeAndIdsByName[arrayName][1]:program.uniformIdCounter;program.uniformIdCounter=Math.max(id+sz,program.uniformIdCounter);uniformSizeAndIdsByName[arrayName]=[sz,id];for(j=0;j<sz;++j){uniformLocsById[id]=j;program.uniformArrayNamesById[id++]=arrayName}}}}function _glGetUniformLocation(program,name){name=UTF8ToString(name);if(program=GL.programs[program]){webglPrepareUniformLocationsBeforeFirstUse(program);var uniformLocsById=program.uniformLocsById;var arrayIndex=0;var uniformBaseName=name;var leftBrace=webglGetLeftBracePos(name);if(leftBrace>0){arrayIndex=jstoi_q(name.slice(leftBrace+1))>>>0;uniformBaseName=name.slice(0,leftBrace)}var sizeAndId=program.uniformSizeAndIdsByName[uniformBaseName];if(sizeAndId&&arrayIndex<sizeAndId[0]){arrayIndex+=sizeAndId[1];if(uniformLocsById[arrayIndex]=uniformLocsById[arrayIndex]||GLctx.getUniformLocation(program,name)){return arrayIndex}}}else{GL.recordError(1281)}return-1}function webglGetUniformLocation(location){var p=GLctx.currentProgram;if(p){var webglLoc=p.uniformLocsById[location];if(typeof webglLoc=="number"){p.uniformLocsById[location]=webglLoc=GLctx.getUniformLocation(p,p.uniformArrayNamesById[location]+(webglLoc>0?"["+webglLoc+"]":""))}return webglLoc}else{GL.recordError(1282)}}function emscriptenWebGLGetUniform(program,location,params,type){if(!params){GL.recordError(1281);return}program=GL.programs[program];webglPrepareUniformLocationsBeforeFirstUse(program);var data=GLctx.getUniform(program,webglGetUniformLocation(location));if(typeof data=="number"||typeof data=="boolean"){switch(type){case 0:HEAP32[params>>2]=data;break;case 2:HEAPF32[params>>2]=data;break}}else{for(var i=0;i<data.length;i++){switch(type){case 0:HEAP32[params+i*4>>2]=data[i];break;case 2:HEAPF32[params+i*4>>2]=data[i];break}}}}function _glGetUniformiv(program,location,params){emscriptenWebGLGetUniform(program,location,params,0)}function emscriptenWebGLGetVertexAttrib(index,pname,params,type){if(!params){GL.recordError(1281);return}if(GL.currentContext.clientBuffers[index].enabled){err("glGetVertexAttrib*v on client-side array: not supported, bad data returned")}var data=GLctx.getVertexAttrib(index,pname);if(pname==34975){HEAP32[params>>2]=data&&data["name"]}else if(typeof data=="number"||typeof data=="boolean"){switch(type){case 0:HEAP32[params>>2]=data;break;case 2:HEAPF32[params>>2]=data;break;case 5:HEAP32[params>>2]=Math.fround(data);break}}else{for(var i=0;i<data.length;i++){switch(type){case 0:HEAP32[params+i*4>>2]=data[i];break;case 2:HEAPF32[params+i*4>>2]=data[i];break;case 5:HEAP32[params+i*4>>2]=Math.fround(data[i]);break}}}}function _glGetVertexAttribiv(index,pname,params){emscriptenWebGLGetVertexAttrib(index,pname,params,5)}function _glInvalidateFramebuffer(target,numAttachments,attachments){var list=tempFixedLengthArray[numAttachments];for(var i=0;i<numAttachments;i++){list[i]=HEAP32[attachments+i*4>>2]}GLctx["invalidateFramebuffer"](target,list)}function _glIsEnabled(x0){return GLctx["isEnabled"](x0)}function _glIsVertexArray(array){var vao=GL.vaos[array];if(!vao)return 0;return GLctx["isVertexArray"](vao)}function _glLinkProgram(program){program=GL.programs[program];GLctx.linkProgram(program);program.uniformLocsById=0;program.uniformSizeAndIdsByName={};[program["vs"],program["fs"]].forEach(function(s){Object.keys(s.explicitUniformLocations).forEach(function(shaderLocation){var loc=s.explicitUniformLocations[shaderLocation];program.uniformSizeAndIdsByName[shaderLocation]=[1,loc];program.uniformIdCounter=Math.max(program.uniformIdCounter,loc+1)})});function copyKeys(dst,src){Object.keys(src).forEach(function(key){dst[key]=src[key]})}program.explicitUniformBindings={};program.explicitSamplerBindings={};[program["vs"],program["fs"]].forEach(function(s){copyKeys(program.explicitUniformBindings,s.explicitUniformBindings);copyKeys(program.explicitSamplerBindings,s.explicitSamplerBindings)});program.explicitProgramBindingsApplied=0}function _glMapBufferRange(target,offset,length,access){if(access!=26&&access!=10){err("glMapBufferRange is only supported when access is MAP_WRITE|INVALIDATE_BUFFER");return 0}if(!emscriptenWebGLValidateMapBufferTarget(target)){GL.recordError(1280);err("GL_INVALID_ENUM in glMapBufferRange");return 0}var mem=_malloc(length);if(!mem)return 0;GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)]={offset:offset,length:length,mem:mem,access:access};return mem}function _glPixelStorei(pname,param){if(pname==3317){GL.unpackAlignment=param}GLctx.pixelStorei(pname,param)}function _glPolygonOffset(x0,x1){GLctx["polygonOffset"](x0,x1)}function _glProgramBinary(program,binaryFormat,binary,length){GL.recordError(1280)}function _glProgramParameteri(program,pname,value){GL.recordError(1280)}function _glReadBuffer(x0){GLctx["readBuffer"](x0)}function computeUnpackAlignedImageSize(width,height,sizePerPixel,alignment){function roundedToNextMultipleOf(x,y){return x+y-1&-y}var plainRowSize=width*sizePerPixel;var alignedRowSize=roundedToNextMultipleOf(plainRowSize,alignment);return height*alignedRowSize}function __colorChannelsInGlTextureFormat(format){var colorChannels={5:3,6:4,8:2,29502:3,29504:4,26917:2,26918:2,29846:3,29847:4};return colorChannels[format-6402]||1}function heapObjectForWebGLType(type){type-=5120;if(type==0)return HEAP8;if(type==1)return HEAPU8;if(type==2)return HEAP16;if(type==4)return HEAP32;if(type==6)return HEAPF32;if(type==5||type==28922||type==28520||type==30779||type==30782)return HEAPU32;return HEAPU16}function heapAccessShiftForWebGLHeap(heap){return 31-Math.clz32(heap.BYTES_PER_ELEMENT)}function emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,internalFormat){var heap=heapObjectForWebGLType(type);var shift=heapAccessShiftForWebGLHeap(heap);var byteSize=1<<shift;var sizePerPixel=__colorChannelsInGlTextureFormat(format)*byteSize;var bytes=computeUnpackAlignedImageSize(width,height,sizePerPixel,GL.unpackAlignment);return heap.subarray(pixels>>shift,pixels+bytes>>shift)}function _glReadPixels(x,y,width,height,format,type,pixels){if(GL.currentContext.version>=2){if(GLctx.currentPixelPackBufferBinding){GLctx.readPixels(x,y,width,height,format,type,pixels)}else{var heap=heapObjectForWebGLType(type);GLctx.readPixels(x,y,width,height,format,type,heap,pixels>>heapAccessShiftForWebGLHeap(heap))}return}var pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,format);if(!pixelData){GL.recordError(1280);return}GLctx.readPixels(x,y,width,height,format,type,pixelData)}function _glRenderbufferStorage(x0,x1,x2,x3){GLctx["renderbufferStorage"](x0,x1,x2,x3)}function _glRenderbufferStorageMultisample(x0,x1,x2,x3,x4){GLctx["renderbufferStorageMultisample"](x0,x1,x2,x3,x4)}function _glSamplerParameteri(sampler,pname,param){GLctx["samplerParameteri"](GL.samplers[sampler],pname,param)}function _glScissor(x0,x1,x2,x3){GLctx["scissor"](x0,x1,x2,x3)}function find_closing_parens_index(arr,i,opening="(",closing=")"){for(var nesting=0;i<arr.length;++i){if(arr[i]==opening)++nesting;if(arr[i]==closing&&--nesting==0){return i}}}function preprocess_c_code(code,defs={}){var i=0,len=code.length,out="",stack=[1];defs["defined"]=(args=>{return defs[args[0]]?1:0});function isWhitespace(str,i){return!(str.charCodeAt(i)>32)}function nextWhitespace(str,i){while(!isWhitespace(str,i))++i;return i}function classifyChar(str,idx){var cc=str.charCodeAt(idx);if(cc>32){if(cc<48)return 1;if(cc<58)return 2;if(cc<65)return 1;if(cc<91||cc==95)return 3;if(cc<97)return 1;if(cc<123)return 3;return 1}return cc<33?0:4}function tokenize(exprString,keepWhitespace){var out=[],len=exprString.length;for(var i=0;i<=len;++i){var kind=classifyChar(exprString,i);if(kind==2||kind==3){for(var j=i+1;j<=len;++j){var kind2=classifyChar(exprString,j);if(kind2!=kind&&(kind2!=2||kind!=3)){out.push(exprString.substring(i,j));i=j-1;break}}}else if(kind==1){var op2=exprString.substr(i,2);if(["<=",">=","==","!=","&&","||"].includes(op2)){out.push(op2);++i}else{out.push(exprString[i])}}}return out}function expandMacros(str,lineStart,lineEnd){if(lineEnd===undefined)lineEnd=str.length;var len=str.length;var out="";for(var i=lineStart;i<lineEnd;++i){var kind=classifyChar(str,i);if(kind==3){for(var j=i+1;j<=lineEnd;++j){var kind2=classifyChar(str,j);if(kind2!=2&&kind2!=3){var symbol=str.substring(i,j);var pp=defs[symbol];if(pp){var expanded=str.substring(lineStart,i);if(pp.length&&str[j]=="("){var closeParens=find_closing_parens_index(str,j);expanded+=pp(str.substring(j+1,closeParens).split(","))+str.substring(closeParens+1,lineEnd)}else{expanded+=pp()+str.substring(j,lineEnd)}return expandMacros(expanded,0)}else{out+=symbol;i=j-1;break}}}}else{out+=str[i]}}return out}function buildExprTree(tokens){while(tokens.length>1||typeof tokens[0]!="function"){tokens=function(tokens){var i,j,p,operatorAndPriority=-2;for(j=0;j<tokens.length;++j){if((p=["*","/","+","-","!","<","<=",">",">=","==","!=","&&","||","("].indexOf(tokens[j]))>operatorAndPriority){i=j;operatorAndPriority=p}}if(operatorAndPriority==13){var j=find_closing_parens_index(tokens,i);if(j){tokens.splice(i,j+1-i,buildExprTree(tokens.slice(i+1,j)));return tokens}}if(operatorAndPriority==4){i=tokens.lastIndexOf("!");var innerExpr=buildExprTree(tokens.slice(i+1,i+2));tokens.splice(i,2,function(){return!innerExpr()});return tokens}if(operatorAndPriority>=0){var left=buildExprTree(tokens.slice(0,i));var right=buildExprTree(tokens.slice(i+1));switch(tokens[i]){case"&&":return[function(){return left()&&right()}];case"||":return[function(){return left()||right()}];case"==":return[function(){return left()==right()}];case"!=":return[function(){return left()!=right()}];case"<":return[function(){return left()<right()}];case"<=":return[function(){return left()<=right()}];case">":return[function(){return left()>right()}];case">=":return[function(){return left()>=right()}];case"+":return[function(){return left()+right()}];case"-":return[function(){return left()-right()}];case"*":return[function(){return left()*right()}];case"/":return[function(){return Math.floor(left()/right())}]}}var num=jstoi_q(tokens[i]);return[function(){return num}]}(tokens)}return tokens[0]}for(;i<len;++i){var lineStart=i;i=code.indexOf("\n",i);if(i<0)i=len;for(var j=lineStart;j<i&&isWhitespace(code,j);++j);var thisLineIsInActivePreprocessingBlock=stack[stack.length-1];if(code[j]!="#"){if(thisLineIsInActivePreprocessingBlock){out+=expandMacros(code,lineStart,i)+"\n"}continue}var space=nextWhitespace(code,j);var directive=code.substring(j+1,space);var expression=code.substring(space,i).trim();switch(directive){case"if":var tokens=tokenize(expandMacros(expression,0));var exprTree=buildExprTree(tokens);var evaluated=exprTree();stack.push(!!evaluated*stack[stack.length-1]);break;case"ifdef":stack.push(!!defs[expression]*stack[stack.length-1]);break;case"ifndef":stack.push(!defs[expression]*stack[stack.length-1]);break;case"else":stack[stack.length-1]=1-stack[stack.length-1];break;case"endif":stack.pop();break;case"define":if(thisLineIsInActivePreprocessingBlock){var macroStart=expression.indexOf("(");var firstWs=nextWhitespace(expression,0);if(firstWs<macroStart)macroStart=0;if(macroStart>0){var macroEnd=expression.indexOf(")",macroStart);let params=expression.substring(macroStart+1,macroEnd).split(",").map(x=>x.trim());let value=tokenize(expression.substring(macroEnd+1).trim());defs[expression.substring(0,macroStart)]=(args=>{var ret="";value.forEach(x=>{var argIndex=params.indexOf(x);ret+=argIndex>=0?args[argIndex]:x});return ret})}else{let value=expandMacros(expression.substring(firstWs+1).trim(),0);defs[expression.substring(0,firstWs)]=(()=>value)}}break;case"undef":if(thisLineIsInActivePreprocessingBlock)delete defs[expression];break;default:if(directive!="version"&&directive!="pragma"&&directive!="extension"){}out+=expandMacros(code,lineStart,i)+"\n"}}return out}function remove_cpp_comments_in_shaders(code){var i=0,out="",ch,next,len=code.length;for(;i<len;++i){ch=code[i];if(ch=="/"){next=code[i+1];if(next=="/"){while(i<len&&code[i+1]!="\n")++i}else if(next=="*"){while(i<len&&(code[i-1]!="*"||code[i]!="/"))++i}else{out+=ch}}else{out+=ch}}return out}function _glShaderSource(shader,count,string,length){var source=GL.getSource(shader,count,string,length);source=preprocess_c_code(remove_cpp_comments_in_shaders(source),{"GL_FRAGMENT_PRECISION_HIGH":()=>1,"GL_ES":()=>1,"__VERSION__":()=>source.includes("#version 300")?300:100});var regex=/layout\s*\(\s*location\s*=\s*(-?\d+)\s*\)\s*(uniform\s+((lowp|mediump|highp)\s+)?\w+\s+(\w+))/g,explicitUniformLocations={},match;while(match=regex.exec(source)){explicitUniformLocations[match[5]]=jstoi_q(match[1]);if(!(explicitUniformLocations[match[5]]>=0&&explicitUniformLocations[match[5]]<1048576)){err('Specified an out of range layout(location=x) directive "'+explicitUniformLocations[match[5]]+'"! ('+match[0]+")");GL.recordError(1281);return}}source=source.replace(regex,"$2");GL.shaders[shader].explicitUniformLocations=explicitUniformLocations;var bindingRegex=/layout\s*\(.*?binding\s*=\s*(-?\d+).*?\)\s*uniform\s+(\w+)\s+(\w+)?/g,samplerBindings={},uniformBindings={},bindingMatch;while(bindingMatch=bindingRegex.exec(source)){var arrayLength=1;for(var i=bindingMatch.index;i<source.length&&source[i]!=";";++i){if(source[i]=="["){arrayLength=jstoi_q(source.slice(i+1));break}if(source[i]=="{")i=find_closing_parens_index(source,i,"{","}")-1}var binding=jstoi_q(bindingMatch[1]);var bindingsType=34930;if(bindingMatch[3]&&bindingMatch[2].indexOf("sampler")!=-1){samplerBindings[bindingMatch[3]]=[binding,arrayLength]}else{bindingsType=35374;uniformBindings[bindingMatch[2]]=[binding,arrayLength]}var numBindingPoints=GLctx.getParameter(bindingsType);if(!(binding>=0&&binding+arrayLength<=numBindingPoints)){err('Specified an out of range layout(binding=x) directive "'+binding+'"! ('+bindingMatch[0]+"). Valid range is [0, "+numBindingPoints+"-1]");GL.recordError(1281);return}}source=source.replace(/layout\s*\(.*?binding\s*=\s*([-\d]+).*?\)/g,"");source=source.replace(/(layout\s*\((.*?)),\s*binding\s*=\s*([-\d]+)\)/g,"$1)");source=source.replace(/layout\s*\(\s*binding\s*=\s*([-\d]+)\s*,(.*?)\)/g,"layout($2)");GL.shaders[shader].explicitSamplerBindings=samplerBindings;GL.shaders[shader].explicitUniformBindings=uniformBindings;GLctx.shaderSource(GL.shaders[shader],source)}function _glStencilFuncSeparate(x0,x1,x2,x3){GLctx["stencilFuncSeparate"](x0,x1,x2,x3)}function _glStencilMask(x0){GLctx["stencilMask"](x0)}function _glStencilOpSeparate(x0,x1,x2,x3){GLctx["stencilOpSeparate"](x0,x1,x2,x3)}function _glTexImage2D(target,level,internalFormat,width,height,border,format,type,pixels){if(GL.currentContext.version>=2){if(GLctx.currentPixelUnpackBufferBinding){GLctx.texImage2D(target,level,internalFormat,width,height,border,format,type,pixels)}else if(pixels){var heap=heapObjectForWebGLType(type);GLctx.texImage2D(target,level,internalFormat,width,height,border,format,type,heap,pixels>>heapAccessShiftForWebGLHeap(heap))}else{GLctx.texImage2D(target,level,internalFormat,width,height,border,format,type,null)}return}GLctx.texImage2D(target,level,internalFormat,width,height,border,format,type,pixels?emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,internalFormat):null)}function _glTexImage3D(target,level,internalFormat,width,height,depth,border,format,type,pixels){if(GLctx.currentPixelUnpackBufferBinding){GLctx["texImage3D"](target,level,internalFormat,width,height,depth,border,format,type,pixels)}else if(pixels){var heap=heapObjectForWebGLType(type);GLctx["texImage3D"](target,level,internalFormat,width,height,depth,border,format,type,heap,pixels>>heapAccessShiftForWebGLHeap(heap))}else{GLctx["texImage3D"](target,level,internalFormat,width,height,depth,border,format,type,null)}}function _glTexParameterf(x0,x1,x2){GLctx["texParameterf"](x0,x1,x2)}function _glTexParameteri(x0,x1,x2){GLctx["texParameteri"](x0,x1,x2)}function _glTexParameteriv(target,pname,params){var param=HEAP32[params>>2];GLctx.texParameteri(target,pname,param)}function _glTexStorage2D(x0,x1,x2,x3,x4){GLctx["texStorage2D"](x0,x1,x2,x3,x4)}function _glTexStorage3D(x0,x1,x2,x3,x4,x5){GLctx["texStorage3D"](x0,x1,x2,x3,x4,x5)}function _glTexSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels){if(GL.currentContext.version>=2){if(GLctx.currentPixelUnpackBufferBinding){GLctx.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels)}else if(pixels){var heap=heapObjectForWebGLType(type);GLctx.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,heap,pixels>>heapAccessShiftForWebGLHeap(heap))}else{GLctx.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,null)}return}var pixelData=null;if(pixels)pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,0);GLctx.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixelData)}function _glTexSubImage3D(target,level,xoffset,yoffset,zoffset,width,height,depth,format,type,pixels){if(GLctx.currentPixelUnpackBufferBinding){GLctx["texSubImage3D"](target,level,xoffset,yoffset,zoffset,width,height,depth,format,type,pixels)}else if(pixels){var heap=heapObjectForWebGLType(type);GLctx["texSubImage3D"](target,level,xoffset,yoffset,zoffset,width,height,depth,format,type,heap,pixels>>heapAccessShiftForWebGLHeap(heap))}else{GLctx["texSubImage3D"](target,level,xoffset,yoffset,zoffset,width,height,depth,format,type,null)}}var miniTempWebGLFloatBuffers=[];function _glUniform1fv(location,count,value){if(GL.currentContext.version>=2){GLctx.uniform1fv(webglGetUniformLocation(location),HEAPF32,value>>2,count);return}if(count<=288){var view=miniTempWebGLFloatBuffers[count-1];for(var i=0;i<count;++i){view[i]=HEAPF32[value+4*i>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*4>>2)}GLctx.uniform1fv(webglGetUniformLocation(location),view)}function _glUniform1i(location,v0){GLctx.uniform1i(webglGetUniformLocation(location),v0)}var __miniTempWebGLIntBuffers=[];function _glUniform1iv(location,count,value){if(GL.currentContext.version>=2){GLctx.uniform1iv(webglGetUniformLocation(location),HEAP32,value>>2,count);return}if(count<=288){var view=__miniTempWebGLIntBuffers[count-1];for(var i=0;i<count;++i){view[i]=HEAP32[value+4*i>>2]}}else{var view=HEAP32.subarray(value>>2,value+count*4>>2)}GLctx.uniform1iv(webglGetUniformLocation(location),view)}function _glUniform1uiv(location,count,value){GLctx.uniform1uiv(webglGetUniformLocation(location),HEAPU32,value>>2,count)}function _glUniform2fv(location,count,value){if(GL.currentContext.version>=2){GLctx.uniform2fv(webglGetUniformLocation(location),HEAPF32,value>>2,count*2);return}if(count<=144){var view=miniTempWebGLFloatBuffers[2*count-1];for(var i=0;i<2*count;i+=2){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*8>>2)}GLctx.uniform2fv(webglGetUniformLocation(location),view)}function _glUniform2iv(location,count,value){if(GL.currentContext.version>=2){GLctx.uniform2iv(webglGetUniformLocation(location),HEAP32,value>>2,count*2);return}if(count<=144){var view=__miniTempWebGLIntBuffers[2*count-1];for(var i=0;i<2*count;i+=2){view[i]=HEAP32[value+4*i>>2];view[i+1]=HEAP32[value+(4*i+4)>>2]}}else{var view=HEAP32.subarray(value>>2,value+count*8>>2)}GLctx.uniform2iv(webglGetUniformLocation(location),view)}function _glUniform2uiv(location,count,value){GLctx.uniform2uiv(webglGetUniformLocation(location),HEAPU32,value>>2,count*2)}function _glUniform3fv(location,count,value){if(GL.currentContext.version>=2){GLctx.uniform3fv(webglGetUniformLocation(location),HEAPF32,value>>2,count*3);return}if(count<=96){var view=miniTempWebGLFloatBuffers[3*count-1];for(var i=0;i<3*count;i+=3){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*12>>2)}GLctx.uniform3fv(webglGetUniformLocation(location),view)}function _glUniform3iv(location,count,value){if(GL.currentContext.version>=2){GLctx.uniform3iv(webglGetUniformLocation(location),HEAP32,value>>2,count*3);return}if(count<=96){var view=__miniTempWebGLIntBuffers[3*count-1];for(var i=0;i<3*count;i+=3){view[i]=HEAP32[value+4*i>>2];view[i+1]=HEAP32[value+(4*i+4)>>2];view[i+2]=HEAP32[value+(4*i+8)>>2]}}else{var view=HEAP32.subarray(value>>2,value+count*12>>2)}GLctx.uniform3iv(webglGetUniformLocation(location),view)}function _glUniform3uiv(location,count,value){GLctx.uniform3uiv(webglGetUniformLocation(location),HEAPU32,value>>2,count*3)}function _glUniform4fv(location,count,value){if(GL.currentContext.version>=2){GLctx.uniform4fv(webglGetUniformLocation(location),HEAPF32,value>>2,count*4);return}if(count<=72){var view=miniTempWebGLFloatBuffers[4*count-1];var heap=HEAPF32;value>>=2;for(var i=0;i<4*count;i+=4){var dst=value+i;view[i]=heap[dst];view[i+1]=heap[dst+1];view[i+2]=heap[dst+2];view[i+3]=heap[dst+3]}}else{var view=HEAPF32.subarray(value>>2,value+count*16>>2)}GLctx.uniform4fv(webglGetUniformLocation(location),view)}function _glUniform4iv(location,count,value){if(GL.currentContext.version>=2){GLctx.uniform4iv(webglGetUniformLocation(location),HEAP32,value>>2,count*4);return}if(count<=72){var view=__miniTempWebGLIntBuffers[4*count-1];for(var i=0;i<4*count;i+=4){view[i]=HEAP32[value+4*i>>2];view[i+1]=HEAP32[value+(4*i+4)>>2];view[i+2]=HEAP32[value+(4*i+8)>>2];view[i+3]=HEAP32[value+(4*i+12)>>2]}}else{var view=HEAP32.subarray(value>>2,value+count*16>>2)}GLctx.uniform4iv(webglGetUniformLocation(location),view)}function _glUniform4uiv(location,count,value){GLctx.uniform4uiv(webglGetUniformLocation(location),HEAPU32,value>>2,count*4)}function _glUniformBlockBinding(program,uniformBlockIndex,uniformBlockBinding){program=GL.programs[program];GLctx["uniformBlockBinding"](program,uniformBlockIndex,uniformBlockBinding)}function _glUniformMatrix3fv(location,count,transpose,value){if(GL.currentContext.version>=2){GLctx.uniformMatrix3fv(webglGetUniformLocation(location),!!transpose,HEAPF32,value>>2,count*9);return}if(count<=32){var view=miniTempWebGLFloatBuffers[9*count-1];for(var i=0;i<9*count;i+=9){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2];view[i+4]=HEAPF32[value+(4*i+16)>>2];view[i+5]=HEAPF32[value+(4*i+20)>>2];view[i+6]=HEAPF32[value+(4*i+24)>>2];view[i+7]=HEAPF32[value+(4*i+28)>>2];view[i+8]=HEAPF32[value+(4*i+32)>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*36>>2)}GLctx.uniformMatrix3fv(webglGetUniformLocation(location),!!transpose,view)}function _glUniformMatrix4fv(location,count,transpose,value){if(GL.currentContext.version>=2){GLctx.uniformMatrix4fv(webglGetUniformLocation(location),!!transpose,HEAPF32,value>>2,count*16);return}if(count<=18){var view=miniTempWebGLFloatBuffers[16*count-1];var heap=HEAPF32;value>>=2;for(var i=0;i<16*count;i+=16){var dst=value+i;view[i]=heap[dst];view[i+1]=heap[dst+1];view[i+2]=heap[dst+2];view[i+3]=heap[dst+3];view[i+4]=heap[dst+4];view[i+5]=heap[dst+5];view[i+6]=heap[dst+6];view[i+7]=heap[dst+7];view[i+8]=heap[dst+8];view[i+9]=heap[dst+9];view[i+10]=heap[dst+10];view[i+11]=heap[dst+11];view[i+12]=heap[dst+12];view[i+13]=heap[dst+13];view[i+14]=heap[dst+14];view[i+15]=heap[dst+15]}}else{var view=HEAPF32.subarray(value>>2,value+count*64>>2)}GLctx.uniformMatrix4fv(webglGetUniformLocation(location),!!transpose,view)}function _glUnmapBuffer(target){if(!emscriptenWebGLValidateMapBufferTarget(target)){GL.recordError(1280);err("GL_INVALID_ENUM in glUnmapBuffer");return 0}var buffer=emscriptenWebGLGetBufferBinding(target);var mapping=GL.mappedBuffers[buffer];if(!mapping){GL.recordError(1282);err("buffer was never mapped in glUnmapBuffer");return 0}GL.mappedBuffers[buffer]=null;if(!(mapping.access&16))if(GL.currentContext.version>=2){GLctx.bufferSubData(target,mapping.offset,HEAPU8,mapping.mem,mapping.length)}else{GLctx.bufferSubData(target,mapping.offset,HEAPU8.subarray(mapping.mem,mapping.mem+mapping.length))}_free(mapping.mem);return 1}function webglApplyExplicitProgramBindings(){var p=GLctx.currentProgram;if(!p.explicitProgramBindingsApplied){if(GL.currentContext.version>=2){Object.keys(p.explicitUniformBindings).forEach(function(ubo){var bindings=p.explicitUniformBindings[ubo];for(var i=0;i<bindings[1];++i){var blockIndex=GLctx.getUniformBlockIndex(p,ubo+(bindings[1]>1?"["+i+"]":""));GLctx.uniformBlockBinding(p,blockIndex,bindings[0]+i)}})}Object.keys(p.explicitSamplerBindings).forEach(function(sampler){var bindings=p.explicitSamplerBindings[sampler];for(var i=0;i<bindings[1];++i){GLctx.uniform1i(GLctx.getUniformLocation(p,sampler+(i?"["+i+"]":"")),bindings[0]+i)}});p.explicitProgramBindingsApplied=1}}function _glUseProgram(program){program=GL.programs[program];GLctx.useProgram(program);if(GLctx.currentProgram=program){webglApplyExplicitProgramBindings()}}function _glValidateProgram(program){GLctx.validateProgram(GL.programs[program])}function _glVertexAttrib4f(x0,x1,x2,x3,x4){GLctx["vertexAttrib4f"](x0,x1,x2,x3,x4)}function _glVertexAttrib4fv(index,v){GLctx.vertexAttrib4f(index,HEAPF32[v>>2],HEAPF32[v+4>>2],HEAPF32[v+8>>2],HEAPF32[v+12>>2])}function _glVertexAttribIPointer(index,size,type,stride,ptr){var cb=GL.currentContext.clientBuffers[index];if(!GLctx.currentArrayBufferBinding){cb.size=size;cb.type=type;cb.normalized=false;cb.stride=stride;cb.ptr=ptr;cb.clientside=true;cb.vertexAttribPointerAdaptor=function(index,size,type,normalized,stride,ptr){this.vertexAttribIPointer(index,size,type,stride,ptr)};return}cb.clientside=false;GLctx["vertexAttribIPointer"](index,size,type,stride,ptr)}function _glVertexAttribPointer(index,size,type,normalized,stride,ptr){var cb=GL.currentContext.clientBuffers[index];if(!GLctx.currentArrayBufferBinding){cb.size=size;cb.type=type;cb.normalized=normalized;cb.stride=stride;cb.ptr=ptr;cb.clientside=true;cb.vertexAttribPointerAdaptor=function(index,size,type,normalized,stride,ptr){this.vertexAttribPointer(index,size,type,normalized,stride,ptr)};return}cb.clientside=false;GLctx.vertexAttribPointer(index,size,type,!!normalized,stride,ptr)}function _glViewport(x0,x1,x2,x3){GLctx["viewport"](x0,x1,x2,x3)}function _initialize(gamekey,gamesecret){gameanalytics.GameAnalytics.addRemoteConfigsListener(listener);gameanalytics.GameAnalytics.initialize(Pointer_stringify(gamekey),Pointer_stringify(gamesecret))}function _isRemoteConfigsReady(){return gameanalytics.GameAnalytics.isRemoteConfigsReady()}function _llvm_eh_typeid_for(type){return type}function _setCustomDimension01(customDimension){gameanalytics.GameAnalytics.setCustomDimension01(Pointer_stringify(customDimension))}function _setCustomDimension02(customDimension){gameanalytics.GameAnalytics.setCustomDimension02(Pointer_stringify(customDimension))}function _setCustomDimension03(customDimension){gameanalytics.GameAnalytics.setCustomDimension03(Pointer_stringify(customDimension))}function _setEnabledInfoLog(enabled){gameanalytics.GameAnalytics.setEnabledInfoLog(enabled)}function _setEnabledVerboseLog(enabled){gameanalytics.GameAnalytics.setEnabledVerboseLog(enabled)}function _setEventSubmission(enabled){gameanalytics.GameAnalytics.setEnabledEventSubmission(enabled)}function _setGlobalCustomEventFields(customFields){gameanalytics.GameAnalytics.setGlobalCustomEventFields(JSON.parse(customFields))}function _setManualSessionHandling(enabled){gameanalytics.GameAnalytics.setEnabledManualSessionHandling(enabled)}function _setTempRet0(val){setTempRet0(val)}function _startSession(){gameanalytics.GameAnalytics.startSession()}function __isLeapYear(year){return year%4===0&&(year%100!==0||year%400===0)}function __arraySum(array,index){var sum=0;for(var i=0;i<=index;sum+=array[i++]){}return sum}var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date,days){var newDate=new Date(date.getTime());while(days>0){var leap=__isLeapYear(newDate.getFullYear());var currentMonth=newDate.getMonth();var daysInCurrentMonth=(leap?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[currentMonth];if(days>daysInCurrentMonth-newDate.getDate()){days-=daysInCurrentMonth-newDate.getDate()+1;newDate.setDate(1);if(currentMonth<11){newDate.setMonth(currentMonth+1)}else{newDate.setMonth(0);newDate.setFullYear(newDate.getFullYear()+1)}}else{newDate.setDate(newDate.getDate()+days);return newDate}}return newDate}function _strftime(s,maxsize,format,tm){var tm_zone=HEAP32[tm+40>>2];var date={tm_sec:HEAP32[tm>>2],tm_min:HEAP32[tm+4>>2],tm_hour:HEAP32[tm+8>>2],tm_mday:HEAP32[tm+12>>2],tm_mon:HEAP32[tm+16>>2],tm_year:HEAP32[tm+20>>2],tm_wday:HEAP32[tm+24>>2],tm_yday:HEAP32[tm+28>>2],tm_isdst:HEAP32[tm+32>>2],tm_gmtoff:HEAP32[tm+36>>2],tm_zone:tm_zone?UTF8ToString(tm_zone):""};var pattern=UTF8ToString(format);var EXPANSION_RULES_1={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var rule in EXPANSION_RULES_1){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_1[rule])}var WEEKDAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];function leadingSomething(value,digits,character){var str=typeof value=="number"?value.toString():value||"";while(str.length<digits){str=character[0]+str}return str}function leadingNulls(value,digits){return leadingSomething(value,digits,"0")}function compareByDay(date1,date2){function sgn(value){return value<0?-1:value>0?1:0}var compare;if((compare=sgn(date1.getFullYear()-date2.getFullYear()))===0){if((compare=sgn(date1.getMonth()-date2.getMonth()))===0){compare=sgn(date1.getDate()-date2.getDate())}}return compare}function getFirstWeekStartDate(janFourth){switch(janFourth.getDay()){case 0:return new Date(janFourth.getFullYear()-1,11,29);case 1:return janFourth;case 2:return new Date(janFourth.getFullYear(),0,3);case 3:return new Date(janFourth.getFullYear(),0,2);case 4:return new Date(janFourth.getFullYear(),0,1);case 5:return new Date(janFourth.getFullYear()-1,11,31);case 6:return new Date(janFourth.getFullYear()-1,11,30)}}function getWeekBasedYear(date){var thisDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);var janFourthThisYear=new Date(thisDate.getFullYear(),0,4);var janFourthNextYear=new Date(thisDate.getFullYear()+1,0,4);var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);if(compareByDay(firstWeekStartThisYear,thisDate)<=0){if(compareByDay(firstWeekStartNextYear,thisDate)<=0){return thisDate.getFullYear()+1}else{return thisDate.getFullYear()}}else{return thisDate.getFullYear()-1}}var EXPANSION_RULES_2={"%a":function(date){return WEEKDAYS[date.tm_wday].substring(0,3)},"%A":function(date){return WEEKDAYS[date.tm_wday]},"%b":function(date){return MONTHS[date.tm_mon].substring(0,3)},"%B":function(date){return MONTHS[date.tm_mon]},"%C":function(date){var year=date.tm_year+1900;return leadingNulls(year/100|0,2)},"%d":function(date){return leadingNulls(date.tm_mday,2)},"%e":function(date){return leadingSomething(date.tm_mday,2," ")},"%g":function(date){return getWeekBasedYear(date).toString().substring(2)},"%G":function(date){return getWeekBasedYear(date)},"%H":function(date){return leadingNulls(date.tm_hour,2)},"%I":function(date){var twelveHour=date.tm_hour;if(twelveHour==0)twelveHour=12;else if(twelveHour>12)twelveHour-=12;return leadingNulls(twelveHour,2)},"%j":function(date){return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900)?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,date.tm_mon-1),3)},"%m":function(date){return leadingNulls(date.tm_mon+1,2)},"%M":function(date){return leadingNulls(date.tm_min,2)},"%n":function(){return"\n"},"%p":function(date){if(date.tm_hour>=0&&date.tm_hour<12){return"AM"}else{return"PM"}},"%S":function(date){return leadingNulls(date.tm_sec,2)},"%t":function(){return"\t"},"%u":function(date){return date.tm_wday||7},"%U":function(date){var days=date.tm_yday+7-date.tm_wday;return leadingNulls(Math.floor(days/7),2)},"%V":function(date){var val=Math.floor((date.tm_yday+7-(date.tm_wday+6)%7)/7);if((date.tm_wday+371-date.tm_yday-2)%7<=2){val++}if(!val){val=52;var dec31=(date.tm_wday+7-date.tm_yday-1)%7;if(dec31==4||dec31==5&&__isLeapYear(date.tm_year%400-1)){val++}}else if(val==53){var jan1=(date.tm_wday+371-date.tm_yday)%7;if(jan1!=4&&(jan1!=3||!__isLeapYear(date.tm_year)))val=1}return leadingNulls(val,2)},"%w":function(date){return date.tm_wday},"%W":function(date){var days=date.tm_yday+7-(date.tm_wday+6)%7;return leadingNulls(Math.floor(days/7),2)},"%y":function(date){return(date.tm_year+1900).toString().substring(2)},"%Y":function(date){return date.tm_year+1900},"%z":function(date){var off=date.tm_gmtoff;var ahead=off>=0;off=Math.abs(off)/60;off=off/60*100+off%60;return(ahead?"+":"-")+String("0000"+off).slice(-4)},"%Z":function(date){return date.tm_zone},"%%":function(){return"%"}};pattern=pattern.replace(/%%/g,"\0\0");for(var rule in EXPANSION_RULES_2){if(pattern.includes(rule)){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_2[rule](date))}}pattern=pattern.replace(/\0\0/g,"%");var bytes=intArrayFromString(pattern,false);if(bytes.length>maxsize){return 0}writeArrayToMemory(bytes,s);return bytes.length-1}var FSNode=function(parent,name,mode,rdev){if(!parent){parent=this}this.parent=parent;this.mount=parent.mount;this.mounted=null;this.id=FS.nextInode++;this.name=name;this.mode=mode;this.node_ops={};this.stream_ops={};this.rdev=rdev};var readMode=292|73;var writeMode=146;Object.defineProperties(FSNode.prototype,{read:{get:function(){return(this.mode&readMode)===readMode},set:function(val){val?this.mode|=readMode:this.mode&=~readMode}},write:{get:function(){return(this.mode&writeMode)===writeMode},set:function(val){val?this.mode|=writeMode:this.mode&=~writeMode}},isFolder:{get:function(){return FS.isDir(this.mode)}},isDevice:{get:function(){return FS.isChrdev(this.mode)}}});FS.FSNode=FSNode;FS.staticInit();Module["FS_createPath"]=FS.createPath;Module["FS_createDataFile"]=FS.createDataFile;Module["requestFullscreen"]=function Module_requestFullscreen(lockPointer,resizeCanvas){Browser.requestFullscreen(lockPointer,resizeCanvas)};Module["requestAnimationFrame"]=function Module_requestAnimationFrame(func){Browser.requestAnimationFrame(func)};Module["setCanvasSize"]=function Module_setCanvasSize(width,height,noUpdates){Browser.setCanvasSize(width,height,noUpdates)};Module["pauseMainLoop"]=function Module_pauseMainLoop(){Browser.mainLoop.pause()};Module["resumeMainLoop"]=function Module_resumeMainLoop(){Browser.mainLoop.resume()};Module["getUserMedia"]=function Module_getUserMedia(){Browser.getUserMedia()};Module["createContext"]=function Module_createContext(canvas,useWebGL,setInModule,webGLContextAttributes){return Browser.createContext(canvas,useWebGL,setInModule,webGLContextAttributes)};var GLctx;for(var i=0;i<32;++i)tempFixedLengthArray.push(new Array(i));var miniTempWebGLFloatBuffersStorage=new Float32Array(288);for(var i=0;i<288;++i){miniTempWebGLFloatBuffers[i]=miniTempWebGLFloatBuffersStorage.subarray(0,i+1)}var __miniTempWebGLIntBuffersStorage=new Int32Array(288);for(var i=0;i<288;++i){__miniTempWebGLIntBuffers[i]=__miniTempWebGLIntBuffersStorage.subarray(0,i+1)}var ASSERTIONS=false;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}var asmLibraryArg={"AdBlockInitialize":_AdBlockInitialize,"BillingConsumeProduct":_BillingConsumeProduct,"BillingGetProductCatalog":_BillingGetProductCatalog,"BillingGetPurchasedProducts":_BillingGetPurchasedProducts,"BillingPurchaseProduct":_BillingPurchaseProduct,"GetAdBlockEnabled":_GetAdBlockEnabled,"GetDeviceIsMobile":_GetDeviceIsMobile,"GetJSMemoryInfo":_GetJSMemoryInfo,"GetPlayerAccountHasPersonalProfileDataPermission":_GetPlayerAccountHasPersonalProfileDataPermission,"GetPlayerAccountIsAuthorized":_GetPlayerAccountIsAuthorized,"GetYandexGamesSdkEnvironment":_GetYandexGamesSdkEnvironment,"GetYandexGamesSdkIsInitialized":_GetYandexGamesSdkIsInitialized,"InterstitialAdShow":_InterstitialAdShow,"JS_Accelerometer_IsRunning":_JS_Accelerometer_IsRunning,"JS_Accelerometer_Start":_JS_Accelerometer_Start,"JS_Accelerometer_Stop":_JS_Accelerometer_Stop,"JS_Cursor_SetImage":_JS_Cursor_SetImage,"JS_Cursor_SetShow":_JS_Cursor_SetShow,"JS_DOM_MapViewportCoordinateToElementLocalCoordinate":_JS_DOM_MapViewportCoordinateToElementLocalCoordinate,"JS_DOM_UnityCanvasSelector":_JS_DOM_UnityCanvasSelector,"JS_Eval_OpenURL":_JS_Eval_OpenURL,"JS_FileSystem_Initialize":_JS_FileSystem_Initialize,"JS_FileSystem_Sync":_JS_FileSystem_Sync,"JS_GravitySensor_IsRunning":_JS_GravitySensor_IsRunning,"JS_GravitySensor_Start":_JS_GravitySensor_Start,"JS_GravitySensor_Stop":_JS_GravitySensor_Stop,"JS_GuardAgainstJsExceptions":_JS_GuardAgainstJsExceptions,"JS_Gyroscope_IsRunning":_JS_Gyroscope_IsRunning,"JS_Gyroscope_Start":_JS_Gyroscope_Start,"JS_Gyroscope_Stop":_JS_Gyroscope_Stop,"JS_LinearAccelerationSensor_IsRunning":_JS_LinearAccelerationSensor_IsRunning,"JS_LinearAccelerationSensor_Start":_JS_LinearAccelerationSensor_Start,"JS_LinearAccelerationSensor_Stop":_JS_LinearAccelerationSensor_Stop,"JS_Log_Dump":_JS_Log_Dump,"JS_Log_StackTrace":_JS_Log_StackTrace,"JS_MobileKeybard_GetIgnoreBlurEvent":_JS_MobileKeybard_GetIgnoreBlurEvent,"JS_MobileKeyboard_GetKeyboardStatus":_JS_MobileKeyboard_GetKeyboardStatus,"JS_MobileKeyboard_GetText":_JS_MobileKeyboard_GetText,"JS_MobileKeyboard_GetTextSelection":_JS_MobileKeyboard_GetTextSelection,"JS_MobileKeyboard_Hide":_JS_MobileKeyboard_Hide,"JS_MobileKeyboard_SetCharacterLimit":_JS_MobileKeyboard_SetCharacterLimit,"JS_MobileKeyboard_SetText":_JS_MobileKeyboard_SetText,"JS_MobileKeyboard_SetTextSelection":_JS_MobileKeyboard_SetTextSelection,"JS_MobileKeyboard_Show":_JS_MobileKeyboard_Show,"JS_OrientationSensor_IsRunning":_JS_OrientationSensor_IsRunning,"JS_OrientationSensor_Start":_JS_OrientationSensor_Start,"JS_OrientationSensor_Stop":_JS_OrientationSensor_Stop,"JS_RequestDeviceSensorPermissionsOnTouch":_JS_RequestDeviceSensorPermissionsOnTouch,"JS_RunQuitCallbacks":_JS_RunQuitCallbacks,"JS_ScreenOrientation_DeInit":_JS_ScreenOrientation_DeInit,"JS_ScreenOrientation_Init":_JS_ScreenOrientation_Init,"JS_ScreenOrientation_Lock":_JS_ScreenOrientation_Lock,"JS_Sound_Create_Channel":_JS_Sound_Create_Channel,"JS_Sound_GetLength":_JS_Sound_GetLength,"JS_Sound_GetLoadState":_JS_Sound_GetLoadState,"JS_Sound_Init":_JS_Sound_Init,"JS_Sound_Load":_JS_Sound_Load,"JS_Sound_Load_PCM":_JS_Sound_Load_PCM,"JS_Sound_Play":_JS_Sound_Play,"JS_Sound_ReleaseInstance":_JS_Sound_ReleaseInstance,"JS_Sound_ResumeIfNeeded":_JS_Sound_ResumeIfNeeded,"JS_Sound_Set3D":_JS_Sound_Set3D,"JS_Sound_SetListenerOrientation":_JS_Sound_SetListenerOrientation,"JS_Sound_SetListenerPosition":_JS_Sound_SetListenerPosition,"JS_Sound_SetLoop":_JS_Sound_SetLoop,"JS_Sound_SetLoopPoints":_JS_Sound_SetLoopPoints,"JS_Sound_SetPaused":_JS_Sound_SetPaused,"JS_Sound_SetPitch":_JS_Sound_SetPitch,"JS_Sound_SetPosition":_JS_Sound_SetPosition,"JS_Sound_SetVolume":_JS_Sound_SetVolume,"JS_Sound_Stop":_JS_Sound_Stop,"JS_SystemInfo_GetBrowserName":_JS_SystemInfo_GetBrowserName,"JS_SystemInfo_GetBrowserVersionString":_JS_SystemInfo_GetBrowserVersionString,"JS_SystemInfo_GetCanvasClientSize":_JS_SystemInfo_GetCanvasClientSize,"JS_SystemInfo_GetDocumentURL":_JS_SystemInfo_GetDocumentURL,"JS_SystemInfo_GetGPUInfo":_JS_SystemInfo_GetGPUInfo,"JS_SystemInfo_GetLanguage":_JS_SystemInfo_GetLanguage,"JS_SystemInfo_GetMatchWebGLToCanvasSize":_JS_SystemInfo_GetMatchWebGLToCanvasSize,"JS_SystemInfo_GetMemory":_JS_SystemInfo_GetMemory,"JS_SystemInfo_GetOS":_JS_SystemInfo_GetOS,"JS_SystemInfo_GetPreferredDevicePixelRatio":_JS_SystemInfo_GetPreferredDevicePixelRatio,"JS_SystemInfo_GetScreenSize":_JS_SystemInfo_GetScreenSize,"JS_SystemInfo_HasAstcHdr":_JS_SystemInfo_HasAstcHdr,"JS_SystemInfo_HasCursorLock":_JS_SystemInfo_HasCursorLock,"JS_SystemInfo_HasFullscreen":_JS_SystemInfo_HasFullscreen,"JS_SystemInfo_HasWebGL":_JS_SystemInfo_HasWebGL,"JS_SystemInfo_IsMobile":_JS_SystemInfo_IsMobile,"JS_UnityEngineShouldQuit":_JS_UnityEngineShouldQuit,"JS_WebRequest_Abort":_JS_WebRequest_Abort,"JS_WebRequest_Create":_JS_WebRequest_Create,"JS_WebRequest_GetResponseMetaData":_JS_WebRequest_GetResponseMetaData,"JS_WebRequest_GetResponseMetaDataLengths":_JS_WebRequest_GetResponseMetaDataLengths,"JS_WebRequest_Release":_JS_WebRequest_Release,"JS_WebRequest_Send":_JS_WebRequest_Send,"JS_WebRequest_SetRedirectLimit":_JS_WebRequest_SetRedirectLimit,"JS_WebRequest_SetRequestHeader":_JS_WebRequest_SetRequestHeader,"JS_WebRequest_SetTimeout":_JS_WebRequest_SetTimeout,"LeaderboardGetEntries":_LeaderboardGetEntries,"LeaderboardGetPlayerEntry":_LeaderboardGetPlayerEntry,"LeaderboardSetScore":_LeaderboardSetScore,"PlayerAccountAuthorize":_PlayerAccountAuthorize,"PlayerAccountGetCloudSaveData":_PlayerAccountGetCloudSaveData,"PlayerAccountGetProfileData":_PlayerAccountGetProfileData,"PlayerAccountRequestPersonalProfileDataPermission":_PlayerAccountRequestPersonalProfileDataPermission,"PlayerAccountSetCloudSaveData":_PlayerAccountSetCloudSaveData,"PlayerAccountStartAuthorizationPolling":_PlayerAccountStartAuthorizationPolling,"ReviewPopupCanOpen":_ReviewPopupCanOpen,"ReviewPopupOpen":_ReviewPopupOpen,"ShortcutCanSuggest":_ShortcutCanSuggest,"ShortcutSuggest":_ShortcutSuggest,"StickyAdHide":_StickyAdHide,"StickyAdShow":_StickyAdShow,"VideoAdShow":_VideoAdShow,"WebApplicationInitialize":_WebApplicationInitialize,"YandexGamesSdkGameReady":_YandexGamesSdkGameReady,"YandexGamesSdkInitialize":_YandexGamesSdkInitialize,"YandexGamesSdkIsRunningOnYandex":_YandexGamesSdkIsRunningOnYandex,"YandexMetricaSend":_YandexMetricaSend,"__cxa_allocate_exception":___cxa_allocate_exception,"__cxa_begin_catch":___cxa_begin_catch,"__cxa_end_catch":___cxa_end_catch,"__cxa_find_matching_catch_2":___cxa_find_matching_catch_2,"__cxa_find_matching_catch_3":___cxa_find_matching_catch_3,"__cxa_find_matching_catch_4":___cxa_find_matching_catch_4,"__cxa_free_exception":___cxa_free_exception,"__cxa_rethrow":___cxa_rethrow,"__cxa_throw":___cxa_throw,"__resumeException":___resumeException,"__syscall__newselect":___syscall__newselect,"__syscall_accept4":___syscall_accept4,"__syscall_bind":___syscall_bind,"__syscall_chmod":___syscall_chmod,"__syscall_connect":___syscall_connect,"__syscall_dup3":___syscall_dup3,"__syscall_faccessat":___syscall_faccessat,"__syscall_fcntl64":___syscall_fcntl64,"__syscall_fstat64":___syscall_fstat64,"__syscall_getcwd":___syscall_getcwd,"__syscall_getdents64":___syscall_getdents64,"__syscall_getpeername":___syscall_getpeername,"__syscall_getsockname":___syscall_getsockname,"__syscall_getsockopt":___syscall_getsockopt,"__syscall_ioctl":___syscall_ioctl,"__syscall_listen":___syscall_listen,"__syscall_lstat64":___syscall_lstat64,"__syscall_mkdir":___syscall_mkdir,"__syscall_newfstatat":___syscall_newfstatat,"__syscall_openat":___syscall_openat,"__syscall_pipe":___syscall_pipe,"__syscall_poll":___syscall_poll,"__syscall_readlinkat":___syscall_readlinkat,"__syscall_recvfrom":___syscall_recvfrom,"__syscall_recvmsg":___syscall_recvmsg,"__syscall_renameat":___syscall_renameat,"__syscall_rmdir":___syscall_rmdir,"__syscall_sendmsg":___syscall_sendmsg,"__syscall_sendto":___syscall_sendto,"__syscall_socket":___syscall_socket,"__syscall_stat64":___syscall_stat64,"__syscall_statfs64":___syscall_statfs64,"__syscall_truncate64":___syscall_truncate64,"__syscall_unlinkat":___syscall_unlinkat,"__syscall_utimensat":___syscall_utimensat,"_dlopen_js":__dlopen_js,"_dlsym_js":__dlsym_js,"_emscripten_date_now":__emscripten_date_now,"_emscripten_get_now_is_monotonic":__emscripten_get_now_is_monotonic,"_emscripten_throw_longjmp":__emscripten_throw_longjmp,"_gmtime_js":__gmtime_js,"_localtime_js":__localtime_js,"_mktime_js":__mktime_js,"_mmap_js":__mmap_js,"_munmap_js":__munmap_js,"_tzset_js":__tzset_js,"abort":_abort,"addBusinessEvent":_addBusinessEvent,"addDesignEvent":_addDesignEvent,"addDesignEventWithValue":_addDesignEventWithValue,"addErrorEvent":_addErrorEvent,"addProgressionEvent":_addProgressionEvent,"addProgressionEventWithScore":_addProgressionEventWithScore,"addResourceEvent":_addResourceEvent,"configureAvailableCustomDimensions01":_configureAvailableCustomDimensions01,"configureAvailableCustomDimensions02":_configureAvailableCustomDimensions02,"configureAvailableCustomDimensions03":_configureAvailableCustomDimensions03,"configureAvailableResourceCurrencies":_configureAvailableResourceCurrencies,"configureAvailableResourceItemTypes":_configureAvailableResourceItemTypes,"configureBuild":_configureBuild,"configureGameEngineVersion":_configureGameEngineVersion,"configureSdkGameEngineVersion":_configureSdkGameEngineVersion,"configureUserId":_configureUserId,"emscripten_asm_const_int_sync_on_main_thread":_emscripten_asm_const_int_sync_on_main_thread,"emscripten_cancel_main_loop":_emscripten_cancel_main_loop,"emscripten_clear_interval":_emscripten_clear_interval,"emscripten_exit_fullscreen":_emscripten_exit_fullscreen,"emscripten_exit_pointerlock":_emscripten_exit_pointerlock,"emscripten_get_canvas_element_size":_emscripten_get_canvas_element_size,"emscripten_get_fullscreen_status":_emscripten_get_fullscreen_status,"emscripten_get_gamepad_status":_emscripten_get_gamepad_status,"emscripten_get_heap_max":_emscripten_get_heap_max,"emscripten_get_now":_emscripten_get_now,"emscripten_get_now_res":_emscripten_get_now_res,"emscripten_get_num_gamepads":_emscripten_get_num_gamepads,"emscripten_html5_remove_all_event_listeners":_emscripten_html5_remove_all_event_listeners,"emscripten_is_webgl_context_lost":_emscripten_is_webgl_context_lost,"emscripten_log":_emscripten_log,"emscripten_memcpy_big":_emscripten_memcpy_big,"emscripten_request_fullscreen":_emscripten_request_fullscreen,"emscripten_request_pointerlock":_emscripten_request_pointerlock,"emscripten_resize_heap":_emscripten_resize_heap,"emscripten_sample_gamepad_data":_emscripten_sample_gamepad_data,"emscripten_set_blur_callback_on_thread":_emscripten_set_blur_callback_on_thread,"emscripten_set_canvas_element_size":_emscripten_set_canvas_element_size,"emscripten_set_focus_callback_on_thread":_emscripten_set_focus_callback_on_thread,"emscripten_set_fullscreenchange_callback_on_thread":_emscripten_set_fullscreenchange_callback_on_thread,"emscripten_set_gamepadconnected_callback_on_thread":_emscripten_set_gamepadconnected_callback_on_thread,"emscripten_set_gamepaddisconnected_callback_on_thread":_emscripten_set_gamepaddisconnected_callback_on_thread,"emscripten_set_interval":_emscripten_set_interval,"emscripten_set_keydown_callback_on_thread":_emscripten_set_keydown_callback_on_thread,"emscripten_set_keypress_callback_on_thread":_emscripten_set_keypress_callback_on_thread,"emscripten_set_keyup_callback_on_thread":_emscripten_set_keyup_callback_on_thread,"emscripten_set_main_loop":_emscripten_set_main_loop,"emscripten_set_main_loop_timing":_emscripten_set_main_loop_timing,"emscripten_set_mousedown_callback_on_thread":_emscripten_set_mousedown_callback_on_thread,"emscripten_set_mousemove_callback_on_thread":_emscripten_set_mousemove_callback_on_thread,"emscripten_set_mouseup_callback_on_thread":_emscripten_set_mouseup_callback_on_thread,"emscripten_set_pointerlockchange_callback_on_thread":_emscripten_set_pointerlockchange_callback_on_thread,"emscripten_set_touchcancel_callback_on_thread":_emscripten_set_touchcancel_callback_on_thread,"emscripten_set_touchend_callback_on_thread":_emscripten_set_touchend_callback_on_thread,"emscripten_set_touchmove_callback_on_thread":_emscripten_set_touchmove_callback_on_thread,"emscripten_set_touchstart_callback_on_thread":_emscripten_set_touchstart_callback_on_thread,"emscripten_set_wheel_callback_on_thread":_emscripten_set_wheel_callback_on_thread,"emscripten_webgl_create_context":_emscripten_webgl_create_context,"emscripten_webgl_destroy_context":_emscripten_webgl_destroy_context,"emscripten_webgl_enable_extension":_emscripten_webgl_enable_extension,"emscripten_webgl_get_current_context":_emscripten_webgl_get_current_context,"emscripten_webgl_init_context_attributes":_emscripten_webgl_init_context_attributes,"emscripten_webgl_make_context_current":_emscripten_webgl_make_context_current,"endSession":_endSession,"environ_get":_environ_get,"environ_sizes_get":_environ_sizes_get,"exit":_exit,"fd_close":_fd_close,"fd_fdstat_get":_fd_fdstat_get,"fd_read":_fd_read,"fd_seek":_fd_seek,"fd_write":_fd_write,"getABTestingId":_getABTestingId,"getABTestingVariantId":_getABTestingVariantId,"getRemoteConfigsContentAsString":_getRemoteConfigsContentAsString,"getRemoteConfigsValueAsString":_getRemoteConfigsValueAsString,"getTempRet0":_getTempRet0,"getaddrinfo":_getaddrinfo,"gethostbyaddr":_gethostbyaddr,"gethostbyname":_gethostbyname,"getnameinfo":_getnameinfo,"glActiveTexture":_glActiveTexture,"glAttachShader":_glAttachShader,"glBeginQuery":_glBeginQuery,"glBindAttribLocation":_glBindAttribLocation,"glBindBuffer":_glBindBuffer,"glBindBufferBase":_glBindBufferBase,"glBindBufferRange":_glBindBufferRange,"glBindFramebuffer":_glBindFramebuffer,"glBindRenderbuffer":_glBindRenderbuffer,"glBindSampler":_glBindSampler,"glBindTexture":_glBindTexture,"glBindVertexArray":_glBindVertexArray,"glBlendEquation":_glBlendEquation,"glBlendEquationSeparate":_glBlendEquationSeparate,"glBlendFuncSeparate":_glBlendFuncSeparate,"glBlitFramebuffer":_glBlitFramebuffer,"glBufferData":_glBufferData,"glBufferSubData":_glBufferSubData,"glCheckFramebufferStatus":_glCheckFramebufferStatus,"glClear":_glClear,"glClearBufferfi":_glClearBufferfi,"glClearBufferfv":_glClearBufferfv,"glClearBufferuiv":_glClearBufferuiv,"glClearColor":_glClearColor,"glClearDepthf":_glClearDepthf,"glClearStencil":_glClearStencil,"glClientWaitSync":_glClientWaitSync,"glColorMask":_glColorMask,"glCompileShader":_glCompileShader,"glCompressedTexImage2D":_glCompressedTexImage2D,"glCompressedTexImage3D":_glCompressedTexImage3D,"glCompressedTexSubImage2D":_glCompressedTexSubImage2D,"glCompressedTexSubImage3D":_glCompressedTexSubImage3D,"glCopyBufferSubData":_glCopyBufferSubData,"glCopyTexImage2D":_glCopyTexImage2D,"glCopyTexSubImage2D":_glCopyTexSubImage2D,"glCreateProgram":_glCreateProgram,"glCreateShader":_glCreateShader,"glCullFace":_glCullFace,"glDeleteBuffers":_glDeleteBuffers,"glDeleteFramebuffers":_glDeleteFramebuffers,"glDeleteProgram":_glDeleteProgram,"glDeleteQueries":_glDeleteQueries,"glDeleteRenderbuffers":_glDeleteRenderbuffers,"glDeleteSamplers":_glDeleteSamplers,"glDeleteShader":_glDeleteShader,"glDeleteSync":_glDeleteSync,"glDeleteTextures":_glDeleteTextures,"glDeleteVertexArrays":_glDeleteVertexArrays,"glDepthFunc":_glDepthFunc,"glDepthMask":_glDepthMask,"glDetachShader":_glDetachShader,"glDisable":_glDisable,"glDisableVertexAttribArray":_glDisableVertexAttribArray,"glDrawArrays":_glDrawArrays,"glDrawArraysInstanced":_glDrawArraysInstanced,"glDrawBuffers":_glDrawBuffers,"glDrawElements":_glDrawElements,"glDrawElementsInstanced":_glDrawElementsInstanced,"glEnable":_glEnable,"glEnableVertexAttribArray":_glEnableVertexAttribArray,"glEndQuery":_glEndQuery,"glFenceSync":_glFenceSync,"glFinish":_glFinish,"glFlush":_glFlush,"glFlushMappedBufferRange":_glFlushMappedBufferRange,"glFramebufferRenderbuffer":_glFramebufferRenderbuffer,"glFramebufferTexture2D":_glFramebufferTexture2D,"glFramebufferTextureLayer":_glFramebufferTextureLayer,"glFrontFace":_glFrontFace,"glGenBuffers":_glGenBuffers,"glGenFramebuffers":_glGenFramebuffers,"glGenQueries":_glGenQueries,"glGenRenderbuffers":_glGenRenderbuffers,"glGenSamplers":_glGenSamplers,"glGenTextures":_glGenTextures,"glGenVertexArrays":_glGenVertexArrays,"glGenerateMipmap":_glGenerateMipmap,"glGetActiveAttrib":_glGetActiveAttrib,"glGetActiveUniform":_glGetActiveUniform,"glGetActiveUniformBlockName":_glGetActiveUniformBlockName,"glGetActiveUniformBlockiv":_glGetActiveUniformBlockiv,"glGetActiveUniformsiv":_glGetActiveUniformsiv,"glGetAttribLocation":_glGetAttribLocation,"glGetBufferSubData":_glGetBufferSubData,"glGetError":_glGetError,"glGetFramebufferAttachmentParameteriv":_glGetFramebufferAttachmentParameteriv,"glGetIntegeri_v":_glGetIntegeri_v,"glGetIntegerv":_glGetIntegerv,"glGetInternalformativ":_glGetInternalformativ,"glGetProgramBinary":_glGetProgramBinary,"glGetProgramInfoLog":_glGetProgramInfoLog,"glGetProgramiv":_glGetProgramiv,"glGetQueryObjectuiv":_glGetQueryObjectuiv,"glGetQueryiv":_glGetQueryiv,"glGetRenderbufferParameteriv":_glGetRenderbufferParameteriv,"glGetShaderInfoLog":_glGetShaderInfoLog,"glGetShaderPrecisionFormat":_glGetShaderPrecisionFormat,"glGetShaderSource":_glGetShaderSource,"glGetShaderiv":_glGetShaderiv,"glGetString":_glGetString,"glGetStringi":_glGetStringi,"glGetTexParameteriv":_glGetTexParameteriv,"glGetUniformBlockIndex":_glGetUniformBlockIndex,"glGetUniformIndices":_glGetUniformIndices,"glGetUniformLocation":_glGetUniformLocation,"glGetUniformiv":_glGetUniformiv,"glGetVertexAttribiv":_glGetVertexAttribiv,"glInvalidateFramebuffer":_glInvalidateFramebuffer,"glIsEnabled":_glIsEnabled,"glIsVertexArray":_glIsVertexArray,"glLinkProgram":_glLinkProgram,"glMapBufferRange":_glMapBufferRange,"glPixelStorei":_glPixelStorei,"glPolygonOffset":_glPolygonOffset,"glProgramBinary":_glProgramBinary,"glProgramParameteri":_glProgramParameteri,"glReadBuffer":_glReadBuffer,"glReadPixels":_glReadPixels,"glRenderbufferStorage":_glRenderbufferStorage,"glRenderbufferStorageMultisample":_glRenderbufferStorageMultisample,"glSamplerParameteri":_glSamplerParameteri,"glScissor":_glScissor,"glShaderSource":_glShaderSource,"glStencilFuncSeparate":_glStencilFuncSeparate,"glStencilMask":_glStencilMask,"glStencilOpSeparate":_glStencilOpSeparate,"glTexImage2D":_glTexImage2D,"glTexImage3D":_glTexImage3D,"glTexParameterf":_glTexParameterf,"glTexParameteri":_glTexParameteri,"glTexParameteriv":_glTexParameteriv,"glTexStorage2D":_glTexStorage2D,"glTexStorage3D":_glTexStorage3D,"glTexSubImage2D":_glTexSubImage2D,"glTexSubImage3D":_glTexSubImage3D,"glUniform1fv":_glUniform1fv,"glUniform1i":_glUniform1i,"glUniform1iv":_glUniform1iv,"glUniform1uiv":_glUniform1uiv,"glUniform2fv":_glUniform2fv,"glUniform2iv":_glUniform2iv,"glUniform2uiv":_glUniform2uiv,"glUniform3fv":_glUniform3fv,"glUniform3iv":_glUniform3iv,"glUniform3uiv":_glUniform3uiv,"glUniform4fv":_glUniform4fv,"glUniform4iv":_glUniform4iv,"glUniform4uiv":_glUniform4uiv,"glUniformBlockBinding":_glUniformBlockBinding,"glUniformMatrix3fv":_glUniformMatrix3fv,"glUniformMatrix4fv":_glUniformMatrix4fv,"glUnmapBuffer":_glUnmapBuffer,"glUseProgram":_glUseProgram,"glValidateProgram":_glValidateProgram,"glVertexAttrib4f":_glVertexAttrib4f,"glVertexAttrib4fv":_glVertexAttrib4fv,"glVertexAttribIPointer":_glVertexAttribIPointer,"glVertexAttribPointer":_glVertexAttribPointer,"glViewport":_glViewport,"initialize":_initialize,"invoke_dddi":invoke_dddi,"invoke_ddiii":invoke_ddiii,"invoke_dii":invoke_dii,"invoke_diidi":invoke_diidi,"invoke_diii":invoke_diii,"invoke_diiii":invoke_diiii,"invoke_dji":invoke_dji,"invoke_fffi":invoke_fffi,"invoke_ffi":invoke_ffi,"invoke_fi":invoke_fi,"invoke_fii":invoke_fii,"invoke_fiifi":invoke_fiifi,"invoke_fiii":invoke_fiii,"invoke_fiiifi":invoke_fiiifi,"invoke_fiiii":invoke_fiiii,"invoke_fiji":invoke_fiji,"invoke_fijii":invoke_fijii,"invoke_i":invoke_i,"invoke_idi":invoke_idi,"invoke_ifi":invoke_ifi,"invoke_ii":invoke_ii,"invoke_iidi":invoke_iidi,"invoke_iiffi":invoke_iiffi,"invoke_iiffii":invoke_iiffii,"invoke_iifi":invoke_iifi,"invoke_iifii":invoke_iifii,"invoke_iifiii":invoke_iifiii,"invoke_iii":invoke_iii,"invoke_iiifi":invoke_iiifi,"invoke_iiifii":invoke_iiifii,"invoke_iiii":invoke_iiii,"invoke_iiiidii":invoke_iiiidii,"invoke_iiiifi":invoke_iiiifi,"invoke_iiiifii":invoke_iiiifii,"invoke_iiiii":invoke_iiiii,"invoke_iiiiii":invoke_iiiiii,"invoke_iiiiiii":invoke_iiiiiii,"invoke_iiiiiiii":invoke_iiiiiiii,"invoke_iiiiiiiii":invoke_iiiiiiiii,"invoke_iiiiiiiiii":invoke_iiiiiiiiii,"invoke_iiiiiiiiiii":invoke_iiiiiiiiiii,"invoke_iiiiiiiiiiii":invoke_iiiiiiiiiiii,"invoke_iiiiiiiiiji":invoke_iiiiiiiiiji,"invoke_iiiiij":invoke_iiiiij,"invoke_iiiijii":invoke_iiiijii,"invoke_iiiijjii":invoke_iiiijjii,"invoke_iiijii":invoke_iiijii,"invoke_iiijiii":invoke_iiijiii,"invoke_iij":invoke_iij,"invoke_iiji":invoke_iiji,"invoke_iijii":invoke_iijii,"invoke_iijiii":invoke_iijiii,"invoke_iijiiiiii":invoke_iijiiiiii,"invoke_iijji":invoke_iijji,"invoke_iijjiiiiii":invoke_iijjiiiiii,"invoke_iji":invoke_iji,"invoke_ijji":invoke_ijji,"invoke_j":invoke_j,"invoke_jdi":invoke_jdi,"invoke_ji":invoke_ji,"invoke_jii":invoke_jii,"invoke_jiii":invoke_jiii,"invoke_jiiii":invoke_jiiii,"invoke_jiiiii":invoke_jiiiii,"invoke_jiiiiiiiiii":invoke_jiiiiiiiiii,"invoke_jiiji":invoke_jiiji,"invoke_jiji":invoke_jiji,"invoke_jijii":invoke_jijii,"invoke_jji":invoke_jji,"invoke_jjii":invoke_jjii,"invoke_jjji":invoke_jjji,"invoke_v":invoke_v,"invoke_vi":invoke_vi,"invoke_vidd":invoke_vidd,"invoke_viddii":invoke_viddii,"invoke_vidi":invoke_vidi,"invoke_viffi":invoke_viffi,"invoke_viffii":invoke_viffii,"invoke_vifi":invoke_vifi,"invoke_vifii":invoke_vifii,"invoke_vii":invoke_vii,"invoke_viidi":invoke_viidi,"invoke_viidii":invoke_viidii,"invoke_viiffi":invoke_viiffi,"invoke_viifi":invoke_viifi,"invoke_viifii":invoke_viifii,"invoke_viii":invoke_viii,"invoke_viiifi":invoke_viiifi,"invoke_viiii":invoke_viiii,"invoke_viiiifi":invoke_viiiifi,"invoke_viiiii":invoke_viiiii,"invoke_viiiiii":invoke_viiiiii,"invoke_viiiiiifddfiii":invoke_viiiiiifddfiii,"invoke_viiiiiiffffiii":invoke_viiiiiiffffiii,"invoke_viiiiiifiifiii":invoke_viiiiiifiifiii,"invoke_viiiiiifjjfiii":invoke_viiiiiifjjfiii,"invoke_viiiiiii":invoke_viiiiiii,"invoke_viiiiiiii":invoke_viiiiiiii,"invoke_viiiiiiiii":invoke_viiiiiiiii,"invoke_viiiiiiiiii":invoke_viiiiiiiiii,"invoke_viiiiiiiiiiii":invoke_viiiiiiiiiiii,"invoke_viiiiiiiiiiiii":invoke_viiiiiiiiiiiii,"invoke_viiiijii":invoke_viiiijii,"invoke_viiiji":invoke_viiiji,"invoke_viiji":invoke_viiji,"invoke_viijii":invoke_viijii,"invoke_viijiiijiiii":invoke_viijiiijiiii,"invoke_viji":invoke_viji,"invoke_vijii":invoke_vijii,"invoke_vijiii":invoke_vijiii,"invoke_vijiiii":invoke_vijiiii,"invoke_vijjji":invoke_vijjji,"invoke_vji":invoke_vji,"invoke_vjiiiii":invoke_vjiiiii,"invoke_vjjjiiii":invoke_vjjjiiii,"isRemoteConfigsReady":_isRemoteConfigsReady,"llvm_eh_typeid_for":_llvm_eh_typeid_for,"setCustomDimension01":_setCustomDimension01,"setCustomDimension02":_setCustomDimension02,"setCustomDimension03":_setCustomDimension03,"setEnabledInfoLog":_setEnabledInfoLog,"setEnabledVerboseLog":_setEnabledVerboseLog,"setEventSubmission":_setEventSubmission,"setGlobalCustomEventFields":_setGlobalCustomEventFields,"setManualSessionHandling":_setManualSessionHandling,"setTempRet0":_setTempRet0,"startSession":_startSession,"strftime":_strftime};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["__wasm_call_ctors"]).apply(null,arguments)};var _getMemInfo=Module["_getMemInfo"]=function(){return(_getMemInfo=Module["_getMemInfo"]=Module["asm"]["getMemInfo"]).apply(null,arguments)};var _SendMessageFloat=Module["_SendMessageFloat"]=function(){return(_SendMessageFloat=Module["_SendMessageFloat"]=Module["asm"]["SendMessageFloat"]).apply(null,arguments)};var _SendMessageString=Module["_SendMessageString"]=function(){return(_SendMessageString=Module["_SendMessageString"]=Module["asm"]["SendMessageString"]).apply(null,arguments)};var _SendMessage=Module["_SendMessage"]=function(){return(_SendMessage=Module["_SendMessage"]=Module["asm"]["SendMessage"]).apply(null,arguments)};var _SetFullscreen=Module["_SetFullscreen"]=function(){return(_SetFullscreen=Module["_SetFullscreen"]=Module["asm"]["SetFullscreen"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["main"]).apply(null,arguments)};var ___errno_location=Module["___errno_location"]=function(){return(___errno_location=Module["___errno_location"]=Module["asm"]["__errno_location"]).apply(null,arguments)};var ___dl_seterr=Module["___dl_seterr"]=function(){return(___dl_seterr=Module["___dl_seterr"]=Module["asm"]["__dl_seterr"]).apply(null,arguments)};var _htonl=Module["_htonl"]=function(){return(_htonl=Module["_htonl"]=Module["asm"]["htonl"]).apply(null,arguments)};var _htons=Module["_htons"]=function(){return(_htons=Module["_htons"]=Module["asm"]["htons"]).apply(null,arguments)};var _ntohs=Module["_ntohs"]=function(){return(_ntohs=Module["_ntohs"]=Module["asm"]["ntohs"]).apply(null,arguments)};var _strlen=Module["_strlen"]=function(){return(_strlen=Module["_strlen"]=Module["asm"]["strlen"]).apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return(_malloc=Module["_malloc"]=Module["asm"]["malloc"]).apply(null,arguments)};var _free=Module["_free"]=function(){return(_free=Module["_free"]=Module["asm"]["free"]).apply(null,arguments)};var _emscripten_builtin_memalign=Module["_emscripten_builtin_memalign"]=function(){return(_emscripten_builtin_memalign=Module["_emscripten_builtin_memalign"]=Module["asm"]["emscripten_builtin_memalign"]).apply(null,arguments)};var _setThrew=Module["_setThrew"]=function(){return(_setThrew=Module["_setThrew"]=Module["asm"]["setThrew"]).apply(null,arguments)};var _saveSetjmp=Module["_saveSetjmp"]=function(){return(_saveSetjmp=Module["_saveSetjmp"]=Module["asm"]["saveSetjmp"]).apply(null,arguments)};var stackSave=Module["stackSave"]=function(){return(stackSave=Module["stackSave"]=Module["asm"]["stackSave"]).apply(null,arguments)};var stackRestore=Module["stackRestore"]=function(){return(stackRestore=Module["stackRestore"]=Module["asm"]["stackRestore"]).apply(null,arguments)};var stackAlloc=Module["stackAlloc"]=function(){return(stackAlloc=Module["stackAlloc"]=Module["asm"]["stackAlloc"]).apply(null,arguments)};var ___cxa_can_catch=Module["___cxa_can_catch"]=function(){return(___cxa_can_catch=Module["___cxa_can_catch"]=Module["asm"]["__cxa_can_catch"]).apply(null,arguments)};var ___cxa_is_pointer_type=Module["___cxa_is_pointer_type"]=function(){return(___cxa_is_pointer_type=Module["___cxa_is_pointer_type"]=Module["asm"]["__cxa_is_pointer_type"]).apply(null,arguments)};var dynCall_iidiiii=Module["dynCall_iidiiii"]=function(){return(dynCall_iidiiii=Module["dynCall_iidiiii"]=Module["asm"]["dynCall_iidiiii"]).apply(null,arguments)};var dynCall_vii=Module["dynCall_vii"]=function(){return(dynCall_vii=Module["dynCall_vii"]=Module["asm"]["dynCall_vii"]).apply(null,arguments)};var dynCall_iiii=Module["dynCall_iiii"]=function(){return(dynCall_iiii=Module["dynCall_iiii"]=Module["asm"]["dynCall_iiii"]).apply(null,arguments)};var dynCall_iii=Module["dynCall_iii"]=function(){return(dynCall_iii=Module["dynCall_iii"]=Module["asm"]["dynCall_iii"]).apply(null,arguments)};var dynCall_ii=Module["dynCall_ii"]=function(){return(dynCall_ii=Module["dynCall_ii"]=Module["asm"]["dynCall_ii"]).apply(null,arguments)};var dynCall_jiji=Module["dynCall_jiji"]=function(){return(dynCall_jiji=Module["dynCall_jiji"]=Module["asm"]["dynCall_jiji"]).apply(null,arguments)};var dynCall_vi=Module["dynCall_vi"]=function(){return(dynCall_vi=Module["dynCall_vi"]=Module["asm"]["dynCall_vi"]).apply(null,arguments)};var dynCall_viii=Module["dynCall_viii"]=function(){return(dynCall_viii=Module["dynCall_viii"]=Module["asm"]["dynCall_viii"]).apply(null,arguments)};var dynCall_iiiii=Module["dynCall_iiiii"]=function(){return(dynCall_iiiii=Module["dynCall_iiiii"]=Module["asm"]["dynCall_iiiii"]).apply(null,arguments)};var dynCall_v=Module["dynCall_v"]=function(){return(dynCall_v=Module["dynCall_v"]=Module["asm"]["dynCall_v"]).apply(null,arguments)};var dynCall_viiiiii=Module["dynCall_viiiiii"]=function(){return(dynCall_viiiiii=Module["dynCall_viiiiii"]=Module["asm"]["dynCall_viiiiii"]).apply(null,arguments)};var dynCall_viiiii=Module["dynCall_viiiii"]=function(){return(dynCall_viiiii=Module["dynCall_viiiii"]=Module["asm"]["dynCall_viiiii"]).apply(null,arguments)};var dynCall_viiii=Module["dynCall_viiii"]=function(){return(dynCall_viiii=Module["dynCall_viiii"]=Module["asm"]["dynCall_viiii"]).apply(null,arguments)};var dynCall_iiiiii=Module["dynCall_iiiiii"]=function(){return(dynCall_iiiiii=Module["dynCall_iiiiii"]=Module["asm"]["dynCall_iiiiii"]).apply(null,arguments)};var dynCall_i=Module["dynCall_i"]=function(){return(dynCall_i=Module["dynCall_i"]=Module["asm"]["dynCall_i"]).apply(null,arguments)};var dynCall_iiiiiiii=Module["dynCall_iiiiiiii"]=function(){return(dynCall_iiiiiiii=Module["dynCall_iiiiiiii"]=Module["asm"]["dynCall_iiiiiiii"]).apply(null,arguments)};var dynCall_iiijiii=Module["dynCall_iiijiii"]=function(){return(dynCall_iiijiii=Module["dynCall_iiijiii"]=Module["asm"]["dynCall_iiijiii"]).apply(null,arguments)};var dynCall_iij=Module["dynCall_iij"]=function(){return(dynCall_iij=Module["dynCall_iij"]=Module["asm"]["dynCall_iij"]).apply(null,arguments)};var dynCall_iiiiiii=Module["dynCall_iiiiiii"]=function(){return(dynCall_iiiiiii=Module["dynCall_iiiiiii"]=Module["asm"]["dynCall_iiiiiii"]).apply(null,arguments)};var dynCall_jii=Module["dynCall_jii"]=function(){return(dynCall_jii=Module["dynCall_jii"]=Module["asm"]["dynCall_jii"]).apply(null,arguments)};var dynCall_viiiiiiii=Module["dynCall_viiiiiiii"]=function(){return(dynCall_viiiiiiii=Module["dynCall_viiiiiiii"]=Module["asm"]["dynCall_viiiiiiii"]).apply(null,arguments)};var dynCall_iiiijii=Module["dynCall_iiiijii"]=function(){return(dynCall_iiiijii=Module["dynCall_iiiijii"]=Module["asm"]["dynCall_iiiijii"]).apply(null,arguments)};var dynCall_iiiidii=Module["dynCall_iiiidii"]=function(){return(dynCall_iiiidii=Module["dynCall_iiiidii"]=Module["asm"]["dynCall_iiiidii"]).apply(null,arguments)};var dynCall_iiiifii=Module["dynCall_iiiifii"]=function(){return(dynCall_iiiifii=Module["dynCall_iiiifii"]=Module["asm"]["dynCall_iiiifii"]).apply(null,arguments)};var dynCall_iiijii=Module["dynCall_iiijii"]=function(){return(dynCall_iiijii=Module["dynCall_iiijii"]=Module["asm"]["dynCall_iiijii"]).apply(null,arguments)};var dynCall_viiji=Module["dynCall_viiji"]=function(){return(dynCall_viiji=Module["dynCall_viiji"]=Module["asm"]["dynCall_viiji"]).apply(null,arguments)};var dynCall_iiifii=Module["dynCall_iiifii"]=function(){return(dynCall_iiifii=Module["dynCall_iiifii"]=Module["asm"]["dynCall_iiifii"]).apply(null,arguments)};var dynCall_viifi=Module["dynCall_viifi"]=function(){return(dynCall_viifi=Module["dynCall_viifi"]=Module["asm"]["dynCall_viifi"]).apply(null,arguments)};var dynCall_j=Module["dynCall_j"]=function(){return(dynCall_j=Module["dynCall_j"]=Module["asm"]["dynCall_j"]).apply(null,arguments)};var dynCall_ji=Module["dynCall_ji"]=function(){return(dynCall_ji=Module["dynCall_ji"]=Module["asm"]["dynCall_ji"]).apply(null,arguments)};var dynCall_viji=Module["dynCall_viji"]=function(){return(dynCall_viji=Module["dynCall_viji"]=Module["asm"]["dynCall_viji"]).apply(null,arguments)};var dynCall_viiffi=Module["dynCall_viiffi"]=function(){return(dynCall_viiffi=Module["dynCall_viiffi"]=Module["asm"]["dynCall_viiffi"]).apply(null,arguments)};var dynCall_vidi=Module["dynCall_vidi"]=function(){return(dynCall_vidi=Module["dynCall_vidi"]=Module["asm"]["dynCall_vidi"]).apply(null,arguments)};var dynCall_viidi=Module["dynCall_viidi"]=function(){return(dynCall_viidi=Module["dynCall_viidi"]=Module["asm"]["dynCall_viidi"]).apply(null,arguments)};var dynCall_viiiifii=Module["dynCall_viiiifii"]=function(){return(dynCall_viiiifii=Module["dynCall_viiiifii"]=Module["asm"]["dynCall_viiiifii"]).apply(null,arguments)};var dynCall_vijiii=Module["dynCall_vijiii"]=function(){return(dynCall_vijiii=Module["dynCall_vijiii"]=Module["asm"]["dynCall_vijiii"]).apply(null,arguments)};var dynCall_vifi=Module["dynCall_vifi"]=function(){return(dynCall_vifi=Module["dynCall_vifi"]=Module["asm"]["dynCall_vifi"]).apply(null,arguments)};var dynCall_jdi=Module["dynCall_jdi"]=function(){return(dynCall_jdi=Module["dynCall_jdi"]=Module["asm"]["dynCall_jdi"]).apply(null,arguments)};var dynCall_jiiii=Module["dynCall_jiiii"]=function(){return(dynCall_jiiii=Module["dynCall_jiiii"]=Module["asm"]["dynCall_jiiii"]).apply(null,arguments)};var dynCall_fiiii=Module["dynCall_fiiii"]=function(){return(dynCall_fiiii=Module["dynCall_fiiii"]=Module["asm"]["dynCall_fiiii"]).apply(null,arguments)};var dynCall_diiii=Module["dynCall_diiii"]=function(){return(dynCall_diiii=Module["dynCall_diiii"]=Module["asm"]["dynCall_diiii"]).apply(null,arguments)};var dynCall_jji=Module["dynCall_jji"]=function(){return(dynCall_jji=Module["dynCall_jji"]=Module["asm"]["dynCall_jji"]).apply(null,arguments)};var dynCall_iiffi=Module["dynCall_iiffi"]=function(){return(dynCall_iiffi=Module["dynCall_iiffi"]=Module["asm"]["dynCall_iiffi"]).apply(null,arguments)};var dynCall_fii=Module["dynCall_fii"]=function(){return(dynCall_fii=Module["dynCall_fii"]=Module["asm"]["dynCall_fii"]).apply(null,arguments)};var dynCall_vijiiii=Module["dynCall_vijiiii"]=function(){return(dynCall_vijiiii=Module["dynCall_vijiiii"]=Module["asm"]["dynCall_vijiiii"]).apply(null,arguments)};var dynCall_fi=Module["dynCall_fi"]=function(){return(dynCall_fi=Module["dynCall_fi"]=Module["asm"]["dynCall_fi"]).apply(null,arguments)};var dynCall_iifii=Module["dynCall_iifii"]=function(){return(dynCall_iifii=Module["dynCall_iifii"]=Module["asm"]["dynCall_iifii"]).apply(null,arguments)};var dynCall_iiffii=Module["dynCall_iiffii"]=function(){return(dynCall_iiffii=Module["dynCall_iiffii"]=Module["asm"]["dynCall_iiffii"]).apply(null,arguments)};var dynCall_viiifi=Module["dynCall_viiifi"]=function(){return(dynCall_viiifi=Module["dynCall_viiifi"]=Module["asm"]["dynCall_viiifi"]).apply(null,arguments)};var dynCall_diii=Module["dynCall_diii"]=function(){return(dynCall_diii=Module["dynCall_diii"]=Module["asm"]["dynCall_diii"]).apply(null,arguments)};var dynCall_dii=Module["dynCall_dii"]=function(){return(dynCall_dii=Module["dynCall_dii"]=Module["asm"]["dynCall_dii"]).apply(null,arguments)};var dynCall_fiii=Module["dynCall_fiii"]=function(){return(dynCall_fiii=Module["dynCall_fiii"]=Module["asm"]["dynCall_fiii"]).apply(null,arguments)};var dynCall_jiii=Module["dynCall_jiii"]=function(){return(dynCall_jiii=Module["dynCall_jiii"]=Module["asm"]["dynCall_jiii"]).apply(null,arguments)};var dynCall_viiiji=Module["dynCall_viiiji"]=function(){return(dynCall_viiiji=Module["dynCall_viiiji"]=Module["asm"]["dynCall_viiiji"]).apply(null,arguments)};var dynCall_ijji=Module["dynCall_ijji"]=function(){return(dynCall_ijji=Module["dynCall_ijji"]=Module["asm"]["dynCall_ijji"]).apply(null,arguments)};var dynCall_iifi=Module["dynCall_iifi"]=function(){return(dynCall_iifi=Module["dynCall_iifi"]=Module["asm"]["dynCall_iifi"]).apply(null,arguments)};var dynCall_viiiiiii=Module["dynCall_viiiiiii"]=function(){return(dynCall_viiiiiii=Module["dynCall_viiiiiii"]=Module["asm"]["dynCall_viiiiiii"]).apply(null,arguments)};var dynCall_viiiiiiiii=Module["dynCall_viiiiiiiii"]=function(){return(dynCall_viiiiiiiii=Module["dynCall_viiiiiiiii"]=Module["asm"]["dynCall_viiiiiiiii"]).apply(null,arguments)};var dynCall_viiiiiiiiii=Module["dynCall_viiiiiiiiii"]=function(){return(dynCall_viiiiiiiiii=Module["dynCall_viiiiiiiiii"]=Module["asm"]["dynCall_viiiiiiiiii"]).apply(null,arguments)};var dynCall_iiiifi=Module["dynCall_iiiifi"]=function(){return(dynCall_iiiifi=Module["dynCall_iiiifi"]=Module["asm"]["dynCall_iiiifi"]).apply(null,arguments)};var dynCall_iiiiiiiiii=Module["dynCall_iiiiiiiiii"]=function(){return(dynCall_iiiiiiiiii=Module["dynCall_iiiiiiiiii"]=Module["asm"]["dynCall_iiiiiiiiii"]).apply(null,arguments)};var dynCall_ifi=Module["dynCall_ifi"]=function(){return(dynCall_ifi=Module["dynCall_ifi"]=Module["asm"]["dynCall_ifi"]).apply(null,arguments)};var dynCall_idi=Module["dynCall_idi"]=function(){return(dynCall_idi=Module["dynCall_idi"]=Module["asm"]["dynCall_idi"]).apply(null,arguments)};var dynCall_iiiiji=Module["dynCall_iiiiji"]=function(){return(dynCall_iiiiji=Module["dynCall_iiiiji"]=Module["asm"]["dynCall_iiiiji"]).apply(null,arguments)};var dynCall_viiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiii"]=function(){return(dynCall_viiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiii"]=Module["asm"]["dynCall_viiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_fffi=Module["dynCall_fffi"]=function(){return(dynCall_fffi=Module["dynCall_fffi"]=Module["asm"]["dynCall_fffi"]).apply(null,arguments)};var dynCall_jjji=Module["dynCall_jjji"]=function(){return(dynCall_jjji=Module["dynCall_jjji"]=Module["asm"]["dynCall_jjji"]).apply(null,arguments)};var dynCall_dddi=Module["dynCall_dddi"]=function(){return(dynCall_dddi=Module["dynCall_dddi"]=Module["asm"]["dynCall_dddi"]).apply(null,arguments)};var dynCall_iidi=Module["dynCall_iidi"]=function(){return(dynCall_iidi=Module["dynCall_iidi"]=Module["asm"]["dynCall_iidi"]).apply(null,arguments)};var dynCall_viifii=Module["dynCall_viifii"]=function(){return(dynCall_viifii=Module["dynCall_viifii"]=Module["asm"]["dynCall_viifii"]).apply(null,arguments)};var dynCall_vifii=Module["dynCall_vifii"]=function(){return(dynCall_vifii=Module["dynCall_vifii"]=Module["asm"]["dynCall_vifii"]).apply(null,arguments)};var dynCall_iiiiiiiiiji=Module["dynCall_iiiiiiiiiji"]=function(){return(dynCall_iiiiiiiiiji=Module["dynCall_iiiiiiiiiji"]=Module["asm"]["dynCall_iiiiiiiiiji"]).apply(null,arguments)};var dynCall_vji=Module["dynCall_vji"]=function(){return(dynCall_vji=Module["dynCall_vji"]=Module["asm"]["dynCall_vji"]).apply(null,arguments)};var dynCall_iiji=Module["dynCall_iiji"]=function(){return(dynCall_iiji=Module["dynCall_iiji"]=Module["asm"]["dynCall_iiji"]).apply(null,arguments)};var dynCall_iijiii=Module["dynCall_iijiii"]=function(){return(dynCall_iijiii=Module["dynCall_iijiii"]=Module["asm"]["dynCall_iijiii"]).apply(null,arguments)};var dynCall_vijjji=Module["dynCall_vijjji"]=function(){return(dynCall_vijjji=Module["dynCall_vijjji"]=Module["asm"]["dynCall_vijjji"]).apply(null,arguments)};var dynCall_iiiiiiiii=Module["dynCall_iiiiiiiii"]=function(){return(dynCall_iiiiiiiii=Module["dynCall_iiiiiiiii"]=Module["asm"]["dynCall_iiiiiiiii"]).apply(null,arguments)};var dynCall_iiiiij=Module["dynCall_iiiiij"]=function(){return(dynCall_iiiiij=Module["dynCall_iiiiij"]=Module["asm"]["dynCall_iiiiij"]).apply(null,arguments)};var dynCall_viijiiijiiii=Module["dynCall_viijiiijiiii"]=function(){return(dynCall_viijiiijiiii=Module["dynCall_viijiiijiiii"]=Module["asm"]["dynCall_viijiiijiiii"]).apply(null,arguments)};var dynCall_viiiiiiiiiii=Module["dynCall_viiiiiiiiiii"]=function(){return(dynCall_viiiiiiiiiii=Module["dynCall_viiiiiiiiiii"]=Module["asm"]["dynCall_viiiiiiiiiii"]).apply(null,arguments)};var dynCall_iijiiii=Module["dynCall_iijiiii"]=function(){return(dynCall_iijiiii=Module["dynCall_iijiiii"]=Module["asm"]["dynCall_iijiiii"]).apply(null,arguments)};var dynCall_jijiii=Module["dynCall_jijiii"]=function(){return(dynCall_jijiii=Module["dynCall_jijiii"]=Module["asm"]["dynCall_jijiii"]).apply(null,arguments)};var dynCall_viijii=Module["dynCall_viijii"]=function(){return(dynCall_viijii=Module["dynCall_viijii"]=Module["asm"]["dynCall_viijii"]).apply(null,arguments)};var dynCall_iijiiiiii=Module["dynCall_iijiiiiii"]=function(){return(dynCall_iijiiiiii=Module["dynCall_iijiiiiii"]=Module["asm"]["dynCall_iijiiiiii"]).apply(null,arguments)};var dynCall_iijjiiiiii=Module["dynCall_iijjiiiiii"]=function(){return(dynCall_iijjiiiiii=Module["dynCall_iijjiiiiii"]=Module["asm"]["dynCall_iijjiiiiii"]).apply(null,arguments)};var dynCall_iiiijjii=Module["dynCall_iiiijjii"]=function(){return(dynCall_iiiijjii=Module["dynCall_iiiijjii"]=Module["asm"]["dynCall_iiiijjii"]).apply(null,arguments)};var dynCall_iijii=Module["dynCall_iijii"]=function(){return(dynCall_iijii=Module["dynCall_iijii"]=Module["asm"]["dynCall_iijii"]).apply(null,arguments)};var dynCall_iiifi=Module["dynCall_iiifi"]=function(){return(dynCall_iiifi=Module["dynCall_iiifi"]=Module["asm"]["dynCall_iiifi"]).apply(null,arguments)};var dynCall_ffi=Module["dynCall_ffi"]=function(){return(dynCall_ffi=Module["dynCall_ffi"]=Module["asm"]["dynCall_ffi"]).apply(null,arguments)};var dynCall_fiiifi=Module["dynCall_fiiifi"]=function(){return(dynCall_fiiifi=Module["dynCall_fiiifi"]=Module["asm"]["dynCall_fiiifi"]).apply(null,arguments)};var dynCall_vijii=Module["dynCall_vijii"]=function(){return(dynCall_vijii=Module["dynCall_vijii"]=Module["asm"]["dynCall_vijii"]).apply(null,arguments)};var dynCall_iifiii=Module["dynCall_iifiii"]=function(){return(dynCall_iifiii=Module["dynCall_iifiii"]=Module["asm"]["dynCall_iifiii"]).apply(null,arguments)};var dynCall_viidii=Module["dynCall_viidii"]=function(){return(dynCall_viidii=Module["dynCall_viidii"]=Module["asm"]["dynCall_viidii"]).apply(null,arguments)};var dynCall_fiifii=Module["dynCall_fiifii"]=function(){return(dynCall_fiifii=Module["dynCall_fiifii"]=Module["asm"]["dynCall_fiifii"]).apply(null,arguments)};var dynCall_jjii=Module["dynCall_jjii"]=function(){return(dynCall_jjii=Module["dynCall_jjii"]=Module["asm"]["dynCall_jjii"]).apply(null,arguments)};var dynCall_jijii=Module["dynCall_jijii"]=function(){return(dynCall_jijii=Module["dynCall_jijii"]=Module["asm"]["dynCall_jijii"]).apply(null,arguments)};var dynCall_dji=Module["dynCall_dji"]=function(){return(dynCall_dji=Module["dynCall_dji"]=Module["asm"]["dynCall_dji"]).apply(null,arguments)};var dynCall_iji=Module["dynCall_iji"]=function(){return(dynCall_iji=Module["dynCall_iji"]=Module["asm"]["dynCall_iji"]).apply(null,arguments)};var dynCall_ddiii=Module["dynCall_ddiii"]=function(){return(dynCall_ddiii=Module["dynCall_ddiii"]=Module["asm"]["dynCall_ddiii"]).apply(null,arguments)};var dynCall_fiffffi=Module["dynCall_fiffffi"]=function(){return(dynCall_fiffffi=Module["dynCall_fiffffi"]=Module["asm"]["dynCall_fiffffi"]).apply(null,arguments)};var dynCall_iiiiiiiiiiii=Module["dynCall_iiiiiiiiiiii"]=function(){return(dynCall_iiiiiiiiiiii=Module["dynCall_iiiiiiiiiiii"]=Module["asm"]["dynCall_iiiiiiiiiiii"]).apply(null,arguments)};var dynCall_fiiffi=Module["dynCall_fiiffi"]=function(){return(dynCall_fiiffi=Module["dynCall_fiiffi"]=Module["asm"]["dynCall_fiiffi"]).apply(null,arguments)};var dynCall_viiififii=Module["dynCall_viiififii"]=function(){return(dynCall_viiififii=Module["dynCall_viiififii"]=Module["asm"]["dynCall_viiififii"]).apply(null,arguments)};var dynCall_viiiiiiiiiiii=Module["dynCall_viiiiiiiiiiii"]=function(){return(dynCall_viiiiiiiiiiii=Module["dynCall_viiiiiiiiiiii"]=Module["asm"]["dynCall_viiiiiiiiiiii"]).apply(null,arguments)};var dynCall_viiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiii"]=function(){return(dynCall_viiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiii"]=Module["asm"]["dynCall_viiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_viiiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiiii"]=function(){return(dynCall_viiiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiiii"]=Module["asm"]["dynCall_viiiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_viiiiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiiiii"]=function(){return(dynCall_viiiiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiiiii"]=Module["asm"]["dynCall_viiiiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_viiiiiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiiiiii"]=function(){return(dynCall_viiiiiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiiiiii"]=Module["asm"]["dynCall_viiiiiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_viiiiiiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiiiiiii"]=function(){return(dynCall_viiiiiiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiiiiiii"]=Module["asm"]["dynCall_viiiiiiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_viiiijii=Module["dynCall_viiiijii"]=function(){return(dynCall_viiiijii=Module["dynCall_viiiijii"]=Module["asm"]["dynCall_viiiijii"]).apply(null,arguments)};var dynCall_iijji=Module["dynCall_iijji"]=function(){return(dynCall_iijji=Module["dynCall_iijji"]=Module["asm"]["dynCall_iijji"]).apply(null,arguments)};var dynCall_iiddi=Module["dynCall_iiddi"]=function(){return(dynCall_iiddi=Module["dynCall_iiddi"]=Module["asm"]["dynCall_iiddi"]).apply(null,arguments)};var dynCall_viiiifi=Module["dynCall_viiiifi"]=function(){return(dynCall_viiiifi=Module["dynCall_viiiifi"]=Module["asm"]["dynCall_viiiifi"]).apply(null,arguments)};var dynCall_viiiiiiiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiiiiiiii"]=function(){return(dynCall_viiiiiiiiiiiiiiiiiii=Module["dynCall_viiiiiiiiiiiiiiiiiii"]=Module["asm"]["dynCall_viiiiiiiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_didi=Module["dynCall_didi"]=function(){return(dynCall_didi=Module["dynCall_didi"]=Module["asm"]["dynCall_didi"]).apply(null,arguments)};var dynCall_fiji=Module["dynCall_fiji"]=function(){return(dynCall_fiji=Module["dynCall_fiji"]=Module["asm"]["dynCall_fiji"]).apply(null,arguments)};var dynCall_fifi=Module["dynCall_fifi"]=function(){return(dynCall_fifi=Module["dynCall_fifi"]=Module["asm"]["dynCall_fifi"]).apply(null,arguments)};var dynCall_fijii=Module["dynCall_fijii"]=function(){return(dynCall_fijii=Module["dynCall_fijii"]=Module["asm"]["dynCall_fijii"]).apply(null,arguments)};var dynCall_diidi=Module["dynCall_diidi"]=function(){return(dynCall_diidi=Module["dynCall_diidi"]=Module["asm"]["dynCall_diidi"]).apply(null,arguments)};var dynCall_jiiji=Module["dynCall_jiiji"]=function(){return(dynCall_jiiji=Module["dynCall_jiiji"]=Module["asm"]["dynCall_jiiji"]).apply(null,arguments)};var dynCall_fiifi=Module["dynCall_fiifi"]=function(){return(dynCall_fiifi=Module["dynCall_fiifi"]=Module["asm"]["dynCall_fiifi"]).apply(null,arguments)};var dynCall_vjjjiiii=Module["dynCall_vjjjiiii"]=function(){return(dynCall_vjjjiiii=Module["dynCall_vjjjiiii"]=Module["asm"]["dynCall_vjjjiiii"]).apply(null,arguments)};var dynCall_vjiiiii=Module["dynCall_vjiiiii"]=function(){return(dynCall_vjiiiii=Module["dynCall_vjiiiii"]=Module["asm"]["dynCall_vjiiiii"]).apply(null,arguments)};var dynCall_jiiiii=Module["dynCall_jiiiii"]=function(){return(dynCall_jiiiii=Module["dynCall_jiiiii"]=Module["asm"]["dynCall_jiiiii"]).apply(null,arguments)};var dynCall_viddi=Module["dynCall_viddi"]=function(){return(dynCall_viddi=Module["dynCall_viddi"]=Module["asm"]["dynCall_viddi"]).apply(null,arguments)};var dynCall_vifiii=Module["dynCall_vifiii"]=function(){return(dynCall_vifiii=Module["dynCall_vifiii"]=Module["asm"]["dynCall_vifiii"]).apply(null,arguments)};var dynCall_viifiii=Module["dynCall_viifiii"]=function(){return(dynCall_viifiii=Module["dynCall_viifiii"]=Module["asm"]["dynCall_viifiii"]).apply(null,arguments)};var dynCall_viifiiiii=Module["dynCall_viifiiiii"]=function(){return(dynCall_viifiiiii=Module["dynCall_viifiiiii"]=Module["asm"]["dynCall_viifiiiii"]).apply(null,arguments)};var dynCall_viiiiji=Module["dynCall_viiiiji"]=function(){return(dynCall_viiiiji=Module["dynCall_viiiiji"]=Module["asm"]["dynCall_viiiiji"]).apply(null,arguments)};var dynCall_viiiijiii=Module["dynCall_viiiijiii"]=function(){return(dynCall_viiiijiii=Module["dynCall_viiiijiii"]=Module["asm"]["dynCall_viiiijiii"]).apply(null,arguments)};var dynCall_iiifiii=Module["dynCall_iiifiii"]=function(){return(dynCall_iiifiii=Module["dynCall_iiifiii"]=Module["asm"]["dynCall_iiifiii"]).apply(null,arguments)};var dynCall_ijjiiii=Module["dynCall_ijjiiii"]=function(){return(dynCall_ijjiiii=Module["dynCall_ijjiiii"]=Module["asm"]["dynCall_ijjiiii"]).apply(null,arguments)};var dynCall_vfi=Module["dynCall_vfi"]=function(){return(dynCall_vfi=Module["dynCall_vfi"]=Module["asm"]["dynCall_vfi"]).apply(null,arguments)};var dynCall_viiiiifffii=Module["dynCall_viiiiifffii"]=function(){return(dynCall_viiiiifffii=Module["dynCall_viiiiifffii"]=Module["asm"]["dynCall_viiiiifffii"]).apply(null,arguments)};var dynCall_viifffi=Module["dynCall_viifffi"]=function(){return(dynCall_viifffi=Module["dynCall_viifffi"]=Module["asm"]["dynCall_viifffi"]).apply(null,arguments)};var dynCall_viffi=Module["dynCall_viffi"]=function(){return(dynCall_viffi=Module["dynCall_viffi"]=Module["asm"]["dynCall_viffi"]).apply(null,arguments)};var dynCall_iifffi=Module["dynCall_iifffi"]=function(){return(dynCall_iifffi=Module["dynCall_iifffi"]=Module["asm"]["dynCall_iifffi"]).apply(null,arguments)};var dynCall_viiiiiffii=Module["dynCall_viiiiiffii"]=function(){return(dynCall_viiiiiffii=Module["dynCall_viiiiiffii"]=Module["asm"]["dynCall_viiiiiffii"]).apply(null,arguments)};var dynCall_iiiiiiffiii=Module["dynCall_iiiiiiffiii"]=function(){return(dynCall_iiiiiiffiii=Module["dynCall_iiiiiiffiii"]=Module["asm"]["dynCall_iiiiiiffiii"]).apply(null,arguments)};var dynCall_iiiifffi=Module["dynCall_iiiifffi"]=function(){return(dynCall_iiiifffi=Module["dynCall_iiiifffi"]=Module["asm"]["dynCall_iiiifffi"]).apply(null,arguments)};var dynCall_viiifii=Module["dynCall_viiifii"]=function(){return(dynCall_viiifii=Module["dynCall_viiifii"]=Module["asm"]["dynCall_viiifii"]).apply(null,arguments)};var dynCall_viiiiifi=Module["dynCall_viiiiifi"]=function(){return(dynCall_viiiiifi=Module["dynCall_viiiiifi"]=Module["asm"]["dynCall_viiiiifi"]).apply(null,arguments)};var dynCall_ffffffffi=Module["dynCall_ffffffffi"]=function(){return(dynCall_ffffffffi=Module["dynCall_ffffffffi"]=Module["asm"]["dynCall_ffffffffi"]).apply(null,arguments)};var dynCall_viiiifiiiifi=Module["dynCall_viiiifiiiifi"]=function(){return(dynCall_viiiifiiiifi=Module["dynCall_viiiifiiiifi"]=Module["asm"]["dynCall_viiiifiiiifi"]).apply(null,arguments)};var dynCall_ddi=Module["dynCall_ddi"]=function(){return(dynCall_ddi=Module["dynCall_ddi"]=Module["asm"]["dynCall_ddi"]).apply(null,arguments)};var dynCall_ffffi=Module["dynCall_ffffi"]=function(){return(dynCall_ffffi=Module["dynCall_ffffi"]=Module["asm"]["dynCall_ffffi"]).apply(null,arguments)};var dynCall_iiiiiffi=Module["dynCall_iiiiiffi"]=function(){return(dynCall_iiiiiffi=Module["dynCall_iiiiiffi"]=Module["asm"]["dynCall_iiiiiffi"]).apply(null,arguments)};var dynCall_viiiiiiifiii=Module["dynCall_viiiiiiifiii"]=function(){return(dynCall_viiiiiiifiii=Module["dynCall_viiiiiiifiii"]=Module["asm"]["dynCall_viiiiiiifiii"]).apply(null,arguments)};var dynCall_fiiifii=Module["dynCall_fiiifii"]=function(){return(dynCall_fiiifii=Module["dynCall_fiiifii"]=Module["asm"]["dynCall_fiiifii"]).apply(null,arguments)};var dynCall_fifii=Module["dynCall_fifii"]=function(){return(dynCall_fifii=Module["dynCall_fifii"]=Module["asm"]["dynCall_fifii"]).apply(null,arguments)};var dynCall_fiffi=Module["dynCall_fiffi"]=function(){return(dynCall_fiffi=Module["dynCall_fiffi"]=Module["asm"]["dynCall_fiffi"]).apply(null,arguments)};var dynCall_iiiffii=Module["dynCall_iiiffii"]=function(){return(dynCall_iiiffii=Module["dynCall_iiiffii"]=Module["asm"]["dynCall_iiiffii"]).apply(null,arguments)};var dynCall_fifiii=Module["dynCall_fifiii"]=function(){return(dynCall_fifiii=Module["dynCall_fifiii"]=Module["asm"]["dynCall_fifiii"]).apply(null,arguments)};var dynCall_viiiiffii=Module["dynCall_viiiiffii"]=function(){return(dynCall_viiiiffii=Module["dynCall_viiiiffii"]=Module["asm"]["dynCall_viiiiffii"]).apply(null,arguments)};var dynCall_viiiiifffi=Module["dynCall_viiiiifffi"]=function(){return(dynCall_viiiiifffi=Module["dynCall_viiiiifffi"]=Module["asm"]["dynCall_viiiiifffi"]).apply(null,arguments)};var dynCall_iiiiifi=Module["dynCall_iiiiifi"]=function(){return(dynCall_iiiiifi=Module["dynCall_iiiiifi"]=Module["asm"]["dynCall_iiiiifi"]).apply(null,arguments)};var dynCall_viiifffi=Module["dynCall_viiifffi"]=function(){return(dynCall_viiifffi=Module["dynCall_viiifffi"]=Module["asm"]["dynCall_viiifffi"]).apply(null,arguments)};var dynCall_viiiffi=Module["dynCall_viiiffi"]=function(){return(dynCall_viiiffi=Module["dynCall_viiiffi"]=Module["asm"]["dynCall_viiiffi"]).apply(null,arguments)};var dynCall_fifiiiii=Module["dynCall_fifiiiii"]=function(){return(dynCall_fifiiiii=Module["dynCall_fifiiiii"]=Module["asm"]["dynCall_fifiiiii"]).apply(null,arguments)};var dynCall_iiifiiii=Module["dynCall_iiifiiii"]=function(){return(dynCall_iiifiiii=Module["dynCall_iiifiiii"]=Module["asm"]["dynCall_iiifiiii"]).apply(null,arguments)};var dynCall_vifiiiii=Module["dynCall_vifiiiii"]=function(){return(dynCall_vifiiiii=Module["dynCall_vifiiiii"]=Module["asm"]["dynCall_vifiiiii"]).apply(null,arguments)};var dynCall_viffiifffiii=Module["dynCall_viffiifffiii"]=function(){return(dynCall_viffiifffiii=Module["dynCall_viffiifffiii"]=Module["asm"]["dynCall_viffiifffiii"]).apply(null,arguments)};var dynCall_ffffffi=Module["dynCall_ffffffi"]=function(){return(dynCall_ffffffi=Module["dynCall_ffffffi"]=Module["asm"]["dynCall_ffffffi"]).apply(null,arguments)};var dynCall_viiiiiifi=Module["dynCall_viiiiiifi"]=function(){return(dynCall_viiiiiifi=Module["dynCall_viiiiiifi"]=Module["asm"]["dynCall_viiiiiifi"]).apply(null,arguments)};var dynCall_viiiiffi=Module["dynCall_viiiiffi"]=function(){return(dynCall_viiiiffi=Module["dynCall_viiiiffi"]=Module["asm"]["dynCall_viiiiffi"]).apply(null,arguments)};var dynCall_fiiiiii=Module["dynCall_fiiiiii"]=function(){return(dynCall_fiiiiii=Module["dynCall_fiiiiii"]=Module["asm"]["dynCall_fiiiiii"]).apply(null,arguments)};var dynCall_fifffi=Module["dynCall_fifffi"]=function(){return(dynCall_fifffi=Module["dynCall_fifffi"]=Module["asm"]["dynCall_fifffi"]).apply(null,arguments)};var dynCall_viffiiiii=Module["dynCall_viffiiiii"]=function(){return(dynCall_viffiiiii=Module["dynCall_viffiiiii"]=Module["asm"]["dynCall_viffiiiii"]).apply(null,arguments)};var dynCall_vifffffi=Module["dynCall_vifffffi"]=function(){return(dynCall_vifffffi=Module["dynCall_vifffffi"]=Module["asm"]["dynCall_vifffffi"]).apply(null,arguments)};var dynCall_iifiifiii=Module["dynCall_iifiifiii"]=function(){return(dynCall_iifiifiii=Module["dynCall_iifiifiii"]=Module["asm"]["dynCall_iifiifiii"]).apply(null,arguments)};var dynCall_vifffi=Module["dynCall_vifffi"]=function(){return(dynCall_vifffi=Module["dynCall_vifffi"]=Module["asm"]["dynCall_vifffi"]).apply(null,arguments)};var dynCall_iifiiii=Module["dynCall_iifiiii"]=function(){return(dynCall_iifiiii=Module["dynCall_iifiiii"]=Module["asm"]["dynCall_iifiiii"]).apply(null,arguments)};var dynCall_vijji=Module["dynCall_vijji"]=function(){return(dynCall_vijji=Module["dynCall_vijji"]=Module["asm"]["dynCall_vijji"]).apply(null,arguments)};var dynCall_vijjjji=Module["dynCall_vijjjji"]=function(){return(dynCall_vijjjji=Module["dynCall_vijjjji"]=Module["asm"]["dynCall_vijjjji"]).apply(null,arguments)};var dynCall_iijjjji=Module["dynCall_iijjjji"]=function(){return(dynCall_iijjjji=Module["dynCall_iijjjji"]=Module["asm"]["dynCall_iijjjji"]).apply(null,arguments)};var dynCall_iiidi=Module["dynCall_iiidi"]=function(){return(dynCall_iiidi=Module["dynCall_iiidi"]=Module["asm"]["dynCall_iiidi"]).apply(null,arguments)};var dynCall_iijjjjiii=Module["dynCall_iijjjjiii"]=function(){return(dynCall_iijjjjiii=Module["dynCall_iijjjjiii"]=Module["asm"]["dynCall_iijjjjiii"]).apply(null,arguments)};var dynCall_iiiidi=Module["dynCall_iiiidi"]=function(){return(dynCall_iiiidi=Module["dynCall_iiiidi"]=Module["asm"]["dynCall_iiiidi"]).apply(null,arguments)};var dynCall_viiidi=Module["dynCall_viiidi"]=function(){return(dynCall_viiidi=Module["dynCall_viiidi"]=Module["asm"]["dynCall_viiidi"]).apply(null,arguments)};var dynCall_viiiiiifiifiii=Module["dynCall_viiiiiifiifiii"]=function(){return(dynCall_viiiiiifiifiii=Module["dynCall_viiiiiifiifiii"]=Module["asm"]["dynCall_viiiiiifiifiii"]).apply(null,arguments)};var dynCall_iiiffi=Module["dynCall_iiiffi"]=function(){return(dynCall_iiiffi=Module["dynCall_iiiffi"]=Module["asm"]["dynCall_iiiffi"]).apply(null,arguments)};var dynCall_iiiififi=Module["dynCall_iiiififi"]=function(){return(dynCall_iiiififi=Module["dynCall_iiiififi"]=Module["asm"]["dynCall_iiiififi"]).apply(null,arguments)};var dynCall_iiiffifiii=Module["dynCall_iiiffifiii"]=function(){return(dynCall_iiiffifiii=Module["dynCall_iiiffifiii"]=Module["asm"]["dynCall_iiiffifiii"]).apply(null,arguments)};var dynCall_iiifiifii=Module["dynCall_iiifiifii"]=function(){return(dynCall_iiifiifii=Module["dynCall_iiifiifii"]=Module["asm"]["dynCall_iiifiifii"]).apply(null,arguments)};var dynCall_iiifiifiiii=Module["dynCall_iiifiifiiii"]=function(){return(dynCall_iiifiifiiii=Module["dynCall_iiifiifiiii"]=Module["asm"]["dynCall_iiifiifiiii"]).apply(null,arguments)};var dynCall_ffffii=Module["dynCall_ffffii"]=function(){return(dynCall_ffffii=Module["dynCall_ffffii"]=Module["asm"]["dynCall_ffffii"]).apply(null,arguments)};var dynCall_iifiiiiii=Module["dynCall_iifiiiiii"]=function(){return(dynCall_iifiiiiii=Module["dynCall_iifiiiiii"]=Module["asm"]["dynCall_iifiiiiii"]).apply(null,arguments)};var dynCall_iifiiiii=Module["dynCall_iifiiiii"]=function(){return(dynCall_iifiiiii=Module["dynCall_iifiiiii"]=Module["asm"]["dynCall_iifiiiii"]).apply(null,arguments)};var dynCall_iiffiiiii=Module["dynCall_iiffiiiii"]=function(){return(dynCall_iiffiiiii=Module["dynCall_iiffiiiii"]=Module["asm"]["dynCall_iiffiiiii"]).apply(null,arguments)};var dynCall_iiififii=Module["dynCall_iiififii"]=function(){return(dynCall_iiififii=Module["dynCall_iiififii"]=Module["asm"]["dynCall_iiififii"]).apply(null,arguments)};var dynCall_iiififi=Module["dynCall_iiififi"]=function(){return(dynCall_iiififi=Module["dynCall_iiififi"]=Module["asm"]["dynCall_iiififi"]).apply(null,arguments)};var dynCall_iifiifii=Module["dynCall_iifiifii"]=function(){return(dynCall_iifiifii=Module["dynCall_iifiifii"]=Module["asm"]["dynCall_iifiifii"]).apply(null,arguments)};var dynCall_fiifdi=Module["dynCall_fiifdi"]=function(){return(dynCall_fiifdi=Module["dynCall_fiifdi"]=Module["asm"]["dynCall_fiifdi"]).apply(null,arguments)};var dynCall_viiiiiifddfiii=Module["dynCall_viiiiiifddfiii"]=function(){return(dynCall_viiiiiifddfiii=Module["dynCall_viiiiiifddfiii"]=Module["asm"]["dynCall_viiiiiifddfiii"]).apply(null,arguments)};var dynCall_fiifji=Module["dynCall_fiifji"]=function(){return(dynCall_fiifji=Module["dynCall_fiifji"]=Module["asm"]["dynCall_fiifji"]).apply(null,arguments)};var dynCall_viiiiiifjjfiii=Module["dynCall_viiiiiifjjfiii"]=function(){return(dynCall_viiiiiifjjfiii=Module["dynCall_viiiiiifjjfiii"]=Module["asm"]["dynCall_viiiiiifjjfiii"]).apply(null,arguments)};var dynCall_viiiifiii=Module["dynCall_viiiifiii"]=function(){return(dynCall_viiiifiii=Module["dynCall_viiiifiii"]=Module["asm"]["dynCall_viiiifiii"]).apply(null,arguments)};var dynCall_viiiiiiffffiii=Module["dynCall_viiiiiiffffiii"]=function(){return(dynCall_viiiiiiffffiii=Module["dynCall_viiiiiiffffiii"]=Module["asm"]["dynCall_viiiiiiffffiii"]).apply(null,arguments)};var dynCall_viifiiii=Module["dynCall_viifiiii"]=function(){return(dynCall_viifiiii=Module["dynCall_viifiiii"]=Module["asm"]["dynCall_viifiiii"]).apply(null,arguments)};var dynCall_iiiiifiii=Module["dynCall_iiiiifiii"]=function(){return(dynCall_iiiiifiii=Module["dynCall_iiiiifiii"]=Module["asm"]["dynCall_iiiiifiii"]).apply(null,arguments)};var dynCall_fffffi=Module["dynCall_fffffi"]=function(){return(dynCall_fffffi=Module["dynCall_fffffi"]=Module["asm"]["dynCall_fffffi"]).apply(null,arguments)};var dynCall_fiiffffi=Module["dynCall_fiiffffi"]=function(){return(dynCall_fiiffffi=Module["dynCall_fiiffffi"]=Module["asm"]["dynCall_fiiffffi"]).apply(null,arguments)};var dynCall_fffifffi=Module["dynCall_fffifffi"]=function(){return(dynCall_fffifffi=Module["dynCall_fffifffi"]=Module["asm"]["dynCall_fffifffi"]).apply(null,arguments)};var dynCall_viffffifi=Module["dynCall_viffffifi"]=function(){return(dynCall_viffffifi=Module["dynCall_viffffifi"]=Module["asm"]["dynCall_viffffifi"]).apply(null,arguments)};var dynCall_vjii=Module["dynCall_vjii"]=function(){return(dynCall_vjii=Module["dynCall_vjii"]=Module["asm"]["dynCall_vjii"]).apply(null,arguments)};var dynCall_iiifiiiii=Module["dynCall_iiifiiiii"]=function(){return(dynCall_iiifiiiii=Module["dynCall_iiifiiiii"]=Module["asm"]["dynCall_iiifiiiii"]).apply(null,arguments)};var dynCall_iiffifiii=Module["dynCall_iiffifiii"]=function(){return(dynCall_iiffifiii=Module["dynCall_iiffifiii"]=Module["asm"]["dynCall_iiffifiii"]).apply(null,arguments)};var dynCall_iiiiifii=Module["dynCall_iiiiifii"]=function(){return(dynCall_iiiiifii=Module["dynCall_iiiiifii"]=Module["asm"]["dynCall_iiiiifii"]).apply(null,arguments)};var dynCall_iifiifffii=Module["dynCall_iifiifffii"]=function(){return(dynCall_iifiifffii=Module["dynCall_iifiifffii"]=Module["asm"]["dynCall_iifiifffii"]).apply(null,arguments)};var dynCall_viffffi=Module["dynCall_viffffi"]=function(){return(dynCall_viffffi=Module["dynCall_viffffi"]=Module["asm"]["dynCall_viffffi"]).apply(null,arguments)};var dynCall_ifii=Module["dynCall_ifii"]=function(){return(dynCall_ifii=Module["dynCall_ifii"]=Module["asm"]["dynCall_ifii"]).apply(null,arguments)};var dynCall_ifiii=Module["dynCall_ifiii"]=function(){return(dynCall_ifiii=Module["dynCall_ifiii"]=Module["asm"]["dynCall_ifiii"]).apply(null,arguments)};var dynCall_ifiiii=Module["dynCall_ifiiii"]=function(){return(dynCall_ifiiii=Module["dynCall_ifiiii"]=Module["asm"]["dynCall_ifiiii"]).apply(null,arguments)};var dynCall_ifiiiii=Module["dynCall_ifiiiii"]=function(){return(dynCall_ifiiiii=Module["dynCall_ifiiiii"]=Module["asm"]["dynCall_ifiiiii"]).apply(null,arguments)};var dynCall_fifffffi=Module["dynCall_fifffffi"]=function(){return(dynCall_fifffffi=Module["dynCall_fifffffi"]=Module["asm"]["dynCall_fifffffi"]).apply(null,arguments)};var dynCall_viffffii=Module["dynCall_viffffii"]=function(){return(dynCall_viffffii=Module["dynCall_viffffii"]=Module["asm"]["dynCall_viffffii"]).apply(null,arguments)};var dynCall_idiiiii=Module["dynCall_idiiiii"]=function(){return(dynCall_idiiiii=Module["dynCall_idiiiii"]=Module["asm"]["dynCall_idiiiii"]).apply(null,arguments)};var dynCall_idiiii=Module["dynCall_idiiii"]=function(){return(dynCall_idiiii=Module["dynCall_idiiii"]=Module["asm"]["dynCall_idiiii"]).apply(null,arguments)};var dynCall_idii=Module["dynCall_idii"]=function(){return(dynCall_idii=Module["dynCall_idii"]=Module["asm"]["dynCall_idii"]).apply(null,arguments)};var dynCall_iiijiiii=Module["dynCall_iiijiiii"]=function(){return(dynCall_iiijiiii=Module["dynCall_iiijiiii"]=Module["asm"]["dynCall_iiijiiii"]).apply(null,arguments)};var dynCall_iiiji=Module["dynCall_iiiji"]=function(){return(dynCall_iiiji=Module["dynCall_iiiji"]=Module["asm"]["dynCall_iiiji"]).apply(null,arguments)};var dynCall_vjiiii=Module["dynCall_vjiiii"]=function(){return(dynCall_vjiiii=Module["dynCall_vjiiii"]=Module["asm"]["dynCall_vjiiii"]).apply(null,arguments)};var dynCall_iddi=Module["dynCall_iddi"]=function(){return(dynCall_iddi=Module["dynCall_iddi"]=Module["asm"]["dynCall_iddi"]).apply(null,arguments)};var dynCall_iiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiii"]=function(){return(dynCall_iiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiii"]=Module["asm"]["dynCall_iiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_viffii=Module["dynCall_viffii"]=function(){return(dynCall_viffii=Module["dynCall_viffii"]=Module["asm"]["dynCall_viffii"]).apply(null,arguments)};var dynCall_vidddi=Module["dynCall_vidddi"]=function(){return(dynCall_vidddi=Module["dynCall_vidddi"]=Module["asm"]["dynCall_vidddi"]).apply(null,arguments)};var dynCall_fffffii=Module["dynCall_fffffii"]=function(){return(dynCall_fffffii=Module["dynCall_fffffii"]=Module["asm"]["dynCall_fffffii"]).apply(null,arguments)};var dynCall_iffi=Module["dynCall_iffi"]=function(){return(dynCall_iffi=Module["dynCall_iffi"]=Module["asm"]["dynCall_iffi"]).apply(null,arguments)};var dynCall_viifffffii=Module["dynCall_viifffffii"]=function(){return(dynCall_viifffffii=Module["dynCall_viifffffii"]=Module["asm"]["dynCall_viifffffii"]).apply(null,arguments)};var dynCall_iiiiiiiiiii=Module["dynCall_iiiiiiiiiii"]=function(){return(dynCall_iiiiiiiiiii=Module["dynCall_iiiiiiiiiii"]=Module["asm"]["dynCall_iiiiiiiiiii"]).apply(null,arguments)};var dynCall_iiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiii"]=function(){return(dynCall_iiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiii"]=Module["asm"]["dynCall_iiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_iiiiiji=Module["dynCall_iiiiiji"]=function(){return(dynCall_iiiiiji=Module["dynCall_iiiiiji"]=Module["asm"]["dynCall_iiiiiji"]).apply(null,arguments)};var dynCall_viiijii=Module["dynCall_viiijii"]=function(){return(dynCall_viiijii=Module["dynCall_viiijii"]=Module["asm"]["dynCall_viiijii"]).apply(null,arguments)};var dynCall_viijiii=Module["dynCall_viijiii"]=function(){return(dynCall_viijiii=Module["dynCall_viijiii"]=Module["asm"]["dynCall_viijiii"]).apply(null,arguments)};var dynCall_ijii=Module["dynCall_ijii"]=function(){return(dynCall_ijii=Module["dynCall_ijii"]=Module["asm"]["dynCall_ijii"]).apply(null,arguments)};var dynCall_vdiiiii=Module["dynCall_vdiiiii"]=function(){return(dynCall_vdiiiii=Module["dynCall_vdiiiii"]=Module["asm"]["dynCall_vdiiiii"]).apply(null,arguments)};var dynCall_diiji=Module["dynCall_diiji"]=function(){return(dynCall_diiji=Module["dynCall_diiji"]=Module["asm"]["dynCall_diiji"]).apply(null,arguments)};var dynCall_vjiiiiiiii=Module["dynCall_vjiiiiiiii"]=function(){return(dynCall_vjiiiiiiii=Module["dynCall_vjiiiiiiii"]=Module["asm"]["dynCall_vjiiiiiiii"]).apply(null,arguments)};var dynCall_vjiiiiiii=Module["dynCall_vjiiiiiii"]=function(){return(dynCall_vjiiiiiii=Module["dynCall_vjiiiiiii"]=Module["asm"]["dynCall_vjiiiiiii"]).apply(null,arguments)};var dynCall_ijiiii=Module["dynCall_ijiiii"]=function(){return(dynCall_ijiiii=Module["dynCall_ijiiii"]=Module["asm"]["dynCall_ijiiii"]).apply(null,arguments)};var dynCall_iidii=Module["dynCall_iidii"]=function(){return(dynCall_iidii=Module["dynCall_iidii"]=Module["asm"]["dynCall_iidii"]).apply(null,arguments)};var dynCall_iidiii=Module["dynCall_iidiii"]=function(){return(dynCall_iidiii=Module["dynCall_iidiii"]=Module["asm"]["dynCall_iidiii"]).apply(null,arguments)};var dynCall_jidi=Module["dynCall_jidi"]=function(){return(dynCall_jidi=Module["dynCall_jidi"]=Module["asm"]["dynCall_jidi"]).apply(null,arguments)};var dynCall_diji=Module["dynCall_diji"]=function(){return(dynCall_diji=Module["dynCall_diji"]=Module["asm"]["dynCall_diji"]).apply(null,arguments)};var dynCall_fidi=Module["dynCall_fidi"]=function(){return(dynCall_fidi=Module["dynCall_fidi"]=Module["asm"]["dynCall_fidi"]).apply(null,arguments)};var dynCall_vffi=Module["dynCall_vffi"]=function(){return(dynCall_vffi=Module["dynCall_vffi"]=Module["asm"]["dynCall_vffi"]).apply(null,arguments)};var dynCall_viiffiiii=Module["dynCall_viiffiiii"]=function(){return(dynCall_viiffiiii=Module["dynCall_viiffiiii"]=Module["asm"]["dynCall_viiffiiii"]).apply(null,arguments)};var dynCall_ijjii=Module["dynCall_ijjii"]=function(){return(dynCall_ijjii=Module["dynCall_ijjii"]=Module["asm"]["dynCall_ijjii"]).apply(null,arguments)};var dynCall_viiijiiiiii=Module["dynCall_viiijiiiiii"]=function(){return(dynCall_viiijiiiiii=Module["dynCall_viiijiiiiii"]=Module["asm"]["dynCall_viiijiiiiii"]).apply(null,arguments)};var dynCall_ijiiiiiii=Module["dynCall_ijiiiiiii"]=function(){return(dynCall_ijiiiiiii=Module["dynCall_ijiiiiiii"]=Module["asm"]["dynCall_ijiiiiiii"]).apply(null,arguments)};var dynCall_vijiiiiii=Module["dynCall_vijiiiiii"]=function(){return(dynCall_vijiiiiii=Module["dynCall_vijiiiiii"]=Module["asm"]["dynCall_vijiiiiii"]).apply(null,arguments)};var dynCall_viijiiii=Module["dynCall_viijiiii"]=function(){return(dynCall_viijiiii=Module["dynCall_viijiiii"]=Module["asm"]["dynCall_viijiiii"]).apply(null,arguments)};var dynCall_ijiii=Module["dynCall_ijiii"]=function(){return(dynCall_ijiii=Module["dynCall_ijiii"]=Module["asm"]["dynCall_ijiii"]).apply(null,arguments)};var dynCall_ijjiii=Module["dynCall_ijjiii"]=function(){return(dynCall_ijjiii=Module["dynCall_ijjiii"]=Module["asm"]["dynCall_ijjiii"]).apply(null,arguments)};var dynCall_vijiiiii=Module["dynCall_vijiiiii"]=function(){return(dynCall_vijiiiii=Module["dynCall_vijiiiii"]=Module["asm"]["dynCall_vijiiiii"]).apply(null,arguments)};var dynCall_viififfi=Module["dynCall_viififfi"]=function(){return(dynCall_viififfi=Module["dynCall_viififfi"]=Module["asm"]["dynCall_viififfi"]).apply(null,arguments)};var dynCall_iffffi=Module["dynCall_iffffi"]=function(){return(dynCall_iffffi=Module["dynCall_iffffi"]=Module["asm"]["dynCall_iffffi"]).apply(null,arguments)};var dynCall_diiiii=Module["dynCall_diiiii"]=function(){return(dynCall_diiiii=Module["dynCall_diiiii"]=Module["asm"]["dynCall_diiiii"]).apply(null,arguments)};var dynCall_vfffi=Module["dynCall_vfffi"]=function(){return(dynCall_vfffi=Module["dynCall_vfffi"]=Module["asm"]["dynCall_vfffi"]).apply(null,arguments)};var dynCall_vffffi=Module["dynCall_vffffi"]=function(){return(dynCall_vffffi=Module["dynCall_vffffi"]=Module["asm"]["dynCall_vffffi"]).apply(null,arguments)};var dynCall_viiiffii=Module["dynCall_viiiffii"]=function(){return(dynCall_viiiffii=Module["dynCall_viiiffii"]=Module["asm"]["dynCall_viiiffii"]).apply(null,arguments)};var dynCall_vffffiiii=Module["dynCall_vffffiiii"]=function(){return(dynCall_vffffiiii=Module["dynCall_vffffiiii"]=Module["asm"]["dynCall_vffffiiii"]).apply(null,arguments)};var dynCall_vifffii=Module["dynCall_vifffii"]=function(){return(dynCall_vifffii=Module["dynCall_vifffii"]=Module["asm"]["dynCall_vifffii"]).apply(null,arguments)};var dynCall_vffffii=Module["dynCall_vffffii"]=function(){return(dynCall_vffffii=Module["dynCall_vffffii"]=Module["asm"]["dynCall_vffffii"]).apply(null,arguments)};var dynCall_viiiifffi=Module["dynCall_viiiifffi"]=function(){return(dynCall_viiiifffi=Module["dynCall_viiiifffi"]=Module["asm"]["dynCall_viiiifffi"]).apply(null,arguments)};var dynCall_viiffii=Module["dynCall_viiffii"]=function(){return(dynCall_viiffii=Module["dynCall_viiffii"]=Module["asm"]["dynCall_viiffii"]).apply(null,arguments)};var dynCall_vfiii=Module["dynCall_vfiii"]=function(){return(dynCall_vfiii=Module["dynCall_vfiii"]=Module["asm"]["dynCall_vfiii"]).apply(null,arguments)};var dynCall_fffifi=Module["dynCall_fffifi"]=function(){return(dynCall_fffifi=Module["dynCall_fffifi"]=Module["asm"]["dynCall_fffifi"]).apply(null,arguments)};var dynCall_fdi=Module["dynCall_fdi"]=function(){return(dynCall_fdi=Module["dynCall_fdi"]=Module["asm"]["dynCall_fdi"]).apply(null,arguments)};var dynCall_vfii=Module["dynCall_vfii"]=function(){return(dynCall_vfii=Module["dynCall_vfii"]=Module["asm"]["dynCall_vfii"]).apply(null,arguments)};var dynCall_ddddi=Module["dynCall_ddddi"]=function(){return(dynCall_ddddi=Module["dynCall_ddddi"]=Module["asm"]["dynCall_ddddi"]).apply(null,arguments)};var dynCall_jjjji=Module["dynCall_jjjji"]=function(){return(dynCall_jjjji=Module["dynCall_jjjji"]=Module["asm"]["dynCall_jjjji"]).apply(null,arguments)};var dynCall_vijjii=Module["dynCall_vijjii"]=function(){return(dynCall_vijjii=Module["dynCall_vijjii"]=Module["asm"]["dynCall_vijjii"]).apply(null,arguments)};var dynCall_viiiiiiiijijiii=Module["dynCall_viiiiiiiijijiii"]=function(){return(dynCall_viiiiiiiijijiii=Module["dynCall_viiiiiiiijijiii"]=Module["asm"]["dynCall_viiiiiiiijijiii"]).apply(null,arguments)};var dynCall_iiiifiii=Module["dynCall_iiiifiii"]=function(){return(dynCall_iiiifiii=Module["dynCall_iiiifiii"]=Module["asm"]["dynCall_iiiifiii"]).apply(null,arguments)};var dynCall_viiifiii=Module["dynCall_viiifiii"]=function(){return(dynCall_viiifiii=Module["dynCall_viiifiii"]=Module["asm"]["dynCall_viiifiii"]).apply(null,arguments)};var dynCall_viiififi=Module["dynCall_viiififi"]=function(){return(dynCall_viiififi=Module["dynCall_viiififi"]=Module["asm"]["dynCall_viiififi"]).apply(null,arguments)};var dynCall_viiififfi=Module["dynCall_viiififfi"]=function(){return(dynCall_viiififfi=Module["dynCall_viiififfi"]=Module["asm"]["dynCall_viiififfi"]).apply(null,arguments)};var dynCall_vififfii=Module["dynCall_vififfii"]=function(){return(dynCall_vififfii=Module["dynCall_vififfii"]=Module["asm"]["dynCall_vififfii"]).apply(null,arguments)};var dynCall_iiifiifiii=Module["dynCall_iiifiifiii"]=function(){return(dynCall_iiifiifiii=Module["dynCall_iiifiifiii"]=Module["asm"]["dynCall_iiifiifiii"]).apply(null,arguments)};var dynCall_viffiiii=Module["dynCall_viffiiii"]=function(){return(dynCall_viffiiii=Module["dynCall_viffiiii"]=Module["asm"]["dynCall_viffiiii"]).apply(null,arguments)};var dynCall_viiiffffiiii=Module["dynCall_viiiffffiiii"]=function(){return(dynCall_viiiffffiiii=Module["dynCall_viiiffffiiii"]=Module["asm"]["dynCall_viiiffffiiii"]).apply(null,arguments)};var dynCall_viifffffffiiiii=Module["dynCall_viifffffffiiiii"]=function(){return(dynCall_viifffffffiiiii=Module["dynCall_viifffffffiiiii"]=Module["asm"]["dynCall_viifffffffiiiii"]).apply(null,arguments)};var dynCall_fiiiii=Module["dynCall_fiiiii"]=function(){return(dynCall_fiiiii=Module["dynCall_fiiiii"]=Module["asm"]["dynCall_fiiiii"]).apply(null,arguments)};var dynCall_iiiiiiffiiiiiiiiiffffiiii=Module["dynCall_iiiiiiffiiiiiiiiiffffiiii"]=function(){return(dynCall_iiiiiiffiiiiiiiiiffffiiii=Module["dynCall_iiiiiiffiiiiiiiiiffffiiii"]=Module["asm"]["dynCall_iiiiiiffiiiiiiiiiffffiiii"]).apply(null,arguments)};var dynCall_iiiiiiffiiiiiiiiiiiiiii=Module["dynCall_iiiiiiffiiiiiiiiiiiiiii"]=function(){return(dynCall_iiiiiiffiiiiiiiiiiiiiii=Module["dynCall_iiiiiiffiiiiiiiiiiiiiii"]=Module["asm"]["dynCall_iiiiiiffiiiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_vififiii=Module["dynCall_vififiii"]=function(){return(dynCall_vififiii=Module["dynCall_vififiii"]=Module["asm"]["dynCall_vififiii"]).apply(null,arguments)};var dynCall_viififii=Module["dynCall_viififii"]=function(){return(dynCall_viififii=Module["dynCall_viififii"]=Module["asm"]["dynCall_viififii"]).apply(null,arguments)};var dynCall_viijji=Module["dynCall_viijji"]=function(){return(dynCall_viijji=Module["dynCall_viijji"]=Module["asm"]["dynCall_viijji"]).apply(null,arguments)};var dynCall_jijji=Module["dynCall_jijji"]=function(){return(dynCall_jijji=Module["dynCall_jijji"]=Module["asm"]["dynCall_jijji"]).apply(null,arguments)};var dynCall_viiffffi=Module["dynCall_viiffffi"]=function(){return(dynCall_viiffffi=Module["dynCall_viiffffi"]=Module["asm"]["dynCall_viiffffi"]).apply(null,arguments)};var dynCall_ifffi=Module["dynCall_ifffi"]=function(){return(dynCall_ifffi=Module["dynCall_ifffi"]=Module["asm"]["dynCall_ifffi"]).apply(null,arguments)};var dynCall_viffiii=Module["dynCall_viffiii"]=function(){return(dynCall_viffiii=Module["dynCall_viffiii"]=Module["asm"]["dynCall_viffiii"]).apply(null,arguments)};var dynCall_viffifi=Module["dynCall_viffifi"]=function(){return(dynCall_viffifi=Module["dynCall_viffifi"]=Module["asm"]["dynCall_viffifi"]).apply(null,arguments)};var dynCall_fffffffi=Module["dynCall_fffffffi"]=function(){return(dynCall_fffffffi=Module["dynCall_fffffffi"]=Module["asm"]["dynCall_fffffffi"]).apply(null,arguments)};var dynCall_viiffifi=Module["dynCall_viiffifi"]=function(){return(dynCall_viiffifi=Module["dynCall_viiffifi"]=Module["asm"]["dynCall_viiffifi"]).apply(null,arguments)};var dynCall_viiiffiiiiiiiii=Module["dynCall_viiiffiiiiiiiii"]=function(){return(dynCall_viiiffiiiiiiiii=Module["dynCall_viiiffiiiiiiiii"]=Module["asm"]["dynCall_viiiffiiiiiiiii"]).apply(null,arguments)};var dynCall_viiiffiiiiii=Module["dynCall_viiiffiiiiii"]=function(){return(dynCall_viiiffiiiiii=Module["dynCall_viiiffiiiiii"]=Module["asm"]["dynCall_viiiffiiiiii"]).apply(null,arguments)};var dynCall_viiffiiiiiiiiii=Module["dynCall_viiffiiiiiiiiii"]=function(){return(dynCall_viiffiiiiiiiiii=Module["dynCall_viiffiiiiiiiiii"]=Module["asm"]["dynCall_viiffiiiiiiiiii"]).apply(null,arguments)};var dynCall_viiffiiiiiii=Module["dynCall_viiffiiiiiii"]=function(){return(dynCall_viiffiiiiiii=Module["dynCall_viiffiiiiiii"]=Module["asm"]["dynCall_viiffiiiiiii"]).apply(null,arguments)};var dynCall_viffffffi=Module["dynCall_viffffffi"]=function(){return(dynCall_viffffffi=Module["dynCall_viffffffi"]=Module["asm"]["dynCall_viffffffi"]).apply(null,arguments)};var dynCall_iiiffiiii=Module["dynCall_iiiffiiii"]=function(){return(dynCall_iiiffiiii=Module["dynCall_iiiffiiii"]=Module["asm"]["dynCall_iiiffiiii"]).apply(null,arguments)};var dynCall_iiiiffiiii=Module["dynCall_iiiiffiiii"]=function(){return(dynCall_iiiiffiiii=Module["dynCall_iiiiffiiii"]=Module["asm"]["dynCall_iiiiffiiii"]).apply(null,arguments)};var dynCall_fiiiffi=Module["dynCall_fiiiffi"]=function(){return(dynCall_fiiiffi=Module["dynCall_fiiiffi"]=Module["asm"]["dynCall_fiiiffi"]).apply(null,arguments)};var dynCall_viiiiiiiijiiii=Module["dynCall_viiiiiiiijiiii"]=function(){return(dynCall_viiiiiiiijiiii=Module["dynCall_viiiiiiiijiiii"]=Module["asm"]["dynCall_viiiiiiiijiiii"]).apply(null,arguments)};var dynCall_viiiiiifiiiiii=Module["dynCall_viiiiiifiiiiii"]=function(){return(dynCall_viiiiiifiiiiii=Module["dynCall_viiiiiifiiiiii"]=Module["asm"]["dynCall_viiiiiifiiiiii"]).apply(null,arguments)};var dynCall_viffffiii=Module["dynCall_viffffiii"]=function(){return(dynCall_viffffiii=Module["dynCall_viffffiii"]=Module["asm"]["dynCall_viffffiii"]).apply(null,arguments)};var dynCall_vifiiiiii=Module["dynCall_vifiiiiii"]=function(){return(dynCall_vifiiiiii=Module["dynCall_vifiiiiii"]=Module["asm"]["dynCall_vifiiiiii"]).apply(null,arguments)};var dynCall_ffii=Module["dynCall_ffii"]=function(){return(dynCall_ffii=Module["dynCall_ffii"]=Module["asm"]["dynCall_ffii"]).apply(null,arguments)};var dynCall_iiiifiiii=Module["dynCall_iiiifiiii"]=function(){return(dynCall_iiiifiiii=Module["dynCall_iiiifiiii"]=Module["asm"]["dynCall_iiiifiiii"]).apply(null,arguments)};var dynCall_viiiiiffi=Module["dynCall_viiiiiffi"]=function(){return(dynCall_viiiiiffi=Module["dynCall_viiiiiffi"]=Module["asm"]["dynCall_viiiiiffi"]).apply(null,arguments)};var dynCall_iiffffi=Module["dynCall_iiffffi"]=function(){return(dynCall_iiffffi=Module["dynCall_iiffffi"]=Module["asm"]["dynCall_iiffffi"]).apply(null,arguments)};var dynCall_vifffiii=Module["dynCall_vifffiii"]=function(){return(dynCall_vifffiii=Module["dynCall_vifffiii"]=Module["asm"]["dynCall_vifffiii"]).apply(null,arguments)};var dynCall_vifiiii=Module["dynCall_vifiiii"]=function(){return(dynCall_vifiiii=Module["dynCall_vifiiii"]=Module["asm"]["dynCall_vifiiii"]).apply(null,arguments)};var dynCall_iiffffiii=Module["dynCall_iiffffiii"]=function(){return(dynCall_iiffffiii=Module["dynCall_iiffffiii"]=Module["asm"]["dynCall_iiffffiii"]).apply(null,arguments)};var dynCall_iiifffiiii=Module["dynCall_iiifffiiii"]=function(){return(dynCall_iiifffiiii=Module["dynCall_iiifffiiii"]=Module["asm"]["dynCall_iiifffiiii"]).apply(null,arguments)};var dynCall_iiiffiii=Module["dynCall_iiiffiii"]=function(){return(dynCall_iiiffiii=Module["dynCall_iiiffiii"]=Module["asm"]["dynCall_iiiffiii"]).apply(null,arguments)};var dynCall_iifffffi=Module["dynCall_iifffffi"]=function(){return(dynCall_iifffffi=Module["dynCall_iifffffi"]=Module["asm"]["dynCall_iifffffi"]).apply(null,arguments)};var dynCall_iiffiiii=Module["dynCall_iiffiiii"]=function(){return(dynCall_iiffiiii=Module["dynCall_iiffiiii"]=Module["asm"]["dynCall_iiffiiii"]).apply(null,arguments)};var dynCall_iifffiii=Module["dynCall_iifffiii"]=function(){return(dynCall_iifffiii=Module["dynCall_iifffiii"]=Module["asm"]["dynCall_iifffiii"]).apply(null,arguments)};var dynCall_iiffffiiiiiii=Module["dynCall_iiffffiiiiiii"]=function(){return(dynCall_iiffffiiiiiii=Module["dynCall_iiffffiiiiiii"]=Module["asm"]["dynCall_iiffffiiiiiii"]).apply(null,arguments)};var dynCall_iiffifi=Module["dynCall_iiffifi"]=function(){return(dynCall_iiffifi=Module["dynCall_iiffifi"]=Module["asm"]["dynCall_iiffifi"]).apply(null,arguments)};var dynCall_iiiiffiffii=Module["dynCall_iiiiffiffii"]=function(){return(dynCall_iiiiffiffii=Module["dynCall_iiiiffiffii"]=Module["asm"]["dynCall_iiiiffiffii"]).apply(null,arguments)};var dynCall_iiffiii=Module["dynCall_iiffiii"]=function(){return(dynCall_iiffiii=Module["dynCall_iiffiii"]=Module["asm"]["dynCall_iiffiii"]).apply(null,arguments)};var dynCall_viddii=Module["dynCall_viddii"]=function(){return(dynCall_viddii=Module["dynCall_viddii"]=Module["asm"]["dynCall_viddii"]).apply(null,arguments)};var dynCall_viifffffi=Module["dynCall_viifffffi"]=function(){return(dynCall_viifffffi=Module["dynCall_viifffffi"]=Module["asm"]["dynCall_viifffffi"]).apply(null,arguments)};var dynCall_viiffffffi=Module["dynCall_viiffffffi"]=function(){return(dynCall_viiffffffi=Module["dynCall_viiffffffi"]=Module["asm"]["dynCall_viiffffffi"]).apply(null,arguments)};var dynCall_viifffffffi=Module["dynCall_viifffffffi"]=function(){return(dynCall_viifffffffi=Module["dynCall_viifffffffi"]=Module["asm"]["dynCall_viifffffffi"]).apply(null,arguments)};var dynCall_viiffffffffi=Module["dynCall_viiffffffffi"]=function(){return(dynCall_viiffffffffi=Module["dynCall_viiffffffffi"]=Module["asm"]["dynCall_viiffffffffi"]).apply(null,arguments)};var dynCall_vidiii=Module["dynCall_vidiii"]=function(){return(dynCall_vidiii=Module["dynCall_vidiii"]=Module["asm"]["dynCall_vidiii"]).apply(null,arguments)};var dynCall_viiffffffffiii=Module["dynCall_viiffffffffiii"]=function(){return(dynCall_viiffffffffiii=Module["dynCall_viiffffffffiii"]=Module["asm"]["dynCall_viiffffffffiii"]).apply(null,arguments)};var dynCall_viiiiffffii=Module["dynCall_viiiiffffii"]=function(){return(dynCall_viiiiffffii=Module["dynCall_viiiiffffii"]=Module["asm"]["dynCall_viiiiffffii"]).apply(null,arguments)};var dynCall_ddidi=Module["dynCall_ddidi"]=function(){return(dynCall_ddidi=Module["dynCall_ddidi"]=Module["asm"]["dynCall_ddidi"]).apply(null,arguments)};var dynCall_di=Module["dynCall_di"]=function(){return(dynCall_di=Module["dynCall_di"]=Module["asm"]["dynCall_di"]).apply(null,arguments)};var dynCall_vidii=Module["dynCall_vidii"]=function(){return(dynCall_vidii=Module["dynCall_vidii"]=Module["asm"]["dynCall_vidii"]).apply(null,arguments)};var dynCall_iiidii=Module["dynCall_iiidii"]=function(){return(dynCall_iiidii=Module["dynCall_iiidii"]=Module["asm"]["dynCall_iiidii"]).apply(null,arguments)};var dynCall_iiiddi=Module["dynCall_iiiddi"]=function(){return(dynCall_iiiddi=Module["dynCall_iiiddi"]=Module["asm"]["dynCall_iiiddi"]).apply(null,arguments)};var dynCall_viddiiii=Module["dynCall_viddiiii"]=function(){return(dynCall_viddiiii=Module["dynCall_viddiiii"]=Module["asm"]["dynCall_viddiiii"]).apply(null,arguments)};var dynCall_viiidii=Module["dynCall_viiidii"]=function(){return(dynCall_viiidii=Module["dynCall_viiidii"]=Module["asm"]["dynCall_viiidii"]).apply(null,arguments)};var dynCall_vijiiiiiii=Module["dynCall_vijiiiiiii"]=function(){return(dynCall_vijiiiiiii=Module["dynCall_vijiiiiiii"]=Module["asm"]["dynCall_vijiiiiiii"]).apply(null,arguments)};var dynCall_vijiiiiiiii=Module["dynCall_vijiiiiiiii"]=function(){return(dynCall_vijiiiiiiii=Module["dynCall_vijiiiiiiii"]=Module["asm"]["dynCall_vijiiiiiiii"]).apply(null,arguments)};var dynCall_jjiiii=Module["dynCall_jjiiii"]=function(){return(dynCall_jjiiii=Module["dynCall_jjiiii"]=Module["asm"]["dynCall_jjiiii"]).apply(null,arguments)};var dynCall_jjiiiii=Module["dynCall_jjiiiii"]=function(){return(dynCall_jjiiiii=Module["dynCall_jjiiiii"]=Module["asm"]["dynCall_jjiiiii"]).apply(null,arguments)};var dynCall_viijiiiiii=Module["dynCall_viijiiiiii"]=function(){return(dynCall_viijiiiiii=Module["dynCall_viijiiiiii"]=Module["asm"]["dynCall_viijiiiiii"]).apply(null,arguments)};var dynCall_jijjji=Module["dynCall_jijjji"]=function(){return(dynCall_jijjji=Module["dynCall_jijjji"]=Module["asm"]["dynCall_jijjji"]).apply(null,arguments)};var dynCall_jijjjii=Module["dynCall_jijjjii"]=function(){return(dynCall_jijjjii=Module["dynCall_jijjjii"]=Module["asm"]["dynCall_jijjjii"]).apply(null,arguments)};var dynCall_jjiii=Module["dynCall_jjiii"]=function(){return(dynCall_jjiii=Module["dynCall_jjiii"]=Module["asm"]["dynCall_jjiii"]).apply(null,arguments)};var dynCall_ijijiiiii=Module["dynCall_ijijiiiii"]=function(){return(dynCall_ijijiiiii=Module["dynCall_ijijiiiii"]=Module["asm"]["dynCall_ijijiiiii"]).apply(null,arguments)};var dynCall_ijjjiii=Module["dynCall_ijjjiii"]=function(){return(dynCall_ijjjiii=Module["dynCall_ijjjiii"]=Module["asm"]["dynCall_ijjjiii"]).apply(null,arguments)};var dynCall_vijjjiijii=Module["dynCall_vijjjiijii"]=function(){return(dynCall_vijjjiijii=Module["dynCall_vijjjiijii"]=Module["asm"]["dynCall_vijjjiijii"]).apply(null,arguments)};var dynCall_ijjjiijii=Module["dynCall_ijjjiijii"]=function(){return(dynCall_ijjjiijii=Module["dynCall_ijjjiijii"]=Module["asm"]["dynCall_ijjjiijii"]).apply(null,arguments)};var dynCall_jfi=Module["dynCall_jfi"]=function(){return(dynCall_jfi=Module["dynCall_jfi"]=Module["asm"]["dynCall_jfi"]).apply(null,arguments)};var dynCall_fji=Module["dynCall_fji"]=function(){return(dynCall_fji=Module["dynCall_fji"]=Module["asm"]["dynCall_fji"]).apply(null,arguments)};var dynCall_dfi=Module["dynCall_dfi"]=function(){return(dynCall_dfi=Module["dynCall_dfi"]=Module["asm"]["dynCall_dfi"]).apply(null,arguments)};var dynCall_jidii=Module["dynCall_jidii"]=function(){return(dynCall_jidii=Module["dynCall_jidii"]=Module["asm"]["dynCall_jidii"]).apply(null,arguments)};var dynCall_viiiiiiiji=Module["dynCall_viiiiiiiji"]=function(){return(dynCall_viiiiiiiji=Module["dynCall_viiiiiiiji"]=Module["asm"]["dynCall_viiiiiiiji"]).apply(null,arguments)};var dynCall_viiiiiiiiji=Module["dynCall_viiiiiiiiji"]=function(){return(dynCall_viiiiiiiiji=Module["dynCall_viiiiiiiiji"]=Module["asm"]["dynCall_viiiiiiiiji"]).apply(null,arguments)};var dynCall_viiiiiiiiiji=Module["dynCall_viiiiiiiiiji"]=function(){return(dynCall_viiiiiiiiiji=Module["dynCall_viiiiiiiiiji"]=Module["asm"]["dynCall_viiiiiiiiiji"]).apply(null,arguments)};var dynCall_ijiijii=Module["dynCall_ijiijii"]=function(){return(dynCall_ijiijii=Module["dynCall_ijiijii"]=Module["asm"]["dynCall_ijiijii"]).apply(null,arguments)};var dynCall_vjjiiiii=Module["dynCall_vjjiiiii"]=function(){return(dynCall_vjjiiiii=Module["dynCall_vjjiiiii"]=Module["asm"]["dynCall_vjjiiiii"]).apply(null,arguments)};var dynCall_vjjii=Module["dynCall_vjjii"]=function(){return(dynCall_vjjii=Module["dynCall_vjjii"]=Module["asm"]["dynCall_vjjii"]).apply(null,arguments)};var dynCall_ijiiji=Module["dynCall_ijiiji"]=function(){return(dynCall_ijiiji=Module["dynCall_ijiiji"]=Module["asm"]["dynCall_ijiiji"]).apply(null,arguments)};var dynCall_ijiiiii=Module["dynCall_ijiiiii"]=function(){return(dynCall_ijiiiii=Module["dynCall_ijiiiii"]=Module["asm"]["dynCall_ijiiiii"]).apply(null,arguments)};var dynCall_ijiiiiji=Module["dynCall_ijiiiiji"]=function(){return(dynCall_ijiiiiji=Module["dynCall_ijiiiiji"]=Module["asm"]["dynCall_ijiiiiji"]).apply(null,arguments)};var dynCall_jiiiiii=Module["dynCall_jiiiiii"]=function(){return(dynCall_jiiiiii=Module["dynCall_jiiiiii"]=Module["asm"]["dynCall_jiiiiii"]).apply(null,arguments)};var dynCall_ddii=Module["dynCall_ddii"]=function(){return(dynCall_ddii=Module["dynCall_ddii"]=Module["asm"]["dynCall_ddii"]).apply(null,arguments)};var dynCall_idiii=Module["dynCall_idiii"]=function(){return(dynCall_idiii=Module["dynCall_idiii"]=Module["asm"]["dynCall_idiii"]).apply(null,arguments)};var dynCall_jjjii=Module["dynCall_jjjii"]=function(){return(dynCall_jjjii=Module["dynCall_jjjii"]=Module["asm"]["dynCall_jjjii"]).apply(null,arguments)};var dynCall_vdiii=Module["dynCall_vdiii"]=function(){return(dynCall_vdiii=Module["dynCall_vdiii"]=Module["asm"]["dynCall_vdiii"]).apply(null,arguments)};var dynCall_jdii=Module["dynCall_jdii"]=function(){return(dynCall_jdii=Module["dynCall_jdii"]=Module["asm"]["dynCall_jdii"]).apply(null,arguments)};var dynCall_vijijji=Module["dynCall_vijijji"]=function(){return(dynCall_vijijji=Module["dynCall_vijijji"]=Module["asm"]["dynCall_vijijji"]).apply(null,arguments)};var dynCall_iijjji=Module["dynCall_iijjji"]=function(){return(dynCall_iijjji=Module["dynCall_iijjji"]=Module["asm"]["dynCall_iijjji"]).apply(null,arguments)};var dynCall_viijjji=Module["dynCall_viijjji"]=function(){return(dynCall_viijjji=Module["dynCall_viijjji"]=Module["asm"]["dynCall_viijjji"]).apply(null,arguments)};var dynCall_vdii=Module["dynCall_vdii"]=function(){return(dynCall_vdii=Module["dynCall_vdii"]=Module["asm"]["dynCall_vdii"]).apply(null,arguments)};var dynCall_diddi=Module["dynCall_diddi"]=function(){return(dynCall_diddi=Module["dynCall_diddi"]=Module["asm"]["dynCall_diddi"]).apply(null,arguments)};var dynCall_viiijji=Module["dynCall_viiijji"]=function(){return(dynCall_viiijji=Module["dynCall_viiijji"]=Module["asm"]["dynCall_viiijji"]).apply(null,arguments)};var dynCall_iijjii=Module["dynCall_iijjii"]=function(){return(dynCall_iijjii=Module["dynCall_iijjii"]=Module["asm"]["dynCall_iijjii"]).apply(null,arguments)};var dynCall_viijijii=Module["dynCall_viijijii"]=function(){return(dynCall_viijijii=Module["dynCall_viijijii"]=Module["asm"]["dynCall_viijijii"]).apply(null,arguments)};var dynCall_viijijiii=Module["dynCall_viijijiii"]=function(){return(dynCall_viijijiii=Module["dynCall_viijijiii"]=Module["asm"]["dynCall_viijijiii"]).apply(null,arguments)};var dynCall_vijiji=Module["dynCall_vijiji"]=function(){return(dynCall_vijiji=Module["dynCall_vijiji"]=Module["asm"]["dynCall_vijiji"]).apply(null,arguments)};var dynCall_viijiijiii=Module["dynCall_viijiijiii"]=function(){return(dynCall_viijiijiii=Module["dynCall_viijiijiii"]=Module["asm"]["dynCall_viijiijiii"]).apply(null,arguments)};var dynCall_viiiijiiii=Module["dynCall_viiiijiiii"]=function(){return(dynCall_viiiijiiii=Module["dynCall_viiiijiiii"]=Module["asm"]["dynCall_viiiijiiii"]).apply(null,arguments)};var dynCall_viijjii=Module["dynCall_viijjii"]=function(){return(dynCall_viijjii=Module["dynCall_viijjii"]=Module["asm"]["dynCall_viijjii"]).apply(null,arguments)};var dynCall_jiiiiiiiii=Module["dynCall_jiiiiiiiii"]=function(){return(dynCall_jiiiiiiiii=Module["dynCall_jiiiiiiiii"]=Module["asm"]["dynCall_jiiiiiiiii"]).apply(null,arguments)};var dynCall_jiiiiiiiiii=Module["dynCall_jiiiiiiiiii"]=function(){return(dynCall_jiiiiiiiiii=Module["dynCall_jiiiiiiiiii"]=Module["asm"]["dynCall_jiiiiiiiiii"]).apply(null,arguments)};var dynCall_iiiiijii=Module["dynCall_iiiiijii"]=function(){return(dynCall_iiiiijii=Module["dynCall_iiiiijii"]=Module["asm"]["dynCall_iiiiijii"]).apply(null,arguments)};var dynCall_iiiiidii=Module["dynCall_iiiiidii"]=function(){return(dynCall_iiiiidii=Module["dynCall_iiiiidii"]=Module["asm"]["dynCall_iiiiidii"]).apply(null,arguments)};var dynCall_iijfiii=Module["dynCall_iijfiii"]=function(){return(dynCall_iijfiii=Module["dynCall_iijfiii"]=Module["asm"]["dynCall_iijfiii"]).apply(null,arguments)};var dynCall_iiidiii=Module["dynCall_iiidiii"]=function(){return(dynCall_iiidiii=Module["dynCall_iiidiii"]=Module["asm"]["dynCall_iiidiii"]).apply(null,arguments)};var dynCall_viifffiii=Module["dynCall_viifffiii"]=function(){return(dynCall_viifffiii=Module["dynCall_viifffiii"]=Module["asm"]["dynCall_viifffiii"]).apply(null,arguments)};var dynCall_iiiiffiiiji=Module["dynCall_iiiiffiiiji"]=function(){return(dynCall_iiiiffiiiji=Module["dynCall_iiiiffiiiji"]=Module["asm"]["dynCall_iiiiffiiiji"]).apply(null,arguments)};var dynCall_jiiiiiii=Module["dynCall_jiiiiiii"]=function(){return(dynCall_jiiiiiii=Module["dynCall_jiiiiiii"]=Module["asm"]["dynCall_jiiiiiii"]).apply(null,arguments)};var dynCall_iiiiffiiiii=Module["dynCall_iiiiffiiiii"]=function(){return(dynCall_iiiiffiiiii=Module["dynCall_iiiiffiiiii"]=Module["asm"]["dynCall_iiiiffiiiii"]).apply(null,arguments)};var dynCall_iidfii=Module["dynCall_iidfii"]=function(){return(dynCall_iidfii=Module["dynCall_iidfii"]=Module["asm"]["dynCall_iidfii"]).apply(null,arguments)};var dynCall_iijfii=Module["dynCall_iijfii"]=function(){return(dynCall_iijfii=Module["dynCall_iijfii"]=Module["asm"]["dynCall_iijfii"]).apply(null,arguments)};var dynCall_iiiiffii=Module["dynCall_iiiiffii"]=function(){return(dynCall_iiiiffii=Module["dynCall_iiiiffii"]=Module["asm"]["dynCall_iiiiffii"]).apply(null,arguments)};var dynCall_iiiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiiii"]=function(){return(dynCall_iiiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiiii"]=Module["asm"]["dynCall_iiiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_iiiiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiiiii"]=function(){return(dynCall_iiiiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiiiii"]=Module["asm"]["dynCall_iiiiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_iiiiiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiiiiii"]=function(){return(dynCall_iiiiiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiiiiii"]=Module["asm"]["dynCall_iiiiiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_iiiiiiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiiiiiii"]=function(){return(dynCall_iiiiiiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiiiiiii"]=Module["asm"]["dynCall_iiiiiiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_diiiidi=Module["dynCall_diiiidi"]=function(){return(dynCall_diiiidi=Module["dynCall_diiiidi"]=Module["asm"]["dynCall_diiiidi"]).apply(null,arguments)};var dynCall_jiiiiji=Module["dynCall_jiiiiji"]=function(){return(dynCall_jiiiiji=Module["dynCall_jiiiiji"]=Module["asm"]["dynCall_jiiiiji"]).apply(null,arguments)};var dynCall_fiiiifi=Module["dynCall_fiiiifi"]=function(){return(dynCall_fiiiifi=Module["dynCall_fiiiifi"]=Module["asm"]["dynCall_fiiiifi"]).apply(null,arguments)};var dynCall_iiiiiiiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiiiiiiii"]=function(){return(dynCall_iiiiiiiiiiiiiiiiiii=Module["dynCall_iiiiiiiiiiiiiiiiiii"]=Module["asm"]["dynCall_iiiiiiiiiiiiiiiiiii"]).apply(null,arguments)};var dynCall_iiijjii=Module["dynCall_iiijjii"]=function(){return(dynCall_iiijjii=Module["dynCall_iiijjii"]=Module["asm"]["dynCall_iiijjii"]).apply(null,arguments)};var dynCall_fjii=Module["dynCall_fjii"]=function(){return(dynCall_fjii=Module["dynCall_fjii"]=Module["asm"]["dynCall_fjii"]).apply(null,arguments)};var dynCall_ijiiiiii=Module["dynCall_ijiiiiii"]=function(){return(dynCall_ijiiiiii=Module["dynCall_ijiiiiii"]=Module["asm"]["dynCall_ijiiiiii"]).apply(null,arguments)};var dynCall_ijjiiiiii=Module["dynCall_ijjiiiiii"]=function(){return(dynCall_ijjiiiiii=Module["dynCall_ijjiiiiii"]=Module["asm"]["dynCall_ijjiiiiii"]).apply(null,arguments)};var dynCall_vdi=Module["dynCall_vdi"]=function(){return(dynCall_vdi=Module["dynCall_vdi"]=Module["asm"]["dynCall_vdi"]).apply(null,arguments)};var dynCall_fff=Module["dynCall_fff"]=function(){return(dynCall_fff=Module["dynCall_fff"]=Module["asm"]["dynCall_fff"]).apply(null,arguments)};var dynCall_vif=Module["dynCall_vif"]=function(){return(dynCall_vif=Module["dynCall_vif"]=Module["asm"]["dynCall_vif"]).apply(null,arguments)};var dynCall_viif=Module["dynCall_viif"]=function(){return(dynCall_viif=Module["dynCall_viif"]=Module["asm"]["dynCall_viif"]).apply(null,arguments)};var dynCall_viffff=Module["dynCall_viffff"]=function(){return(dynCall_viffff=Module["dynCall_viffff"]=Module["asm"]["dynCall_viffff"]).apply(null,arguments)};var dynCall_vid=Module["dynCall_vid"]=function(){return(dynCall_vid=Module["dynCall_vid"]=Module["asm"]["dynCall_vid"]).apply(null,arguments)};var dynCall_viiiiif=Module["dynCall_viiiiif"]=function(){return(dynCall_viiiiif=Module["dynCall_viiiiif"]=Module["asm"]["dynCall_viiiiif"]).apply(null,arguments)};var dynCall_viiiif=Module["dynCall_viiiif"]=function(){return(dynCall_viiiif=Module["dynCall_viiiif"]=Module["asm"]["dynCall_viiiif"]).apply(null,arguments)};var dynCall_viiiiiif=Module["dynCall_viiiiiif"]=function(){return(dynCall_viiiiiif=Module["dynCall_viiiiiif"]=Module["asm"]["dynCall_viiiiiif"]).apply(null,arguments)};var dynCall_iiiijiii=Module["dynCall_iiiijiii"]=function(){return(dynCall_iiiijiii=Module["dynCall_iiiijiii"]=Module["asm"]["dynCall_iiiijiii"]).apply(null,arguments)};var dynCall_iiiij=Module["dynCall_iiiij"]=function(){return(dynCall_iiiij=Module["dynCall_iiiij"]=Module["asm"]["dynCall_iiiij"]).apply(null,arguments)};var dynCall_iiif=Module["dynCall_iiif"]=function(){return(dynCall_iiif=Module["dynCall_iiif"]=Module["asm"]["dynCall_iiif"]).apply(null,arguments)};var dynCall_fif=Module["dynCall_fif"]=function(){return(dynCall_fif=Module["dynCall_fif"]=Module["asm"]["dynCall_fif"]).apply(null,arguments)};var dynCall_iiiiiifff=Module["dynCall_iiiiiifff"]=function(){return(dynCall_iiiiiifff=Module["dynCall_iiiiiifff"]=Module["asm"]["dynCall_iiiiiifff"]).apply(null,arguments)};var dynCall_iiiiiifiif=Module["dynCall_iiiiiifiif"]=function(){return(dynCall_iiiiiifiif=Module["dynCall_iiiiiifiif"]=Module["asm"]["dynCall_iiiiiifiif"]).apply(null,arguments)};var dynCall_iiiiiifiii=Module["dynCall_iiiiiifiii"]=function(){return(dynCall_iiiiiifiii=Module["dynCall_iiiiiifiii"]=Module["asm"]["dynCall_iiiiiifiii"]).apply(null,arguments)};var dynCall_iiiiiiifiif=Module["dynCall_iiiiiiifiif"]=function(){return(dynCall_iiiiiiifiif=Module["dynCall_iiiiiiifiif"]=Module["asm"]["dynCall_iiiiiiifiif"]).apply(null,arguments)};var dynCall_fiff=Module["dynCall_fiff"]=function(){return(dynCall_fiff=Module["dynCall_fiff"]=Module["asm"]["dynCall_fiff"]).apply(null,arguments)};var dynCall_fiiiiiifiifif=Module["dynCall_fiiiiiifiifif"]=function(){return(dynCall_fiiiiiifiifif=Module["dynCall_fiiiiiifiifif"]=Module["asm"]["dynCall_fiiiiiifiifif"]).apply(null,arguments)};var dynCall_fiiiiiifiiiif=Module["dynCall_fiiiiiifiiiif"]=function(){return(dynCall_fiiiiiifiiiif=Module["dynCall_fiiiiiifiiiif"]=Module["asm"]["dynCall_fiiiiiifiiiif"]).apply(null,arguments)};var dynCall_iifiiiijii=Module["dynCall_iifiiiijii"]=function(){return(dynCall_iifiiiijii=Module["dynCall_iifiiiijii"]=Module["asm"]["dynCall_iifiiiijii"]).apply(null,arguments)};var dynCall_vifif=Module["dynCall_vifif"]=function(){return(dynCall_vifif=Module["dynCall_vifif"]=Module["asm"]["dynCall_vifif"]).apply(null,arguments)};var dynCall_vifijii=Module["dynCall_vifijii"]=function(){return(dynCall_vifijii=Module["dynCall_vifijii"]=Module["asm"]["dynCall_vifijii"]).apply(null,arguments)};var dynCall_iiiifffiii=Module["dynCall_iiiifffiii"]=function(){return(dynCall_iiiifffiii=Module["dynCall_iiiifffiii"]=Module["asm"]["dynCall_iiiifffiii"]).apply(null,arguments)};var dynCall_iiiifffffi=Module["dynCall_iiiifffffi"]=function(){return(dynCall_iiiifffffi=Module["dynCall_iiiifffffi"]=Module["asm"]["dynCall_iiiifffffi"]).apply(null,arguments)};var dynCall_viffiiiif=Module["dynCall_viffiiiif"]=function(){return(dynCall_viffiiiif=Module["dynCall_viffiiiif"]=Module["asm"]["dynCall_viffiiiif"]).apply(null,arguments)};var dynCall_viffiifffffiii=Module["dynCall_viffiifffffiii"]=function(){return(dynCall_viffiifffffiii=Module["dynCall_viffiifffffiii"]=Module["asm"]["dynCall_viffiifffffiii"]).apply(null,arguments)};var dynCall_viffffiifffiiiiif=Module["dynCall_viffffiifffiiiiif"]=function(){return(dynCall_viffffiifffiiiiif=Module["dynCall_viffffiifffiiiiif"]=Module["asm"]["dynCall_viffffiifffiiiiif"]).apply(null,arguments)};var dynCall_iiiifffffii=Module["dynCall_iiiifffffii"]=function(){return(dynCall_iiiifffffii=Module["dynCall_iiiifffffii"]=Module["asm"]["dynCall_iiiifffffii"]).apply(null,arguments)};var dynCall_viiiiiiiiiiifii=Module["dynCall_viiiiiiiiiiifii"]=function(){return(dynCall_viiiiiiiiiiifii=Module["dynCall_viiiiiiiiiiifii"]=Module["asm"]["dynCall_viiiiiiiiiiifii"]).apply(null,arguments)};var dynCall_viff=Module["dynCall_viff"]=function(){return(dynCall_viff=Module["dynCall_viff"]=Module["asm"]["dynCall_viff"]).apply(null,arguments)};var dynCall_iiiifiiiii=Module["dynCall_iiiifiiiii"]=function(){return(dynCall_iiiifiiiii=Module["dynCall_iiiifiiiii"]=Module["asm"]["dynCall_iiiifiiiii"]).apply(null,arguments)};var dynCall_iiiiifiiiiif=Module["dynCall_iiiiifiiiiif"]=function(){return(dynCall_iiiiifiiiiif=Module["dynCall_iiiiifiiiiif"]=Module["asm"]["dynCall_iiiiifiiiiif"]).apply(null,arguments)};var dynCall_viiff=Module["dynCall_viiff"]=function(){return(dynCall_viiff=Module["dynCall_viiff"]=Module["asm"]["dynCall_viiff"]).apply(null,arguments)};var dynCall_viiifiiiii=Module["dynCall_viiifiiiii"]=function(){return(dynCall_viiifiiiii=Module["dynCall_viiifiiiii"]=Module["asm"]["dynCall_viiifiiiii"]).apply(null,arguments)};var dynCall_viiiifiiiiif=Module["dynCall_viiiifiiiiif"]=function(){return(dynCall_viiiifiiiiif=Module["dynCall_viiiifiiiiif"]=Module["asm"]["dynCall_viiiifiiiiif"]).apply(null,arguments)};var dynCall_iifff=Module["dynCall_iifff"]=function(){return(dynCall_iifff=Module["dynCall_iifff"]=Module["asm"]["dynCall_iifff"]).apply(null,arguments)};var dynCall_iif=Module["dynCall_iif"]=function(){return(dynCall_iif=Module["dynCall_iif"]=Module["asm"]["dynCall_iif"]).apply(null,arguments)};var dynCall_viij=Module["dynCall_viij"]=function(){return(dynCall_viij=Module["dynCall_viij"]=Module["asm"]["dynCall_viij"]).apply(null,arguments)};var dynCall_viijijj=Module["dynCall_viijijj"]=function(){return(dynCall_viijijj=Module["dynCall_viijijj"]=Module["asm"]["dynCall_viijijj"]).apply(null,arguments)};var dynCall_viijj=Module["dynCall_viijj"]=function(){return(dynCall_viijj=Module["dynCall_viijj"]=Module["asm"]["dynCall_viijj"]).apply(null,arguments)};var dynCall_viiiij=Module["dynCall_viiiij"]=function(){return(dynCall_viiiij=Module["dynCall_viiiij"]=Module["asm"]["dynCall_viiiij"]).apply(null,arguments)};var dynCall_iiijji=Module["dynCall_iiijji"]=function(){return(dynCall_iiijji=Module["dynCall_iiijji"]=Module["asm"]["dynCall_iiijji"]).apply(null,arguments)};var dynCall_ijjiiiii=Module["dynCall_ijjiiiii"]=function(){return(dynCall_ijjiiiii=Module["dynCall_ijjiiiii"]=Module["asm"]["dynCall_ijjiiiii"]).apply(null,arguments)};var dynCall_ijj=Module["dynCall_ijj"]=function(){return(dynCall_ijj=Module["dynCall_ijj"]=Module["asm"]["dynCall_ijj"]).apply(null,arguments)};var dynCall_vjji=Module["dynCall_vjji"]=function(){return(dynCall_vjji=Module["dynCall_vjji"]=Module["asm"]["dynCall_vjji"]).apply(null,arguments)};var dynCall_vidd=Module["dynCall_vidd"]=function(){return(dynCall_vidd=Module["dynCall_vidd"]=Module["asm"]["dynCall_vidd"]).apply(null,arguments)};var dynCall_iiiiiifffiiifiii=Module["dynCall_iiiiiifffiiifiii"]=function(){return(dynCall_iiiiiifffiiifiii=Module["dynCall_iiiiiifffiiifiii"]=Module["asm"]["dynCall_iiiiiifffiiifiii"]).apply(null,arguments)};var dynCall_viiif=Module["dynCall_viiif"]=function(){return(dynCall_viiif=Module["dynCall_viiif"]=Module["asm"]["dynCall_viiif"]).apply(null,arguments)};var dynCall_fiiiif=Module["dynCall_fiiiif"]=function(){return(dynCall_fiiiif=Module["dynCall_fiiiif"]=Module["asm"]["dynCall_fiiiif"]).apply(null,arguments)};var dynCall_vf=Module["dynCall_vf"]=function(){return(dynCall_vf=Module["dynCall_vf"]=Module["asm"]["dynCall_vf"]).apply(null,arguments)};var dynCall_vffff=Module["dynCall_vffff"]=function(){return(dynCall_vffff=Module["dynCall_vffff"]=Module["asm"]["dynCall_vffff"]).apply(null,arguments)};var dynCall_vff=Module["dynCall_vff"]=function(){return(dynCall_vff=Module["dynCall_vff"]=Module["asm"]["dynCall_vff"]).apply(null,arguments)};var dynCall_iiij=Module["dynCall_iiij"]=function(){return(dynCall_iiij=Module["dynCall_iiij"]=Module["asm"]["dynCall_iiij"]).apply(null,arguments)};var dynCall_vifff=Module["dynCall_vifff"]=function(){return(dynCall_vifff=Module["dynCall_vifff"]=Module["asm"]["dynCall_vifff"]).apply(null,arguments)};var dynCall_viifff=Module["dynCall_viifff"]=function(){return(dynCall_viifff=Module["dynCall_viifff"]=Module["asm"]["dynCall_viifff"]).apply(null,arguments)};var dynCall_vij=Module["dynCall_vij"]=function(){return(dynCall_vij=Module["dynCall_vij"]=Module["asm"]["dynCall_vij"]).apply(null,arguments)};var dynCall_ij=Module["dynCall_ij"]=function(){return(dynCall_ij=Module["dynCall_ij"]=Module["asm"]["dynCall_ij"]).apply(null,arguments)};var dynCall_f=Module["dynCall_f"]=function(){return(dynCall_f=Module["dynCall_f"]=Module["asm"]["dynCall_f"]).apply(null,arguments)};var dynCall_vfff=Module["dynCall_vfff"]=function(){return(dynCall_vfff=Module["dynCall_vfff"]=Module["asm"]["dynCall_vfff"]).apply(null,arguments)};var dynCall_ff=Module["dynCall_ff"]=function(){return(dynCall_ff=Module["dynCall_ff"]=Module["asm"]["dynCall_ff"]).apply(null,arguments)};var dynCall_viififf=Module["dynCall_viififf"]=function(){return(dynCall_viififf=Module["dynCall_viififf"]=Module["asm"]["dynCall_viififf"]).apply(null,arguments)};var dynCall_vififfi=Module["dynCall_vififfi"]=function(){return(dynCall_vififfi=Module["dynCall_vififfi"]=Module["asm"]["dynCall_vififfi"]).apply(null,arguments)};var dynCall_iiiiiiffiiiiiiiiiffffiii=Module["dynCall_iiiiiiffiiiiiiiiiffffiii"]=function(){return(dynCall_iiiiiiffiiiiiiiiiffffiii=Module["dynCall_iiiiiiffiiiiiiiiiffffiii"]=Module["asm"]["dynCall_iiiiiiffiiiiiiiiiffffiii"]).apply(null,arguments)};var dynCall_viififi=Module["dynCall_viififi"]=function(){return(dynCall_viififi=Module["dynCall_viififi"]=Module["asm"]["dynCall_viififi"]).apply(null,arguments)};var dynCall_if=Module["dynCall_if"]=function(){return(dynCall_if=Module["dynCall_if"]=Module["asm"]["dynCall_if"]).apply(null,arguments)};var dynCall_viiffiiiiiiiii=Module["dynCall_viiffiiiiiiiii"]=function(){return(dynCall_viiffiiiiiiiii=Module["dynCall_viiffiiiiiiiii"]=Module["asm"]["dynCall_viiffiiiiiiiii"]).apply(null,arguments)};var dynCall_viiffiiiiii=Module["dynCall_viiffiiiiii"]=function(){return(dynCall_viiffiiiiii=Module["dynCall_viiffiiiiii"]=Module["asm"]["dynCall_viiffiiiiii"]).apply(null,arguments)};var dynCall_viiiiiiiijiii=Module["dynCall_viiiiiiiijiii"]=function(){return(dynCall_viiiiiiiijiii=Module["dynCall_viiiiiiiijiii"]=Module["asm"]["dynCall_viiiiiiiijiii"]).apply(null,arguments)};function invoke_ii(index,a1){var sp=stackSave();try{return dynCall_ii(index,a1)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_v(index){var sp=stackSave();try{dynCall_v(index)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vii(index,a1,a2){var sp=stackSave();try{dynCall_vii(index,a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iii(index,a1,a2){var sp=stackSave();try{return dynCall_iii(index,a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vi(index,a1){var sp=stackSave();try{dynCall_vi(index,a1)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiii(index,a1,a2,a3){var sp=stackSave();try{return dynCall_iiii(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiii(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_iiiii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiiii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_iiiiii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viii(index,a1,a2,a3){var sp=stackSave();try{dynCall_viii(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_i(index){var sp=stackSave();try{return dynCall_i(index)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiii(index,a1,a2,a3,a4){var sp=stackSave();try{dynCall_viiii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{return dynCall_iiiiiii(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiiiiii(index,a1,a2,a3,a4,a5,a6,a7){var sp=stackSave();try{return dynCall_iiiiiiii(index,a1,a2,a3,a4,a5,a6,a7)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10){var sp=stackSave();try{return dynCall_iiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_fiii(index,a1,a2,a3){var sp=stackSave();try{return dynCall_fiii(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_diii(index,a1,a2,a3){var sp=stackSave();try{return dynCall_diii(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7){var sp=stackSave();try{dynCall_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11){var sp=stackSave();try{return dynCall_iiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10){var sp=stackSave();try{dynCall_viiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{dynCall_viiiiii(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8){var sp=stackSave();try{dynCall_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{dynCall_viiiii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiidii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{return dynCall_iiiidii(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiifii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{return dynCall_iiiifii(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_ddiii(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_ddiii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiifii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_iiifii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viifi(index,a1,a2,a3,a4){var sp=stackSave();try{dynCall_viifi(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiffi(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_iiffi(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vifi(index,a1,a2,a3){var sp=stackSave();try{dynCall_vifi(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_dii(index,a1,a2){var sp=stackSave();try{return dynCall_dii(index,a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_diidi(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_diidi(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_fii(index,a1,a2){var sp=stackSave();try{return dynCall_fii(index,a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_fiifi(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_fiifi(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viffi(index,a1,a2,a3,a4){var sp=stackSave();try{dynCall_viffi(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiifi(index,a1,a2,a3,a4,a5){var sp=stackSave();try{dynCall_viiifi(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vidi(index,a1,a2,a3){var sp=stackSave();try{dynCall_vidi(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiffi(index,a1,a2,a3,a4,a5){var sp=stackSave();try{dynCall_viiffi(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viidi(index,a1,a2,a3,a4){var sp=stackSave();try{dynCall_viidi(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viffii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{dynCall_viffii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_fiiii(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_fiiii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_diiii(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_diiii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_fi(index,a1){var sp=stackSave();try{return dynCall_fi(index,a1)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iifii(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_iifii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiffii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_iiffii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iifi(index,a1,a2,a3){var sp=stackSave();try{return dynCall_iifi(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9){var sp=stackSave();try{return dynCall_iiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiiifiifiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13){var sp=stackSave();try{dynCall_viiiiiifiifiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiiifddfiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13){var sp=stackSave();try{dynCall_viiiiiifddfiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_ifi(index,a1,a2){var sp=stackSave();try{return dynCall_ifi(index,a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_idi(index,a1,a2){var sp=stackSave();try{return dynCall_idi(index,a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9){var sp=stackSave();try{dynCall_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12){var sp=stackSave();try{dynCall_viiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13){var sp=stackSave();try{dynCall_viiiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_fffi(index,a1,a2,a3){var sp=stackSave();try{return dynCall_fffi(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_dddi(index,a1,a2,a3){var sp=stackSave();try{return dynCall_dddi(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iidi(index,a1,a2,a3){var sp=stackSave();try{return dynCall_iidi(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viifii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{dynCall_viifii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vifii(index,a1,a2,a3,a4){var sp=stackSave();try{dynCall_vifii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8){var sp=stackSave();try{return dynCall_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_ffi(index,a1,a2){var sp=stackSave();try{return dynCall_ffi(index,a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiifi(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_iiifi(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_fiiifi(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_fiiifi(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iifiii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_iifiii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viidii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{dynCall_viidii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viddii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{dynCall_viddii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiiiffffiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13){var sp=stackSave();try{dynCall_viiiiiiffffiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiifi(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{dynCall_viiiifi(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiifi(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_iiiifi(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vidd(index,a1,a2,a3){var sp=stackSave();try{dynCall_vidd(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iij(index,a1,a2,a3){var sp=stackSave();try{return dynCall_iij(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiijiii(index,a1,a2,a3,a4,a5,a6,a7){var sp=stackSave();try{return dynCall_iiijiii(index,a1,a2,a3,a4,a5,a6,a7)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jiiii(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_jiiii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_ji(index,a1){var sp=stackSave();try{return dynCall_ji(index,a1)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jii(index,a1,a2){var sp=stackSave();try{return dynCall_jii(index,a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viijii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{dynCall_viijii(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiiij(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{return dynCall_iiiiij(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_j(index){var sp=stackSave();try{return dynCall_j(index)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jiii(index,a1,a2,a3){var sp=stackSave();try{return dynCall_jiii(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiijii(index,a1,a2,a3,a4,a5,a6,a7){var sp=stackSave();try{return dynCall_iiiijii(index,a1,a2,a3,a4,a5,a6,a7)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iji(index,a1,a2,a3){var sp=stackSave();try{return dynCall_iji(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiijii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{return dynCall_iiijii(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiji(index,a1,a2,a3,a4,a5){var sp=stackSave();try{dynCall_viiji(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iijiii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{return dynCall_iijiii(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vijii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{dynCall_vijii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_ijji(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_ijji(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiji(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_iiji(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viji(index,a1,a2,a3,a4){var sp=stackSave();try{dynCall_viji(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jiiji(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_jiiji(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jdi(index,a1,a2){var sp=stackSave();try{return dynCall_jdi(index,a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vijiiii(index,a1,a2,a3,a4,a5,a6,a7){var sp=stackSave();try{dynCall_vijiiii(index,a1,a2,a3,a4,a5,a6,a7)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vijiii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{dynCall_vijiii(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jji(index,a1,a2,a3){var sp=stackSave();try{return dynCall_jji(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiji(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{dynCall_viiiji(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_fiji(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_fiji(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iijii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_iijii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiiifjjfiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15){var sp=stackSave();try{dynCall_viiiiiifjjfiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jjji(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_jjji(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiiiiiiiji(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11){var sp=stackSave();try{return dynCall_iiiiiiiiiji(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vji(index,a1,a2,a3){var sp=stackSave();try{dynCall_vji(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vijjji(index,a1,a2,a3,a4,a5,a6,a7,a8){var sp=stackSave();try{dynCall_vijjji(index,a1,a2,a3,a4,a5,a6,a7,a8)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jijii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_jijii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viijiiijiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13){var sp=stackSave();try{dynCall_viijiiijiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiijjii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9){var sp=stackSave();try{return dynCall_iiiijjii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iijjiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11){var sp=stackSave();try{return dynCall_iijjiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iijiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9){var sp=stackSave();try{return dynCall_iijiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jjii(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_jjii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_dji(index,a1,a2,a3){var sp=stackSave();try{return dynCall_dji(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiijii(index,a1,a2,a3,a4,a5,a6,a7,a8){var sp=stackSave();try{dynCall_viiiijii(index,a1,a2,a3,a4,a5,a6,a7,a8)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_fijii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_fijii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jiji(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_jiji(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iijji(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{return dynCall_iijji(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vjjjiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10){var sp=stackSave();try{dynCall_vjjjiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vjiiiii(index,a1,a2,a3,a4,a5,a6,a7){var sp=stackSave();try{dynCall_vjiiiii(index,a1,a2,a3,a4,a5,a6,a7)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10){var sp=stackSave();try{return dynCall_jiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jiiiii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return dynCall_jiiiii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}Module["ccall"]=ccall;Module["cwrap"]=cwrap;Module["stackTrace"]=stackTrace;Module["addRunDependency"]=addRunDependency;Module["removeRunDependency"]=removeRunDependency;Module["FS_createPath"]=FS.createPath;Module["FS_createDataFile"]=FS.createDataFile;Module["stackTrace"]=stackTrace;var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];args=args||[];var argc=args.length+1;var argv=stackAlloc((argc+1)*4);HEAP32[argv>>2]=allocateUTF8OnStack(thisProgram);for(var i=1;i<argc;i++){HEAP32[(argv>>2)+i]=allocateUTF8OnStack(args[i-1])}HEAP32[(argv>>2)+argc]=0;try{var ret=entryFunction(argc,argv);exit(ret,true);return ret}catch(e){return handleException(e)}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();readyPromiseResolve(Module);if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){EXITSTATUS=status;procExit(status)}function procExit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();


  return unityFramework.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = unityFramework;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return unityFramework; });
else if (typeof exports === 'object')
  exports["unityFramework"] = unityFramework;
