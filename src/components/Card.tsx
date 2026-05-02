type CardProps = {
    name: string;
    number: string
    color: string;
};

export default function Card({ name, number, color }: CardProps) {
    return (
        <div className="w-full max-w-sm p-4 bg-white/40 flex flex-col gap-2 rounded-xl shadow-xl border border-gray-300 transition-transform hover:-translate-y-1">
            <p className={`text-3xl font-black ${color}`}>{number}</p>
            <h2 className="text-md text-gray-500 font-bold mb-2">{name}</h2>
        </div>
    );
}
