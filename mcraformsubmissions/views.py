
import logging
import os

from django.db.models import Q
from django.template.loader import render_to_string
from django.http import HttpResponse
from django.conf import settings
import pdfkit

from datetime import datetime
from django.http import JsonResponse
from django.utils import timezone
import json
from ..campaignmanagement.models import Campaign, CampaignCustomer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from django.template.loader import get_template
import pdfkit
from django.http import HttpResponse
from django.conf import settings
from django.core.files.base import ContentFile
import os

from .forms import FormSubmissionForm
from .models import FormSubmission
from .tables import FormSubmissionCrudTable

from django.views.decorators.csrf import csrf_exempt

from django.conf import settings

from ..packages.crud.base import BaseCrudView



RISK_SCORING = {
    "current_tobacco_consumption": {
        "max_score": 15,
        "subcategories": {
            "do_you_currently_smoke_or_consume_tobacco_products": {"max_score": 3, "base": {"yes": 3, "no": 0}},
            "how_long_have_you_been_consuming_any_form_of_tobacco": {"max_score": 4, "base": {"less_then_10_years": 1, "more_then_10_years": 4}},
            "how_much_do_you_consume_cigarettes_bidi_cigars_e_cigarettes_pipes_hukkah_consumption": {"max_score": 5, "base": {"less_then_20_cigarates_per_day": 1, "more_then_20_cigarates_per_day": 5}},
            "how_much_do_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco": {"max_score": 3, "base": {"occasional": 1, "regular": 3}}
        }
    },

    "past_tobacco_consumption": {
        "max_score": 15,
        "subcategories": {
            "have_you_smoked_or_consume_tobacco_products_in_the_past": {"max_score": 3, "base": {"yes": 3, "no": 0}},
            "for_how_long_have_you_quit_any_form_of_tobacco": {"max_score": 4, "base": {"less_then_10_years": 4, "greater_then_10_years": 1}},
            "for_how_long_did_you_consume_any_form_of_tobacco_throughout_your_lifetime": {"max_score": 5, "base": {"less_then_10_years": 1, "greater_then_10_years": 5}},
            "how_much_did_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco": {"max_score": 3, "base": {"occasional": 1, "regular": 3}}
        }
    },

    "current_alcohol_consumption": {
        "max_score": 15,
        "subcategories": {
            "do_you_drink_alcoholic_beverages": {"max_score": 5, "base": {"yes": 5, "no": 0}},
            "type_of_alcohol": {"max_score": 5, "base": {"Heavy": 5, "Moderate": 1, "Occasional": 0}},
            "for_how_long_did_you_consume_any_form_of_alcohol_throughout_your": {"max_score": 5, "base": {"less_then_10_years": 1, "greater_then_10_years": 5}}
        }
    },

    "bmi": {
        "max_score": 5,
        "subcategories": {
            "bmi_value": {
                "max_score": 5,
                "ranges": {
                    "<18.5": 2, "18.5_25": 0, "25_30": 2.5, "30_35": 3, "35_40": 4, ">=40": 5
                }
            }
        }
    },

    "physical_activity": {
        "max_score": 5,
        "subcategories": {
            "have_you_engaged_in_regular_physical_exercise_over_last_6_months": {"max_score": 3, "base": {"yes_consistently": 0, "occasionally": 1, "no_rarely": 3}},
            "what_is_your_intensity_of_the_physical_activities_that_you_are_engaged_in": {"max_score": 1, "base": {"moderate_to_vigorous": 0, "varied_including_some_moderate": 0.5, "mostly_sedentary_or_light": 1}},
            "how_often_do_you_engage_in_physical_exercise_each_week": {
                "max_score": 1,
                "base": {
                    "at_least_5_times": 0,
                    "less_than_once_or_twice": 1
                }
                
            }
            # "type_of_physical_activity" : {"max_score": 5, "base": {"cardiovascular_Aerobic": 0, "strength_Training_Resistance": 0, "flexibility_balance": 0, "walking": 0, "jogging": 0, "jwimming": 0, }}
        }   
    },

    "unhealthy_diet": {
        "max_score": 5,
        "subcategories": {
            "how_often_do_you_consume_processed_or_red_meats_in_a_typical_week": {"max_score": 2, "base": {"rarely": 0, "weekly": 1, "daily": 2}},
            "how_often_do_you_include_high_fat_or_fried_foods_in_your_diet": {"max_score": 2, "base": {"rarely": 0, "weekly": 1, "daily": 2}},
            "how_frequently_do_you_consume_sugary_foods_or_beverages_in_your_diet": {"max_score": 1, "base": {"rarely": 0, "weekly": 0.5, "daily": 1}}
        }
    },
    "secondhand_smoke": {
        "max_score": 5,
        "subcategories": {
            "are_you_frequently_exposed_to_secondhand_smoke": {"max_score": 5, "base": {"no": 0, "occasionally": 3, "yes": 5}}
        }
    },
    "environmental_toxins": {
        "max_score": 5,
        "subcategories": {
            "are_you_currently_or_in_the_past_exposed_to_environmental_toxins": {"max_score": 5, "base": {"no_never_exposed_toxins": 0, "yes_less_than_10years": 3, "yes_less_more_10years": 5}}
        }
    },
    "occupational_toxins": {
        "max_score": 5,
        "subcategories": {
            "are_you_currently_or_in_the_past_have_been_exposed_to_occupational_toxins": {"max_score": 5, "base": {"no_never_exposed_toxins": 0, "yes_less_than_10years": 3, "yes_less_more_10years": 5}}
        }
    },

    "cancer_history": {
        "max_score": 15,
        "subcategories": {
            "have_you_ever_been_a_cancer_patient": {"max_score": 4, "base": {"yes": 4, "no": 0}},
            "have_you_had_cancer_multiple_times_in_the_past": {"max_score": 3, "base": {"yes": 3, "no": 0}},
            "have_any_of_your_first_degree_relatives_been_diagnosed_with_cancer_syndromes": {"max_score": 4, "base": {"yes": 4, "no": 0}},
            "are_you_currently_suffering_from_specific_medical_conditions_that_increase_the_risk_of_cancer": {"max_score": 4, "base": {"yes": 4, "no": 0}}
        }
    },

    "genetic_susceptibility": {
        "max_score": 10,
        "subcategories": {
            "have_you_undergone_genetic_susceptibility_testing_for_cancer": {"max_score": 10, "base": {"No_I_have_not_been_tested_for_genetic_susceptibility": 0, "Yes_I_have_been_tested_for_genetic_susceptibility_to_cancer_and_the_results_were_negative": 0, "Yes_I_have_been_tested_for_genetic_susceptibility_to_cancer_and_the_results_were_positive": 10}}
        }
    },

    "age_factor": {
        "max_score": 5,
        "subcategories": {
            "date_of_birth": {
                "max_score": 5,
                "ranges": {"<20": 0, "20_40": 2, "40_60": 3, ">60": 5}
            }
        }
    },

    "cancer_warning_signs": {
    "max_score": 10,
    "subcategories": {
        "do_you_have_any_following_symptoms_or_warning_signs_related_to_cancer_would_prompt_you_to_seek_medical_advice": {
            "max_score": 10,
            "base": {
                "fatigue_or_extreme_tiredness_that_doesnt_get_better_with_rest": 10,
                "weight_loss_or_gain_of_10_pounds_or_more_for_no_known_reason": 10,
                "eating_problems": 10,
                "swelling_or_lumps_anywhere_in_the_body": 10,
                "thickening_or_lump_in_the_breast_or_other_part_of_the_body": 10,
                "skin_changes": 10,
                "cough_or_hoarseness_that_does_not_go_away": 10,
                "unusual_bleeding_or_bruising_for_no_known_reason": 10,
                "change_in_bowel_habits_such_as_constipation_or_diarrhea_that_does_not_go_away_or_a_change_in_how_your_stools_look": 10,
                "bladder_changes_such_as_pain_when_passing_urine_blood_in_the_urine_or_needing_to_pass_urine_more_or_less_often": 10,
                "ongoing_fever_or_night_sweats": 10,
                "persistent_headaches": 10,
                "vision_or_hearing_problems": 10,
                "mouth_changes_such_as_sores_bleeding_pain_or_numbness": 10,
                "any_others": 10,
                "none": 0
            }
        }
    }
}

}

