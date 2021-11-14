import OrganizerPage from "./organizerPage";
import ParticipantPage from "./participantPage";

const App = () => {
  return window.location.search.length ? (
    <ParticipantPage />
  ) : (
    <OrganizerPage />
  );
};

export default App;
