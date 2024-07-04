import classNames from "classnames";
import {Navigate, Outlet} from "react-router-dom";
import {useAppContext} from "../helpers/utils";

const MainLayout = () => {
    const {
        config: {isFluid, isAuthenticated}
    } = useAppContext();

    if (!isAuthenticated) return <Navigate to={`/auth/login`} replace/>;
    return (
        <div className={isFluid ? 'container-fluid' : 'container'}>
            <div className={classNames('content')}>
                {/*------ Main Routes ------*/}
                <Outlet/>
            </div>
        </div>
    );
}

export default MainLayout