// src/js/hello.js
'use strict'

var hello = {
    someProperty: "Grant Gingell",
    someMethod(name=this.someProperty) {
        console.log(`Hello ${name}`)
    }
}

export default hello