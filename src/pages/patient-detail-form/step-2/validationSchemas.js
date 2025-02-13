import * as Yup from 'yup';

export const ValidationSchema = {
  do_you_currently_smoke_or_consume_tobacco_products:
    Yup.string().required("Required"),
  type_of_tobacco: Yup.array().required("Required"),
  how_long_have_you_been_consuming_any_form_of_tobacco:
    Yup.string().required("Required"),
  how_much_do_you_consume_cigarettes_bidi_cigars_e_cigarettes_pipes_hukkah_consumption:
    Yup.string().required("Required"),
  how_much_do_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco:
    Yup.string().required("Required"),
  past_how_much_do_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco:
    Yup.string().required("Required"),
  past_type_of_tobacco: Yup.array().required("Required"),
  for_how_long_have_you_quit_any_form_of_tobacco:
    Yup.string().required("Required"),
  for_how_long_did_you_consume_any_form_of_tobacco_throughout_your_lifetime:
    Yup.string().required("Required"),
  past_how_much_do_you_consume_cigarettes_bidi_cigars_e_cigarettes_pipes_hukkah_consumption:
    Yup.string().required("Required"),
  how_much_did_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco:
    Yup.string().required("Required"),
  do_you_drink_alcoholic_beverages: Yup.string().required("Required"),
  type_of_alcohol: Yup.array().required("Required"),
  for_how_long_did_you_consume_any_form_of_alcohol_throughout_your:
    Yup.string().required("Required"),
  have_you_engaged_in_regular_physical_exercise_over_last_6_months:
    Yup.string().required("Required"),
  type_of_physical_activity: Yup.array().required("Required"),
  what_is_your_intensity_of_the_physical_activities_that_you_are_engaged_in:
    Yup.string().required("Required"),
  how_often_do_you_engage_in_physical_exercise_each_week:
    Yup.string().required("Required"),
  how_often_do_you_consume_processed_or_red_meats_in_a_typical_week:
    Yup.string().required("Required"),
  how_often_do_you_include_high_fat_or_fried_foods_in_your_diet:
    Yup.string().required("Required"),
  how_frequently_do_you_consume_sugary_foods_or_beverages_in_your_diet:
    Yup.string().required("Required"),
};


export const combinedValidationSchema = Yup.object({
  ...ValidationSchema,
});
