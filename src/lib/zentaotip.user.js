// ==UserScript==
// @name       禅道任务悬浮球
// @namespace  npm/vite-plugin-monkey
// @version    1.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      *://*/*
// @grant      GM.xmlHttpRequest
// @grant      GM_addStyle
// @grant      GM_cookie
// @grant      GM_getValue
// @grant      GM_setValue
// @noframes
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(" a.svelte-198qsgl.svelte-198qsgl{font-weight:500;color:#646cff;text-decoration:inherit}a.svelte-198qsgl.svelte-198qsgl:hover{color:#535bf2}button.svelte-198qsgl.svelte-198qsgl{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button.svelte-198qsgl.svelte-198qsgl:hover{border-color:#646cff}button.svelte-198qsgl.svelte-198qsgl:focus,button.svelte-198qsgl.svelte-198qsgl:focus-visible{outline:4px auto -webkit-focus-ring-color}.table-container.svelte-198qsgl.svelte-198qsgl{pointer-events:auto;width:fit-content;height:fit-content;margin:20px;filter:drop-shadow(0px 4px 4px rgba(0,0,0,.25));display:flex;flex-direction:column;align-items:flex-end}.circle.svelte-198qsgl.svelte-198qsgl{background-color:#2f3c61;color:#fff;border-radius:50%;text-align:center;line-height:20px;font-size:12px;overflow:hidden}table.svelte-198qsgl.svelte-198qsgl{width:fit-content;border-collapse:collapse;margin-right:30px;transform-origin:top right}.task-container.svelte-198qsgl.svelte-198qsgl{max-height:250px;overflow:scroll}.task-container.svelte-198qsgl.svelte-198qsgl::-webkit-scrollbar{display:none}.taskTip.svelte-198qsgl.svelte-198qsgl{text-align:center;padding:10px}table.svelte-198qsgl.svelte-198qsgl,td.svelte-198qsgl.svelte-198qsgl,th.svelte-198qsgl.svelte-198qsgl{border:1px solid #e6e6e6}th.svelte-198qsgl.svelte-198qsgl,tbody.svelte-198qsgl td.svelte-198qsgl{text-align:left;padding:8px}thead.svelte-198qsgl>tr.svelte-198qsgl,thead.svelte-198qsgl th.svelte-198qsgl{background-color:#2f3c61;color:#ffffffea}tbody.svelte-198qsgl>tr.svelte-198qsgl{background-color:snow}tbody.svelte-198qsgl>tr.svelte-198qsgl:hover{background-color:#ebf0f8}thead.svelte-198qsgl.svelte-198qsgl{position:sticky;top:0;z-index:10000}.draggable-table.svelte-198qsgl.svelte-198qsgl{position:relative;cursor:grab}.app.svelte-54w07h{position:fixed;z-index:100000;top:0;right:0;font-size:15px;pointer-events:none;font-family:Inter,Avenir,Helvetica,Arial,sans-serif;color-scheme:light dark;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%} ");

