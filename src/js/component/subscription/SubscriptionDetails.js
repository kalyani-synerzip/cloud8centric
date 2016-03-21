'use strict';

import React, {Component, View} from 'react';
import {Grid, Row, Col, Button, Table, Glyphicon, Panel} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'redux-router';
import * as subscriptionActionCreators from '../../actions/subscription';
import _ from 'lodash';
import SubscriptionItem from './SubscriptionItem';

class SubscriptionDetails extends Component {

    componentDidMount(){
        var {subscription,subscriptionAction} = this.props;
        if(!subscription.detail){
            subscriptionAction.getSubscriptionStatus(subscription.id);
        }

    }

    render() {
        let {subscription} = this.props;
        var rows = [];

        if(subscription.detail){
            rows = _.map(subscription.detail,(data)=>{

                return (
                    <tr key={data.productId}>
                        <td>{data.productName}</td>
                        <td>{data.productURL}</td>
                        <td>{data.username}</td>
                        <td><Button bsSize="xsmall" className="cursor-default status-btn-width"
                                    bsStyle={ data.status=='Ready' ?
                                    'success' :(data.status=='In Progress' ? 'warning' :
                                    (data.status=='Error' ? 'danger': '')) }>
                            {data.status}
                        </Button></td>
                    </tr>
                );
            })
        }

        return (
            <Row>
                <Col sm={12}>
                    <Table responsive striped bordered condensed hover className="subscription-products-table">
                        <thead className="subscription-products-table-thead">
                        <tr>
                            <th><b>Product Name</b></th>
                            <th><b>Product URL</b></th>
                            <th><b>User Name</b></th>
                            <th><b>Product Status</b></th>
                        </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );

    }

}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    subscriptionAction:bindActionCreators(subscriptionActionCreators,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionDetails);
