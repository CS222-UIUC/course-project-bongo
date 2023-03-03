import { useState } from 'react';
import Backdrop from "@components/Backdrop"
import Modal from "@components/Modal"

export default function Todo(props) {
  // current state snapshot, a function to set modal
  const [ modalIsOpen, setModalIsOpen ] = useState(false);

  function deleteHandler() {
    console.log(props.text)
    console.log(`variable modalIsOpen == ${modalIsOpen}`);

    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <div className='card'>
      <h2>{props.text}</h2>
      <div className='actions'>
        <button className='btn' onClick={deleteHandler}>
          Button!
        </button>
      </div>
      
      { modalIsOpen ? <Modal onCancel={closeModalHandler} onConfirm={null}/> : null}
      { modalIsOpen ? <Backdrop onClick={closeModalHandler}/> : null}

    </div>
  )
}