(function () {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  function noop() {
  }
  const identity = (x) => x;
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  const is_client = typeof window !== "undefined";
  let now = is_client ? () => window.performance.now() : () => Date.now();
  let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
  const tasks = /* @__PURE__ */ new Set();
  function run_tasks(now2) {
    tasks.forEach((task) => {
      if (!task.c(now2)) {
        tasks.delete(task);
        task.f();
      }
    });
    if (tasks.size !== 0) raf(run_tasks);
  }
  function loop(callback) {
    let task;
    if (tasks.size === 0) raf(run_tasks);
    return {
      promise: new Promise((fulfill) => {
        tasks.add(task = { c: callback, f: fulfill });
      }),
      abort() {
        tasks.delete(task);
      }
    };
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function get_root_for_style(node) {
    if (!node) return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && /** @type {ShadowRoot} */
    root.host) {
      return (
        /** @type {ShadowRoot} */
        root
      );
    }
    return node.ownerDocument;
  }
  function append_empty_stylesheet(node) {
    const style_element = element("style");
    style_element.textContent = "/* empty */";
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
  }
  function append_stylesheet(node, style) {
    append(
      /** @type {Document} */
      node.head || node,
      style
    );
    return style.sheet;
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i]) iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function prevent_default(fn) {
    return function(event) {
      event.preventDefault();
      return fn.call(this, event);
    };
  }
  function attr(node, attribute, value) {
    if (value == null) node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.data === data) return;
    text2.data = /** @type {string} */
    data;
  }
  function set_style(node, key, value, important) {
    if (value == null) {
      node.style.removeProperty(key);
    } else {
      node.style.setProperty(key, value, "");
    }
  }
  function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    return new CustomEvent(type, { detail, bubbles, cancelable });
  }
  const managed_styles = /* @__PURE__ */ new Map();
  let active = 0;
  function hash(str) {
    let hash2 = 5381;
    let i = str.length;
    while (i--) hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
    return hash2 >>> 0;
  }
  function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
  }
  function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = "{\n";
    for (let p = 0; p <= 1; p += step) {
      const t = a + (b - a) * ease(p);
      keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
      rules[name] = true;
      stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || "";
    node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
  }
  function delete_rule(node, name) {
    const previous = (node.style.animation || "").split(", ");
    const next = previous.filter(
      name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1
      // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
      node.style.animation = next.join(", ");
      active -= deleted;
      if (!active) clear_rules();
    }
  }
  function clear_rules() {
    raf(() => {
      if (active) return;
      managed_styles.forEach((info) => {
        const { ownerNode } = info.stylesheet;
        if (ownerNode) detach(ownerNode);
      });
      managed_styles.clear();
    });
  }
  let current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component) throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  const dirty_components = [];
  const binding_callbacks = [];
  let render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = /* @__PURE__ */ Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  const seen_callbacks = /* @__PURE__ */ new Set();
  let flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length) binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }
  let promise;
  function wait() {
    if (!promise) {
      promise = Promise.resolve();
      promise.then(() => {
        promise = null;
      });
    }
    return promise;
  }
  function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
  }
  const outroing = /* @__PURE__ */ new Set();
  let outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
      // parent group
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block)) return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2) block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }
  const null_transition = { duration: 0 };
  function create_in_transition(node, fn, params) {
    const options = { direction: "in" };
    let config = fn(node, params, options);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
      if (animation_name) delete_rule(node, animation_name);
    }
    function go() {
      const {
        delay = 0,
        duration = 300,
        easing = identity,
        tick = noop,
        css
      } = config || null_transition;
      if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
      tick(0, 1);
      const start_time = now() + delay;
      const end_time = start_time + duration;
      if (task) task.abort();
      running = true;
      add_render_callback(() => dispatch(node, true, "start"));
      task = loop((now2) => {
        if (running) {
          if (now2 >= end_time) {
            tick(1, 0);
            dispatch(node, true, "end");
            cleanup();
            return running = false;
          }
          if (now2 >= start_time) {
            const t = easing((now2 - start_time) / duration);
            tick(t, 1 - t);
          }
        }
        return running;
      });
    }
    let started = false;
    return {
      start() {
        if (started) return;
        started = true;
        delete_rule(node);
        if (is_function(config)) {
          config = config(options);
          wait().then(go);
        } else {
          go();
        }
      },
      invalidate() {
        started = false;
      },
      end() {
        if (running) {
          cleanup();
          running = false;
        }
      }
    };
  }
  function create_out_transition(node, fn, params) {
    const options = { direction: "out" };
    let config = fn(node, params, options);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    let original_inert_value;
    function go() {
      const {
        delay = 0,
        duration = 300,
        easing = identity,
        tick = noop,
        css
      } = config || null_transition;
      if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
      const start_time = now() + delay;
      const end_time = start_time + duration;
      add_render_callback(() => dispatch(node, false, "start"));
      if ("inert" in node) {
        original_inert_value = /** @type {HTMLElement} */
        node.inert;
        node.inert = true;
      }
      loop((now2) => {
        if (running) {
          if (now2 >= end_time) {
            tick(0, 1);
            dispatch(node, false, "end");
            if (!--group.r) {
              run_all(group.c);
            }
            return false;
          }
          if (now2 >= start_time) {
            const t = easing((now2 - start_time) / duration);
            tick(1 - t, t);
          }
        }
        return running;
      });
    }
    if (is_function(config)) {
      wait().then(() => {
        config = config(options);
        go();
      });
    } else {
      go();
    }
    return {
      end(reset) {
        if (reset && "inert" in node) {
          node.inert = original_inert_value;
        }
        if (reset && config.tick) {
          config.tick(1, 0);
        }
        if (running) {
          if (animation_name) delete_rule(node, animation_name);
          running = false;
        }
      }
    };
  }
  function ensure_array_like(array_like_or_iterator) {
    return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance2, create_fragment2, not_equal, props, append_styles = null, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
        if (ready) make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro) transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      flush();
    }
    set_current_component(parent_component);
  }
  class SvelteComponent {
    constructor() {
      /**
       * ### PRIVATE API
       *
       * Do not use, may change at any time
       *
       * @type {any}
       */
      __publicField(this, "$$");
      /**
       * ### PRIVATE API
       *
       * Do not use, may change at any time
       *
       * @type {any}
       */
      __publicField(this, "$$set");
    }
    /** @returns {void} */
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    /**
     * @template {Extract<keyof Events, string>} K
     * @param {K} type
     * @param {((e: Events[K]) => void) | null | undefined} callback
     * @returns {() => void}
     */
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
    /**
     * @param {Partial<Props>} props
     * @returns {void}
     */
    $set(props) {
      if (this.$$set && !is_empty(props)) {
        this.$$.skip_bound = true;
        this.$$set(props);
        this.$$.skip_bound = false;
      }
    }
  }
  const PUBLIC_VERSION = "4";
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
  var _GM = /* @__PURE__ */ (() => typeof GM != "undefined" ? GM : void 0)();
  var _GM_cookie = /* @__PURE__ */ (() => typeof GM_cookie != "undefined" ? GM_cookie : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  function cubicOut(t) {
    const f = t - 1;
    return f * f * f + 1;
  }
  function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === "none" ? "" : style.transform;
    const sd = 1 - start;
    const od = target_opacity * (1 - opacity);
    return {
      delay,
      duration,
      easing,
      css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
    };
  }
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[21] = list[i];
    return child_ctx;
  }
  function get_each_context_1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[24] = list[i];
    return child_ctx;
  }
  function create_if_block_2(ctx) {
    let table;
    return {
      c() {
        table = element("table");
        table.innerHTML = `<div class="taskTip svelte-198qsgl">有新任务！</div>`;
        attr(table, "class", "svelte-198qsgl");
      },
      m(target, anchor) {
        insert(target, table, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(table);
        }
      }
    };
  }
  function create_if_block(ctx) {
    let table;
    let table_intro;
    let table_outro;
    let current;
    function select_block_type_1(ctx2, dirty) {
      if (
        /*tasks*/
        ctx2[0].length == 0
      ) return create_if_block_1;
      return create_else_block;
    }
    let current_block_type = select_block_type_1(ctx);
    let if_block = current_block_type(ctx);
    return {
      c() {
        table = element("table");
        if_block.c();
        attr(table, "class", "svelte-198qsgl");
      },
      m(target, anchor) {
        insert(target, table, anchor);
        if_block.m(table, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (current_block_type === (current_block_type = select_block_type_1(ctx2)) && if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(table, null);
          }
        }
      },
      i(local) {
        if (current) return;
        if (local) {
          add_render_callback(() => {
            if (!current) return;
            if (table_outro) table_outro.end(1);
            table_intro = create_in_transition(table, scale, { duration: 300 });
            table_intro.start();
          });
        }
        current = true;
      },
      o(local) {
        if (table_intro) table_intro.invalidate();
        if (local) {
          table_outro = create_out_transition(table, scale, { duration: 300 });
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(table);
        }
        if_block.d();
        if (detaching && table_outro) table_outro.end();
      }
    };
  }
  function create_else_block(ctx) {
    let thead;
    let t7;
    let tbody;
    let each_value = ensure_array_like(
      /*tasks*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }
    return {
      c() {
        thead = element("thead");
        thead.innerHTML = `<tr class="svelte-198qsgl"><th class="svelte-198qsgl">任务名称</th> <th class="svelte-198qsgl">创建者</th> <th class="svelte-198qsgl">截止日期</th> <th class="svelte-198qsgl">操作</th></tr>`;
        t7 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(thead, "class", "svelte-198qsgl");
        attr(tbody, "class", "svelte-198qsgl");
      },
      m(target, anchor) {
        insert(target, thead, anchor);
        insert(target, t7, anchor);
        insert(target, tbody, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*tasks*/
        1) {
          each_value = ensure_array_like(
            /*tasks*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(tbody, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(thead);
          detach(t7);
          detach(tbody);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_if_block_1(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        div.textContent = "没有任务！";
        attr(div, "class", "taskTip svelte-198qsgl");
      },
      m(target, anchor) {
        insert(target, div, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_each_block_1(ctx) {
    let a;
    let t0_value = (
      /*action*/
      ctx[24].title + ""
    );
    let t0;
    let t1;
    let a_href_value;
    return {
      c() {
        a = element("a");
        t0 = text(t0_value);
        t1 = text(" ");
        attr(a, "href", a_href_value = /*action*/
        ctx[24].href);
        attr(a, "target", "_blank");
        attr(a, "class", "svelte-198qsgl");
      },
      m(target, anchor) {
        insert(target, a, anchor);
        append(a, t0);
        append(a, t1);
      },
      p(ctx2, dirty) {
        if (dirty & /*tasks*/
        1 && t0_value !== (t0_value = /*action*/
        ctx2[24].title + "")) set_data(t0, t0_value);
        if (dirty & /*tasks*/
        1 && a_href_value !== (a_href_value = /*action*/
        ctx2[24].href)) {
          attr(a, "href", a_href_value);
        }
      },
      d(detaching) {
        if (detaching) {
          detach(a);
        }
      }
    };
  }
  function create_each_block(ctx) {
    let tr;
    let td0;
    let a;
    let t0_value = (
      /*task*/
      ctx[21].name + ""
    );
    let t0;
    let a_href_value;
    let t1;
    let td1;
    let t2_value = (
      /*task*/
      ctx[21].createdBy + ""
    );
    let t2;
    let t3;
    let td2;
    let t4_value = (
      /*task*/
      ctx[21].deadline + ""
    );
    let t4;
    let t5;
    let td3;
    let t6;
    let each_value_1 = ensure_array_like(
      /*task*/
      ctx[21].actions
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    }
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        a = element("a");
        t0 = text(t0_value);
        t1 = space();
        td1 = element("td");
        t2 = text(t2_value);
        t3 = space();
        td2 = element("td");
        t4 = text(t4_value);
        t5 = space();
        td3 = element("td");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t6 = space();
        attr(a, "href", a_href_value = /*task*/
        ctx[21].link);
        attr(a, "target", "_blank");
        attr(a, "class", "svelte-198qsgl");
        attr(td0, "class", "svelte-198qsgl");
        attr(td1, "class", "svelte-198qsgl");
        attr(td2, "class", "svelte-198qsgl");
        attr(td3, "class", "svelte-198qsgl");
        attr(tr, "class", "svelte-198qsgl");
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, a);
        append(a, t0);
        append(tr, t1);
        append(tr, td1);
        append(td1, t2);
        append(tr, t3);
        append(tr, td2);
        append(td2, t4);
        append(tr, t5);
        append(tr, td3);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(td3, null);
          }
        }
        append(tr, t6);
      },
      p(ctx2, dirty) {
        if (dirty & /*tasks*/
        1 && t0_value !== (t0_value = /*task*/
        ctx2[21].name + "")) set_data(t0, t0_value);
        if (dirty & /*tasks*/
        1 && a_href_value !== (a_href_value = /*task*/
        ctx2[21].link)) {
          attr(a, "href", a_href_value);
        }
        if (dirty & /*tasks*/
        1 && t2_value !== (t2_value = /*task*/
        ctx2[21].createdBy + "")) set_data(t2, t2_value);
        if (dirty & /*tasks*/
        1 && t4_value !== (t4_value = /*task*/
        ctx2[21].deadline + "")) set_data(t4, t4_value);
        if (dirty & /*tasks*/
        1) {
          each_value_1 = ensure_array_like(
            /*task*/
            ctx2[21].actions
          );
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_1(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_1(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(td3, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_1.length;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_fragment$1(ctx) {
    let div1;
    let button;
    let t1;
    let div0;
    let current_block_type_index;
    let if_block;
    let mounted;
    let dispose;
    const if_block_creators = [create_if_block, create_if_block_2];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*show*/
        ctx2[3]
      ) return 0;
      if (
        /*hasNewTask*/
        ctx2[4]
      ) return 1;
      return -1;
    }
    if (~(current_block_type_index = select_block_type(ctx))) {
      if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    }
    return {
      c() {
        div1 = element("div");
        button = element("button");
        button.textContent = "T";
        t1 = space();
        div0 = element("div");
        if (if_block) if_block.c();
        attr(button, "class", "circle svelte-198qsgl");
        attr(button, "title", "左键为未完成，右键为已完成");
        attr(div0, "class", "task-container svelte-198qsgl");
        attr(div1, "class", "table-container draggable-table svelte-198qsgl");
        attr(div1, "role", "button");
        attr(div1, "tabindex", "0");
        set_style(
          div1,
          "left",
          /*offsetX*/
          ctx[1] + "px"
        );
        set_style(
          div1,
          "top",
          /*offsetY*/
          ctx[2] + "px"
        );
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, button);
        append(div1, t1);
        append(div1, div0);
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].m(div0, null);
        }
        if (!mounted) {
          dispose = [
            listen(
              button,
              "click",
              /*onCircleClick*/
              ctx[6]
            ),
            listen(button, "contextmenu", prevent_default(
              /*onRightClick*/
              ctx[7]
            )),
            listen(
              div1,
              "mousedown",
              /*onMouseDown*/
              ctx[5]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2);
        if (current_block_type_index === previous_block_index) {
          if (~current_block_type_index) {
            if_blocks[current_block_type_index].p(ctx2, dirty);
          }
        } else {
          if (if_block) {
            group_outros();
            transition_out(if_blocks[previous_block_index], 1, 1, () => {
              if_blocks[previous_block_index] = null;
            });
            check_outros();
          }
          if (~current_block_type_index) {
            if_block = if_blocks[current_block_type_index];
            if (!if_block) {
              if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
              if_block.c();
            } else {
              if_block.p(ctx2, dirty);
            }
            transition_in(if_block, 1);
            if_block.m(div0, null);
          } else {
            if_block = null;
          }
        }
        if (dirty & /*offsetX*/
        2) {
          set_style(
            div1,
            "left",
            /*offsetX*/
            ctx2[1] + "px"
          );
        }
        if (dirty & /*offsetY*/
        4) {
          set_style(
            div1,
            "top",
            /*offsetY*/
            ctx2[2] + "px"
          );
        }
      },
      i(local) {
        transition_in(if_block);
      },
      o(local) {
        transition_out(if_block);
      },
      d(detaching) {
        if (detaching) {
          detach(div1);
        }
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].d();
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function arraysAreEqual(array1, array2) {
    const string1 = JSON.stringify(array1);
    const string2 = JSON.stringify(array2);
    return string1 === string2;
  }
  function instance($$self, $$props, $$invalidate) {
    var TaskStatus;
    (function(TaskStatus2) {
      TaskStatus2["DOING"] = "http://project.gsitcloud.com/zentao/my-task.html";
      TaskStatus2["DONE"] = "http://project.gsitcloud.com/zentao/my-task-finishedBy-id_asc-0-20-1.html";
      TaskStatus2["ORIGIN"] = "http://project.gsitcloud.com";
    })(TaskStatus || (TaskStatus = {}));
    let tasks2 = [];
    const getTask = async (url) => {
      const myHeaders = new Headers();
      myHeaders.append("Cookie", document.cookie);
      const requestOptions = {
        method: "GET",
        headers: { Cookie: document.cookie }
      };
      const res = await _GM.xmlHttpRequest({ url, ...requestOptions });
      const result = res.responseText;
      const list = parseTasks(result);
      return list;
    };
    function parseTasks(htmlString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const tbody = doc.querySelector("#mainContent tbody");
      const tasks3 = [];
      if (tbody === null) return tasks3;
      tbody.querySelectorAll("tr").forEach((tr) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        if (tr === null) return;
        const task = {
          id: (_b = (_a = tr.querySelector(".c-id div label + label")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim(),
          priority: (_d = (_c = tr.querySelector(".c-pri .label-pri")) == null ? void 0 : _c.textContent) == null ? void 0 : _d.trim(),
          project: (_f = (_e = tr.querySelector(".c-project a")) == null ? void 0 : _e.textContent) == null ? void 0 : _f.trim(),
          name: (_h = (_g = tr.querySelector(".c-name a")) == null ? void 0 : _g.textContent) == null ? void 0 : _h.trim(),
          link: TaskStatus.ORIGIN + ((_j = (_i = tr.querySelector(".c-name a")) == null ? void 0 : _i.attributes.getNamedItem("href")) == null ? void 0 : _j.value),
          createdBy: (_l = (_k = tr.querySelector(".c-user")) == null ? void 0 : _k.textContent) == null ? void 0 : _l.trim(),
          assignedTo: (_n = (_m = tr.querySelector(".c-assignedTo span")) == null ? void 0 : _m.textContent) == null ? void 0 : _n.trim(),
          finishedBy: (_p = (_o = tr.querySelectorAll(".c-user")[1]) == null ? void 0 : _o.textContent) == null ? void 0 : _p.trim(),
          estimate: (_r = (_q = tr.querySelector(".c-hours")) == null ? void 0 : _q.textContent) == null ? void 0 : _r.trim(),
          consumed: (_t = (_s = tr.querySelectorAll(".c-hours")[1]) == null ? void 0 : _s.textContent) == null ? void 0 : _t.trim(),
          left: (_v = (_u = tr.querySelectorAll(".c-hours")[2]) == null ? void 0 : _u.textContent) == null ? void 0 : _v.trim(),
          deadline: (_x = (_w = tr.querySelector(".c-date")) == null ? void 0 : _w.textContent) == null ? void 0 : _x.trim(),
          status: (_z = (_y = tr.querySelector(".c-status span")) == null ? void 0 : _y.textContent) == null ? void 0 : _z.trim(),
          actions: Array.from(tr.querySelectorAll(".c-actions a")).map((a) => {
            var _a2, _b2;
            const href = (_a2 = a.attributes.getNamedItem("href")) == null ? void 0 : _a2.value;
            const title = (_b2 = a.attributes.getNamedItem("title")) == null ? void 0 : _b2.value;
            return { href: TaskStatus.ORIGIN + href, title };
          })
        };
        tasks3.push(task);
      });
      return tasks3;
    }
    let isDragging = false;
    let isClick = true;
    let startX, startY;
    let offsetX = 0, offsetY = 0;
    function onMouseDown(event) {
      console.log("down", event);
      isClick = true;
      isDragging = true;
      startX = event.clientX - offsetX;
      startY = event.clientY - offsetY;
      console.log(startX, startY);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    function onMouseMove(event) {
      isClick = false;
      console.log("move");
      if (isDragging) {
        $$invalidate(1, offsetX = event.clientX - startX);
        $$invalidate(2, offsetY = event.clientY - startY);
      }
    }
    function onMouseUp(event) {
      console.log("up", isDragging);
      isDragging = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    let show = false;
    async function onCircleClick(event) {
      console.log("click");
      console.log(isDragging);
      if (isClick) {
        if (!show) {
          const list = await getTask(TaskStatus.DOING);
          $$invalidate(4, hasNewTask = false);
          $$invalidate(0, tasks2 = list);
        }
        $$invalidate(3, show = !show);
      }
    }
    async function onRightClick(event) {
      if (isClick) {
        if (!show) {
          const list = await getTask(TaskStatus.DONE);
          $$invalidate(4, hasNewTask = false);
          $$invalidate(0, tasks2 = list);
        }
        $$invalidate(3, show = !show);
      }
    }
    let hasNewTask = false;
    const getDataAuto = async () => {
      const list = await getTask(TaskStatus.DOING);
      const oldTask = getLocal("tasks");
      if (oldTask == void 0 || list.length && !arraysAreEqual(list, oldTask)) {
        console.log(list, tasks2);
        setLocal("tasks", list);
        $$invalidate(0, tasks2 = list);
        $$invalidate(4, hasNewTask = true);
      }
    };
    const setLocal = (key, list) => {
      _GM_setValue(key, JSON.stringify(list));
    };
    const getLocal = (key) => {
      const list = _GM_getValue(key, "[]");
      return JSON.parse(list);
    };
    const getCookie = async () => {
      console.log(await _GM_cookie.list({ url: TaskStatus.ORIGIN }));
    };
    onMount(() => {
      getCookie();
      setInterval(getDataAuto, 1e3 * 10);
    });
    return [
      tasks2,
      offsetX,
      offsetY,
      show,
      hasNewTask,
      onMouseDown,
      onCircleClick,
      onRightClick
    ];
  }
  class TaskTable extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment$1, safe_not_equal, {});
    }
  }
  function create_fragment(ctx) {
    let main;
    let tasktable;
    let current;
    tasktable = new TaskTable({});
    return {
      c() {
        main = element("main");
        create_component(tasktable.$$.fragment);
        attr(main, "class", "app svelte-54w07h");
      },
      m(target, anchor) {
        insert(target, main, anchor);
        mount_component(tasktable, main, null);
        current = true;
      },
      p: noop,
      i(local) {
        if (current) return;
        transition_in(tasktable.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tasktable.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(main);
        }
        destroy_component(tasktable);
      }
    };
  }
  class App extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment, safe_not_equal, {});
    }
  }
  new App({
    target: (() => {
      const app2 = document.createElement("div");
      document.body.append(app2);
      return app2;
    })()
  });

})();