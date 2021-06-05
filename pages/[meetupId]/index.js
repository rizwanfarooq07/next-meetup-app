// our-domain.com/dynamic-route

import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

import MeetupDetail from "../../components/meetups/MeetupDetails";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>
    
  );
};

export const getStaticPaths = async () => {

  const client = await MongoClient.connect(
    "mongodb+srv://admin-rizwan:test123@cluster0.tlu4n.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find({}, {_id: 1}).toArray();

  client.close()

  return {
      fallback: false,
    paths: meetups.map(meetup => ({
      params: {meetupId: meetup._id.toString()}
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://admin-rizwan:test123@cluster0.tlu4n.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const selectedMeetup = await meetupCollections.findOne({ _id: ObjectId(meetupId) }) ;

  client.close()

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        address: selectedMeetup.address
      },
    },
  };
};

export default MeetupDetails;
