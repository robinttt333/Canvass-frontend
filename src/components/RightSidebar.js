import styled from "styled-components";
import React from "react";
import GroupMembersList from "./Group/GroupMembersList";

const RightSidebarWrapper = styled.div`
	height: 100%;
	width: 100%;
`;

const RightSidebar = ({ groupId }) => {
	return (
		<RightSidebarWrapper>
			<GroupMembersList groupId={groupId} />
		</RightSidebarWrapper>
	);
};
export default RightSidebar;
