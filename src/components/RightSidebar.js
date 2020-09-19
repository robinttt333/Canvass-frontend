import styled from "styled-components";
import React from "react";
import GroupMembersList from "./Group/GroupMembersList";

const RightSidebarWrapper = styled.div`
	position: fixed;
	height: 100%;
	width: 25.5%;
	right: 0;
`;

const RightSidebar = ({ groupId }) => {
	return (
		<RightSidebarWrapper>
			<GroupMembersList groupId={groupId} />
		</RightSidebarWrapper>
	);
};
export default RightSidebar;
