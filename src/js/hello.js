// src/js/hello.js
'use strict'

export var hello = {
    someProperty: "Hello Module",
    benignProperty: "",
    someMethod(name="Default Value") {

        console.log(`Hello there ${name}`)
    }
}
