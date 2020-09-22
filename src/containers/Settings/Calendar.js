import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import styled from "styled-components";

const CalendarWrapper = styled.div`
	margin-top: 3px;
	margin-left: 8px;
	margin-bottom: 10px;
`;
const Calendar = ({ selected, onChange }) => {
	return (
		<CalendarWrapper>
			<label
				as="h5"
				style={{ fontWeight: "700", display: "block", marginBottom: "2px" }}
			>
				Date of Birth
			</label>
			<DatePicker
				dateFormat="dd/MM/yyyy"
				style={{ marginTop: "30px" }}
				selected={selected}
				onChange={onChange}
			/>
		</CalendarWrapper>
	);
};
export default Calendar;
