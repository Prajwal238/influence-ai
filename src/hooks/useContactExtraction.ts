
import { useEffect, useState } from 'react';
import { NegotiationMessage } from '@/types/outreach';

interface ExtractedContact {
  email?: string;
  phone?: string;
}

export const useContactExtraction = (messages: NegotiationMessage[]): ExtractedContact => {
  const [extractedContact, setExtractedContact] = useState<ExtractedContact>({});

  useEffect(() => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const phoneRegex = /\b[6-9]\d{9}\b/g; // Indian mobile number pattern (10 digits starting with 6-9)

    let foundEmail: string | undefined;
    let foundPhone: string | undefined;

    // Only check messages from creators (influencers)
    const creatorMessages = messages.filter(msg => msg.from === 'creator');

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

    setExtractedContact({
      email: foundEmail,
      phone: foundPhone
    });
  }, [messages]);

  return extractedContact;
};
