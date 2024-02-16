import { InitialStateType, appReducer, setAppError, setAppStatus } from "./appReducer";

let startState: InitialStateType

beforeEach(() => {
   startState = {
      status: "idle",
      error: null
   }
})

test("correct error message should be set", () => {
   let endState = appReducer(startState, setAppError("error"))

   expect(endState.error).toBe("error")
   
})
test("correct status should be set", () => {
   let endState = appReducer(startState, setAppStatus("succeeded"))

   expect(endState.status).toBe("succeeded")

})