import { ClassValue } from "class-variance-authority/types";
import clsx from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const calculateAge = (
  birthDateInput: string | Date | dayjs.Dayjs,
): number => {
  const birthDate = dayjs(birthDateInput);
  const today = dayjs(); // Represents the current date and time

  // Type guard for isValid() and isAfter() to ensure proper dayjs object
  // Although dayjs() constructor handles invalid inputs, it's good practice
  // to explicitly check validity for robustness.
  if (!birthDate.isValid()) {
    console.warn(
      `Invalid birth date input provided: ${birthDateInput}. Returning 0.`,
    );
    return 0;
  }

  // If the birth date is in the future, return 0
  if (birthDate.isAfter(today)) {
    console.warn(
      `Birth date ${birthDate.format(
        "YYYY-MM-DD",
      )} is in the future. Returning 0.`,
    );
    return 0;
  }

  let age = today.year() - birthDate.year();

  // Adjust the age if the birth month/day hasn't occurred yet in the current year
  if (
    today.month() < birthDate.month() ||
    (today.month() === birthDate.month() && today.date() < birthDate.date())
  ) {
    age--;
  }

  return age;
};

export const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, "") // remove punctuation
    .trim();
};

export const scrollIntoView = (id: string): void => {
  const element = document.getElementById(id);
  console.log(element);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
