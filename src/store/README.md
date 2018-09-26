# Redux store

The directory structure here mirrors the state shape.
Each folder has three files:
* `actions.ts`
* `types.ts`
* `reducer.ts` (the reducer that gets passed to `combineReducers` in `index.ts`).

## Conventions
* Separate UI state and data. Data is generally stored in the top-level `entities` key.
* Async actions use the following terminology:
  * `X_REQUEST` is the action that sends off an async request for `X`
  * `X_SUCCESS` and `X_FAILURE` are the actions that gets dispatched once the result is received.
  * `fetchX` is the function that handles the entire async request -- it dispatches the `REQUEST` and the
  `SUCCESS`/`FAILURE` actions. This is the function you might call e.g. when a "Load more" button is clicked.
* Store data in a hash/dictionary indexed by their keys, and if needed, an array of ids. E.g.
  ```
    entities: {
      users: {...},
      groups: {
        1: {
          name: "My group",
          memberCount: 3,
          members: [23, 45, 78]
        },
        2: {
          name: "Another group",
          memberCount: 2,
          members: [23, 55]
        }
      }
    },
    // UI state
  }
  ```

## Further reading
* [Redux docs](https://redux.js.org)
* [Async actions in Redux](https://redux.js.org/advanced/asyncactions)