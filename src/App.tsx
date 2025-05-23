import { GoogleLogin, GoogleOAuthProvider, type CredentialResponse } from '@react-oauth/google'
import { useRef, useState } from 'react';
import { ClipboardCopy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { toast } from 'sonner';

function App() {

  const [credentials, setCredentials] = useState<CredentialResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onSuccess = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    setCredentials(credentialResponse);
  }

  const onError = () => {
    setError('Login Failed');
  }

  const copyToClipboard = () => {
    if (contentRef.current) {
      navigator.clipboard.writeText(contentRef.current.textContent || '');
      toast.success('Copied to clipboard');
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin onSuccess={onSuccess} onError={onError} />
      </GoogleOAuthProvider>

      {credentials &&
        (
          <Card className='mt-4 max-w-200 relative'>
            <CardHeader className='flex justify-between'>
              <CardTitle className='text-lg'>Credentials</CardTitle>
              <ClipboardCopy onClick={copyToClipboard} className='absolute right-4 top-4 cursor-pointer hover:scale-120' />
            </CardHeader>
            <CardContent ref={contentRef} className='break-words'>
              {credentials &&
                credentials.credential
              }
            </CardContent>
          </Card>
        )
      }
      {error && <p>{error}</p>}
    </div>
  )
}

export default App
