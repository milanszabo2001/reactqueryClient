import React from 'react'
import { FileDrop } from './FileDrop'
import {Form,FormGroup,Label,Input,Col} from 'reactstrap'

export const UserProfile=()=> {
  return (
    <div>
        <h6>Felhasználói fiók</h6>
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
        </Form>
    </div>
  )
}
