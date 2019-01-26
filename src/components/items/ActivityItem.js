import get from 'lodash.get'
import moment from 'moment'
import {requestData} from "../../reducers/data";
import React, {Component} from 'react'
import {connect} from "react-redux";
import calcul from "../../assets/calcul.png"
import detail_bottom from "../../assets/details_bottom.png"

class ActivityItem extends Component {

    constructor(){
        super()
        this.state = { reco_id: null,
            user_id: null,
            activity_id: null,
            is_success: null,
            date_start: null,
            date_end: null,
            status: null,
            reco_title: null,
            reco_benefit: null,
            reco_benefit_description: null,
            reco_type: null,
            reco_how_to: null,
            reco_content: null,
            display_status: ""}
    }

    // TODO: maybe PATCH request

    onSuccessClick = () => {
        this.props.dispatch(requestData('GET',`/activity/validate/${this.state.activity_id}`,
            {
                handleSuccess: (state, action) => {
                    const status = "success"
                    this.setState({
                        "status": status,
                        "date_end": moment().format('DD MMMM YYYY à HH:mm')
                    })
                    console.log(this.state.status)
                },
            }))
    }

    onFailClick = () => {
        this.props.dispatch(requestData('GET',`/activity/remove/${this.state.activity_id}`,
            {
                handleSuccess: () => {
                    this.setState( {
                        "status": "fail",
                        "date_end": moment().format('DD MMMM YYYY à HH:mm')
                    })
                },
            }))
    }

    onHoldClick = () => {
        this.props.dispatch(requestData('GET',`/activity/hold/${this.state.activity_id}`,
            {
                handleSuccess: (state, action) => {
                    this.setState( {
                        "status": "pending",
                        "date_end": moment().format('DD MMMM YYYY à HH:mm')
                    })
                    console.log(this.state.status)
                },
            }))
    }

    componentDidMount () {
        const { activity } = this.props

        const reco_id = get(activity, "recommendation_id")
        const user_id = get(activity, "user_id")
        const activity_id = get(activity, "id")
        const is_success = get(activity, "is_success")
        const date_start = moment(get(activity, "date_start")).format('DD MMMM YYYY à HH:mm')
        const date_end = moment(get(activity, "date_end")).format('DD MMMM YYYY à HH:mm')
        const status = get(get(activity, "status"),"label")
        const reco_title = get(get(activity, "recommendation"),"title")
        const reco_how_to = get(get(activity, "recommendation"),"how_to")
        const reco_benefit = get(get(activity, "recommendation"),"benefit")
        const reco_benefit_description = get(get(activity, "recommendation"),"benefit_description")
        const reco_content = get(get(activity, "recommendation"),"content")
        const reco_type = get(get(get(activity, "recommendation"),"type"),"label")

        let display_status = ""

        if (status == "pending"){
            display_status = "en cours"
        }else if(status == "success"){
            display_status = "succès"
        }else{
            display_status = "arrêté"
        }


        this.setState( { "user_id": user_id,
                        "reco_id": reco_id,
                        "activity_id": activity_id,
                        "is_success": is_success,
                        "date_start": date_start,
                        "date_end": date_end,
                        "status" : status,
                        "reco_title": reco_title,
                        "reco_how_to": reco_how_to,
                        "reco_benefit": reco_benefit,
                        "reco_benefit_description": reco_benefit_description,
                        "reco_type": reco_type,
                        "reco_content": reco_content,
                        "display_status": display_status
                    } )
    }

    render(){

        return (
            // TODO: factoriser dashboard-card et activity-card et les sous composants
            <div className="activity-card container">
                    <div className={"row activity-title " + this.state.reco_type }>
                        <div className="col">
                            { this.state.reco_title }
                        </div>
                        <div className="col-3 text-right">
                            <h6 className="text-muted">
                                { this.state.display_status }
                            </h6>
                        </div>
                    </div>
                <div className="activity-content">
                    <div className="reco-benefit">
                        <h6>
                            <strong>Quel est l'impact ?</strong>
                        </h6>
                        <div className="text-center">
                            <a className="reco-benefit-value"
                                data-toggle="collapse"
                               href={"#calcul"+ this.state.activity_id }
                               aria-expanded="false"
                               aria-controls={"calcul"+ this.state.activity_id }>
                                { this.state.reco_benefit } kgCO2/an
                                <img className="reco-benefit-calcul" src={ calcul } alt="calculation details"/>
                            </a>
                        </div>
                        <div className="collapse"
                             id={"calcul"+ this.state.activity_id }>
                            <div className="card card-body">
                                { this.state.reco_benefit_description }
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="activity-detail"
                           data-toggle="collapse"
                           href={"#detail"+ this.state.reco_id }
                           aria-expanded="false"
                           aria-controls={"detail"+ this.state.reco_id }>
                            <h6>
                                En savoir plus
                            </h6>
                            <img className="details-img" src={ detail_bottom } alt="display details"/>
                        </a>
                    </div>

                    <div className="collapse"
                         id={"detail"+ this.state.reco_id }>
                        <div className="reco-why">
                            <h6>
                                <strong>Pourquoi le faire ?</strong>
                            </h6>
                            { this.state.reco_content }
                        </div>
                        { this.state.reco_how_to ? (
                            <div className="reco-howto">
                                <h6>
                                    <strong>Comment le faire ?</strong>
                                </h6>
                                { this.state.reco_how_to }
                            </div>
                        ):(
                            <div className="reco-howto">
                            </div>
                        )}
                    </div>


                </div>
                { this.state.status == "pending" ? (
                <div className="activity-actions row">
                    <div className="activity-actions-section section-left text-center col"
                        onClick={e => { e.preventDefault(); this.onSuccessClick();} }>
                        C'est fait !
                    </div>
                    <div className="activity-actions-section section-right text-center col"
                        onClick={e => { e.preventDefault(); this.onFailClick();} }>
                        Plus intéressé
                    </div>
                </div>
                ) : (
                <div className="activity-actions row">
                    <div className="activity-actions-section section-middle text-center col"
                            onClick={e => { e.preventDefault(); this.onHoldClick();} }>
                            J'ai changé
                    </div>
                </div>
                )}
            </div>
        )
    }

}

export default connect()(ActivityItem)
