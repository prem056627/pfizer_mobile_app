import datetime

class FunctionUtils:

    def get_quarter_dates(self, quarter_type='current'):

        '''
        quarter_type
        current -> Current Quanter
        previous -> Previous Quarter
        both -> Cuurent and Previous Quarter
        '''
        return_dict = {}
        # Get the current date
        current_date = datetime.date.today()

        # Determine the current quarter
        current_month = current_date.month

        # Determine the start and end date for the current quarter
        if quarter_type in ['current', 'both']:
            if current_month in [1, 2, 3]:
                current_quarter_start = datetime.date(current_date.year, 1, 1)
                current_quarter_end = datetime.date(current_date.year, 3, 31)
            elif current_month in [4, 5, 6]:
                current_quarter_start = datetime.date(current_date.year, 4, 1)
                current_quarter_end = datetime.date(current_date.year, 6, 30)
            elif current_month in [7, 8, 9]:
                current_quarter_start = datetime.date(current_date.year, 7, 1)
                current_quarter_end = datetime.date(current_date.year, 9, 30)
            else:
                current_quarter_start = datetime.date(current_date.year, 10, 1)
                current_quarter_end = datetime.date(current_date.year, 12, 31)
            
            return_dict.update({
                "current_quarter_start": current_quarter_start,
                "current_quarter_end": current_quarter_end,
            })

        # Determine the start and end date for the previous quarter
        if quarter_type in ['previous', 'both']:
            if current_month in [1, 2, 3]:
                previous_quarter_start = datetime.date(current_date.year - 1, 10, 1)
                previous_quarter_end = datetime.date(current_date.year - 1, 12, 31)
            elif current_month in [4, 5, 6]:
                previous_quarter_start = datetime.date(current_date.year, 1, 1)
                previous_quarter_end = datetime.date(current_date.year, 3, 31)
            elif current_month in [7, 8, 9]:
                previous_quarter_start = datetime.date(current_date.year, 4, 1)
                previous_quarter_end = datetime.date(current_date.year, 6, 30)
            else:
                previous_quarter_start = datetime.date(current_date.year, 7, 1)
                previous_quarter_end = datetime.date(current_date.year, 9, 30)
            
            return_dict.update({
                "previous_quarter_start": previous_quarter_start,
                "previous_quarter_end": previous_quarter_end
            })

        return return_dict
