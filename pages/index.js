// our-domain.com
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export const getServerSideProps = async(context) => {

//     const req = context.req;
//     const res = context.res;

//     return {
//         props : {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://admin-rizwan:test123@cluster0.tlu4n.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find().toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
