import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <h1>Welcome to ShareExpense Hub</h1>
        <p className="typewriter">
          <Typewriter
            words={[
              "Create a Room",
              "Add friends",
              "Share Expenses",
              "Stay Organized",
            ]}
            cursor
            loop={true}
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>
        <button
          className="btn btn-dark btn-login-signup"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign Up / Log In
        </button>
      </header>

      <section class="room-creation">
        <h2>Create Your ShareExpense Room</h2>
        <p>
          Collaborate with friends, family, or roommates to manage shared
          expenses effortlessly.
          <br />
          Keep track of who spends what, settle debts, and maintain financial
          clarity.
        </p>
        <div class="how-it-works">
          <h3>How It Works</h3>
          <ul>
            <li>
              Create a Room: Set up a dedicated space for tracking shared
              expenses. Give your room a name and invite others to join using
              their email addresses.
            </li>
            <li>
              Add Roommates: Invite your roommates to the room. Everyone can
              join and start contributing to expenses.
            </li>
            <li>
              Record Expenses: Whenever anyone makes a purchase, log it in the
              room. Specify who paid and who benefited from the expense.
            </li>
            <li>
              Track Balances: ShareExpense Hub automatically calculates
              individual balances, making it easy to see who owes what to whom.
            </li>
            <li>
              Create Notes: Need to remember specific details? Create notes for
              each expense to add descriptions, split costs, and add context.
            </li>
            <li>
              Settle Debts: Simplify the process of settling debts. You can
              either make direct payments or handle them outside the platform.
            </li>
          </ul>
        </div>
      </section>

      <section class="features">
        <h3>Features You'll Love</h3>
        <ul>
          <li>
            User-Friendly Interface: Our intuitive design ensures that everyone
            can easily manage their expenses, regardless of their
            tech-savviness.
          </li>
          <li>
            Real-Time Updates: Stay up-to-date with real-time notifications when
            expenses are added or balances are updated.
          </li>
          <li>
            Secure and Private: Your financial data is important. We use
            advanced security measures to keep your information safe.
          </li>
          <li>
            Mobile App: Access your expense room on the go with our mobile app,
            available for both iOS and Android.
          </li>
          <li>
            Detailed Reports: Get insights into spending patterns, trends, and
            individual contributions with our detailed reports.
          </li>
        </ul>
      </section>

      <section class="footer">
        <p class="disclaimer">
          Disclaimer: ShareExpense Hub is a tool for expense management and
          tracking. We do not facilitate actual financial transactions. Users
          are responsible for settling debts outside the platform.
        </p>
        <h6>
          Made with ❤️ and{" "}
          <a href="https://react.dev/" target="_blank">
            React
          </a>{" "}
          by 👉{" "}
          <a href="https://github.com/MaxAnii" target="_blank">
            Ansar
          </a>
        </h6>
      </section>
    </>
  );
};

export default Landing;
