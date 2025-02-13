
export const getCurrentTobaccoConsumptionInitialValues = (initialData) => {
  return {
    do_you_currently_smoke_or_consume_tobacco_products:
      initialData?.do_you_currently_smoke_or_consume_tobacco_products || "",
    type_of_tobacco: initialData?.type_of_tobacco || "",
    how_long_have_you_been_consuming_any_form_of_tobacco:
      initialData?.how_long_have_you_been_consuming_any_form_of_tobacco ||
      "",

    how_much_do_you_consume_cigarettes_bidi_cigars_e_cigarettes_pipes_hukkah_consumption:
      initialData?.how_much_do_you_consume_cigarettes_bidi_cigars_e_cigarettes_pipes_hukkah_consumption ||
      "",
    how_much_do_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco:
      initialData?.how_much_do_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco.toLowerCase() ||
      "",
  };
};

export const getPastTobaccoConsumptionFormInitialValues = (initialData) => {
  return {
    past_how_much_do_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco:
      initialData?.past_how_much_do_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco ||
      "",
    past_type_of_tobacco: initialData?.past_type_of_tobacco || "",
    for_how_long_have_you_quit_any_form_of_tobacco:
      initialData?.for_how_long_have_you_quit_any_form_of_tobacco.toLowerCase() ||
      "",

    for_how_long_did_you_consume_any_form_of_tobacco_throughout_your_lifetime:
      initialData?.for_how_long_did_you_consume_any_form_of_tobacco_throughout_your_lifetime.toLowerCase() ||
      "",
    past_how_much_do_you_consume_cigarettes_bidi_cigars_e_cigarettes_pipes_hukkah_consumption:
      initialData?.past_how_much_do_you_consume_cigarettes_bidi_cigars_e_cigarettes_pipes_hukkah_consumption.toLowerCase() ||
      "",
    how_much_did_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco:
      initialData?.how_much_did_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco.toLowerCase() ||
      "",
  };
};

export const getCurrentAlcoholConsumptionFormInitialValues = (initialData) => {
  return {
    do_you_drink_alcoholic_beverages:
      initialData?.do_you_drink_alcoholic_beverages.toLowerCase() || "",
    type_of_alcohol: initialData?.type_of_alcohol || "",
    for_how_long_did_you_consume_any_form_of_alcohol_throughout_your:
      initialData?.for_how_long_did_you_consume_any_form_of_alcohol_throughout_your.toLowerCase() ||
      "",
  };
};

export const getRegularPhysicalActivityFormInitialValues = (initialData) => {
  return {
    have_you_engaged_in_regular_physical_exercise_over_last_6_months:
      initialData?.have_you_engaged_in_regular_physical_exercise_over_last_6_months.toLowerCase() ||
      "",
    type_of_physical_activity:
      initialData?.type_of_physical_activity || "",
    what_is_your_intensity_of_the_physical_activities_that_you_are_engaged_in:
      initialData?.what_is_your_intensity_of_the_physical_activities_that_you_are_engaged_in.toLowerCase() ||
      "",
    how_often_do_you_engage_in_physical_exercise_each_week:
      initialData?.how_often_do_you_engage_in_physical_exercise_each_week.toLowerCase() ||
      "",
  };
};

export const getRegularDietFormInitialValues = (initialData) => {
  return {
    how_often_do_you_consume_processed_or_red_meats_in_a_typical_week:
      initialData?.how_often_do_you_consume_processed_or_red_meats_in_a_typical_week.toLowerCase() ||
      "",
    how_often_do_you_include_high_fat_or_fried_foods_in_your_diet:
      initialData?.how_often_do_you_include_high_fat_or_fried_foods_in_your_diet.toLowerCase() ||
      "",
    how_frequently_do_you_consume_sugary_foods_or_beverages_in_your_diet:
      initialData?.how_frequently_do_you_consume_sugary_foods_or_beverages_in_your_diet.toLowerCase() ||
      ""
  };
};
