import {Fragment, useEffect, useState} from "react";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import {api} from "../../utils/api";
import Flex from "../../components/Flex";

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const getPosts = async () => {
        setLoading(true)
        await api.get(`/posts/`).then(res => setPosts(res?.data?.results))
        setLoading(false)
    }

    useEffect(() => {
        getPosts()
    }, []);

    return loading ? (
        <Flex justifyContent="center" className="p-2 mb-2">
            <Spinner animation={'border'} variant={'primary'}/>
        </Flex>
    ) : (
        <Fragment>
            <Row className={"mt-3"}>
                {posts?.map((post) => (
                    <Col lg={4}>
                        <Card className="mb-3">
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Fragment>
    )
}

export default Home