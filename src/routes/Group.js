import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import GroupPageWrapper from "../components/Group/GroupPageWrapper";
import GroupComponent from "../components/Group/GroupComponent";
import { GET_GROUP_QUERY } from "../graphql/Group";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Loader, Dimmer } from "semantic-ui-react";

const Group = () => {
	const { groupId } = useParams();
	const { loading, data } = useQuery(GET_GROUP_QUERY, {
		variables: { groupId: parseInt(groupId) },
		fetchPolicy: "network-only",
	});
	if (loading)
		return (
			<Dimmer inverted active>
				<Loader>Loading</Loader>
			</Dimmer>
		);

	const {
		getGroup: { image, admin, createdAt, description, members, name },
	} = data;
	const visible = data.getGroup.public;
	return (
		<GroupPageWrapper>
			<LeftSidebar groupId={parseInt(groupId)} name={name} />
			<GroupComponent
				admin={admin}
				createdAt={createdAt}
				description={description}
				members={members}
				name={name}
				image={image}
				visible={visible}
			/>
			<RightSidebar groupId={parseInt(groupId)} />
		</GroupPageWrapper>
	);
};
export default Group;
