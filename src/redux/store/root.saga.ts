import { all } from "redux-saga/effects";

import { appSaga } from "@redux/saga/app.saga";
import { authSaga } from "@redux/saga/auth.saga";
import { personalDetailsSaga } from "@redux/saga/personalDetails.saga";
import { sessionSaga } from "@redux/saga/session.saga";
import { userSaga } from "@redux/saga/user.saga";

function* rootSaga() {
	yield all([
		authSaga(),
		userSaga(),
		appSaga(),
		personalDetailsSaga(),
		sessionSaga(),
	]);
}

export { rootSaga };
