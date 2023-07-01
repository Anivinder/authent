import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {

  const [isAuthenticating, setisAuthenticating]=useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({email, password}) {
    setisAuthenticating(true);
    try {
      const token = await login(email,password);
      authCtx.authenticate(token)
    } catch(error) {
      console.log('error is', error)
      Alert.alert('Authentication failed', 'Please check your credentials or try again later')
      setisAuthenticating(false);
    }
  }

  if(isAuthenticating){
    return <LoadingOverlay message="Logging in..."/>
  }
  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
