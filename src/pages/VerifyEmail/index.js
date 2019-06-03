import React, { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
// queries
import { verifyEmailMutation } from './query';
// utils
import { AuthToken } from '../../utils/authToken';
// prpviders
import { useCurrentUser } from '../../providers/CurrentUser';
import { useAlerts } from '../../providers/Alerts';
// components
import { PageLayout } from '../../components/PageLayout';
// elements
import { Heading } from '../../elements/Heading';

export const VerifyEmail = ({ match, history }) => {
  const { addAlert } = useAlerts();
  const { setCurrentUser } = useCurrentUser();
  const [verifyEmail] = useMutation(verifyEmailMutation());
  const { token } = match.params;

  const handleSuccess = useCallback(({ data }) => {
    if (data.verifyEmail.user) {
      AuthToken.set(data.verifyEmail.token);
      setCurrentUser(data.verifyEmail.user);
      addAlert({ type: 'success', message: 'Thanks! Your email address has been verified!' })
      return history.push('/');
    }
  }, [addAlert, history, setCurrentUser])

  const handleFailure = useCallback((err) => {
    history.push('/');
    // TODO: improve GraphQL error messages
    const message = err.message.split('GraphQL error:')[1];
    return addAlert({ type: 'danger', message })
  }, [addAlert, history])

  useEffect(() => {
    const handleVerification = async () => {
      await verifyEmail({
        variables: {
          input: {
            token
          }
        }
      }).then(handleSuccess).catch(handleFailure)
    }
    handleVerification();
  }, [handleFailure, handleSuccess, token, verifyEmail])


  return (
    <>
      <PageLayout.Header>
        <Heading>Verify Email</Heading>
      </PageLayout.Header>
      <PageLayout.Main />
    </>
  )
};
