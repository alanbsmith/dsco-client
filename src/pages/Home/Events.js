import React from 'react';
import moment from 'moment';
// providers
import { useEvents } from '../../providers/Events';
import { useCurrentUser } from '../../providers/CurrentUser';

import { Box } from '../../elements/Box';
import { Button } from '../../elements/Button';
import { ExternalLink } from '../../elements/ExternalLink';
import { Heading } from '../../elements/Heading';
import { Link } from '../../elements/Link';
import { Text } from '../../elements/Text';

export function Events() {
  const { events, eventService, eventsLoading } = useEvents();
  const { currentUser } = useCurrentUser();

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
    const attendee = ev.attendees.find((attendee) => attendee.userId === currentUser.id);
    if (attendee && !attendee.hasDeclined) {
      return (
        <Button
          disabled={eventsLoading}
          variant="danger"
          onClick={() => handleRemoveAttendee(attendee)}
        >
          Remove RSVP
        </Button>
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

  return events.map((ev) => {
    const formattedStartTime = moment(ev.startTime).format('MMM');
    const formattedEndTime = moment(ev.startTime).format('DD');
    const formattedDuration = `${moment(ev.startTime).format('h:mm')} - ${moment(ev.endTime).format('h:mma')}`;

    return (
      <React.Fragment key={ev.id}>
        <Box pb={2}>
          <Box bg="chrome092" flexDirection="column" px={3} py={2} mr={2} alignItems="center" justifyContent="center">
            <Text textTransform="uppercase" fontSize="sm" fontWeight="bold">{formattedStartTime}</Text>
            <Text fontSize="xl" fontWeight="bold">{formattedEndTime}</Text>
          </Box>
          <Box flexDirection="column">
            <Heading as="h2">{ev.name}</Heading>
            <ExternalLink href={ev.location.website} fontSize="sm">{ev.location.name}</ExternalLink>
            <Text fontSize="sm">{formattedDuration}</Text>
          </Box>
        </Box>
        <Box flexDirection="column" alignItems="flex-start">
          <Heading as="h3" my="1" fontWeight="bold" fontSize="sm">Info</Heading>
          <ExternalLink fontSize="sm" href={ev.googleCalendarLink}>{moment(ev.startTime).format('dddd, MMMM D, h:mm')} - {moment(ev.endTime).format('h:mma')}</ExternalLink>
          <ExternalLink fontSize="sm" href={ev.location.googleMapsLink}>{ev.location.fullAddress}</ExternalLink>
        </Box>
        <Box flexDirection="column" py={2}>
          <Heading as="h3" my="1" fontWeight="bold" fontSize="sm">Description</Heading>
          <Text>
            {ev.details}
          </Text>
        </Box>
        <Box py={2}>
          <Box flex={1} alignItems="flex-end">
            {renderAttendeesText(ev.attendees)}
          </Box>
          {currentUser && renderRsvpButton(ev)}
          {!currentUser && <Text><Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to RSVP</Text>}
        </Box>
      </React.Fragment>
    )
  });
}
