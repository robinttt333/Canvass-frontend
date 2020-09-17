import styled from "styled-components";
import React from "react";
import GroupMembersList from "./Group/GroupMembersList";

const RightSidebarWrapper = styled.div`
	grid-column-start: 3;
	background: red;
`;

const RightSidebar = ({ members }) => {
	return (
		<RightSidebarWrapper>
			<GroupMembersList members={members} />
		</RightSidebarWrapper>
	);
};
export default RightSidebar;
