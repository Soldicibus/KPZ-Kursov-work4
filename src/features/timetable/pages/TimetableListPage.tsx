import { Route } from "@/routes/timetable/timetable";
import { useCreateTimetableEntry, useDeleteTimetableEntry } from "@/features/timetable/api";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Timetable } from "../types";
import { timetableSchema } from "../scheme";

export function TimetableListPage(): React.ReactElement {
    const timetable = Route.useLoaderData() as Timetable[];
    const createTimetableMutation = useCreateTimetableEntry();
    const deleteTimetableMutation = useDeleteTimetableEntry();

    const [newDayOfWeek, setNewDayOfWeek] = useState("");
    const [newTime, setNewTime] = useState("");
    const [newSubjectName, setNewSubjectName] = useState("");
    const [newTeacherId, setNewTeacherId] = useState(0);
    const [newClassName, setNewClassName] = useState("");

    const handleCreateTimetableEntry = () => {
        const formData = {
            time_day_of_week: newDayOfWeek,
            time_time: newTime,
            subject_name: newSubjectName,
            teacher_id: newTeacherId,
            class_name: newClassName,
        };

        // Validate with Zod
        const parseResult = timetableSchema.safeParse(formData);

        if (!parseResult.success) {
            console.error(parseResult.error.format());
            return;
        }

        createTimetableMutation.mutate(parseResult.data, {
            onSuccess: () => {
                setNewDayOfWeek("");
                setNewTime("");
                setNewSubjectName("");
                setNewTeacherId(0);
                setNewClassName("");
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white/80 dark:bg-slate-800 rounded-lg shadow text-slate-900 dark:text-white">
            <h1 className="text-2xl font-semibold mb-4">Timetable List</h1>
            <ul className="space-y-3">
                {timetable?.map((entry) => (
                    <li key={entry.time_id} className="flex items-center justify-between gap-4 p-3 bg-white/40 dark:bg-slate-700/40 rounded">
                            <Link
                                className="text-sm text-blue-400 hover:underline"
                            to={'/timetable/$timetableId' as any}
                            params={{ timetableId: String(entry.time_id) } as any}
                        >
                            {entry.time_day_of_week} - {entry.time_time} - {entry.time_Subject_name.subject_name} - Teacher: {entry.time_Teacher_id.teacher_surname} {entry.time_Teacher_id.teacher_name} - Class: {entry.time_Class.class_name}
                        </Link>

                        <button
                            className="ml-4 bg-red-600 text-white px-3 py-1 rounded"
                            onClick={() => deleteTimetableMutation.mutate(entry.time_id)}
                            disabled={deleteTimetableMutation.isPending}
                        >
                            {deleteTimetableMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    type="text"
                    placeholder="Day of Week"
                    value={newDayOfWeek}
                    onChange={(e) => setNewDayOfWeek(e.target.value)}
                />
                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    type="text"
                    placeholder="Time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                />
                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    type="text"
                    placeholder="Subject Name"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                />
                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    type="number"
                    placeholder="Teacher ID"
                    value={newTeacherId}
                    onChange={(e) => setNewTeacherId(Number(e.target.value))}
                />
                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    type="text"
                    placeholder="Class Name"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                />
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={handleCreateTimetableEntry}
                    disabled={createTimetableMutation.isPending}
                >
                    {createTimetableMutation.isPending ? " Creating..." : " Create Timetable Entry"}
                </button>
            </div>
        </div>
    );
}