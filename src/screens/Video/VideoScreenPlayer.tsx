import React from "react";

import LandscapePlayer from "@components/Reusable/Video/landscapeVideo";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

const BodyComponent = React.memo(() => {
	return <LandscapePlayer />;
});

const PlayVideoLandscape = () => {
	return (
		<WithHeaderLxp BodyComponent={BodyComponent} showBack dark showHome />
	);
};
export default PlayVideoLandscape;
