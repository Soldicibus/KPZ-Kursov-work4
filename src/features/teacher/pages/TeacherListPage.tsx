import { Route } from "@/routes/teachers/teachers";
import { useCreateTeacher, useDeleteTeacher } from "@/features/teacher/api";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Teacher} from "../types";

export function TeacherListPage(): React.ReactElement {
    const teachers = Route.useLoaderData() as Teacher[];
    const createTeacherMutation = useCreateTeacher();
    const deleteTeacherMutation = useDeleteTeacher();

    const [newTeacherName, setNewTeacherName] = useState("");
    const [newTeacherSurname, setNewTeacherSurname] = useState("");
    const [newTeacherEmail, setNewTeacherEmail] = useState("");
    const [newTeacherPhone, setNewTeacherPhone] = useState("");

    const handleCreateTeacher = () => {
        if (!newTeacherName.trim() || !newTeacherSurname.trim() || !newTeacherEmail.trim() || !newTeacherPhone.trim()) return;

        createTeacherMutation.mutate(
            {
                teacher_name: newTeacherName,
                teacher_surname: newTeacherSurname,
                teacher_email: newTeacherEmail,
                teacher_phone: newTeacherPhone,
            },
            {
                onSuccess: () => {
                    setNewTeacherName("");
                    setNewTeacherSurname("");
                    setNewTeacherEmail("");
                    setNewTeacherPhone("");
                }
            }
        );
    };

    return (
        <div>
            <h1>Teacher List</h1>

            <ul>
                {teachers?.map((teacher) => (
                    <li key={teacher.teacher_id}>
                        <Link
                            to={"/teachers/$teacherId" as any}
                            params={{ teacherId: String(teacher.teacher_id) } as any}
                        >
                            {teacher.teacher_name} {teacher.teacher_surname}
                        </Link>

                        <button
                            onClick={() => deleteTeacherMutation.mutate(teacher.teacher_id)}
                            disabled={deleteTeacherMutation.isPending}
                        >
                            {deleteTeacherMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                    </li>
                ))}
            </ul>

            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Surname"
                    value={newTeacherSurname}
                    onChange={(e) => setNewTeacherSurname(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={newTeacherEmail}
                    onChange={(e) => setNewTeacherEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Phone"
                    value={newTeacherPhone}
                    onChange={(e) => setNewTeacherPhone(e.target.value)}
                />

                <button
                    onClick={handleCreateTeacher}
                    disabled={createTeacherMutation.isPending}
                >
                    {createTeacherMutation.isPending ? "Creating..." : "Create Teacher"}
                </button>
            </div>
        </div>
    );
}
