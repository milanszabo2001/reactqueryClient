import React from 'react'
import { useState } from 'react'
import {useMutation} from 'react-query';
import {checkUsername,checkEmail} from './getData'
import {Form,FormText,FormGroup,Input,Label,FormFeedback,Button} from "reactstrap"

export const Register=()=> {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const [isValidU,setIsValidU]=useState(null)
    const [isValidP,setIsValidP]=useState(null)
    const [isValidE,setIsValidE]=useState(null)

    const mutationCheckUsername=useMutation(checkUsername,{
      onSuccess: (data)=>{
        console.log("szerver oldalrol:",data.data.rowCount,data.data.username)
        if(data.data.rowCount==0)
          setIsValidU(true)
        else
          setIsValidU(false)
      }
    })

    const handleCheckUsername=()=>{
      if(username)
        mutationCheckUsername.mutate({username:username})
      else
        setIsValidU(false)
    }

    const handleCheckEmail=()=>{
      if(email)
        mutationCheckEmail.mutate({email:email})
      else
        setIsValidE(false)
    }

    const mutationCheckEmail=useMutation(checkEmail,{
      onSuccess: (data)=>{
        console.log("szerver oldalrol:",data.data.rowCount,data.data.email)
        if(data.data.rowCount==0)
          setIsValidE(true)
        else
          setIsValidE(false)
      }
    })

  return (
    <Form className='login border p-3 shadow mt-1 rounded'>
        <h3>Sign up Form</h3>
    <FormGroup>
    <Label for="username">Felhasználónév:</Label>
    <Input value={username}
     onChange={(e)=>setUsername(e.target.value)}
     className={isValidU==null? "" :( isValidU ? "is-valid" : "is-invalid")}
     autoFocus
     onBlur={handleCheckUsername}
     onKeyPress={(e)=>e.key=='Enter'? document.getElementById('email').focus() : ''}
     />
    <FormFeedback>Már létező felhasználónév!</FormFeedback>
    </FormGroup>

    <FormGroup>
    <Label for="email">Email:</Label>
    <Input type='email' id='email' value={email}
     onChange={(e)=>setEmail(e.target.value)}
     className={isValidE==null? "" :( isValidE ? "is-valid" : "is-invalid")}
     onKeyPress={(e)=>e.key=='Enter'? document.getElementById('password').focus() : ''}
     onBlur={handleCheckEmail}
     />
    <FormFeedback>Létező email cím!</FormFeedback>
    </FormGroup>

    <FormGroup>
    <Label for="password">Jelszó:</Label>
    <Input type='password' id='password'
    onChange={(e)=>setPassword(e.target.value)}
    className={isValidP==null? "" :( isValidP ? "is-valid" : "is-invalid")}
    />
    <FormFeedback >Helytelen jelszó!</FormFeedback>
    <FormText>A jelszónak minimum 6 karakter hosszúnak kell lennie!</FormText>
    </FormGroup>
    <div>
        <Button disabled={!username || !password || !email} color='dark'>Sign Up</Button>
    </div>
  </Form>
  )
}
