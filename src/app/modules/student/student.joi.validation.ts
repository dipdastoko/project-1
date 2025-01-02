import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .custom((value, helpers) => {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      if (firstNameStr !== value) {
        return helpers.message(`${value} is not in capitalized format`);
      }
      return value;
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!/^[a-zA-Z]+$/.test(value)) {
        return helpers.message(`${value} is not valid`);
      }
      return value;
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    'any.required': "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': "Mother's contact number is required",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'any.required': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Local guardian address is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student name is required',
  }),
  gender: Joi.string().valid('Male', 'Female', 'Others').required().messages({
    'any.required': 'Gender is required',
    'any.only': "Gender must be 'Male', 'Female', or 'Other'",
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': '{#value} is not valid',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required',
  }),
  permanentAdress: Joi.string().required().messages({
    'any.required': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian details are required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local guardian details are required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
