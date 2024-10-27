import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, a as getAssetPath, h, H as Host } from './index-4d533537.js';
import { c as commonjsGlobal, k as kulManagerInstance } from './kul-manager-8d12091b.js';
import { g as getProps } from './componentUtils-a994b230.js';
import { K as KUL_WRAPPER_ID, c as KUL_STYLE_ID } from './GenericVariables-f3380974.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulCodeProps;
(function (KulCodeProps) {
    KulCodeProps["kulFormat"] = "Automatically formats the value.";
    KulCodeProps["kulLanguage"] = "Sets the language of the snippet.";
    KulCodeProps["kulPreserveSpaces"] = "Whether to preserve spaces or not. When missing it is set automatically.";
    KulCodeProps["kulStyle"] = "Custom style of the component.";
    KulCodeProps["kulValue"] = "String containing the snippet of code to display.";
})(KulCodeProps || (KulCodeProps = {}));

var prism = {exports: {}};

(function (module) {
/* **********************************************
     Begin prism-core.js
********************************************** */

/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self) {

	// Private helper vars
	var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
	var uniqueId = 0;

	// The grammar object for plaintext
	var plainTextGrammar = {};


	var _ = {
		/**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		manual: _self.Prism && _self.Prism.manual,
		/**
		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
		 * own worker, you don't want it to do this.
		 *
		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
		 *
		 * You obviously have to change this value before Prism executes. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.disableWorkerMessageHandler = true;
		 * // Load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

		/**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, encode(tokens.content), tokens.alias);
				} else if (Array.isArray(tokens)) {
					return tokens.map(encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			/**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */
			type: function (o) {
				return Object.prototype.toString.call(o).slice(8, -1);
			},

			/**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */
			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			/**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */
			clone: function deepClone(o, visited) {
				visited = visited || {};

				var clone; var id;
				switch (_.util.type(o)) {
					case 'Object':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = /** @type {Record<string, any>} */ ({});
						visited[id] = clone;

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = deepClone(o[key], visited);
							}
						}

						return /** @type {any} */ (clone);

					case 'Array':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = [];
						visited[id] = clone;

						(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
							clone[i] = deepClone(v, visited);
						});

						return /** @type {any} */ (clone);

					default:
						return o;
				}
			},

			/**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */
			getLanguage: function (element) {
				while (element) {
					var m = lang.exec(element.className);
					if (m) {
						return m[1].toLowerCase();
					}
					element = element.parentElement;
				}
				return 'none';
			},

			/**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */
			setLanguage: function (element, language) {
				// remove all `language-xxxx` classes
				// (this might leave behind a leading space)
				element.className = element.className.replace(RegExp(lang, 'gi'), '');

				// add the new `language-xxxx` class
				// (using `classList` will automatically clean up spaces for us)
				element.classList.add('language-' + language);
			},

			/**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */
			currentScript: function () {
				if (typeof document === 'undefined') {
					return null;
				}
				if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
					return /** @type {any} */ (document.currentScript);
				}

				// IE11 workaround
				// we'll get the src of the current script by parsing IE11's error stack trace
				// this will not work for inline scripts

				try {
					throw new Error();
				} catch (err) {
					// Get file src url from stack. Specifically works with the format of stack traces in IE.
					// A stack will look like this:
					//
					// Error
					//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
					//    at Global code (http://localhost/components/prism-core.js:606:1)

					var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
					if (src) {
						var scripts = document.getElementsByTagName('script');
						for (var i in scripts) {
							if (scripts[i].src == src) {
								return scripts[i];
							}
						}
					}
					return null;
				}
			},

			/**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */
			isActive: function (element, className, defaultActivation) {
				var no = 'no-' + className;

				while (element) {
					var classList = element.classList;
					if (classList.contains(className)) {
						return true;
					}
					if (classList.contains(no)) {
						return false;
					}
					element = element.parentElement;
				}
				return !!defaultActivation;
			}
		},

		/**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		languages: {
			/**
			 * The grammar for plain, unformatted text.
			 */
			plain: plainTextGrammar,
			plaintext: plainTextGrammar,
			text: plainTextGrammar,
			txt: plainTextGrammar,

			/**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || /** @type {any} */ (_.languages);
				var grammar = root[inside];
				/** @type {Grammar} */
				var ret = {};

				for (var token in grammar) {
					if (grammar.hasOwnProperty(token)) {

						if (token == before) {
							for (var newToken in insert) {
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						// Do not insert token which also occur in insert. See #1525
						if (!insert.hasOwnProperty(token)) {
							ret[token] = grammar[token];
						}
					}
				}

				var old = root[inside];
				root[inside] = ret;

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === old && key != inside) {
						this[key] = ret;
					}
				});

				return ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {};

				var objId = _.util.objId;

				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						var property = o[i];
						var propertyType = _.util.type(property);

						if (propertyType === 'Object' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, null, visited);
						} else if (propertyType === 'Array' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, i, visited);
						}
					}
				}
			}
		},

		plugins: {},

		/**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */
		highlightAll: function (async, callback) {
			_.highlightAllUnder(document, async, callback);
		},

		/**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */
		highlightAllUnder: function (container, async, callback) {
			var env = {
				callback: callback,
				container: container,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run('before-highlightall', env);

			env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

			_.hooks.run('before-all-elements-highlight', env);

			for (var i = 0, element; (element = env.elements[i++]);) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		/**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */
		highlightElement: function (element, async, callback) {
			// Find language
			var language = _.util.getLanguage(element);
			var grammar = _.languages[language];

			// Set language on the element, if not present
			_.util.setLanguage(element, language);

			// Set language on the parent, for styling
			var parent = element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre') {
				_.util.setLanguage(parent, language);
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			function insertHighlightedCode(highlightedCode) {
				env.highlightedCode = highlightedCode;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
			}

			_.hooks.run('before-sanity-check', env);

			// plugins may change/add the parent/element
			parent = env.element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
				parent.setAttribute('tabindex', '0');
			}

			if (!env.code) {
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (!env.grammar) {
				insertHighlightedCode(_.util.encode(env.code));
				return;
			}

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function (evt) {
					insertHighlightedCode(evt.data);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			} else {
				insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
			}
		},

		/**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */
		highlight: function (text, grammar, language) {
			var env = {
				code: text,
				grammar: grammar,
				language: language
			};
			_.hooks.run('before-tokenize', env);
			if (!env.grammar) {
				throw new Error('The language "' + env.language + '" has no grammar.');
			}
			env.tokens = _.tokenize(env.code, env.grammar);
			_.hooks.run('after-tokenize', env);
			return Token.stringify(_.util.encode(env.tokens), env.language);
		},

		/**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */
		tokenize: function (text, grammar) {
			var rest = grammar.rest;
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			var tokenList = new LinkedList();
			addAfter(tokenList, tokenList.head, text);

			matchGrammar(text, tokenList, grammar, tokenList.head, 0);

			return toArray(tokenList);
		},

		/**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		hooks: {
			all: {},

			/**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */
			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			/**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */
			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; (callback = callbacks[i++]);) {
					callback(env);
				}
			}
		},

		Token: Token
	};
	_self.Prism = _;


	// Typescript note:
	// The following can be used to import the Token type in JSDoc:
	//
	//   @typedef {InstanceType<import("./prism-core.js")["Token"]>} Token

	/**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */
	function Token(type, content, alias, matchedStr) {
		/**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */
		this.type = type;
		/**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */
		this.content = content;
		/**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || '').length | 0;
	}

	/**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */

	/**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */
	Token.stringify = function stringify(o, language) {
		if (typeof o == 'string') {
			return o;
		}
		if (Array.isArray(o)) {
			var s = '';
			o.forEach(function (e) {
				s += stringify(e, language);
			});
			return s;
		}

		var env = {
			type: o.type,
			content: stringify(o.content, language),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language
		};

		var aliases = o.alias;
		if (aliases) {
			if (Array.isArray(aliases)) {
				Array.prototype.push.apply(env.classes, aliases);
			} else {
				env.classes.push(aliases);
			}
		}

		_.hooks.run('wrap', env);

		var attributes = '';
		for (var name in env.attributes) {
			attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
	};

	/**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */
	function matchPattern(pattern, pos, text, lookbehind) {
		pattern.lastIndex = pos;
		var match = pattern.exec(text);
		if (match && lookbehind && match[1]) {
			// change the match to remove the text matched by the Prism lookbehind group
			var lookbehindLength = match[1].length;
			match.index += lookbehindLength;
			match[0] = match[0].slice(lookbehindLength);
		}
		return match;
	}

	/**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */
	function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
		for (var token in grammar) {
			if (!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = Array.isArray(patterns) ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				if (rematch && rematch.cause == token + ',' + j) {
					return;
				}

				var patternObj = patterns[j];
				var inside = patternObj.inside;
				var lookbehind = !!patternObj.lookbehind;
				var greedy = !!patternObj.greedy;
				var alias = patternObj.alias;

				if (greedy && !patternObj.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
					patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
				}

				/** @type {RegExp} */
				var pattern = patternObj.pattern || patternObj;

				for ( // iterate the token list and keep track of the current token/string position
					var currentNode = startNode.next, pos = startPos;
					currentNode !== tokenList.tail;
					pos += currentNode.value.length, currentNode = currentNode.next
				) {

					if (rematch && pos >= rematch.reach) {
						break;
					}

					var str = currentNode.value;

					if (tokenList.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					var removeCount = 1; // this is the to parameter of removeBetween
					var match;

					if (greedy) {
						match = matchPattern(pattern, pos, text, lookbehind);
						if (!match || match.index >= text.length) {
							break;
						}

						var from = match.index;
						var to = match.index + match[0].length;
						var p = pos;

						// find the node that contains the match
						p += currentNode.value.length;
						while (from >= p) {
							currentNode = currentNode.next;
							p += currentNode.value.length;
						}
						// adjust pos (and p)
						p -= currentNode.value.length;
						pos = p;

						// the current node is a Token, then the match starts inside another Token, which is invalid
						if (currentNode.value instanceof Token) {
							continue;
						}

						// find the last node which is affected by this match
						for (
							var k = currentNode;
							k !== tokenList.tail && (p < to || typeof k.value === 'string');
							k = k.next
						) {
							removeCount++;
							p += k.value.length;
						}
						removeCount--;

						// replace with the new match
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						match = matchPattern(pattern, 0, str, lookbehind);
						if (!match) {
							continue;
						}
					}

					// eslint-disable-next-line no-redeclare
					var from = match.index;
					var matchStr = match[0];
					var before = str.slice(0, from);
					var after = str.slice(from + matchStr.length);

					var reach = pos + str.length;
					if (rematch && reach > rematch.reach) {
						rematch.reach = reach;
					}

					var removeFrom = currentNode.prev;

					if (before) {
						removeFrom = addAfter(tokenList, removeFrom, before);
						pos += before.length;
					}

					removeRange(tokenList, removeFrom, removeCount);

					var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
					currentNode = addAfter(tokenList, removeFrom, wrapped);

					if (after) {
						addAfter(tokenList, currentNode, after);
					}

					if (removeCount > 1) {
						// at least one Token object was removed, so we have to do some rematching
						// this can only happen if the current pattern is greedy

						/** @type {RematchOptions} */
						var nestedRematch = {
							cause: token + ',' + j,
							reach: reach
						};
						matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

						// the reach might have been extended because of the rematching
						if (rematch && nestedRematch.reach > rematch.reach) {
							rematch.reach = nestedRematch.reach;
						}
					}
				}
			}
		}
	}

	/**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */

	/**
	 * @template T
	 * @private
	 */
	function LinkedList() {
		/** @type {LinkedListNode<T>} */
		var head = { value: null, prev: null, next: null };
		/** @type {LinkedListNode<T>} */
		var tail = { value: null, prev: head, next: null };
		head.next = tail;

		/** @type {LinkedListNode<T>} */
		this.head = head;
		/** @type {LinkedListNode<T>} */
		this.tail = tail;
		this.length = 0;
	}

	/**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */
	function addAfter(list, node, value) {
		// assumes that node != list.tail && values.length >= 0
		var next = node.next;

		var newNode = { value: value, prev: node, next: next };
		node.next = newNode;
		next.prev = newNode;
		list.length++;

		return newNode;
	}
	/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */
	function removeRange(list, node, count) {
		var next = node.next;
		for (var i = 0; i < count && next !== list.tail; i++) {
			next = next.next;
		}
		node.next = next;
		next.prev = node;
		list.length -= i;
	}
	/**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */
	function toArray(list) {
		var array = [];
		var node = list.head.next;
		while (node !== list.tail) {
			array.push(node.value);
			node = node.next;
		}
		return array;
	}


	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _;
		}

		if (!_.disableWorkerMessageHandler) {
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data);
				var lang = message.language;
				var code = message.code;
				var immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);
		}

		return _;
	}

	// Get current script and highlight
	var script = _.util.currentScript();

	if (script) {
		_.filename = script.src;

		if (script.hasAttribute('data-manual')) {
			_.manual = true;
		}
	}

	function highlightAutomaticallyCallback() {
		if (!_.manual) {
			_.highlightAll();
		}
	}

	if (!_.manual) {
		// If the document state is "loading", then we'll use DOMContentLoaded.
		// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
		// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
		// might take longer one animation frame to execute which can create a race condition where only some plugins have
		// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
		// See https://github.com/PrismJS/prism/issues/2102
		var readyState = document.readyState;
		if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
			document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
		} else {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(highlightAutomaticallyCallback);
			} else {
				window.setTimeout(highlightAutomaticallyCallback, 16);
			}
		}
	}

	return _;

}(_self));

