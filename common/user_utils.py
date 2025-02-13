from django.db.models import Q
from django.core.exceptions import ValidationError

from zango.apps.appauth.models import AppUserModel, UserRoleModel


class UserHandlingMixin:

    def unmap_app_user(self):
        
        app_user = AppUserModel.objects.filter(
            app_objects__icontains=str(self.object_uuid)
        ).last()

        roles = []

        if app_user:
            app_objects = app_user.app_objects
            from copy import deepcopy
            copy_app_objects = deepcopy(app_objects)
            if app_objects:
                for key in app_objects.keys():
                    if app_objects[key] == str(self.object_uuid):
                        copy_app_objects.pop(key)
                        roles.append(key)
            app_user.app_objects = copy_app_objects
            for role in roles: app_user.roles.remove(int(role))
            app_user.save()
            return {
                'success': True, 'message': 'Unmapping perfomed successfully'
            }
        else:
            return {
                'success': False, 'message': 'No User Associated with this object'
            }

    def map_app_user(
        self,
        name,
        email,
        mobile,
        password,
        role_name,
        force_password_reset=True,
        require_verification=True,
    ):
        """
        Creates a new app user and associates them with the current object, mapping them to the specified role.

        Args:
            name (str): The name of the user.
            email (str): The email address of the user.
            mobile (str): The mobile number of the user.
            password (str): The password for the user account.
            role_name (str): The name of the role to be assigned to the user.
            force_password_reset (bool): If True, the user will be required to reset their password on first login. Default is True.
            require_verification (bool): If True, the user will be required to verify their account. Default is True.

        Returns:
            dict: A dictionary containing:
                - "success" (bool): Indicates if the user creation was successful.
                - "message" (str): A message providing additional details about the operation.
                - "app_user" (AppUserModel or None): The created user instance if successful, otherwise None.

        Raises:
            ValidationError: If the specified role does not exist.

        Notes:
            The `app_objects` mapping is created with the given role with the current object.
        """
        app_objects = {}
        role_ids = []

        try:
            user_role = UserRoleModel.objects.get(name=role_name)
            app_objects.update({str(user_role.id): str(self.object_uuid)})
            role_ids.append(user_role.id)
        except UserRoleModel.DoesNotExist:
            raise ValidationError(f"User Role {role_name} does not exist")

        response = AppUserModel.create_user(
            name,
            email,
            mobile,
            password,
            role_ids,
            force_password_reset=force_password_reset,
            require_verification=require_verification,
            app_objects=app_objects,
        )

        if not response.get('success'):
            if response.get('message') == "Another user already exists matching the provided credentials":
                
                retrieved_flag = False

                app_users = None

                filter_or = Q()
                
                if email:
                    filter_or = filter_or | Q(email=email)
                if mobile:
                    filter_or = filter_or | Q(mobile=mobile)

                if email and mobile:
                    app_users = AppUserModel.objects.filter(email=email, mobile=mobile)
                    if app_users.exists():
                        retrieved_flag = True
                if not retrieved_flag:
                    app_users = AppUserModel.objects.filter(filter_or)
                if app_users and app_users.exists():
                    app_user = app_users.first()
                    if app_user.roles.filter(name=role_name).exists():
                        return {
                            "success": False, 'message': 'User with same credentials and user role already exists', 'app_user': None
                        }
                    if email == app_user.email and mobile == app_user.mobile:
                        app_user.roles.add(user_role)
                        app_objects = app_user.app_objects
                        if not app_objects:
                            app_objects = {}
                        app_objects.update({
                            str(user_role.id): self.object_uuid
                        })
                        return {
                            "success": True, 'message': "Success", 'app_user': app_user
                        }
                    else:
                        message = "User with same credentials already exists and has the following descripencises: "
                        message_list = []
                        if email !=  app_user.email:
                            message_list.append(f'User has email {app_user.email}')
                        if mobile !=  app_user.mobile:
                            message_list.append(f'User has mobile {app_user.mobile}')

                        message = f'{message} {",".join(message_list)}'

                        return {
                            "success": False, 'message': message, 'app_user': None
                        }

        return response


class UserWorker:
        
    def validate_for_creation(self, role=None, email=None, phone_number=None):

        ''' 
        
        codes
        1 :- User Exists with no role condition
        2 :- User Exists with certain role
        3 :- User Exists with other than the specified role, 
                so if required they can pass a request to just add the role
        4 :- User creation can be proceeded
        5 :- Fail Proof code
        
        '''

        if role:
            role = UserRoleModel.objects.filter(name=role).first()
        
        code = 5

        filter_q = Q()

        if email:
            filter_q = filter_q | Q(email__iexact=email)
        if phone_number:
            filter_q = filter_q | Q(phone_number=phone_number)

        users = AppUserModel.objects.filter(filter_q)

        if users.exists():
            code = 1
        else:
            code = 4

        if code == 1 and role:
            users = users.objects.filter(roles__in=[role.id])
            if users.exists():
                code = 2
            else:
                code = 3

        if code == 4:
            return "Proceed with user creation", code
        elif code == 1:
            return f"User Already Exists with id - {','.join([str(user.id) for user in users])}", code
        elif code == 2:
            return f"User Already Exists for the same role with user id - {','.join([str(user.id) for user in users])}", code
        elif code == 3:
            return f"User Already Exists for the other role with user id - {','.join([str(user.id) for user in users])}", code
        else:
            return f"Exception", code
        
        
    def create_user(self, data, role, instance):

        # role = UserRoleModel.objects.filter(name=role).first()

        result = instance.map_app_user(
            data.get('name'),
            data.get('email'),
            data.get('phone_number'),
            data.get('password'),
            role,
            data.get('force_password_reset', True),
            data.get('require_verification', False),
        )

        return result


    def update_user(self, data, object_uuid, role):

        role = UserRoleModel.objects.filter(name=role).first()

        my_user = AppUserModel.objects.filter(
            app_objects__contains={
                str(role.id): str(object_uuid)
            }
        ).last()

        success = False
        try:
            user_query = Q()
            email = data.get("email")
            mobile = data.get("mobile")
            if email:
                user_query = user_query | Q(email=email)
            if mobile:
                user_query = user_query | Q(mobile=mobile)
            if user_query:
                user = AppUserModel.objects.filter(user_query).exclude(id=my_user.id)
                if user.exists():
                    message = "Another user already exists matching the provided email or mobile"
                    return {"success": False, "message": message}

            if email:
                my_user.email = email
            if mobile:
                my_user.mobile = mobile

            name = data.get("name")
            if name:
                my_user.name = name

            my_user.save()
            success = True
            message = "App User updated successfully."
        except Exception as e:
            message = str(e)
        return {"success": success, "message": message}
