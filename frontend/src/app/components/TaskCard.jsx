"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";


export const TaskCard = ({ id, title, description, done }) => {
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const onNewTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const onNewDescriptionChange = (event) => {
        setNewDescription(event.target.value)
    }

    const onDeleteTask = async (id) => {
        if (window.confirm("Quieres eliminar la tarea?")) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`, {
                method: "DELETE",
            })
            if (res.status === 204) {
                router.refresh()
            }
        }
    }

    const onDoneTask = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`, {
            method: "POST",
        })
        if (res.status === 200) {
            router.refresh()
        }
    }

    const onUpdateTask = async(id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,{
            method: "PUT",
            body: JSON.stringify({title: newTitle, description: newDescription}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        setEdit(false);
        console.log(data);
    }

    return (
        <div key={id} className="bg-slate-500 px-4 py-3 mb-2 rounded-md flex justify-between">
            <div>
                {
                    !edit ? (
                        <>
                            <h3>{newTitle}</h3>
                            {done && <span>✅</span>}
                            <p>
                                {newDescription}
                            </p>
                        </>
                    )
                        :
                        (
                            <>
                                <input type="text" placeholder={title} className="mb-3 text-black" onChange={onNewTitleChange} />
                                <textarea className="text-black" placeholder={description} onChange={onNewDescriptionChange}></textarea>
                            </>
                        )

                }
            </div>

            <div className="flex justify-between gap-x-2">
                {edit && 
                
                    <button className="bg-green-500 ml-2" onClick={() => onUpdateTask(id)}>Guardar</button>
                }
                <button
                    className="bg-red-500 text-white rounded-md p-2"
                    onClick={() => onDoneTask(id)}
                >{done ? 'Desmarcar' : 'Marcar'}</button>
                <button
                    className="bg-red-500 text-white rounded-md p-2"
                    onClick={() => onDeleteTask(id)}
                >Eliminar</button>
                <button className="bg-indigo-500 text-white rounded-md p-2" onClick={() => setEdit(!edit)}>Actualizar</button>
            </div>
        </div>
    )
}
