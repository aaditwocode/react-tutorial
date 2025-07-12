import { useContext } from 'react';
import { UserContext } from './UserContext';

export default function ContactUs() {
  const { name } = useContext(UserContext);

  return (
    <div>
      <h1>Contact Us</h1>
      <p>Welcome, {name}!</p>
      <button>Send Message</button>
    </div>
  );
}