CATEGORY_CONFIG = {
    "tobacco_consumption": {
        "keys": ["current_tobacco_consumption", "past_tobacco_consumption"], 
        "name": "Tobacco Consumption"
    },
    "alcohol_consumption": {
        "keys": ["current_alcohol_consumption"], 
        "name": "Alcohol Consumption"
    },
    "bmi": {
        "keys": ["bmi"], 
        "name": "Body Mass Index (BMI)"
    },
    "physical_inactivity": {
        "keys": ["physical_activity"], 
        "name": "Physical Inactivity"
    },
    "unhealthy_diet": {
        "keys": ["unhealthy_diet"], 
        "name": "Unhealthy Diet"
    },
    "secondhand_smoke_exposure": {
        "keys": ["secondhand_smoke"], 
        "name": "Secondhand Smoke Exposure"
    },
    "environmental_Toxin_exposure": {
        "keys": ["environmental_toxins"], 
        "name": "Environmental Toxin Exposure"
    },
    "occupational_toxin_exposure": {
        "keys": ["occupational_toxins"], 
        "name": "Occupational Toxin Exposure"
    },
	"personal_family_cancer_history": {
        "keys": ["cancer_history"], 
        "name": "Personal & Family Cancer History"
    },
    "known_dna_susceptibility": {
        "keys": ["genetic_susceptibility"], 
        "name": "Known DNA Susceptibility"
    },
    "age_and_cancer": {
        "keys": ["age_factor"], 
        "name": "Age and cancer"
    },
    "recognizing_present_warning_signs_cancer_risk_health_concerns": {
        "keys": ["cancer_warning_signs"], 
        "name": "Recognizing present warning signs, cancer risk & health concerns"
    }
}



logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class FormSubmissionAPIView(APIView):


    def calculate_cancer_warning_signs(self, data):

        controllable_cancer_risk_exposure = data.get('controllable_cancer_risk_exposure', {})
        return_dict = {}

        question = 'do_you_have_any_following_symptoms_or_warning_signs_related_to_cancer_would_prompt_you_to_seek_medical_advice'

        return_dict.update({
            question: {}
        })

    
        for key in controllable_cancer_risk_exposure:
            if controllable_cancer_risk_exposure[key] == True:
                config = RISK_SCORING['cancer_warning_signs']
                return_dict['max_score'] = config['max_score']
                subcategory = config['subcategories'][question]
                value = subcategory['base'][key]

                return_dict[question]['max_score'] = value
                return_dict[question]["answer"] = controllable_cancer_risk_exposure[key]
                return_dict[question]["obtained_score"] = value
                return_dict['total_obtained_score'] = value

                break

        return return_dict


    def calculate_direct_values(self, data, key, request_key):

        return_dict = {}
        config = RISK_SCORING.get(key)
        category_max_score = config['max_score']
        return_dict['max_score'] = category_max_score

        subcategories = config.get('subcategories')

        total_obtained_score = 0

        for question in subcategories.keys():
            response = data.get(request_key, {}).get(question)
            value = subcategories[question]
            sub_cat_max_scrore = value['max_score']
            obtained_score = 0
            for response_map in value.get('base', {}).keys():
                if response == response_map:
                    obtained_score = value['base'][response_map]
                    break

            total_obtained_score += obtained_score
            return_dict.update({
                question: {}
            })
            return_dict[question]['max_score'] = sub_cat_max_scrore
            return_dict[question]["answer"] = response
            return_dict[question]["obtained_score"] = obtained_score
        
        return_dict['total_obtained_score'] = total_obtained_score

        return return_dict
            
    
    def calculate_bmi_score(self, data):

        personal_details = data.get('personal_details')
        try:
            bmi_value = float(personal_details.get("bmi", 0))

            obtained_score = 0
            if bmi_value is not None:
                # for bmi_range, score in RISK_SCORING["bmi"]["subcategories"]["bmi_value"]["ranges"].items():
                if bmi_value < 18.5:
                    obtained_score = RISK_SCORING["bmi"]["subcategories"]["bmi_value"]["ranges"]["<18.5"]
                elif bmi_value >= 18.5 and bmi_value < 25:
                    obtained_score = RISK_SCORING["bmi"]["subcategories"]["bmi_value"]["ranges"]["18.5_25"]
                elif bmi_value >= 25.5 and bmi_value < 30:
                    obtained_score = RISK_SCORING["bmi"]["subcategories"]["bmi_value"]["ranges"]["25_30"]
                elif bmi_value >= 30 and bmi_value < 35:
                    obtained_score = RISK_SCORING["bmi"]["subcategories"]["bmi_value"]["ranges"]["30_35"]
                elif bmi_value >= 35 and bmi_value < 40:
                    obtained_score = RISK_SCORING["bmi"]["subcategories"]["bmi_value"]["ranges"]["35_40"]
                else:
                    obtained_score = RISK_SCORING["bmi"]["subcategories"]["bmi_value"]["ranges"][">=40"]

            # logger.debug(f"BMI Calculated: {bmi_value} | Score: {obtained_score}")

            return {
                "bmi_value": {
                    "answer": bmi_value, "max_score": RISK_SCORING["bmi"]["subcategories"]["bmi_value"]["max_score"], "obtained_score": obtained_score
                }, 
                "max_score": RISK_SCORING["bmi"]["subcategories"]["bmi_value"]["max_score"], "total_obtained_score": obtained_score
            }

        except (ValueError, ZeroDivisionError) as e:
            # logger.error(f"BMI Calculation Error: {e}")
            return {
                "bmi_value": {
                    "answer": None, "max_score": 5, "obtained_score": 0
                }, 
                "max_score": 5, "total_obtained_score": 0
            }


    def calculate_age_score(self, data):
        try:
            personal_details = data.get("personal_details")
            dob = personal_details.get("date_of_birth", "")


            dob_parsed = datetime.strptime(dob, "%d/%m/%Y")

            birth_year = dob_parsed.year
            current_year = datetime.now().year

            if birth_year > current_year:
                # logger.error(f"Invalid DOB detected: {dob}")
                return {"max_score": 5, 
                    "date_of_birth": {
                        "answer": None, 
                        "max_score": 5, 
                        "obtained_score": 0
                    }, 
                    "total_obtained_score": 0
                }
            else:
                age = current_year - birth_year

                # logger.debug(f"Calculating Age | DOB: {dob} | Age: {age} years")

                obtained_score = 0

                if age < 20:
                    obtained_score = RISK_SCORING["age_factor"]["subcategories"]["date_of_birth"]["ranges"]["<20"]
                if age > 59:
                    obtained_score = RISK_SCORING["age_factor"]["subcategories"]["date_of_birth"]["ranges"][">60"]
                elif age > 19 and age < 40:
                    obtained_score = RISK_SCORING["age_factor"]["subcategories"]["date_of_birth"]["ranges"]["20_40"]
                elif age > 39 and age < 60:
                    obtained_score = RISK_SCORING["age_factor"]["subcategories"]["date_of_birth"]["ranges"]["40_60"]

                # for age_range, score in RISK_SCORING["age_factor"]["subcategories"]["date_of_birth"]["ranges"].items():
                #     if "<20" in age_range and age < 20:
                #         obtained_score = score
                #     elif ">60" in age_range and age > 60:
                #         obtained_score = score
                #     else:
                #         lower, _, upper = age_range.partition('-')
                #         if lower and upper and float(lower) <= age <= float(upper):
                #             obtained_score = score

                # logger.debug(f"Age Factor Score: {obtained_score}")

                return {
                    "max_score": RISK_SCORING["age_factor"]["subcategories"]["date_of_birth"]["max_score"], 
                    "date_of_birth": {
                        "answer": age, 
                        "max_score": RISK_SCORING["age_factor"]["subcategories"]["date_of_birth"]["max_score"], 
                        "obtained_score": obtained_score
                    }, 
                    "total_obtained_score": obtained_score
                }

        except ValueError as e:
            logger.error(f"Age Calculation Error: {e}")
            return {
                "max_score": 5, 
                "date_of_birth": {
                    "answer": None, 
                    "max_score": 5, 
                    "obtained_score": 0
                }, 
                "total_obtained_score": 0
            }


    def calculate_category_scores(self, risk_scores):

        category_dict = {}

        high_score = 0
        low_score = 0
        medium_score = 0

        high_list = []
        low_list = []
        medium_list = []
        
        for key in CATEGORY_CONFIG.keys():
            risk_keys = CATEGORY_CONFIG[key]["keys"]

            final_score = 0
            
            for c_key in risk_keys:
                value = risk_scores[c_key]
                max_score = value['max_score']
                print(c_key)
                total_obtained_score = value['total_obtained_score']

                calculated_score = total_obtained_score/max_score*100

                final_score = calculated_score if calculated_score > final_score else final_score
                
            if final_score <= 25:
                category = "Low"
                low_score+=1
                low_list.append(key)
            elif final_score <= 50:
                category = "Medium"
                medium_score+=1
                medium_list.append(key)
            else:
                category = "High"
                high_score+=1
                high_list.append(key)

            category_dict.update({
                key: category
            })

        
        if high_score:
            overall = "High"
            factors = high_list
            overall_color = "#FF0000"
        elif medium_score:
            overall = "Medium"
            factors = medium_list
            overall_color = "#FFC000"
        else:
            overall = "Low"
            factors = low_list
            overall_color = "#00AF50"

        return {
            'category_dict': category_dict,
            'meta': {
                "overall": overall,
                "factors": factors,
                "overall_color": overall_color
            }
        }

    def generate_answers_pdf(self, request, instance):

        try:

            template_name = "answers.html"

            data = instance.form_data

            context = {
                'Full_Name': f"{data['personal_details'].get('title').upper()}. {data['personal_details'].get('full_name')}",
                'Date_of_Birth': data['personal_details'].get('date_of_birth'),
                'Gender': data['personal_details'].get('gender'),
                'Height': data['personal_details'].get('height'),
                'Weight': data['personal_details'].get('weight'),
                'BMI': data['personal_details'].get('bmi'),
                'Contact_Number': f"{data['personal_details'].get('country_code')} - {data['personal_details'].get('mobile_number')}",
                'Email': data['personal_details'].get('email'),
                'Address': data['personal_details'].get('address'),
                'City': data['personal_details'].get('city'),
                'Pincode': data['personal_details'].get('pincode'),
                'State': data['personal_details'].get('state')
            }


            def to_camel_case(snake_str):
                components = snake_str.split('_')
                return ' '.join(x.title() for x in components)

            def to_string(value):
                return ", ".join(to_camel_case(x.title()) for x in value)

            for key in data.keys():
                for i_key in data[key]:
                    if type(data[key][i_key]) == str:
                        data[key][i_key] = to_camel_case(data[key][i_key])
                    if type(data[key][i_key]) == list:
                        data[key][i_key] = to_string(data[key][i_key])

            

            context.update(data)

            

            html_content = render_to_string(template_name, context)

            pdfkit_config = pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf')

            header_html = render_to_string('individual_header.html', context)
            header_path = '/tmp/header.html'
            with open(header_path, 'w') as f:
                f.write(header_html)

            footer_html = render_to_string('individual_footer.html', context)
            footer_path = '/tmp/footer.html'
            with open(footer_path, 'w') as f:
                f.write(footer_html)

            options = {
                'enable-local-file-access': True,  # Allow access to local files
                'page-size': 'A4',
                'encoding': 'UTF-8',
                'header-html': header_path,
                'header-spacing': '5',
                'footer-html': footer_path,
                'footer-spacing': '5',
            }

            # Generate PDF
            pdf = pdfkit.from_string(
                html_content,
                False,
                configuration=pdfkit_config,
                options=options
            )

            # print(pdf, 'AAAAA')
            
            # Create PDF file with unique name
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"Answer_report__{instance.campaign.campaign_name}_{instance.name_of_submitter}_{timestamp}.pdf"
            pdf_file = ContentFile(pdf, name=filename)

            # pdf = pdfkit.from_string(html_content, False, configuration=pdfkit_config, options=options)

            # # Save the PDF to a Django model
            # pdf_file = ContentFile(pdf, name="generated_file.pdf")  # Create a ContentFile from the PDF

            # Return a success response
            return pdf_file

        except Exception as e:
            import traceback
            error_message = traceback.format_exc()

            print(error_message)
            return HttpResponse(f"Error generating PDF:<br>{error_message}", status=500)

    def generate_and_save_pdf(self, request, instance):

        import copy
        
        try:
            # Path to your template
            template_name = "Individual-MCRA-Report.html"  # Replace with your actual template file name

            # Context variables to pass to the template
            data_context = instance.category_scores
            context = copy.deepcopy(data_context)

            dob = instance.personal_details['date_of_birth']

            birth_year = int(dob.split("/")[-1]) if "/" in dob else int(dob.split("-")[0])
            current_year = datetime.now().year
            age = current_year - birth_year

            factor_names = []
            for factor in instance.meta_details['factors']:
                factor_names.append(CATEGORY_CONFIG[factor]['name'])

            context.update({
                'gender': instance.personal_details['gender'],
                "full_name": instance.personal_details['full_name'],
                "title": instance.personal_details['title'].capitalize(),
                "date_of_birth": instance.personal_details['date_of_birth'],
                "age": age,
                "address":instance.personal_details['address'],
                "mobile_number":instance.personal_details['mobile_number'],
                "email":instance.personal_details['email'],
                "weight":instance.personal_details['weight'],
                "height":instance.personal_details['height'],
                "bmi_v":instance.personal_details['bmi'],
                "assessment_date": instance.submission_date_time.strftime('%d %b %Y'),
                "risk_exposure": instance.meta_details['overall'],
                "risk_factors": ",".join(factor_names),
                "risk_color": instance.meta_details['overall_color']
            })

            

            html_content = render_to_string(template_name, context)
        
            # Configure wkhtmltopdf
            pdfkit_config = pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf')
            
            # Path to your header HTML file
            header_html = render_to_string('individual_header.html', context)
            header_path = '/tmp/header.html'
            with open(header_path, 'w') as f:
                f.write(header_html)

            footer_html = render_to_string('individual_footer.html', context)
            footer_path = '/tmp/footer.html'
            with open(footer_path, 'w') as f:
                f.write(footer_html)

            

            # options = {
            #     'enable-local-file-access': True,
            #     'page-size': 'A4',
            #     'margin-top': '80mm',  # Increased top margin to accommodate header
            #     'margin-right': '20mm',
            #     'margin-bottom': '20mm',
            #     'margin-left': '20mm',
            #     'encoding': 'UTF-8',
            #     'footer-right': '[page]/[topage]',
            #     'footer-font-size': '9',
            #     'footer-line': True,
            #     'footer-spacing': '5',
            #     'header-html': header_path,
            #     'header-spacing': '5',
            #     'zoom': '1.0',
            #     'no-outline': None,
            #     'quiet': '',
            #     'print-media-type': None,
            #     'enable-smart-shrinking': True,
            #     'dpi': '300'
            # }
            


            # Render the HTML content
            # html_content = render_to_string(template_name, context)

            # Configure wkhtmltopdf binary path
            # pdfkit_config = pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf')  # Update path as needed



            # Add options for wkhtmltopdf
            options = {
                'enable-local-file-access': True,  # Allow access to local files
                'page-size': 'A4',
                'encoding': 'UTF-8',
                'header-html': header_path,
                'header-spacing': '5',
                'footer-html': footer_path,
                'footer-spacing': '5',
            }

            # Generate PDF
            pdf = pdfkit.from_string(
                html_content,
                False,
                configuration=pdfkit_config,
                options=options
            )

            # print(pdf, 'AAAAA')
            
            # Create PDF file with unique name
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"Individual_report__{instance.campaign.campaign_name}_{instance.name_of_submitter}_{timestamp}.pdf"
            pdf_file = ContentFile(pdf, name=filename)

            # pdf = pdfkit.from_string(html_content, False, configuration=pdfkit_config, options=options)

            # # Save the PDF to a Django model
            # pdf_file = ContentFile(pdf, name="generated_file.pdf")  # Create a ContentFile from the PDF

            # Return a success response
            return pdf_file

        except Exception as e:
            import traceback
            error_message = traceback.format_exc()

            print(error_message)
            return HttpResponse(f"Error generating PDF:<br>{error_message}", status=500)

    
    def calculate_risk_scores(self, data):

        risk_scores = {
            'current_tobacco_consumption': self.calculate_direct_values(data, 'current_tobacco_consumption', 'cancer_risk_factors'),
            'past_tobacco_consumption': self.calculate_direct_values(data, 'past_tobacco_consumption', 'cancer_risk_factors'),
            'current_alcohol_consumption': self.calculate_direct_values(data, 'current_alcohol_consumption', 'cancer_risk_factors'),
            'physical_activity': self.calculate_direct_values(data, 'physical_activity', 'cancer_risk_factors'),
            'unhealthy_diet': self.calculate_direct_values(data, 'unhealthy_diet', 'cancer_risk_factors'),
            'secondhand_smoke': self.calculate_direct_values(data, 'secondhand_smoke', 'toxic_exposure'),
            'environmental_toxins': self.calculate_direct_values(data, 'environmental_toxins', 'toxic_exposure'),
            'occupational_toxins': self.calculate_direct_values(data, 'occupational_toxins', 'toxic_exposure'),
            'cancer_history': self.calculate_direct_values(data, 'cancer_history', 'inherited_cancer_risk_exposure'),
            'genetic_susceptibility': self.calculate_direct_values(data, 'genetic_susceptibility', 'inherited_cancer_risk_exposure'),
            'age_factor': self.calculate_age_score(data),
            'bmi': self.calculate_bmi_score(data),
            'cancer_warning_signs': self.calculate_cancer_warning_signs(data)

        }

        return risk_scores

        
    def post(self, request, *args, **kwargs):
        
        try:

            data = request.data

            print(data)

            campaign_uuid = request.GET.get('campaign_uuid')
            if not campaign_uuid:
                return JsonResponse({'error': 'campaign_uuid is required'}, status=400)

            try:
                campaign = Campaign.objects.get(object_uuid=campaign_uuid)
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Campaign not found'}, status=404)

            risk_scores = self.calculate_risk_scores(data)

            overall_scoring = self.calculate_category_scores(risk_scores)

            category_scoring = overall_scoring['category_dict']


            meta = overall_scoring['meta']

            personal_details = data.get('personal_details', {})

            dob = personal_details['date_of_birth']

            birth_year = int(dob.split("/")[-1]) if "/" in dob else int(dob.split("-")[0])
            current_year = datetime.now().year
            age = current_year - birth_year

            personal_details.update({
                'age': age
            })

            instance = FormSubmission.objects.create(
                submission_date_time=timezone.now(),
                name_of_submitter=data.get('personal_details').get('full_name'),
                campaign=campaign,
                form_data=data,
                risk_score=risk_scores,
                category_scores=category_scoring,
                personal_details=data.get('personal_details', {}),
                meta_details = meta
            )

            pdf_file = self.generate_and_save_pdf(request, instance)

            answers_file = self.generate_answers_pdf(request, instance)

            instance.associated_report.save("generated_file.pdf", pdf_file)

            instance.answers_report.save("generated_answers.pdf", answers_file)

            customer = CampaignCustomer.objects.filter(campaign=instance.campaign).first()

            from ..packages.communication.email.utils import Email

            trigger_email_template = "generic_email_template.html"

            email = Email(
                subject=f"Report for {instance.name_of_submitter} in {instance.campaign.campaign_name} for {customer.customer.customer_name}",
                to=[data.get('personal_details').get('email')],
                html_body={
                    "request": self.request,
                    "template": trigger_email_template,
                    "context": {
                        "email_body": f"Please find the attached reports for form submission"
                    },
                }
            )
            email.attach(pdf_file)
            email.attach(answers_file)
            result = email.send_email()

            print(result)

            return JsonResponse({
                'message': 'Form submission created successfully',
                'risk_scores': risk_scores,
                'associated_report': instance.associated_report.url,
                'individual_report': instance.answers_report.url
            })

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            import traceback
            print(traceback.print_exc())
            logger.error(f"Unexpected Error: {e}")
            return JsonResponse({'error': str(e)}, status=500)