if (module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof commonjsGlobal !== 'undefined') {
	commonjsGlobal.Prism = Prism;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': {
		pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
		greedy: true
	},
	'prolog': {
		pattern: /<\?[\s\S]+?\?>/,
		greedy: true
	},
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/i,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': {
		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
		greedy: true
	},
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
	/**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */
	value: function (attrName, lang) {
		Prism.languages.markup.tag.inside['special-attr'].push({
			pattern: RegExp(
				/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
				'i'
			),
			lookbehind: true,
			inside: {
				'attr-name': /^[^\s=]+/,
				'attr-value': {
					pattern: /=[\s\S]+/,
					inside: {
						'value': {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, 'language-' + lang],
							inside: Prism.languages[lang]
						},
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							/"|'/
						]
					}
				}
			}
		});
	}
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;


/* **********************************************
     Begin prism-css.js
********************************************** */

(function (Prism) {

	var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': {
			pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
			lookbehind: true
		},
		'string': {
			pattern: string,
			greedy: true
		},
		'property': {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: true
		},
		'important': /!important\b/i,
		'function': {
			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
			lookbehind: true
		},
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');
		markup.tag.addAttribute('style', 'css');
	}

}(Prism));


/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: true,
		inside: {
			'punctuation': /[.\\]/
		}
	},
	'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
	'boolean': /\b(?:false|true)\b/,
	'function': /\b\w+(?=\()/,
	'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': {
		pattern: RegExp(
			/(^|[^\w$])/.source +
			'(?:' +
			(
				// constant
				/NaN|Infinity/.source +
				'|' +
				// binary integer
				/0[bB][01]+(?:_[01]+)*n?/.source +
				'|' +
				// octal integer
				/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
				'|' +
				// hexadecimal integer
				/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
				'|' +
				// decimal bigint
				/\d+(?:_\d+)*n/.source +
				'|' +
				// decimal number (integer or float) but no bigint
				/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
			) +
			')' +
			/(?![\w$])/.source
		),
		lookbehind: true
	},
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: RegExp(
			// lookbehind
			// eslint-disable-next-line regexp/no-dupe-characters-character-class
			/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
			// Regex pattern:
			// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
			// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
			// with the only syntax, so we have to define 2 different regex patterns.
			/\//.source +
			'(?:' +
			/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
			'|' +
			// `v` flag syntax. This supports 3 levels of nested character classes.
			/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
			')' +
			// lookahead
			/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
		),
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-delimiter': /^\/|\/$/,
			'regex-flags': /^[a-z]+$/,
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'hashbang': {
		pattern: /^#!.*/,
		greedy: true,
		alias: 'comment'
	},
	'template-string': {
		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	},
	'string-property': {
		pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
		lookbehind: true,
		greedy: true,
		alias: 'property'
	}
});

