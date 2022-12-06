import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useMutation } from 'react-query';
import { deleteUser } from './getData';

export const MyModal=({modal,setModal,username,avatar_id,setLoggedInUser})=>{

    const toggle = () => setModal(!modal)
    const toggleDelete=()=>{
    console.log('törlendő:',username,avatar_id)
    mutationDelete.mutate({username:username,avatar_id:avatar_id})
}

const mutationDelete=useMutation(deleteUser,{
    onError:(err)=>{
        console.log(err)
    },
    onSuccess:(data)=>{
        console.log(data.data)
        setLoggedInUser({})
    }
})

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Figyelem!</ModalHeader>
        <ModalBody>
          Biztos vagy benne? A művelet nem fordítható vissza.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleDelete}>
            Igen
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Mégsem
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
