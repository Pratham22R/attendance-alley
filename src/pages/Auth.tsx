
import { AuthForm } from '@/components/AuthForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <Button
        variant="ghost"
        className="absolute top-4 left-4"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>
      <div className="flex items-center justify-center h-full">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
