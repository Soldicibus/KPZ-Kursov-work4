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
        <div>
            <h1>Subject List</h1>
            <ul>
                {subjects?.map((subject: Subject) => (
                    <li key={subject.subject_name}>
                        <Link to={'/subject/$subjectName' as any} params={{ subjectName: String(subject.subject_name) } as any}>
                            {subject.subject_name}
                        </Link>
                        <button
                            onClick={() => deleteSubjectMutation.mutate(subject.subject_name)}
                            disabled={deleteSubjectMutation.isPending}
                        >
                            {deleteSubjectMutation.isPending ? " Deleting..." : " Delete"}
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Create New Subject</h2>
                <input
                    type="text"
                    placeholder="Subject Name"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                />
                <button
                    onClick={handleCreateSubject}
                    disabled={createSubjectMutation.isPending}
                >
                    {createSubjectMutation.isPending ? " Creating..." : " Create Subject"}
                </button>
            </div>
        </div>
    );
}