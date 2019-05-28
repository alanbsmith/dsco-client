import React from 'react';
import { Link } from 'react-router-dom';

import { PageLayout } from '../components/PageLayout';
import { Heading } from '../elements/Heading';
import { Button } from '../elements/Button';
import { ButtonList } from '../elements/ButtonList';
import { Flexbox } from '../elements/Flex';
import { Label } from '../elements/Label';
import { TextField } from '../elements/TextField';
import { Form } from '../elements/Form';

export const Login = () => (
  <>
    <PageLayout.Header>
      <Heading>Login</Heading>
    </PageLayout.Header>
    <PageLayout.Main>
      <Form>
        <Label>email</Label>
        <TextField name="email" />
        <Label>password</Label>
        <Flexbox position="relative" flexDirection="column">
          <TextField type="password" name="password" />
          {/* <TextField.ErrorMessage>nope</TextField.ErrorMessage> */}
        </Flexbox>
        <ButtonList>
          <Button variant="ghost" as={Link} to="/signup">
            Signup
          </Button>
          <Button type="submit" variant="primary">Login</Button>
        </ButtonList>
      </Form>
    </PageLayout.Main>
  </>
);
