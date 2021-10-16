const rewire = require("rewire")
const app = rewire("./app")
const renderApp = app.__get__("renderApp")
// @ponicode
describe("renderApp", () => {
    test("0", () => {
        let callFunction = () => {
            renderApp()
        }
    
        expect(callFunction).not.toThrow()
    })
})
