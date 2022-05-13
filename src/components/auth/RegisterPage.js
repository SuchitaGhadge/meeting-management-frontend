import React, { useState } from "react";
import './login.css'
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from 'axios'
import Loading from "../loading";
import ErrorMessage from "../ErrorMessage";

const RegisterPage = () => {
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(false)

   const submitHandler = async(e) => {
     console.log(name)
      e.preventDefault()
      try {
        setLoading(true)
        const reqData = {
           name, email, password
        }
        console.log(reqData)
        const {data} = await axios.post("/api/users/", {
          name : name,
          email,
          password
        })
        setLoading(false)
        setError("")
        console.log("data", data)
        localStorage.setItem("userInfo", JSON.stringify(data))
      } catch (error) {
        console.log("error",error)
        setError(error.response.data.message)
        setLoading(false)
      }
  }

   return (
      <div className="login_container">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      <Form className="login_form" onSubmit={submitHandler}>
       <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
   
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email"
        value = {email}
        onChange = {(e) => setEmail(e.target.value)}
        />
      
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
   
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <Row className="py-3">
      <Col>
          Have account ? <Link to="/login">Login Here</Link>
      </Col>
    </Row>
      </div>
   )
}

export default RegisterPage;