import React from "react";
import "components/InterviewerListItem.scss";
const InterviewerListItem = (props) => {
  console.log(props);
  return (
    <>
      {props.selected ? (
        <li
          className="interviewers__item  interviewers__item--selected"
          onClick={() => props.setInterviewer(props.id)}
        >
          <img
            className="interviewers__item-image"
            src={props.avatar}
            alt={props.name}
          />
          {props.name}
        </li>
      ) : (
        <li
          className="interviewers__item"
          onClick={() => props.setInterviewer(props.id)}
        >
          <img
            className="interviewers__item-image"
            src={props.avatar}
            alt={props.name}
          />
        </li>
      )}
    </>
  );
};

export default InterviewerListItem;
