define(['argspec', 'clonejs'], function(argspec, clone) {

	var argspec = clone(argspec);
	var originalHandler = argspec.getArgs;

	argspec.getArgs = function(args, spec) {
		var fetchedSpec = [];
		for (var arg in spec) {
			if (spec.hasOwnProperty(arg)) {
				var data = spec[arg];

				data.name = arg;
				if (undefined !== data.default) {
					data.optional = true;
					data.defaultValue = data.default;
				}
				if (data.type) {
					if (data.check) throw new Error('Check already defined');
					data.check = argspec.hasType(data.type);
				}
				else if (!data.check) data.check = function() { return true; };

				fetchedSpec.push(data);
			}
		}

		return originalHandler(args, fetchedSpec);
	};

	return argspec;
});