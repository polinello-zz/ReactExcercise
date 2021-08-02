/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom'
import { Card, Row, Col, Image } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { BsFillCalendarFill } from "react-icons/bs";
import { FaImdb } from "react-icons/fa";

function DetailShow() {
    let { id } = useParams();
    const [show, setShow] = useState(undefined)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("https://api.tvmaze.com/shows/" + id + "?embed=cast")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setShow(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            show ? <Card>
                <Card.Img variant="top" className="slide" src={show.image.medium} />
                <Card.Body>
                    <Card.Title>
                        <Row className="text-center">
                            <Col className="border">
                                <BsFillCalendarFill /> <br />
                                {show.schedule.days}{show.schedule.time ? "-" + show.schedule.time : null}

                            </Col>
                            <Col className="border">
                                <FaImdb /> <br /> {show.rating.average}
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <h3>{show.name} </h3>
                            </Col>
                            <Col className="text-right">
                                <h6 className="text-secondary" >{show.genres.join('-')} {show.language}</h6>
                            </Col>

                        </Row>
                    </Card.Title>
                </Card.Body>
                <Card.Body className="text-secondary">
                    <div dangerouslySetInnerHTML={{ __html: show.summary }}>
                    </div>
                    <table className="table table-borderless">
                        <thead>
                            <tr><th><h3>Cast</h3></th><td>Actor name</td><td>Hero name</td></tr>
                        </thead>
                        <tbody>
                            {show._embedded.cast.map((c, index) => {
                                return <Cast key={index} actor={c}></Cast>
                            })}
                        </tbody>
                    </table>
                </Card.Body>
            </Card > : null)
    }


    function Cast(props) {
        return (props.actor ? <tr>
            <td>{props.actor.person.image ? <Image src={props.actor.person.image.medium} style={{ width: "90%", height: "100%" }} roundedCircle /> : 'Not available'}</td>
            <td>{props.actor.person.name}</td>
            <td>{props.actor.character.name}</td>
        </tr> : '')
    }
}

export default DetailShow