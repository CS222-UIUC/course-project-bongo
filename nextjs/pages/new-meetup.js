import NewMeetupForm from '@components/meetups/NewMeetupForm'

export default function NewMeetupPage() {
  function addMeetupHandler(meetupData) {

  }
  
  return (
    <div>
      <h1>NewMeetupPage</h1>
      {/* can pass function in props as well! */}
      <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </div>
  )
}