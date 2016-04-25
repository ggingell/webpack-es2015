import { hello } from './hello.js'

import expect, { createSpy, spyOn, isSpy } from 'expect'

describe('hello module', function () {
    it('should have someProperty', function () {
        expect(hello.someProperty).toEqual('Hello Module')
    })

    it('should have someMethod', function () {
        expect(hello.someMethod).toBeA(Function)
    })

    it('should call console.log', function () {

        var spy = spyOn(console, 'log')

        hello.someMethod('Test Dummy')

        expect(spy.calls.length === 1)
        expect(spy.calls[0].arguments)
            .toEqual(['Hello there Test Dummy'])

        spy.restore()
    })

    it('should use safe Default Value', function () {

        var spy = spyOn(console, 'log')

        hello.someMethod()

        expect(spy.calls.length === 1)
        expect(spy.calls[0].arguments)
            .toEqual(['Hello there Default Value'])

        spy.restore()
    })
})