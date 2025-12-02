import { Route } from "@/routes/subject/subjects";
import { useCreateSubject, useDeleteSubject } from "@/features/subject/api";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Subject } from "../types";

export function SubjectListPage(): React.ReactElement {
    //const subjectsData = Route.useLoaderData() as unknown;
    // Defensive: loader may return a single object or something unexpected.
    const subjects = Route.useLoaderData() as Subject[];
    const createSubjectMutation = useCreateSubject();
    const deleteSubjectMutation = useDeleteSubject();
    const [newSubjectName, setNewSubjectName] = useState<string>("");

    const handleCreateSubject = () => {
        if (newSubjectName.trim() === "") return;
        createSubjectMutation.mutate({ subject_name: newSubjectName }, {
            onSuccess: () => {
                setNewSubjectName("");
            }
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white/80 dark:bg-slate-800 rounded-lg shadow text-slate-900 dark:text-white">
            <h1 className="text-2xl font-semibold mb-4">Subject List</h1>
            <ul className="space-y-3">
                {subjects?.map((subject: Subject) => (
                    <li key={subject.subject_name} className="flex items-center justify-between gap-3 p-3 bg-white/40 dark:bg-slate-700/40 rounded">
                        <Link className="text-blue-400 hover:underline" to={'/subject/$subjectName' as any} params={{ subjectName: String(subject.subject_name) } as any}>
                            {subject.subject_name}
                        </Link>
                        <button
                            className="bg-red-600 text-white px-3 py-1 rounded"
                            onClick={() => deleteSubjectMutation.mutate(subject.subject_name)}
                            disabled={deleteSubjectMutation.isPending}
                        >
                            {deleteSubjectMutation.isPending ? " Deleting..." : " Delete"}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-6">
                <h2 className="text-lg font-medium mb-2">Create New Subject</h2>
                <div className="flex gap-2">
                    <input
                        className="border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white flex-1"
                        type="text"
                        placeholder="Subject Name"
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                    />
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={handleCreateSubject}
                        disabled={createSubjectMutation.isPending}
                    >
                        {createSubjectMutation.isPending ? " Creating..." : " Create Subject"}
                    </button>
                </div>
            </div>
        </div>
    );
}