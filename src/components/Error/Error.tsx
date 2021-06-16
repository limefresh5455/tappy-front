import "./Error.scss";
import React from "react";
import { Alert } from 'react-bootstrap';

interface Error {
  active: boolean;
  message: string;
}

interface Props {
  error: Error;
}

export const Error: React.FC<Props> = (props) => {
  return (<>
    {
      props.error.active && (
        <Alert variant={"danger"}>{props.error.message}</Alert>
      )
    }
  </>)
}