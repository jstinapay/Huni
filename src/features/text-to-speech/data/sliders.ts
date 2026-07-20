interface Slider {
    id: "temperature" | "topP" | "topK" | "repetition_penalty";
    label: string;
    leftLabel: string;
    rightLabel: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
}

export const sliders: Slider[] = [
    {
        id: "temperature",
        label: "Creativity",
        leftLabel: "Consistent",
        rightLabel: "Expressive",
        min: 0,
        max: 2,
        step: 0.1,
        defaultValue: 0.8,
    },
    {
        id: "topP",
        label: "Voice Variety",
        leftLabel: "Stable",
        rightLabel: "Dynamic",
        min: 0,
        max: 1,
        step: 0.05,
        defaultValue: 0.95,
    },
    {
        id: "topK",
        label: "Voice Variety",
        leftLabel: "Stable",
        rightLabel: "Dynamic",
        min: 0,
        max: 1,
        step: 0.05,
        defaultValue: 0.95,
    },
    {
        id: "repetition_penalty",
        label: "Natural Flow",
        leftLabel: "Rhythmic",
        rightLabel: "Varied",
        min: 1,
        max: 2,
        step: 0.1,
        defaultValue: 1.2,
    },
    
];