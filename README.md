args-fetcher.js
===============

Can be used only with require.js.

Install
---

Add to bower.json:

```json
{
  "dependencies": {
    "args-fetcher.js": "*"
  }
}
```

Add to require.js main configuration file next deps:

```js
{
  'argspecjs': 'Lib/Vendor/argspecjs/argspec',  // args-fetcher dependency
  'clonejs': 'Lib/Vendor/clone/clone', // args-fetcher dependency
  'args-fetcher': 'Lib/Vendor/args-fetcher.js/args-fetcher'
}
```

Usage
--

Component example:

```js
define(['args-fetcher'], function(argsFetcher) {
	return {
		someMethod: function(widget, parameters, callback) {
			var args = argsFetcher.getArgs(arguments, {
				widget: { check: function(arg) { return arg && arg.someMethodExists; } },
				parameters: { default: {} },
				callback: { type: 'function', default: function() {} }
			});

			console.log(args);
		},

		someAnotherMethod: function() {
			var args = argsFetcher.getArgs(arguments, {
				url: { type: 'string' },
				param: { type: 'object', default: {} },
				method: { type: 'string', default: 'GET' },
				type: { type: 'string', default: 'json' },
				// Just one of: type/check can be used. If both used, then error will be thrown
				callback: { type: 'function', /* OR */ check: argsFetcher.isCallback, default: function() {} },
				skipCache: { type: 'boolean', default: Util.isIE() }
			});

			console.log(args);
		}
	}
});
```
