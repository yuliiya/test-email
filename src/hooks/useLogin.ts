import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { exchangeCodeForTokens } from 'src/api/auth/queries.ts';
import { ROUTES } from 'src/routes/constants.ts';

const SCOPE = 'https://mail.google.com';

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || ROUTES.HOME;

  const { mutateAsync } = useMutation({
    mutationFn: exchangeCodeForTokens,
    onSuccess: () => {
      navigate(from);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleLoginSuccess = async (response: CodeResponse) => {
    const { code } = response;
    await mutateAsync(code);
  };

  const login = useGoogleLogin({
    scope: SCOPE,
    flow: 'auth-code',
    onSuccess: handleLoginSuccess,
    onError: (error) => {
      console.error(error);
    },
  });

  return { login };
};
