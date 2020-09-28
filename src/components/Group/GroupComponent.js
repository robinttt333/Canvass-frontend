import styled from "styled-components";
import React from "react";
import GroupDescription from "./GroupDescription";
import NewPost from "../../containers/Post/NewPost";
import PostList from "../../containers/Post/PostList";
import PrivateGroupWarning from "./PrivateGroupWarning";
import PublicGroupWarning from "./PublicGroupWarning";
const GroupWrapper = styled.div`
	grid-column-start: 2;
	height: 100%;
	background: #e6f1f5;
`;

const Group = ({
	id,
	me,
	image,
	admin,
	visible,
	createdAt,
	description,
	members,
	name,
	refetch,
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
			{me ? <NewPost /> : null}
			{me ? <PostList /> : null}
			{!me && !visible ? (
				<PrivateGroupWarning admin={admin} groupId={id} />
			) : null}
			{!me && visible ? (
				<PublicGroupWarning admin={admin} groupId={id} refetch={refetch} />
			) : null}
		</GroupWrapper>
	);
};

export default Group;
