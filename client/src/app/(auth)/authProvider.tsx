import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';

import { Authenticator, components, Heading, Radio, RadioGroupField, useAuthenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { FormField } from '@/components/ui/form';
import { signIn } from 'aws-amplify/auth';
import { Form } from 'react-hook-form';
import { useRouter,usePathname } from 'next/navigation';

// Check if environment variables are set
const userPoolId = process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID;
const userPoolClientId = process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID;

if (!userPoolId || !userPoolClientId) {
  console.error('AWS Cognito User Pool configuration is missing. Please set the following environment variables:');
  console.error('NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID');
  console.error('NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID');
} else {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: userPoolId,
        userPoolClientId: userPoolClientId
      }
    }
  });
}

const component = {
  Header(){
    return (
      <View className="mt-4 mb-7">
        <Heading level={3} className="!text-2xl !font-bold">
          Home <span className="text-teal-600 font-bold">Quest</span>
        </Heading>
        <p className="text-muted-foreground mt-2">
            <span className='font-bold pr-1'>Welcome!</span> 
            <span>Please sing in to continue</span>
        </p>
      </View>
    )
  },
  SignIn: {
    Footer(){
      const { toSignUp } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Don&apos;t have an account? {""}
            <button
              className="text-teal-600 cursor-pointer hover:underline"
              onClick={toSignUp}
            >
              Sign up
            </button>
          </p>
      </View>
      );
    },
  },
  SignUp: {
    FormFields(){
       const { validationErrors } = useAuthenticator();
       return (
        <>
        
        <Authenticator.SignUp.FormFields />
         <RadioGroupField legend="Role" 
         name="custom:role"
         errorMessage={validationErrors?.["custom:role"]} 
         hasError={!!validationErrors?.["custom:role"]}
         isRequired>
          <Radio value="tenant">Tenant</Radio>
          <Radio value="landlord">Landlord</Radio>

         </RadioGroupField>
        </>
       )
    },
    Footer(){
      const { toSignIn } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Already have an account? {""}
            <button
              className="text-teal-600 cursor-pointer hover:underline"
              onClick={toSignIn}
            >
              Sign In
            </button>
          </p>
      </View>
      );
    }
  },
  
};

const formFields = {
  signIn: {
    username: {
      label: 'Email',
      placeholder: 'Enter your email address',
      isRequired: true,
    },
    password: {
      label: 'Password',
      placeholder: 'Enter your password',
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      label: 'Name',
      placeholder: 'Name as per your NID',
      isRequired: true,
    },
    phone_number: {
      order: 2,
      label: 'Phone Number',
      placeholder: '17XXXXXXXX',
      isRequired: true,
    },
    email: {
      order: 3,
      label: 'Email',
      placeholder: 'Enter your email address',
      isRequired: true,
    },
    password: {
      order: 4,
      label: 'Password',
      placeholder: 'Enter your password',
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      label: 'Confirm Password',
      placeholder: 'Re-enter your password',
      isRequired: true,
    },
  },
};

interface AuthenticatedContentProps {
  children: React.ReactNode;
  isAuthPage: boolean;
  isDashboardPage: boolean;
  pathname: string;
  router: ReturnType<typeof useRouter>;
}

const AuthenticatedContent: React.FC<AuthenticatedContentProps> = ({
  children,
  isAuthPage,
  isDashboardPage,
  pathname,
  router,
}) => {
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    if (user && isAuthPage) {
      router.push('/');
    }
  }, [user, isAuthPage, router]);

  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full">
      <Authenticator
        initialState={pathname.includes('signup') ? 'signUp' : 'signIn'}
        components={component}
        formFields={formFields}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  );
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = /^\/(signin|signup)$/.test(pathname);
  const isDashboardPage =
    pathname.startsWith('/landlords') ||
    pathname.startsWith('/tenants') ||
    pathname.startsWith('/admins');

  if (!userPoolId || !userPoolClientId) {
    if (isDashboardPage) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Authentication Not Configured
              </h2>
              <p className="text-gray-600 mb-4">
                AWS Cognito User Pool is not configured. Please set up the required environment variables.
              </p>
              <div className="text-left bg-gray-100 p-4 rounded-md">
                <p className="text-sm text-gray-700 mb-2">Required environment variables:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID</li>
                  <li>• NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <>{children}</>;
  }

  return (
    <AuthenticatedContent
      router={router}
      pathname={pathname}
      isAuthPage={isAuthPage}
      isDashboardPage={isDashboardPage}
    >
      {children}
    </AuthenticatedContent>
  );
};

export default Auth;