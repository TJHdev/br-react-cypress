import { expect, test } from "vitest";
import { roundCurrency } from "./roundCurrency"; // Adjust the import path as needed

test("rounds to two decimal places", () => {
  expect(roundCurrency(10.256)).toBe(10.26);
  expect(roundCurrency(10.254)).toBe(10.25);
});

test("handles whole numbers", () => {
  expect(roundCurrency(10)).toBe(10.0);
});

test("handles numbers with one decimal place", () => {
  expect(roundCurrency(10.5)).toBe(10.5);
});

test("handles negative numbers", () => {
  expect(roundCurrency(-10.256)).toBe(-10.26);
  expect(roundCurrency(-10.254)).toBe(-10.25);
});

test("handles zero", () => {
  expect(roundCurrency(0)).toBe(0.0);
});

test("handles very small numbers", () => {
  expect(roundCurrency(0.001)).toBe(0.0);
  expect(roundCurrency(0.009)).toBe(0.01);
});
