'use client'

import { useState } from "react";
import { useRouter } from "next/navigation"

export const FormTask = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter()

    const onTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const onDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,{
            method: "POST",
            body: JSON.stringify({title, description}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()
        console.log(data);
        router.refresh();
        setTitle('')
        setDescription('')
    }

    return (
        <div>

            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    className="bg-slate-400 rounded-md p-2 w-full mb-2 block"
                    id="title"
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    className="bg-slate-400 rounded-md p-2 w-full mb-2 block"
                    id="description"
                    value={description}
                    onChange={onDescriptionChange}
                ></textarea>

                <button>Save</button>
            </form>

        </div>
    )
}
