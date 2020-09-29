import styled from "styled-components";
import React from "react";
import GroupMembersList from "./Group/GroupMembersList";
import GroupTags from "./Group/GroupTags";

const RightSidebarWrapper = styled.div`
	position: fixed;
	height: 100%;
	width: 25%;
	right: 0;
	margin-right: 10px;
	background: #e6f1f5;
`;

const RightSidebar = ({ tags, groupId }) => {
	return (
		<RightSidebarWrapper>
			<GroupMembersList groupId={groupId} />
			<GroupTags tags={tags} />
		</RightSidebarWrapper>
	);
};
export default RightSidebar;
