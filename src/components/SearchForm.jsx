import React, { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import ShowCard from "./ShowCard";
import { FaSearch } from "react-icons/fa";
function SearchForm() {

    const [searchValue, setSearchValue] = useState('');
    const [searchedShows, setSearchedShows] = useState([]);

    const handleSubmit = () => {
        let shows = []
        fetch("https://api.tvmaze.com/search/shows?q=" + searchValue)
            .then(res => res.json())
            .then(
                (result) => {
                    result.forEach(r => {
                        shows.push({
                            id: r.show.id,
                            name: r.show.name,
                            image: r.show.image,
                            genres: r.show.genres
                        })
                    })
                    setSearchedShows(shows)
                },
                // Nota: è importante gestire gli errori qui
                // invece di un blocco catch() in modo da non fare passare
                // eccezioni da bug reali nei componenti.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };


    return (
        <Form>
            <Row className="mt-2 sticky-top bg-light">
                <Col>
                    <Form.Group controlId="formBasicSearch">
                        <Form.Control type="text" name="search" onChange={(event) => setSearchValue(event.target.value)} placeholder="Search" />
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant="secondary" className="float-right" onClick={(event) => handleSubmit(event)}>
                        <FaSearch />
                    </Button>
                </Col>
            </Row>
            <Row>
                {searchedShows.map((r, i) => {
                    return <ShowCard key={i} show={r}></ShowCard>
                })}
            </Row>

        </Form>
    )
}
export default SearchForm;