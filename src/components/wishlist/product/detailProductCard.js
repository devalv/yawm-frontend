import {Button, Card} from "react-bootstrap";


function DetailProductCard(props) {

    const url = props.product.url;
    const name = props.product.name;
    const id = props.product.id;
    const created_at = props.product.created_at;
    const updated_at = props.product.updated_at;
    const substitutable = props.product.substitutable;
    const reserved = props.product.reserved;

    return (
        <>
            <Card key={id}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        Created at: {created_at}
                        <br/>
                        Updated at: {updated_at}
                        <br/>
                        Substitutable: {substitutable}
                        <br/>
                        Reserved: {reserved}
                    </Card.Text>
                    <Card.Link href={url}>Посмотреть товар</Card.Link>
                    <br/>
                    <hr/>
                    <Button variant="primary">Reserve</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default DetailProductCard