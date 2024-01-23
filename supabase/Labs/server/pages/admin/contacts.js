import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import DefLayout from '/components/DefLayout';
import Link from 'next/link';



function ContactsPage() {
  const supabase = useSupabaseClient();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const { data: contactsData, error } = await supabase
          .from('contacts')
          .select('*')

        if (error) {
          throw error;
        }

        if (contactsData) {
          setContacts(contactsData);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error.message);
      }
    }

    fetchContacts();
  }, [supabase]);

  return (
    <DefLayout>
    <div className="h-full bg-orange-200 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      
      <h1>Liste des Contacts</h1>
      <p>contact</p>
      <ul>
        {contacts.map((contact) => (
          
          <li key={contact.id}>
            <Link href={`/admin/contacts/${contact.id}`}>
              
              <a>
                {contact.id}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </DefLayout>
  );
}

export default ContactsPage;
