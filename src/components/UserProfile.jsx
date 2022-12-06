import React,{useState} from 'react'
import { FileDrop } from './FileDrop'
import {Form,FormGroup,Label,Input,Col,Button,Spinner} from 'reactstrap'
import { useMutation } from 'react-query'
import { updateAvatar } from './getData'
import { MyModal } from './MyModal'

export const UserProfile=({loggedInUser,setLoggedInUser})=> {
  const [selFile,setSelFile]=useState({})
  const [msg,setMsg]=useState('')
  const [isUploading,setIsUploading]=useState(false)
  const [modal,setModal]=useState(false)

  const mutationAvatar=useMutation(updateAvatar,{
    onSuccess: (data)=>{
      console.log(data.data)
      setMsg(data.data.msg)
      setLoggedInUser({...loggedInUser,avatar:data.data.avatar,avatar_id:data.data.avatar_id})
      setIsUploading(false)
    }
  })

  console.log(selFile)
  const handleUpdateAvatar=()=>{
    console.log("Calling Ajax")
    const formdata=new FormData()
    formdata.append("selFile",selFile)
    formdata.append("username",loggedInUser.username)
    formdata.append("avatar_id",loggedInUser.avatar_id)
    setIsUploading(true)
    mutationAvatar.mutate(formdata)
  }

  const handleDelete=()=>{
    console.log('töröl...')
    setModal(true)
  }

  return (
    <div>
        <h6 className='p-2 border-bottom text-center'>Felhasználói fiók</h6>
        <div className='row border p-1'>
          <div className='col-2'>Email:</div>
          <div className='col-10'>{loggedInUser.email}</div>
        </div>
        <Form>
        <FormGroup>
    <Label for="pw" sm={2}>
      New Password
    </Label>
    <Col sm={10}>
    <Input
      id="pwd"
      name="password"
      type="password"
    />
    </Col>
    <Col sm={4}>
        <Input 
        type='button'
        value='Change Password'
        onClick={()=>console.log('Change password...')}
        />
    </Col>
  </FormGroup>
    <FormGroup row>
      <FileDrop setSelFile={setSelFile}/>
    </FormGroup>
    <FormGroup row>
      {!isUploading? 
      <Input type='button' className='btn btn-primary m-1' value="Update avatar"
      disabled={!selFile.name}
      onClick={handleUpdateAvatar}
      />
      :
      <Button color="primary" disabled>
    <Spinner size="sm">
      Uploading avatar...
    </Spinner>
    <span>
      {' '}Loading
    </span>
    </Button>
}
      <Input type='button' className='btn btn-danger m-1'
      onClick={handleDelete}
       value='Delete my profile'/>
    </FormGroup>
        <p className='msg'>{msg}</p>
    </Form>
    {modal && <MyModal modal={modal} setModal={setModal}
              username={loggedInUser.username} avatar_id={loggedInUser.avatar_id} setLoggedInUser={setLoggedInUser}/> }
    </div>
  )
}
