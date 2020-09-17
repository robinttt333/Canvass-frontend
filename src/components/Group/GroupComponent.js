import styled from "styled-components";
import React from "react";
import GroupDescription from "./GroupDescription";
import NewPost from "../Post/NewPost";
import PostList from "../Post/PostList";

const GroupWrapper = styled.div`
	grid-column-start: 2;
	height: 100%;
	background: white;
`;

const Group = ({
	image,
	admin,
	visible,
	createdAt,
	description,
	members,
	name,
}) => {
	return (
		<GroupWrapper>
			<GroupDescription
				image={image}
				name={name}
				admin={admin}
				createdAt={createdAt}
				members={members}
				description={description}
				visible={visible}
			/>
			<NewPost />
			<PostList />
		</GroupWrapper>
	);
};

export default Group;
