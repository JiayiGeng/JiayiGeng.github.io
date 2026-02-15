'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface AboutProps {
    content: string;
    title?: string;
}

export default function About({ content, title = 'About' }: AboutProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <h2 className="text-[1.65rem] font-bold text-primary mb-2">{title}</h2>
            <div className="text-neutral-700 dark:text-neutral-600 leading-relaxed">
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => <h1 className="text-3xl font-bold text-primary mt-8 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-bold text-primary mt-8 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-semibold text-primary mt-6 mb-3">{children}</h3>,
                        p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 ml-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        a: ({ ...props }) => (
                            <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                            />
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
                                {children}
                            </blockquote>
                        ),
                        strong: ({ children }) => {
                            // **[School](url)** → <strong> contains <a> child → bold black link
                            // [**Prof.**](url) → <strong> inside <a> → bold, inherits green
                            const childArray = React.Children.toArray(children);
                            const hasLinkChild = childArray.some(child =>
                                React.isValidElement(child) && (child.props as Record<string, unknown>)?.href
                            );
                            if (hasLinkChild) {
                                return (
                                    <strong className="font-semibold">
                                        {childArray.map((child, i) => {
                                            if (React.isValidElement(child) && (child.props as Record<string, unknown>)?.href) {
                                                return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
                                                    key: i,
                                                    style: { color: 'var(--primary)' },
                                                    className: "font-semibold transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                                                });
                                            }
                                            return child;
                                        })}
                                    </strong>
                                );
                            }
                            return <strong className="font-semibold">{children}</strong>;
                        },
                        em: ({ children }) => <em className="italic text-neutral-600 dark:text-neutral-500">{children}</em>,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </motion.section>
    );
}
