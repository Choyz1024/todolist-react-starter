import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import {
  AuthButton,
  AuthContainer,
  AuthInputContainer,
  AuthLinkText,
} from 'components/common/auth.styled';

const LoginPage = () => {
  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput />
      </AuthInputContainer>
      <AuthButton>登入</AuthButton>
      <AuthLinkText>註冊</AuthLinkText>
    </AuthContainer>
  );
};

export default LoginPage;
