import get from 'lodash.get'
import {requestData} from "../../reducers/data";
import React, {Component} from 'react'
import {connect} from "react-redux";
import {THUMBS_URL} from "../../utils/config";
import calcul from "../../assets/calcul.png"
import detail_bottom from "../../assets/details_bottom.png"


class PropositionItem extends Component {

    constructor(){
        super()
        this.state = { reco_id: null,
            proposition_id: null,
            reco_type: null,
            reco_title: null,
            reco_benefit: null,
            reco_benefit_description: null,
            reco_content: null,
            reco_how_to: null}
    }

    onSuccessClick = () => {
        this.props.dispatch(requestData('GET',`/activity/${this.state.reco_id}`))
    }

    onFailClick = () => {
        this.props.dispatch(requestData('GET',`/propositions/reject/${this.state.proposition_id}`))
    }

    componentDidMount () {
        const { proposition } = this.props

        const reco_id = get(proposition, "id")
        const proposition_id = get(proposition, "proposition_id")
        const reco_type = get(get(proposition, "type"),"label")
        const reco_title = get(proposition, "title")
        const reco_benefit = get(proposition, "benefit")
        const reco_benefit_description = get(proposition, "benefit_description")
        const reco_content = get(proposition, "content")
        const reco_how_to = get(proposition, "how_to")
        const reco_first = get(proposition, "first")

        this.setState( { "reco_id": reco_id,
                        "proposition_id": proposition_id,
                        "reco_type": reco_type,
                        "reco_title": reco_title,
                        "reco_benefit": reco_benefit,
                        "reco_benefit_description": reco_benefit_description,
                        "reco_content": reco_content,
                        "reco_how_to": reco_how_to,
                        "reco_first": reco_first,
                    } )
    }

    render(){

        let reco_category = null
        let reco_img = null

        if ( this.state && this.state.reco_type){
            switch (this.state.reco_type) {
                case 'road':
                    reco_category = "Sur la route"
                    reco_img = THUMBS_URL + "car_filled_color"
                    break;
                case 'food':
                    reco_category = "Dans mon assiette"
                    reco_img = THUMBS_URL + "food_filled_color"
                    break;
                case 'home':
                    reco_category = "Chez moi"
                    reco_img = THUMBS_URL + "home_filled_color"
                    break;
            }
        }

        let class_name = "carousel-item"
        if (this.state && this.state.reco_first){
            class_name += " active"
        }

        return (
            <div className={ class_name }>
                <div className="carousel-item-inside-div">
                    <div className="carousel-center">
                        <div className="text-center">
                            <img className="proposition-img" src={ reco_img } alt="Card image cap"/>
                            <h6 className="proposition-title">
                                { this.state.reco_title }
                            </h6>
                        </div>
                        <div className="reco-benefit">
                            <div className="text-center">
                                <a className="reco-benefit-value"
                                   data-toggle="collapse"
                                   href={"#calcul"+ this.state.reco_id }
                                   aria-expanded="false"
                                   aria-controls={"calcul"+ this.state.reco_id }>
                                    { this.state.reco_benefit } kgCO2/an
                                    <img className="reco-benefit-calcul" src={ calcul } alt="calculation details"/>
                                </a>
                            </div>
                            <div className="collapse"
                                 id={"calcul"+ this.state.reco_id }>
                                <div className="card card-body">
                                    { this.state.reco_benefit_description }
                                </div>
                            </div>
                        </div>

                        <div className={"proposition-didyouknow prop-" + this.state.reco_type}>
                            <h6>
                                Le saviez-vous ?
                            </h6>
                            <div className="text-left">
                                En moyenne un appareil électrique en veille utilise 20% de sa consommation
                                    en état de marche.
                            </div>
                        </div>

                        <div className="text-center">
                            <a className="proposition-detail"
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


                        <div className="proposition-actions">
                            <div className="activity-actions-section proposition-add text-center col"
                                 onClick={e => { e.preventDefault(); this.onSuccessClick();} }>
                                C'est parti !
                            </div>
                            <div className="activity-actions-section proposition-drop text-center col"
                                 onClick={e => { e.preventDefault(); this.onFailClick();} }>
                                Pas pour moi
                            </div>
                        </div>

                    </div>
                    {/*<div className="carousel-caption">*/}
                        {/**/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }

}

export default connect()(PropositionItem)
