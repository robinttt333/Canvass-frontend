import styled from "styled-components";
import React from "react";
import GroupMembersList from "./Group/GroupMembersList";

const RightSidebarWrapper = styled.div`
	position: fixed;
	height: 100%;
	width: 25%;
	right: 0;
	margin-right: 10px;
	background: #e6f1f5;
	overflow-y: auto;
`;

const RightSidebar = ({ groupId }) => {
	return (
		<RightSidebarWrapper>
			<GroupMembersList groupId={groupId} />
		</RightSidebarWrapper>
	);
};
export default RightSidebar;
