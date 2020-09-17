import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import GroupWrapper from "../components/GroupWrapper";
import GroupComponent from "../components/GroupComponent";
import GET_GROUP_QUERY from "../graphql/Group";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const Group = () => {
	const { groupId } = useParams();
	const { loading, data } = useQuery(GET_GROUP_QUERY, {
		variables: { groupId: parseInt(groupId) },
	});
	if (loading) return null;
	const {
		getGroup: { image, admin, createdAt, description, members, name },
	} = data;
	const visible = data.getGroup.public;
	return (
		<GroupWrapper>
			<LeftSidebar />
			<GroupComponent
				admin={admin}
				createdAt={createdAt}
				description={description}
				members={members.length}
				name={name}
				image={image}
				visible={visible}
			/>
			<RightSidebar members={members} />
		</GroupWrapper>
	);
};
export default Group;
