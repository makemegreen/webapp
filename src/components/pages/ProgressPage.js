import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import {Line} from 'react-chartjs-2';
import moment from 'moment'
import get from "lodash.get";
import NavBar from "../items/NavBar";

class ProgressPage extends Component {

    constructor () {
        super()
        this.state = { isLoading: true,
            "history": [],
            "line_data": []
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
                                let data = {
                                    'x': moment(get(footprint, 'date_created')).valueOf(),
                                    'y': get(footprint, 'value')
                                }
                                series_road.push(data)
                            }
                            if (get(get(footprint, 'type'), 'label') == "food") {
                                let data = {
                                    'x': moment(get(footprint, 'date_created')).valueOf(),
                                    'y': get(footprint, 'value')
                                }
                                series_food.push(data)
                            }
                            if (get(get(footprint, 'type'), 'label') == "home") {
                                let data = {
                                    'x': moment(get(footprint, 'date_created')).valueOf(),
                                    'y': get(footprint, 'value')
                                }
                                series_home.push(data)
                            }
                        }))
                )

                const line_data = {
                    // labels: series_home_labels,
                    datasets: [
                        {
                            label: 'A la maison',
                            data: series_home
                        },
                        {
                            label: 'Dans mon assiette',
                            data: series_food
                        },
                        {
                            label: 'Sur la route',
                            data: series_road
                        }
                    ]
                };

                this.setState({
                    "line_data": line_data
                });
            },
            key: "history"
        }))

    }

    render () {

        const options = {
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'series',
                    time: {
                        unit: "minute",
                        displayFormats: {
                            millisecond: 'h:mm:ss.SSS a',
                            second: 'h:mm:ss',
                            minute: 'MMM DD hh:mm',
                            hour: 'MMM DD',
                            day: 'MMM DD',
                            week: 'MMM DD',
                            month: 'MMM DD',
                            quarter: 'MMM DD',
                            year: 'MMM DD',
                        }
                    },
                    ticks: {
                        source: 'data'
                    }
                }]
            }
        }

        const { isLoading, line_data } = this.state

        return(
            <div className="text-center">

                <NavBar />

                <div className="title-header">
                    <h5>Mon suivi</h5>
                </div>

                <div className="content">
                    <div className="progress-section">
                        {!isLoading ? (
                            <Line data={line_data} options={options}/>
                        ):(
                            <span>Chargement en cours...</span>
                        )}
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