
import { buildApiUrl } from '@/config/api';

export const getGoogleOAuthUrl = () => {
  return buildApiUrl('/api/auth/google');
};
