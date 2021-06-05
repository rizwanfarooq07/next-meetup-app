// our-domain.com/new-meetup
import Head from 'next/head';
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupFrom from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities!"
        />
      </Head>
      <NewMeetupFrom onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
