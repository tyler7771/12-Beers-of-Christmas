import OrganizerPage from "./organizerPage";
import ParticipantPage from "./participantPage";
import santaImg from "../styles/assets/santa-with-beer.png";

const App = () => (
  <>
    <div className="snow">
      {[...Array(500)].map(() => (
        <div className="snowflake" />
      ))}
    </div>
    {window.location.search.length ? <ParticipantPage /> : <OrganizerPage />}
    <img id="santa" alt="santa with beer" src={santaImg} />
    <a className="git-link" href="https://github.com/tyler7771">
      Created with love by Tyler Fields! Check out my Github. Cheers!
    </a>
  </>
);

export default App;
