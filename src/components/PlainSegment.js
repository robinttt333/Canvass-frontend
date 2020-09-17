import { Segment } from "semantic-ui-react";
import React from "react";
// semantic segment without any rounded corners and border
const PlainSegment = ({ style, ...props }) => {
	return (
		<Segment
			{...props}
			style={{ border: "none", borderRadius: "0px", ...style }}
		/>
	);
};
export default PlainSegment;
