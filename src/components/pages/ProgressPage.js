import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import Highcharts from "highcharts"
import moment from 'moment'
import get from "lodash.get";
import NavBar from "../items/NavBar";

class ProgressPage extends Component {

    constructor () {
        super()
        this.state = { isLoading: true,
            "history": []
        }
    }

    componentWillMount () {

        this.props.dispatch(requestData('GET', '/footprints', {
            handleSuccess: (state, action) => {
                const history = get(action, 'data.footprints')
                console.log("history: ", history)
                this.setState({
                    "isLoading": false,
                    "history" : history
                })

                let series_road = []
                let series_home = []
                let series_food = []
                history.map(footprints => (
                    footprints.map(footprint => {
                            if (get(get(footprint, 'type'), 'label') == "road") {
                                series_road.push([moment(get(footprint, 'date_created')).valueOf(), get(footprint, 'value')])
                            }
                            if (get(get(footprint, 'type'), 'label') == "food") {
                                series_food.push([moment(get(footprint, 'date_created')).valueOf(), get(footprint, 'value')])
                            }
                            if (get(get(footprint, 'type'), 'label') == "home") {
                                series_home.push([moment(get(footprint, 'date_created')).valueOf   (), get(footprint, 'value')])
                            }
                        }))
                )

                Highcharts.chart('container', {

                    title: {
                        text: 'Evolution de mes empreintes écologiques'
                    },

                    subtitle: {
                        text: 'makemegreen.fr'
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            format: '{value:%Y-%b-%e}'
                        },
                        dateTimeLabelFormats: {
                            day: "%e. %b",
                            month: "%b '%y",
                            year: "%Y"
                        },
                        tickInterval: 3600000,
                    },
                    yAxis: {
                        title: {
                            text: 'Kg de CO²'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                    series: [{
                        name: 'road',
                        data: series_road
                    }, {
                        name: 'food',
                        data: series_food
                    }, {
                        name: 'home',
                        data: series_home
                    }],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }

                });
            },
            key: "history"
        }))

    }

    render () {

        return(
            <div className="text-center">

                <NavBar />

                <div className="title-header">
                    <h5>Mon suivi</h5>
                </div>

                <div className="content">
                    <div className="progress-section">
                        <div id="container"></div>
                    </div>
                </div>
            </div>
        )
    }
}


export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(ProgressPage)