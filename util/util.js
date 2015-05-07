var dali = dali || {};
dali.utils = dali.utils || {};

/**
 * Adds a {@code getInstance} static method that always returns the same
 * instance object.
 * @param {!Function} ctor The constructor for the class to add the static
 *     method to.
 */
dali.addSingletonGetter = function(ctor) {
    ctor.getInstance = function() {
        if (ctor.instance_) {
            return ctor.instance_;
        }
        return ctor.instance_ = new ctor;
    };
};

dali.utils.namespace = function(namespace) {
    var parts = namespace.split(".");

    var scope = window;

    for (var i = 0, len = parts.length; i < len; i++) {
        scope[parts[i]] = scope[parts[i]] || {};
        scope = scope[parts[i]];
    }
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * Usage:
 * <pre>
 * function ParentClass(a, b) { }
 * ParentClass.prototype.foo = function(a) { }
 *
 * function ChildClass(a, b, c) {
 *   dali.base(this, a, b);
 * }
 * dali.inherits(ChildClass, ParentClass);
 *
 * var child = new ChildClass('a', 'b', 'see');
 * child.foo(); // This works.
 * </pre>
 *
 * In addition, a superclass' implementation of a method can be invoked as
 * follows:
 *
 * <pre>
 * ChildClass.prototype.foo = function(a) {
 *   ChildClass.superClass_.foo.call(this, a);
 *   // Other code here.
 * };
 * </pre>
 *
 * @param {Function} childCtor Child class.
 * @param {Function} parentCtor Parent class.
 */
dali.inherits = function(childCtor, parentCtor) {
    /** @constructor */
    function tempCtor() {}

    tempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    /** @override */
    childCtor.prototype.constructor = childCtor;

    /**
     * Calls superclass constructor/method.
     *
     * This function is only available if you use dali.inherits to
     * express inheritance relationships between classes.
     *
     * @param {!Object} me Should always be "this".
     * @param {string} methodName The method name to call. Calling
     *     superclass constructor can be done with the special string
     *     'constructor'.
     * @param {...*} var_args The arguments to pass to superclass
     *     method/constructor.
     * @return {*} The return value of the superclass method/constructor.
     */
    childCtor.base = function(me, methodName, var_args) {
        var args = Array.prototype.slice.call(arguments, 2);
        return parentCtor.prototype[methodName].apply(me, args);
    };
};

/**
 * When defining a class Foo with an abstract method bar(), you can do:
 * Foo.prototype.bar = dali.abstractMethod
 *
 * Now if a subclass of Foo fails to override bar(), an error will be thrown
 * when bar() is invoked.
 *
 * Note: This does not take the name of the function to override as an argument
 * because that would make it more difficult to obfuscate our JavaScript code.
 *
 * @type {!Function}
 * @throws {Error} when invoked to indicate the method should be overridden.
 */
dali.abstractMethod = function() {
    throw Error('unimplemented abstract method');
};


dali.utils.namespace("dali.maps");


dali.maps.getCity = function(result) {
    for (var i = 0, len = result["address_components"].length; i < len; i++) {
        var address = result["address_components"][i];

        for (var j = 0, l = address.types.length; j < l; j++) {
            if (address.types[j] === 'city') {
                return address["long_name"];
            }
        }
    }
};

dali.maps.getCountry = function(result) {
    for (var i = 0, len = result["address_components"].length; i < len; i++) {
        var address = result["address_components"][i];

        for (var j = 0, l = address.types.length; j < l; j++) {
            if (address.types[j] === 'country') {
                return address["long_name"];
            }
        }
    }

};

dali.utils.namespace("dali.array");

/**
 * Reference to the original {@code Array.prototype}.
 * @private
 */
dali.array.ARRAY_PROTOTYPE_ = Array.prototype;

/**
 * Removes from an array the element at index i
 * @param {dali.array.ArrayLike} arr Array or array like object from which to
 *     remove value.
 * @param {number} i The index to remove.
 * @return {boolean} True if an element was removed.
 */
dali.array.removeAt = function(arr, i) {

    // use generic form of splice
    // splice returns the removed items and if successful the length of that
    // will be 1
    return dali.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length == 1;
};