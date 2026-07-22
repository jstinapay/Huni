"use client"

import { useStore } from "@tanstack/react-form";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { useTypedAppFormContext } from "@/hooks/use-app-form";

import { sliders } from "../data/sliders";
import { ttsFormOptions } from "./text-to-speech-form";

export function SettingsPanelSettings() {
    const form = useTypedAppFormContext(ttsFormOptions);
    const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

    return (
        <>
            <div className="border-b border-dashed p-4">
                <p className="text-sm text-muted-foreground">
                    Voice selector coming soon
                </p>
            </div>
            <div className="p-4 flex-1">
                <FieldGroup className="gap-8">
                    {sliders.map((slider) => (
                        <form.Field key={slider.id} name={slider.id}>
                            {(field) => (
                                <Field>
                                    <FieldLabel>{slider.label}</FieldLabel>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            {slider.leftLabel}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {slider.rightLabel}
                                        </span>
                                    </div>
                                    <Slider
                                        value={[field.state.value]}
                                        onValueChange={(value) =>
                                            field.handleChange(Array.isArray(value) ? value[0] : value)
                                        }
                                        min={slider.min}
                                        max={slider.max}
                                        step={slider.step}
                                        disabled={isSubmitting}
                                        className="**:data-[slot=slider-track]:h-1.5 **:data-[slot=slider-track]:rounded-full **:data-[slot=slider-range]:bg-primary/60 **:data-[slot=slider-thumb]:size-3.5 **:data-[slot=slider-thumb]:border-2 **:data-[slot=slider-thumb]:border-primary **:data-[slot=slider-thumb]:bg-background **:data-[slot=slider-thumb]:shadow-sm"
                                    />
                                </Field>
                            )}
                        </form.Field>
                    ))}
                </FieldGroup>
            </div>
        </>
    )
}
