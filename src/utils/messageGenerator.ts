
export const generateTextMessage = (selectedPlatform: string): string => {
  return `Hi {name},

I hope this message finds you well! I'm reaching out on behalf of our Summer Fashion 2024 campaign. We've been following your amazing content in the ${selectedPlatform === 'instagram' ? 'fashion' : 'lifestyle'} space and would love to collaborate with you.

Our campaign focuses on sustainable summer fashion, and we believe your authentic voice and engaged audience would be a perfect fit for our brand values.

Would you be interested in discussing a potential partnership? We'd love to share more details about the collaboration and compensation.

Looking forward to hearing from you!

Best regards,
Campaign Team`;
};

export const generateVoiceMessage = (selectedPlatform: string): string => {
  return `Hi {name}!

I hope you're doing amazing! I'm reaching out about an exciting collaboration opportunity with our Summer Fashion 2024 campaign.

We've been following your incredible content in the ${selectedPlatform === 'instagram' ? 'fashion' : 'lifestyle'} space, and we absolutely love your authentic style and the way you connect with your audience.

Our campaign is all about sustainable summer fashion, and we believe your voice and values align perfectly with what we're trying to achieve.

Would you be interested in chatting about a potential partnership? We'd love to share more details about the collaboration and of course, discuss compensation that reflects your amazing work.

Looking forward to hearing from you soon!

Best regards,
The Campaign Team`;
};
