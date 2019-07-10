import React from 'react';
import moment from 'moment';
// providers
import { useEvents } from '../../providers/Events';
import { useCurrentUser } from '../../providers/CurrentUser';

import { Box } from '../../elements/Box';
import { Button } from '../../elements/Button';
import { ButtonLink } from '../../elements/ButtonLink';
import { Divider } from '../../elements/Divider';
import { ExternalLink } from '../../elements/ExternalLink';
import { Heading } from '../../elements/Heading';
import { Link } from '../../elements/Link';
import { Text } from '../../elements/Text';

export function Events() {
  const { events } = useEvents();
  const [nextEvent, ...rest] = events;
  return (
    <React.Fragment>
      <NextUpcomingEvent nextEvent={nextEvent} />
      <PastEvents events={rest} />
    </React.Fragment>
  )
}

function NextUpcomingEvent({ nextEvent, loading }) {
  const { currentUser } = useCurrentUser();
  const { eventService, eventsLoading } = useEvents();
  if (!nextEvent) {
    return null;
  }

  function renderAttendeesText(attendees) {
    const headCount = attendees.reduce((sum, attendee) => {
      if (attendee.hasDeclined) {
        return sum
      }
      return sum + 1;
    }, 0)

    if (headCount < 2) {
      return null;
    }
    return <Text fontWeight="bold" fontSize="sm">{headCount} attending</Text>;
  }

  function handleAddAttendee(eventId) {
    return eventService.addAttendee({ eventId, userId: currentUser.id })
  }

  function handleRemoveAttendee({ eventId, userId }) {
    return eventService.removeAttendee({ eventId, userId })
  }

  function renderRsvpButton(ev) {
    if (moment(ev.endTime).isBefore()) {
      return null;
    }

    const attendee = ev.attendees.find((attendee) => attendee.userId === currentUser.id);
    if (attendee && !attendee.hasDeclined) {
      return (
        <ButtonLink
          disabled={eventsLoading}
          variant="danger"
          onClick={() => handleRemoveAttendee(attendee)}
        >
          Remove RSVP
        </ButtonLink>
      );
    }
    return (
      <Button
        disabled={eventsLoading}
        variant="primary"
        onClick={() => handleAddAttendee(ev.id)}
      >
        Attend
      </Button>
    )
  }


  const formattedStartTime = moment(nextEvent.startTime).format('MMM');
  const formattedEndTime = moment(nextEvent.startTime).format('DD');
  const formattedDuration = `${moment(nextEvent.startTime).format('h:mm')} - ${moment(nextEvent.endTime).format('h:mma')}`;

  return (
    <React.Fragment>
      <Box pb={3}>
        <Box bg="chrome092" flexDirection="column" px={3} py={2} mr={2} alignItems="center" justifyContent="center">
          <Text textTransform="uppercase" fontSize="sm" fontWeight="bold">{formattedStartTime}</Text>
          <Text fontSize="xl" fontWeight="bold">{formattedEndTime}</Text>
        </Box>
        <Box flexDirection="column">
          <Heading as="h2">{nextEvent.name}</Heading>
          <ExternalLink href={nextEvent.location.website} fontSize="sm">{nextEvent.location.name}</ExternalLink>
          <Text fontSize="sm">{formattedDuration}</Text>
        </Box>
      </Box>
      <Box flexDirection="column" alignItems="flex-start">
        <Heading as="h3" my="1" fontWeight="bold" fontSize="sm">Info</Heading>
        <ExternalLink fontSize="sm" href={nextEvent.googleCalendarLink}>{moment(nextEvent.startTime).format('dddd, MMMM D, h:mm')} - {moment(nextEvent.endTime).format('h:mma')}</ExternalLink>
        <ExternalLink fontSize="sm" href={nextEvent.location.googleMapsLink}>{nextEvent.location.fullAddress}</ExternalLink>
      </Box>
      <Box flexDirection="column" py={2}>
        <Heading as="h3" my="1" fontWeight="bold" fontSize="sm">Description</Heading>
        <Text>
          {nextEvent.details}
        </Text>
      </Box>
      <Box py={2}>
        <Box flex={1} alignItems="flex-end">
          {renderAttendeesText(nextEvent.attendees)}
        </Box>
        {currentUser && renderRsvpButton(nextEvent)}
        {!currentUser && <Text><Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to RSVP</Text>}
      </Box>
    </React.Fragment>
  )
}

function PastEvents({ events }) {
  const pastEvents = events.filter((e) => (moment(e.endTime).isBefore()));
  return pastEvents.map((ev) => {
    const formattedStartTime = moment(ev.startTime).format('MMM');
    const formattedEndTime = moment(ev.startTime).format('DD');
    const formattedDuration = `${moment(ev.startTime).format('h:mm')} - ${moment(ev.endTime).format('h:mma')}`;
    return (
      <React.Fragment key={ev.id}>
        <Divider my={4} />
        <Box pb={3}>
          <Box bg="chrome092" flexDirection="column" px={3} py={2} mr={2} alignItems="center" justifyContent="center">
            <Text textTransform="uppercase" color="chrome040" fontSize="sm" fontWeight="bold">{formattedStartTime}</Text>
            <Text fontSize="xl" color="chrome040" fontWeight="bold">{formattedEndTime}</Text>
          </Box>
          <Box flexDirection="column">
            <Heading as="h2" color="chrome040">{ev.name}</Heading>
            <ExternalLink href={ev.location.website} fontSize="sm">{ev.location.name}</ExternalLink>
            <Text fontSize="sm" color="chrome040">{formattedDuration}</Text>
          </Box>
        </Box>
      </React.Fragment>
    )
  })
}

