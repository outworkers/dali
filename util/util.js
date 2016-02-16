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

dali.s4 = function() {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
};

dali.uuid = function() {

  return dali.s4() + dali.s4() + '-' + dali.s4() + '-' + dali.s4() + '-' +
      dali.s4() + '-' + dali.s4() + dali.s4() + dali.s4();
};

/**
 * Returns true if the specified value is defined and not null.
 * @param {?} obj Variable to test.
 * @return {boolean} Whether variable is defined and not null.
 */
dali.isDefAndNotNull = function(obj) {
  return typeof obj !== "undefined" && obj !== null;
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


dali.utils.namespace("dali.date");

dali.date.MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


dali.date.DAY_NAMES = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

dali.date.getMonthName = function(date) {
    return dali.date.MONTH_NAMES[date.getMonth()];
};

dali.date.displayDate = function(dateString) {
    var timestamp = parseInt(dateString, 10);
    var dt = new Date(timestamp);

    var month = dali.date.getMonthName(dt);

    return month + " " + dt.getFullYear();
};

dali.date.fromTimestamp = function(dateString) {

  if (angular.isString(dateString)) {
    return new Date(parseInt(dateString, 10));
  } else if (!isNaN(parseFloat(dateString))) {
    return new Date(dateString);
  }

};


dali.date.asTimestamp = function(dateString) {
  if (dateString instanceof Date) {
    return dateString.getTime();
  } else if (isNaN(parseInt(dateString, 10))) {
    return new Date(dateString).getTime();
  } else {
    return new Date(parseInt(dateString, 10)).getTime();
  }
};

dali.date.getDayName = function(index) {
  return dali.date.DAY_NAMES[index];
};

dali.utils.namespace("dali.array");

/**
 * Converts an object to an array of elements formed by the object's values.
 * @param {Object.<*>} object The input object.
 * @return {Array.<*>} The resulting array, populated only by the values.
 */
dali.array.toArray = function(object) {

  var arr = [];

  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      arr.push(object[key]);
    }
  }

  return arr;
};

dali.utils.namespace("dali.tags");

/**
 * Parses a list of objects from the ngTagsInput plugin
 * to a JavaScript array of strings removing all nesting created by the plugin.
 *
 * The ngTagsInput plugin nests the value of the tag input under the "text" property
 * of the object it creates.
 *
 * @param {Object<*>} tagObject
 */
dali.tags.fromInput = function(tagObject) {
  var arr = [];

  for (var prop in tagObject) {
    if (tagObject.hasOwnProperty(prop)) {
      arr.push(tagObject[prop]);
    }
  }

  return arr;
};

/**
 * Parses a JavaScript array of strings to an input acceptable to the ngTagsInput plugin.
 * This all nesting created by the plugin, and the result of this operation can
 * directly be used as the ngModel of a tags directive to display already existing tags.
 *
 * The ngTagsInput plugin nests the value of the tag input under the "text" property
 * of the object it creates.
 *
 * @param {Array<string>} tagList The list of tags, usually retrieved from a database.
 */
dali.tags.fromSource = function(tagList) {
  var arr = [];

  for (var i = 0, len = tagList; i < len; i++) {
    arr.push({
      "text": tagList[i]
    })
  }

  return arr;
};

dali.utils.namespace("dali.string");

dali.string.isString = function(obj) {
  return typeof obj === "string" ||
      Object.prototype.toString.call(obj) == "[object String]";
};


/**
 * Function to check if a string is empty
 * @param {string} obj Checks if a string is empty.
 * @returns {boolean}
 */
dali.string.isEmpty = function(obj) {
  return dali.isDefAndNotNull(obj) &&
      dali.isDefAndNotNull(obj.length)
      && obj.length > 0;
};

/**
 * Checks if a trimmed string is empty, e.g if a string has only spaces.
 * @param {string} obj The string to check.
 * @returns {boolean}
 */
dali.string.isTrimEmpty = function(obj) {
  return dali.isDefAndNotNull(obj) &&
      dali.string.isString(obj) &&
      obj.trim().length > 0;
};