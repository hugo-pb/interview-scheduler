import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

describe("appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
