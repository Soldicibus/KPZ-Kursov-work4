import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Teacher } from "../../orm/entities/Teachers/Teachers";
import { Class } from "../../orm/entities/Class/Class";

export default async (req: Request, res: Response) => {
  try {
    const {
      teacher_email,
      teacher_phone,
      teacher_surname,
      teacher_name,
      teacher_patronymic,
      teacher_position,
      teacher_class, // expects class name like "10-А"
    } = req.body;

    const teacherRepo = getRepository(Teacher);
    const classRepo = getRepository(Class);

    // --- Validation ---
    if (!teacher_email || !teacher_phone || !teacher_name || !teacher_surname) {
      return res.status(400).json({
        error: "Missing required fields: teacher_email, teacher_phone, teacher_name, or teacher_surname",
      });
    }

    // --- Find the class ---
    let classEntity = null;
    if (teacher_class) {
      classEntity = await classRepo.findOne({
        where: { class_name: teacher_class },
      });

      if (!classEntity) {
        return res.status(404).json({
          error: `Class '${teacher_class}' not found. Please create it first.`,
        });
      }
    }

    // --- Create the teacher ---
    const teacher = teacherRepo.create({
      teacher_email,
      teacher_phone,
      teacher_surname,
      teacher_name,
      teacher_patronymic,
      teacher_position,
      teacher_class: classEntity, // relation to Class entity
    });

    await teacherRepo.save(teacher);

    return res.status(201).json({
      message: "Teacher created successfully",
      teacher,
    });
  } catch (err: any) {
    console.error("Error creating teacher:", err);
    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
};
