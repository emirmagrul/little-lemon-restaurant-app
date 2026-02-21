import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "../components/BookingForm";
import { initializeTimes, updateTimes } from "../components/Main";
import { vi } from "vitest";

const renderForm = (props = {}) => {
  const defaults = {
    availableTimes: ["17:00", "18:00", "19:00"],
    dispatch: vi.fn(),
    submitForm: vi.fn(),
  };
  return render(<BookingForm {...defaults} {...props} />);
};

describe("HTML5 validation attributes", () => {
  test('Date input has type="date", required, and a min attribute', () => {
    renderForm();
    const dateInput = screen.getByLabelText("Choose date");
    expect(dateInput).toHaveAttribute("type", "date");
    expect(dateInput).toHaveAttribute("required");
    expect(dateInput).toHaveAttribute("min");
  });

  test("Time select has required attribute", () => {
    renderForm();
    const timeSelect = screen.getByLabelText("Choose time");
    expect(timeSelect).toHaveAttribute("required");
  });

  test('Guests input has type="number", min="1", max="10", and required', () => {
    renderForm();
    const guestsInput = screen.getByLabelText("Number of guests");
    expect(guestsInput).toHaveAttribute("type", "number");
    expect(guestsInput).toHaveAttribute("min", "1");
    expect(guestsInput).toHaveAttribute("max", "10");
    expect(guestsInput).toHaveAttribute("required");
  });

  test("Occasion select has required attribute", () => {
    renderForm();
    const occasionSelect = screen.getByLabelText("Occasion");
    expect(occasionSelect).toHaveAttribute("required");
  });
});

describe("Validation – invalid (empty) states", () => {
  test("Submit button is disabled when form is empty", () => {
    renderForm();
    const submitButton = screen.getByText("Make Your Reservation");
    expect(submitButton).toBeDisabled();
  });

  test("Error messages are shown when fields are empty", () => {
    renderForm();
    expect(screen.getByText("Please choose a date.")).toBeInTheDocument();
    expect(screen.getByText("Please select a time.")).toBeInTheDocument();
    expect(screen.getByText("Please select an occasion.")).toBeInTheDocument();
  });

  test("submitForm is NOT called when form is submitted with empty fields", () => {
    const submitForm = vi.fn();
    renderForm({ submitForm });
    const form = screen.getByText("Make Your Reservation").closest("form");
    fireEvent.submit(form);
    expect(submitForm).not.toHaveBeenCalled();
  });

  test("Guests error message appears when value is out of range", () => {
    renderForm();
    const guestsInput = screen.getByLabelText("Number of guests");
    fireEvent.change(guestsInput, { target: { value: "0" } });
    expect(
      screen.getByText("Guests must be between 1 and 10.")
    ).toBeInTheDocument();
    expect(screen.getByText("Make Your Reservation")).toBeDisabled();
  });
});

describe("Validation – valid states", () => {
  const fillForm = () => {
    const dispatch = vi.fn();
    const submitForm = vi.fn();
    renderForm({ dispatch, submitForm });

    fireEvent.change(screen.getByLabelText("Choose date"), {
      target: { value: "2026-03-15" },
    });
    fireEvent.change(screen.getByLabelText("Choose time"), {
      target: { value: "17:00" },
    });
    fireEvent.change(screen.getByLabelText("Number of guests"), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByLabelText("Occasion"), {
      target: { value: "Birthday" },
    });

    return { dispatch, submitForm };
  };

  test("Submit button is enabled when all fields are valid", () => {
    fillForm();
    expect(screen.getByText("Make Your Reservation")).toBeEnabled();
  });

  test("Error messages are NOT shown when all fields are valid", () => {
    fillForm();
    expect(screen.queryByText("Please choose a date.")).not.toBeInTheDocument();
    expect(screen.queryByText("Please select a time.")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Guests must be between 1 and 10.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Please select an occasion.")
    ).not.toBeInTheDocument();
  });

  test("submitForm IS called when valid form is submitted", () => {
    const { submitForm } = fillForm();
    const form = screen.getByText("Make Your Reservation").closest("form");
    fireEvent.submit(form);
    expect(submitForm).toHaveBeenCalledTimes(1);
    expect(submitForm).toHaveBeenCalledWith({
      date: "2026-03-15",
      time: "17:00",
      guests: 4,
      occasion: "Birthday",
    });
  });

  test("Date change dispatches UPDATE_TIMES action", () => {
    const dispatch = vi.fn();
    renderForm({ dispatch });
    fireEvent.change(screen.getByLabelText("Choose date"), {
      target: { value: "2026-04-01" },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "UPDATE_TIMES",
      date: "2026-04-01",
    });
  });
});

describe("API helper functions", () => {
  test("initializeTimes returns a non-empty array", () => {
    const result = initializeTimes();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  test("updateTimes returns a non-empty array for a given date", () => {
    const initialState = ["17:00", "18:00"];
    const action = { type: "UPDATE_TIMES", date: "2026-03-15" };
    const result = updateTimes(initialState, action);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  test("updateTimes returns current state for unknown action type", () => {
    const initialState = ["17:00", "18:00"];
    const action = { type: "UNKNOWN" };
    const result = updateTimes(initialState, action);
    expect(result).toEqual(initialState);
  });
});