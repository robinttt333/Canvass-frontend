import styled from "styled-components";
import React from "react";

const LeftSidebarWrapper = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	background: #e6f1f5;
`;
const LeftSidebar = () => <LeftSidebarWrapper></LeftSidebarWrapper>;
export default LeftSidebar;
