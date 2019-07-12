import React, { useState } from 'react';
import moment from 'moment';

import { useEvents } from '../../providers/Events';
import { useMembers } from '../../providers/Members';

import { PageLayout } from '../../components/PageLayout';
import { RightDrawer } from '../../components/RightDrawer';
import { CreateEventForm } from './CreateEventForm';
import { UpdateEventForm } from './UpdateEventForm';

import { Divider } from '../../elements/Divider';
import { Heading } from '../../elements/Heading';
import { Text } from '../../elements/Text';
import { Box } from '../../elements/Box';
import { Button } from '../../elements/Button';

export function Organizers() {
  const { members } = useMembers();
  const { events } = useEvents();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [nextEvent, ...rest] = events;

  function renderNextEvent() {
    if (moment(nextEvent.endTime).isBefore()) {
      return (
        <Box>
          <Box flex={1}>
            <Heading as="h2">No Upcoming Events</Heading>
          </Box>
          <Box>
            <Button size="small" onClick={() => setIsCreateModalOpen(!isCreateModalOpen)}>Create Event</Button>
          </Box>
        </Box>
      )
    }
    return (
      <>
        <Box>
          <Box flex={1}>
            <Heading as="h2">Upcoming Event</Heading>
          </Box>
          <Box>
            <Button size="small" onClick={() => setIsUpdateModalOpen(!isUpdateModalOpen)}>Update Event</Button>
          </Box>
        </Box>
        <Box flex={1} flexDirection="column">
          <Heading as="h3">Event</Heading>
          <Text>{nextEvent.name}</Text>
          <Heading as="h3">Details</Heading>
          <Text>{nextEvent.details}</Text>
          <Heading as="h3">Attendees</Heading>
          {nextEvent.attendees.map((a, i) => (
            <Text key={i}>{a.user.fullName}</Text>
          ))}
        </Box>
      </>
    )
  }
  if (!nextEvent) {
    return null;
  }
  return (
    <>
      <RightDrawer title="Create Event" isOpen={isCreateModalOpen} handleClose={() => setIsCreateModalOpen(false)}>
        <CreateEventForm closeModal={() => setIsCreateModalOpen(false)} />
      </RightDrawer>
      <RightDrawer title="Update Event" isOpen={isUpdateModalOpen} handleClose={() => setIsUpdateModalOpen(false)}>
        <UpdateEventForm event={nextEvent} closeModal={() => setIsUpdateModalOpen(false)} />
      </RightDrawer>
      <PageLayout.Header>
        <h1>Dashboard</h1>
      </PageLayout.Header>
      <PageLayout.Main>
        {renderNextEvent()}
        <Divider />
        <Heading as="h2">Members</Heading>
        <table>
          <thead>
            <tr>
              <th><Text fontSize="sm">name</Text></th>
              <th><Text fontSize="sm">verified email</Text></th>
              <th><Text fontSize="sm">organizer</Text></th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.id}>
                <td>{m.user.fullName}</td>
                <td>{m.user.hasVerifiedEmail ? 'yes' : 'no'}</td>
                <td>
                  {m.isOrganizer ? 'yes' : 'no'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageLayout.Main>
    </>
  );
}