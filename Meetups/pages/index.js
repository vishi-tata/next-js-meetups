import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta
        name='description'
        content='Browse a huge list of highly active React meetups!'
      />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>;
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: Dummy_Data,
//     }
//   }
// }

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://default:default@cluster0.om74nyk.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({ title: meetup.title, address: meetup.address, image: meetup.image, id: meetup._id.toString() }))
    },
    revalidate: 100
  }
}

export default HomePage;