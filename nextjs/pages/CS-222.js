import MeetupList from '@components/meetups/MeetupList'

const DUMMY_DATA = [
  {
    id: '',
    title: '',
    image:
      'https://i.kym-cdn.com/entries/icons/original/000/038/205/8679305.jpg',
    address: 'Oh no!',
    description:
      'cringe',
  }
];

export default function CS222Page() {
  return (
    <section>
    <h1>I'm just testing whether this will work</h1>
    <MeetupList meetups={DUMMY_DATA} />
    </section>
    
    
  )
}