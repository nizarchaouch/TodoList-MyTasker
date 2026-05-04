import { useEffect } from "react";

type DeltTaskProps = {
    nameTask: string;
    onCancel: () => void;
    onDelete: () => void;
};


export default function DeltTask({nameTask, onCancel, onDelete }: DeltTaskProps) {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        }
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm overflow-hidden transition-opacity duration-500">
            <div className="w-full max-w-md rounded-xl border border-gray-400 bg-white p-6 shadow-lg">
                <h1 className="text-2xl font-black text-card-foreground">
                    Delete Task?
                </h1>
                <p className="mt-3 leading-7 text-gray-600">
                    This will permanently remove “{nameTask}” from your list.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2" >
                    <button onClick={onCancel} className="cursor-pointer outline outline-1 outline-gray-500 font-black py-2 px-4 rounded-md mr-2">
                        Cancel
                    </button>
                    <button onClick={onDelete} className="cursor-pointer bg-red-500 font-black text-white py-2 px-4 rounded-md">
                        Delete
                    </button>
                </div>
            </div>
        </div>

    );
}