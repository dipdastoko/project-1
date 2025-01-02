import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';
import { z } from 'zod';
import studentValidationSchema from './student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // crating a schema valiadation using zod
    // const sturdentValidationSchema = z.object({
    //   id: z.string(),
    //   name: z.object({
    //     firstName:z.string().max(20,{message:'First Name can not be more than 20 characters'})
    //   })
    // })

    const { student: studentData } = req.body;

    //data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData);

    // data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);
    // console.log(error, value);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved sucessfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
