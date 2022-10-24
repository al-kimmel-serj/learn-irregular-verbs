import React, {ChangeEvent, FormEvent} from "react";
import IrregularVerb from "../domain/IrregularVerb";
import {Button, Card, Form} from "react-bootstrap";

type CardFormProps = {
    verb: IrregularVerb
    onSuccess: Function
    onFail: Function
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
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (
            this.props.verb.baseForm === this.state.baseForm &&
            this.props.verb.pastTense === this.state.pastTense &&
            this.props.verb.pastParticiple === this.state.pastParticiple
        ) {
            this.props.onSuccess();
        } else {
            this.props.onFail();
        }
    }

    render() {
        return (
            <Card>
                <Form onSubmit={this.handleSubmit}>
                    <Card.Body>
                        <Card.Title>{this.props.verb.translation}</Card.Title>
                        <Form.Group className="mb-3" controlId="baseForm">
                            <Form.Label>Base form</Form.Label>
                            <Form.Control type="text" onChange={this.handleInputChange} autoFocus
                                          autoComplete="off"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="pastTenseForm">
                            <Form.Label>Past tense form</Form.Label>
                            <Form.Control type="text" onChange={this.handleInputChange} autoComplete="off"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="pastParticipleForm">
                            <Form.Label>Past participle form</Form.Label>
                            <Form.Control type="text" onChange={this.handleInputChange} autoComplete="off"/>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="d-grid">
                        <Button variant="primary" type="submit">
                            Check answer
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}

export default CardForm;