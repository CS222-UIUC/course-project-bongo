import React from "react";
import ReactDOM from "react-dom";
import Clock from "./Clock";

describe("Clock component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("should render without crashing", () => {
    ReactDOM.render(<Clock />, container);
  });

  it("should display the current time", () => {
    const now = new Date("2023-04-09T12:34:56Z");
    jest.spyOn(global, "Date").mockImplementation(() => now);

    ReactDOM.render(<Clock />, container);

    const h2 = container.querySelector("h2");
    expect(h2.textContent).toBe(`It is ${now.toLocaleTimeString()}.`);

    global.Date.mockRestore();
  });

  it("should update the time every second", () => {
    jest.useFakeTimers();

    const now = new Date("2023-04-09T12:34:56Z");
    jest.spyOn(global, "Date").mockImplementation(() => now);

    ReactDOM.render(<Clock />, container);

    const h2 = container.querySelector("h2");
    expect(h2.textContent).toBe(`It is ${now.toLocaleTimeString()}.`);

    const later = new Date("2023-04-09T12:34:57Z");
    jest.spyOn(global, "Date").mockImplementation(() => later);

    jest.advanceTimersByTime(1000);

    expect(h2.textContent).toBe(`It is ${later.toLocaleTimeString()}.`);

    global.Date.mockRestore();
    jest.useRealTimers();
  });
});
