import { Login } from '@hd/components';
import { GoogleCaptchaProvider } from '@hd/Providers';

export default function LoginPage() {
  return (
    <div className="flex align-center justify-center">
      <GoogleCaptchaProvider>
        <Login />
      </GoogleCaptchaProvider>
    </div>
  );
}
