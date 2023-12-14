
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';
	const https = require('node:https')
    function noop$1() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop$1;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    const contenteditable_truthy_values = ['', true, 1, 'true', 'contenteditable'];

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
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
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    /**
     * List of attributes that should always be set through the attr method,
     * because updating them through the property setter doesn't work reliably.
     * In the example of `width`/`height`, the problem is that the setter only
     * accepts numeric values, but the attribute can also be set to a string like `50%`.
     * If this list becomes too big, rethink this approach.
     */
    const always_set_through_set_attribute = ['width', 'height'];
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function select_option(select, value, mounting) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        if (!mounting || value !== undefined) {
            select.selectedIndex = -1; // no option should be selected
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked');
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-getcontext
     */
    function getContext(key) {
        return get_current_component().$$.context.get(key);
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
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
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
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
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
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
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
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop$1,
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
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$1;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop$1;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function set_data_contenteditable_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function set_data_maybe_contenteditable_dev(text, data, attr_value) {
        if (~contenteditable_truthy_values.indexOf(attr_value)) {
            set_data_contenteditable_dev(text, data);
        }
        else {
            set_data_dev(text, data);
        }
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /*
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     */

    const isUndefined$1 = value => typeof value === "undefined";

    const isFunction$1 = value => typeof value === "function";

    const isNumber$1 = value => typeof value === "number";

    function createCounter() {
    	let i = 0;
    	/**
    	 * Returns an id and increments the internal state
    	 * @returns {number}
    	 */
    	return () => i++;
    }

    /**
     * Create a globally unique id
     *
     * @returns {string} An id
     */
    function createGlobalId() {
    	return Math.random().toString(36).substring(2);
    }

    const isSSR = typeof window === "undefined";

    function addListener(target, type, handler) {
    	target.addEventListener(type, handler);
    	return () => target.removeEventListener(type, handler);
    }

    const createInlineStyle = (disableInlineStyles, style) =>
    	disableInlineStyles ? {} : { style };
    const createMarkerProps = disableInlineStyles => ({
    	"aria-hidden": "true",
    	...createInlineStyle(disableInlineStyles, "display:none;"),
    });

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier} [start]
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=} start
     */
    function writable(value, start = noop$1) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop$1) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop$1;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let started = false;
            const values = [];
            let pending = 0;
            let cleanup = noop$1;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop$1;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (started) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            started = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
                // We need to set this to false because callbacks can still happen despite having unsubscribed:
                // Callbacks might already be placed in the queue which doesn't know it should no longer
                // invoke this derived store.
                started = false;
            };
        });
    }

    /*
     * Adapted from https://github.com/EmilTholin/svelte-routing
     *
     * https://github.com/EmilTholin/svelte-routing/blob/master/LICENSE
     */

    const createKey = ctxName => `@@svnav-ctx__${ctxName}`;

    // Use strings instead of objects, so different versions of
    // svelte-navigator can potentially still work together
    const LOCATION = createKey("LOCATION");
    const ROUTER = createKey("ROUTER");
    const ROUTE = createKey("ROUTE");
    const ROUTE_PARAMS = createKey("ROUTE_PARAMS");
    const FOCUS_ELEM = createKey("FOCUS_ELEM");

    const paramRegex = /^:(.+)/;

    const substr = (str, start, end) => str.substr(start, end);

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    const startsWith = (string, search) =>
    	substr(string, 0, search.length) === search;

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    const isRootSegment = segment => segment === "";

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    const isDynamic = segment => paramRegex.test(segment);

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    const isSplat = segment => segment[0] === "*";

    /**
     * Strip potention splat and splatname of the end of a path
     * @param {string} str
     * @return {string}
     */
    const stripSplat = str => str.replace(/\*.*$/, "");

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    const stripSlashes = str => str.replace(/(^\/+|\/+$)/g, "");

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri, filterFalsy = false) {
    	const segments = stripSlashes(uri).split("/");
    	return filterFalsy ? segments.filter(Boolean) : segments;
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    const addQuery = (pathname, query) =>
    	pathname + (query ? `?${query}` : "");

    /**
     * Normalizes a basepath
     *
     * @param {string} path
     * @returns {string}
     *
     * @example
     * normalizePath("base/path/") // -> "/base/path"
     */
    const normalizePath = path => `/${stripSlashes(path)}`;

    /**
     * Joins and normalizes multiple path fragments
     *
     * @param {...string} pathFragments
     * @returns {string}
     */
    function join(...pathFragments) {
    	const joinFragment = fragment => segmentize(fragment, true).join("/");
    	const joinedSegments = pathFragments.map(joinFragment).join("/");
    	return normalizePath(joinedSegments);
    }

    // We start from 1 here, so we can check if an origin id has been passed
    // by using `originId || <fallback>`
    const LINK_ID = 1;
    const ROUTE_ID = 2;
    const ROUTER_ID = 3;
    const USE_FOCUS_ID = 4;
    const USE_LOCATION_ID = 5;
    const USE_MATCH_ID = 6;
    const USE_NAVIGATE_ID = 7;
    const USE_PARAMS_ID = 8;
    const USE_RESOLVABLE_ID = 9;
    const USE_RESOLVE_ID = 10;
    const NAVIGATE_ID = 11;

    const labels = {
    	[LINK_ID]: "Link",
    	[ROUTE_ID]: "Route",
    	[ROUTER_ID]: "Router",
    	[USE_FOCUS_ID]: "useFocus",
    	[USE_LOCATION_ID]: "useLocation",
    	[USE_MATCH_ID]: "useMatch",
    	[USE_NAVIGATE_ID]: "useNavigate",
    	[USE_PARAMS_ID]: "useParams",
    	[USE_RESOLVABLE_ID]: "useResolvable",
    	[USE_RESOLVE_ID]: "useResolve",
    	[NAVIGATE_ID]: "navigate",
    };

    const createLabel = labelId => labels[labelId];

    function createIdentifier(labelId, props) {
    	let attr;
    	if (labelId === ROUTE_ID) {
    		attr = props.path ? `path="${props.path}"` : "default";
    	} else if (labelId === LINK_ID) {
    		attr = `to="${props.to}"`;
    	} else if (labelId === ROUTER_ID) {
    		attr = `basepath="${props.basepath || ""}"`;
    	}
    	return `<${createLabel(labelId)} ${attr || ""} />`;
    }

    function createMessage(labelId, message, props, originId) {
    	const origin = props && createIdentifier(originId || labelId, props);
    	const originMsg = origin ? `\n\nOccurred in: ${origin}` : "";
    	const label = createLabel(labelId);
    	const msg = isFunction$1(message) ? message(label) : message;
    	return `<${label}> ${msg}${originMsg}`;
    }

    const createMessageHandler =
    	handler =>
    	(...args) =>
    		handler(createMessage(...args));

    const fail = createMessageHandler(message => {
    	throw new Error(message);
    });

    // eslint-disable-next-line no-console
    const warn = createMessageHandler(console.warn);

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
    	const score = route.default
    		? 0
    		: segmentize(route.fullPath).reduce((acc, segment) => {
    				let nextScore = acc;
    				nextScore += SEGMENT_POINTS;

    				if (isRootSegment(segment)) {
    					nextScore += ROOT_POINTS;
    				} else if (isDynamic(segment)) {
    					nextScore += DYNAMIC_POINTS;
    				} else if (isSplat(segment)) {
    					nextScore -= SEGMENT_POINTS + SPLAT_PENALTY;
    				} else {
    					nextScore += STATIC_POINTS;
    				}

    				return nextScore;
    		  }, 0);

    	return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
    	return (
    		routes
    			.map(rankRoute)
    			// If two routes have the exact same score, we go by index instead
    			.sort((a, b) => {
    				if (a.score < b.score) {
    					return 1;
    				}
    				if (a.score > b.score) {
    					return -1;
    				}
    				return a.index - b.index;
    			})
    	);
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { fullPath, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
    	let bestMatch;
    	let defaultMatch;

    	const [uriPathname] = uri.split("?");
    	const uriSegments = segmentize(uriPathname);
    	const isRootUri = uriSegments[0] === "";
    	const ranked = rankRoutes(routes);

    	for (let i = 0, l = ranked.length; i < l; i++) {
    		const { route } = ranked[i];
    		let missed = false;
    		const params = {};

    		// eslint-disable-next-line no-shadow
    		const createMatch = uri => ({ ...route, params, uri });

    		if (route.default) {
    			defaultMatch = createMatch(uri);
    			continue;
    		}

    		const routeSegments = segmentize(route.fullPath);
    		const max = Math.max(uriSegments.length, routeSegments.length);
    		let index = 0;

    		for (; index < max; index++) {
    			const routeSegment = routeSegments[index];
    			const uriSegment = uriSegments[index];

    			if (!isUndefined$1(routeSegment) && isSplat(routeSegment)) {
    				// Hit a splat, just grab the rest, and return a match
    				// uri:   /files/documents/work
    				// route: /files/* or /files/*splatname
    				const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

    				params[splatName] = uriSegments
    					.slice(index)
    					.map(decodeURIComponent)
    					.join("/");
    				break;
    			}

    			if (isUndefined$1(uriSegment)) {
    				// URI is shorter than the route, no match
    				// uri:   /users
    				// route: /users/:userId
    				missed = true;
    				break;
    			}

    			const dynamicMatch = paramRegex.exec(routeSegment);

    			if (dynamicMatch && !isRootUri) {
    				const value = decodeURIComponent(uriSegment);
    				params[dynamicMatch[1]] = value;
    			} else if (routeSegment !== uriSegment) {
    				// Current segments don't match, not dynamic, not splat, so no match
    				// uri:   /users/123/settings
    				// route: /users/:id/profile
    				missed = true;
    				break;
    			}
    		}

    		if (!missed) {
    			bestMatch = createMatch(join(...uriSegments.slice(0, index)));
    			break;
    		}
    	}

    	return bestMatch || defaultMatch || null;
    }

    /**
     * Check if the `route.fullPath` matches the `uri`.
     * @param {Object} route
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
    	return pick([route], uri);
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
    	// /foo/bar, /baz/qux => /foo/bar
    	if (startsWith(to, "/")) {
    		return to;
    	}

    	const [toPathname, toQuery] = to.split("?");
    	const [basePathname] = base.split("?");
    	const toSegments = segmentize(toPathname);
    	const baseSegments = segmentize(basePathname);

    	// ?a=b, /users?b=c => /users?a=b
    	if (toSegments[0] === "") {
    		return addQuery(basePathname, toQuery);
    	}

    	// profile, /users/789 => /users/789/profile
    	if (!startsWith(toSegments[0], ".")) {
    		const pathname = baseSegments.concat(toSegments).join("/");
    		return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
    	}

    	// ./       , /users/123 => /users/123
    	// ../      , /users/123 => /users
    	// ../..    , /users/123 => /
    	// ../../one, /a/b/c/d   => /a/b/one
    	// .././one , /a/b/c/d   => /a/b/c/one
    	const allSegments = baseSegments.concat(toSegments);
    	const segments = [];

    	allSegments.forEach(segment => {
    		if (segment === "..") {
    			segments.pop();
    		} else if (segment !== ".") {
    			segments.push(segment);
    		}
    	});

    	return addQuery(`/${segments.join("/")}`, toQuery);
    }

    /**
     * Normalizes a location for consumption by `Route` children and the `Router`.
     * It removes the apps basepath from the pathname
     * and sets default values for `search` and `hash` properties.
     *
     * @param {Object} location The current global location supplied by the history component
     * @param {string} basepath The applications basepath (i.e. when serving from a subdirectory)
     *
     * @returns The normalized location
     */
    function normalizeLocation(location, basepath) {
    	const { pathname, hash = "", search = "", state } = location;
    	const baseSegments = segmentize(basepath, true);
    	const pathSegments = segmentize(pathname, true);
    	while (baseSegments.length) {
    		if (baseSegments[0] !== pathSegments[0]) {
    			fail(
    				ROUTER_ID,
    				`Invalid state: All locations must begin with the basepath "${basepath}", found "${pathname}"`,
    			);
    		}
    		baseSegments.shift();
    		pathSegments.shift();
    	}
    	return {
    		pathname: join(...pathSegments),
    		hash,
    		search,
    		state,
    	};
    }

    const normalizeUrlFragment = frag => (frag.length === 1 ? "" : frag);

    /**
     * Creates a location object from an url.
     * It is used to create a location from the url prop used in SSR
     *
     * @param {string} url The url string (e.g. "/path/to/somewhere")
     * @returns {{ pathname: string; search: string; hash: string }} The location
     *
     * @example
     * ```js
     * const path = "/search?q=falafel#result-3";
     * const location = parsePath(path);
     * // -> {
     * //   pathname: "/search",
     * //   search: "?q=falafel",
     * //   hash: "#result-3",
     * // };
     * ```
     */
    const parsePath = path => {
    	const searchIndex = path.indexOf("?");
    	const hashIndex = path.indexOf("#");
    	const hasSearchIndex = searchIndex !== -1;
    	const hasHashIndex = hashIndex !== -1;
    	const hash = hasHashIndex
    		? normalizeUrlFragment(substr(path, hashIndex))
    		: "";
    	const pathnameAndSearch = hasHashIndex ? substr(path, 0, hashIndex) : path;
    	const search = hasSearchIndex
    		? normalizeUrlFragment(substr(pathnameAndSearch, searchIndex))
    		: "";
    	const pathname =
    		(hasSearchIndex
    			? substr(pathnameAndSearch, 0, searchIndex)
    			: pathnameAndSearch) || "/";
    	return { pathname, search, hash };
    };

    /**
     * Resolves a link relative to the parent Route and the Routers basepath.
     *
     * @param {string} path The given path, that will be resolved
     * @param {string} routeBase The current Routes base path
     * @param {string} appBase The basepath of the app. Used, when serving from a subdirectory
     * @returns {string} The resolved path
     *
     * @example
     * resolveLink("relative", "/routeBase", "/") // -> "/routeBase/relative"
     * resolveLink("/absolute", "/routeBase", "/") // -> "/absolute"
     * resolveLink("relative", "/routeBase", "/base") // -> "/base/routeBase/relative"
     * resolveLink("/absolute", "/routeBase", "/base") // -> "/base/absolute"
     */
    function resolveLink(path, routeBase, appBase) {
    	return join(appBase, resolve(path, routeBase));
    }

    /**
     * Get the uri for a Route, by matching it against the current location.
     *
     * @param {string} routePath The Routes resolved path
     * @param {string} pathname The current locations pathname
     */
    function extractBaseUri(routePath, pathname) {
    	const fullPath = normalizePath(stripSplat(routePath));
    	const baseSegments = segmentize(fullPath, true);
    	const pathSegments = segmentize(pathname, true).slice(0, baseSegments.length);
    	const routeMatch = match({ fullPath }, join(...pathSegments));
    	return routeMatch && routeMatch.uri;
    }

    /*
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     */


    const POP = "POP";
    const PUSH = "PUSH";
    const REPLACE = "REPLACE";

    function getLocation(source) {
    	return {
    		...source.location,
    		pathname: encodeURI(decodeURI(source.location.pathname)),
    		state: source.history.state,
    		_key: (source.history.state && source.history.state._key) || "initial",
    	};
    }

    function createHistory(source) {
    	let listeners = [];
    	let location = getLocation(source);
    	let action = POP;

    	const notifyListeners = (listenerFns = listeners) =>
    		listenerFns.forEach(listener => listener({ location, action }));

    	return {
    		get location() {
    			return location;
    		},
    		listen(listener) {
    			listeners.push(listener);

    			const popstateListener = () => {
    				location = getLocation(source);
    				action = POP;
    				notifyListeners([listener]);
    			};

    			// Call listener when it is registered
    			notifyListeners([listener]);

    			const unlisten = addListener(source, "popstate", popstateListener);
    			return () => {
    				unlisten();
    				listeners = listeners.filter(fn => fn !== listener);
    			};
    		},
    		/**
    		 * Navigate to a new absolute route.
    		 *
    		 * @param {string|number} to The path to navigate to.
    		 *
    		 * If `to` is a number we will navigate to the stack entry index + `to`
    		 * (-> `navigate(-1)`, is equivalent to hitting the back button of the browser)
    		 * @param {Object} options
    		 * @param {*} [options.state] The state will be accessible through `location.state`
    		 * @param {boolean} [options.replace=false] Replace the current entry in the history
    		 * stack, instead of pushing on a new one
    		 */
    		navigate(to, options) {
    			const { state = {}, replace = false } = options || {};
    			action = replace ? REPLACE : PUSH;
    			if (isNumber$1(to)) {
    				if (options) {
    					warn(
    						NAVIGATE_ID,
    						"Navigation options (state or replace) are not supported, " +
    							"when passing a number as the first argument to navigate. " +
    							"They are ignored.",
    					);
    				}
    				action = POP;
    				source.history.go(to);
    			} else {
    				const keyedState = { ...state, _key: createGlobalId() };
    				// try...catch iOS Safari limits to 100 pushState calls
    				try {
    					source.history[replace ? "replaceState" : "pushState"](
    						keyedState,
    						"",
    						to,
    					);
    				} catch (e) {
    					source.location[replace ? "replace" : "assign"](to);
    				}
    			}

    			location = getLocation(source);
    			notifyListeners();
    		},
    	};
    }

    function createStackFrame(state, uri) {
    	return { ...parsePath(uri), state };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
    	let index = 0;
    	let stack = [createStackFrame(null, initialPathname)];

    	return {
    		// This is just for testing...
    		get entries() {
    			return stack;
    		},
    		get location() {
    			return stack[index];
    		},
    		addEventListener() {},
    		removeEventListener() {},
    		history: {
    			get state() {
    				return stack[index].state;
    			},
    			pushState(state, title, uri) {
    				index++;
    				// Throw away anything in the stack with an index greater than the current index.
    				// This happens, when we go back using `go(-n)`. The index is now less than `stack.length`.
    				// If we call `go(+n)` the stack entries with an index greater than the current index can
    				// be reused.
    				// However, if we navigate to a path, instead of a number, we want to create a new branch
    				// of navigation.
    				stack = stack.slice(0, index);
    				stack.push(createStackFrame(state, uri));
    			},
    			replaceState(state, title, uri) {
    				stack[index] = createStackFrame(state, uri);
    			},
    			go(to) {
    				const newIndex = index + to;
    				if (newIndex < 0 || newIndex > stack.length - 1) {
    					return;
    				}
    				index = newIndex;
    			},
    		},
    	};
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = !!(
    	!isSSR &&
    	window.document &&
    	window.document.createElement
    );
    // Use memory history in iframes (for example in Svelte REPL)
    const isEmbeddedPage = !isSSR && window.location.origin === "null";
    const globalHistory = createHistory(
    	canUseDOM && !isEmbeddedPage ? window : createMemorySource(),
    );
    const { navigate } = globalHistory;

    // We need to keep the focus candidate in a separate file, so svelte does
    // not update, when we mutate it.
    // Also, we need a single global reference, because taking focus needs to
    // work globally, even if we have multiple top level routers
    // eslint-disable-next-line import/no-mutable-exports
    let focusCandidate = null;

    // eslint-disable-next-line import/no-mutable-exports
    let initialNavigation = true;

    /**
     * Check if RouterA is above RouterB in the document
     * @param {number} routerIdA The first Routers id
     * @param {number} routerIdB The second Routers id
     */
    function isAbove(routerIdA, routerIdB) {
    	const routerMarkers = document.querySelectorAll("[data-svnav-router]");
    	for (let i = 0; i < routerMarkers.length; i++) {
    		const node = routerMarkers[i];
    		const currentId = Number(node.dataset.svnavRouter);
    		if (currentId === routerIdA) return true;
    		if (currentId === routerIdB) return false;
    	}
    	return false;
    }

    /**
     * Check if a Route candidate is the best choice to move focus to,
     * and store the best match.
     * @param {{
         level: number;
         routerId: number;
         route: {
           id: number;
           focusElement: import("svelte/store").Readable<Promise<Element>|null>;
         }
       }} item A Route candidate, that updated and is visible after a navigation
     */
    function pushFocusCandidate(item) {
    	if (
    		// Best candidate if it's the only candidate...
    		!focusCandidate ||
    		// Route is nested deeper, than previous candidate
    		// -> Route change was triggered in the deepest affected
    		// Route, so that's were focus should move to
    		item.level > focusCandidate.level ||
    		// If the level is identical, we want to focus the first Route in the document,
    		// so we pick the first Router lookin from page top to page bottom.
    		(item.level === focusCandidate.level &&
    			isAbove(item.routerId, focusCandidate.routerId))
    	) {
    		focusCandidate = item;
    	}
    }

    /**
     * Reset the focus candidate.
     */
    function clearFocusCandidate() {
    	focusCandidate = null;
    }

    function initialNavigationOccurred() {
    	initialNavigation = false;
    }

    /*
     * `focus` Adapted from https://github.com/oaf-project/oaf-side-effects/blob/master/src/index.ts
     *
     * https://github.com/oaf-project/oaf-side-effects/blob/master/LICENSE
     */
    function focus(elem) {
    	if (!elem) return false;
    	const TABINDEX = "tabindex";
    	try {
    		if (!elem.hasAttribute(TABINDEX)) {
    			elem.setAttribute(TABINDEX, "-1");
    			let unlisten;
    			// We remove tabindex after blur to avoid weird browser behavior
    			// where a mouse click can activate elements with tabindex="-1".
    			const blurListener = () => {
    				elem.removeAttribute(TABINDEX);
    				unlisten();
    			};
    			unlisten = addListener(elem, "blur", blurListener);
    		}
    		elem.focus();
    		return document.activeElement === elem;
    	} catch (e) {
    		// Apparently trying to focus a disabled element in IE can throw.
    		// See https://stackoverflow.com/a/1600194/2476884
    		return false;
    	}
    }

    function isEndMarker(elem, id) {
    	return Number(elem.dataset.svnavRouteEnd) === id;
    }

    function isHeading(elem) {
    	return /^H[1-6]$/i.test(elem.tagName);
    }

    function query(selector, parent = document) {
    	return parent.querySelector(selector);
    }

    function queryHeading(id) {
    	const marker = query(`[data-svnav-route-start="${id}"]`);
    	let current = marker.nextElementSibling;
    	while (!isEndMarker(current, id)) {
    		if (isHeading(current)) {
    			return current;
    		}
    		const heading = query("h1,h2,h3,h4,h5,h6", current);
    		if (heading) {
    			return heading;
    		}
    		current = current.nextElementSibling;
    	}
    	return null;
    }

    function handleFocus(route) {
    	Promise.resolve(get_store_value(route.focusElement)).then(elem => {
    		const focusElement = elem || queryHeading(route.id);
    		if (!focusElement) {
    			warn(
    				ROUTER_ID,
    				"Could not find an element to focus. " +
    					"You should always render a header for accessibility reasons, " +
    					'or set a custom focus element via the "useFocus" hook. ' +
    					"If you don't want this Route or Router to manage focus, " +
    					'pass "primary={false}" to it.',
    				route,
    				ROUTE_ID,
    			);
    		}
    		const headingFocused = focus(focusElement);
    		if (headingFocused) return;
    		focus(document.documentElement);
    	});
    }

    const createTriggerFocus =
    	(a11yConfig, announcementText, location) =>
    	(manageFocus, announceNavigation) =>
    		// Wait until the dom is updated, so we can look for headings
    		tick().then(() => {
    			if (!focusCandidate || initialNavigation) {
    				initialNavigationOccurred();
    				return;
    			}
    			if (manageFocus) {
    				handleFocus(focusCandidate.route);
    			}
    			if (a11yConfig.announcements && announceNavigation) {
    				const { path, fullPath, meta, params, uri } = focusCandidate.route;
    				const announcementMessage = a11yConfig.createAnnouncement(
    					{ path, fullPath, meta, params, uri },
    					get_store_value(location),
    				);
    				Promise.resolve(announcementMessage).then(message => {
    					announcementText.set(message);
    				});
    			}
    			clearFocusCandidate();
    		});

    const visuallyHiddenStyle =
    	"position:fixed;" +
    	"top:-1px;" +
    	"left:0;" +
    	"width:1px;" +
    	"height:1px;" +
    	"padding:0;" +
    	"overflow:hidden;" +
    	"clip:rect(0,0,0,0);" +
    	"white-space:nowrap;" +
    	"border:0;";

    /* node_modules\svelte-navigator\src\Router.svelte generated by Svelte v3.59.2 */

    const file$v = "node_modules\\svelte-navigator\\src\\Router.svelte";

    // (204:0) {#if isTopLevelRouter && manageFocus && a11yConfig.announcements}
    function create_if_block$b(ctx) {
    	let div;
    	let t;

    	let div_levels = [
    		{ role: "status" },
    		{ "aria-atomic": "true" },
    		{ "aria-live": "polite" },
    		{ "data-svnav-announcer": "" },
    		createInlineStyle(/*shouldDisableInlineStyles*/ ctx[6], visuallyHiddenStyle)
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*$announcementText*/ ctx[0]);
    			set_attributes(div, div_data);
    			add_location(div, file$v, 204, 1, 6149);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$announcementText*/ 1) set_data_maybe_contenteditable_dev(t, /*$announcementText*/ ctx[0], div_data['contenteditable']);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(204:0) {#if isTopLevelRouter && manageFocus && a11yConfig.announcements}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$y(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let if_block_anchor;
    	let current;

    	let div_levels = [
    		createMarkerProps(/*shouldDisableInlineStyles*/ ctx[6]),
    		{ "data-svnav-router": /*routerId*/ ctx[3] }
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const default_slot_template = /*#slots*/ ctx[22].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[21], null);
    	let if_block = /*isTopLevelRouter*/ ctx[2] && /*manageFocus*/ ctx[4] && /*a11yConfig*/ ctx[1].announcements && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = space();
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			set_attributes(div, div_data);
    			add_location(div, file$v, 196, 0, 5982);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t0, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 2097152)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[21],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[21])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[21], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*isTopLevelRouter*/ ctx[2] && /*manageFocus*/ ctx[4] && /*a11yConfig*/ ctx[1].announcements) if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t0);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const createId$1 = createCounter();
    const defaultBasepath = "/";

    function instance$y($$self, $$props, $$invalidate) {
    	let $location;
    	let $activeRoute;
    	let $prevLocation;
    	let $routes;
    	let $announcementText;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = defaultBasepath } = $$props;
    	let { url = null } = $$props;
    	let { history = globalHistory } = $$props;
    	let { primary = true } = $$props;
    	let { a11y = {} } = $$props;
    	let { disableInlineStyles = false } = $$props;

    	const a11yConfig = {
    		createAnnouncement: route => `Navigated to ${route.uri}`,
    		announcements: true,
    		...a11y
    	};

    	// Remember the initial `basepath`, so we can fire a warning
    	// when the user changes it later
    	const initialBasepath = basepath;

    	const normalizedBasepath = normalizePath(basepath);
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const isTopLevelRouter = !locationContext;
    	const routerId = createId$1();
    	const manageFocus = primary && !(routerContext && !routerContext.manageFocus);
    	const announcementText = writable("");
    	validate_store(announcementText, 'announcementText');
    	component_subscribe($$self, announcementText, value => $$invalidate(0, $announcementText = value));

    	const shouldDisableInlineStyles = routerContext
    	? routerContext.disableInlineStyles
    	: disableInlineStyles;

    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(20, $routes = value));
    	const activeRoute = writable(null);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(18, $activeRoute = value));

    	// Used in SSR to synchronously set that a Route is active.
    	let hasActiveRoute = false;

    	// Nesting level of router.
    	// We will need this to identify sibling routers, when moving
    	// focus on navigation, so we can focus the first possible router
    	const level = isTopLevelRouter ? 0 : routerContext.level + 1;

    	// If we're running an SSR we force the location to the `url` prop
    	const getInitialLocation = () => normalizeLocation(isSSR ? parsePath(url) : history.location, normalizedBasepath);

    	const location = isTopLevelRouter
    	? writable(getInitialLocation())
    	: locationContext;

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(17, $location = value));
    	const prevLocation = writable($location);
    	validate_store(prevLocation, 'prevLocation');
    	component_subscribe($$self, prevLocation, value => $$invalidate(19, $prevLocation = value));
    	const triggerFocus = createTriggerFocus(a11yConfig, announcementText, location);
    	const createRouteFilter = routeId => routeList => routeList.filter(routeItem => routeItem.id !== routeId);

    	function registerRoute(route) {
    		if (isSSR) {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				hasActiveRoute = true;

    				// Return the match in SSR mode, so the matched Route can use it immediatly.
    				// Waiting for activeRoute to update does not work, because it updates
    				// after the Route is initialized
    				return matchingRoute; // eslint-disable-line consistent-return
    			}
    		} else {
    			routes.update(prevRoutes => {
    				// Remove an old version of the updated route,
    				// before pushing the new version
    				const nextRoutes = createRouteFilter(route.id)(prevRoutes);

    				nextRoutes.push(route);
    				return nextRoutes;
    			});
    		}
    	}

    	function unregisterRoute(routeId) {
    		routes.update(createRouteFilter(routeId));
    	}

    	if (!isTopLevelRouter && basepath !== defaultBasepath) {
    		warn(ROUTER_ID, 'Only top-level Routers can have a "basepath" prop. It is ignored.', { basepath });
    	}

    	if (isTopLevelRouter) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = history.listen(changedHistory => {
    				const normalizedLocation = normalizeLocation(changedHistory.location, normalizedBasepath);
    				prevLocation.set($location);
    				location.set(normalizedLocation);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		registerRoute,
    		unregisterRoute,
    		manageFocus,
    		level,
    		id: routerId,
    		history: isTopLevelRouter ? history : routerContext.history,
    		basepath: isTopLevelRouter
    		? normalizedBasepath
    		: routerContext.basepath,
    		disableInlineStyles: shouldDisableInlineStyles
    	});

    	const writable_props = ['basepath', 'url', 'history', 'primary', 'a11y', 'disableInlineStyles'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(11, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(12, url = $$props.url);
    		if ('history' in $$props) $$invalidate(13, history = $$props.history);
    		if ('primary' in $$props) $$invalidate(14, primary = $$props.primary);
    		if ('a11y' in $$props) $$invalidate(15, a11y = $$props.a11y);
    		if ('disableInlineStyles' in $$props) $$invalidate(16, disableInlineStyles = $$props.disableInlineStyles);
    		if ('$$scope' in $$props) $$invalidate(21, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createCounter,
    		createInlineStyle,
    		createMarkerProps,
    		createId: createId$1,
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		normalizePath,
    		pick,
    		match,
    		normalizeLocation,
    		parsePath,
    		isSSR,
    		warn,
    		ROUTER_ID,
    		pushFocusCandidate,
    		visuallyHiddenStyle,
    		createTriggerFocus,
    		defaultBasepath,
    		basepath,
    		url,
    		history,
    		primary,
    		a11y,
    		disableInlineStyles,
    		a11yConfig,
    		initialBasepath,
    		normalizedBasepath,
    		locationContext,
    		routerContext,
    		isTopLevelRouter,
    		routerId,
    		manageFocus,
    		announcementText,
    		shouldDisableInlineStyles,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		level,
    		getInitialLocation,
    		location,
    		prevLocation,
    		triggerFocus,
    		createRouteFilter,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$activeRoute,
    		$prevLocation,
    		$routes,
    		$announcementText
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(11, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(12, url = $$props.url);
    		if ('history' in $$props) $$invalidate(13, history = $$props.history);
    		if ('primary' in $$props) $$invalidate(14, primary = $$props.primary);
    		if ('a11y' in $$props) $$invalidate(15, a11y = $$props.a11y);
    		if ('disableInlineStyles' in $$props) $$invalidate(16, disableInlineStyles = $$props.disableInlineStyles);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*basepath*/ 2048) {
    			if (basepath !== initialBasepath) {
    				warn(ROUTER_ID, 'You cannot change the "basepath" prop. It is ignored.');
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$routes, $location*/ 1179648) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$location, $prevLocation*/ 655360) {
    			// Manage focus and announce navigation to screen reader users
    			{
    				if (isTopLevelRouter) {
    					const hasHash = !!$location.hash;

    					// When a hash is present in the url, we skip focus management, because
    					// focusing a different element will prevent in-page jumps (See #3)
    					const shouldManageFocus = !hasHash && manageFocus;

    					// We don't want to make an announcement, when the hash changes,
    					// but the active route stays the same
    					const announceNavigation = !hasHash || $location.pathname !== $prevLocation.pathname;

    					triggerFocus(shouldManageFocus, announceNavigation);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$activeRoute*/ 262144) {
    			// Queue matched Route, so top level Router can decide which Route to focus.
    			// Non primary Routers should just be ignored
    			if (manageFocus && $activeRoute && $activeRoute.primary) {
    				pushFocusCandidate({ level, routerId, route: $activeRoute });
    			}
    		}
    	};

    	return [
    		$announcementText,
    		a11yConfig,
    		isTopLevelRouter,
    		routerId,
    		manageFocus,
    		announcementText,
    		shouldDisableInlineStyles,
    		routes,
    		activeRoute,
    		location,
    		prevLocation,
    		basepath,
    		url,
    		history,
    		primary,
    		a11y,
    		disableInlineStyles,
    		$location,
    		$activeRoute,
    		$prevLocation,
    		$routes,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$y,
    			create_fragment$y,
    			safe_not_equal,
    			{
    				basepath: 11,
    				url: 12,
    				history: 13,
    				primary: 14,
    				a11y: 15,
    				disableInlineStyles: 16
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$y.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get history() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set history(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get primary() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set primary(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get a11y() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set a11y(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disableInlineStyles() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disableInlineStyles(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Router$1 = Router;

    /**
     * Check if a component or hook have been created outside of a
     * context providing component
     * @param {number} componentId
     * @param {*} props
     * @param {string?} ctxKey
     * @param {number?} ctxProviderId
     */
    function usePreflightCheck(
    	componentId,
    	props,
    	ctxKey = ROUTER,
    	ctxProviderId = ROUTER_ID,
    ) {
    	const ctx = getContext(ctxKey);
    	if (!ctx) {
    		fail(
    			componentId,
    			label =>
    				`You cannot use ${label} outside of a ${createLabel(ctxProviderId)}.`,
    			props,
    		);
    	}
    }

    const toReadonly = ctx => {
    	const { subscribe } = getContext(ctx);
    	return { subscribe };
    };

    /**
     * Access the current location via a readable store.
     * @returns {import("svelte/store").Readable<{
        pathname: string;
        search: string;
        hash: string;
        state: {};
      }>}
     *
     * @example
      ```html
      <script>
        import { useLocation } from "svelte-navigator";

        const location = useLocation();

        $: console.log($location);
        // {
        //   pathname: "/blog",
        //   search: "?id=123",
        //   hash: "#comments",
        //   state: {}
        // }
      </script>
      ```
     */
    function useLocation() {
    	usePreflightCheck(USE_LOCATION_ID);
    	return toReadonly(LOCATION);
    }

    /**
     * @typedef {{
        path: string;
        fullPath: string;
        uri: string;
        params: {};
      }} RouteMatch
     */

    /**
     * @typedef {import("svelte/store").Readable<RouteMatch|null>} RouteMatchStore
     */

    /**
     * Access the history of top level Router.
     */
    function useHistory() {
    	const { history } = getContext(ROUTER);
    	return history;
    }

    /**
     * Access the base of the parent Route.
     */
    function useRouteBase() {
    	const route = getContext(ROUTE);
    	return route ? derived(route, _route => _route.base) : writable("/");
    }

    /**
     * Resolve a given link relative to the current `Route` and the `Router`s `basepath`.
     * It is used under the hood in `Link` and `useNavigate`.
     * You can use it to manually resolve links, when using the `link` or `links` actions.
     *
     * @returns {(path: string) => string}
     *
     * @example
      ```html
      <script>
        import { link, useResolve } from "svelte-navigator";

        const resolve = useResolve();
        // `resolvedLink` will be resolved relative to its parent Route
        // and the Routers `basepath`
        const resolvedLink = resolve("relativePath");
      </script>

      <a href={resolvedLink} use:link>Relative link</a>
      ```
     */
    function useResolve() {
    	usePreflightCheck(USE_RESOLVE_ID);
    	const routeBase = useRouteBase();
    	const { basepath: appBase } = getContext(ROUTER);
    	/**
    	 * Resolves the path relative to the current route and basepath.
    	 *
    	 * @param {string} path The path to resolve
    	 * @returns {string} The resolved path
    	 */
    	const resolve = path => resolveLink(path, get_store_value(routeBase), appBase);
    	return resolve;
    }

    /**
     * A hook, that returns a context-aware version of `navigate`.
     * It will automatically resolve the given link relative to the current Route.
     * It will also resolve a link against the `basepath` of the Router.
     *
     * @example
      ```html
      <!-- App.svelte -->
      <script>
        import { link, Route } from "svelte-navigator";
        import RouteComponent from "./RouteComponent.svelte";
      </script>

      <Router>
        <Route path="route1">
          <RouteComponent />
        </Route>
        <!-- ... -->
      </Router>

      <!-- RouteComponent.svelte -->
      <script>
        import { useNavigate } from "svelte-navigator";

        const navigate = useNavigate();
      </script>

      <button on:click="{() => navigate('relativePath')}">
        go to /route1/relativePath
      </button>
      <button on:click="{() => navigate('/absolutePath')}">
        go to /absolutePath
      </button>
      ```
      *
      * @example
      ```html
      <!-- App.svelte -->
      <script>
        import { link, Route } from "svelte-navigator";
        import RouteComponent from "./RouteComponent.svelte";
      </script>

      <Router basepath="/base">
        <Route path="route1">
          <RouteComponent />
        </Route>
        <!-- ... -->
      </Router>

      <!-- RouteComponent.svelte -->
      <script>
        import { useNavigate } from "svelte-navigator";

        const navigate = useNavigate();
      </script>

      <button on:click="{() => navigate('relativePath')}">
        go to /base/route1/relativePath
      </button>
      <button on:click="{() => navigate('/absolutePath')}">
        go to /base/absolutePath
      </button>
      ```
     */
    function useNavigate() {
    	usePreflightCheck(USE_NAVIGATE_ID);
    	const resolve = useResolve();
    	const { navigate } = useHistory();
    	/**
    	 * Navigate to a new route.
    	 * Resolves the link relative to the current route and basepath.
    	 *
    	 * @param {string|number} to The path to navigate to.
    	 *
    	 * If `to` is a number we will navigate to the stack entry index + `to`
    	 * (-> `navigate(-1)`, is equivalent to hitting the back button of the browser)
    	 * @param {Object} options
    	 * @param {*} [options.state]
    	 * @param {boolean} [options.replace=false]
    	 */
    	const navigateRelative = (to, options) => {
    		// If to is a number, we navigate to the target stack entry via `history.go`.
    		// Otherwise resolve the link
    		const target = isNumber$1(to) ? to : resolve(to);
    		return navigate(target, options);
    	};
    	return navigateRelative;
    }

    /* node_modules\svelte-navigator\src\Route.svelte generated by Svelte v3.59.2 */
    const file$u = "node_modules\\svelte-navigator\\src\\Route.svelte";

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*$params*/ 16,
    	location: dirty & /*$location*/ 8
    });

    const get_default_slot_context = ctx => ({
    	params: isSSR ? get_store_value(/*params*/ ctx[10]) : /*$params*/ ctx[4],
    	location: /*$location*/ ctx[3],
    	navigate: /*navigate*/ ctx[11]
    });

    // (98:0) {#if isActive}
    function create_if_block$a(ctx) {
    	let router;
    	let current;

    	router = new Router$1({
    			props: {
    				primary: /*primary*/ ctx[1],
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const router_changes = {};
    			if (dirty & /*primary*/ 2) router_changes.primary = /*primary*/ ctx[1];

    			if (dirty & /*$$scope, component, $location, $params, $$restProps*/ 528409) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(98:0) {#if isActive}",
    		ctx
    	});

    	return block;
    }

    // (114:2) {:else}
    function create_else_block$a(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, $params, $location*/ 524312)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[19], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$a.name,
    		type: "else",
    		source: "(114:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (106:2) {#if component !== null}
    function create_if_block_1$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[3] },
    		{ navigate: /*navigate*/ ctx[11] },
    		isSSR ? get_store_value(/*params*/ ctx[10]) : /*$params*/ ctx[4],
    		/*$$restProps*/ ctx[12]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, navigate, isSSR, get, params, $params, $$restProps*/ 7192)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 8 && { location: /*$location*/ ctx[3] },
    					dirty & /*navigate*/ 2048 && { navigate: /*navigate*/ ctx[11] },
    					dirty & /*isSSR, get, params, $params*/ 1040 && get_spread_object(isSSR ? get_store_value(/*params*/ ctx[10]) : /*$params*/ ctx[4]),
    					dirty & /*$$restProps*/ 4096 && get_spread_object(/*$$restProps*/ ctx[12])
    				])
    			: {};

    			if (dirty & /*component*/ 1 && switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(106:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    // (99:1) <Router {primary}>
    function create_default_slot$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$3, create_else_block$a];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(99:1) <Router {primary}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$x(ctx) {
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let current;

    	let div0_levels = [
    		createMarkerProps(/*disableInlineStyles*/ ctx[7]),
    		{ "data-svnav-route-start": /*id*/ ctx[5] }
    	];

    	let div_data_1 = {};

    	for (let i = 0; i < div0_levels.length; i += 1) {
    		div_data_1 = assign(div_data_1, div0_levels[i]);
    	}

    	let if_block = /*isActive*/ ctx[2] && create_if_block$a(ctx);

    	let div1_levels = [
    		createMarkerProps(/*disableInlineStyles*/ ctx[7]),
    		{ "data-svnav-route-end": /*id*/ ctx[5] }
    	];

    	let div_data = {};

    	for (let i = 0; i < div1_levels.length; i += 1) {
    		div_data = assign(div_data, div1_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			div1 = element("div");
    			set_attributes(div0, div_data_1);
    			add_location(div0, file$u, 96, 0, 2664);
    			set_attributes(div1, div_data);
    			add_location(div1, file$u, 122, 0, 3340);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*isActive*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*isActive*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$a(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t1.parentNode, t1);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const createId = createCounter();

    function instance$x($$self, $$props, $$invalidate) {
    	let isActive;
    	const omit_props_names = ["path","component","meta","primary"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $activeRoute;
    	let $location;
    	let $parentBase;
    	let $params;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	let { meta = {} } = $$props;
    	let { primary = true } = $$props;
    	usePreflightCheck(ROUTE_ID, $$props);
    	const id = createId();
    	const { registerRoute, unregisterRoute, activeRoute, disableInlineStyles } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(16, $activeRoute = value));
    	const parentBase = useRouteBase();
    	validate_store(parentBase, 'parentBase');
    	component_subscribe($$self, parentBase, value => $$invalidate(17, $parentBase = value));
    	const location = useLocation();
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(3, $location = value));
    	const focusElement = writable(null);

    	// In SSR we cannot wait for $activeRoute to update,
    	// so we use the match returned from `registerRoute` instead
    	let ssrMatch;

    	const route = writable();
    	const params = writable({});
    	validate_store(params, 'params');
    	component_subscribe($$self, params, value => $$invalidate(4, $params = value));
    	setContext(ROUTE, route);
    	setContext(ROUTE_PARAMS, params);
    	setContext(FOCUS_ELEM, focusElement);

    	// We need to call useNavigate after the route is set,
    	// so we can use the routes path for link resolution
    	const navigate = useNavigate();

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway
    	if (!isSSR) {
    		onDestroy(() => unregisterRoute(id));
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(24, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('path' in $$new_props) $$invalidate(13, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('meta' in $$new_props) $$invalidate(14, meta = $$new_props.meta);
    		if ('primary' in $$new_props) $$invalidate(1, primary = $$new_props.primary);
    		if ('$$scope' in $$new_props) $$invalidate(19, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createCounter,
    		createMarkerProps,
    		createId,
    		getContext,
    		onDestroy,
    		setContext,
    		writable,
    		get: get_store_value,
    		Router: Router$1,
    		ROUTER,
    		ROUTE,
    		ROUTE_PARAMS,
    		FOCUS_ELEM,
    		useLocation,
    		useNavigate,
    		useRouteBase,
    		usePreflightCheck,
    		isSSR,
    		extractBaseUri,
    		join,
    		ROUTE_ID,
    		path,
    		component,
    		meta,
    		primary,
    		id,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		disableInlineStyles,
    		parentBase,
    		location,
    		focusElement,
    		ssrMatch,
    		route,
    		params,
    		navigate,
    		isActive,
    		$activeRoute,
    		$location,
    		$parentBase,
    		$params
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(24, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(13, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('meta' in $$props) $$invalidate(14, meta = $$new_props.meta);
    		if ('primary' in $$props) $$invalidate(1, primary = $$new_props.primary);
    		if ('ssrMatch' in $$props) $$invalidate(15, ssrMatch = $$new_props.ssrMatch);
    		if ('isActive' in $$props) $$invalidate(2, isActive = $$new_props.isActive);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*path, $parentBase, meta, $location, primary*/ 155658) {
    			{
    				// The route store will be re-computed whenever props, location or parentBase change
    				const isDefault = path === "";

    				const rawBase = join($parentBase, path);

    				const updatedRoute = {
    					id,
    					path,
    					meta,
    					// If no path prop is given, this Route will act as the default Route
    					// that is rendered if no other Route in the Router is a match
    					default: isDefault,
    					fullPath: isDefault ? "" : rawBase,
    					base: isDefault
    					? $parentBase
    					: extractBaseUri(rawBase, $location.pathname),
    					primary,
    					focusElement
    				};

    				route.set(updatedRoute);

    				// If we're in SSR mode and the Route matches,
    				// `registerRoute` will return the match
    				$$invalidate(15, ssrMatch = registerRoute(updatedRoute));
    			}
    		}

    		if ($$self.$$.dirty & /*ssrMatch, $activeRoute*/ 98304) {
    			$$invalidate(2, isActive = !!(ssrMatch || $activeRoute && $activeRoute.id === id));
    		}

    		if ($$self.$$.dirty & /*isActive, ssrMatch, $activeRoute*/ 98308) {
    			if (isActive) {
    				const { params: activeParams } = ssrMatch || $activeRoute;
    				params.set(activeParams);
    			}
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		primary,
    		isActive,
    		$location,
    		$params,
    		id,
    		activeRoute,
    		disableInlineStyles,
    		parentBase,
    		location,
    		params,
    		navigate,
    		$$restProps,
    		path,
    		meta,
    		ssrMatch,
    		$activeRoute,
    		$parentBase,
    		slots,
    		$$scope
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$x, create_fragment$x, safe_not_equal, {
    			path: 13,
    			component: 0,
    			meta: 14,
    			primary: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$x.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get meta() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set meta(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get primary() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set primary(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Route$1 = Route;

    function bind(fn, thisArg) {
      return function wrap() {
        return fn.apply(thisArg, arguments);
      };
    }

    // utils is a library of generic helper functions non-specific to axios

    const {toString} = Object.prototype;
    const {getPrototypeOf} = Object;

    const kindOf = (cache => thing => {
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    })(Object.create(null));

    const kindOfTest = (type) => {
      type = type.toLowerCase();
      return (thing) => kindOf(thing) === type
    };

    const typeOfTest = type => thing => typeof thing === type;

    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     *
     * @returns {boolean} True if value is an Array, otherwise false
     */
    const {isArray} = Array;

    /**
     * Determine if a value is undefined
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if the value is undefined, otherwise false
     */
    const isUndefined = typeOfTest('undefined');

    /**
     * Determine if a value is a Buffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Buffer, otherwise false
     */
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
        && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
    }

    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    const isArrayBuffer = kindOfTest('ArrayBuffer');


    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */
    function isArrayBufferView(val) {
      let result;
      if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
      } else {
        result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
      }
      return result;
    }

    /**
     * Determine if a value is a String
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a String, otherwise false
     */
    const isString = typeOfTest('string');

    /**
     * Determine if a value is a Function
     *
     * @param {*} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */
    const isFunction = typeOfTest('function');

    /**
     * Determine if a value is a Number
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Number, otherwise false
     */
    const isNumber = typeOfTest('number');

    /**
     * Determine if a value is an Object
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an Object, otherwise false
     */
    const isObject = (thing) => thing !== null && typeof thing === 'object';

    /**
     * Determine if a value is a Boolean
     *
     * @param {*} thing The value to test
     * @returns {boolean} True if value is a Boolean, otherwise false
     */
    const isBoolean = thing => thing === true || thing === false;

    /**
     * Determine if a value is a plain Object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a plain Object, otherwise false
     */
    const isPlainObject = (val) => {
      if (kindOf(val) !== 'object') {
        return false;
      }

      const prototype = getPrototypeOf(val);
      return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
    };

    /**
     * Determine if a value is a Date
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Date, otherwise false
     */
    const isDate = kindOfTest('Date');

    /**
     * Determine if a value is a File
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */
    const isFile = kindOfTest('File');

    /**
     * Determine if a value is a Blob
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Blob, otherwise false
     */
    const isBlob = kindOfTest('Blob');

    /**
     * Determine if a value is a FileList
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */
    const isFileList = kindOfTest('FileList');

    /**
     * Determine if a value is a Stream
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Stream, otherwise false
     */
    const isStream = (val) => isObject(val) && isFunction(val.pipe);

    /**
     * Determine if a value is a FormData
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an FormData, otherwise false
     */
    const isFormData = (thing) => {
      let kind;
      return thing && (
        (typeof FormData === 'function' && thing instanceof FormData) || (
          isFunction(thing.append) && (
            (kind = kindOf(thing)) === 'formdata' ||
            // detect form-data instance
            (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
          )
        )
      )
    };

    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */
    const isURLSearchParams = kindOfTest('URLSearchParams');

    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     *
     * @returns {String} The String freed of excess whitespace
     */
    const trim = (str) => str.trim ?
      str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     *
     * @param {Boolean} [allOwnKeys = false]
     * @returns {any}
     */
    function forEach(obj, fn, {allOwnKeys = false} = {}) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      }

      let i;
      let l;

      // Force an array if not already something iterable
      if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray(obj)) {
        // Iterate over array values
        for (i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys.length;
        let key;

        for (i = 0; i < len; i++) {
          key = keys[i];
          fn.call(null, obj[key], key, obj);
        }
      }
    }

    function findKey(obj, key) {
      key = key.toLowerCase();
      const keys = Object.keys(obj);
      let i = keys.length;
      let _key;
      while (i-- > 0) {
        _key = keys[i];
        if (key === _key.toLowerCase()) {
          return _key;
        }
      }
      return null;
    }

    const _global = (() => {
      /*eslint no-undef:0*/
      if (typeof globalThis !== "undefined") return globalThis;
      return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
    })();

    const isContextDefined = (context) => !isUndefined(context) && context !== _global;

    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     *
     * @returns {Object} Result of all merge properties
     */
    function merge(/* obj1, obj2, obj3, ... */) {
      const {caseless} = isContextDefined(this) && this || {};
      const result = {};
      const assignValue = (val, key) => {
        const targetKey = caseless && findKey(result, key) || key;
        if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
          result[targetKey] = merge(result[targetKey], val);
        } else if (isPlainObject(val)) {
          result[targetKey] = merge({}, val);
        } else if (isArray(val)) {
          result[targetKey] = val.slice();
        } else {
          result[targetKey] = val;
        }
      };

      for (let i = 0, l = arguments.length; i < l; i++) {
        arguments[i] && forEach(arguments[i], assignValue);
      }
      return result;
    }

    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     *
     * @param {Boolean} [allOwnKeys]
     * @returns {Object} The resulting value of object a
     */
    const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
      forEach(b, (val, key) => {
        if (thisArg && isFunction(val)) {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      }, {allOwnKeys});
      return a;
    };

    /**
     * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
     *
     * @param {string} content with BOM
     *
     * @returns {string} content value without BOM
     */
    const stripBOM = (content) => {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }
      return content;
    };

    /**
     * Inherit the prototype methods from one constructor into another
     * @param {function} constructor
     * @param {function} superConstructor
     * @param {object} [props]
     * @param {object} [descriptors]
     *
     * @returns {void}
     */
    const inherits = (constructor, superConstructor, props, descriptors) => {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      Object.defineProperty(constructor, 'super', {
        value: superConstructor.prototype
      });
      props && Object.assign(constructor.prototype, props);
    };

    /**
     * Resolve object with deep prototype chain to a flat object
     * @param {Object} sourceObj source object
     * @param {Object} [destObj]
     * @param {Function|Boolean} [filter]
     * @param {Function} [propFilter]
     *
     * @returns {Object}
     */
    const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
      let props;
      let i;
      let prop;
      const merged = {};

      destObj = destObj || {};
      // eslint-disable-next-line no-eq-null,eqeqeq
      if (sourceObj == null) return destObj;

      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop = props[i];
          if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = filter !== false && getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

      return destObj;
    };

    /**
     * Determines whether a string ends with the characters of a specified string
     *
     * @param {String} str
     * @param {String} searchString
     * @param {Number} [position= 0]
     *
     * @returns {boolean}
     */
    const endsWith = (str, searchString, position) => {
      str = String(str);
      if (position === undefined || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      const lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };


    /**
     * Returns new array from array like object or null if failed
     *
     * @param {*} [thing]
     *
     * @returns {?Array}
     */
    const toArray = (thing) => {
      if (!thing) return null;
      if (isArray(thing)) return thing;
      let i = thing.length;
      if (!isNumber(i)) return null;
      const arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    };

    /**
     * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
     * thing passed in is an instance of Uint8Array
     *
     * @param {TypedArray}
     *
     * @returns {Array}
     */
    // eslint-disable-next-line func-names
    const isTypedArray = (TypedArray => {
      // eslint-disable-next-line func-names
      return thing => {
        return TypedArray && thing instanceof TypedArray;
      };
    })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

    /**
     * For each entry in the object, call the function with the key and value.
     *
     * @param {Object<any, any>} obj - The object to iterate over.
     * @param {Function} fn - The function to call for each entry.
     *
     * @returns {void}
     */
    const forEachEntry = (obj, fn) => {
      const generator = obj && obj[Symbol.iterator];

      const iterator = generator.call(obj);

      let result;

      while ((result = iterator.next()) && !result.done) {
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
      }
    };

    /**
     * It takes a regular expression and a string, and returns an array of all the matches
     *
     * @param {string} regExp - The regular expression to match against.
     * @param {string} str - The string to search.
     *
     * @returns {Array<boolean>}
     */
    const matchAll = (regExp, str) => {
      let matches;
      const arr = [];

      while ((matches = regExp.exec(str)) !== null) {
        arr.push(matches);
      }

      return arr;
    };

    /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
    const isHTMLForm = kindOfTest('HTMLFormElement');

    const toCamelCase = str => {
      return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
        function replacer(m, p1, p2) {
          return p1.toUpperCase() + p2;
        }
      );
    };

    /* Creating a function that will check if an object has a property. */
    const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

    /**
     * Determine if a value is a RegExp object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a RegExp object, otherwise false
     */
    const isRegExp = kindOfTest('RegExp');

    const reduceDescriptors = (obj, reducer) => {
      const descriptors = Object.getOwnPropertyDescriptors(obj);
      const reducedDescriptors = {};

      forEach(descriptors, (descriptor, name) => {
        let ret;
        if ((ret = reducer(descriptor, name, obj)) !== false) {
          reducedDescriptors[name] = ret || descriptor;
        }
      });

      Object.defineProperties(obj, reducedDescriptors);
    };

    /**
     * Makes all methods read-only
     * @param {Object} obj
     */

    const freezeMethods = (obj) => {
      reduceDescriptors(obj, (descriptor, name) => {
        // skip restricted props in strict mode
        if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
          return false;
        }

        const value = obj[name];

        if (!isFunction(value)) return;

        descriptor.enumerable = false;

        if ('writable' in descriptor) {
          descriptor.writable = false;
          return;
        }

        if (!descriptor.set) {
          descriptor.set = () => {
            throw Error('Can not rewrite read-only method \'' + name + '\'');
          };
        }
      });
    };

    const toObjectSet = (arrayOrString, delimiter) => {
      const obj = {};

      const define = (arr) => {
        arr.forEach(value => {
          obj[value] = true;
        });
      };

      isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

      return obj;
    };

    const noop = () => {};

    const toFiniteNumber = (value, defaultValue) => {
      value = +value;
      return Number.isFinite(value) ? value : defaultValue;
    };

    const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

    const DIGIT = '0123456789';

    const ALPHABET = {
      DIGIT,
      ALPHA,
      ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
    };

    const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
      let str = '';
      const {length} = alphabet;
      while (size--) {
        str += alphabet[Math.random() * length|0];
      }

      return str;
    };

    /**
     * If the thing is a FormData object, return true, otherwise return false.
     *
     * @param {unknown} thing - The thing to check.
     *
     * @returns {boolean}
     */
    function isSpecCompliantForm(thing) {
      return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
    }

    const toJSONObject = (obj) => {
      const stack = new Array(10);

      const visit = (source, i) => {

        if (isObject(source)) {
          if (stack.indexOf(source) >= 0) {
            return;
          }

          if(!('toJSON' in source)) {
            stack[i] = source;
            const target = isArray(source) ? [] : {};

            forEach(source, (value, key) => {
              const reducedValue = visit(value, i + 1);
              !isUndefined(reducedValue) && (target[key] = reducedValue);
            });

            stack[i] = undefined;

            return target;
          }
        }

        return source;
      };

      return visit(obj, 0);
    };

    const isAsyncFn = kindOfTest('AsyncFunction');

    const isThenable = (thing) =>
      thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

    var utils$1 = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isBoolean,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isRegExp,
      isFunction,
      isStream,
      isURLSearchParams,
      isTypedArray,
      isFileList,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      forEachEntry,
      matchAll,
      isHTMLForm,
      hasOwnProperty,
      hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
      reduceDescriptors,
      freezeMethods,
      toObjectSet,
      toCamelCase,
      noop,
      toFiniteNumber,
      findKey,
      global: _global,
      isContextDefined,
      ALPHABET,
      generateString,
      isSpecCompliantForm,
      toJSONObject,
      isAsyncFn,
      isThenable
    };

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [config] The config.
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     *
     * @returns {Error} The created error.
     */
    function AxiosError(message, code, config, request, response) {
      Error.call(this);

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = (new Error()).stack;
      }

      this.message = message;
      this.name = 'AxiosError';
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }

    utils$1.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: utils$1.toJSONObject(this.config),
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });

    const prototype$1 = AxiosError.prototype;
    const descriptors = {};

    [
      'ERR_BAD_OPTION_VALUE',
      'ERR_BAD_OPTION',
      'ECONNABORTED',
      'ETIMEDOUT',
      'ERR_NETWORK',
      'ERR_FR_TOO_MANY_REDIRECTS',
      'ERR_DEPRECATED',
      'ERR_BAD_RESPONSE',
      'ERR_BAD_REQUEST',
      'ERR_CANCELED',
      'ERR_NOT_SUPPORT',
      'ERR_INVALID_URL'
    // eslint-disable-next-line func-names
    ].forEach(code => {
      descriptors[code] = {value: code};
    });

    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

    // eslint-disable-next-line func-names
    AxiosError.from = (error, code, config, request, response, customProps) => {
      const axiosError = Object.create(prototype$1);

      utils$1.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      }, prop => {
        return prop !== 'isAxiosError';
      });

      AxiosError.call(axiosError, error.message, code, config, request, response);

      axiosError.cause = error;

      axiosError.name = error.name;

      customProps && Object.assign(axiosError, customProps);

      return axiosError;
    };

    // eslint-disable-next-line strict
    var httpAdapter = null;

    /**
     * Determines if the given thing is a array or js object.
     *
     * @param {string} thing - The object or array to be visited.
     *
     * @returns {boolean}
     */
    function isVisitable(thing) {
      return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
    }

    /**
     * It removes the brackets from the end of a string
     *
     * @param {string} key - The key of the parameter.
     *
     * @returns {string} the key without the brackets.
     */
    function removeBrackets(key) {
      return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
    }

    /**
     * It takes a path, a key, and a boolean, and returns a string
     *
     * @param {string} path - The path to the current key.
     * @param {string} key - The key of the current object being iterated over.
     * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
     *
     * @returns {string} The path to the current key.
     */
    function renderKey(path, key, dots) {
      if (!path) return key;
      return path.concat(key).map(function each(token, i) {
        // eslint-disable-next-line no-param-reassign
        token = removeBrackets(token);
        return !dots && i ? '[' + token + ']' : token;
      }).join(dots ? '.' : '');
    }

    /**
     * If the array is an array and none of its elements are visitable, then it's a flat array.
     *
     * @param {Array<any>} arr - The array to check
     *
     * @returns {boolean}
     */
    function isFlatArray(arr) {
      return utils$1.isArray(arr) && !arr.some(isVisitable);
    }

    const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
      return /^is[A-Z]/.test(prop);
    });

    /**
     * Convert a data object to FormData
     *
     * @param {Object} obj
     * @param {?Object} [formData]
     * @param {?Object} [options]
     * @param {Function} [options.visitor]
     * @param {Boolean} [options.metaTokens = true]
     * @param {Boolean} [options.dots = false]
     * @param {?Boolean} [options.indexes = false]
     *
     * @returns {Object}
     **/

    /**
     * It converts an object into a FormData object
     *
     * @param {Object<any, any>} obj - The object to convert to form data.
     * @param {string} formData - The FormData object to append to.
     * @param {Object<string, any>} options
     *
     * @returns
     */
    function toFormData(obj, formData, options) {
      if (!utils$1.isObject(obj)) {
        throw new TypeError('target must be an object');
      }

      // eslint-disable-next-line no-param-reassign
      formData = formData || new (FormData)();

      // eslint-disable-next-line no-param-reassign
      options = utils$1.toFlatObject(options, {
        metaTokens: true,
        dots: false,
        indexes: false
      }, false, function defined(option, source) {
        // eslint-disable-next-line no-eq-null,eqeqeq
        return !utils$1.isUndefined(source[option]);
      });

      const metaTokens = options.metaTokens;
      // eslint-disable-next-line no-use-before-define
      const visitor = options.visitor || defaultVisitor;
      const dots = options.dots;
      const indexes = options.indexes;
      const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
      const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

      if (!utils$1.isFunction(visitor)) {
        throw new TypeError('visitor must be a function');
      }

      function convertValue(value) {
        if (value === null) return '';

        if (utils$1.isDate(value)) {
          return value.toISOString();
        }

        if (!useBlob && utils$1.isBlob(value)) {
          throw new AxiosError('Blob is not supported. Use a Buffer instead.');
        }

        if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
          return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
        }

        return value;
      }

      /**
       * Default visitor.
       *
       * @param {*} value
       * @param {String|Number} key
       * @param {Array<String|Number>} path
       * @this {FormData}
       *
       * @returns {boolean} return true to visit the each prop of the value recursively
       */
      function defaultVisitor(value, key, path) {
        let arr = value;

        if (value && !path && typeof value === 'object') {
          if (utils$1.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            key = metaTokens ? key : key.slice(0, -2);
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (
            (utils$1.isArray(value) && isFlatArray(value)) ||
            ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
            )) {
            // eslint-disable-next-line no-param-reassign
            key = removeBrackets(key);

            arr.forEach(function each(el, index) {
              !(utils$1.isUndefined(el) || el === null) && formData.append(
                // eslint-disable-next-line no-nested-ternary
                indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
                convertValue(el)
              );
            });
            return false;
          }
        }

        if (isVisitable(value)) {
          return true;
        }

        formData.append(renderKey(path, key, dots), convertValue(value));

        return false;
      }

      const stack = [];

      const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
      });

      function build(value, path) {
        if (utils$1.isUndefined(value)) return;

        if (stack.indexOf(value) !== -1) {
          throw Error('Circular reference detected in ' + path.join('.'));
        }

        stack.push(value);

        utils$1.forEach(value, function each(el, key) {
          const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
            formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
          );

          if (result === true) {
            build(el, path ? path.concat(key) : [key]);
          }
        });

        stack.pop();
      }

      if (!utils$1.isObject(obj)) {
        throw new TypeError('data must be an object');
      }

      build(obj);

      return formData;
    }

    /**
     * It encodes a string by replacing all characters that are not in the unreserved set with
     * their percent-encoded equivalents
     *
     * @param {string} str - The string to encode.
     *
     * @returns {string} The encoded string.
     */
    function encode$1(str) {
      const charMap = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
      };
      return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
        return charMap[match];
      });
    }

    /**
     * It takes a params object and converts it to a FormData object
     *
     * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
     * @param {Object<string, any>} options - The options object passed to the Axios constructor.
     *
     * @returns {void}
     */
    function AxiosURLSearchParams(params, options) {
      this._pairs = [];

      params && toFormData(params, this, options);
    }

    const prototype = AxiosURLSearchParams.prototype;

    prototype.append = function append(name, value) {
      this._pairs.push([name, value]);
    };

    prototype.toString = function toString(encoder) {
      const _encode = encoder ? function(value) {
        return encoder.call(this, value, encode$1);
      } : encode$1;

      return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + '=' + _encode(pair[1]);
      }, '').join('&');
    };

    /**
     * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
     * URI encoded counterparts
     *
     * @param {string} val The value to be encoded.
     *
     * @returns {string} The encoded value.
     */
    function encode(val) {
      return encodeURIComponent(val).
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, '+').
        replace(/%5B/gi, '[').
        replace(/%5D/gi, ']');
    }

    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @param {?object} options
     *
     * @returns {string} The formatted url
     */
    function buildURL(url, params, options) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }
      
      const _encode = options && options.encode || encode;

      const serializeFn = options && options.serialize;

      let serializedParams;

      if (serializeFn) {
        serializedParams = serializeFn(params, options);
      } else {
        serializedParams = utils$1.isURLSearchParams(params) ?
          params.toString() :
          new AxiosURLSearchParams(params, options).toString(_encode);
      }

      if (serializedParams) {
        const hashmarkIndex = url.indexOf("#");

        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    }

    class InterceptorManager {
      constructor() {
        this.handlers = [];
      }

      /**
       * Add a new interceptor to the stack
       *
       * @param {Function} fulfilled The function to handle `then` for a `Promise`
       * @param {Function} rejected The function to handle `reject` for a `Promise`
       *
       * @return {Number} An ID used to remove interceptor later
       */
      use(fulfilled, rejected, options) {
        this.handlers.push({
          fulfilled,
          rejected,
          synchronous: options ? options.synchronous : false,
          runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
      }

      /**
       * Remove an interceptor from the stack
       *
       * @param {Number} id The ID that was returned by `use`
       *
       * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
       */
      eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      }

      /**
       * Clear all interceptors from the stack
       *
       * @returns {void}
       */
      clear() {
        if (this.handlers) {
          this.handlers = [];
        }
      }

      /**
       * Iterate over all the registered interceptors
       *
       * This method is particularly useful for skipping over any
       * interceptors that may have become `null` calling `eject`.
       *
       * @param {Function} fn The function to call for each interceptor
       *
       * @returns {void}
       */
      forEach(fn) {
        utils$1.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      }
    }

    var InterceptorManager$1 = InterceptorManager;

    var transitionalDefaults = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };

    var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

    var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

    var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

    var platform$1 = {
      isBrowser: true,
      classes: {
        URLSearchParams: URLSearchParams$1,
        FormData: FormData$1,
        Blob: Blob$1
      },
      protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
    };

    const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     * nativescript
     *  navigator.product -> 'NativeScript' or 'NS'
     *
     * @returns {boolean}
     */
    const hasStandardBrowserEnv = (
      (product) => {
        return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0
      })(typeof navigator !== 'undefined' && navigator.product);

    /**
     * Determine if we're running in a standard browser webWorker environment
     *
     * Although the `isStandardBrowserEnv` method indicates that
     * `allows axios to run in a web worker`, the WebWorker will still be
     * filtered out due to its judgment standard
     * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
     * This leads to a problem when axios post `FormData` in webWorker
     */
    const hasStandardBrowserWebWorkerEnv = (() => {
      return (
        typeof WorkerGlobalScope !== 'undefined' &&
        // eslint-disable-next-line no-undef
        self instanceof WorkerGlobalScope &&
        typeof self.importScripts === 'function'
      );
    })();

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        hasBrowserEnv: hasBrowserEnv,
        hasStandardBrowserEnv: hasStandardBrowserEnv,
        hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv
    });

    var platform = {
      ...utils,
      ...platform$1
    };

    function toURLEncodedForm(data, options) {
      return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
        visitor: function(value, key, path, helpers) {
          if (platform.isNode && utils$1.isBuffer(value)) {
            this.append(key, value.toString('base64'));
            return false;
          }

          return helpers.defaultVisitor.apply(this, arguments);
        }
      }, options));
    }

    /**
     * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
     *
     * @param {string} name - The name of the property to get.
     *
     * @returns An array of strings.
     */
    function parsePropPath(name) {
      // foo[x][y][z]
      // foo.x.y.z
      // foo-x-y-z
      // foo x y z
      return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
        return match[0] === '[]' ? '' : match[1] || match[0];
      });
    }

    /**
     * Convert an array to an object.
     *
     * @param {Array<any>} arr - The array to convert to an object.
     *
     * @returns An object with the same keys and values as the array.
     */
    function arrayToObject(arr) {
      const obj = {};
      const keys = Object.keys(arr);
      let i;
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        obj[key] = arr[key];
      }
      return obj;
    }

    /**
     * It takes a FormData object and returns a JavaScript object
     *
     * @param {string} formData The FormData object to convert to JSON.
     *
     * @returns {Object<string, any> | null} The converted object.
     */
    function formDataToJSON(formData) {
      function buildPath(path, value, target, index) {
        let name = path[index++];
        const isNumericKey = Number.isFinite(+name);
        const isLast = index >= path.length;
        name = !name && utils$1.isArray(target) ? target.length : name;

        if (isLast) {
          if (utils$1.hasOwnProp(target, name)) {
            target[name] = [target[name], value];
          } else {
            target[name] = value;
          }

          return !isNumericKey;
        }

        if (!target[name] || !utils$1.isObject(target[name])) {
          target[name] = [];
        }

        const result = buildPath(path, value, target[name], index);

        if (result && utils$1.isArray(target[name])) {
          target[name] = arrayToObject(target[name]);
        }

        return !isNumericKey;
      }

      if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
        const obj = {};

        utils$1.forEachEntry(formData, (name, value) => {
          buildPath(parsePropPath(name), value, obj, 0);
        });

        return obj;
      }

      return null;
    }

    /**
     * It takes a string, tries to parse it, and if it fails, it returns the stringified version
     * of the input
     *
     * @param {any} rawValue - The value to be stringified.
     * @param {Function} parser - A function that parses a string into a JavaScript object.
     * @param {Function} encoder - A function that takes a value and returns a string.
     *
     * @returns {string} A stringified version of the rawValue.
     */
    function stringifySafely(rawValue, parser, encoder) {
      if (utils$1.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils$1.trim(rawValue);
        } catch (e) {
          if (e.name !== 'SyntaxError') {
            throw e;
          }
        }
      }

      return (encoder || JSON.stringify)(rawValue);
    }

    const defaults = {

      transitional: transitionalDefaults,

      adapter: ['xhr', 'http'],

      transformRequest: [function transformRequest(data, headers) {
        const contentType = headers.getContentType() || '';
        const hasJSONContentType = contentType.indexOf('application/json') > -1;
        const isObjectPayload = utils$1.isObject(data);

        if (isObjectPayload && utils$1.isHTMLForm(data)) {
          data = new FormData(data);
        }

        const isFormData = utils$1.isFormData(data);

        if (isFormData) {
          if (!hasJSONContentType) {
            return data;
          }
          return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
        }

        if (utils$1.isArrayBuffer(data) ||
          utils$1.isBuffer(data) ||
          utils$1.isStream(data) ||
          utils$1.isFile(data) ||
          utils$1.isBlob(data)
        ) {
          return data;
        }
        if (utils$1.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils$1.isURLSearchParams(data)) {
          headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
          return data.toString();
        }

        let isFileList;

        if (isObjectPayload) {
          if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            return toURLEncodedForm(data, this.formSerializer).toString();
          }

          if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
            const _FormData = this.env && this.env.FormData;

            return toFormData(
              isFileList ? {'files[]': data} : data,
              _FormData && new _FormData(),
              this.formSerializer
            );
          }
        }

        if (isObjectPayload || hasJSONContentType ) {
          headers.setContentType('application/json', false);
          return stringifySafely(data);
        }

        return data;
      }],

      transformResponse: [function transformResponse(data) {
        const transitional = this.transitional || defaults.transitional;
        const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        const JSONRequested = this.responseType === 'json';

        if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
          const silentJSONParsing = transitional && transitional.silentJSONParsing;
          const strictJSONParsing = !silentJSONParsing && JSONRequested;

          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === 'SyntaxError') {
                throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e;
            }
          }
        }

        return data;
      }],

      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,

      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',

      maxContentLength: -1,
      maxBodyLength: -1,

      env: {
        FormData: platform.classes.FormData,
        Blob: platform.classes.Blob
      },

      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },

      headers: {
        common: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': undefined
        }
      }
    };

    utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
      defaults.headers[method] = {};
    });

    var defaults$1 = defaults;

    // RawAxiosHeaders whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers
    const ignoreDuplicateOf = utils$1.toObjectSet([
      'age', 'authorization', 'content-length', 'content-type', 'etag',
      'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
      'last-modified', 'location', 'max-forwards', 'proxy-authorization',
      'referer', 'retry-after', 'user-agent'
    ]);

    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} rawHeaders Headers needing to be parsed
     *
     * @returns {Object} Headers parsed into an object
     */
    var parseHeaders = rawHeaders => {
      const parsed = {};
      let key;
      let val;
      let i;

      rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
        i = line.indexOf(':');
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();

        if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
          return;
        }

        if (key === 'set-cookie') {
          if (parsed[key]) {
            parsed[key].push(val);
          } else {
            parsed[key] = [val];
          }
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      });

      return parsed;
    };

    const $internals = Symbol('internals');

    function normalizeHeader(header) {
      return header && String(header).trim().toLowerCase();
    }

    function normalizeValue(value) {
      if (value === false || value == null) {
        return value;
      }

      return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
    }

    function parseTokens(str) {
      const tokens = Object.create(null);
      const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
      let match;

      while ((match = tokensRE.exec(str))) {
        tokens[match[1]] = match[2];
      }

      return tokens;
    }

    const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

    function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
      if (utils$1.isFunction(filter)) {
        return filter.call(this, value, header);
      }

      if (isHeaderNameFilter) {
        value = header;
      }

      if (!utils$1.isString(value)) return;

      if (utils$1.isString(filter)) {
        return value.indexOf(filter) !== -1;
      }

      if (utils$1.isRegExp(filter)) {
        return filter.test(value);
      }
    }

    function formatHeader(header) {
      return header.trim()
        .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
          return char.toUpperCase() + str;
        });
    }

    function buildAccessors(obj, header) {
      const accessorName = utils$1.toCamelCase(' ' + header);

      ['get', 'set', 'has'].forEach(methodName => {
        Object.defineProperty(obj, methodName + accessorName, {
          value: function(arg1, arg2, arg3) {
            return this[methodName].call(this, header, arg1, arg2, arg3);
          },
          configurable: true
        });
      });
    }

    class AxiosHeaders {
      constructor(headers) {
        headers && this.set(headers);
      }

      set(header, valueOrRewrite, rewrite) {
        const self = this;

        function setHeader(_value, _header, _rewrite) {
          const lHeader = normalizeHeader(_header);

          if (!lHeader) {
            throw new Error('header name must be a non-empty string');
          }

          const key = utils$1.findKey(self, lHeader);

          if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
            self[key || _header] = normalizeValue(_value);
          }
        }

        const setHeaders = (headers, _rewrite) =>
          utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

        if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
          setHeaders(header, valueOrRewrite);
        } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
          setHeaders(parseHeaders(header), valueOrRewrite);
        } else {
          header != null && setHeader(valueOrRewrite, header, rewrite);
        }

        return this;
      }

      get(header, parser) {
        header = normalizeHeader(header);

        if (header) {
          const key = utils$1.findKey(this, header);

          if (key) {
            const value = this[key];

            if (!parser) {
              return value;
            }

            if (parser === true) {
              return parseTokens(value);
            }

            if (utils$1.isFunction(parser)) {
              return parser.call(this, value, key);
            }

            if (utils$1.isRegExp(parser)) {
              return parser.exec(value);
            }

            throw new TypeError('parser must be boolean|regexp|function');
          }
        }
      }

      has(header, matcher) {
        header = normalizeHeader(header);

        if (header) {
          const key = utils$1.findKey(this, header);

          return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }

        return false;
      }

      delete(header, matcher) {
        const self = this;
        let deleted = false;

        function deleteHeader(_header) {
          _header = normalizeHeader(_header);

          if (_header) {
            const key = utils$1.findKey(self, _header);

            if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
              delete self[key];

              deleted = true;
            }
          }
        }

        if (utils$1.isArray(header)) {
          header.forEach(deleteHeader);
        } else {
          deleteHeader(header);
        }

        return deleted;
      }

      clear(matcher) {
        const keys = Object.keys(this);
        let i = keys.length;
        let deleted = false;

        while (i--) {
          const key = keys[i];
          if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
            delete this[key];
            deleted = true;
          }
        }

        return deleted;
      }

      normalize(format) {
        const self = this;
        const headers = {};

        utils$1.forEach(this, (value, header) => {
          const key = utils$1.findKey(headers, header);

          if (key) {
            self[key] = normalizeValue(value);
            delete self[header];
            return;
          }

          const normalized = format ? formatHeader(header) : String(header).trim();

          if (normalized !== header) {
            delete self[header];
          }

          self[normalized] = normalizeValue(value);

          headers[normalized] = true;
        });

        return this;
      }

      concat(...targets) {
        return this.constructor.concat(this, ...targets);
      }

      toJSON(asStrings) {
        const obj = Object.create(null);

        utils$1.forEach(this, (value, header) => {
          value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
        });

        return obj;
      }

      [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
      }

      toString() {
        return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
      }

      get [Symbol.toStringTag]() {
        return 'AxiosHeaders';
      }

      static from(thing) {
        return thing instanceof this ? thing : new this(thing);
      }

      static concat(first, ...targets) {
        const computed = new this(first);

        targets.forEach((target) => computed.set(target));

        return computed;
      }

      static accessor(header) {
        const internals = this[$internals] = (this[$internals] = {
          accessors: {}
        });

        const accessors = internals.accessors;
        const prototype = this.prototype;

        function defineAccessor(_header) {
          const lHeader = normalizeHeader(_header);

          if (!accessors[lHeader]) {
            buildAccessors(prototype, _header);
            accessors[lHeader] = true;
          }
        }

        utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

        return this;
      }
    }

    AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

    // reserved names hotfix
    utils$1.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
      let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
      return {
        get: () => value,
        set(headerValue) {
          this[mapped] = headerValue;
        }
      }
    });

    utils$1.freezeMethods(AxiosHeaders);

    var AxiosHeaders$1 = AxiosHeaders;

    /**
     * Transform the data for a request or a response
     *
     * @param {Array|Function} fns A single function or Array of functions
     * @param {?Object} response The response object
     *
     * @returns {*} The resulting transformed data
     */
    function transformData(fns, response) {
      const config = this || defaults$1;
      const context = response || config;
      const headers = AxiosHeaders$1.from(context.headers);
      let data = context.data;

      utils$1.forEach(fns, function transform(fn) {
        data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
      });

      headers.normalize();

      return data;
    }

    function isCancel(value) {
      return !!(value && value.__CANCEL__);
    }

    /**
     * A `CanceledError` is an object that is thrown when an operation is canceled.
     *
     * @param {string=} message The message.
     * @param {Object=} config The config.
     * @param {Object=} request The request.
     *
     * @returns {CanceledError} The created error.
     */
    function CanceledError(message, config, request) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
      this.name = 'CanceledError';
    }

    utils$1.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     *
     * @returns {object} The response.
     */
    function settle(resolve, reject, response) {
      const validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError(
          'Request failed with status code ' + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    }

    var cookies = platform.hasStandardBrowserEnv ?

    // Standard browser envs support document.cookie
      (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            const cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));

            if (utils$1.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }

            if (utils$1.isString(path)) {
              cookie.push('path=' + path);
            }

            if (utils$1.isString(domain)) {
              cookie.push('domain=' + domain);
            }

            if (secure === true) {
              cookie.push('secure');
            }

            document.cookie = cookie.join('; ');
          },

          read: function read(name) {
            const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return (match ? decodeURIComponent(match[3]) : null);
          },

          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })() :

    // Non standard browser env (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() { return null; },
          remove: function remove() {}
        };
      })();

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     *
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */
    function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    }

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     *
     * @returns {string} The combined URL
     */
    function combineURLs(baseURL, relativeURL) {
      return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
    }

    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     *
     * @returns {string} The combined full path
     */
    function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    }

    var isURLSameOrigin = platform.hasStandardBrowserEnv ?

    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
      (function standardBrowserEnv() {
        const msie = /(msie|trident)/i.test(navigator.userAgent);
        const urlParsingNode = document.createElement('a');
        let originURL;

        /**
        * Parse a URL to discover it's components
        *
        * @param {String} url The URL to be parsed
        * @returns {Object}
        */
        function resolveURL(url) {
          let href = url;

          if (msie) {
            // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }

          urlParsingNode.setAttribute('href', href);

          // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
              urlParsingNode.pathname :
              '/' + urlParsingNode.pathname
          };
        }

        originURL = resolveURL(window.location.href);

        /**
        * Determine if a URL shares the same origin as the current location
        *
        * @param {String} requestURL The URL to test
        * @returns {boolean} True if URL shares the same origin, otherwise false
        */
        return function isURLSameOrigin(requestURL) {
          const parsed = (utils$1.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
          return (parsed.protocol === originURL.protocol &&
              parsed.host === originURL.host);
        };
      })() :

      // Non standard browser envs (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })();

    function parseProtocol(url) {
      const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || '';
    }

    /**
     * Calculate data maxRate
     * @param {Number} [samplesCount= 10]
     * @param {Number} [min= 1000]
     * @returns {Function}
     */
    function speedometer(samplesCount, min) {
      samplesCount = samplesCount || 10;
      const bytes = new Array(samplesCount);
      const timestamps = new Array(samplesCount);
      let head = 0;
      let tail = 0;
      let firstSampleTS;

      min = min !== undefined ? min : 1000;

      return function push(chunkLength) {
        const now = Date.now();

        const startedAt = timestamps[tail];

        if (!firstSampleTS) {
          firstSampleTS = now;
        }

        bytes[head] = chunkLength;
        timestamps[head] = now;

        let i = tail;
        let bytesCount = 0;

        while (i !== head) {
          bytesCount += bytes[i++];
          i = i % samplesCount;
        }

        head = (head + 1) % samplesCount;

        if (head === tail) {
          tail = (tail + 1) % samplesCount;
        }

        if (now - firstSampleTS < min) {
          return;
        }

        const passed = startedAt && now - startedAt;

        return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
      };
    }

    function progressEventReducer(listener, isDownloadStream) {
      let bytesNotified = 0;
      const _speedometer = speedometer(50, 250);

      return e => {
        const loaded = e.loaded;
        const total = e.lengthComputable ? e.total : undefined;
        const progressBytes = loaded - bytesNotified;
        const rate = _speedometer(progressBytes);
        const inRange = loaded <= total;

        bytesNotified = loaded;

        const data = {
          loaded,
          total,
          progress: total ? (loaded / total) : undefined,
          bytes: progressBytes,
          rate: rate ? rate : undefined,
          estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
          event: e
        };

        data[isDownloadStream ? 'download' : 'upload'] = true;

        listener(data);
      };
    }

    const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

    var xhrAdapter = isXHRAdapterSupported && function (config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        let requestData = config.data;
        const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
        const responseType = config.responseType;
        let onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }

          if (config.signal) {
            config.signal.removeEventListener('abort', onCanceled);
          }
        }

        let contentType;

        if (utils$1.isFormData(requestData)) {
          if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
            requestHeaders.setContentType(false); // Let the browser set it
          } else if ((contentType = requestHeaders.getContentType()) !== false) {
            // fix semicolon duplication issue for ReactNative FormData implementation
            const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
            requestHeaders.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
          }
        }

        let request = new XMLHttpRequest();

        // HTTP basic authentication
        if (config.auth) {
          const username = config.auth.username || '';
          const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
          requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
        }

        const fullPath = buildFullPath(config.baseURL, config.url);

        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

        // Set the request timeout in MS
        request.timeout = config.timeout;

        function onloadend() {
          if (!request) {
            return;
          }
          // Prepare the response
          const responseHeaders = AxiosHeaders$1.from(
            'getAllResponseHeaders' in request && request.getAllResponseHeaders()
          );
          const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
            request.responseText : request.response;
          const response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };

          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);

          // Clean up request
          request = null;
        }

        if ('onloadend' in request) {
          // Use onloadend if available
          request.onloadend = onloadend;
        } else {
          // Listen for ready state to emulate onloadend
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }

            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
              return;
            }
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            setTimeout(onloadend);
          };
        }

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

          // Clean up request
          request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

          // Clean up request
          request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
          let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
          const transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config,
            request));

          // Clean up request
          request = null;
        };

        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (platform.hasStandardBrowserEnv) {
          // Add xsrf header
          // regarding CVE-2023-45857 config.withCredentials condition was removed temporarily
          const xsrfValue = isURLSameOrigin(fullPath) && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

          if (xsrfValue) {
            requestHeaders.set(config.xsrfHeaderName, xsrfValue);
          }
        }

        // Remove Content-Type if data is undefined
        requestData === undefined && requestHeaders.setContentType(null);

        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
            request.setRequestHeader(key, val);
          });
        }

        // Add withCredentials to request if needed
        if (!utils$1.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }

        // Add responseType to request if needed
        if (responseType && responseType !== 'json') {
          request.responseType = config.responseType;
        }

        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
        }

        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
        }

        if (config.cancelToken || config.signal) {
          // Handle cancellation
          // eslint-disable-next-line func-names
          onCanceled = cancel => {
            if (!request) {
              return;
            }
            reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
            request.abort();
            request = null;
          };

          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
          }
        }

        const protocol = parseProtocol(fullPath);

        if (protocol && platform.protocols.indexOf(protocol) === -1) {
          reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
          return;
        }


        // Send the request
        request.send(requestData || null);
      });
    };

    const knownAdapters = {
      http: httpAdapter,
      xhr: xhrAdapter
    };

    utils$1.forEach(knownAdapters, (fn, value) => {
      if (fn) {
        try {
          Object.defineProperty(fn, 'name', {value});
        } catch (e) {
          // eslint-disable-next-line no-empty
        }
        Object.defineProperty(fn, 'adapterName', {value});
      }
    });

    const renderReason = (reason) => `- ${reason}`;

    const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

    var adapters = {
      getAdapter: (adapters) => {
        adapters = utils$1.isArray(adapters) ? adapters : [adapters];

        const {length} = adapters;
        let nameOrAdapter;
        let adapter;

        const rejectedReasons = {};

        for (let i = 0; i < length; i++) {
          nameOrAdapter = adapters[i];
          let id;

          adapter = nameOrAdapter;

          if (!isResolvedHandle(nameOrAdapter)) {
            adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

            if (adapter === undefined) {
              throw new AxiosError(`Unknown adapter '${id}'`);
            }
          }

          if (adapter) {
            break;
          }

          rejectedReasons[id || '#' + i] = adapter;
        }

        if (!adapter) {

          const reasons = Object.entries(rejectedReasons)
            .map(([id, state]) => `adapter ${id} ` +
              (state === false ? 'is not supported by the environment' : 'is not available in the build')
            );

          let s = length ?
            (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
            'as no adapter specified';

          throw new AxiosError(
            `There is no suitable adapter to dispatch the request ` + s,
            'ERR_NOT_SUPPORT'
          );
        }

        return adapter;
      },
      adapters: knownAdapters
    };

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     *
     * @param {Object} config The config that is to be used for the request
     *
     * @returns {void}
     */
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }

      if (config.signal && config.signal.aborted) {
        throw new CanceledError(null, config);
      }
    }

    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    function dispatchRequest(config) {
      throwIfCancellationRequested(config);

      config.headers = AxiosHeaders$1.from(config.headers);

      // Transform request data
      config.data = transformData.call(
        config,
        config.transformRequest
      );

      if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
        config.headers.setContentType('application/x-www-form-urlencoded', false);
      }

      const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // Transform response data
        response.data = transformData.call(
          config,
          config.transformResponse,
          response
        );

        response.headers = AxiosHeaders$1.from(response.headers);

        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);

          // Transform response data
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              config.transformResponse,
              reason.response
            );
            reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
          }
        }

        return Promise.reject(reason);
      });
    }

    const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;

    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     *
     * @returns {Object} New object resulting from merging config2 to config1
     */
    function mergeConfig(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      const config = {};

      function getMergedValue(target, source, caseless) {
        if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
          return utils$1.merge.call({caseless}, target, source);
        } else if (utils$1.isPlainObject(source)) {
          return utils$1.merge({}, source);
        } else if (utils$1.isArray(source)) {
          return source.slice();
        }
        return source;
      }

      // eslint-disable-next-line consistent-return
      function mergeDeepProperties(a, b, caseless) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(a, b, caseless);
        } else if (!utils$1.isUndefined(a)) {
          return getMergedValue(undefined, a, caseless);
        }
      }

      // eslint-disable-next-line consistent-return
      function valueFromConfig2(a, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(undefined, b);
        }
      }

      // eslint-disable-next-line consistent-return
      function defaultToConfig2(a, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(undefined, b);
        } else if (!utils$1.isUndefined(a)) {
          return getMergedValue(undefined, a);
        }
      }

      // eslint-disable-next-line consistent-return
      function mergeDirectKeys(a, b, prop) {
        if (prop in config2) {
          return getMergedValue(a, b);
        } else if (prop in config1) {
          return getMergedValue(undefined, a);
        }
      }

      const mergeMap = {
        url: valueFromConfig2,
        method: valueFromConfig2,
        data: valueFromConfig2,
        baseURL: defaultToConfig2,
        transformRequest: defaultToConfig2,
        transformResponse: defaultToConfig2,
        paramsSerializer: defaultToConfig2,
        timeout: defaultToConfig2,
        timeoutMessage: defaultToConfig2,
        withCredentials: defaultToConfig2,
        adapter: defaultToConfig2,
        responseType: defaultToConfig2,
        xsrfCookieName: defaultToConfig2,
        xsrfHeaderName: defaultToConfig2,
        onUploadProgress: defaultToConfig2,
        onDownloadProgress: defaultToConfig2,
        decompress: defaultToConfig2,
        maxContentLength: defaultToConfig2,
        maxBodyLength: defaultToConfig2,
        beforeRedirect: defaultToConfig2,
        transport: defaultToConfig2,
        httpAgent: defaultToConfig2,
        httpsAgent: defaultToConfig2,
        cancelToken: defaultToConfig2,
        socketPath: defaultToConfig2,
        responseEncoding: defaultToConfig2,
        validateStatus: mergeDirectKeys,
        headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
      };

      utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
        const merge = mergeMap[prop] || mergeDeepProperties;
        const configValue = merge(config1[prop], config2[prop], prop);
        (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
      });

      return config;
    }

    const VERSION = "1.6.1";

    const validators$1 = {};

    // eslint-disable-next-line func-names
    ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
      validators$1[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
      };
    });

    const deprecatedWarnings = {};

    /**
     * Transitional option validator
     *
     * @param {function|boolean?} validator - set to false if the transitional option has been removed
     * @param {string?} version - deprecated version / removed since version
     * @param {string?} message - some message with additional info
     *
     * @returns {function}
     */
    validators$1.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
      }

      // eslint-disable-next-line func-names
      return (value, opt, opts) => {
        if (validator === false) {
          throw new AxiosError(
            formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
            AxiosError.ERR_DEPRECATED
          );
        }

        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          // eslint-disable-next-line no-console
          console.warn(
            formatMessage(
              opt,
              ' has been deprecated since v' + version + ' and will be removed in the near future'
            )
          );
        }

        return validator ? validator(value, opt, opts) : true;
      };
    };

    /**
     * Assert object's properties type
     *
     * @param {object} options
     * @param {object} schema
     * @param {boolean?} allowUnknown
     *
     * @returns {object}
     */

    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== 'object') {
        throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
      }
      const keys = Object.keys(options);
      let i = keys.length;
      while (i-- > 0) {
        const opt = keys[i];
        const validator = schema[opt];
        if (validator) {
          const value = options[opt];
          const result = value === undefined || validator(value, opt, options);
          if (result !== true) {
            throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }

    var validator = {
      assertOptions,
      validators: validators$1
    };

    const validators = validator.validators;

    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     *
     * @return {Axios} A new instance of Axios
     */
    class Axios {
      constructor(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
          request: new InterceptorManager$1(),
          response: new InterceptorManager$1()
        };
      }

      /**
       * Dispatch a request
       *
       * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
       * @param {?Object} config
       *
       * @returns {Promise} The Promise to be fulfilled
       */
      request(configOrUrl, config) {
        /*eslint no-param-reassign:0*/
        // Allow for axios('example/url'[, config]) a la fetch API
        if (typeof configOrUrl === 'string') {
          config = config || {};
          config.url = configOrUrl;
        } else {
          config = configOrUrl || {};
        }

        config = mergeConfig(this.defaults, config);

        const {transitional, paramsSerializer, headers} = config;

        if (transitional !== undefined) {
          validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
          }, false);
        }

        if (paramsSerializer != null) {
          if (utils$1.isFunction(paramsSerializer)) {
            config.paramsSerializer = {
              serialize: paramsSerializer
            };
          } else {
            validator.assertOptions(paramsSerializer, {
              encode: validators.function,
              serialize: validators.function
            }, true);
          }
        }

        // Set config.method
        config.method = (config.method || this.defaults.method || 'get').toLowerCase();

        // Flatten headers
        let contextHeaders = headers && utils$1.merge(
          headers.common,
          headers[config.method]
        );

        headers && utils$1.forEach(
          ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
          (method) => {
            delete headers[method];
          }
        );

        config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

        // filter out skipped interceptors
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
            return;
          }

          synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

          requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });

        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });

        let promise;
        let i = 0;
        let len;

        if (!synchronousRequestInterceptors) {
          const chain = [dispatchRequest.bind(this), undefined];
          chain.unshift.apply(chain, requestInterceptorChain);
          chain.push.apply(chain, responseInterceptorChain);
          len = chain.length;

          promise = Promise.resolve(config);

          while (i < len) {
            promise = promise.then(chain[i++], chain[i++]);
          }

          return promise;
        }

        len = requestInterceptorChain.length;

        let newConfig = config;

        i = 0;

        while (i < len) {
          const onFulfilled = requestInterceptorChain[i++];
          const onRejected = requestInterceptorChain[i++];
          try {
            newConfig = onFulfilled(newConfig);
          } catch (error) {
            onRejected.call(this, error);
            break;
          }
        }

        try {
          promise = dispatchRequest.call(this, newConfig);
        } catch (error) {
          return Promise.reject(error);
        }

        i = 0;
        len = responseInterceptorChain.length;

        while (i < len) {
          promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        }

        return promise;
      }

      getUri(config) {
        config = mergeConfig(this.defaults, config);
        const fullPath = buildFullPath(config.baseURL, config.url);
        return buildURL(fullPath, config.params, config.paramsSerializer);
      }
    }

    // Provide aliases for supported request methods
    utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });

    utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/

      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            headers: isForm ? {
              'Content-Type': 'multipart/form-data'
            } : {},
            url,
            data
          }));
        };
      }

      Axios.prototype[method] = generateHTTPMethod();

      Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
    });

    var Axios$1 = Axios;

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @param {Function} executor The executor function.
     *
     * @returns {CancelToken}
     */
    class CancelToken {
      constructor(executor) {
        if (typeof executor !== 'function') {
          throw new TypeError('executor must be a function.');
        }

        let resolvePromise;

        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });

        const token = this;

        // eslint-disable-next-line func-names
        this.promise.then(cancel => {
          if (!token._listeners) return;

          let i = token._listeners.length;

          while (i-- > 0) {
            token._listeners[i](cancel);
          }
          token._listeners = null;
        });

        // eslint-disable-next-line func-names
        this.promise.then = onfulfilled => {
          let _resolve;
          // eslint-disable-next-line func-names
          const promise = new Promise(resolve => {
            token.subscribe(resolve);
            _resolve = resolve;
          }).then(onfulfilled);

          promise.cancel = function reject() {
            token.unsubscribe(_resolve);
          };

          return promise;
        };

        executor(function cancel(message, config, request) {
          if (token.reason) {
            // Cancellation has already been requested
            return;
          }

          token.reason = new CanceledError(message, config, request);
          resolvePromise(token.reason);
        });
      }

      /**
       * Throws a `CanceledError` if cancellation has been requested.
       */
      throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      }

      /**
       * Subscribe to the cancel signal
       */

      subscribe(listener) {
        if (this.reason) {
          listener(this.reason);
          return;
        }

        if (this._listeners) {
          this._listeners.push(listener);
        } else {
          this._listeners = [listener];
        }
      }

      /**
       * Unsubscribe from the cancel signal
       */

      unsubscribe(listener) {
        if (!this._listeners) {
          return;
        }
        const index = this._listeners.indexOf(listener);
        if (index !== -1) {
          this._listeners.splice(index, 1);
        }
      }

      /**
       * Returns an object that contains a new `CancelToken` and a function that, when called,
       * cancels the `CancelToken`.
       */
      static source() {
        let cancel;
        const token = new CancelToken(function executor(c) {
          cancel = c;
        });
        return {
          token,
          cancel
        };
      }
    }

    var CancelToken$1 = CancelToken;

    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     *
     * @returns {Function}
     */
    function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    }

    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     *
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */
    function isAxiosError(payload) {
      return utils$1.isObject(payload) && (payload.isAxiosError === true);
    }

    const HttpStatusCode = {
      Continue: 100,
      SwitchingProtocols: 101,
      Processing: 102,
      EarlyHints: 103,
      Ok: 200,
      Created: 201,
      Accepted: 202,
      NonAuthoritativeInformation: 203,
      NoContent: 204,
      ResetContent: 205,
      PartialContent: 206,
      MultiStatus: 207,
      AlreadyReported: 208,
      ImUsed: 226,
      MultipleChoices: 300,
      MovedPermanently: 301,
      Found: 302,
      SeeOther: 303,
      NotModified: 304,
      UseProxy: 305,
      Unused: 306,
      TemporaryRedirect: 307,
      PermanentRedirect: 308,
      BadRequest: 400,
      Unauthorized: 401,
      PaymentRequired: 402,
      Forbidden: 403,
      NotFound: 404,
      MethodNotAllowed: 405,
      NotAcceptable: 406,
      ProxyAuthenticationRequired: 407,
      RequestTimeout: 408,
      Conflict: 409,
      Gone: 410,
      LengthRequired: 411,
      PreconditionFailed: 412,
      PayloadTooLarge: 413,
      UriTooLong: 414,
      UnsupportedMediaType: 415,
      RangeNotSatisfiable: 416,
      ExpectationFailed: 417,
      ImATeapot: 418,
      MisdirectedRequest: 421,
      UnprocessableEntity: 422,
      Locked: 423,
      FailedDependency: 424,
      TooEarly: 425,
      UpgradeRequired: 426,
      PreconditionRequired: 428,
      TooManyRequests: 429,
      RequestHeaderFieldsTooLarge: 431,
      UnavailableForLegalReasons: 451,
      InternalServerError: 500,
      NotImplemented: 501,
      BadGateway: 502,
      ServiceUnavailable: 503,
      GatewayTimeout: 504,
      HttpVersionNotSupported: 505,
      VariantAlsoNegotiates: 506,
      InsufficientStorage: 507,
      LoopDetected: 508,
      NotExtended: 510,
      NetworkAuthenticationRequired: 511,
    };

    Object.entries(HttpStatusCode).forEach(([key, value]) => {
      HttpStatusCode[value] = key;
    });

    var HttpStatusCode$1 = HttpStatusCode;

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     *
     * @returns {Axios} A new instance of Axios
     */
    function createInstance(defaultConfig) {
      const context = new Axios$1(defaultConfig);
      const instance = bind(Axios$1.prototype.request, context);

      // Copy axios.prototype to instance
      utils$1.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

      // Copy context to instance
      utils$1.extend(instance, context, null, {allOwnKeys: true});

      // Factory for creating new instances
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };

      return instance;
    }

    // Create the default instance to be exported
    const axios = createInstance(defaults$1);

    // Expose Axios class to allow class inheritance
    axios.Axios = Axios$1;

    // Expose Cancel & CancelToken
    axios.CanceledError = CanceledError;
    axios.CancelToken = CancelToken$1;
    axios.isCancel = isCancel;
    axios.VERSION = VERSION;
    axios.toFormData = toFormData;

    // Expose AxiosError class
    axios.AxiosError = AxiosError;

    // alias for CanceledError for backward compatibility
    axios.Cancel = axios.CanceledError;

    // Expose all/spread
    axios.all = function all(promises) {
      return Promise.all(promises);
    };

    axios.spread = spread;

    // Expose isAxiosError
    axios.isAxiosError = isAxiosError;

    // Expose mergeConfig
    axios.mergeConfig = mergeConfig;

    axios.AxiosHeaders = AxiosHeaders$1;

    axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

    axios.getAdapter = adapters.getAdapter;

    axios.HttpStatusCode = HttpStatusCode$1;

    axios.default = axios;

    // this module should only have a default export
    var axios$1 = axios;

    const url = "http://localhost:4800/api";
    class RoleEndpoint {
        async post(name, admin_key) {
            return await axios$1.post(url + '/role', { name }, { headers: { "Admin-Key": admin_key } });
        }
        async get() {
            return await axios$1.get(url + '/role');
        }
        async delete(id, admin_key) {
            return await axios$1.delete(url + '/role/' + id, { headers: { "Admin-Key": admin_key } });
        }
    }
    class UserEndpoint {
        constructor() {
            this.register = async (name, username, password, salary, role_id, phone, email, admin_key) => {
                return await axios$1.post(url + '/user/register', { username, password, salary, name, role_id, phone, email }, { headers: { "Admin-Key": admin_key } });
            };
            this.login = async (username, password) => {
                return await axios$1.post(url + '/user/login', { username, password }, { headers: { "Content-Type": "application/json" } });
            };
            this.getTokenVerify = async (token) => {
                return await axios$1.get(url + '/user/verify', { headers: { "Access-Token": token } });
            };
            this.getAdminVerify = async (admin_key) => {
                return await axios$1.get(url + '/user/admin', { headers: { "Admin-Key": admin_key } });
            };
            this.get = async (token) => {
                return await axios$1.get(url + '/user', { headers: { "Access-Token": token } });
            };
        }
    }
    class RoomEndpoint {
        constructor() {
            this.post = async (name, desc, capacity, token, admin_key) => {
                return await axios$1.post(url + '/room', { name, desc, capacity }, { headers: { "Access-Token": token, "Admin-Key": admin_key } });
            };
            this.put = async (id, name, desc, capacity, token, admin_key) => {
                return await axios$1.put(url + '/room/' + id, { name, desc, capacity }, { headers: { "Access-Token": token, "Admin-Key": admin_key } });
            };
            this.get = async (token) => {
                return await axios$1.get(url + '/room', { headers: { "Access-Token": token } });
            };
            this.delete = async (id, token, admin_key) => {
                return await axios$1.delete(url + '/room/' + id, { headers: { "Access-Token": token, "Admin-Key": admin_key } });
            };
        }
    }
    class CategoryEndpoint {
        async post(name, desc, token, adminkey) {
            return await axios$1.post(url + '/category', { name, desc }, { headers: { "Access-Token": token, "Admin-Key": adminkey } });
        }
        async get() {
            return await axios$1.get(url + '/category');
        }
        async delete(id, token, adminkey) {
            return await axios$1.delete(url + '/category/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey } });
        }
    }
    class ProductEndpoint {
        async post(category_id, name, price, desc, token, adminkey) {
            return await axios$1.post(url + '/product', { name, desc, category_id, price }, { headers: { "Access-Token": token, "Admin-Key": adminkey } });
        }
        async get() {
            return await axios$1.get(url + '/product');
        }
        async getByCatgory(category_id) {
            return await axios$1.get(url + '/product?category_id=' + category_id);
        }
        async delete(id, token, adminkey) {
            return await axios$1.delete(url + '/product/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey } });
        }
    }
    class OrderEndpoint {
        async post(title, desc, room_id, token) {
            return await axios$1.post(url + '/order', { title, desc, room_id }, { headers: { "Access-Token": token } });
        }
        async get(token) {
            return await axios$1.get(url + '/order', { headers: { "Access-Token": token } });
        }
        async getStatus(status_order, token) {
            return await axios$1.get(url + '/order?status_order=' + status_order, { headers: { "Access-Token": token } });
        }
        async getRoom(room_id, token) {
            return await axios$1.get(url + '/order?room_id=' + room_id, { headers: { "Access-Token": token } });
        }
        async getStatusRoom(status_order, room_id, token) {
            return await axios$1.get(url + '/order?status_order=' + status_order + '&room_id=' + room_id, { headers: { "Access-Token": token } });
        }
        async delete(id, token, admin_key) {
            return await axios$1.delete(url + '/order/' + id, { headers: { "Access-Token": token, "Admin-Key": admin_key } });
        }
        async patchStatus(id, status, token, admin_key) {
            return await axios$1.patch(url + '/order/' + id + '/status', { status }, { headers: { "Access-Token": token, "Admin-Key": admin_key } });
        }
        async getStatusUser(status_order, user_id, token) {
            return await axios$1.patch(url + '/order?status_order=' + status_order + '&user_id=' + user_id, { headers: { "Access-Token": token } });
        }
        async getWaiterOrders(token) {
            return await axios$1.get(url + '/order/waiter', { headers: { "Access-Token": token } });
        }
    }
    class ProductInOrderEndpoint {
        async post(order_id, product_id, count, token) {
            return await axios$1.post(url + '/productinorder', { order_id, product_id, count }, { headers: { "Access-Token": token } });
        }
        async get(token, order_id) {
            if (order_id) {
                return await axios$1.get(url + '/productinorder?order_id=' + order_id, { headers: { "Access-Token": token } });
            }
            else {
                return await axios$1.get(url + '/productinorder', { headers: { "Access-Token": token } });
            }
        }
        async delete(id, token) {
            return await axios$1.delete(url + '/productinorder/' + id, { headers: { "Access-Token": token } });
        }
        async put(id, product_id, count, token) {
            return await axios$1.put(url + '/productinorder/' + id, { product_id, count }, { headers: { "Access-Token": token } });
        }
        async patchStatus(id, status, token) {
            return await axios$1.patch(url + '/productinorder/' + id + '/status', { status }, { headers: { "Access-Token": token } });
        }
    }

    /* src\web\Admin.svelte generated by Svelte v3.59.2 */

    const { console: console_1$j } = globals;

    function create_fragment$w(ctx) {
    	const block = {
    		c: function create() {
    			document.title = "Admin sahifasi";
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop$1,
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: noop$1
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Admin', slots, []);
    	const userEndpoint = new UserEndpoint();
    	const token = localStorage.getItem('token');
    	const user = JSON.parse(localStorage.getItem('user'));

    	// check token
    	async function getVerify() {
    		try {
    			const res = await userEndpoint.getTokenVerify(token);

    			if (res.status == 200) {
    				if (user.role === 'admin') {
    					if (screen.width < 500) {
    						navigate('/m');
    					} else {
    						console.log('verify success');
    					}
    				} else {
    					navigate('/w');
    				}
    			} else {
    				navigate('/login');
    			}
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getVerify();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$j.warn(`<Admin> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		UserEndpoint,
    		navigate,
    		userEndpoint,
    		token,
    		user,
    		getVerify
    	});

    	return [];
    }

    class Admin extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Admin",
    			options,
    			id: create_fragment$w.name
    		});
    	}
    }

    /* src\web\Home.svelte generated by Svelte v3.59.2 */

    function create_fragment$v(ctx) {
    	const block = {
    		c: noop$1,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop$1,
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: noop$1
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	const userEndpoint = new UserEndpoint();
    	const token = localStorage.getItem("token");

    	// check token
    	async function checkToken() {
    		if (token) {
    			try {
    				await userEndpoint.getTokenVerify(token);
    				const role = JSON.parse(localStorage.getItem("user")).role;

    				if (typeof role === "string" && role === "admin") {
    					if (screen.width < 500) {
    						navigate("/m");
    					} else {
    						navigate("/admin");
    					}
    				} else {
    					navigate("/w");
    				}
    			} catch(error) {
    				navigate("/login");
    			}
    		} else {
    			navigate('/login');
    		}
    	}

    	checkToken();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		navigate,
    		UserEndpoint,
    		userEndpoint,
    		token,
    		checkToken
    	});

    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$v.name
    		});
    	}
    }

    /* src\modalsAll\Alert.svelte generated by Svelte v3.59.2 */

    const file$t = "src\\modalsAll\\Alert.svelte";

    function create_fragment$u(ctx) {
    	let div1;
    	let div0;
    	let span;
    	let i;
    	let i_class_value;
    	let span_class_value;
    	let t0;
    	let p0;
    	let t1;
    	let t2;
    	let p1;
    	let t3;
    	let t4;
    	let button;
    	let t5;
    	let button_class_value;
    	let div1_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			span = element("span");
    			i = element("i");
    			t0 = space();
    			p0 = element("p");
    			t1 = text(/*title*/ ctx[2]);
    			t2 = space();
    			p1 = element("p");
    			t3 = text(/*text*/ ctx[3]);
    			t4 = space();
    			button = element("button");
    			t5 = text("Yopish");
    			attr_dev(i, "class", i_class_value = "bi bi-" + /*icon*/ ctx[4] + " text-[40px] text-gray-100");
    			add_location(i, file$t, 10, 103, 447);
    			attr_dev(span, "class", span_class_value = "w-[64px] h-[64px] flex items-center justify-center rounded-[100px] bg-" + /*color*/ ctx[1]);
    			add_location(span, file$t, 10, 8, 352);
    			attr_dev(p0, "class", "text-3xl font-semibold");
    			add_location(p0, file$t, 11, 8, 518);
    			attr_dev(p1, "class", "text-sm font-medium text-center");
    			add_location(p1, file$t, 12, 8, 573);
    			attr_dev(button, "class", button_class_value = "py-2 px-4 w-full rounded-2xl text-md font-semibold text-gray-100 bg-" + /*color*/ ctx[1]);
    			add_location(button, file$t, 13, 8, 636);
    			attr_dev(div0, "class", "flex flex-col items-center gap-3 bg-white rounded-2xl p-3 w-4/5");
    			add_location(div0, file$t, 9, 4, 265);
    			attr_dev(div1, "class", div1_class_value = "w-screen h-screen bg-black/20 fixed justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div1, file$t, 8, 0, 150);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, span);
    			append_dev(span, i);
    			append_dev(div0, t0);
    			append_dev(div0, p0);
    			append_dev(p0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, p1);
    			append_dev(p1, t3);
    			append_dev(div0, t4);
    			append_dev(div0, button);
    			append_dev(button, t5);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*close*/ ctx[5])) /*close*/ ctx[5].apply(this, arguments);
    					},
    					false,
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (dirty & /*icon*/ 16 && i_class_value !== (i_class_value = "bi bi-" + /*icon*/ ctx[4] + " text-[40px] text-gray-100")) {
    				attr_dev(i, "class", i_class_value);
    			}

    			if (dirty & /*color*/ 2 && span_class_value !== (span_class_value = "w-[64px] h-[64px] flex items-center justify-center rounded-[100px] bg-" + /*color*/ ctx[1])) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*title*/ 4) set_data_dev(t1, /*title*/ ctx[2]);
    			if (dirty & /*text*/ 8) set_data_dev(t3, /*text*/ ctx[3]);

    			if (dirty & /*color*/ 2 && button_class_value !== (button_class_value = "py-2 px-4 w-full rounded-2xl text-md font-semibold text-gray-100 bg-" + /*color*/ ctx[1])) {
    				attr_dev(button, "class", button_class_value);
    			}

    			if (dirty & /*show*/ 1 && div1_class_value !== (div1_class_value = "w-screen h-screen bg-black/20 fixed justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Alert', slots, []);
    	let { show = false } = $$props;
    	let { color } = $$props;
    	let { title } = $$props;
    	let { text } = $$props;
    	let { icon } = $$props;
    	let { close } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (color === undefined && !('color' in $$props || $$self.$$.bound[$$self.$$.props['color']])) {
    			console.warn("<Alert> was created without expected prop 'color'");
    		}

    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<Alert> was created without expected prop 'title'");
    		}

    		if (text === undefined && !('text' in $$props || $$self.$$.bound[$$self.$$.props['text']])) {
    			console.warn("<Alert> was created without expected prop 'text'");
    		}

    		if (icon === undefined && !('icon' in $$props || $$self.$$.bound[$$self.$$.props['icon']])) {
    			console.warn("<Alert> was created without expected prop 'icon'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console.warn("<Alert> was created without expected prop 'close'");
    		}
    	});

    	const writable_props = ['show', 'color', 'title', 'text', 'icon', 'close'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Alert> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    		if ('text' in $$props) $$invalidate(3, text = $$props.text);
    		if ('icon' in $$props) $$invalidate(4, icon = $$props.icon);
    		if ('close' in $$props) $$invalidate(5, close = $$props.close);
    	};

    	$$self.$capture_state = () => ({ show, color, title, text, icon, close });

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    		if ('text' in $$props) $$invalidate(3, text = $$props.text);
    		if ('icon' in $$props) $$invalidate(4, icon = $$props.icon);
    		if ('close' in $$props) $$invalidate(5, close = $$props.close);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [show, color, title, text, icon, close];
    }

    class Alert extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$u, create_fragment$u, safe_not_equal, {
    			show: 0,
    			color: 1,
    			title: 2,
    			text: 3,
    			icon: 4,
    			close: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Alert",
    			options,
    			id: create_fragment$u.name
    		});
    	}

    	get show() {
    		throw new Error("<Alert>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Alert>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Alert>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Alert>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Alert>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Alert>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Alert>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Alert>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<Alert>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Alert>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<Alert>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<Alert>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\auth\Login.svelte generated by Svelte v3.59.2 */
    const file$s = "src\\auth\\Login.svelte";

    function create_fragment$t(ctx) {
    	let t0;
    	let div2;
    	let alert;
    	let t1;
    	let div1;
    	let h1;
    	let t3;
    	let div0;
    	let label0;
    	let t4;
    	let p0;
    	let t6;
    	let input0;
    	let t7;
    	let label1;
    	let t8;
    	let p1;
    	let t10;
    	let input1;
    	let t11;
    	let span;
    	let input2;
    	let t12;
    	let p2;
    	let t14;
    	let button0;
    	let t16;
    	let button1;
    	let current;
    	let mounted;
    	let dispose;

    	alert = new Alert({
    			props: {
    				show: /*show_alert*/ ctx[0],
    				close: /*func*/ ctx[8],
    				color: /*alert_color*/ ctx[2],
    				text: /*alert_text*/ ctx[3],
    				title: /*alert_title*/ ctx[1],
    				icon: /*alert_icon*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			div2 = element("div");
    			create_component(alert.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Tizimga kirish";
    			t3 = space();
    			div0 = element("div");
    			label0 = element("label");
    			t4 = text("Username: ");
    			p0 = element("p");
    			p0.textContent = "*";
    			t6 = space();
    			input0 = element("input");
    			t7 = space();
    			label1 = element("label");
    			t8 = text("Password: ");
    			p1 = element("p");
    			p1.textContent = "*";
    			t10 = space();
    			input1 = element("input");
    			t11 = space();
    			span = element("span");
    			input2 = element("input");
    			t12 = space();
    			p2 = element("p");
    			p2.textContent = "Show password";
    			t14 = space();
    			button0 = element("button");
    			button0.textContent = "Kirish";
    			t16 = space();
    			button1 = element("button");
    			button1.textContent = "Ro'yhatdan o'tish";
    			document.title = "Tizimga kirish";
    			attr_dev(h1, "class", "text-3xl font-bold outline-none");
    			add_location(h1, file$s, 57, 8, 1957);
    			attr_dev(p0, "class", "text-red-500 inline");
    			add_location(p0, file$s, 59, 66, 2131);
    			attr_dev(label0, "class", "font-semibold");
    			attr_dev(label0, "for", "username");
    			add_location(label0, file$s, 59, 12, 2077);
    			attr_dev(input0, "class", "outline-none border-2 p-2 rounded-md");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "username");
    			attr_dev(input0, "placeholder", "username");
    			add_location(input0, file$s, 60, 12, 2189);
    			attr_dev(p1, "class", "text-red-500 inline");
    			add_location(p1, file$s, 61, 66, 2381);
    			attr_dev(label1, "class", "font-semibold");
    			attr_dev(label1, "for", "password");
    			add_location(label1, file$s, 61, 12, 2327);
    			attr_dev(input1, "class", "outline-none border-2 p-2 rounded-md");
    			attr_dev(input1, "type", "password");
    			attr_dev(input1, "name", "password");
    			add_location(input1, file$s, 62, 12, 2439);
    			attr_dev(input2, "type", "checkbox");
    			attr_dev(input2, "name", "show-password");
    			add_location(input2, file$s, 64, 16, 2601);
    			add_location(p2, file$s, 73, 16, 2948);
    			attr_dev(span, "class", "flex gap-3");
    			add_location(span, file$s, 63, 12, 2558);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$s, 58, 8, 2030);
    			attr_dev(button0, "class", "bg-indigo-500 text-white font-bold p-3 rounded-md");
    			add_location(button0, file$s, 76, 8, 3015);
    			attr_dev(button1, "class", "text-sm font-medium py1 rounded-md");
    			add_location(button1, file$s, 77, 8, 3123);
    			attr_dev(div1, "class", "flex flex-col gap-4 bg-white p-8 rounded-md");
    			add_location(div1, file$s, 56, 4, 1890);
    			attr_dev(div2, "class", "flex justify-center items-center w-screen h-screen bg-indigo-500");
    			add_location(div2, file$s, 54, 0, 1663);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			mount_component(alert, div2, null);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, label0);
    			append_dev(label0, t4);
    			append_dev(label0, p0);
    			append_dev(div0, t6);
    			append_dev(div0, input0);
    			/*input0_binding*/ ctx[9](input0);
    			append_dev(div0, t7);
    			append_dev(div0, label1);
    			append_dev(label1, t8);
    			append_dev(label1, p1);
    			append_dev(div0, t10);
    			append_dev(div0, input1);
    			/*input1_binding*/ ctx[10](input1);
    			append_dev(div0, t11);
    			append_dev(div0, span);
    			append_dev(span, input2);
    			append_dev(span, t12);
    			append_dev(span, p2);
    			append_dev(div1, t14);
    			append_dev(div1, button0);
    			append_dev(div1, t16);
    			append_dev(div1, button1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input2, "change", /*change_handler*/ ctx[11], false, false, false, false),
    					listen_dev(button0, "click", /*login*/ ctx[7], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler*/ ctx[12], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const alert_changes = {};
    			if (dirty & /*show_alert*/ 1) alert_changes.show = /*show_alert*/ ctx[0];
    			if (dirty & /*show_alert*/ 1) alert_changes.close = /*func*/ ctx[8];
    			if (dirty & /*alert_color*/ 4) alert_changes.color = /*alert_color*/ ctx[2];
    			if (dirty & /*alert_text*/ 8) alert_changes.text = /*alert_text*/ ctx[3];
    			if (dirty & /*alert_title*/ 2) alert_changes.title = /*alert_title*/ ctx[1];
    			if (dirty & /*alert_icon*/ 16) alert_changes.icon = /*alert_icon*/ ctx[4];
    			alert.$set(alert_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(alert.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(alert.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			destroy_component(alert);
    			/*input0_binding*/ ctx[9](null);
    			/*input1_binding*/ ctx[10](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Login', slots, []);
    	const userEndpoint = new UserEndpoint();
    	const token = localStorage.getItem('token');

    	let show_alert = false;
    	let alert_title;
    	let alert_color;
    	let alert_text;
    	let alert_icon;
    	let password;
    	let username;

    	function showAlert(title, color, text, icon) {
    		$$invalidate(0, show_alert = true);
    		$$invalidate(1, alert_title = title);
    		$$invalidate(3, alert_text = text);
    		$$invalidate(2, alert_color = color);
    		$$invalidate(4, alert_icon = icon);
    	}

    	async function login() {
    		try {
    			const res = await userEndpoint.login(username.value, password.value);
    			localStorage.setItem('token', res.data.token);
    			localStorage.setItem('user', JSON.stringify(res.data.user));
    			navigate('/');
    		} catch(error) {
    			if (error.response.status == 404) {
    				showAlert('Xatolik', 'red-500', "Foydalanuchi topilmadi. Iltimos qaytadan urunib ko'ring", 'x');
    			} else if (error.response.status == 401) {
    				showAlert('Xatolik', 'red-500', "Foydalanuvchi nomi yoki parol noto'g'ri. Iltimos qaytadan urunib ko'ring", 'x');
    			} else if (error.response.status >= 500) {
    				showAlert('Xatolik', 'red-500', "Serverda xatolik. Iltimos dasturchi bilan bog'laning", 'x');
    			}
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Login> was created with unknown prop '${key}'`);
    	});

    	const func = () => $$invalidate(0, show_alert = false);

    	function input0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			username = $$value;
    			$$invalidate(6, username);
    		});
    	}

    	function input1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			password = $$value;
    			$$invalidate(5, password);
    		});
    	}

    	const change_handler = () => {
    		if (password.type === "password") {
    			$$invalidate(5, password.type = "text", password);
    		} else {
    			$$invalidate(5, password.type = "password", password);
    		}
    	};

    	const click_handler = () => {
    		navigate('/check');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		UserEndpoint,
    		userEndpoint,
    		token,
    		Alert,
    		show_alert,
    		alert_title,
    		alert_color,
    		alert_text,
    		alert_icon,
    		password,
    		username,
    		showAlert,
    		login
    	});

    	$$self.$inject_state = $$props => {
    		if ('show_alert' in $$props) $$invalidate(0, show_alert = $$props.show_alert);
    		if ('alert_title' in $$props) $$invalidate(1, alert_title = $$props.alert_title);
    		if ('alert_color' in $$props) $$invalidate(2, alert_color = $$props.alert_color);
    		if ('alert_text' in $$props) $$invalidate(3, alert_text = $$props.alert_text);
    		if ('alert_icon' in $$props) $$invalidate(4, alert_icon = $$props.alert_icon);
    		if ('password' in $$props) $$invalidate(5, password = $$props.password);
    		if ('username' in $$props) $$invalidate(6, username = $$props.username);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show_alert,
    		alert_title,
    		alert_color,
    		alert_text,
    		alert_icon,
    		password,
    		username,
    		login,
    		func,
    		input0_binding,
    		input1_binding,
    		change_handler,
    		click_handler
    	];
    }

    class Login extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$t, create_fragment$t, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Login",
    			options,
    			id: create_fragment$t.name
    		});
    	}
    }

    // role store
    const roleStore = writable([]);
    const userStore = writable([]);
    // room store
    const roomStore = writable([]);
    // category store
    const categoryStore = writable([]);
    // product store
    const productStore = writable([]);
    // order store
    const orderStore = writable([]);
    // product in order store
    const productInOrderStore = writable([]);

    /* src\auth\Register.svelte generated by Svelte v3.59.2 */
    const file$r = "src\\auth\\Register.svelte";

    function get_each_context$d(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (69:16) {#each $roleStore as role}
    function create_each_block$d(ctx) {
    	let option;
    	let t_value = /*role*/ ctx[7].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*role*/ ctx[7].id;
    			option.value = option.__value;
    			add_location(option, file$r, 69, 20, 3054);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$roleStore*/ 64 && t_value !== (t_value = /*role*/ ctx[7].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$roleStore*/ 64 && option_value_value !== (option_value_value = /*role*/ ctx[7].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$d.name,
    		type: "each",
    		source: "(69:16) {#each $roleStore as role}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$s(ctx) {
    	let t0;
    	let div2;
    	let div1;
    	let h1;
    	let t2;
    	let div0;
    	let label0;
    	let t3;
    	let p0;
    	let t5;
    	let input0;
    	let t6;
    	let label1;
    	let t7;
    	let p1;
    	let t9;
    	let input1;
    	let t10;
    	let label2;
    	let t11;
    	let p2;
    	let t13;
    	let input2;
    	let t14;
    	let label3;
    	let t15;
    	let p3;
    	let t17;
    	let input3;
    	let t18;
    	let label4;
    	let t19;
    	let p4;
    	let t21;
    	let input4;
    	let t22;
    	let label5;
    	let t23;
    	let p5;
    	let t25;
    	let select;
    	let t26;
    	let label6;
    	let t27;
    	let p6;
    	let t29;
    	let input5;
    	let t30;
    	let span;
    	let input6;
    	let t31;
    	let p7;
    	let t33;
    	let button0;
    	let t35;
    	let button1;
    	let mounted;
    	let dispose;
    	let each_value = /*$roleStore*/ ctx[6];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$d(get_each_context$d(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Ro'yhatdan o'tish";
    			t2 = space();
    			div0 = element("div");
    			label0 = element("label");
    			t3 = text("Ism: ");
    			p0 = element("p");
    			p0.textContent = "*";
    			t5 = space();
    			input0 = element("input");
    			t6 = space();
    			label1 = element("label");
    			t7 = text("Username: ");
    			p1 = element("p");
    			p1.textContent = "*";
    			t9 = space();
    			input1 = element("input");
    			t10 = space();
    			label2 = element("label");
    			t11 = text("Email: ");
    			p2 = element("p");
    			p2.textContent = "*";
    			t13 = space();
    			input2 = element("input");
    			t14 = space();
    			label3 = element("label");
    			t15 = text("Telefon: ");
    			p3 = element("p");
    			p3.textContent = "*";
    			t17 = space();
    			input3 = element("input");
    			t18 = space();
    			label4 = element("label");
    			t19 = text("Oylik maosh: ");
    			p4 = element("p");
    			p4.textContent = "*";
    			t21 = space();
    			input4 = element("input");
    			t22 = space();
    			label5 = element("label");
    			t23 = text("Roli: ");
    			p5 = element("p");
    			p5.textContent = "*";
    			t25 = space();
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t26 = space();
    			label6 = element("label");
    			t27 = text("Password: ");
    			p6 = element("p");
    			p6.textContent = "*";
    			t29 = space();
    			input5 = element("input");
    			t30 = space();
    			span = element("span");
    			input6 = element("input");
    			t31 = space();
    			p7 = element("p");
    			p7.textContent = "Show password";
    			t33 = space();
    			button0 = element("button");
    			button0.textContent = "Ro'yhatdan o'tish";
    			t35 = space();
    			button1 = element("button");
    			button1.textContent = "Kirish";
    			document.title = "Tizimga kirish";
    			attr_dev(h1, "class", "text-2xl font-bold outline-none");
    			add_location(h1, file$r, 54, 8, 1452);
    			attr_dev(p0, "class", "text-red-500 inline");
    			add_location(p0, file$r, 56, 57, 1620);
    			attr_dev(label0, "class", "font-semibold");
    			attr_dev(label0, "for", "name");
    			add_location(label0, file$r, 56, 12, 1575);
    			attr_dev(input0, "class", "outline-none border-2 p-2 rounded-md");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "name");
    			attr_dev(input0, "placeholder", "Eshmatov Toshmat");
    			add_location(input0, file$r, 57, 12, 1678);
    			attr_dev(p1, "class", "text-red-500 inline");
    			add_location(p1, file$r, 58, 66, 1870);
    			attr_dev(label1, "class", "font-semibold");
    			attr_dev(label1, "for", "username");
    			add_location(label1, file$r, 58, 12, 1816);
    			attr_dev(input1, "class", "outline-none border-2 p-2 rounded-md");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "username");
    			attr_dev(input1, "placeholder", "username");
    			add_location(input1, file$r, 59, 12, 1928);
    			attr_dev(p2, "class", "text-red-500 inline");
    			add_location(p2, file$r, 60, 60, 2114);
    			attr_dev(label2, "class", "font-semibold");
    			attr_dev(label2, "for", "phone");
    			add_location(label2, file$r, 60, 12, 2066);
    			attr_dev(input2, "class", "outline-none border-2 p-2 rounded-md");
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "name", "phone");
    			attr_dev(input2, "placeholder", "email@gmail.com");
    			add_location(input2, file$r, 61, 12, 2172);
    			attr_dev(p3, "class", "text-red-500 inline");
    			add_location(p3, file$r, 62, 62, 2361);
    			attr_dev(label3, "class", "font-semibold");
    			attr_dev(label3, "for", "phone");
    			add_location(label3, file$r, 62, 12, 2311);
    			attr_dev(input3, "class", "outline-none border-2 p-2 rounded-md");
    			attr_dev(input3, "type", "text");
    			attr_dev(input3, "name", "phone");
    			attr_dev(input3, "placeholder", "+998905789204");
    			add_location(input3, file$r, 63, 12, 2419);
    			attr_dev(p4, "class", "text-red-500 inline");
    			add_location(p4, file$r, 64, 67, 2611);
    			attr_dev(label4, "class", "font-semibold");
    			attr_dev(label4, "for", "salary");
    			add_location(label4, file$r, 64, 12, 2556);
    			attr_dev(input4, "class", "outline-none border-2 p-2 rounded-md");
    			attr_dev(input4, "type", "text");
    			attr_dev(input4, "name", "salary");
    			attr_dev(input4, "placeholder", "2000000");
    			add_location(input4, file$r, 65, 12, 2669);
    			attr_dev(p5, "class", "text-red-500 inline");
    			add_location(p5, file$r, 66, 58, 2848);
    			attr_dev(label5, "class", "font-semibold");
    			attr_dev(label5, "for", "role");
    			add_location(label5, file$r, 66, 12, 2802);
    			attr_dev(select, "class", "outline-none border-2 p-2 rounded-md");
    			attr_dev(select, "name", "role");
    			add_location(select, file$r, 67, 12, 2906);
    			attr_dev(p6, "class", "text-red-500 inline");
    			add_location(p6, file$r, 72, 66, 3216);
    			attr_dev(label6, "class", "font-semibold");
    			attr_dev(label6, "for", "password");
    			add_location(label6, file$r, 72, 12, 3162);
    			attr_dev(input5, "class", "outline-none border-2 p-2 rounded-md");
    			attr_dev(input5, "type", "password");
    			attr_dev(input5, "name", "password");
    			add_location(input5, file$r, 73, 12, 3274);
    			attr_dev(input6, "type", "checkbox");
    			attr_dev(input6, "name", "show-password");
    			add_location(input6, file$r, 75, 16, 3436);
    			add_location(p7, file$r, 84, 16, 3783);
    			attr_dev(span, "class", "flex gap-3");
    			add_location(span, file$r, 74, 12, 3393);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$r, 55, 8, 1528);
    			attr_dev(button0, "class", "bg-indigo-500 text-white font-semibold p-3 rounded-md");
    			add_location(button0, file$r, 87, 8, 3850);
    			attr_dev(button1, "class", "text-sm font-semibold py1 rounded-md");
    			add_location(button1, file$r, 88, 8, 3973);
    			attr_dev(div1, "class", "flex flex-col gap-4 bg-white p-8 rounded-md");
    			add_location(div1, file$r, 53, 4, 1385);
    			attr_dev(div2, "class", "flex justify-center items-center w-screen min-h-screen py-5 bg-indigo-500");
    			add_location(div2, file$r, 52, 0, 1292);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, label0);
    			append_dev(label0, t3);
    			append_dev(label0, p0);
    			append_dev(div0, t5);
    			append_dev(div0, input0);
    			/*input0_binding*/ ctx[9](input0);
    			append_dev(div0, t6);
    			append_dev(div0, label1);
    			append_dev(label1, t7);
    			append_dev(label1, p1);
    			append_dev(div0, t9);
    			append_dev(div0, input1);
    			/*input1_binding*/ ctx[10](input1);
    			append_dev(div0, t10);
    			append_dev(div0, label2);
    			append_dev(label2, t11);
    			append_dev(label2, p2);
    			append_dev(div0, t13);
    			append_dev(div0, input2);
    			/*input2_binding*/ ctx[11](input2);
    			append_dev(div0, t14);
    			append_dev(div0, label3);
    			append_dev(label3, t15);
    			append_dev(label3, p3);
    			append_dev(div0, t17);
    			append_dev(div0, input3);
    			/*input3_binding*/ ctx[12](input3);
    			append_dev(div0, t18);
    			append_dev(div0, label4);
    			append_dev(label4, t19);
    			append_dev(label4, p4);
    			append_dev(div0, t21);
    			append_dev(div0, input4);
    			/*input4_binding*/ ctx[13](input4);
    			append_dev(div0, t22);
    			append_dev(div0, label5);
    			append_dev(label5, t23);
    			append_dev(label5, p5);
    			append_dev(div0, t25);
    			append_dev(div0, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(select, null);
    				}
    			}

    			/*select_binding*/ ctx[14](select);
    			append_dev(div0, t26);
    			append_dev(div0, label6);
    			append_dev(label6, t27);
    			append_dev(label6, p6);
    			append_dev(div0, t29);
    			append_dev(div0, input5);
    			/*input5_binding*/ ctx[15](input5);
    			append_dev(div0, t30);
    			append_dev(div0, span);
    			append_dev(span, input6);
    			append_dev(span, t31);
    			append_dev(span, p7);
    			append_dev(div1, t33);
    			append_dev(div1, button0);
    			append_dev(div1, t35);
    			append_dev(div1, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input6, "change", /*change_handler*/ ctx[16], false, false, false, false),
    					listen_dev(button0, "click", /*login*/ ctx[8], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler*/ ctx[17], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$roleStore*/ 64) {
    				each_value = /*$roleStore*/ ctx[6];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$d(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$d(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			/*input0_binding*/ ctx[9](null);
    			/*input1_binding*/ ctx[10](null);
    			/*input2_binding*/ ctx[11](null);
    			/*input3_binding*/ ctx[12](null);
    			/*input4_binding*/ ctx[13](null);
    			destroy_each(each_blocks, detaching);
    			/*select_binding*/ ctx[14](null);
    			/*input5_binding*/ ctx[15](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let $roleStore;
    	validate_store(roleStore, 'roleStore');
    	component_subscribe($$self, roleStore, $$value => $$invalidate(6, $roleStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Register', slots, []);
    	const userEndpoint = new UserEndpoint();
    	const roleEndpoint = new RoleEndpoint();
    	const admin_key = localStorage.getItem('admin-key');

    	if (admin_key) {
    		// get admin verify
    		async function getAdminVerify() {
    			try {
    				await userEndpoint.getAdminVerify(admin_key);
    			} catch(error) {
    				navigate('/check');
    			}
    		}

    		getAdminVerify();
    	} else {
    		navigate('/check');
    	}

    	// get roles
    	async function getRoles() {
    		try {
    			const res = await roleEndpoint.get();
    			const roles = res.data.roles;
    			roleStore.set(roles);
    		} catch(error) {
    			
    		}
    	}

    	getRoles();
    	let name;
    	let username;
    	let password;
    	let phone;
    	let email;
    	let salary;
    	let role;

    	async function login() {
    		try {
    			const res = await userEndpoint.register(name.value, username.value, password.value, +salary.value, +role.value, phone.value, email.value, admin_key);
    			localStorage.removeItem('admin-key');
    			navigate('/login');
    		} catch(error) {
    			
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Register> was created with unknown prop '${key}'`);
    	});

    	function input0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			name = $$value;
    			$$invalidate(0, name);
    		});
    	}

    	function input1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			username = $$value;
    			$$invalidate(1, username);
    		});
    	}

    	function input2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			email = $$value;
    			$$invalidate(4, email);
    		});
    	}

    	function input3_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			phone = $$value;
    			$$invalidate(3, phone);
    		});
    	}

    	function input4_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			salary = $$value;
    			$$invalidate(5, salary);
    		});
    	}

    	function select_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			role = $$value;
    			$$invalidate(7, role);
    		});
    	}

    	function input5_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			password = $$value;
    			$$invalidate(2, password);
    		});
    	}

    	const change_handler = () => {
    		if (password.type === "password") {
    			$$invalidate(2, password.type = "text", password);
    		} else {
    			$$invalidate(2, password.type = "password", password);
    		}
    	};

    	const click_handler = () => {
    		navigate('/login');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		UserEndpoint,
    		RoleEndpoint,
    		roleStore,
    		userEndpoint,
    		roleEndpoint,
    		admin_key,
    		getRoles,
    		name,
    		username,
    		password,
    		phone,
    		email,
    		salary,
    		role,
    		login,
    		$roleStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('username' in $$props) $$invalidate(1, username = $$props.username);
    		if ('password' in $$props) $$invalidate(2, password = $$props.password);
    		if ('phone' in $$props) $$invalidate(3, phone = $$props.phone);
    		if ('email' in $$props) $$invalidate(4, email = $$props.email);
    		if ('salary' in $$props) $$invalidate(5, salary = $$props.salary);
    		if ('role' in $$props) $$invalidate(7, role = $$props.role);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		username,
    		password,
    		phone,
    		email,
    		salary,
    		$roleStore,
    		role,
    		login,
    		input0_binding,
    		input1_binding,
    		input2_binding,
    		input3_binding,
    		input4_binding,
    		select_binding,
    		input5_binding,
    		change_handler,
    		click_handler
    	];
    }

    class Register extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Register",
    			options,
    			id: create_fragment$s.name
    		});
    	}
    }

    /* src\auth\Check.svelte generated by Svelte v3.59.2 */

    const { console: console_1$i } = globals;
    const file$q = "src\\auth\\Check.svelte";

    function create_fragment$r(ctx) {
    	let t0;
    	let div2;
    	let div1;
    	let h1;
    	let t2;
    	let div0;
    	let label;
    	let t3;
    	let p0;
    	let t5;
    	let input0;
    	let t6;
    	let span;
    	let input1;
    	let t7;
    	let p1;
    	let t9;
    	let button0;
    	let t11;
    	let button1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Admin parolni yozing";
    			t2 = space();
    			div0 = element("div");
    			label = element("label");
    			t3 = text("Admin key: ");
    			p0 = element("p");
    			p0.textContent = "*";
    			t5 = space();
    			input0 = element("input");
    			t6 = space();
    			span = element("span");
    			input1 = element("input");
    			t7 = space();
    			p1 = element("p");
    			p1.textContent = "Show password";
    			t9 = space();
    			button0 = element("button");
    			button0.textContent = "Tasdiqlash";
    			t11 = space();
    			button1 = element("button");
    			button1.textContent = "Kirish";
    			document.title = "Tizimga kirish";
    			attr_dev(h1, "class", "text-2xl font-bold outline-none");
    			add_location(h1, file$q, 39, 8, 1161);
    			attr_dev(p0, "class", "text-red-500 inline");
    			add_location(p0, file$q, 41, 67, 1342);
    			attr_dev(label, "class", "font-semibold");
    			attr_dev(label, "for", "password");
    			add_location(label, file$q, 41, 12, 1287);
    			attr_dev(input0, "class", "outline-none border-2 p-2 rounded-md");
    			attr_dev(input0, "type", "password");
    			attr_dev(input0, "name", "password");
    			add_location(input0, file$q, 42, 12, 1400);
    			attr_dev(input1, "type", "checkbox");
    			attr_dev(input1, "name", "show-password");
    			add_location(input1, file$q, 44, 16, 1562);
    			add_location(p1, file$q, 53, 16, 1909);
    			attr_dev(span, "class", "flex gap-3");
    			add_location(span, file$q, 43, 12, 1519);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$q, 40, 8, 1240);
    			attr_dev(button0, "class", "bg-indigo-500 text-white font-bold p-3 rounded-md");
    			add_location(button0, file$q, 56, 8, 1976);
    			attr_dev(button1, "class", "text-sm font-medium py1 rounded-md");
    			add_location(button1, file$q, 57, 8, 2088);
    			attr_dev(div1, "class", "flex flex-col gap-4 bg-white p-8 rounded-md");
    			add_location(div1, file$q, 38, 4, 1094);
    			attr_dev(div2, "class", "flex justify-center items-center w-screen h-screen bg-indigo-500");
    			add_location(div2, file$q, 37, 0, 1010);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, label);
    			append_dev(label, t3);
    			append_dev(label, p0);
    			append_dev(div0, t5);
    			append_dev(div0, input0);
    			/*input0_binding*/ ctx[2](input0);
    			append_dev(div0, t6);
    			append_dev(div0, span);
    			append_dev(span, input1);
    			append_dev(span, t7);
    			append_dev(span, p1);
    			append_dev(div1, t9);
    			append_dev(div1, button0);
    			append_dev(div1, t11);
    			append_dev(div1, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input1, "change", /*change_handler*/ ctx[3], false, false, false, false),
    					listen_dev(button0, "click", /*login*/ ctx[1], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler*/ ctx[4], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			/*input0_binding*/ ctx[2](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Check', slots, []);
    	const admin_key = localStorage.getItem('admin-key');
    	const userEndpoint = new UserEndpoint();

    	// get admin verify
    	async function getAdminVerify() {
    		try {
    			const res = await userEndpoint.getAdminVerify(admin_key);

    			if (res.status === 200) {
    				navigate('/register');
    			}
    		} catch(error) {
    			console.log('verify admin failed', error);
    		}
    	}

    	getAdminVerify();
    	let password;

    	async function login() {
    		try {
    			const res = await userEndpoint.getAdminVerify(password.value.toString());

    			if (res.status === 200) {
    				localStorage.setItem('admin-key', password.value.toString());
    				navigate('/register');
    			}
    		} catch(error) {
    			alert(error.response.data.message);
    			console.log(error);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$i.warn(`<Check> was created with unknown prop '${key}'`);
    	});

    	function input0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			password = $$value;
    			$$invalidate(0, password);
    		});
    	}

    	const change_handler = () => {
    		if (password.type === "password") {
    			$$invalidate(0, password.type = "text", password);
    		} else {
    			$$invalidate(0, password.type = "password", password);
    		}
    	};

    	const click_handler = () => {
    		navigate('/login');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		UserEndpoint,
    		admin_key,
    		userEndpoint,
    		getAdminVerify,
    		password,
    		login
    	});

    	$$self.$inject_state = $$props => {
    		if ('password' in $$props) $$invalidate(0, password = $$props.password);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [password, login, input0_binding, change_handler, click_handler];
    }

    class Check extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Check",
    			options,
    			id: create_fragment$r.name
    		});
    	}
    }

    /* src\mobileAdmin\MobileHome.svelte generated by Svelte v3.59.2 */

    const { console: console_1$h } = globals;

    const file$p = "src\\mobileAdmin\\MobileHome.svelte";

    function create_fragment$q(ctx) {
    	let t0;
    	let section;
    	let div28;
    	let div1;
    	let h10;
    	let t2;
    	let div0;
    	let span2;
    	let p0;
    	let t4;
    	let span1;
    	let span0;
    	let p1;
    	let t6;
    	let p2;
    	let t8;
    	let i0;
    	let t9;
    	let span5;
    	let p3;
    	let t11;
    	let span4;
    	let span3;
    	let p4;
    	let t12;
    	let t13;
    	let p5;
    	let t15;
    	let i1;
    	let t16;
    	let span8;
    	let p6;
    	let t18;
    	let span7;
    	let span6;
    	let p7;
    	let t19;
    	let t20;
    	let p8;
    	let t22;
    	let i2;
    	let t23;
    	let div16;
    	let div2;
    	let h11;
    	let t25;
    	let button0;
    	let t26;
    	let i3;
    	let t27;
    	let div15;
    	let div8;
    	let h20;
    	let t29;
    	let div7;
    	let p9;
    	let t31;
    	let div6;
    	let div3;
    	let span10;
    	let span9;
    	let t32;
    	let p10;
    	let t34;
    	let span11;
    	let p11;
    	let t36;
    	let p12;
    	let t38;
    	let div4;
    	let span13;
    	let span12;
    	let t39;
    	let p13;
    	let t41;
    	let span14;
    	let p14;
    	let t43;
    	let p15;
    	let t45;
    	let div5;
    	let span16;
    	let span15;
    	let t46;
    	let p16;
    	let t48;
    	let span17;
    	let p17;
    	let t50;
    	let p18;
    	let t52;
    	let p19;
    	let t54;
    	let div14;
    	let h21;
    	let t56;
    	let div13;
    	let p20;
    	let t58;
    	let div12;
    	let div9;
    	let span19;
    	let span18;
    	let t59;
    	let p21;
    	let t61;
    	let span20;
    	let p22;
    	let t63;
    	let p23;
    	let t65;
    	let div10;
    	let span22;
    	let span21;
    	let t66;
    	let p24;
    	let t68;
    	let span23;
    	let p25;
    	let t70;
    	let p26;
    	let t72;
    	let div11;
    	let span25;
    	let span24;
    	let t73;
    	let p27;
    	let t75;
    	let span26;
    	let p28;
    	let t77;
    	let p29;
    	let t79;
    	let p30;
    	let t81;
    	let div27;
    	let div17;
    	let h12;
    	let t83;
    	let button1;
    	let t84;
    	let i4;
    	let t85;
    	let div26;
    	let div19;
    	let img0;
    	let img0_src_value;
    	let t86;
    	let div18;
    	let p31;
    	let t88;
    	let p32;
    	let t90;
    	let p33;
    	let t92;
    	let div21;
    	let img1;
    	let img1_src_value;
    	let t93;
    	let div20;
    	let p34;
    	let t95;
    	let p35;
    	let t97;
    	let p36;
    	let t99;
    	let div23;
    	let img2;
    	let img2_src_value;
    	let t100;
    	let div22;
    	let p37;
    	let t102;
    	let p38;
    	let t104;
    	let p39;
    	let t106;
    	let div25;
    	let img3;
    	let img3_src_value;
    	let t107;
    	let div24;
    	let p40;
    	let t109;
    	let p41;
    	let t111;
    	let p42;
    	let t113;
    	let div29;
    	let button2;
    	let i5;
    	let t114;
    	let p43;
    	let t116;
    	let button3;
    	let i6;
    	let t117;
    	let p44;
    	let t119;
    	let button4;
    	let i7;
    	let t120;
    	let p45;
    	let t122;
    	let button5;
    	let i8;
    	let t123;
    	let p46;
    	let t125;
    	let button6;
    	let i9;
    	let t126;
    	let p47;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			t0 = space();
    			section = element("section");
    			div28 = element("div");
    			div1 = element("div");
    			h10 = element("h1");
    			h10.textContent = "Umumiy ma'lumotlar";
    			t2 = space();
    			div0 = element("div");
    			span2 = element("span");
    			p0 = element("p");
    			p0.textContent = "Oxirgi oydagi daromad";
    			t4 = space();
    			span1 = element("span");
    			span0 = element("span");
    			p1 = element("p");
    			p1.textContent = "3.6";
    			t6 = space();
    			p2 = element("p");
    			p2.textContent = "mln";
    			t8 = space();
    			i0 = element("i");
    			t9 = space();
    			span5 = element("span");
    			p3 = element("p");
    			p3.textContent = "Faol buyurtmalar";
    			t11 = space();
    			span4 = element("span");
    			span3 = element("span");
    			p4 = element("p");
    			t12 = text(/*orders_count*/ ctx[0]);
    			t13 = space();
    			p5 = element("p");
    			p5.textContent = "ta";
    			t15 = space();
    			i1 = element("i");
    			t16 = space();
    			span8 = element("span");
    			p6 = element("p");
    			p6.textContent = "Ishchilar soni";
    			t18 = space();
    			span7 = element("span");
    			span6 = element("span");
    			p7 = element("p");
    			t19 = text(/*users_count*/ ctx[1]);
    			t20 = space();
    			p8 = element("p");
    			p8.textContent = "ta";
    			t22 = space();
    			i2 = element("i");
    			t23 = space();
    			div16 = element("div");
    			div2 = element("div");
    			h11 = element("h1");
    			h11.textContent = "Buyurtmalar";
    			t25 = space();
    			button0 = element("button");
    			t26 = text("Batafsil ");
    			i3 = element("i");
    			t27 = space();
    			div15 = element("div");
    			div8 = element("div");
    			h20 = element("h2");
    			h20.textContent = "Buyurtma sarlavhasi";
    			t29 = space();
    			div7 = element("div");
    			p9 = element("p");
    			p9.textContent = "Mahsulotlar:";
    			t31 = space();
    			div6 = element("div");
    			div3 = element("div");
    			span10 = element("span");
    			span9 = element("span");
    			t32 = space();
    			p10 = element("p");
    			p10.textContent = "Qovurilgan baliq";
    			t34 = space();
    			span11 = element("span");
    			p11 = element("p");
    			p11.textContent = "3 kg";
    			t36 = space();
    			p12 = element("p");
    			p12.textContent = "150000 so'm";
    			t38 = space();
    			div4 = element("div");
    			span13 = element("span");
    			span12 = element("span");
    			t39 = space();
    			p13 = element("p");
    			p13.textContent = "Coca Cola 1.5";
    			t41 = space();
    			span14 = element("span");
    			p14 = element("p");
    			p14.textContent = "2 ta";
    			t43 = space();
    			p15 = element("p");
    			p15.textContent = "26000 so'm";
    			t45 = space();
    			div5 = element("div");
    			span16 = element("span");
    			span15 = element("span");
    			t46 = space();
    			p16 = element("p");
    			p16.textContent = "Fanta 1.5";
    			t48 = space();
    			span17 = element("span");
    			p17 = element("p");
    			p17.textContent = "2 ta";
    			t50 = space();
    			p18 = element("p");
    			p18.textContent = "26000 so'm";
    			t52 = space();
    			p19 = element("p");
    			p19.textContent = "Faol buyurtma";
    			t54 = space();
    			div14 = element("div");
    			h21 = element("h2");
    			h21.textContent = "Buyurtma sarlavhasi";
    			t56 = space();
    			div13 = element("div");
    			p20 = element("p");
    			p20.textContent = "Mahsulotlar:";
    			t58 = space();
    			div12 = element("div");
    			div9 = element("div");
    			span19 = element("span");
    			span18 = element("span");
    			t59 = space();
    			p21 = element("p");
    			p21.textContent = "Qovurilgan baliq";
    			t61 = space();
    			span20 = element("span");
    			p22 = element("p");
    			p22.textContent = "3 kg";
    			t63 = space();
    			p23 = element("p");
    			p23.textContent = "150000 so'm";
    			t65 = space();
    			div10 = element("div");
    			span22 = element("span");
    			span21 = element("span");
    			t66 = space();
    			p24 = element("p");
    			p24.textContent = "Coca Cola 1.5";
    			t68 = space();
    			span23 = element("span");
    			p25 = element("p");
    			p25.textContent = "2 ta";
    			t70 = space();
    			p26 = element("p");
    			p26.textContent = "26000 so'm";
    			t72 = space();
    			div11 = element("div");
    			span25 = element("span");
    			span24 = element("span");
    			t73 = space();
    			p27 = element("p");
    			p27.textContent = "Fanta 1.5";
    			t75 = space();
    			span26 = element("span");
    			p28 = element("p");
    			p28.textContent = "2 ta";
    			t77 = space();
    			p29 = element("p");
    			p29.textContent = "26000 so'm";
    			t79 = space();
    			p30 = element("p");
    			p30.textContent = "Faol buyurtma";
    			t81 = space();
    			div27 = element("div");
    			div17 = element("div");
    			h12 = element("h1");
    			h12.textContent = "Xonalar";
    			t83 = space();
    			button1 = element("button");
    			t84 = text("Batafsil ");
    			i4 = element("i");
    			t85 = space();
    			div26 = element("div");
    			div19 = element("div");
    			img0 = element("img");
    			t86 = space();
    			div18 = element("div");
    			p31 = element("p");
    			p31.textContent = "Xona nomi";
    			t88 = space();
    			p32 = element("p");
    			p32.textContent = "Xona haqida. Lorem ipsum dolor sit amet.";
    			t90 = space();
    			p33 = element("p");
    			p33.textContent = "Band qilingan";
    			t92 = space();
    			div21 = element("div");
    			img1 = element("img");
    			t93 = space();
    			div20 = element("div");
    			p34 = element("p");
    			p34.textContent = "Xona nomi";
    			t95 = space();
    			p35 = element("p");
    			p35.textContent = "Xona haqida. Lorem ipsum dolor sit amet.";
    			t97 = space();
    			p36 = element("p");
    			p36.textContent = "Band qilingan";
    			t99 = space();
    			div23 = element("div");
    			img2 = element("img");
    			t100 = space();
    			div22 = element("div");
    			p37 = element("p");
    			p37.textContent = "Xona nomi";
    			t102 = space();
    			p38 = element("p");
    			p38.textContent = "Xona haqida. Lorem ipsum dolor sit amet.";
    			t104 = space();
    			p39 = element("p");
    			p39.textContent = "Band qilingan";
    			t106 = space();
    			div25 = element("div");
    			img3 = element("img");
    			t107 = space();
    			div24 = element("div");
    			p40 = element("p");
    			p40.textContent = "Xona nomi";
    			t109 = space();
    			p41 = element("p");
    			p41.textContent = "Xona haqida. Lorem ipsum dolor sit amet.";
    			t111 = space();
    			p42 = element("p");
    			p42.textContent = "Band qilingan";
    			t113 = space();
    			div29 = element("div");
    			button2 = element("button");
    			i5 = element("i");
    			t114 = space();
    			p43 = element("p");
    			p43.textContent = "Asosiy";
    			t116 = space();
    			button3 = element("button");
    			i6 = element("i");
    			t117 = space();
    			p44 = element("p");
    			p44.textContent = "Buyurtmalar";
    			t119 = space();
    			button4 = element("button");
    			i7 = element("i");
    			t120 = space();
    			p45 = element("p");
    			p45.textContent = "Qo'shish";
    			t122 = space();
    			button5 = element("button");
    			i8 = element("i");
    			t123 = space();
    			p46 = element("p");
    			p46.textContent = "Xonalar";
    			t125 = space();
    			button6 = element("button");
    			i9 = element("i");
    			t126 = space();
    			p47 = element("p");
    			p47.textContent = "Profil";
    			document.title = "Asosiy sahifa";
    			attr_dev(h10, "class", "outline-none font-semibold text-lg");
    			add_location(h10, file$p, 55, 12, 1378);
    			attr_dev(p0, "class", "text-sm");
    			add_location(p0, file$p, 58, 20, 1639);
    			attr_dev(p1, "class", "text-3xl font-bold");
    			add_location(p1, file$p, 61, 28, 1831);
    			attr_dev(p2, "class", "");
    			add_location(p2, file$p, 62, 28, 1898);
    			attr_dev(span0, "class", "flex items-end gap-1");
    			add_location(span0, file$p, 60, 24, 1766);
    			attr_dev(i0, "class", "bi bi-cash-stack absolute text-7xl right-0 bottom-0 opacity-30");
    			add_location(i0, file$p, 64, 24, 1976);
    			attr_dev(span1, "class", "flex justify-between");
    			add_location(span1, file$p, 59, 20, 1705);
    			attr_dev(span2, "class", "flex flex-col justify-between gap-1 bg-green-400 text-gray-100 p-3 rounded-xl relative");
    			add_location(span2, file$p, 57, 16, 1516);
    			attr_dev(p3, "class", "text-sm");
    			add_location(p3, file$p, 68, 20, 2247);
    			attr_dev(p4, "class", "text-3xl font-bold");
    			add_location(p4, file$p, 71, 28, 2434);
    			attr_dev(p5, "class", "");
    			add_location(p5, file$p, 72, 28, 2512);
    			attr_dev(span3, "class", "flex items-end gap-1");
    			add_location(span3, file$p, 70, 24, 2369);
    			attr_dev(i1, "class", "bi bi-box-seam absolute text-7xl right-0 bottom-0 opacity-30");
    			add_location(i1, file$p, 74, 24, 2589);
    			attr_dev(span4, "class", "flex justify-between");
    			add_location(span4, file$p, 69, 20, 2308);
    			attr_dev(span5, "class", "flex flex-col justify-between gap-1 bg-sky-400 text-gray-100 p-3 rounded-xl relative");
    			add_location(span5, file$p, 67, 16, 2126);
    			attr_dev(p6, "class", "text-sm");
    			add_location(p6, file$p, 78, 20, 2861);
    			attr_dev(p7, "class", "text-3xl font-bold");
    			add_location(p7, file$p, 81, 28, 3046);
    			attr_dev(p8, "class", "");
    			add_location(p8, file$p, 82, 28, 3123);
    			attr_dev(span6, "class", "flex items-end gap-1");
    			add_location(span6, file$p, 80, 24, 2981);
    			attr_dev(i2, "class", "bi bi-people absolute text-7xl right-0 bottom-0 opacity-30");
    			add_location(i2, file$p, 84, 24, 3200);
    			attr_dev(span7, "class", "flex justify-between");
    			add_location(span7, file$p, 79, 20, 2920);
    			attr_dev(span8, "class", "flex flex-col justify-between gap-1 bg-purple-400 text-gray-100 p-3 rounded-xl relative");
    			add_location(span8, file$p, 77, 16, 2737);
    			attr_dev(div0, "class", "grid grid-cols-3 gap-2");
    			add_location(div0, file$p, 56, 12, 1462);
    			attr_dev(div1, "class", "umumiy flex flex-col gap-2");
    			add_location(div1, file$p, 54, 8, 1324);
    			attr_dev(h11, "class", "outline-none font-semibold text-lg");
    			add_location(h11, file$p, 91, 16, 3493);
    			attr_dev(i3, "class", "bi bi-arrow-right");
    			add_location(i3, file$p, 92, 131, 3689);
    			attr_dev(button0, "class", "px-2 py-1 rounded-md bg-indigo-500 text-gray-100");
    			add_location(button0, file$p, 92, 16, 3574);
    			attr_dev(div2, "class", "flex justify-between items-center");
    			add_location(div2, file$p, 90, 12, 3428);
    			attr_dev(h20, "class", "font-bold text-md");
    			add_location(h20, file$p, 96, 20, 3908);
    			attr_dev(p9, "class", "text-md");
    			add_location(p9, file$p, 98, 24, 4043);
    			attr_dev(span9, "class", "w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://img.freepik.com/premium-photo/fried-fish-with-lemon-dark-board-male-hands-black_239004-146.jpg')]");
    			add_location(span9, file$p, 102, 36, 4336);
    			attr_dev(p10, "class", "font-semibold");
    			add_location(p10, file$p, 103, 36, 4564);
    			attr_dev(span10, "class", "flex gap-1 w-1/2");
    			add_location(span10, file$p, 101, 32, 4267);
    			add_location(p11, file$p, 106, 36, 4772);
    			add_location(p12, file$p, 107, 36, 4821);
    			attr_dev(span11, "class", "flex flex-col items-end gap-1 w-1/2");
    			add_location(span11, file$p, 105, 32, 4684);
    			attr_dev(div3, "class", "flex justify-between bg-indigo-500/10 rounded-xl p-2");
    			add_location(div3, file$p, 100, 28, 4167);
    			attr_dev(span12, "class", "w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://images.uzum.uz/cf7p3f2vtie1lhbhc7ig/original.jpg')]");
    			add_location(span12, file$p, 112, 36, 5115);
    			attr_dev(p13, "class", "font-semibold");
    			add_location(p13, file$p, 113, 36, 5297);
    			attr_dev(span13, "class", "flex gap-1 w-1/2");
    			add_location(span13, file$p, 111, 32, 5046);
    			add_location(p14, file$p, 116, 36, 5502);
    			add_location(p15, file$p, 117, 36, 5551);
    			attr_dev(span14, "class", "flex flex-col items-end gap-1 w-1/2");
    			add_location(span14, file$p, 115, 32, 5414);
    			attr_dev(div4, "class", "flex justify-between bg-indigo-500/10 rounded-xl p-2");
    			add_location(div4, file$p, 110, 28, 4946);
    			attr_dev(span15, "class", "w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://images.uzum.uz/ce8a878v1htd23airm6g/original.jpg')]");
    			add_location(span15, file$p, 122, 36, 5844);
    			attr_dev(p16, "class", "font-semibold");
    			add_location(p16, file$p, 123, 36, 6026);
    			attr_dev(span16, "class", "flex gap-1 w-1/2");
    			add_location(span16, file$p, 121, 32, 5775);
    			add_location(p17, file$p, 126, 36, 6227);
    			add_location(p18, file$p, 127, 36, 6276);
    			attr_dev(span17, "class", "flex flex-col items-end gap-1 w-1/2");
    			add_location(span17, file$p, 125, 32, 6139);
    			attr_dev(div5, "class", "flex justify-between bg-indigo-500/10 rounded-xl p-2");
    			add_location(div5, file$p, 120, 28, 5675);
    			attr_dev(div6, "class", "flex flex-col gap-2");
    			add_location(div6, file$p, 99, 24, 4104);
    			attr_dev(p19, "class", "bg-green-300 rounded-lg p-2 text-sm text-center");
    			add_location(p19, file$p, 131, 24, 6428);
    			attr_dev(div7, "class", "flex flex-col gap-1");
    			add_location(div7, file$p, 97, 20, 3984);
    			attr_dev(div8, "class", "flex flex-col gap-2 shadow-md rounded-xl p-3 bg-white");
    			add_location(div8, file$p, 95, 16, 3819);
    			attr_dev(h21, "class", "font-bold text-md");
    			add_location(h21, file$p, 135, 20, 6663);
    			attr_dev(p20, "class", "text-md");
    			add_location(p20, file$p, 137, 24, 6798);
    			attr_dev(span18, "class", "w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://img.freepik.com/premium-photo/fried-fish-with-lemon-dark-board-male-hands-black_239004-146.jpg')]");
    			add_location(span18, file$p, 141, 36, 7091);
    			attr_dev(p21, "class", "font-semibold");
    			add_location(p21, file$p, 142, 36, 7319);
    			attr_dev(span19, "class", "flex gap-1 w-1/2");
    			add_location(span19, file$p, 140, 32, 7022);
    			add_location(p22, file$p, 145, 36, 7527);
    			add_location(p23, file$p, 146, 36, 7576);
    			attr_dev(span20, "class", "flex flex-col items-end gap-1 w-1/2");
    			add_location(span20, file$p, 144, 32, 7439);
    			attr_dev(div9, "class", "flex justify-between bg-indigo-500/10 rounded-xl p-2");
    			add_location(div9, file$p, 139, 28, 6922);
    			attr_dev(span21, "class", "w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://images.uzum.uz/cf7p3f2vtie1lhbhc7ig/original.jpg')]");
    			add_location(span21, file$p, 151, 36, 7870);
    			attr_dev(p24, "class", "font-semibold");
    			add_location(p24, file$p, 152, 36, 8052);
    			attr_dev(span22, "class", "flex gap-1 w-1/2");
    			add_location(span22, file$p, 150, 32, 7801);
    			add_location(p25, file$p, 155, 36, 8257);
    			add_location(p26, file$p, 156, 36, 8306);
    			attr_dev(span23, "class", "flex flex-col items-end gap-1 w-1/2");
    			add_location(span23, file$p, 154, 32, 8169);
    			attr_dev(div10, "class", "flex justify-between bg-indigo-500/10 rounded-xl p-2");
    			add_location(div10, file$p, 149, 28, 7701);
    			attr_dev(span24, "class", "w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://images.uzum.uz/ce8a878v1htd23airm6g/original.jpg')]");
    			add_location(span24, file$p, 161, 36, 8599);
    			attr_dev(p27, "class", "font-semibold");
    			add_location(p27, file$p, 162, 36, 8781);
    			attr_dev(span25, "class", "flex gap-1 w-1/2");
    			add_location(span25, file$p, 160, 32, 8530);
    			add_location(p28, file$p, 165, 36, 8982);
    			add_location(p29, file$p, 166, 36, 9031);
    			attr_dev(span26, "class", "flex flex-col items-end gap-1 w-1/2");
    			add_location(span26, file$p, 164, 32, 8894);
    			attr_dev(div11, "class", "flex justify-between bg-indigo-500/10 rounded-xl p-2");
    			add_location(div11, file$p, 159, 28, 8430);
    			attr_dev(div12, "class", "flex flex-col gap-2");
    			add_location(div12, file$p, 138, 24, 6859);
    			attr_dev(p30, "class", "bg-green-300 rounded-lg p-2 text-sm text-center");
    			add_location(p30, file$p, 170, 24, 9183);
    			attr_dev(div13, "class", "flex flex-col gap-1");
    			add_location(div13, file$p, 136, 20, 6739);
    			attr_dev(div14, "class", "flex flex-col gap-2 shadow-md rounded-xl p-3 bg-white");
    			add_location(div14, file$p, 134, 16, 6574);
    			attr_dev(div15, "class", "grid grid-cols-1 gap-2");
    			add_location(div15, file$p, 94, 12, 3765);
    			attr_dev(div16, "class", "orders flex flex-col gap-3");
    			add_location(div16, file$p, 89, 8, 3374);
    			attr_dev(h12, "class", "outline-none font-semibold text-lg");
    			add_location(h12, file$p, 177, 16, 9475);
    			attr_dev(i4, "class", "bi bi-arrow-right");
    			add_location(i4, file$p, 178, 130, 9666);
    			attr_dev(button1, "class", "px-2 py-1 rounded-md bg-indigo-500 text-gray-100");
    			add_location(button1, file$p, 178, 16, 9552);
    			attr_dev(div17, "class", "flex justify-between items-center");
    			add_location(div17, file$p, 176, 12, 9410);
    			attr_dev(img0, "class", "rounded-t-xl");
    			if (!src_url_equal(img0.src, img0_src_value = "https://b.zmtcdn.com/data/pictures/6/19877256/3275c38ad9d367b8a7acf16934344973.jpeg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			add_location(img0, file$p, 182, 20, 9875);
    			attr_dev(p31, "class", "text-md font-bold");
    			add_location(p31, file$p, 184, 24, 10083);
    			attr_dev(p32, "class", "text-sm");
    			add_location(p32, file$p, 185, 24, 10151);
    			attr_dev(p33, "class", "bg-red-300 rounded-lg p-2 text-sm text-center");
    			add_location(p33, file$p, 186, 24, 10240);
    			attr_dev(div18, "class", "flex flex-col gap-1 p-3");
    			add_location(div18, file$p, 183, 20, 10020);
    			attr_dev(div19, "class", "flex flex-col shadow-md rounded-xl bg-white");
    			add_location(div19, file$p, 181, 16, 9796);
    			attr_dev(img1, "class", "rounded-t-xl");
    			if (!src_url_equal(img1.src, img1_src_value = "https://b.zmtcdn.com/data/pictures/6/19877256/3275c38ad9d367b8a7acf16934344973.jpeg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			add_location(img1, file$p, 190, 20, 10463);
    			attr_dev(p34, "class", "text-md font-bold");
    			add_location(p34, file$p, 192, 24, 10671);
    			attr_dev(p35, "class", "text-sm");
    			add_location(p35, file$p, 193, 24, 10739);
    			attr_dev(p36, "class", "bg-red-300 rounded-lg p-2 text-sm text-center");
    			add_location(p36, file$p, 194, 24, 10828);
    			attr_dev(div20, "class", "flex flex-col gap-1 p-3");
    			add_location(div20, file$p, 191, 20, 10608);
    			attr_dev(div21, "class", "flex flex-col shadow-md rounded-xl bg-white");
    			add_location(div21, file$p, 189, 16, 10384);
    			attr_dev(img2, "class", "rounded-t-xl");
    			if (!src_url_equal(img2.src, img2_src_value = "https://b.zmtcdn.com/data/pictures/6/19877256/3275c38ad9d367b8a7acf16934344973.jpeg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "");
    			add_location(img2, file$p, 198, 20, 11051);
    			attr_dev(p37, "class", "text-md font-bold");
    			add_location(p37, file$p, 200, 24, 11259);
    			attr_dev(p38, "class", "text-sm");
    			add_location(p38, file$p, 201, 24, 11327);
    			attr_dev(p39, "class", "bg-red-300 rounded-lg p-2 text-sm text-center");
    			add_location(p39, file$p, 202, 24, 11416);
    			attr_dev(div22, "class", "flex flex-col gap-1 p-3");
    			add_location(div22, file$p, 199, 20, 11196);
    			attr_dev(div23, "class", "flex flex-col shadow-md rounded-xl bg-white");
    			add_location(div23, file$p, 197, 16, 10972);
    			attr_dev(img3, "class", "rounded-t-xl");
    			if (!src_url_equal(img3.src, img3_src_value = "https://b.zmtcdn.com/data/pictures/6/19877256/3275c38ad9d367b8a7acf16934344973.jpeg")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "");
    			add_location(img3, file$p, 206, 20, 11639);
    			attr_dev(p40, "class", "text-md font-bold");
    			add_location(p40, file$p, 208, 24, 11847);
    			attr_dev(p41, "class", "text-sm");
    			add_location(p41, file$p, 209, 24, 11915);
    			attr_dev(p42, "class", "bg-red-300 rounded-lg p-2 text-sm text-center");
    			add_location(p42, file$p, 210, 24, 12004);
    			attr_dev(div24, "class", "flex flex-col gap-1 p-3");
    			add_location(div24, file$p, 207, 20, 11784);
    			attr_dev(div25, "class", "flex flex-col shadow-md rounded-xl bg-white");
    			add_location(div25, file$p, 205, 16, 11560);
    			attr_dev(div26, "class", "grid grid-cols-2 gap-2");
    			add_location(div26, file$p, 180, 12, 9742);
    			attr_dev(div27, "class", "rooms flex flex-col gap-3");
    			add_location(div27, file$p, 175, 8, 9357);
    			attr_dev(div28, "class", "grow flex flex-col gap-3 p-3 h-fit");
    			add_location(div28, file$p, 53, 4, 1266);
    			attr_dev(i5, "class", "bi bi-house-fill text-2xl");
    			add_location(i5, file$p, 218, 12, 12417);
    			attr_dev(p43, "class", "text-[9px] font-bold");
    			add_location(p43, file$p, 219, 12, 12472);
    			attr_dev(button2, "class", "flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl");
    			add_location(button2, file$p, 217, 8, 12287);
    			attr_dev(i6, "class", "bi bi-clipboard-fill text-2xl");
    			add_location(i6, file$p, 222, 12, 12678);
    			attr_dev(p44, "class", "text-[9px] font-bold");
    			add_location(p44, file$p, 223, 12, 12737);
    			attr_dev(button3, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button3, file$p, 221, 8, 12543);
    			attr_dev(i7, "class", "bi bi-plus text-2xl");
    			add_location(i7, file$p, 226, 12, 12945);
    			attr_dev(p45, "class", "text-[9px] font-bold");
    			add_location(p45, file$p, 227, 12, 12994);
    			attr_dev(button4, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button4, file$p, 225, 8, 12813);
    			attr_dev(i8, "class", "bi bi-door-open-fill text-2xl");
    			add_location(i8, file$p, 230, 12, 13201);
    			attr_dev(p46, "class", "text-[9px] font-bold");
    			add_location(p46, file$p, 231, 12, 13260);
    			attr_dev(button5, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button5, file$p, 229, 8, 13067);
    			attr_dev(i9, "class", "bi bi-person-fill text-2xl");
    			add_location(i9, file$p, 234, 12, 13468);
    			attr_dev(p47, "class", "text-[10px] font-bold");
    			add_location(p47, file$p, 235, 12, 13524);
    			attr_dev(button6, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button6, file$p, 233, 8, 13332);
    			attr_dev(div29, "class", "grow-0 h-fit grid grid-cols-5 bg-white px-2 py-2 sticky bottom-0 right-0 left-0");
    			add_location(div29, file$p, 216, 4, 12184);
    			attr_dev(section, "class", "grid grid-rows-2 bg-indigo-500/10");
    			add_location(section, file$p, 52, 0, 1209);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div28);
    			append_dev(div28, div1);
    			append_dev(div1, h10);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, span2);
    			append_dev(span2, p0);
    			append_dev(span2, t4);
    			append_dev(span2, span1);
    			append_dev(span1, span0);
    			append_dev(span0, p1);
    			append_dev(span0, t6);
    			append_dev(span0, p2);
    			append_dev(span1, t8);
    			append_dev(span1, i0);
    			append_dev(div0, t9);
    			append_dev(div0, span5);
    			append_dev(span5, p3);
    			append_dev(span5, t11);
    			append_dev(span5, span4);
    			append_dev(span4, span3);
    			append_dev(span3, p4);
    			append_dev(p4, t12);
    			append_dev(span3, t13);
    			append_dev(span3, p5);
    			append_dev(span4, t15);
    			append_dev(span4, i1);
    			append_dev(div0, t16);
    			append_dev(div0, span8);
    			append_dev(span8, p6);
    			append_dev(span8, t18);
    			append_dev(span8, span7);
    			append_dev(span7, span6);
    			append_dev(span6, p7);
    			append_dev(p7, t19);
    			append_dev(span6, t20);
    			append_dev(span6, p8);
    			append_dev(span7, t22);
    			append_dev(span7, i2);
    			append_dev(div28, t23);
    			append_dev(div28, div16);
    			append_dev(div16, div2);
    			append_dev(div2, h11);
    			append_dev(div2, t25);
    			append_dev(div2, button0);
    			append_dev(button0, t26);
    			append_dev(button0, i3);
    			append_dev(div16, t27);
    			append_dev(div16, div15);
    			append_dev(div15, div8);
    			append_dev(div8, h20);
    			append_dev(div8, t29);
    			append_dev(div8, div7);
    			append_dev(div7, p9);
    			append_dev(div7, t31);
    			append_dev(div7, div6);
    			append_dev(div6, div3);
    			append_dev(div3, span10);
    			append_dev(span10, span9);
    			append_dev(span10, t32);
    			append_dev(span10, p10);
    			append_dev(div3, t34);
    			append_dev(div3, span11);
    			append_dev(span11, p11);
    			append_dev(span11, t36);
    			append_dev(span11, p12);
    			append_dev(div6, t38);
    			append_dev(div6, div4);
    			append_dev(div4, span13);
    			append_dev(span13, span12);
    			append_dev(span13, t39);
    			append_dev(span13, p13);
    			append_dev(div4, t41);
    			append_dev(div4, span14);
    			append_dev(span14, p14);
    			append_dev(span14, t43);
    			append_dev(span14, p15);
    			append_dev(div6, t45);
    			append_dev(div6, div5);
    			append_dev(div5, span16);
    			append_dev(span16, span15);
    			append_dev(span16, t46);
    			append_dev(span16, p16);
    			append_dev(div5, t48);
    			append_dev(div5, span17);
    			append_dev(span17, p17);
    			append_dev(span17, t50);
    			append_dev(span17, p18);
    			append_dev(div7, t52);
    			append_dev(div7, p19);
    			append_dev(div15, t54);
    			append_dev(div15, div14);
    			append_dev(div14, h21);
    			append_dev(div14, t56);
    			append_dev(div14, div13);
    			append_dev(div13, p20);
    			append_dev(div13, t58);
    			append_dev(div13, div12);
    			append_dev(div12, div9);
    			append_dev(div9, span19);
    			append_dev(span19, span18);
    			append_dev(span19, t59);
    			append_dev(span19, p21);
    			append_dev(div9, t61);
    			append_dev(div9, span20);
    			append_dev(span20, p22);
    			append_dev(span20, t63);
    			append_dev(span20, p23);
    			append_dev(div12, t65);
    			append_dev(div12, div10);
    			append_dev(div10, span22);
    			append_dev(span22, span21);
    			append_dev(span22, t66);
    			append_dev(span22, p24);
    			append_dev(div10, t68);
    			append_dev(div10, span23);
    			append_dev(span23, p25);
    			append_dev(span23, t70);
    			append_dev(span23, p26);
    			append_dev(div12, t72);
    			append_dev(div12, div11);
    			append_dev(div11, span25);
    			append_dev(span25, span24);
    			append_dev(span25, t73);
    			append_dev(span25, p27);
    			append_dev(div11, t75);
    			append_dev(div11, span26);
    			append_dev(span26, p28);
    			append_dev(span26, t77);
    			append_dev(span26, p29);
    			append_dev(div13, t79);
    			append_dev(div13, p30);
    			append_dev(div28, t81);
    			append_dev(div28, div27);
    			append_dev(div27, div17);
    			append_dev(div17, h12);
    			append_dev(div17, t83);
    			append_dev(div17, button1);
    			append_dev(button1, t84);
    			append_dev(button1, i4);
    			append_dev(div27, t85);
    			append_dev(div27, div26);
    			append_dev(div26, div19);
    			append_dev(div19, img0);
    			append_dev(div19, t86);
    			append_dev(div19, div18);
    			append_dev(div18, p31);
    			append_dev(div18, t88);
    			append_dev(div18, p32);
    			append_dev(div18, t90);
    			append_dev(div18, p33);
    			append_dev(div26, t92);
    			append_dev(div26, div21);
    			append_dev(div21, img1);
    			append_dev(div21, t93);
    			append_dev(div21, div20);
    			append_dev(div20, p34);
    			append_dev(div20, t95);
    			append_dev(div20, p35);
    			append_dev(div20, t97);
    			append_dev(div20, p36);
    			append_dev(div26, t99);
    			append_dev(div26, div23);
    			append_dev(div23, img2);
    			append_dev(div23, t100);
    			append_dev(div23, div22);
    			append_dev(div22, p37);
    			append_dev(div22, t102);
    			append_dev(div22, p38);
    			append_dev(div22, t104);
    			append_dev(div22, p39);
    			append_dev(div26, t106);
    			append_dev(div26, div25);
    			append_dev(div25, img3);
    			append_dev(div25, t107);
    			append_dev(div25, div24);
    			append_dev(div24, p40);
    			append_dev(div24, t109);
    			append_dev(div24, p41);
    			append_dev(div24, t111);
    			append_dev(div24, p42);
    			append_dev(section, t113);
    			append_dev(section, div29);
    			append_dev(div29, button2);
    			append_dev(button2, i5);
    			append_dev(button2, t114);
    			append_dev(button2, p43);
    			append_dev(div29, t116);
    			append_dev(div29, button3);
    			append_dev(button3, i6);
    			append_dev(button3, t117);
    			append_dev(button3, p44);
    			append_dev(div29, t119);
    			append_dev(div29, button4);
    			append_dev(button4, i7);
    			append_dev(button4, t120);
    			append_dev(button4, p45);
    			append_dev(div29, t122);
    			append_dev(div29, button5);
    			append_dev(button5, i8);
    			append_dev(button5, t123);
    			append_dev(button5, p46);
    			append_dev(div29, t125);
    			append_dev(div29, button6);
    			append_dev(button6, i9);
    			append_dev(button6, t126);
    			append_dev(button6, p47);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[2], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[3], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[4], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_3*/ ctx[5], false, false, false, false),
    					listen_dev(button4, "click", /*click_handler_4*/ ctx[6], false, false, false, false),
    					listen_dev(button5, "click", /*click_handler_5*/ ctx[7], false, false, false, false),
    					listen_dev(button6, "click", /*click_handler_6*/ ctx[8], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*orders_count*/ 1) set_data_dev(t12, /*orders_count*/ ctx[0]);
    			if (dirty & /*users_count*/ 2) set_data_dev(t19, /*users_count*/ ctx[1]);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MobileHome', slots, []);

    	if (screen.width > 450) {
    		navigate('/');
    	}

    	const userEndpoint = new UserEndpoint();
    	const orderEndpoint = new OrderEndpoint();
    	const token = localStorage.getItem('token');
    	let orders_count = 0;
    	let users_count = 0;

    	// check token 
    	async function getVerify() {
    		try {
    			const res = await userEndpoint.getTokenVerify(token);

    			if (res.status === 200) {
    				console.log('Verify succes');
    			} else {
    				navigate('/login');
    			}
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getVerify();

    	// get users
    	async function getUsers() {
    		try {
    			const res = await userEndpoint.get(token);
    			$$invalidate(1, users_count = res.data.users.length);
    		} catch(error) {
    			
    		}
    	}

    	getUsers();

    	async function getTrueOrders() {
    		try {
    			const res = await orderEndpoint.getStatus(1, token);
    			$$invalidate(0, orders_count = res.data.orders.length);
    		} catch(error) {
    			
    		}
    	}

    	getTrueOrders();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$h.warn(`<MobileHome> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		navigate('/morders');
    	};

    	const click_handler_1 = () => {
    		navigate('/mrooms');
    	};

    	const click_handler_2 = () => {
    		navigate('/m');
    	};

    	const click_handler_3 = () => {
    		navigate('/morders');
    	};

    	const click_handler_4 = () => {
    		navigate('/madd');
    	};

    	const click_handler_5 = () => {
    		navigate('/mrooms');
    	};

    	const click_handler_6 = () => {
    		navigate('/mprofile');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		UserEndpoint,
    		OrderEndpoint,
    		userEndpoint,
    		orderEndpoint,
    		token,
    		orders_count,
    		users_count,
    		getVerify,
    		getUsers,
    		getTrueOrders
    	});

    	$$self.$inject_state = $$props => {
    		if ('orders_count' in $$props) $$invalidate(0, orders_count = $$props.orders_count);
    		if ('users_count' in $$props) $$invalidate(1, users_count = $$props.users_count);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		orders_count,
    		users_count,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6
    	];
    }

    class MobileHome extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MobileHome",
    			options,
    			id: create_fragment$q.name
    		});
    	}
    }

    /* src\mobileAdmin\MobileProfile.svelte generated by Svelte v3.59.2 */

    const { console: console_1$g } = globals;
    const file$o = "src\\mobileAdmin\\MobileProfile.svelte";

    function create_fragment$p(ctx) {
    	let section;
    	let div14;
    	let div4;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div3;
    	let div2;
    	let p0;
    	let t3;
    	let span;
    	let p1;
    	let t5;
    	let p2;
    	let t7;
    	let img;
    	let img_src_value;
    	let t8;
    	let div13;
    	let div5;
    	let p3;
    	let i0;
    	let t9;
    	let t10;
    	let p4;
    	let t12;
    	let div6;
    	let p5;
    	let i1;
    	let t13;
    	let t14;
    	let p6;
    	let t16;
    	let div7;
    	let p7;
    	let i2;
    	let t17;
    	let t18;
    	let p8;
    	let t20;
    	let div8;
    	let p9;
    	let i3;
    	let t21;
    	let t22;
    	let p10;
    	let t24;
    	let div9;
    	let p11;
    	let i4;
    	let t25;
    	let t26;
    	let button0;
    	let t28;
    	let div10;
    	let p12;
    	let i5;
    	let t29;
    	let t30;
    	let p13;
    	let t33;
    	let div11;
    	let p14;
    	let i6;
    	let t34;
    	let t35;
    	let p15;
    	let t37;
    	let div12;
    	let button1;
    	let i7;
    	let t38;
    	let t39;
    	let div15;
    	let button2;
    	let i8;
    	let t40;
    	let p16;
    	let t42;
    	let button3;
    	let i9;
    	let t43;
    	let p17;
    	let t45;
    	let button4;
    	let i10;
    	let t46;
    	let p18;
    	let t48;
    	let button5;
    	let i11;
    	let t49;
    	let p19;
    	let t51;
    	let button6;
    	let i12;
    	let t52;
    	let p20;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div14 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = space();
    			div3 = element("div");
    			div2 = element("div");
    			p0 = element("p");
    			p0.textContent = "Buyurtmalarim soni";
    			t3 = space();
    			span = element("span");
    			p1 = element("p");
    			p1.textContent = `${/*user*/ ctx[0].orders}`;
    			t5 = space();
    			p2 = element("p");
    			p2.textContent = "ta";
    			t7 = space();
    			img = element("img");
    			t8 = space();
    			div13 = element("div");
    			div5 = element("div");
    			p3 = element("p");
    			i0 = element("i");
    			t9 = text(" Username:");
    			t10 = space();
    			p4 = element("p");
    			p4.textContent = `${/*user*/ ctx[0].username}`;
    			t12 = space();
    			div6 = element("div");
    			p5 = element("p");
    			i1 = element("i");
    			t13 = text(" Ism:");
    			t14 = space();
    			p6 = element("p");
    			p6.textContent = `${/*user*/ ctx[0].name}`;
    			t16 = space();
    			div7 = element("div");
    			p7 = element("p");
    			i2 = element("i");
    			t17 = text(" Rol:");
    			t18 = space();
    			p8 = element("p");
    			p8.textContent = `${/*user*/ ctx[0].role.toLocaleUpperCase()}`;
    			t20 = space();
    			div8 = element("div");
    			p9 = element("p");
    			i3 = element("i");
    			t21 = text(" Telefon:");
    			t22 = space();
    			p10 = element("p");
    			p10.textContent = `${/*user*/ ctx[0].phone}`;
    			t24 = space();
    			div9 = element("div");
    			p11 = element("p");
    			i4 = element("i");
    			t25 = text(" Email:");
    			t26 = space();
    			button0 = element("button");
    			button0.textContent = `${/*user*/ ctx[0].email}`;
    			t28 = space();
    			div10 = element("div");
    			p12 = element("p");
    			i5 = element("i");
    			t29 = text(" Oylik maosh:");
    			t30 = space();
    			p13 = element("p");
    			p13.textContent = `${/*user*/ ctx[0].salary} so'm`;
    			t33 = space();
    			div11 = element("div");
    			p14 = element("p");
    			i6 = element("i");
    			t34 = text(" Ro'yhatdan o'tgan sana:");
    			t35 = space();
    			p15 = element("p");
    			p15.textContent = `${/*user*/ ctx[0].create_date.toString().split('T')[0]}`;
    			t37 = space();
    			div12 = element("div");
    			button1 = element("button");
    			i7 = element("i");
    			t38 = text("  Tizimdan chiqish");
    			t39 = space();
    			div15 = element("div");
    			button2 = element("button");
    			i8 = element("i");
    			t40 = space();
    			p16 = element("p");
    			p16.textContent = "Asosiy";
    			t42 = space();
    			button3 = element("button");
    			i9 = element("i");
    			t43 = space();
    			p17 = element("p");
    			p17.textContent = "Buyurtmalar";
    			t45 = space();
    			button4 = element("button");
    			i10 = element("i");
    			t46 = space();
    			p18 = element("p");
    			p18.textContent = "Qo'shish";
    			t48 = space();
    			button5 = element("button");
    			i11 = element("i");
    			t49 = space();
    			p19 = element("p");
    			p19.textContent = "Xonalar";
    			t51 = space();
    			button6 = element("button");
    			i12 = element("i");
    			t52 = space();
    			p20 = element("p");
    			p20.textContent = "Profile";
    			attr_dev(div0, "class", "mx-5 h-[6px] bg-violet-300 bottom-0 right-0 left-0 top-10 z-10 shadow-sm rounded-t-xl");
    			add_location(div0, file$o, 41, 12, 1161);
    			attr_dev(div1, "class", "mx-3 h-[8px] bg-violet-400 bottom-0 right-0 left-0 top-10 z-10 rounded-t-xl");
    			add_location(div1, file$o, 42, 12, 1280);
    			attr_dev(p0, "class", "text-md font-bold");
    			add_location(p0, file$o, 45, 20, 1562);
    			attr_dev(p1, "class", "text-3xl font-semibold");
    			add_location(p1, file$o, 47, 24, 1696);
    			attr_dev(p2, "class", "text-md font-medium");
    			add_location(p2, file$o, 48, 24, 1773);
    			attr_dev(span, "class", "flex items-end gap-2");
    			add_location(span, file$o, 46, 20, 1635);
    			attr_dev(div2, "class", "flex flex-col gap-3 p-2");
    			add_location(div2, file$o, 44, 16, 1503);
    			attr_dev(img, "class", "w-1/2");
    			if (!src_url_equal(img.src, img_src_value = "https://cdni.iconscout.com/illustration/premium/thumb/online-order-2750347-2294212.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "order-illustration");
    			add_location(img, file$o, 51, 16, 1882);
    			attr_dev(div3, "class", "flex items-center gap-3 p-3 bg-violet-500 rounded-xl text-stone-100 shadow-sm z-20");
    			add_location(div3, file$o, 43, 12, 1389);
    			attr_dev(div4, "class", "flex flex-col");
    			add_location(div4, file$o, 40, 8, 1120);
    			attr_dev(i0, "class", "bi bi-at");
    			add_location(i0, file$o, 57, 45, 2264);
    			attr_dev(p3, "class", "font-bold text-sm");
    			add_location(p3, file$o, 57, 16, 2235);
    			attr_dev(p4, "class", "font-medium text-md");
    			add_location(p4, file$o, 58, 16, 2320);
    			attr_dev(div5, "class", "flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm");
    			add_location(div5, file$o, 56, 12, 2127);
    			attr_dev(i1, "class", "bi bi-person");
    			add_location(i1, file$o, 61, 45, 2541);
    			attr_dev(p5, "class", "font-bold text-sm");
    			add_location(p5, file$o, 61, 16, 2512);
    			attr_dev(p6, "class", "font-medium text-md");
    			add_location(p6, file$o, 62, 16, 2596);
    			attr_dev(div6, "class", "flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm");
    			add_location(div6, file$o, 60, 12, 2404);
    			attr_dev(i2, "class", "bi bi-shield-check");
    			add_location(i2, file$o, 65, 45, 2813);
    			attr_dev(p7, "class", "font-bold text-sm");
    			add_location(p7, file$o, 65, 16, 2784);
    			attr_dev(p8, "class", "font-medium text-md");
    			add_location(p8, file$o, 66, 16, 2874);
    			attr_dev(div7, "class", "flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm");
    			add_location(div7, file$o, 64, 12, 2676);
    			attr_dev(i3, "class", "bi bi-phone");
    			add_location(i3, file$o, 69, 45, 3111);
    			attr_dev(p9, "class", "font-bold text-sm");
    			add_location(p9, file$o, 69, 16, 3082);
    			attr_dev(p10, "class", "font-medium text-md");
    			add_location(p10, file$o, 70, 16, 3169);
    			attr_dev(div8, "class", "flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm");
    			add_location(div8, file$o, 68, 12, 2974);
    			attr_dev(i4, "class", "bi bi-envelope");
    			add_location(i4, file$o, 73, 45, 3392);
    			attr_dev(p11, "class", "font-bold text-sm");
    			add_location(p11, file$o, 73, 16, 3363);
    			attr_dev(button0, "class", "font-medium text-sm bg-slate-200 px-2 py-1 rounded-xl");
    			add_location(button0, file$o, 74, 16, 3451);
    			attr_dev(div9, "class", "flex justify-between items-center bg-white/80 rounded-xl py-2 pl-4 pr-2 shadow-sm");
    			add_location(div9, file$o, 72, 12, 3250);
    			attr_dev(i5, "class", "bi bi-cash");
    			add_location(i5, file$o, 77, 45, 3734);
    			attr_dev(p12, "class", "font-bold text-sm");
    			add_location(p12, file$o, 77, 16, 3705);
    			attr_dev(p13, "class", "font-medium text-md");
    			add_location(p13, file$o, 78, 16, 3795);
    			attr_dev(div10, "class", "flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm");
    			add_location(div10, file$o, 76, 12, 3597);
    			attr_dev(i6, "class", "bi bi-calendar-event");
    			add_location(i6, file$o, 81, 45, 4019);
    			attr_dev(p14, "class", "font-bold text-sm");
    			add_location(p14, file$o, 81, 16, 3990);
    			attr_dev(p15, "class", "font-medium text-md");
    			add_location(p15, file$o, 82, 16, 4101);
    			attr_dev(div11, "class", "flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm");
    			add_location(div11, file$o, 80, 12, 3882);
    			attr_dev(i7, "class", "bi bi-box-arrow-left");
    			add_location(i7, file$o, 85, 68, 4382);
    			attr_dev(button1, "class", "font-bold text-sm");
    			add_location(button1, file$o, 85, 16, 4330);
    			attr_dev(div12, "class", "flex justify-center items-center bg-red-500 text-white rounded-xl py-2 px-4 shadow-sm");
    			add_location(div12, file$o, 84, 12, 4213);
    			attr_dev(div13, "class", "flex flex-col gap-2");
    			add_location(div13, file$o, 55, 8, 2080);
    			attr_dev(div14, "class", "grow flex flex-col justify-start gap-2 p-2");
    			add_location(div14, file$o, 39, 4, 1054);
    			attr_dev(i8, "class", "bi bi-house-fill text-2xl");
    			add_location(i8, file$o, 91, 12, 4731);
    			attr_dev(p16, "class", "text-[9px] font-bold");
    			add_location(p16, file$o, 92, 12, 4786);
    			attr_dev(button2, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button2, file$o, 90, 8, 4602);
    			attr_dev(i9, "class", "bi bi-clipboard-fill text-2xl");
    			add_location(i9, file$o, 95, 12, 4992);
    			attr_dev(p17, "class", "text-[9px] font-bold");
    			add_location(p17, file$o, 96, 12, 5051);
    			attr_dev(button3, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button3, file$o, 94, 8, 4857);
    			attr_dev(i10, "class", "bi bi-plus text-2xl");
    			add_location(i10, file$o, 99, 12, 5259);
    			attr_dev(p18, "class", "text-[9px] font-bold");
    			add_location(p18, file$o, 100, 12, 5308);
    			attr_dev(button4, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button4, file$o, 98, 8, 5127);
    			attr_dev(i11, "class", "bi bi-door-open-fill text-2xl");
    			add_location(i11, file$o, 103, 12, 5515);
    			attr_dev(p19, "class", "text-[9px] font-bold");
    			add_location(p19, file$o, 104, 12, 5574);
    			attr_dev(button5, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button5, file$o, 102, 8, 5381);
    			attr_dev(i12, "class", "bi bi-person-fill text-2xl");
    			add_location(i12, file$o, 107, 12, 5783);
    			attr_dev(p20, "class", "text-[10px] font-bold");
    			add_location(p20, file$o, 108, 12, 5839);
    			attr_dev(button6, "class", "flex flex-col items-center gap-1 text-indigo-700 px-2 rounded-xl");
    			add_location(button6, file$o, 106, 8, 5646);
    			attr_dev(div15, "class", "grow-0 h-fit grid grid-cols-5 bg-white px-2 py-2 sticky bottom-0 right-0 left-0");
    			add_location(div15, file$o, 89, 4, 4499);
    			attr_dev(section, "class", "flex flex-col min-h-screen");
    			add_location(section, file$o, 38, 0, 1004);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div14);
    			append_dev(div14, div4);
    			append_dev(div4, div0);
    			append_dev(div4, t0);
    			append_dev(div4, div1);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, p0);
    			append_dev(div2, t3);
    			append_dev(div2, span);
    			append_dev(span, p1);
    			append_dev(span, t5);
    			append_dev(span, p2);
    			append_dev(div3, t7);
    			append_dev(div3, img);
    			append_dev(div14, t8);
    			append_dev(div14, div13);
    			append_dev(div13, div5);
    			append_dev(div5, p3);
    			append_dev(p3, i0);
    			append_dev(p3, t9);
    			append_dev(div5, t10);
    			append_dev(div5, p4);
    			append_dev(div13, t12);
    			append_dev(div13, div6);
    			append_dev(div6, p5);
    			append_dev(p5, i1);
    			append_dev(p5, t13);
    			append_dev(div6, t14);
    			append_dev(div6, p6);
    			append_dev(div13, t16);
    			append_dev(div13, div7);
    			append_dev(div7, p7);
    			append_dev(p7, i2);
    			append_dev(p7, t17);
    			append_dev(div7, t18);
    			append_dev(div7, p8);
    			append_dev(div13, t20);
    			append_dev(div13, div8);
    			append_dev(div8, p9);
    			append_dev(p9, i3);
    			append_dev(p9, t21);
    			append_dev(div8, t22);
    			append_dev(div8, p10);
    			append_dev(div13, t24);
    			append_dev(div13, div9);
    			append_dev(div9, p11);
    			append_dev(p11, i4);
    			append_dev(p11, t25);
    			append_dev(div9, t26);
    			append_dev(div9, button0);
    			append_dev(div13, t28);
    			append_dev(div13, div10);
    			append_dev(div10, p12);
    			append_dev(p12, i5);
    			append_dev(p12, t29);
    			append_dev(div10, t30);
    			append_dev(div10, p13);
    			append_dev(div13, t33);
    			append_dev(div13, div11);
    			append_dev(div11, p14);
    			append_dev(p14, i6);
    			append_dev(p14, t34);
    			append_dev(div11, t35);
    			append_dev(div11, p15);
    			append_dev(div13, t37);
    			append_dev(div13, div12);
    			append_dev(div12, button1);
    			append_dev(button1, i7);
    			append_dev(button1, t38);
    			append_dev(section, t39);
    			append_dev(section, div15);
    			append_dev(div15, button2);
    			append_dev(button2, i8);
    			append_dev(button2, t40);
    			append_dev(button2, p16);
    			append_dev(div15, t42);
    			append_dev(div15, button3);
    			append_dev(button3, i9);
    			append_dev(button3, t43);
    			append_dev(button3, p17);
    			append_dev(div15, t45);
    			append_dev(div15, button4);
    			append_dev(button4, i10);
    			append_dev(button4, t46);
    			append_dev(button4, p18);
    			append_dev(div15, t48);
    			append_dev(div15, button5);
    			append_dev(button5, i11);
    			append_dev(button5, t49);
    			append_dev(button5, p19);
    			append_dev(div15, t51);
    			append_dev(div15, button6);
    			append_dev(button6, i12);
    			append_dev(button6, t52);
    			append_dev(button6, p20);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*copyEmail*/ ctx[2], false, false, false, false),
    					listen_dev(button1, "click", /*logOut*/ ctx[1], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler*/ ctx[3], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_1*/ ctx[4], false, false, false, false),
    					listen_dev(button4, "click", /*click_handler_2*/ ctx[5], false, false, false, false),
    					listen_dev(button5, "click", /*click_handler_3*/ ctx[6], false, false, false, false),
    					listen_dev(button6, "click", /*click_handler_4*/ ctx[7], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MobileProfile', slots, []);
    	const user = JSON.parse(localStorage.getItem('user'));
    	const token = localStorage.getItem("token");
    	const userEndpoint = new UserEndpoint();

    	async function checkToken() {
    		try {
    			const res = await userEndpoint.getTokenVerify(token);

    			if (res.status == 200) {
    				if (res.data.user.role == "admin") {
    					navigate('/mprofile');
    				} else {
    					localStorage.setItem("user", JSON.stringify(res.data.user));
    					console.log("Verify success");
    				}
    			}
    		} catch(error) {
    			navigate('/login');
    		}
    	}

    	if (!token || !user) {
    		localStorage.clear();
    		navigate('/login');
    	} else {
    		checkToken();
    	}

    	function logOut() {
    		localStorage.clear();
    		navigate('/login');
    	}

    	function copyEmail() {
    		navigator.clipboard.writeText(user.email);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$g.warn(`<MobileProfile> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		navigate('/m');
    	};

    	const click_handler_1 = () => {
    		navigate('/morders');
    	};

    	const click_handler_2 = () => {
    		navigate('/madd');
    	};

    	const click_handler_3 = () => {
    		navigate('/mrooms');
    	};

    	const click_handler_4 = () => {
    		navigate('/mprofile');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		UserEndpoint,
    		user,
    		token,
    		userEndpoint,
    		checkToken,
    		logOut,
    		copyEmail
    	});

    	return [
    		user,
    		logOut,
    		copyEmail,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	];
    }

    class MobileProfile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MobileProfile",
    			options,
    			id: create_fragment$p.name
    		});
    	}
    }

    /* src\modalsAll\AddOrderModal.svelte generated by Svelte v3.59.2 */

    const { console: console_1$f } = globals;

    const file$n = "src\\modalsAll\\AddOrderModal.svelte";

    function get_each_context$c(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (80:16) {:else}
    function create_else_block$9(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Bosh xona mavjud emas";
    			attr_dev(p, "class", "text-red-500 text-sm");
    			add_location(p, file$n, 80, 20, 2988);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$9.name,
    		type: "else",
    		source: "(80:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (74:16) {#if $roomStore.filter(room => room.booked != true).length != 0}
    function create_if_block$9(ctx) {
    	let select;
    	let mounted;
    	let dispose;
    	let each_value = /*$roomStore*/ ctx[7].filter(func_1);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$c(get_each_context$c(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(select, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(select, "name", "room");
    			if (/*room_id*/ ctx[4] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[14].call(select));
    			add_location(select, file$n, 74, 20, 2612);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, select, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(select, null);
    				}
    			}

    			/*select_binding*/ ctx[13](select);
    			select_option(select, /*room_id*/ ctx[4], true);

    			if (!mounted) {
    				dispose = listen_dev(select, "change", /*select_change_handler*/ ctx[14]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$roomStore*/ 128) {
    				each_value = /*$roomStore*/ ctx[7].filter(func_1);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$c(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$c(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*room_id, $roomStore*/ 144) {
    				select_option(select, /*room_id*/ ctx[4]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			destroy_each(each_blocks, detaching);
    			/*select_binding*/ ctx[13](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(74:16) {#if $roomStore.filter(room => room.booked != true).length != 0}",
    		ctx
    	});

    	return block;
    }

    // (76:24) {#each $roomStore.filter(room => room.booked != true) as room}
    function create_each_block$c(ctx) {
    	let option;
    	let t_value = /*room*/ ctx[8].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*room*/ ctx[8].id;
    			option.value = option.__value;
    			add_location(option, file$n, 76, 28, 2833);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$roomStore*/ 128 && t_value !== (t_value = /*room*/ ctx[8].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$roomStore*/ 128 && option_value_value !== (option_value_value = /*room*/ ctx[8].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$c.name,
    		type: "each",
    		source: "(76:24) {#each $roomStore.filter(room => room.booked != true) as room}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let div7;
    	let div6;
    	let p;
    	let t1;
    	let div4;
    	let div0;
    	let label0;
    	let t3;
    	let input0;
    	let t4;
    	let div1;
    	let input1;
    	let t5;
    	let label1;
    	let t7;
    	let div2;
    	let label2;
    	let t9;
    	let show_if;
    	let div2_class_value;
    	let t10;
    	let div3;
    	let label3;
    	let t12;
    	let textarea;
    	let t13;
    	let div5;
    	let button0;
    	let t15;
    	let button1;
    	let div7_class_value;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (dirty & /*$roomStore*/ 128) show_if = null;
    		if (show_if == null) show_if = !!(/*$roomStore*/ ctx[7].filter(func).length != 0);
    		if (show_if) return create_if_block$9;
    		return create_else_block$9;
    	}

    	let current_block_type = select_block_type(ctx, -1);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div6 = element("div");
    			p = element("p");
    			p.textContent = "Buyurtma yaratish";
    			t1 = space();
    			div4 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Sarlavhasi*:";
    			t3 = space();
    			input0 = element("input");
    			t4 = space();
    			div1 = element("div");
    			input1 = element("input");
    			t5 = space();
    			label1 = element("label");
    			label1.textContent = "Soboy/Dostavka";
    			t7 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Xonani tanlang*:";
    			t9 = space();
    			if_block.c();
    			t10 = space();
    			div3 = element("div");
    			label3 = element("label");
    			label3.textContent = "Izoh*:";
    			t12 = space();
    			textarea = element("textarea");
    			t13 = space();
    			div5 = element("div");
    			button0 = element("button");
    			button0.textContent = "Yopish";
    			t15 = space();
    			button1 = element("button");
    			button1.textContent = "Yaratish";
    			attr_dev(p, "class", "text-xl text-center font-bold");
    			add_location(p, file$n, 54, 8, 1588);
    			attr_dev(label0, "class", "font-semibold");
    			attr_dev(label0, "for", "");
    			add_location(label0, file$n, 57, 16, 1758);
    			attr_dev(input0, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "");
    			attr_dev(input0, "id", "");
    			attr_dev(input0, "placeholder", "Buyurtma 1");
    			add_location(input0, file$n, 58, 16, 1832);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$n, 56, 12, 1707);
    			attr_dev(input1, "class", "p-2");
    			attr_dev(input1, "type", "checkbox");
    			attr_dev(input1, "name", "soboy-dostovka");
    			attr_dev(input1, "id", "");
    			add_location(input1, file$n, 68, 16, 2174);
    			attr_dev(label1, "for", "soboy-dostovka");
    			add_location(label1, file$n, 69, 16, 2301);
    			attr_dev(div1, "class", "flex gap-3");
    			add_location(div1, file$n, 67, 12, 2132);
    			attr_dev(label2, "class", "font-semibold");
    			attr_dev(label2, "for", "room");
    			add_location(label2, file$n, 72, 16, 2444);
    			attr_dev(div2, "class", div2_class_value = "" + (/*room_class*/ ctx[6] + " flex-col gap-2"));
    			add_location(div2, file$n, 71, 12, 2385);
    			attr_dev(label3, "class", "font-semibold");
    			attr_dev(label3, "for", "desc");
    			add_location(label3, file$n, 84, 16, 3153);
    			attr_dev(textarea, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(textarea, "name", "desc");
    			attr_dev(textarea, "id", "");
    			attr_dev(textarea, "rows", "5");
    			attr_dev(textarea, "placeholder", "Buyutma uchun izoh");
    			add_location(textarea, file$n, 85, 16, 3225);
    			attr_dev(div3, "class", "flex flex-col gap-2");
    			add_location(div3, file$n, 83, 12, 3102);
    			attr_dev(div4, "class", "flex flex-col gap-3");
    			add_location(div4, file$n, 55, 8, 1660);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-400 font-semibold");
    			add_location(button0, file$n, 97, 12, 3608);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold");
    			add_location(button1, file$n, 98, 12, 3735);
    			attr_dev(div5, "class", "flex justify-between");
    			add_location(div5, file$n, 96, 8, 3560);
    			attr_dev(div6, "class", "bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto");
    			add_location(div6, file$n, 53, 4, 1438);
    			attr_dev(div7, "class", div7_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-50 justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div7, file$n, 52, 0, 1288);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div6, p);
    			append_dev(div6, t1);
    			append_dev(div6, div4);
    			append_dev(div4, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t3);
    			append_dev(div0, input0);
    			/*input0_binding*/ ctx[11](input0);
    			append_dev(div4, t4);
    			append_dev(div4, div1);
    			append_dev(div1, input1);
    			/*input1_binding*/ ctx[12](input1);
    			append_dev(div1, t5);
    			append_dev(div1, label1);
    			append_dev(div4, t7);
    			append_dev(div4, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t9);
    			if_block.m(div2, null);
    			append_dev(div4, t10);
    			append_dev(div4, div3);
    			append_dev(div3, label3);
    			append_dev(div3, t12);
    			append_dev(div3, textarea);
    			/*textarea_binding*/ ctx[15](textarea);
    			append_dev(div6, t13);
    			append_dev(div6, div5);
    			append_dev(div5, button0);
    			append_dev(div5, t15);
    			append_dev(div5, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input1, "click", /*checkSoboy*/ ctx[9], false, false, false, false),
    					listen_dev(button0, "click", /*click_handler*/ ctx[16], false, false, false, false),
    					listen_dev(button1, "click", /*create*/ ctx[10], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div2, null);
    				}
    			}

    			if (dirty & /*room_class*/ 64 && div2_class_value !== (div2_class_value = "" + (/*room_class*/ ctx[6] + " flex-col gap-2"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (dirty & /*show*/ 1 && div7_class_value !== (div7_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-50 justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div7, "class", div7_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			/*input0_binding*/ ctx[11](null);
    			/*input1_binding*/ ctx[12](null);
    			if_block.d();
    			/*textarea_binding*/ ctx[15](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func = room => room.booked != true;
    const func_1 = room => room.booked != true;

    function instance$o($$self, $$props, $$invalidate) {
    	let $roomStore;
    	validate_store(roomStore, 'roomStore');
    	component_subscribe($$self, roomStore, $$value => $$invalidate(7, $roomStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AddOrderModal', slots, []);
    	const orderEndpoint = new OrderEndpoint();
    	const roomEndpoint = new RoomEndpoint();
    	const token = localStorage.getItem('token');
    	let { show } = $$props;
    	let { close } = $$props;
    	let title;
    	let desc;
    	let room;
    	let room_id;
    	let check_soboy;
    	let room_class = 'flex';

    	// get rooms
    	async function getRooms() {
    		try {
    			const res = await roomEndpoint.get(token);
    			const rooms = res.data.rooms;
    			roomStore.set(rooms);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getRooms();

    	function checkSoboy() {
    		if (check_soboy.checked == true) {
    			$$invalidate(6, room_class = 'hidden');
    			$$invalidate(4, room_id = null);
    		} else {
    			$$invalidate(6, room_class = 'flex');
    			$$invalidate(4, room_id = room.value === undefined ? null : +room.value);
    		}
    	}

    	let show_alert;

    	async function create() {
    		try {
    			const res = await orderEndpoint.post(title.value, desc.value, room_id, token);
    			const order = res.data.order;
    			orderStore.update(orders => orders.concat(order));
    			getRooms();
    			close();
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console_1$f.warn("<AddOrderModal> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console_1$f.warn("<AddOrderModal> was created without expected prop 'close'");
    		}
    	});

    	const writable_props = ['show', 'close'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$f.warn(`<AddOrderModal> was created with unknown prop '${key}'`);
    	});

    	function input0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			title = $$value;
    			$$invalidate(2, title);
    		});
    	}

    	function input1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			check_soboy = $$value;
    			$$invalidate(5, check_soboy);
    		});
    	}

    	function select_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			room = $$value;
    			$$invalidate(8, room);
    		});
    	}

    	function select_change_handler() {
    		room_id = select_value(this);
    		$$invalidate(4, room_id);
    	}

    	function textarea_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			desc = $$value;
    			$$invalidate(3, desc);
    		});
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    	};

    	$$self.$capture_state = () => ({
    		OrderEndpoint,
    		RoomEndpoint,
    		orderStore,
    		roomStore,
    		orderEndpoint,
    		roomEndpoint,
    		token,
    		show,
    		close,
    		title,
    		desc,
    		room,
    		room_id,
    		check_soboy,
    		room_class,
    		getRooms,
    		checkSoboy,
    		show_alert,
    		create,
    		$roomStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(3, desc = $$props.desc);
    		if ('room' in $$props) $$invalidate(8, room = $$props.room);
    		if ('room_id' in $$props) $$invalidate(4, room_id = $$props.room_id);
    		if ('check_soboy' in $$props) $$invalidate(5, check_soboy = $$props.check_soboy);
    		if ('room_class' in $$props) $$invalidate(6, room_class = $$props.room_class);
    		if ('show_alert' in $$props) show_alert = $$props.show_alert;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show,
    		close,
    		title,
    		desc,
    		room_id,
    		check_soboy,
    		room_class,
    		$roomStore,
    		room,
    		checkSoboy,
    		create,
    		input0_binding,
    		input1_binding,
    		select_binding,
    		select_change_handler,
    		textarea_binding,
    		click_handler
    	];
    }

    class AddOrderModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, { show: 0, close: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddOrderModal",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get show() {
    		throw new Error("<AddOrderModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<AddOrderModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<AddOrderModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<AddOrderModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\modalsAdmin\AcceptEndOrder.svelte generated by Svelte v3.59.2 */

    const { console: console_1$e } = globals;
    const file$m = "src\\modalsAdmin\\AcceptEndOrder.svelte";

    function create_fragment$n(ctx) {
    	let div2;
    	let div1;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let label;
    	let b;
    	let t5;
    	let input;
    	let t6;
    	let div0;
    	let button0;
    	let t8;
    	let button1;
    	let div2_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			p0 = element("p");
    			p0.textContent = "Buyurtmani tugatish";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Buyurtmani tugatishni tasdiqlaysizmi?";
    			t3 = space();
    			label = element("label");
    			b = element("b");
    			b.textContent = "Admin parol*";
    			t5 = space();
    			input = element("input");
    			t6 = space();
    			div0 = element("div");
    			button0 = element("button");
    			button0.textContent = "Yopish";
    			t8 = space();
    			button1 = element("button");
    			button1.textContent = "Tasdiqlash";
    			attr_dev(p0, "class", "text-xl text-center font-bold");
    			add_location(p0, file$m, 23, 8, 854);
    			attr_dev(p1, "class", "text-sm");
    			add_location(p1, file$m, 24, 8, 928);
    			add_location(b, file$m, 25, 22, 1012);
    			attr_dev(label, "for", "");
    			add_location(label, file$m, 25, 8, 998);
    			attr_dev(input, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "");
    			attr_dev(input, "id", "");
    			add_location(input, file$m, 26, 8, 1049);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-500 font-semibold");
    			add_location(button0, file$m, 28, 12, 1213);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold");
    			add_location(button1, file$m, 29, 12, 1340);
    			attr_dev(div0, "class", "flex justify-between gap-3");
    			add_location(div0, file$m, 27, 8, 1159);
    			attr_dev(div1, "class", "bg-white p-8 flex flex-col gap-3 h-fit w-fit rounded-md shadow-md");
    			add_location(div1, file$m, 22, 4, 765);
    			attr_dev(div2, "class", div2_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div2, file$m, 21, 0, 612);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, p0);
    			append_dev(div1, t1);
    			append_dev(div1, p1);
    			append_dev(div1, t3);
    			append_dev(div1, label);
    			append_dev(label, b);
    			append_dev(div1, t5);
    			append_dev(div1, input);
    			set_input_value(input, /*adminKey*/ ctx[2]);
    			append_dev(div1, t6);
    			append_dev(div1, div0);
    			append_dev(div0, button0);
    			append_dev(div0, t8);
    			append_dev(div0, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[5]),
    					listen_dev(button0, "click", /*click_handler*/ ctx[6], false, false, false, false),
    					listen_dev(button1, "click", /*endOrder*/ ctx[3], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*adminKey*/ 4 && input.value !== /*adminKey*/ ctx[2]) {
    				set_input_value(input, /*adminKey*/ ctx[2]);
    			}

    			if (dirty & /*show*/ 1 && div2_class_value !== (div2_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AcceptEndOrder', slots, []);
    	const roomEndpoint = new OrderEndpoint();
    	const token = localStorage.getItem('token');
    	let { show } = $$props;
    	let { close } = $$props;
    	let { id } = $$props;
    	let adminKey;

    	async function endOrder() {
    		try {
    			const res = await roomEndpoint.patchStatus(id, 0, token, adminKey);
    			const order_ended = res.data.order;

    			orderStore.update(orders => {
    				return orders.filter(o => o.id != order_ended.id);
    			});

    			close();
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console_1$e.warn("<AcceptEndOrder> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console_1$e.warn("<AcceptEndOrder> was created without expected prop 'close'");
    		}

    		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
    			console_1$e.warn("<AcceptEndOrder> was created without expected prop 'id'");
    		}
    	});

    	const writable_props = ['show', 'close', 'id'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$e.warn(`<AcceptEndOrder> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		adminKey = this.value;
    		$$invalidate(2, adminKey);
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('id' in $$props) $$invalidate(4, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		OrderEndpoint,
    		orderStore,
    		roomEndpoint,
    		token,
    		show,
    		close,
    		id,
    		adminKey,
    		endOrder
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('id' in $$props) $$invalidate(4, id = $$props.id);
    		if ('adminKey' in $$props) $$invalidate(2, adminKey = $$props.adminKey);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [show, close, adminKey, endOrder, id, input_input_handler, click_handler];
    }

    class AcceptEndOrder extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, { show: 0, close: 1, id: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AcceptEndOrder",
    			options,
    			id: create_fragment$n.name
    		});
    	}

    	get show() {
    		throw new Error("<AcceptEndOrder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<AcceptEndOrder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<AcceptEndOrder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<AcceptEndOrder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<AcceptEndOrder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<AcceptEndOrder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\modalsAdmin\AcceptDeleteOrder.svelte generated by Svelte v3.59.2 */

    const { console: console_1$d } = globals;
    const file$l = "src\\modalsAdmin\\AcceptDeleteOrder.svelte";

    function create_fragment$m(ctx) {
    	let div2;
    	let div1;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let label;
    	let b;
    	let t5;
    	let input;
    	let t6;
    	let div0;
    	let button0;
    	let t8;
    	let button1;
    	let div2_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			p0 = element("p");
    			p0.textContent = "Buyurtmani o'chirish";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Buyurtmani o'chirishni tasdiqlaysizmi?";
    			t3 = space();
    			label = element("label");
    			b = element("b");
    			b.textContent = "Admin parol*";
    			t5 = space();
    			input = element("input");
    			t6 = space();
    			div0 = element("div");
    			button0 = element("button");
    			button0.textContent = "Yopish";
    			t8 = space();
    			button1 = element("button");
    			button1.textContent = "Tasdiqlash";
    			attr_dev(p0, "class", "text-xl text-center font-bold");
    			add_location(p0, file$l, 23, 8, 846);
    			attr_dev(p1, "class", "text-sm");
    			add_location(p1, file$l, 24, 8, 921);
    			add_location(b, file$l, 25, 22, 1006);
    			attr_dev(label, "for", "");
    			add_location(label, file$l, 25, 8, 992);
    			attr_dev(input, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "");
    			attr_dev(input, "id", "");
    			add_location(input, file$l, 26, 8, 1043);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-500 font-semibold");
    			add_location(button0, file$l, 28, 12, 1207);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold");
    			add_location(button1, file$l, 29, 12, 1334);
    			attr_dev(div0, "class", "flex justify-between gap-3");
    			add_location(div0, file$l, 27, 8, 1153);
    			attr_dev(div1, "class", "bg-white p-8 flex flex-col gap-3 h-fit w-fit rounded-md shadow-md");
    			add_location(div1, file$l, 22, 4, 757);
    			attr_dev(div2, "class", div2_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div2, file$l, 21, 0, 604);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, p0);
    			append_dev(div1, t1);
    			append_dev(div1, p1);
    			append_dev(div1, t3);
    			append_dev(div1, label);
    			append_dev(label, b);
    			append_dev(div1, t5);
    			append_dev(div1, input);
    			set_input_value(input, /*adminKey*/ ctx[2]);
    			append_dev(div1, t6);
    			append_dev(div1, div0);
    			append_dev(div0, button0);
    			append_dev(div0, t8);
    			append_dev(div0, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[5]),
    					listen_dev(button0, "click", /*click_handler*/ ctx[6], false, false, false, false),
    					listen_dev(button1, "click", /*endOrder*/ ctx[3], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*adminKey*/ 4 && input.value !== /*adminKey*/ ctx[2]) {
    				set_input_value(input, /*adminKey*/ ctx[2]);
    			}

    			if (dirty & /*show*/ 1 && div2_class_value !== (div2_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AcceptDeleteOrder', slots, []);
    	const roomEndpoint = new OrderEndpoint();
    	const token = localStorage.getItem('token');
    	let { show } = $$props;
    	let { close } = $$props;
    	let { id } = $$props;
    	let adminKey;

    	async function endOrder() {
    		try {
    			const res = await roomEndpoint.delete(id, token, adminKey);
    			const order_ended = res.data.order;

    			orderStore.update(orders => {
    				return orders.filter(o => o.id != order_ended.id);
    			});

    			close();
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console_1$d.warn("<AcceptDeleteOrder> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console_1$d.warn("<AcceptDeleteOrder> was created without expected prop 'close'");
    		}

    		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
    			console_1$d.warn("<AcceptDeleteOrder> was created without expected prop 'id'");
    		}
    	});

    	const writable_props = ['show', 'close', 'id'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$d.warn(`<AcceptDeleteOrder> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		adminKey = this.value;
    		$$invalidate(2, adminKey);
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('id' in $$props) $$invalidate(4, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		OrderEndpoint,
    		orderStore,
    		roomEndpoint,
    		token,
    		show,
    		close,
    		id,
    		adminKey,
    		endOrder
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('id' in $$props) $$invalidate(4, id = $$props.id);
    		if ('adminKey' in $$props) $$invalidate(2, adminKey = $$props.adminKey);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [show, close, adminKey, endOrder, id, input_input_handler, click_handler];
    }

    class AcceptDeleteOrder extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { show: 0, close: 1, id: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AcceptDeleteOrder",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get show() {
    		throw new Error("<AcceptDeleteOrder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<AcceptDeleteOrder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<AcceptDeleteOrder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<AcceptDeleteOrder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<AcceptDeleteOrder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<AcceptDeleteOrder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\modalsAll\AddProInOrModal.svelte generated by Svelte v3.59.2 */

    const { console: console_1$c } = globals;

    const file$k = "src\\modalsAll\\AddProInOrModal.svelte";

    function get_each_context$b(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    function get_each_context_2$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (45:28) {#each category.products as product}
    function create_each_block_2$1(ctx) {
    	let option;
    	let t_value = /*product*/ ctx[7].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*product*/ ctx[7].id;
    			option.value = option.__value;
    			add_location(option, file$k, 45, 32, 1984);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$categoryStore*/ 16 && t_value !== (t_value = /*product*/ ctx[7].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$categoryStore*/ 16 && option_value_value !== (option_value_value = /*product*/ ctx[7].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$1.name,
    		type: "each",
    		source: "(45:28) {#each category.products as product}",
    		ctx
    	});

    	return block;
    }

    // (42:20) {#each $categoryStore as category}
    function create_each_block_1$2(ctx) {
    	let option;
    	let t_value = /*category*/ ctx[6].name + "";
    	let t;
    	let option_value_value;
    	let select;
    	let each_value_2 = /*category*/ ctx[6].products;
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			option.__value = option_value_value = /*category*/ ctx[6].id;
    			option.value = option.__value;
    			add_location(option, file$k, 42, 24, 1796);
    			add_location(select, file$k, 43, 24, 1876);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    			insert_dev(target, select, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(select, null);
    				}
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$categoryStore*/ 16 && t_value !== (t_value = /*category*/ ctx[6].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$categoryStore*/ 16 && option_value_value !== (option_value_value = /*category*/ ctx[6].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}

    			if (dirty & /*$categoryStore*/ 16) {
    				each_value_2 = /*category*/ ctx[6].products;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    			if (detaching) detach_dev(select);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(42:20) {#each $categoryStore as category}",
    		ctx
    	});

    	return block;
    }

    // (55:20) {#each $productStore.filter(p => p.category_id == category_id) as product}
    function create_each_block$b(ctx) {
    	let option;
    	let t_value = /*product*/ ctx[7].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*product*/ ctx[7].id;
    			option.value = option.__value;
    			add_location(option, file$k, 55, 24, 2555);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$productStore, category_id*/ 36 && t_value !== (t_value = /*product*/ ctx[7].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$productStore, category_id*/ 36 && option_value_value !== (option_value_value = /*product*/ ctx[7].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$b.name,
    		type: "each",
    		source: "(55:20) {#each $productStore.filter(p => p.category_id == category_id) as product}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let div6;
    	let div5;
    	let p;
    	let t1;
    	let div3;
    	let div0;
    	let label0;
    	let t3;
    	let select0;
    	let t4;
    	let div1;
    	let label1;
    	let t6;
    	let select1;
    	let t7;
    	let div2;
    	let label2;
    	let t9;
    	let input;
    	let t10;
    	let div4;
    	let button0;
    	let i0;
    	let t11;
    	let t12;
    	let button1;
    	let i1;
    	let t13;
    	let div6_class_value;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*$categoryStore*/ ctx[4];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	let each_value = /*$productStore*/ ctx[5].filter(/*func*/ ctx[12]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$b(get_each_context$b(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div5 = element("div");
    			p = element("p");
    			p.textContent = "Buyurtmaga mahsulot qo'shish";
    			t1 = space();
    			div3 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Kategoriyani tanlang*:";
    			t3 = space();
    			select0 = element("select");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t4 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Mahsulotni tanlang*:";
    			t6 = space();
    			select1 = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t7 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Mahsulotni miqdori*:";
    			t9 = space();
    			input = element("input");
    			t10 = space();
    			div4 = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t11 = text(" Yopish");
    			t12 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t13 = text(" Yaratish");
    			attr_dev(p, "class", "text-xl text-center font-bold");
    			add_location(p, file$k, 35, 8, 1321);
    			attr_dev(label0, "class", "font-semibold");
    			attr_dev(label0, "for", "room");
    			add_location(label0, file$k, 39, 16, 1504);
    			attr_dev(select0, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(select0, "name", "room");
    			attr_dev(select0, "id", "");
    			add_location(select0, file$k, 40, 16, 1592);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$k, 38, 12, 1453);
    			attr_dev(label1, "class", "font-semibold");
    			attr_dev(label1, "for", "product-id");
    			add_location(label1, file$k, 52, 16, 2249);
    			attr_dev(select1, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(select1, "name", "room");
    			attr_dev(select1, "id", "");
    			add_location(select1, file$k, 53, 16, 2341);
    			attr_dev(div1, "class", "flex flex-col gap-2");
    			add_location(div1, file$k, 51, 12, 2198);
    			attr_dev(label2, "class", "font-semibold");
    			attr_dev(label2, "for", "product-count");
    			add_location(label2, file$k, 60, 16, 2748);
    			attr_dev(input, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "1");
    			attr_dev(input, "max", "100");
    			attr_dev(input, "name", "product-count");
    			attr_dev(input, "id", "");
    			add_location(input, file$k, 61, 16, 2843);
    			attr_dev(div2, "class", "flex flex-col gap-2");
    			add_location(div2, file$k, 59, 12, 2697);
    			attr_dev(div3, "class", "flex flex-col gap-3");
    			add_location(div3, file$k, 37, 8, 1406);
    			attr_dev(i0, "class", "bi bi-x");
    			add_location(i0, file$k, 66, 110, 3167);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-400 font-semibold");
    			add_location(button0, file$k, 66, 12, 3069);
    			attr_dev(i1, "class", "bi bi-plus");
    			add_location(i1, file$k, 67, 106, 3314);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold");
    			add_location(button1, file$k, 67, 12, 3220);
    			attr_dev(div4, "class", "flex justify-between");
    			add_location(div4, file$k, 65, 8, 3021);
    			attr_dev(div5, "class", "bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto");
    			add_location(div5, file$k, 33, 4, 1169);
    			attr_dev(div6, "class", div6_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div6, file$k, 32, 0, 1016);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div5);
    			append_dev(div5, p);
    			append_dev(div5, t1);
    			append_dev(div5, div3);
    			append_dev(div3, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t3);
    			append_dev(div0, select0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				if (each_blocks_1[i]) {
    					each_blocks_1[i].m(select0, null);
    				}
    			}

    			/*select0_binding*/ ctx[11](select0);
    			append_dev(div3, t4);
    			append_dev(div3, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t6);
    			append_dev(div1, select1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(select1, null);
    				}
    			}

    			/*select1_binding*/ ctx[13](select1);
    			append_dev(div3, t7);
    			append_dev(div3, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t9);
    			append_dev(div2, input);
    			set_input_value(input, /*count*/ ctx[3]);
    			append_dev(div5, t10);
    			append_dev(div5, div4);
    			append_dev(div4, button0);
    			append_dev(button0, i0);
    			append_dev(button0, t11);
    			append_dev(div4, t12);
    			append_dev(div4, button1);
    			append_dev(button1, i1);
    			append_dev(button1, t13);

    			if (!mounted) {
    				dispose = [
    					listen_dev(select0, "change", /*onSelectCategory*/ ctx[8], false, false, false, false),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[14]),
    					listen_dev(button0, "click", /*click_handler*/ ctx[15], false, false, false, false),
    					listen_dev(button1, "click", /*create*/ ctx[9], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$categoryStore*/ 16) {
    				each_value_1 = /*$categoryStore*/ ctx[4];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(select0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*$productStore, category_id*/ 36) {
    				each_value = /*$productStore*/ ctx[5].filter(/*func*/ ctx[12]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$b(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$b(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*count*/ 8 && to_number(input.value) !== /*count*/ ctx[3]) {
    				set_input_value(input, /*count*/ ctx[3]);
    			}

    			if (dirty & /*show*/ 1 && div6_class_value !== (div6_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div6, "class", div6_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_each(each_blocks_1, detaching);
    			/*select0_binding*/ ctx[11](null);
    			destroy_each(each_blocks, detaching);
    			/*select1_binding*/ ctx[13](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let $orderStore;
    	let $categoryStore;
    	let $productStore;
    	validate_store(orderStore, 'orderStore');
    	component_subscribe($$self, orderStore, $$value => $$invalidate(16, $orderStore = $$value));
    	validate_store(categoryStore, 'categoryStore');
    	component_subscribe($$self, categoryStore, $$value => $$invalidate(4, $categoryStore = $$value));
    	validate_store(productStore, 'productStore');
    	component_subscribe($$self, productStore, $$value => $$invalidate(5, $productStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AddProInOrModal', slots, []);
    	const token = localStorage.getItem("token");
    	const proInOrEndpoint = new ProductInOrderEndpoint();
    	let { show } = $$props;
    	let { close } = $$props;
    	let { order_id } = $$props;
    	let category_id = 1;
    	let category;
    	let product;
    	let count;

    	function onSelectCategory() {
    		$$invalidate(2, category_id = +category.value);
    	}

    	async function create() {
    		try {
    			const res = await proInOrEndpoint.post(order_id, +product.value, +count, token);
    			const proInOrder = res.data.productInOrder;
    			let order = $orderStore.filter(o => o.id == proInOrder.order_id)[0];
    			order.products.push(proInOrder);

    			orderStore.update(orders => {
    				return orders.filter(o => o.id != order.id);
    			});

    			orderStore.update(orders => {
    				return orders.concat([order]);
    			});

    			close();
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console_1$c.warn("<AddProInOrModal> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console_1$c.warn("<AddProInOrModal> was created without expected prop 'close'");
    		}

    		if (order_id === undefined && !('order_id' in $$props || $$self.$$.bound[$$self.$$.props['order_id']])) {
    			console_1$c.warn("<AddProInOrModal> was created without expected prop 'order_id'");
    		}
    	});

    	const writable_props = ['show', 'close', 'order_id'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$c.warn(`<AddProInOrModal> was created with unknown prop '${key}'`);
    	});

    	function select0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			category = $$value;
    			$$invalidate(6, category);
    		});
    	}

    	const func = p => p.category_id == category_id;

    	function select1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			product = $$value;
    			$$invalidate(7, product);
    			$$invalidate(2, category_id);
    		});
    	}

    	function input_input_handler() {
    		count = to_number(this.value);
    		$$invalidate(3, count);
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('order_id' in $$props) $$invalidate(10, order_id = $$props.order_id);
    	};

    	$$self.$capture_state = () => ({
    		ProductInOrderEndpoint,
    		orderStore,
    		productStore,
    		categoryStore,
    		token,
    		proInOrEndpoint,
    		show,
    		close,
    		order_id,
    		category_id,
    		category,
    		product,
    		count,
    		onSelectCategory,
    		create,
    		$orderStore,
    		$categoryStore,
    		$productStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('order_id' in $$props) $$invalidate(10, order_id = $$props.order_id);
    		if ('category_id' in $$props) $$invalidate(2, category_id = $$props.category_id);
    		if ('category' in $$props) $$invalidate(6, category = $$props.category);
    		if ('product' in $$props) $$invalidate(7, product = $$props.product);
    		if ('count' in $$props) $$invalidate(3, count = $$props.count);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show,
    		close,
    		category_id,
    		count,
    		$categoryStore,
    		$productStore,
    		category,
    		product,
    		onSelectCategory,
    		create,
    		order_id,
    		select0_binding,
    		func,
    		select1_binding,
    		input_input_handler,
    		click_handler
    	];
    }

    class AddProInOrModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, { show: 0, close: 1, order_id: 10 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddProInOrModal",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get show() {
    		throw new Error("<AddProInOrModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<AddProInOrModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<AddProInOrModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<AddProInOrModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get order_id() {
    		throw new Error("<AddProInOrModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set order_id(value) {
    		throw new Error("<AddProInOrModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\modalsAll\EditProInOrModal.svelte generated by Svelte v3.59.2 */

    const { console: console_1$b } = globals;

    const file$j = "src\\modalsAll\\EditProInOrModal.svelte";

    function get_each_context$a(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (67:20) {#each $categoryStore as category}
    function create_each_block_1$1(ctx) {
    	let option;
    	let t_value = /*category*/ ctx[6].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*category*/ ctx[6].id;
    			option.value = option.__value;
    			add_location(option, file$j, 67, 24, 3191);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$categoryStore*/ 16 && t_value !== (t_value = /*category*/ ctx[6].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$categoryStore*/ 16 && option_value_value !== (option_value_value = /*category*/ ctx[6].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(67:20) {#each $categoryStore as category}",
    		ctx
    	});

    	return block;
    }

    // (75:20) {#each $productStore.filter(p => p.category_id == category_id) as product}
    function create_each_block$a(ctx) {
    	let option;
    	let t_value = /*product*/ ctx[7].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*product*/ ctx[7].id;
    			option.value = option.__value;
    			add_location(option, file$j, 75, 24, 3693);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$productStore, category_id*/ 36 && t_value !== (t_value = /*product*/ ctx[7].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$productStore, category_id*/ 36 && option_value_value !== (option_value_value = /*product*/ ctx[7].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$a.name,
    		type: "each",
    		source: "(75:20) {#each $productStore.filter(p => p.category_id == category_id) as product}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let div7;
    	let div6;
    	let div5;
    	let p;
    	let t1;
    	let div3;
    	let div0;
    	let label0;
    	let t3;
    	let select0;
    	let t4;
    	let div1;
    	let label1;
    	let t6;
    	let select1;
    	let t7;
    	let div2;
    	let label2;
    	let t9;
    	let input;
    	let t10;
    	let div4;
    	let button0;
    	let i0;
    	let t11;
    	let t12;
    	let button1;
    	let i1;
    	let t13;
    	let t14;
    	let button2;
    	let i2;
    	let t15;
    	let div7_class_value;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*$categoryStore*/ ctx[4];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	let each_value = /*$productStore*/ ctx[5].filter(/*func*/ ctx[13]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$a(get_each_context$a(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div6 = element("div");
    			div5 = element("div");
    			p = element("p");
    			p.textContent = "Buyurtmadagi mahsulotni tahrirlash";
    			t1 = space();
    			div3 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Kategoriyani tanlang*:";
    			t3 = space();
    			select0 = element("select");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t4 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Mahsulotni tanlang*:";
    			t6 = space();
    			select1 = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t7 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Mahsulotni miqdori*:";
    			t9 = space();
    			input = element("input");
    			t10 = space();
    			div4 = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t11 = text(" Yopish");
    			t12 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t13 = text(" Saqlash");
    			t14 = space();
    			button2 = element("button");
    			i2 = element("i");
    			t15 = text(" Mahsulotni o'chirish");
    			attr_dev(p, "class", "text-xl text-center font-bold");
    			add_location(p, file$j, 61, 12, 2691);
    			attr_dev(label0, "class", "font-semibold");
    			attr_dev(label0, "for", "room");
    			add_location(label0, file$j, 64, 16, 2878);
    			attr_dev(select0, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(select0, "name", "room");
    			attr_dev(select0, "id", "");
    			add_location(select0, file$j, 65, 16, 2966);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$j, 63, 12, 2827);
    			attr_dev(label1, "class", "font-semibold");
    			attr_dev(label1, "for", "product-id");
    			add_location(label1, file$j, 72, 16, 3386);
    			attr_dev(select1, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(select1, "name", "room");
    			attr_dev(select1, "id", "");
    			if (/*product*/ ctx[7] === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[14].call(select1));
    			add_location(select1, file$j, 73, 16, 3478);
    			attr_dev(div1, "class", "flex flex-col gap-2");
    			add_location(div1, file$j, 71, 12, 3335);
    			attr_dev(label2, "class", "font-semibold");
    			attr_dev(label2, "for", "product-count");
    			add_location(label2, file$j, 80, 16, 3886);
    			attr_dev(input, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "1");
    			attr_dev(input, "max", "100");
    			attr_dev(input, "name", "product-count");
    			attr_dev(input, "id", "");
    			add_location(input, file$j, 81, 16, 3981);
    			attr_dev(div2, "class", "flex flex-col gap-2");
    			add_location(div2, file$j, 79, 12, 3835);
    			attr_dev(div3, "class", "flex flex-col gap-3");
    			add_location(div3, file$j, 62, 8, 2780);
    			attr_dev(i0, "class", "bi bi-x");
    			add_location(i0, file$j, 85, 110, 4303);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-400 font-semibold");
    			add_location(button0, file$j, 85, 12, 4205);
    			attr_dev(i1, "class", "bi bi-plus");
    			add_location(i1, file$j, 86, 111, 4455);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold");
    			add_location(button1, file$j, 86, 12, 4356);
    			attr_dev(div4, "class", "flex justify-between");
    			add_location(div4, file$j, 84, 8, 4157);
    			attr_dev(div5, "class", "flex flex-col gap-3");
    			add_location(div5, file$j, 60, 8, 2644);
    			attr_dev(i2, "class", "bi bi-trash");
    			add_location(i2, file$j, 89, 121, 4653);
    			attr_dev(button2, "class", "py-2 px-4 rounded-md text-red-500 border-red-500 border-2 font-semibold");
    			add_location(button2, file$j, 89, 8, 4540);
    			attr_dev(div6, "class", "bg-white p-8 flex flex-col justify-between w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto");
    			add_location(div6, file$j, 59, 4, 2484);
    			attr_dev(div7, "class", div7_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div7, file$j, 58, 0, 2331);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div6, div5);
    			append_dev(div5, p);
    			append_dev(div5, t1);
    			append_dev(div5, div3);
    			append_dev(div3, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t3);
    			append_dev(div0, select0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				if (each_blocks_1[i]) {
    					each_blocks_1[i].m(select0, null);
    				}
    			}

    			select_option(select0, /*category_id*/ ctx[2]);
    			/*select0_binding*/ ctx[12](select0);
    			append_dev(div3, t4);
    			append_dev(div3, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t6);
    			append_dev(div1, select1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(select1, null);
    				}
    			}

    			select_option(select1, /*product*/ ctx[7], true);
    			append_dev(div3, t7);
    			append_dev(div3, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t9);
    			append_dev(div2, input);
    			set_input_value(input, /*count*/ ctx[3]);
    			append_dev(div5, t10);
    			append_dev(div5, div4);
    			append_dev(div4, button0);
    			append_dev(button0, i0);
    			append_dev(button0, t11);
    			append_dev(div4, t12);
    			append_dev(div4, button1);
    			append_dev(button1, i1);
    			append_dev(button1, t13);
    			append_dev(div6, t14);
    			append_dev(div6, button2);
    			append_dev(button2, i2);
    			append_dev(button2, t15);

    			if (!mounted) {
    				dispose = [
    					listen_dev(select0, "change", /*onSelectCategory*/ ctx[8], false, false, false, false),
    					listen_dev(select1, "change", /*select1_change_handler*/ ctx[14]),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[15]),
    					listen_dev(button0, "click", /*click_handler*/ ctx[16], false, false, false, false),
    					listen_dev(button1, "click", /*editProduct*/ ctx[9], false, false, false, false),
    					listen_dev(button2, "click", /*deleteProduct*/ ctx[10], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$categoryStore*/ 16) {
    				each_value_1 = /*$categoryStore*/ ctx[4];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(select0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*category_id*/ 4) {
    				select_option(select0, /*category_id*/ ctx[2]);
    			}

    			if (dirty & /*$productStore, category_id*/ 36) {
    				each_value = /*$productStore*/ ctx[5].filter(/*func*/ ctx[13]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$a(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$a(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*product, $productStore, category_id*/ 164) {
    				select_option(select1, /*product*/ ctx[7]);
    			}

    			if (dirty & /*count*/ 8 && to_number(input.value) !== /*count*/ ctx[3]) {
    				set_input_value(input, /*count*/ ctx[3]);
    			}

    			if (dirty & /*show*/ 1 && div7_class_value !== (div7_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div7, "class", div7_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			destroy_each(each_blocks_1, detaching);
    			/*select0_binding*/ ctx[12](null);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let $orderStore;
    	let $categoryStore;
    	let $productStore;
    	validate_store(orderStore, 'orderStore');
    	component_subscribe($$self, orderStore, $$value => $$invalidate(17, $orderStore = $$value));
    	validate_store(categoryStore, 'categoryStore');
    	component_subscribe($$self, categoryStore, $$value => $$invalidate(4, $categoryStore = $$value));
    	validate_store(productStore, 'productStore');
    	component_subscribe($$self, productStore, $$value => $$invalidate(5, $productStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('EditProInOrModal', slots, []);
    	const token = localStorage.getItem("token");
    	const proInOrEndpoint = new ProductInOrderEndpoint();
    	let { show } = $$props;
    	let { close } = $$props;
    	let { productInOrder } = $$props;
    	let category_id = productInOrder.product.category_id;
    	let category;
    	let product = productInOrder.product.id;
    	let count = productInOrder.count;

    	function onSelectCategory() {
    		$$invalidate(2, category_id = +category.value);
    	}

    	async function editProduct() {
    		try {
    			const res = await proInOrEndpoint.put(productInOrder.id, product, +count, token);
    			const proInOrder = res.data.productInOrder;
    			let order = $orderStore.filter(o => o.id == proInOrder.order_id)[0];
    			let products_filter = order.products.filter(p => p.id != proInOrder.id);
    			products_filter.push(proInOrder);
    			order.products = products_filter;

    			if (proInOrder.status == 1) {
    				let order_total_price = order.total_price - productInOrder.total_price;
    				order_total_price += proInOrder.total_price;
    				order.total_price = order_total_price;
    			}

    			orderStore.update(orders => {
    				return orders.filter(o => o.id != order.id);
    			});

    			orderStore.update(orders => {
    				return orders.concat([order]);
    			});

    			close();
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	async function deleteProduct() {
    		try {
    			const res = await proInOrEndpoint.delete(productInOrder.id, token);
    			const proInOrder_deleted = res.data.productInOrder;
    			let order = $orderStore.filter(o => o.id == proInOrder_deleted.order_id)[0];
    			let products_filter = order.products.filter(p => p.id != proInOrder_deleted.id);
    			order.products = products_filter;

    			if (proInOrder_deleted.status == 1) {
    				let order_total_price = order.total_price - proInOrder_deleted.total_price;
    				order.total_price = order_total_price;
    			}

    			orderStore.update(orders => {
    				return orders.filter(o => o.id != order.id);
    			});

    			orderStore.update(orders => {
    				return orders.concat([order]);
    			});

    			close();
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console_1$b.warn("<EditProInOrModal> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console_1$b.warn("<EditProInOrModal> was created without expected prop 'close'");
    		}

    		if (productInOrder === undefined && !('productInOrder' in $$props || $$self.$$.bound[$$self.$$.props['productInOrder']])) {
    			console_1$b.warn("<EditProInOrModal> was created without expected prop 'productInOrder'");
    		}
    	});

    	const writable_props = ['show', 'close', 'productInOrder'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$b.warn(`<EditProInOrModal> was created with unknown prop '${key}'`);
    	});

    	function select0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			category = $$value;
    			$$invalidate(6, category);
    		});
    	}

    	const func = p => p.category_id == category_id;

    	function select1_change_handler() {
    		product = select_value(this);
    		$$invalidate(7, product);
    		$$invalidate(2, category_id);
    	}

    	function input_input_handler() {
    		count = to_number(this.value);
    		$$invalidate(3, count);
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('productInOrder' in $$props) $$invalidate(11, productInOrder = $$props.productInOrder);
    	};

    	$$self.$capture_state = () => ({
    		ProductInOrderEndpoint,
    		orderStore,
    		productStore,
    		categoryStore,
    		token,
    		proInOrEndpoint,
    		show,
    		close,
    		productInOrder,
    		category_id,
    		category,
    		product,
    		count,
    		onSelectCategory,
    		editProduct,
    		deleteProduct,
    		$orderStore,
    		$categoryStore,
    		$productStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('productInOrder' in $$props) $$invalidate(11, productInOrder = $$props.productInOrder);
    		if ('category_id' in $$props) $$invalidate(2, category_id = $$props.category_id);
    		if ('category' in $$props) $$invalidate(6, category = $$props.category);
    		if ('product' in $$props) $$invalidate(7, product = $$props.product);
    		if ('count' in $$props) $$invalidate(3, count = $$props.count);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show,
    		close,
    		category_id,
    		count,
    		$categoryStore,
    		$productStore,
    		category,
    		product,
    		onSelectCategory,
    		editProduct,
    		deleteProduct,
    		productInOrder,
    		select0_binding,
    		func,
    		select1_change_handler,
    		input_input_handler,
    		click_handler
    	];
    }

    class EditProInOrModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, { show: 0, close: 1, productInOrder: 11 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EditProInOrModal",
    			options,
    			id: create_fragment$k.name
    		});
    	}

    	get show() {
    		throw new Error("<EditProInOrModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<EditProInOrModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<EditProInOrModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<EditProInOrModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get productInOrder() {
    		throw new Error("<EditProInOrModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set productInOrder(value) {
    		throw new Error("<EditProInOrModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\modalsAll\EditStatusProductModal.svelte generated by Svelte v3.59.2 */

    const { console: console_1$a } = globals;
    const file$i = "src\\modalsAll\\EditStatusProductModal.svelte";

    function create_fragment$j(ctx) {
    	let div2;
    	let div1;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let div0;
    	let button0;
    	let t5;
    	let button1;
    	let div2_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			p0 = element("p");
    			p0.textContent = "Tasdiqlash";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Mahsulot mijozga berilganligini tasdiqlaysizmi?";
    			t3 = space();
    			div0 = element("div");
    			button0 = element("button");
    			button0.textContent = "Yopish";
    			t5 = space();
    			button1 = element("button");
    			button1.textContent = "Tasdiqlash";
    			attr_dev(p0, "class", "text-xl text-center font-bold");
    			add_location(p0, file$i, 31, 8, 1433);
    			attr_dev(p1, "class", "text-sm text-center font-medium");
    			add_location(p1, file$i, 32, 8, 1498);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-500 font-semibold");
    			add_location(button0, file$i, 34, 12, 1656);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold");
    			add_location(button1, file$i, 35, 12, 1783);
    			attr_dev(div0, "class", "flex justify-between gap-3");
    			add_location(div0, file$i, 33, 8, 1602);
    			attr_dev(div1, "class", "bg-white p-8 flex flex-col gap-3 h-fit w-4/5 rounded-md shadow-md");
    			add_location(div1, file$i, 30, 4, 1344);
    			attr_dev(div2, "class", div2_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div2, file$i, 29, 0, 1191);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, p0);
    			append_dev(div1, t1);
    			append_dev(div1, p1);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, button0);
    			append_dev(div0, t5);
    			append_dev(div0, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[4], false, false, false, false),
    					listen_dev(button1, "click", /*patchStatus*/ ctx[2], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*show*/ 1 && div2_class_value !== (div2_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let $orderStore;
    	validate_store(orderStore, 'orderStore');
    	component_subscribe($$self, orderStore, $$value => $$invalidate(5, $orderStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('EditStatusProductModal', slots, []);
    	const token = localStorage.getItem('token');
    	const productInOrderEndpoint = new ProductInOrderEndpoint();
    	let { show } = $$props;
    	let { close } = $$props;
    	let { id } = $$props;

    	async function patchStatus() {
    		try {
    			const res = await productInOrderEndpoint.patchStatus(id, 1, token);
    			const productInOrder = res.data.productInOrder;
    			let order = $orderStore.filter(o => o.id == productInOrder.order_id)[0];
    			let products_filter = order.products.filter(p => p.id != productInOrder.id);
    			products_filter.push(productInOrder);
    			order.products = products_filter;

    			if (productInOrder.status == 1) {
    				let order_total_price = order.total_price + productInOrder.total_price;
    				order.total_price = order_total_price;
    			}

    			orderStore.update(orders => {
    				return orders.filter(o => o.id != order.id);
    			});

    			orderStore.update(orders => {
    				return orders.concat([order]);
    			});

    			close();
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console_1$a.warn("<EditStatusProductModal> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console_1$a.warn("<EditStatusProductModal> was created without expected prop 'close'");
    		}

    		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
    			console_1$a.warn("<EditStatusProductModal> was created without expected prop 'id'");
    		}
    	});

    	const writable_props = ['show', 'close', 'id'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$a.warn(`<EditStatusProductModal> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('id' in $$props) $$invalidate(3, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		OrderEndpoint,
    		ProductInOrderEndpoint,
    		productInOrderStore,
    		orderStore,
    		token,
    		productInOrderEndpoint,
    		show,
    		close,
    		id,
    		patchStatus,
    		$orderStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('id' in $$props) $$invalidate(3, id = $$props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [show, close, patchStatus, id, click_handler];
    }

    class EditStatusProductModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, { show: 0, close: 1, id: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EditStatusProductModal",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get show() {
    		throw new Error("<EditStatusProductModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<EditStatusProductModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<EditStatusProductModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<EditStatusProductModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<EditStatusProductModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<EditStatusProductModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\ProInOrder.svelte generated by Svelte v3.59.2 */
    const file$h = "src\\components\\ProInOrder.svelte";

    // (16:8) {:else}
    function create_else_block_1$2(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "bi bi-clipboard-x-fill text-red-500");
    			add_location(i, file$h, 16, 12, 756);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1$2.name,
    		type: "else",
    		source: "(16:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (14:8) {#if product.status == 1}
    function create_if_block_1$2(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "bi bi-clipboard-check-fill text-green-500");
    			add_location(i, file$h, 14, 12, 668);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(14:8) {#if product.status == 1}",
    		ctx
    	});

    	return block;
    }

    // (26:8) {:else}
    function create_else_block$8(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-check-all");
    			add_location(i, file$h, 26, 155, 1541);
    			button.disabled = true;
    			attr_dev(button, "class", "bg-green-400 text-white text-sm py-2 px-3 rounded-md font-semibold w-fit");
    			add_location(button, file$h, 26, 12, 1398);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler_2*/ ctx[8], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$8.name,
    		type: "else",
    		source: "(26:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (24:8) {#if product.status == 0}
    function create_if_block$8(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-check");
    			add_location(i, file$h, 24, 146, 1331);
    			attr_dev(button, "class", "bg-green-500 text-white text-sm py-2 px-3 rounded-md font-semibold w-fit");
    			add_location(button, file$h, 24, 12, 1197);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler_1*/ ctx[7], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(24:8) {#if product.status == 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let tr;
    	let editstatusproductmodal;
    	let t0;
    	let editproinormodal;
    	let t1;
    	let td0;
    	let t2_value = /*index*/ ctx[1] + 1 + "";
    	let t2;
    	let t3;
    	let td1;
    	let t4_value = /*product*/ ctx[0].product.name + "";
    	let t4;
    	let t5;
    	let t6;
    	let td2;
    	let t7_value = /*product*/ ctx[0].count + "";
    	let t7;
    	let t8;
    	let td3;
    	let t9_value = /*product*/ ctx[0].total_price + "";
    	let t9;
    	let t10;
    	let td4;
    	let button;
    	let i;
    	let t11;
    	let current;
    	let mounted;
    	let dispose;

    	editstatusproductmodal = new EditStatusProductModal({
    			props: {
    				id: /*product*/ ctx[0].id,
    				show: /*show_edit_status*/ ctx[3],
    				close: /*func*/ ctx[4]
    			},
    			$$inline: true
    		});

    	editproinormodal = new EditProInOrModal({
    			props: {
    				productInOrder: /*product*/ ctx[0],
    				show: /*show_edit_data*/ ctx[2],
    				close: /*func_1*/ ctx[5]
    			},
    			$$inline: true
    		});

    	function select_block_type(ctx, dirty) {
    		if (/*product*/ ctx[0].status == 1) return create_if_block_1$2;
    		return create_else_block_1$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (/*product*/ ctx[0].status == 0) return create_if_block$8;
    		return create_else_block$8;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block1 = current_block_type_1(ctx);

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			create_component(editstatusproductmodal.$$.fragment);
    			t0 = space();
    			create_component(editproinormodal.$$.fragment);
    			t1 = space();
    			td0 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td1 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			if_block0.c();
    			t6 = space();
    			td2 = element("td");
    			t7 = text(t7_value);
    			t8 = space();
    			td3 = element("td");
    			t9 = text(t9_value);
    			t10 = space();
    			td4 = element("td");
    			button = element("button");
    			i = element("i");
    			t11 = space();
    			if_block1.c();
    			attr_dev(td0, "class", "text-center");
    			add_location(td0, file$h, 10, 4, 537);
    			add_location(td1, file$h, 11, 4, 583);
    			attr_dev(td2, "class", "text-center");
    			add_location(td2, file$h, 19, 4, 839);
    			attr_dev(td3, "class", "text-center");
    			add_location(td3, file$h, 20, 4, 889);
    			attr_dev(i, "class", "bi bi-pencil");
    			add_location(i, file$h, 22, 140, 1111);
    			attr_dev(button, "class", "bg-green-500 text-white text-sm py-2 px-3 rounded-md font-semibold w-fit");
    			add_location(button, file$h, 22, 8, 979);
    			attr_dev(td4, "class", "text-center");
    			add_location(td4, file$h, 21, 4, 945);
    			add_location(tr, file$h, 7, 0, 265);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			mount_component(editstatusproductmodal, tr, null);
    			append_dev(tr, t0);
    			mount_component(editproinormodal, tr, null);
    			append_dev(tr, t1);
    			append_dev(tr, td0);
    			append_dev(td0, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td1);
    			append_dev(td1, t4);
    			append_dev(td1, t5);
    			if_block0.m(td1, null);
    			append_dev(tr, t6);
    			append_dev(tr, td2);
    			append_dev(td2, t7);
    			append_dev(tr, t8);
    			append_dev(tr, td3);
    			append_dev(td3, t9);
    			append_dev(tr, t10);
    			append_dev(tr, td4);
    			append_dev(td4, button);
    			append_dev(button, i);
    			append_dev(td4, t11);
    			if_block1.m(td4, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[6], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const editstatusproductmodal_changes = {};
    			if (dirty & /*product*/ 1) editstatusproductmodal_changes.id = /*product*/ ctx[0].id;
    			if (dirty & /*show_edit_status*/ 8) editstatusproductmodal_changes.show = /*show_edit_status*/ ctx[3];
    			if (dirty & /*show_edit_status*/ 8) editstatusproductmodal_changes.close = /*func*/ ctx[4];
    			editstatusproductmodal.$set(editstatusproductmodal_changes);
    			const editproinormodal_changes = {};
    			if (dirty & /*product*/ 1) editproinormodal_changes.productInOrder = /*product*/ ctx[0];
    			if (dirty & /*show_edit_data*/ 4) editproinormodal_changes.show = /*show_edit_data*/ ctx[2];
    			if (dirty & /*show_edit_data*/ 4) editproinormodal_changes.close = /*func_1*/ ctx[5];
    			editproinormodal.$set(editproinormodal_changes);
    			if ((!current || dirty & /*index*/ 2) && t2_value !== (t2_value = /*index*/ ctx[1] + 1 + "")) set_data_dev(t2, t2_value);
    			if ((!current || dirty & /*product*/ 1) && t4_value !== (t4_value = /*product*/ ctx[0].product.name + "")) set_data_dev(t4, t4_value);

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(td1, null);
    				}
    			}

    			if ((!current || dirty & /*product*/ 1) && t7_value !== (t7_value = /*product*/ ctx[0].count + "")) set_data_dev(t7, t7_value);
    			if ((!current || dirty & /*product*/ 1) && t9_value !== (t9_value = /*product*/ ctx[0].total_price + "")) set_data_dev(t9, t9_value);

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type_1(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(td4, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(editstatusproductmodal.$$.fragment, local);
    			transition_in(editproinormodal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(editstatusproductmodal.$$.fragment, local);
    			transition_out(editproinormodal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			destroy_component(editstatusproductmodal);
    			destroy_component(editproinormodal);
    			if_block0.d();
    			if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ProInOrder', slots, []);
    	let { product } = $$props;
    	let { index } = $$props;
    	let show_edit_data;
    	let show_edit_status;

    	$$self.$$.on_mount.push(function () {
    		if (product === undefined && !('product' in $$props || $$self.$$.bound[$$self.$$.props['product']])) {
    			console.warn("<ProInOrder> was created without expected prop 'product'");
    		}

    		if (index === undefined && !('index' in $$props || $$self.$$.bound[$$self.$$.props['index']])) {
    			console.warn("<ProInOrder> was created without expected prop 'index'");
    		}
    	});

    	const writable_props = ['product', 'index'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ProInOrder> was created with unknown prop '${key}'`);
    	});

    	const func = () => $$invalidate(3, show_edit_status = false);
    	const func_1 = () => $$invalidate(2, show_edit_data = false);

    	const click_handler = () => {
    		$$invalidate(2, show_edit_data = true);
    	};

    	const click_handler_1 = () => {
    		$$invalidate(3, show_edit_status = true);
    	};

    	const click_handler_2 = () => {
    		$$invalidate(3, show_edit_status = true);
    	};

    	$$self.$$set = $$props => {
    		if ('product' in $$props) $$invalidate(0, product = $$props.product);
    		if ('index' in $$props) $$invalidate(1, index = $$props.index);
    	};

    	$$self.$capture_state = () => ({
    		EditProInOrModal,
    		EditStatusProductModal,
    		product,
    		index,
    		show_edit_data,
    		show_edit_status
    	});

    	$$self.$inject_state = $$props => {
    		if ('product' in $$props) $$invalidate(0, product = $$props.product);
    		if ('index' in $$props) $$invalidate(1, index = $$props.index);
    		if ('show_edit_data' in $$props) $$invalidate(2, show_edit_data = $$props.show_edit_data);
    		if ('show_edit_status' in $$props) $$invalidate(3, show_edit_status = $$props.show_edit_status);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		product,
    		index,
    		show_edit_data,
    		show_edit_status,
    		func,
    		func_1,
    		click_handler,
    		click_handler_1,
    		click_handler_2
    	];
    }

    class ProInOrder extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { product: 0, index: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProInOrder",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get product() {
    		throw new Error("<ProInOrder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set product(value) {
    		throw new Error("<ProInOrder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get index() {
    		throw new Error("<ProInOrder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set index(value) {
    		throw new Error("<ProInOrder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\OrderComponent.svelte generated by Svelte v3.59.2 */
    const file$g = "src\\components\\OrderComponent.svelte";

    function get_each_context$9(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	child_ctx[20] = i;
    	return child_ctx;
    }

    // (29:12) {#if user_role == 'admin'}
    function create_if_block_3$1(ctx) {
    	let button0;
    	let i0;
    	let t;
    	let button1;
    	let i1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button0 = element("button");
    			i0 = element("i");
    			t = space();
    			button1 = element("button");
    			i1 = element("i");
    			attr_dev(i0, "class", "bi bi-clipboard-x");
    			add_location(i0, file$g, 29, 139, 1669);
    			attr_dev(button0, "class", "bg-red-500 text-white text-xl py-3 px-3 rounded-md font-semibold w-fit");
    			add_location(button0, file$g, 29, 16, 1546);
    			attr_dev(i1, "class", "bi bi-trash");
    			add_location(i1, file$g, 30, 157, 1870);
    			attr_dev(button1, "class", "border-red-500 border-2 text-red-500 text-xl py-3 px-3 rounded-md font-semibold w-fit");
    			add_location(button1, file$g, 30, 16, 1729);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button0, anchor);
    			append_dev(button0, i0);
    			insert_dev(target, t, anchor);
    			insert_dev(target, button1, anchor);
    			append_dev(button1, i1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler_1*/ ctx[10], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_2*/ ctx[11], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button0);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(button1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(29:12) {#if user_role == 'admin'}",
    		ctx
    	});

    	return block;
    }

    // (39:8) {:else}
    function create_else_block_2$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Tugatilgan";
    			attr_dev(p, "class", "px-3 py-1 font-semibold text-white rounded-2xl bg-red-500 text-xl");
    			add_location(p, file$g, 39, 12, 2211);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2$1.name,
    		type: "else",
    		source: "(39:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (37:8) {#if order.status == 1}
    function create_if_block_2$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Jarayonda";
    			attr_dev(p, "class", "px-3 py-1 font-semibold text-white rounded-2xl bg-green-500 text-xl");
    			add_location(p, file$g, 37, 12, 2088);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(37:8) {#if order.status == 1}",
    		ctx
    	});

    	return block;
    }

    // (55:8) {:else}
    function create_else_block_1$1(ctx) {
    	let p;
    	let t_value = /*order*/ ctx[0].room.name + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "text-stone-100 text-sm font-semibold bg-violet-500 rounded-2xl px-3 py-1");
    			add_location(p, file$g, 55, 12, 2822);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*order*/ 1 && t_value !== (t_value = /*order*/ ctx[0].room.name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1$1.name,
    		type: "else",
    		source: "(55:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (53:8) {#if order.room === null}
    function create_if_block_1$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "SOBOY/DOSTAVKA";
    			attr_dev(p, "class", "text-stone-100 text-sm font-semibold bg-pink-500 rounded-2xl px-3 py-1");
    			add_location(p, file$g, 53, 12, 2691);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(53:8) {#if order.room === null}",
    		ctx
    	});

    	return block;
    }

    // (64:12) {:else}
    function create_else_block$7(ctx) {
    	let t0_value = /*order*/ ctx[0].total_price + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text(t0_value);
    			t1 = text(" so'm");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*order*/ 1 && t0_value !== (t0_value = /*order*/ ctx[0].total_price + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$7.name,
    		type: "else",
    		source: "(64:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (62:12) {#if order.total_price == null}
    function create_if_block$7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("0 so'm");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(62:12) {#if order.total_price == null}",
    		ctx
    	});

    	return block;
    }

    // (87:20) {#each order.products as product, index}
    function create_each_block$9(ctx) {
    	let proinorder;
    	let current;

    	proinorder = new ProInOrder({
    			props: {
    				product: /*product*/ ctx[18],
    				index: /*index*/ ctx[20]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(proinorder.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(proinorder, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const proinorder_changes = {};
    			if (dirty & /*order*/ 1) proinorder_changes.product = /*product*/ ctx[18];
    			proinorder.$set(proinorder_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(proinorder.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(proinorder.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(proinorder, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$9.name,
    		type: "each",
    		source: "(87:20) {#each order.products as product, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let div10;
    	let addproinormodal;
    	let t0;
    	let div1;
    	let span;
    	let p0;
    	let b0;
    	let t2;
    	let t3_value = /*order*/ ctx[0].title + "";
    	let t3;
    	let t4;
    	let p1;
    	let t5_value = /*order*/ ctx[0].create_date.slice(0, 10) + "";
    	let t5;
    	let t6;
    	let t7_value = /*order*/ ctx[0].create_date.slice(11, 16) + "";
    	let t7;
    	let t8;
    	let div0;
    	let button0;
    	let i0;
    	let t9;
    	let t10;
    	let div2;
    	let p2;
    	let b1;
    	let t12;
    	let t13;
    	let div3;
    	let p3;
    	let b2;
    	let t15;
    	let p4;
    	let t16_value = /*order*/ ctx[0].desc + "";
    	let t16;
    	let t17;
    	let div4;
    	let p5;
    	let b3;
    	let t19;
    	let p6;
    	let t20_value = /*order*/ ctx[0].user.name + "";
    	let t20;
    	let t21;
    	let div5;
    	let p7;
    	let b4;
    	let t23;
    	let t24;
    	let div6;
    	let p8;
    	let b5;
    	let t26;
    	let p9;
    	let t27;
    	let div9;
    	let div7;
    	let p10;
    	let b6;
    	let t28;
    	let t29_value = /*order*/ ctx[0].products.length + "";
    	let t29;
    	let t30;
    	let t31;
    	let button1;
    	let i1;
    	let button1_class_value;
    	let t32;
    	let button2;
    	let i2;
    	let button2_class_value;
    	let t33;
    	let div8;
    	let table;
    	let thead;
    	let tr;
    	let th0;
    	let t35;
    	let th1;
    	let t37;
    	let th2;
    	let t39;
    	let th3;
    	let t41;
    	let th4;
    	let t43;
    	let tbody;
    	let div8_class_value;
    	let t44;
    	let acceptendorder;
    	let t45;
    	let acceptdeleteorder;
    	let current;
    	let mounted;
    	let dispose;

    	addproinormodal = new AddProInOrModal({
    			props: {
    				order_id: /*order*/ ctx[0].id,
    				show: /*show_add_pro*/ ctx[7],
    				close: /*func*/ ctx[8]
    			},
    			$$inline: true
    		});

    	let if_block0 = /*user_role*/ ctx[1] == 'admin' && create_if_block_3$1(ctx);

    	function select_block_type(ctx, dirty) {
    		if (/*order*/ ctx[0].status == 1) return create_if_block_2$1;
    		return create_else_block_2$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block1 = current_block_type(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (/*order*/ ctx[0].room === null) return create_if_block_1$1;
    		return create_else_block_1$1;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block2 = current_block_type_1(ctx);

    	function select_block_type_2(ctx, dirty) {
    		if (/*order*/ ctx[0].total_price == null) return create_if_block$7;
    		return create_else_block$7;
    	}

    	let current_block_type_2 = select_block_type_2(ctx);
    	let if_block3 = current_block_type_2(ctx);
    	let each_value = /*order*/ ctx[0].products;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	acceptendorder = new AcceptEndOrder({
    			props: {
    				id: /*order*/ ctx[0].id,
    				show: /*show_end*/ ctx[2],
    				close: /*func_1*/ ctx[14]
    			},
    			$$inline: true
    		});

    	acceptdeleteorder = new AcceptDeleteOrder({
    			props: {
    				id: /*order*/ ctx[0].id,
    				show: /*show_delete*/ ctx[3],
    				close: /*func_2*/ ctx[15]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div10 = element("div");
    			create_component(addproinormodal.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			span = element("span");
    			p0 = element("p");
    			b0 = element("b");
    			b0.textContent = "Nomi:";
    			t2 = space();
    			t3 = text(t3_value);
    			t4 = space();
    			p1 = element("p");
    			t5 = text(t5_value);
    			t6 = space();
    			t7 = text(t7_value);
    			t8 = space();
    			div0 = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t9 = space();
    			if (if_block0) if_block0.c();
    			t10 = space();
    			div2 = element("div");
    			p2 = element("p");
    			b1 = element("b");
    			b1.textContent = "Holati:";
    			t12 = space();
    			if_block1.c();
    			t13 = space();
    			div3 = element("div");
    			p3 = element("p");
    			b2 = element("b");
    			b2.textContent = "Izoh:";
    			t15 = space();
    			p4 = element("p");
    			t16 = text(t16_value);
    			t17 = space();
    			div4 = element("div");
    			p5 = element("p");
    			b3 = element("b");
    			b3.textContent = "Ishchi:";
    			t19 = space();
    			p6 = element("p");
    			t20 = text(t20_value);
    			t21 = space();
    			div5 = element("div");
    			p7 = element("p");
    			b4 = element("b");
    			b4.textContent = "Xona nomi:";
    			t23 = space();
    			if_block2.c();
    			t24 = space();
    			div6 = element("div");
    			p8 = element("p");
    			b5 = element("b");
    			b5.textContent = "Umumiy hisob:";
    			t26 = space();
    			p9 = element("p");
    			if_block3.c();
    			t27 = space();
    			div9 = element("div");
    			div7 = element("div");
    			p10 = element("p");
    			b6 = element("b");
    			t28 = text("Mahsulotlar (");
    			t29 = text(t29_value);
    			t30 = text(")");
    			t31 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t32 = space();
    			button2 = element("button");
    			i2 = element("i");
    			t33 = space();
    			div8 = element("div");
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "T/r";
    			t35 = space();
    			th1 = element("th");
    			th1.textContent = "Nomi";
    			t37 = space();
    			th2 = element("th");
    			th2.textContent = "Miqdori";
    			t39 = space();
    			th3 = element("th");
    			th3.textContent = "Narxi";
    			t41 = space();
    			th4 = element("th");
    			th4.textContent = "Tahrir";
    			t43 = space();
    			tbody = element("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t44 = space();
    			create_component(acceptendorder.$$.fragment);
    			t45 = space();
    			create_component(acceptdeleteorder.$$.fragment);
    			add_location(b0, file$g, 23, 24, 1105);
    			attr_dev(p0, "class", "");
    			add_location(p0, file$g, 23, 12, 1093);
    			attr_dev(p1, "class", "text-sm font-medium");
    			add_location(p1, file$g, 24, 12, 1149);
    			attr_dev(span, "class", "flex flex-col");
    			add_location(span, file$g, 22, 8, 1051);
    			attr_dev(i0, "class", "bi bi-clipboard-plus");
    			add_location(i0, file$g, 27, 142, 1443);
    			attr_dev(button0, "class", "bg-violet-500 text-white text-xl py-3 px-3 rounded-md font-semibold w-fit");
    			add_location(button0, file$g, 27, 12, 1313);
    			attr_dev(div0, "class", "flex gap-2");
    			add_location(div0, file$g, 26, 8, 1275);
    			attr_dev(div1, "class", "flex items-center justify-between p-2 border-b-2 border-indigo-500");
    			add_location(div1, file$g, 21, 4, 961);
    			add_location(b1, file$g, 35, 11, 2023);
    			add_location(p2, file$g, 35, 8, 2020);
    			attr_dev(div2, "class", "flex items-center justify-between p-2");
    			add_location(div2, file$g, 34, 4, 1959);
    			add_location(b2, file$g, 43, 11, 2386);
    			add_location(p3, file$g, 43, 8, 2383);
    			add_location(p4, file$g, 44, 8, 2412);
    			attr_dev(div3, "class", "flex justify-between p-2");
    			add_location(div3, file$g, 42, 4, 2335);
    			add_location(b3, file$g, 47, 11, 2500);
    			add_location(p5, file$g, 47, 8, 2497);
    			add_location(p6, file$g, 48, 8, 2528);
    			attr_dev(div4, "class", "flex justify-between p-2");
    			add_location(div4, file$g, 46, 4, 2449);
    			add_location(b4, file$g, 51, 11, 2621);
    			add_location(p7, file$g, 51, 8, 2618);
    			attr_dev(div5, "class", "flex justify-between p-2");
    			add_location(div5, file$g, 50, 4, 2570);
    			add_location(b5, file$g, 59, 11, 3011);
    			add_location(p8, file$g, 59, 8, 3008);
    			add_location(p9, file$g, 60, 8, 3045);
    			attr_dev(div6, "class", "flex justify-between p-2");
    			add_location(div6, file$g, 58, 4, 2960);
    			add_location(b6, file$g, 70, 15, 3391);
    			add_location(p10, file$g, 70, 12, 3388);
    			attr_dev(i1, "class", "bi bi-caret-down");
    			add_location(i1, file$g, 71, 200, 3641);
    			attr_dev(button1, "class", button1_class_value = "px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100 " + (/*show_btn*/ ctx[5] ? "block" : "hidden"));
    			add_location(button1, file$g, 71, 12, 3453);
    			attr_dev(i2, "class", "bi bi-caret-up");
    			add_location(i2, file$g, 72, 202, 3886);
    			attr_dev(button2, "class", button2_class_value = "px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100 " + (/*close_btn*/ ctx[6] ? "block" : "hidden"));
    			add_location(button2, file$g, 72, 12, 3696);
    			attr_dev(div7, "class", "flex justify-between items-center p-2 w-full");
    			add_location(div7, file$g, 69, 8, 3316);
    			attr_dev(th0, "class", "border-b-2 border-indigo-500 text-start text-sm");
    			add_location(th0, file$g, 78, 24, 4118);
    			attr_dev(th1, "class", "border-b-2 border-indigo-500 text-start text-sm");
    			add_location(th1, file$g, 79, 24, 4212);
    			attr_dev(th2, "class", "border-b-2 border-indigo-500 text-center text-sm");
    			add_location(th2, file$g, 80, 24, 4307);
    			attr_dev(th3, "class", "border-b-2 border-indigo-500 text-center text-sm");
    			add_location(th3, file$g, 81, 24, 4406);
    			attr_dev(th4, "class", "border-b-2 border-indigo-500 text-center text-sm");
    			add_location(th4, file$g, 82, 24, 4503);
    			add_location(tr, file$g, 77, 20, 4088);
    			add_location(thead, file$g, 76, 16, 4059);
    			add_location(tbody, file$g, 85, 16, 4646);
    			add_location(table, file$g, 75, 12, 4034);
    			attr_dev(div8, "class", div8_class_value = "flex-col gap-2 " + (/*show_products*/ ctx[4] ? "flex" : "hidden"));
    			add_location(div8, file$g, 74, 8, 3951);
    			attr_dev(div9, "class", "flex flex-col justify-between p-2 bg-indigo-500/10 rounded-md");
    			add_location(div9, file$g, 68, 4, 3231);
    			attr_dev(div10, "class", "flex-flex-col gap-1 p-3 rounded-md bg-white shadow-md");
    			add_location(div10, file$g, 18, 0, 616);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div10, anchor);
    			mount_component(addproinormodal, div10, null);
    			append_dev(div10, t0);
    			append_dev(div10, div1);
    			append_dev(div1, span);
    			append_dev(span, p0);
    			append_dev(p0, b0);
    			append_dev(p0, t2);
    			append_dev(p0, t3);
    			append_dev(span, t4);
    			append_dev(span, p1);
    			append_dev(p1, t5);
    			append_dev(p1, t6);
    			append_dev(p1, t7);
    			append_dev(div1, t8);
    			append_dev(div1, div0);
    			append_dev(div0, button0);
    			append_dev(button0, i0);
    			append_dev(div0, t9);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div10, t10);
    			append_dev(div10, div2);
    			append_dev(div2, p2);
    			append_dev(p2, b1);
    			append_dev(div2, t12);
    			if_block1.m(div2, null);
    			append_dev(div10, t13);
    			append_dev(div10, div3);
    			append_dev(div3, p3);
    			append_dev(p3, b2);
    			append_dev(div3, t15);
    			append_dev(div3, p4);
    			append_dev(p4, t16);
    			append_dev(div10, t17);
    			append_dev(div10, div4);
    			append_dev(div4, p5);
    			append_dev(p5, b3);
    			append_dev(div4, t19);
    			append_dev(div4, p6);
    			append_dev(p6, t20);
    			append_dev(div10, t21);
    			append_dev(div10, div5);
    			append_dev(div5, p7);
    			append_dev(p7, b4);
    			append_dev(div5, t23);
    			if_block2.m(div5, null);
    			append_dev(div10, t24);
    			append_dev(div10, div6);
    			append_dev(div6, p8);
    			append_dev(p8, b5);
    			append_dev(div6, t26);
    			append_dev(div6, p9);
    			if_block3.m(p9, null);
    			append_dev(div10, t27);
    			append_dev(div10, div9);
    			append_dev(div9, div7);
    			append_dev(div7, p10);
    			append_dev(p10, b6);
    			append_dev(b6, t28);
    			append_dev(b6, t29);
    			append_dev(b6, t30);
    			append_dev(div7, t31);
    			append_dev(div7, button1);
    			append_dev(button1, i1);
    			append_dev(div7, t32);
    			append_dev(div7, button2);
    			append_dev(button2, i2);
    			append_dev(div9, t33);
    			append_dev(div9, div8);
    			append_dev(div8, table);
    			append_dev(table, thead);
    			append_dev(thead, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t35);
    			append_dev(tr, th1);
    			append_dev(tr, t37);
    			append_dev(tr, th2);
    			append_dev(tr, t39);
    			append_dev(tr, th3);
    			append_dev(tr, t41);
    			append_dev(tr, th4);
    			append_dev(table, t43);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(tbody, null);
    				}
    			}

    			insert_dev(target, t44, anchor);
    			mount_component(acceptendorder, target, anchor);
    			insert_dev(target, t45, anchor);
    			mount_component(acceptdeleteorder, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[9], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_3*/ ctx[12], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_4*/ ctx[13], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const addproinormodal_changes = {};
    			if (dirty & /*order*/ 1) addproinormodal_changes.order_id = /*order*/ ctx[0].id;
    			if (dirty & /*show_add_pro*/ 128) addproinormodal_changes.show = /*show_add_pro*/ ctx[7];
    			if (dirty & /*show_add_pro*/ 128) addproinormodal_changes.close = /*func*/ ctx[8];
    			addproinormodal.$set(addproinormodal_changes);
    			if ((!current || dirty & /*order*/ 1) && t3_value !== (t3_value = /*order*/ ctx[0].title + "")) set_data_dev(t3, t3_value);
    			if ((!current || dirty & /*order*/ 1) && t5_value !== (t5_value = /*order*/ ctx[0].create_date.slice(0, 10) + "")) set_data_dev(t5, t5_value);
    			if ((!current || dirty & /*order*/ 1) && t7_value !== (t7_value = /*order*/ ctx[0].create_date.slice(11, 16) + "")) set_data_dev(t7, t7_value);

    			if (/*user_role*/ ctx[1] == 'admin') {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_3$1(ctx);
    					if_block0.c();
    					if_block0.m(div0, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div2, null);
    				}
    			}

    			if ((!current || dirty & /*order*/ 1) && t16_value !== (t16_value = /*order*/ ctx[0].desc + "")) set_data_dev(t16, t16_value);
    			if ((!current || dirty & /*order*/ 1) && t20_value !== (t20_value = /*order*/ ctx[0].user.name + "")) set_data_dev(t20, t20_value);

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block2) {
    				if_block2.p(ctx, dirty);
    			} else {
    				if_block2.d(1);
    				if_block2 = current_block_type_1(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(div5, null);
    				}
    			}

    			if (current_block_type_2 === (current_block_type_2 = select_block_type_2(ctx)) && if_block3) {
    				if_block3.p(ctx, dirty);
    			} else {
    				if_block3.d(1);
    				if_block3 = current_block_type_2(ctx);

    				if (if_block3) {
    					if_block3.c();
    					if_block3.m(p9, null);
    				}
    			}

    			if ((!current || dirty & /*order*/ 1) && t29_value !== (t29_value = /*order*/ ctx[0].products.length + "")) set_data_dev(t29, t29_value);

    			if (!current || dirty & /*show_btn*/ 32 && button1_class_value !== (button1_class_value = "px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100 " + (/*show_btn*/ ctx[5] ? "block" : "hidden"))) {
    				attr_dev(button1, "class", button1_class_value);
    			}

    			if (!current || dirty & /*close_btn*/ 64 && button2_class_value !== (button2_class_value = "px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100 " + (/*close_btn*/ ctx[6] ? "block" : "hidden"))) {
    				attr_dev(button2, "class", button2_class_value);
    			}

    			if (dirty & /*order*/ 1) {
    				each_value = /*order*/ ctx[0].products;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$9(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$9(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*show_products*/ 16 && div8_class_value !== (div8_class_value = "flex-col gap-2 " + (/*show_products*/ ctx[4] ? "flex" : "hidden"))) {
    				attr_dev(div8, "class", div8_class_value);
    			}

    			const acceptendorder_changes = {};
    			if (dirty & /*order*/ 1) acceptendorder_changes.id = /*order*/ ctx[0].id;
    			if (dirty & /*show_end*/ 4) acceptendorder_changes.show = /*show_end*/ ctx[2];
    			if (dirty & /*show_end*/ 4) acceptendorder_changes.close = /*func_1*/ ctx[14];
    			acceptendorder.$set(acceptendorder_changes);
    			const acceptdeleteorder_changes = {};
    			if (dirty & /*order*/ 1) acceptdeleteorder_changes.id = /*order*/ ctx[0].id;
    			if (dirty & /*show_delete*/ 8) acceptdeleteorder_changes.show = /*show_delete*/ ctx[3];
    			if (dirty & /*show_delete*/ 8) acceptdeleteorder_changes.close = /*func_2*/ ctx[15];
    			acceptdeleteorder.$set(acceptdeleteorder_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addproinormodal.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(acceptendorder.$$.fragment, local);
    			transition_in(acceptdeleteorder.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addproinormodal.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(acceptendorder.$$.fragment, local);
    			transition_out(acceptdeleteorder.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div10);
    			destroy_component(addproinormodal);
    			if (if_block0) if_block0.d();
    			if_block1.d();
    			if_block2.d();
    			if_block3.d();
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t44);
    			destroy_component(acceptendorder, detaching);
    			if (detaching) detach_dev(t45);
    			destroy_component(acceptdeleteorder, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('OrderComponent', slots, []);
    	const token = localStorage.getItem('token');
    	let { order } = $$props;
    	let { user_role } = $$props;
    	let show_end = false;
    	let show_edit = false;
    	let show_delete = false;

    	// buttons for products
    	let show_products = false;

    	let show_btn = true;
    	let close_btn = false;
    	let show_add_pro = false;

    	$$self.$$.on_mount.push(function () {
    		if (order === undefined && !('order' in $$props || $$self.$$.bound[$$self.$$.props['order']])) {
    			console.warn("<OrderComponent> was created without expected prop 'order'");
    		}

    		if (user_role === undefined && !('user_role' in $$props || $$self.$$.bound[$$self.$$.props['user_role']])) {
    			console.warn("<OrderComponent> was created without expected prop 'user_role'");
    		}
    	});

    	const writable_props = ['order', 'user_role'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<OrderComponent> was created with unknown prop '${key}'`);
    	});

    	const func = () => {
    		$$invalidate(7, show_add_pro = false);
    	};

    	const click_handler = () => {
    		$$invalidate(7, show_add_pro = true);
    	};

    	const click_handler_1 = () => {
    		$$invalidate(2, show_end = true);
    	};

    	const click_handler_2 = () => {
    		$$invalidate(3, show_delete = true);
    	};

    	const click_handler_3 = () => {
    		($$invalidate(4, show_products = true), $$invalidate(5, show_btn = false), $$invalidate(6, close_btn = true));
    	};

    	const click_handler_4 = () => {
    		($$invalidate(4, show_products = false), $$invalidate(6, close_btn = false), $$invalidate(5, show_btn = true));
    	};

    	const func_1 = () => {
    		$$invalidate(2, show_end = false);
    	};

    	const func_2 = () => $$invalidate(3, show_delete = false);

    	$$self.$$set = $$props => {
    		if ('order' in $$props) $$invalidate(0, order = $$props.order);
    		if ('user_role' in $$props) $$invalidate(1, user_role = $$props.user_role);
    	};

    	$$self.$capture_state = () => ({
    		OrderEndpoint,
    		AcceptEndOrder,
    		AcceptDeleteOrder,
    		AddProInOrModal,
    		ProInOrder,
    		token,
    		order,
    		user_role,
    		show_end,
    		show_edit,
    		show_delete,
    		show_products,
    		show_btn,
    		close_btn,
    		show_add_pro
    	});

    	$$self.$inject_state = $$props => {
    		if ('order' in $$props) $$invalidate(0, order = $$props.order);
    		if ('user_role' in $$props) $$invalidate(1, user_role = $$props.user_role);
    		if ('show_end' in $$props) $$invalidate(2, show_end = $$props.show_end);
    		if ('show_edit' in $$props) show_edit = $$props.show_edit;
    		if ('show_delete' in $$props) $$invalidate(3, show_delete = $$props.show_delete);
    		if ('show_products' in $$props) $$invalidate(4, show_products = $$props.show_products);
    		if ('show_btn' in $$props) $$invalidate(5, show_btn = $$props.show_btn);
    		if ('close_btn' in $$props) $$invalidate(6, close_btn = $$props.close_btn);
    		if ('show_add_pro' in $$props) $$invalidate(7, show_add_pro = $$props.show_add_pro);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		order,
    		user_role,
    		show_end,
    		show_delete,
    		show_products,
    		show_btn,
    		close_btn,
    		show_add_pro,
    		func,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		func_1,
    		func_2
    	];
    }

    class OrderComponent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { order: 0, user_role: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "OrderComponent",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get order() {
    		throw new Error("<OrderComponent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set order(value) {
    		throw new Error("<OrderComponent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get user_role() {
    		throw new Error("<OrderComponent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set user_role(value) {
    		throw new Error("<OrderComponent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\mobileAdmin\MobileOrders.svelte generated by Svelte v3.59.2 */

    const { console: console_1$9 } = globals;

    const file$f = "src\\mobileAdmin\\MobileOrders.svelte";

    function get_each_context$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    // (86:12) {:else}
    function create_else_block$6(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*$orderStore*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*user, $orderStore*/ 6) {
    				each_value = /*$orderStore*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$8(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$8(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$6.name,
    		type: "else",
    		source: "(86:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (84:12) {#if $orderStore.length == 0}
    function create_if_block$6(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Sizda faol buyurtmalar mavjud emas";
    			attr_dev(p, "class", "text-center text-sm text-gray-400 font-medium");
    			add_location(p, file$f, 84, 16, 2808);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(84:12) {#if $orderStore.length == 0}",
    		ctx
    	});

    	return block;
    }

    // (87:16) {#each $orderStore as order}
    function create_each_block$8(ctx) {
    	let ordercomponent;
    	let current;

    	ordercomponent = new OrderComponent({
    			props: {
    				user_role: /*user*/ ctx[2].role,
    				order: /*order*/ ctx[18]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(ordercomponent.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(ordercomponent, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const ordercomponent_changes = {};
    			if (dirty & /*$orderStore*/ 2) ordercomponent_changes.order = /*order*/ ctx[18];
    			ordercomponent.$set(ordercomponent_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(ordercomponent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(ordercomponent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(ordercomponent, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$8.name,
    		type: "each",
    		source: "(87:16) {#each $orderStore as order}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let t0;
    	let section;
    	let div1;
    	let h2;
    	let i0;
    	let t1;
    	let t2;
    	let div0;
    	let button0;
    	let i1;
    	let t3;
    	let addordermodal;
    	let t4;
    	let div3;
    	let div2;
    	let current_block_type_index;
    	let if_block;
    	let t5;
    	let div4;
    	let button1;
    	let i2;
    	let t6;
    	let p0;
    	let t8;
    	let button2;
    	let i3;
    	let t9;
    	let p1;
    	let t11;
    	let button3;
    	let i4;
    	let t12;
    	let p2;
    	let t14;
    	let button4;
    	let i5;
    	let t15;
    	let p3;
    	let t17;
    	let button5;
    	let i6;
    	let t18;
    	let p4;
    	let current;
    	let mounted;
    	let dispose;

    	addordermodal = new AddOrderModal({
    			props: {
    				show: /*show_add*/ ctx[0],
    				close: /*func*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const if_block_creators = [create_if_block$6, create_else_block$6];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$orderStore*/ ctx[1].length == 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			t0 = space();
    			section = element("section");
    			div1 = element("div");
    			h2 = element("h2");
    			i0 = element("i");
    			t1 = text(" Buyurtmalar");
    			t2 = space();
    			div0 = element("div");
    			button0 = element("button");
    			i1 = element("i");
    			t3 = space();
    			create_component(addordermodal.$$.fragment);
    			t4 = space();
    			div3 = element("div");
    			div2 = element("div");
    			if_block.c();
    			t5 = space();
    			div4 = element("div");
    			button1 = element("button");
    			i2 = element("i");
    			t6 = space();
    			p0 = element("p");
    			p0.textContent = "Asosiy";
    			t8 = space();
    			button2 = element("button");
    			i3 = element("i");
    			t9 = space();
    			p1 = element("p");
    			p1.textContent = "Buyurtmalar";
    			t11 = space();
    			button3 = element("button");
    			i4 = element("i");
    			t12 = space();
    			p2 = element("p");
    			p2.textContent = "Qo'shish";
    			t14 = space();
    			button4 = element("button");
    			i5 = element("i");
    			t15 = space();
    			p3 = element("p");
    			p3.textContent = "Xonalar";
    			t17 = space();
    			button5 = element("button");
    			i6 = element("i");
    			t18 = space();
    			p4 = element("p");
    			p4.textContent = "Profil";
    			document.title = "Buyurtmalar";
    			attr_dev(i0, "class", "bi bi-clipboard-fill text-2xl text-indigo-500");
    			add_location(i0, file$f, 75, 68, 2211);
    			attr_dev(h2, "class", "outline-none text-xl font-bold text-indigo-500");
    			add_location(h2, file$f, 75, 8, 2151);
    			attr_dev(i1, "class", "bi bi-plus");
    			add_location(i1, file$f, 77, 118, 2456);
    			attr_dev(button0, "class", "px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100");
    			add_location(button0, file$f, 77, 12, 2350);
    			attr_dev(div0, "class", "flex gap-1 items-center");
    			add_location(div0, file$f, 76, 8, 2299);
    			attr_dev(div1, "class", "grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-white p-3 h-fit");
    			add_location(div1, file$f, 74, 4, 2040);
    			attr_dev(div2, "class", "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-start");
    			add_location(div2, file$f, 82, 8, 2667);
    			attr_dev(div3, "class", "grow flex flex-col gap-3 p-3 h-fit");
    			add_location(div3, file$f, 81, 4, 2609);
    			attr_dev(i2, "class", "bi bi-house-fill text-2xl");
    			add_location(i2, file$f, 94, 12, 3371);
    			attr_dev(p0, "class", "text-[9px] font-bold");
    			add_location(p0, file$f, 95, 12, 3426);
    			attr_dev(button1, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button1, file$f, 93, 8, 3242);
    			attr_dev(i3, "class", "bi bi-clipboard-fill text-2xl");
    			add_location(i3, file$f, 98, 12, 3632);
    			attr_dev(p1, "class", "text-[9px] font-bold");
    			add_location(p1, file$f, 99, 12, 3691);
    			attr_dev(button2, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button2, file$f, 97, 8, 3497);
    			attr_dev(i4, "class", "bi bi-plus text-2xl");
    			add_location(i4, file$f, 102, 12, 3899);
    			attr_dev(p2, "class", "text-[9px] font-bold");
    			add_location(p2, file$f, 103, 12, 3948);
    			attr_dev(button3, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button3, file$f, 101, 8, 3767);
    			attr_dev(i5, "class", "bi bi-door-open-fill text-2xl");
    			add_location(i5, file$f, 106, 12, 4155);
    			attr_dev(p3, "class", "text-[9px] font-bold");
    			add_location(p3, file$f, 107, 12, 4214);
    			attr_dev(button4, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button4, file$f, 105, 8, 4021);
    			attr_dev(i6, "class", "bi bi-person-fill text-2xl");
    			add_location(i6, file$f, 110, 12, 4423);
    			attr_dev(p4, "class", "text-[10px] font-bold");
    			add_location(p4, file$f, 111, 12, 4479);
    			attr_dev(button5, "class", "flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl");
    			add_location(button5, file$f, 109, 8, 4286);
    			attr_dev(div4, "class", "grow-0 h-fit grid grid-cols-5 bg-white px-2 py-2 sticky bottom-0 right-0 left-0");
    			add_location(div4, file$f, 92, 4, 3139);
    			attr_dev(section, "class", "flex flex-col min-h-screen");
    			add_location(section, file$f, 73, 0, 1990);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div1);
    			append_dev(div1, h2);
    			append_dev(h2, i0);
    			append_dev(h2, t1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, button0);
    			append_dev(button0, i1);
    			append_dev(section, t3);
    			mount_component(addordermodal, section, null);
    			append_dev(section, t4);
    			append_dev(section, div3);
    			append_dev(div3, div2);
    			if_blocks[current_block_type_index].m(div2, null);
    			append_dev(section, t5);
    			append_dev(section, div4);
    			append_dev(div4, button1);
    			append_dev(button1, i2);
    			append_dev(button1, t6);
    			append_dev(button1, p0);
    			append_dev(div4, t8);
    			append_dev(div4, button2);
    			append_dev(button2, i3);
    			append_dev(button2, t9);
    			append_dev(button2, p1);
    			append_dev(div4, t11);
    			append_dev(div4, button3);
    			append_dev(button3, i4);
    			append_dev(button3, t12);
    			append_dev(button3, p2);
    			append_dev(div4, t14);
    			append_dev(div4, button4);
    			append_dev(button4, i5);
    			append_dev(button4, t15);
    			append_dev(button4, p3);
    			append_dev(div4, t17);
    			append_dev(div4, button5);
    			append_dev(button5, i6);
    			append_dev(button5, t18);
    			append_dev(button5, p4);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[3], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[5], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[6], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_3*/ ctx[7], false, false, false, false),
    					listen_dev(button4, "click", /*click_handler_4*/ ctx[8], false, false, false, false),
    					listen_dev(button5, "click", /*click_handler_5*/ ctx[9], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const addordermodal_changes = {};
    			if (dirty & /*show_add*/ 1) addordermodal_changes.show = /*show_add*/ ctx[0];
    			if (dirty & /*show_add*/ 1) addordermodal_changes.close = /*func*/ ctx[4];
    			addordermodal.$set(addordermodal_changes);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div2, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addordermodal.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addordermodal.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_component(addordermodal);
    			if_blocks[current_block_type_index].d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let $orderStore;
    	validate_store(orderStore, 'orderStore');
    	component_subscribe($$self, orderStore, $$value => $$invalidate(1, $orderStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MobileOrders', slots, []);
    	const user = JSON.parse(localStorage.getItem('user'));
    	const token = localStorage.getItem("token");
    	const userEndpoint = new UserEndpoint();

    	async function checkToken() {
    		try {
    			const res = await userEndpoint.getTokenVerify(token);

    			if (res.status == 200) {
    				if (res.data.user.role == "waiter") {
    					navigate('/wprofile');
    				} else {
    					localStorage.setItem("user", JSON.stringify(res.data.user));
    					console.log("Verify success");
    				}
    			}
    		} catch(error) {
    			navigate('/login');
    		}
    	}

    	if (!token || !user) {
    		localStorage.clear();
    		navigate('/login');
    	} else {
    		checkToken();
    	}

    	const roomEndpoint = new RoomEndpoint();
    	let show_add = false;
    	const orderEndpoint = new OrderEndpoint();
    	const productInOrderEndpoint = new ProductInOrderEndpoint();

    	// // get rooms
    	async function getRooms() {
    		try {
    			const res = await roomEndpoint.get(token);
    			const rooms = res.data.rooms;
    			roomStore.set(rooms);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getRooms();

    	// get orders to do
    	async function getTrueOrders() {
    		try {
    			const res = await orderEndpoint.getStatus(1, token);
    			const orders = res.data.orders;
    			orderStore.set(orders);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getTrueOrders();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$9.warn(`<MobileOrders> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(0, show_add = true);
    	const func = () => $$invalidate(0, show_add = false);

    	const click_handler_1 = () => {
    		navigate('/m');
    	};

    	const click_handler_2 = () => {
    		navigate('/morders');
    	};

    	const click_handler_3 = () => {
    		navigate('/madd');
    	};

    	const click_handler_4 = () => {
    		navigate('/mrooms');
    	};

    	const click_handler_5 = () => {
    		navigate('/mprofile');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		UserEndpoint,
    		user,
    		token,
    		userEndpoint,
    		checkToken,
    		orderStore,
    		productInOrderStore,
    		roomStore,
    		RoomEndpoint,
    		ProductEndpoint,
    		OrderEndpoint,
    		ProductInOrderEndpoint,
    		roomEndpoint,
    		AddOrderModal,
    		OrderComponent,
    		show_add,
    		orderEndpoint,
    		productInOrderEndpoint,
    		getRooms,
    		getTrueOrders,
    		$orderStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('show_add' in $$props) $$invalidate(0, show_add = $$props.show_add);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show_add,
    		$orderStore,
    		user,
    		click_handler,
    		func,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5
    	];
    }

    class MobileOrders extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MobileOrders",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src\components\RoomComponent.svelte generated by Svelte v3.59.2 */
    const file$e = "src\\components\\RoomComponent.svelte";

    // (36:12) {:else}
    function create_else_block$5(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Xona ochiq";
    			attr_dev(p, "class", "text-sm font-semibold px-4 py-1 rounded-2xl text-white bg-green-400");
    			add_location(p, file$e, 36, 16, 1891);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(36:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (34:12) {#if room_booked == true}
    function create_if_block$5(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Xona band";
    			attr_dev(p, "class", "text-sm font-semibold px-4 py-1 rounded-2xl text-white bg-red-400");
    			add_location(p, file$e, 34, 16, 1762);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(34:12) {#if room_booked == true}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let alert;
    	let t0;
    	let div5;
    	let img;
    	let img_src_value;
    	let t1;
    	let div4;
    	let div0;
    	let p0;
    	let t3;
    	let p1;
    	let t4;
    	let t5;
    	let div1;
    	let p2;
    	let t7;
    	let p3;
    	let t8;
    	let t9;
    	let t10;
    	let div2;
    	let p4;
    	let t12;
    	let p5;
    	let t13;
    	let t14;
    	let div3;
    	let p6;
    	let t16;
    	let current;

    	alert = new Alert({
    			props: {
    				show: /*showAlertModal*/ ctx[4],
    				close: /*func*/ ctx[5],
    				color: "red-500",
    				text: "Serverda xatolik. Iltimos dasturchi bilan bog'laning!",
    				icon: "x",
    				title: "Xatolik"
    			},
    			$$inline: true
    		});

    	function select_block_type(ctx, dirty) {
    		if (/*room_booked*/ ctx[3] == true) return create_if_block$5;
    		return create_else_block$5;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			create_component(alert.$$.fragment);
    			t0 = space();
    			div5 = element("div");
    			img = element("img");
    			t1 = space();
    			div4 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "Nomi:";
    			t3 = space();
    			p1 = element("p");
    			t4 = text(/*room_name*/ ctx[0]);
    			t5 = space();
    			div1 = element("div");
    			p2 = element("p");
    			p2.textContent = "Sig'imi:";
    			t7 = space();
    			p3 = element("p");
    			t8 = text(/*room_capacity*/ ctx[2]);
    			t9 = text(" kishilik");
    			t10 = space();
    			div2 = element("div");
    			p4 = element("p");
    			p4.textContent = "Ma'lumot:";
    			t12 = space();
    			p5 = element("p");
    			t13 = text(/*room_desc*/ ctx[1]);
    			t14 = space();
    			div3 = element("div");
    			p6 = element("p");
    			p6.textContent = "Holati:";
    			t16 = space();
    			if_block.c();
    			attr_dev(img, "class", "rounded-t-xl");
    			if (!src_url_equal(img.src, img_src_value = "https://b.zmtcdn.com/data/pictures/6/19877256/3275c38ad9d367b8a7acf16934344973.jpeg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$e, 17, 4, 713);
    			attr_dev(p0, "class", "text-sm font-bold");
    			add_location(p0, file$e, 20, 12, 982);
    			attr_dev(p1, "class", "text-md font-medium");
    			add_location(p1, file$e, 21, 12, 1034);
    			attr_dev(div0, "class", "flex justify-between items-center rounded-md bg-indigo-500/10 p-2");
    			add_location(div0, file$e, 19, 8, 889);
    			attr_dev(p2, "class", "text-sm font-bold");
    			add_location(p2, file$e, 24, 12, 1205);
    			attr_dev(p3, "class", "text-md font-medium");
    			add_location(p3, file$e, 25, 12, 1260);
    			attr_dev(div1, "class", "flex justify-between items-center rounded-md bg-indigo-500/10 px-3 py-2");
    			add_location(div1, file$e, 23, 8, 1106);
    			attr_dev(p4, "class", "text-sm font-bold");
    			add_location(p4, file$e, 28, 12, 1438);
    			attr_dev(p5, "class", "text-md font-medium");
    			add_location(p5, file$e, 29, 12, 1494);
    			attr_dev(div2, "class", "flex justify-between items-center rounded-md bg-indigo-500/10 p-2");
    			add_location(div2, file$e, 27, 8, 1345);
    			attr_dev(p6, "class", "text-sm font-bold");
    			add_location(p6, file$e, 32, 12, 1665);
    			attr_dev(div3, "class", "flex justify-between items-center rounded-md bg-indigo-500/10 px-3 py-2");
    			add_location(div3, file$e, 31, 8, 1566);
    			attr_dev(div4, "class", "flex flex-col gap-2 p-3");
    			add_location(div4, file$e, 18, 4, 842);
    			attr_dev(div5, "class", "flex flex-col shadow-md rounded-xl bg-white");
    			add_location(div5, file$e, 16, 0, 650);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(alert, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, img);
    			append_dev(div5, t1);
    			append_dev(div5, div4);
    			append_dev(div4, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t3);
    			append_dev(div0, p1);
    			append_dev(p1, t4);
    			append_dev(div4, t5);
    			append_dev(div4, div1);
    			append_dev(div1, p2);
    			append_dev(div1, t7);
    			append_dev(div1, p3);
    			append_dev(p3, t8);
    			append_dev(p3, t9);
    			append_dev(div4, t10);
    			append_dev(div4, div2);
    			append_dev(div2, p4);
    			append_dev(div2, t12);
    			append_dev(div2, p5);
    			append_dev(p5, t13);
    			append_dev(div4, t14);
    			append_dev(div4, div3);
    			append_dev(div3, p6);
    			append_dev(div3, t16);
    			if_block.m(div3, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const alert_changes = {};
    			if (dirty & /*showAlertModal*/ 16) alert_changes.show = /*showAlertModal*/ ctx[4];
    			if (dirty & /*showAlertModal*/ 16) alert_changes.close = /*func*/ ctx[5];
    			alert.$set(alert_changes);
    			if (!current || dirty & /*room_name*/ 1) set_data_dev(t4, /*room_name*/ ctx[0]);
    			if (!current || dirty & /*room_capacity*/ 4) set_data_dev(t8, /*room_capacity*/ ctx[2]);
    			if (!current || dirty & /*room_desc*/ 2) set_data_dev(t13, /*room_desc*/ ctx[1]);

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div3, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(alert.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(alert.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(alert, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div5);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RoomComponent', slots, []);
    	const roomEndpoint = new RoomEndpoint();
    	const token = localStorage.getItem("token");
    	let showAlertModal = false;
    	let { room_name } = $$props;
    	let { room_desc } = $$props;
    	let { room_capacity } = $$props;
    	let { room_booked } = $$props;
    	let show_delete = false;
    	let show_edit = false;

    	$$self.$$.on_mount.push(function () {
    		if (room_name === undefined && !('room_name' in $$props || $$self.$$.bound[$$self.$$.props['room_name']])) {
    			console.warn("<RoomComponent> was created without expected prop 'room_name'");
    		}

    		if (room_desc === undefined && !('room_desc' in $$props || $$self.$$.bound[$$self.$$.props['room_desc']])) {
    			console.warn("<RoomComponent> was created without expected prop 'room_desc'");
    		}

    		if (room_capacity === undefined && !('room_capacity' in $$props || $$self.$$.bound[$$self.$$.props['room_capacity']])) {
    			console.warn("<RoomComponent> was created without expected prop 'room_capacity'");
    		}

    		if (room_booked === undefined && !('room_booked' in $$props || $$self.$$.bound[$$self.$$.props['room_booked']])) {
    			console.warn("<RoomComponent> was created without expected prop 'room_booked'");
    		}
    	});

    	const writable_props = ['room_name', 'room_desc', 'room_capacity', 'room_booked'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RoomComponent> was created with unknown prop '${key}'`);
    	});

    	const func = () => $$invalidate(4, showAlertModal = false);

    	$$self.$$set = $$props => {
    		if ('room_name' in $$props) $$invalidate(0, room_name = $$props.room_name);
    		if ('room_desc' in $$props) $$invalidate(1, room_desc = $$props.room_desc);
    		if ('room_capacity' in $$props) $$invalidate(2, room_capacity = $$props.room_capacity);
    		if ('room_booked' in $$props) $$invalidate(3, room_booked = $$props.room_booked);
    	};

    	$$self.$capture_state = () => ({
    		RoomEndpoint,
    		roomStore,
    		Alert,
    		navigate,
    		roomEndpoint,
    		token,
    		showAlertModal,
    		room_name,
    		room_desc,
    		room_capacity,
    		room_booked,
    		show_delete,
    		show_edit
    	});

    	$$self.$inject_state = $$props => {
    		if ('showAlertModal' in $$props) $$invalidate(4, showAlertModal = $$props.showAlertModal);
    		if ('room_name' in $$props) $$invalidate(0, room_name = $$props.room_name);
    		if ('room_desc' in $$props) $$invalidate(1, room_desc = $$props.room_desc);
    		if ('room_capacity' in $$props) $$invalidate(2, room_capacity = $$props.room_capacity);
    		if ('room_booked' in $$props) $$invalidate(3, room_booked = $$props.room_booked);
    		if ('show_delete' in $$props) show_delete = $$props.show_delete;
    		if ('show_edit' in $$props) show_edit = $$props.show_edit;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [room_name, room_desc, room_capacity, room_booked, showAlertModal, func];
    }

    class RoomComponent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {
    			room_name: 0,
    			room_desc: 1,
    			room_capacity: 2,
    			room_booked: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RoomComponent",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get room_name() {
    		throw new Error("<RoomComponent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set room_name(value) {
    		throw new Error("<RoomComponent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get room_desc() {
    		throw new Error("<RoomComponent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set room_desc(value) {
    		throw new Error("<RoomComponent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get room_capacity() {
    		throw new Error("<RoomComponent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set room_capacity(value) {
    		throw new Error("<RoomComponent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get room_booked() {
    		throw new Error("<RoomComponent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set room_booked(value) {
    		throw new Error("<RoomComponent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\modalsAdmin\AddRoomModal.svelte generated by Svelte v3.59.2 */
    const file$d = "src\\modalsAdmin\\AddRoomModal.svelte";

    function create_fragment$e(ctx) {
    	let div7;
    	let alert;
    	let t0;
    	let div6;
    	let p0;
    	let t2;
    	let div4;
    	let div0;
    	let label0;
    	let t4;
    	let input0;
    	let t5;
    	let p1;
    	let t7;
    	let div1;
    	let label1;
    	let t9;
    	let input1;
    	let t10;
    	let div2;
    	let label2;
    	let t12;
    	let textarea;
    	let t13;
    	let div3;
    	let label3;
    	let t15;
    	let input2;
    	let t16;
    	let div5;
    	let button0;
    	let t18;
    	let button1;
    	let div7_class_value;
    	let current;
    	let mounted;
    	let dispose;

    	alert = new Alert({
    			props: {
    				close: /*func*/ ctx[12],
    				show: /*show_alert*/ ctx[6],
    				title: /*alert_title*/ ctx[7],
    				color: /*alert_color*/ ctx[8],
    				text: /*alert_text*/ ctx[9],
    				icon: /*alert_icon*/ ctx[10]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			create_component(alert.$$.fragment);
    			t0 = space();
    			div6 = element("div");
    			p0 = element("p");
    			p0.textContent = "Xona qo'shish";
    			t2 = space();
    			div4 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Nomi*:";
    			t4 = space();
    			input0 = element("input");
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "Xona nomi takrorlanmasligi kerak!";
    			t7 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Sig'imi*:";
    			t9 = space();
    			input1 = element("input");
    			t10 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Izoh*:";
    			t12 = space();
    			textarea = element("textarea");
    			t13 = space();
    			div3 = element("div");
    			label3 = element("label");
    			label3.textContent = "Admin parol*:";
    			t15 = space();
    			input2 = element("input");
    			t16 = space();
    			div5 = element("div");
    			button0 = element("button");
    			button0.textContent = "Yopish";
    			t18 = space();
    			button1 = element("button");
    			button1.textContent = "Qo'shish";
    			attr_dev(p0, "class", "text-xl text-center font-bold");
    			add_location(p0, file$d, 45, 8, 1686);
    			attr_dev(label0, "class", "font-semibold");
    			attr_dev(label0, "for", "");
    			add_location(label0, file$d, 49, 16, 1854);
    			attr_dev(input0, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "");
    			attr_dev(input0, "id", "");
    			attr_dev(input0, "placeholder", "Zal 1");
    			add_location(input0, file$d, 50, 16, 1922);
    			attr_dev(p1, "class", "text-red-500 font-medium");
    			add_location(p1, file$d, 51, 16, 2057);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$d, 48, 12, 1803);
    			attr_dev(label1, "class", "font-semibold");
    			attr_dev(label1, "for", "");
    			add_location(label1, file$d, 54, 16, 2215);
    			attr_dev(input1, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "");
    			attr_dev(input1, "id", "");
    			attr_dev(input1, "placeholder", "10");
    			add_location(input1, file$d, 55, 16, 2286);
    			attr_dev(div1, "class", "flex flex-col gap-2");
    			add_location(div1, file$d, 53, 12, 2164);
    			attr_dev(label2, "class", "font-semibold");
    			attr_dev(label2, "for", "desc");
    			add_location(label2, file$d, 58, 16, 2489);
    			attr_dev(textarea, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(textarea, "name", "desc");
    			attr_dev(textarea, "id", "");
    			attr_dev(textarea, "rows", "5");
    			attr_dev(textarea, "placeholder", "Salqin ichimliklar, Soklar va boshqa ichimliklar");
    			add_location(textarea, file$d, 59, 16, 2561);
    			attr_dev(div2, "class", "flex flex-col gap-2");
    			add_location(div2, file$d, 57, 12, 2438);
    			attr_dev(label3, "class", "font-semibold");
    			attr_dev(label3, "for", "");
    			add_location(label3, file$d, 62, 16, 2820);
    			attr_dev(input2, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "name", "");
    			attr_dev(input2, "id", "");
    			add_location(input2, file$d, 63, 16, 2895);
    			attr_dev(div3, "class", "flex flex-col gap-2");
    			add_location(div3, file$d, 61, 12, 2769);
    			attr_dev(div4, "class", "flex flex-col gap-3");
    			add_location(div4, file$d, 47, 8, 1756);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-400 font-bold");
    			add_location(button0, file$d, 68, 12, 3093);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-indigo-500 font-bold");
    			add_location(button1, file$d, 69, 12, 3216);
    			attr_dev(div5, "class", "flex justify-between");
    			add_location(div5, file$d, 67, 8, 3045);
    			attr_dev(div6, "class", "bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto");
    			add_location(div6, file$d, 43, 4, 1534);
    			attr_dev(div7, "class", div7_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div7, file$d, 41, 0, 1232);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			mount_component(alert, div7, null);
    			append_dev(div7, t0);
    			append_dev(div7, div6);
    			append_dev(div6, p0);
    			append_dev(div6, t2);
    			append_dev(div6, div4);
    			append_dev(div4, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t4);
    			append_dev(div0, input0);
    			set_input_value(input0, /*name*/ ctx[2]);
    			append_dev(div0, t5);
    			append_dev(div0, p1);
    			append_dev(div4, t7);
    			append_dev(div4, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t9);
    			append_dev(div1, input1);
    			set_input_value(input1, /*capacity*/ ctx[4]);
    			append_dev(div4, t10);
    			append_dev(div4, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t12);
    			append_dev(div2, textarea);
    			set_input_value(textarea, /*desc*/ ctx[3]);
    			append_dev(div4, t13);
    			append_dev(div4, div3);
    			append_dev(div3, label3);
    			append_dev(div3, t15);
    			append_dev(div3, input2);
    			set_input_value(input2, /*admin_key*/ ctx[5]);
    			append_dev(div6, t16);
    			append_dev(div6, div5);
    			append_dev(div5, button0);
    			append_dev(div5, t18);
    			append_dev(div5, button1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[13]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[14]),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[15]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[16]),
    					listen_dev(button0, "click", /*click_handler*/ ctx[17], false, false, false, false),
    					listen_dev(button1, "click", /*create*/ ctx[11], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const alert_changes = {};
    			if (dirty & /*show_alert*/ 64) alert_changes.close = /*func*/ ctx[12];
    			if (dirty & /*show_alert*/ 64) alert_changes.show = /*show_alert*/ ctx[6];
    			if (dirty & /*alert_title*/ 128) alert_changes.title = /*alert_title*/ ctx[7];
    			if (dirty & /*alert_color*/ 256) alert_changes.color = /*alert_color*/ ctx[8];
    			if (dirty & /*alert_text*/ 512) alert_changes.text = /*alert_text*/ ctx[9];
    			if (dirty & /*alert_icon*/ 1024) alert_changes.icon = /*alert_icon*/ ctx[10];
    			alert.$set(alert_changes);

    			if (dirty & /*name*/ 4 && input0.value !== /*name*/ ctx[2]) {
    				set_input_value(input0, /*name*/ ctx[2]);
    			}

    			if (dirty & /*capacity*/ 16 && input1.value !== /*capacity*/ ctx[4]) {
    				set_input_value(input1, /*capacity*/ ctx[4]);
    			}

    			if (dirty & /*desc*/ 8) {
    				set_input_value(textarea, /*desc*/ ctx[3]);
    			}

    			if (dirty & /*admin_key*/ 32 && input2.value !== /*admin_key*/ ctx[5]) {
    				set_input_value(input2, /*admin_key*/ ctx[5]);
    			}

    			if (!current || dirty & /*show*/ 1 && div7_class_value !== (div7_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div7, "class", div7_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(alert.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(alert.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			destroy_component(alert);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AddRoomModal', slots, []);
    	const roomEndpoint = new RoomEndpoint();
    	const token = localStorage.getItem('token');
    	let { show } = $$props;
    	let { close } = $$props;
    	let name;
    	let desc;
    	let capacity;
    	let admin_key;
    	let show_alert = false;
    	let alert_title;
    	let alert_color;
    	let alert_text;
    	let alert_icon;

    	function showAlert(title, color, text, icon) {
    		$$invalidate(6, show_alert = true);
    		$$invalidate(7, alert_title = title);
    		$$invalidate(9, alert_text = text);
    		$$invalidate(8, alert_color = color);
    		$$invalidate(10, alert_icon = icon);
    	}

    	async function create() {
    		try {
    			const res = await roomEndpoint.post(name, desc, +capacity, token, admin_key);
    			const room = res.data.room;
    			roomStore.update(rooms => rooms.concat([room]));
    			close();
    		} catch(error) {
    			if (error.response.status == 500) {
    				showAlert('Xatolik', 'red-500', 'Serverda xatolik. Iltimos dasturchiga murojat qiling', 'x');
    			} else if (error.response.status == 401) {
    				showAlert('Xatolik', 'red-500', "Admin parol noto'g'ri. Iltimos qaytadan urunib ko'ring", 'x');
    			}
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console.warn("<AddRoomModal> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console.warn("<AddRoomModal> was created without expected prop 'close'");
    		}
    	});

    	const writable_props = ['show', 'close'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AddRoomModal> was created with unknown prop '${key}'`);
    	});

    	const func = () => $$invalidate(6, show_alert = false);

    	function input0_input_handler() {
    		name = this.value;
    		$$invalidate(2, name);
    	}

    	function input1_input_handler() {
    		capacity = this.value;
    		$$invalidate(4, capacity);
    	}

    	function textarea_input_handler() {
    		desc = this.value;
    		$$invalidate(3, desc);
    	}

    	function input2_input_handler() {
    		admin_key = this.value;
    		$$invalidate(5, admin_key);
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    	};

    	$$self.$capture_state = () => ({
    		categoryStore,
    		roomStore,
    		RoomEndpoint,
    		Alert,
    		roomEndpoint,
    		token,
    		show,
    		close,
    		name,
    		desc,
    		capacity,
    		admin_key,
    		show_alert,
    		alert_title,
    		alert_color,
    		alert_text,
    		alert_icon,
    		showAlert,
    		create
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    		if ('desc' in $$props) $$invalidate(3, desc = $$props.desc);
    		if ('capacity' in $$props) $$invalidate(4, capacity = $$props.capacity);
    		if ('admin_key' in $$props) $$invalidate(5, admin_key = $$props.admin_key);
    		if ('show_alert' in $$props) $$invalidate(6, show_alert = $$props.show_alert);
    		if ('alert_title' in $$props) $$invalidate(7, alert_title = $$props.alert_title);
    		if ('alert_color' in $$props) $$invalidate(8, alert_color = $$props.alert_color);
    		if ('alert_text' in $$props) $$invalidate(9, alert_text = $$props.alert_text);
    		if ('alert_icon' in $$props) $$invalidate(10, alert_icon = $$props.alert_icon);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show,
    		close,
    		name,
    		desc,
    		capacity,
    		admin_key,
    		show_alert,
    		alert_title,
    		alert_color,
    		alert_text,
    		alert_icon,
    		create,
    		func,
    		input0_input_handler,
    		input1_input_handler,
    		textarea_input_handler,
    		input2_input_handler,
    		click_handler
    	];
    }

    class AddRoomModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { show: 0, close: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddRoomModal",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get show() {
    		throw new Error("<AddRoomModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<AddRoomModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<AddRoomModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<AddRoomModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\mobileAdmin\MobileRooms.svelte generated by Svelte v3.59.2 */

    const { console: console_1$8 } = globals;

    const file$c = "src\\mobileAdmin\\MobileRooms.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    // (65:12) {:else}
    function create_else_block$4(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*$roomStore*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$roomStore*/ 2) {
    				each_value = /*$roomStore*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$7(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$7(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(65:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (63:12) {#if $roomStore.length == 0}
    function create_if_block$4(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Xonalar mavjud emas";
    			attr_dev(p, "class", "text-center text-md text-gray-400 font-medium");
    			add_location(p, file$c, 63, 16, 2041);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(63:12) {#if $roomStore.length == 0}",
    		ctx
    	});

    	return block;
    }

    // (66:16) {#each $roomStore as room}
    function create_each_block$7(ctx) {
    	let roomcomponent;
    	let current;

    	roomcomponent = new RoomComponent({
    			props: {
    				room_booked: /*room*/ ctx[14].booked,
    				room_name: /*room*/ ctx[14].name,
    				room_capacity: /*room*/ ctx[14].capacity,
    				room_desc: /*room*/ ctx[14].desc
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(roomcomponent.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(roomcomponent, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const roomcomponent_changes = {};
    			if (dirty & /*$roomStore*/ 2) roomcomponent_changes.room_booked = /*room*/ ctx[14].booked;
    			if (dirty & /*$roomStore*/ 2) roomcomponent_changes.room_name = /*room*/ ctx[14].name;
    			if (dirty & /*$roomStore*/ 2) roomcomponent_changes.room_capacity = /*room*/ ctx[14].capacity;
    			if (dirty & /*$roomStore*/ 2) roomcomponent_changes.room_desc = /*room*/ ctx[14].desc;
    			roomcomponent.$set(roomcomponent_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(roomcomponent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(roomcomponent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(roomcomponent, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(66:16) {#each $roomStore as room}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let t0;
    	let section;
    	let div0;
    	let h2;
    	let i0;
    	let t1;
    	let t2;
    	let div2;
    	let addroommodal;
    	let t3;
    	let div1;
    	let current_block_type_index;
    	let if_block;
    	let t4;
    	let div3;
    	let button0;
    	let i1;
    	let t5;
    	let p0;
    	let t7;
    	let button1;
    	let i2;
    	let t8;
    	let p1;
    	let t10;
    	let button2;
    	let i3;
    	let t11;
    	let p2;
    	let t13;
    	let button3;
    	let i4;
    	let t14;
    	let p3;
    	let t16;
    	let button4;
    	let i5;
    	let t17;
    	let p4;
    	let current;
    	let mounted;
    	let dispose;

    	addroommodal = new AddRoomModal({
    			props: {
    				show: /*show_add*/ ctx[0],
    				close: /*func*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const if_block_creators = [create_if_block$4, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$roomStore*/ ctx[1].length == 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			t0 = space();
    			section = element("section");
    			div0 = element("div");
    			h2 = element("h2");
    			i0 = element("i");
    			t1 = text(" Xonalar");
    			t2 = space();
    			div2 = element("div");
    			create_component(addroommodal.$$.fragment);
    			t3 = space();
    			div1 = element("div");
    			if_block.c();
    			t4 = space();
    			div3 = element("div");
    			button0 = element("button");
    			i1 = element("i");
    			t5 = space();
    			p0 = element("p");
    			p0.textContent = "Asosiy";
    			t7 = space();
    			button1 = element("button");
    			i2 = element("i");
    			t8 = space();
    			p1 = element("p");
    			p1.textContent = "Buyurtmalar";
    			t10 = space();
    			button2 = element("button");
    			i3 = element("i");
    			t11 = space();
    			p2 = element("p");
    			p2.textContent = "Qo'shish";
    			t13 = space();
    			button3 = element("button");
    			i4 = element("i");
    			t14 = space();
    			p3 = element("p");
    			p3.textContent = "Xonalar";
    			t16 = space();
    			button4 = element("button");
    			i5 = element("i");
    			t17 = space();
    			p4 = element("p");
    			p4.textContent = "Profil";
    			document.title = "Xonalar";
    			attr_dev(i0, "class", "bi bi-door-open-fill text-2xl text-indigo-500");
    			add_location(i0, file$c, 57, 68, 1665);
    			attr_dev(h2, "class", "outline-none text-xl font-bold text-indigo-500");
    			add_location(h2, file$c, 57, 8, 1605);
    			attr_dev(div0, "class", "grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-white p-3 h-fit");
    			add_location(div0, file$c, 56, 4, 1494);
    			attr_dev(div1, "class", "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-start");
    			add_location(div1, file$c, 61, 8, 1901);
    			attr_dev(div2, "class", "grow flex flex-col gap-3 p-3 h-fit");
    			add_location(div2, file$c, 59, 4, 1757);
    			attr_dev(i1, "class", "bi bi-house-fill text-2xl");
    			add_location(i1, file$c, 73, 12, 2649);
    			attr_dev(p0, "class", "text-[9px] font-bold");
    			add_location(p0, file$c, 74, 12, 2704);
    			attr_dev(button0, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button0, file$c, 72, 8, 2520);
    			attr_dev(i2, "class", "bi bi-clipboard-fill text-2xl");
    			add_location(i2, file$c, 77, 12, 2910);
    			attr_dev(p1, "class", "text-[9px] font-bold");
    			add_location(p1, file$c, 78, 12, 2969);
    			attr_dev(button1, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button1, file$c, 76, 8, 2775);
    			attr_dev(i3, "class", "bi bi-plus text-2xl");
    			add_location(i3, file$c, 81, 12, 3177);
    			attr_dev(p2, "class", "text-[9px] font-bold");
    			add_location(p2, file$c, 82, 12, 3226);
    			attr_dev(button2, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button2, file$c, 80, 8, 3045);
    			attr_dev(i4, "class", "bi bi-door-open-fill text-2xl");
    			add_location(i4, file$c, 85, 12, 3434);
    			attr_dev(p3, "class", "text-[9px] font-bold");
    			add_location(p3, file$c, 86, 12, 3493);
    			attr_dev(button3, "class", "flex flex-col items-center gap-1 text-indigo-700 px-2 rounded-xl");
    			add_location(button3, file$c, 84, 8, 3299);
    			attr_dev(i5, "class", "bi bi-person-fill text-2xl");
    			add_location(i5, file$c, 89, 12, 3701);
    			attr_dev(p4, "class", "text-[10px] font-bold");
    			add_location(p4, file$c, 90, 12, 3757);
    			attr_dev(button4, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button4, file$c, 88, 8, 3565);
    			attr_dev(div3, "class", "grow-0 h-fit grid grid-cols-5 bg-white px-2 py-2 sticky bottom-0 right-0 left-0");
    			add_location(div3, file$c, 71, 4, 2417);
    			attr_dev(section, "class", "flex flex-col min-h-screen");
    			add_location(section, file$c, 55, 0, 1444);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, h2);
    			append_dev(h2, i0);
    			append_dev(h2, t1);
    			append_dev(section, t2);
    			append_dev(section, div2);
    			mount_component(addroommodal, div2, null);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			if_blocks[current_block_type_index].m(div1, null);
    			append_dev(section, t4);
    			append_dev(section, div3);
    			append_dev(div3, button0);
    			append_dev(button0, i1);
    			append_dev(button0, t5);
    			append_dev(button0, p0);
    			append_dev(div3, t7);
    			append_dev(div3, button1);
    			append_dev(button1, i2);
    			append_dev(button1, t8);
    			append_dev(button1, p1);
    			append_dev(div3, t10);
    			append_dev(div3, button2);
    			append_dev(button2, i3);
    			append_dev(button2, t11);
    			append_dev(button2, p2);
    			append_dev(div3, t13);
    			append_dev(div3, button3);
    			append_dev(button3, i4);
    			append_dev(button3, t14);
    			append_dev(button3, p3);
    			append_dev(div3, t16);
    			append_dev(div3, button4);
    			append_dev(button4, i5);
    			append_dev(button4, t17);
    			append_dev(button4, p4);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[3], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[4], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[5], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_3*/ ctx[6], false, false, false, false),
    					listen_dev(button4, "click", /*click_handler_4*/ ctx[7], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const addroommodal_changes = {};
    			if (dirty & /*show_add*/ 1) addroommodal_changes.show = /*show_add*/ ctx[0];
    			if (dirty & /*show_add*/ 1) addroommodal_changes.close = /*func*/ ctx[2];
    			addroommodal.$set(addroommodal_changes);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div1, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addroommodal.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addroommodal.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_component(addroommodal);
    			if_blocks[current_block_type_index].d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $roomStore;
    	validate_store(roomStore, 'roomStore');
    	component_subscribe($$self, roomStore, $$value => $$invalidate(1, $roomStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MobileRooms', slots, []);
    	const user = JSON.parse(localStorage.getItem('user'));
    	const token = localStorage.getItem("token");
    	const userEndpoint = new UserEndpoint();

    	async function checkToken() {
    		try {
    			const res = await userEndpoint.getTokenVerify(token);

    			if (res.status == 200) {
    				if (res.data.user.role == "waiter") {
    					navigate('/wrooms');
    				} else {
    					localStorage.setItem("user", JSON.stringify(res.data.user));
    					console.log("Verify success");
    				}
    			}
    		} catch(error) {
    			navigate('/login');
    		}
    	}

    	if (!token || !user) {
    		localStorage.clear();
    		navigate('/login');
    	} else {
    		checkToken();
    	}

    	let show_add = false;
    	const roomEndpoint = new RoomEndpoint();

    	// get rooms
    	async function getRooms() {
    		try {
    			const res = await roomEndpoint.get(token);
    			const rooms = res.data.rooms;
    			roomStore.set(rooms);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getRooms();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$8.warn(`<MobileRooms> was created with unknown prop '${key}'`);
    	});

    	const func = () => $$invalidate(0, show_add = false);

    	const click_handler = () => {
    		navigate('/m');
    	};

    	const click_handler_1 = () => {
    		navigate('/morders');
    	};

    	const click_handler_2 = () => {
    		navigate('/madd');
    	};

    	const click_handler_3 = () => {
    		navigate('/mrooms');
    	};

    	const click_handler_4 = () => {
    		navigate('/mprofile');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		roomStore,
    		RoomEndpoint,
    		UserEndpoint,
    		user,
    		token,
    		userEndpoint,
    		checkToken,
    		RoomComponent,
    		AddRoomModal,
    		show_add,
    		roomEndpoint,
    		getRooms,
    		$roomStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('show_add' in $$props) $$invalidate(0, show_add = $$props.show_add);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show_add,
    		$roomStore,
    		func,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	];
    }

    class MobileRooms extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MobileRooms",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src\modalsAdmin\AddProductModal.svelte generated by Svelte v3.59.2 */

    const { console: console_1$7 } = globals;
    const file$b = "src\\modalsAdmin\\AddProductModal.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    // (37:20) {#each $categoryStore as category}
    function create_each_block$6(ctx) {
    	let option;
    	let t_value = /*category*/ ctx[18].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*category*/ ctx[18].id;
    			option.value = option.__value;
    			add_location(option, file$b, 37, 24, 1613);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$categoryStore*/ 128 && t_value !== (t_value = /*category*/ ctx[18].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$categoryStore*/ 128 && option_value_value !== (option_value_value = /*category*/ ctx[18].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(37:20) {#each $categoryStore as category}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div8;
    	let div7;
    	let p0;
    	let t1;
    	let div5;
    	let div0;
    	let label0;
    	let t3;
    	let select;
    	let t4;
    	let div1;
    	let label1;
    	let t6;
    	let input0;
    	let t7;
    	let p1;
    	let t9;
    	let div2;
    	let label2;
    	let t11;
    	let input1;
    	let t12;
    	let div3;
    	let label3;
    	let t14;
    	let textarea;
    	let t15;
    	let div4;
    	let label4;
    	let t17;
    	let input2;
    	let t18;
    	let div6;
    	let button0;
    	let t20;
    	let button1;
    	let div8_class_value;
    	let mounted;
    	let dispose;
    	let each_value = /*$categoryStore*/ ctx[7];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div8 = element("div");
    			div7 = element("div");
    			p0 = element("p");
    			p0.textContent = "Mahsulot qo'shish";
    			t1 = space();
    			div5 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Kategoriya*:";
    			t3 = space();
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Nomi*:";
    			t6 = space();
    			input0 = element("input");
    			t7 = space();
    			p1 = element("p");
    			p1.textContent = "Mahsulot nomi takrorlanmasligi kerak!";
    			t9 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Narxi*:";
    			t11 = space();
    			input1 = element("input");
    			t12 = space();
    			div3 = element("div");
    			label3 = element("label");
    			label3.textContent = "Izoh*:";
    			t14 = space();
    			textarea = element("textarea");
    			t15 = space();
    			div4 = element("div");
    			label4 = element("label");
    			label4.textContent = "Admin parol*:";
    			t17 = space();
    			input2 = element("input");
    			t18 = space();
    			div6 = element("div");
    			button0 = element("button");
    			button0.textContent = "Yopish";
    			t20 = space();
    			button1 = element("button");
    			button1.textContent = "Qo'shish";
    			attr_dev(p0, "class", "text-xl text-center font-bold");
    			add_location(p0, file$b, 30, 8, 1182);
    			attr_dev(label0, "class", "font-semibold");
    			attr_dev(label0, "for", "desc");
    			add_location(label0, file$b, 34, 16, 1354);
    			attr_dev(select, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(select, "name", "category");
    			attr_dev(select, "id", "");
    			add_location(select, file$b, 35, 16, 1432);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$b, 33, 12, 1303);
    			attr_dev(label1, "class", "font-semibold");
    			attr_dev(label1, "for", "");
    			add_location(label1, file$b, 42, 16, 1808);
    			attr_dev(input0, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "");
    			attr_dev(input0, "id", "");
    			attr_dev(input0, "placeholder", "Coca Cola 1.5");
    			add_location(input0, file$b, 43, 16, 1876);
    			attr_dev(p1, "class", "text-red-500 font-medium");
    			add_location(p1, file$b, 44, 16, 2018);
    			attr_dev(div1, "class", "flex flex-col gap-2");
    			add_location(div1, file$b, 41, 12, 1757);
    			attr_dev(label2, "class", "font-semibold");
    			attr_dev(label2, "for", "desc");
    			add_location(label2, file$b, 47, 16, 2180);
    			attr_dev(input1, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "");
    			attr_dev(input1, "id", "");
    			attr_dev(input1, "placeholder", "10000");
    			add_location(input1, file$b, 48, 16, 2253);
    			attr_dev(div2, "class", "flex flex-col gap-2");
    			add_location(div2, file$b, 46, 12, 2129);
    			attr_dev(label3, "class", "font-semibold");
    			attr_dev(label3, "for", "desc");
    			add_location(label3, file$b, 51, 16, 2455);
    			attr_dev(textarea, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(textarea, "name", "desc");
    			attr_dev(textarea, "id", "");
    			attr_dev(textarea, "rows", "4");
    			attr_dev(textarea, "placeholder", "izoh uchun joy");
    			add_location(textarea, file$b, 52, 16, 2527);
    			attr_dev(div3, "class", "flex flex-col gap-2");
    			add_location(div3, file$b, 50, 12, 2404);
    			attr_dev(label4, "class", "font-semibold");
    			attr_dev(label4, "for", "admin-key");
    			add_location(label4, file$b, 55, 16, 2751);
    			attr_dev(input2, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "name", "admin-key");
    			attr_dev(input2, "id", "");
    			add_location(input2, file$b, 56, 16, 2835);
    			attr_dev(div4, "class", "flex flex-col gap-2");
    			add_location(div4, file$b, 54, 12, 2700);
    			attr_dev(div5, "class", "flex flex-col gap-3");
    			add_location(div5, file$b, 32, 8, 1256);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-600");
    			add_location(button0, file$b, 61, 12, 3042);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-green-600");
    			add_location(button1, file$b, 62, 12, 3155);
    			attr_dev(div6, "class", "flex justify-between");
    			add_location(div6, file$b, 60, 8, 2994);
    			attr_dev(div7, "class", "bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto");
    			add_location(div7, file$b, 28, 4, 1030);
    			attr_dev(div8, "class", div8_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div8, file$b, 27, 0, 877);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div8, anchor);
    			append_dev(div8, div7);
    			append_dev(div7, p0);
    			append_dev(div7, t1);
    			append_dev(div7, div5);
    			append_dev(div5, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t3);
    			append_dev(div0, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(select, null);
    				}
    			}

    			/*select_binding*/ ctx[9](select);
    			append_dev(div5, t4);
    			append_dev(div5, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t6);
    			append_dev(div1, input0);
    			/*input0_binding*/ ctx[10](input0);
    			append_dev(div1, t7);
    			append_dev(div1, p1);
    			append_dev(div5, t9);
    			append_dev(div5, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t11);
    			append_dev(div2, input1);
    			/*input1_binding*/ ctx[11](input1);
    			append_dev(div5, t12);
    			append_dev(div5, div3);
    			append_dev(div3, label3);
    			append_dev(div3, t14);
    			append_dev(div3, textarea);
    			/*textarea_binding*/ ctx[12](textarea);
    			append_dev(div5, t15);
    			append_dev(div5, div4);
    			append_dev(div4, label4);
    			append_dev(div4, t17);
    			append_dev(div4, input2);
    			set_input_value(input2, /*admin_key*/ ctx[6]);
    			append_dev(div7, t18);
    			append_dev(div7, div6);
    			append_dev(div6, button0);
    			append_dev(div6, t20);
    			append_dev(div6, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[13]),
    					listen_dev(button0, "click", /*click_handler*/ ctx[14], false, false, false, false),
    					listen_dev(button1, "click", /*create*/ ctx[8], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$categoryStore*/ 128) {
    				each_value = /*$categoryStore*/ ctx[7];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*admin_key*/ 64 && input2.value !== /*admin_key*/ ctx[6]) {
    				set_input_value(input2, /*admin_key*/ ctx[6]);
    			}

    			if (dirty & /*show*/ 1 && div8_class_value !== (div8_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div8, "class", div8_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div8);
    			destroy_each(each_blocks, detaching);
    			/*select_binding*/ ctx[9](null);
    			/*input0_binding*/ ctx[10](null);
    			/*input1_binding*/ ctx[11](null);
    			/*textarea_binding*/ ctx[12](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $categoryStore;
    	validate_store(categoryStore, 'categoryStore');
    	component_subscribe($$self, categoryStore, $$value => $$invalidate(7, $categoryStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AddProductModal', slots, []);
    	const categoryEndpoint = new CategoryEndpoint();
    	const productEndpoint = new ProductEndpoint();
    	const token = localStorage.getItem('token');
    	let { show } = $$props;
    	let { close } = $$props;
    	let name;
    	let desc;
    	let price;
    	let category_id;
    	let admin_key;

    	async function create() {
    		try {
    			const res = await productEndpoint.post(+category_id.value, name.value, +price.value, desc.value, token, admin_key);
    			const product = res.data.product;

    			productStore.update(pro => {
    				return pro.concat(product);
    			});

    			const categories = (await categoryEndpoint.get()).data.categories;
    			categoryStore.set(categories);
    			close();
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console_1$7.warn("<AddProductModal> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console_1$7.warn("<AddProductModal> was created without expected prop 'close'");
    		}
    	});

    	const writable_props = ['show', 'close'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$7.warn(`<AddProductModal> was created with unknown prop '${key}'`);
    	});

    	function select_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			category_id = $$value;
    			$$invalidate(5, category_id);
    		});
    	}

    	function input0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			name = $$value;
    			$$invalidate(2, name);
    		});
    	}

    	function input1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			price = $$value;
    			$$invalidate(4, price);
    		});
    	}

    	function textarea_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			desc = $$value;
    			$$invalidate(3, desc);
    		});
    	}

    	function input2_input_handler() {
    		admin_key = this.value;
    		$$invalidate(6, admin_key);
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    	};

    	$$self.$capture_state = () => ({
    		categoryStore,
    		productStore,
    		CategoryEndpoint,
    		ProductEndpoint,
    		categoryEndpoint,
    		productEndpoint,
    		token,
    		show,
    		close,
    		name,
    		desc,
    		price,
    		category_id,
    		admin_key,
    		create,
    		$categoryStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    		if ('desc' in $$props) $$invalidate(3, desc = $$props.desc);
    		if ('price' in $$props) $$invalidate(4, price = $$props.price);
    		if ('category_id' in $$props) $$invalidate(5, category_id = $$props.category_id);
    		if ('admin_key' in $$props) $$invalidate(6, admin_key = $$props.admin_key);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show,
    		close,
    		name,
    		desc,
    		price,
    		category_id,
    		admin_key,
    		$categoryStore,
    		create,
    		select_binding,
    		input0_binding,
    		input1_binding,
    		textarea_binding,
    		input2_input_handler,
    		click_handler
    	];
    }

    class AddProductModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { show: 0, close: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddProductModal",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get show() {
    		throw new Error("<AddProductModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<AddProductModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<AddProductModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<AddProductModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\modalsAdmin\AddCategoryModal.svelte generated by Svelte v3.59.2 */

    const { console: console_1$6 } = globals;
    const file$a = "src\\modalsAdmin\\AddCategoryModal.svelte";

    function create_fragment$b(ctx) {
    	let div6;
    	let div5;
    	let p0;
    	let t1;
    	let div3;
    	let div0;
    	let label0;
    	let t3;
    	let input0;
    	let t4;
    	let p1;
    	let t6;
    	let div1;
    	let label1;
    	let t8;
    	let textarea;
    	let t9;
    	let div2;
    	let label2;
    	let t11;
    	let input1;
    	let t12;
    	let div4;
    	let button0;
    	let t14;
    	let button1;
    	let div6_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div5 = element("div");
    			p0 = element("p");
    			p0.textContent = "Kategoriya qo'shish";
    			t1 = space();
    			div3 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Nomi*:";
    			t3 = space();
    			input0 = element("input");
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = "Kategoriya nomi takrorlanmasligi kerak!";
    			t6 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Izoh*:";
    			t8 = space();
    			textarea = element("textarea");
    			t9 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Admin parol*:";
    			t11 = space();
    			input1 = element("input");
    			t12 = space();
    			div4 = element("div");
    			button0 = element("button");
    			button0.textContent = "Yopish";
    			t14 = space();
    			button1 = element("button");
    			button1.textContent = "Qo'shish";
    			attr_dev(p0, "class", "text-xl text-center font-bold");
    			add_location(p0, file$a, 24, 8, 880);
    			attr_dev(label0, "class", "font-semibold");
    			attr_dev(label0, "for", "category-name");
    			add_location(label0, file$a, 28, 16, 1054);
    			attr_dev(input0, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "category-name");
    			attr_dev(input0, "id", "");
    			attr_dev(input0, "placeholder", "Ichimliklar");
    			add_location(input0, file$a, 29, 16, 1135);
    			attr_dev(p1, "class", "text-red-500 font-medium");
    			add_location(p1, file$a, 30, 16, 1289);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$a, 27, 12, 1003);
    			attr_dev(label1, "class", "font-semibold");
    			attr_dev(label1, "for", "category-desc");
    			add_location(label1, file$a, 33, 16, 1453);
    			attr_dev(textarea, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(textarea, "name", "category-desc");
    			attr_dev(textarea, "id", "");
    			attr_dev(textarea, "rows", "5");
    			attr_dev(textarea, "placeholder", "Salqin ichimliklar, Soklar va boshqa ichimliklar");
    			add_location(textarea, file$a, 34, 16, 1534);
    			attr_dev(div1, "class", "flex flex-col gap-2");
    			add_location(div1, file$a, 32, 12, 1402);
    			attr_dev(label2, "class", "font-semibold");
    			attr_dev(label2, "for", "admin-key");
    			add_location(label2, file$a, 37, 16, 1802);
    			attr_dev(input1, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "admin-key");
    			attr_dev(input1, "id", "");
    			add_location(input1, file$a, 38, 16, 1886);
    			attr_dev(div2, "class", "flex flex-col gap-2");
    			add_location(div2, file$a, 36, 12, 1751);
    			attr_dev(div3, "class", "flex flex-col gap-3");
    			add_location(div3, file$a, 26, 8, 956);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-600");
    			add_location(button0, file$a, 43, 12, 2093);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-green-600");
    			add_location(button1, file$a, 44, 12, 2206);
    			attr_dev(div4, "class", "flex justify-between");
    			add_location(div4, file$a, 42, 8, 2045);
    			attr_dev(div5, "class", "bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto");
    			add_location(div5, file$a, 22, 4, 728);
    			attr_dev(div6, "class", div6_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div6, file$a, 21, 0, 575);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div5);
    			append_dev(div5, p0);
    			append_dev(div5, t1);
    			append_dev(div5, div3);
    			append_dev(div3, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t3);
    			append_dev(div0, input0);
    			set_input_value(input0, /*name*/ ctx[2]);
    			append_dev(div0, t4);
    			append_dev(div0, p1);
    			append_dev(div3, t6);
    			append_dev(div3, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t8);
    			append_dev(div1, textarea);
    			set_input_value(textarea, /*desc*/ ctx[3]);
    			append_dev(div3, t9);
    			append_dev(div3, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t11);
    			append_dev(div2, input1);
    			set_input_value(input1, /*admin_key*/ ctx[4]);
    			append_dev(div5, t12);
    			append_dev(div5, div4);
    			append_dev(div4, button0);
    			append_dev(div4, t14);
    			append_dev(div4, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[6]),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[7]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[8]),
    					listen_dev(button0, "click", /*click_handler*/ ctx[9], false, false, false, false),
    					listen_dev(button1, "click", /*create*/ ctx[5], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 4 && input0.value !== /*name*/ ctx[2]) {
    				set_input_value(input0, /*name*/ ctx[2]);
    			}

    			if (dirty & /*desc*/ 8) {
    				set_input_value(textarea, /*desc*/ ctx[3]);
    			}

    			if (dirty & /*admin_key*/ 16 && input1.value !== /*admin_key*/ ctx[4]) {
    				set_input_value(input1, /*admin_key*/ ctx[4]);
    			}

    			if (dirty & /*show*/ 1 && div6_class_value !== (div6_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div6, "class", div6_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AddCategoryModal', slots, []);
    	const categoryEndpoint = new CategoryEndpoint();
    	const token = localStorage.getItem('token');
    	let { show } = $$props;
    	let { close } = $$props;
    	let name;
    	let desc;
    	let admin_key;

    	async function create() {
    		try {
    			const res = await categoryEndpoint.post(name, desc, token, admin_key);

    			categoryStore.update(cat => {
    				return cat.concat(res.data.category);
    			});

    			close();
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console_1$6.warn("<AddCategoryModal> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console_1$6.warn("<AddCategoryModal> was created without expected prop 'close'");
    		}
    	});

    	const writable_props = ['show', 'close'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$6.warn(`<AddCategoryModal> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		name = this.value;
    		$$invalidate(2, name);
    	}

    	function textarea_input_handler() {
    		desc = this.value;
    		$$invalidate(3, desc);
    	}

    	function input1_input_handler() {
    		admin_key = this.value;
    		$$invalidate(4, admin_key);
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    	};

    	$$self.$capture_state = () => ({
    		categoryStore,
    		CategoryEndpoint,
    		categoryEndpoint,
    		token,
    		show,
    		close,
    		name,
    		desc,
    		admin_key,
    		create
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    		if ('desc' in $$props) $$invalidate(3, desc = $$props.desc);
    		if ('admin_key' in $$props) $$invalidate(4, admin_key = $$props.admin_key);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show,
    		close,
    		name,
    		desc,
    		admin_key,
    		create,
    		input0_input_handler,
    		textarea_input_handler,
    		input1_input_handler,
    		click_handler
    	];
    }

    class AddCategoryModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { show: 0, close: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddCategoryModal",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get show() {
    		throw new Error("<AddCategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<AddCategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<AddCategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<AddCategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\modalsAdmin\AddUserModal.svelte generated by Svelte v3.59.2 */

    const { console: console_1$5 } = globals;
    const file$9 = "src\\modalsAdmin\\AddUserModal.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    // (34:20) {#each $roleStore as role}
    function create_each_block$5(ctx) {
    	let option;
    	let t_value = /*role*/ ctx[10].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*role*/ ctx[10].id;
    			option.value = option.__value;
    			add_location(option, file$9, 34, 24, 1410);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$roleStore*/ 512 && t_value !== (t_value = /*role*/ ctx[10].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$roleStore*/ 512 && option_value_value !== (option_value_value = /*role*/ ctx[10].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(34:20) {#each $roleStore as role}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div11;
    	let div10;
    	let p;
    	let t1;
    	let div8;
    	let div0;
    	let label0;
    	let t3;
    	let select;
    	let t4;
    	let div1;
    	let label1;
    	let t6;
    	let input0;
    	let t7;
    	let div2;
    	let label2;
    	let t9;
    	let input1;
    	let t10;
    	let div3;
    	let label3;
    	let t12;
    	let input2;
    	let t13;
    	let div4;
    	let label4;
    	let t15;
    	let input3;
    	let t16;
    	let div5;
    	let label5;
    	let t18;
    	let input4;
    	let t19;
    	let div6;
    	let label6;
    	let t21;
    	let input5;
    	let t22;
    	let div7;
    	let label7;
    	let t24;
    	let input6;
    	let t25;
    	let div9;
    	let button0;
    	let t27;
    	let button1;
    	let div11_class_value;
    	let mounted;
    	let dispose;
    	let each_value = /*$roleStore*/ ctx[9];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div11 = element("div");
    			div10 = element("div");
    			p = element("p");
    			p.textContent = "Ishchi qo'shish";
    			t1 = space();
    			div8 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Roli*:";
    			t3 = space();
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Ismi*:";
    			t6 = space();
    			input0 = element("input");
    			t7 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Username*:";
    			t9 = space();
    			input1 = element("input");
    			t10 = space();
    			div3 = element("div");
    			label3 = element("label");
    			label3.textContent = "Parol*:";
    			t12 = space();
    			input2 = element("input");
    			t13 = space();
    			div4 = element("div");
    			label4 = element("label");
    			label4.textContent = "Telefon*:";
    			t15 = space();
    			input3 = element("input");
    			t16 = space();
    			div5 = element("div");
    			label5 = element("label");
    			label5.textContent = "Email*:";
    			t18 = space();
    			input4 = element("input");
    			t19 = space();
    			div6 = element("div");
    			label6 = element("label");
    			label6.textContent = "Oylik maosh*:";
    			t21 = space();
    			input5 = element("input");
    			t22 = space();
    			div7 = element("div");
    			label7 = element("label");
    			label7.textContent = "Admin parol*:";
    			t24 = space();
    			input6 = element("input");
    			t25 = space();
    			div9 = element("div");
    			button0 = element("button");
    			button0.textContent = "Yopish";
    			t27 = space();
    			button1 = element("button");
    			button1.textContent = "Qo'shish";
    			attr_dev(p, "class", "text-xl text-center font-bold");
    			add_location(p, file$9, 28, 8, 999);
    			attr_dev(label0, "class", "font-semibold");
    			attr_dev(label0, "for", "desc");
    			add_location(label0, file$9, 31, 16, 1172);
    			attr_dev(select, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(select, "name", "category");
    			attr_dev(select, "id", "");
    			add_location(select, file$9, 32, 16, 1244);
    			attr_dev(div0, "class", "role flex flex-col gap-2");
    			add_location(div0, file$9, 30, 12, 1116);
    			attr_dev(label1, "class", "font-semibold");
    			attr_dev(label1, "for", "fullname");
    			add_location(label1, file$9, 39, 16, 1602);
    			attr_dev(input0, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "fullname");
    			attr_dev(input0, "id", "");
    			attr_dev(input0, "placeholder", "Eshmatov Toshmat");
    			add_location(input0, file$9, 40, 16, 1678);
    			attr_dev(div1, "class", "name flex flex-col gap-2");
    			add_location(div1, file$9, 38, 12, 1546);
    			attr_dev(label2, "class", "font-semibold");
    			attr_dev(label2, "for", "username");
    			add_location(label2, file$9, 43, 16, 1898);
    			attr_dev(input1, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "username");
    			attr_dev(input1, "id", "");
    			attr_dev(input1, "placeholder", "toshmat");
    			add_location(input1, file$9, 44, 16, 1978);
    			attr_dev(div2, "class", "flex flex-col gap-2");
    			add_location(div2, file$9, 42, 12, 1847);
    			attr_dev(label3, "class", "font-semibold");
    			attr_dev(label3, "for", "password");
    			add_location(label3, file$9, 47, 16, 2193);
    			attr_dev(input2, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "name", "password");
    			attr_dev(input2, "id", "");
    			attr_dev(input2, "placeholder", "parol");
    			add_location(input2, file$9, 48, 16, 2270);
    			attr_dev(div3, "class", "flex flex-col gap-2");
    			add_location(div3, file$9, 46, 12, 2142);
    			attr_dev(label4, "class", "font-semibold");
    			attr_dev(label4, "for", "phone");
    			add_location(label4, file$9, 51, 16, 2484);
    			attr_dev(input3, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input3, "type", "text");
    			attr_dev(input3, "name", "phone");
    			attr_dev(input3, "id", "");
    			attr_dev(input3, "placeholder", "+998905789204");
    			add_location(input3, file$9, 52, 16, 2560);
    			attr_dev(div4, "class", "flex flex-col gap-2");
    			add_location(div4, file$9, 50, 12, 2433);
    			attr_dev(label5, "class", "font-semibold");
    			attr_dev(label5, "for", "email");
    			add_location(label5, file$9, 55, 16, 2776);
    			attr_dev(input4, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input4, "type", "email");
    			attr_dev(input4, "name", "email");
    			attr_dev(input4, "id", "");
    			attr_dev(input4, "placeholder", "eshmatovtoshmat@gmail.com");
    			add_location(input4, file$9, 56, 16, 2850);
    			attr_dev(div5, "class", "flex flex-col gap-2");
    			add_location(div5, file$9, 54, 12, 2725);
    			attr_dev(label6, "class", "font-semibold");
    			attr_dev(label6, "for", "salary");
    			add_location(label6, file$9, 59, 16, 3079);
    			attr_dev(input5, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input5, "type", "text");
    			attr_dev(input5, "name", "salary");
    			attr_dev(input5, "id", "");
    			attr_dev(input5, "placeholder", "2000000");
    			add_location(input5, file$9, 60, 16, 3160);
    			attr_dev(div6, "class", "flex flex-col gap-2");
    			add_location(div6, file$9, 58, 12, 3028);
    			attr_dev(label7, "class", "font-semibold");
    			attr_dev(label7, "for", "admin-key");
    			add_location(label7, file$9, 63, 16, 3372);
    			attr_dev(input6, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input6, "type", "text");
    			attr_dev(input6, "name", "admin-key");
    			attr_dev(input6, "id", "");
    			add_location(input6, file$9, 64, 16, 3456);
    			attr_dev(div7, "class", "flex flex-col gap-2");
    			add_location(div7, file$9, 62, 12, 3321);
    			attr_dev(div8, "class", "flex flex-col gap-3");
    			add_location(div8, file$9, 29, 8, 1069);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-600");
    			add_location(button0, file$9, 69, 12, 3662);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-green-600");
    			add_location(button1, file$9, 70, 12, 3775);
    			attr_dev(div9, "class", "flex justify-between");
    			add_location(div9, file$9, 68, 8, 3614);
    			attr_dev(div10, "class", "bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto");
    			add_location(div10, file$9, 27, 4, 849);
    			attr_dev(div11, "class", div11_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div11, file$9, 26, 0, 696);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div11, anchor);
    			append_dev(div11, div10);
    			append_dev(div10, p);
    			append_dev(div10, t1);
    			append_dev(div10, div8);
    			append_dev(div8, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t3);
    			append_dev(div0, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(select, null);
    				}
    			}

    			/*select_binding*/ ctx[12](select);
    			append_dev(div8, t4);
    			append_dev(div8, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t6);
    			append_dev(div1, input0);
    			/*input0_binding*/ ctx[13](input0);
    			append_dev(div8, t7);
    			append_dev(div8, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t9);
    			append_dev(div2, input1);
    			/*input1_binding*/ ctx[14](input1);
    			append_dev(div8, t10);
    			append_dev(div8, div3);
    			append_dev(div3, label3);
    			append_dev(div3, t12);
    			append_dev(div3, input2);
    			/*input2_binding*/ ctx[15](input2);
    			append_dev(div8, t13);
    			append_dev(div8, div4);
    			append_dev(div4, label4);
    			append_dev(div4, t15);
    			append_dev(div4, input3);
    			/*input3_binding*/ ctx[16](input3);
    			append_dev(div8, t16);
    			append_dev(div8, div5);
    			append_dev(div5, label5);
    			append_dev(div5, t18);
    			append_dev(div5, input4);
    			/*input4_binding*/ ctx[17](input4);
    			append_dev(div8, t19);
    			append_dev(div8, div6);
    			append_dev(div6, label6);
    			append_dev(div6, t21);
    			append_dev(div6, input5);
    			/*input5_binding*/ ctx[18](input5);
    			append_dev(div8, t22);
    			append_dev(div8, div7);
    			append_dev(div7, label7);
    			append_dev(div7, t24);
    			append_dev(div7, input6);
    			/*input6_binding*/ ctx[19](input6);
    			append_dev(div10, t25);
    			append_dev(div10, div9);
    			append_dev(div9, button0);
    			append_dev(div9, t27);
    			append_dev(div9, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[20], false, false, false, false),
    					listen_dev(button1, "click", /*create*/ ctx[11], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$roleStore*/ 512) {
    				each_value = /*$roleStore*/ ctx[9];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*show*/ 1 && div11_class_value !== (div11_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div11, "class", div11_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div11);
    			destroy_each(each_blocks, detaching);
    			/*select_binding*/ ctx[12](null);
    			/*input0_binding*/ ctx[13](null);
    			/*input1_binding*/ ctx[14](null);
    			/*input2_binding*/ ctx[15](null);
    			/*input3_binding*/ ctx[16](null);
    			/*input4_binding*/ ctx[17](null);
    			/*input5_binding*/ ctx[18](null);
    			/*input6_binding*/ ctx[19](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let $roleStore;
    	validate_store(roleStore, 'roleStore');
    	component_subscribe($$self, roleStore, $$value => $$invalidate(9, $roleStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AddUserModal', slots, []);
    	const userEndpoint = new UserEndpoint();
    	let { show } = $$props;
    	let { close } = $$props;
    	let name;
    	let username;
    	let password;
    	let phone;
    	let email;
    	let salary;
    	let role;
    	let admin_key;

    	async function create() {
    		try {
    			const res = await userEndpoint.register(name.value, username.value, password.value, +salary.value, +role.value, phone.value, email.value, admin_key.value);
    			const user = res.data.user;

    			userStore.update(pro => {
    				return pro.concat(user);
    			});

    			close();
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console_1$5.warn("<AddUserModal> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console_1$5.warn("<AddUserModal> was created without expected prop 'close'");
    		}
    	});

    	const writable_props = ['show', 'close'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$5.warn(`<AddUserModal> was created with unknown prop '${key}'`);
    	});

    	function select_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			role = $$value;
    			$$invalidate(10, role);
    		});
    	}

    	function input0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			name = $$value;
    			$$invalidate(2, name);
    		});
    	}

    	function input1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			username = $$value;
    			$$invalidate(3, username);
    		});
    	}

    	function input2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			password = $$value;
    			$$invalidate(4, password);
    		});
    	}

    	function input3_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			phone = $$value;
    			$$invalidate(5, phone);
    		});
    	}

    	function input4_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			email = $$value;
    			$$invalidate(6, email);
    		});
    	}

    	function input5_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			salary = $$value;
    			$$invalidate(7, salary);
    		});
    	}

    	function input6_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			admin_key = $$value;
    			$$invalidate(8, admin_key);
    		});
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    	};

    	$$self.$capture_state = () => ({
    		userStore,
    		roleStore,
    		UserEndpoint,
    		userEndpoint,
    		show,
    		close,
    		name,
    		username,
    		password,
    		phone,
    		email,
    		salary,
    		role,
    		admin_key,
    		create,
    		$roleStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    		if ('username' in $$props) $$invalidate(3, username = $$props.username);
    		if ('password' in $$props) $$invalidate(4, password = $$props.password);
    		if ('phone' in $$props) $$invalidate(5, phone = $$props.phone);
    		if ('email' in $$props) $$invalidate(6, email = $$props.email);
    		if ('salary' in $$props) $$invalidate(7, salary = $$props.salary);
    		if ('role' in $$props) $$invalidate(10, role = $$props.role);
    		if ('admin_key' in $$props) $$invalidate(8, admin_key = $$props.admin_key);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show,
    		close,
    		name,
    		username,
    		password,
    		phone,
    		email,
    		salary,
    		admin_key,
    		$roleStore,
    		role,
    		create,
    		select_binding,
    		input0_binding,
    		input1_binding,
    		input2_binding,
    		input3_binding,
    		input4_binding,
    		input5_binding,
    		input6_binding,
    		click_handler
    	];
    }

    class AddUserModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { show: 0, close: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddUserModal",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get show() {
    		throw new Error("<AddUserModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<AddUserModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<AddUserModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<AddUserModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\modalsAdmin\AddRoleModal.svelte generated by Svelte v3.59.2 */
    const file$8 = "src\\modalsAdmin\\AddRoleModal.svelte";

    function create_fragment$9(ctx) {
    	let div5;
    	let alert;
    	let t0;
    	let div4;
    	let p0;
    	let t2;
    	let div2;
    	let div0;
    	let label0;
    	let t4;
    	let input0;
    	let t5;
    	let p1;
    	let t7;
    	let div1;
    	let label1;
    	let t9;
    	let input1;
    	let t10;
    	let div3;
    	let button0;
    	let t12;
    	let button1;
    	let div5_class_value;
    	let current;
    	let mounted;
    	let dispose;

    	alert = new Alert({
    			props: {
    				close: /*func*/ ctx[10],
    				show: /*show_alert*/ ctx[4],
    				title: /*alert_title*/ ctx[5],
    				color: /*alert_color*/ ctx[6],
    				text: /*alert_text*/ ctx[7],
    				icon: /*alert_icon*/ ctx[8]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			create_component(alert.$$.fragment);
    			t0 = space();
    			div4 = element("div");
    			p0 = element("p");
    			p0.textContent = "Rol qo'shish";
    			t2 = space();
    			div2 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Nomi*:";
    			t4 = space();
    			input0 = element("input");
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "Rol nomi takrorlanmasligi kerak!";
    			t7 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Admin parol*:";
    			t9 = space();
    			input1 = element("input");
    			t10 = space();
    			div3 = element("div");
    			button0 = element("button");
    			button0.textContent = "Yopish";
    			t12 = space();
    			button1 = element("button");
    			button1.textContent = "Qo'shish";
    			attr_dev(p0, "class", "text-xl text-center font-bold");
    			add_location(p0, file$8, 45, 8, 1742);
    			attr_dev(label0, "class", "font-semibold");
    			attr_dev(label0, "for", "");
    			add_location(label0, file$8, 49, 16, 1909);
    			attr_dev(input0, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "");
    			attr_dev(input0, "id", "");
    			attr_dev(input0, "placeholder", "admin");
    			add_location(input0, file$8, 50, 16, 1977);
    			attr_dev(p1, "class", "text-red-500 font-medium");
    			add_location(p1, file$8, 51, 16, 2112);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$8, 48, 12, 1858);
    			attr_dev(label1, "class", "font-semibold");
    			attr_dev(label1, "for", "");
    			add_location(label1, file$8, 54, 16, 2269);
    			attr_dev(input1, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "");
    			attr_dev(input1, "id", "");
    			add_location(input1, file$8, 55, 16, 2344);
    			attr_dev(div1, "class", "flex flex-col gap-2");
    			add_location(div1, file$8, 53, 12, 2218);
    			attr_dev(div2, "class", "flex flex-col gap-3");
    			add_location(div2, file$8, 47, 8, 1811);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-400 font-bold");
    			add_location(button0, file$8, 60, 12, 2542);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-indigo-500 font-bold");
    			add_location(button1, file$8, 61, 12, 2665);
    			attr_dev(div3, "class", "flex justify-between");
    			add_location(div3, file$8, 59, 8, 2494);
    			attr_dev(div4, "class", "bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto");
    			add_location(div4, file$8, 43, 4, 1590);
    			attr_dev(div5, "class", div5_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div5, file$8, 41, 0, 1288);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			mount_component(alert, div5, null);
    			append_dev(div5, t0);
    			append_dev(div5, div4);
    			append_dev(div4, p0);
    			append_dev(div4, t2);
    			append_dev(div4, div2);
    			append_dev(div2, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t4);
    			append_dev(div0, input0);
    			set_input_value(input0, /*name*/ ctx[2]);
    			append_dev(div0, t5);
    			append_dev(div0, p1);
    			append_dev(div2, t7);
    			append_dev(div2, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t9);
    			append_dev(div1, input1);
    			set_input_value(input1, /*admin_key*/ ctx[3]);
    			append_dev(div4, t10);
    			append_dev(div4, div3);
    			append_dev(div3, button0);
    			append_dev(div3, t12);
    			append_dev(div3, button1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[11]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[12]),
    					listen_dev(button0, "click", /*click_handler*/ ctx[13], false, false, false, false),
    					listen_dev(button1, "click", /*create*/ ctx[9], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const alert_changes = {};
    			if (dirty & /*show_alert*/ 16) alert_changes.close = /*func*/ ctx[10];
    			if (dirty & /*show_alert*/ 16) alert_changes.show = /*show_alert*/ ctx[4];
    			if (dirty & /*alert_title*/ 32) alert_changes.title = /*alert_title*/ ctx[5];
    			if (dirty & /*alert_color*/ 64) alert_changes.color = /*alert_color*/ ctx[6];
    			if (dirty & /*alert_text*/ 128) alert_changes.text = /*alert_text*/ ctx[7];
    			if (dirty & /*alert_icon*/ 256) alert_changes.icon = /*alert_icon*/ ctx[8];
    			alert.$set(alert_changes);

    			if (dirty & /*name*/ 4 && input0.value !== /*name*/ ctx[2]) {
    				set_input_value(input0, /*name*/ ctx[2]);
    			}

    			if (dirty & /*admin_key*/ 8 && input1.value !== /*admin_key*/ ctx[3]) {
    				set_input_value(input1, /*admin_key*/ ctx[3]);
    			}

    			if (!current || dirty & /*show*/ 1 && div5_class_value !== (div5_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div5, "class", div5_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(alert.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(alert.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			destroy_component(alert);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AddRoleModal', slots, []);
    	const roleEndpoint = new RoleEndpoint();
    	let { show } = $$props;
    	let { close } = $$props;
    	let name;
    	let admin_key;
    	let show_alert = false;
    	let alert_title;
    	let alert_color;
    	let alert_text;
    	let alert_icon;

    	function showAlert(title, color, text, icon) {
    		$$invalidate(4, show_alert = true);
    		$$invalidate(5, alert_title = title);
    		$$invalidate(7, alert_text = text);
    		$$invalidate(6, alert_color = color);
    		$$invalidate(8, alert_icon = icon);
    	}

    	async function create() {
    		try {
    			const res = await roleEndpoint.post(name, admin_key);
    			const role = res.data.role;
    			roleStore.update(roles => roles.concat([role]));
    			close();
    		} catch(error) {
    			if (error.response.status == 500) {
    				showAlert('Xatolik', 'red-500', 'Serverda xatolik. Iltimos dasturchiga murojat qiling', 'x');
    			} else if (error.response.status == 401) {
    				showAlert('Xatolik', 'red-500', "Admin parol noto'g'ri. Iltimos qaytadan urunib ko'ring", 'x');
    			} else if (error.response.status == 401) {
    				showAlert('Xatolik', 'red-500', "Iltimos admin parolni yozib qaytadan urunib ko'ring", 'x');
    			}
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console.warn("<AddRoleModal> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console.warn("<AddRoleModal> was created without expected prop 'close'");
    		}
    	});

    	const writable_props = ['show', 'close'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AddRoleModal> was created with unknown prop '${key}'`);
    	});

    	const func = () => $$invalidate(4, show_alert = false);

    	function input0_input_handler() {
    		name = this.value;
    		$$invalidate(2, name);
    	}

    	function input1_input_handler() {
    		admin_key = this.value;
    		$$invalidate(3, admin_key);
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    	};

    	$$self.$capture_state = () => ({
    		roleStore,
    		RoleEndpoint,
    		Alert,
    		roleEndpoint,
    		show,
    		close,
    		name,
    		admin_key,
    		show_alert,
    		alert_title,
    		alert_color,
    		alert_text,
    		alert_icon,
    		showAlert,
    		create
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    		if ('admin_key' in $$props) $$invalidate(3, admin_key = $$props.admin_key);
    		if ('show_alert' in $$props) $$invalidate(4, show_alert = $$props.show_alert);
    		if ('alert_title' in $$props) $$invalidate(5, alert_title = $$props.alert_title);
    		if ('alert_color' in $$props) $$invalidate(6, alert_color = $$props.alert_color);
    		if ('alert_text' in $$props) $$invalidate(7, alert_text = $$props.alert_text);
    		if ('alert_icon' in $$props) $$invalidate(8, alert_icon = $$props.alert_icon);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show,
    		close,
    		name,
    		admin_key,
    		show_alert,
    		alert_title,
    		alert_color,
    		alert_text,
    		alert_icon,
    		create,
    		func,
    		input0_input_handler,
    		input1_input_handler,
    		click_handler
    	];
    }

    class AddRoleModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { show: 0, close: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddRoleModal",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get show() {
    		throw new Error("<AddRoleModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<AddRoleModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<AddRoleModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<AddRoleModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\modalsAdmin\AcceptDeleteRoom.svelte generated by Svelte v3.59.2 */
    const file$7 = "src\\modalsAdmin\\AcceptDeleteRoom.svelte";

    function create_fragment$8(ctx) {
    	let div3;
    	let div2;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let div0;
    	let label;
    	let t5;
    	let input;
    	let t6;
    	let div1;
    	let button0;
    	let t8;
    	let button1;
    	let div3_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			p0 = element("p");
    			p0.textContent = "Xona o'chirish";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Xonani o'chirishni tasdiqlaysizmi?";
    			t3 = space();
    			div0 = element("div");
    			label = element("label");
    			label.textContent = "Admin parol*:";
    			t5 = space();
    			input = element("input");
    			t6 = space();
    			div1 = element("div");
    			button0 = element("button");
    			button0.textContent = "Yopish";
    			t8 = space();
    			button1 = element("button");
    			button1.textContent = "Tasdiqlash";
    			attr_dev(p0, "class", "text-xl text-center font-bold");
    			add_location(p0, file$7, 23, 8, 868);
    			attr_dev(p1, "class", "text-sm");
    			add_location(p1, file$7, 24, 8, 937);
    			attr_dev(label, "class", "font-semibold text-md");
    			attr_dev(label, "for", "");
    			add_location(label, file$7, 26, 12, 1051);
    			attr_dev(input, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "");
    			attr_dev(input, "id", "");
    			attr_dev(input, "placeholder", "parol");
    			add_location(input, file$7, 27, 12, 1130);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$7, 25, 8, 1004);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-500 font-semibold");
    			add_location(button0, file$7, 30, 12, 1332);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold");
    			add_location(button1, file$7, 31, 12, 1459);
    			attr_dev(div1, "class", "flex justify-between gap-3");
    			add_location(div1, file$7, 29, 8, 1278);
    			attr_dev(div2, "class", "bg-white p-8 flex flex-col gap-3 h-fit w-fit rounded-md shadow-md");
    			add_location(div2, file$7, 22, 4, 779);
    			attr_dev(div3, "class", div3_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"));
    			add_location(div3, file$7, 21, 0, 626);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, p0);
    			append_dev(div2, t1);
    			append_dev(div2, p1);
    			append_dev(div2, t3);
    			append_dev(div2, div0);
    			append_dev(div0, label);
    			append_dev(div0, t5);
    			append_dev(div0, input);
    			set_input_value(input, /*admin_key*/ ctx[2]);
    			append_dev(div2, t6);
    			append_dev(div2, div1);
    			append_dev(div1, button0);
    			append_dev(div1, t8);
    			append_dev(div1, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[5]),
    					listen_dev(button0, "click", /*click_handler*/ ctx[6], false, false, false, false),
    					listen_dev(button1, "click", /*deleteRoom*/ ctx[3], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*admin_key*/ 4 && input.value !== /*admin_key*/ ctx[2]) {
    				set_input_value(input, /*admin_key*/ ctx[2]);
    			}

    			if (dirty & /*show*/ 1 && div3_class_value !== (div3_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[0] ? "flex" : "hidden"))) {
    				attr_dev(div3, "class", div3_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AcceptDeleteRoom', slots, []);
    	const roomEndpoint = new RoomEndpoint();
    	const token = localStorage.getItem('token');
    	let { show } = $$props;
    	let { close } = $$props;
    	let { id } = $$props;
    	let admin_key;

    	async function deleteRoom() {
    		try {
    			const res = await roomEndpoint.delete(id, token, admin_key);
    			const room_deleted = res.data.room;

    			roomStore.update(rooms => {
    				return rooms.filter(room => room.id !== room_deleted.id);
    			});

    			close();
    		} catch(error) {
    			alert(error.response.data.message);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console.warn("<AcceptDeleteRoom> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console.warn("<AcceptDeleteRoom> was created without expected prop 'close'");
    		}

    		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
    			console.warn("<AcceptDeleteRoom> was created without expected prop 'id'");
    		}
    	});

    	const writable_props = ['show', 'close', 'id'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AcceptDeleteRoom> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		admin_key = this.value;
    		$$invalidate(2, admin_key);
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('id' in $$props) $$invalidate(4, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		RoomEndpoint,
    		roomStore,
    		roomEndpoint,
    		token,
    		show,
    		close,
    		id,
    		admin_key,
    		deleteRoom
    	});

    	$$self.$inject_state = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(1, close = $$props.close);
    		if ('id' in $$props) $$invalidate(4, id = $$props.id);
    		if ('admin_key' in $$props) $$invalidate(2, admin_key = $$props.admin_key);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [show, close, admin_key, deleteRoom, id, input_input_handler, click_handler];
    }

    class AcceptDeleteRoom extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { show: 0, close: 1, id: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AcceptDeleteRoom",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get show() {
    		throw new Error("<AcceptDeleteRoom>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<AcceptDeleteRoom>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<AcceptDeleteRoom>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<AcceptDeleteRoom>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<AcceptDeleteRoom>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<AcceptDeleteRoom>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\modalsAdmin\EditRoomModal.svelte generated by Svelte v3.59.2 */
    const file$6 = "src\\modalsAdmin\\EditRoomModal.svelte";

    function create_fragment$7(ctx) {
    	let div7;
    	let div6;
    	let p0;
    	let t1;
    	let div4;
    	let div0;
    	let label0;
    	let t3;
    	let input0;
    	let t4;
    	let p1;
    	let t6;
    	let div1;
    	let label1;
    	let t8;
    	let input1;
    	let t9;
    	let div2;
    	let label2;
    	let t11;
    	let textarea;
    	let t12;
    	let div3;
    	let label3;
    	let t14;
    	let input2;
    	let t15;
    	let div5;
    	let button0;
    	let t17;
    	let button1;
    	let div7_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div6 = element("div");
    			p0 = element("p");
    			p0.textContent = "Xona tahrirlash";
    			t1 = space();
    			div4 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Nomi*:";
    			t3 = space();
    			input0 = element("input");
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = "Xona nomi takrorlanmasligi kerak!";
    			t6 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Sig'imi*:";
    			t8 = space();
    			input1 = element("input");
    			t9 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Izoh*:";
    			t11 = space();
    			textarea = element("textarea");
    			t12 = space();
    			div3 = element("div");
    			label3 = element("label");
    			label3.textContent = "Admin parol*:";
    			t14 = space();
    			input2 = element("input");
    			t15 = space();
    			div5 = element("div");
    			button0 = element("button");
    			button0.textContent = "Yopish";
    			t17 = space();
    			button1 = element("button");
    			button1.textContent = "Saqlash";
    			attr_dev(p0, "class", "text-xl text-center font-bold");
    			add_location(p0, file$6, 28, 8, 1065);
    			attr_dev(label0, "class", "font-semibold");
    			attr_dev(label0, "for", "");
    			add_location(label0, file$6, 32, 16, 1235);
    			attr_dev(input0, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "");
    			attr_dev(input0, "id", "");
    			attr_dev(input0, "placeholder", "Zal 1");
    			add_location(input0, file$6, 33, 16, 1303);
    			attr_dev(p1, "class", "text-red-500 font-medium");
    			add_location(p1, file$6, 34, 16, 1438);
    			attr_dev(div0, "class", "flex flex-col gap-2");
    			add_location(div0, file$6, 31, 12, 1184);
    			attr_dev(label1, "class", "font-semibold");
    			attr_dev(label1, "for", "");
    			add_location(label1, file$6, 37, 16, 1596);
    			attr_dev(input1, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "");
    			attr_dev(input1, "id", "");
    			attr_dev(input1, "placeholder", "10");
    			add_location(input1, file$6, 38, 16, 1667);
    			attr_dev(div1, "class", "flex flex-col gap-2");
    			add_location(div1, file$6, 36, 12, 1545);
    			attr_dev(label2, "class", "font-semibold");
    			attr_dev(label2, "for", "desc");
    			add_location(label2, file$6, 41, 16, 1870);
    			attr_dev(textarea, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(textarea, "name", "desc");
    			attr_dev(textarea, "id", "");
    			attr_dev(textarea, "rows", "5");
    			attr_dev(textarea, "placeholder", "Salqin ichimliklar, Soklar va boshqa ichimliklar");
    			add_location(textarea, file$6, 42, 16, 1942);
    			attr_dev(div2, "class", "flex flex-col gap-2");
    			add_location(div2, file$6, 40, 12, 1819);
    			attr_dev(label3, "class", "font-semibold");
    			attr_dev(label3, "for", "");
    			add_location(label3, file$6, 45, 16, 2201);
    			attr_dev(input2, "class", "outline-0 border-2 px-3 py-1 rounded");
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "name", "");
    			attr_dev(input2, "id", "");
    			attr_dev(input2, "placeholder", "parol");
    			add_location(input2, file$6, 46, 16, 2276);
    			attr_dev(div3, "class", "flex flex-col gap-2");
    			add_location(div3, file$6, 44, 12, 2150);
    			attr_dev(div4, "class", "flex flex-col gap-3");
    			add_location(div4, file$6, 30, 8, 1137);
    			attr_dev(button0, "class", "py-2 px-4 rounded-md text-white bg-red-400 font-bold");
    			add_location(button0, file$6, 51, 12, 2494);
    			attr_dev(button1, "class", "py-2 px-4 rounded-md text-white bg-indigo-500 font-bold");
    			add_location(button1, file$6, 52, 12, 2617);
    			attr_dev(div5, "class", "flex justify-between");
    			add_location(div5, file$6, 50, 8, 2446);
    			attr_dev(div6, "class", "bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto");
    			add_location(div6, file$6, 26, 4, 913);
    			attr_dev(div7, "class", div7_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[3] ? "flex" : "hidden"));
    			add_location(div7, file$6, 25, 0, 760);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div6, p0);
    			append_dev(div6, t1);
    			append_dev(div6, div4);
    			append_dev(div4, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t3);
    			append_dev(div0, input0);
    			set_input_value(input0, /*name*/ ctx[0]);
    			append_dev(div0, t4);
    			append_dev(div0, p1);
    			append_dev(div4, t6);
    			append_dev(div4, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t8);
    			append_dev(div1, input1);
    			set_input_value(input1, /*capacity*/ ctx[2]);
    			append_dev(div4, t9);
    			append_dev(div4, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t11);
    			append_dev(div2, textarea);
    			set_input_value(textarea, /*desc*/ ctx[1]);
    			append_dev(div4, t12);
    			append_dev(div4, div3);
    			append_dev(div3, label3);
    			append_dev(div3, t14);
    			append_dev(div3, input2);
    			set_input_value(input2, /*admin_key*/ ctx[5]);
    			append_dev(div6, t15);
    			append_dev(div6, div5);
    			append_dev(div5, button0);
    			append_dev(div5, t17);
    			append_dev(div5, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[8]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[9]),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[10]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[11]),
    					listen_dev(button0, "click", /*click_handler*/ ctx[12], false, false, false, false),
    					listen_dev(button1, "click", /*edit*/ ctx[6], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1 && input0.value !== /*name*/ ctx[0]) {
    				set_input_value(input0, /*name*/ ctx[0]);
    			}

    			if (dirty & /*capacity*/ 4 && input1.value !== /*capacity*/ ctx[2]) {
    				set_input_value(input1, /*capacity*/ ctx[2]);
    			}

    			if (dirty & /*desc*/ 2) {
    				set_input_value(textarea, /*desc*/ ctx[1]);
    			}

    			if (dirty & /*admin_key*/ 32 && input2.value !== /*admin_key*/ ctx[5]) {
    				set_input_value(input2, /*admin_key*/ ctx[5]);
    			}

    			if (dirty & /*show*/ 8 && div7_class_value !== (div7_class_value = "h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (/*show*/ ctx[3] ? "flex" : "hidden"))) {
    				attr_dev(div7, "class", div7_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('EditRoomModal', slots, []);
    	const roomEndpoint = new RoomEndpoint();
    	const token = localStorage.getItem('token');
    	let admin_key;
    	let { show } = $$props;
    	let { close } = $$props;
    	let { id } = $$props;
    	let { name } = $$props;
    	let { desc } = $$props;
    	let { capacity } = $$props;

    	async function edit() {
    		try {
    			const res = await roomEndpoint.put(id, name, desc, capacity, token, admin_key);
    			const room = res.data.room;

    			roomStore.update(rooms => {
    				return rooms.filter(r => r.id !== room.id);
    			});

    			roomStore.update(rooms => {
    				return rooms.concat(room);
    			});

    			close();
    		} catch(error) {
    			alert(error.response.data.message);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
    			console.warn("<EditRoomModal> was created without expected prop 'show'");
    		}

    		if (close === undefined && !('close' in $$props || $$self.$$.bound[$$self.$$.props['close']])) {
    			console.warn("<EditRoomModal> was created without expected prop 'close'");
    		}

    		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
    			console.warn("<EditRoomModal> was created without expected prop 'id'");
    		}

    		if (name === undefined && !('name' in $$props || $$self.$$.bound[$$self.$$.props['name']])) {
    			console.warn("<EditRoomModal> was created without expected prop 'name'");
    		}

    		if (desc === undefined && !('desc' in $$props || $$self.$$.bound[$$self.$$.props['desc']])) {
    			console.warn("<EditRoomModal> was created without expected prop 'desc'");
    		}

    		if (capacity === undefined && !('capacity' in $$props || $$self.$$.bound[$$self.$$.props['capacity']])) {
    			console.warn("<EditRoomModal> was created without expected prop 'capacity'");
    		}
    	});

    	const writable_props = ['show', 'close', 'id', 'name', 'desc', 'capacity'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<EditRoomModal> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		name = this.value;
    		$$invalidate(0, name);
    	}

    	function input1_input_handler() {
    		capacity = this.value;
    		$$invalidate(2, capacity);
    	}

    	function textarea_input_handler() {
    		desc = this.value;
    		$$invalidate(1, desc);
    	}

    	function input2_input_handler() {
    		admin_key = this.value;
    		$$invalidate(5, admin_key);
    	}

    	const click_handler = () => close();

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(3, show = $$props.show);
    		if ('close' in $$props) $$invalidate(4, close = $$props.close);
    		if ('id' in $$props) $$invalidate(7, id = $$props.id);
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('desc' in $$props) $$invalidate(1, desc = $$props.desc);
    		if ('capacity' in $$props) $$invalidate(2, capacity = $$props.capacity);
    	};

    	$$self.$capture_state = () => ({
    		categoryStore,
    		roomStore,
    		RoomEndpoint,
    		roomEndpoint,
    		token,
    		admin_key,
    		show,
    		close,
    		id,
    		name,
    		desc,
    		capacity,
    		edit
    	});

    	$$self.$inject_state = $$props => {
    		if ('admin_key' in $$props) $$invalidate(5, admin_key = $$props.admin_key);
    		if ('show' in $$props) $$invalidate(3, show = $$props.show);
    		if ('close' in $$props) $$invalidate(4, close = $$props.close);
    		if ('id' in $$props) $$invalidate(7, id = $$props.id);
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('desc' in $$props) $$invalidate(1, desc = $$props.desc);
    		if ('capacity' in $$props) $$invalidate(2, capacity = $$props.capacity);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		desc,
    		capacity,
    		show,
    		close,
    		admin_key,
    		edit,
    		id,
    		input0_input_handler,
    		input1_input_handler,
    		textarea_input_handler,
    		input2_input_handler,
    		click_handler
    	];
    }

    class EditRoomModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			show: 3,
    			close: 4,
    			id: 7,
    			name: 0,
    			desc: 1,
    			capacity: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EditRoomModal",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get show() {
    		throw new Error("<EditRoomModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<EditRoomModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<EditRoomModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<EditRoomModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<EditRoomModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<EditRoomModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<EditRoomModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<EditRoomModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get desc() {
    		throw new Error("<EditRoomModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desc(value) {
    		throw new Error("<EditRoomModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get capacity() {
    		throw new Error("<EditRoomModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set capacity(value) {
    		throw new Error("<EditRoomModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\mobileAdmin\MobileAdd.svelte generated by Svelte v3.59.2 */

    const { console: console_1$4 } = globals;

    const file$5 = "src\\mobileAdmin\\MobileAdd.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[68] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[27] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[73] = list[i];
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[76] = list[i];
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[79] = list[i];
    	return child_ctx;
    }

    // (201:24) {:else}
    function create_else_block_6(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-down");
    			add_location(i, file$5, 201, 130, 5814);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-green-500 text-xl text-gray-100");
    			add_location(button, file$5, 201, 28, 5712);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideCategories*/ ctx[22], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_6.name,
    		type: "else",
    		source: "(201:24) {:else}",
    		ctx
    	});

    	return block;
    }

    // (199:24) {#if showCategories}
    function create_if_block_6(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-up");
    			add_location(i, file$5, 199, 130, 5609);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-green-500 text-xl text-gray-100");
    			add_location(button, file$5, 199, 28, 5507);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideCategories*/ ctx[22], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(199:24) {#if showCategories}",
    		ctx
    	});

    	return block;
    }

    // (222:20) {#each $categoryStore as category}
    function create_each_block_4(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*category*/ ctx[79].id + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = /*category*/ ctx[79].name + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = /*category*/ ctx[79].products.length + "";
    	let t4;
    	let t5;
    	let td3;
    	let div;
    	let button0;
    	let i0;
    	let t6;
    	let button1;
    	let i1;
    	let t7;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			td3 = element("td");
    			div = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t6 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t7 = space();
    			attr_dev(td0, "class", "border border-slate-600 text-center");
    			add_location(td0, file$5, 223, 28, 6919);
    			attr_dev(td1, "class", "border border-slate-600 text-center");
    			add_location(td1, file$5, 226, 28, 7079);
    			attr_dev(td2, "class", "border border-slate-600 text-center");
    			add_location(td2, file$5, 229, 28, 7241);
    			attr_dev(i0, "class", "bi bi-pencil");
    			add_location(i0, file$5, 237, 41, 7778);
    			attr_dev(button0, "class", "px-2 py-1 rounded-md bg-blue-500 text-gray-100");
    			add_location(button0, file$5, 234, 36, 7571);
    			attr_dev(i1, "class", "bi bi-trash");
    			add_location(i1, file$5, 242, 41, 8095);
    			attr_dev(button1, "class", "px-2 py-1 rounded-md bg-red-500 text-gray-100");
    			add_location(button1, file$5, 239, 36, 7889);
    			attr_dev(div, "class", "flex gap-1 items-center");
    			add_location(div, file$5, 233, 32, 7496);
    			attr_dev(td3, "class", "border border-slate-600 text-center");
    			add_location(td3, file$5, 232, 28, 7414);
    			add_location(tr, file$5, 222, 24, 6885);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			append_dev(td3, div);
    			append_dev(div, button0);
    			append_dev(button0, i0);
    			append_dev(div, t6);
    			append_dev(div, button1);
    			append_dev(button1, i1);
    			append_dev(tr, t7);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", click_handler_1, false, false, false, false),
    					listen_dev(button1, "click", click_handler_2, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$categoryStore*/ 131072 && t0_value !== (t0_value = /*category*/ ctx[79].id + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*$categoryStore*/ 131072 && t2_value !== (t2_value = /*category*/ ctx[79].name + "")) set_data_dev(t2, t2_value);
    			if (dirty[0] & /*$categoryStore*/ 131072 && t4_value !== (t4_value = /*category*/ ctx[79].products.length + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_4.name,
    		type: "each",
    		source: "(222:20) {#each $categoryStore as category}",
    		ctx
    	});

    	return block;
    }

    // (260:20) {:else}
    function create_else_block_5(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-down");
    			add_location(i, file$5, 260, 125, 9287);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-indigo-500 text-xl text-gray-100");
    			add_location(button, file$5, 260, 24, 9186);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideProducts*/ ctx[23], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_5.name,
    		type: "else",
    		source: "(260:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (258:20) {#if showProducts}
    function create_if_block_5(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-up");
    			add_location(i, file$5, 258, 125, 9091);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-indigo-500 text-xl text-gray-100");
    			add_location(button, file$5, 258, 24, 8990);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideProducts*/ ctx[23], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(258:20) {#if showProducts}",
    		ctx
    	});

    	return block;
    }

    // (280:20) {#each $productStore as product}
    function create_each_block_3(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*product*/ ctx[76].id + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = /*product*/ ctx[76].name + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = /*product*/ ctx[76].desc + "";
    	let t4;
    	let t5;
    	let td3;
    	let div;
    	let button0;
    	let i0;
    	let t6;
    	let button1;
    	let i1;
    	let t7;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			td3 = element("td");
    			div = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t6 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t7 = space();
    			attr_dev(td0, "class", "border border-slate-600 text-center");
    			add_location(td0, file$5, 281, 28, 10345);
    			attr_dev(td1, "class", "border border-slate-600 text-center");
    			add_location(td1, file$5, 284, 28, 10504);
    			attr_dev(td2, "class", "border border-slate-600 text-center");
    			add_location(td2, file$5, 287, 28, 10665);
    			attr_dev(i0, "class", "bi bi-pencil");
    			add_location(i0, file$5, 295, 41, 11190);
    			attr_dev(button0, "class", "px-2 py-1 rounded-md bg-blue-500 text-gray-100");
    			add_location(button0, file$5, 292, 36, 10983);
    			attr_dev(i1, "class", "bi bi-trash");
    			add_location(i1, file$5, 300, 41, 11507);
    			attr_dev(button1, "class", "px-2 py-1 rounded-md bg-red-500 text-gray-100");
    			add_location(button1, file$5, 297, 36, 11301);
    			attr_dev(div, "class", "flex gap-1 items-center");
    			add_location(div, file$5, 291, 32, 10908);
    			attr_dev(td3, "class", "border border-slate-600 text-center");
    			add_location(td3, file$5, 290, 28, 10826);
    			add_location(tr, file$5, 280, 24, 10311);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			append_dev(td3, div);
    			append_dev(div, button0);
    			append_dev(button0, i0);
    			append_dev(div, t6);
    			append_dev(div, button1);
    			append_dev(button1, i1);
    			append_dev(tr, t7);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", click_handler_5, false, false, false, false),
    					listen_dev(button1, "click", click_handler_6, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$productStore*/ 262144 && t0_value !== (t0_value = /*product*/ ctx[76].id + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*$productStore*/ 262144 && t2_value !== (t2_value = /*product*/ ctx[76].name + "")) set_data_dev(t2, t2_value);
    			if (dirty[0] & /*$productStore*/ 262144 && t4_value !== (t4_value = /*product*/ ctx[76].desc + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(280:20) {#each $productStore as product}",
    		ctx
    	});

    	return block;
    }

    // (317:20) {:else}
    function create_else_block_4(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-down");
    			add_location(i, file$5, 317, 122, 12505);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-purple-500 text-xl text-gray-100");
    			add_location(button, file$5, 317, 24, 12407);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideRoles*/ ctx[25], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_4.name,
    		type: "else",
    		source: "(317:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (315:20) {#if showRoles}
    function create_if_block_4(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-up");
    			add_location(i, file$5, 315, 122, 12312);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-purple-500 text-xl text-gray-100");
    			add_location(button, file$5, 315, 24, 12214);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideRoles*/ ctx[25], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(315:20) {#if showRoles}",
    		ctx
    	});

    	return block;
    }

    // (333:20) {#each $roleStore as role}
    function create_each_block_2(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*role*/ ctx[73].id + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = /*role*/ ctx[73].name + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = /*role*/ ctx[73].users + "";
    	let t4;
    	let t5;
    	let td3;
    	let div;
    	let button0;
    	let i0;
    	let t6;
    	let button1;
    	let i1;
    	let t7;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			td3 = element("td");
    			div = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t6 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t7 = space();
    			attr_dev(td0, "class", "border border-slate-600 text-center");
    			add_location(td0, file$5, 334, 28, 13443);
    			attr_dev(td1, "class", "border border-slate-600 text-center");
    			add_location(td1, file$5, 335, 28, 13535);
    			attr_dev(td2, "class", "border border-slate-600 text-center");
    			add_location(td2, file$5, 336, 28, 13629);
    			attr_dev(i0, "class", "bi bi-pencil");
    			add_location(i0, file$5, 343, 41, 14118);
    			attr_dev(button0, "class", "px-2 py-1 rounded-md bg-blue-500 text-gray-100");
    			add_location(button0, file$5, 340, 36, 13911);
    			attr_dev(i1, "class", "bi bi-trash");
    			add_location(i1, file$5, 348, 41, 14435);
    			attr_dev(button1, "class", "px-2 py-1 rounded-md bg-red-500 text-gray-100");
    			add_location(button1, file$5, 345, 36, 14229);
    			attr_dev(div, "class", "flex gap-1 items-center");
    			add_location(div, file$5, 339, 32, 13836);
    			attr_dev(td3, "class", "border border-slate-600 text-center");
    			add_location(td3, file$5, 338, 28, 13754);
    			add_location(tr, file$5, 333, 24, 13409);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			append_dev(td3, div);
    			append_dev(div, button0);
    			append_dev(button0, i0);
    			append_dev(div, t6);
    			append_dev(div, button1);
    			append_dev(button1, i1);
    			append_dev(tr, t7);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", click_handler_8, false, false, false, false),
    					listen_dev(button1, "click", click_handler_9, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$roleStore*/ 524288 && t0_value !== (t0_value = /*role*/ ctx[73].id + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*$roleStore*/ 524288 && t2_value !== (t2_value = /*role*/ ctx[73].name + "")) set_data_dev(t2, t2_value);
    			if (dirty[0] & /*$roleStore*/ 524288 && t4_value !== (t4_value = /*role*/ ctx[73].users + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(333:20) {#each $roleStore as role}",
    		ctx
    	});

    	return block;
    }

    // (365:20) {:else}
    function create_else_block_3(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-down");
    			add_location(i, file$5, 365, 120, 15430);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-blue-500 text-xl text-gray-100");
    			add_location(button, file$5, 365, 24, 15334);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideUsers*/ ctx[24], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_3.name,
    		type: "else",
    		source: "(365:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (363:20) {#if showUsers}
    function create_if_block_3(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-up");
    			add_location(i, file$5, 363, 120, 15239);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-blue-500 text-xl text-gray-100");
    			add_location(button, file$5, 363, 24, 15143);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideUsers*/ ctx[24], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(363:20) {#if showUsers}",
    		ctx
    	});

    	return block;
    }

    // (385:32) {:else}
    function create_else_block_2(ctx) {
    	let td;
    	let t_value = /*user*/ ctx[27].id + "";
    	let t;

    	const block = {
    		c: function create() {
    			td = element("td");
    			t = text(t_value);
    			attr_dev(td, "class", "border bg-green-500 border-slate-600 text-center");
    			add_location(td, file$5, 385, 36, 16586);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			append_dev(td, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$userStore*/ 1048576 && t_value !== (t_value = /*user*/ ctx[27].id + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(385:32) {:else}",
    		ctx
    	});

    	return block;
    }

    // (383:32) {#if user.status == 0}
    function create_if_block_2(ctx) {
    	let td;
    	let t_value = /*user*/ ctx[27].id + "";
    	let t;

    	const block = {
    		c: function create() {
    			td = element("td");
    			t = text(t_value);
    			attr_dev(td, "class", "border bg-red-500 border-slate-600 text-center");
    			add_location(td, file$5, 383, 36, 16434);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			append_dev(td, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$userStore*/ 1048576 && t_value !== (t_value = /*user*/ ctx[27].id + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(383:32) {#if user.status == 0}",
    		ctx
    	});

    	return block;
    }

    // (381:20) {#each $userStore as user}
    function create_each_block_1(ctx) {
    	let tr;
    	let t0;
    	let td0;
    	let t1_value = /*user*/ ctx[27].name + "";
    	let t1;
    	let t2;
    	let td1;
    	let t3_value = /*user*/ ctx[27].orders + "";
    	let t3;
    	let t4;
    	let td2;
    	let div;
    	let button0;
    	let i0;
    	let t5;
    	let button1;
    	let i1;
    	let t6;
    	let mounted;
    	let dispose;

    	function select_block_type_4(ctx, dirty) {
    		if (/*user*/ ctx[27].status == 0) return create_if_block_2;
    		return create_else_block_2;
    	}

    	let current_block_type = select_block_type_4(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			if_block.c();
    			t0 = space();
    			td0 = element("td");
    			t1 = text(t1_value);
    			t2 = space();
    			td1 = element("td");
    			t3 = text(t3_value);
    			t4 = space();
    			td2 = element("td");
    			div = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t5 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t6 = space();
    			attr_dev(td0, "class", "border border-slate-600 text-center");
    			add_location(td0, file$5, 387, 28, 16730);
    			attr_dev(td1, "class", "border border-slate-600 text-center");
    			add_location(td1, file$5, 390, 28, 16888);
    			attr_dev(i0, "class", "bi bi-pencil");
    			add_location(i0, file$5, 398, 41, 17412);
    			attr_dev(button0, "class", "px-2 py-1 rounded-md bg-blue-500 text-gray-100");
    			add_location(button0, file$5, 395, 36, 17205);
    			attr_dev(i1, "class", "bi bi-trash");
    			add_location(i1, file$5, 403, 41, 17729);
    			attr_dev(button1, "class", "px-2 py-1 rounded-md bg-red-500 text-gray-100");
    			add_location(button1, file$5, 400, 36, 17523);
    			attr_dev(div, "class", "flex gap-1 items-center");
    			add_location(div, file$5, 394, 32, 17130);
    			attr_dev(td2, "class", "border border-slate-600 text-center");
    			add_location(td2, file$5, 393, 28, 17048);
    			add_location(tr, file$5, 381, 24, 16336);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			if_block.m(tr, null);
    			append_dev(tr, t0);
    			append_dev(tr, td0);
    			append_dev(td0, t1);
    			append_dev(tr, t2);
    			append_dev(tr, td1);
    			append_dev(td1, t3);
    			append_dev(tr, t4);
    			append_dev(tr, td2);
    			append_dev(td2, div);
    			append_dev(div, button0);
    			append_dev(button0, i0);
    			append_dev(div, t5);
    			append_dev(div, button1);
    			append_dev(button1, i1);
    			append_dev(tr, t6);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", click_handler_11, false, false, false, false),
    					listen_dev(button1, "click", click_handler_12, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type_4(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(tr, t0);
    				}
    			}

    			if (dirty[0] & /*$userStore*/ 1048576 && t1_value !== (t1_value = /*user*/ ctx[27].name + "")) set_data_dev(t1, t1_value);
    			if (dirty[0] & /*$userStore*/ 1048576 && t3_value !== (t3_value = /*user*/ ctx[27].orders + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(381:20) {#each $userStore as user}",
    		ctx
    	});

    	return block;
    }

    // (420:20) {:else}
    function create_else_block_1(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-down");
    			add_location(i, file$5, 420, 120, 18722);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-pink-500 text-xl text-gray-100");
    			add_location(button, file$5, 420, 24, 18626);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideRooms*/ ctx[26], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(420:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (418:20) {#if showRooms}
    function create_if_block_1(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-up");
    			add_location(i, file$5, 418, 120, 18531);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-pink-500 text-xl text-gray-100");
    			add_location(button, file$5, 418, 24, 18435);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideRooms*/ ctx[26], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(418:20) {#if showRooms}",
    		ctx
    	});

    	return block;
    }

    // (444:28) {:else}
    function create_else_block$3(ctx) {
    	let td;

    	const block = {
    		c: function create() {
    			td = element("td");
    			td.textContent = "ochiq";
    			attr_dev(td, "class", "border border-slate-600 bg-green-500 text-center");
    			add_location(td, file$5, 444, 32, 20336);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(444:28) {:else}",
    		ctx
    	});

    	return block;
    }

    // (442:28) {#if room.booked == true}
    function create_if_block$3(ctx) {
    	let td;

    	const block = {
    		c: function create() {
    			td = element("td");
    			td.textContent = "band";
    			attr_dev(td, "class", "border border-slate-600 bg-red-500 text-center");
    			add_location(td, file$5, 442, 32, 20197);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(442:28) {#if room.booked == true}",
    		ctx
    	});

    	return block;
    }

    // (436:20) {#each $roomStore as room}
    function create_each_block$4(ctx) {
    	let acceptdeleteroom;
    	let t0;
    	let editroommodal;
    	let t1;
    	let tr;
    	let td0;
    	let t2_value = /*room*/ ctx[68].id + "";
    	let t2;
    	let t3;
    	let td1;
    	let t4_value = /*room*/ ctx[68].name + "";
    	let t4;
    	let t5;
    	let t6;
    	let td2;
    	let div;
    	let button0;
    	let i0;
    	let t7;
    	let button1;
    	let i1;
    	let t8;
    	let current;
    	let mounted;
    	let dispose;

    	acceptdeleteroom = new AcceptDeleteRoom({
    			props: {
    				show: /*showRoomDelete*/ ctx[5],
    				close: /*func_5*/ ctx[39],
    				id: /*room*/ ctx[68].id
    			},
    			$$inline: true
    		});

    	editroommodal = new EditRoomModal({
    			props: {
    				show: /*showEditRoom*/ ctx[6],
    				close: /*func_6*/ ctx[40],
    				id: /*room*/ ctx[68].id,
    				name: /*room*/ ctx[68].name,
    				desc: /*room*/ ctx[68].desc,
    				capacity: /*room*/ ctx[68].capacity
    			},
    			$$inline: true
    		});

    	function select_block_type_6(ctx, dirty) {
    		if (/*room*/ ctx[68].booked == true) return create_if_block$3;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type_6(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			create_component(acceptdeleteroom.$$.fragment);
    			t0 = space();
    			create_component(editroommodal.$$.fragment);
    			t1 = space();
    			tr = element("tr");
    			td0 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td1 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			if_block.c();
    			t6 = space();
    			td2 = element("td");
    			div = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t7 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t8 = space();
    			attr_dev(td0, "class", "border border-slate-600 text-center");
    			add_location(td0, file$5, 439, 28, 19952);
    			attr_dev(td1, "class", "border border-slate-600 text-center");
    			add_location(td1, file$5, 440, 28, 20044);
    			attr_dev(i0, "class", "bi bi-pencil");
    			add_location(i0, file$5, 448, 140, 20733);
    			attr_dev(button0, "class", "px-2 py-1 rounded-md bg-blue-500 text-gray-100");
    			add_location(button0, file$5, 448, 36, 20629);
    			attr_dev(i1, "class", "bi bi-trash");
    			add_location(i1, file$5, 449, 141, 20911);
    			attr_dev(button1, "class", "px-2 py-1 rounded-md bg-red-500 text-gray-100");
    			add_location(button1, file$5, 449, 36, 20806);
    			attr_dev(div, "class", "flex gap-1 items-center");
    			add_location(div, file$5, 447, 32, 20554);
    			attr_dev(td2, "class", "border border-slate-600 text-center");
    			add_location(td2, file$5, 446, 28, 20472);
    			add_location(tr, file$5, 438, 24, 19918);
    		},
    		m: function mount(target, anchor) {
    			mount_component(acceptdeleteroom, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(editroommodal, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td1);
    			append_dev(td1, t4);
    			append_dev(tr, t5);
    			if_block.m(tr, null);
    			append_dev(tr, t6);
    			append_dev(tr, td2);
    			append_dev(td2, div);
    			append_dev(div, button0);
    			append_dev(button0, i0);
    			append_dev(div, t7);
    			append_dev(div, button1);
    			append_dev(button1, i1);
    			append_dev(tr, t8);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler_14*/ ctx[41], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_15*/ ctx[42], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const acceptdeleteroom_changes = {};
    			if (dirty[0] & /*showRoomDelete*/ 32) acceptdeleteroom_changes.show = /*showRoomDelete*/ ctx[5];
    			if (dirty[0] & /*showRoomDelete*/ 32) acceptdeleteroom_changes.close = /*func_5*/ ctx[39];
    			if (dirty[0] & /*$roomStore*/ 2097152) acceptdeleteroom_changes.id = /*room*/ ctx[68].id;
    			acceptdeleteroom.$set(acceptdeleteroom_changes);
    			const editroommodal_changes = {};
    			if (dirty[0] & /*showEditRoom*/ 64) editroommodal_changes.show = /*showEditRoom*/ ctx[6];
    			if (dirty[0] & /*showEditRoom*/ 64) editroommodal_changes.close = /*func_6*/ ctx[40];
    			if (dirty[0] & /*$roomStore*/ 2097152) editroommodal_changes.id = /*room*/ ctx[68].id;
    			if (dirty[0] & /*$roomStore*/ 2097152) editroommodal_changes.name = /*room*/ ctx[68].name;
    			if (dirty[0] & /*$roomStore*/ 2097152) editroommodal_changes.desc = /*room*/ ctx[68].desc;
    			if (dirty[0] & /*$roomStore*/ 2097152) editroommodal_changes.capacity = /*room*/ ctx[68].capacity;
    			editroommodal.$set(editroommodal_changes);
    			if ((!current || dirty[0] & /*$roomStore*/ 2097152) && t2_value !== (t2_value = /*room*/ ctx[68].id + "")) set_data_dev(t2, t2_value);
    			if ((!current || dirty[0] & /*$roomStore*/ 2097152) && t4_value !== (t4_value = /*room*/ ctx[68].name + "")) set_data_dev(t4, t4_value);

    			if (current_block_type !== (current_block_type = select_block_type_6(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(tr, t6);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(acceptdeleteroom.$$.fragment, local);
    			transition_in(editroommodal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(acceptdeleteroom.$$.fragment, local);
    			transition_out(editroommodal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(acceptdeleteroom, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(editroommodal, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(tr);
    			if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(436:20) {#each $roomStore as room}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let t0;
    	let section1;
    	let section0;
    	let div2;
    	let addcategorymodal;
    	let t1;
    	let div1;
    	let p0;
    	let t3;
    	let div0;
    	let t4;
    	let button0;
    	let i0;
    	let t5;
    	let table0;
    	let thead0;
    	let tr0;
    	let th0;
    	let t7;
    	let th1;
    	let t9;
    	let th2;
    	let t11;
    	let th3;
    	let t13;
    	let tbody0;
    	let table0_class_value;
    	let t14;
    	let div5;
    	let addproductmodal;
    	let t15;
    	let div4;
    	let p1;
    	let t17;
    	let div3;
    	let button1;
    	let t19;
    	let t20;
    	let button2;
    	let i1;
    	let t21;
    	let table1;
    	let thead1;
    	let tr1;
    	let th4;
    	let t23;
    	let th5;
    	let t25;
    	let th6;
    	let t27;
    	let th7;
    	let t29;
    	let tbody1;
    	let table1_class_value;
    	let t30;
    	let div8;
    	let addrolemodal;
    	let t31;
    	let div7;
    	let p2;
    	let t33;
    	let div6;
    	let t34;
    	let button3;
    	let i2;
    	let t35;
    	let table2;
    	let thead2;
    	let tr2;
    	let th8;
    	let t37;
    	let th9;
    	let t39;
    	let th10;
    	let t41;
    	let th11;
    	let t43;
    	let tbody2;
    	let table2_class_value;
    	let t44;
    	let div11;
    	let addusermodal;
    	let t45;
    	let div10;
    	let p3;
    	let t47;
    	let div9;
    	let t48;
    	let button4;
    	let i3;
    	let t49;
    	let table3;
    	let thead3;
    	let tr3;
    	let th12;
    	let t51;
    	let th13;
    	let t53;
    	let th14;
    	let t55;
    	let th15;
    	let t57;
    	let tbody3;
    	let table3_class_value;
    	let t58;
    	let div14;
    	let addroommodal;
    	let t59;
    	let div13;
    	let p4;
    	let t61;
    	let div12;
    	let t62;
    	let button5;
    	let i4;
    	let t63;
    	let table4;
    	let thead4;
    	let tr4;
    	let th16;
    	let t65;
    	let th17;
    	let t67;
    	let th18;
    	let t69;
    	let th19;
    	let t71;
    	let tbody4;
    	let table4_class_value;
    	let t72;
    	let div15;
    	let button6;
    	let i5;
    	let t73;
    	let p5;
    	let t75;
    	let button7;
    	let i6;
    	let t76;
    	let p6;
    	let t78;
    	let button8;
    	let i7;
    	let t79;
    	let p7;
    	let t81;
    	let button9;
    	let i8;
    	let t82;
    	let p8;
    	let t84;
    	let button10;
    	let i9;
    	let t85;
    	let p9;
    	let current;
    	let mounted;
    	let dispose;

    	addcategorymodal = new AddCategoryModal({
    			props: {
    				show: /*showAddCategory*/ ctx[0],
    				close: /*func*/ ctx[28]
    			},
    			$$inline: true
    		});

    	function select_block_type(ctx, dirty) {
    		if (/*showCategories*/ ctx[7]) return create_if_block_6;
    		return create_else_block_6;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let each_value_4 = /*$categoryStore*/ ctx[17];
    	validate_each_argument(each_value_4);
    	let each_blocks_4 = [];

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		each_blocks_4[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    	}

    	addproductmodal = new AddProductModal({
    			props: {
    				show: /*showAddProduct*/ ctx[1],
    				close: /*func_1*/ ctx[30]
    			},
    			$$inline: true
    		});

    	function select_block_type_1(ctx, dirty) {
    		if (/*showProducts*/ ctx[9]) return create_if_block_5;
    		return create_else_block_5;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block1 = current_block_type_1(ctx);
    	let each_value_3 = /*$productStore*/ ctx[18];
    	validate_each_argument(each_value_3);
    	let each_blocks_3 = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks_3[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	addrolemodal = new AddRoleModal({
    			props: {
    				show: /*showAddRole*/ ctx[3],
    				close: /*func_2*/ ctx[33]
    			},
    			$$inline: true
    		});

    	function select_block_type_2(ctx, dirty) {
    		if (/*showRoles*/ ctx[13]) return create_if_block_4;
    		return create_else_block_4;
    	}

    	let current_block_type_2 = select_block_type_2(ctx);
    	let if_block2 = current_block_type_2(ctx);
    	let each_value_2 = /*$roleStore*/ ctx[19];
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	addusermodal = new AddUserModal({
    			props: {
    				show: /*showAddUser*/ ctx[2],
    				close: /*func_3*/ ctx[35]
    			},
    			$$inline: true
    		});

    	function select_block_type_3(ctx, dirty) {
    		if (/*showUsers*/ ctx[11]) return create_if_block_3;
    		return create_else_block_3;
    	}

    	let current_block_type_3 = select_block_type_3(ctx);
    	let if_block3 = current_block_type_3(ctx);
    	let each_value_1 = /*$userStore*/ ctx[20];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	addroommodal = new AddRoomModal({
    			props: {
    				show: /*showAddRoom*/ ctx[4],
    				close: /*func_4*/ ctx[37]
    			},
    			$$inline: true
    		});

    	function select_block_type_5(ctx, dirty) {
    		if (/*showRooms*/ ctx[15]) return create_if_block_1;
    		return create_else_block_1;
    	}

    	let current_block_type_4 = select_block_type_5(ctx);
    	let if_block4 = current_block_type_4(ctx);
    	let each_value = /*$roomStore*/ ctx[21];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			t0 = space();
    			section1 = element("section");
    			section0 = element("section");
    			div2 = element("div");
    			create_component(addcategorymodal.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			p0 = element("p");
    			p0.textContent = "Kategoriyalar";
    			t3 = space();
    			div0 = element("div");
    			if_block0.c();
    			t4 = space();
    			button0 = element("button");
    			i0 = element("i");
    			t5 = space();
    			table0 = element("table");
    			thead0 = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "ID";
    			t7 = space();
    			th1 = element("th");
    			th1.textContent = "Nomi";
    			t9 = space();
    			th2 = element("th");
    			th2.textContent = "Mah. soni";
    			t11 = space();
    			th3 = element("th");
    			th3.textContent = "O'zgartirish";
    			t13 = space();
    			tbody0 = element("tbody");

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				each_blocks_4[i].c();
    			}

    			t14 = space();
    			div5 = element("div");
    			create_component(addproductmodal.$$.fragment);
    			t15 = space();
    			div4 = element("div");
    			p1 = element("p");
    			p1.textContent = "Mahsulotlar";
    			t17 = space();
    			div3 = element("div");
    			button1 = element("button");
    			button1.textContent = "Ko'rish";
    			t19 = space();
    			if_block1.c();
    			t20 = space();
    			button2 = element("button");
    			i1 = element("i");
    			t21 = space();
    			table1 = element("table");
    			thead1 = element("thead");
    			tr1 = element("tr");
    			th4 = element("th");
    			th4.textContent = "ID";
    			t23 = space();
    			th5 = element("th");
    			th5.textContent = "Nomi";
    			t25 = space();
    			th6 = element("th");
    			th6.textContent = "Izoh";
    			t27 = space();
    			th7 = element("th");
    			th7.textContent = "O'zgartirish";
    			t29 = space();
    			tbody1 = element("tbody");

    			for (let i = 0; i < each_blocks_3.length; i += 1) {
    				each_blocks_3[i].c();
    			}

    			t30 = space();
    			div8 = element("div");
    			create_component(addrolemodal.$$.fragment);
    			t31 = space();
    			div7 = element("div");
    			p2 = element("p");
    			p2.textContent = "Rollar";
    			t33 = space();
    			div6 = element("div");
    			if_block2.c();
    			t34 = space();
    			button3 = element("button");
    			i2 = element("i");
    			t35 = space();
    			table2 = element("table");
    			thead2 = element("thead");
    			tr2 = element("tr");
    			th8 = element("th");
    			th8.textContent = "ID";
    			t37 = space();
    			th9 = element("th");
    			th9.textContent = "Ismi";
    			t39 = space();
    			th10 = element("th");
    			th10.textContent = "Ishchilar";
    			t41 = space();
    			th11 = element("th");
    			th11.textContent = "Tahrir";
    			t43 = space();
    			tbody2 = element("tbody");

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t44 = space();
    			div11 = element("div");
    			create_component(addusermodal.$$.fragment);
    			t45 = space();
    			div10 = element("div");
    			p3 = element("p");
    			p3.textContent = "Ishchilar";
    			t47 = space();
    			div9 = element("div");
    			if_block3.c();
    			t48 = space();
    			button4 = element("button");
    			i3 = element("i");
    			t49 = space();
    			table3 = element("table");
    			thead3 = element("thead");
    			tr3 = element("tr");
    			th12 = element("th");
    			th12.textContent = "ID";
    			t51 = space();
    			th13 = element("th");
    			th13.textContent = "Ismi";
    			t53 = space();
    			th14 = element("th");
    			th14.textContent = "Jami b.";
    			t55 = space();
    			th15 = element("th");
    			th15.textContent = "O'zgartirish";
    			t57 = space();
    			tbody3 = element("tbody");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t58 = space();
    			div14 = element("div");
    			create_component(addroommodal.$$.fragment);
    			t59 = space();
    			div13 = element("div");
    			p4 = element("p");
    			p4.textContent = "Xonalar";
    			t61 = space();
    			div12 = element("div");
    			if_block4.c();
    			t62 = space();
    			button5 = element("button");
    			i4 = element("i");
    			t63 = space();
    			table4 = element("table");
    			thead4 = element("thead");
    			tr4 = element("tr");
    			th16 = element("th");
    			th16.textContent = "ID";
    			t65 = space();
    			th17 = element("th");
    			th17.textContent = "Ismi";
    			t67 = space();
    			th18 = element("th");
    			th18.textContent = "Holati";
    			t69 = space();
    			th19 = element("th");
    			th19.textContent = "Tahrir";
    			t71 = space();
    			tbody4 = element("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t72 = space();
    			div15 = element("div");
    			button6 = element("button");
    			i5 = element("i");
    			t73 = space();
    			p5 = element("p");
    			p5.textContent = "Asosiy";
    			t75 = space();
    			button7 = element("button");
    			i6 = element("i");
    			t76 = space();
    			p6 = element("p");
    			p6.textContent = "Buyurtmalar";
    			t78 = space();
    			button8 = element("button");
    			i7 = element("i");
    			t79 = space();
    			p7 = element("p");
    			p7.textContent = "Qo'shish";
    			t81 = space();
    			button9 = element("button");
    			i8 = element("i");
    			t82 = space();
    			p8 = element("p");
    			p8.textContent = "Xonalar";
    			t84 = space();
    			button10 = element("button");
    			i9 = element("i");
    			t85 = space();
    			p9 = element("p");
    			p9.textContent = "Profile";
    			document.title = "Qo'shish";
    			attr_dev(p0, "class", "text-xl font-semibold");
    			add_location(p0, file$5, 196, 16, 5326);
    			attr_dev(i0, "class", "bi bi-plus");
    			add_location(i0, file$5, 203, 140, 6028);
    			attr_dev(button0, "class", "px-2 py-1 rounded-md bg-green-500 text-xl text-gray-100");
    			add_location(button0, file$5, 203, 24, 5912);
    			attr_dev(div0, "class", "flex gap-1 items-center");
    			add_location(div0, file$5, 197, 16, 5394);
    			attr_dev(div1, "class", "flex justify-between items-center");
    			add_location(div1, file$5, 195, 12, 5261);
    			attr_dev(th0, "class", "border border-slate-600 text-center");
    			add_location(th0, file$5, 209, 24, 6270);
    			attr_dev(th1, "class", "border border-slate-600 text-center");
    			add_location(th1, file$5, 210, 24, 6351);
    			attr_dev(th2, "class", "border border-slate-600 text-center");
    			add_location(th2, file$5, 212, 24, 6460);
    			attr_dev(th3, "class", "border border-slate-600 text-center");
    			add_location(th3, file$5, 215, 24, 6604);
    			add_location(tr0, file$5, 208, 20, 6240);
    			add_location(thead0, file$5, 207, 16, 6211);
    			add_location(tbody0, file$5, 220, 16, 6796);
    			attr_dev(table0, "class", table0_class_value = "" + (/*categories_class*/ ctx[8] + " border-collapse border border-slate-500"));
    			add_location(table0, file$5, 206, 12, 6119);
    			attr_dev(div2, "class", "categories flex flex-col gap-3 p-3 border-t-8 border-green-500 bg-white rounded-xl shadow-md");
    			add_location(div2, file$5, 193, 8, 5045);
    			attr_dev(p1, "class", "text-xl font-semibold");
    			add_location(p1, file$5, 254, 16, 8653);
    			attr_dev(button1, "class", "px-2 py-[6px] rounded-md bg-indigo-500 text-md font-bold text-gray-100");
    			add_location(button1, file$5, 256, 20, 8778);
    			attr_dev(i1, "class", "bi bi-plus");
    			add_location(i1, file$5, 262, 136, 9493);
    			attr_dev(button2, "class", "px-2 py-1 rounded-md bg-indigo-500 text-xl text-gray-100");
    			add_location(button2, file$5, 262, 20, 9377);
    			attr_dev(div3, "class", "flex gap-1 items-center");
    			add_location(div3, file$5, 255, 16, 8719);
    			attr_dev(div4, "class", "flex justify-between items-center");
    			add_location(div4, file$5, 253, 12, 8588);
    			attr_dev(th4, "class", "border border-slate-600 text-center");
    			add_location(th4, file$5, 268, 24, 9733);
    			attr_dev(th5, "class", "border border-slate-600 text-center");
    			add_location(th5, file$5, 269, 24, 9814);
    			attr_dev(th6, "class", "border border-slate-600 text-center");
    			add_location(th6, file$5, 271, 24, 9923);
    			attr_dev(th7, "class", "border border-slate-600 text-center");
    			add_location(th7, file$5, 273, 24, 10032);
    			add_location(tr1, file$5, 267, 20, 9703);
    			add_location(thead1, file$5, 266, 16, 9674);
    			add_location(tbody1, file$5, 278, 16, 10224);
    			attr_dev(table1, "class", table1_class_value = "" + (/*products_class*/ ctx[10] + " border-collapse border border-slate-500"));
    			add_location(table1, file$5, 265, 12, 9584);
    			attr_dev(div5, "class", "products flex flex-col gap-3 p-3 border-t-8 border-indigo-500 bg-white rounded-xl shadow-md");
    			add_location(div5, file$5, 251, 8, 8376);
    			attr_dev(p2, "class", "text-xl font-semibold");
    			add_location(p2, file$5, 312, 16, 12053);
    			attr_dev(i2, "class", "bi bi-plus");
    			add_location(i2, file$5, 319, 134, 12709);
    			attr_dev(button3, "class", "px-2 py-1 rounded-md bg-purple-500 text-xl text-gray-100");
    			add_location(button3, file$5, 319, 21, 12596);
    			attr_dev(div6, "class", "flex gap-1 items-center");
    			add_location(div6, file$5, 313, 16, 12114);
    			attr_dev(div7, "class", "flex justify-between items-center");
    			add_location(div7, file$5, 311, 12, 11988);
    			attr_dev(th8, "class", "border border-slate-600 text-center");
    			add_location(th8, file$5, 325, 24, 12946);
    			attr_dev(th9, "class", "border border-slate-600 text-center");
    			add_location(th9, file$5, 326, 24, 13027);
    			attr_dev(th10, "class", "border border-slate-600 text-center");
    			add_location(th10, file$5, 327, 24, 13110);
    			attr_dev(th11, "class", "border border-slate-600 text-center");
    			add_location(th11, file$5, 328, 24, 13198);
    			add_location(tr2, file$5, 324, 20, 12916);
    			add_location(thead2, file$5, 323, 16, 12887);
    			add_location(tbody2, file$5, 331, 16, 13328);
    			attr_dev(table2, "class", table2_class_value = "" + (/*roles_class*/ ctx[14] + " border-collapse border border-slate-500"));
    			add_location(table2, file$5, 322, 12, 12800);
    			attr_dev(div8, "class", "roles flex flex-col gap-3 p-3 border-t-8 border-purple-500 bg-white rounded-xl shadow-md");
    			add_location(div8, file$5, 309, 8, 11788);
    			attr_dev(p3, "class", "text-xl font-semibold");
    			add_location(p3, file$5, 360, 16, 14979);
    			attr_dev(i3, "class", "bi bi-plus");
    			add_location(i3, file$5, 367, 132, 15632);
    			attr_dev(button4, "class", "px-2 py-1 rounded-md bg-blue-500 text-xl text-gray-100");
    			add_location(button4, file$5, 367, 21, 15521);
    			attr_dev(div9, "class", "flex gap-1 items-center");
    			add_location(div9, file$5, 361, 16, 15043);
    			attr_dev(div10, "class", "flex justify-between items-center");
    			add_location(div10, file$5, 359, 12, 14914);
    			attr_dev(th12, "class", "border border-slate-600 text-center");
    			add_location(th12, file$5, 373, 24, 15869);
    			attr_dev(th13, "class", "border border-slate-600 text-center");
    			add_location(th13, file$5, 374, 24, 15950);
    			attr_dev(th14, "class", "border border-slate-600 text-center");
    			add_location(th14, file$5, 375, 24, 16033);
    			attr_dev(th15, "class", "border border-slate-600 text-center");
    			add_location(th15, file$5, 376, 24, 16119);
    			add_location(tr3, file$5, 372, 20, 15839);
    			add_location(thead3, file$5, 371, 16, 15810);
    			add_location(tbody3, file$5, 379, 16, 16255);
    			attr_dev(table3, "class", table3_class_value = "" + (/*users_class*/ ctx[12] + " border-collapse border border-slate-500"));
    			add_location(table3, file$5, 370, 12, 15723);
    			attr_dev(div11, "class", "users flex flex-col gap-3 p-3 border-t-8 border-blue-500 bg-white rounded-xl shadow-md");
    			add_location(div11, file$5, 357, 8, 14716);
    			attr_dev(p4, "class", "text-xl font-semibold");
    			add_location(p4, file$5, 415, 16, 18273);
    			attr_dev(i4, "class", "bi bi-plus");
    			add_location(i4, file$5, 422, 132, 18924);
    			attr_dev(button5, "class", "px-2 py-1 rounded-md bg-pink-500 text-xl text-gray-100");
    			add_location(button5, file$5, 422, 21, 18813);
    			attr_dev(div12, "class", "flex gap-1 items-center");
    			add_location(div12, file$5, 416, 16, 18335);
    			attr_dev(div13, "class", "flex justify-between items-center");
    			add_location(div13, file$5, 414, 12, 18208);
    			attr_dev(th16, "class", "border border-slate-600 text-center");
    			add_location(th16, file$5, 428, 24, 19161);
    			attr_dev(th17, "class", "border border-slate-600 text-center");
    			add_location(th17, file$5, 429, 24, 19242);
    			attr_dev(th18, "class", "border border-slate-600 text-center");
    			add_location(th18, file$5, 430, 24, 19325);
    			attr_dev(th19, "class", "border border-slate-600 text-center");
    			add_location(th19, file$5, 431, 24, 19410);
    			add_location(tr4, file$5, 427, 20, 19131);
    			add_location(thead4, file$5, 426, 16, 19102);
    			add_location(tbody4, file$5, 434, 16, 19540);
    			attr_dev(table4, "class", table4_class_value = "" + (/*rooms_class*/ ctx[16] + " border-collapse border border-slate-500"));
    			add_location(table4, file$5, 425, 12, 19015);
    			attr_dev(div14, "class", "rooms flex flex-col gap-3 p-3 border-t-8 border-pink-500 bg-white rounded-xl shadow-md");
    			add_location(div14, file$5, 412, 8, 18010);
    			attr_dev(section0, "class", "grow flex flex-col gap-2 p-3");
    			add_location(section0, file$5, 192, 4, 4989);
    			attr_dev(i5, "class", "bi bi-house-fill text-2xl");
    			add_location(i5, file$5, 460, 12, 21402);
    			attr_dev(p5, "class", "text-[9px] font-bold");
    			add_location(p5, file$5, 461, 12, 21457);
    			attr_dev(button6, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button6, file$5, 459, 8, 21273);
    			attr_dev(i6, "class", "bi bi-clipboard-fill text-2xl");
    			add_location(i6, file$5, 464, 12, 21663);
    			attr_dev(p6, "class", "text-[9px] font-bold");
    			add_location(p6, file$5, 465, 12, 21722);
    			attr_dev(button7, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button7, file$5, 463, 8, 21528);
    			attr_dev(i7, "class", "bi bi-plus text-2xl");
    			add_location(i7, file$5, 468, 12, 21931);
    			attr_dev(p7, "class", "text-[10px] font-bold");
    			add_location(p7, file$5, 469, 12, 21980);
    			attr_dev(button8, "class", "flex flex-col items-center gap-1 text-indigo-700 px-2 rounded-xl");
    			add_location(button8, file$5, 467, 8, 21798);
    			attr_dev(i8, "class", "bi bi-door-open-fill text-2xl");
    			add_location(i8, file$5, 472, 12, 22188);
    			attr_dev(p8, "class", "text-[9px] font-bold");
    			add_location(p8, file$5, 473, 12, 22247);
    			attr_dev(button9, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button9, file$5, 471, 8, 22054);
    			attr_dev(i9, "class", "bi bi-person-fill text-2xl");
    			add_location(i9, file$5, 476, 12, 22455);
    			attr_dev(p9, "class", "text-[9px] font-bold");
    			add_location(p9, file$5, 477, 12, 22511);
    			attr_dev(button10, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button10, file$5, 475, 8, 22319);
    			attr_dev(div15, "class", "grow-0 h-fit grid grid-cols-5 bg-white px-2 py-2 sticky bottom-0 right-0 left-0");
    			add_location(div15, file$5, 458, 4, 21170);
    			attr_dev(section1, "class", "flex flex-col min-h-screen");
    			add_location(section1, file$5, 191, 0, 4939);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, section0);
    			append_dev(section0, div2);
    			mount_component(addcategorymodal, div2, null);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, p0);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			if_block0.m(div0, null);
    			append_dev(div0, t4);
    			append_dev(div0, button0);
    			append_dev(button0, i0);
    			append_dev(div2, t5);
    			append_dev(div2, table0);
    			append_dev(table0, thead0);
    			append_dev(thead0, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t7);
    			append_dev(tr0, th1);
    			append_dev(tr0, t9);
    			append_dev(tr0, th2);
    			append_dev(tr0, t11);
    			append_dev(tr0, th3);
    			append_dev(table0, t13);
    			append_dev(table0, tbody0);

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				if (each_blocks_4[i]) {
    					each_blocks_4[i].m(tbody0, null);
    				}
    			}

    			append_dev(section0, t14);
    			append_dev(section0, div5);
    			mount_component(addproductmodal, div5, null);
    			append_dev(div5, t15);
    			append_dev(div5, div4);
    			append_dev(div4, p1);
    			append_dev(div4, t17);
    			append_dev(div4, div3);
    			append_dev(div3, button1);
    			append_dev(div3, t19);
    			if_block1.m(div3, null);
    			append_dev(div3, t20);
    			append_dev(div3, button2);
    			append_dev(button2, i1);
    			append_dev(div5, t21);
    			append_dev(div5, table1);
    			append_dev(table1, thead1);
    			append_dev(thead1, tr1);
    			append_dev(tr1, th4);
    			append_dev(tr1, t23);
    			append_dev(tr1, th5);
    			append_dev(tr1, t25);
    			append_dev(tr1, th6);
    			append_dev(tr1, t27);
    			append_dev(tr1, th7);
    			append_dev(table1, t29);
    			append_dev(table1, tbody1);

    			for (let i = 0; i < each_blocks_3.length; i += 1) {
    				if (each_blocks_3[i]) {
    					each_blocks_3[i].m(tbody1, null);
    				}
    			}

    			append_dev(section0, t30);
    			append_dev(section0, div8);
    			mount_component(addrolemodal, div8, null);
    			append_dev(div8, t31);
    			append_dev(div8, div7);
    			append_dev(div7, p2);
    			append_dev(div7, t33);
    			append_dev(div7, div6);
    			if_block2.m(div6, null);
    			append_dev(div6, t34);
    			append_dev(div6, button3);
    			append_dev(button3, i2);
    			append_dev(div8, t35);
    			append_dev(div8, table2);
    			append_dev(table2, thead2);
    			append_dev(thead2, tr2);
    			append_dev(tr2, th8);
    			append_dev(tr2, t37);
    			append_dev(tr2, th9);
    			append_dev(tr2, t39);
    			append_dev(tr2, th10);
    			append_dev(tr2, t41);
    			append_dev(tr2, th11);
    			append_dev(table2, t43);
    			append_dev(table2, tbody2);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				if (each_blocks_2[i]) {
    					each_blocks_2[i].m(tbody2, null);
    				}
    			}

    			append_dev(section0, t44);
    			append_dev(section0, div11);
    			mount_component(addusermodal, div11, null);
    			append_dev(div11, t45);
    			append_dev(div11, div10);
    			append_dev(div10, p3);
    			append_dev(div10, t47);
    			append_dev(div10, div9);
    			if_block3.m(div9, null);
    			append_dev(div9, t48);
    			append_dev(div9, button4);
    			append_dev(button4, i3);
    			append_dev(div11, t49);
    			append_dev(div11, table3);
    			append_dev(table3, thead3);
    			append_dev(thead3, tr3);
    			append_dev(tr3, th12);
    			append_dev(tr3, t51);
    			append_dev(tr3, th13);
    			append_dev(tr3, t53);
    			append_dev(tr3, th14);
    			append_dev(tr3, t55);
    			append_dev(tr3, th15);
    			append_dev(table3, t57);
    			append_dev(table3, tbody3);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				if (each_blocks_1[i]) {
    					each_blocks_1[i].m(tbody3, null);
    				}
    			}

    			append_dev(section0, t58);
    			append_dev(section0, div14);
    			mount_component(addroommodal, div14, null);
    			append_dev(div14, t59);
    			append_dev(div14, div13);
    			append_dev(div13, p4);
    			append_dev(div13, t61);
    			append_dev(div13, div12);
    			if_block4.m(div12, null);
    			append_dev(div12, t62);
    			append_dev(div12, button5);
    			append_dev(button5, i4);
    			append_dev(div14, t63);
    			append_dev(div14, table4);
    			append_dev(table4, thead4);
    			append_dev(thead4, tr4);
    			append_dev(tr4, th16);
    			append_dev(tr4, t65);
    			append_dev(tr4, th17);
    			append_dev(tr4, t67);
    			append_dev(tr4, th18);
    			append_dev(tr4, t69);
    			append_dev(tr4, th19);
    			append_dev(table4, t71);
    			append_dev(table4, tbody4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(tbody4, null);
    				}
    			}

    			append_dev(section1, t72);
    			append_dev(section1, div15);
    			append_dev(div15, button6);
    			append_dev(button6, i5);
    			append_dev(button6, t73);
    			append_dev(button6, p5);
    			append_dev(div15, t75);
    			append_dev(div15, button7);
    			append_dev(button7, i6);
    			append_dev(button7, t76);
    			append_dev(button7, p6);
    			append_dev(div15, t78);
    			append_dev(div15, button8);
    			append_dev(button8, i7);
    			append_dev(button8, t79);
    			append_dev(button8, p7);
    			append_dev(div15, t81);
    			append_dev(div15, button9);
    			append_dev(button9, i8);
    			append_dev(button9, t82);
    			append_dev(button9, p8);
    			append_dev(div15, t84);
    			append_dev(div15, button10);
    			append_dev(button10, i9);
    			append_dev(button10, t85);
    			append_dev(button10, p9);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[29], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_3*/ ctx[31], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_4*/ ctx[32], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_7*/ ctx[34], false, false, false, false),
    					listen_dev(button4, "click", /*click_handler_10*/ ctx[36], false, false, false, false),
    					listen_dev(button5, "click", /*click_handler_13*/ ctx[38], false, false, false, false),
    					listen_dev(button6, "click", /*click_handler_16*/ ctx[43], false, false, false, false),
    					listen_dev(button7, "click", /*click_handler_17*/ ctx[44], false, false, false, false),
    					listen_dev(button8, "click", /*click_handler_18*/ ctx[45], false, false, false, false),
    					listen_dev(button9, "click", /*click_handler_19*/ ctx[46], false, false, false, false),
    					listen_dev(button10, "click", /*click_handler_20*/ ctx[47], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const addcategorymodal_changes = {};
    			if (dirty[0] & /*showAddCategory*/ 1) addcategorymodal_changes.show = /*showAddCategory*/ ctx[0];
    			if (dirty[0] & /*showAddCategory*/ 1) addcategorymodal_changes.close = /*func*/ ctx[28];
    			addcategorymodal.$set(addcategorymodal_changes);

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div0, t4);
    				}
    			}

    			if (dirty[0] & /*$categoryStore*/ 131072) {
    				each_value_4 = /*$categoryStore*/ ctx[17];
    				validate_each_argument(each_value_4);
    				let i;

    				for (i = 0; i < each_value_4.length; i += 1) {
    					const child_ctx = get_each_context_4(ctx, each_value_4, i);

    					if (each_blocks_4[i]) {
    						each_blocks_4[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_4[i] = create_each_block_4(child_ctx);
    						each_blocks_4[i].c();
    						each_blocks_4[i].m(tbody0, null);
    					}
    				}

    				for (; i < each_blocks_4.length; i += 1) {
    					each_blocks_4[i].d(1);
    				}

    				each_blocks_4.length = each_value_4.length;
    			}

    			if (!current || dirty[0] & /*categories_class*/ 256 && table0_class_value !== (table0_class_value = "" + (/*categories_class*/ ctx[8] + " border-collapse border border-slate-500"))) {
    				attr_dev(table0, "class", table0_class_value);
    			}

    			const addproductmodal_changes = {};
    			if (dirty[0] & /*showAddProduct*/ 2) addproductmodal_changes.show = /*showAddProduct*/ ctx[1];
    			if (dirty[0] & /*showAddProduct*/ 2) addproductmodal_changes.close = /*func_1*/ ctx[30];
    			addproductmodal.$set(addproductmodal_changes);

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type_1(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div3, t20);
    				}
    			}

    			if (dirty[0] & /*$productStore*/ 262144) {
    				each_value_3 = /*$productStore*/ ctx[18];
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks_3[i]) {
    						each_blocks_3[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_3[i] = create_each_block_3(child_ctx);
    						each_blocks_3[i].c();
    						each_blocks_3[i].m(tbody1, null);
    					}
    				}

    				for (; i < each_blocks_3.length; i += 1) {
    					each_blocks_3[i].d(1);
    				}

    				each_blocks_3.length = each_value_3.length;
    			}

    			if (!current || dirty[0] & /*products_class*/ 1024 && table1_class_value !== (table1_class_value = "" + (/*products_class*/ ctx[10] + " border-collapse border border-slate-500"))) {
    				attr_dev(table1, "class", table1_class_value);
    			}

    			const addrolemodal_changes = {};
    			if (dirty[0] & /*showAddRole*/ 8) addrolemodal_changes.show = /*showAddRole*/ ctx[3];
    			if (dirty[0] & /*showAddRole*/ 8) addrolemodal_changes.close = /*func_2*/ ctx[33];
    			addrolemodal.$set(addrolemodal_changes);

    			if (current_block_type_2 === (current_block_type_2 = select_block_type_2(ctx)) && if_block2) {
    				if_block2.p(ctx, dirty);
    			} else {
    				if_block2.d(1);
    				if_block2 = current_block_type_2(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(div6, t34);
    				}
    			}

    			if (dirty[0] & /*$roleStore*/ 524288) {
    				each_value_2 = /*$roleStore*/ ctx[19];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(tbody2, null);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_2.length;
    			}

    			if (!current || dirty[0] & /*roles_class*/ 16384 && table2_class_value !== (table2_class_value = "" + (/*roles_class*/ ctx[14] + " border-collapse border border-slate-500"))) {
    				attr_dev(table2, "class", table2_class_value);
    			}

    			const addusermodal_changes = {};
    			if (dirty[0] & /*showAddUser*/ 4) addusermodal_changes.show = /*showAddUser*/ ctx[2];
    			if (dirty[0] & /*showAddUser*/ 4) addusermodal_changes.close = /*func_3*/ ctx[35];
    			addusermodal.$set(addusermodal_changes);

    			if (current_block_type_3 === (current_block_type_3 = select_block_type_3(ctx)) && if_block3) {
    				if_block3.p(ctx, dirty);
    			} else {
    				if_block3.d(1);
    				if_block3 = current_block_type_3(ctx);

    				if (if_block3) {
    					if_block3.c();
    					if_block3.m(div9, t48);
    				}
    			}

    			if (dirty[0] & /*$userStore*/ 1048576) {
    				each_value_1 = /*$userStore*/ ctx[20];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(tbody3, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (!current || dirty[0] & /*users_class*/ 4096 && table3_class_value !== (table3_class_value = "" + (/*users_class*/ ctx[12] + " border-collapse border border-slate-500"))) {
    				attr_dev(table3, "class", table3_class_value);
    			}

    			const addroommodal_changes = {};
    			if (dirty[0] & /*showAddRoom*/ 16) addroommodal_changes.show = /*showAddRoom*/ ctx[4];
    			if (dirty[0] & /*showAddRoom*/ 16) addroommodal_changes.close = /*func_4*/ ctx[37];
    			addroommodal.$set(addroommodal_changes);

    			if (current_block_type_4 === (current_block_type_4 = select_block_type_5(ctx)) && if_block4) {
    				if_block4.p(ctx, dirty);
    			} else {
    				if_block4.d(1);
    				if_block4 = current_block_type_4(ctx);

    				if (if_block4) {
    					if_block4.c();
    					if_block4.m(div12, t62);
    				}
    			}

    			if (dirty[0] & /*showRoomDelete, showEditRoom, $roomStore*/ 2097248) {
    				each_value = /*$roomStore*/ ctx[21];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(tbody4, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty[0] & /*rooms_class*/ 65536 && table4_class_value !== (table4_class_value = "" + (/*rooms_class*/ ctx[16] + " border-collapse border border-slate-500"))) {
    				attr_dev(table4, "class", table4_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addcategorymodal.$$.fragment, local);
    			transition_in(addproductmodal.$$.fragment, local);
    			transition_in(addrolemodal.$$.fragment, local);
    			transition_in(addusermodal.$$.fragment, local);
    			transition_in(addroommodal.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addcategorymodal.$$.fragment, local);
    			transition_out(addproductmodal.$$.fragment, local);
    			transition_out(addrolemodal.$$.fragment, local);
    			transition_out(addusermodal.$$.fragment, local);
    			transition_out(addroommodal.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section1);
    			destroy_component(addcategorymodal);
    			if_block0.d();
    			destroy_each(each_blocks_4, detaching);
    			destroy_component(addproductmodal);
    			if_block1.d();
    			destroy_each(each_blocks_3, detaching);
    			destroy_component(addrolemodal);
    			if_block2.d();
    			destroy_each(each_blocks_2, detaching);
    			destroy_component(addusermodal);
    			if_block3.d();
    			destroy_each(each_blocks_1, detaching);
    			destroy_component(addroommodal);
    			if_block4.d();
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const click_handler_1 = () => {
    	
    };

    const click_handler_2 = () => {
    	
    };

    const click_handler_5 = () => {
    	
    };

    const click_handler_6 = () => {
    	
    };

    const click_handler_8 = () => {
    	
    };

    const click_handler_9 = () => {
    	
    };

    const click_handler_11 = () => {
    	
    };

    const click_handler_12 = () => {
    	
    };

    function instance$6($$self, $$props, $$invalidate) {
    	let $categoryStore;
    	let $productStore;
    	let $roleStore;
    	let $userStore;
    	let $roomStore;
    	validate_store(categoryStore, 'categoryStore');
    	component_subscribe($$self, categoryStore, $$value => $$invalidate(17, $categoryStore = $$value));
    	validate_store(productStore, 'productStore');
    	component_subscribe($$self, productStore, $$value => $$invalidate(18, $productStore = $$value));
    	validate_store(roleStore, 'roleStore');
    	component_subscribe($$self, roleStore, $$value => $$invalidate(19, $roleStore = $$value));
    	validate_store(userStore, 'userStore');
    	component_subscribe($$self, userStore, $$value => $$invalidate(20, $userStore = $$value));
    	validate_store(roomStore, 'roomStore');
    	component_subscribe($$self, roomStore, $$value => $$invalidate(21, $roomStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MobileAdd', slots, []);
    	const user = JSON.parse(localStorage.getItem('user'));
    	const token = localStorage.getItem("token");
    	const userEndpoint = new UserEndpoint();

    	async function checkToken() {
    		try {
    			const res = await userEndpoint.getTokenVerify(token);

    			if (res.status == 200) {
    				if (res.data.user.role == "waiter") {
    					navigate('/wprofile');
    				} else {
    					localStorage.setItem("user", JSON.stringify(res.data.user));
    					console.log("Verify success");
    				}
    			}
    		} catch(error) {
    			navigate('/login');
    		}
    	}

    	if (!token || !user) {
    		localStorage.clear();
    		navigate('/login');
    	} else {
    		checkToken();
    	}

    	const roomEndpoint = new RoomEndpoint();
    	const categoryEndpoint = new CategoryEndpoint();
    	const productEndpoint = new ProductEndpoint();
    	const roleEndpoint = new RoleEndpoint();

    	// get roles
    	async function getRoles() {
    		try {
    			const res = await roleEndpoint.get();
    			const roles = res.data.roles;
    			roleStore.set(roles);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getRoles();

    	// get users
    	async function getUsers() {
    		try {
    			const res = await userEndpoint.get(token);
    			const users = res.data.users;
    			userStore.set(users);
    		} catch(error) {
    			console.log(error);
    			navigate('/login');
    		}
    	}

    	getUsers();

    	// get rooms
    	async function getRooms() {
    		try {
    			const res = await roomEndpoint.get(token);
    			const rooms = res.data.rooms;
    			roomStore.set(rooms);
    		} catch(error) {
    			console.log(error);
    			navigate('/login');
    		}
    	}

    	getRooms();

    	// get categories
    	async function getCategories() {
    		try {
    			const res = await categoryEndpoint.get();
    			const categories = res.data.categories;
    			categoryStore.set(categories);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getCategories();

    	// get products
    	async function getProducts() {
    		try {
    			const res = await productEndpoint.get();
    			const products = res.data.products;
    			productStore.set(products);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getProducts();

    	// for category
    	let showAddCategory = false;

    	let showCategoryDelete = false;
    	let showEditCategory = false;

    	// for product
    	let showAddProduct = false;

    	let showProductDelete = false;
    	let showEditProduct = false;

    	// for user
    	let showAddUser = false;

    	let showUserDelete = false;
    	let showEditUser = false;

    	// for role
    	let showAddRole = false;

    	let showRoleDelete = false;
    	let showEditRole = false;

    	// for room
    	let showAddRoom = false;

    	let showRoomDelete = false;
    	let showEditRoom = false;
    	let showCategories = false;
    	let categories_class = 'hidden';

    	function showHideCategories() {
    		if (showCategories) {
    			$$invalidate(7, showCategories = false);
    			$$invalidate(8, categories_class = 'hidden');
    		} else {
    			$$invalidate(7, showCategories = true);
    			$$invalidate(8, categories_class = '');
    		}
    	}

    	let showProducts = false;
    	let products_class = 'hidden';

    	function showHideProducts() {
    		if (showProducts) {
    			$$invalidate(9, showProducts = false);
    			$$invalidate(10, products_class = 'hidden');
    		} else {
    			$$invalidate(9, showProducts = true);
    			$$invalidate(10, products_class = '');
    		}
    	}

    	let showUsers = false;
    	let users_class = 'hidden';

    	function showHideUsers() {
    		if (showUsers) {
    			$$invalidate(11, showUsers = false);
    			$$invalidate(12, users_class = 'hidden');
    		} else {
    			$$invalidate(11, showUsers = true);
    			$$invalidate(12, users_class = '');
    		}
    	}

    	let showRoles = false;
    	let roles_class = 'hidden';

    	function showHideRoles() {
    		if (showRoles) {
    			$$invalidate(13, showRoles = false);
    			$$invalidate(14, roles_class = 'hidden');
    		} else {
    			$$invalidate(13, showRoles = true);
    			$$invalidate(14, roles_class = '');
    		}
    	}

    	let showRooms = false;
    	let rooms_class = 'hidden';

    	function showHideRooms() {
    		if (showRooms) {
    			$$invalidate(15, showRooms = false);
    			$$invalidate(16, rooms_class = 'hidden');
    		} else {
    			$$invalidate(15, showRooms = true);
    			$$invalidate(16, rooms_class = '');
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$4.warn(`<MobileAdd> was created with unknown prop '${key}'`);
    	});

    	const func = () => $$invalidate(0, showAddCategory = false);

    	const click_handler = () => {
    		$$invalidate(0, showAddCategory = true);
    	};

    	const func_1 = () => $$invalidate(1, showAddProduct = false);

    	const click_handler_3 = () => {
    		navigate('/products');
    	};

    	const click_handler_4 = () => {
    		$$invalidate(1, showAddProduct = true);
    	};

    	const func_2 = () => $$invalidate(3, showAddRole = false);

    	const click_handler_7 = () => {
    		$$invalidate(3, showAddRole = true);
    	};

    	const func_3 = () => $$invalidate(2, showAddUser = false);

    	const click_handler_10 = () => {
    		$$invalidate(2, showAddUser = true);
    	};

    	const func_4 = () => $$invalidate(4, showAddRoom = false);

    	const click_handler_13 = () => {
    		$$invalidate(4, showAddRoom = true);
    	};

    	const func_5 = () => {
    		$$invalidate(5, showRoomDelete = false);
    	};

    	const func_6 = () => {
    		$$invalidate(6, showEditRoom = false);
    	};

    	const click_handler_14 = () => {
    		$$invalidate(6, showEditRoom = true);
    	};

    	const click_handler_15 = () => {
    		$$invalidate(5, showRoomDelete = true);
    	};

    	const click_handler_16 = () => {
    		navigate('/m');
    	};

    	const click_handler_17 = () => {
    		navigate('/morders');
    	};

    	const click_handler_18 = () => {
    		navigate('/madd');
    	};

    	const click_handler_19 = () => {
    		navigate('/mrooms');
    	};

    	const click_handler_20 = () => {
    		navigate('/mprofile');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		AddProductModal,
    		AddCategoryModal,
    		AddUserModal,
    		AddRoleModal,
    		AddRoomModal,
    		AcceptDeleteRoom,
    		EditRoomModal,
    		UserEndpoint,
    		RoomEndpoint,
    		CategoryEndpoint,
    		ProductEndpoint,
    		RoleEndpoint,
    		user,
    		token,
    		userEndpoint,
    		checkToken,
    		userStore,
    		roomStore,
    		categoryStore,
    		productStore,
    		roleStore,
    		roomEndpoint,
    		categoryEndpoint,
    		productEndpoint,
    		roleEndpoint,
    		getRoles,
    		getUsers,
    		getRooms,
    		getCategories,
    		getProducts,
    		showAddCategory,
    		showCategoryDelete,
    		showEditCategory,
    		showAddProduct,
    		showProductDelete,
    		showEditProduct,
    		showAddUser,
    		showUserDelete,
    		showEditUser,
    		showAddRole,
    		showRoleDelete,
    		showEditRole,
    		showAddRoom,
    		showRoomDelete,
    		showEditRoom,
    		showCategories,
    		categories_class,
    		showHideCategories,
    		showProducts,
    		products_class,
    		showHideProducts,
    		showUsers,
    		users_class,
    		showHideUsers,
    		showRoles,
    		roles_class,
    		showHideRoles,
    		showRooms,
    		rooms_class,
    		showHideRooms,
    		$categoryStore,
    		$productStore,
    		$roleStore,
    		$userStore,
    		$roomStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('showAddCategory' in $$props) $$invalidate(0, showAddCategory = $$props.showAddCategory);
    		if ('showCategoryDelete' in $$props) showCategoryDelete = $$props.showCategoryDelete;
    		if ('showEditCategory' in $$props) showEditCategory = $$props.showEditCategory;
    		if ('showAddProduct' in $$props) $$invalidate(1, showAddProduct = $$props.showAddProduct);
    		if ('showProductDelete' in $$props) showProductDelete = $$props.showProductDelete;
    		if ('showEditProduct' in $$props) showEditProduct = $$props.showEditProduct;
    		if ('showAddUser' in $$props) $$invalidate(2, showAddUser = $$props.showAddUser);
    		if ('showUserDelete' in $$props) showUserDelete = $$props.showUserDelete;
    		if ('showEditUser' in $$props) showEditUser = $$props.showEditUser;
    		if ('showAddRole' in $$props) $$invalidate(3, showAddRole = $$props.showAddRole);
    		if ('showRoleDelete' in $$props) showRoleDelete = $$props.showRoleDelete;
    		if ('showEditRole' in $$props) showEditRole = $$props.showEditRole;
    		if ('showAddRoom' in $$props) $$invalidate(4, showAddRoom = $$props.showAddRoom);
    		if ('showRoomDelete' in $$props) $$invalidate(5, showRoomDelete = $$props.showRoomDelete);
    		if ('showEditRoom' in $$props) $$invalidate(6, showEditRoom = $$props.showEditRoom);
    		if ('showCategories' in $$props) $$invalidate(7, showCategories = $$props.showCategories);
    		if ('categories_class' in $$props) $$invalidate(8, categories_class = $$props.categories_class);
    		if ('showProducts' in $$props) $$invalidate(9, showProducts = $$props.showProducts);
    		if ('products_class' in $$props) $$invalidate(10, products_class = $$props.products_class);
    		if ('showUsers' in $$props) $$invalidate(11, showUsers = $$props.showUsers);
    		if ('users_class' in $$props) $$invalidate(12, users_class = $$props.users_class);
    		if ('showRoles' in $$props) $$invalidate(13, showRoles = $$props.showRoles);
    		if ('roles_class' in $$props) $$invalidate(14, roles_class = $$props.roles_class);
    		if ('showRooms' in $$props) $$invalidate(15, showRooms = $$props.showRooms);
    		if ('rooms_class' in $$props) $$invalidate(16, rooms_class = $$props.rooms_class);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		showAddCategory,
    		showAddProduct,
    		showAddUser,
    		showAddRole,
    		showAddRoom,
    		showRoomDelete,
    		showEditRoom,
    		showCategories,
    		categories_class,
    		showProducts,
    		products_class,
    		showUsers,
    		users_class,
    		showRoles,
    		roles_class,
    		showRooms,
    		rooms_class,
    		$categoryStore,
    		$productStore,
    		$roleStore,
    		$userStore,
    		$roomStore,
    		showHideCategories,
    		showHideProducts,
    		showHideUsers,
    		showHideRoles,
    		showHideRooms,
    		user,
    		func,
    		click_handler,
    		func_1,
    		click_handler_3,
    		click_handler_4,
    		func_2,
    		click_handler_7,
    		func_3,
    		click_handler_10,
    		func_4,
    		click_handler_13,
    		func_5,
    		func_6,
    		click_handler_14,
    		click_handler_15,
    		click_handler_16,
    		click_handler_17,
    		click_handler_18,
    		click_handler_19,
    		click_handler_20
    	];
    }

    class MobileAdd extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {}, null, [-1, -1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MobileAdd",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\mobileWaiter\WaiterOrders.svelte generated by Svelte v3.59.2 */

    const { console: console_1$3 } = globals;

    const file$4 = "src\\mobileWaiter\\WaiterOrders.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[21] = list[i];
    	return child_ctx;
    }

    // (101:8) {#each $orderStore as order}
    function create_each_block$3(ctx) {
    	let ordercomponent;
    	let current;

    	ordercomponent = new OrderComponent({
    			props: {
    				order: /*order*/ ctx[21],
    				user_role: /*user*/ ctx[2].role
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(ordercomponent.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(ordercomponent, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const ordercomponent_changes = {};
    			if (dirty & /*$orderStore*/ 2) ordercomponent_changes.order = /*order*/ ctx[21];
    			ordercomponent.$set(ordercomponent_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(ordercomponent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(ordercomponent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(ordercomponent, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(101:8) {#each $orderStore as order}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let t0;
    	let section;
    	let addordermodal;
    	let t1;
    	let div0;
    	let h2;
    	let i0;
    	let t2;
    	let t3;
    	let button0;
    	let p0;
    	let t5;
    	let i1;
    	let t6;
    	let div1;
    	let t7;
    	let div2;
    	let button1;
    	let i2;
    	let t8;
    	let p1;
    	let t10;
    	let button2;
    	let i3;
    	let t11;
    	let p2;
    	let t13;
    	let button3;
    	let i4;
    	let t14;
    	let p3;
    	let t16;
    	let button4;
    	let i5;
    	let t17;
    	let p4;
    	let current;
    	let mounted;
    	let dispose;

    	addordermodal = new AddOrderModal({
    			props: {
    				show: /*showAddOrder*/ ctx[0],
    				close: /*func*/ ctx[3]
    			},
    			$$inline: true
    		});

    	let each_value = /*$orderStore*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			t0 = space();
    			section = element("section");
    			create_component(addordermodal.$$.fragment);
    			t1 = space();
    			div0 = element("div");
    			h2 = element("h2");
    			i0 = element("i");
    			t2 = text(" Buyurtmalar");
    			t3 = space();
    			button0 = element("button");
    			p0 = element("p");
    			p0.textContent = "Yangi buyurtma";
    			t5 = space();
    			i1 = element("i");
    			t6 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t7 = space();
    			div2 = element("div");
    			button1 = element("button");
    			i2 = element("i");
    			t8 = space();
    			p1 = element("p");
    			p1.textContent = "Buyurtmalar";
    			t10 = space();
    			button2 = element("button");
    			i3 = element("i");
    			t11 = space();
    			p2 = element("p");
    			p2.textContent = "Mahsulotlar";
    			t13 = space();
    			button3 = element("button");
    			i4 = element("i");
    			t14 = space();
    			p3 = element("p");
    			p3.textContent = "Xonalar";
    			t16 = space();
    			button4 = element("button");
    			i5 = element("i");
    			t17 = space();
    			p4 = element("p");
    			p4.textContent = "Profile";
    			document.title = "Buyurtmalar";
    			attr_dev(i0, "class", "bi bi-clipboard-fill text-2xl text-indigo-500");
    			add_location(i0, file$4, 93, 68, 2802);
    			attr_dev(h2, "class", "outline-none text-xl font-bold text-indigo-500");
    			add_location(h2, file$4, 93, 8, 2742);
    			attr_dev(p0, "class", "text-sm font-bold");
    			add_location(p0, file$4, 95, 12, 3049);
    			attr_dev(i1, "class", "bi bi-plus text-2xl");
    			add_location(i1, file$4, 96, 12, 3110);
    			attr_dev(button0, "class", "flex items-center gap-1 shadow-sm bg-indigo-500 text-zinc-100 font-bold px-2 rounded-md");
    			add_location(button0, file$4, 94, 8, 2890);
    			attr_dev(div0, "class", "grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-white shadow-md p-3 h-fit");
    			add_location(div0, file$4, 92, 4, 2621);
    			attr_dev(div1, "class", "grow flex flex-col gap-2 p-2");
    			add_location(div1, file$4, 99, 4, 3182);
    			attr_dev(i2, "class", "bi bi-clipboard-fill text-2xl");
    			add_location(i2, file$4, 106, 12, 3610);
    			attr_dev(p1, "class", "text-[9px] font-bold");
    			add_location(p1, file$4, 107, 12, 3669);
    			attr_dev(button1, "class", "flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl");
    			add_location(button1, file$4, 105, 8, 3480);
    			attr_dev(i3, "class", "bi bi-box-seam-fill text-2xl");
    			add_location(i3, file$4, 110, 12, 3881);
    			attr_dev(p2, "class", "text-[10px] font-bold");
    			add_location(p2, file$4, 111, 12, 3939);
    			attr_dev(button2, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button2, file$4, 109, 8, 3745);
    			attr_dev(i4, "class", "bi bi-door-open-fill text-2xl");
    			add_location(i4, file$4, 114, 12, 4150);
    			attr_dev(p3, "class", "text-[9px] font-bold");
    			add_location(p3, file$4, 115, 12, 4209);
    			attr_dev(button3, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button3, file$4, 113, 8, 4016);
    			attr_dev(i5, "class", "bi bi-person-fill text-2xl");
    			add_location(i5, file$4, 118, 12, 4417);
    			attr_dev(p4, "class", "text-[9px] font-bold");
    			add_location(p4, file$4, 119, 12, 4473);
    			attr_dev(button4, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button4, file$4, 117, 8, 4281);
    			attr_dev(div2, "class", "grow-0 h-fit grid grid-cols-4 bg-white px-2 py-2 sticky bottom-0 right-0 left-0 shadow-md");
    			add_location(div2, file$4, 104, 4, 3367);
    			attr_dev(section, "class", "flex flex-col min-h-screen");
    			add_location(section, file$4, 90, 0, 2492);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			mount_component(addordermodal, section, null);
    			append_dev(section, t1);
    			append_dev(section, div0);
    			append_dev(div0, h2);
    			append_dev(h2, i0);
    			append_dev(h2, t2);
    			append_dev(div0, t3);
    			append_dev(div0, button0);
    			append_dev(button0, p0);
    			append_dev(button0, t5);
    			append_dev(button0, i1);
    			append_dev(section, t6);
    			append_dev(section, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div1, null);
    				}
    			}

    			append_dev(section, t7);
    			append_dev(section, div2);
    			append_dev(div2, button1);
    			append_dev(button1, i2);
    			append_dev(button1, t8);
    			append_dev(button1, p1);
    			append_dev(div2, t10);
    			append_dev(div2, button2);
    			append_dev(button2, i3);
    			append_dev(button2, t11);
    			append_dev(button2, p2);
    			append_dev(div2, t13);
    			append_dev(div2, button3);
    			append_dev(button3, i4);
    			append_dev(button3, t14);
    			append_dev(button3, p3);
    			append_dev(div2, t16);
    			append_dev(div2, button4);
    			append_dev(button4, i5);
    			append_dev(button4, t17);
    			append_dev(button4, p4);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[4], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[5], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[6], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_3*/ ctx[7], false, false, false, false),
    					listen_dev(button4, "click", /*click_handler_4*/ ctx[8], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const addordermodal_changes = {};
    			if (dirty & /*showAddOrder*/ 1) addordermodal_changes.show = /*showAddOrder*/ ctx[0];
    			if (dirty & /*showAddOrder*/ 1) addordermodal_changes.close = /*func*/ ctx[3];
    			addordermodal.$set(addordermodal_changes);

    			if (dirty & /*$orderStore, user*/ 6) {
    				each_value = /*$orderStore*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addordermodal.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addordermodal.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_component(addordermodal);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $orderStore;
    	validate_store(orderStore, 'orderStore');
    	component_subscribe($$self, orderStore, $$value => $$invalidate(1, $orderStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WaiterOrders', slots, []);
    	const user = JSON.parse(localStorage.getItem('user'));
    	const token = localStorage.getItem("token");
    	const userEndpoint = new UserEndpoint();

    	async function checkToken() {
    		try {
    			const res = await userEndpoint.getTokenVerify(token);

    			if (res.status == 200) {
    				localStorage.setItem("user", JSON.stringify(res.data.user));
    			}
    		} catch(error) {
    			navigate('/login');
    		}
    	}

    	if (!token || !user) {
    		localStorage.clear();
    		navigate('/login');
    	} else {
    		checkToken();
    	}

    	const orderEndpoint = new OrderEndpoint();
    	const productInOrderEndpoint = new ProductInOrderEndpoint();
    	const roomEndpoint = new RoomEndpoint();
    	const categoryEndpoint = new CategoryEndpoint();
    	const productEndpoint = new ProductEndpoint();

    	// get products
    	async function getProducts() {
    		try {
    			const res = await productEndpoint.get();
    			const products = res.data.products;
    			productStore.set(products);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getProducts();

    	// get categories
    	async function getCategories() {
    		try {
    			const res = await categoryEndpoint.get();
    			const categories = res.data.categories;
    			categoryStore.set(categories);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getCategories();
    	let showAddOrder = false;

    	// get rooms
    	async function getRooms() {
    		try {
    			const res = await roomEndpoint.get(token);
    			const rooms = res.data.rooms;
    			roomStore.set(rooms);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getRooms();

    	// get waiter orders
    	async function getOrders() {
    		try {
    			const res = await orderEndpoint.getWaiterOrders(token);
    			const orders = res.data.orders;
    			orderStore.set(orders);
    			console.log(orders);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getOrders();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$3.warn(`<WaiterOrders> was created with unknown prop '${key}'`);
    	});

    	const func = () => $$invalidate(0, showAddOrder = false);

    	const click_handler = () => {
    		$$invalidate(0, showAddOrder = true);
    	};

    	const click_handler_1 = () => {
    		navigate('/w');
    	};

    	const click_handler_2 = () => {
    		navigate('/products');
    	};

    	const click_handler_3 = () => {
    		navigate('/wrooms');
    	};

    	const click_handler_4 = () => {
    		navigate('/wprofile');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		categoryStore,
    		orderStore,
    		productInOrderStore,
    		roomStore,
    		productStore,
    		UserEndpoint,
    		RoomEndpoint,
    		OrderEndpoint,
    		ProductInOrderEndpoint,
    		CategoryEndpoint,
    		ProductEndpoint,
    		OrderComponent,
    		AddOrderModal,
    		user,
    		token,
    		userEndpoint,
    		checkToken,
    		orderEndpoint,
    		productInOrderEndpoint,
    		roomEndpoint,
    		categoryEndpoint,
    		productEndpoint,
    		getProducts,
    		getCategories,
    		showAddOrder,
    		getRooms,
    		getOrders,
    		$orderStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('showAddOrder' in $$props) $$invalidate(0, showAddOrder = $$props.showAddOrder);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		showAddOrder,
    		$orderStore,
    		user,
    		func,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	];
    }

    class WaiterOrders extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WaiterOrders",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\components\CategoryComponent.svelte generated by Svelte v3.59.2 */

    const file$3 = "src\\components\\CategoryComponent.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (22:12) {:else}
    function create_else_block$2(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-down");
    			add_location(i, file$3, 22, 117, 930);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-violet-500 text-xl text-gray-100");
    			add_location(button, file$3, 22, 16, 829);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideProducts*/ ctx[3], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(22:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (20:12) {#if showProducts}
    function create_if_block$2(ctx) {
    	let button;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			i = element("i");
    			attr_dev(i, "class", "bi bi-chevron-up");
    			add_location(i, file$3, 20, 117, 750);
    			attr_dev(button, "class", "px-2 py-1 rounded-md bg-violet-500 text-xl text-gray-100");
    			add_location(button, file$3, 20, 16, 649);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, i);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*showHideProducts*/ ctx[3], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(20:12) {#if showProducts}",
    		ctx
    	});

    	return block;
    }

    // (33:8) {#each category.products as product, index}
    function create_each_block$2(ctx) {
    	let div;
    	let p0;
    	let t0_value = /*index*/ ctx[6] + 1 + "";
    	let t0;
    	let t1;
    	let p1;
    	let t2_value = /*product*/ ctx[4].name + "";
    	let t2;
    	let t3;
    	let p2;
    	let t4_value = /*product*/ ctx[4].price + "";
    	let t4;
    	let t5;
    	let t6;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			p2 = element("p");
    			t4 = text(t4_value);
    			t5 = text(" so'm");
    			t6 = space();
    			attr_dev(p0, "class", "col-span-1 text-center");
    			add_location(p0, file$3, 34, 16, 1562);
    			attr_dev(p1, "class", "col-span-3 text-center");
    			add_location(p1, file$3, 35, 16, 1629);
    			attr_dev(p2, "class", "col-span-4 text-center");
    			add_location(p2, file$3, 36, 16, 1699);
    			attr_dev(div, "class", "grid grid-cols-8 justify-items-center py-2 border-t-[1px] border-violet-500");
    			add_location(div, file$3, 33, 12, 1455);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(p0, t0);
    			append_dev(div, t1);
    			append_dev(div, p1);
    			append_dev(p1, t2);
    			append_dev(div, t3);
    			append_dev(div, p2);
    			append_dev(p2, t4);
    			append_dev(p2, t5);
    			append_dev(div, t6);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*category*/ 1 && t2_value !== (t2_value = /*product*/ ctx[4].name + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*category*/ 1 && t4_value !== (t4_value = /*product*/ ctx[4].price + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(33:8) {#each category.products as product, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div4;
    	let div1;
    	let p0;
    	let t0_value = /*category*/ ctx[0].name + " (" + /*category*/ ctx[0].products.length + ")" + "";
    	let t0;
    	let t1;
    	let div0;
    	let t2;
    	let div3;
    	let div2;
    	let p1;
    	let t4;
    	let p2;
    	let t6;
    	let p3;
    	let t8;
    	let div3_class_value;

    	function select_block_type(ctx, dirty) {
    		if (/*showProducts*/ ctx[1]) return create_if_block$2;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);
    	let each_value = /*category*/ ctx[0].products;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div1 = element("div");
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			if_block.c();
    			t2 = space();
    			div3 = element("div");
    			div2 = element("div");
    			p1 = element("p");
    			p1.textContent = "T/r";
    			t4 = space();
    			p2 = element("p");
    			p2.textContent = "Nomi";
    			t6 = space();
    			p3 = element("p");
    			p3.textContent = "Narxi";
    			t8 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(p0, "class", "text-xl font-semibold");
    			add_location(p0, file$3, 17, 8, 460);
    			attr_dev(div0, "class", "flex gap-1 items-center");
    			add_location(div0, file$3, 18, 8, 562);
    			attr_dev(div1, "class", "flex justify-between items-center");
    			add_location(div1, file$3, 16, 4, 403);
    			attr_dev(p1, "class", "col-span-1 text-center font-semibold");
    			add_location(p1, file$3, 28, 12, 1176);
    			attr_dev(p2, "class", "col-span-3 text-center font-semibold");
    			add_location(p2, file$3, 29, 12, 1245);
    			attr_dev(p3, "class", "col-span-4 text-center font-semibold");
    			add_location(p3, file$3, 30, 12, 1315);
    			attr_dev(div2, "class", "grid grid-cols-8 justify-items-center py-2");
    			add_location(div2, file$3, 27, 8, 1106);
    			attr_dev(div3, "class", div3_class_value = "" + (/*products_class*/ ctx[2] + " flex flex-col bg-slate-200 rounded-lg p-2"));
    			add_location(div3, file$3, 26, 4, 1024);
    			attr_dev(div4, "class", "users flex flex-col gap-3 p-3 bg-white rounded-lg shadow-md");
    			add_location(div4, file$3, 15, 0, 324);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div1);
    			append_dev(div1, p0);
    			append_dev(p0, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			if_block.m(div0, null);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, p1);
    			append_dev(div2, t4);
    			append_dev(div2, p2);
    			append_dev(div2, t6);
    			append_dev(div2, p3);
    			append_dev(div3, t8);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div3, null);
    				}
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*category*/ 1 && t0_value !== (t0_value = /*category*/ ctx[0].name + " (" + /*category*/ ctx[0].products.length + ")" + "")) set_data_dev(t0, t0_value);

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			}

    			if (dirty & /*category*/ 1) {
    				each_value = /*category*/ ctx[0].products;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div3, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*products_class*/ 4 && div3_class_value !== (div3_class_value = "" + (/*products_class*/ ctx[2] + " flex flex-col bg-slate-200 rounded-lg p-2"))) {
    				attr_dev(div3, "class", div3_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if_block.d();
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CategoryComponent', slots, []);
    	let { category } = $$props;
    	let showProducts = false;
    	let products_class = 'hidden';

    	function showHideProducts() {
    		if (showProducts) {
    			$$invalidate(1, showProducts = false);
    			$$invalidate(2, products_class = 'hidden');
    		} else {
    			$$invalidate(1, showProducts = true);
    			$$invalidate(2, products_class = '');
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (category === undefined && !('category' in $$props || $$self.$$.bound[$$self.$$.props['category']])) {
    			console.warn("<CategoryComponent> was created without expected prop 'category'");
    		}
    	});

    	const writable_props = ['category'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CategoryComponent> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('category' in $$props) $$invalidate(0, category = $$props.category);
    	};

    	$$self.$capture_state = () => ({
    		category,
    		showProducts,
    		products_class,
    		showHideProducts
    	});

    	$$self.$inject_state = $$props => {
    		if ('category' in $$props) $$invalidate(0, category = $$props.category);
    		if ('showProducts' in $$props) $$invalidate(1, showProducts = $$props.showProducts);
    		if ('products_class' in $$props) $$invalidate(2, products_class = $$props.products_class);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [category, showProducts, products_class, showHideProducts];
    }

    class CategoryComponent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { category: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CategoryComponent",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get category() {
    		throw new Error("<CategoryComponent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set category(value) {
    		throw new Error("<CategoryComponent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\mobileWaiter\Products.svelte generated by Svelte v3.59.2 */

    const { console: console_1$2 } = globals;
    const file$2 = "src\\mobileWaiter\\Products.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (50:8) {#each $categoryStore as category}
    function create_each_block$1(ctx) {
    	let categorycomponent;
    	let current;

    	categorycomponent = new CategoryComponent({
    			props: { category: /*category*/ ctx[12] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(categorycomponent.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(categorycomponent, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const categorycomponent_changes = {};
    			if (dirty & /*$categoryStore*/ 1) categorycomponent_changes.category = /*category*/ ctx[12];
    			categorycomponent.$set(categorycomponent_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(categorycomponent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(categorycomponent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(categorycomponent, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(50:8) {#each $categoryStore as category}",
    		ctx
    	});

    	return block;
    }

    // (73:4) {:else}
    function create_else_block$1(ctx) {
    	let div;
    	let button;
    	let i;
    	let t;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			i = element("i");
    			t = text(" Ortga qaytish");
    			attr_dev(i, "class", "bi bi-arrow-left");
    			add_location(i, file$2, 74, 133, 3244);
    			attr_dev(button, "class", "bg-indigo-500 text-stone-100 font-semibold w-full rounded-xl py-2");
    			add_location(button, file$2, 74, 12, 3123);
    			attr_dev(div, "class", "grow-0 bg-white p-5 sticky bottom-0 right-0 left-0");
    			add_location(div, file$2, 73, 8, 3045);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    			append_dev(button, i);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler_4*/ ctx[6], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(73:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (54:4) {#if user.role == "waiter"}
    function create_if_block$1(ctx) {
    	let div;
    	let button0;
    	let i0;
    	let t0;
    	let p0;
    	let t2;
    	let button1;
    	let i1;
    	let t3;
    	let p1;
    	let t5;
    	let button2;
    	let i2;
    	let t6;
    	let p2;
    	let t8;
    	let button3;
    	let i3;
    	let t9;
    	let p3;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t0 = space();
    			p0 = element("p");
    			p0.textContent = "Buyurtmalar";
    			t2 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "Mahsulotlar";
    			t5 = space();
    			button2 = element("button");
    			i2 = element("i");
    			t6 = space();
    			p2 = element("p");
    			p2.textContent = "Xonalar";
    			t8 = space();
    			button3 = element("button");
    			i3 = element("i");
    			t9 = space();
    			p3 = element("p");
    			p3.textContent = "Profile";
    			attr_dev(i0, "class", "bi bi-clipboard-fill text-2xl");
    			add_location(i0, file$2, 56, 16, 2024);
    			attr_dev(p0, "class", "text-[9px] font-bold");
    			add_location(p0, file$2, 57, 16, 2087);
    			attr_dev(button0, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button0, file$2, 55, 12, 1891);
    			attr_dev(i1, "class", "bi bi-box-seam-fill text-2xl");
    			add_location(i1, file$2, 60, 16, 2312);
    			attr_dev(p1, "class", "text-[10px] font-bold");
    			add_location(p1, file$2, 61, 16, 2374);
    			attr_dev(button1, "class", "flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl");
    			add_location(button1, file$2, 59, 12, 2171);
    			attr_dev(i2, "class", "bi bi-door-open-fill text-2xl");
    			add_location(i2, file$2, 64, 16, 2597);
    			attr_dev(p2, "class", "text-[9px] font-bold");
    			add_location(p2, file$2, 65, 16, 2660);
    			attr_dev(button2, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button2, file$2, 63, 12, 2459);
    			attr_dev(i3, "class", "bi bi-person-fill text-2xl");
    			add_location(i3, file$2, 68, 16, 2880);
    			attr_dev(p3, "class", "text-[9px] font-bold");
    			add_location(p3, file$2, 69, 16, 2940);
    			attr_dev(button3, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button3, file$2, 67, 12, 2740);
    			attr_dev(div, "class", "grow-0 h-fit grid grid-cols-4 bg-white px-2 py-2 sticky bottom-0 right-0 left-0");
    			add_location(div, file$2, 54, 8, 1784);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(button0, i0);
    			append_dev(button0, t0);
    			append_dev(button0, p0);
    			append_dev(div, t2);
    			append_dev(div, button1);
    			append_dev(button1, i1);
    			append_dev(button1, t3);
    			append_dev(button1, p1);
    			append_dev(div, t5);
    			append_dev(div, button2);
    			append_dev(button2, i2);
    			append_dev(button2, t6);
    			append_dev(button2, p2);
    			append_dev(div, t8);
    			append_dev(div, button3);
    			append_dev(button3, i3);
    			append_dev(button3, t9);
    			append_dev(button3, p3);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[2], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[3], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[4], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_3*/ ctx[5], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(54:4) {#if user.role == \\\"waiter\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let t0;
    	let section;
    	let div0;
    	let h2;
    	let i;
    	let t1;
    	let t2;
    	let div1;
    	let t3;
    	let current;
    	let each_value = /*$categoryStore*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	function select_block_type(ctx, dirty) {
    		if (/*user*/ ctx[1].role == "waiter") return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			t0 = space();
    			section = element("section");
    			div0 = element("div");
    			h2 = element("h2");
    			i = element("i");
    			t1 = text(" Mahsulotlar");
    			t2 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			if_block.c();
    			document.title = "Mahsulotlar";
    			attr_dev(i, "class", "bi bi-box-seam-fill text-2xl text-indigo-500");
    			add_location(i, file$2, 46, 68, 1476);
    			attr_dev(h2, "class", "outline-none text-xl font-bold text-indigo-500");
    			add_location(h2, file$2, 46, 8, 1416);
    			attr_dev(div0, "class", "grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-white p-3 h-fit");
    			add_location(div0, file$2, 45, 4, 1305);
    			attr_dev(div1, "class", "grow flex flex-col gap-2 p-2");
    			add_location(div1, file$2, 48, 4, 1571);
    			attr_dev(section, "class", "flex flex-col min-h-screen");
    			add_location(section, file$2, 44, 0, 1255);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, h2);
    			append_dev(h2, i);
    			append_dev(h2, t1);
    			append_dev(section, t2);
    			append_dev(section, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div1, null);
    				}
    			}

    			append_dev(section, t3);
    			if_block.m(section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$categoryStore*/ 1) {
    				each_value = /*$categoryStore*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $categoryStore;
    	validate_store(categoryStore, 'categoryStore');
    	component_subscribe($$self, categoryStore, $$value => $$invalidate(0, $categoryStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Products', slots, []);
    	const user = JSON.parse(localStorage.getItem('user'));
    	const token = localStorage.getItem("token");
    	const userEndpoint = new UserEndpoint();

    	async function checkToken() {
    		try {
    			const res = await userEndpoint.getTokenVerify(token);

    			if (res.status == 200) {
    				localStorage.setItem("user", JSON.stringify(res.data.user));
    				console.log("Verify success");
    			}
    		} catch(error) {
    			navigate('/login');
    		}
    	}

    	if (!token || !user) {
    		localStorage.clear();
    		navigate('/login');
    	} else {
    		checkToken();
    	}

    	const categoryEndpoint = new CategoryEndpoint();

    	async function getCategories() {
    		try {
    			const res = await categoryEndpoint.get();
    			const categories = res.data.categories;
    			categoryStore.set(categories);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getCategories();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<Products> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		navigate('/w');
    	};

    	const click_handler_1 = () => {
    		navigate('/products');
    	};

    	const click_handler_2 = () => {
    		navigate('/wrooms');
    	};

    	const click_handler_3 = () => {
    		navigate('/wprofile');
    	};

    	const click_handler_4 = () => {
    		navigate('/madd');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		UserEndpoint,
    		CategoryEndpoint,
    		ProductEndpoint,
    		categoryStore,
    		productStore,
    		CategoryComponent,
    		user,
    		token,
    		userEndpoint,
    		checkToken,
    		categoryEndpoint,
    		getCategories,
    		$categoryStore
    	});

    	return [
    		$categoryStore,
    		user,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	];
    }

    class Products extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Products",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\mobileWaiter\WaiterRooms.svelte generated by Svelte v3.59.2 */

    const { console: console_1$1 } = globals;

    const file$1 = "src\\mobileWaiter\\WaiterRooms.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    // (65:12) {:else}
    function create_else_block(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*$roomStore*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$roomStore*/ 2) {
    				each_value = /*$roomStore*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(65:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (63:12) {#if $roomStore.length == 0}
    function create_if_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Xonalar mavjud emas";
    			attr_dev(p, "class", "text-center text-md text-gray-400 font-medium");
    			add_location(p, file$1, 63, 16, 2040);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(63:12) {#if $roomStore.length == 0}",
    		ctx
    	});

    	return block;
    }

    // (66:16) {#each $roomStore as room}
    function create_each_block(ctx) {
    	let roomcomponent;
    	let current;

    	roomcomponent = new RoomComponent({
    			props: {
    				room_booked: /*room*/ ctx[13].booked,
    				room_name: /*room*/ ctx[13].name,
    				room_capacity: /*room*/ ctx[13].capacity,
    				room_desc: /*room*/ ctx[13].desc
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(roomcomponent.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(roomcomponent, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const roomcomponent_changes = {};
    			if (dirty & /*$roomStore*/ 2) roomcomponent_changes.room_booked = /*room*/ ctx[13].booked;
    			if (dirty & /*$roomStore*/ 2) roomcomponent_changes.room_name = /*room*/ ctx[13].name;
    			if (dirty & /*$roomStore*/ 2) roomcomponent_changes.room_capacity = /*room*/ ctx[13].capacity;
    			if (dirty & /*$roomStore*/ 2) roomcomponent_changes.room_desc = /*room*/ ctx[13].desc;
    			roomcomponent.$set(roomcomponent_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(roomcomponent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(roomcomponent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(roomcomponent, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(66:16) {#each $roomStore as room}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let t0;
    	let section;
    	let div0;
    	let h2;
    	let i0;
    	let t1;
    	let t2;
    	let div2;
    	let addroommodal;
    	let t3;
    	let div1;
    	let current_block_type_index;
    	let if_block;
    	let t4;
    	let div3;
    	let button0;
    	let i1;
    	let t5;
    	let p0;
    	let t7;
    	let button1;
    	let i2;
    	let t8;
    	let p1;
    	let t10;
    	let button2;
    	let i3;
    	let t11;
    	let p2;
    	let t13;
    	let button3;
    	let i4;
    	let t14;
    	let p3;
    	let current;
    	let mounted;
    	let dispose;

    	addroommodal = new AddRoomModal({
    			props: {
    				show: /*show_add*/ ctx[0],
    				close: /*func*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$roomStore*/ ctx[1].length == 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			t0 = space();
    			section = element("section");
    			div0 = element("div");
    			h2 = element("h2");
    			i0 = element("i");
    			t1 = text(" Xonalar");
    			t2 = space();
    			div2 = element("div");
    			create_component(addroommodal.$$.fragment);
    			t3 = space();
    			div1 = element("div");
    			if_block.c();
    			t4 = space();
    			div3 = element("div");
    			button0 = element("button");
    			i1 = element("i");
    			t5 = space();
    			p0 = element("p");
    			p0.textContent = "Buyurtmalar";
    			t7 = space();
    			button1 = element("button");
    			i2 = element("i");
    			t8 = space();
    			p1 = element("p");
    			p1.textContent = "Mahsulotlar";
    			t10 = space();
    			button2 = element("button");
    			i3 = element("i");
    			t11 = space();
    			p2 = element("p");
    			p2.textContent = "Xonalar";
    			t13 = space();
    			button3 = element("button");
    			i4 = element("i");
    			t14 = space();
    			p3 = element("p");
    			p3.textContent = "Profile";
    			document.title = "Xonalar";
    			attr_dev(i0, "class", "bi bi-door-open-fill text-2xl text-indigo-500");
    			add_location(i0, file$1, 57, 68, 1664);
    			attr_dev(h2, "class", "outline-none text-xl font-bold text-indigo-500");
    			add_location(h2, file$1, 57, 8, 1604);
    			attr_dev(div0, "class", "grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-white p-3 h-fit");
    			add_location(div0, file$1, 56, 4, 1493);
    			attr_dev(div1, "class", "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-start");
    			add_location(div1, file$1, 61, 8, 1900);
    			attr_dev(div2, "class", "grow flex flex-col gap-3 p-2 h-fit");
    			add_location(div2, file$1, 59, 4, 1756);
    			attr_dev(i1, "class", "bi bi-clipboard-fill text-2xl");
    			add_location(i1, file$1, 73, 12, 2648);
    			attr_dev(p0, "class", "text-[9px] font-bold");
    			add_location(p0, file$1, 74, 12, 2707);
    			attr_dev(button0, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button0, file$1, 72, 8, 2519);
    			attr_dev(i2, "class", "bi bi-box-seam-fill text-2xl");
    			add_location(i2, file$1, 77, 12, 2919);
    			attr_dev(p1, "class", "text-[9px] font-bold");
    			add_location(p1, file$1, 78, 12, 2977);
    			attr_dev(button1, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button1, file$1, 76, 8, 2783);
    			attr_dev(i3, "class", "bi bi-door-open-fill text-2xl");
    			add_location(i3, file$1, 81, 12, 3188);
    			attr_dev(p2, "class", "text-[10px] font-bold");
    			add_location(p2, file$1, 82, 12, 3247);
    			attr_dev(button2, "class", "flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl");
    			add_location(button2, file$1, 80, 8, 3053);
    			attr_dev(i4, "class", "bi bi-person-fill text-2xl");
    			add_location(i4, file$1, 85, 12, 3456);
    			attr_dev(p3, "class", "text-[9px] font-bold");
    			add_location(p3, file$1, 86, 12, 3512);
    			attr_dev(button3, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button3, file$1, 84, 8, 3320);
    			attr_dev(div3, "class", "grow-0 h-fit grid grid-cols-4 bg-white px-2 py-2 sticky bottom-0 right-0 left-0");
    			add_location(div3, file$1, 71, 4, 2416);
    			attr_dev(section, "class", "flex flex-col min-h-screen");
    			add_location(section, file$1, 55, 0, 1443);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, h2);
    			append_dev(h2, i0);
    			append_dev(h2, t1);
    			append_dev(section, t2);
    			append_dev(section, div2);
    			mount_component(addroommodal, div2, null);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			if_blocks[current_block_type_index].m(div1, null);
    			append_dev(section, t4);
    			append_dev(section, div3);
    			append_dev(div3, button0);
    			append_dev(button0, i1);
    			append_dev(button0, t5);
    			append_dev(button0, p0);
    			append_dev(div3, t7);
    			append_dev(div3, button1);
    			append_dev(button1, i2);
    			append_dev(button1, t8);
    			append_dev(button1, p1);
    			append_dev(div3, t10);
    			append_dev(div3, button2);
    			append_dev(button2, i3);
    			append_dev(button2, t11);
    			append_dev(button2, p2);
    			append_dev(div3, t13);
    			append_dev(div3, button3);
    			append_dev(button3, i4);
    			append_dev(button3, t14);
    			append_dev(button3, p3);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[3], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[4], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[5], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_3*/ ctx[6], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const addroommodal_changes = {};
    			if (dirty & /*show_add*/ 1) addroommodal_changes.show = /*show_add*/ ctx[0];
    			if (dirty & /*show_add*/ 1) addroommodal_changes.close = /*func*/ ctx[2];
    			addroommodal.$set(addroommodal_changes);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div1, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addroommodal.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addroommodal.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_component(addroommodal);
    			if_blocks[current_block_type_index].d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $roomStore;
    	validate_store(roomStore, 'roomStore');
    	component_subscribe($$self, roomStore, $$value => $$invalidate(1, $roomStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WaiterRooms', slots, []);
    	const user = JSON.parse(localStorage.getItem('user'));
    	const token = localStorage.getItem("token");
    	const userEndpoint = new UserEndpoint();

    	async function checkToken() {
    		try {
    			const res = await userEndpoint.getTokenVerify(token);

    			if (res.status == 200) {
    				if (res.data.user.role == "admin") {
    					navigate('/mrooms');
    				} else {
    					localStorage.setItem("user", JSON.stringify(res.data.user));
    					console.log("Verify success");
    				}
    			}
    		} catch(error) {
    			navigate('/login');
    		}
    	}

    	if (!token || !user) {
    		localStorage.clear();
    		navigate('/login');
    	} else {
    		checkToken();
    	}

    	let show_add = false;
    	const roomEndpoint = new RoomEndpoint();

    	// get rooms
    	async function getRooms() {
    		try {
    			const res = await roomEndpoint.get(token);
    			const rooms = res.data.rooms;
    			roomStore.set(rooms);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	getRooms();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<WaiterRooms> was created with unknown prop '${key}'`);
    	});

    	const func = () => $$invalidate(0, show_add = false);

    	const click_handler = () => {
    		navigate('/w');
    	};

    	const click_handler_1 = () => {
    		navigate('/products');
    	};

    	const click_handler_2 = () => {
    		navigate('/wrooms');
    	};

    	const click_handler_3 = () => {
    		navigate('/wprofile');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		roomStore,
    		RoomEndpoint,
    		UserEndpoint,
    		user,
    		token,
    		userEndpoint,
    		checkToken,
    		RoomComponent,
    		AddRoomModal,
    		show_add,
    		roomEndpoint,
    		getRooms,
    		$roomStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('show_add' in $$props) $$invalidate(0, show_add = $$props.show_add);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		show_add,
    		$roomStore,
    		func,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3
    	];
    }

    class WaiterRooms extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WaiterRooms",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\mobileWaiter\WaiterProfile.svelte generated by Svelte v3.59.2 */

    const { console: console_1 } = globals;
    const file = "src\\mobileWaiter\\WaiterProfile.svelte";

    function create_fragment$1(ctx) {
    	let t0;
    	let section;
    	let div14;
    	let div4;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let div3;
    	let div2;
    	let p0;
    	let t4;
    	let span;
    	let p1;
    	let t6;
    	let p2;
    	let t8;
    	let img;
    	let img_src_value;
    	let t9;
    	let div13;
    	let div5;
    	let p3;
    	let i0;
    	let t10;
    	let t11;
    	let p4;
    	let t13;
    	let div6;
    	let p5;
    	let i1;
    	let t14;
    	let t15;
    	let p6;
    	let t17;
    	let div7;
    	let p7;
    	let i2;
    	let t18;
    	let t19;
    	let p8;
    	let t21;
    	let div8;
    	let p9;
    	let i3;
    	let t22;
    	let t23;
    	let p10;
    	let t25;
    	let div9;
    	let p11;
    	let i4;
    	let t26;
    	let t27;
    	let button0;
    	let t29;
    	let div10;
    	let p12;
    	let i5;
    	let t30;
    	let t31;
    	let p13;
    	let t34;
    	let div11;
    	let p14;
    	let i6;
    	let t35;
    	let t36;
    	let p15;
    	let t38;
    	let div12;
    	let button1;
    	let i7;
    	let t39;
    	let t40;
    	let div15;
    	let button2;
    	let i8;
    	let t41;
    	let p16;
    	let t43;
    	let button3;
    	let i9;
    	let t44;
    	let p17;
    	let t46;
    	let button4;
    	let i10;
    	let t47;
    	let p18;
    	let t49;
    	let button5;
    	let i11;
    	let t50;
    	let p19;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			t0 = space();
    			section = element("section");
    			div14 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			t1 = space();
    			div1 = element("div");
    			t2 = space();
    			div3 = element("div");
    			div2 = element("div");
    			p0 = element("p");
    			p0.textContent = "Buyurtmalarim soni";
    			t4 = space();
    			span = element("span");
    			p1 = element("p");
    			p1.textContent = `${/*user*/ ctx[0].orders}`;
    			t6 = space();
    			p2 = element("p");
    			p2.textContent = "ta";
    			t8 = space();
    			img = element("img");
    			t9 = space();
    			div13 = element("div");
    			div5 = element("div");
    			p3 = element("p");
    			i0 = element("i");
    			t10 = text(" Username:");
    			t11 = space();
    			p4 = element("p");
    			p4.textContent = `${/*user*/ ctx[0].username}`;
    			t13 = space();
    			div6 = element("div");
    			p5 = element("p");
    			i1 = element("i");
    			t14 = text(" Ism:");
    			t15 = space();
    			p6 = element("p");
    			p6.textContent = `${/*user*/ ctx[0].name}`;
    			t17 = space();
    			div7 = element("div");
    			p7 = element("p");
    			i2 = element("i");
    			t18 = text(" Rol:");
    			t19 = space();
    			p8 = element("p");
    			p8.textContent = `${/*user*/ ctx[0].role.toLocaleUpperCase()}`;
    			t21 = space();
    			div8 = element("div");
    			p9 = element("p");
    			i3 = element("i");
    			t22 = text(" Telefon:");
    			t23 = space();
    			p10 = element("p");
    			p10.textContent = `${/*user*/ ctx[0].phone}`;
    			t25 = space();
    			div9 = element("div");
    			p11 = element("p");
    			i4 = element("i");
    			t26 = text(" Email:");
    			t27 = space();
    			button0 = element("button");
    			button0.textContent = `${/*user*/ ctx[0].email}`;
    			t29 = space();
    			div10 = element("div");
    			p12 = element("p");
    			i5 = element("i");
    			t30 = text(" Oylik maosh:");
    			t31 = space();
    			p13 = element("p");
    			p13.textContent = `${/*user*/ ctx[0].salary} so'm`;
    			t34 = space();
    			div11 = element("div");
    			p14 = element("p");
    			i6 = element("i");
    			t35 = text(" Ro'yhatdan o'tgan sana:");
    			t36 = space();
    			p15 = element("p");
    			p15.textContent = `${/*user*/ ctx[0].create_date.toString().split('T')[0]}`;
    			t38 = space();
    			div12 = element("div");
    			button1 = element("button");
    			i7 = element("i");
    			t39 = text("  Tizimdan chiqish");
    			t40 = space();
    			div15 = element("div");
    			button2 = element("button");
    			i8 = element("i");
    			t41 = space();
    			p16 = element("p");
    			p16.textContent = "Buyurtmalar";
    			t43 = space();
    			button3 = element("button");
    			i9 = element("i");
    			t44 = space();
    			p17 = element("p");
    			p17.textContent = "Mahsulotlar";
    			t46 = space();
    			button4 = element("button");
    			i10 = element("i");
    			t47 = space();
    			p18 = element("p");
    			p18.textContent = "Xonalar";
    			t49 = space();
    			button5 = element("button");
    			i11 = element("i");
    			t50 = space();
    			p19 = element("p");
    			p19.textContent = "Profile";
    			document.title = "Profile";
    			attr_dev(div0, "class", "mx-5 h-[6px] bg-violet-300 bottom-0 right-0 left-0 top-10 z-10 shadow-sm rounded-t-xl");
    			add_location(div0, file, 45, 12, 1223);
    			attr_dev(div1, "class", "mx-3 h-[8px] bg-violet-400 bottom-0 right-0 left-0 top-10 z-10 rounded-t-xl");
    			add_location(div1, file, 46, 12, 1342);
    			attr_dev(p0, "class", "text-md font-bold");
    			add_location(p0, file, 49, 20, 1624);
    			attr_dev(p1, "class", "text-3xl font-semibold");
    			add_location(p1, file, 51, 24, 1758);
    			attr_dev(p2, "class", "text-md font-medium");
    			add_location(p2, file, 52, 24, 1835);
    			attr_dev(span, "class", "flex items-end gap-2");
    			add_location(span, file, 50, 20, 1697);
    			attr_dev(div2, "class", "flex flex-col gap-3 p-2");
    			add_location(div2, file, 48, 16, 1565);
    			attr_dev(img, "class", "w-1/2");
    			if (!src_url_equal(img.src, img_src_value = "https://cdni.iconscout.com/illustration/premium/thumb/online-order-2750347-2294212.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "order-illustration");
    			add_location(img, file, 55, 16, 1944);
    			attr_dev(div3, "class", "flex items-center gap-3 p-3 bg-violet-500 rounded-xl text-stone-100 shadow-sm z-20");
    			add_location(div3, file, 47, 12, 1451);
    			attr_dev(div4, "class", "flex flex-col");
    			add_location(div4, file, 44, 8, 1182);
    			attr_dev(i0, "class", "bi bi-at");
    			add_location(i0, file, 61, 45, 2326);
    			attr_dev(p3, "class", "font-bold text-sm");
    			add_location(p3, file, 61, 16, 2297);
    			attr_dev(p4, "class", "font-medium text-md");
    			add_location(p4, file, 62, 16, 2382);
    			attr_dev(div5, "class", "flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm");
    			add_location(div5, file, 60, 12, 2189);
    			attr_dev(i1, "class", "bi bi-person");
    			add_location(i1, file, 65, 45, 2603);
    			attr_dev(p5, "class", "font-bold text-sm");
    			add_location(p5, file, 65, 16, 2574);
    			attr_dev(p6, "class", "font-medium text-md");
    			add_location(p6, file, 66, 16, 2658);
    			attr_dev(div6, "class", "flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm");
    			add_location(div6, file, 64, 12, 2466);
    			attr_dev(i2, "class", "bi bi-shield-check");
    			add_location(i2, file, 69, 45, 2875);
    			attr_dev(p7, "class", "font-bold text-sm");
    			add_location(p7, file, 69, 16, 2846);
    			attr_dev(p8, "class", "font-medium text-md");
    			add_location(p8, file, 70, 16, 2936);
    			attr_dev(div7, "class", "flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm");
    			add_location(div7, file, 68, 12, 2738);
    			attr_dev(i3, "class", "bi bi-phone");
    			add_location(i3, file, 73, 45, 3173);
    			attr_dev(p9, "class", "font-bold text-sm");
    			add_location(p9, file, 73, 16, 3144);
    			attr_dev(p10, "class", "font-medium text-md");
    			add_location(p10, file, 74, 16, 3231);
    			attr_dev(div8, "class", "flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm");
    			add_location(div8, file, 72, 12, 3036);
    			attr_dev(i4, "class", "bi bi-envelope");
    			add_location(i4, file, 77, 45, 3454);
    			attr_dev(p11, "class", "font-bold text-sm");
    			add_location(p11, file, 77, 16, 3425);
    			attr_dev(button0, "class", "font-medium text-sm bg-slate-200 px-2 py-1 rounded-lg");
    			add_location(button0, file, 78, 16, 3513);
    			attr_dev(div9, "class", "flex justify-between items-center bg-white/80 rounded-lg py-2 pl-4 pr-2 shadow-sm");
    			add_location(div9, file, 76, 12, 3312);
    			attr_dev(i5, "class", "bi bi-cash");
    			add_location(i5, file, 81, 45, 3796);
    			attr_dev(p12, "class", "font-bold text-sm");
    			add_location(p12, file, 81, 16, 3767);
    			attr_dev(p13, "class", "font-medium text-md");
    			add_location(p13, file, 82, 16, 3857);
    			attr_dev(div10, "class", "flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm");
    			add_location(div10, file, 80, 12, 3659);
    			attr_dev(i6, "class", "bi bi-calendar-event");
    			add_location(i6, file, 85, 45, 4081);
    			attr_dev(p14, "class", "font-bold text-sm");
    			add_location(p14, file, 85, 16, 4052);
    			attr_dev(p15, "class", "font-medium text-md");
    			add_location(p15, file, 86, 16, 4163);
    			attr_dev(div11, "class", "flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm");
    			add_location(div11, file, 84, 12, 3944);
    			attr_dev(i7, "class", "bi bi-box-arrow-left");
    			add_location(i7, file, 89, 68, 4444);
    			attr_dev(button1, "class", "font-bold text-sm");
    			add_location(button1, file, 89, 16, 4392);
    			attr_dev(div12, "class", "flex justify-center items-center bg-red-500 text-white rounded-lg py-2 px-4 shadow-sm");
    			add_location(div12, file, 88, 12, 4275);
    			attr_dev(div13, "class", "flex flex-col gap-2");
    			add_location(div13, file, 59, 8, 2142);
    			attr_dev(div14, "class", "grow flex flex-col justify-start gap-2 p-2");
    			add_location(div14, file, 43, 4, 1115);
    			attr_dev(i8, "class", "bi bi-clipboard-fill text-2xl");
    			add_location(i8, file, 95, 12, 4803);
    			attr_dev(p16, "class", "text-[9px] font-bold");
    			add_location(p16, file, 96, 12, 4862);
    			attr_dev(button2, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button2, file, 94, 8, 4674);
    			attr_dev(i9, "class", "bi bi-box-seam-fill text-2xl");
    			add_location(i9, file, 99, 12, 5074);
    			attr_dev(p17, "class", "text-[9px] font-bold");
    			add_location(p17, file, 100, 12, 5132);
    			attr_dev(button3, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button3, file, 98, 8, 4938);
    			attr_dev(i10, "class", "bi bi-door-open-fill text-2xl");
    			add_location(i10, file, 103, 12, 5342);
    			attr_dev(p18, "class", "text-[9px] font-bold");
    			add_location(p18, file, 104, 12, 5401);
    			attr_dev(button4, "class", "flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl");
    			add_location(button4, file, 102, 8, 5208);
    			attr_dev(i11, "class", "bi bi-person-fill text-2xl");
    			add_location(i11, file, 107, 12, 5610);
    			attr_dev(p19, "class", "text-[10px] font-bold");
    			add_location(p19, file, 108, 12, 5666);
    			attr_dev(button5, "class", "flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl");
    			add_location(button5, file, 106, 8, 5473);
    			attr_dev(div15, "class", "grow-0 h-fit grid grid-cols-4 bg-white px-2 py-2 sticky bottom-0 right-0 left-0 shadow-xl");
    			add_location(div15, file, 93, 4, 4561);
    			attr_dev(section, "class", "flex flex-col min-h-screen");
    			add_location(section, file, 42, 0, 1065);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div14);
    			append_dev(div14, div4);
    			append_dev(div4, div0);
    			append_dev(div4, t1);
    			append_dev(div4, div1);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, p0);
    			append_dev(div2, t4);
    			append_dev(div2, span);
    			append_dev(span, p1);
    			append_dev(span, t6);
    			append_dev(span, p2);
    			append_dev(div3, t8);
    			append_dev(div3, img);
    			append_dev(div14, t9);
    			append_dev(div14, div13);
    			append_dev(div13, div5);
    			append_dev(div5, p3);
    			append_dev(p3, i0);
    			append_dev(p3, t10);
    			append_dev(div5, t11);
    			append_dev(div5, p4);
    			append_dev(div13, t13);
    			append_dev(div13, div6);
    			append_dev(div6, p5);
    			append_dev(p5, i1);
    			append_dev(p5, t14);
    			append_dev(div6, t15);
    			append_dev(div6, p6);
    			append_dev(div13, t17);
    			append_dev(div13, div7);
    			append_dev(div7, p7);
    			append_dev(p7, i2);
    			append_dev(p7, t18);
    			append_dev(div7, t19);
    			append_dev(div7, p8);
    			append_dev(div13, t21);
    			append_dev(div13, div8);
    			append_dev(div8, p9);
    			append_dev(p9, i3);
    			append_dev(p9, t22);
    			append_dev(div8, t23);
    			append_dev(div8, p10);
    			append_dev(div13, t25);
    			append_dev(div13, div9);
    			append_dev(div9, p11);
    			append_dev(p11, i4);
    			append_dev(p11, t26);
    			append_dev(div9, t27);
    			append_dev(div9, button0);
    			append_dev(div13, t29);
    			append_dev(div13, div10);
    			append_dev(div10, p12);
    			append_dev(p12, i5);
    			append_dev(p12, t30);
    			append_dev(div10, t31);
    			append_dev(div10, p13);
    			append_dev(div13, t34);
    			append_dev(div13, div11);
    			append_dev(div11, p14);
    			append_dev(p14, i6);
    			append_dev(p14, t35);
    			append_dev(div11, t36);
    			append_dev(div11, p15);
    			append_dev(div13, t38);
    			append_dev(div13, div12);
    			append_dev(div12, button1);
    			append_dev(button1, i7);
    			append_dev(button1, t39);
    			append_dev(section, t40);
    			append_dev(section, div15);
    			append_dev(div15, button2);
    			append_dev(button2, i8);
    			append_dev(button2, t41);
    			append_dev(button2, p16);
    			append_dev(div15, t43);
    			append_dev(div15, button3);
    			append_dev(button3, i9);
    			append_dev(button3, t44);
    			append_dev(button3, p17);
    			append_dev(div15, t46);
    			append_dev(div15, button4);
    			append_dev(button4, i10);
    			append_dev(button4, t47);
    			append_dev(button4, p18);
    			append_dev(div15, t49);
    			append_dev(div15, button5);
    			append_dev(button5, i11);
    			append_dev(button5, t50);
    			append_dev(button5, p19);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*copyEmail*/ ctx[2], false, false, false, false),
    					listen_dev(button1, "click", /*logOut*/ ctx[1], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler*/ ctx[3], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_1*/ ctx[4], false, false, false, false),
    					listen_dev(button4, "click", /*click_handler_2*/ ctx[5], false, false, false, false),
    					listen_dev(button5, "click", /*click_handler_3*/ ctx[6], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WaiterProfile', slots, []);
    	const user = JSON.parse(localStorage.getItem('user'));
    	const token = localStorage.getItem("token");
    	const userEndpoint = new UserEndpoint();

    	async function checkToken() {
    		try {
    			const res = await userEndpoint.getTokenVerify(token);

    			if (res.status == 200) {
    				if (res.data.user.role == "admin") {
    					navigate('/mprofile');
    				} else {
    					localStorage.setItem("user", JSON.stringify(res.data.user));
    					console.log("Verify success");
    				}
    			}
    		} catch(error) {
    			navigate('/login');
    		}
    	}

    	if (!token || !user) {
    		localStorage.clear();
    		navigate('/login');
    	} else {
    		checkToken();
    	}

    	function logOut() {
    		localStorage.clear();
    		navigate('/login');
    	}

    	function copyEmail() {
    		navigator.clipboard.writeText(user.email);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<WaiterProfile> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		navigate('/w');
    	};

    	const click_handler_1 = () => {
    		navigate('/products');
    	};

    	const click_handler_2 = () => {
    		navigate('/wrooms');
    	};

    	const click_handler_3 = () => {
    		navigate('/wprofile');
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		UserEndpoint,
    		user,
    		token,
    		userEndpoint,
    		checkToken,
    		logOut,
    		copyEmail
    	});

    	return [
    		user,
    		logOut,
    		copyEmail,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3
    	];
    }

    class WaiterProfile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WaiterProfile",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\Main.svelte generated by Svelte v3.59.2 */

    // (29:1) <Route exact path='/'>
    function create_default_slot_14(ctx) {
    	let home;
    	let current;
    	home = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14.name,
    		type: "slot",
    		source: "(29:1) <Route exact path='/'>",
    		ctx
    	});

    	return block;
    }

    // (30:1) <Route exact path="/admin">
    function create_default_slot_13(ctx) {
    	let admin;
    	let current;
    	admin = new Admin({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(admin.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(admin, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(admin.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(admin.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(admin, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(30:1) <Route exact path=\\\"/admin\\\">",
    		ctx
    	});

    	return block;
    }

    // (33:1) <Route exact path='/login'>
    function create_default_slot_12(ctx) {
    	let login;
    	let current;
    	login = new Login({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(login.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(login, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(login.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(login.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(login, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(33:1) <Route exact path='/login'>",
    		ctx
    	});

    	return block;
    }

    // (34:1) <Route exact path='/register'>
    function create_default_slot_11(ctx) {
    	let register;
    	let current;
    	register = new Register({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(register.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(register, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(register.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(register.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(register, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(34:1) <Route exact path='/register'>",
    		ctx
    	});

    	return block;
    }

    // (35:1) <Route exact path='/check'>
    function create_default_slot_10(ctx) {
    	let check;
    	let current;
    	check = new Check({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(check.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(check, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(check.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(check.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(check, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(35:1) <Route exact path='/check'>",
    		ctx
    	});

    	return block;
    }

    // (38:1) <Route exact path='/m'>
    function create_default_slot_9(ctx) {
    	let mobilehome;
    	let current;
    	mobilehome = new MobileHome({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(mobilehome.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(mobilehome, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mobilehome.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mobilehome.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mobilehome, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(38:1) <Route exact path='/m'>",
    		ctx
    	});

    	return block;
    }

    // (39:1) <Route exact path='/mprofile'>
    function create_default_slot_8(ctx) {
    	let mobileprofile;
    	let current;
    	mobileprofile = new MobileProfile({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(mobileprofile.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(mobileprofile, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mobileprofile.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mobileprofile.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mobileprofile, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(39:1) <Route exact path='/mprofile'>",
    		ctx
    	});

    	return block;
    }

    // (40:1) <Route exact path='/morders'>
    function create_default_slot_7(ctx) {
    	let mobileorders;
    	let current;
    	mobileorders = new MobileOrders({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(mobileorders.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(mobileorders, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mobileorders.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mobileorders.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mobileorders, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(40:1) <Route exact path='/morders'>",
    		ctx
    	});

    	return block;
    }

    // (41:1) <Route exact path='/mrooms'>
    function create_default_slot_6(ctx) {
    	let mobilerooms;
    	let current;
    	mobilerooms = new MobileRooms({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(mobilerooms.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(mobilerooms, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mobilerooms.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mobilerooms.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mobilerooms, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(41:1) <Route exact path='/mrooms'>",
    		ctx
    	});

    	return block;
    }

    // (42:1) <Route exact path="/madd">
    function create_default_slot_5(ctx) {
    	let mobileadd;
    	let current;
    	mobileadd = new MobileAdd({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(mobileadd.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(mobileadd, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mobileadd.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mobileadd.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mobileadd, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(42:1) <Route exact path=\\\"/madd\\\">",
    		ctx
    	});

    	return block;
    }

    // (45:1) <Route exact path='/w'>
    function create_default_slot_4(ctx) {
    	let waiterorders;
    	let current;
    	waiterorders = new WaiterOrders({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(waiterorders.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(waiterorders, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(waiterorders.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(waiterorders.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(waiterorders, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(45:1) <Route exact path='/w'>",
    		ctx
    	});

    	return block;
    }

    // (46:1) <Route exact path='/products'>
    function create_default_slot_3(ctx) {
    	let products;
    	let current;
    	products = new Products({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(products.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(products, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(products.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(products.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(products, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(46:1) <Route exact path='/products'>",
    		ctx
    	});

    	return block;
    }

    // (47:1) <Route exact path='/wrooms'>
    function create_default_slot_2(ctx) {
    	let waiterrooms;
    	let current;
    	waiterrooms = new WaiterRooms({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(waiterrooms.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(waiterrooms, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(waiterrooms.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(waiterrooms.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(waiterrooms, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(47:1) <Route exact path='/wrooms'>",
    		ctx
    	});

    	return block;
    }

    // (48:1) <Route exact path='/wprofile'>
    function create_default_slot_1(ctx) {
    	let waiterprofile;
    	let current;
    	waiterprofile = new WaiterProfile({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(waiterprofile.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(waiterprofile, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(waiterprofile.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(waiterprofile.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(waiterprofile, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(48:1) <Route exact path='/wprofile'>",
    		ctx
    	});

    	return block;
    }

    // (28:0) <Router>
    function create_default_slot(ctx) {
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let t2;
    	let route3;
    	let t3;
    	let route4;
    	let t4;
    	let route5;
    	let t5;
    	let route6;
    	let t6;
    	let route7;
    	let t7;
    	let route8;
    	let t8;
    	let route9;
    	let t9;
    	let route10;
    	let t10;
    	let route11;
    	let t11;
    	let route12;
    	let t12;
    	let route13;
    	let current;

    	route0 = new Route$1({
    			props: {
    				exact: true,
    				path: "/",
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route1 = new Route$1({
    			props: {
    				exact: true,
    				path: "/admin",
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route2 = new Route$1({
    			props: {
    				exact: true,
    				path: "/login",
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route3 = new Route$1({
    			props: {
    				exact: true,
    				path: "/register",
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route4 = new Route$1({
    			props: {
    				exact: true,
    				path: "/check",
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route5 = new Route$1({
    			props: {
    				exact: true,
    				path: "/m",
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route6 = new Route$1({
    			props: {
    				exact: true,
    				path: "/mprofile",
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route7 = new Route$1({
    			props: {
    				exact: true,
    				path: "/morders",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route8 = new Route$1({
    			props: {
    				exact: true,
    				path: "/mrooms",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route9 = new Route$1({
    			props: {
    				exact: true,
    				path: "/madd",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route10 = new Route$1({
    			props: {
    				exact: true,
    				path: "/w",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route11 = new Route$1({
    			props: {
    				exact: true,
    				path: "/products",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route12 = new Route$1({
    			props: {
    				exact: true,
    				path: "/wrooms",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route13 = new Route$1({
    			props: {
    				exact: true,
    				path: "/wprofile",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    			t2 = space();
    			create_component(route3.$$.fragment);
    			t3 = space();
    			create_component(route4.$$.fragment);
    			t4 = space();
    			create_component(route5.$$.fragment);
    			t5 = space();
    			create_component(route6.$$.fragment);
    			t6 = space();
    			create_component(route7.$$.fragment);
    			t7 = space();
    			create_component(route8.$$.fragment);
    			t8 = space();
    			create_component(route9.$$.fragment);
    			t9 = space();
    			create_component(route10.$$.fragment);
    			t10 = space();
    			create_component(route11.$$.fragment);
    			t11 = space();
    			create_component(route12.$$.fragment);
    			t12 = space();
    			create_component(route13.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(route1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(route2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(route3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(route4, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(route5, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(route6, target, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(route7, target, anchor);
    			insert_dev(target, t7, anchor);
    			mount_component(route8, target, anchor);
    			insert_dev(target, t8, anchor);
    			mount_component(route9, target, anchor);
    			insert_dev(target, t9, anchor);
    			mount_component(route10, target, anchor);
    			insert_dev(target, t10, anchor);
    			mount_component(route11, target, anchor);
    			insert_dev(target, t11, anchor);
    			mount_component(route12, target, anchor);
    			insert_dev(target, t12, anchor);
    			mount_component(route13, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route0_changes.$$scope = { dirty, ctx };
    			}

    			route0.$set(route0_changes);
    			const route1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route1_changes.$$scope = { dirty, ctx };
    			}

    			route1.$set(route1_changes);
    			const route2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route2_changes.$$scope = { dirty, ctx };
    			}

    			route2.$set(route2_changes);
    			const route3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route3_changes.$$scope = { dirty, ctx };
    			}

    			route3.$set(route3_changes);
    			const route4_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route4_changes.$$scope = { dirty, ctx };
    			}

    			route4.$set(route4_changes);
    			const route5_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route5_changes.$$scope = { dirty, ctx };
    			}

    			route5.$set(route5_changes);
    			const route6_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route6_changes.$$scope = { dirty, ctx };
    			}

    			route6.$set(route6_changes);
    			const route7_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route7_changes.$$scope = { dirty, ctx };
    			}

    			route7.$set(route7_changes);
    			const route8_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route8_changes.$$scope = { dirty, ctx };
    			}

    			route8.$set(route8_changes);
    			const route9_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route9_changes.$$scope = { dirty, ctx };
    			}

    			route9.$set(route9_changes);
    			const route10_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route10_changes.$$scope = { dirty, ctx };
    			}

    			route10.$set(route10_changes);
    			const route11_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route11_changes.$$scope = { dirty, ctx };
    			}

    			route11.$set(route11_changes);
    			const route12_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route12_changes.$$scope = { dirty, ctx };
    			}

    			route12.$set(route12_changes);
    			const route13_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route13_changes.$$scope = { dirty, ctx };
    			}

    			route13.$set(route13_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			transition_in(route3.$$.fragment, local);
    			transition_in(route4.$$.fragment, local);
    			transition_in(route5.$$.fragment, local);
    			transition_in(route6.$$.fragment, local);
    			transition_in(route7.$$.fragment, local);
    			transition_in(route8.$$.fragment, local);
    			transition_in(route9.$$.fragment, local);
    			transition_in(route10.$$.fragment, local);
    			transition_in(route11.$$.fragment, local);
    			transition_in(route12.$$.fragment, local);
    			transition_in(route13.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			transition_out(route4.$$.fragment, local);
    			transition_out(route5.$$.fragment, local);
    			transition_out(route6.$$.fragment, local);
    			transition_out(route7.$$.fragment, local);
    			transition_out(route8.$$.fragment, local);
    			transition_out(route9.$$.fragment, local);
    			transition_out(route10.$$.fragment, local);
    			transition_out(route11.$$.fragment, local);
    			transition_out(route12.$$.fragment, local);
    			transition_out(route13.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(route1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(route3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(route4, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(route5, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(route6, detaching);
    			if (detaching) detach_dev(t6);
    			destroy_component(route7, detaching);
    			if (detaching) detach_dev(t7);
    			destroy_component(route8, detaching);
    			if (detaching) detach_dev(t8);
    			destroy_component(route9, detaching);
    			if (detaching) detach_dev(t9);
    			destroy_component(route10, detaching);
    			if (detaching) detach_dev(t10);
    			destroy_component(route11, detaching);
    			if (detaching) detach_dev(t11);
    			destroy_component(route12, detaching);
    			if (detaching) detach_dev(t12);
    			destroy_component(route13, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(28:0) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let router;
    	let current;

    	router = new Router$1({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Router: Router$1,
    		Route: Route$1,
    		Admin,
    		Home,
    		Login,
    		Register,
    		Check,
    		MobileHome,
    		MobileProfile,
    		MobileOrders,
    		MobileRooms,
    		MobileAdd,
    		WaiterOrders,
    		Products,
    		WaiterRooms,
    		WaiterProfile
    	});

    	return [];
    }

    class Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new Main({
        target: document.body
    });

    return app;

})();
