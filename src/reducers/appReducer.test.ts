// import { appReducer,} from "./appReducer";

import { AppInitialStateType, appActions, appReducer } from "./appReducer";

let startState: AppInitialStateType;

beforeEach(() => {
   startState = {
      isInitialized: false,
      status: "idle",
      error: null,
   };
});

test("correct error message should be set", () => {
   let endState = appReducer(startState, appActions.setAppError({ error: "error" }));

   expect(endState.error).toBe("error");
});
test("correct status should be set", () => {
   let endState = appReducer(startState, appActions.setAppStatus({ status: "succeeded" }));

   expect(endState.status).toBe("succeeded");
});
