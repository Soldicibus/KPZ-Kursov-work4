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
    const [newTeacherPosition, setNewTeacherPosition] = useState("");
    const [newTeacherClass, setNewTeacherClass] = useState("");

    const handleCreateTeacher = () => {
        if (!newTeacherName.trim() || !newTeacherSurname.trim() || !newTeacherEmail.trim() || !newTeacherPhone.trim()) return;

        createTeacherMutation.mutate(
            {
                teacher_name: newTeacherName,
                teacher_surname: newTeacherSurname,
                teacher_email: newTeacherEmail,
                teacher_phone: newTeacherPhone,
                teacher_position: newTeacherPosition,
                teacher_Class: newTeacherClass,
            },
            {
                onSuccess: () => {
                    setNewTeacherName("");
                    setNewTeacherSurname("");
                    setNewTeacherEmail("");
                    setNewTeacherPhone("");
                    setNewTeacherPosition("");
                    setNewTeacherClass("");
                }
            }
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white/80 dark:bg-slate-800 rounded-lg shadow text-slate-900 dark:text-white">
            <h1 className="text-2xl font-semibold mb-4">Teacher List</h1>

            <ul className="space-y-3">
                {teachers?.map((teacher) => (
                    <li key={teacher.teacher_id} className="flex items-center justify-between gap-4 p-3 bg-white/40 dark:bg-slate-700/40 rounded">
                        <Link
                            className="text-blue-400 hover:underline"
                            to={"/teachers/$teacherId" as any}
                            params={{ teacherId: String(teacher.teacher_id) } as any}
                        >
                            {teacher.teacher_name} {teacher.teacher_surname}
                        </Link>

                        <button
                            className="bg-red-600 text-white px-3 py-1 rounded"
                            onClick={() => deleteTeacherMutation.mutate(teacher.teacher_id)}
                            disabled={deleteTeacherMutation.isPending}
                        >
                            {deleteTeacherMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    type="text"
                    placeholder="Name"
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                />

                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    type="text"
                    placeholder="Surname"
                    value={newTeacherSurname}
                    onChange={(e) => setNewTeacherSurname(e.target.value)}
                />

                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    type="email"
                    placeholder="Email"
                    value={newTeacherEmail}
                    onChange={(e) => setNewTeacherEmail(e.target.value)}
                />

                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    type="text"
                    placeholder="Phone"
                    value={newTeacherPhone}
                    onChange={(e) => setNewTeacherPhone(e.target.value)}
                />

                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    type="text"
                    placeholder="Position"
                    value={newTeacherPosition}
                    onChange={(e) => setNewTeacherPosition(e.target.value)}
                />

                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    type="text"
                    placeholder="Class"
                    value={newTeacherClass}
                    onChange={(e) => setNewTeacherClass(e.target.value)}
                />

                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={handleCreateTeacher}
                    disabled={createTeacherMutation.isPending}
                >
                    {createTeacherMutation.isPending ? "Creating..." : "Create Teacher"}
                </button>
            </div>
        </div>
    );
}
