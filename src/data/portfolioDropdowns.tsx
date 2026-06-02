import { useState } from 'react';

export type PortfolioDropdown = {
    title: string;
    subtitle: string;
    date: string;
    location?: string;
    description: string;
    bullets: string[];
    tech: string[];
};

type PortfolioDropdownsProps = {
    dropdowns: PortfolioDropdown[];
};

export function PortfolioDropdowns({ dropdowns }: PortfolioDropdownsProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-3">
            {dropdowns.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                    <div
                        key={`${item.title}-${item.subtitle}`}
                        className="overflow-hidden rounded-2xl border border-white/15 bg-white/8 shadow-sm"
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-white/10"
                        >
                            <div>
                                <h3 className="text-sm font-semibold text-white">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-white/65">
                                    {item.subtitle} • {item.date}
                                    {item.location ? ` • ${item.location}` : ''}
                                </p>
                            </div>

                            <span className="shrink-0 text-lg text-white/70">
                                {isOpen ? '−' : '+'}
                            </span>
                        </button>

                        {isOpen && (
                            <div className="border-t border-white/10 px-4 pb-4 pt-3">
                                <p className="mb-3 text-sm leading-relaxed text-white/80">
                                    {item.description}
                                </p>

                                <ul className="mb-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/75">
                                    {item.bullets.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2">
                                    {item.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/75"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}