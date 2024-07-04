import {Fragment, useEffect, useState} from "react";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import {api} from "../../utils/api";
import Flex from "../../components/Flex";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faClock} from "@fortawesome/free-solid-svg-icons";
import {formatDateTime} from "../../helpers/utils";
import {AppPagination} from "../../components/AppPagination";
import useQuery from "../../hooks/useQuery";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0);
    const [length, setLength] = useState(0);

    const query = useQuery()
    const navigate = useNavigate()

    const getPosts = async (q) => {
        setLoading(true)
        await api.get(`/posts/?${q.toString()}`).then(res => {
            setPosts(res?.data?.results)
            setCount(res?.data?.count)
        })
        setLoading(false)
    }

    useEffect(() => {
        getPosts(query)
        setLength(posts?.length);
        navigate(`?${query.toString()}`)
        // eslint-disable-next-line
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
                            <Card.Header>
                                <Flex justifyContent={"between"} alignItems={"center"}>
                                    <Flex className={"justify-content-between"}>
                                        <FontAwesomeIcon icon={faBuilding} size="sm" className={"me-2 mt-1"}/>
                                        <h5>{post?.retailers_names}</h5>
                                    </Flex>
                                    <div className={"justify-content-end"}>
                                        <FontAwesomeIcon icon={faClock} className={"me-2 mt-1"}/>
                                        <span>{formatDateTime(post?.created_at)}</span>
                                    </div>
                                </Flex>
                            </Card.Header>
                            <Card.Body>
                                <p>{post?.summary_eng}</p>
                                <p className={"text-muted"}>Industry: {post?.retailer_industry}</p>
                                <p className={"text-muted"}>Country/City: {post?.country_of_opening}</p>
                                <p className={"text-muted"}>Number of Stores: {post?.number_of_stores}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <AppPagination
                    count={count}
                    fetch={getPosts}
                    itemsPerPage={25}
                    length={length}
                    query={query}
                />
            </Row>
        </Fragment>
    )
}

export default Home