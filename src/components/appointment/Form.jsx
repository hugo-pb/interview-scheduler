import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React from "react";

const Form = (props) => {
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={props.student}
            onChange={(e) => e.target.value}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={props.interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={props.onConfirm}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
