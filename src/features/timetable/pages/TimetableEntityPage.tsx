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

    if (!timetable) return <p>Loading timetable entry...</p>;

    return (
        <div style={{ padding: 20 }}>
            <h1>Timetable Entry Details</h1>

            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Class:
                        <input
                            type="text"
                            name="class_name"
                            value={formData.class_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Subject:
                        <input
                            type="text"
                            name="subject_name"
                            value={formData.subject_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Teacher ID:
                        <input
                            type="number"
                            name="teacher_id"
                            value={formData.teacher_id}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Day of Week:
                        <input
                            type="text"
                            name="day_of_week"
                            value={formData.time_day_of_week}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Time:
                        <input
                            type="time"
                            name="time_time"
                            value={formData.time_time}
                            onChange={handleChange}
                        />
                    </label>

                    <button type="submit" disabled={updateMutation.isPending}>
                        {updateMutation.isPending ? "Saving..." : "Save"}
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </form>
            ) : (
                <div>
                    <p><strong>ID:</strong> {timetable.time_id}</p>
                    <p><strong>Class:</strong> {timetable.time_Class.class_name}</p>
                    <p><strong>Subject:</strong> {timetable.time_Subject_name.subject_name}</p>
                    <p>
                        <strong>Teacher:</strong> {timetable.time_Teacher_id.teacher_surname}{" "}
                        {timetable.time_Teacher_id.teacher_name}
                    </p>
                    <p><strong>Day:</strong> {timetable.time_day_of_week}</p>
                    <p><strong>Time:</strong> {timetable.time_time}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}
