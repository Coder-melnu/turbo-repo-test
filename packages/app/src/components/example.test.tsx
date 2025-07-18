"use client";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";

import { Button } from "@/components/ui/button";

export const LogButton = () => {
  return (
    <Button onClick={() => console.log("Button clicked!")}>Click Me</Button>
  );
};

//   it("renders with correct text", () => {
//     render(<Button>Click me</Button>);
//     expect(screen.getByText("Click me")).toHaveBeenCalledWith();
//   });
// });

describe("LogButton", () => {
  it("calls console.log when shadcn Button is clicked", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<LogButton />);

    const button = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(button);

    expect(logSpy).toHaveBeenCalledWith("Button clicked!");

    logSpy.mockRestore(); // optional: restore console.log
  });
});
