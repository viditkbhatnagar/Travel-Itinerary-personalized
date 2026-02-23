'use client';

import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TypingIndicator } from './typing-indicator';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === 'user';

  // Strip itinerary trigger tags from display
  const displayContent = content
    .replace(/\[GENERATE_ITINERARY\][\s\S]*?\[\/GENERATE_ITINERARY\]/g, '')
    .trim();

  if (!displayContent && isStreaming) {
    return (
      <div className="flex gap-3 px-4 py-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
          <Bot className="h-4 w-4" />
        </div>
        <TypingIndicator />
      </div>
    );
  }

  if (!displayContent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex gap-3 px-4 py-2',
        isUser && 'flex-row-reverse'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-orange/10 text-orange'
            : 'bg-forest/10 text-forest'
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Bubble */}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'neu-raised bg-orange-50 text-midnight'
            : 'neu-raised bg-white text-midnight'
        )}
      >
        <MessageContent content={displayContent} />
        {isStreaming && (
          <span className="inline-block h-4 w-0.5 animate-pulse bg-forest ml-0.5" />
        )}
      </div>
    </motion.div>
  );
}

// ── Render message with react-markdown ───────────────────────

const MessageContent = memo(function MessageContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h3 className="text-base font-semibold text-midnight mt-2 mb-1">{children}</h3>
        ),
        h2: ({ children }) => (
          <h4 className="text-sm font-semibold text-midnight mt-2 mb-1">{children}</h4>
        ),
        h3: ({ children }) => (
          <h5 className="text-sm font-semibold text-midnight mt-1.5 mb-0.5">{children}</h5>
        ),
        p: ({ children }) => (
          <p className="mb-1.5 last:mb-0">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-midnight">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-stone">{children}</em>
        ),
        ul: ({ children }) => (
          <ul className="space-y-1 my-1.5">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="space-y-1 my-1.5 list-decimal pl-4">{children}</ol>
        ),
        li: ({ children, ...props }) => {
          // Check if parent is an ordered list by looking for the `ordered` prop
          const isOrdered = (props as Record<string, unknown>).ordered;
          if (isOrdered) {
            return <li className="pl-1">{children}</li>;
          }
          return (
            <li className="flex gap-1.5 items-start list-none">
              <span className="text-forest shrink-0 mt-0.5 text-xs">&#9679;</span>
              <span className="flex-1">{children}</span>
            </li>
          );
        },
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest underline underline-offset-2 hover:text-forest/80"
          >
            {children}
          </a>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes('language-');
          if (isBlock) {
            return (
              <code className="block bg-midnight/5 rounded-lg p-2.5 my-1.5 text-xs font-mono overflow-x-auto">
                {children}
              </code>
            );
          }
          return (
            <code className="bg-midnight/5 rounded px-1 py-0.5 text-xs font-mono">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="my-1.5">{children}</pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-forest/30 pl-3 my-1.5 text-stone italic">
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr className="border-midnight/10 my-2" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
});
