import { useState, useEffect } from "react";
import type { Timetable, TimetableInput } from "../types";
import { Route } from "@/routes/timetable/$timetableId";
import { useUpdateTimetableEntry } from "../api";

export function TimetableEntityPage(): React.ReactElement {
    // Load timetable from the route
    const timetableDataRaw = Route.useLoaderData() as Timetable | Timetable[] | undefined;

    const timetable = Array.isArray(timetableDataRaw)
        ? timetableDataRaw[0]
        : timetableDataRaw;

    const updateMutation = useUpdateTimetableEntry();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState<TimetableInput>({
        class_name: "",
        subject_name: "",
        teacher_id: 0,
        time_day_of_week: "",
        time_time: "",
    });

    // Initialize form when timetable data is loaded
    useEffect(() => {
        if (!timetable) return;
        setFormData({
            class_name: timetable.time_Class.class_name,
            subject_name: timetable.time_Subject_name.subject_name,
            teacher_id: timetable.time_Teacher_id.teacher_id,
            time_day_of_week: timetable.time_day_of_week,
            time_time: timetable.time_time,
        });
    }, [timetable]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "teacher_id" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!timetable) return;

        updateMutation.mutate(
            {
                id: timetable.time_id,
                data: {
                    class_name: formData.class_name,
                    subject_name: formData.subject_name,
                    teacher_id: formData.teacher_id,
                    time_day_of_week: formData.time_day_of_week,
                    time_time: formData.time_time,
                },
            },
            {
                onSuccess: () => setIsEditing(false),
            }
        );
    };

    if (!timetable) return <p className="text-center py-6">Loading timetable entry...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white/80 dark:bg-slate-800 rounded-lg shadow text-slate-900 dark:text-white">
            <h1 className="text-2xl font-semibold mb-4">Timetable Entry Details</h1>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <div className="text-sm font-medium mb-1">Class</div>
                        <input
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            type="text"
                            name="class_name"
                            value={formData.class_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block">
                        <div className="text-sm font-medium mb-1">Subject</div>
                        <input
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            type="text"
                            name="subject_name"
                            value={formData.subject_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block">
                        <div className="text-sm font-medium mb-1">Teacher ID</div>
                        <input
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            type="number"
                            name="teacher_id"
                            value={formData.teacher_id}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block">
                        <div className="text-sm font-medium mb-1">Day of Week</div>
                        <input
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            type="text"
                            name="day_of_week"
                            value={formData.time_day_of_week}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block">
                        <div className="text-sm font-medium mb-1">Time</div>
                        <input
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            type="time"
                            name="time_time"
                            value={formData.time_time}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="flex gap-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" disabled={updateMutation.isPending}>
                            {updateMutation.isPending ? "Saving..." : "Save"}
                        </button>
                        <button className="bg-gray-200 px-4 py-2 rounded" type="button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-2">
                    <p><strong>ID:</strong> {timetable.time_id}</p>
                    <p><strong>Class:</strong> {timetable.time_Class.class_name}</p>
                    <p><strong>Subject:</strong> {timetable.time_Subject_name.subject_name}</p>
                    <p>
                        <strong>Teacher:</strong> {timetable.time_Teacher_id.teacher_surname} {timetable.time_Teacher_id.teacher_name}
                    </p>
                    <p><strong>Day:</strong> {timetable.time_day_of_week}</p>
                    <p><strong>Time:</strong> {timetable.time_time}</p>
                    <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}
