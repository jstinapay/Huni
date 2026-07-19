import { prisma } from "@/lib/db";

export default async function TestPage() {
    const voices = await prisma.voice.findMany();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">
                Voices: ({voices.length})
            </h1>
            <ul className="mt-4">
                {voices.map((voice) => (
                    <li key={voice.id}>
                        {voice.name} - {voice.variant} - {voice.language}
                    </li>
                ))}
            </ul>

        </div>
    )
}