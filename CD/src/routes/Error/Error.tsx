import { FC } from "react";
import { useRouteError } from "react-router-dom";

const Error: FC = () => {
    const error: unknown = useRouteError();

    console.error(error);

    return (
        <>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
        </>
    );
}

export default Error;