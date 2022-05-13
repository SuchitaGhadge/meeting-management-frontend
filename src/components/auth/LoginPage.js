import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './login.css'
import axios from 'axios'
import Loading from "../loading";
import ErrorMessage from "../ErrorMessage";

const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
          setLoading(true)
          const {data} = await axios.post("/api/users/login", {
            email,
            password
          })
          setLoading(false)
          setError("")
          console.log("data", data)
          localStorage.setItem("userInfo", JSON.stringify(data))
          navigate("/meetings")
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
        New User ? <Link to="/register">Register Here</Link>
    </Col>
  </Row>
    </div>
   )
}

export default LoginPage;