Prism.languages.insertBefore('javascript', 'operator', {
	'literal-property': {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: true,
		alias: 'property'
	},
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');

	// add attribute support for all DOM events.
	// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
	Prism.languages.markup.tag.addAttribute(
		/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
		'javascript'
	);
}

Prism.languages.js = Prism.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {

	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return;
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	var LOADING_MESSAGE = 'Loading…';
	var FAILURE_MESSAGE = function (status, message) {
		return '✖ Error ' + status + ' while fetching file: ' + message;
	};
	var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

	var EXTENSIONS = {
		'js': 'javascript',
		'py': 'python',
		'rb': 'ruby',
		'ps1': 'powershell',
		'psm1': 'powershell',
		'sh': 'bash',
		'bat': 'batch',
		'h': 'c',
		'tex': 'latex'
	};

	var STATUS_ATTR = 'data-src-status';
	var STATUS_LOADING = 'loading';
	var STATUS_LOADED = 'loaded';
	var STATUS_FAILED = 'failed';

	var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
		+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

	/**
	 * Loads the given file.
	 *
	 * @param {string} src The URL or path of the source file to load.
	 * @param {(result: string) => void} success
	 * @param {(reason: string) => void} error
	 */
	function loadFile(src, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', src, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status < 400 && xhr.responseText) {
					success(xhr.responseText);
				} else {
					if (xhr.status >= 400) {
						error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
					} else {
						error(FAILURE_EMPTY_MESSAGE);
					}
				}
			}
		};
		xhr.send(null);
	}

	/**
	 * Parses the given range.
	 *
	 * This returns a range with inclusive ends.
	 *
	 * @param {string | null | undefined} range
	 * @returns {[number, number | undefined] | undefined}
	 */
	function parseRange(range) {
		var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
		if (m) {
			var start = Number(m[1]);
			var comma = m[2];
			var end = m[3];

			if (!comma) {
				return [start, start];
			}
			if (!end) {
				return [start, undefined];
			}
			return [start, Number(end)];
		}
		return undefined;
	}

	Prism.hooks.add('before-highlightall', function (env) {
		env.selector += ', ' + SELECTOR;
	});

	Prism.hooks.add('before-sanity-check', function (env) {
		var pre = /** @type {HTMLPreElement} */ (env.element);
		if (pre.matches(SELECTOR)) {
			env.code = ''; // fast-path the whole thing and go to complete

			pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

			// add code element with loading message
			var code = pre.appendChild(document.createElement('CODE'));
			code.textContent = LOADING_MESSAGE;

			var src = pre.getAttribute('data-src');

			var language = env.language;
			if (language === 'none') {
				// the language might be 'none' because there is no language set;
				// in this case, we want to use the extension as the language
				var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
				language = EXTENSIONS[extension] || extension;
			}

			// set language classes
			Prism.util.setLanguage(code, language);
			Prism.util.setLanguage(pre, language);

			// preload the language
			var autoloader = Prism.plugins.autoloader;
			if (autoloader) {
				autoloader.loadLanguages(language);
			}

			// load file
			loadFile(
				src,
				function (text) {
					// mark as loaded
					pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

					// handle data-range
					var range = parseRange(pre.getAttribute('data-range'));
					if (range) {
						var lines = text.split(/\r\n?|\n/g);

						// the range is one-based and inclusive on both ends
						var start = range[0];
						var end = range[1] == null ? lines.length : range[1];

						if (start < 0) { start += lines.length; }
						start = Math.max(0, Math.min(start - 1, lines.length));
						if (end < 0) { end += lines.length; }
						end = Math.max(0, Math.min(end, lines.length));

						text = lines.slice(start, end).join('\n');

						// add data-start for line numbers
						if (!pre.hasAttribute('data-start')) {
							pre.setAttribute('data-start', String(start + 1));
						}
					}

					// highlight code
					code.textContent = text;
					Prism.highlightElement(code);
				},
				function (error) {
					// mark as failed
					pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

					code.textContent = error;
				}
			);
		}
	});

	Prism.plugins.fileHighlight = {
		/**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */
		highlight: function highlight(container) {
			var elements = (container || document).querySelectorAll(SELECTOR);

			for (var i = 0, element; (element = elements[i++]);) {
				Prism.highlightElement(element);
			}
		}
	};

	var logged = false;
	/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
	Prism.fileHighlight = function () {
		if (!logged) {
			console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
			logged = true;
		}
		Prism.plugins.fileHighlight.highlight.apply(this, arguments);
	};

}());
}(prism));

const Prism = prism.exports;

