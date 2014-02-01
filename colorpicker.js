(function(g, p, n) {
    function v(a) {
        if (g.event && g.event.contentOverflow !== n) return {
            x: g.event.offsetX,
            y: g.event.offsetY
        };
        if (a.offsetX !== n && a.offsetY !== n) return {
            x: a.offsetX,
            y: a.offsetY
        };
        var b = a.target.parentNode.parentNode;
        return {
            x: a.layerX - b.offsetLeft,
            y: a.layerY - b.offsetTop
        }
    }
    function e(a, b, c) {
        a = p.createElementNS(z, a);
        for (var d in b) a.setAttribute(d, b[d]);
        "[object Array]" != Object.prototype.toString.call(c) && (c = [c]);
        b = 0;
        for (d = c[0] && c.length || 0; b < d; b++) a.appendChild(c[b]);
        return a
    }
    function h(a) {
        var b, c, d,
        j, e = a.h % 360 / 60;
        j = a.v * a.s;
        d = j * (1 - Math.abs(e % 2 - 1));
        b = c = a = a.v - j;
        e = ~~e;
        b += [j, d, 0, 0, d, j][e];
        c += [d, j, j, d, 0, 0][e];
        a += [0, 0, d, j, j, d][e];
        d = Math.floor(255 * b);
        c = Math.floor(255 * c);
        a = Math.floor(255 * a);
        return {
            r: d,
            g: c,
            b: a,
            hex: "#" + (16777216 | a | c << 8 | d << 16).toString(16).slice(1)
        }
    }
    function q(a) {
        var b = a.r,
            c = a.g,
            d = a.b;
        if (1 < a.r || 1 < a.g || 1 < a.b) b /= 255, c /= 255, d /= 255;
        var e;
        a = Math.max(b, c, d);
        e = a - Math.min(b, c, d);
        b = 60 * ((0 == e ? 0 : a == b ? (c - d) / e + (c < d ? 6 : 0) : a == c ? (d - b) / e + 2 : (b - c) / e + 4) % 6);
        return {
            h: b,
            s: 0 == e ? 0 : e / a,
            v: a
        }
    }
    function w(a, b, c) {
        return function(d) {
            d = d || g.event;
            d = v(d);
            a.h = 360 * (d.y / b.offsetHeight) + s;
            a.s = a.v = 1;
            var e = h({
                h: a.h,
                s: 1,
                v: 1
            });
            c.style.backgroundColor = e.hex;
            a.callback && a.callback(e.hex, {
                h: a.h - s,
                s: a.s,
                v: a.v
            }, {
                r: e.r,
                g: e.g,
                b: e.b
            }, n, d)
        }
    }
    function x(a, b) {
        return function(c) {
            c = c || g.event;
            c = v(c);
            var d = b.offsetHeight;
            a.s = c.x / b.offsetWidth;
            a.v = (d - c.y) / d;
            d = h(a);
            a.callback && a.callback(d.hex, {
                h: a.h - s,
                s: a.s,
                v: a.v
            }, {
                r: d.r,
                g: d.g,
                b: d.b
            }, c)
        }
    }
    function f(a, b, c) {
        if (!(this instanceof f)) return new f(a, b, c);
        this.h = 0;
        this.v = this.s = 1;
        if (c) this.callback = c, this.pickerElement = b, this.slideElement = a;
        else {
            a.innerHTML = A;
            this.slideElement = a.getElementsByClassName("slide")[0];
            this.pickerElement = a.getElementsByClassName("picker")[0];
            var d = a.getElementsByClassName("slide-indicator")[0],
                e = a.getElementsByClassName("picker-indicator")[0];
            f.fixIndicators(d, e);
            this.callback = function(a, c, g, h, k) {
                f.positionIndicators(d, e, k, h);
                b(a, c, g)
            }
        }
        "SVG" == t ? (a = k.getElementsByTagName("linearGradient")[0], c = k.getElementsByTagName("rect")[0], a.id = "gradient-hsv-" + r, c.setAttribute("fill", "url(#" + a.id + ")"), a = l.getElementsByTagName("linearGradient"), c = l.getElementsByTagName("rect"), a[0].id = "gradient-black-" + r, a[1].id = "gradient-white-" + r, c[0].setAttribute("fill", "url(#" + a[1].id + ")"), c[1].setAttribute("fill", "url(#" + a[0].id + ")"), this.slideElement.appendChild(k.cloneNode(!0)), this.pickerElement.appendChild(l.cloneNode(!0)), r++) : (this.slideElement.innerHTML = k, this.pickerElement.innerHTML = l);
        m(this.slideElement, "click", w(this, this.slideElement, this.pickerElement));
        m(this.pickerElement, "click", x(this,
        this.pickerElement));
        y(this, this.slideElement, w(this, this.slideElement, this.pickerElement));
        y(this, this.pickerElement, x(this, this.pickerElement))
    }
    function m(a, b, c) {
        a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1)
    }
    function y(a, b, c) {
        var d = !1;
        m(b, "mousedown", function() {
            d = !0
        });
        m(b, "mouseup", function() {
            d = !1
        });
        m(b, "mouseout", function() {
            d = !1
        });
        m(b, "mousemove", function(a) {
            d && c(a)
        })
    }
    function u(a, b, c, d) {
        a.h = b.h % 360;
        a.s = b.s;
        a.v = b.v;
        b = h(a);
        var e = {
            y: a.h * a.slideElement.offsetHeight / 360,
            x: 0
        }, f = a.pickerElement.offsetHeight,
            f = {
                x: a.s * a.pickerElement.offsetWidth,
                y: f - a.v * f
            };
        a.pickerElement.style.backgroundColor = h({
            h: a.h,
            s: 1,
            v: 1
        }).hex;
        a.callback && a.callback(d || b.hex, {
            h: a.h,
            s: a.s,
            v: a.v
        }, c || {
            r: b.r,
            g: b.g,
            b: b.b
        }, f, e);
        return a
    }
    var t = g.SVGAngle || p.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML",
        l, k, s = 15,
        z = "http://www.w3.org/2000/svg",
        A = '<div class="picker-wrapper"><div class="picker"></div><div class="picker-indicator"></div></div><div class="slide-wrapper"><div class="slide"></div><div class="slide-indicator"></div></div>';
    "SVG" == t ? (k = e("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        version: "1.1",
        width: "100%",
        height: "100%"
    }, [e("defs", {}, e("linearGradient", {
        id: "gradient-hsv",
        x1: "0%",
        y1: "100%",
        x2: "0%",
        y2: "0%"
    }, [e("stop", {
        offset: "0%",
        "stop-color": "#FF0000",
        "stop-opacity": "1"
    }), e("stop", {
        offset: "13%",
        "stop-color": "#FF00FF",
        "stop-opacity": "1"
    }), e("stop", {
        offset: "25%",
        "stop-color": "#8000FF",
        "stop-opacity": "1"
    }), e("stop", {
        offset: "38%",
        "stop-color": "#0040FF",
        "stop-opacity": "1"
    }), e("stop", {
        offset: "50%",
        "stop-color": "#00FFFF",
        "stop-opacity": "1"
    }),
    e("stop", {
        offset: "63%",
        "stop-color": "#00FF40",
        "stop-opacity": "1"
    }), e("stop", {
        offset: "75%",
        "stop-color": "#0BED00",
        "stop-opacity": "1"
    }), e("stop", {
        offset: "88%",
        "stop-color": "#FFFF00",
        "stop-opacity": "1"
    }), e("stop", {
        offset: "100%",
        "stop-color": "#FF0000",
        "stop-opacity": "1"
    })])), e("rect", {
        x: "0",
        y: "0",
        width: "100%",
        height: "100%",
        fill: "url(#gradient-hsv)"
    })]), l = e("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        version: "1.1",
        width: "100%",
        height: "100%"
    }, [e("defs", {}, [e("linearGradient", {
        id: "gradient-black",
        x1: "0%",
        y1: "100%",
        x2: "0%",
        y2: "0%"
    }, [e("stop", {
        offset: "0%",
        "stop-color": "#000000",
        "stop-opacity": "1"
    }), e("stop", {
        offset: "100%",
        "stop-color": "#CC9A81",
        "stop-opacity": "0"
    })]), e("linearGradient", {
        id: "gradient-white",
        x1: "0%",
        y1: "100%",
        x2: "100%",
        y2: "100%"
    }, [e("stop", {
        offset: "0%",
        "stop-color": "#FFFFFF",
        "stop-opacity": "1"
    }), e("stop", {
        offset: "100%",
        "stop-color": "#CC9A81",
        "stop-opacity": "0"
    })])]), e("rect", {
        x: "0",
        y: "0",
        width: "100%",
        height: "100%",
        fill: "url(#gradient-white)"
    }), e("rect", {
        x: "0",
        y: "0",
        width: "100%",
        height: "100%",
        fill: "url(#gradient-black)"
    })])) : "VML" == t && (k = '<DIV style="position: relative; width: 100%; height: 100%"><v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t"><v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill></v:rect></DIV>', l = '<DIV style="position: relative; width: 100%; height: 100%"><v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t"><v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill></v:rect><v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t"><v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill></v:rect></DIV>',
    p.namespaces.v || p.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"));
    var r = 0;
    f.hsv2rgb = function(a) {
        a = h(a);
        delete a.hex;
        return a
    };
    f.hsv2hex = function(a) {
        return h(a).hex
    };
    f.rgb2hsv = q;
    f.rgb2hex = function(a) {
        return h(q(a)).hex
    };
    f.hex2hsv = function(a) {
        return q(f.hex2rgb(a))
    };
    f.hex2rgb = function(a) {
        return {
            r: parseInt(a.substr(1, 2), 16),
            g: parseInt(a.substr(3, 2), 16),
            b: parseInt(a.substr(5, 2), 16)
        }
    };
    f.prototype.setHsv = function(a) {
        return u(this, a)
    };
    f.prototype.setRgb = function(a) {
        return u(this, q(a),
        a)
    };
    f.prototype.setHex = function(a) {
        return u(this, f.hex2hsv(a), n, a)
    };
    f.positionIndicators = function(a, b, c, d) {
        c && (b.style.left = "auto", b.style.right = "0px", b.style.top = "0px", a.style.top = c.y - a.offsetHeight / 2 + "px");
        d && (b.style.top = d.y - b.offsetHeight / 2 + "px", b.style.left = d.x - b.offsetWidth / 2 + "px")
    };
    f.fixIndicators = function(a, b) {
        b.style.pointerEvents = "none";
        a.style.pointerEvents = "none"
    };
    g.ColorPicker = f
})(window, window.document); 