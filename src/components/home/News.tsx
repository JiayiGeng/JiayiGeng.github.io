'use client';

import { motion } from 'framer-motion';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

function renderMarkdownContent(text: string) {
    // Split on both image syntax ![alt](src) and link syntax [text](url)
    const parts = text.split(/(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
        // Check for image: ![alt](src)
        const imgMatch = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imgMatch) {
            return (
                <img
                    key={i}
                    src={imgMatch[2]}
                    alt={imgMatch[1]}
                    className="inline-block h-[18px] w-[18px] object-contain align-text-bottom mr-0.5 rounded-sm"
                />
            );
        }
        // Check for link: [text](url)
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
            return (
                <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    {linkMatch[1]}
                </a>
            );
        }
        return <span key={i}>{part}</span>;
    });
}

export default function News({ items, title = 'News' }: NewsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-[1.65rem] font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <span className="text-sm text-neutral-500 mt-0.5 w-20 flex-shrink-0">{item.date}</span>
                        <p className="text-base text-neutral-700">{renderMarkdownContent(item.content)}</p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
