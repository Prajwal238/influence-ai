
import { useMemo } from 'react';
import { NegotiationThread } from '@/types/outreach';
import { useContactExtraction } from '@/hooks/useContactExtraction';

export const useContactExtractionForThreads = (threads: NegotiationThread[]) => {
  return useMemo(() => {
    return threads.map(thread => {
      // We need to call the hook for each thread - this is a limitation of React hooks
      // So we'll extract the logic instead
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
      const phoneRegex = /\b[6-9]\d{9}\b/g; // Indian mobile number pattern (10 digits starting with 6-9)

      let foundEmail: string | undefined;
      let foundPhone: string | undefined;

      // Only check messages from creators (influencers)
      const creatorMessages = thread.messages.filter(msg => msg.from === 'creator');

      for (const message of creatorMessages) {
        if (!foundEmail) {
          const emailMatch = message.content.match(emailRegex);
          if (emailMatch) {
            foundEmail = emailMatch[0];
          }
        }

        if (!foundPhone) {
          const phoneMatch = message.content.match(phoneRegex);
          if (phoneMatch) {
            foundPhone = phoneMatch[0];
          }
        }

        // Break early if we found both
        if (foundEmail && foundPhone) {
          break;
        }
      }

      return {
        ...thread,
        contact: {
          email: foundEmail,
          phone: foundPhone
        }
      };
    });
  }, [threads]);
};
