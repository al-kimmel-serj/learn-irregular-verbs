import React, {ChangeEvent} from "react";
import IrregularVerb from "../domain/IrregularVerb";
import {Button, Card, Form} from "react-bootstrap";

type CardFormProps = {
    verb: IrregularVerb
    onProceed: Function
    onSkip: Function
}

type CardFormState = {
    baseForm: string;
    pastTense: string;
    pastParticiple: string;
}

class CardForm extends React.Component<CardFormProps, CardFormState> {
    state: CardFormState = {
        baseForm: "",
        pastTense: "",
        pastParticiple: "",
    };

    constructor(props: CardFormProps) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleProceed = this.handleProceed.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id;

        switch (id) {
            case "baseForm":
                this.setState({
                    baseForm: value as string,
                });
                break;
            case "pastTenseForm":
                this.setState({
                    pastTense: value as string,
                });
                break;
            case "pastParticipleForm":
                this.setState({
                    pastParticiple: value as string,
                });
                break;
        }
    }

    handleProceed() {
        this.props.onProceed();
    }

    handleSkip() {
        this.props.onSkip();
    }

    private isValid() {
        return this.props.verb.baseForm === this.state.baseForm &&
            this.props.verb.pastTense === this.state.pastTense &&
            this.props.verb.pastParticiple === this.state.pastParticiple;
    }

    render() {
        return (
            <Card>
                <Form onSubmit={(event) => event.preventDefault()}>
                    <Card.Body>
                        <Card.Title>
                            <h1>{this.props.verb.translation}</h1>
                        </Card.Title>
                        <Form.Group className="mb-3 has-validation" controlId="baseForm">
                            <Form.Label>Base form</Form.Label>
                            <Form.Control className={this.state.baseForm === this.props.verb.baseForm ? 'is-valid' : ''}
                                          type="text" onChange={this.handleInputChange} autoFocus
                                          autoComplete="off"/>
                        </Form.Group>
                        <Form.Group className="mb-3 has-validation" controlId="pastTenseForm">
                            <Form.Label>Past tense form</Form.Label>
                            <Form.Control
                                className={this.state.pastTense === this.props.verb.pastTense ? 'is-valid' : ''}
                                type="text" onChange={this.handleInputChange} autoComplete="off"/>
                        </Form.Group>
                        <Form.Group className="mb-3 has-validation" controlId="pastParticipleForm">
                            <Form.Label>Past participle form</Form.Label>
                            <Form.Control
                                className={this.state.pastParticiple === this.props.verb.pastParticiple ? 'is-valid' : ''}
                                type="text" onChange={this.handleInputChange} autoComplete="off"/>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="d-grid gap-2">
                        <Button variant="success" type="submit" className={!this.isValid() ? 'd-none' : ''}
                                disabled={!this.isValid()} onClick={this.handleProceed}>
                            Proceed to next verb
                        </Button>
                        <Button variant="danger" type="button" className={this.isValid() ? 'd-none' : ''}
                                disabled={this.isValid()} onClick={this.handleSkip}>
                            Skip this verb
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}

export default CardForm;