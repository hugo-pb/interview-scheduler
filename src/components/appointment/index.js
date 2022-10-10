import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMDELETE = "CONFIRMDELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const confirm = (type) => {
    transition(type);
  };

  const onDelete = () => {
    transition(DELETING);
    props.cancelInterview(props.id);
    setTimeout(() => {
      transition(EMPTY);
    }, 1000);
  };
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => confirm(CONFIRMDELETE)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}

      {mode === SAVING && <Status message="booking interwiew" />}
      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRMDELETE && (
        <Confirm
          message="Are you sure you want to cancel interview?"
          onConfirm={onDelete}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="oops... it looks like something went wrong please try again"
          onClose={back}
        />
      )}
    </article>
  );
}
