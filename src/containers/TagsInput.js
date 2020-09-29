import React from "react";
import { Dropdown } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TAGS } from "../graphql/Tag";

const TagsInput = ({ currentValues, setCurrentValues }) => {
	const [options, setOptions] = React.useState([]);
	const { loading } = useQuery(GET_ALL_TAGS, {
		onCompleted: ({ getAllTags: tags }) => {
			setOptions(tags.map(({ value }) => ({ key: value, text: value, value })));
		},
	});
	if (loading) return null;
	const handleAddition = (_, { value }) => {
		setOptions((prevOptions) => [{ text: value, value }, ...prevOptions]);
	};
	return (
		<Dropdown
			options={options}
			placeholder="Add 5 tags"
			search
			selection
			fluid
			multiple
			allowAdditions
			value={currentValues}
			onChange={(_, { value }) => setCurrentValues(value)}
			onAddItem={handleAddition}
		/>
	);
};

export default TagsInput;
