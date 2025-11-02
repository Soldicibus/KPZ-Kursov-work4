import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Students } from "../../orm/entities/Students/Students";
import { Class } from "../../orm/entities/Class/Class";

export default async (req: Request, res: Response) => {
  try {
    const {
      student_phone,
      student_email,
      student_surname,
      student_name,
      student_patronymic,
      student_Class, // expects a class name like "10-A"
    } = req.body;

    const studentRepo = getRepository(Students);
    const classRepo = getRepository(Class);

    // --- 1️⃣ Validate required fields ---
    if (!student_surname || !student_name || !student_Class) {
      return res.status(400).json({
        error: "Missing required fields: student_surname, student_name, or student_Class",
      });
    }

    // --- 2️⃣ Check if class exists ---
    const classEntity = await classRepo.findOne({
      where: { class_name: student_Class },
    });

    if (!classEntity) {
      return res.status(404).json({
        error: `Class '${student_Class}' not found. Please create it first.`,
      });
    }

    // --- 3️⃣ Create and save student ---
    const student = studentRepo.create({
      student_phone,
      student_email,
      student_surname,
      student_name,
      student_patronymic,
      student_Class: classEntity,
    });

    await studentRepo.save(student);

    // --- 4️⃣ Return success ---
    return res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (err: any) {
    console.error("Error creating student:", err);
    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
};
