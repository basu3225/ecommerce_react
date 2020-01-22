import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import MobileData from './mobile_data';

class products extends Component {

    constructor (props) {
        super (props);
        this.state = { response : MobileData, filter_rating : [], status: true };
    }

    handleFilters = (e) => {
        const filters = document.getElementsByName('rating_filter[]');
        const filter_values = [];

        if(e.target.name === 'rating_filter[]')
        {
            // Check for all the checkboxes
            for(var i=0;i<filters.length;i++)
            {
                // Check all checkboxed checked or not
                if(filters[i].checked)
                {
                    // Push checked value into filter array
                    filter_values.push(filters[i].value);
                }
            }
            // Set filter array in state
            this.setState({ filter_rating : filter_values });
        }
        else {
            // If not checked set filter array as empty
            this.setState({ filter_rating : [] });
        }
    }
       
    render() { 

        let data_display = [];
        const { response, filter_rating } = this.state;

        // Get minimum value in filter array
        const min_value = Math.min(...filter_rating);

        if(response && response.length > 0)
        {
            data_display = response.map((mobile) => (

                // Check and display items only if values are set or not and get rating values greater than minimum value selected
                filter_rating.length === 0 || (filter_rating.length > 0 && mobile.rating >= min_value ) ? 

                    <Col key={mobile.name} className="text-center p-3" md={4}>
                        <img src={mobile.image} alt={mobile.name} style={{height : "200px"}}/>
                        <h6 className="mt-3"> {mobile.name} </h6>
                        <h5 className="btn btn-primary"> {mobile.rating} * </h5>
                    </Col> : ''
            ));
        }

        return ( 

            <div className="main_div"> 


                <div> 
                    <Navbar bg="dark" variant="dark">
                            <Navbar.Brand  className="pl-5">
                            {' Ecommerce'}
                            </Navbar.Brand>
                    </Navbar>
                </div>

                
                <div className="d-flex pl-3 pt-5">
                    <Col md={3}></Col>
                        <Col md={6}>
                            <form method="post" > 
             
                                <InputGroup>
                                    <FormControl
                                        placeholder="Search Products" />
                                    
                                <InputGroup.Append>
                                    <Button
                                        type="submit"
                                        variant="dark"
                                        className="Search_button"
                                        size="sm" > Search 
                                    </Button>
                                </InputGroup.Append>
                                </InputGroup> 
                       
                            </form>
                        </Col>
                    <Col md={3}></Col>
                </div>
                

                <div className="d-flex p-5">
                    <Col md={3} className="border-right">
                         <h2 className="bg-secondary text-white"><b>RATINGS</b></h2>

                        <Form.Group controlId="formBasicChecbox" className="pt-4">
                            <Form.Check type="checkbox" name="rating_filter[]" onChange={this.handleFilters} value="4" label="4 to 5" />
                        </Form.Group>

                        <Form.Group controlId="formBasicChecbox" className="pt-1">
                            <Form.Check type="checkbox" name="rating_filter[]" onChange={this.handleFilters} value="3" label="3* & above" />
                        </Form.Group>

                        <Form.Group controlId="formBasicChecbox" className="pt-1">
                            <Form.Check type="checkbox" name="rating_filter[]" onChange={this.handleFilters} value="2" label="2* & above" />
                        </Form.Group>

                        <Form.Group controlId="formBasicChecbox" className="pt-1">
                            <Form.Check type="checkbox" name="rating_filter[]" onChange={this.handleFilters} value="1" label="1* & above" />
                        </Form.Group>

                    </Col>  
                    
                    <div className="row">

                        {/* Dispaly items */}
                        {data_display}
                        
                    </div>

                   
                </div>


            </div>
                
         );
    }
}
 
export default products;