import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head';
import { Fragment } from "react";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetailPage({ meetupData }) {
  return <Fragment>
    <Head>
      <title>{meetupData.title}</title>
      <meta name="description" content={meetupData.description} />
    </Head>
    <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
  </Fragment>;
};

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://default:default@cluster0.om74nyk.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  return {
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect('mongodb+srv://default:default@cluster0.om74nyk.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

  return {
    props: {
      meetupData: {
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        id: selectedMeetup._id.toString()
      }
    }
  }
}

export default MeetupDetailPage;