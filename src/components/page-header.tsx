import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function PageHeader({
    title,
    className,
}: {
    title: string;
    className?: string;
}) {
    return (
        <div className={cn(
            "flex items-center justify-between border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-sm",
            className,
        )}
        >

            <div className="flex items-center gap-2">
                <SidebarTrigger className="size-8 rounded-lg text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground" />
                <h1 className="text-base font-semibold tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
                <Link href="mailto:justin_custodio@dlsu.edu.ph">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                        <ThumbsUp className="size-4" />
                        <span className="hidden lg:block">Feedback</span>
                    </Button>
                </Link>
                <Link href="mailto:justin_custodio@dlsu.edu.ph">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                        <Headphones className="size-4" />
                        <span className="hidden lg:block">Need help?</span>
                    </Button>
                </Link>
            </div>

        </div>
    );
}