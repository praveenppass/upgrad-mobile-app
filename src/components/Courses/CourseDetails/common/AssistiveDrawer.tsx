import React from "react";

interface PressActiveState {
	(drawerName: string): void;
}

interface AssistiveDrawerWrapperProps {
	pressactiveState: PressActiveState;
	activeTab?: string;
}

const AssistiveDrawer = (props: AssistiveDrawerWrapperProps) => {
	return <></>;
};

export default AssistiveDrawer;
