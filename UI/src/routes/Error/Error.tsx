import { FC } from "react";
import { useRouteError } from "react-router-dom";

const Error: FC = () => {
    const error: unknown = useRouteError();

    return (
        <>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </>
    );
}

export default Error;