const STATIC_LANGUAGES = {
    css: (Prism) => {
        var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        (Prism.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: RegExp('@[\\w-](?:[^;{\\s"\']|\\s+(?!\\s)|' +
                    e.source +
                    ')*?(?:;|(?=\\s*\\{))'),
                inside: {
                    rule: /^@[\w-]+/,
                    'selector-function-argument': {
                        pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                        lookbehind: !0,
                        alias: 'selector',
                    },
                    keyword: {
                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                        lookbehind: !0,
                    },
                },
            },
            url: {
                pattern: RegExp('\\burl\\((?:' +
                    e.source +
                    '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)', 'i'),
                greedy: !0,
                inside: {
                    function: /^url/i,
                    punctuation: /^\(|\)$/,
                    string: {
                        pattern: RegExp('^' + e.source + '$'),
                        alias: 'url',
                    },
                },
            },
            selector: {
                pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' +
                    e.source +
                    ')*(?=\\s*\\{)'),
                lookbehind: !0,
            },
            string: { pattern: e, greedy: !0 },
            property: {
                pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
                lookbehind: !0,
            },
            important: /!important\b/i,
            function: {
                pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
                lookbehind: !0,
            },
            punctuation: /[(){};:,]/,
        }),
            (Prism.languages.css.atrule.inside.rest = Prism.languages.css);
        var t = Prism.languages.markup;
        t &&
            (t.tag.addInlined('style', 'css'),
                t.tag.addAttribute('style', 'css'));
    },
    javascript: (Prism) => {
        (Prism.languages.javascript = Prism.languages.extend('clike', {
            'class-name': [
                Prism.languages.clike['class-name'],
                {
                    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
                    lookbehind: !0,
                },
            ],
            keyword: [
                { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
                {
                    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
                    lookbehind: !0,
                },
            ],
            function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
            number: {
                pattern: RegExp('(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])'),
                lookbehind: !0,
            },
            operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
        })),
            (Prism.languages.javascript['class-name'][0].pattern =
                /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
            Prism.languages.insertBefore('javascript', 'keyword', {
                regex: {
                    pattern: RegExp('((?:^|[^$\\w\\xA0-\\uFFFF."\'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))'),
                    lookbehind: !0,
                    greedy: !0,
                    inside: {
                        'regex-source': {
                            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                            lookbehind: !0,
                            alias: 'language-regex',
                            inside: Prism.languages.regex,
                        },
                        'regex-delimiter': /^\/|\/$/,
                        'regex-flags': /^[a-z]+$/,
                    },
                },
                'function-variable': {
                    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
                    alias: 'function',
                },
                parameter: [
                    {
                        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
                        lookbehind: !0,
                        inside: Prism.languages.javascript,
                    },
                    {
                        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
                        lookbehind: !0,
                        inside: Prism.languages.javascript,
                    },
                    {
                        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
                        lookbehind: !0,
                        inside: Prism.languages.javascript,
                    },
                    {
                        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
                        lookbehind: !0,
                        inside: Prism.languages.javascript,
                    },
                ],
                constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
            }),
            Prism.languages.insertBefore('javascript', 'string', {
                hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' },
                'template-string': {
                    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
                    greedy: !0,
                    inside: {
                        'template-punctuation': {
                            pattern: /^`|`$/,
                            alias: 'string',
                        },
                        interpolation: {
                            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                            lookbehind: !0,
                            inside: {
                                'interpolation-punctuation': {
                                    pattern: /^\$\{|\}$/,
                                    alias: 'punctuation',
                                },
                                rest: Prism.languages.javascript,
                            },
                        },
                        string: /[\s\S]+/,
                    },
                },
                'string-property': {
                    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
                    lookbehind: !0,
                    greedy: !0,
                    alias: 'property',
                },
            }),
            Prism.languages.insertBefore('javascript', 'operator', {
                'literal-property': {
                    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
                    lookbehind: !0,
                    alias: 'property',
                },
            }),
            Prism.languages.markup &&
                (Prism.languages.markup.tag.addInlined('script', 'javascript'),
                    Prism.languages.markup.tag.addAttribute('on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)', 'javascript')),
            (Prism.languages.js = Prism.languages.javascript);
    },
    json: (Prism) => {
        (Prism.languages.json = {
            property: {
                pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
                lookbehind: !0,
                greedy: !0,
            },
            string: {
                pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
                lookbehind: !0,
                greedy: !0,
            },
            comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
            number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
            punctuation: /[{}[\],]/,
            operator: /:/,
            boolean: /\b(?:false|true)\b/,
            null: { pattern: /\bnull\b/, alias: 'keyword' },
        }),
            (Prism.languages.webmanifest = Prism.languages.json);
    },
    jsx: (Prism) => {
        var n = Prism.util.clone(Prism.languages.javascript), e = '(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})';
        function a(t, n) {
            return ((t = t
                .replace(/<S>/g, function () {
                return '(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)';
            })
                .replace(/<BRACES>/g, function () {
                return '(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})';
            })
                .replace(/<SPREAD>/g, function () {
                return e;
            })),
                RegExp(t, n));
        }
        (e = a(e).source),
            (Prism.languages.jsx = Prism.languages.extend('markup', n)),
            (Prism.languages.jsx.tag.pattern = a('</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:"(?:\\\\[^]|[^\\\\"])*"|\'(?:\\\\[^]|[^\\\\\'])*\'|[^\\s{\'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>')),
            (Prism.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/),
            (Prism.languages.jsx.tag.inside['attr-value'].pattern =
                /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/),
            (Prism.languages.jsx.tag.inside.tag.inside['class-name'] =
                /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
            (Prism.languages.jsx.tag.inside.comment = n.comment),
            Prism.languages.insertBefore('inside', 'attr-name', {
                spread: {
                    pattern: a('<SPREAD>'),
                    inside: Prism.languages.jsx,
                },
            }, Prism.languages.jsx.tag),
            Prism.languages.insertBefore('inside', 'special-attr', {
                script: {
                    pattern: a('=<BRACES>'),
                    alias: 'language-javascript',
                    inside: {
                        'script-punctuation': {
                            pattern: /^=(?=\{)/,
                            alias: 'punctuation',
                        },
                        rest: Prism.languages.jsx,
                    },
                },
            }, Prism.languages.jsx.tag);
        var s = function (t) {
            return t
                ? 'string' == typeof t
                    ? t
                    : 'string' == typeof t.content
                        ? t.content
                        : t.content.map(s).join('')
                : '';
        }, g = function (n) {
            for (var e = [], a = 0; a < n.length; a++) {
                var o = n[a], i = !1;
                if (('string' != typeof o &&
                    ('tag' === o.type &&
                        o.content[0] &&
                        'tag' === o.content[0].type
                        ? '</' === o.content[0].content[0].content
                            ? e.length > 0 &&
                                e[e.length - 1].tagName ===
                                    s(o.content[0].content[1]) &&
                                e.pop()
                            : '/>' ===
                                o.content[o.content.length - 1]
                                    .content ||
                                e.push({
                                    tagName: s(o.content[0].content[1]),
                                    openedBraces: 0,
                                })
                        : e.length > 0 &&
                            'punctuation' === o.type &&
                            '{' === o.content
                            ? e[e.length - 1].openedBraces++
                            : e.length > 0 &&
                                e[e.length - 1].openedBraces > 0 &&
                                'punctuation' === o.type &&
                                '}' === o.content
                                ? e[e.length - 1].openedBraces--
                                : (i = !0)),
                    (i || 'string' == typeof o) &&
                        e.length > 0 &&
                        0 === e[e.length - 1].openedBraces)) {
                    var r = s(o);
                    a < n.length - 1 &&
                        ('string' == typeof n[a + 1] ||
                            'plain-text' === n[a + 1].type) &&
                        ((r += s(n[a + 1])), n.splice(a + 1, 1)),
                        a > 0 &&
                            ('string' == typeof n[a - 1] ||
                                'plain-text' === n[a - 1].type) &&
                            ((r = s(n[a - 1]) + r),
                                n.splice(a - 1, 1),
                                a--),
                        (n[a] = new Prism.Token('plain-text', r, null, r));
                }
                o.content && 'string' != typeof o.content && g(o.content);
            }
        };
        Prism.hooks.add('after-tokenize', function (t) {
            ('jsx' !== t.language && 'tsx' !== t.language) || g(t.tokens);
        });
    },
    markdown: (Prism) => {
        function e(reg) {
            return ((reg = reg.replace(/<inner>/g, function () {
                return '(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?![\r\n]))';
            })),
                RegExp('((?:^|[^\\\\])(?:\\\\{2})*)(?:' + reg + ')'));
        }
        const t = '(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+', a = '\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))'.replace(/__/g, function () {
            return t;
        }), i = '\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)';
        (Prism.languages.markdown = Prism.languages.extend('markup', {})),
            Prism.languages.insertBefore('markdown', 'prolog', {
                'front-matter-block': {
                    pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: {
                        punctuation: /^---|---$/,
                        'front-matter': {
                            pattern: /\S+(?:\s+\S+)*/,
                            alias: ['yaml', 'language-yaml'],
                            inside: Prism.languages.yaml,
                        },
                    },
                },
                blockquote: {
                    pattern: /^>(?:[\t ]*>)*/m,
                    alias: 'punctuation',
                },
                table: {
                    pattern: RegExp('^' + a + i + '(?:' + a + ')*', 'm'),
                    inside: {
                        'table-data-rows': {
                            pattern: RegExp('^(' + a + i + ')(?:' + a + ')*$'),
                            lookbehind: !0,
                            inside: {
                                'table-data': {
                                    pattern: RegExp(t),
                                    inside: Prism.languages.markdown,
                                },
                                punctuation: /\|/,
                            },
                        },
                        'table-line': {
                            pattern: RegExp('^(' + a + ')' + i + '$'),
                            lookbehind: !0,
                            inside: { punctuation: /\||:?-{3,}:?/ },
                        },
                        'table-header-row': {
                            pattern: RegExp('^' + a + '$'),
                            inside: {
                                'table-header': {
                                    pattern: RegExp(t),
                                    alias: 'important',
                                    inside: Prism.languages.markdown,
                                },
                                punctuation: /\|/,
                            },
                        },
                    },
                },
                code: [
                    {
                        pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
                        lookbehind: !0,
                        alias: 'keyword',
                    },
                    {
                        pattern: /^```[\s\S]*?^```$/m,
                        greedy: !0,
                        inside: {
                            'code-block': {
                                pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                                lookbehind: !0,
                            },
                            'code-language': {
                                pattern: /^(```).+/,
                                lookbehind: !0,
                            },
                            punctuation: /```/,
                        },
                    },
                ],
                title: [
                    {
                        pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
                        alias: 'important',
                        inside: { punctuation: /==+$|--+$/ },
                    },
                    {
                        pattern: /(^\s*)#.+/m,
                        lookbehind: !0,
                        alias: 'important',
                        inside: { punctuation: /^#+|#+$/ },
                    },
                ],
                hr: {
                    pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
                    lookbehind: !0,
                    alias: 'punctuation',
                },
                list: {
                    pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
                    lookbehind: !0,
                    alias: 'punctuation',
                },
                'url-reference': {
                    pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
                    inside: {
                        variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
                        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                        punctuation: /^[\[\]!:]|[<>]/,
                    },
                    alias: 'url',
                },
                bold: {
                    pattern: e('\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*'),
                    lookbehind: !0,
                    greedy: !0,
                    inside: {
                        content: {
                            pattern: /(^..)[\s\S]+(?=..$)/,
                            lookbehind: !0,
                            inside: {},
                        },
                        punctuation: /\*\*|__/,
                    },
                },
                italic: {
                    pattern: e('\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*'),
                    lookbehind: !0,
                    greedy: !0,
                    inside: {
                        content: {
                            pattern: /(^.)[\s\S]+(?=.$)/,
                            lookbehind: !0,
                            inside: {},
                        },
                        punctuation: /[*_]/,
                    },
                },
                strike: {
                    pattern: e('(~~?)(?:(?!~)<inner>)+\\2'),
                    lookbehind: !0,
                    greedy: !0,
                    inside: {
                        content: {
                            pattern: /(^~~?)[\s\S]+(?=\1$)/,
                            lookbehind: !0,
                            inside: {},
                        },
                        punctuation: /~~?/,
                    },
                },
                'code-snippet': {
                    pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
                    lookbehind: !0,
                    greedy: !0,
                    alias: ['code', 'keyword'],
                },
                url: {
                    pattern: e('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])'),
                    lookbehind: !0,
                    greedy: !0,
                    inside: {
                        operator: /^!/,
                        content: {
                            pattern: /(^\[)[^\]]+(?=\])/,
                            lookbehind: !0,
                            inside: {},
                        },
                        variable: {
                            pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
                            lookbehind: !0,
                        },
                        url: { pattern: /(^\]\()[^\s)]+/, lookbehind: !0 },
                        string: {
                            pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
                            lookbehind: !0,
                        },
                    },
                },
            }),
            ['url', 'bold', 'italic', 'strike'].forEach(function (e) {
                ['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach(function (t) {
                    e !== t &&
                        (Prism.languages.markdown[e].inside.content.inside[t] = Prism.languages.markdown[t]);
                });
            }),
            Prism.hooks.add('after-tokenize', function (Prism) {
                ('markdown' !== Prism.language &&
                    'md' !== Prism.language) ||
                    (function n(e) {
                        if (e && 'string' != typeof e)
                            for (var t = 0, a = e.length; t < a; t++) {
                                var i = e[t];
                                if ('code' === i.type) {
                                    var r = i.content[1], o = i.content[3];
                                    if (r &&
                                        o &&
                                        'code-language' === r.type &&
                                        'code-block' === o.type &&
                                        'string' == typeof r.content) {
                                        var l = r.content
                                            .replace(/\b#/g, 'sharp')
                                            .replace(/\b\+\+/g, 'pp'), s = 'language-' +
                                            (l = (/[a-z][\w-]*/i.exec(l) || [
                                                '',
                                            ])[0].toLowerCase());
                                        o.alias
                                            ? 'string' == typeof o.alias
                                                ? (o.alias = [o.alias, s])
                                                : o.alias.push(s)
                                            : (o.alias = [s]);
                                    }
                                }
                                else
                                    n(i.content);
                            }
                    })(Prism.tokens);
            }),
            Prism.hooks.add('wrap', function (e) {
                if ('code-block' === e.type) {
                    for (var t = '', a = 0, i = e.classes.length; a < i; a++) {
                        var s = e.classes[a], d = /language-(.+)/.exec(s);
                        if (d) {
                            t = d[1];
                            break;
                        }
                    }
                    var p = Prism.languages[t];
                    if (p)
                        e.content = Prism.highlight(e.content
                            .replace(r, '')
                            .replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (Prism, e) {
                            var t;
                            return '#' === (e = e.toLowerCase())[0]
                                ? ((t =
                                    'x' === e[1]
                                        ? parseInt(e.slice(2), 16)
                                        : Number(e.slice(1))),
                                    l(t))
                                : o[e] || Prism;
                        }), p, t);
                    else if (t && 'none' !== t && Prism.plugins.autoloader) {
                        var u = 'md-' +
                            new Date().valueOf() +
                            '-' +
                            Math.floor(1e16 * Math.random());
                        (e.attributes.id = u),
                            Prism.plugins.autoloader.loadLanguages(t, function () {
                                var e = document.getElementById(u);
                                e &&
                                    (e.innerHTML = Prism.highlight(e.textContent, Prism.languages[t], t));
                            });
                    }
                }
            });
        var r = RegExp(Prism.languages.markup.tag.pattern.source, 'gi'), o = { amp: '&', lt: '<', gt: '>', quot: '"' }, l = String.fromCodePoint || String.fromCharCode;
        Prism.languages.md = Prism.languages.markdown;
    },
    markup: (Prism) => {
        (Prism.languages.markup = {
            comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
            prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
            doctype: {
                pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
                greedy: !0,
                inside: {
                    'internal-subset': {
                        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                        lookbehind: !0,
                        greedy: !0,
                        inside: null,
                    },
                    string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
                    punctuation: /^<!|>$|[[\]]/,
                    'doctype-tag': /^DOCTYPE/i,
                    name: /[^\s<>'"]+/,
                },
            },
            cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
            tag: {
                pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
                greedy: !0,
                inside: {
                    tag: {
                        pattern: /^<\/?[^\s>\/]+/,
                        inside: {
                            punctuation: /^<\/?/,
                            namespace: /^[^\s>\/:]+:/,
                        },
                    },
                    'special-attr': [],
                    'attr-value': {
                        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                        inside: {
                            punctuation: [
                                { pattern: /^=/, alias: 'attr-equals' },
                                { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
                            ],
                        },
                    },
                    punctuation: /\/?>/,
                    'attr-name': {
                        pattern: /[^\s>\/]+/,
                        inside: { namespace: /^[^\s>\/:]+:/ },
                    },
                },
            },
            entity: [
                { pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' },
                /&#x?[\da-f]{1,8};/i,
            ],
        }),
            (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
                Prism.languages.markup.entity),
            (Prism.languages.markup.doctype.inside['internal-subset'].inside =
                Prism.languages.markup),
            Prism.hooks.add('wrap', function (a) {
                'entity' === a.type &&
                    (a.attributes.title = a.content.replace(/&amp;/, '&'));
            }),
            Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
                value: function (a, e) {
                    var s = {};
                    (s['language-' + e] = {
                        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                        lookbehind: !0,
                        inside: Prism.languages[e],
                    }),
                        (s['cdata'] = /^<!\[CDATA\[|\]\]>$/i);
                    var t = {
                        'included-cdata': {
                            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                            inside: s,
                        },
                    };
                    t['language-' + e] = {
                        pattern: /[\s\S]+/,
                        inside: Prism.languages[e],
                    };
                    var n = {};
                    (n[a] = {
                        pattern: RegExp('(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(/__/g, function () {
                            return a;
                        }), 'i'),
                        lookbehind: !0,
                        greedy: !0,
                        inside: t,
                    }),
                        Prism.languages.insertBefore('markup', 'cdata', n);
                },
            }),
            Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
                value: function (a, e) {
                    Prism.languages.markup.tag.inside['special-attr'].push({
                        pattern: RegExp('(^|["\'\\s])(?:' +
                            a +
                            ')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))', 'i'),
                        lookbehind: !0,
                        inside: {
                            'attr-name': /^[^\s=]+/,
                            'attr-value': {
                                pattern: /=[\s\S]+/,
                                inside: {
                                    value: {
                                        pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                                        lookbehind: !0,
                                        alias: [e, 'language-' + e],
                                        inside: Prism.languages[e],
                                    },
                                    punctuation: [
                                        { pattern: /^=/, alias: 'attr-equals' },
                                        /"|'/,
                                    ],
                                },
                            },
                        },
                    });
                },
            }),
            (Prism.languages.html = Prism.languages.markup),
            (Prism.languages.mathml = Prism.languages.markup),
            (Prism.languages.svg = Prism.languages.markup),
            (Prism.languages.xml = Prism.languages.extend('markup', {})),
            (Prism.languages.ssml = Prism.languages.xml),
            (Prism.languages.atom = Prism.languages.xml),
            (Prism.languages.rss = Prism.languages.xml);
    },
    python: (Prism) => {
        (Prism.languages.python = {
            comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
            'string-interpolation': {
                pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
                greedy: !0,
                inside: {
                    interpolation: {
                        pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
                        lookbehind: !0,
                        inside: {
                            'format-spec': {
                                pattern: /(:)[^:(){}]+(?=\}$)/,
                                lookbehind: !0,
                            },
                            'conversion-option': {
                                pattern: /![sra](?=[:}]$)/,
                                alias: 'punctuation',
                            },
                            rest: null,
                        },
                    },
                    string: /[\s\S]+/,
                },
            },
            'triple-quoted-string': {
                pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
                greedy: !0,
                alias: 'string',
            },
            string: {
                pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
                greedy: !0,
            },
            function: {
                pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
                lookbehind: !0,
            },
            'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
            decorator: {
                pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
                lookbehind: !0,
                alias: ['annotation', 'punctuation'],
                inside: { punctuation: /\./ },
            },
            keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
            builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
            boolean: /\b(?:False|None|True)\b/,
            number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
            operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
            punctuation: /[{}[\];(),.:]/,
        }),
            (Prism.languages.python['string-interpolation'].inside.interpolation.inside.rest = Prism.languages.python),
            (Prism.languages.py = Prism.languages.python);
    },
    regex: (Prism) => {
        var e = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: 'escape' }, n = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/, t = '(?:[^\\\\-]|' + n.source + ')', s = RegExp(t + '-' + t), i = {
            pattern: /(<|')[^<>']+(?=[>']$)/,
            lookbehind: !0,
            alias: 'variable',
        };
        Prism.languages.regex = {
            'char-class': {
                pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
                lookbehind: !0,
                inside: {
                    'char-class-negation': {
                        pattern: /(^\[)\^/,
                        lookbehind: !0,
                        alias: 'operator',
                    },
                    'char-class-punctuation': {
                        pattern: /^\[|\]$/,
                        alias: 'punctuation',
                    },
                    range: {
                        pattern: s,
                        inside: {
                            escape: n,
                            'range-punctuation': {
                                pattern: /-/,
                                alias: 'operator',
                            },
                        },
                    },
                    'special-escape': e,
                    'char-set': {
                        pattern: /\\[wsd]|\\p\{[^{}]+\}/i,
                        alias: 'class-name',
                    },
                    escape: n,
                },
            },
            'special-escape': e,
            'char-set': {
                pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i,
                alias: 'class-name',
            },
            backreference: [
                { pattern: /\\(?![123][0-7]{2})[1-9]/, alias: 'keyword' },
                {
                    pattern: /\\k<[^<>']+>/,
                    alias: 'keyword',
                    inside: { 'group-name': i },
                },
            ],
            anchor: { pattern: /[$^]|\\[ABbGZz]/, alias: 'function' },
            escape: n,
            group: [
                {
                    pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
                    alias: 'punctuation',
                    inside: { 'group-name': i },
                },
                { pattern: /\)/, alias: 'punctuation' },
            ],
            quantifier: {
                pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
                alias: 'number',
            },
            alternation: { pattern: /\|/, alias: 'keyword' },
        };
    },
    scss: (Prism) => {
        (Prism.languages.scss = Prism.languages.extend('css', {
            comment: {
                pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
                lookbehind: !0,
            },
            atrule: {
                pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
                inside: { rule: /@[\w-]+/ },
            },
            url: /(?:[-a-z]+-)?url(?=\()/i,
            selector: {
                pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
                inside: {
                    parent: { pattern: /&/, alias: 'important' },
                    placeholder: /%[-\w]+/,
                    variable: /\$[-\w]+|#\{\$[-\w]+\}/,
                },
            },
            property: {
                pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
                inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
            },
        })),
            Prism.languages.insertBefore('scss', 'atrule', {
                keyword: [
                    /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
                    { pattern: /( )(?:from|through)(?= )/, lookbehind: !0 },
                ],
            }),
            Prism.languages.insertBefore('scss', 'important', {
                variable: /\$[-\w]+|#\{\$[-\w]+\}/,
            }),
            Prism.languages.insertBefore('scss', 'function', {
                'module-modifier': {
                    pattern: /\b(?:as|hide|show|with)\b/i,
                    alias: 'keyword',
                },
                placeholder: { pattern: /%[-\w]+/, alias: 'selector' },
                statement: {
                    pattern: /\B!(?:default|optional)\b/i,
                    alias: 'keyword',
                },
                boolean: /\b(?:false|true)\b/,
                null: { pattern: /\bnull\b/, alias: 'keyword' },
                operator: {
                    pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
                    lookbehind: !0,
                },
            }),
            (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss);
    },
    tsx: (Prism) => {
        const a = Prism.util.clone(Prism.languages.typescript);
        (Prism.languages.tsx = Prism.languages.extend('jsx', a)),
            delete Prism?.languages?.tsx?.parameter,
            delete Prism?.languages?.tsx?.['literal-property'];
        const t = Prism.languages?.tsx?.tag;
        (t.pattern = RegExp('(^|[^\\w$]|(?=</))(?:' + t.pattern.source + ')', t.pattern.flags)),
            (t.lookbehind = !0);
    },
    typescript: (Prism) => {
        (Prism.languages.typescript = Prism.languages.extend('javascript', {
            'class-name': {
                pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
                lookbehind: !0,
                greedy: !0,
                inside: null,
            },
            builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
        })),
            Prism.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/, /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/, /\btype\b(?=\s*(?:[\{*]|$))/),
            delete Prism.languages.typescript.parameter,
            delete Prism.languages.typescript['literal-property'];
        var s = Prism.languages.extend('typescript', {});
        delete s['class-name'],
            (Prism.languages.typescript['class-name'].inside = s),
            Prism.languages.insertBefore('typescript', 'function', {
                decorator: {
                    pattern: /@[$\w\xA0-\uFFFF]+/,
                    inside: {
                        at: { pattern: /^@/, alias: 'operator' },
                        function: /^[\s\S]+/,
                    },
                },
                'generic-function': {
                    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
                    greedy: !0,
                    inside: {
                        function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
                        generic: {
                            pattern: /<[\s\S]+/,
                            alias: 'class-name',
                            inside: s,
                        },
                    },
                },
            }),
            (Prism.languages.ts = Prism.languages.typescript);
    },
};

const kulCodeCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_code_background_color:var(\n    --kul-code-background-color,\n    rgba(var(--kul-background-color-rgb) 0.275)\n  );--kul_code_font_family:var(\n    --kul-code-font-family,\n    var(--kul-font-family-monospace)\n  );--kul_code_header_background_color:var(\n    --kul-code-header-background-color,\n    var(--kul-title-background-color)\n  );--kul_code_header_color:var(--kul-code-header-color, var(--kul-title-color));--kul_code_selection_background_color:var(\n    --kul-code-selection-background-color,\n    rgba(var(--kul-border-color-rgb, 0.275))\n  );--kul_code_text_color:var(--kul-code-text-color, var(--kul-text-color));--kul_code_token_color_1:var(\n    --kul-code-token-color-1,\n    var(--kul-chart-color-1)\n  );--kul_code_token_color_2:var(\n    --kul-code-token-color-2,\n    var(--kul-chart-color-2)\n  );--kul_code_token_color_3:var(\n    --kul-code-token-color-3,\n    var(--kul-chart-color-3)\n  );--kul_code_token_color_4:var(\n    --kul-code-token-color-4,\n    var(--kul-chart-color-4)\n  );--kul_code_token_color_5:var(\n    --kul-code-token-color-5,\n    var(--kul-chart-color-5)\n  );display:block;height:100%;width:100%}#kul-component,.container{height:100%;overflow:auto;position:relative;width:100%}.container{display:grid;grid-template-rows:max-content 1fr}.title{font-size:0.85em;letter-spacing:2px;padding:0.5em;text-transform:uppercase}.header{--kul-button-primary-color:var(--kul_code_header_color);align-items:center;background:var(--kul_code_header_background_color);border-color:var(--kul-primary-color);border-left:inset;color:var(--kul_code_header_color);display:flex;height:36px;justify-content:space-between;padding:0.25em 0.75em;position:sticky;top:0;z-index:1}:not(pre)>code,pre{-webkit-backdrop-filter:blur(3.5px);backdrop-filter:blur(3.5px);background:var(--kul_code_background_color);border:1px solid var(--kul_code_header_background_color);border-radius:4px}code,pre{color:var(--kul_code_text_color);font-family:var(--kul_code_font_family);font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code ::-moz-selection,code::-moz-selection,pre ::-moz-selection,pre::-moz-selection{text-shadow:none;background:var(--kul_code_selection_background_color)}code ::selection,code::selection,pre ::selection,pre::selection{text-shadow:none;background:var(--kul_code_selection_background_color)}.body{color:var(--kul_code_text_color);padding:1em;white-space:pre-line}pre{box-sizing:border-box;margin:0;min-height:calc(100% - 36px);overflow:auto;padding:1.75em 1em;white-space:pre-wrap}:not(pre)>code{border-radius:0.3em;padding:0.1em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:rgba(var(--kul-text-color-rgb), 0.575)}.token.punctuation{color:rgba(var(--kul-text-color-rgb), 0.875)}.token.namespace{opacity:0.7}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}.token.boolean,.token.constant,.token.deleted,.token.number,.token.property,.token.symbol,.token.tag{color:var(--kul_code_token_color_1)}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:var(--kul_code_token_color_2)}.token.atrule,.token.attr-value,.token.keyword{color:var(--kul_code_token_color_3)}.token.class-name,.token.function{color:var(--kul_code_token_color_4)}.token.important,.token.regex,.token.variable{color:var(--kul_code_token_color_5)}";
const KulCodeStyle0 = kulCodeCss;

const KulCode = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-code-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.value = '';
        this.kulFormat = true;
        this.kulLanguage = 'javascript';
        this.kulPreserveSpaces = undefined;
        this.kulStyle = '';
        this.kulValue = '';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #el;
    #kulManager = kulManagerInstance();
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Retrieves the debug information reflecting the current state of the component.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves to a KulDebugLifecycleInfo object containing debug information.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Retrieves the properties of the component, with optional descriptions.
     * @param {boolean} descriptions - If true, returns properties with descriptions; otherwise, returns properties only.
     * @returns {Promise<GenericObject>} A promise that resolves to an object where each key is a property name, optionally with its description.
     */
    async getProps(descriptions) {
        return getProps(this, KulCodeProps, descriptions);
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Initiates the unmount sequence, which removes the component from the DOM after a delay.
     * @param {number} ms - Number of milliseconds
     */
    async unmount(ms = 0) {
        setTimeout(() => {
            this.onKulEvent(new CustomEvent('unmount'), 'unmount');
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #format(value) {
        if (typeof value === 'string' && /^[\{\}]\s*$/i.test(value)) {
            return value.trim();
        }
        else if (this.#isJson(value)) {
            const parsed = JSON.parse(value);
            return JSON.stringify(parsed, null, 2);
        }
        else {
            return this.#kulManager.data.cell.stringify(value);
        }
    }
    async #highlightCode() {
        try {
            if (!Prism.languages[this.kulLanguage]) {
                await this.#loadLanguage();
            }
            Prism.highlightElement(this.#el);
        }
        catch (error) {
            this.#kulManager.debug.logs.new(this, 'Failed to highlight code:' + error, 'error');
            this.#el.innerHTML = this.value;
        }
    }
    #isObjectLike(obj) {
        return typeof obj === 'object' && obj !== null;
    }
    #isDictionary(obj) {
        return (this.#isObjectLike(obj) &&
            Object.values(obj).every((value) => value != null));
    }
    #isJson(value) {
        return (this.kulLanguage?.toLowerCase() === 'json' ||
            this.#isDictionary(value));
    }
    async #loadLanguage() {
        try {
            const module = getAssetPath(`./assets/prism/prism-${this.kulLanguage}.min.js`);
            await import(module);
            Prism.highlightAll();
        }
        catch (error) {
            console.error(`Failed to load Prism.js component for ${this.kulLanguage}:`, error);
        }
    }
    #updateValue() {
        this.value = this.kulFormat
            ? this.#format(this.kulValue)
            : this.kulValue;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        STATIC_LANGUAGES.css(Prism);
        STATIC_LANGUAGES.javascript(Prism);
        STATIC_LANGUAGES.json(Prism);
        STATIC_LANGUAGES.jsx(Prism);
        STATIC_LANGUAGES.markdown(Prism);
        STATIC_LANGUAGES.markup(Prism);
        STATIC_LANGUAGES.python(Prism);
        STATIC_LANGUAGES.regex(Prism);
        STATIC_LANGUAGES.scss(Prism);
        STATIC_LANGUAGES.tsx(Prism);
        STATIC_LANGUAGES.typescript(Prism);
        this.#updateValue();
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillUpdate() {
        this.value = this.#format(this.kulValue);
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        if (this.#el) {
            this.#highlightCode();
        }
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        const isPreserveSpaceMissing = !!(this.kulPreserveSpaces !== true && this.kulPreserveSpaces !== false);
        const isLikelyTextual = this.kulLanguage.toLowerCase() === 'text' ||
            this.kulLanguage.toLowerCase() === 'doc' ||
            this.kulLanguage.toLowerCase() === 'markdown' ||
            this.kulLanguage.toLowerCase() === 'css' ||
            this.kulLanguage.toLowerCase() === '';
        const shouldPreserveSpace = this.kulPreserveSpaces ||
            (isPreserveSpaceMissing && !isLikelyTextual);
        return (h(Host, { key: '07b9411ea3b727974942040cbb4d71af75515396' }, this.kulStyle && (h("style", { key: 'ba9d0f27f706fa7bc05839de598ec1b828574c33', id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))), h("div", { key: '085fc5a274c97ed00f5e8e7a3c47d8366f04aa6c', id: KUL_WRAPPER_ID }, h("div", { key: '36486148e9a6404803279e6306695b03617e920c', class: "container" }, h("div", { key: 'd2084f554df0d909009a29538eac8ac8e8c03303', class: "header" }, h("span", { key: 'c6f5bed5fc066ac35c800bc337b453808503468b', class: "title" }, this.kulLanguage), h("kul-button", { key: '4ee0fb77859dcc421c35f04b1c25991575afc054', class: 'kul-slim kul-full-height', kulIcon: "content_copy", kulLabel: "Copy", kulStyling: "flat", "onKul-button-event": (e) => {
                const { comp, eventType } = e.detail;
                switch (eventType) {
                    case 'click':
                        navigator.clipboard.writeText(this.kulValue);
                        comp.setMessage();
                        break;
                }
            } })), shouldPreserveSpace ? (h("pre", { class: 'language-' + this.kulLanguage, key: this.value, ref: (el) => {
                if (el) {
                    this.#el = el;
                }
            } }, h("code", null, this.value))) : (h("div", { class: 'body language-' + this.kulLanguage, key: this.value, ref: (el) => {
                if (el) {
                    this.#el = el;
                }
            } }, this.value))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
    static get assetsDirs() { return ["assets/prism"]; }
};
KulCode.style = KulCodeStyle0;

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulProgressbarProps;
(function (KulProgressbarProps) {
    KulProgressbarProps["kulCenteredLabel"] = "Displays the label in the middle of the progress bar. It's the default for the radial variant and can't be changed.";
    KulProgressbarProps["kulIcon"] = "Specifies an icon to replace the label.";
    KulProgressbarProps["kulIsRadial"] = "Radial version.";
    KulProgressbarProps["kulLabel"] = "Specifies a text for the bar's label.";
    KulProgressbarProps["kulShowLabel"] = "Flag to show or hide the progress bar's label.";
    KulProgressbarProps["kulStyle"] = "Custom style of the component.";
    KulProgressbarProps["kulValue"] = "The current value the progress bar must display.";
})(KulProgressbarProps || (KulProgressbarProps = {}));

const kulProgressbarCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_progressbar_border_radius:var(--kul-progressbar-border-radius, 4px);--kul_progressbar_font_family:var(\n    --kul-progressbar-font-family,\n    var(--kul-font-family)\n  );--kul_progressbar_font_size:var(\n    --kul-progressbar-font-size,\n    var(--kul-font-size)\n  );--kul_progressbar_height:var(--kul-progressbar-height, 2.5em);--kul_progressbar_primary_color:var(\n    --kul-progressbar-primary-color,\n    var(--kul-primary-color)\n  );--kul_progressbar_text_color:var(\n    --kul-progressbar-text-color,\n    var(--kul-text-color)\n  );--kul_progressbar_text_color_rgb:var(\n    --kul-progressbar-text-color-rgb,\n    var(--kul-text-color-rgb)\n  );--kul_progressbar_text_on_primary_color:var(\n    --kul-progressbar-text-on-primary-color,\n    var(--kul-text-on-primary-color)\n  );--kul_progressbar_track_color:var(\n    --kul-progressbar-track-color,\n    var(--kul-disabled-background-color)\n  );--kul_progressbar_width:var(--kul-progressbar-width, 100%)}:host{display:block;font-family:var(--kul_progressbar_font_family);font-size:var(--kul_progressbar_font_size);width:var(--kul_progressbar_width)}.progress-bar{background:var(--kul_progressbar_track_color);border-radius:var(--kul_progressbar_border_radius);height:var(--kul_progressbar_height);overflow:hidden;width:var(--kul_progressbar_width)}.progress-bar__icon{background:var(--kul_progressbar_text_color);height:1.5em;margin:0 0.25em;width:1.5em}.progress-bar__label{align-items:center;display:flex;height:100%;justify-content:center;left:0;min-width:max-content;position:absolute;top:0;width:100%}.progress-bar__mu{font-size:calc(var(--kul_progressbar_font_size) * 0.75)}.progress-bar__percentage{background:var(--kul_progressbar_primary_color);border-radius:var(--kul_progressbar_border_radius);box-sizing:border-box;color:var(--kul_progressbar_text_color);height:var(--kul_progressbar_height);padding:0.5em 0;position:relative;text-align:center;transition:width 0.2s ease;width:var(--kul_progressbar_percentage_width)}:host([kul-centered-label]) .progress-bar{position:relative}:host([kul-centered-label]) .progress-bar__percentage{position:static}:host([kul-is-radial]){box-sizing:border-box;margin:auto;padding:1.25em 0px}:host([kul-is-radial]) #kul-component{display:flex;font-size:10em;margin:auto}:host([kul-is-radial]) .progress-bar{background:none;height:1em;margin:auto;overflow:visible;position:relative;width:1em}:host([kul-is-radial]) .progress-bar:nth-child(3n+1){clear:both}:host([kul-is-radial]) .progress-bar .pie{height:1em;width:1em;clip:rect(0, 1em, 1em, 0.5em);left:0;position:absolute;top:0}:host([kul-is-radial]) .progress-bar .pie.has-value .half-circle{border-color:var(--kul_progressbar_primary_color)}:host([kul-is-radial]) .progress-bar .pie.has-value .half-circle.left-side{transform:var(--kul_progressbar_transform);transition:transform 0.2s ease}:host([kul-is-radial]) .progress-bar .pie.has-value.half-empty .right-side{display:none}:host([kul-is-radial]) .progress-bar .pie.has-value.half-full{clip:rect(auto, auto, auto, auto)}:host([kul-is-radial]) .progress-bar .pie.has-value.half-full .right-side{transform:rotate(180deg)}:host([kul-is-radial]) .progress-bar .pie .half-circle{height:1em;width:1em;border:0.1em solid var(--kul_progressbar_track_color);border-radius:50%;clip:rect(0, 0.5em, 1em, 0);left:0;position:absolute;top:0}:host([kul-is-radial]) .progress-bar__icon{height:0.75em;margin:0 0.15em;width:0.75em}:host([kul-is-radial]) .progress-bar__label{color:var(--kul_progressbar_text_color);cursor:default;display:flex;font-size:0.25em}:host([kul-is-radial]) .progress-bar__track{height:1em;width:1em;border:0.1em solid var(--kul_progressbar_track_color);border-radius:50%}:host([kul-is-radial]) .progress-bar__um{color:var(--kul_progressbar_text_color);font-size:0.75em;padding-bottom:0.75em}:host([kul-is-radial]) *,:host([kul-is-radial]) *:before,:host([kul-is-radial]) *:after{box-sizing:border-box}@keyframes running-stripes{0%{background-position:0 0}100%{background-position:3em 3em}}:host(.kul-animated) .progress-bar__percentage{animation:running-stripes 2s linear infinite;background-image:linear-gradient(-45deg, rgba(var(--kul_progressbar_text_color_rgb), 0.125) 25%, transparent 25%, transparent 50%, rgba(var(--kul_progressbar_text_color_rgb), 0.125) 50%, rgba(var(--kul_progressbar_text_color_rgb), 0.125) 75%, transparent 75%, transparent);background-size:3em 3em}:host(.kul-padded) .progress-bar{padding:0.5em;width:calc(100% - 1em)}:host(.kul-slim) #kul-component .progress-bar{--kul_progressbar_height:calc(\n    var(--kul-progressbar-height, 2.5em) * 0.5\n  );border-radius:9px}:host(.kul-slim) #kul-component .progress-bar__percentage{border-radius:9px;padding:0}:host(.kul-slim) #kul-component .progress-bar .pie .half-circle{border-width:0.05em}:host(.kul-slim) #kul-component .progress-bar__track{border-width:0.05em}:host(.kul-danger){--kul-progressbar-primary-color:var(--kul-danger-color);--kul-progressbar-text-on-primary-color:white}:host(.kul-info){--kul-progressbar-primary-color:var(--kul-info-color);--kul-progressbar-text-on-primary-color:white}:host(.kul-secondary){--kul-progressbar-primary-color:var(--kul-secondary-color);--kul-progressbar-text-on-primary-color:var(--kul-text-on-secondary-color)}:host(.kul-success){--kul-progressbar-primary-color:var(--kul-success-color);--kul-progressbar-text-on-primary-color:white}:host(.kul-warning){--kul-progressbar-primary-color:var(--kul-warning-color);--kul-progressbar-text-on-primary-color:white}";
const KulProgressbarStyle0 = kulProgressbarCss;

const KulProgressbar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-progressbar-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.kulCenteredLabel = false;
        this.kulIcon = '';
        this.kulIsRadial = false;
        this.kulLabel = '';
        this.kulStyle = '';
        this.kulValue = 0;
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Retrieves the debug information reflecting the current state of the component.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves to a KulDebugLifecycleInfo object containing debug information.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Retrieves the properties of the component, with optional descriptions.
     * @param {boolean} descriptions - If true, returns properties with descriptions; otherwise, returns properties only.
     * @returns {Promise<GenericObject>} A promise that resolves to an object where each key is a property name, optionally with its description.
     */
    async getProps(descriptions) {
        return getProps(this, KulProgressbarProps, descriptions);
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Initiates the unmount sequence, which removes the component from the DOM after a delay.
     * @param {number} ms - Number of milliseconds
     */
    async unmount(ms = 0) {
        setTimeout(() => {
            this.onKulEvent(new CustomEvent('unmount'), 'unmount');
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepIcon() {
        const path = getAssetPath(`./assets/svg/${this.kulIcon}.svg`);
        const style = {
            mask: `url('${path}') no-repeat center`,
            webkitMask: `url('${path}') no-repeat center`,
        };
        return h("div", { class: "progress-bar__icon", style: style });
    }
    #prepLabel() {
        const label = this.kulLabel
            ? [h("div", { class: "progress-bar__text" }, this.kulLabel)]
            : [
                h("div", { class: "progress-bar__text" }, this.kulValue),
                h("div", { class: "progress-bar__mu" }, "%"),
            ];
        return (h("div", { class: "progress-bar__label" }, this.kulIcon && this.#prepIcon(), label));
    }
    #prepProgressBar() {
        return (h("div", { class: 'progress-bar' }, h("div", { class: "progress-bar__percentage" }, this.#prepLabel())));
    }
    #prepRadialBar() {
        return (h("div", { class: 'progress-bar' }, this.#prepLabel(), h("div", { class: `pie ${this.kulValue ? 'has-value' : ''}  ${this.kulValue > 50 ? 'half-full' : 'half-empty'}` }, h("div", { class: "left-side half-circle" }), h("div", { class: "right-side half-circle" })), h("div", { class: "progress-bar__track" })));
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        const style = {
            ['--kul_progressbar_percentage_width']: `${this.kulValue}%`,
            ['--kul_progressbar_transform']: `rotate(${this.kulValue * 3.6}deg)`,
        };
        return (h(Host, { key: 'c39e9107828672dbddaa21e48d46e63b9266d7be' }, this.kulStyle && (h("style", { key: '7b1a7ea9ae8f3437150d9af590aa5aa5713e0ac3', id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))), h("div", { key: '649022702f454002dd5c1ec743475bc3beeee6c0', id: KUL_WRAPPER_ID, style: style }, this.kulIsRadial
            ? this.#prepRadialBar()
            : this.#prepProgressBar())));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulProgressbar.style = KulProgressbarStyle0;

export { KulCode as kul_code, KulProgressbar as kul_progressbar };

//# sourceMappingURL=kul-code_2.entry.js.map