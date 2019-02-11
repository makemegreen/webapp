import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { Field } from 'react-final-form'
import Wizard from './Wizard'
import {requestData} from "../../reducers/data";

import '../../styles/footprint-form.css'

const Error = ({ name }) => (
    <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            touched && error ? <div className="form-error">{error}</div> : null
        }
    />
)


class FootPrintFormPage extends Component {

    constructor (props) {
        super(props);
        this.state = {};

        this.store = {};
    }

    componentDidMount() {}

    componentWillUnmount() {}

    getStore() {
        return this.sampleStore;
    }

    updateStore(update) {
        this.sampleStore = {
            ...this.sampleStore,
            ...update,
        }
    }


    onSubmit = (values) => {
        this.props.dispatch(requestData('POST',
            'footprint/compute',
            {
                body: values,
                handleSuccess: () => {
                    const { history } = this.props
                    history.push(`/result`)
                },
                key: "footprints"
            }))
    }

    render () {
        if ( this.props.user ){
            const { history } = this.props
            history.push(`/home`)
        }

        return(
            <div className="footprint-form">
                <div className="text-center">
                    <h4 className="mb-3">Bilan écologique</h4>
                    <Wizard
                        initialValues={this.store}
                        onSubmit={ this.onSubmit }
                    >
                        <div className="footprint-form-intro">
                            <blockquote className="blockquote">
                                <p>Si vous ne pouvez pas le mesurer, vous ne pouvez pas l'améliorer.</p>
                                <footer className="blockquote-footer">William THOMSON, Lord KELVIN</footer>
                            </blockquote>
                            <div className="footprint-form-intro-content">
                                <p>Avant de pouvoir vous proposer des recommendations adaptées,
                            nous avons besoin d'en connaitre un peu plus sur vos habitudes. Pour cela, nous avons prévu
                            un questionaire en 10 étapes.
                                </p>
                            </div>
                        </div>
                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.home_heat_type) {
                                             errors.home_heat_type = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label htmlFor="question_1">Quel type de chauffage utilisé vous pour votre logement ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_1"
                                    name="home_heat_type"
                                    component="select"
                                    placeholder="Votre réponse"
                                >
                                    <option />
                                    <option value="fuel">Fuel</option>
                                    <option value="gas">Gaz</option>
                                    <option value="electricity">Electrique</option>
                                    <option value="granules">Granulés</option>
                                    <option value="wood">Bois</option>
                                    <option value="heat_pump">Pompe à chaleur</option>
                                    <option value="no_info">Je ne sais pas</option>
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_heat_type" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.home_heat_time) {
                                             errors.home_heat_time = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label htmlFor="question_2">Combien de heures laisser vous votre chauffage allumé ? (par jour)</label>
                                <Field
                                    className="custom-select"
                                    id="question_2"
                                    name="home_heat_time"
                                    component="input"
                                    type="number"
                                    min="0"
                                    max="24"
                                    placeholder="Votre réponse"
                                >
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_heat_time" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.home_temperature) {
                                             errors.home_temperature = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label htmlFor="question_3">A quel température chauffez-vous votre logement ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_3"
                                    name="home_temperature"
                                    component="input"
                                    type="number"
                                    min="10"
                                    max="40"
                                    placeholder="Votre réponse"
                                >
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_temperature" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.home_mates) {
                                             errors.home_mates = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label htmlFor="question_4">Combien de personnes habitent dans votre logement ? (vous inclus)</label>
                                <Field
                                    className="custom-select"
                                    id="question_4"
                                    name="home_mates"
                                    component="input"
                                    type="number"
                                    min="1"
                                    max="20"
                                    placeholder="Votre réponse"
                                >
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_mates" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.home_area) {
                                             errors.home_area = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label htmlFor="question_5">Quelle est la surface habitable
                                    (lieux de vie hors cave, grenier, garage) de votre logement ? (en m²)</label>
                                <Field
                                    className="custom-select"
                                    id="question_5"
                                    name="home_area"
                                    component="input"
                                    type="number"
                                    min="20"
                                    max="200"
                                    placeholder="Votre réponse"
                                >
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_area" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.home_shower) {
                                             errors.home_shower = 'Merci de choisir une réponse'
                                         }
                                         if (!values.home_bath) {
                                             errors.home_bath = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label htmlFor="question_5">Combien de douches prenez vous par semaine ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_5"
                                    name="home_shower"
                                    component="input"
                                    type="number"
                                    min="0"
                                    max="20"
                                    placeholder="Votre réponse"
                                >
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_shower" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="question_6">Combien de bains prenez vous par semaine ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_6"
                                    name="home_bath"
                                    component="input"
                                    type="number"
                                    min="0"
                                    max="20"
                                    placeholder="Votre réponse"
                                >
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_bath" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.home_electronic_devices) {
                                             errors.home_electronic_devices = 'Merci de choisir une réponse'
                                         }
                                         if (!values.home_change_electronic_good) {
                                             errors.home_change_electronic_good = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label htmlFor="question_7">Quel est le nombre d'appareils électroniques (hitech) ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_7"
                                    name="home_electronic_devices"
                                    component="input"
                                    type="number"
                                    min="0"
                                    max="30"
                                    placeholder="Votre réponse"
                                >
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_electronic_devices" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="question_8">Combien de fois par an remplacer vous ces appareils ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_8"
                                    name="home_change_electronic_good"
                                    component="select"
                                    placeholder="Votre réponse"
                                >
                                    <option />
                                    <option value="0">moins d'une fois</option>
                                    <option value="1">1 à 2 fois</option>
                                    <option value="2">2 à 3 fois</option>
                                    <option value="3">3 fois ou plus</option>
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_change_electronic_good" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.home_change_electric_good) {
                                             errors.home_change_electric_good = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label htmlFor="question_9">Combien de fois par an remplacer vous vos appareils
                                    électroménager (four, machine à laver, etc.) ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_9"
                                    name="home_change_electric_good"
                                    component="select"
                                    placeholder="Votre réponse"
                                >
                                    <option />
                                    <option value="0">moins d'une fois</option>
                                    <option value="1">1 à 2 fois</option>
                                    <option value="2">2 à 3 fois</option>
                                    <option value="3">3 fois ou plus</option>
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_change_electric_good" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.reconditioned_goods) {
                                             errors.reconditioned_goods = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label htmlFor="question_10">Pour quels types de bien, privilégiez vous l'achat de produits reconditionnés ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_10"
                                    name="reconditioned_goods"
                                    component="select" multiple
                                    type="select"
                                    placeholder="Votre réponse"
                                >
                                    <option value="reconditioned_electriconic_goods">Appareils électroniques</option>
                                    <option value="reconditioned_electric_goods">Appareils électroménagers</option>
                                    <option value="reconditioned_textile">Textile</option>
                                </Field>
                                <Error className="invalid-feedback"
                                       name="reconditioned_goods" />
                            </div>
                        </Wizard.Page>

                        {/*
                            [HOME]
                                [Clothes]
                        */}

                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.home_clothes_origin_coefficient) {
                                             errors.home_clothes_origin_coefficient = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label htmlFor="question_11">Sur l’ensemble des vêtements que vous achetez,
                                    quelle pourcentage provient de la France ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_11"
                                    name="home_clothes_origin_coefficient"
                                    component="input"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="10"
                                    placeholder="Votre réponse"
                                >
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_clothes_origin_coefficient" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.home_clothes_composition) {
                                             errors.home_clothes_composition = 'Merci de choisir une réponse'
                                         }
                                         if (!values.home_clothes_composition_polyester) {
                                             errors.home_clothes_composition_polyester = 'Merci de choisir une réponse'
                                         }
                                         if (!values.home_clothes_composition_wool) {
                                             errors.home_clothes_composition_wool = 'Merci de choisir une réponse'
                                         }
                                         let total_value = parseInt(values.home_clothes_composition) +
                                             parseInt(values.home_clothes_composition_wool) +
                                             parseInt(values.home_clothes_composition_polyester)
                                         console.log(total_value)
                                         if ( total_value != 100) {
                                             errors.home_clothes_composition = 'Le total dois faire 100%'
                                         }
                                         if (!values.home_clothes_number) {
                                             errors.home_clothes_number = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label>Quelle est la matière de vos vêtements ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_12"
                                    name="home_clothes_composition"
                                    component="input"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="10"
                                    placeholder="Coton"
                                >
                                </Field>
                                <Field
                                    className="custom-select"
                                    id="question_13"
                                    name="home_clothes_composition_polyester"
                                    component="input"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="10"
                                    placeholder="Polyester"
                                >
                                </Field>
                                <Field
                                    className="custom-select"
                                    id="question_13"
                                    name="home_clothes_composition_wool"
                                    component="input"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="10"
                                    placeholder="Laine"
                                >
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_clothes_composition" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="question_15">Combien de vêtements achetés vous par mois ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_15"
                                    name="home_clothes_number"
                                    component="input"
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="Votre réponse"
                                >
                                </Field>
                                <Error className="invalid-feedback"
                                       name="home_clothes_number" />
                            </div>
                        </Wizard.Page>
                    </Wizard>
                    </div>
            </div>
        )
    }
}

export default compose(connect())(FootPrintFormPage)