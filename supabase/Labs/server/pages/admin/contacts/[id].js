import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import DefLayout from '/components/DefLayout';
import { useRouter } from 'next/router';

function ContactDetails({ contact }) {

    const router = useRouter();
    const { id } = router.query; // Récupère l'identifiant de l'article depuis l'URL
    const supabase = useSupabaseClient();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function fetchContacts() {
          try {
            const { data: contactsData, error } = await supabase
              .from('contacts')
              .select('*')
              .eq('id', id)
    
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
                {contacts.map((contact)=> ( // Vérifier si les détails du contact sont disponibles
                    <div>
                        <h1>Contact Details</h1>
                        <p>Name: {contact.firstname}</p>
                        <p>Email: {contact.email}</p>
                        {/* Autres détails du contact */}
                    </div>
                ))}
            </div>
        </DefLayout>
    );
  }

  

  export default ContactDetails;