#risk score levels
RISK_CATEGORIES = {
    "low": (0, 25),
    "medium": (25, 50),
    "high": (50, 100),
}

def get_risk_category(percentage):
    for category, (low, high) in RISK_CATEGORIES.items():
        if low <= percentage < high:
            return category.capitalize()
    return "High"


JSON_FILE_PATH = "risk_exposure_data.json"

class RiskExposureAPIView(APIView):

    def calculate_risk_scores(self, data):

        cancer_risk = data.get("cancer_risk_factors", {})
        personal_details = data.get("personal_details", {})

        risk_scores = {}
        risk_category = {}

        high_count = 0
        medium_count = 0

        for category, category_info in RISK_SCORING.items():
            category_max_score = category_info.get("max_score", 0)
            subcategories = category_info.get("subcategories", {})

            category_score = {
                "max_score": category_max_score,
                "total_obtained_score": 0
            }

            for sub_key, sub_info in subcategories.items():
                max_score = sub_info.get("max_score", 0)
                base_scores = sub_info.get("base", {})

                user_answer = cancer_risk.get(sub_key, "")
                obtained_score = 0

                if isinstance(user_answer, list):
                    obtained_score = sum(base_scores.get(ans, 0) for ans in user_answer if ans in base_scores)
                else:
                    obtained_score = base_scores.get(user_answer, 0)

                category_score[sub_key] = {
                    "max_score": max_score,
                    "obtained_score": obtained_score,
                    "answer": user_answer if user_answer else None
                }

            category_score["total_obtained_score"] = sum(
                sub["obtained_score"] for key, sub in category_score.items() if isinstance(sub, dict)
            )

            percentage_exposure = (
                (category_score["total_obtained_score"] / category_max_score) * 100 if category_max_score else 0
            )

            # Determine risk level
            if percentage_exposure > 50:
                risk_level = "High"
                high_count += 1
            elif 25 <= percentage_exposure <= 50:
                risk_level = "Medium"
                medium_count += 1
            else:
                risk_level = "Low"

            category_score["percentage_exposure"] = round(percentage_exposure, 2)
            category_score["risk_category"] = risk_level

            risk_scores[category] = category_score
            risk_category[category] = risk_level

        # Determine final overall risk category
        overall_risk = "High" if high_count > 0 else "Medium" if medium_count > 0 else "Low"

        return risk_scores, risk_category, overall_risk

    def store_data_in_json(self, data):
        """Store risk scores in a JSON file."""
        if os.path.exists(JSON_FILE_PATH):
            with open(JSON_FILE_PATH, "r") as file:
                try:
                    existing_data = json.load(file)
                except json.JSONDecodeError:
                    existing_data = []
        else:
            existing_data = []

        existing_data.append(data)

        with open(JSON_FILE_PATH, "w") as file:
            json.dump(existing_data, file, indent=4)

    def post(self, request, *args, **kwargs):
        try:
            campaign_uuid = request.GET.get('campaign_uuid')
            if not campaign_uuid:
                return JsonResponse({'error': 'campaign_uuid is required'}, status=400)

            data = json.loads(request.body)
            risk_scores, risk_category, overall_risk = self.calculate_risk_scores(data)

            result_data = {
                'message': 'Risk exposure calculated successfully',
                'risk_scores': risk_scores,
                'risk_category': risk_category,
                'overall_risk_category': overall_risk
            }

            # Store results in JSON file
            self.store_data_in_json(result_data)

            return JsonResponse(result_data, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)




