import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'


export const FormContainer = ({children}) => {
  return (
    <Container className='form-box'>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}
