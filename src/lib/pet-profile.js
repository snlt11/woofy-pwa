function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getBirthdayISO(pet) {
  if (pet?.birthdayISO) return pet.birthdayISO;

  if (pet?.birthday) {
    const parsed = new Date(pet.birthday);
    if (!Number.isNaN(parsed.getTime())) return toISODate(parsed);
  }

  return "";
}

export function formatBirthday(birthdayISO) {
  if (!birthdayISO) return "Not added";

  const date = new Date(`${birthdayISO}T00:00:00`);

  if (Number.isNaN(date.getTime())) return "Not added";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function deriveAge(birthdayISO, now = new Date()) {
  if (!birthdayISO) {
    return {
      ageLabel: "Not set",
      ageDescription: "Birthday not added",
    };
  }

  const birthday = new Date(`${birthdayISO}T00:00:00`);

  if (Number.isNaN(birthday.getTime()) || birthday > now) {
    return {
      ageLabel: "Not set",
      ageDescription: "Birthday not added",
    };
  }

  let years = now.getFullYear() - birthday.getFullYear();
  let months = now.getMonth() - birthday.getMonth();

  if (now.getDate() < birthday.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 0) {
    return {
      ageLabel: `${years} ${years === 1 ? "Year" : "Years"}`,
      ageDescription: `${years} ${years === 1 ? "year" : "years"} old`,
    };
  }

  const safeMonths = Math.max(0, months);

  return {
    ageLabel: `${safeMonths} ${safeMonths === 1 ? "Month" : "Months"}`,
    ageDescription: `${safeMonths} ${safeMonths === 1 ? "month" : "months"} old`,
  };
}

export function petToFormValues(pet = {}) {
  return {
    name: pet.name ?? "",
    breed: pet.breed ?? "",
    birthdayISO: getBirthdayISO(pet),
    gender: pet.gender ?? "",
    weightKg: pet.weightKg ?? "",
    favoriteFood: pet.favoriteFood ?? "",
    activityLevel: pet.activityLevel ?? "",
    primaryVet: pet.primaryVet ?? "",
    diet: pet.diet ?? "",
    microchipId: pet.microchipId ?? "",
    insurance: pet.insurance ?? "",
  };
}

export function formValuesToPetPatch(values) {
  const birthdayISO = values.birthdayISO || "";
  const age = deriveAge(birthdayISO);
  const weight = Number.parseFloat(values.weightKg);

  return {
    name: values.name.trim(),
    breed: values.breed.trim(),
    birthdayISO,
    birthday: formatBirthday(birthdayISO),
    ...age,
    gender: values.gender,
    weightKg: Number.isFinite(weight) ? weight : 0,
    favoriteFood: values.favoriteFood.trim(),
    activityLevel: values.activityLevel,
    activityLabel:
      values.activityLevel === "High energy"
        ? "High"
        : values.activityLevel === "Low energy"
          ? "Low"
          : "Moderate",
    primaryVet: values.primaryVet.trim(),
    diet: values.diet.trim(),
    microchipId: values.microchipId.trim(),
    microchipStatus: values.microchipId.trim() ? "Registered" : "Not added",
    insurance: values.insurance,
  };
}
