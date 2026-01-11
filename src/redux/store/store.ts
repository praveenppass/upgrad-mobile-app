import { configureStore, Middleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { getReduxFlipperMiddleware } from "@utils/flipper.util";

import { rootReducer } from "@redux/store/root.reducer";
import { rootSaga } from "@redux/store/root.saga";

const sagaMiddleware = createSagaMiddleware();
const reduxFlipperMiddleware = getReduxFlipperMiddleware();

const appMiddlewares: Middleware[] = [
	sagaMiddleware,
	...(reduxFlipperMiddleware ? [reduxFlipperMiddleware] : []),
];

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => [
		...appMiddlewares,
		...getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),
	],
});

export { store };

sagaMiddleware.run(rootSaga);
