import styled from "styled-components";
import React from "react";
import GroupDescription from "./GroupDescription";
import NewPost from "../../containers/Post/NewPost";
import PostList from "../../containers/Post/PostList";

const GroupWrapper = styled.div`
	grid-column-start: 2;
	height: 100%;
	background: #e6f1f5;
`;

const Group = ({
	id,
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
				id={id}
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
