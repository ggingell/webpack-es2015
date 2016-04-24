// src/js/hello.js
'use strict'

export var hello = {
    someProperty: "Grant Gingell",
    someMethod(name=this.someProperty) {
        console.log(`Hello ${name}`)
    }
}