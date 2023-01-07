import { useRouter } from 'next/router';
import Head from 'next/head';
import { Fragment } from 'react';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {

  const router = useRouter();

  const addMeetupHandler = async (enteredData) => {
    const res = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    console.log(data);

    router.push('/');
  }
  return <Fragment>
    <Head>
      <title>Add a New Meetup</title>
      <meta
        name='description'
        content='Add your own meetups and create amazing networking opportunities.'
      />
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
  </Fragment>
};

export default NewMeetupPage;