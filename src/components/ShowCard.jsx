import { Card } from 'react-bootstrap';
import {
    Link
} from 'react-router-dom'


function ShowCard(props) {
    let src = props.show.image ? props.show.image.medium : "https://previews.123rf.com/images/pe3check/pe3check1710/pe3check171000054/88673746-no-image-available-sign-internet-web-icon-to-indicate-the-absence-of-image-until-it-will-be-download.jpg"
    return (
        <>
            <Card className="col-12 col-sm-6">
                <Link to={`/${props.show.id}`}>
                    <Card.Img variant="top" src={src} />
                </Link>
                <Card.Body>
                    <Card.Title>{props.show.name}</Card.Title>
                    <Card.Text>
                        {props.show.genres.join(' - ')}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}



export default ShowCard