#group risk-score


class GroupRiskExposureAPIView(APIView):
    def calculate_risk_level(self, obtained_score, max_score):
        try:
            obtained_score = float(obtained_score)
            max_score = float(max_score)
            percentage = (obtained_score / max_score) * 100 if max_score > 0 else 0
        except ValueError:
            return "Low"

        if percentage > 50:
            return "High"
        elif 25 <= percentage <= 50:
            return "Medium"
        else:
            return "Low"

    def post(self, request, *args, **kwargs):
        try:
            logger.debug("Received Group Risk Exposure Request")
            data = json.loads(request.body)

            group_name = data.get("group_name", "Unknown Group")
            total_candidates = int(data.get("total_candidates", 0))
            candidates = data.get("candidates", [])

            if not candidates:
                return JsonResponse({"error": "No candidates provided"}, status=400)

            
            group_risk_profile = {"low_risk": 0, "medium_risk": 0, "high_risk": 0}
            group_age_profile = {"<20_years": 0, "20_40_years": 0, "41_60_years": 0, ">60_years": 0}
            group_bmi_profile = {"normal": 0, "overweight": 0, "pre_obese": 0, "obese": 0}

            
            controllable_cancer_risk = {
                "tobacco_consumption": {"low_risk": 0, "medium_risk": 0, "high_risk": 0},
                "alcohol_consumption": {"low_risk": 0, "medium_risk": 0, "high_risk": 0},
                "bmi": {"low_risk": 0, "medium_risk": 0, "high_risk": 0},
                "physical_activity": {"low_risk": 0, "medium_risk": 0, "high_risk": 0}
            }

            toxic_exposure = {
                "secondhand_smoke": {"low_risk": 0, "medium_risk": 0, "high_risk": 0},
                "environmental_toxins": {"low_risk": 0, "medium_risk": 0, "high_risk": 0},
                "occupational_toxins": {"low_risk": 0, "medium_risk": 0, "high_risk": 0}
            }

            inherited_cancer_risk = {
                "cancer_history": {"low_risk": 0, "medium_risk": 0, "high_risk": 0},
                "genetic_susceptibility": {"low_risk": 0, "medium_risk": 0, "high_risk": 0},
                "age_factor": {"low_risk": 0, "medium_risk": 0, "high_risk": 0}
            }

        
            for candidate in candidates:
                try:
                    age = int(candidate.get("age", 0))
                    bmi = float(candidate.get("bmi", 0))
                except ValueError:
                    age = 0
                    bmi = 0.0

                
                if age < 20:
                    group_age_profile["<20_years"] += 1
                elif 20 <= age <= 40:
                    group_age_profile["20_40_years"] += 1
                elif 41 <= age <= 60:
                    group_age_profile["41_60_years"] += 1
                else:
                    group_age_profile[">60_years"] += 1

                
                if 18.5 <= bmi < 23:
                    group_bmi_profile["normal"] += 1
                elif 23 <= bmi < 25:
                    group_bmi_profile["overweight"] += 1
                elif 25 <= bmi < 30:
                    group_bmi_profile["pre_obese"] += 1
                else:
                    group_bmi_profile["obese"] += 1

                
                for category, value in candidate.items():
                    if category in controllable_cancer_risk:
                        risk_level = self.calculate_risk_level(value, 15)
                        controllable_cancer_risk[category][f"{risk_level.lower()}_risk"] += 1
                    elif category in toxic_exposure:
                        risk_level = self.calculate_risk_level(value, 5)
                        toxic_exposure[category][f"{risk_level.lower()}_risk"] += 1
                    elif category in inherited_cancer_risk:
                        risk_level = self.calculate_risk_level(value, 10)
                        inherited_cancer_risk[category][f"{risk_level.lower()}_risk"] += 1

            
            response_data = {
                "message": "Group Multi-Cancer Risk Exposure calculated successfully.",
                "group_risk_exposure": {
                    "group_name": group_name,
                    "total_candidates": total_candidates,
                    "group_risk_profile": group_risk_profile,
                    "group_age_profile": group_age_profile,
                    "group_bmi_profile": group_bmi_profile,
                    "controllable_cancer_risk_exposure": controllable_cancer_risk,
                    "toxic_exposure": toxic_exposure,
                    "inherited_cancer_risk_exposure": inherited_cancer_risk
                }
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        except Exception as e:
            logger.error(f"Unexpected Error: {str(e)}")
            return JsonResponse({"error": str(e)}, status=500)





class GenerateIndividualReportPDF(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Path to your template
            template_name = "Individual-MCRA-Report.html"  # Replace with your actual template file name
            
            # Context variables to pass to the template
            context = {
                "title": "PDF Title",
                "content": "This is the content of the PDF.",
                "footer": "Generated by Django",
            }

            # Render the HTML content
            html_content = render_to_string(template_name, context)

            # Configure wkhtmltopdf binary path
            pdfkit_config = pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf')  # Update path as needed

            # Add options for wkhtmltopdf
            options = {
                'enable-local-file-access': True,  # Allow access to local files
                'page-size': 'A4',
                'encoding': 'UTF-8',
                'footer-right': '[page]/[topage]',  # Example footer
            }

            # Generate PDF
            pdf = pdfkit.from_string(html_content, False, configuration=pdfkit_config, options=options)

            # Create the response
            response = HttpResponse(pdf, content_type="application/pdf")
            response["Content-Disposition"] = "attachment; filename=generated_file.pdf"
            return response

        except Exception as e:
            import traceback
            error_message = traceback.format_exc()
            return HttpResponse(f"Error generating PDF:<br>{error_message}", status=500)




class GenerateGroupReportPDF(APIView):

    def generate_and_save_pdf(self, request, instance):
        
        try:
            # Path to your template
            template_name = "group_report.html"  # Replace with your actual template file name

            # Context variables to pass to the template

            submissions = FormSubmission.objects.filter(campaign=instance)

            normal_bmi_count = submissions.filter(
                Q(personal_details__bmi__gte="18.5") & Q(personal_details__bmi__lte="22.9")
            ).count()

            # Count entries with BMI in the "Overweight" range (23 to 24.9)
            overweight_bmi_count = submissions.filter(
                Q(personal_details__bmi__gte="23") & Q(personal_details__bmi__lte="24.9")
            ).count()

            # Count entries with BMI in the "Pre-Obese" range (25 to 29.9)
            pre_obese_bmi_count = submissions.filter(
                Q(personal_details__bmi__gte="25") & Q(personal_details__bmi__lte="29.9")
            ).count()

            # Count entries with BMI in the "Obese" range (>30)
            obese_bmi_count = submissions.filter(
                Q(personal_details__bmi__gt="30")
            ).count()


            def count_entries_by_category(category, value, submissions):
                return submissions.filter(
                    category_scores__contains={category: value}
                ).count()

        
            # Count entries for "age_and_cancer"
            age_and_cancer_low = count_entries_by_category("age_and_cancer", "Low", submissions)
            age_and_cancer_medium = count_entries_by_category("age_and_cancer", "Medium", submissions)
            age_and_cancer_high = count_entries_by_category("age_and_cancer", "High", submissions)

            # Count entries for "unhealthy_diet"
            unhealthy_diet_low = count_entries_by_category("unhealthy_diet", "Low", submissions)
            unhealthy_diet_medium = count_entries_by_category("unhealthy_diet", "Medium", submissions)
            unhealthy_diet_high = count_entries_by_category("unhealthy_diet", "High", submissions)

            # Count entries for "alcohol_consumption"
            alcohol_consumption_low = count_entries_by_category("alcohol_consumption", "Low", submissions)
            alcohol_consumption_medium = count_entries_by_category("alcohol_consumption", "Medium", submissions)
            alcohol_consumption_high = count_entries_by_category("alcohol_consumption", "High", submissions)

            # Count entries for "physical_inactivity"
            physical_inactivity_low = count_entries_by_category("physical_inactivity", "Low", submissions)
            physical_inactivity_medium = count_entries_by_category("physical_inactivity", "Medium", submissions)
            physical_inactivity_high = count_entries_by_category("physical_inactivity", "High", submissions)

            # Count entries for "tobacco_consumption"
            tobacco_consumption_low = count_entries_by_category("tobacco_consumption", "Low", submissions)
            tobacco_consumption_medium = count_entries_by_category("tobacco_consumption", "Medium", submissions)
            tobacco_consumption_high = count_entries_by_category("tobacco_consumption", "High", submissions)

            # Count entries for "known_dna_susceptibility"
            known_dna_susceptibility_low = count_entries_by_category("known_dna_susceptibility", "Low", submissions)
            known_dna_susceptibility_medium = count_entries_by_category("known_dna_susceptibility", "Medium", submissions)
            known_dna_susceptibility_high = count_entries_by_category("known_dna_susceptibility", "High", submissions)

            # Count entries for "secondhand_smoke_exposure"
            secondhand_smoke_exposure_low = count_entries_by_category("secondhand_smoke_exposure", "Low", submissions)
            secondhand_smoke_exposure_medium = count_entries_by_category("secondhand_smoke_exposure", "Medium", submissions)
            secondhand_smoke_exposure_high = count_entries_by_category("secondhand_smoke_exposure", "High", submissions)

            # Count entries for "occupational_toxin_exposure"
            occupational_toxin_exposure_low = count_entries_by_category("occupational_toxin_exposure", "Low", submissions)
            occupational_toxin_exposure_medium = count_entries_by_category("occupational_toxin_exposure", "Medium", submissions)
            occupational_toxin_exposure_high = count_entries_by_category("occupational_toxin_exposure", "High", submissions)

            # Count entries for "environmental_Toxin_exposure"
            environmental_toxin_exposure_low = count_entries_by_category("environmental_Toxin_exposure", "Low", submissions)
            environmental_toxin_exposure_medium = count_entries_by_category("environmental_Toxin_exposure", "Medium", submissions)
            environmental_toxin_exposure_high = count_entries_by_category("environmental_Toxin_exposure", "High", submissions)

            # Count entries for "personal_family_cancer_history"
            personal_family_cancer_history_low = count_entries_by_category("personal_family_cancer_history", "Low", submissions)
            personal_family_cancer_history_medium = count_entries_by_category("personal_family_cancer_history", "Medium", submissions)
            personal_family_cancer_history_high = count_entries_by_category("personal_family_cancer_history", "High", submissions)

            # Count entries for "recognizing_present_warning_signs_cancer_risk_health_concerns"
            recognizing_warning_signs_low = count_entries_by_category("recognizing_present_warning_signs_cancer_risk_health_concerns", "Low", submissions)
            recognizing_warning_signs_medium = count_entries_by_category("recognizing_present_warning_signs_cancer_risk_health_concerns", "Medium", submissions)
            recognizing_warning_signs_high = count_entries_by_category("recognizing_present_warning_signs_cancer_risk_health_concerns", "High", submissions)


            bmi_low = count_entries_by_category("bmi", "Low", submissions)
            bmi_medium = count_entries_by_category("bmi", "Medium", submissions)
            bmi_high = count_entries_by_category("bmi", "High", submissions)

            customer=CampaignCustomer.objects.filter(campaign=instance).first().customer


            context = {
                'total_screened': submissions.count(),
                'high_count': submissions.filter(meta_details__contains={'overall': 'High'}).count(),
                'low_count': submissions.filter(meta_details__contains={'overall': 'Low'}).count(),
                'medium_count': submissions.filter(meta_details__contains={'overall': 'Medium'}).count(),
                'under_20_count' : submissions.filter(personal_details__age__lt=20).count(),
                'twenty_to_40_count': submissions.filter(personal_details__age__gte=20, personal_details__age__lte=40).count(),
                'forty_one_to_60_count': submissions.filter(personal_details__age__gte=41, personal_details__age__lte=60).count(),
                'over_60_count': submissions.filter(personal_details__age__gt=60).count(),
                'normal_bmi_count': normal_bmi_count,
                'overweight_bmi_count': overweight_bmi_count,
                'pre_obese_bmi_count': pre_obese_bmi_count,
                'obese_bmi_count': obese_bmi_count,
                'age_and_cancer_low': age_and_cancer_low,
                'age_and_cancer_medium': age_and_cancer_medium,
                'age_and_cancer_high': age_and_cancer_high,
                'unhealthy_diet_low': unhealthy_diet_low,
                'unhealthy_diet_medium': unhealthy_diet_medium,
                'unhealthy_diet_high': unhealthy_diet_high,
                'alcohol_consumption_low': alcohol_consumption_low,
                'alcohol_consumption_medium': alcohol_consumption_medium,
                'alcohol_consumption_high': alcohol_consumption_high,
                'physical_inactivity_low': physical_inactivity_low,
                'physical_inactivity_medium': physical_inactivity_medium,
                'physical_inactivity_high': physical_inactivity_high,
                'tobacco_consumption_low': tobacco_consumption_low,
                'tobacco_consumption_medium': tobacco_consumption_medium,
                'tobacco_consumption_high': tobacco_consumption_high,
                'known_dna_susceptibility_low': known_dna_susceptibility_low,
                'known_dna_susceptibility_medium': known_dna_susceptibility_medium,
                'known_dna_susceptibility_high': known_dna_susceptibility_high,
                'secondhand_smoke_exposure_low': secondhand_smoke_exposure_low,
                'secondhand_smoke_exposure_medium': secondhand_smoke_exposure_medium,
                'secondhand_smoke_exposure_high': secondhand_smoke_exposure_high,
                'occupational_toxin_exposure_low': occupational_toxin_exposure_low,
                'occupational_toxin_exposure_medium': occupational_toxin_exposure_medium,
                'occupational_toxin_exposure_high': occupational_toxin_exposure_high,
                'environmental_toxin_exposure_low': environmental_toxin_exposure_low,
                'environmental_toxin_exposure_medium': environmental_toxin_exposure_medium,
                'environmental_toxin_exposure_high': environmental_toxin_exposure_high,
                'personal_family_cancer_history_low': personal_family_cancer_history_low,
                'personal_family_cancer_history_medium': personal_family_cancer_history_medium,
                'personal_family_cancer_history_high': personal_family_cancer_history_high,
                'recognizing_warning_signs_low': recognizing_warning_signs_low,
                'recognizing_warning_signs_medium': recognizing_warning_signs_medium,
                'recognizing_warning_signs_high': recognizing_warning_signs_high,
                'bmi_low': bmi_low,
                'bmi_medium': bmi_medium,
                'bmi_high': bmi_high,
                'full_name': customer.customer_name,
                'email': customer.email_id,
                'mobile_number': customer.contact_number,
                'address': customer.address,
                'report_date': datetime.today().strftime('%d %b %Y')
            }
            # context = instance.category_scores

            # dob = instance.personal_details['date_of_birth']

            # birth_year = int(dob.split("/")[-1]) if "/" in dob else int(dob.split("-")[0])
            # current_year = datetime.now().year
            # age = current_year - birth_year

            # factor_names = []
            # for factor in instance.meta_details['factors']:
            #     factor_names.append(CATEGORY_CONFIG[factor]['name'])

            # context.update({
            #     'gender': instance.personal_details['gender'],
            #     "full_name": instance.personal_details['full_name'],
            #     "date_of_birth": instance.personal_details['date_of_birth'],
            #     "age": age,
            #     "address":instance.personal_details['address'],
            #     "mobile_number":instance.personal_details['mobile_number'],
            #     "email":instance.personal_details['email'],
            #     "weight":instance.personal_details['weight'],
            #     "height":instance.personal_details['height'],
            #     "bmi":instance.personal_details['bmi'],
            #     "assessment_date": instance.submission_date_time.strftime('%d %b %Y'),
            #     "risk_exposure": instance.meta_details['overall'],
            #     "risk_factors": ",".join(factor_names),
            #     "risk_color": instance.meta_details['overall_color']
            # })

            # Render the HTML content
            html_content = render_to_string(template_name, context)

            # Configure wkhtmltopdf binary path
            pdfkit_config = pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf')  # Update path as needed

            # Add options for wkhtmltopdf
            options = {
                'enable-local-file-access': True,  # Allow access to local files
                'page-size': 'A4',
                'encoding': 'UTF-8',
                'footer-right': '[page]/[topage]',  # Example footer
            }

            # Generate PDF
            pdf = pdfkit.from_string(html_content, False, configuration=pdfkit_config, options=options)

            # Save the PDF to a Django model

            def custom_answer_upload_to(instance):
                from datetime import datetime
                ext = "pdf"
                today = datetime.today().strftime('%d %b %Y')
                return f"Group_report__{instance.campaign_name}_{today}.{ext}"

            pdf_file = ContentFile(pdf, name=custom_answer_upload_to(instance))  # Create a ContentFile from the PDF

            # Return a success response
            return pdf_file, custom_answer_upload_to

        except Exception as e:
            import traceback
            error_message = traceback.format_exc()

            print(error_message)
            return HttpResponse(f"Error generating PDF:<br>{error_message}", status=500)


    def get(self, request, *args, **kwargs):
        try:
            campaign_uuid = request.GET.get('campaign_uuid', None)
            instance = Campaign.objects.get(object_uuid=campaign_uuid)
            file, name = self.generate_and_save_pdf(request, instance)
            # return self.generate_and_save_pdf(request, instance)
            response = HttpResponse(file, content_type="application/pdf")
            response["Content-Disposition"] = f"attachment; filename={name}"
            return response

        except Exception as e:
            return HttpResponse(f"Error generating PDF: {str(e)}", status=500)


class FormSubmissionCrudView(BaseCrudView):
    page_title = "Form Submissions"
    add_btn_title = "Submit New Form"
    table = FormSubmissionCrudTable
    form = FormSubmissionForm
    model = FormSubmission
    
    
    def display_add_button_check(self, request):
        return False
    
    def can_perform_action_edit(self, request, obj):
        return False