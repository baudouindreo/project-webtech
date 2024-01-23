import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import DefLayout from '../components/DefLayout';

function Contact() {
  const supabase = useSupabaseClient();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !message) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError(''); // Clear any previous error message
      const { data, error } = await supabase.from('contacts').insert([
        { firstname, lastname, email, message },
      ]);

      if (error) {
        throw error;
      }

      console.log('Inserted data:', data);
      // Optionally, reset form fields after successful submission
      setFirstname('');
      setLastname('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error inserting contact:', error.message);
    }
  };

  return (
    <DefLayout>
      <div className="h-full bg-orange-200 justify-center items-center">
        <h1>Contact Page</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Add Contact</button>
        </form>
      </div>
    </DefLayout>
  );
}

export default Contact;
