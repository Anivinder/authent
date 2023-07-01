import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setisAuthenticating]=useState(false);

  const authctx = useContext(AuthContext);

  async function signUpHandler({email, password}) {
    setisAuthenticating(true);
    try {
      const token = await createUser(email,password);
      authctx.authenticate(token)
    } catch (error) {
      console.log(error,'--');
      Alert.alert('Authentication failed ', 'Please check your input and try again later')
    }
    setisAuthenticating(false);
  }

  if(isAuthenticating){
    return <LoadingOverlay message="Creating user..."/>
  }


  return <AuthContent onAuthenticate = { signUpHandler }/>;
}

export default SignupScreen;
