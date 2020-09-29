import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import GroupPageWrapper from "../components/Group/GroupPageWrapper";
import GroupComponent from "../components/Group/GroupComponent";
import { GET_GROUP_QUERY } from "../graphql/Group";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Loader, Dimmer } from "semantic-ui-react";
import Err from "../components/Err";

const Group = () => {
	const { groupId } = useParams();
	const { loading, data, refetch } = useQuery(GET_GROUP_QUERY, {
		variables: { groupId: parseInt(groupId) },
		fetchPolicy: "network-only",
	});
	if (loading)
		return (
			<Dimmer inverted active>
				<Loader>Loading</Loader>
			</Dimmer>
		);

	if (!data) return <Err />;
	const {
		getGroup: {
			me,
			id,
			image,
			admin,
			createdAt,
			description,
			members,
			name,
			tags,
		},
	} = data;
	const visible = data.getGroup.public;
	return (
		<GroupPageWrapper>
			<LeftSidebar groupId={parseInt(groupId)} name={name} />
			<GroupComponent
				id={id}
				admin={admin}
				me={me}
				createdAt={createdAt}
				description={description}
				members={members}
				name={name}
				image={image}
				visible={visible}
				refetch={refetch}
			/>
			<RightSidebar tags={tags} groupId={parseInt(groupId)} />
		</GroupPageWrapper>
	);
};
export default Group;
