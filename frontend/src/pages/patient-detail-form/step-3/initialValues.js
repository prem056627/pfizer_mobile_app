
export const getEnvironmentalAndOccupationalFormInitialValues = (initialData) => {

  return {
    are_you_frequently_exposed_to_secondhand_smoke:
      initialData?.are_you_frequently_exposed_to_secondhand_smoke || "",
    are_you_currently_or_in_the_past_exposed_to_environmental_toxins:
      initialData?.are_you_currently_or_in_the_past_exposed_to_environmental_toxins ||
      "",
    are_you_currently_or_in_the_past_have_been_exposed_to_occupational_toxins:
      initialData?.are_you_currently_or_in_the_past_have_been_exposed_to_occupational_toxins.toLowerCase() ||
      ""
  };
};
