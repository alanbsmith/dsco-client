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

export const Signup = () => (
  <>
    <PageLayout.Header>
      <Heading>Signup</Heading>
    </PageLayout.Header>
    <PageLayout.Main>
      <Form>
        <Flexbox>
          <Flexbox flexDirection="column" flex={1} mr={2}>
        <Label>first name</Label>
        <TextField name="firstName" />
        </Flexbox>
        <Flexbox flexDirection="column" flex={1} ml={2}>
        <Label>last name</Label>
        <TextField name="lastName" />
        </Flexbox>
        </Flexbox>
        <Label>email</Label>
        <TextField name="email" />
        <Label>phone</Label>
        <TextField name="phone" />
        <Label>password</Label>
        <Flexbox position="relative" flexDirection="column">
          <TextField type="password" name="password" />
          {/* <TextField.ErrorMessage>nope</TextField.ErrorMessage> */}
        </Flexbox>
        <Label>confirm password</Label>
        <Flexbox position="relative" flexDirection="column">
          <TextField type="password" name="passwordConfirm" />
          {/* <TextField.ErrorMessage>nope</TextField.ErrorMessage> */}
        </Flexbox>
        <ButtonList>
          <Button variant="ghost" as={Link} to="/login">
            Login
          </Button>
          <Button type="submit" variant="primary">Signup</Button>
        </ButtonList>
      </Form>
    </PageLayout.Main>
  </>
);
